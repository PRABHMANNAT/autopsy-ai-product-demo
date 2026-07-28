"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { StepHeader } from "@/components/run/step-header";
import { VERDICT, type Severity, type VerdictCall } from "@/lib/demo-run";
import { ArrowRightIcon } from "@/components/icons";

const CALL_STYLE: Record<VerdictCall, { text: string; wash: string }> = {
  SHIP: {
    text: "text-success",
    wash: "bg-[linear-gradient(150deg,rgba(24,91,58,0.12),transparent_55%)]",
  },
  MODIFY: {
    text: "text-accent-deep",
    wash: "bg-[linear-gradient(150deg,rgba(242,138,85,0.16),transparent_55%)]",
  },
  KILL: {
    text: "text-accent-deep",
    wash: "bg-[linear-gradient(150deg,rgba(143,50,18,0.18),transparent_55%)]",
  },
};

const SEVERITY_STYLE: Record<Severity, string> = {
  critical: "bg-accent-deep text-canvas",
  major: "bg-accent/[0.22] text-accent-deep",
  minor: "bg-ink/[0.07] text-ink-soft",
};

export default function VerdictPage() {
  const params = useParams();
  const runId = (params.runId as string) ?? "pricing-page";
  const style = CALL_STYLE[VERDICT.call];

  return (
    <>
      <StepHeader
        step={7}
        title="Decision-Ready Verdict"
        detail={`${VERDICT.issues.length} ranked issues · ${VERDICT.confidence}% confidence`}
      />

      <div className="thin-scroll flex-1 overflow-y-auto">
        {/* The call */}
        <div
          className={`border-b-[0.8px] border-line/70 px-6 py-10 ${style.wash}`}
        >
          <div className="mx-auto max-w-[860px]">
            <span className="eyebrow">The call</span>
            <h2
              className={`mt-2 text-[86px] font-semibold leading-[0.92] tracking-[-0.055em] ${style.text}`}
            >
              {VERDICT.call}
            </h2>
            <p className="mt-5 max-w-[62ch] text-[15.5px] leading-[1.55] text-ink-soft">
              {VERDICT.summary}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-[5px] w-[180px] overflow-hidden rounded-full bg-ink/[0.09]">
                <span
                  className="block h-full rounded-full bg-ink/45"
                  style={{ width: `${VERDICT.confidence}%` }}
                />
              </span>
              <span className="font-mono text-[11px] text-ink-faint">
                {VERDICT.confidence}% confidence
              </span>
            </div>
          </div>
        </div>

        {/* Ranked issues */}
        <div className="mx-auto max-w-[860px] px-6 py-8">
          <h3 className="eyebrow mb-3">Ranked issues</h3>
          <div className="flex flex-col gap-3">
            {VERDICT.issues.map((issue, i) => (
              <article
                key={issue.id}
                className="rounded-card border-[0.8px] border-line-strong bg-card p-4"
              >
                <header className="flex items-start gap-3">
                  <span className="mt-[1px] font-mono text-[12px] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <strong className="min-w-0 flex-1 text-[14.5px] font-semibold leading-snug tracking-[-0.02em]">
                    {issue.title}
                  </strong>
                  <span
                    className={`shrink-0 rounded-full px-[9px] py-[4px] font-mono text-[9.5px] uppercase tracking-[0.12em] ${
                      SEVERITY_STYLE[issue.severity]
                    }`}
                  >
                    {issue.severity}
                  </span>
                </header>

                <dl className="mt-3 grid gap-3 pl-[26px] sm:grid-cols-[150px_1fr]">
                  <dt className="text-[11.5px] text-ink-faint">Evidence</dt>
                  <dd className="text-[12.5px] text-ink-soft">
                    {issue.evidence}
                  </dd>
                  <dt className="text-[11.5px] text-ink-faint">Fix</dt>
                  <dd className="text-[13px] leading-[1.5]">{issue.fix}</dd>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky handoff into verification */}
      <footer className="shrink-0 border-t-[0.8px] border-line bg-surface/90 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[860px] items-center gap-4">
          <p className="min-w-0 flex-1 text-[12.5px] text-ink-faint">
            Ship the fixes, then rerun the same test to prove they worked.
          </p>
          <Link
            href={`/runs/${runId}/retest`}
            className="flex shrink-0 items-center gap-2 rounded-[11px] bg-ink px-[16px] py-[10px] text-[13px] font-medium text-canvas transition-colors hover:bg-ink/85"
          >
            Retest after fix
            <ArrowRightIcon className="h-[15px] w-[15px]" />
          </Link>
        </div>
      </footer>
    </>
  );
}
