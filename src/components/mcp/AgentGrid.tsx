/**
 * Agent Grid Component
 * Displays agents in grid or list view
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MCPAgent } from '../../types/mcp';
import { AgentItem } from './AgentItem';
import {
  Grid,
  List,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Settings,
} from 'lucide-react';

interface AgentGridProps {
  agents: MCPAgent[];
  view: 'grid' | 'list';
  onAgentAction: (agentId: number, action: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const AgentGrid: React.FC<AgentGridProps> = ({
  agents,
  view,
  onAgentAction,
  // searchQuery = '',
  // onSearchChange
}) => {
  const statusCounts = {
    active: agents.filter(a => a.status === 'active').length,
    idle: agents.filter(a => a.status === 'idle').length,
    maintenance: agents.filter(a => a.status === 'maintenance').length,
    error: agents.filter(a => a.status === 'error').length,
  };

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

  if (agents.length === 0) {
    return (
    <div className="text-center py-12 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
          <Search className="w-8 h-8 text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">No agents found</h3>
        <p className="text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Status Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {Object.entries(statusCounts).map(([status, count]) => {
          const Icon = getStatusIcon(status);
          const colorClass = getStatusColor(status);

          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <div
              key={status}
              className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Icon className={`w-5 h-5 ${colorClass}`} />
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white capitalize responsive-container sm:flex-col md:flex-row lg:grid">
                  {status}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">{count} agents</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agents Grid/List */}
      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AgentItem agent={agent} view="grid" onAction={onAgentAction} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
              >
                <AgentItem agent={agent} view="list" onAction={onAgentAction} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Info */}
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          Showing {agents.length} of {agents.length} agents
        </div>
        <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <span>View:</span>
          <div className="flex items-center gap-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              className={`p-1 rounded ${
                view === 'grid'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
             aria-label="Button">
              <Grid className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            <button
              className={`p-1 rounded ${
                view === 'list'
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
             aria-label="Button">
              <List className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
