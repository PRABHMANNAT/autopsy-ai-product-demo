import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  RefreshIcon,
} from "@/components/icons";

/** Fake browser toolbar wrapping the product under test. */
export function BrowserChrome({ url }: { url: string }) {
  const navButton =
    "flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-ink/[0.06] hover:text-ink";

  return (
    <div className="flex items-center gap-[6px] border-b-[0.8px] border-line bg-canvas/60 px-3 py-[9px]">
      <button type="button" aria-label="Go back" className={navButton}>
        <ArrowLeftIcon className="h-[15px] w-[15px]" />
      </button>
      <button type="button" aria-label="Go forward" className={navButton}>
        <ArrowRightIcon className="h-[15px] w-[15px]" />
      </button>
      <button type="button" aria-label="Refresh" className={navButton}>
        <RefreshIcon className="h-[15px] w-[15px]" />
      </button>

      <div className="mx-1 flex min-w-0 flex-1 items-center gap-2 rounded-full border-[0.8px] border-line bg-bubble/60 px-3 py-[6px]">
        <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-ink-faint/70" />
        <span className="truncate text-center text-[12.5px] text-ink-soft">
          {url}
        </span>
      </div>

      <span className="flex shrink-0 items-center gap-[6px] rounded-full px-2 py-[4px] font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-deep">
        <span className="h-[6px] w-[6px] animate-pulse rounded-full bg-accent-deep" />
        Recording
      </span>

      <button
        type="button"
        aria-label="Open externally"
        className={navButton}
      >
        <ArrowUpRightIcon className="h-[15px] w-[15px]" />
      </button>
    </div>
  );
}
