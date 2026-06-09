import type { Initiative } from "./data.js";

export type InitiativeAssessment = Initiative & {
  score: number;
  priority: "watch" | "steady" | "focus";
  riskFlags: string[];
};

export type PortfolioSummary = {
  generatedAt: string;
  notice: string;
  averageScore: number;
  focusCount: number;
  watchCount: number;
  items: InitiativeAssessment[];
};

export function assessInitiative(initiative: Initiative): InitiativeAssessment {
  const freshnessPenalty = Math.min(initiative.lastSignalDaysAgo / 30, 1) * 1.5;
  const blockerPenalty = Math.min(initiative.blockers.length, 3) * 0.75;
  const rawScore = initiative.impact * initiative.confidence - initiative.effort * 0.35 - freshnessPenalty - blockerPenalty;
  const score = Math.max(0, Math.round(rawScore * 10) / 10);
  const riskFlags = buildRiskFlags(initiative);

  return {
    ...initiative,
    score,
    priority: score >= 4.5 && riskFlags.length <= 1 ? "focus" : score < 2.5 || riskFlags.length >= 2 ? "watch" : "steady",
    riskFlags
  };
}

export function summarizePortfolio(initiatives: Initiative[], notice: string, generatedAt = new Date().toISOString()): PortfolioSummary {
  const items = initiatives.map(assessInitiative).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const averageScore = items.length === 0 ? 0 : Math.round((items.reduce((total, item) => total + item.score, 0) / items.length) * 10) / 10;

  return {
    generatedAt,
    notice,
    averageScore,
    focusCount: items.filter((item) => item.priority === "focus").length,
    watchCount: items.filter((item) => item.priority === "watch").length,
    items
  };
}

export function renderSummary(summary: PortfolioSummary): string {
  const lines = [
    "Baseframe synthetic portfolio pulse",
    `Generated: ${summary.generatedAt}`,
    `Notice: ${summary.notice}`,
    `Average score: ${summary.averageScore.toFixed(1)} | Focus: ${summary.focusCount} | Watch: ${summary.watchCount}`,
    "",
    "Initiatives:"
  ];

  for (const item of summary.items) {
    lines.push(`- ${item.id} ${item.name} (${item.stage})`);
    lines.push(`  Owner: ${item.owner} | Priority: ${item.priority} | Score: ${item.score.toFixed(1)}`);
    lines.push(`  Risks: ${item.riskFlags.length > 0 ? item.riskFlags.join("; ") : "none"}`);
  }

  return lines.join("\n");
}

function buildRiskFlags(initiative: Initiative): string[] {
  const flags: string[] = [];

  if (initiative.confidence < 0.55) {
    flags.push("low confidence");
  }

  if (initiative.lastSignalDaysAgo > 14) {
    flags.push("stale signal");
  }

  if (initiative.effort >= 7 && initiative.stage === "discovery") {
    flags.push("large discovery effort");
  }

  if (initiative.blockers.length > 0) {
    flags.push(`${initiative.blockers.length} blocker${initiative.blockers.length === 1 ? "" : "s"}`);
  }

  return flags;
}
