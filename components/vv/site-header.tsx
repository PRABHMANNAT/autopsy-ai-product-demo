import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";

export function SiteHeader() {
  return (
    <header className="relative z-40 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
      <Brand />
      <nav className="hidden items-center gap-7 text-[13px] font-medium text-white/55 lg:flex">
        <Link className="vv-focus rounded-md transition-colors hover:text-white" href="/#how-it-works">
          How It Works
        </Link>
        <Link className="vv-focus rounded-md transition-colors hover:text-white" href="/#reviewers">
          For Reviewers
        </Link>
        <Link className="vv-focus rounded-md transition-colors hover:text-white" href="/#pinch">
          Powered by Pinch
        </Link>
      </nav>
      <Link
        href="/demo"
        className="vv-focus group inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.055] px-4 text-[13px] font-semibold text-warm transition-colors hover:bg-white/[0.1]"
      >
        Launch Demo
        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </header>
  );
}
