/**
 * MCP Agents - Modern Sidebar Component
 * Clean, professional sidebar with sophisticated design
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Settings, Activity } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  color?: string;
  bgColor?: string;
  count?: number;
  status?: 'active' | 'inactive' | 'warning' | 'error';
  badge?: string;
  badgeColor?: string;
  children?: NavigationItem[];
}

interface SidebarProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  onToggleCollapse,
  className,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getBadgeColor = (badgeColor?: string) => {
    return badgeColor || 'bg-blue-100 text-blue-700';
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        'flex flex-col h-full bg-white border-r border-gray-200/80',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-slate-700 to-slate-900 rounded flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">Navigation</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map(item => {
          const isActive = activeItem === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onItemClick?.(item)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'text-left group relative',
                  isActive
                    ? 'bg-slate-100 text-slate-900 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'flex-shrink-0 w-5 h-5 transition-colors',
                    isActive ? 'text-slate-700' : 'text-gray-500 group-hover:text-gray-700'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>

                {/* Content */}
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {/* Count Badge */}
                        {item.count !== undefined && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            {item.count}
                          </span>
                        )}
                        {/* Status Badge */}
                        {item.badge && (
                          <span
                            className={cn(
                              'px-2 py-0.5 text-xs font-medium rounded-full',
                              getBadgeColor(item.badgeColor)
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
                    )}
                  </div>
                )}

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-slate-600 rounded-r"
                  />
                )}
              </motion.button>

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute left-full ml-2 top-0 z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                    >
                      <div className="font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                      )}
                      {/* Arrow */}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        {!collapsed ? (
          <div className="space-y-3">
            {/* System Status */}
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <div>
                <p className="text-xs font-medium text-emerald-700">All Systems Operational</p>
                <p className="text-xs text-emerald-600">Last updated 2 minutes ago</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-gray-600 hover:text-gray-900"
              >
                <Settings className="w-4 h-4" />
                Quick Settings
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
}