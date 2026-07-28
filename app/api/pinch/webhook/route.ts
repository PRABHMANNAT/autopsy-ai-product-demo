import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/pinch";

export const runtime = "nodejs";

/**
 * Pinch calls this on payment state changes. The raw body must be read as
 * text before parsing so the HMAC is computed over the exact bytes sent.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature =
    request.headers.get("pinch-signature") ??
    request.headers.get("x-pinch-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  switch (event.type) {
    case "payment.succeeded":
      // TODO: mark the run as paid using event.data.reference
      console.log("[pinch] payment succeeded:", event.data?.reference);
      break;
    case "payment.failed":
      console.log("[pinch] payment failed:", event.data?.reference);
      break;
    default:
      console.log("[pinch] unhandled event:", event.type);
  }

  return NextResponse.json({ received: true });
}
