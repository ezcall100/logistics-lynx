import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
  Eye,
  BarChart3,
  Network,
  X,
} from 'lucide-react';

interface PortStatus {
  port: number;
  component: string;
  status: 'running' | 'stopped' | 'error' | 'warning';
  uptime: string;
  responseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  lastHealthCheck: string;
  errorCount: number;
  requestCount: number;
}

interface SystemMetrics {
  totalUptime: string;
  averageResponseTime: number;
  totalRequests: number;
  errorRate: number;
  systemLoad: number;
  memoryUsage: number;
  diskUsage: number;
  networkThroughput: number;
}

const SystemMonitoringDashboard: React.FC = () => {
  const [portStatuses, setPortStatuses] = useState<PortStatus[]>([
    {
      port: 3000,
      component: 'Main Website',
      status: 'running',
      uptime: '99.97%',
      responseTime: 45,
      cpuUsage: 23,
      memoryUsage: 67,
      diskUsage: 34,
      networkLatency: 12,
      lastHealthCheck: '2025-01-17T10:30:00.000Z',
      errorCount: 0,
      requestCount: 1247,
    },
    {
      port: 3001,
      component: 'MCP API Server',
      status: 'running',
      uptime: '99.98%',
      responseTime: 23,
      cpuUsage: 45,
      memoryUsage: 78,
      diskUsage: 28,
      networkLatency: 8,
      lastHealthCheck: '2025-01-17T10:30:00.000Z',
      errorCount: 0,
      requestCount: 8934,
    },
    {
      port: 3002,
      component: 'MCP Dashboard',
      status: 'running',
      uptime: '99.95%',
      responseTime: 67,
      cpuUsage: 34,
      memoryUsage: 56,
      diskUsage: 42,
      networkLatency: 15,
      lastHealthCheck: '2025-01-17T10:30:00.000Z',
      errorCount: 0,
      requestCount: 2156,
    },
    {
      port: 3005,
      component: 'Super Admin Portal',
      status: 'running',
      uptime: '99.99%',
      responseTime: 34,
      cpuUsage: 28,
      memoryUsage: 45,
      diskUsage: 38,
      networkLatency: 9,
      lastHealthCheck: '2025-01-17T10:30:00.000Z',
      errorCount: 0,
      requestCount: 3456,
    },
    {
      port: 3006,
      component: 'Portal App Login',
      status: 'running',
      uptime: '99.96%',
      responseTime: 28,
      cpuUsage: 19,
      memoryUsage: 34,
      diskUsage: 25,
      networkLatency: 6,
      lastHealthCheck: '2025-01-17T10:30:00.000Z',
      errorCount: 0,
      requestCount: 1876,
    },
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalUptime: '99.97%',
    averageResponseTime: 39.4,
    totalRequests: 17669,
    errorRate: 0.01,
    systemLoad: 29.8,
    memoryUsage: 56.0,
    diskUsage: 33.4,
    networkThroughput: 125.6,
  });

  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedPort, setSelectedPort] = useState<PortStatus | null>(null);

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setPortStatuses(prev =>
          prev.map(port => ({
            ...port,
            responseTime: Math.max(10, port.responseTime + (Math.random() - 0.5) * 10),
            cpuUsage: Math.max(0, Math.min(100, port.cpuUsage + (Math.random() - 0.5) * 5)),
            memoryUsage: Math.max(0, Math.min(100, port.memoryUsage + (Math.random() - 0.5) * 3)),
            networkLatency: Math.max(1, port.networkLatency + (Math.random() - 0.5) * 5),
            requestCount: port.requestCount + Math.floor(Math.random() * 10),
            lastHealthCheck: new Date().toISOString(),
          }))
        );

        setSystemMetrics(prev => ({
          ...prev,
          averageResponseTime: Math.max(10, prev.averageResponseTime + (Math.random() - 0.5) * 5),
          totalRequests: prev.totalRequests + Math.floor(Math.random() * 50),
          systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 2)),
          memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 1)),
          networkThroughput: Math.max(0, prev.networkThroughput + (Math.random() - 0.5) * 5),
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isAutoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'stopped':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      case 'stopped':
        return <Clock className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'text-red-600';
    if (usage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Real-time monitoring of all system ports and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">All Systems Operational</span>
          </div>
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${isAutoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
          >
            <RefreshCw className={`w-4 h-4 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            <span>{isAutoRefresh ? 'Live Monitoring' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Uptime</p>
              <p className="text-3xl font-bold text-green-600">{systemMetrics.totalUptime}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Server className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-3xl font-bold text-blue-600">
                {systemMetrics.averageResponseTime.toFixed(1)}ms
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-3xl font-bold text-purple-600">
                {systemMetrics.totalRequests.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Error Rate</p>
              <p className="text-3xl font-bold text-red-600">
                {systemMetrics.errorRate.toFixed(2)}%
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Port Status Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Port Status & Performance</h2>
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">Real-time monitoring</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portStatuses.map((port, index) => (
            <motion.div
              key={port.port}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-xl p-6 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(port.status)}`}
              onClick={() => setSelectedPort(port)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(port.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">Port {port.port}</h3>
                    <p className="text-sm text-gray-600">{port.component}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{port.uptime}</p>
                  <p className="text-xs text-gray-500">uptime</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-sm font-medium">{port.responseTime}ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className={`text-sm font-medium ${getUsageColor(port.cpuUsage)}`}>
                    {port.cpuUsage}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Memory</span>
                  <span className={`text-sm font-medium ${getUsageColor(port.memoryUsage)}`}>
                    {port.memoryUsage}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Requests</span>
                  <span className="text-sm font-medium">{port.requestCount.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* System Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Load</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">CPU Load</span>
              <span className={`text-sm font-medium ${getUsageColor(systemMetrics.systemLoad)}`}>
                {systemMetrics.systemLoad.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${systemMetrics.systemLoad >= 70 ? 'bg-red-500' : systemMetrics.systemLoad >= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${systemMetrics.systemLoad}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Memory Usage</span>
              <span className={`text-sm font-medium ${getUsageColor(systemMetrics.memoryUsage)}`}>
                {systemMetrics.memoryUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${systemMetrics.memoryUsage >= 80 ? 'bg-red-500' : systemMetrics.memoryUsage >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${systemMetrics.memoryUsage}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Disk Usage</span>
              <span className={`text-sm font-medium ${getUsageColor(systemMetrics.diskUsage)}`}>
                {systemMetrics.diskUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${systemMetrics.diskUsage >= 85 ? 'bg-red-500' : systemMetrics.diskUsage >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${systemMetrics.diskUsage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Throughput</span>
              <span className="text-sm font-medium text-green-600">
                {systemMetrics.networkThroughput.toFixed(1)} Mbps
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Latency</span>
              <span className="text-sm font-medium text-blue-600">
                {portStatuses.reduce((acc, port) => acc + port.networkLatency, 0) /
                  portStatuses.length}
                ms
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Connections</span>
              <span className="text-sm font-medium text-purple-600">
                {portStatuses.reduce((acc, port) => acc + port.requestCount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm font-medium text-red-600">
                {systemMetrics.errorRate.toFixed(3)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Port Detail Modal */}
      {selectedPort && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedPort(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Port {selectedPort.port} Details
              </h3>
              <button
                onClick={() => setSelectedPort(null)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Component Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Component:</span>
                    <p className="font-medium">{selectedPort.component}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium capitalize">{selectedPort.status}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Uptime:</span>
                    <p className="font-medium">{selectedPort.uptime}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Health Check:</span>
                    <p className="font-medium">
                      {new Date(selectedPort.lastHealthCheck).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Response Time:</span>
                    <p className="font-medium">{selectedPort.responseTime}ms</p>
                  </div>
                  <div>
                    <span className="text-gray-600">CPU Usage:</span>
                    <p className="font-medium">{selectedPort.cpuUsage}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Memory Usage:</span>
                    <p className="font-medium">{selectedPort.memoryUsage}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Disk Usage:</span>
                    <p className="font-medium">{selectedPort.diskUsage}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Network Latency:</span>
                    <p className="font-medium">{selectedPort.networkLatency}ms</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Request Count:</span>
                    <p className="font-medium">{selectedPort.requestCount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SystemMonitoringDashboard;
