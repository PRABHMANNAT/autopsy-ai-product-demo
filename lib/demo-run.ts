/**
 * Placeholder data for the preview workspace. Replace with real run data once
 * runs are persisted server-side.
 */

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
