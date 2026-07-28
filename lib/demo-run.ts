/**
 * Placeholder data for the run workspace. Replace with real run data once
 * runs are persisted server-side.
 */

/* ------------------------------------------------------------------ *
 * The nine-step spine
 * ------------------------------------------------------------------ */

export type StepState = "done" | "active" | "todo";

export type RunStep = {
  n: number;
  title: string;
  detail: string;
  /** Route segment under /runs/[runId]. Steps 1 and 2 share one screen. */
  segment: string;
  state: StepState;
};

export const RUN_STEPS: RunStep[] = [
  {
    n: 1,
    title: "Connect the product",
    detail: "Staging URL, Figma prototype or build",
    segment: "connect",
    state: "done",
  },
  {
    n: 2,
    title: "Define one decision",
    detail: "The single question this run answers",
    segment: "connect",
    state: "done",
  },
  {
    n: 3,
    title: "AI Prediction Map",
    detail: "Agents predict likely failures",
    segment: "predictions",
    state: "done",
  },
  {
    n: 4,
    title: "Matched Human Testing",
    detail: "Recruit, consent, run sessions",
    segment: "humans",
    state: "done",
  },
  {
    n: 5,
    title: "Behavioural Evidence",
    detail: "Clips, dead clicks, hesitation",
    segment: "evidence",
    state: "active",
  },
  {
    n: 6,
    title: "AI vs Human Divergence",
    detail: "Where the agents were wrong",
    segment: "divergence",
    state: "todo",
  },
  {
    n: 7,
    title: "Decision-Ready Verdict",
    detail: "Ship, modify or kill",
    segment: "verdict",
    state: "todo",
  },
  {
    n: 8,
    title: "Verification Retest",
    detail: "Prove the fix actually worked",
    segment: "retest",
    state: "todo",
  },
  {
    n: 9,
    title: "Continuous Product Memory",
    detail: "Every version, failure and fix",
    segment: "memory",
    state: "todo",
  },
];

/* ------------------------------------------------------------------ *
 * Step 1–2 · Connect + decision
 * ------------------------------------------------------------------ */

export type SourceKind = "url" | "figma" | "build";

export type ProductSource = {
  kind: SourceKind;
  title: string;
  blurb: string;
  placeholder: string;
};

export const PRODUCT_SOURCES: ProductSource[] = [
  {
    kind: "url",
    title: "Staging URL",
    blurb: "A live or staging site the agents can navigate.",
    placeholder: "https://staging.yourproduct.com",
  },
  {
    kind: "figma",
    title: "Figma prototype",
    blurb: "A linked prototype with clickable flows.",
    placeholder: "https://figma.com/proto/…",
  },
  {
    kind: "build",
    title: "Mobile build",
    blurb: "An iOS or Android build to run on real devices.",
    placeholder: "Upload .ipa or .apk",
  },
];

export const DECISION_EXAMPLES = [
  "Will users create their first post?",
  "Is this onboarding ready to launch?",
  "Can buyers tell the paid plans apart?",
];

/* ------------------------------------------------------------------ *
 * Step 3 · Predictions
 * ------------------------------------------------------------------ */

export type PredictionCategory =
  | "Usability"
  | "Frontend"
  | "Accessibility"
  | "Behavioural";

export type PredictionStatus = "confirmed" | "wrong" | "open";

export type Prediction = {
  id: number;
  category: PredictionCategory;
  title: string;
  body: string;
  /** Agent confidence, 0–100. */
  confidence: number;
  status: PredictionStatus;
  pin: { x: number; y: number };
};

export const PREDICTIONS: Prediction[] = [
  {
    id: 1,
    category: "Usability",
    title: "Headline does not support the choice",
    body: "The hero sells the idea of scaling but gives no basis for picking a tier.",
    confidence: 82,
    status: "confirmed",
    pin: { x: 50, y: 21 },
  },
  {
    id: 2,
    category: "Behavioural",
    title: "Paid tiers read as interchangeable",
    body: "Scale and Pro repeat the same three benefits, so the price gap looks arbitrary.",
    confidence: 91,
    status: "confirmed",
    pin: { x: 57, y: 45 },
  },
  {
    id: 3,
    category: "Frontend",
    title: "Popular badge clips on narrow viewports",
    body: "The badge overlaps the card border below 380px.",
    confidence: 64,
    status: "wrong",
    pin: { x: 62, y: 36 },
  },
  {
    id: 4,
    category: "Accessibility",
    title: "Feature ticks rely on colour alone",
    body: "Green check glyphs carry meaning with no text equivalent for screen readers.",
    confidence: 73,
    status: "open",
    pin: { x: 30, y: 66 },
  },
  {
    id: 5,
    category: "Usability",
    title: "Trial CTA is unambiguous",
    body: "Primary action is visually dominant and states that no card is needed.",
    confidence: 45,
    status: "wrong",
    pin: { x: 45, y: 61 },
  },
];

export const PREDICTION_CATEGORIES: PredictionCategory[] = [
  "Usability",
  "Frontend",
  "Accessibility",
  "Behavioural",
];

/* ------------------------------------------------------------------ *
 * Step 4 · Human testing
 * ------------------------------------------------------------------ */

export type ParticipantStage =
  | "Recruited"
  | "Consented"
  | "In session"
  | "Complete";

export type Participant = {
  id: string;
  initials: string;
  name: string;
  /** Persona segment they were matched on. */
  segment: string;
  stage: ParticipantStage;
  progress: number;
  tasks: { label: string; done: boolean }[];
  incentive: string;
};

export const PARTICIPANT_STAGES: ParticipantStage[] = [
  "Recruited",
  "Consented",
  "In session",
  "Complete",
];

export const PARTICIPANTS: Participant[] = [
  {
    id: "p1",
    initials: "RM",
    name: "Rhea M.",
    segment: "Seed-stage founder",
    stage: "Complete",
    progress: 100,
    tasks: [
      { label: "Compare the paid plans", done: true },
      { label: "Pick a plan and start a trial", done: true },
      { label: "Explain the choice aloud", done: true },
    ],
    incentive: "$40 · paid",
  },
  {
    id: "p2",
    initials: "TO",
    name: "Tomas O.",
    segment: "Technical co-founder",
    stage: "Complete",
    progress: 100,
    tasks: [
      { label: "Compare the paid plans", done: true },
      { label: "Pick a plan and start a trial", done: true },
      { label: "Explain the choice aloud", done: true },
    ],
    incentive: "$40 · paid",
  },
  {
    id: "p3",
    initials: "AK",
    name: "Ana K.",
    segment: "Solo SaaS operator",
    stage: "In session",
    progress: 62,
    tasks: [
      { label: "Compare the paid plans", done: true },
      { label: "Pick a plan and start a trial", done: false },
      { label: "Explain the choice aloud", done: false },
    ],
    incentive: "$40 · pending",
  },
  {
    id: "p4",
    initials: "DL",
    name: "Devon L.",
    segment: "Growth lead, Series A",
    stage: "In session",
    progress: 24,
    tasks: [
      { label: "Compare the paid plans", done: false },
      { label: "Pick a plan and start a trial", done: false },
      { label: "Explain the choice aloud", done: false },
    ],
    incentive: "$40 · pending",
  },
  {
    id: "p5",
    initials: "SB",
    name: "Sana B.",
    segment: "Seed-stage founder",
    stage: "Consented",
    progress: 0,
    tasks: [
      { label: "Compare the paid plans", done: false },
      { label: "Pick a plan and start a trial", done: false },
      { label: "Explain the choice aloud", done: false },
    ],
    incentive: "$40 · reserved",
  },
  {
    id: "p6",
    initials: "MJ",
    name: "Milo J.",
    segment: "Product manager, pre-seed",
    stage: "Recruited",
    progress: 0,
    tasks: [
      { label: "Compare the paid plans", done: false },
      { label: "Pick a plan and start a trial", done: false },
      { label: "Explain the choice aloud", done: false },
    ],
    incentive: "$40 · reserved",
  },
];

/* ------------------------------------------------------------------ *
 * Step 5 · Behavioural evidence
 * ------------------------------------------------------------------ */

export type EventKind =
  | "dead-click"
  | "hesitation"
  | "backtrack"
  | "abandon"
  | "voice";

export type ClipEvent = {
  kind: EventKind;
  /** Position along the clip, 0–100. */
  at: number;
  label: string;
};

export type EvidenceClip = {
  id: string;
  participant: string;
  initials: string;
  screen: string;
  duration: string;
  completed: boolean;
  events: ClipEvent[];
};

export const EVENT_LABELS: Record<EventKind, string> = {
  "dead-click": "Dead click",
  hesitation: "Hesitation",
  backtrack: "Backtrack",
  abandon: "Abandonment",
  voice: "Voice note",
};

export const CLIPS: EvidenceClip[] = [
  {
    id: "c1",
    participant: "Rhea M.",
    initials: "RM",
    screen: "Pricing",
    duration: "2:14",
    completed: true,
    events: [
      { kind: "hesitation", at: 18, label: "8s paused on the plan row" },
      { kind: "dead-click", at: 34, label: "Clicked the Popular badge" },
      { kind: "backtrack", at: 52, label: "Returned to Home, then back" },
      { kind: "voice", at: 71, label: "“These two look the same to me”" },
    ],
  },
  {
    id: "c2",
    participant: "Tomas O.",
    initials: "TO",
    screen: "Pricing",
    duration: "1:47",
    completed: true,
    events: [
      { kind: "dead-click", at: 22, label: "Clicked the feature tick" },
      { kind: "hesitation", at: 48, label: "11s comparing Scale and Pro" },
      { kind: "voice", at: 66, label: "“What do I lose on the cheaper one?”" },
    ],
  },
  {
    id: "c3",
    participant: "Ana K.",
    initials: "AK",
    screen: "Checkout",
    duration: "0:58",
    completed: false,
    events: [
      { kind: "hesitation", at: 30, label: "14s on the card field" },
      { kind: "abandon", at: 88, label: "Left before completing" },
    ],
  },
  {
    id: "c4",
    participant: "Devon L.",
    initials: "DL",
    screen: "Home",
    duration: "1:12",
    completed: true,
    events: [
      { kind: "backtrack", at: 41, label: "Went to Pricing and back twice" },
      { kind: "voice", at: 80, label: "“I want to see the price first”" },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Step 6 · Divergence
 * ------------------------------------------------------------------ */

export type Divergence = {
  id: number;
  predicted: string;
  observed: string;
  /** Negative = agents overestimated, positive = they missed it. */
  delta: number;
  clipId: string;
  note: string;
};

export const DIVERGENCES: Divergence[] = [
  {
    id: 1,
    predicted: "Buyers scan all three tiers before choosing",
    observed: "Four of five ignored Starter entirely",
    delta: 38,
    clipId: "c1",
    note: "The free tier reads as a downgrade, not an option, so it never entered the comparison.",
  },
  {
    id: 2,
    predicted: "Popular badge clips below 380px",
    observed: "No participant hit a narrow viewport",
    delta: -64,
    clipId: "c2",
    note: "A real defect, but not one this decision depends on. Deprioritised rather than dismissed.",
  },
  {
    id: 3,
    predicted: "Trial CTA reads clearly",
    observed: "Two hesitated over whether a card was required",
    delta: 29,
    clipId: "c2",
    note: "The copy states no card is needed, but it sits below the fold on laptop screens.",
  },
  {
    id: 4,
    predicted: "Checkout completes without friction",
    observed: "One abandoned at the card field",
    delta: 44,
    clipId: "c3",
    note: "Agents cannot model payment anxiety. This only surfaces with real people.",
  },
];

/* ------------------------------------------------------------------ *
 * Step 7–8 · Verdict and retest
 * ------------------------------------------------------------------ */

export type VerdictCall = "SHIP" | "MODIFY" | "KILL";

export type Severity = "critical" | "major" | "minor";

export type Issue = {
  id: number;
  severity: Severity;
  title: string;
  evidence: string;
  fix: string;
};

export type Verdict = {
  call: VerdictCall;
  summary: string;
  confidence: number;
  issues: Issue[];
};

export const VERDICT: Verdict = {
  call: "MODIFY",
  summary:
    "The page sells the idea but not the choice. Buyers reach the trial willing to pay and stall at the point of picking a tier. Two changes clear the blocker; nothing here justifies holding the launch.",
  confidence: 86,
  issues: [
    {
      id: 1,
      severity: "critical",
      title: "Scale and Pro are not distinguishable",
      evidence: "5 of 5 participants · 3 clips",
      fix: "Draw a team-size boundary on each card and cut the repeated benefit list to the differences only.",
    },
    {
      id: 2,
      severity: "major",
      title: "Free tier is invisible in the comparison",
      evidence: "4 of 5 participants · 2 clips",
      fix: "Move Starter out of the three-card row and present it as a trial entry point instead.",
    },
    {
      id: 3,
      severity: "major",
      title: "No-card-required copy sits below the fold",
      evidence: "2 of 5 participants · 1 clip",
      fix: "Lift the reassurance to sit directly under the primary action.",
    },
    {
      id: 4,
      severity: "minor",
      title: "Feature ticks carry meaning by colour alone",
      evidence: "Accessibility scan · agent only",
      fix: "Pair each tick with a text label so screen readers convey the same information.",
    },
  ],
};

export type RetestOutcome = "fixed" | "still-broken" | "new";

export type RetestItem = {
  id: number;
  outcome: RetestOutcome;
  title: string;
  note: string;
};

export const RETEST: {
  from: string;
  to: string;
  call: VerdictCall;
  items: RetestItem[];
} = {
  from: "v1.1",
  to: "v1.2",
  call: "SHIP",
  items: [
    {
      id: 1,
      outcome: "fixed",
      title: "Scale and Pro are not distinguishable",
      note: "All five picked a tier without backtracking. Median decision time fell from 41s to 12s.",
    },
    {
      id: 2,
      outcome: "fixed",
      title: "Free tier is invisible in the comparison",
      note: "Starter now reads as an entry point. Three participants mentioned it unprompted.",
    },
    {
      id: 3,
      outcome: "still-broken",
      title: "No-card-required copy sits below the fold",
      note: "Still under the fold at 1366×768. One participant asked about it again.",
    },
    {
      id: 4,
      outcome: "new",
      title: "Team-size boundary reads as a hard limit",
      note: "Two participants thought exceeding the seat count would lock them out rather than upgrade them.",
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Step 9 · Product memory
 * ------------------------------------------------------------------ */

export type RunVersion = {
  version: string;
  date: string;
  call: VerdictCall;
  headline: string;
  changed: string;
  participants: number;
};

export const RUN_HISTORY: RunVersion[] = [
  {
    version: "v1.2",
    date: "12 Mar",
    call: "SHIP",
    headline: "Plan choice resolved",
    changed: "Team-size boundary added, Starter repositioned",
    participants: 5,
  },
  {
    version: "v1.1",
    date: "6 Mar",
    call: "MODIFY",
    headline: "Pricing clarity still blocking",
    changed: "Benefit lists trimmed, badge fixed",
    participants: 5,
  },
  {
    version: "v1.0",
    date: "28 Feb",
    call: "KILL",
    headline: "Buyers could not choose at all",
    changed: "First pass at the three-tier layout",
    participants: 4,
  },
];

/* ------------------------------------------------------------------ *
 * Existing preview-stage data
 * ------------------------------------------------------------------ */

export type FindingTone = "warn" | "risk" | "good";

export type Finding = {
  id: number;
  tone: FindingTone;
  title: string;
  /** How many participants this showed up for, e.g. "4/5". */
  ratio: string;
  body: string;
  quote?: string;
  source: string;
  /** Pin position on the product canvas, in percent. */
  pin: { x: number; y: number };
};

export const FINDINGS: Finding[] = [
  {
    id: 1,
    tone: "warn",
    title: "Promise is clear, decision is not",
    ratio: "4/5",
    body: "People follow that pricing scales with them, but the headline gives them nothing to pick a plan with.",
    source: "Human behaviour · Pricing headline",
    pin: { x: 50, y: 21 },
  },
  {
    id: 2,
    tone: "risk",
    title: "Scale and Pro blur together",
    ratio: "5/5",
    body: "Both paid tiers advertise near-identical benefits. Buyers hunt for a team-size boundary that the page never draws.",
    quote: "I would pick Scale and hope I am not missing a security feature.",
    source: "Human behaviour · Paid-plan comparison",
    pin: { x: 57, y: 45 },
  },
  {
    id: 3,
    tone: "good",
    title: "The trial action works",
    ratio: "5/5",
    body: "Everyone spotted the primary action and understood that no card was needed to begin.",
    source: "Human behaviour · Scale CTA",
    pin: { x: 45, y: 61 },
  },
];

export type Screen = {
  id: string;
  label: string;
  count: number;
  icon: "home" | "price" | "cart" | "check";
};

export const SCREENS: Screen[] = [
  { id: "home", label: "Home", count: 2, icon: "home" },
  { id: "pricing", label: "Pricing", count: 3, icon: "price" },
  { id: "checkout", label: "Checkout", count: 2, icon: "cart" },
  { id: "trial", label: "Trial created", count: 1, icon: "check" },
];

export type Plan = {
  name: string;
  blurb: string;
  price: string;
  cta: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Starter",
    blurb: "For trying Northstar",
    price: "$0",
    cta: "Choose plan",
  },
  {
    name: "Scale",
    blurb: "For growing product teams",
    price: "$49",
    cta: "Start trial",
    featured: true,
  },
  {
    name: "Pro",
    blurb: "Advanced features and controls",
    price: "$99",
    cta: "Choose plan",
  },
];

export const PLAN_FEATURES = [
  "Core analytics",
  "Team collaboration",
  "Email support",
];

export const EVIDENCE_TABS = ["This screen", "Journey", "AI", "People"];
