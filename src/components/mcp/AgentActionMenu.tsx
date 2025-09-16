/**
 * Agent Action Menu Component
 * Context menu for agent actions
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MCPAgent } from '../../types/mcp';
import {
  Play,
  Pause,
  RotateCcw,
  Eye,
  Settings,
  AlertTriangle,
  Activity,
  Trash2,
  RefreshCw,
  PowerOff,
} from 'lucide-react';

interface AgentActionMenuProps {
  agent: MCPAgent;
  onAction: (agentId: number, action: string) => void;
  trigger: React.ReactNode;
}

interface ActionItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  action: string;
  requiresConfirmation: boolean;
  isDestructive: boolean;
  disabled?: boolean;
}

export const AgentActionMenu: React.FC<AgentActionMenuProps> = ({ agent, onAction, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const actions: ActionItem[] = [
    {
      id: 'start',
      label: 'Start Agent',
      icon: Play,
      description: 'Start the agent and begin processing tasks',
      action: 'start',
      requiresConfirmation: false,
      isDestructive: false,
      disabled: agent.status === 'active',
    },
    {
      id: 'pause',
      label: 'Pause Agent',
      icon: Pause,
      description: 'Pause the agent temporarily',
      action: 'pause',
      requiresConfirmation: false,
      isDestructive: false,
      disabled: agent.status !== 'active',
    },
    {
      id: 'restart',
      label: 'Restart Agent',
      icon: RotateCcw,
      description: 'Restart the agent with fresh state',
      action: 'restart',
      requiresConfirmation: true,
      isDestructive: false,
    },
    {
      id: 'view-logs',
      label: 'View Logs',
      icon: Eye,
      description: 'View agent activity and error logs',
      action: 'view-logs',
      requiresConfirmation: false,
      isDestructive: false,
    },
    {
      id: 'configure',
      label: 'Configure',
      icon: Settings,
      description: 'Modify agent settings and parameters',
      action: 'configure',
      requiresConfirmation: false,
      isDestructive: false,
    },
    {
      id: 'force-stop',
      label: 'Force Stop',
      icon: PowerOff,
      description: 'Forcefully stop the agent',
      action: 'force-stop',
      requiresConfirmation: true,
      isDestructive: true,
      disabled: agent.status === 'idle',
    },
    {
      id: 'reset',
      label: 'Reset Agent',
      icon: RefreshCw,
      description: 'Reset agent to initial state',
      action: 'reset',
      requiresConfirmation: true,
      isDestructive: true,
    },
    {
      id: 'delete',
      label: 'Delete Agent',
      icon: Trash2,
      description: 'Permanently delete the agent',
      action: 'delete',
      requiresConfirmation: true,
      isDestructive: true,
    },
  ];

  const handleAction = (action: ActionItem) => {
    if (action.requiresConfirmation) {
      setShowConfirm(action.id);
    } else {
      onAction(agent.id, action.action);
      setIsOpen(false);
    }
  };

  const confirmAction = (actionId: string) => {
    const action = actions.find(a => a.id === actionId);
    if (action) {
      onAction(agent.id, action.action);
      setIsOpen(false);
      setShowConfirm(null);
    }
  };

  const cancelAction = () => {
    setShowConfirm(null);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowConfirm(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-50"
          >
            {/* Header */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white text-sm">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {agent.role} • {agent.portal}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-2">
              {actions.map(action => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    disabled={action.disabled}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      action.disabled
                        ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        : action.isDestructive
                          ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {action.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Confirm Action</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-6">
                Are you sure you want to perform this action on <strong>{agent.name}</strong>?
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelAction}
                  className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmAction(showConfirm)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
