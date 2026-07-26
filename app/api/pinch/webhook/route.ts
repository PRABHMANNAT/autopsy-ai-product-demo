import { NextResponse } from "next/server";

export const runtime = "nodejs";

function verifyPinchSignature(
  rawBody: string,
  signature: string | null
): boolean {
  void rawBody;
  void signature;
  // TODO: Verify HMAC-SHA256 against the raw body using the secret supplied by
  // Pinch and the exact `pinch-signature` header before processing any event.
  return false;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("pinch-signature");

  if (!verifyPinchSignature(rawBody, signature)) {
    return NextResponse.json(
      { error: "Webhook signature verification is not configured." },
      { status: 501 }
    );
  }

  return NextResponse.json({ received: true });
}
