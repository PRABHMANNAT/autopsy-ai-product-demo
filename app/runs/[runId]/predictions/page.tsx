"use client";

import { useState } from "react";
import { StepHeader } from "@/components/run/step-header";
import { ProductFrame } from "@/components/run/product-frame";
import {
  PREDICTIONS,
  PREDICTION_CATEGORIES,
  type Prediction,
} from "@/lib/demo-run";

export default function PredictionsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(2);

  return (
    <>
      <StepHeader
        step={3}
        title="AI Prediction Map"
        detail={`${PREDICTIONS.length} predicted failures · not yet validated by humans`}
        actions={
          <span className="shrink-0 rounded-full border-[0.8px] border-line-strong bg-card px-[11px] py-[6px] font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Agents only
          </span>
        }
      />

      <div className="flex min-h-0 flex-1">
        {/* Product with predicted-failure pins */}
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <ProductFrame url="demo.northstar.so/pricing">
            <div className="pointer-events-none absolute inset-0">
              {PREDICTIONS.map((p) => {
                const isSelected = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    aria-label={`Prediction ${p.id}: ${p.title}`}
                    style={{ left: `${p.pin.x}%`, top: `${p.pin.y}%` }}
                    className={`pointer-events-auto absolute flex h-[32px] w-[32px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-dashed text-[13px] font-semibold transition-all hover:scale-110 ${
                      isSelected
                        ? "border-accent-deep bg-accent/[0.9] text-ink"
                        : "border-ink-faint/70 bg-canvas/85 text-ink-soft"
                    }`}
                  >
                    {p.id}
                  </button>
                );
              })}
            </div>
          </ProductFrame>
        </div>

        {/* Predictions grouped by category */}
        <aside className="thin-scroll hidden w-[330px] shrink-0 overflow-y-auto border-l-[0.8px] border-line bg-panel px-4 py-4 xl:block">
          {PREDICTION_CATEGORIES.map((category) => {
            const items = PREDICTIONS.filter((p) => p.category === category);
            if (!items.length) return null;

            return (
              <section key={category} className="mb-5">
                <h3 className="eyebrow mb-2">
                  {category} · {items.length}
                </h3>
                <div className="flex flex-col gap-2">
                  {items.map((p) => (
                    <PredictionCard
                      key={p.id}
                      prediction={p}
                      selected={p.id === selectedId}
                      onSelect={() => setSelectedId(p.id)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </aside>
      </div>
    </>
  );
}

function PredictionCard({
  prediction,
  selected,
  onSelect,
}: {
  prediction: Prediction;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-[13px] border-[0.8px] p-3 text-left transition-colors ${
        selected
          ? "border-accent-deep/45 bg-accent/[0.07]"
          : "border-line bg-card hover:bg-card/60"
      }`}
    >
      <span className="flex items-start gap-2">
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-dashed border-ink-faint/70 text-[11px] font-semibold text-ink-soft">
          {prediction.id}
        </span>
        <strong className="flex-1 text-[12.5px] font-semibold leading-snug tracking-[-0.015em]">
          {prediction.title}
        </strong>
      </span>

      <span className="mt-2 block text-[12px] leading-[1.5] text-ink-soft">
        {prediction.body}
      </span>

      {/* Confidence */}
      <span className="mt-[10px] flex items-center gap-2">
        <span className="h-[4px] flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
          <span
            className="block h-full rounded-full bg-accent-deep/70"
            style={{ width: `${prediction.confidence}%` }}
          />
        </span>
        <span className="font-mono text-[10px] text-ink-faint">
          {prediction.confidence}%
        </span>
      </span>
    </button>
  );
}
