"use client";

import { SCREENS } from "@/lib/demo-run";
import {
  CartIcon,
  CheckIcon,
  HomeIcon,
  PriceIcon,
} from "@/components/icons";

const ICONS = {
  home: HomeIcon,
  price: PriceIcon,
  cart: CartIcon,
  check: CheckIcon,
};

/** Captured-screen switcher pinned to the bottom of the product stage. */
export function ScreenTabs({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 border-t-[0.8px] border-line bg-canvas/70 px-3 py-[10px]">
      <div className="thin-scroll flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
        {SCREENS.map((screen) => {
          const Icon = ICONS[screen.icon];
          const isActive = screen.id === activeId;
          return (
            <button
              key={screen.id}
              type="button"
              onClick={() => onSelect(screen.id)}
              className={`flex shrink-0 items-center gap-2 rounded-[10px] border-[0.8px] px-[10px] py-[7px] text-[12.5px] transition-colors ${
                isActive
                  ? "border-accent-deep/45 bg-accent/[0.12] text-ink"
                  : "border-transparent text-ink-soft hover:bg-ink/[0.05]"
              }`}
            >
              <Icon
                className={`h-[14px] w-[14px] ${
                  isActive ? "text-accent-deep" : "text-ink-faint"
                }`}
              />
              {screen.label}
              <span
                className={`rounded-full px-[6px] py-[1px] font-mono text-[10px] ${
                  isActive
                    ? "bg-accent-deep/15 text-accent-deep"
                    : "bg-ink/[0.06] text-ink-faint"
                }`}
              >
                {screen.count}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="shrink-0 rounded-[10px] border-[0.8px] border-line-strong bg-card px-3 py-[8px] text-[12.5px] text-ink-soft transition-colors hover:bg-ink hover:text-canvas"
      >
        Rerun AI scan
      </button>
    </div>
  );
}
