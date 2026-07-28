import { ScoutRobot } from "@/components/scout-avatar";

/** Small floating status chip showing what Scout is currently looking at. */
export function ScoutDock({ detail }: { detail: string }) {
  return (
    <div className="pointer-events-none absolute bottom-[18px] left-[18px] z-20 flex items-center gap-[10px] rounded-[14px] border-[0.8px] border-accent-deep/35 bg-composer px-3 py-[9px] shadow-[0_12px_30px_rgba(75,55,36,0.14)] backdrop-blur">
      <ScoutRobot className="h-[34px] w-[32px]" />
      <span className="min-w-0">
        <span className="block text-[12.5px] font-medium">Scout</span>
        <span className="block truncate text-[11px] text-ink-faint">
          {detail}
        </span>
      </span>
    </div>
  );
}
