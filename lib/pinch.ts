import crypto from "crypto";

/**
 * Minimal server-side Pinch client. Keys are read lazily so the app still
 * builds and renders without payment credentials configured.
 */

const API_BASE = process.env.PINCH_API_BASE ?? "https://api.getpinch.com.au/v1";

function requireKey(): string {
  const key = process.env.PINCH_SECRET_KEY;
  if (!key) {
    throw new Error(
      "PINCH_SECRET_KEY is not set. Copy .env.example to .env.local and fill it in.",
    );
  }
  return key;
}

export type PaymentLinkInput = {
  /** Amount in the smallest currency unit (e.g. cents). */
  amount: number;
  currency?: string;
  description: string;
  customerEmail?: string;
  /** Your own order/run id, echoed back on the webhook. */
  reference: string;
};

export type PaymentLink = {
  id: string;
  url: string;
  status: string;
};

export async function createPaymentLink(
  input: PaymentLinkInput,
): Promise<PaymentLink> {
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const res = await fetch(`${API_BASE}/payment-links`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${requireKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amount,
      currency: input.currency ?? "AUD",
      description: input.description,
      customer_email: input.customerEmail,
      reference: input.reference,
      redirect_url: `${origin}/billing/success?ref=${encodeURIComponent(input.reference)}`,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Pinch payment link failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  return { id: data.id, url: data.url ?? data.payment_url, status: data.status };
}

/**
 * Verifies the webhook HMAC. Uses a length-safe comparison so the check does
 * not leak timing information.
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null,
): boolean {
  const secret = process.env.PINCH_WEBHOOK_SECRET;
  if (!secret || !signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature.replace(/^sha256=/, ""), "utf8");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}
