"use client";

import { useState } from "react";
import { FINDINGS, EVIDENCE_TABS, type FindingTone } from "@/lib/demo-run";
import { ArrowRightIcon, ArrowUpIcon, CloseIcon } from "@/components/icons";
import { SparkMark } from "@/components/icons";

const TONE_BADGE: Record<FindingTone, string> = {
  warn: "bg-accent/[0.16] text-accent-deep",
  risk: "bg-accent/[0.16] text-accent-deep",
  good: "bg-success/[0.10] text-success",
};

/** Right-hand findings drawer inside the preview stage. */
export function EvidencePanel({
  selectedId,
  onSelect,
  onClose,
}: {
  selectedId: number | null;
  onSelect: (id: number) => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState(EVIDENCE_TABS[0]);

  return (
    <aside className="flex w-[300px] shrink-0 flex-col border-l-[0.8px] border-line bg-panel xl:w-[340px]">
      <header className="flex items-start justify-between gap-3 px-4 pb-3 pt-4">
        <span>
          <span className="block text-[15px] font-semibold tracking-[-0.02em]">
            Evidence
          </span>
          <span className="mt-[2px] block text-[11.5px] text-ink-faint">
            Pricing · {FINDINGS.length} findings
          </span>
        </span>
        <button
          type="button"
          aria-label="Close evidence"
          onClick={onClose}
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-bubble/70 text-ink-soft transition-colors hover:bg-ink hover:text-canvas"
        >
          <CloseIcon className="h-[15px] w-[15px]" />
        </button>
      </header>

      <div
        role="tablist"
        aria-label="Evidence views"
        className="flex gap-5 border-b-[0.8px] border-line px-4"
      >
        {EVIDENCE_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={`-mb-[0.8px] border-b-2 pb-[9px] text-[12.5px] transition-colors ${
                isActive
                  ? "border-accent-deep font-medium text-ink"
                  : "border-transparent text-ink-faint hover:text-ink"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="thin-scroll flex-1 overflow-y-auto px-4 py-4">
        <section className="rounded-[14px] bg-accent/[0.09] p-4">
          <span className="eyebrow text-accent-deep">On this screen</span>
          <strong className="mt-[6px] block text-[20px] font-semibold tracking-[-0.03em]">
            {FINDINGS.length} findings
          </strong>
          <p className="mt-[6px] text-[12.5px] leading-snug text-ink-soft">
            Click a finding to reveal its exact location on the product.
          </p>
        </section>

        <div className="mt-3 flex flex-col gap-[10px]">
          {FINDINGS.map((finding) => {
            const isSelected = finding.id === selectedId;
            return (
              <button
                key={finding.id}
                type="button"
                onClick={() => onSelect(finding.id)}
                className={`flex gap-3 rounded-[14px] border-[0.8px] p-3 text-left transition-colors ${
                  isSelected
                    ? "border-accent-deep/45 border-l-[3px] border-l-accent-deep bg-accent/[0.07]"
                    : "border-line bg-card hover:bg-card/60"
                }`}
              >
                <span
                  className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                    TONE_BADGE[finding.tone]
                  }`}
                >
                  {finding.id}
                </span>
                <span className="min-w-0">
                  <span className="flex items-start justify-between gap-2">
                    <strong className="text-[13px] font-semibold leading-snug tracking-[-0.015em]">
                      {finding.title}
                    </strong>
                    <i className="shrink-0 rounded-full bg-ink/[0.06] px-[7px] py-[2px] font-mono text-[10px] not-italic text-ink-soft">
                      {finding.ratio}
                    </i>
                  </span>
                  <span className="mt-[6px] block text-[12.5px] leading-[1.5] text-ink-soft">
                    {finding.body}
                  </span>
                  {finding.quote && (
                    <span className="mt-[10px] block border-l-2 border-accent-deep/60 bg-bubble/60 py-2 pl-3 pr-2 text-[12px] italic leading-snug">
                      “{finding.quote}”
                    </span>
                  )}
                  <span className="mt-[10px] block font-mono text-[10px] text-ink-faint">
                    ◉ {finding.source}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <footer className="border-t-[0.8px] border-line px-4 pb-4 pt-3">
        <div className="flex items-center gap-2 rounded-[14px] border-[0.8px] border-line-input bg-composer p-[10px]">
          <SparkMark className="h-[18px] w-[18px] shrink-0 text-accent" />
          <input
            aria-label="Ask Scout about this evidence"
            placeholder="Ask Scout about this evidence…"
            className="min-w-0 flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-ink-faint"
          />
          <button
            type="button"
            aria-label="Send"
            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[9px] bg-ink text-canvas transition-colors hover:bg-ink/85"
          >
            <ArrowUpIcon className="h-[15px] w-[15px]" />
          </button>
        </div>

        <a
          href="/runs/pricing-page/report"
          className="mt-3 flex items-center justify-between px-1 text-[12.5px] text-ink-soft transition-colors hover:text-ink"
        >
          Open complete verdict
          <ArrowRightIcon className="h-[15px] w-[15px]" />
        </a>
      </footer>
    </aside>
  );
}
