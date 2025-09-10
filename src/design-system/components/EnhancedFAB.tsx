/**
 * MCP Agents - Enhanced Floating Action Button Component
 * Adaptive FAB with expandable actions and mobile bottom sheet behavior
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Building, UserPlus, RefreshCw, Settings, Globe, Shield, Zap, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FABAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  color?: string;
  bgColor?: string;
  description?: string;
  shortcut?: string;
  category?: 'management' | 'system' | 'analytics' | 'security';
  requiresPermission?: string[];
}

interface EnhancedFABProps {
  actions?: FABAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  userPermissions?: string[];
  isMobile?: boolean;
}

const EnhancedFAB: React.FC<EnhancedFABProps> = ({
  actions = [],
  position = 'bottom-right',
  className,
  userPermissions = ['all'],
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Check if user has permission for action
  const hasPermission = (action: FABAction): boolean => {
    if (!action.requiresPermission || userPermissions.includes('all')) return true;
    return action.requiresPermission.some(permission => userPermissions.includes(permission));
  };

  // Filter actions based on permissions
  const filteredActions = actions.filter(hasPermission);

  // Group actions by category
  const groupedActions = filteredActions.reduce(
    (acc, action) => {
      const category = action.category || 'management';
      if (!acc[category]) acc[category] = [];
      acc[category].push(action);
      return acc;
    },
    {} as Record<string, FABAction[]>
  );

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedCategory(null);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'management':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'system':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'analytics':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'security':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleActionClick = (action: FABAction) => {
    action.action();
    setIsOpen(false);
    setSelectedCategory(null);
  };

  const defaultActions: FABAction[] = [
    {
      id: 'add-company',
      label: 'Add Company',
      icon: Building,
      action: () => console.log('Add Company'),
      description: 'Create a new company account',
      shortcut: 'Ctrl+C',
      category: 'management',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: UserPlus,
      action: () => console.log('Add User'),
      description: 'Create a new user account',
      shortcut: 'Ctrl+U',
      category: 'management',
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    {
      id: 'create-portal',
      label: 'Create Portal',
      icon: Globe,
      action: () => console.log('Create Portal'),
      description: 'Set up a new portal',
      shortcut: 'Ctrl+P',
      category: 'management',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
    },
    {
      id: 'system-check',
      label: 'Run System Check',
      icon: RefreshCw,
      action: () => console.log('Run System Check'),
      description: 'Perform system diagnostics',
      shortcut: 'Ctrl+R',
      category: 'system',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
    },
    {
      id: 'maintenance',
      label: 'Toggle Maintenance',
      icon: Settings,
      action: () => console.log('Toggle Maintenance'),
      description: 'Enable/disable maintenance mode',
      shortcut: 'Ctrl+M',
      category: 'system',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
    },
    {
      id: 'agent-status',
      label: 'Agent Status',
      icon: Zap,
      action: () => console.log('Agent Status'),
      description: 'Check MCP agent status',
      shortcut: 'Ctrl+A',
      category: 'analytics',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
    },
    {
      id: 'security-scan',
      label: 'Security Scan',
      icon: Shield,
      action: () => console.log('Security Scan'),
      description: 'Run security diagnostics',
      shortcut: 'Ctrl+S',
      category: 'security',
      color: 'text-red-600',
      bgColor: 'bg-red-50 hover:bg-red-100',
    },
  ];

  const actionsToUse = actions.length > 0 ? filteredActions : defaultActions;

  // Mobile Bottom Sheet
  if (isMobileView || isMobile) {
    return (
      <>
        {/* Mobile FAB Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className={cn(
            'fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg z-40',
            'flex items-center justify-center hover:shadow-xl transition-shadow duration-200',
            className
          )}
        >
          <Plus className="w-6 h-6" />
        </motion.button>

        {/* Mobile Bottom Sheet */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-50"
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Actions Grid */}
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                  <div className="grid grid-cols-2 gap-3">
                    {actionsToUse.map(action => (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => handleActionClick(action)}
                        className={cn(
                          'flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200',
                          'hover:shadow-md hover:scale-105',
                          action.bgColor || 'bg-gray-50 hover:bg-gray-100'
                        )}
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center',
                            action.bgColor || 'bg-gray-100'
                          )}
                        >
                          <action.icon className={cn('w-5 h-5', action.color || 'text-gray-600')} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">{action.label}</p>
                          {action.description && (
                            <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop FAB
  return (
    <div className={cn('fixed z-40', positionClasses[position])}>
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="mb-4 space-y-3"
          >
            {/* Category Filter */}
            {Object.keys(groupedActions).length > 1 && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                    !selectedCategory
                      ? 'bg-blue-100 text-blue-700 border-blue-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                  )}
                >
                  All
                </button>
                {Object.keys(groupedActions).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                      selectedCategory === category
                        ? getCategoryColor(category)
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                    )}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            {(selectedCategory ? groupedActions[selectedCategory] : actionsToUse).map(
              (action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleActionClick(action)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm transition-all duration-200',
                      'hover:shadow-md hover:scale-105',
                      action.bgColor || 'bg-white hover:bg-gray-50',
                      'min-w-[200px]'
                    )}
                  >
                    <div
                      className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        action.bgColor || 'bg-gray-100'
                      )}
                    >
                      <action.icon className={cn('w-5 h-5', action.color || 'text-gray-600')} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900">{action.label}</p>
                      {action.description && (
                        <p className="text-xs text-gray-500">{action.description}</p>
                      )}
                    </div>
                    {action.shortcut && (
                      <div className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {action.shortcut}
                      </div>
                    )}
                  </motion.button>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg',
          'flex items-center justify-center hover:shadow-xl transition-shadow duration-200',
          'relative overflow-hidden',
          className
        )}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus className="w-6 h-6" />
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white/20 rounded-full"
        />
      </motion.button>
    </div>
  );
};

export default EnhancedFAB;
