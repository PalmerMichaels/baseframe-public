export type ReadinessLevel = "blocked" | "at-risk" | "forming" | "ready";

export interface ReadinessSignal {
  name: string;
  score: number;
  note: string;
}

export interface Dependency {
  name: string;
  owner: string;
  status: "clear" | "watch" | "blocked";
  dueInDays: number;
}

export interface ProductSeed {
  id: string;
  name: string;
  fictionalTeam: string;
  launchWindow: string;
  audience: string;
  signals: ReadinessSignal[];
  dependencies: Dependency[];
}

export interface NextAction {
  priority: "high" | "medium" | "low";
  action: string;
  reason: string;
}

export interface LaunchFrame {
  product: ProductSeed;
  score: number;
  level: ReadinessLevel;
  dependencySummary: Record<Dependency["status"], number>;
  nextActions: NextAction[];
}
