"use client";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  FlaskConical,
  Home,
  ScanSearch,
  Sparkles,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  CAMPAIGN_TIMELINE,
  EXPECTED_EVIDENCE,
} from "@/lib/demo-data";
import { AmbientBackground } from "./ambient-background";
import { Brand, PoweredByPinch } from "./brand";

const timelineIcons = [
  CheckCircle2,
  UsersRound,
  UserCheck,
  Fingerprint,
  FileCheck2,
];

function shortenIdentifier(value: string | null): string {
  if (!value) return "Not returned";
  if (value.length <= 18) return value;
  return `${value.slice(0, 9)}…${value.slice(-6)}`;
}

export function SuccessExperience() {
  const searchParams = useSearchParams();
  const [initiated, setInitiated] = useState(false);
  const paymentId = searchParams.get("paymentId");
  const paymentLinkId = searchParams.get("paymentLinkId");
  const isSimulation = searchParams.get("sim") === "1";

  useEffect(() => {
    const timer = window.setTimeout(() => setInitiated(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const displayIdentifier = useMemo(
    () => shortenIdentifier(paymentId ?? paymentLinkId),
    [paymentId, paymentLinkId]
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-hero-radial">
      <AmbientBackground />
      <header className="relative z-40 mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Brand />
        <PoweredByPinch />
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-78px)] w-full max-w-[1320px] items-center gap-10 px-5 pb-12 pt-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 17 }}
            className="relative mb-9 grid size-[148px] place-items-center"
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-acid/15"
              animate={{ scale: [0.86, 1.22], opacity: [0.8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-acid/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ borderStyle: "dashed" }}
            />
            <div className="absolute inset-7 rounded-full bg-acid/[0.08] blur-xl" />
            <div className="relative grid size-[82px] place-items-center rounded-full border border-acid/35 bg-acid/[0.1] text-acid shadow-acid">
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Check className="size-9" strokeWidth={2.4} />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="vv-kicker">
              <span className="size-1.5 rounded-full bg-acid shadow-acid" />
              Pinch checkout completed
            </span>
            <h1 className="mt-5 text-[clamp(3.2rem,6vw,6.7rem)] font-semibold leading-[0.9] tracking-[-0.072em] text-warm">
              Validation
              <br />
              round funded.
            </h1>
            <p className="mt-6 max-w-[510px] text-[16px] leading-7 text-white/46">
              Playground is matching your product with the right reviewers.
            </p>
          </motion.div>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/43">
              <ScanSearch className="size-3.5 text-violet-300" />
              {displayIdentifier}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={initiated ? "initiated" : "awaiting"}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] ${
                  initiated
                    ? "border-acid/18 bg-acid/[0.05] text-acid"
                    : "border-[#ffbd5b]/18 bg-[#ffbd5b]/[0.05] text-[#ffcf7a]"
                }`}
              >
                <span className="size-1.5 animate-pulse rounded-full bg-current" />
                {initiated
                  ? "Validation campaign initiated"
                  : "Awaiting webhook confirmation"}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/demo" className="vv-button-primary group">
              Run the demo again
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/" className="vv-button-secondary">
              <Home className="size-4" />
              Back to home
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 }}
            className="vv-card overflow-hidden p-5 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
                  Campaign progression
                </p>
                <h2 className="mt-2 text-[19px] font-semibold">What happens next</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.06] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-violet-200">
                <FlaskConical className="size-3" />
                {isSimulation ? "Demo mode" : "Pinch return"}
              </span>
            </div>

            <div className="relative mt-7">
              <div className="absolute bottom-5 left-[19px] top-5 w-px bg-white/[0.08]">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: initiated ? "30%" : "12%" }}
                  transition={{ duration: 0.7 }}
                  className="w-px bg-acid shadow-acid"
                />
              </div>
              <div className="space-y-2.5">
                {CAMPAIGN_TIMELINE.map((item, index) => {
                  const Icon = timelineIcons[index];
                  const active = index === 0 || (initiated && index === 1);
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 + index * 0.07 }}
                      key={item}
                      className={`relative flex min-h-[54px] items-center gap-4 rounded-[14px] border px-3.5 ${
                        active
                          ? "border-acid/13 bg-acid/[0.035]"
                          : "border-transparent text-white/30"
                      }`}
                    >
                      <span
                        className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-xl border ${
                          active
                            ? "border-acid/25 bg-[#151a10] text-acid"
                            : "border-white/[0.08] bg-graphite-900 text-white/23"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div className="flex flex-1 items-center justify-between">
                        <p className={`text-[12px] font-medium ${active ? "text-warm" : ""}`}>
                          {item}
                        </p>
                        <span className="font-mono text-[8px] uppercase tracking-[0.12em]">
                          {index === 0
                            ? "Received"
                            : initiated && index === 1
                              ? "In progress"
                              : "Queued"}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-[1fr_.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="vv-card p-5"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-violet-300" />
                <h2 className="text-[13px] font-semibold">Expected evidence</h2>
              </div>
              <div className="mt-4 space-y-2.5">
                {EXPECTED_EVIDENCE.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[11px] text-white/48">
                    <span className="grid size-5 place-items-center rounded-full border border-acid/16 bg-acid/[0.04] text-acid">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38 }}
              className="relative overflow-hidden rounded-[22px] border border-violet-400/20 bg-violet-500/[0.08] p-5"
            >
              <div className="absolute -right-12 -top-12 size-32 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative">
                <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-violet-300">
                  Final callout
                </p>
                <p className="mt-4 text-[24px] font-semibold leading-[1.05] tracking-[-0.045em]">
                  Stop guessing.
                  <br />
                  <span className="text-violet-300">Launch with evidence.</span>
                </p>
                <p className="mt-5 text-[9px] leading-4 text-white/30">
                  Sandbox payment powered by Pinch
                </p>
              </div>
            </motion.div>
          </div>

          <div className="rounded-[16px] border border-[#ffbd5b]/12 bg-[#ffbd5b]/[0.035] px-4 py-3.5 text-[10px] leading-5 text-white/38">
            <strong className="font-semibold text-[#ffcf7a]">Payment status:</strong>{" "}
            Awaiting webhook confirmation. In production, final payment status is
            confirmed through a verified Pinch webhook; returning from checkout does
            not prove settlement.
          </div>
        </div>
      </section>
    </main>
  );
}
