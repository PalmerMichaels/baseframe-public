import type { ProductSeed } from "./types";

export const CLEAN_ROOM_DISCLAIMER =
  "Clean-room demo: fictional synthetic data only; not affiliated with any real company, accelerator, or YC; not for regulated, legal, medical, financial, safety-critical, or production decisions.";

export const productSeeds: ProductSeed[] = [
  {
    id: "atlas-pulse",
    name: "Atlas Pulse",
    fictionalTeam: "North Lantern Studio",
    launchWindow: "2026-Q2 synthetic preview",
    audience: "Fictional operations leads testing weekly launch rituals",
    signals: [
      { name: "Problem clarity", score: 86, note: "Target workflow and promised outcome are crisp." },
      { name: "Demo path", score: 78, note: "Happy path is stable; edge states need copy polish." },
      { name: "Activation loop", score: 64, note: "First-session checklist still has two vague prompts." },
      { name: "Support readiness", score: 58, note: "Synthetic FAQ covers basics but not recovery cases." }
    ],
    dependencies: [
      { name: "Onboarding script", owner: "Fictional growth desk", status: "watch", dueInDays: 5 },
      { name: "Export mock", owner: "Fictional platform desk", status: "clear", dueInDays: 2 },
      { name: "Fallback copy", owner: "Fictional content desk", status: "watch", dueInDays: 4 }
    ]
  },
  {
    id: "brisk-foundry",
    name: "Brisk Foundry",
    fictionalTeam: "Copper Kite Lab",
    launchWindow: "2026-Q3 synthetic pilot",
    audience: "Fictional makers comparing launch tradeoffs",
    signals: [
      { name: "Problem clarity", score: 72, note: "Segment is defined but use case boundaries are broad." },
      { name: "Demo path", score: 69, note: "Main flow works after a seeded workspace is selected." },
      { name: "Activation loop", score: 55, note: "User success metric needs a single visible anchor." },
      { name: "Support readiness", score: 47, note: "Response templates are incomplete for blocked imports." }
    ],
    dependencies: [
      { name: "Scenario library", owner: "Fictional research desk", status: "clear", dueInDays: 3 },
      { name: "Pilot rubric", owner: "Fictional success desk", status: "blocked", dueInDays: 1 },
      { name: "In-app empty states", owner: "Fictional design desk", status: "watch", dueInDays: 6 }
    ]
  },
  {
    id: "cedar-grid",
    name: "Cedar Grid",
    fictionalTeam: "Harbor Finch Works",
    launchWindow: "2026-Q4 synthetic beta",
    audience: "Fictional team leads rehearsing dependency reviews",
    signals: [
      { name: "Problem clarity", score: 91, note: "Launch promise maps to one repeatable meeting ritual." },
      { name: "Demo path", score: 88, note: "Synthetic walkthrough is complete and short." },
      { name: "Activation loop", score: 82, note: "Baseline frame reaches a useful state in under five minutes." },
      { name: "Support readiness", score: 76, note: "Known limitations are visible before export." }
    ],
    dependencies: [
      { name: "Launch checklist", owner: "Fictional product desk", status: "clear", dueInDays: 1 },
      { name: "Example workspace", owner: "Fictional enablement desk", status: "clear", dueInDays: 2 }
    ]
  }
];
