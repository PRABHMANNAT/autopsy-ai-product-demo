export type Message =
  | { id: string; role: "agent" | "user"; text: string }
  | { id: string; role: "artifact" };

/**
 * Placeholder transcript for the empty-state demo. Swap this for real data
 * once runs are persisted.
 */
export const DEMO_CONVERSATION: Message[] = [
  {
    id: "m1",
    role: "agent",
    text: "Give me the rough version: what you built, who it is for, what changed, and the decision you are stuck on.",
  },
  {
    id: "m2",
    role: "user",
    text: "We reworked pricing for an analytics tool aimed at early-stage SaaS founders. The middle and top plans might read as too similar. We ship next week and need to know which plan people pick and what stops them starting a trial.",
  },
  {
    id: "m3",
    role: "agent",
    text: "The layout is not the real question here. What matters is whether buyers can tell the plans apart and move without needing reassurance. I have set up a test scoped to exactly that.",
  },
  { id: "m4", role: "artifact" },
];
