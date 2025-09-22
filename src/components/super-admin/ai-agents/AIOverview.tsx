import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Activity,
  Users,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Cpu,
  Database,
  Globe,
  Shield,
  Settings,
  Play,
  Pause,
  RefreshCw,
} from 'lucide-react';

const AIOverview = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const stats = [
    {
      title: 'Total AI Agents',
      value: '47',
      change: '+12%',
      changeType: 'positive',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Active Agents',
      value: '42',
      change: '+8%',
      changeType: 'positive',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Tasks Completed',
      value: '1,247',
      change: '+23%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
  ];

  const agentTypes = [
    { name: 'Customer Support', count: 12, status: 'active', efficiency: 96 },
    { name: 'Data Processing', count: 8, status: 'active', efficiency: 92 },
    { name: 'Content Generation', count: 6, status: 'active', efficiency: 89 },
    { name: 'Analytics', count: 10, status: 'active', efficiency: 94 },
    { name: 'Security Monitoring', count: 5, status: 'active', efficiency: 98 },
    { name: 'Workflow Automation', count: 6, status: 'maintenance', efficiency: 87 },
  ];

  const recentActivities = [
    { agent: 'Support Agent #3', action: 'Resolved customer query', time: '2 min ago', status: 'success' },
    { agent: 'Data Processor #1', action: 'Processed 1,200 records', time: '5 min ago', status: 'success' },
    { agent: 'Content Generator #2', action: 'Generated marketing copy', time: '8 min ago', status: 'success' },
    { agent: 'Analytics Agent #4', action: 'Completed daily report', time: '12 min ago', status: 'success' },
    { agent: 'Security Monitor #1', action: 'Detected potential threat', time: '15 min ago', status: 'warning' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Agents Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage your AI agent ecosystem</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last period
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor} dark:bg-gray-700`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Types */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Agent Types</h3>
          <div className="space-y-4">
            {agentTypes.map((type, index) => (
              <div key={type.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${type.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <span className="font-medium text-gray-900 dark:text-white">{type.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{type.count} agents</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${type.efficiency}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{type.efficiency}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' : 
                  activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.agent}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Performance chart will be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIOverview;
