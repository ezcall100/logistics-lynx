/**
 * Agent Item Component
 * Individual agent display card
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MCPAgent } from '../../types/mcp';
import { AgentHealthBadge } from './AgentHealthBadge';
import { AgentActionMenu } from './AgentActionMenu';
import {
  Activity,
  Clock,
  Settings,
  AlertTriangle,
  CheckCircle,
  Cpu,
  MemoryStick,
  MoreHorizontal,
} from 'lucide-react';

interface AgentItemProps {
  agent: MCPAgent;
  view: 'grid' | 'list';
  onAction: (agentId: number, action: string) => void;
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return Activity;
    case 'idle':
      return Clock;
    case 'maintenance':
      return Settings;
    case 'error':
      return AlertTriangle;
    default:
      return CheckCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'text-green-600 dark:text-green-400';
    case 'idle':
      return 'text-gray-600 dark:text-gray-400';
    case 'maintenance':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'error':
      return 'text-red-600 dark:text-red-400';
    default:
      return 'text-blue-600 dark:text-blue-400';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export const AgentItem: React.FC<AgentItemProps> = ({ agent, view, onAction }) => {
  // const [showActions, setShowActions] = useState(false);
  const StatusIcon = getStatusIcon(agent.status);
  const statusColor = getStatusColor(agent.status);
  const priorityColor = getPriorityColor(agent.priority);

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (view === 'list') {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center gap-4 flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
              {/* Status Icon */}
              <div className="flex-shrink-0 responsive-container sm:flex-col md:flex-row lg:grid">
                <StatusIcon className={`w-6 h-6 ${statusColor}`} />
              </div>

              {/* Agent Info */}
              <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center gap-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate responsive-container sm:flex-col md:flex-row lg:grid">
                    {agent.name}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColor}`}>
                    {agent.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>{agent.role}</span>
                  <span>•</span>
                  <span>{agent.portal}</span>
                  <span>•</span>
                  <span>{formatLastUpdated(agent.lastUpdated)}</span>
                </div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-500 truncate responsive-container sm:flex-col md:flex-row lg:grid">
                  {agent.assignedTask}
                </div>
              </div>

              {/* Progress */}
              <div className="flex-shrink-0 w-32 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {agent.progress}%
                  </span>
                  <AgentHealthBadge status={agent.status} />
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-2 rounded-full ${
                      agent.progress >= 80
                        ? 'bg-green-500'
                        : agent.progress >= 60
                          ? 'bg-yellow-500'
                          : agent.progress >= 40
                            ? 'bg-orange-500'
                            : 'bg-red-500'
                    }`}
                  ></motion.div>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="flex-shrink-0 w-24 text-right responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Resources</div>
                <div className="flex items-center gap-2 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center gap-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Cpu className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>{agent.cpuUsage}%</span>
                  </div>
                  <div className="flex items-center gap-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <MemoryStick className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>{agent.memoryUsage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 ml-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <AgentActionMenu
                agent={agent}
                onAction={onAction}
                trigger={
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <MoreHorizontal className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group responsive-container sm:flex-col md:flex-row lg:grid"
    >
      <div className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <StatusIcon className={`w-5 h-5 ${statusColor}`} />
            <AgentHealthBadge status={agent.status} />
          </div>
          <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColor}`}>
              {agent.priority}
            </span>
            <AgentActionMenu
              agent={agent}
              onAction={onAction}
              trigger={
                <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded transition-colors opacity-0 group-hover:opacity-100 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <MoreHorizontal className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              }
            />
          </div>
        </div>

        {/* Agent Name */}
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 truncate responsive-container sm:flex-col md:flex-row lg:grid">
          {agent.name}
        </h3>

        {/* Role and Portal */}
        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="truncate responsive-container sm:flex-col md:flex-row lg:grid">{agent.role}</div>
          <div className="truncate responsive-container sm:flex-col md:flex-row lg:grid">{agent.portal}</div>
        </div>

        {/* Progress */}
        <div className="mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Progress</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              {agent.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${agent.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-2 rounded-full ${
                agent.progress >= 80
                  ? 'bg-green-500'
                  : agent.progress >= 60
                    ? 'bg-yellow-500'
                    : agent.progress >= 40
                      ? 'bg-orange-500'
                      : 'bg-red-500'
              }`}
            ></motion.div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="grid grid-cols-2 gap-3 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-center gap-1 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <Cpu className="w-3 h-3 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU</span>
            </div>
            <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              {agent.cpuUsage}%
            </div>
          </div>
          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-center gap-1 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <MemoryStick className="w-3 h-3 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory</span>
            </div>
            <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              {agent.memoryUsage}%
            </div>
          </div>
        </div>

        {/* Task Info */}
        <div className="text-xs text-slate-500 dark:text-slate-500 mb-2 truncate responsive-container sm:flex-col md:flex-row lg:grid">
          {agent.assignedTask}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
          <span>{formatLastUpdated(agent.lastUpdated)}</span>
          <span>{agent.tasksCompleted} tasks</span>
        </div>
      </div>
    </motion.div>
  );
};
