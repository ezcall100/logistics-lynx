/**
 * MCP Agents - Modern Floating Action Button Component
 * Clean, professional FAB with sophisticated design
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { getDefaultSuperAdminActions } from '../utils/fabActions';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export interface FABAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  color?: string;
  bgColor?: string;
}

interface FloatingActionButtonProps {
  actions?: FABAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Default actions moved to utils/fabActions.ts to avoid react-refresh warning

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  actions = getDefaultSuperAdminActions(),
  position = 'bottom-right',
  size = 'md',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  const actionSizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const actionIconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className={cn('fixed z-40', positionClasses[position], className)}>
      {/* Action Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col-reverse gap-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3"
              >
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
                >
                  {action.label}
                </motion.div>

                {/* Action Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={action.action}
                  className={cn(
                    actionSizeClasses[size],
                    action.bgColor || 'bg-white hover:bg-gray-50',
                    'shadow-lg border border-gray-200'
                  )}
                >
                  <action.icon
                    className={cn(actionIconSizeClasses[size], action.color || 'text-gray-600')}
                  />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            sizeClasses[size],
            'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950',
            'shadow-lg hover:shadow-xl transition-all duration-200',
            'border-0'
          )}
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className={cn(iconSizeClasses[size], 'text-white')} />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;
}