const URL_KEYS = ["url", "paymentLinkUrl", "checkoutUrl", "hostedUrl", "link"] as const;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isHostedUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function extractPaymentLinkUrl(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  for (const key of URL_KEYS) {
    if (isHostedUrl(payload[key])) return payload[key];
  }

  for (const key of ["data", "paymentLink", "result"]) {
    const nested = payload[key];
    const candidate = extractPaymentLinkUrl(nested);
    if (candidate) return candidate;
  }

  return null;
}

export function responseStructure(value: unknown, depth = 0): unknown {
  if (depth > 2) return typeof value;
  if (Array.isArray(value)) return [`array(${value.length})`];
  if (!isRecord(value)) return typeof value;

  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [
      key,
      isRecord(nested) || Array.isArray(nested)
        ? responseStructure(nested, depth + 1)
        : typeof nested,
    ])
  );
}
