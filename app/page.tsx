import Link from "next/link";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import {
  Counter,
  Item,
  Reveal,
  Stagger,
  rise,
} from "@/components/pg/motion";
import { AmbientBackground } from "@/components/vv/ambient-background";
import { PipelineVisual } from "@/components/vv/pipeline-visual";
import { SiteHeader } from "@/components/vv/site-header";

const signals = [
  {
    value: 1247,
    label: "Comparable ventures examined",
    icon: Sparkles,
    color: "text-violet-300",
  },
  {
    value: 21,
    label: "Product risks detected",
    icon: ShieldCheck,
    color: "text-ember",
  },
  {
    value: 108,
    label: "Human reviewers matched",
    icon: UsersRound,
    color: "text-acid",
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-hero-radial">
      <AmbientBackground />
      <SiteHeader />

      <section className="mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-[1440px] items-center gap-10 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[1.03fr_.97fr] lg:gap-14 lg:px-12 lg:pb-8 lg:pt-4">
        <div className="relative z-10 max-w-[760px]">
          <Reveal>
            <span className="vv-kicker">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-violet-300" />
              </span>
              AI + Human Startup Validation
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-[790px] text-[clamp(3.15rem,6.2vw,6.7rem)] font-semibold leading-[0.91] tracking-[-0.072em] text-warm">
              Kill bad ideas{" "}
              <span className="relative whitespace-nowrap text-white/34 after:absolute after:-bottom-1 after:left-0 after:h-[3px] after:w-full after:-rotate-1 after:rounded-full after:bg-violet-500/70 after:content-['']">
                before
              </span>{" "}
              they kill your runway.
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[660px] text-[17px] leading-7 text-white/52 sm:text-[19px] sm:leading-8">
              Run an AI startup autopsy, audit your product and recruit the right
              humans to validate it—all before your next major investment.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="vv-button-primary group"
              >
                Autopsy My Startup
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/demo" className="vv-button-secondary group">
                <span className="grid size-6 place-items-center rounded-full border border-white/15 bg-white/[0.05]">
                  <Play className="ml-0.5 size-3 fill-current" />
                </span>
                Watch 60-sec Demo
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div id="pinch" className="mt-8 flex items-center gap-3 text-[12px] text-white/30">
              <span className="grid size-5 place-items-center rounded-md bg-white font-black text-[#6747e9]">
                P
              </span>
              Payments powered by Pinch
              <span className="h-3 w-px bg-white/10" />
              No card required to explore
            </div>
          </Reveal>
        </div>

        <div id="how-it-works" className="relative z-10 lg:pl-2">
          <PipelineVisual />
        </div>

        <div id="reviewers" className="lg:col-span-2 lg:-mt-5">
          <Stagger
            className="grid gap-2.5 rounded-[22px] border border-white/[0.08] bg-black/20 p-2.5 backdrop-blur-xl md:grid-cols-3"
            delay={0.28}
            step={0.07}
          >
            {signals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <Item
                  key={signal.label}
                  variants={rise}
                  className="group flex min-h-[78px] items-center gap-4 rounded-2xl border border-white/[0.055] bg-white/[0.025] px-4 py-3 transition-colors hover:bg-white/[0.045]"
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-black/20 ${signal.color}`}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="font-mono text-[20px] font-medium tabular-nums tracking-[-0.04em] text-warm">
                      {index === 0 ? (
                        <Counter value={signal.value} format="int" duration={1100} />
                      ) : (
                        <Counter value={signal.value} format="int" duration={900} />
                      )}
                    </p>
                    <p className="mt-0.5 text-[12px] text-white/38">{signal.label}</p>
                  </div>
                </Item>
              );
            })}
          </Stagger>
          <p className="mt-2.5 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white/22">
            Demonstration data
          </p>
        </div>
      </section>
    </main>
  );
}
