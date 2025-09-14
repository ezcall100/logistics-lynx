import React, { useState } from 'react';
import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  Brain,
  User as UserIcon,
  Settings,
  ChevronDown
} from 'lucide-react';

/**
 * OptimizedHeader - Enhanced Super Admin Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 * 
 * This component provides optimized header functionality with proper
 * responsive design, glass-morphism styling, and enhanced UX.
 */
interface OptimizedHeaderProps {
  children?: React.ReactNode;
  className?: string;
  darkMode?: boolean;
  toggleDarkMode?: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  notificationCount?: number;
  setActiveTab?: (tab: string) => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export const OptimizedHeader: React.FC<OptimizedHeaderProps> = ({
  children,
  className = '',
  darkMode = false,
  toggleDarkMode = () => {},
  searchQuery = '',
  setSearchQuery = () => {},
  notificationCount = 0,
  setActiveTab = () => {},
  mobileMenuOpen = false,
  setMobileMenuOpen = () => {}
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className={`optimized-header bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40 ${className}`}>
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                TransBot AI
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                Super Admin Portal
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                TransBot AI
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Enhanced Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies, users, reports..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-48 lg:w-80 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm transition-all duration-200"
            />
          </div>
          
          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm">
            <Search className="h-5 w-5" />
          </button>

          {/* Enhanced Action Icons */}
          <div className="flex items-center space-x-1">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Enhanced Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                      No new notifications
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Settings */}
            <button
              onClick={() => setActiveTab('company-settings')}
              className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-all duration-200"
              title="Company Settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Enhanced User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 ml-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                title="Profile & Account"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">Super Admin</span>
                <ChevronDown className="hidden sm:block h-4 w-4 text-gray-400" />
              </button>
              
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-2">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Profile Settings
                    </button>
                    <button
                      onClick={() => setActiveTab('company-settings')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Company Settings
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
      
      <div className="mcp-agent-indicator">
        <span className="text-xs text-gray-500">
          🤖 Enhanced by MCP 301 Agents - 2025-09-14T17:28:33.000Z
        </span>
      </div>
    </header>
  );
};

export default OptimizedHeader;