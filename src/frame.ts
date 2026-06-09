import { cleanRoomDisclaimer, scenarios, type Scenario, type Workstream } from "./data.ts";

export type WorkstreamAssessment = {
  name: string;
  owner: string;
  readiness: number;
  dependencyLoad: number;
  priority: "high" | "medium" | "low";
  focus: string;
};

export type OperatingFrame = {
  scenario: string;
  audience: string;
  horizonDays: number;
  overallReadiness: number;
  cadence: string[];
  assessments: WorkstreamAssessment[];
  nextActions: string[];
  disclaimer: string;
};

export function listScenarios(): Pick<Scenario, "id" | "name" | "horizonDays" | "audience">[] {
  return scenarios.map(({ id, name, horizonDays, audience }) => ({ id, name, horizonDays, audience }));
}

export function findScenario(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}

export function createFrame(scenarioId: string): OperatingFrame {
  const scenario = findScenario(scenarioId);

  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioId}`);
  }

  const assessments = scenario.workstreams
    .map(assessWorkstream)
    .sort((left, right) => right.dependencyLoad - left.dependencyLoad || left.readiness - right.readiness);

  const overallReadiness = Math.round(
    assessments.reduce((total, assessment) => total + assessment.readiness, 0) / assessments.length
  );

  return {
    scenario: scenario.name,
    audience: scenario.audience,
    horizonDays: scenario.horizonDays,
    overallReadiness,
    cadence: chooseCadence(overallReadiness, scenario.horizonDays),
    assessments,
    nextActions: assessments.slice(0, 3).map((assessment) => `${assessment.owner}: ${assessment.focus}`),
    disclaimer: cleanRoomDisclaimer
  };
}

function assessWorkstream(workstream: Workstream): WorkstreamAssessment {
  const signalAverage = workstream.signals.reduce((total, signal) => total + signal.score, 0) / workstream.signals.length;
  const dependencyPenalty = Math.min(workstream.dependencyCount * 4, 24);
  const readiness = clamp(Math.round(workstream.confidence * 0.6 + signalAverage * 0.4 - dependencyPenalty));
  const weakestSignal = workstream.signals.reduce((weakest, signal) => (signal.score < weakest.score ? signal : weakest));

  return {
    name: workstream.name,
    owner: workstream.owner,
    readiness,
    dependencyLoad: workstream.dependencyCount,
    priority: readiness < 62 || workstream.dependencyCount >= 4 ? "high" : readiness < 75 ? "medium" : "low",
    focus: `tighten ${weakestSignal.name}: ${weakestSignal.note}`
  };
}

function chooseCadence(readiness: number, horizonDays: number): string[] {
  const rituals = ["weekly launch review", "owner-written Friday risk notes"];

  if (readiness < 65 || horizonDays <= 21) {
    rituals.unshift("twice-weekly blocker review");
  }

  if (readiness >= 75) {
    rituals.push("single pre-launch go/no-go checkpoint");
  } else {
    rituals.push("scenario rehearsal before external comms");
  }

  return rituals;
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}
