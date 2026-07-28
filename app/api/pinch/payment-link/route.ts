import { NextResponse } from "next/server";
import { createPaymentLink } from "@/lib/pinch";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (typeof body.amount !== "number" || !body.description) {
      return NextResponse.json(
        { error: "amount (number) and description are required" },
        { status: 400 },
      );
    }

    const link = await createPaymentLink({
      amount: body.amount,
      currency: body.currency,
      description: body.description,
      customerEmail: body.customerEmail,
      reference: body.reference ?? `run_${Date.now()}`,
    });

    return NextResponse.json(link);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected payment error";
    console.error("[pinch] payment-link:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
