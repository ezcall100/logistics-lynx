import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  LineChart,
  Lock,
  AlertCircle,
  X,
  RefreshCw,
} from 'lucide-react';

const SecurityOverview = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const securityStats = [
    {
      title: 'Security Score',
      value: '94%',
      change: '+2%',
      changeType: 'positive',
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Threats',
      value: '3',
      change: '-1',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Failed Logins',
      value: '12',
      change: '-5',
      changeType: 'positive',
      icon: Lock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Security Incidents',
      value: '0',
      change: '0',
      changeType: 'neutral',
      icon: AlertCircle,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  const securityFeatures = [
    { name: 'Multi-Factor Authentication', status: 'enabled', users: 245, coverage: 98 },
    { name: 'Single Sign-On (SSO)', status: 'enabled', users: 250, coverage: 100 },
    { name: 'Password Policy', status: 'enabled', users: 250, coverage: 100 },
    { name: 'Session Management', status: 'enabled', users: 250, coverage: 100 },
    { name: 'API Security', status: 'enabled', users: 45, coverage: 90 },
    { name: 'Data Encryption', status: 'enabled', users: 250, coverage: 100 },
    { name: 'Network Security', status: 'enabled', users: 250, coverage: 100 },
    { name: 'Backup Security', status: 'enabled', users: 250, coverage: 100 },
  ];

  const recentActivities = [
    { user: 'john.doe@company.com', action: 'Successful login', time: '2 minutes ago', status: 'success', location: 'New York, US' },
    { user: 'jane.smith@company.com', action: 'Password changed', time: '5 minutes ago', status: 'success', location: 'London, UK' },
    { user: 'mike.johnson@company.com', action: 'Failed login attempt', time: '8 minutes ago', status: 'warning', location: 'Unknown' },
    { user: 'sarah.wilson@company.com', action: 'MFA enabled', time: '12 minutes ago', status: 'success', location: 'Tokyo, Japan' },
    { user: 'alex.brown@company.com', action: 'API access granted', time: '15 minutes ago', status: 'success', location: 'San Francisco, US' },
    { user: 'unknown@external.com', action: 'Blocked login attempt', time: '18 minutes ago', status: 'error', location: 'Suspicious IP' },
  ];

  const threatLevels = [
    { level: 'Critical', count: 0, color: 'bg-red-500' },
    { level: 'High', count: 1, color: 'bg-orange-500' },
    { level: 'Medium', count: 2, color: 'bg-yellow-500' },
    { level: 'Low', count: 5, color: 'bg-green-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'enabled': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'disabled': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'enabled': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage your security posture</p>
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
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityStats.map((stat, index) => (
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
                <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
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
        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Features</h3>
          <div className="space-y-4">
            {securityFeatures.map((feature) => (
              <div key={feature.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                    {getStatusIcon(feature.status)}
                    <span className="ml-1 capitalize">{feature.status}</span>
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{feature.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature.users} users</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${feature.coverage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{feature.coverage}%</span>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Security Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.user}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.location}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Threat Levels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Threat Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {threatLevels.map((threat) => (
            <div key={threat.level} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`w-4 h-4 ${threat.color} rounded-full mx-auto mb-2`} />
              <p className="text-sm font-medium text-gray-900 dark:text-white">{threat.level}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{threat.count}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security Compliance Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">GDPR</p>
            <p className="text-xs text-green-600">Compliant</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">SOC 2</p>
            <p className="text-xs text-green-600">Compliant</p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Shield className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">ISO 27001</p>
            <p className="text-xs text-yellow-600">In Progress</p>
          </div>
        </div>
      </motion.div>

      {/* Security Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Security trends chart will be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityOverview;
