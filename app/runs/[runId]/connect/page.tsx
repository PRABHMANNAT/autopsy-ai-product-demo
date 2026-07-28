"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { StepHeader } from "@/components/run/step-header";
import { Composer } from "@/components/composer";
import {
  PRODUCT_SOURCES,
  DECISION_EXAMPLES,
  type SourceKind,
} from "@/lib/demo-run";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

export default function ConnectPage() {
  const params = useParams();
  const runId = (params.runId as string) ?? "pricing-page";

  const [source, setSource] = useState<SourceKind | null>(null);
  const [address, setAddress] = useState("");
  const [decision, setDecision] = useState("");

  const connected = source !== null && address.trim().length > 0;
  const ready = connected && decision.trim().length > 0;
  const active = PRODUCT_SOURCES.find((s) => s.kind === source);

  return (
    <>
      <StepHeader
        step={1}
        title="Connect the product"
        detail="Point Scout at something it can actually operate"
      />

      <div className="thin-scroll flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-6 py-10">
          {/* Step 1 — source */}
          <div className="grid gap-3 sm:grid-cols-3">
            {PRODUCT_SOURCES.map((option) => {
              const isActive = option.kind === source;
              return (
                <button
                  key={option.kind}
                  type="button"
                  onClick={() => setSource(option.kind)}
                  className={`rounded-card border-[0.8px] p-4 text-left transition-colors ${
                    isActive
                      ? "border-accent-deep/45 bg-accent/[0.09]"
                      : "border-line-strong bg-card hover:bg-card/60"
                  }`}
                >
                  <span
                    className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-[11px] font-medium ${
                      isActive
                        ? "bg-accent-deep text-canvas"
                        : "bg-ink/[0.06] text-ink-faint"
                    }`}
                  >
                    {isActive ? <CheckIcon className="h-[13px] w-[13px]" /> : ""}
                  </span>
                  <strong className="mt-3 block text-[14px] font-semibold tracking-[-0.02em]">
                    {option.title}
                  </strong>
                  <span className="mt-[5px] block text-[12px] leading-snug text-ink-soft">
                    {option.blurb}
                  </span>
                </button>
              );
            })}
          </div>

          {active && (
            <div className="mt-4 rounded-card border-[0.8px] border-line-strong bg-card p-4">
              <label
                htmlFor="source-address"
                className="eyebrow block text-accent-deep"
              >
                {active.title}
              </label>
              <input
                id="source-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={active.placeholder}
                className="mt-[10px] w-full rounded-[11px] border-[0.8px] border-line-input bg-composer px-[13px] py-[11px] text-[14px] outline-none placeholder:text-ink-faint focus:border-accent-deep/50"
              />
            </div>
          )}

          {/* Step 2 — the one decision */}
          <div
            className={`mt-8 transition-opacity ${
              connected ? "opacity-100" : "pointer-events-none opacity-40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-accent/[0.14] font-mono text-[12px] font-medium text-accent-deep">
                2
              </span>
              <span>
                <h2 className="text-[14px] font-semibold">
                  Define one decision
                </h2>
                <p className="text-[11.5px] text-ink-faint">
                  One question. A run that answers three answers none.
                </p>
              </span>
            </div>

            <div className="mt-4 rounded-card border-[0.8px] border-line-strong bg-card p-4">
              <input
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="What decision is this run settling?"
                className="w-full rounded-[11px] border-[0.8px] border-line-input bg-composer px-[13px] py-[11px] text-[14px] outline-none placeholder:text-ink-faint focus:border-accent-deep/50"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {DECISION_EXAMPLES.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setDecision(example)}
                    className="rounded-full border-[0.8px] border-line bg-canvas/70 px-[11px] py-[6px] text-[11.5px] text-ink-soft transition-colors hover:border-accent-deep/40 hover:text-ink"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Link
            href={ready ? `/runs/${runId}/predictions` : "#"}
            aria-disabled={!ready}
            className={`mt-6 flex items-center justify-between rounded-card px-4 py-[14px] text-[13.5px] font-medium transition-colors ${
              ready
                ? "bg-ink text-canvas hover:bg-ink/85"
                : "pointer-events-none bg-ink/[0.07] text-ink-faint"
            }`}
          >
            Generate the prediction map
            <ArrowRightIcon className="h-[16px] w-[16px]" />
          </Link>
        </div>
      </div>

      {/* Chat only becomes available once there is something to talk about. */}
      {ready && (
        <Composer placeholder="Add a constraint, a persona or a flow to focus on…" />
      )}
    </>
  );
}
