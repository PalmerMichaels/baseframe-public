export type Signal = {
  name: string;
  score: number;
  note: string;
};

export type Workstream = {
  name: string;
  owner: string;
  confidence: number;
  dependencyCount: number;
  signals: Signal[];
};

export type Scenario = {
  id: string;
  name: string;
  horizonDays: number;
  audience: string;
  workstreams: Workstream[];
};

export const cleanRoomDisclaimer =
  "Clean-room demo using fictional synthetic launch-planning data only. No affiliation with any real company, accelerator, or YC. Not for regulated, legal, medical, financial, safety-critical, or production decisions.";

export const scenarios: Scenario[] = [
  {
    id: "atlas-beta",
    name: "Atlas Beta Launch",
    horizonDays: 21,
    audience: "120 invited synthetic design partners",
    workstreams: [
      {
        name: "Activation path",
        owner: "Mira",
        confidence: 72,
        dependencyCount: 2,
        signals: [
          { name: "first-run checklist", score: 78, note: "Synthetic users complete setup in under eight minutes." },
          { name: "sample workspace", score: 66, note: "Synthetic demo content needs clearer reset behavior." }
        ]
      },
      {
        name: "Support loop",
        owner: "Jonas",
        confidence: 64,
        dependencyCount: 4,
        signals: [
          { name: "triage coverage", score: 62, note: "Two synthetic escalation paths remain undefined." },
          { name: "reply templates", score: 71, note: "Synthetic drafts cover expected onboarding questions." }
        ]
      },
      {
        name: "Launch messaging",
        owner: "Isha",
        confidence: 81,
        dependencyCount: 1,
        signals: [
          { name: "positioning review", score: 84, note: "Synthetic reviewers prefer outcome-led copy." },
          { name: "email dry run", score: 79, note: "Synthetic send list and timing are verified." }
        ]
      }
    ]
  },
  {
    id: "cobalt-migration",
    name: "Cobalt Migration Pilot",
    horizonDays: 35,
    audience: "8 synthetic mid-market accounts",
    workstreams: [
      {
        name: "Importer readiness",
        owner: "Nia",
        confidence: 69,
        dependencyCount: 3,
        signals: [
          { name: "fixture coverage", score: 74, note: "Synthetic fixtures include small and large workspaces." },
          { name: "rollback drill", score: 58, note: "Synthetic rollback owner handoff is not yet rehearsed." }
        ]
      },
      {
        name: "Pilot communications",
        owner: "Theo",
        confidence: 77,
        dependencyCount: 1,
        signals: [
          { name: "timeline brief", score: 80, note: "Synthetic milestones are visible to all pilot contacts." },
          { name: "feedback intake", score: 73, note: "Synthetic survey prompts are ready." }
        ]
      },
      {
        name: "Observability",
        owner: "Leah",
        confidence: 61,
        dependencyCount: 5,
        signals: [
          { name: "migration dashboard", score: 63, note: "Synthetic lagging status labels need owner review." },
          { name: "alert routing", score: 55, note: "Synthetic after-hours rota is incomplete." }
        ]
      }
    ]
  }
];
