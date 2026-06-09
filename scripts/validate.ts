import assert from "node:assert/strict";
import { cleanRoomDisclaimer, teams } from "../src/data.ts";
import { createAutomationFrame } from "../src/frame.ts";

const ids = new Set<string>();
const requiredScope = [
  "onboarding/team context",
  "app/workflow inventory",
  "automation opportunity scoring",
  "task recommendations",
  "ROI/effort views",
  "synthetic data",
  "mocked integrations"
];

assert.match(cleanRoomDisclaimer, /fictional synthetic AI-automation/i);
assert.match(cleanRoomDisclaimer, /Mocked integrations/i);
assert.match(cleanRoomDisclaimer, /No affiliation/i);
assert.match(cleanRoomDisclaimer, /Not for regulated/i);

for (const team of teams) {
  assert.match(team.id, /^[a-z0-9-]+$/);
  assert.ok(!ids.has(team.id), `duplicate team id: ${team.id}`);
  ids.add(team.id);
  assert.ok(team.stage.toLowerCase().includes("synthetic"), `${team.id} stage should be synthetic`);
  assert.ok(team.hourlyCostUsd > 0, `${team.id} must have positive ROI assumptions`);
  assert.ok(team.integrations.length >= 2, `${team.id} must include mocked integrations`);
  assert.ok(team.workflows.length >= 1, `${team.id} must include workflows`);

  const frame = createAutomationFrame(team.id);
  assert.equal(frame.workflows.length, team.workflows.length);
  assert.deepEqual(frame.scopeCoverage, requiredScope, `${team.id} must cover the assigned BaseFrame scope`);
  assert.ok(frame.inventory.length >= team.workflows.length, `${team.id} must produce inventory`);
  assert.ok(frame.nextActions.length > 0, `${team.id} must produce next actions`);
  assert.ok(frame.roiView.monthlyHoursSaved > 0, `${team.id} must produce ROI hours`);
  assert.ok(frame.roiView.effortPoints > 0, `${team.id} must produce effort points`);
  assert.equal(frame.disclaimer, cleanRoomDisclaimer);

  for (const integration of team.integrations) {
    assert.equal(integration.status, "mocked");
    assert.ok(integration.note.toLowerCase().includes("synthetic"), `${integration.app} should be synthetic`);
  }

  for (const workflow of team.workflows) {
    assert.ok(workflow.onboardingNeed.length > 20, `${workflow.name} needs onboarding context`);
    assert.ok(workflow.apps.length > 0, `${workflow.name} needs app inventory`);
    assert.ok(workflow.tasks.length >= 2, `${workflow.name} needs at least two tasks`);

    for (const task of workflow.tasks) {
      assert.ok(task.owner.length > 0, `${workflow.name} task needs an owner`);
      assert.ok(task.monthlyRuns > 0, `${task.name} needs monthly volume`);
      assert.ok(task.minutesPerRun > 0, `${task.name} needs duration`);
      assert.ok(task.note.toLowerCase().includes("synthetic"), `${task.name} should be clearly synthetic`);
      for (const score of [task.repeatability, task.dataReadiness, task.risk, task.effort]) {
        assert.ok(score >= 0 && score <= 100, `${task.name} score out of range`);
      }
    }
  }
}

console.log(`Validated ${teams.length} synthetic automation team profiles.`);
