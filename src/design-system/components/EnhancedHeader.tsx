/**
 * MCP Agents - Enhanced Enterprise Header Component
 * Advanced header with autosuggestions, live status, and glassmorphism effects
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Settings,
  User,
  Moon,
  Sun,
  HelpCircle,
  ChevronDown,
  LogOut,
  Shield,
  RefreshCw,
  Activity,
  AlertTriangle,
  CheckCircle,
  X,
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { cn } from '../../lib/utils';

interface SearchSuggestion {
  id: string;
  type: 'company' | 'user' | 'portal' | 'system';
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

interface SystemStatus {
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  activeAgents: number;
  lastUpdate: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'error' | 'success';
  unread: boolean;
  action?: () => void;
}

interface EnhancedHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
    permissions: string[];
  };
  notifications?: Notification[];
  systemStatus?: SystemStatus;
  onSearch?: (query: string) => void;
  onNotificationClick?: (id: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  className?: string;
}

// Mock search suggestions
const mockSuggestions: SearchSuggestion[] = [
  {
    id: '1',
    type: 'company',
    title: 'Acme Corporation',
    subtitle: 'Technology Company • 1,247 users',
    icon: Shield,
    url: '/companies/acme-corp',
  },
  {
    id: '2',
    type: 'user',
    title: 'John Smith',
    subtitle: 'Admin • john.smith@acme.com',
    icon: User,
    url: '/users/john-smith',
  },
  {
    id: '3',
    type: 'portal',
    title: 'Customer Portal',
    subtitle: 'Active • 24 portals',
    icon: Shield,
    url: '/portals/customer-portal',
  },
  {
    id: '4',
    type: 'system',
    title: 'System Health',
    subtitle: '99.97% uptime • All systems operational',
    icon: Activity,
    url: '/system/health',
  },
];

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  user = {
    name: 'Super Administrator',
    email: 'superadmin@transbotai.com',
    role: 'Super Admin',
    permissions: ['all'],
  },
  notifications = [],
  systemStatus = {
    status: 'operational',
    uptime: 99.97,
    responseTime: 45,
    activeAgents: 250,
    lastUpdate: '2 minutes ago',
  },
  onSearch,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  darkMode = false,
  onToggleDarkMode,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(
        suggestion =>
          suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          suggestion.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'degraded':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'down':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'operational':
        return CheckCircle;
      case 'degraded':
        return AlertTriangle;
      case 'down':
        return X;
      default:
        return Activity;
    }
  };

  const StatusIcon = getStatusIcon(systemStatus.status);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-lg',
        'px-6 py-4 flex items-center justify-between',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50/50 before:to-purple-50/50 before:-z-10',
        className
      )}
    >
      {/* Left Section - Logo & Brand */}
      <div className="flex items-center gap-4">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Trans Bot AI
            </h1>
            <p className="text-xs text-gray-500 font-medium">Super Admin Portal</p>
          </div>
        </motion.div>
      </div>

      {/* Center Section - Enhanced Search with Autosuggestions */}
      <div className="flex-1 flex justify-center" ref={searchRef}>
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search companies, users, portals, or system..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white/90 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl shadow-sm backdrop-blur-sm"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Autosuggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      handleSearch(suggestion.title);
                      setShowSuggestions(false);
                    }}
                    className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <suggestion.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{suggestion.title}</p>
                      <p className="text-sm text-gray-500">{suggestion.subtitle}</p>
                    </div>
                    <div className="text-xs text-gray-400 uppercase font-medium">
                      {suggestion.type}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Section - Enhanced Actions & User */}
      <div className="flex items-center gap-3">
        {/* Live System Status Widget */}
        <motion.div whileHover={{ scale: 1.05 }} className="relative">
          <button
            onClick={() => setShowSystemStatus(!showSystemStatus)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-all duration-200',
              getStatusColor(systemStatus.status)
            )}
          >
            <StatusIcon className="w-4 h-4" />
            <span className="text-xs font-semibold">
              {systemStatus.status === 'operational'
                ? 'All Systems Operational'
                : systemStatus.status === 'degraded'
                  ? 'Performance Degraded'
                  : 'System Down'}
            </span>
            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
          </button>

          {/* System Status Details */}
          <AnimatePresence>
            {showSystemStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl z-50 p-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">System Status</h3>
                    <span className="text-xs text-gray-500">Updated {systemStatus.lastUpdate}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Uptime</p>
                      <p className="font-semibold text-gray-900">{systemStatus.uptime}%</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Response Time</p>
                      <p className="font-semibold text-gray-900">{systemStatus.responseTime}ms</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                      <p className="text-xs text-gray-500">Active MCP Agents</p>
                      <p className="font-semibold text-gray-900">{systemStatus.activeAgents}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Icons Group */}
        <div className="flex items-center gap-1 ml-2">
          {/* Refresh */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Enhanced Notifications */}
        <div className="relative ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-500 hover:text-gray-700 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl z-50"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => onNotificationClick?.(notification.id)}
                        className={cn(
                          'p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors',
                          notification.unread && 'bg-blue-50/50'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full mt-2',
                              notification.type === 'error' && 'bg-red-500',
                              notification.type === 'warning' && 'bg-amber-500',
                              notification.type === 'success' && 'bg-green-500',
                              notification.type === 'info' && 'bg-blue-500'
                            )}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced User Profile */}
        <div className="relative ml-2">
          <Button
            variant="ghost"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-semibold">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-12 w-64 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-xl shadow-xl z-50"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button
                    onClick={onProfileClick}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button
                    onClick={onSettingsClick}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Preferences</span>
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default EnhancedHeader;
