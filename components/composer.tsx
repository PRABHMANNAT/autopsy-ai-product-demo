"use client";

import { useRef, useState } from "react";
import { ArrowUpIcon, PlusIcon } from "./icons";

/**
 * Floating input bar pinned to the bottom of the transcript column.
 * Auto-grows to a capped height, submits on Enter (Shift+Enter for newline).
 */
export function Composer({
  onSend,
  placeholder = "Add context, a constraint or a product link…",
}: {
  onSend?: (value: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0;

  function resize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }

  function submit() {
    if (!canSend) return;
    onSend?.(value.trim());
    setValue("");
    requestAnimationFrame(resize);
  }

  return (
    <div className="pointer-events-none sticky bottom-0 z-10 bg-gradient-to-t from-surface/80 to-transparent px-6 pb-6 pt-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="pointer-events-auto mx-auto w-full max-w-[736px] rounded-composer border-[0.8px] border-line-input bg-composer p-[13px] shadow-composer backdrop-blur"
      >
        <label htmlFor="composer" className="sr-only">
          Message Scout
        </label>
        <textarea
          id="composer"
          ref={textareaRef}
          rows={2}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
            resize();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="block w-full resize-none bg-transparent px-[3px] text-[14px] leading-[1.5] outline-none placeholder:text-ink-faint"
        />

        <div className="mt-2 flex items-center gap-3">
          <button
            type="button"
            aria-label="Attach file"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border-[0.8px] border-line-strong text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
          >
            <PlusIcon className="h-4 w-4" />
          </button>

          <span className="flex-1 truncate text-[12px] text-ink-faint">
            Scout · Product testing
          </span>

          <button
            type="submit"
            aria-label="Send message"
            disabled={!canSend}
            className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full transition-colors ${
              canSend
                ? "bg-ink text-canvas hover:bg-ink/85"
                : "bg-ink/[0.07] text-ink-faint"
            }`}
          >
            <ArrowUpIcon className="h-[17px] w-[17px]" />
          </button>
        </div>
      </form>
    </div>
  );
}
