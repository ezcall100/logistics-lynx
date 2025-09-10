/**
 * MCP Agents - Modern Header Component
 * Clean, professional header with sophisticated design
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { cn } from '../../lib/utils';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
  }>;
  onSearch?: (query: string) => void;
  onNotificationClick?: (id: string) => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogout?: () => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  user = {
    name: 'Super Administrator',
    email: 'superadmin@transbotai.com',
    role: 'Super Admin',
  },
  notifications = [],
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md',
        'px-6 py-4 flex items-center justify-between',
        className
      )}
    >
      {/* Left Section - Logo & Brand */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Trans Bot AI</h1>
            <p className="text-xs text-gray-500">Super Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search companies, users, portals..."
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="pl-10 bg-gray-50/50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center gap-3">
        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-emerald-700">All Systems Operational</span>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className="text-gray-500 hover:text-gray-700"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Help */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <HelpCircle className="w-4 h-4" />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettingsClick}
          className="text-gray-500 hover:text-gray-700"
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-500 hover:text-gray-700 relative"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      onClick={() => onNotificationClick?.(notification.id)}
                      className={cn(
                        'p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50',
                        notification.unread && 'bg-blue-50/50'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full mt-2',
                            notification.unread ? 'bg-blue-500' : 'bg-gray-300'
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
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Button>

          {/* Profile Dropdown */}
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            >
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Button
                  variant="ghost"
                  onClick={onProfileClick}
                  className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4" />
                  Profile Settings
                </Button>
                <Button
                  variant="ghost"
                  onClick={onSettingsClick}
                  className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4" />
                  Account Settings
                </Button>
                <div className="border-t border-gray-100 my-2" />
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  className="w-full justify-start gap-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
