export type Initiative = {
  id: string;
  name: string;
  owner: string;
  stage: "discovery" | "prototype" | "pilot" | "launch-ready";
  confidence: number;
  impact: number;
  effort: number;
  lastSignalDaysAgo: number;
  blockers: string[];
};

export const cleanRoomNotice =
  "Clean-room public demo using synthetic data only. Not a regulated, production, compliance, medical, financial, legal, or safety-critical system.";

export const initiatives: Initiative[] = [
  {
    id: "BF-101",
    name: "Atlas onboarding frame",
    owner: "Mira Chen",
    stage: "pilot",
    confidence: 0.78,
    impact: 8,
    effort: 5,
    lastSignalDaysAgo: 3,
    blockers: ["Needs clearer activation metric"]
  },
  {
    id: "BF-118",
    name: "Signal review loop",
    owner: "Jon Bell",
    stage: "prototype",
    confidence: 0.62,
    impact: 7,
    effort: 3,
    lastSignalDaysAgo: 11,
    blockers: []
  },
  {
    id: "BF-124",
    name: "Northstar brief builder",
    owner: "Asha Patel",
    stage: "discovery",
    confidence: 0.44,
    impact: 9,
    effort: 7,
    lastSignalDaysAgo: 18,
    blockers: ["Unvalidated audience", "High implementation uncertainty"]
  },
  {
    id: "BF-137",
    name: "Launch readiness pulse",
    owner: "Theo Morgan",
    stage: "launch-ready",
    confidence: 0.86,
    impact: 6,
    effort: 4,
    lastSignalDaysAgo: 1,
    blockers: []
  }
];
