"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RUN_STEPS } from "@/lib/demo-run";
import { CheckIcon, DotsIcon } from "@/components/icons";

/** Right-hand nine-step spine. Active step is derived from the route. */
export function StepSpine() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean); // ["runs", runId, segment]
  const runId = parts[1] ?? "pricing-page";
  const current = parts[2] ?? "connect";

  const currentIndex = RUN_STEPS.findIndex((s) => s.segment === current);

  return (
    <aside className="hidden w-[250px] shrink-0 flex-col bg-panel backdrop-blur-sm lg:flex">
      <header className="flex items-center justify-between px-[18px] pb-1 pt-[25px]">
        <h2 className="text-[13.5px] font-medium">Run progress</h2>
        <button
          type="button"
          aria-label="Run options"
          className="rounded-md p-1 text-ink-faint transition-colors hover:bg-ink/[0.05] hover:text-ink"
        >
          <DotsIcon className="h-4 w-4" />
        </button>
      </header>

      <ol className="thin-scroll flex-1 overflow-y-auto px-[18px] py-4">
        {RUN_STEPS.map((step, i) => {
          const isCurrent = i === currentIndex;
          // Steps 1 and 2 share a screen, so both light up together.
          const reached = i <= currentIndex || step.state === "done";
          const isLast = i === RUN_STEPS.length - 1;

          return (
            <li key={step.n} className="relative flex gap-3 pb-[18px]">
              {!isLast && (
                <span
                  aria-hidden
                  className={`absolute left-[13px] top-[26px] h-[calc(100%-26px)] w-[1.5px] ${
                    reached ? "bg-success/30" : "bg-line"
                  }`}
                />
              )}

              <span
                className={`relative z-10 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                  isCurrent
                    ? "bg-accent/[0.16] text-accent-deep ring-1 ring-inset ring-accent-deep/35"
                    : reached
                      ? "bg-success/[0.08] text-success ring-1 ring-inset ring-success/35"
                      : "bg-canvas text-ink-faint ring-1 ring-inset ring-line"
                }`}
              >
                {reached && !isCurrent ? (
                  <CheckIcon className="h-[13px] w-[13px]" />
                ) : (
                  step.n
                )}
              </span>

              <Link
                href={`/runs/${runId}/${step.segment}`}
                className="min-w-0 flex-1 rounded-lg px-1 py-[1px] transition-colors hover:bg-ink/[0.04]"
              >
                <span
                  className={`block text-[13px] leading-snug ${
                    isCurrent ? "font-semibold" : "font-medium"
                  }`}
                >
                  {step.title}
                </span>
                <span className="mt-[2px] block text-[11px] leading-snug text-ink-faint">
                  {step.detail}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
