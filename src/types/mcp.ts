/**
 * MCP Agent System Type Definitions
 * 302 Autonomous Agents - 24/7 Runtime
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

export type MCPAgentStatus = 'active' | 'idle' | 'maintenance' | 'error';

export type MCPAgentRole =
  | 'Strategy Planner'
  | 'Test Case Generator'
  | 'Form Validator'
  | 'Table Tester'
  | 'API Validator'
  | 'Workflow Tester'
  | 'Style Checker'
  | 'Vulnerability Scanner'
  | 'Penetration Tester'
  | 'Release Validator'
  | 'Real-Time Validator'
  | 'UI Builder'
  | 'Database Optimizer'
  | 'Security Auditor'
  | 'Performance Monitor'
  | 'Integration Tester'
  | 'Compliance Checker'
  | 'Documentation Generator'
  | 'Code Reviewer'
  | 'Deployment Manager';

export type MCPPortal =
  | 'Super Admin'
  | 'TMS'
  | 'CRM'
  | 'EDI'
  | 'Factoring'
  | 'Marketplace'
  | 'Analytics'
  | 'Directory'
  | 'Communication Hub'
  | 'System Administration'
  | 'Development & DevOps'
  | 'User Management'
  | 'MCP Agents'
  | 'Global';

export interface MCPAgent {
  id: number;
  name: string;
  role: MCPAgentRole;
  portal: MCPPortal;
  status: MCPAgentStatus;
  assignedTask: string;
  lastUpdated: string;
  progress: number; // Percent 0–100%
  uptime: string;
  tasksCompleted: number;
  errorCount: number;
  lastError?: string;
  cpuUsage: number;
  memoryUsage: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: number[];
  capabilities: string[];
  version: string;
  lastHealthCheck: string;
}

export interface MCPActivityLog {
  id: string;
  agentId: number;
  agentName: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
  details?: string;
  portal: MCPPortal;
}

export interface MCPProgressData {
  portal: MCPPortal;
  progress: number;
  agents: number;
  activeAgents: number;
  completedTasks: number;
  totalTasks: number;
  lastUpdate: string;
}

export interface MCPSystemHealth {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  maintenanceAgents: number;
  errorAgents: number;
  systemUptime: string;
  lastHealthCheck: string;
  averageCpuUsage: number;
  averageMemoryUsage: number;
  totalTasksCompleted: number;
  totalErrors: number;
  systemStatus: 'healthy' | 'degraded' | 'critical';
}

export interface MCPAgentFilter {
  search: string;
  status: MCPAgentStatus | 'all';
  portal: MCPPortal | 'all';
  role: MCPAgentRole | 'all';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'all';
}

export interface MCPAgentAction {
  id: string;
  name: string;
  icon: string;
  description: string;
  action: (agentId: number) => void;
  requiresConfirmation: boolean;
  isDestructive: boolean;
}

export interface MCPDashboardStats {
  totalAgents: number;
  activeAgents: number;
  idleAgents: number;
  maintenanceAgents: number;
  errorAgents: number;
  systemUptime: string;
  totalProgress: number;
  tasksCompletedToday: number;
  errorsToday: number;
  systemHealth: 'healthy' | 'degraded' | 'critical';
}