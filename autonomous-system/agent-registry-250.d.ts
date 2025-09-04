export interface AgentRegistry {
  id: string;
  name: string;
  jobTitle: string;
  jobDuties: string[];
  type: string;
  priority: string;
  permissions: string[];
  category: string;
  phase: number;
  estimatedCompletion: string;
  dependencies: string[];
  performanceMetrics: {
    successRate: number;
    avgResponseTime: number;
    taskCapacity: number;
  };
}

export declare const ALL_250_AGENTS: AgentRegistry[];
