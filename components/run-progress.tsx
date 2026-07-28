import { CheckIcon, DotsIcon, SquareIcon } from "./icons";

type Step = {
  title: string;
  detail: string;
  state: "done" | "active";
  badge?: string;
};

const STEPS: Step[] = [
  {
    title: "Brief understood",
    detail: "Product, user and decision extracted",
    state: "done",
  },
  {
    title: "Test plan generated",
    detail: "4 screens · 3 success gates",
    state: "done",
  },
  {
    title: "Product connected",
    detail: "Navigable staging experience",
    state: "done",
  },
  {
    title: "Human review live",
    detail: "4 of 5 participants active",
    state: "active",
    badge: "4",
  },
];

/** Right-hand status column: 270px, tinted panel, no grid texture. */
export function RunProgress() {
  return (
    <aside className="hidden w-[270px] shrink-0 flex-col bg-panel px-[18px] py-[25px] backdrop-blur-sm lg:flex">
      <header className="mb-1 flex items-center justify-between">
        <h2 className="text-[13.5px] font-medium">Run progress</h2>
        <button
          type="button"
          aria-label="Run options"
          className="rounded-md p-1 text-ink-faint transition-colors hover:bg-ink/[0.05] hover:text-ink"
        >
          <DotsIcon className="h-4 w-4" />
        </button>
      </header>

      <ol className="flex flex-col gap-[22px] py-6">
        {STEPS.map((step) => (
          <li key={step.title} className="flex gap-3">
            <span
              className={`mt-[1px] flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                step.state === "done"
                  ? "bg-success/[0.08] text-success ring-1 ring-inset ring-success/35"
                  : "bg-accent/[0.14] text-accent-deep ring-1 ring-inset ring-accent-deep/25"
              }`}
            >
              {step.state === "done" ? (
                <CheckIcon className="h-[13px] w-[13px]" />
              ) : (
                step.badge
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-medium leading-snug">
                {step.title}
              </span>
              <span className="mt-[3px] block text-[11.5px] leading-snug text-ink-faint">
                {step.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {/* Live workspace shortcut */}
      <div className="flex items-center gap-3 rounded-[14px] border border-line-strong/70 bg-card p-3 shadow-[0_10px_28px_rgba(75,55,36,0.07)]">
        <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-accent/[0.14] text-accent-deep">
          <SquareIcon className="h-[15px] w-[15px]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-medium">
            Pricing clarity test
          </span>
          <span className="block truncate text-[11px] text-ink-faint">
            Live product workspace
          </span>
        </span>
        <button
          type="button"
          className="shrink-0 rounded-lg px-2 py-1 text-[11.5px] text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
        >
          Open
        </button>
      </div>
    </aside>
  );
}
