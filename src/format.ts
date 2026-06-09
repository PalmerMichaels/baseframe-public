import { CLEAN_ROOM_DISCLAIMER } from "./seed";
import type { LaunchFrame } from "./types";

export function formatTextReport(frames: LaunchFrame[]): string {
  const lines = ["Baseframe Launch Baseline Frames", CLEAN_ROOM_DISCLAIMER, ""];

  for (const frame of frames) {
    lines.push(`${frame.product.name} (${frame.product.id})`);
    lines.push(`Team: ${frame.product.fictionalTeam}`);
    lines.push(`Window: ${frame.product.launchWindow}`);
    lines.push(`Audience: ${frame.product.audience}`);
    lines.push(`Readiness: ${frame.score}/100 (${frame.level})`);
    lines.push(
      `Dependencies: ${frame.dependencySummary.clear} clear, ${frame.dependencySummary.watch} watch, ${frame.dependencySummary.blocked} blocked`
    );
    lines.push("Signals:");

    for (const signal of frame.product.signals) {
      lines.push(`- ${signal.name}: ${signal.score}/100 - ${signal.note}`);
    }

    lines.push("Next actions:");

    for (const action of frame.nextActions) {
      lines.push(`- [${action.priority}] ${action.action} Reason: ${action.reason}`);
    }

    lines.push("");
  }

  return lines.join("\n").trimEnd();
}

export function formatJsonReport(frames: LaunchFrame[]): string {
  return JSON.stringify(
    {
      disclaimer: CLEAN_ROOM_DISCLAIMER,
      generatedFrom: "synthetic-seed-data",
      frames
    },
    null,
    2
  );
}
