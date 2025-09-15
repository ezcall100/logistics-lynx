import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Database,
  Network,
  Shield,
  Bell,
  Users,
  Save,
  Download,
  Search,
  Filter,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Zap,
  FileText,
} from 'lucide-react';

/**
 * System Settings - Comprehensive Configuration Management Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T18:30:00.000Z
 */

interface SystemConfig {
  id: string;
  category: 'general' | 'security' | 'performance' | 'notifications' | 'integrations' | 'backup';
  name: string;
  description: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean' | 'select' | 'multiselect';
  options?: string[];
  required: boolean;
  lastModified: string;
  modifiedBy: string;
  status: 'active' | 'inactive' | 'pending';
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

interface SystemLog {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  timestamp: string;
  source: string;
  category: string;
}

export const SystemSettings: React.FC = () => {
  const [configs, setConfigs] = useState<SystemConfig[]>([]);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'general' | 'security' | 'performance' | 'notifications' | 'integrations' | 'backup' | 'logs'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const mockConfigs: SystemConfig[] = [
      {
        id: '1',
        category: 'general',
        name: 'Site Name',
        description: 'The name of your application',
        value: 'TransBot Logistics',
        type: 'string',
        required: true,
        lastModified: '2025-09-14T10:30:00Z',
        modifiedBy: 'System Admin',
        status: 'active',
      },
      {
        id: '2',
        category: 'general',
        name: 'Default Language',
        description: 'Default language for the application',
        value: 'English',
        type: 'select',
        options: ['English', 'Spanish', 'French', 'German', 'Chinese'],
        required: true,
        lastModified: '2025-09-14T09:15:00Z',
        modifiedBy: 'System Admin',
        status: 'active',
      },
      {
        id: '3',
        category: 'security',
        name: 'Session Timeout',
        description: 'User session timeout in minutes',
        value: 30,
        type: 'number',
        required: true,
        lastModified: '2025-09-14T08:45:00Z',
        modifiedBy: 'Security Admin',
        status: 'active',
      },
      {
        id: '4',
        category: 'security',
        name: 'Enable MFA',
        description: 'Enable multi-factor authentication',
        value: true,
        type: 'boolean',
        required: false,
        lastModified: '2025-09-14T07:30:00Z',
        modifiedBy: 'Security Admin',
        status: 'active',
      },
      {
        id: '5',
        category: 'performance',
        name: 'Cache Duration',
        description: 'Cache duration in seconds',
        value: 3600,
        type: 'number',
        required: true,
        lastModified: '2025-09-14T06:15:00Z',
        modifiedBy: 'Performance Admin',
        status: 'active',
      },
      {
        id: '6',
        category: 'notifications',
        name: 'Email Notifications',
        description: 'Enable email notifications',
        value: true,
        type: 'boolean',
        required: false,
        lastModified: '2025-09-14T05:00:00Z',
        modifiedBy: 'Notification Admin',
        status: 'active',
      },
    ];

    const mockMetrics: SystemMetric[] = [
      { name: 'System Uptime', value: 99.9, unit: '%', trend: 'up', threshold: 99, status: 'normal' },
      { name: 'Response Time', value: 245, unit: 'ms', trend: 'down', threshold: 500, status: 'normal' },
      { name: 'Memory Usage', value: 67.8, unit: '%', trend: 'up', threshold: 85, status: 'normal' },
      { name: 'CPU Usage', value: 23.5, unit: '%', trend: 'down', threshold: 80, status: 'normal' },
      { name: 'Disk Usage', value: 45.2, unit: '%', trend: 'up', threshold: 80, status: 'normal' },
      { name: 'Active Users', value: 1250, unit: 'users', trend: 'up', threshold: 2000, status: 'normal' },
    ];

    const mockLogs: SystemLog[] = [
      {
        id: '1',
        level: 'info',
        message: 'System configuration updated successfully',
        timestamp: '2025-09-14T12:30:00Z',
        source: 'config-manager',
        category: 'general',
      },
      {
        id: '2',
        level: 'warning',
        message: 'High memory usage detected',
        timestamp: '2025-09-14T12:25:00Z',
        source: 'monitor',
        category: 'performance',
      },
      {
        id: '3',
        level: 'error',
        message: 'Failed to connect to external API',
        timestamp: '2025-09-14T12:20:00Z',
        source: 'api-client',
        category: 'integrations',
      },
    ];

    setConfigs(mockConfigs);
    setMetrics(mockMetrics);
    setLogs(mockLogs);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'debug':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'general':
        return <Settings className="w-5 h-5 text-blue-600" />;
      case 'security':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'performance':
        return <Zap className="w-5 h-5 text-yellow-600" />;
      case 'notifications':
        return <Bell className="w-5 h-5 text-purple-600" />;
      case 'integrations':
        return <Network className="w-5 h-5 text-green-600" />;
      case 'backup':
        return <Database className="w-5 h-5 text-indigo-600" />;
      default:
        return <Settings className="w-5 h-5 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'performance', label: 'Performance', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Network },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'logs', label: 'Logs', icon: FileText },
  ];

  const handleConfigChange = (id: string, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.id === id ? { ...config, value } : config
    ));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save configuration changes
    setHasUnsavedChanges(false);
    // Show success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">System Settings</h1>
            <p className="text-slate-600 dark:text-slate-400">Comprehensive system configuration and management</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search settings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            {hasUnsavedChanges && (
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Configs</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{configs.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {configs.filter(c => c.status === 'active').length} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.find(m => m.name === 'System Uptime')?.value}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Excellent
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Response Time</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.find(m => m.name === 'Response Time')?.value}ms
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Fast
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.find(m => m.name === 'Active Users')?.value.toLocaleString()}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center mt-1">
                  <Users className="w-4 h-4 mr-1" />
                  Online now
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* System Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">System Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{metric.name}</h4>
                            <div className="flex items-center space-x-1">
                              {metric.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : metric.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <Activity className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {metric.value} {metric.unit}
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                metric.status === 'critical' ? 'bg-red-500' :
                                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Configuration Categories */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Configuration Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {['general', 'security', 'performance', 'notifications', 'integrations', 'backup'].map((category, index) => {
                        const categoryConfigs = configs.filter(c => c.category === category);
                        return (
                          <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                            onClick={() => setSelectedTab(category as any)}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                {getCategoryIcon(category)}
                                <div>
                                  <h4 className="font-semibold text-slate-900 dark:text-white capitalize">{category}</h4>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {categoryConfigs.length} configurations
                                  </p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('active')}`}>
                                Active
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Active</span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {categoryConfigs.filter(c => c.status === 'active').length}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Required</span>
                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                  {categoryConfigs.filter(c => c.required).length}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab !== 'overview' && selectedTab !== 'logs' && (
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {configs
                    .filter(config => config.category === selectedTab)
                    .map((config, index) => (
                      <motion.div
                        key={config.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{config.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{config.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {config.type}
                              </span>
                              {config.required && (
                                <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 px-2 py-1 rounded">
                                  Required
                                </span>
                              )}
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                Modified: {new Date(config.lastModified).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(config.status)}`}>
                            {config.status}
                          </span>
                        </div>
                        
                        <div className="mt-4">
                          {config.type === 'boolean' ? (
                            <label className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={config.value as boolean}
                                onChange={(e) => handleConfigChange(config.id, e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <span className="text-sm text-slate-700 dark:text-slate-300">
                                {config.value ? 'Enabled' : 'Disabled'}
                              </span>
                            </label>
                          ) : config.type === 'select' ? (
                            <select
                              value={config.value as string}
                              onChange={(e) => handleConfigChange(config.id, e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            >
                              {config.options?.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={config.type === 'number' ? 'number' : 'text'}
                              value={config.value as string | number}
                              onChange={(e) => handleConfigChange(config.id, config.type === 'number' ? Number(e.target.value) : e.target.value)}
                              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                </motion.div>
              )}

              {selectedTab === 'logs' && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {logs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{log.message}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {log.source} • {log.category} • {new Date(log.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
