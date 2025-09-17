import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  PieChart,
  Eye,
  Download,
  Filter,
  Bell,
  BellOff,
  Play,
  Pause,
  Maximize2,
  Minimize2
} from 'lucide-react';

// Enhanced UI Components
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 ${className}`}>
    {children}
  </div>
);

const GlassButton: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}> = ({ children, className = '', variant = 'primary', size = 'md', onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-600/30',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl',
    ghost: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-700/10'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Mock data for demonstration
const mockSystemData = {
  systemHealth: {
    overall: 'excellent',
    uptime: 99.97,
    responseTime: 45,
    errorRate: 0.03,
    lastIncident: '2024-01-10T14:30:00Z'
  },
  servers: [
    {
      id: 'web-01',
      name: 'Web Server 01',
      status: 'healthy',
      cpu: 45,
      memory: 62,
      disk: 38,
      network: 125,
      uptime: '15d 3h 42m',
      location: 'US-East-1',
      lastCheck: new Date().toISOString()
    },
    {
      id: 'web-02',
      name: 'Web Server 02',
      status: 'healthy',
      cpu: 38,
      memory: 58,
      disk: 42,
      network: 98,
      uptime: '15d 3h 40m',
      location: 'US-East-1',
      lastCheck: new Date().toISOString()
    },
    {
      id: 'db-01',
      name: 'Database Server',
      status: 'warning',
      cpu: 78,
      memory: 85,
      disk: 65,
      network: 45,
      uptime: '15d 3h 35m',
      location: 'US-East-1',
      lastCheck: new Date().toISOString()
    },
    {
      id: 'cache-01',
      name: 'Redis Cache',
      status: 'healthy',
      cpu: 25,
      memory: 35,
      disk: 15,
      network: 200,
      uptime: '15d 3h 38m',
      location: 'US-East-1',
      lastCheck: new Date().toISOString()
    }
  ],
  services: [
    { name: 'API Gateway', status: 'running', uptime: '15d 3h', port: 80, health: 100 },
    { name: 'User Service', status: 'running', uptime: '15d 3h', port: 3001, health: 98 },
    { name: 'Payment Service', status: 'running', uptime: '15d 3h', port: 3002, health: 95 },
    { name: 'Notification Service', status: 'stopped', uptime: '0d 0h', port: 3003, health: 0 },
    { name: 'Analytics Service', status: 'running', uptime: '15d 3h', port: 3004, health: 92 }
  ],
  alerts: [
    {
      id: 1,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Database server CPU usage is above 75%',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'medium',
      resolved: false
    },
    {
      id: 2,
      type: 'error',
      title: 'Service Down',
      message: 'Notification service is not responding',
      timestamp: '2024-01-15T10:25:00Z',
      severity: 'high',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Maintenance Complete',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2024-01-15T09:00:00Z',
      severity: 'low',
      resolved: true
    }
  ],
  performanceHistory: [
    { time: '00:00', cpu: 45, memory: 60, disk: 30, network: 100 },
    { time: '04:00', cpu: 35, memory: 55, disk: 32, network: 80 },
    { time: '08:00', cpu: 65, memory: 70, disk: 35, network: 150 },
    { time: '12:00', cpu: 80, memory: 75, disk: 38, network: 200 },
    { time: '16:00', cpu: 70, memory: 65, disk: 40, network: 180 },
    { time: '20:00', cpu: 50, memory: 58, disk: 42, network: 120 }
  ],
  networkStats: {
    incoming: 45.2,
    outgoing: 32.1,
    connections: 1247,
    latency: 12,
    packetLoss: 0.01
  }
};

const EnhancedSystemMonitoringDashboard: React.FC = () => {
  const [systemData, setSystemData] = useState(mockSystemData);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  // Real-time data simulation
  const updateSystemData = useCallback(() => {
    setSystemData(prevData => ({
      ...prevData,
      servers: prevData.servers.map(server => ({
        ...server,
        cpu: Math.max(0, Math.min(100, server.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, server.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(0, Math.min(100, server.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(0, server.network + (Math.random() - 0.5) * 20),
        lastCheck: new Date().toISOString()
      })),
      networkStats: {
        ...prevData.networkStats,
        incoming: Math.max(0, prevData.networkStats.incoming + (Math.random() - 0.5) * 5),
        outgoing: Math.max(0, prevData.networkStats.outgoing + (Math.random() - 0.5) * 3),
        connections: Math.max(0, prevData.networkStats.connections + Math.floor((Math.random() - 0.5) * 10)),
        latency: Math.max(1, prevData.networkStats.latency + (Math.random() - 0.5) * 5)
      }
    }));
  }, []);

  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(updateSystemData, 3000);
      return () => clearInterval(interval);
    }
  }, [isRealTimeEnabled, updateSystemData]);

  const handleRefresh = () => {
    setIsLoading(true);
    updateSystemData();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'running': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'stopped': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error':
      case 'stopped': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      default: return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatUptime = (uptime: string) => {
    return uptime;
  };

  // Simple performance chart component
  const PerformanceChart: React.FC<{ data: { value: number; timestamp: string }[]; height?: number }> = ({ data, height = 200 }) => (
    <div className="flex items-end justify-between h-48 space-x-1">
      {data.map((point, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(point.cpu / 100) * 100}%` }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          className="flex flex-col items-center space-y-1 group cursor-pointer"
          title={`${point.time}: CPU ${point.cpu}%, Memory ${point.memory}%, Disk ${point.disk}%`}
        >
          <div className="flex flex-col space-y-1">
            <motion.div
              className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-colors"
              style={{ height: `${point.cpu}px` }}
              whileHover={{ scaleY: 1.1 }}
            />
            <motion.div
              className="w-6 bg-gradient-to-t from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 transition-colors"
              style={{ height: `${point.memory}px` }}
              whileHover={{ scaleY: 1.1 }}
            />
            <motion.div
              className="w-6 bg-gradient-to-t from-purple-500 to-purple-400 rounded-b hover:from-purple-600 hover:to-purple-500 transition-colors"
              style={{ height: `${point.disk}px` }}
              whileHover={{ scaleY: 1.1 }}
            />
          </div>
          <span className="text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">{point.time}</span>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              System Monitoring
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isRealTimeEnabled ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Real-time system health monitoring and performance analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-4 py-2 bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <GlassButton 
            variant={alertsEnabled ? 'success' : 'secondary'}
            onClick={() => setAlertsEnabled(!alertsEnabled)}
          >
            {alertsEnabled ? <Bell className="h-4 w-4 mr-2" /> : <BellOff className="h-4 w-4 mr-2" />}
            {alertsEnabled ? 'Alerts On' : 'Alerts Off'}
          </GlassButton>
          <GlassButton 
            variant={isRealTimeEnabled ? 'success' : 'secondary'}
            onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
          >
            {isRealTimeEnabled ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isRealTimeEnabled ? 'Pause' : 'Resume'}
          </GlassButton>
          <GlassButton variant="primary" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </GlassButton>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Health</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                {systemData.systemHealth.overall}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">All systems operational</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uptime</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {systemData.systemHealth.uptime}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+0.02%</span>
            <span className="text-sm text-gray-500 ml-2">this month</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {systemData.systemHealth.responseTime}ms
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-5ms</span>
            <span className="text-sm text-gray-500 ml-2">vs last hour</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Error Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {systemData.systemHealth.errorRate}%
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-0.01%</span>
            <span className="text-sm text-gray-500 ml-2">vs last hour</span>
          </div>
        </GlassCard>
      </div>

      {/* Performance Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Performance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Real-time resource utilization</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">CPU</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Memory</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Disk</span>
              </div>
            </div>
            <GlassButton variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </GlassButton>
          </div>
        </div>
        <div className="h-64">
          <PerformanceChart data={systemData.performanceHistory} />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Real-time performance monitoring</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Server Status */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Server Status</h3>
            <GlassButton variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View All
            </GlassButton>
          </div>
          <div className="space-y-4">
            {systemData.servers.map((server) => (
              <motion.div
                key={server.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors cursor-pointer"
                onClick={() => toggleCardExpansion(server.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(server.status)}`}>
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{server.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{server.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      CPU: {server.cpu.toFixed(1)}%
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      RAM: {server.memory.toFixed(1)}%
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 ${getStatusColor(server.status)}`}>
                    {getStatusIcon(server.status)}
                    <span className="text-sm capitalize">{server.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Service Status */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Service Status</h3>
            <GlassButton variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-1" />
              Manage
            </GlassButton>
          </div>
          <div className="space-y-4">
            {systemData.services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(service.status)}`}>
                    {service.name.includes('Database') ? <Database className="h-5 w-5" /> :
                     service.name.includes('API') ? <Globe className="h-5 w-5" /> :
                     <Activity className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{service.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Port {service.port}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Health: {service.health}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {service.uptime}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                    <span className="text-sm capitalize">{service.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Alerts */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Alerts</h3>
          <div className="flex items-center space-x-2">
            <GlassButton variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </GlassButton>
            <GlassButton variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </GlassButton>
          </div>
        </div>
        <div className="space-y-4">
          {systemData.alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white/50 dark:bg-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-700/70 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {getAlertIcon(alert.type)}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{alert.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{alert.message}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {new Date(alert.timestamp).toLocaleString()}
                  </div>
                  <div className={`text-sm capitalize ${
                    alert.severity === 'high' ? 'text-red-600' :
                    alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                  }`}>
                    {alert.severity} priority
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  alert.resolved 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {alert.resolved ? 'Resolved' : 'Active'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default EnhancedSystemMonitoringDashboard;
