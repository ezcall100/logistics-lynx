import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Database,
  Server,
  Network,
  Search,
  Download,
  RefreshCw,
  Bell,
  Monitor,
} from 'lucide-react';

/**
 * Performance Reports - Advanced Performance Intelligence Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  threshold: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  category: 'system' | 'application' | 'network' | 'database';
}

interface SystemPerformance {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
}

interface ApplicationMetric {
  name: string;
  responseTime: number;
  throughput: number;
  errorRate: number;
  uptime: number;
  users: number;
  requests: number;
  status: 'healthy' | 'warning' | 'critical';
}

interface DatabasePerformance {
  name: string;
  connections: number;
  queries: number;
  slowQueries: number;
  cacheHitRate: number;
  diskUsage: number;
  status: 'healthy' | 'warning' | 'critical';
}

export const PerformanceReports: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [systemData, setSystemData] = useState<SystemPerformance[]>([]);
  const [applications, setApplications] = useState<ApplicationMetric[]>([]);
  const [databases, setDatabases] = useState<DatabasePerformance[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'system' | 'applications' | 'databases' | 'alerts'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockMetrics: PerformanceMetric[] = [
      {
        name: 'System Uptime',
        value: 99.9,
        unit: '%',
        trend: 'up',
        change: 0.1,
        threshold: 99.5,
        status: 'excellent',
        category: 'system',
      },
      {
        name: 'Average Response Time',
        value: 245,
        unit: 'ms',
        trend: 'down',
        change: -15,
        threshold: 500,
        status: 'excellent',
        category: 'application',
      },
      {
        name: 'CPU Usage',
        value: 67.8,
        unit: '%',
        trend: 'up',
        change: 5.2,
        threshold: 85,
        status: 'good',
        category: 'system',
      },
      {
        name: 'Memory Usage',
        value: 72.3,
        unit: '%',
        trend: 'up',
        change: 3.1,
        threshold: 90,
        status: 'good',
        category: 'system',
      },
      {
        name: 'Error Rate',
        value: 0.8,
        unit: '%',
        trend: 'down',
        change: -0.3,
        threshold: 2,
        status: 'excellent',
        category: 'application',
      },
      {
        name: 'Database Performance',
        value: 94.2,
        unit: '%',
        trend: 'up',
        change: 2.1,
        threshold: 90,
        status: 'excellent',
        category: 'database',
      },
    ];

    const mockSystemData: SystemPerformance[] = [
      { timestamp: '00:00', cpu: 45, memory: 68, disk: 23, network: 12, responseTime: 280, throughput: 1250, errorRate: 0.5 },
      { timestamp: '04:00', cpu: 38, memory: 65, disk: 24, network: 8, responseTime: 220, throughput: 980, errorRate: 0.3 },
      { timestamp: '08:00', cpu: 72, memory: 78, disk: 25, network: 45, responseTime: 320, throughput: 2100, errorRate: 0.8 },
      { timestamp: '12:00', cpu: 85, memory: 82, disk: 26, network: 52, responseTime: 380, throughput: 2800, errorRate: 1.2 },
      { timestamp: '16:00', cpu: 78, memory: 79, disk: 27, network: 48, responseTime: 350, throughput: 2400, errorRate: 0.9 },
      { timestamp: '20:00', cpu: 62, memory: 74, disk: 28, network: 35, responseTime: 290, throughput: 1800, errorRate: 0.6 },
    ];

    const mockApplications: ApplicationMetric[] = [
      {
        name: 'Super Admin Portal',
        responseTime: 245,
        throughput: 1250,
        errorRate: 0.8,
        uptime: 99.9,
        users: 15420,
        requests: 8947,
        status: 'healthy',
      },
      {
        name: 'API Gateway',
        responseTime: 180,
        throughput: 3200,
        errorRate: 0.3,
        uptime: 99.8,
        users: 28400,
        requests: 15600,
        status: 'healthy',
      },
      {
        name: 'User Management',
        responseTime: 320,
        throughput: 890,
        errorRate: 1.2,
        uptime: 99.5,
        users: 12000,
        requests: 4200,
        status: 'warning',
      },
      {
        name: 'Analytics Engine',
        responseTime: 450,
        throughput: 650,
        errorRate: 2.1,
        uptime: 98.9,
        users: 8500,
        requests: 2100,
        status: 'critical',
      },
    ];

    const mockDatabases: DatabasePerformance[] = [
      {
        name: 'PostgreSQL Main',
        connections: 45,
        queries: 12500,
        slowQueries: 23,
        cacheHitRate: 94.2,
        diskUsage: 67.8,
        status: 'healthy',
      },
      {
        name: 'Redis Cache',
        connections: 12,
        queries: 45000,
        slowQueries: 0,
        cacheHitRate: 98.7,
        diskUsage: 23.4,
        status: 'healthy',
      },
      {
        name: 'MongoDB Analytics',
        connections: 8,
        queries: 3200,
        slowQueries: 15,
        cacheHitRate: 87.3,
        diskUsage: 89.2,
        status: 'warning',
      },
    ];

    setMetrics(mockMetrics);
    setSystemData(mockSystemData);
    setApplications(mockApplications);
    setDatabases(mockDatabases);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'system':
        return <Server className="w-5 h-5 text-blue-600" />;
      case 'application':
        return <Monitor className="w-5 h-5 text-green-600" />;
      case 'network':
        return <Network className="w-5 h-5 text-purple-600" />;
      case 'database':
        return <Database className="w-5 h-5 text-orange-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'system', label: 'System', icon: Server },
    { id: 'applications', label: 'Applications', icon: Monitor },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Performance Reports</h1>
            <p className="text-slate-600 dark:text-slate-400">Advanced performance monitoring and analytics</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search metrics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            >
              <option value="1h">Last hour</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(metric.category)}
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {metric.value}{metric.unit}
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  {getTrendIcon(metric.trend)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Threshold: {metric.threshold}{metric.unit}
                </span>
              </div>
            </motion.div>
          ))}
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
                  {/* System Performance Chart */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">System Performance</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">System performance chart</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Application Performance</h3>
                      <div className="space-y-4">
                        {applications.map((app) => (
                          <div key={app.name} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{app.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                                {app.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Response Time:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{app.responseTime}ms</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Throughput:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{formatNumber(app.throughput)}/s</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Error Rate:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{app.errorRate}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Uptime:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{app.uptime}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Database Performance</h3>
                      <div className="space-y-4">
                        {databases.map((db) => (
                          <div key={db.name} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{db.name}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(db.status)}`}>
                                {db.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Connections:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{db.connections}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Queries:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{formatNumber(db.queries)}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Cache Hit:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{db.cacheHitRate}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Disk Usage:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{db.diskUsage}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'system' && (
                <motion.div
                  key="system"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* System Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Resource Usage</h3>
                      <div className="space-y-4">
                        {systemData.map((data) => (
                          <div key={data.timestamp} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{data.timestamp}</h4>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {data.responseTime}ms response
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">CPU:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{data.cpu}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Memory:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{data.memory}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Disk:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{data.disk}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500 dark:text-slate-400">Network:</span>
                                <span className="ml-2 font-medium text-slate-900 dark:text-white">{data.network}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">System Health</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Server className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">System health dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'applications' && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Application Performance */}
                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <motion.div
                        key={app.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{app.name}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {formatNumber(app.users)} users • {formatNumber(app.requests)} requests
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {app.responseTime}ms response
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {formatNumber(app.throughput)}/s throughput
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {app.uptime}% uptime
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {app.errorRate}%
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Error Rate
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'databases' && (
                <motion.div
                  key="databases"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Database Performance */}
                  <div className="space-y-4">
                    {databases.map((db, index) => (
                      <motion.div
                        key={db.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                              <Database className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{db.name}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {db.connections} connections • {formatNumber(db.queries)} queries
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {db.cacheHitRate}% cache hit
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {db.slowQueries} slow queries
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {db.diskUsage}% disk usage
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {db.cacheHitRate}%
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Cache Hit Rate
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(db.status)}`}>
                              {db.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Performance Alerts</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Monitor and manage performance alerts and notifications
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Configure Alerts
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
