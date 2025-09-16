/**
 * Agent Health Badge Component
 * Status indicator for agent health
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MCPAgentStatus } from '../../types/mcp';
import { Activity, Clock, Settings, AlertTriangle } from 'lucide-react';

interface AgentHealthBadgeProps {
  status: MCPAgentStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showText?: boolean;
  animated?: boolean;
}

const statusConfig = {
  active: {
    color: 'bg-green-500',
    textColor: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800/30',
    icon: Activity,
    label: 'Active',
    description: 'Agent is running and processing tasks',
  },
  idle: {
    color: 'bg-gray-500',
    textColor: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/20',
    borderColor: 'border-gray-200 dark:border-gray-800/30',
    icon: Clock,
    label: 'Idle',
    description: 'Agent is waiting for tasks',
  },
  maintenance: {
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800/30',
    icon: Settings,
    label: 'Maintenance',
    description: 'Agent is under maintenance',
  },
  error: {
    color: 'bg-red-500',
    textColor: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800/30',
    icon: AlertTriangle,
    label: 'Error',
    description: 'Agent has encountered an error',
  },
};

const sizeConfig = {
  sm: {
    dot: 'w-2 h-2',
    icon: 'w-3 h-3',
    text: 'text-xs',
    padding: 'px-2 py-1',
    gap: 'gap-1',
  },
  md: {
    dot: 'w-3 h-3',
    icon: 'w-4 h-4',
    text: 'text-sm',
    padding: 'px-3 py-1.5',
    gap: 'gap-2',
  },
  lg: {
    dot: 'w-4 h-4',
    icon: 'w-5 h-5',
    text: 'text-base',
    padding: 'px-4 py-2',
    gap: 'gap-3',
  },
};

export const AgentHealthBadge: React.FC<AgentHealthBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  showText = true,
  animated = true,
}) => {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center ${sizeStyles.gap} ${sizeStyles.padding} ${config.bgColor} ${config.borderColor} border rounded-full`}
    >
      {/* Status Dot */}
      <div className="relative">
        <div className={`${sizeStyles.dot} ${config.color} rounded-full`}></div>
        {animated && status === 'active' && (
          <motion.div
            className={`absolute inset-0 ${sizeStyles.dot} ${config.color} rounded-full`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        {animated && status === 'error' && (
          <motion.div
            className={`absolute inset-0 ${sizeStyles.dot} ${config.color} rounded-full`}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      {/* Icon */}
      {showIcon && <Icon className={`${sizeStyles.icon} ${config.textColor}`} />}

      {/* Text */}
      {showText && (
        <span className={`${sizeStyles.text} font-medium ${config.textColor}`}>{config.label}</span>
      )}

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {config.description}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
      </div>
    </div>
  );
};
