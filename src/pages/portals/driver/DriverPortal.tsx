import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Eye,
  Database,
  Server,
  Wifi,
  CheckCircle,
  Settings,
} from 'lucide-react';
import { PortalLayout } from '../../../design-system/PortalLayout';
import { DashboardCard } from '../../../design-system/DashboardCard';
import { Button } from '../../../design-system/Button';

const DriverPortal: React.FC = () => {
  const user = {
    name: 'Demo User',
    email: 'demo@transbotai.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: 'Operations User',
  };

  const notifications = [
    {
      id: '1',
      title: 'New operations activity',
      message: 'Recent activity detected in your portal',
      time: '5 minutes ago',
      type: 'info' as const,
      unread: true,
    },
    {
      id: '2',
      title: 'System update available',
      message: 'New features and improvements available',
      time: '1 hour ago',
      type: 'success' as const,
      unread: false,
    },
  ];

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: User,
      path: '/dashboard',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      path: '/analytics',
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      path: '/users',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const metrics = [
    {
      title: 'Active Users',
      value: '1,234',
      change: { value: '+12%', type: 'increase' as const },
      icon: Users,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: { value: '+8%', type: 'increase' as const },
      icon: DollarSign,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Growth Rate',
      value: '15%',
      change: { value: '+3%', type: 'increase' as const },
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Alerts',
      value: '3',
      change: { value: '-1', type: 'decrease' as const },
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  return (
    <PortalLayout
      portalName="Driver Portal"
      portalType="Operations"
      user={user}
      menuItems={menuItems}
      notifications={notifications}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Welcome to Driver Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Driver management and operations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Online
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DashboardCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Common tasks and operations</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                variant="primary"
                icon={Plus}
                onClick={() => console.log('Create new')}
                className="h-20 flex-col space-y-2"
              >
                <span>Create New</span>
              </Button>
              <Button
                variant="outline"
                icon={Eye}
                onClick={() => console.log('View reports')}
                className="h-20 flex-col space-y-2"
              >
                <span>View Reports</span>
              </Button>
              <Button
                variant="secondary"
                icon={Settings}
                onClick={() => console.log('Settings')}
                className="h-20 flex-col space-y-2"
              >
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">System Status</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time system health monitoring
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    All Systems Operational
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">99.9% uptime</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Server className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Server Load
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">45% average</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Database className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    Database
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">Healthy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Wifi className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    Network
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">Stable</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PortalLayout>
  );
};

export default DriverPortal;
