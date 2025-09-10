/**
 * MCP Agents - Modern Enterprise Super Admin Portal
 * Clean, professional design with sophisticated color palette
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Settings,
  Globe,
  Brain,
  CreditCard,
  Home,
  ShieldCheck,
  BarChart,
  User,
  Search,
  Bell,
  Moon,
  Sun,
  HelpCircle,
  ChevronDown,
  LogOut,
  Shield,
  Activity,
  Plus,
} from 'lucide-react';
import { User as UserType, Notification } from './types';
import { mockNotifications } from './data/mockData';
import { useTheme } from './contexts/ThemeContext';

interface EnterpriseSuperAdminPortalProps {
  user: UserType;
  onLogout: () => void;
}

interface SystemMetrics {
  totalCompanies: number;
  totalUsers: number;
  monthlyRevenue: number;
  systemUptime: number;
}

const EnterpriseSuperAdminPortal: React.FC<EnterpriseSuperAdminPortalProps> = ({
  user,
  onLogout,
}) => {
  console.log('🎨 Loading Modern Super Admin Portal Design v3.0');
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalCompanies: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    systemUptime: 99.97,
  });
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Load initial data
  useEffect(() => {
    setSystemMetrics({
      totalCompanies: 1247,
      totalUsers: 15689,
      monthlyRevenue: 425000,
      systemUptime: 99.97,
    });
  }, []);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'System overview and metrics',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      id: 'companies',
      label: 'Companies',
      icon: Building2,
      description: 'Manage client companies',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      count: systemMetrics.totalCompanies,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User accounts & permissions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: systemMetrics.totalUsers,
    },
    {
      id: 'portals',
      label: 'Portal Management',
      icon: Globe,
      description: 'Configure portal access',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      count: 24,
    },
    {
      id: 'billing',
      label: 'Billing & Subscriptions',
      icon: CreditCard,
      description: 'Revenue & subscriptions',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      status: 'active',
    },
    {
      id: 'analytics',
      label: 'System Analytics',
      icon: BarChart,
      description: 'Platform performance metrics',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      id: 'settings',
      label: 'Global Settings',
      icon: Settings,
      description: 'System configuration',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
    {
      id: 'ai-agents',
      label: 'AI Command Center',
      icon: Brain,
      description: 'Monitor autonomous agents',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      status: 'active',
      badge: 'LIVE',
      badgeColor: 'bg-pink-100 text-pink-700',
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: ShieldCheck,
      description: 'Security monitoring',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      status: 'active',
      badge: 'SECURE',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      id: 'profile',
      label: 'Profile & Settings',
      icon: User,
      description: 'Account preferences',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  const handleNavigation = (item: { id: string }) => {
    setActiveTab(item.id);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Search query:', query);
  };

  const handleNotificationClick = (id: string) => {
    console.log('Notification clicked:', id);
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome to Trans Bot AI</h1>
                    <p className="text-slate-300 text-lg">
                      Super Admin Dashboard - Monitor and manage your entire platform ecosystem
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">All Systems Operational</span>
                    </div>
                    <p className="text-xs text-slate-400">Last updated 2 minutes ago</p>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24" />
              </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Companies</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {systemMetrics.totalCompanies.toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600">+12.5% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {systemMetrics.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600">+8.3% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${(systemMetrics.monthlyRevenue / 1000).toFixed(1)}K
                    </p>
                    <p className="text-sm text-emerald-600">+15.7% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Health</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {systemMetrics.systemUptime}%
                    </p>
                    <p className="text-sm text-emerald-600">+0.1% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-emerald-600 font-medium">+15.7%</span>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue chart will be rendered here</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Portal Usage</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-600 font-medium">5 Active</span>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Portal usage chart will be rendered here</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      case 'companies':
        return (
          <div className="p-6 text-center text-gray-500">
            Company Management component coming soon
          </div>
        );
      case 'users':
        return (
          <div className="p-6 text-center text-gray-500">User Management component coming soon</div>
        );
      case 'portals':
        return (
          <div className="p-6 text-center text-gray-500">
            Portal Management component coming soon
          </div>
        );
      case 'billing':
        return (
          <div className="p-6 text-center text-gray-500">
            Billing Management component coming soon
          </div>
        );
      case 'analytics':
        return <div className="p-6 text-center text-gray-500">Analytics component coming soon</div>;
      case 'settings':
        return (
          <div className="p-6 text-center text-gray-500">Global Settings component coming soon</div>
        );
      case 'ai-agents':
        return (
          <div className="p-6 text-center text-gray-500">
            AI Command Center component coming soon
          </div>
        );
      case 'security':
        return (
          <div className="p-6 text-center text-gray-500">
            Security & Compliance component coming soon
          </div>
        );
      case 'profile':
        return (
          <div className="p-6 text-center text-gray-500">
            Profile Settings component coming soon
          </div>
        );
      default:
        return <div className="p-6 text-center text-gray-500">Dashboard component coming soon</div>;
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : ''}`}
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between"
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
            <input
              type="text"
              placeholder="Search companies, users, portals..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 bg-gray-50/50"
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
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Help */}
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Settings */}
          <button
            onClick={handleSettingsClick}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-700 relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

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
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${notification.unread ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}
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
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
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
            </button>

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
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <div className="border-t border-gray-100 my-2" />
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`flex flex-col h-full bg-white border-r border-gray-200/80 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-700 to-slate-900 rounded flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Navigation</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1">
            {navigationItems.map(item => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group relative ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-5 h-5 transition-colors ${isActive ? 'text-slate-700' : 'text-gray-500 group-hover:text-gray-700'}`}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  {!sidebarCollapsed && (
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
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${item.badgeColor || 'bg-blue-100 text-blue-700'}`}
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
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                {/* System Status */}
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <div>
                    <p className="text-xs font-medium text-emerald-700">All Systems Operational</p>
                    <p className="text-xs text-emerald-600">Last updated 2 minutes ago</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          <button className="w-14 h-14 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSuperAdminPortal;
