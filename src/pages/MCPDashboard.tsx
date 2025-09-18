/**
 * MCP Agents Dashboard - Mission Control System
 * 302 Autonomous Agents - 24/7 Runtime
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useTheme } from '../contexts/ThemeContext';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Filter,
  RefreshCw,
  Settings,
  Users,
  RotateCcw,
  MemoryStick,
  Grid,
  List,
} from 'lucide-react';

// Import MCP Components
import { AgentStatusCard } from '../components/mcp/AgentStatusCard';
import { AgentGrid } from '../components/mcp/AgentGrid';
import { AgentFilter } from '../components/mcp/AgentFilter';
import { MCPProgressChart } from '../components/mcp/MCPProgressChart';
import { MCPActivityLog } from '../components/mcp/MCPActivityLog';
import { AgentHealthBadge } from '../components/mcp/AgentHealthBadge';
import { useAgentStats } from '../hooks/useAgentStats';

export const MCPDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const {
    agents,
    systemHealth,
    dashboardStats,
    filter,
    setFilter,
    getTopPerformers,
    getSystemMetrics,
  } = useAgentStats();

  const systemMetrics = getSystemMetrics();
  const topPerformers = getTopPerformers(5);

  const handleAgentAction = (agentId: number, action: string) => {
    console.log(`Agent ${agentId} action: ${action}`);
    // Implement agent actions (restart, suspend, view logs, etc.)
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`);
    // Implement bulk actions (restart all, suspend all, etc.)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center gap-4 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-2xl responsive-container sm:flex-col md:flex-row lg:grid">
                <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  MCP Agents Dashboard
                </h1>
                <p className="text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  Mission Control System • 302 Autonomous Agents • 24/7 Runtime
                </p>
              </div>
            </div>

            {/* System Status */}
            <div className="flex items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  systemHealth.systemStatus === 'healthy'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : systemHealth.systemStatus === 'degraded'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-current mr-2 inline-block responsive-container sm:flex-col md:flex-row lg:grid"></div>
                System {systemHealth.systemStatus}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                Uptime: {systemHealth.systemUptime}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                Last Check: {new Date(systemHealth.lastHealthCheck).toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() => setShowFilters(!showFilters)}
            aria-label="Button"
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Filter className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Filters</span>
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
            aria-label="Button"
              className={`px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                autoRefresh
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto Refresh</span>
            </button>
            <button
              onClick={() => handleBulkAction('restart')}
            aria-label="Button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <RotateCcw className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Restart All</span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <AgentStatusCard
            label="Total Agents"
            value={dashboardStats.totalAgents}
            icon={Users}
            color="blue"
            trend="+2"
          />
          <AgentStatusCard
            label="Active"
            value={dashboardStats.activeAgents}
            icon={Activity}
            color="green"
            status="active"
            trend="+5"
          />
          <AgentStatusCard
            label="Idle"
            value={dashboardStats.idleAgents}
            icon={Clock}
            color="gray"
            status="idle"
            trend="-3"
          />
          <AgentStatusCard
            label="Maintenance"
            value={dashboardStats.maintenanceAgents}
            icon={Settings}
            color="yellow"
            status="maintenance"
            trend="+1"
          />
          <AgentStatusCard
            label="Errors"
            value={dashboardStats.errorAgents}
            icon={AlertTriangle}
            color="red"
            status="error"
            trend="-2"
          />
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                System Progress Overview
              </h2>
              <div className="flex items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {dashboardStats.totalProgress}%
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Overall Progress</div>
                </div>
                <div className="w-16 h-16 relative responsive-container sm:flex-col md:flex-row lg:grid">
                  <svg className="w-16 h-16 transform -rotate-90 responsive-container sm:flex-col md:flex-row lg:grid" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-700 responsive-container sm:flex-col md:flex-row lg:grid"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-blue-600 dark:text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      strokeDasharray={`${dashboardStats.totalProgress}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <MCPProgressChart />
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <AgentFilter filter={filter} onFilterChange={setFilter} agents={agents} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Agent Grid */}
          <div className="lg:col-span-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    Agent Status ({agents.length})
                  </h2>
                  <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <button
                      onClick={() => setSelectedView('grid')}
            aria-label="Button"
                      className={`p-2 rounded-lg transition-colors ${
                        selectedView === 'grid'
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <Grid className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                    <button
                      onClick={() => setSelectedView('list')}
            aria-label="Button"
                      className={`p-2 rounded-lg transition-colors ${
                        selectedView === 'list'
                          ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <List className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </div>
                </div>

                <AgentGrid agents={agents} view={selectedView} onAgentAction={handleAgentAction} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* System Metrics */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  System Metrics
                </h3>
                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Cpu className="w-4 h-4 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU Usage</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.averageCpuUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div
                      className="h-2 rounded-full bg-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ width: `${systemMetrics.averageCpuUsage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <MemoryStick className="w-4 h-4 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        Memory Usage
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.averageMemoryUsage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div
                      className="h-2 rounded-full bg-green-500 responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ width: `${systemMetrics.averageMemoryUsage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <CheckCircle className="w-4 h-4 text-purple-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        Tasks Completed
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.totalTasksCompleted.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <AlertTriangle className="w-4 h-4 text-red-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        Total Errors
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.totalErrors}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  Top Performers
                </h3>
                <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  {topPerformers.map((agent, index) => (
                    <div key={agent.id} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {agent.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                            {agent.portal}
                          </div>
                        </div>
                      </div>
                      <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {agent.progress}%
                        </div>
                        <AgentHealthBadge status={agent.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  Recent Activity
                </h3>
                <MCPActivityLog />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPDashboard;
}