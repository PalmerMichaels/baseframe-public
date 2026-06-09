#!/usr/bin/env node
import { createAutomationFrame, listTeams, type AutomationFrame } from "./frame.ts";

const [command = "help", teamId = "nova-ops"] = process.argv.slice(2);

try {
  if (command === "list") {
    for (const team of listTeams()) {
      console.log(`${team.id} - ${team.name} (${team.stage})`);
    }
  } else if (command === "assess") {
    console.log(formatFrame(createAutomationFrame(teamId)));
  } else if (command === "json") {
    console.log(JSON.stringify(createAutomationFrame(teamId), null, 2));
  } else {
    console.log(`baseframe\n\nUsage:\n  npm start -- list\n  npm start -- assess <team-id>\n  npm start -- json <team-id>`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}

function formatFrame(frame: AutomationFrame): string {
  const workflows = frame.workflows
    .map((workflow) => {
      const tasks = workflow.recommendations
        .map(
          (task) =>
            `  - ${task.name} (${task.owner}): ${task.score}/100, ${task.priority}, saves ${task.monthlyHoursSaved}h/mo ($${task.monthlyValueUsd}/mo), effort ${task.effort}\n    ${task.recommendation}`
        )
        .join("\n");

      return `- ${workflow.name}: ${workflow.averageScore}/100\n  Onboarding need: ${workflow.onboardingNeed}\n  Apps: ${workflow.apps.join(", ")}\n${tasks}`;
    })
    .join("\n");

  return [
    `# ${frame.team}`,
    `Stage: ${frame.stage}`,
    `Overall automation opportunity: ${frame.overallOpportunity}/100`,
    `ROI view: ${frame.roiView.monthlyHoursSaved}h/mo saved, $${frame.roiView.monthlyValueUsd}/mo estimated value, ${frame.roiView.effortPoints} effort points`,
    "",
    "App/workflow inventory:",
    ...frame.inventory.map((item) => `- ${item}`),
    "",
    "Mocked integrations:",
    ...frame.mockedIntegrations.map((integration) => `- ${integration}`),
    "",
    "Automation recommendations:",
    workflows,
    "",
    "Next actions:",
    ...frame.nextActions.map((action) => `- ${action}`),
    "",
    "Disclaimer:",
    frame.disclaimer
  ].join("\n");
}
