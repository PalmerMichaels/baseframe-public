#!/usr/bin/env node
import { createFrame, listScenarios, type OperatingFrame } from "./frame.ts";

const [command = "help", scenarioId = "atlas-beta"] = process.argv.slice(2);

try {
  if (command === "list") {
    for (const scenario of listScenarios()) {
      console.log(`${scenario.id} - ${scenario.name} (${scenario.horizonDays} days, ${scenario.audience})`);
    }
  } else if (command === "frame") {
    console.log(formatFrame(createFrame(scenarioId)));
  } else if (command === "json") {
    console.log(JSON.stringify(createFrame(scenarioId), null, 2));
  } else {
    console.log(`baseframe\n\nUsage:\n  npm start -- list\n  npm start -- frame <scenario-id>\n  npm start -- json <scenario-id>`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

function formatFrame(frame: OperatingFrame): string {
  const assessments = frame.assessments
    .map(
      (assessment) =>
        `- ${assessment.name} (${assessment.owner}): ${assessment.readiness}/100, ${assessment.priority} priority, ${assessment.dependencyLoad} dependencies\n  Focus: ${assessment.focus}`
    )
    .join("\n");

  return [
    `# ${frame.scenario}`,
    `Audience: ${frame.audience}`,
    `Horizon: ${frame.horizonDays} days`,
    `Overall readiness: ${frame.overallReadiness}/100`,
    "",
    "Workstreams:",
    assessments,
    "",
    "Cadence:",
    ...frame.cadence.map((ritual) => `- ${ritual}`),
    "",
    "Next actions:",
    ...frame.nextActions.map((action) => `- ${action}`),
    "",
    "Disclaimer:",
    frame.disclaimer
  ].join("\n");
}
