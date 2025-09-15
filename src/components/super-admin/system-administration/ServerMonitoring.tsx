import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Settings,
  Zap,
  RefreshCw,
  BarChart3,
  FileText,
  Network,
  Database,
  Cpu,
  MemoryStick,
  Globe2,
} from 'lucide-react';

/**
 * Server Monitoring - Real-time Infrastructure Dashboard
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T18:30:00.000Z
 */

interface ServerInstance {
  id: string;
  name: string;
  type: 'web' | 'database' | 'cache' | 'load-balancer' | 'api' | 'worker';
  status: 'online' | 'offline' | 'maintenance' | 'error';
  ipAddress: string;
  region: string;
  environment: 'production' | 'staging' | 'development';
  os: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkIn: number;
  networkOut: number;
  uptime: string;
  lastRestart: string;
  processes: number;
  loadAverage: number;
  temperature: number;
  powerConsumption: number;
}

interface ServerAlert {
  id: string;
  server: string;
  type: 'cpu' | 'memory' | 'disk' | 'network' | 'temperature' | 'process';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  value: number;
  threshold: number;
}

interface ServerMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

interface ServerLog {
  id: string;
  server: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  timestamp: string;
  source: string;
  tags: string[];
}

export const ServerMonitoring: React.FC = () => {
  const [servers, setServers] = useState<ServerInstance[]>([]);
  const [alerts, setAlerts] = useState<ServerAlert[]>([]);
  const [metrics, setMetrics] = useState<ServerMetric[]>([]);
  const [logs, setLogs] = useState<ServerLog[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'servers' | 'alerts' | 'logs' | 'metrics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedServer, setSelectedServer] = useState<ServerInstance | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const mockServers: ServerInstance[] = [
      {
        id: '1',
        name: 'Web Server 01',
        type: 'web',
        status: 'online',
        ipAddress: '192.168.1.10',
        region: 'us-east-1',
        environment: 'production',
        os: 'Ubuntu 22.04 LTS',
        cpuUsage: 45.2,
        memoryUsage: 67.8,
        diskUsage: 34.5,
        networkIn: 125.6,
        networkOut: 89.3,
        uptime: '45 days, 12 hours',
        lastRestart: '2025-08-01T00:00:00Z',
        processes: 156,
        loadAverage: 1.2,
        temperature: 42.5,
        powerConsumption: 85.2,
      },
      {
        id: '2',
        name: 'Database Server 01',
        type: 'database',
        status: 'online',
        ipAddress: '192.168.1.20',
        region: 'us-east-1',
        environment: 'production',
        os: 'CentOS 8',
        cpuUsage: 23.1,
        memoryUsage: 89.4,
        diskUsage: 78.2,
        networkIn: 45.8,
        networkOut: 67.2,
        uptime: '67 days, 8 hours',
        lastRestart: '2025-07-15T00:00:00Z',
        processes: 89,
        loadAverage: 0.8,
        temperature: 38.7,
        powerConsumption: 120.5,
      },
      {
        id: '3',
        name: 'Cache Server 01',
        type: 'cache',
        status: 'online',
        ipAddress: '192.168.1.30',
        region: 'us-east-1',
        environment: 'production',
        os: 'Ubuntu 22.04 LTS',
        cpuUsage: 12.5,
        memoryUsage: 45.6,
        diskUsage: 12.3,
        networkIn: 89.4,
        networkOut: 156.7,
        uptime: '23 days, 15 hours',
        lastRestart: '2025-08-22T00:00:00Z',
        processes: 34,
        loadAverage: 0.3,
        temperature: 35.2,
        powerConsumption: 45.8,
      },
      {
        id: '4',
        name: 'API Server 01',
        type: 'api',
        status: 'maintenance',
        ipAddress: '192.168.1.40',
        region: 'us-west-2',
        environment: 'production',
        os: 'Ubuntu 22.04 LTS',
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkIn: 0,
        networkOut: 0,
        uptime: '0 days, 0 hours',
        lastRestart: '2025-09-14T10:00:00Z',
        processes: 0,
        loadAverage: 0,
        temperature: 0,
        powerConsumption: 0,
      },
    ];

    const mockAlerts: ServerAlert[] = [
      {
        id: '1',
        server: 'Database Server 01',
        type: 'memory',
        severity: 'high',
        message: 'Memory usage exceeded 85% threshold',
        timestamp: '2025-09-14T12:30:00Z',
        status: 'active',
        value: 89.4,
        threshold: 85,
      },
      {
        id: '2',
        server: 'Web Server 01',
        type: 'cpu',
        severity: 'medium',
        message: 'CPU usage above normal range',
        timestamp: '2025-09-14T12:25:00Z',
        status: 'acknowledged',
        value: 45.2,
        threshold: 40,
      },
      {
        id: '3',
        server: 'Database Server 01',
        type: 'disk',
        severity: 'critical',
        message: 'Disk usage critical - immediate attention required',
        timestamp: '2025-09-14T12:20:00Z',
        status: 'active',
        value: 78.2,
        threshold: 75,
      },
    ];

    const mockMetrics: ServerMetric[] = [
      { name: 'Total Servers', value: 12, unit: 'servers', trend: 'up', threshold: 20, status: 'normal' },
      { name: 'Online Servers', value: 11, unit: 'servers', trend: 'stable', threshold: 12, status: 'normal' },
      { name: 'Average CPU Usage', value: 28.5, unit: '%', trend: 'down', threshold: 80, status: 'normal' },
      { name: 'Average Memory Usage', value: 67.8, unit: '%', trend: 'up', threshold: 85, status: 'warning' },
      { name: 'Average Disk Usage', value: 45.2, unit: '%', trend: 'up', threshold: 80, status: 'normal' },
      { name: 'Active Alerts', value: 3, unit: 'alerts', trend: 'up', threshold: 10, status: 'normal' },
    ];

    const mockLogs: ServerLog[] = [
      {
        id: '1',
        server: 'Web Server 01',
        level: 'info',
        message: 'HTTP request processed successfully',
        timestamp: '2025-09-14T12:30:00Z',
        source: 'nginx',
        tags: ['http', 'request', 'success'],
      },
      {
        id: '2',
        server: 'Database Server 01',
        level: 'warning',
        message: 'Slow query detected - execution time: 2.5s',
        timestamp: '2025-09-14T12:25:00Z',
        source: 'postgresql',
        tags: ['database', 'query', 'performance'],
      },
      {
        id: '3',
        server: 'Cache Server 01',
        level: 'error',
        message: 'Redis connection timeout',
        timestamp: '2025-09-14T12:20:00Z',
        source: 'redis',
        tags: ['cache', 'connection', 'timeout'],
      },
    ];

    setServers(mockServers);
    setAlerts(mockAlerts);
    setMetrics(mockMetrics);
    setLogs(mockLogs);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
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

  const getServerIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe2 className="w-5 h-5 text-blue-600" />;
      case 'database':
        return <Database className="w-5 h-5 text-green-600" />;
      case 'cache':
        return <Zap className="w-5 h-5 text-yellow-600" />;
      case 'load-balancer':
        return <Network className="w-5 h-5 text-purple-600" />;
      case 'api':
        return <Settings className="w-5 h-5 text-orange-600" />;
      case 'worker':
        return <Activity className="w-5 h-5 text-red-600" />;
      default:
        return <Server className="w-5 h-5 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'servers', label: 'Servers', icon: Server },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'metrics', label: 'Metrics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Server Monitoring</h1>
            <p className="text-slate-600 dark:text-slate-400">Real-time infrastructure monitoring and management</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search servers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 border rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                autoRefresh 
                  ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto Refresh</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Server</span>
            </button>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Servers</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{servers.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {servers.filter(s => s.status === 'online').length} online
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {alerts.filter(a => a.status === 'active').length}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {alerts.filter(a => a.severity === 'critical').length} critical
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg CPU Usage</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(servers.reduce((sum, s) => sum + s.cpuUsage, 0) / servers.length)}%
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <Cpu className="w-4 h-4 mr-1" />
                  System load
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Cpu className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Memory</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(servers.reduce((sum, s) => sum + s.memoryUsage, 0) / servers.length)}%
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center mt-1">
                  <MemoryStick className="w-4 h-4 mr-1" />
                  RAM usage
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <MemoryStick className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                  {/* Server Status Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Server Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {servers.map((server) => (
                        <motion.div
                          key={server.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                          onClick={() => console.log('Server clicked:', server.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              {getServerIcon(server.type)}
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">{server.name}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{server.ipAddress} • {server.region}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                              {server.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">CPU</p>
                              <p className="font-medium text-slate-900 dark:text-white">{server.cpuUsage}%</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Memory</p>
                              <p className="font-medium text-slate-900 dark:text-white">{server.memoryUsage}%</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Disk</p>
                              <p className="font-medium text-slate-900 dark:text-white">{server.diskUsage}%</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Uptime</p>
                              <p className="font-medium text-slate-900 dark:text-white">{server.uptime}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">System Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {metrics.map((metric) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
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
                </motion.div>
              )}

              {selectedTab === 'servers' && (
                <motion.div
                  key="servers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {servers.map((server, index) => (
                    <motion.div
                      key={server.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            {getServerIcon(server.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{server.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {server.ipAddress} • {server.os} • {server.environment}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                CPU: {server.cpuUsage}%
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                RAM: {server.memoryUsage}%
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                Disk: {server.diskUsage}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                            {server.status}
                          </span>
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{alert.message}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {alert.server} • {new Date(alert.timestamp).toLocaleString()}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {alert.type.toUpperCase()}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                Value: {alert.value} (Threshold: {alert.threshold})
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            alert.status === 'active' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}>
                            {alert.status}
                          </span>
                        </div>
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
                              {log.server} • {log.source} • {new Date(log.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLogLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {log.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Real-time Monitoring Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">CPU Usage</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Cpu className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Real-time CPU monitoring chart</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Memory Usage</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <MemoryStick className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Real-time memory monitoring chart</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Network Monitoring */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Network Traffic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {servers.map((server) => (
                        <div key={server.id} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{server.name}</h4>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {server.networkIn} MB/s in • {server.networkOut} MB/s out
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${Math.min((server.networkIn + server.networkOut) / 200 * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default ServerMonitoring;
