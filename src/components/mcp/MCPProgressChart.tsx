/**
 * MCP Progress Chart Component
 * Visual progress tracking across portals
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React from 'react';
import { motion } from 'framer-motion';
import { mcpProgressData } from '../../data/agents';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export const MCPProgressChart: React.FC = () => {
  const data = mcpProgressData;
  // const maxProgress = Math.max(...data.map(d => d.progress));

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressIcon = (progress: number) => {
    if (progress >= 90) return CheckCircle;
    if (progress >= 75) return TrendingUp;
    if (progress >= 60) return Activity;
    if (progress >= 40) return Clock;
    return AlertTriangle;
  };

  const getProgressText = (progress: number) => {
    if (progress >= 90) return 'Excellent';
    if (progress >= 75) return 'Good';
    if (progress >= 60) return 'Fair';
    if (progress >= 40) return 'Poor';
    return 'Critical';
  };

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Progress Bars */}
      <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {data.map((item, index) => {
          const ProgressIcon = getProgressIcon(item.progress);
          const progressColor = getProgressColor(item.progress);
          const progressText = getProgressText(item.progress);

          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={item.portal}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <ProgressIcon className="w-4 h-4 text-slate-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">{item.portal}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      {item.agents} agents • {item.activeAgents} active
                    </p>
                  </div>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {item.progress}%
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      item.progress >= 90
                        ? 'text-green-600 dark:text-green-400'
                        : item.progress >= 75
                          ? 'text-blue-600 dark:text-blue-400'
                          : item.progress >= 60
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : item.progress >= 40
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {progressText}
                  </div>
                </div>
              </div>

              <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`h-3 rounded-full ${progressColor} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>{item.completedTasks} completed</span>
                  <span>{item.totalTasks} total</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            {data.reduce((sum, item) => sum + item.agents, 0)}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Agents</div>
        </div>
        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            {data.reduce((sum, item) => sum + item.activeAgents, 0)}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Agents</div>
        </div>
        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            {Math.round(data.reduce((sum, item) => sum + item.progress, 0) / data.length)}%
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Average Progress</div>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {data.slice(0, 4).map((item, index) => {
          const isImproving = item.progress > 75;
          const TrendIcon = isImproving ? TrendingUp : TrendingDown;

          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={item.portal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <h5 className="font-medium text-slate-900 dark:text-white text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                  {item.portal}
                </h5>
                <TrendIcon
                  className={`w-4 h-4 ${isImproving ? 'text-green-500' : 'text-red-500'}`}
                />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {item.progress}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">
                {item.activeAgents}/{item.agents} active
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};