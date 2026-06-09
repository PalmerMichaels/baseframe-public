#!/usr/bin/env node
import { cleanRoomNotice, initiatives } from "./data.js";
import { renderSummary, summarizePortfolio } from "./core.js";

const args = new Set(process.argv.slice(2));

if (args.has("--help") || args.has("-h")) {
  console.log([
    "baseframe - clean-room synthetic portfolio pulse",
    "",
    "Usage:",
    "  baseframe          Print a readable summary",
    "  baseframe --json   Print JSON output",
    "  baseframe --help   Show this help",
    "",
    "Disclaimer:",
    `  ${cleanRoomNotice}`
  ].join("\n"));
  process.exit(0);
}

const unknownArgs = [...args].filter((arg) => arg !== "--json");

if (unknownArgs.length > 0) {
  console.error(`Unknown argument: ${unknownArgs.join(", ")}`);
  console.error("Run `baseframe --help` for usage.");
  process.exit(1);
}

const summary = summarizePortfolio(initiatives, cleanRoomNotice);

if (args.has("--json")) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(renderSummary(summary));
}
