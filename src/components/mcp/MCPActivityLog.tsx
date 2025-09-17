/**
 * MCP Activity Log Component
 * Real-time activity feed for agent actions
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mcpActivityLogs } from '../../data/agents';
import type { MCPActivityLog as MCPActivityLogType } from '../../types/mcp';
import { Activity, CheckCircle, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export const MCPActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<MCPActivityLogType[]>(mcpActivityLogs);
  const [filter, setFilter] = useState<'all' | 'success' | 'warning' | 'error' | 'info'>('all');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      case 'info':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
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

  const filteredLogs = logs.filter(log => filter === 'all' || log.status === filter);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLogs(prevLogs => {
        const newLog: MCPActivityLogType = {
          id: `log-${Date.now()}`,
          agentId: Math.floor(Math.random() * 302) + 1,
          agentName: `Agent-${Math.floor(Math.random() * 302) + 1}`,
          action: [
            'Completed task',
            'Started new task',
            'Fixed bug',
            'Updated configuration',
            'Performed security scan',
            'Generated test cases',
            'Validated API endpoint',
            'Optimized database query',
            'Updated documentation',
            'Deployed to staging',
          ][Math.floor(Math.random() * 10)],
          timestamp: new Date().toISOString(),
          status: (['success', 'warning', 'error', 'info'] as const)[Math.floor(Math.random() * 4)],
          details: 'Real-time activity update',
          portal: (
            [
              'Super Admin',
              'TMS',
              'CRM',
              'EDI',
              'Factoring',
              'Marketplace',
              'Analytics',
              'Directory',
              'Communication Hub',
              'System Administration',
            ] as const
          )[Math.floor(Math.random() * 10)],
        };

        return [newLog, ...prevLogs.slice(0, 19)]; // Keep only last 20 logs
      });
    }, 3000);

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Activity Feed</h3>
        <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={() = aria-label="Button"> setAutoRefresh(!autoRefresh)}
            className={`p-2 rounded-lg transition-colors ${
              autoRefresh
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          { value: 'all', label: 'All', count: logs.length },
          {
            value: 'success',
            label: 'Success',
            count: logs.filter(l => l.status === 'success').length,
          },
          {
            value: 'warning',
            label: 'Warning',
            count: logs.filter(l => l.status === 'warning').length,
          },
          { value: 'error', label: 'Error', count: logs.filter(l => l.status === 'error').length },
          { value: 'info', label: 'Info', count: logs.filter(l => l.status === 'info').length },
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() = aria-label="Button"> setFilter(tab.value as 'all' | 'success' | 'warning' | 'error' | 'info')}
            className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
              filter === tab.value
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-96 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
        <AnimatePresence>
          {filteredLogs.map((log, index) => {
            const StatusIcon = getStatusIcon(log.status);
            const statusColor = getStatusColor(log.status);

            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className={`p-2 rounded-lg ${statusColor}`}>
                  <StatusIcon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>

                <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center gap-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="font-medium text-slate-900 dark:text-white text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                      {log.agentName}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      in {log.portal}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 responsive-container sm:flex-col md:flex-row lg:grid">{log.action}</p>
                  {log.details && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{log.details}</p>
                  )}
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {formatTimestamp(log.timestamp)}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            No activity found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
};
