import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessExperience } from "@/components/playground/success-experience";

export const metadata: Metadata = {
  title: "Validation round funded",
  description:
    "Your validation campaign is moving from payment return to reviewer matching.",
};

function SuccessFallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-graphite-950 text-warm">
      <div className="flex items-center gap-3 text-[14px] text-white/55">
        <span className="size-2 animate-pulse rounded-full bg-acid" />
        Preparing campaign timeline…
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessExperience />
    </Suspense>
  );
}
