import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, HelpCircle, 
  Moon, Sun, ChevronDown, Menu, X, Activity
} from 'lucide-react';
import { User as UserType, Notification } from '../../types';
import EnhancedSearch from './EnhancedSearch';
import SystemStatusModal from './SystemStatusModal';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  notifications: Notification[];
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({
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

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <header className="portal-header fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-200/30 dark:border-slate-700/30 shadow-lg transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Left Section */}
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors lg:hidden responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            {sidebarOpen ? <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Menu className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
          </button>
          
          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-3 rounded-2xl shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <Bot className="w-7 h-7 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent responsive-container sm:flex-col md:flex-row lg:grid">Trans Bot AI</h1>
              <p className="text-sm text-gray-600 dark:text-slate-400 font-medium responsive-container sm:flex-col md:flex-row lg:grid">Super Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Center Section - Enhanced Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <EnhancedSearch onResultClick={(result) => console.log('Search result:', result)} />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* System Status */}
          <button
            onClick={() = aria-label="Button"> setSystemStatusOpen(true)}
            className="p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 relative group responsive-container sm:flex-col md:flex-row lg:grid"
            title="System Status"
          >
            <Activity className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
              System Status
            </div>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 hover:scale-105 relative group responsive-container sm:flex-col md:flex-row lg:grid"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
           aria-label="Button">
            {darkMode ? <Sun className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Moon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </div>
          </button>

          {/* Help */}
          <button 
            className="p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 relative group responsive-container sm:flex-col md:flex-row lg:grid"
            title="Help & Documentation"
           aria-label="Button">
            <HelpCircle className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
              Help & Docs
            </div>
          </button>

          {/* Settings */}
          <button 
            className="p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 relative group responsive-container sm:flex-col md:flex-row lg:grid"
            title="Settings"
           aria-label="Button">
            <Settings className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
              Settings
            </div>
          </button>

          {/* Notifications */}
          <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 group responsive-container sm:flex-col md:flex-row lg:grid"
              title="Notifications"
            >
              <Bell className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
                  {unreadNotifications}
                </span>
              )}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                Notifications
              </div>
            </button>

            <AnimatePresence>
              {notificationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-2 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="px-4 py-2 border-b border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-sm font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
                    {notifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                          notification.type === 'error' ? 'border-red-500' :
                          notification.type === 'warning' ? 'border-yellow-500' :
                          notification.type === 'success' ? 'border-green-500' :
                          'border-blue-500'
                        }`}
                      >
                        <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                            <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{notification.title}</p>
                            <p className="text-xs text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 responsive-container sm:flex-col md:flex-row lg:grid"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                    <button className="text-sm text-blue-600 hover:text-blue-800 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 p-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-white text-sm font-semibold responsive-container sm:flex-col md:flex-row lg:grid">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                <div className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Super Admin</div>
              </div>
              <ChevronDown className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-2 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="px-4 py-2 border-b border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</p>
                    <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{user.email}</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <User className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>My Account</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-100 my-1 responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <LogOut className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Sign Out</span>
                  </button>
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

export default Header;
