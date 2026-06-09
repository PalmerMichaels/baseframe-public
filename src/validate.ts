import assert from "node:assert/strict";
import { scoreAll, scoreProject } from "./core.js";
import { seedProjects } from "./data.js";

assert.equal(seedProjects.length, 3, "expected three synthetic seed projects");

for (const project of seedProjects) {
  assert.match(project.id, /^[a-z0-9-]+$/, `project id should be slug-like: ${project.id}`);
  assert.ok(project.name.length > 0, "project name is required");
  assert.ok(project.owner.startsWith("Demo Team"), "owners must be fabricated demo teams");
  assert.ok(project.checklist.length >= 4, "each project needs a complete readiness checklist");

  const score = scoreProject(project);
  assert.ok(score.totalWeight > 0, "total checklist weight must be positive");
  assert.ok(score.score >= 0 && score.score <= 100, "score must be between 0 and 100");
}

const ordered = scoreAll();
assert.deepEqual(
  ordered.map((score) => score.project.id),
  ["signal-canvas", "atlas-notes", "garden-grid"],
  "summary should be sorted by readiness score descending"
);

console.log("Validation passed: seed data shape and readiness scoring are deterministic.");
