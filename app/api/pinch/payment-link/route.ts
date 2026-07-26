import { NextResponse } from "next/server";
import {
  extractPaymentLinkUrl,
  responseStructure,
} from "@/lib/pinch-payment-link";

export const runtime = "nodejs";

const REQUIRED_ENV = [
  "PINCH_ACCESS_TOKEN",
  "PINCH_PAYER_ID",
  "NEXT_PUBLIC_APP_URL",
] as const;

function validateEnvironment():
  | {
      ok: true;
      values: Record<(typeof REQUIRED_ENV)[number], string>;
    }
  | { ok: false; missing: string[] } {
  const missing = REQUIRED_ENV.filter((name) => !process.env[name]?.trim());
  if (missing.length > 0) return { ok: false, missing };

  const values = Object.fromEntries(
    REQUIRED_ENV.map((name) => [name, process.env[name]!.trim()])
  ) as Record<(typeof REQUIRED_ENV)[number], string>;

  try {
    const appUrl = new URL(values.NEXT_PUBLIC_APP_URL);
    if (!["http:", "https:"].includes(appUrl.protocol)) {
      return { ok: false, missing: ["NEXT_PUBLIC_APP_URL (invalid URL)"] };
    }
  } catch {
    return { ok: false, missing: ["NEXT_PUBLIC_APP_URL (invalid URL)"] };
  }

  return { ok: true, values };
}

export async function POST() {
  const environment = validateEnvironment();

  if (!environment.ok) {
    return NextResponse.json(
      {
        error:
          "Pinch sandbox is not configured. Continue with the built-in simulation.",
        missing: environment.missing,
      },
      { status: 503 }
    );
  }

  const { PINCH_ACCESS_TOKEN, PINCH_PAYER_ID, NEXT_PUBLIC_APP_URL } =
    environment.values;

  const body = {
    amount: 500,
    payerId: PINCH_PAYER_ID,
    description: "VentureVerdict validation campaign deposit",
    currency: "AUD",
    allowedPaymentMethods: ["credit-card", "bank-account"],
    returnUrl: `${NEXT_PUBLIC_APP_URL.replace(/\/$/, "")}/success`,
    metadata: JSON.stringify({
      projectId: "demo-ai-recruitment",
      product: "VentureVerdict",
      package: "human-validation-deposit",
      generalReviewers: 100,
      specializedReviewers: 7,
      experts: 1,
    }),
  };

  try {
    const response = await fetch(
      "https://api.getpinch.com.au/test/payment-links",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINCH_ACCESS_TOKEN}`,
          "pinch-version": "2020.1",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const payload = (await response.json().catch(() => null)) as unknown;

    if (process.env.NODE_ENV === "development") {
      console.info("[pinch] payment-link response structure", {
        status: response.status,
        structure: responseStructure(payload),
      });
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Pinch could not create the sandbox checkout. Continue with the simulation.",
        },
        { status: 502 }
      );
    }

    const url = extractPaymentLinkUrl(payload);
    if (!url) {
      return NextResponse.json(
        {
          error:
            "Pinch returned an unexpected response. Continue with the simulation.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[pinch] payment-link request failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return NextResponse.json(
      {
        error:
          "Pinch sandbox is temporarily unavailable. Continue with the simulation.",
      },
      { status: 502 }
    );
  }
}
