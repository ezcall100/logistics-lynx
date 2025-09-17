/**
 * MCP Agents - Enhanced Enterprise Super Admin Portal
 * Complete rebuild with modern design, glassmorphism, and advanced features
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { User as PortalUser, Notification } from './types';
import { mockNotifications } from './data/mockData';
import { useTheme } from './contexts/ThemeContext';

interface EnterpriseSuperAdminPortalProps {
  user: PortalUser;
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
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="relative z-10 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Welcome to Trans Bot AI</h1>
                    <p className="text-slate-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
                      Super Admin Dashboard - Monitor and manage your entire platform ecosystem
                    </p>
                  </div>
                  <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center gap-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">All Systems Operational</span>
                    </div>
                    <p className="text-xs text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Last updated 2 minutes ago</p>
                  </div>
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32 responsive-container sm:flex-col md:flex-row lg:grid" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Total Companies</p>
                    <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.totalCompanies.toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid">+12.5% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Building2 className="w-6 h-6 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid">+8.3% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Users className="w-6 h-6 text-emerald-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      ${(systemMetrics.monthlyRevenue / 1000).toFixed(1)}K
                    </p>
                    <p className="text-sm text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid">+15.7% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <CreditCard className="w-6 h-6 text-purple-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">System Health</p>
                    <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      {systemMetrics.systemUptime}%
                    </p>
                    <p className="text-sm text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid">+0.1% vs last month</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Activity className="w-6 h-6 text-amber-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Revenue Analytics</h3>
                  <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-sm text-emerald-600 font-medium responsive-container sm:flex-col md:flex-row lg:grid">+15.7%</span>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <BarChart className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Revenue chart will be rendered here</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Portal Usage</h3>
                  <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-sm text-blue-600 font-medium responsive-container sm:flex-col md:flex-row lg:grid">5 Active</span>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Portal usage chart will be rendered here</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      case 'companies':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            Company Management component coming soon
          </div>
        );
      case 'users':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">User Management component coming soon</div>
        );
      case 'portals':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            Portal Management component coming soon
          </div>
        );
      case 'billing':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            Billing Management component coming soon
          </div>
        );
      case 'analytics':
        return <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Analytics component coming soon</div>;
      case 'settings':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Global Settings component coming soon</div>
        );
      case 'ai-agents':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            AI Command Center component coming soon
          </div>
        );
      case 'security':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            Security & Compliance component coming soon
          </div>
        );
      case 'profile':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            Profile Settings component coming soon
          </div>
        );
      default:
        return <div className="p-6 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Dashboard component coming soon</div>;
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div
      className={`min-h-screen bg-gray-50 transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : ''}`}
    >
      {/* Header - Improved Design */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-md shadow-sm px-6 py-4 flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid"
      >
        {/* Left Section - Logo & Brand */}
        <div className="flex items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <Shield className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Trans Bot AI</h1>
              <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Super Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Center Section - Search (Improved Layout) */}
        <div className="flex-1 flex justify-center responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="relative w-full max-w-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            <input
              type="text"
              placeholder="Search companies, users, portals..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl shadow-sm responsive-container sm:flex-col md:flex-row lg:grid"
            />
            {searchQuery && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() = aria-label="Button"> handleSearch('')}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions & User (Reorganized) */}
        <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* System Status Badge */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-full shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-xs font-medium text-emerald-700 responsive-container sm:flex-col md:flex-row lg:grid">All Systems Operational</span>
          </div>

          {/* Action Icons Group */}
          <div className="flex items-center gap-1 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
             aria-label="Button">
              {darkMode ? <Sun className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Moon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            </button>

            {/* Help */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <HelpCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>

            {/* Settings */}
            <button
              onClick={handleSettingsClick}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
             aria-label="Button">
              <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>

          {/* Notifications */}
          <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-700 relative responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Bell className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="p-4 border-b border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">No notifications</div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${notification.unread ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex items-start gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}
                          />
                          <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                            <h4 className="font-medium text-gray-900 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 text-xs mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{notification.message}</p>
                            <p className="text-gray-400 text-xs mt-2 responsive-container sm:flex-col md:flex-row lg:grid">{notification.time}</p>
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
          <div className="relative ml-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setShowProfile(!showProfile)}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-white text-sm font-semibold responsive-container sm:flex-col md:flex-row lg:grid">
                  {user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </span>
              </div>
              <div className="text-left responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</p>
                <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{user.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="p-4 border-b border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                        {user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</h4>
                      <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{user.email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-left responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <User className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Profile Settings
                  </button>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg text-left responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Account Settings
                  </button>
                  <div className="border-t border-gray-100 my-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-left responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <LogOut className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      <div className="flex responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`flex flex-col h-full bg-white border-r border-gray-200/80 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-6 h-6 bg-gradient-to-br from-slate-700 to-slate-900 rounded flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Activity className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <span className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Navigation</span>
              </div>
            )}
            <button
              onClick={() = aria-label="Button"> setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
            {navigationItems.map(item => {
              const isActive = activeTab === item.id;

              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <button
                  key={item.id}
                  onClick={() = aria-label="Button"> handleNavigation(item)}
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
                    <item.icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>

                  {/* Content */}
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="font-medium truncate responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                        <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          {/* Count Badge */}
                          {item.count !== undefined && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
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
                        <p className="text-xs text-gray-500 mt-0.5 truncate responsive-container sm:flex-col md:flex-row lg:grid">{item.description}</p>
                      )}
                    </div>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-slate-600 rounded-r responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
            {!sidebarCollapsed ? (
              <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                {/* System Status */}
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid" />
                  <div>
                    <p className="text-xs font-medium text-emerald-700 responsive-container sm:flex-col md:flex-row lg:grid">All Systems Operational</p>
                    <p className="text-xs text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid">Last updated 2 minutes ago</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            )}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen responsive-container sm:flex-col md:flex-row lg:grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
          <button className="w-14 h-14 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Plus className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSuperAdminPortal;
