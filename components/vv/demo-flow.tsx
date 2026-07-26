"use client";

import {
  Accessibility,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Crown,
  Eye,
  Fingerprint,
  FlaskConical,
  Landmark,
  Lightbulb,
  Loader2,
  LockKeyhole,
  MousePointer2,
  Network,
  RotateCcw,
  ScanSearch,
  Sparkles,
  Target,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  AUDIT_AGENTS,
  AUDIT_FINDINGS,
  CAMPAIGN_BREAKDOWN,
  FAILURE_PATTERNS,
  RECOMMENDED_PIVOT,
  REPORT_METRICS,
  REVIEWER_CATEGORIES,
  SCAN_LINES,
  STAGE_OPTIONS,
  STARTUP_IDEA,
  WINNING_PATTERN,
  type DemoStage,
} from "@/lib/demo-data";
import { startPinchCheckout } from "@/lib/pinch-checkout";
import { AmbientBackground } from "./ambient-background";
import { Brand, PoweredByPinch } from "./brand";

const spring = { type: "spring", stiffness: 110, damping: 20 } as const;
const stageOrder: DemoStage[] = [
  "input",
  "scanning",
  "report",
  "audit",
  "campaign",
];

function DemoHeader({
  stage,
  onReset,
}: {
  stage: DemoStage;
  onReset: () => void;
}) {
  const step =
    stage === "input" || stage === "scanning" || stage === "report"
      ? 1
      : stage === "audit"
        ? 2
        : 3;

  return (
    <header className="relative z-40 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
      <Brand />
      <div className="hidden items-center rounded-full border border-white/[0.08] bg-white/[0.025] p-1 md:flex">
        {["Autopsy", "Audit", "Humans"].map((label, index) => {
          const itemStep = index + 1;
          const active = itemStep === step;
          const complete = itemStep < step;
          return (
            <div
              key={label}
              className={`flex min-w-[104px] items-center justify-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors ${
                active
                  ? "bg-violet-500/16 text-violet-200"
                  : complete
                    ? "text-acid/80"
                    : "text-white/28"
              }`}
            >
              <span
                className={`grid size-4 place-items-center rounded-full border font-mono text-[8px] ${
                  active
                    ? "border-violet-400/45"
                    : complete
                      ? "border-acid/35"
                      : "border-white/10"
                }`}
              >
                {complete ? <Check className="size-2.5" /> : itemStep}
              </span>
              {label}
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="vv-focus inline-flex min-h-9 items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-3.5 text-[12px] font-medium text-white/55 transition-colors hover:bg-white/[0.07] hover:text-white"
      >
        <RotateCcw className="size-3.5" />
        Reset Demo
      </button>
    </header>
  );
}

function StateFrame({
  stateKey,
  children,
  className = "",
}: {
  stateKey: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      key={stateKey}
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -14, filter: "blur(7px)" }}
      transition={spring}
      className={`mx-auto w-full max-w-[1360px] px-5 pb-12 pt-6 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionKicker({ children }: { children: ReactNode }) {
  return (
    <span className="vv-kicker">
      <span className="size-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,.8)]" />
      {children}
    </span>
  );
}

function InputState({ onRun }: { onRun: () => void }) {
  const [selected, setSelected] = useState("ideation");

  return (
    <StateFrame stateKey="input" className="flex min-h-[calc(100vh-84px)] items-center">
      <div className="mx-auto grid w-full max-w-[1180px] gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
        <div className="pb-2">
          <SectionKicker>Case intake / 01</SectionKicker>
          <h1 className="mt-5 max-w-[440px] text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-warm">
            What are you building?
          </h1>
          <p className="mt-5 max-w-[430px] text-[16px] leading-7 text-white/45">
            Give the thesis to the autopsy engine. It will compare your idea
            against patterns from winners, failures and near-misses.
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/25">
            <Fingerprint className="size-4 text-violet-300/60" />
            Simulated intelligence · demonstration data
          </div>
        </div>

        <div className="vv-card overflow-hidden border-violet-400/15 bg-graphite-900/80 shadow-glow">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/32">
              Venture brief
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-acid/70">
              <span className="size-1.5 rounded-full bg-acid" />
              Ready for analysis
            </span>
          </div>
          <div className="p-5 sm:p-7">
            <label
              htmlFor="startup-idea"
              className="mb-3 block text-[13px] font-medium text-white/55"
            >
              Startup thesis
            </label>
            <textarea
              id="startup-idea"
              defaultValue={STARTUP_IDEA}
              rows={5}
              className="vv-focus w-full resize-none rounded-[18px] border border-white/[0.09] bg-black/25 p-5 text-[18px] leading-8 tracking-[-0.015em] text-warm placeholder:text-white/25"
            />

            <fieldset className="mt-5">
              <legend className="mb-3 text-[13px] font-medium text-white/55">
                Current stage
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {STAGE_OPTIONS.map((option, index) => {
                  const Icon =
                    index === 0
                      ? Lightbulb
                      : index === 1
                        ? FlaskConical
                        : UsersRound;
                  const active = selected === option.id;
                  return (
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      key={option.id}
                      onClick={() => setSelected(option.id)}
                      className={`vv-focus rounded-[16px] border p-4 text-left transition-colors ${
                        active
                          ? "border-violet-400/45 bg-violet-500/[0.12]"
                          : "border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon
                          className={`size-4 ${
                            active ? "text-violet-300" : "text-white/30"
                          }`}
                        />
                        <span
                          className={`size-2 rounded-full ${
                            active
                              ? "bg-violet-300 shadow-[0_0_10px_rgba(167,139,250,.9)]"
                              : "bg-white/10"
                          }`}
                        />
                      </div>
                      <p className="mt-5 text-[14px] font-semibold text-warm">
                        {option.title}
                      </p>
                      <p className="mt-1 text-[11px] text-white/34">{option.detail}</p>
                    </motion.button>
                  );
                })}
              </div>
            </fieldset>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              type="button"
              onClick={onRun}
              className="vv-button-primary mt-6 w-full rounded-[16px]"
            >
              <ScanSearch className="size-4" />
              Run Startup Autopsy
              <ArrowRight className="ml-auto size-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </StateFrame>
  );
}

function ScanningState({
  lineIndex,
  count,
}: {
  lineIndex: number;
  count: number;
}) {
  return (
    <StateFrame
      stateKey="scanning"
      className="flex min-h-[calc(100vh-84px)] items-center justify-center"
    >
      <div className="grid w-full max-w-[1040px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative mx-auto grid size-[290px] place-items-center sm:size-[360px]">
          <div className="absolute inset-0 rounded-full border border-violet-400/10" />
          <div className="absolute inset-8 rounded-full border border-dashed border-violet-400/20 animate-[spin_16s_linear_infinite]" />
          <div className="absolute inset-[72px] rounded-full border border-white/[0.08]" />
          <motion.div
            className="absolute inset-4 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(129,91,255,.5) 35deg, transparent 90deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute h-px w-[48%] origin-left bg-gradient-to-r from-violet-300 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
          />
          {[0, 1, 2, 3, 4, 5].map((dot) => (
            <motion.span
              key={dot}
              className="absolute size-2 rounded-full bg-violet-300"
              style={{
                left: `${20 + ((dot * 29) % 67)}%`,
                top: `${17 + ((dot * 41) % 69)}%`,
              }}
              animate={{ scale: [0.5, 1.4, 0.5], opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: dot * 0.24,
              }}
            />
          ))}
          <div className="relative z-10 text-center">
            <p className="font-mono text-[50px] font-medium tabular-nums tracking-[-0.07em] text-warm sm:text-[66px]">
              {count.toLocaleString()}
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/28">
              Ventures processed
            </p>
          </div>
        </div>

        <div>
          <SectionKicker>Autopsy in progress</SectionKicker>
          <h1 className="mt-5 text-[clamp(2.5rem,4vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
            Finding the pattern
            <br />
            <span className="text-white/28">before the postmortem.</span>
          </h1>
          <div className="mt-9 space-y-2">
            {SCAN_LINES.map((line, index) => {
              const complete = index < lineIndex;
              const active = index === lineIndex;
              return (
                <motion.div
                  key={line}
                  animate={{
                    opacity: active || complete ? 1 : 0.22,
                    x: active ? 5 : 0,
                  }}
                  className={`flex min-h-[46px] items-center gap-3 rounded-xl border px-4 text-[13px] transition-colors ${
                    active
                      ? "border-violet-400/30 bg-violet-500/[0.08] text-warm"
                      : "border-transparent text-white/40"
                  }`}
                >
                  <span
                    className={`grid size-5 place-items-center rounded-full border ${
                      complete
                        ? "border-acid/30 bg-acid/[0.08] text-acid"
                        : active
                          ? "border-violet-400/35 text-violet-300"
                          : "border-white/10 text-white/20"
                    }`}
                  >
                    {complete ? (
                      <Check className="size-3" />
                    ) : active ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <span className="size-1 rounded-full bg-current" />
                    )}
                  </span>
                  {line}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </StateFrame>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "positive" | "risk" | "neutral";
}) {
  const toneClass =
    tone === "positive"
      ? "text-acid"
      : tone === "risk"
        ? "text-ember"
        : "text-warm";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      className="rounded-[16px] border border-white/[0.07] bg-white/[0.025] p-4"
    >
      <p className={`font-mono text-[27px] font-medium tracking-[-0.04em] ${toneClass}`}>
        {value}
      </p>
      <p className="mt-1 text-[11px] text-white/38">{label}</p>
    </motion.div>
  );
}

function ReportState({ onAudit }: { onAudit: () => void }) {
  return (
    <StateFrame stateKey="report">
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <SectionKicker>Startup autopsy / complete</SectionKicker>
          <h1 className="mt-4 max-w-[900px] text-[clamp(2.45rem,4.6vw,5rem)] font-semibold leading-[0.97] tracking-[-0.06em]">
            Your idea is not dead.{" "}
            <span className="text-white/28">But its positioning might be.</span>
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-acid/20 bg-acid/[0.055] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-acid">
          <BadgeCheck className="size-4" />
          Conditional survival
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[.38fr_.62fr]">
        <div className="vv-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/32">
              Survival gauge
            </p>
            <span className="size-2 rounded-full bg-acid shadow-acid" />
          </div>
          <div className="my-5 grid place-items-center">
            <motion.div
              initial={{ scale: 0.78, rotate: -16, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ ...spring, delay: 0.14 }}
              className="relative grid size-[210px] place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(#b7ff3c 0 63%, rgba(255,255,255,.08) 63% 100%)",
              }}
            >
              <div className="absolute inset-[11px] rounded-full bg-graphite-900" />
              <div className="absolute inset-[22px] rounded-full border border-white/[0.07] bg-[radial-gradient(circle_at_50%_35%,rgba(183,255,60,.07),transparent_55%)]" />
              <div className="relative text-center">
                <p className="font-mono text-[58px] font-medium leading-none tracking-[-0.08em] text-warm">
                  63<span className="text-[25px] text-acid">%</span>
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                  Survival probability
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.07, delayChildren: 0.2 }}
            className="grid grid-cols-2 gap-2"
          >
            {REPORT_METRICS.slice(1).map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
            <div className="col-span-2 rounded-[16px] border border-violet-400/15 bg-violet-500/[0.06] px-4 py-3">
              <p className="flex items-center gap-2 text-[12px] text-violet-200">
                <Sparkles className="size-3.5" />
                3 high-potential patterns isolated
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-4">
          <div className="vv-card p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-warm">Failure patterns</h2>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ember">
                4 critical risks
              </span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {FAILURE_PATTERNS.map((pattern, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.09 * index }}
                  key={pattern}
                  className="flex gap-3 rounded-[15px] border border-white/[0.065] bg-black/20 p-3.5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border border-ember/20 bg-ember/[0.07] font-mono text-[9px] text-ember">
                    0{index + 1}
                  </span>
                  <p className="text-[12px] leading-5 text-white/55">{pattern}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] border border-acid/15 bg-acid/[0.045] p-5">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-acid/80">
                <Zap className="size-3.5" />
                Winning pattern
              </span>
              <p className="mt-4 text-[14px] leading-6 text-warm">{WINNING_PATTERN}</p>
            </div>
            <div className="rounded-[20px] border border-violet-400/18 bg-violet-500/[0.06] p-5">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-violet-300">
                <BrainCircuit className="size-3.5" />
                Recommended pivot
              </span>
              <p className="mt-4 text-[14px] leading-6 text-warm">{RECOMMENDED_PIVOT}</p>
            </div>
          </div>

          <div className="vv-card overflow-hidden">
            <div className="grid md:grid-cols-[1fr_auto_1fr]">
              <div className="p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/28">
                  Before
                </p>
                <p className="mt-3 text-[16px] font-medium text-white/40">
                  “AI that ranks your applicants.”
                </p>
              </div>
              <div className="hidden w-px bg-white/[0.08] md:block" />
              <div className="relative p-5">
                <div className="absolute inset-y-0 left-0 w-[2px] bg-acid" />
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-acid/75">
                  After
                </p>
                <p className="mt-3 text-[16px] font-medium text-warm">
                  “Evidence that proves which applicant claims are trustworthy.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <motion.button
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onAudit}
          className="vv-button-primary min-w-[230px]"
        >
          Audit the Prototype
          <ArrowRight className="size-4" />
        </motion.button>
      </div>
    </StateFrame>
  );
}

function ProductPreview() {
  const candidates = [
    { initials: "AM", name: "Asha Mehta", role: "Operations Lead", score: "94" },
    { initials: "JR", name: "Jon Reyes", role: "Customer Success", score: "87" },
    { initials: "KL", name: "Kimi Lee", role: "Project Manager", score: "82" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#0b0c10] shadow-[0_30px_80px_rgba(0,0,0,.4)]">
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.07] bg-white/[0.035] px-4">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ember/70" />
          <span className="size-2 rounded-full bg-[#ffbd2e]/70" />
          <span className="size-2 rounded-full bg-acid/65" />
        </div>
        <div className="mx-auto flex h-6 w-[54%] items-center justify-center rounded-md border border-white/[0.06] bg-black/20 font-mono text-[8px] text-white/25">
          app.hireproof.ai/candidates
        </div>
      </div>
      <div className="grid min-h-[410px] grid-cols-[64px_1fr] sm:grid-cols-[145px_1fr]">
        <aside className="border-r border-white/[0.06] p-3">
          <div className="flex items-center gap-2 px-1 py-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-violet-500 text-[9px] font-bold">
              H
            </span>
            <span className="hidden text-[11px] font-semibold sm:block">HireProof</span>
          </div>
          <div className="mt-5 space-y-2">
            {["Overview", "Candidates", "Evidence", "Reports"].map((item, index) => (
              <div
                key={item}
                className={`rounded-lg px-2 py-2 text-[9px] ${
                  index === 1
                    ? "bg-violet-500/14 text-violet-200"
                    : "text-white/25"
                }`}
              >
                <span className="hidden sm:inline">{item}</span>
                <span className="mx-auto block size-1.5 rounded-full bg-current sm:hidden" />
              </div>
            ))}
          </div>
        </aside>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-semibold text-white/80">Applicant evidence</p>
              <p className="mt-1 text-[9px] text-white/25">Operations Lead · 28 candidates</p>
            </div>
            <span className="rounded-lg bg-violet-500 px-3 py-2 text-[9px] font-semibold">
              Compare
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              ["28", "Screened"],
              ["12", "Verified"],
              ["3", "Shortlist"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"
              >
                <p className="font-mono text-[15px] text-white/75">{value}</p>
                <p className="mt-1 text-[8px] text-white/22">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {candidates.map((candidate, index) => (
              <div
                key={candidate.name}
                className={`grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-xl border p-3 ${
                  index === 0
                    ? "border-acid/20 bg-acid/[0.035]"
                    : "border-white/[0.06] bg-white/[0.02]"
                }`}
              >
                <span className="grid size-8 place-items-center rounded-full bg-white/[0.07] text-[8px] font-semibold text-white/60">
                  {candidate.initials}
                </span>
                <div>
                  <p className="text-[10px] font-medium text-white/70">{candidate.name}</p>
                  <p className="mt-0.5 text-[8px] text-white/23">{candidate.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[13px] text-acid">{candidate.score}</p>
                  <p className="text-[7px] text-white/20">evidence score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-10 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent shadow-[0_0_14px_rgba(167,139,250,.8)]"
        animate={{ y: [0, 408, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

function AuditState({ onValidate }: { onValidate: () => void }) {
  const agentIcons = [Accessibility, MousePointer2, Eye, Target];

  return (
    <StateFrame stateKey="audit">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <SectionKicker>Prototype audit / 02</SectionKicker>
          <h1 className="mt-4 text-[clamp(2.5rem,4.5vw,4.8rem)] font-semibold leading-none tracking-[-0.06em]">
            Four agents. <span className="text-white/28">One product truth.</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-acid/15 bg-acid/[0.045] px-4 py-2 text-[11px] font-medium text-acid">
          <CheckCircle2 className="size-4" />
          7 improvements automatically prioritized
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.06fr_.94fr]">
        <div className="vv-card p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
              Live product preview
            </span>
            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-violet-300">
              <span className="size-1.5 animate-pulse rounded-full bg-violet-300" />
              Agents observing
            </span>
          </div>
          <ProductPreview />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5">
            {AUDIT_AGENTS.map((agent, index) => {
              const Icon = agentIcons[index];
              return (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: 0.12 * index }}
                  className="vv-card relative overflow-hidden p-4"
                >
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-violet-400"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.1, delay: 0.2 + index * 0.25 }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08] text-violet-300">
                      <Icon className="size-3.5" />
                    </span>
                    <span
                      className={`font-mono text-[21px] font-medium tracking-[-0.04em] ${
                        agent.tone === "positive" ? "text-acid" : "text-[#ffbd5b]"
                      }`}
                    >
                      {agent.score}
                    </span>
                  </div>
                  <p className="mt-4 text-[12px] font-semibold text-warm">{agent.name}</p>
                  <p className="mt-1 text-[9px] text-white/30">{agent.detail}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="vv-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[14px] font-semibold">Priority findings</h2>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ember">
                Action required
              </span>
            </div>
            <div className="space-y-2">
              {AUDIT_FINDINGS.map((finding, index) => (
                <motion.div
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.12 }}
                  key={finding}
                  className="flex gap-3 rounded-[14px] border border-white/[0.065] bg-black/20 p-3.5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border border-ember/20 bg-ember/[0.06]">
                    <AlertTriangle className="size-3 text-ember" />
                  </span>
                  <div>
                    <p className="text-[11px] leading-5 text-white/57">{finding}</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/20">
                      {index === 0
                        ? "Trust agent · high impact"
                        : index === 1
                          ? "Conversion agent · medium"
                          : "Accessibility agent · WCAG 2.4.7"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onValidate}
            className="vv-button-primary w-full rounded-[16px]"
          >
            Validate With Real Humans
            <ArrowRight className="ml-auto size-4" />
          </motion.button>
        </div>
      </div>
    </StateFrame>
  );
}

function ReviewerIcon({ icon }: { icon: "users" | "target" | "expert" }) {
  const Icon = icon === "users" ? UsersRound : icon === "target" ? Target : Crown;
  return <Icon className="size-4.5" />;
}

function SandboxModal({
  open,
  onClose,
  onComplete,
}: {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/75 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sandbox-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={spring}
            className="w-full max-w-[470px] overflow-hidden rounded-[26px] border border-violet-300/25 bg-[#12101b] shadow-[0_34px_120px_rgba(80,46,190,.4)]"
          >
            <div className="relative border-b border-white/[0.08] bg-violet-600 px-6 py-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,.18),transparent_38%)]" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-white text-[16px] font-black text-violet-600">
                    P
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-white">Pinch Payments</p>
                    <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                      Hosted checkout preview
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close sandbox checkout"
                  className="vv-focus grid size-9 place-items-center rounded-full bg-black/15 text-white/70 hover:bg-black/25"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffbd5b]/20 bg-[#ffbd5b]/[0.07] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[#ffcf7a]">
                <FlaskConical className="size-3" />
                Sandbox demonstration
              </div>
              <h2 id="sandbox-title" className="text-[24px] font-semibold tracking-[-0.04em]">
                Complete your validation deposit
              </h2>
              <div className="mt-5 rounded-[18px] border border-white/[0.08] bg-white/[0.035] p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] text-white/32">VentureVerdict</p>
                    <p className="mt-1 text-[14px] font-medium text-warm">
                      Startup-validation deposit
                    </p>
                  </div>
                  <p className="font-mono text-[25px] font-medium tracking-[-0.04em] text-warm">
                    $5.00
                  </p>
                </div>
                <div className="mt-4 flex gap-2 border-t border-white/[0.07] pt-4">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[10px] text-white/45">
                    <CreditCard className="size-3.5" />
                    Card
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[10px] text-white/45">
                    <Landmark className="size-3.5" />
                    Bank account
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onComplete}
                className="vv-focus mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[15px] bg-violet-500 px-5 text-[14px] font-semibold text-white transition-colors hover:bg-violet-400"
              >
                Continue sandbox payment
                <ArrowRight className="size-4" />
              </button>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-[10px] text-white/28">
                <LockKeyhole className="size-3" />
                No real funds or payment details are collected
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CampaignState() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);
    void startPinchCheckout({
      setLoading,
      onError: setError,
      onUnavailable: () => setModalOpen(true),
    });
  };

  const completeSimulation = () => {
    router.push(
      "/success?sim=1&paymentLinkId=pl_sandbox_demo_5aud&paymentId=pmt_sandbox_demo"
    );
  };

  return (
    <StateFrame stateKey="campaign">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <SectionKicker>Human validation / 03</SectionKicker>
          <h1 className="mt-4 text-[clamp(2.45rem,4.2vw,4.6rem)] font-semibold leading-none tracking-[-0.06em]">
            Build your evidence panel.
          </h1>
          <p className="mt-3 max-w-[650px] text-[14px] leading-6 text-white/42">
            Balance broad first impressions with target-customer signal and one
            domain-level verdict.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/18 bg-violet-500/[0.06] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.13em] text-violet-200">
          <Network className="size-3.5" />
          108 reviewers matched
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {REVIEWER_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.type}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: index * 0.1 }}
            className={`vv-card p-5 ${
              index === 2 ? "border-violet-400/20 bg-violet-500/[0.05]" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <span
                className={`grid size-10 place-items-center rounded-[13px] border ${
                  index === 2
                    ? "border-violet-400/25 bg-violet-500/[0.1] text-violet-300"
                    : "border-white/[0.08] bg-white/[0.03] text-white/45"
                }`}
              >
                <ReviewerIcon icon={category.icon} />
              </span>
              <div className="text-right">
                <p className="font-mono text-[35px] font-medium leading-none tracking-[-0.06em] text-warm">
                  {category.count}
                </p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/24">
                  Reviewers
                </p>
              </div>
            </div>
            <h2 className="mt-5 text-[13px] font-semibold uppercase tracking-[0.05em] text-warm">
              {category.type}
            </h2>
            <p className="mt-2 min-h-10 text-[11px] leading-5 text-white/38">
              {category.purpose}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-4">
              <span className="text-[10px] text-white/27">Reward</span>
              <span className="font-mono text-[10px] text-acid/80">{category.reward}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[.95fr_1.05fr]">
        <div className="vv-card p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/28">
                Estimated campaign
              </p>
              <h2 className="mt-2 text-[18px] font-semibold">Evidence breakdown</h2>
            </div>
            <CircleDollarSign className="size-5 text-acid/70" />
          </div>
          <div className="mt-5 space-y-2.5">
            {CAMPAIGN_BREAKDOWN.map((line, index) => (
              <div
                key={line.label}
                className={`flex items-center justify-between text-[12px] ${
                  index === CAMPAIGN_BREAKDOWN.length - 1
                    ? "mt-3 border-t border-white/[0.09] pt-4 text-warm"
                    : "text-white/42"
                }`}
              >
                <span>{line.label}</span>
                <span
                  className={`font-mono tabular-nums ${
                    index === CAMPAIGN_BREAKDOWN.length - 1
                      ? "text-[22px] font-medium text-warm"
                      : "text-white/65"
                  }`}
                >
                  {line.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-[14px] border border-acid/14 bg-acid/[0.045] p-3.5">
            <Sparkles className="size-4 shrink-0 text-acid" />
            <p className="text-[11px] leading-5 text-white/53">
              Hackathon sandbox requests only a{" "}
              <strong className="font-semibold text-acid">$5 validation campaign deposit.</strong>
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-violet-300/22 bg-violet-600 p-6 shadow-[0_30px_100px_rgba(72,43,170,.32)] sm:p-7">
          <div className="absolute -right-24 -top-28 size-[320px] rounded-full bg-white/[0.12] blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/15 to-transparent" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-[13px] bg-white text-[17px] font-black text-violet-600">
                P
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/60">
                <LockKeyhole className="size-3" />
                Secure sandbox
              </span>
            </div>
            <p className="mt-8 text-[12px] text-white/55">Secure validation deposit</p>
            <h2 className="mt-1 text-[26px] font-semibold tracking-[-0.04em] text-white">
              AI Recruitment Copilot
            </h2>
            <div className="mt-6 flex items-end justify-between border-y border-white/15 py-5">
              <div>
                <p className="text-[10px] text-white/45">Deposit</p>
                <p className="mt-1 font-mono text-[44px] font-medium leading-none tracking-[-0.07em]">
                  $5.00
                </p>
              </div>
              <div className="flex gap-2">
                <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/[0.08]">
                  <CreditCard className="size-4" />
                </span>
                <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/[0.08]">
                  <Landmark className="size-4" />
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={loading}
              className="vv-focus mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[15px] bg-white px-5 text-[14px] font-semibold text-violet-600 transition-transform hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating secure checkout…
                </>
              ) : (
                <>
                  Fund Validation With Pinch
                  <ChevronRight className="size-4" />
                </>
              )}
            </button>
            <div className="mt-4 flex items-center justify-between">
              <PoweredByPinch />
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                AUD · Test mode
              </span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
            className="fixed bottom-5 left-1/2 z-[90] flex w-[calc(100%-2.5rem)] max-w-[620px] -translate-x-1/2 items-center gap-3 rounded-[16px] border border-[#ffbd5b]/20 bg-[#1b1711]/95 p-3.5 shadow-2xl backdrop-blur-xl"
          >
            <AlertTriangle className="size-4 shrink-0 text-[#ffbd5b]" />
            <p className="flex-1 text-[11px] leading-5 text-white/62">{error}</p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="vv-focus shrink-0 rounded-lg bg-[#ffbd5b] px-3 py-2 text-[10px] font-semibold text-[#211505]"
            >
              Continue with sandbox simulation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <SandboxModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onComplete={completeSimulation}
      />
    </StateFrame>
  );
}

export function DemoFlow() {
  const [stage, setStage] = useState<DemoStage>("input");
  const [lineIndex, setLineIndex] = useState(0);
  const [scanCount, setScanCount] = useState(0);

  const resetDemo = useCallback(() => {
    setStage("input");
    setLineIndex(0);
    setScanCount(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        event.key.toLowerCase() === "r" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        target?.tagName !== "TEXTAREA" &&
        target?.tagName !== "INPUT"
      ) {
        resetDemo();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetDemo]);

  useEffect(() => {
    if (stage !== "scanning") return;

    const startedAt = performance.now();
    const duration = 4000;
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      setScanCount(Math.round(1247 * (1 - Math.pow(1 - progress, 3))));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    const lineTimers = SCAN_LINES.map((_, index) =>
      window.setTimeout(() => setLineIndex(index), 300 + index * 720)
    );
    const completeTimer = window.setTimeout(() => setStage("report"), 4200);

    return () => {
      cancelAnimationFrame(frame);
      lineTimers.forEach(window.clearTimeout);
      window.clearTimeout(completeTimer);
    };
  }, [stage]);

  const currentIndex = stageOrder.indexOf(stage);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-hero-radial">
      <AmbientBackground />
      <DemoHeader stage={stage} onReset={resetDemo} />

      <AnimatePresence mode="wait">
        {stage === "input" && (
          <InputState
            onRun={() => {
              setLineIndex(0);
              setScanCount(0);
              setStage("scanning");
            }}
          />
        )}
        {stage === "scanning" && (
          <ScanningState lineIndex={lineIndex} count={scanCount} />
        )}
        {stage === "report" && <ReportState onAudit={() => setStage("audit")} />}
        {stage === "audit" && (
          <AuditState onValidate={() => setStage("campaign")} />
        )}
        {stage === "campaign" && <CampaignState />}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-4 right-5 z-40 hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-white/20 xl:flex">
        <span>Flow state</span>
        <span className="h-px w-5 bg-white/10" />
        <span>{String(currentIndex + 1).padStart(2, "0")} / 05</span>
        <span className="ml-2 rounded border border-white/[0.08] px-1.5 py-0.5">R</span>
        <span>Reset</span>
      </div>
    </main>
  );
}
