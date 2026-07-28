"use client";

import { useState } from "react";
import { StepHeader } from "@/components/run/step-header";
import { ProductFrame } from "@/components/run/product-frame";
import { DIVERGENCES, PREDICTIONS, CLIPS } from "@/lib/demo-run";
import { ArrowRightIcon } from "@/components/icons";

export default function DivergencePage() {
  const [openId, setOpenId] = useState<number | null>(1);

  const missed = DIVERGENCES.filter((d) => d.delta > 0).length;
  const overcalled = DIVERGENCES.filter((d) => d.delta < 0).length;

  return (
    <>
      <StepHeader
        step={6}
        title="AI vs Human Divergence"
        detail={`${missed} things the agents missed · ${overcalled} they over-called`}
        actions={
          <span className="shrink-0 rounded-full bg-accent/[0.14] px-[11px] py-[6px] font-mono text-[10px] uppercase tracking-[0.14em] text-accent-deep">
            The gap
          </span>
        }
      />

      <div className="thin-scroll flex-1 overflow-y-auto">
        {/* Synced frames */}
        <div className="grid gap-3 p-4 lg:grid-cols-2">
          <div className="flex h-[380px] flex-col">
            <ProductFrame url="demo.northstar.so/pricing" label="AI predicted">
              <div className="pointer-events-none absolute inset-0">
                {/* Ghost trail between predicted touchpoints */}
                <svg className="absolute inset-0 h-full w-full">
                  <polyline
                    points="430,180 490,390 265,570 390,530"
                    fill="none"
                    stroke="#8f3212"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    opacity="0.45"
                  />
                </svg>
                {PREDICTIONS.map((p) => (
                  <span
                    key={p.id}
                    style={{ left: `${p.pin.x}%`, top: `${p.pin.y}%` }}
                    className="absolute flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-dashed border-accent-deep/70 bg-canvas/80 text-[11px] font-semibold text-ink-soft"
                  >
                    {p.id}
                  </span>
                ))}
              </div>
            </ProductFrame>
          </div>

          <div className="flex h-[380px] flex-col">
            <ProductFrame url="demo.northstar.so/pricing" label="Humans did">
              <div className="pointer-events-none absolute inset-0">
                {/* Attention blobs from real sessions */}
                {[
                  { x: 57, y: 45, r: 88 },
                  { x: 45, y: 61, r: 62 },
                  { x: 74, y: 46, r: 46 },
                  { x: 26, y: 62, r: 26 },
                ].map((blob) => (
                  <span
                    key={`${blob.x}-${blob.y}`}
                    style={{
                      left: `${blob.x}%`,
                      top: `${blob.y}%`,
                      width: blob.r,
                      height: blob.r,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(242,138,85,0.55),transparent_70%)]"
                  />
                ))}
              </div>
            </ProductFrame>
          </div>
        </div>

        {/* Divergence table */}
        <div className="px-4 pb-8">
          <div className="overflow-hidden rounded-card border-[0.8px] border-line-strong bg-card">
            <header className="grid grid-cols-[1fr_1fr_86px] gap-3 border-b-[0.8px] border-line px-4 py-[10px]">
              <span className="eyebrow">AI predicted</span>
              <span className="eyebrow">Humans did</span>
              <span className="eyebrow text-right">Delta</span>
            </header>

            {DIVERGENCES.map((d) => {
              const isOpen = d.id === openId;
              const clip = CLIPS.find((c) => c.id === d.clipId);

              return (
                <div
                  key={d.id}
                  className="border-b-[0.8px] border-line last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : d.id)}
                    className="grid w-full grid-cols-[1fr_1fr_86px] items-center gap-3 px-4 py-[13px] text-left transition-colors hover:bg-ink/[0.03]"
                  >
                    <span className="text-[13px] leading-snug text-ink-soft">
                      {d.predicted}
                    </span>
                    <span className="text-[13px] font-medium leading-snug">
                      {d.observed}
                    </span>
                    <span className="flex items-center justify-end gap-2">
                      <span
                        className={`rounded-full px-[9px] py-[4px] font-mono text-[11px] ${
                          d.delta > 0
                            ? "bg-accent-deep/[0.12] text-accent-deep"
                            : "bg-ink/[0.06] text-ink-faint"
                        }`}
                      >
                        {d.delta > 0 ? "+" : ""}
                        {d.delta}
                      </span>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t-[0.8px] border-line/70 bg-canvas/50 px-4 py-[14px]">
                      <p className="max-w-[76ch] text-[13px] leading-[1.55] text-ink-soft">
                        {d.note}
                      </p>
                      {clip && (
                        <span className="mt-3 inline-flex items-center gap-2 rounded-[11px] border-[0.8px] border-line bg-card px-3 py-[8px] text-[12px]">
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ink font-mono text-[9px] text-canvas">
                            {clip.initials}
                          </span>
                          {clip.participant} · {clip.screen} · {clip.duration}
                          <ArrowRightIcon className="h-[14px] w-[14px] text-ink-faint" />
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
