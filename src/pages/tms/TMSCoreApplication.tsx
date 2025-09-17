/**
 * TMS Core Application - Unified Transportation Management System
 * Single application with role-based access for all TMS users
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Users,
  Bell,
  Settings,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Activity,
  CheckCircle,
  Home,
  BarChart3,
  Server,
  Sun,
  Moon,
  Globe,
  Truck,
  Package,
  MapPin,
  Calculator,
  PieChart,
  Target,
  FileCheck,
  Menu,
  Building,
} from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  role: 'shipper' | 'carrier' | 'broker' | 'driver' | 'admin';
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
}

interface Load {
  id: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  weight: number;
  value: number;
  status: 'available' | 'booked' | 'in-transit' | 'delivered';
  carrier?: string;
}

interface DashboardStats {
  totalLoads: number;
  activeLoads: number;
  completedLoads: number;
  totalRevenue: number;
  activeUsers: number;
}

const TMSCoreApplication: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  const currentUser: User = {
    id: '1',
    name: 'John Doe',
    role: 'shipper',
    avatar: '/avatars/john-doe.jpg',
    status: 'online',
  };

  const dashboardStats: DashboardStats = {
    totalLoads: 1247,
    activeLoads: 89,
    completedLoads: 1158,
    totalRevenue: 2847392,
    activeUsers: 156,
  };

  const recentLoads: Load[] = [
    {
      id: 'L001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      pickupDate: '2025-01-20',
      deliveryDate: '2025-01-25',
      weight: 25000,
      value: 4500,
      status: 'available',
    },
    {
      id: 'L002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      pickupDate: '2025-01-18',
      deliveryDate: '2025-01-22',
      weight: 18000,
      value: 3200,
      status: 'in-transit',
      carrier: 'ABC Transport',
    },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'loads', label: 'Loads', icon: Truck },
    { id: 'carriers', label: 'Carriers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Loads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardStats.totalLoads}
              </p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Loads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardStats.activeLoads}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${dashboardStats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {dashboardStats.activeUsers}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Loads */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Loads</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentLoads.map(load => (
              <div
                key={load.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <Truck className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {load.origin} → {load.destination}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pickup: {load.pickupDate} | Delivery: {load.deliveryDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${load.value.toLocaleString()}
                  </p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      load.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : load.status === 'in-transit'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {load.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'loads':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Loads Management</h2>
          </div>
        );
      case 'carriers':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Carriers</h2>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-slate-800 shadow-sm transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">TMS Core</h1>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentUser.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {currentUser.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5" />
                  ) : (
                    <ChevronLeft className="w-5 h-5" />
                  )}
                </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
                  {activeTab}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default TMSCoreApplication;
