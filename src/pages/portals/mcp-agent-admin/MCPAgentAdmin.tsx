import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Menu,
  Search,
  Bell,
  Settings,
  LogOut,
  Plus,
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle,
  X,
  Home,
  DollarSign,
} from 'lucide-react';

import RealTimePortalStatus from '../../../components/RealTimePortalStatus';

function MCPAgentAdmin() {
  const [user] = useState({
    id: 1,
    name: 'Demo User',
    email: 'demo@transbotai.com',
    role: 'admin',
    permissions: ['read', 'write', 'admin'],
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'New mcp created',
      message: 'MCP Agent Admin #1234 has been added',
      time: '5 minutes ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'Status updated',
      message: 'Mark Johnson is now active',
      time: '1 hour ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'Payment overdue',
      message: 'Invoice #INV-2023-001 is 3 days overdue',
      time: '3 days ago',
      type: 'warning',
    },
  ];

  const metrics = [
    {
      id: 'active',
      title: 'Active MCPs',
      value: '128',
      change: '+12%',
      changeType: 'increase',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '$258,143',
      change: '+8%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'efficiency',
      title: 'Efficiency Rate',
      value: '92%',
      change: '+5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: '7',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const performanceData = [
    { label: 'System Uptime', value: 92, color: 'bg-green-500' },
    { label: 'Response Time', value: 99.8, color: 'bg-blue-500' },
    { label: 'User Satisfaction', value: 95, color: 'bg-purple-500' },
    { label: 'Cost Efficiency', value: 83, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New mcp created',
      details: 'MCP Agent Admin #1234 has been added to your network',
      time: '5 minutes ago',
      type: 'info',
      icon: Plus,
    },
    {
      id: 2,
      action: 'Status updated',
      details: 'Mark Johnson is now active with mcp #5678',
      time: '1 hour ago',
      type: 'success',
      icon: CheckCircle,
    },
    {
      id: 3,
      action: 'Payment overdue',
      details: 'Invoice #INV-2023-001 is 3 days overdue',
      time: '3 days ago',
      type: 'warning',
      icon: AlertTriangle,
    },
    {
      id: 4,
      action: 'New user registered',
      details: 'Beta Corp has been added to your network',
      time: 'Yesterday',
      type: 'info',
      icon: Bot,
    },
    {
      id: 5,
      action: 'System maintenance',
      details: 'Scheduled maintenance in 2 days',
      time: '2 days ago',
      type: 'warning',
      icon: Settings,
    },
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, active: true },
    { id: 'management', label: 'Management', icon: Bot, active: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-orange-600 bg-orange-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return X;
      default:
        return Activity;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-xl font-semibold text-gray-900">TransBot AI</h1>
                    <p className="text-sm text-gray-500">MCP Agent Admin</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <div className="flex items-center space-x-3">
                <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Modern Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-3 text-lg font-semibold text-gray-900">TransBot AI</span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navigationItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                  <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign out
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
              <p className="mt-2 text-lg text-gray-600">
                Welcome back, {user.name}! Here's what's happening with your mcp agent admin.
              </p>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map(metric => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        <span
                          className={`text-sm font-medium ${
                            metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {metric.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['Overview', 'Analytics', 'Management'].map(tab => (
                    <button
                      key={tab}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.toLowerCase()
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Performance Overview */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Performance Overview
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Key performance indicators for MCP Agent Admin
                      </p>
                      <div className="space-y-4">
                        {performanceData.map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">{item.label}</span>
                              <span className="font-medium text-gray-900">{item.value}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${item.value}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {recentActivity.map(activity => {
                          const StatusIcon = getStatusIcon(activity.type);
                          return (
                            <div key={activity.id} className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${getStatusColor(activity.type)}`}>
                                <StatusIcon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                  {activity.action}
                                </p>
                                <p className="text-sm text-gray-600">{activity.details}</p>
                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="text-center py-12">
                    <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics Dashboard</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Advanced analytics and reporting features coming soon.
                    </p>
                  </div>
                )}

                {activeTab === 'management' && (
                  <div className="text-center py-12">
                    <Bot className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      MCP Agent Admin Management
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Management tools and controls for mcp agent admin.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Real-time Status */}
            <RealTimePortalStatus portalId="mcp-agent-admin" />
          </div>
        </main>
      </div>

      {/* Modern Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default MCPAgentAdmin;
