import Link from "next/link";
import { ScanSearch } from "lucide-react";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="vv-focus inline-flex items-center gap-2.5 rounded-lg text-warm"
      aria-label="VentureVerdict home"
    >
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-[10px] border border-violet-400/40 bg-violet-500/15 text-violet-300 shadow-glow">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.2),transparent_44%)]" />
        <ScanSearch className="relative size-[17px]" strokeWidth={2} />
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.025em]">
        Venture<span className="text-white/45">Verdict</span>
      </span>
    </Link>
  );
}

export function PoweredByPinch() {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/45">
      <span className="grid size-5 place-items-center rounded-md bg-white text-[10px] font-black text-[#6545e8]">
        P
      </span>
      Powered by Pinch
    </span>
  );
}
