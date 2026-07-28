"use client";

import { useState } from "react";
import { BrandBadge } from "@/components/scout-avatar";
import { BrowserChrome } from "./browser-chrome";
import { DemoSite } from "./demo-site";
import { FindingPins } from "./finding-pins";
import { ScoutDock } from "./scout-dock";
import { ScreenTabs } from "./screen-tabs";
import { EvidencePanel } from "./evidence-panel";
import { FINDINGS, SCREENS } from "@/lib/demo-run";

/** Center + right of the preview mode: the product stage and its evidence drawer. */
export function PreviewPanel() {
  const [selectedId, setSelectedId] = useState<number | null>(2);
  const [activeScreen, setActiveScreen] = useState("pricing");
  const [evidenceOpen, setEvidenceOpen] = useState(true);

  const selected = FINDINGS.find((f) => f.id === selectedId);
  const screen = SCREENS.find((s) => s.id === activeScreen);

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-surface">
      <header className="flex items-center gap-3 border-b-[0.8px] border-line/70 px-4 py-[13px]">
        <BrandBadge tone="accent" className="h-[38px] w-[38px] shrink-0" />
        <span className="min-w-0 flex-1">
          <strong className="block truncate text-[14px] font-semibold">
            Pricing clarity test
          </strong>
          <small className="block truncate text-[11.5px] text-ink-faint">
            Live · {SCREENS.length} screens captured
          </small>
        </span>

        <button
          type="button"
          onClick={() => setEvidenceOpen((v) => !v)}
          className={`flex shrink-0 items-center gap-2 rounded-[11px] border-[0.8px] px-[14px] py-[9px] text-[13px] transition-colors ${
            evidenceOpen
              ? "border-line-strong bg-card text-ink"
              : "border-line text-ink-soft hover:bg-ink/[0.05]"
          }`}
        >
          Evidence
          <span className="font-mono text-[11px] text-ink-faint">
            {FINDINGS.length + 5}
          </span>
        </button>

        <button
          type="button"
          className="shrink-0 rounded-[11px] bg-ink px-[14px] py-[9px] text-[13px] font-medium text-canvas transition-colors hover:bg-ink/85"
        >
          4 of 5 testing · Live
        </button>
      </header>

      <div className="grid-texture flex min-h-0 flex-1">
        {/* Product stage */}
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-card border-[0.8px] border-line-strong bg-card shadow-artifact">
            <BrowserChrome url={`demo.northstar.so/${activeScreen}`} />

            <div className="relative min-h-0 flex-1">
              <div className="thin-scroll h-full overflow-auto">
                {/* Pins live inside the scroll content so they stay anchored
                    to the elements they point at. */}
                <div className="relative w-[860px]">
                  <DemoSite />
                  <FindingPins
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
              </div>
              <ScoutDock
                detail={
                  selected
                    ? `Finding ${selected.id} selected`
                    : `Scanning ${screen?.label ?? "screen"}`
                }
              />
            </div>

            <ScreenTabs activeId={activeScreen} onSelect={setActiveScreen} />
          </div>
        </div>

        {evidenceOpen && (
          <EvidencePanel
            selectedId={selectedId}
            onSelect={setSelectedId}
            onClose={() => setEvidenceOpen(false)}
          />
        )}
      </div>
    </section>
  );
}
