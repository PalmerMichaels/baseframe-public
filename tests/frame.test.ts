import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createAutomationFrame, listTeams } from "../src/frame.ts";

describe("baseframe automation frames", () => {
  it("lists synthetic team profiles", () => {
    const teamList = listTeams();

    assert.equal(teamList.length, 2);
    assert.deepEqual(
      teamList.map((team) => team.id),
      ["nova-ops", "cobalt-people"]
    );
  });

  it("creates a prioritized automation frame", () => {
    const frame = createAutomationFrame("nova-ops");

    assert.equal(frame.team, "Nova Ops Studio");
    assert.ok(frame.overallOpportunity >= 0 && frame.overallOpportunity <= 100);
    assert.ok(frame.inventory[0].includes("MockCRM"));
    assert.ok(frame.mockedIntegrations.every((integration) => integration.includes("mocked")));
    assert.ok(frame.roiView.monthlyHoursSaved > 0);
    assert.equal(frame.workflows[0].recommendations[0].priority, "now");
    assert.match(frame.nextActions[0], /Draft kickoff summary|Flag stale success plan/);
    assert.match(frame.disclaimer, /fictional synthetic AI-automation/);
  });

  it("rejects unknown team profiles", () => {
    assert.throws(() => createAutomationFrame("missing"), /Unknown team profile/);
  });
});
