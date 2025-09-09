import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, HelpCircle, 
  Moon, Sun, ChevronDown, Menu, X, Activity,
  Search, Command, Plus, Zap, Shield, TrendingUp
} from 'lucide-react';
import { User as UserType, Notification } from '../../types';
import EnhancedSearch from './EnhancedSearch';
import SystemStatusModal from './SystemStatusModal';

interface EnhancedHeaderProps {
  user: UserType;
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  notifications: Notification[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  user,
  onLogout,
  onToggleSidebar,
  sidebarOpen,
  notifications,
  darkMode,
  onToggleDarkMode
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [systemStatusOpen, setSystemStatusOpen] = useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const quickActions = [
    { id: 'add-company', label: 'Add Company', icon: 'Plus', shortcut: '⌘C' },
    { id: 'add-user', label: 'Add User', icon: 'User', shortcut: '⌘U' },
    { id: 'run-check', label: 'System Check', icon: 'Activity', shortcut: '⌘R' },
    { id: 'view-analytics', label: 'Analytics', icon: 'TrendingUp', shortcut: '⌘A' }
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Plus, User, Activity, TrendingUp, Zap, Shield
    };
    const IconComponent = icons[iconName] || Plus;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <header className="portal-header fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-200/30 dark:border-slate-700/30 shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors lg:hidden relative group"
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {sidebarOpen ? "Close Menu" : "Open Menu"}
            </div>
          </button>
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <motion.div 
              className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-3 rounded-2xl shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Bot className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Trans Bot AI
              </h1>
              <p className="text-sm text-gray-600 dark:text-slate-400 font-medium">
                Super Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Platform Management Toggle & Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8 items-center space-x-4">
          {/* Platform Management Toggle */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Platform Management</span>
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">12</span>
            </button>
          </div>
          
          {/* Enhanced Search */}
          <div className="flex-1 max-w-md">
            <EnhancedSearch onResultClick={(result) => console.log('Search result:', result)} />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="relative">
            <button
              onClick={() => setQuickActionsOpen(!quickActionsOpen)}
              className="p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 relative group"
              title="Quick Actions"
            >
              <Zap className="w-5 h-5" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Quick Actions
              </div>
            </button>

            <AnimatePresence>
              {quickActionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 z-50"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                      Quick Actions
                    </div>
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-1.5 bg-gray-100 dark:bg-slate-600 rounded-md">
                            {getIcon(action.icon)}
                          </div>
                          <span>{action.label}</span>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-slate-500 font-mono">
                          {action.shortcut}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* System Status */}
          <button
            onClick={() => setSystemStatusOpen(true)}
            className="p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 relative group"
            title="System Status"
          >
            <Activity className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              System Status
            </div>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 relative group"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <motion.div
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </div>
          </button>

          {/* Help */}
          <button 
            className="p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 relative group"
            title="Help & Documentation"
          >
            <HelpCircle className="w-5 h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Help & Docs
            </div>
          </button>

          {/* Settings */}
          <button 
            className="p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 relative group"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Settings
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 group"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {unreadNotifications}
                </span>
              )}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Notifications
              </div>
            </button>

            <AnimatePresence>
              {notificationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 z-50"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">Notifications</h3>
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        {unreadNotifications} unread
                      </span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-xl transition-colors ${
                            notification.read 
                              ? 'bg-gray-50 dark:bg-slate-700/50' 
                              : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`p-1.5 rounded-lg ${
                              notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                              notification.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                              notification.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' :
                              'bg-blue-100 dark:bg-blue-900/30'
                            }`}>
                              <Bell className={`w-4 h-4 ${
                                notification.type === 'success' ? 'text-green-600 dark:text-green-400' :
                                notification.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                                notification.type === 'error' ? 'text-red-600 dark:text-red-400' :
                                'text-blue-600 dark:text-blue-400'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-3 p-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-slate-100">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 dark:text-slate-500" />
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 z-50"
                >
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-slate-100">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{user.email}</p>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full mt-1">
                          Super Admin
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-slate-700 my-2"></div>
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* System Status Modal */}
      <SystemStatusModal 
        isOpen={systemStatusOpen} 
        onClose={() => setSystemStatusOpen(false)} 
      />
    </header>
  );
};

export default EnhancedHeader;
