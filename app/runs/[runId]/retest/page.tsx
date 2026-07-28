"use client";

import { StepHeader } from "@/components/run/step-header";
import { RETEST, type RetestOutcome } from "@/lib/demo-run";
import { CheckIcon, CloseIcon, PlusIcon } from "@/components/icons";

const OUTCOME: Record<
  RetestOutcome,
  { label: string; chip: string; Icon: typeof CheckIcon }
> = {
  fixed: {
    label: "Fixed",
    chip: "bg-success/[0.12] text-success ring-1 ring-inset ring-success/35",
    Icon: CheckIcon,
  },
  "still-broken": {
    label: "Still broken",
    chip: "bg-accent-deep/[0.12] text-accent-deep ring-1 ring-inset ring-accent-deep/35",
    Icon: CloseIcon,
  },
  new: {
    label: "New issue",
    chip: "bg-accent/[0.2] text-accent-deep ring-1 ring-inset ring-accent-deep/25",
    Icon: PlusIcon,
  },
};

export default function RetestPage() {
  const counts = {
    fixed: RETEST.items.filter((i) => i.outcome === "fixed").length,
    broken: RETEST.items.filter((i) => i.outcome === "still-broken").length,
    fresh: RETEST.items.filter((i) => i.outcome === "new").length,
  };

  return (
    <>
      <StepHeader
        step={8}
        title="Verification Retest"
        detail={`${RETEST.from} → ${RETEST.to} · same decision, same participant profile`}
        actions={
          <span className="shrink-0 rounded-full bg-success/[0.1] px-[11px] py-[6px] font-mono text-[10px] uppercase tracking-[0.14em] text-success ring-1 ring-inset ring-success/35">
            Now {RETEST.call}
          </span>
        }
      />

      <div className="thin-scroll flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[860px] px-6 py-8">
          {/* Diff bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-card border-[0.8px] border-line-strong bg-card p-4">
            <span className="font-mono text-[12px] text-ink-faint">
              {RETEST.from}
            </span>
            <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
              <span className="flex h-full">
                <span
                  className="bg-success"
                  style={{
                    width: `${(counts.fixed / RETEST.items.length) * 100}%`,
                  }}
                />
                <span
                  className="bg-accent-deep"
                  style={{
                    width: `${(counts.broken / RETEST.items.length) * 100}%`,
                  }}
                />
                <span
                  className="bg-accent"
                  style={{
                    width: `${(counts.fresh / RETEST.items.length) * 100}%`,
                  }}
                />
              </span>
            </span>
            <span className="font-mono text-[12px] font-medium">
              {RETEST.to}
            </span>

            <div className="flex w-full gap-4 border-t-[0.8px] border-line pt-3">
              <Tally value={counts.fixed} label="fixed" tone="text-success" />
              <Tally
                value={counts.broken}
                label="still broken"
                tone="text-accent-deep"
              />
              <Tally
                value={counts.fresh}
                label="new"
                tone="text-accent-deep"
              />
            </div>
          </div>

          {/* Findings, carried over with outcomes */}
          <div className="mt-4 flex flex-col gap-3">
            {RETEST.items.map((item) => {
              const o = OUTCOME[item.outcome];
              return (
                <article
                  key={item.id}
                  className="rounded-card border-[0.8px] border-line-strong bg-card p-4"
                >
                  <header className="flex items-start gap-3">
                    <strong className="min-w-0 flex-1 text-[14px] font-semibold leading-snug tracking-[-0.02em]">
                      {item.title}
                    </strong>
                    <span
                      className={`flex shrink-0 items-center gap-[6px] rounded-full px-[10px] py-[5px] font-mono text-[9.5px] uppercase tracking-[0.12em] ${o.chip}`}
                    >
                      <o.Icon className="h-[11px] w-[11px]" />
                      {o.label}
                    </span>
                  </header>
                  <p className="mt-[10px] max-w-[74ch] text-[13px] leading-[1.55] text-ink-soft">
                    {item.note}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function Tally({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: string;
}) {
  return (
    <span className="flex items-baseline gap-[6px]">
      <span className={`text-[19px] font-semibold ${tone}`}>{value}</span>
      <span className="text-[11.5px] text-ink-faint">{label}</span>
    </span>
  );
}
