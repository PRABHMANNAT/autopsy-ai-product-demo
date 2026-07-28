"use client";

import { FINDINGS, type FindingTone } from "@/lib/demo-run";

const TONE_PIN: Record<FindingTone, string> = {
  warn: "bg-accent text-ink ring-[6px] ring-ink/[0.06]",
  risk: "bg-accent text-ink ring-[6px] ring-accent/25",
  good: "bg-success text-canvas ring-[6px] ring-success/20",
};

/** Numbered markers overlaid on the product, anchored per finding. */
export function FindingPins({
  selectedId,
  onSelect,
}: {
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {FINDINGS.map((finding) => {
        const isSelected = finding.id === selectedId;
        return (
          <button
            key={finding.id}
            type="button"
            onClick={() => onSelect(finding.id)}
            aria-label={`Finding ${finding.id}: ${finding.title}`}
            style={{ left: `${finding.pin.x}%`, top: `${finding.pin.y}%` }}
            className={`pointer-events-auto absolute flex h-[34px] w-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[14px] font-semibold transition-transform hover:scale-110 ${
              TONE_PIN[finding.tone]
            } ${isSelected ? "scale-110" : ""}`}
          >
            {finding.id}
          </button>
        );
      })}
    </div>
  );
}
