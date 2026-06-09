import type { Dependency, LaunchFrame, NextAction, ProductSeed, ReadinessLevel } from "./types";

export function buildLaunchFrame(product: ProductSeed): LaunchFrame {
  const score = Math.round(product.signals.reduce((sum, signal) => sum + signal.score, 0) / product.signals.length);
  const dependencySummary = summarizeDependencies(product.dependencies);
  const level = classifyReadiness(score, dependencySummary.blocked);

  return {
    product,
    score,
    level,
    dependencySummary,
    nextActions: buildNextActions(product, score, dependencySummary.blocked)
  };
}

export function classifyReadiness(score: number, blockedDependencies: number): ReadinessLevel {
  if (blockedDependencies > 0 || score < 50) {
    return "blocked";
  }

  if (score < 70) {
    return "at-risk";
  }

  if (score < 85) {
    return "forming";
  }

  return "ready";
}

export function summarizeDependencies(dependencies: Dependency[]): Record<Dependency["status"], number> {
  return dependencies.reduce(
    (summary, dependency) => {
      summary[dependency.status] += 1;
      return summary;
    },
    { clear: 0, watch: 0, blocked: 0 }
  );
}

function buildNextActions(product: ProductSeed, score: number, blockedDependencies: number): NextAction[] {
  const actions: NextAction[] = [];
  const weakestSignal = [...product.signals].sort((a, b) => a.score - b.score)[0];
  const urgentDependency = [...product.dependencies].sort((a, b) => statusWeight(b.status) - statusWeight(a.status) || a.dueInDays - b.dueInDays)[0];

  if (blockedDependencies > 0 && urgentDependency) {
    actions.push({
      priority: "high",
      action: `Unblock ${urgentDependency.name} with ${urgentDependency.owner}.`,
      reason: "Blocked dependencies prevent a credible launch baseline."
    });
  }

  if (weakestSignal && weakestSignal.score < 75) {
    actions.push({
      priority: blockedDependencies > 0 ? "medium" : "high",
      action: `Raise ${weakestSignal.name.toLowerCase()} from ${weakestSignal.score} to at least 75.`,
      reason: weakestSignal.note
    });
  }

  if (score >= 75 && blockedDependencies === 0) {
    actions.push({
      priority: "medium",
      action: "Run one launch rehearsal using the synthetic baseline frame.",
      reason: "The frame is coherent enough to test timing, ownership, and message clarity."
    });
  }

  if (actions.length === 0) {
    actions.push({
      priority: "low",
      action: "Keep monitoring signals and refresh the baseline before launch review.",
      reason: "No immediate blocker was found in the synthetic frame."
    });
  }

  return actions;
}

function statusWeight(status: Dependency["status"]): number {
  if (status === "blocked") {
    return 2;
  }

  if (status === "watch") {
    return 1;
  }

  return 0;
}
