/**
 * Agent Status Card Component
 * Displays agent statistics with visual indicators
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AgentStatusCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  status?: 'active' | 'idle' | 'maintenance' | 'error';
  trend?: string;
  subtitle?: string;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800/30',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800/30',
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    icon: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800/30',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    icon: 'text-red-600 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800/30',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    icon: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800/30',
  },
  gray: {
    bg: 'bg-gray-100 dark:bg-gray-900/20',
    icon: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-200 dark:border-gray-800/30',
  },
};

const statusColors = {
  active: 'bg-green-500',
  idle: 'bg-gray-500',
  maintenance: 'bg-yellow-500',
  error: 'bg-red-500',
};

export const AgentStatusCard: React.FC<AgentStatusCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
  status,
  trend,
  subtitle,
}) => {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group`}
    >
      {/* Status Indicator */}
      {status && (
        <div className="absolute top-4 right-4">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]} animate-pulse`}></div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-2xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>

          {trend && (
            <div
              className={`text-sm font-medium ${
                trend.startsWith('+')
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {trend}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-slate-900 dark:text-white">
            {value.toLocaleString()}
          </div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</div>
          {subtitle && <div className="text-xs text-slate-500 dark:text-slate-500">{subtitle}</div>}
        </div>

        {/* Progress Bar for Status Cards */}
        {status && (
          <div className="mt-4">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-2 rounded-full ${
                  status === 'active'
                    ? 'bg-green-500'
                    : status === 'idle'
                      ? 'bg-gray-500'
                      : status === 'maintenance'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                }`}
              ></motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};
