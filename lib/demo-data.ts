export type DemoStage = "input" | "scanning" | "report" | "audit" | "campaign";

export interface StageOption {
  id: "ideation" | "prototype" | "validation";
  title: string;
  detail: string;
}

export interface ReportMetric {
  label: string;
  value: string;
  tone: "positive" | "risk" | "neutral";
}

export interface AuditAgent {
  name: string;
  shortName: string;
  score: string;
  detail: string;
  tone: "positive" | "caution";
}

export interface ReviewerCategory {
  type: string;
  count: number;
  purpose: string;
  reward: string;
  icon: "users" | "target" | "expert";
}

export interface CampaignLine {
  label: string;
  value: string;
}

export const STARTUP_IDEA =
  "An AI recruitment copilot that helps small businesses screen applicants and identify the strongest candidates.";

export const STAGE_OPTIONS: StageOption[] = [
  {
    id: "ideation",
    title: "Ideation",
    detail: "Interrogate the thesis",
  },
  {
    id: "prototype",
    title: "Prototype",
    detail: "Audit the experience",
  },
  {
    id: "validation",
    title: "Validation",
    detail: "Recruit real evidence",
  },
];

export const SCAN_LINES = [
  "Searching 1,247 comparable ventures…",
  "Clustering failure patterns…",
  "Examining buyer behaviour…",
  "Comparing successful positioning…",
  "Generating survival strategy…",
];

export const REPORT_METRICS: ReportMetric[] = [
  { label: "Survival probability", value: "63%", tone: "positive" },
  { label: "Comparable ventures", value: "1,247", tone: "neutral" },
  { label: "Critical risks", value: "4", tone: "risk" },
  { label: "High-potential patterns", value: "3", tone: "positive" },
];

export const FAILURE_PATTERNS = [
  "Buyers did not trust opaque candidate rankings.",
  "Products depended heavily on external job-board integrations.",
  "Generic AI screening lacked industry-specific evidence.",
  "Small-business sales cycles were longer than expected.",
];

export const WINNING_PATTERN =
  "The strongest companies sold verifiable hiring evidence instead of unexplained AI scores.";

export const RECOMMENDED_PIVOT =
  "Replace automated candidate ranking with evidence-backed claim verification and transparent hiring reports.";

export const AUDIT_AGENTS: AuditAgent[] = [
  {
    name: "Accessibility Agent",
    shortName: "A11Y",
    score: "82%",
    detail: "WCAG AA readiness",
    tone: "positive",
  },
  {
    name: "UX Heuristics Agent",
    shortName: "UX",
    score: "8/10",
    detail: "Nielsen heuristics passed",
    tone: "positive",
  },
  {
    name: "Trust Agent",
    shortName: "TRUST",
    score: "71%",
    detail: "Trust & transparency",
    tone: "caution",
  },
  {
    name: "Conversion Agent",
    shortName: "CVR",
    score: "88%",
    detail: "Conversion clarity",
    tone: "positive",
  },
];

export const AUDIT_FINDINGS = [
  "Candidate rejection decisions lack visible supporting evidence.",
  "Primary onboarding action competes with two secondary actions.",
  "Keyboard focus is not visible on the applicant comparison control.",
];

export const REVIEWER_CATEGORIES: ReviewerCategory[] = [
  {
    type: "General users",
    count: 100,
    purpose: "UI clarity, first impressions and general usability",
    reward: "$5 per review",
    icon: "users",
  },
  {
    type: "Specialized reviewers",
    count: 7,
    purpose: "Target users such as recruiters and startup founders",
    reward: "$50 per review",
    icon: "target",
  },
  {
    type: "Industry expert",
    count: 1,
    purpose: "Strategic, regulatory and domain-level evaluation",
    reward: "$300 per review",
    icon: "expert",
  },
];

export const CAMPAIGN_BREAKDOWN: CampaignLine[] = [
  { label: "General reviewers", value: "$500" },
  { label: "Specialists", value: "$350" },
  { label: "Industry expert", value: "$300" },
  { label: "AI analysis and orchestration", value: "$149" },
  { label: "Total campaign value", value: "$1,299" },
];

export const CAMPAIGN_TIMELINE = [
  "Payment received",
  "Reviewer matching",
  "Specialized review",
  "Expert verdict",
  "Final validation dossier",
];

export const EXPECTED_EVIDENCE = [
  "100 first-impression responses",
  "7 target-customer evaluations",
  "1 expert assessment",
  "AI-synthesized final verdict",
];
