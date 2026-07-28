"use client";

import { useState } from "react";
import { StepHeader } from "@/components/run/step-header";
import { ProductFrame } from "@/components/run/product-frame";
import {
  CLIPS,
  EVENT_LABELS,
  type ClipEvent,
  type EventKind,
} from "@/lib/demo-run";

const EVENT_TINT: Record<EventKind, string> = {
  "dead-click": "bg-accent-deep text-canvas",
  hesitation: "bg-accent text-ink",
  backtrack: "bg-ink text-canvas",
  abandon: "bg-accent-deep text-canvas",
  voice: "bg-success text-canvas",
};

export default function EvidencePage() {
  const [clipId, setClipId] = useState(CLIPS[0].id);
  const [eventAt, setEventAt] = useState<number | null>(null);

  const clip = CLIPS.find((c) => c.id === clipId)!;
  const totalEvents = CLIPS.reduce((sum, c) => sum + c.events.length, 0);

  return (
    <>
      <StepHeader
        step={5}
        title="Behavioural Evidence Capture"
        detail={`${CLIPS.length} session clips · ${totalEvents} captured events`}
      />

      {/* Clip strip */}
      <div className="thin-scroll flex shrink-0 gap-2 overflow-x-auto border-b-[0.8px] border-line/70 bg-panel/60 px-4 py-3">
        {CLIPS.map((c) => {
          const isActive = c.id === clipId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setClipId(c.id);
                setEventAt(null);
              }}
              className={`w-[168px] shrink-0 rounded-[12px] border-[0.8px] p-[9px] text-left transition-colors ${
                isActive
                  ? "border-accent-deep/45 bg-accent/[0.09]"
                  : "border-line bg-card hover:bg-card/60"
              }`}
            >
              {/* Thumbnail stand-in */}
              <span className="flex h-[62px] items-center justify-center rounded-[8px] bg-[linear-gradient(135deg,#fffaf2,#e9e3d9)] text-[10px] text-ink-faint">
                {c.screen}
              </span>
              <span className="mt-2 flex items-center gap-2">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[9px] text-canvas">
                  {c.initials}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium">
                  {c.participant}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-ink-faint">
                  {c.duration}
                </span>
              </span>
              <span
                className={`mt-[6px] block font-mono text-[9.5px] uppercase tracking-[0.12em] ${
                  c.completed ? "text-success" : "text-accent-deep"
                }`}
              >
                {c.completed ? "Completed" : "Abandoned"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Playback */}
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <ProductFrame
            url={`demo.northstar.so/${clip.screen.toLowerCase()}`}
            label={`${clip.participant} · ${clip.screen} · ${clip.duration}`}
          >
            <div className="pointer-events-none absolute inset-0">
              {eventAt !== null && (
                <span
                  style={{ left: "57%", top: `${eventAt}%` }}
                  className="absolute h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border-2 border-accent-deep bg-accent/30"
                />
              )}
            </div>
          </ProductFrame>

          {/* Scrub bar with event markers */}
          <div className="mt-3 shrink-0 rounded-[13px] border-[0.8px] border-line-strong bg-card px-4 py-3">
            <div className="relative h-[6px] rounded-full bg-ink/[0.08]">
              <span className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-ink/25" />
              {clip.events.map((e) => (
                <button
                  key={`${e.kind}-${e.at}`}
                  type="button"
                  onClick={() => setEventAt(e.at)}
                  title={`${EVENT_LABELS[e.kind]} — ${e.label}`}
                  aria-label={`${EVENT_LABELS[e.kind]} at ${e.at}%`}
                  style={{ left: `${e.at}%` }}
                  className={`absolute top-1/2 h-[15px] w-[15px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-card transition-transform hover:scale-125 ${
                    EVENT_TINT[e.kind]
                  }`}
                />
              ))}
            </div>
            <div className="mt-[10px] flex items-center justify-between font-mono text-[10px] text-ink-faint">
              <span>0:00</span>
              <span>{clip.duration}</span>
            </div>
          </div>
        </div>

        {/* Event log */}
        <aside className="thin-scroll hidden w-[320px] shrink-0 overflow-y-auto border-l-[0.8px] border-line bg-panel px-4 py-4 xl:block">
          <h3 className="eyebrow mb-3">
            Events · {clip.events.length}
          </h3>
          <div className="flex flex-col gap-2">
            {clip.events.map((e) => (
              <EventRow
                key={`${e.kind}-${e.at}`}
                event={e}
                selected={eventAt === e.at}
                onSelect={() => setEventAt(e.at)}
              />
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

function EventRow({
  event,
  selected,
  onSelect,
}: {
  event: ClipEvent;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex gap-3 rounded-[13px] border-[0.8px] p-3 text-left transition-colors ${
        selected
          ? "border-accent-deep/45 bg-accent/[0.07]"
          : "border-line bg-card hover:bg-card/60"
      }`}
    >
      <span
        className={`mt-[2px] h-[11px] w-[11px] shrink-0 rounded-full ${
          EVENT_TINT[event.kind]
        }`}
      />
      <span className="min-w-0">
        <span className="block text-[12px] font-semibold">
          {EVENT_LABELS[event.kind]}
        </span>
        <span className="mt-[3px] block text-[11.5px] leading-snug text-ink-soft">
          {event.label}
        </span>
      </span>
    </button>
  );
}
