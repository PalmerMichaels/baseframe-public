import assert from "node:assert/strict";
import { cleanRoomDisclaimer, scenarios } from "../src/data.ts";
import { createFrame } from "../src/frame.ts";

const ids = new Set<string>();

assert.match(cleanRoomDisclaimer, /fictional synthetic/i);
assert.match(cleanRoomDisclaimer, /No affiliation/i);
assert.match(cleanRoomDisclaimer, /Not for regulated/i);

for (const scenario of scenarios) {
  assert.match(scenario.id, /^[a-z0-9-]+$/);
  assert.ok(!ids.has(scenario.id), `duplicate scenario id: ${scenario.id}`);
  ids.add(scenario.id);
  assert.ok(scenario.horizonDays > 0, `${scenario.id} must have a positive horizon`);
  assert.ok(scenario.audience.toLowerCase().includes("synthetic"), `${scenario.id} audience should be synthetic`);
  assert.ok(scenario.workstreams.length >= 2, `${scenario.id} must include multiple workstreams`);

  const frame = createFrame(scenario.id);
  assert.equal(frame.assessments.length, scenario.workstreams.length);
  assert.ok(frame.cadence.length >= 3, `${scenario.id} must produce a useful cadence`);
  assert.equal(frame.disclaimer, cleanRoomDisclaimer);

  for (const workstream of scenario.workstreams) {
    assert.ok(workstream.owner.length > 0, `${scenario.id} workstream needs an owner`);
    assert.ok(workstream.signals.length >= 2, `${workstream.name} needs at least two signals`);

    for (const signal of workstream.signals) {
      assert.ok(signal.score >= 0 && signal.score <= 100, `${signal.name} score out of range`);
      assert.ok(signal.note.toLowerCase().includes("synthetic"), `${signal.name} should be clearly synthetic`);
    }
  }
}

console.log(`Validated ${scenarios.length} synthetic scenarios.`);
