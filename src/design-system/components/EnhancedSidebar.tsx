/**
 * MCP Agents - Enhanced Enterprise Sidebar Component
 * Dynamic multi-level sidebar with collapsible behavior and modern design
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  Shield,
} from 'lucide-react';
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
  status?: 'active' | 'inactive' | 'warning' | 'error' | 'live' | 'secure';
  badge?: string;
  badgeColor?: string;
  children?: NavigationItem[];
  url?: string;
  permissions?: string[];
  isNew?: boolean;
  isBeta?: boolean;
}

interface EnhancedSidebarProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
  userPermissions?: string[];
}

const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  onToggleCollapse,
  className,
  userPermissions = ['all'],
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['dashboard']));

  // Check if user has permission for item
  const hasPermission = (item: NavigationItem): boolean => {
    if (!item.permissions || userPermissions.includes('all')) return true;
    return item.permissions.some(permission => userPermissions.includes(permission));
  };

  // Filter items based on permissions
  const filteredItems = items.filter(hasPermission);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      // Mobile detection logic can be added here if needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusColor = (status?: NavigationItem['status']) => {
    switch (status) {
      case 'active':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'live':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'secure':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status?: NavigationItem['status']) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      case 'live':
        return Zap;
      case 'secure':
        return Shield;
      default:
        return Activity;
    }
  };

  const renderNavItem = (item: NavigationItem, level: number = 0) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const StatusIcon = getStatusIcon(item.status);

    return (
      <div key={item.id} className="relative">
        <motion.div
          whileHover={{ x: level === 0 ? 4 : 2 }}
          transition={{ duration: 0.2 }}
          className={cn('group relative', level > 0 && 'ml-4')}
        >
          <button
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.id);
              } else {
                onItemClick?.(item);
              }
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
              'hover:bg-white/50 hover:shadow-sm',
              isActive &&
                'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm',
              collapsed && 'justify-center px-2'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                isActive
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
              )}
            >
              <item.icon className="w-4 h-4" />
            </div>

            {/* Content */}
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'font-medium truncate',
                        isActive ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'
                      )}
                    >
                      {item.label}
                    </span>

                    {/* Status Badge */}
                    {item.status && (
                      <div
                        className={cn(
                          'flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                          getStatusColor(item.status)
                        )}
                      >
                        <StatusIcon className="w-3 h-3" />
                        <span className="uppercase">{item.status}</span>
                      </div>
                    )}

                    {/* New/Beta Badges */}
                    {item.isNew && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full border border-green-200">
                        NEW
                      </span>
                    )}
                    {item.isBeta && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
                        BETA
                      </span>
                    )}
                  </div>

                  {/* Count */}
                  {item.count !== undefined && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {item.count.toLocaleString()}
                    </span>
                  )}

                  {/* Expand Arrow */}
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-gray-400 transition-transform duration-200',
                        isExpanded && 'rotate-180'
                      )}
                    />
                  )}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 truncate">{item.description}</p>
                )}
              </div>
            )}

            {/* Tooltip for collapsed state */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {item.label}
                {item.description && (
                  <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                )}
              </div>
            )}
          </button>
        </motion.div>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && !collapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-1">
                {item.children?.map(child => renderNavItem(child, level + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className={cn(
        'flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-gray-200/80 shadow-lg transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-72',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/80">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Navigation
            </h2>
          </motion.div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {filteredItems.map(item => renderNavItem(item))}
      </div>

      {/* Footer */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-gray-200/80"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">MCP Agents</span>
            </div>
            <p className="text-xs text-gray-600 mb-2">250 autonomous agents running 24/7</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 font-medium">All Systems Operational</span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default EnhancedSidebar;
