import { cleanRoomDisclaimer, teams, type TeamProfile, type Workflow, type WorkflowTask } from "./data.ts";

export type TaskRecommendation = {
  name: string;
  owner: string;
  workflow: string;
  score: number;
  priority: "now" | "next" | "later";
  monthlyHoursSaved: number;
  monthlyValueUsd: number;
  effort: number;
  recommendation: string;
};

export type WorkflowAssessment = {
  name: string;
  onboardingNeed: string;
  apps: string[];
  averageScore: number;
  recommendations: TaskRecommendation[];
};

export type AutomationFrame = {
  team: string;
  stage: string;
  scopeCoverage: string[];
  inventory: string[];
  mockedIntegrations: string[];
  overallOpportunity: number;
  roiView: {
    monthlyHoursSaved: number;
    monthlyValueUsd: number;
    effortPoints: number;
  };
  workflows: WorkflowAssessment[];
  nextActions: string[];
  disclaimer: string;
};

export function listTeams(): Pick<TeamProfile, "id" | "name" | "stage">[] {
  return teams.map(({ id, name, stage }) => ({ id, name, stage }));
}

export function findTeam(id: string): TeamProfile | undefined {
  return teams.find((team) => team.id === id);
}

export function createAutomationFrame(teamId: string): AutomationFrame {
  const team = findTeam(teamId);

  if (!team) {
    throw new Error(`Unknown team profile: ${teamId}`);
  }

  const workflows = team.workflows.map((workflow) => assessWorkflow(workflow, team.hourlyCostUsd));
  const recommendations = workflows.flatMap((workflow) => workflow.recommendations).sort(sortRecommendations);
  const topRecommendations = recommendations.filter((recommendation) => recommendation.priority !== "later");

  const monthlyHoursSaved = roundOne(recommendations.reduce((total, task) => total + task.monthlyHoursSaved, 0));
  const monthlyValueUsd = Math.round(recommendations.reduce((total, task) => total + task.monthlyValueUsd, 0));
  const effortPoints = recommendations.reduce((total, task) => total + task.effort, 0);
  const overallOpportunity = Math.round(
    recommendations.reduce((total, task) => total + task.score, 0) / recommendations.length
  );

  return {
    team: team.name,
    stage: team.stage,
    scopeCoverage: [
      "onboarding/team context",
      "app/workflow inventory",
      "automation opportunity scoring",
      "task recommendations",
      "ROI/effort views",
      "synthetic data",
      "mocked integrations"
    ],
    inventory: team.workflows.map((workflow) => `${workflow.name}: ${workflow.apps.join(", ")}`),
    mockedIntegrations: team.integrations.map(
      (integration) => `${integration.app} (${integration.status}, ${integration.records} synthetic records, friction ${integration.friction}/100)`
    ),
    overallOpportunity,
    roiView: {
      monthlyHoursSaved,
      monthlyValueUsd,
      effortPoints
    },
    workflows,
    nextActions: topRecommendations.slice(0, 4).map((task) => `${task.owner}: ${task.recommendation}`),
    disclaimer: cleanRoomDisclaimer
  };
}

function assessWorkflow(workflow: Workflow, hourlyCostUsd: number): WorkflowAssessment {
  const recommendations = workflow.tasks
    .map((task) => assessTask(workflow.name, task, hourlyCostUsd))
    .sort(sortRecommendations);

  return {
    name: workflow.name,
    onboardingNeed: workflow.onboardingNeed,
    apps: workflow.apps,
    averageScore: Math.round(recommendations.reduce((total, task) => total + task.score, 0) / recommendations.length),
    recommendations
  };
}

function assessTask(workflow: string, task: WorkflowTask, hourlyCostUsd: number): TaskRecommendation {
  const monthlyHours = (task.monthlyRuns * task.minutesPerRun) / 60;
  const automationShare = clamp((task.repeatability + task.dataReadiness - task.risk) / 180, 0.15, 0.85);
  const monthlyHoursSaved = roundOne(monthlyHours * automationShare);
  const monthlyValueUsd = Math.round(monthlyHoursSaved * hourlyCostUsd);
  const score = clampScore(
    Math.round(
      task.repeatability * 0.32 +
        task.dataReadiness * 0.24 +
        Math.min(monthlyHours, 40) * 0.9 -
        task.risk * 0.22 -
        task.effort * 0.18
    )
  );

  return {
    name: task.name,
    owner: task.owner,
    workflow,
    score,
    priority: score >= 52 && task.effort <= 42 ? "now" : score >= 45 ? "next" : "later",
    monthlyHoursSaved,
    monthlyValueUsd,
    effort: task.effort,
    recommendation: `${task.name} -> ${chooseAutomationPattern(task)}. ${task.note}`
  };
}

function chooseAutomationPattern(task: WorkflowTask): string {
  if (task.risk >= 34) {
    return "draft with citations and require human approval";
  }

  if (task.dataReadiness >= 80 && task.repeatability >= 85) {
    return "automate routing and first draft generation";
  }

  if (task.effort >= 40) {
    return "prototype a guided assistant after normalizing fields";
  }

  return "start with checklist prompts and exception alerts";
}

function sortRecommendations(left: TaskRecommendation, right: TaskRecommendation): number {
  return right.score - left.score || right.monthlyValueUsd - left.monthlyValueUsd;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function roundOne(value: number): number {
  return Math.round(value * 10) / 10;
}
