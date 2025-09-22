import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Server,
  Database,
  Globe,
  Shield,
  Settings,
  Play,
  Pause,
  RefreshCw,
  GitBranch,
  Code,
  Package,
  Zap,
} from 'lucide-react';

const DeploymentOverview = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const stats = [
    {
      title: 'Total Deployments',
      value: '1,247',
      change: '+18%',
      changeType: 'positive',
      icon: Rocket,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Successful Deployments',
      value: '1,189',
      change: '+12%',
      changeType: 'positive',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Failed Deployments',
      value: '58',
      change: '-5%',
      changeType: 'positive',
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Success Rate',
      value: '95.3%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
  ];

  const environments = [
    { name: 'Production', status: 'healthy', deployments: 12, uptime: '99.9%', lastDeploy: '2 hours ago' },
    { name: 'Staging', status: 'healthy', deployments: 8, uptime: '99.8%', lastDeploy: '1 hour ago' },
    { name: 'Development', status: 'warning', deployments: 15, uptime: '98.5%', lastDeploy: '30 minutes ago' },
    { name: 'Testing', status: 'healthy', deployments: 6, uptime: '99.7%', lastDeploy: '3 hours ago' },
  ];

  const recentDeployments = [
    { 
      id: 'deploy-001', 
      service: 'Frontend App', 
      version: 'v2.1.3', 
      environment: 'Production', 
      status: 'success', 
      duration: '2m 34s',
      deployedBy: 'John Doe',
      time: '2 hours ago'
    },
    { 
      id: 'deploy-002', 
      service: 'API Gateway', 
      version: 'v1.8.2', 
      environment: 'Staging', 
      status: 'success', 
      duration: '1m 45s',
      deployedBy: 'Jane Smith',
      time: '1 hour ago'
    },
    { 
      id: 'deploy-003', 
      service: 'Database Migration', 
      version: 'v3.0.1', 
      environment: 'Development', 
      status: 'failed', 
      duration: '5m 12s',
      deployedBy: 'Mike Johnson',
      time: '30 minutes ago'
    },
    { 
      id: 'deploy-004', 
      service: 'Backend Service', 
      version: 'v2.5.0', 
      environment: 'Testing', 
      status: 'success', 
      duration: '3m 20s',
      deployedBy: 'Sarah Wilson',
      time: '3 hours ago'
    },
    { 
      id: 'deploy-005', 
      service: 'Microservice A', 
      version: 'v1.9.4', 
      environment: 'Production', 
      status: 'success', 
      duration: '1m 58s',
      deployedBy: 'Alex Brown',
      time: '4 hours ago'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deployment Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage your deployment pipeline</p>
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
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
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
        {/* Environment Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Environment Status</h3>
          <div className="space-y-4">
            {environments.map((env, index) => (
              <div key={env.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    env.status === 'healthy' ? 'bg-green-500' : 
                    env.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{env.name}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{env.deployments} deployments</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{env.uptime}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{env.lastDeploy}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Deployments */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deployments</h3>
          <div className="space-y-3">
            {recentDeployments.map((deployment, index) => (
              <div key={deployment.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}>
                  {getStatusIcon(deployment.status)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{deployment.service}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{deployment.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {deployment.version} • {deployment.environment} • {deployment.duration}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">by {deployment.deployedBy}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Deployment Pipeline Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <GitBranch className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Source Control</p>
            <p className="text-xs text-green-600">Connected</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Code className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Build</p>
            <p className="text-xs text-green-600">Passing</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Package</p>
            <p className="text-xs text-green-600">Ready</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Rocket className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Deploy</p>
            <p className="text-xs text-green-600">Success</p>
          </div>
        </div>
      </motion.div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Deployment Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Deployment trends chart will be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeploymentOverview;
