"use client";

export interface StartPinchCheckoutOptions {
  setLoading: (loading: boolean) => void;
  onError: (message: string) => void;
  onUnavailable: () => void;
}

interface PaymentLinkResponse {
  url?: string;
  error?: string;
}

export async function startPinchCheckout({
  setLoading,
  onError,
  onUnavailable,
}: StartPinchCheckoutOptions): Promise<void> {
  setLoading(true);

  try {
    const response = await fetch("/api/pinch/payment-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const payload = (await response.json().catch(() => ({}))) as PaymentLinkResponse;

    if (!response.ok || !payload.url) {
      throw new Error(
        payload.error ??
          "Pinch sandbox is unavailable. You can continue with the simulation."
      );
    }

    window.location.assign(payload.url);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Pinch sandbox is unavailable. You can continue with the simulation.";
    onError(message);
    onUnavailable();
  } finally {
    setLoading(false);
  }
}
