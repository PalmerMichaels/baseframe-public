import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createFrame, listScenarios } from "../src/frame.ts";

describe("baseframe operating frames", () => {
  it("lists synthetic scenarios", () => {
    const scenarioList = listScenarios();

    assert.equal(scenarioList.length, 2);
    assert.deepEqual(
      scenarioList.map((scenario) => scenario.id),
      ["atlas-beta", "cobalt-migration"]
    );
  });

  it("creates a prioritized frame", () => {
    const frame = createFrame("cobalt-migration");

    assert.equal(frame.scenario, "Cobalt Migration Pilot");
    assert.ok(frame.overallReadiness >= 0 && frame.overallReadiness <= 100);
    assert.equal(frame.assessments[0].name, "Observability");
    assert.ok(frame.nextActions[0].includes("Leah"));
    assert.match(frame.disclaimer, /fictional synthetic/);
  });

  it("rejects unknown scenarios", () => {
    assert.throws(() => createFrame("missing"), /Unknown scenario/);
  });
});
