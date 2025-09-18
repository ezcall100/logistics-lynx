/**
 * Driver Mobile Application - Web-Responsive Driver Interface
 * Supports both Driver and Owner Operator roles
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Settings,
  DollarSign,
  Home,
  Truck,
  Package,
  CheckCircle,
  Star,
  Route,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

// Types
interface Driver {
  id: string;
  name: string;
  role: 'driver' | 'owner-operator';
  avatar?: string;
  status: 'available' | 'on-load' | 'offline';
  rating: number;
  totalMiles: number;
  completedLoads: number;
}

interface Load {
  id: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  weight: number;
  rate: number;
  status: 'available' | 'booked' | 'in-transit' | 'delivered';
  distance: number;
}

interface DriverStats {
  totalEarnings: number;
  thisMonthEarnings: number;
  completedLoads: number;
  averageRating: number;
  totalMiles: number;
}

const DriverMobileApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data
  const currentDriver: Driver = {
    id: '1',
    name: 'Mike Johnson',
    role: 'driver',
    avatar: '/avatars/mike-johnson.jpg',
    status: 'available',
    rating: 4.8,
    totalMiles: 125000,
    completedLoads: 247,
  };

  const driverStats: DriverStats = {
    totalEarnings: 125000,
    thisMonthEarnings: 8500,
    completedLoads: 247,
    averageRating: 4.8,
    totalMiles: 125000,
  };

  const availableLoads: Load[] = [
    {
      id: 'L001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      pickupDate: '2025-01-20',
      deliveryDate: '2025-01-25',
      weight: 25000,
      rate: 4500,
      status: 'available',
      distance: 2800,
    },
    {
      id: 'L002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      pickupDate: '2025-01-18',
      deliveryDate: '2025-01-22',
      weight: 18000,
      rate: 3200,
      status: 'available',
      distance: 1200,
    },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'loads', label: 'Available Loads', icon: Truck },
    { id: 'my-loads', label: 'My Loads', icon: Package },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                ${driverStats.thisMonthEarnings.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                Completed Loads
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {driverStats.completedLoads}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {driverStats.averageRating}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Miles</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {driverStats.totalMiles.toLocaleString()}
              </p>
            </div>
            <Route className="w-8 h-8 text-purple-500 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>
      </div>

      {/* Available Loads */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Available Loads</h3>
        </div>
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {availableLoads.map(load => (
              <div
                key={load.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Truck className="w-8 h-8 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {load.origin} → {load.destination}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      {load.distance} miles • Pickup: {load.pickupDate}
                    </p>
                  </div>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    ${load.rate.toLocaleString()}
                  </p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    Book Load
                  </button>
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
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Available Loads</h2>
          </div>
        );
      case 'my-loads':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">My Loads</h2>
          </div>
        );
      case 'earnings':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Earnings</h2>
          </div>
        );
      case 'profile':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Profile</h2>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-slate-800 shadow-sm transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <Truck className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Driver App</h1>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <ul className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
            aria-label="Button"
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Driver Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                {currentDriver.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate responsive-container sm:flex-col md:flex-row lg:grid">
                  {currentDriver.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize responsive-container sm:flex-col md:flex-row lg:grid">
                  {currentDriver.role} • {currentDriver.status}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Button"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  )}
                </button>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white capitalize responsive-container sm:flex-col md:flex-row lg:grid">
                  {activeTab.replace('-', ' ')}
                </h2>
              </div>

              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Button"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 relative responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <Bell className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></span>
                </button>

                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {currentDriver.name
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
        <main className="flex-1 overflow-auto responsive-container sm:flex-col md:flex-row lg:grid">
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

export default DriverMobileApp;
