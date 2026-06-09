const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const { buildLaunchFrame, classifyReadiness } = require("../dist/frameBuilder");
const { productSeeds, CLEAN_ROOM_DISCLAIMER } = require("../dist/seed");
const { run } = require("../dist/index");

assert.equal(classifyReadiness(91, 0), "ready");
assert.equal(classifyReadiness(84, 0), "forming");
assert.equal(classifyReadiness(69, 0), "at-risk");
assert.equal(classifyReadiness(92, 1), "blocked");

const atlas = buildLaunchFrame(productSeeds[0]);
assert.equal(atlas.score, 72);
assert.equal(atlas.level, "forming");
assert.equal(atlas.dependencySummary.watch, 2);
assert.ok(atlas.nextActions.some((action) => action.action.includes("support readiness")));

const brisk = buildLaunchFrame(productSeeds[1]);
assert.equal(brisk.level, "blocked");
assert.ok(brisk.nextActions[0].action.includes("Pilot rubric"));

const textOutput = run(["--product", "cedar-grid"]);
assert.match(textOutput, /Baseframe Launch Baseline Frames/);
assert.match(textOutput, /Clean-room demo/);
assert.match(textOutput, /Cedar Grid/);

const jsonOutput = JSON.parse(run(["--json", "--product", "brisk-foundry"]));
assert.equal(jsonOutput.disclaimer, CLEAN_ROOM_DISCLAIMER);
assert.equal(jsonOutput.frames.length, 1);
assert.equal(jsonOutput.frames[0].product.id, "brisk-foundry");

for (const product of productSeeds) {
  const serialized = JSON.stringify(product).toLowerCase();
  assert.doesNotMatch(serialized, /api[_-]?key|secret|token|password|credential/);
  assert.match(product.fictionalTeam, /Fictional|Studio|Lab|Works/);
}

const cliOutput = execFileSync(process.execPath, ["dist/index.js", "--list"], { encoding: "utf8" });
assert.match(cliOutput, /atlas-pulse/);
assert.match(cliOutput, /brisk-foundry/);

console.log("baseframe validation passed");
