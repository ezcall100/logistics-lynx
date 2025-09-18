/**
 * MCP Agent Statistics Hook
 * Aggregates agent metrics and provides real-time data
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import { useState, useEffect, useMemo } from 'react';
import { MCPAgent, MCPAgentFilter, MCPDashboardStats, MCPSystemHealth } from '../types/mcp';
import { mcpAgents, mcpSystemHealth } from '../data/agents';

export const useAgentStats = () => {
  const [agents, setAgents] = useState<MCPAgent[]>(mcpAgents);
  const [systemHealth, setSystemHealth] = useState<MCPSystemHealth>(mcpSystemHealth);
  const [filter, setFilter] = useState<MCPAgentFilter>({
    search: '',
    status: 'all',
    portal: 'all',
    role: 'all',
    priority: 'all',
  });

  // Filter agents based on current filter
  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch =
        !filter.search ||
        agent.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        agent.role.toLowerCase().includes(filter.search.toLowerCase()) ||
        agent.portal.toLowerCase().includes(filter.search.toLowerCase()) ||
        agent.assignedTask.toLowerCase().includes(filter.search.toLowerCase());

      const matchesStatus = filter.status === 'all' || agent.status === filter.status;
      const matchesPortal = filter.portal === 'all' || agent.portal === filter.portal;
      const matchesRole = filter.role === 'all' || agent.role === filter.role;
      const matchesPriority = filter.priority === 'all' || agent.priority === filter.priority;

      return matchesSearch && matchesStatus && matchesPortal && matchesRole && matchesPriority;
    });
  }, [agents, filter]);

  // Calculate dashboard statistics
  const dashboardStats = useMemo((): MCPDashboardStats => {
    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active').length;
    const idleAgents = agents.filter(a => a.status === 'idle').length;
    const maintenanceAgents = agents.filter(a => a.status === 'maintenance').length;
    const errorAgents = agents.filter(a => a.status === 'error').length;

    const totalProgress = agents.reduce((sum, agent) => sum + agent.progress, 0) / totalAgents;
    const tasksCompletedToday = agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0);
    const errorsToday = agents.reduce((sum, agent) => sum + agent.errorCount, 0);

    const systemHealthStatus =
      errorAgents > 10 ? 'critical' : errorAgents > 5 ? 'degraded' : 'healthy';

    return {
      totalAgents,
      activeAgents,
      idleAgents,
      maintenanceAgents,
      errorAgents,
      systemUptime: systemHealth.systemUptime,
      totalProgress: Math.round(totalProgress),
      tasksCompletedToday,
      errorsToday,
      systemHealth: systemHealthStatus,
    };
  }, [agents, systemHealth]);

  // Get agents by status
  const getAgentsByStatus = (status: string) => {
    return agents.filter(agent => agent.status === status);
  };

  // Get agents by portal
  const getAgentsByPortal = (portal: string) => {
    return agents.filter(agent => agent.portal === portal);
  };

  // Get top performing agents
  const getTopPerformers = (limit: number = 10) => {
    return agents.sort((a, b) => b.progress - a.progress).slice(0, limit);
  };

  // Get agents with errors
  const getAgentsWithErrors = () => {
    return agents.filter(agent => agent.errorCount > 0);
  };

  // Get system health metrics
  const getSystemMetrics = () => {
    const totalCpuUsage = agents.reduce((sum, agent) => sum + agent.cpuUsage, 0);
    const totalMemoryUsage = agents.reduce((sum, agent) => sum + agent.memoryUsage, 0);
    const averageCpuUsage = totalCpuUsage / agents.length;
    const averageMemoryUsage = totalMemoryUsage / agents.length;

    return {
      averageCpuUsage: Math.round(averageCpuUsage),
      averageMemoryUsage: Math.round(averageMemoryUsage),
      totalTasksCompleted: agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0),
      totalErrors: agents.reduce((sum, agent) => sum + agent.errorCount, 0),
    };
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prevAgents =>
        prevAgents.map(agent => {
          // Simulate progress updates
          const progressChange = Math.random() > 0.7 ? Math.floor(Math.random() * 5) - 2 : 0;
          const newProgress = Math.max(0, Math.min(100, agent.progress + progressChange));

          // Simulate status changes
          let newStatus = agent.status;
          if (Math.random() > 0.95) {
            const statuses = ['active', 'idle', 'maintenance', 'error'];
            newStatus = statuses[Math.floor(Math.random() * statuses.length)] as
              | 'active'
              | 'idle'
              | 'maintenance'
              | 'error';
          }

          // Simulate resource usage changes
          const cpuChange = Math.floor(Math.random() * 10) - 5;
          const memoryChange = Math.floor(Math.random() * 10) - 5;
          const newCpuUsage = Math.max(0, Math.min(100, agent.cpuUsage + cpuChange));
          const newMemoryUsage = Math.max(0, Math.min(100, agent.memoryUsage + memoryChange));

          return {
            ...agent,
            progress: newProgress,
            status: newStatus,
            cpuUsage: newCpuUsage,
            memoryUsage: newMemoryUsage,
            lastUpdated: new Date().toISOString(),
            lastHealthCheck: new Date().toISOString(),
          };
        })
      );

      // Update system health
      setSystemHealth(prevHealth => ({
        ...prevHealth,
        lastHealthCheck: new Date().toISOString(),
        averageCpuUsage: Math.floor(Math.random() * 20) + 30,
        averageMemoryUsage: Math.floor(Math.random() * 20) + 40,
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    agents: filteredAgents,
    allAgents: agents,
    systemHealth,
    dashboardStats,
    filter,
    setFilter,
    getAgentsByStatus,
    getAgentsByPortal,
    getTopPerformers,
    getAgentsWithErrors,
    getSystemMetrics,
  };
};