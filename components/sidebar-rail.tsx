"use client";

import { useState } from "react";
import { BrandBadge } from "./scout-avatar";
import { PlusIcon, SearchIcon, ReportsIcon } from "./icons";

const NAV = [
  { key: "new", label: "New Run", Icon: PlusIcon },
  { key: "search", label: "Search", Icon: SearchIcon },
  { key: "reports", label: "Reports", Icon: ReportsIcon },
];

const RECENT = [
  { id: "pricing", label: "Pricing clarity" },
  { id: "onboarding", label: "Onboarding trust" },
  { id: "homepage", label: "Homepage concept" },
];

/**
 * Collapsed icon rail that expands to a labelled sidebar on hover, matching
 * the reference behaviour where the rail is 76px at rest.
 */
export function SidebarRail() {
  const [activeRun, setActiveRun] = useState("pricing");

  return (
    <aside className="group/rail relative z-20 flex w-[76px] shrink-0 flex-col bg-rail px-3 pb-3 pt-[18px] shadow-rail backdrop-blur-sm transition-[width] duration-300 ease-out hover:w-[232px]">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-3 px-[6px]">
        <BrandBadge className="h-[38px] w-[38px] shrink-0" />
        <span className="whitespace-nowrap text-[15px] font-medium opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
          playground
        </span>
      </div>

      {/* Primary nav */}
      <nav aria-label="Workspace" className="flex flex-col gap-1">
        {NAV.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            title={label}
            className="flex h-[42px] items-center gap-3 rounded-xl px-[11px] text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
          >
            <Icon className="h-[19px] w-[19px] shrink-0" />
            <span className="whitespace-nowrap text-[13.5px] opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Recent runs */}
      <div className="mt-7 flex flex-col gap-1">
        <span className="eyebrow mb-2 whitespace-nowrap px-[11px] opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
          Recent Runs
        </span>
        {RECENT.map((run) => {
          const isActive = run.id === activeRun;
          return (
            <button
              key={run.id}
              type="button"
              title={run.label}
              onClick={() => setActiveRun(run.id)}
              className={`flex h-[42px] items-center gap-3 rounded-xl px-[11px] transition-colors ${
                isActive
                  ? "bg-accent/[0.12] text-ink ring-1 ring-inset ring-accent/30"
                  : "text-ink-soft hover:bg-ink/[0.05] hover:text-ink"
              }`}
            >
              <span
                className={`h-[7px] w-[7px] shrink-0 rounded-full ${
                  isActive ? "bg-accent" : "bg-ink-faint/60"
                }`}
              />
              <span className="truncate whitespace-nowrap text-[13.5px] opacity-0 transition-opacity duration-200 group-hover/rail:opacity-100">
                {run.label}
              </span>
            </button>
          );
        })}
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
