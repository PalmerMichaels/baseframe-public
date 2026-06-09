import assert from "node:assert/strict";
import { assessInitiative, summarizePortfolio } from "./core.js";
import { cleanRoomNotice, initiatives } from "./data.js";

assert.equal(initiatives.length, 4, "expected four synthetic seed initiatives");
assert.match(cleanRoomNotice, /synthetic data only/i);
assert.match(cleanRoomNotice, /not a regulated/i);

for (const initiative of initiatives) {
  assert.match(initiative.id, /^BF-\d+$/, `initiative id should use demo format: ${initiative.id}`);
  assert.ok(initiative.name.length > 0, "initiative name is required");
  assert.ok(initiative.owner.length > 0, "owner is required");
  assert.ok(initiative.confidence >= 0 && initiative.confidence <= 1, "confidence must be normalized");
  assert.ok(initiative.impact >= 1 && initiative.impact <= 10, "impact must be bounded");
  assert.ok(initiative.effort >= 1 && initiative.effort <= 10, "effort must be bounded");

  const assessment = assessInitiative(initiative);
  assert.ok(assessment.score >= 0, "score must be non-negative");
}

const ordered = summarizePortfolio(initiatives, cleanRoomNotice, "2026-01-01T00:00:00.000Z");
assert.deepEqual(ordered.items.map((item) => item.id), ["BF-137", "BF-101", "BF-118", "BF-124"], "summary should be sorted by score descending");

console.log("Validation passed: synthetic seed data and scoring are deterministic.");
