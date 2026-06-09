export type MockIntegration = {
  app: string;
  status: "mocked";
  records: number;
  friction: number;
  note: string;
};

export type WorkflowTask = {
  name: string;
  owner: string;
  monthlyRuns: number;
  minutesPerRun: number;
  repeatability: number;
  dataReadiness: number;
  risk: number;
  effort: number;
  note: string;
};

export type Workflow = {
  name: string;
  onboardingNeed: string;
  apps: string[];
  tasks: WorkflowTask[];
};

export type TeamProfile = {
  id: string;
  name: string;
  stage: string;
  hourlyCostUsd: number;
  integrations: MockIntegration[];
  workflows: Workflow[];
};

export const cleanRoomDisclaimer =
  "Clean-room demo using fictional synthetic AI-automation planning data only. Mocked integrations do not connect to private systems. No affiliation with any real company, accelerator, or YC. Not for regulated, legal, medical, financial, compliance, employment, safety-critical, procurement, or production decisions.";

export const teams: TeamProfile[] = [
  {
    id: "nova-ops",
    name: "Nova Ops Studio",
    stage: "Synthetic 42-person operations team",
    hourlyCostUsd: 68,
    integrations: [
      {
        app: "MockCRM",
        status: "mocked",
        records: 1840,
        friction: 42,
        note: "Synthetic accounts include inconsistent renewal fields."
      },
      {
        app: "MockDesk",
        status: "mocked",
        records: 620,
        friction: 35,
        note: "Synthetic tickets include repetitive onboarding questions."
      },
      {
        app: "MockSheets",
        status: "mocked",
        records: 96,
        friction: 58,
        note: "Synthetic handoff tabs are manually reconciled each week."
      }
    ],
    workflows: [
      {
        name: "Customer onboarding checklist",
        onboardingNeed: "New coordinators need a single guided path for kickoff, account setup, and handoff notes.",
        apps: ["MockCRM", "MockDesk", "MockSheets"],
        tasks: [
          {
            name: "Draft kickoff summary",
            owner: "Mira",
            monthlyRuns: 54,
            minutesPerRun: 18,
            repeatability: 88,
            dataReadiness: 82,
            risk: 18,
            effort: 28,
            note: "Synthetic notes follow a stable template and can be summarized before human review."
          },
          {
            name: "Reconcile setup fields",
            owner: "Jonas",
            monthlyRuns: 48,
            minutesPerRun: 26,
            repeatability: 76,
            dataReadiness: 61,
            risk: 32,
            effort: 46,
            note: "Synthetic records need field-normalization rules before automation."
          },
          {
            name: "Escalate missing owner",
            owner: "Isha",
            monthlyRuns: 22,
            minutesPerRun: 14,
            repeatability: 69,
            dataReadiness: 71,
            risk: 24,
            effort: 35,
            note: "Synthetic routing conditions are simple but require approval copy."
          }
        ]
      },
      {
        name: "Weekly renewal preparation",
        onboardingNeed: "Account managers need context packs without learning every reporting tab.",
        apps: ["MockCRM", "MockSheets"],
        tasks: [
          {
            name: "Compile renewal brief",
            owner: "Leah",
            monthlyRuns: 38,
            minutesPerRun: 31,
            repeatability: 83,
            dataReadiness: 74,
            risk: 27,
            effort: 39,
            note: "Synthetic briefs combine contract dates, usage notes, and open support items."
          },
          {
            name: "Flag stale success plan",
            owner: "Theo",
            monthlyRuns: 30,
            minutesPerRun: 12,
            repeatability: 91,
            dataReadiness: 78,
            risk: 21,
            effort: 24,
            note: "Synthetic stale-plan criteria are deterministic and easy to review."
          }
        ]
      }
    ]
  },
  {
    id: "cobalt-people",
    name: "Cobalt People Lab",
    stage: "Synthetic 23-person internal enablement team",
    hourlyCostUsd: 74,
    integrations: [
      {
        app: "MockHRIS",
        status: "mocked",
        records: 118,
        friction: 31,
        note: "Synthetic profile records omit any real employee or candidate data."
      },
      {
        app: "MockWiki",
        status: "mocked",
        records: 244,
        friction: 49,
        note: "Synthetic policy pages include duplicate onboarding guidance."
      },
      {
        app: "MockChat",
        status: "mocked",
        records: 410,
        friction: 44,
        note: "Synthetic channels include repeated benefits and laptop questions."
      }
    ],
    workflows: [
      {
        name: "Internal onboarding concierge",
        onboardingNeed: "New hires need role-specific answers and reminders without exposing private HR records.",
        apps: ["MockHRIS", "MockWiki", "MockChat"],
        tasks: [
          {
            name: "Answer policy question",
            owner: "Nia",
            monthlyRuns: 86,
            minutesPerRun: 9,
            repeatability: 92,
            dataReadiness: 69,
            risk: 36,
            effort: 38,
            note: "Synthetic wiki snippets need citation rules and human-owned escalation."
          },
          {
            name: "Create first-week checklist",
            owner: "Owen",
            monthlyRuns: 18,
            minutesPerRun: 35,
            repeatability: 81,
            dataReadiness: 77,
            risk: 28,
            effort: 42,
            note: "Synthetic role templates are structured enough for checklist drafts."
          },
          {
            name: "Route equipment request",
            owner: "Priya",
            monthlyRuns: 33,
            minutesPerRun: 11,
            repeatability: 87,
            dataReadiness: 84,
            risk: 19,
            effort: 22,
            note: "Synthetic routing fields are complete and low-risk with approvals."
          }
        ]
      }
    ]
  }
];
