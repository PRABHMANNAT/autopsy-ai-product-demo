"use client";

import { ArrowUpRightIcon, SquareIcon } from "./icons";
import { BrandBadge } from "./scout-avatar";

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "4", label: "screens" },
  { value: "5", label: "participants" },
  { value: "8", label: "findings" },
];

/**
 * The generated-run card that Scout drops into the transcript. Gets the warm
 * corner wash and the heavier lift shadow that separate it from chat text.
 * In `compact` mode (preview open) the footer becomes the primary action.
 */
export function RunArtifact({
  compact = false,
  onOpen,
}: {
  compact?: boolean;
  onOpen?: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-card border-[0.8px] border-line-strong bg-card bg-[linear-gradient(145deg,rgba(242,138,85,0.09),transparent_48%)] shadow-artifact">
      <header className="flex items-center gap-3 border-b-[0.8px] border-line px-4 py-[13px]">
        <BrandBadge tone="accent" className="h-[30px] w-[30px] shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-medium">
            Pricing clarity test
          </span>
          <span className="block text-[11.5px] leading-snug text-ink-faint">
            Generated Run · ready to inspect
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-[6px] rounded-full bg-success/[0.08] px-[9px] py-[4px] font-mono text-[9.5px] uppercase tracking-[0.18em] text-success ring-1 ring-inset ring-success/35">
          <span className="h-[5px] w-[5px] rounded-full bg-success" />
          Live
        </span>
      </header>

      <div className="px-4 py-[18px]">
        <p className="max-w-[46ch] text-[15px] leading-[1.45] tracking-[-0.02em]">
          Can first-time buyers distinguish the paid plans and confidently start
          a trial?
        </p>

        <div className="mt-[18px] flex flex-wrap gap-2">
          {STATS.map((stat) => (
            <span
              key={stat.label}
              className="rounded-[10px] border-[0.8px] border-line bg-canvas/70 px-[11px] py-[7px] text-[12px] text-ink-soft"
            >
              <span className="font-medium text-ink">{stat.value}</span>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className={`flex w-full items-center justify-between border-t-[0.8px] border-line px-4 py-[11px] text-left transition-colors ${
          compact ? "bg-bubble/50 hover:bg-bubble" : "hover:bg-ink/[0.03]"
        }`}
      >
        <span
          className={`flex items-center gap-2 text-[12px] ${
            compact ? "font-medium text-ink" : "text-ink-faint"
          }`}
        >
          <SquareIcon className="h-[14px] w-[14px]" />
          Open live workspace
        </span>
        <span
          className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-ink-soft transition-colors ${
            compact ? "" : "border-[0.8px] border-line-strong"
          }`}
        >
          <ArrowUpRightIcon className="h-[15px] w-[15px]" />
        </span>
      </button>
    </article>
  );
}
