"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Check,
  Fingerprint,
  ScanSearch,
  Sparkles,
  UsersRound,
} from "lucide-react";

const stages = [
  {
    index: "01",
    title: "Idea Autopsy",
    caption: "Pattern intelligence",
    icon: Fingerprint,
    signal: "1,247 comparisons",
  },
  {
    index: "02",
    title: "Product Audit",
    caption: "4 specialist agents",
    icon: ScanSearch,
    signal: "21 risks mapped",
  },
  {
    index: "03",
    title: "Human Verdict",
    caption: "Matched reviewer panel",
    icon: UsersRound,
    signal: "108 humans ready",
  },
];

export function PipelineVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.18 }}
      className="relative mx-auto w-full max-w-[570px]"
      aria-label="Three-stage startup validation pipeline"
    >
      <div className="absolute -inset-12 rounded-full bg-violet-500/[0.08] blur-[80px]" />
      <div className="vv-card relative overflow-hidden p-3 shadow-glow sm:p-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-2 pb-3 pt-1">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            <span className="size-1.5 rounded-full bg-acid shadow-acid" />
            Validation engine
          </div>
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-white/15" />
            <span className="size-1.5 rounded-full bg-white/15" />
            <span className="size-1.5 rounded-full bg-violet-400/70" />
          </div>
        </div>

        <div className="relative space-y-2 py-3">
          <div className="absolute bottom-[56px] left-[30px] top-[56px] w-px bg-white/[0.08] sm:left-[35px]">
            {[0, 1, 2].map((packet) => (
              <motion.span
                key={packet}
                className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(167,139,250,.9)]"
                animate={{ y: [0, 188, 376], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: packet * 1.12,
                }}
              />
            ))}
          </div>

          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                className="relative grid min-h-[114px] grid-cols-[50px_1fr_auto] items-center gap-3 rounded-[18px] border border-white/[0.07] bg-black/20 px-3 py-4 sm:grid-cols-[58px_1fr_auto] sm:px-4"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,.07)",
                    "rgba(129,91,255,.42)",
                    "rgba(255,255,255,.07)",
                  ],
                  backgroundColor: [
                    "rgba(0,0,0,.2)",
                    "rgba(129,91,255,.07)",
                    "rgba(0,0,0,.2)",
                  ],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  delay: index * 1.2,
                  ease: "easeInOut",
                }}
              >
                <div className="relative z-10 grid size-10 place-items-center rounded-[13px] border border-violet-400/25 bg-violet-500/10 text-violet-300 sm:size-11">
                  <Icon className="size-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[9px] tracking-[0.18em] text-white/25">
                      {stage.index}
                    </span>
                    <span className="h-px w-5 bg-white/10" />
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-warm">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-white/40">{stage.caption}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/15 bg-acid/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-acid/80">
                    {index === 2 ? (
                      <Check className="size-3" />
                    ) : index === 1 ? (
                      <Activity className="size-3" />
                    ) : (
                      <Sparkles className="size-3" />
                    )}
                    {stage.signal}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.13em] text-white/30">
          <span>Evidence pipeline / online</span>
          <span className="text-acid/70">Signal integrity 94.8%</span>
        </div>
      </div>
    </motion.div>
  );
}
