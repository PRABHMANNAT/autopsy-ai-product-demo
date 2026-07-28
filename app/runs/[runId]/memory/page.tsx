"use client";

import { useState } from "react";
import { StepHeader } from "@/components/run/step-header";
import { RUN_HISTORY, type VerdictCall } from "@/lib/demo-run";

const CALL_DOT: Record<VerdictCall, string> = {
  SHIP: "bg-success",
  MODIFY: "bg-accent",
  KILL: "bg-accent-deep",
};

const CALL_CHIP: Record<VerdictCall, string> = {
  SHIP: "bg-success/[0.1] text-success ring-1 ring-inset ring-success/35",
  MODIFY: "bg-accent/[0.18] text-accent-deep",
  KILL: "bg-accent-deep/[0.12] text-accent-deep ring-1 ring-inset ring-accent-deep/35",
};

export default function MemoryPage() {
  const [compare, setCompare] = useState<string[]>([]);

  function toggle(version: string) {
    setCompare((prev) =>
      prev.includes(version)
        ? prev.filter((v) => v !== version)
        : [...prev, version].slice(-2),
    );
  }

  return (
    <>
      <StepHeader
        step={9}
        title="Continuous Product Memory"
        detail={`${RUN_HISTORY.length} versions tested · every failure, fix and outcome retained`}
        actions={
          compare.length === 2 ? (
            <span className="shrink-0 rounded-[11px] bg-ink px-[14px] py-[9px] font-mono text-[11px] text-canvas">
              {compare[0]} ↔ {compare[1]}
            </span>
          ) : (
            <span className="shrink-0 text-[11.5px] text-ink-faint">
              Select two versions to diff
            </span>
          )
        }
      />

      <div className="thin-scroll flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[760px] px-6 py-8">
          <ol>
            {RUN_HISTORY.map((run, i) => {
              const isLast = i === RUN_HISTORY.length - 1;
              const picked = compare.includes(run.version);

              return (
                <li key={run.version} className="relative flex gap-4 pb-4">
                  {!isLast && (
                    <span
                      aria-hidden
                      className="absolute left-[7px] top-[22px] h-[calc(100%-22px)] w-[1.5px] bg-line"
                    />
                  )}
                  <span
                    className={`relative z-10 mt-[14px] h-[15px] w-[15px] shrink-0 rounded-full ring-[3px] ring-surface ${
                      CALL_DOT[run.call]
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => toggle(run.version)}
                    className={`min-w-0 flex-1 rounded-card border-[0.8px] p-4 text-left transition-colors ${
                      picked
                        ? "border-accent-deep/45 bg-accent/[0.07]"
                        : "border-line-strong bg-card hover:bg-card/60"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <strong className="font-mono text-[14px] font-semibold">
                        {run.version}
                      </strong>
                      <span className="text-[11.5px] text-ink-faint">
                        {run.date}
                      </span>
                      <span
                        className={`ml-auto rounded-full px-[9px] py-[4px] font-mono text-[9.5px] uppercase tracking-[0.12em] ${
                          CALL_CHIP[run.call]
                        }`}
                      >
                        {run.call}
                      </span>
                    </span>

                    <span className="mt-[10px] block text-[14px] font-medium tracking-[-0.02em]">
                      {run.headline}
                    </span>
                    <span className="mt-[5px] block text-[12.5px] leading-snug text-ink-soft">
                      {run.changed}
                    </span>
                    <span className="mt-3 block font-mono text-[10px] text-ink-faint">
                      {run.participants} participants
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
