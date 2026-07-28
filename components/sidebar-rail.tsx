"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandBadge } from "./scout-avatar";
import { PlusIcon, SearchIcon, ReportsIcon } from "./icons";
import { RUN_HISTORY, type VerdictCall } from "@/lib/demo-run";

const NAV = [
  { key: "new", label: "New Run", Icon: PlusIcon, href: "/runs/new" },
  { key: "search", label: "Search", Icon: SearchIcon, href: "/runs/new" },
  { key: "reports", label: "Reports", Icon: ReportsIcon, href: "/runs/new" },
];

const CALL_DOT: Record<VerdictCall, string> = {
  SHIP: "bg-success",
  MODIFY: "bg-accent",
  KILL: "bg-accent-deep",
};

/**
 * Collapsed icon rail that expands on hover. Product memory lives here as a
 * vertical timeline of tested versions rather than a flat list of runs.
 */
export function SidebarRail() {
  const pathname = usePathname();

  return (
    <aside className="group/rail relative z-20 flex w-[76px] shrink-0 flex-col bg-rail px-3 pb-3 pt-[18px] shadow-rail backdrop-blur-sm transition-[width] duration-300 ease-out hover:w-[248px]">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-3 px-[6px]">
        <BrandBadge className="h-[38px] w-[38px] shrink-0" />
        <span className="whitespace-nowrap text-[15px] font-medium opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
          playground
        </span>
      </div>

      {/* Primary nav */}
      <nav aria-label="Workspace" className="flex flex-col gap-1">
        {NAV.map(({ key, label, Icon, href }) => (
          <Link
            key={key}
            href={href}
            title={label}
            className="flex h-[42px] items-center gap-3 rounded-xl px-[11px] text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
          >
            <Icon className="h-[19px] w-[19px] shrink-0" />
            <span className="whitespace-nowrap text-[13.5px] opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Product memory */}
      <div className="mt-7 min-h-0 flex-1">
        <span className="eyebrow mb-2 block whitespace-nowrap px-[11px] opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
          Pricing page · memory
        </span>

        <ol className="thin-scroll max-h-full overflow-y-auto">
          {RUN_HISTORY.map((run, i) => {
            const isLast = i === RUN_HISTORY.length - 1;
            const isActive = pathname.includes(run.version.replace(".", "-"));

            return (
              <li key={run.version} className="relative">
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute left-[19px] top-[30px] h-[calc(100%-30px)] w-[1.5px] bg-line"
                  />
                )}
                <Link
                  href={`/runs/${run.version.replace(".", "-")}/verdict`}
                  title={`${run.version} — ${run.headline}`}
                  className={`group/run relative flex items-center gap-3 rounded-xl px-[11px] py-[8px] transition-colors ${
                    isActive ? "bg-accent/[0.12]" : "hover:bg-ink/[0.05]"
                  }`}
                >
                  <span
                    className={`relative z-10 h-[9px] w-[9px] shrink-0 rounded-full ring-[3px] ring-rail ${
                      CALL_DOT[run.call]
                    }`}
                  />
                  <span className="min-w-0 opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
                    <span className="flex items-baseline gap-2">
                      <span className="whitespace-nowrap font-mono text-[12px] font-medium">
                        {run.version}
                      </span>
                      <span className="whitespace-nowrap text-[10.5px] text-ink-faint">
                        {run.date}
                      </span>
                    </span>
                    <span className="block truncate whitespace-nowrap text-[11.5px] text-ink-soft">
                      {run.headline}
                    </span>
                    {/* Diff summary, revealed per-node on hover */}
                    <span className="mt-[3px] hidden truncate whitespace-nowrap text-[10.5px] text-ink-faint group-hover/run:block">
                      {run.changed}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Account */}
      <button
        type="button"
        title="Adhiraj Dogra"
        className="mt-auto flex items-center gap-3 rounded-xl px-[7px] py-2 text-left transition-colors hover:bg-ink/[0.05]"
      >
        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[11px] tracking-wider text-canvas">
          AD
        </span>
        <span className="min-w-0 opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
          <span className="block truncate whitespace-nowrap text-[13px] font-medium">
            Adhiraj Dogra
          </span>
          <span className="block truncate whitespace-nowrap text-[11.5px] text-ink-faint">
            Founder workspace
          </span>
        </span>
      </button>
    </aside>
  );
}
