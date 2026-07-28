"use client";

import { useState } from "react";
import { BrandBadge, ScoutRobot } from "./scout-avatar";
import { RunArtifact } from "./run-artifact";
import { Composer } from "./composer";
import { DEMO_CONVERSATION, type Message } from "@/lib/demo-conversation";

/**
 * Center column: sticky header, scrolling transcript, floating composer.
 * When `compact` is set the preview stage is open beside it, so the hero and
 * the max-width cap are dropped and the column becomes a fixed side rail.
 */
export function ChatFeed({
  compact = false,
  onOpenPreview,
  onClosePreview,
}: {
  compact?: boolean;
  onOpenPreview?: () => void;
  onClosePreview?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(DEMO_CONVERSATION);

  function handleSend(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: `m${prev.length + 1}`, role: "user", text },
    ]);
  }

  return (
    <section
      className={`grid-texture relative flex flex-col ${
        compact
          ? "w-[360px] shrink-0 border-r-[0.8px] border-line xl:w-[400px]"
          : "min-w-0 flex-1"
      }`}
    >
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b-[0.8px] border-line/70 bg-surface/85 px-6 py-[14px] backdrop-blur">
        <h1 className="text-[14px] font-semibold">Pricing clarity</h1>
        <span className="text-ink-faint">·</span>
        <span className="text-[13.5px] text-ink-faint">
          {compact ? "Live test" : "Scout"}
        </span>
        {compact && (
          <button
            type="button"
            onClick={onClosePreview}
            className="ml-auto shrink-0 rounded-[11px] border-[0.8px] border-line-strong bg-card px-[14px] py-[8px] text-[12.5px] font-medium transition-colors hover:bg-ink hover:text-canvas"
          >
            Close preview
          </button>
        )}
      </header>

      <div className="thin-scroll flex-1 overflow-y-auto">
        <div
          className={`mx-auto w-full px-6 ${compact ? "" : "max-w-[736px]"}`}
        >
          {!compact && <EmptyStateHero />}

          <div className={`flex flex-col gap-[18px] pb-4 ${compact ? "pt-5" : ""}`}>
            {messages.map((message) =>
              message.role === "artifact" ? (
                <RunArtifact
                  key={message.id}
                  compact={compact}
                  onOpen={onOpenPreview}
                />
              ) : (
                <MessageRow
                  key={message.id}
                  message={message}
                  compact={compact}
                />
              ),
            )}
          </div>
        </div>
      </div>

      <Composer
        onSend={handleSend}
        placeholder={
          compact
            ? "Ask Scout about this screen or finding…"
            : "Add context, a constraint or a product link…"
        }
      />
    </section>
  );
}

function EmptyStateHero() {
  return (
    <div className="flex flex-col items-center pb-10 pt-14 text-center">
      <ScoutRobot className="h-[168px] w-[158px]" />
      <p className="mt-4 font-mono text-[15px] uppercase tracking-[0.42em] text-ink">
        Scout
      </p>
      <p className="eyebrow mt-[6px]">Product testing agent</p>
      <h2 className="mt-6 text-[45px] font-semibold leading-[1.02] tracking-tightest">
        What are we testing?
      </h2>
      <p className="mt-[10px] text-[14.5px] text-ink-soft">
        Dump the context. Scout will make it testable.
      </p>
    </div>
  );
}

function MessageRow({
  message,
  compact,
}: {
  message: Extract<Message, { role: "agent" | "user" }>;
  compact: boolean;
}) {
  const size = compact ? "text-[13.5px]" : "text-[14.5px]";

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p
          className={`max-w-[86%] rounded-[18px_18px_5px_18px] border-[0.8px] border-[#c9bfb3] bg-bubble px-4 py-[13px] leading-[1.5] shadow-bubble ${size}`}
        >
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <BrandBadge tone="accent" className="mt-[2px] h-[30px] w-[30px] shrink-0" />
      <div className="min-w-0 pt-[3px]">
        <span className="block text-[12.5px] font-medium">Scout</span>
        <p className={`mt-[5px] max-w-[62ch] leading-[1.55] text-ink ${size}`}>
          {message.text}
        </p>
      </div>
    </div>
  );
}
