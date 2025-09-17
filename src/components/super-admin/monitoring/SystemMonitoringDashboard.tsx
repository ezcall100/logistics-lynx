import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Server,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Settings,
  Eye,
  Bell,
  Shield,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Monitor,
  Wifi,
  WifiOff,
  AlertCircle,
  Info,
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  change: number;
  changeType: 'increase' | 'decrease';
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  threshold: {
    warning: number;
    critical: number;
  };
}

interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  responseTime: number;
  lastCheck: string;
  version: string;
  dependencies: string[];
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  source: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  acknowledged: boolean;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source: string;
  details?: Record<string, unknown>;
}

const SystemMonitoringDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data
  const mockMetrics: SystemMetric[] = [
    {
      id: '1',
      name: 'CPU Usage',
      value: 45.2,
      status: 'healthy',
      change: -5.8,
      changeType: 'decrease',
      unit: '%',
      icon: Cpu,
      threshold: { warning: 70, critical: 90 },
    },
    {
      id: '2',
      name: 'Memory Usage',
      value: 67.8,
      status: 'warning',
      change: 2.1,
      changeType: 'increase',
      unit: '%',
      icon: HardDrive,
      threshold: { warning: 75, critical: 90 },
    },
    {
      id: '3',
      name: 'Disk Usage',
      value: 34.5,
      status: 'healthy',
      change: 1.2,
      changeType: 'increase',
      unit: '%',
      icon: HardDrive,
      threshold: { warning: 80, critical: 95 },
    },
    {
      id: '4',
      name: 'Network Latency',
      value: 12.3,
      status: 'healthy',
      change: -2.5,
      changeType: 'decrease',
      unit: 'ms',
      icon: Network,
      threshold: { warning: 50, critical: 100 },
    },
    {
      id: '5',
      name: 'Response Time',
      value: 245,
      status: 'healthy',
      change: -12.5,
      changeType: 'decrease',
      unit: 'ms',
      icon: Clock,
      threshold: { warning: 500, critical: 1000 },
    },
    {
      id: '6',
      name: 'Throughput',
      value: 1250,
      status: 'healthy',
      change: 18.7,
      changeType: 'increase',
      unit: 'req/s',
      icon: Zap,
      threshold: { warning: 500, critical: 2000 },
    },
  ];

  const mockServices: ServiceStatus[] = [
    {
      id: '1',
      name: 'Web Server',
      status: 'online',
      uptime: '99.9%',
      responseTime: 45,
      lastCheck: '2024-01-15T10:30:00Z',
      version: '2.4.41',
      dependencies: ['Database', 'Cache'],
    },
    {
      id: '2',
      name: 'Database',
      status: 'online',
      uptime: '99.8%',
      responseTime: 12,
      lastCheck: '2024-01-15T10:30:00Z',
      version: '13.7',
      dependencies: ['Storage'],
    },
    {
      id: '3',
      name: 'Cache Server',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: 8,
      lastCheck: '2024-01-15T10:30:00Z',
      version: '6.2.7',
      dependencies: [],
    },
    {
      id: '4',
      name: 'API Gateway',
      status: 'online',
      uptime: '99.7%',
      responseTime: 23,
      lastCheck: '2024-01-15T10:30:00Z',
      version: '3.1.0',
      dependencies: ['Web Server', 'Database'],
    },
    {
      id: '5',
      name: 'Message Queue',
      status: 'online',
      uptime: '99.6%',
      responseTime: 5,
      lastCheck: '2024-01-15T10:30:00Z',
      version: '5.15.0',
      dependencies: ['Database'],
    },
  ];

  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High Memory Usage',
      message: 'Memory usage has exceeded 75% threshold',
      timestamp: '2024-01-15T10:25:00Z',
      source: 'System Monitor',
      severity: 'medium',
      acknowledged: false,
    },
    {
      id: '2',
      type: 'error',
      title: 'Cache Server Degraded',
      message: 'Cache server response time is above normal levels',
      timestamp: '2024-01-15T10:20:00Z',
      source: 'Service Monitor',
      severity: 'high',
      acknowledged: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Database maintenance scheduled for tonight at 2 AM',
      timestamp: '2024-01-15T09:00:00Z',
      source: 'Scheduler',
      severity: 'low',
      acknowledged: false,
    },
  ];

  const mockLogs: LogEntry[] = [
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      level: 'info',
      message: 'User authentication successful',
      source: 'Auth Service',
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:29:45Z',
      level: 'warning',
      message: 'High memory usage detected',
      source: 'System Monitor',
    },
    {
      id: '3',
      timestamp: '2024-01-15T10:29:30Z',
      level: 'error',
      message: 'Database connection timeout',
      source: 'Database Service',
    },
    {
      id: '4',
      timestamp: '2024-01-15T10:29:15Z',
      level: 'info',
      message: 'Cache miss for key: user:12345',
      source: 'Cache Service',
    },
    {
      id: '5',
      timestamp: '2024-01-15T10:29:00Z',
      level: 'debug',
      message: 'Processing API request',
      source: 'API Gateway',
    },
  ];

  const timeRanges = [
    { label: 'Last 5 minutes', value: '5m' },
    { label: 'Last 15 minutes', value: '15m' },
    { label: 'Last hour', value: '1h' },
    { label: 'Last 6 hours', value: '6h' },
    { label: 'Last 24 hours', value: '24h' },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(mockMetrics);
      setServices(mockServices);
      setAlerts(mockAlerts);
      setLogs(mockLogs);
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [selectedTimeRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical':
      case 'offline':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return CheckCircle;
      case 'warning':
      case 'degraded':
        return AlertTriangle;
      case 'critical':
      case 'offline':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'info':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'info':
        return 'text-blue-600';
      case 'debug':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true }
        : alert
    ));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            System Monitoring Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time system performance and health monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Auto Refresh
            </label>
          </div>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const StatusIcon = getStatusIcon(metric.status);
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {metric.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <StatusIcon className="h-4 w-4" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}{metric.unit}
                  </span>
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'healthy' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.threshold.critical) * 100, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>Warning: {metric.threshold.warning}{metric.unit}</span>
                  <span>Critical: {metric.threshold.critical}{metric.unit}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Services and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Services Status
            </h3>
            <Server className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {services.map((service) => {
              const StatusIcon = getStatusIcon(service.status);
              return (
                <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className="h-5 w-5" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        v{service.version} • {service.uptime} uptime
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {service.responseTime}ms
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Alerts
            </h3>
            <Bell className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const AlertIcon = getStatusIcon(alert.type);
              return (
                <div key={alert.id} className={`p-4 border rounded-lg ${
                  alert.acknowledged 
                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50' 
                    : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <AlertIcon className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {alert.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {alert.message}
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(alert.type)}`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    {!alert.acknowledged && (
                      <button
                        onClick={() => handleAcknowledgeAlert(alert.id)}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* System Logs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            System Logs
          </h3>
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Real-time
            </span>
          </div>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                log.level === 'error' ? 'bg-red-500' :
                log.level === 'warning' ? 'bg-yellow-500' :
                log.level === 'info' ? 'bg-blue-500' : 'bg-gray-500'
              }`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getLogColor(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {log.source}
                  </span>
                </div>
                <div className="text-sm text-gray-900 dark:text-white mt-1">
                  {log.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              CPU & Memory Usage
            </h3>
            <LineChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">45.2%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45.2%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">67.8%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '67.8%' }}></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Network & Response Time
            </h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Network Latency</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">12.3ms</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12.3%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">245ms</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '24.5%' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemMonitoringDashboard;
