import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Building2,
  Brain,
  Shield,
  Cog,
  Truck,
  BarChart3,
  Link,
  Wrench,
  Plus,
  Eye,
  Play,
  Pause,
  Square,
  Activity,
  Zap,
  Globe,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { PortalLayout } from '../../../design-system/PortalLayout';
import { DashboardCard } from '../../../design-system/DashboardCard';
import { Button } from '../../../design-system/Button';

const SuperAdminPortalNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);

  const user = {
    name: 'Demo User',
    email: 'demo@transbotai.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: 'Super Admin',
  };

  const notifications = [
    {
      id: '1',
      title: 'New portal registered',
      message: 'Customer Portal has been successfully registered',
      time: '5 minutes ago',
      type: 'success' as const,
      unread: true,
    },
    {
      id: '2',
      title: 'System maintenance scheduled',
      message: 'Scheduled maintenance for tonight at 2 AM',
      time: '1 hour ago',
      type: 'info' as const,
      unread: false,
    },
    {
      id: '3',
      title: 'High CPU usage detected',
      message: 'Server load is above 80% on production',
      time: '2 hours ago',
      type: 'warning' as const,
      unread: true,
    },
  ];

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Building2,
      path: '/dashboard',
    },
    {
      id: 'platform',
      label: 'Platform Management',
      icon: Cog,
      path: '/platform',
    },
    {
      id: 'ai-command',
      label: 'AI Command Center',
      icon: Brain,
      path: '/ai-command',
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: Shield,
      path: '/security',
    },
    {
      id: 'system',
      label: 'System Administration',
      icon: Server,
      path: '/system',
    },
    {
      id: 'billing',
      label: 'Billing & Finance',
      icon: DollarSign,
      path: '/billing',
    },
    {
      id: 'logistics',
      label: 'Logistics Portals',
      icon: Truck,
      path: '/logistics',
    },
    {
      id: 'business',
      label: 'Business Portals',
      icon: Building2,
      path: '/business',
    },
    {
      id: 'analytics',
      label: 'Analytics Portals',
      icon: BarChart3,
      path: '/analytics',
    },
    {
      id: 'integration',
      label: 'Integration Portals',
      icon: Link,
      path: '/integration',
    },
    {
      id: 'operations',
      label: 'Operations Portals',
      icon: Wrench,
      path: '/operations',
    },
  ];

  const metrics = [
    {
      title: 'Active SuperAdmins',
      value: '128',
      change: { value: '+12%', type: 'increase' as const },
      icon: Users,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Monthly Revenue',
      value: '$258,143',
      change: { value: '+8%', type: 'increase' as const },
      icon: DollarSign,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Satisfaction Rate',
      value: '92%',
      change: { value: '+5%', type: 'increase' as const },
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Active Alerts',
      value: '7',
      change: { value: '-2', type: 'decrease' as const },
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  const portals = [
    {
      id: 'super-admin',
      name: 'Super Admin Portal',
      type: 'Administration',
      users: 5,
      port: 3005,
      status: 'active',
      uptime: '99.9%',
      lastActivity: '2 min ago',
    },
    {
      id: 'mcp-agents',
      name: 'MCP 251 Agents Portal',
      type: 'AI Management',
      users: 1,
      port: 3000,
      status: 'active',
      uptime: '99.8%',
      lastActivity: '1 min ago',
    },
    {
      id: 'customer',
      name: 'Customer Portal',
      type: 'Business',
      users: 1200,
      port: 3000,
      status: 'active',
      uptime: '99.7%',
      lastActivity: '30 sec ago',
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      type: 'Business',
      users: 850,
      port: 3000,
      status: 'active',
      uptime: '99.6%',
      lastActivity: '1 min ago',
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      type: 'Logistics',
      users: 1800,
      port: 3000,
      status: 'active',
      uptime: '99.5%',
      lastActivity: '45 sec ago',
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      type: 'Logistics',
      users: 650,
      port: 3000,
      status: 'active',
      uptime: '99.4%',
      lastActivity: '2 min ago',
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      type: 'Operations',
      users: 3200,
      port: 3000,
      status: 'active',
      uptime: '99.3%',
      lastActivity: '1 min ago',
    },
    {
      id: 'admin',
      name: 'Admin Portal',
      type: 'Administration',
      users: 150,
      port: 3000,
      status: 'active',
      uptime: '99.2%',
      lastActivity: '3 min ago',
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      type: 'Business',
      users: 420,
      port: 3000,
      status: 'active',
      uptime: '99.1%',
      lastActivity: '1 min ago',
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      type: 'Development',
      users: 85,
      port: 3000,
      status: 'active',
      uptime: '99.0%',
      lastActivity: '2 min ago',
    },
    {
      id: 'autonomous',
      name: 'Autonomous Portal',
      type: 'AI',
      users: 0,
      port: 3000,
      status: 'maintenance',
      uptime: '98.9%',
      lastActivity: '5 min ago',
    },
    {
      id: 'analytics',
      name: 'Analytics Portal',
      type: 'Analytics',
      users: 320,
      port: 3000,
      status: 'active',
      uptime: '98.8%',
      lastActivity: '1 min ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Administration':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'Business':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Logistics':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Operations':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'AI Management':
        return 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30';
      case 'Development':
        return 'text-teal-600 bg-teal-100 dark:bg-teal-900/30';
      case 'AI':
        return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30';
      case 'Analytics':
        return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const handlePortalAction = (portalId: string, action: string) => {
    console.log(`Portal ${portalId} action: ${action}`);
    // Implement portal actions here
  };

  return (
    <PortalLayout
      portalName="TransBot AI"
      portalType="Super Admin Portal"
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
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your Super Admin Portal.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Live</span>
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

        {/* Portal Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Portal Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Monitor and manage all 43 portals across the platform
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    All Systems Active
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={() => console.log('Add new portal')}
                >
                  Add Portal
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {portals.map(portal => (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 border border-gray-200 dark:border-slate-600 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          portal.status === 'active'
                            ? 'bg-green-500'
                            : portal.status === 'maintenance'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {portal.name}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Type</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getTypeColor(portal.type)}`}
                      >
                        {portal.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Users</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {portal.users.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Port</span>
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {portal.port}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Status</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(portal.status)}`}
                      >
                        {portal.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Play}
                      onClick={() => handlePortalAction(portal.id, 'start')}
                      className="flex-1"
                    >
                      Start
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Pause}
                      onClick={() => handlePortalAction(portal.id, 'stop')}
                      className="flex-1"
                    >
                      Stop
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Eye}
                      onClick={() => handlePortalAction(portal.id, 'monitor')}
                    >
                      Monitor
                    </Button>
                  </div>
                </motion.div>
              ))}
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

export default SuperAdminPortalNew;
