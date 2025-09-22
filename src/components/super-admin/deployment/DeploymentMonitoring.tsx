import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  Settings,
  Eye,
  Download,
  Filter,
  Search,
  BarChart3,
  Zap,
  Shield,
  Users,
  Calendar,
  MapPin,
  Timer,
  Target,
  Gauge
} from 'lucide-react';

interface DeploymentMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
}

interface DeploymentAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  environment: string;
  service: string;
  resolved: boolean;
}

interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  environment: string;
  message: string;
  details: Record<string, any>;
}

const DeploymentMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Deployment Metrics State
  const [metrics, setMetrics] = useState<DeploymentMetric[]>([
    {
      id: '1',
      name: 'Deployment Success Rate',
      value: 98.5,
      unit: '%',
      change: 2.1,
      status: 'healthy',
      trend: 'up',
      lastUpdate: '2025-09-21 08:47:00'
    },
    {
      id: '2',
      name: 'Average Deployment Time',
      value: 8.5,
      unit: 'min',
      change: -1.2,
      status: 'healthy',
      trend: 'up',
      lastUpdate: '2025-09-21 08:47:00'
    },
    {
      id: '3',
      name: 'Failed Deployments',
      value: 2,
      unit: '',
      change: -50,
      status: 'healthy',
      trend: 'up',
      lastUpdate: '2025-09-21 08:47:00'
    },
    {
      id: '4',
      name: 'Rollback Rate',
      value: 1.2,
      unit: '%',
      change: -0.3,
      status: 'healthy',
      trend: 'up',
      lastUpdate: '2025-09-21 08:47:00'
    },
    {
      id: '5',
      name: 'Environment Uptime',
      value: 99.9,
      unit: '%',
      change: 0.1,
      status: 'healthy',
      trend: 'up',
      lastUpdate: '2025-09-21 08:47:00'
    },
    {
      id: '6',
      name: 'Service Health Score',
      value: 95.8,
      unit: '%',
      change: 1.5,
      status: 'healthy',
      trend: 'up',
      lastUpdate: '2025-09-21 08:47:00'
    }
  ]);

  // Deployment Alerts State
  const [alerts, setAlerts] = useState<DeploymentAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Memory Usage',
      message: 'Memory usage has exceeded 85% in production environment',
      timestamp: '2025-09-21 08:45:00',
      severity: 'medium',
      environment: 'production',
      service: 'API Gateway',
      resolved: false
    },
    {
      id: '2',
      type: 'error',
      title: 'Deployment Failed',
      message: 'Deployment to staging environment failed due to database connection timeout',
      timestamp: '2025-09-21 08:30:00',
      severity: 'high',
      environment: 'staging',
      service: 'Database',
      resolved: true
    },
    {
      id: '3',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Planned maintenance window scheduled for tonight at 2:00 AM UTC',
      timestamp: '2025-09-21 08:00:00',
      severity: 'low',
      environment: 'production',
      service: 'All Services',
      resolved: false
    },
    {
      id: '4',
      type: 'success',
      title: 'Deployment Completed',
      message: 'Successfully deployed v2.1.0 to production environment',
      timestamp: '2025-09-21 08:25:00',
      severity: 'low',
      environment: 'production',
      service: 'All Services',
      resolved: true
    }
  ]);

  // Deployment Logs State
  const [logs, setLogs] = useState<DeploymentLog[]>([
    {
      id: '1',
      timestamp: '2025-09-21 08:47:22',
      level: 'INFO',
      service: 'Deployment Service',
      environment: 'production',
      message: 'Health check passed for all services',
      details: { services: 12, healthy: 12, unhealthy: 0 }
    },
    {
      id: '2',
      timestamp: '2025-09-21 08:46:15',
      level: 'WARN',
      service: 'Load Balancer',
      environment: 'production',
      message: 'High traffic detected on API endpoints',
      details: { requests_per_second: 1250, threshold: 1000 }
    },
    {
      id: '3',
      timestamp: '2025-09-21 08:45:30',
      level: 'ERROR',
      service: 'Database',
      environment: 'staging',
      message: 'Connection pool exhausted',
      details: { active_connections: 100, max_connections: 100 }
    },
    {
      id: '4',
      timestamp: '2025-09-21 08:44:45',
      level: 'INFO',
      service: 'Cache Service',
      environment: 'production',
      message: 'Cache hit rate improved to 94.2%',
      details: { hit_rate: 94.2, miss_rate: 5.8 }
    }
  ]);

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate real-time metric updates
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 0.1,
        lastUpdate: new Date().toISOString().slice(0, 19).replace('T', ' ')
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'WARN': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'INFO': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'DEBUG': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Deployment Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time deployment monitoring and metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Gauge className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value.toFixed(1)}{metric.unit}
                  </p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{Math.abs(metric.change)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{metric.lastUpdate}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Alerts</h3>
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Bell className="w-4 h-4" />
            <span>View All</span>
          </button>
        </div>
        <div className="space-y-3">
          {alerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`p-1 rounded-lg ${getAlertColor(alert.type)}`}>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{alert.title}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    alert.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{alert.message}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{alert.environment}</span>
                  <span>{alert.service}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Deployment Alerts</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor deployment alerts and notifications</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Bell className="w-4 h-4" />
            <span>Configure Alerts</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getAlertColor(alert.type)}`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      alert.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      alert.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.resolved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {alert.resolved ? 'Resolved' : 'Active'}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Server className="w-4 h-4" />
                      <span>{alert.environment}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Settings className="w-4 h-4" />
                      <span>{alert.service}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderLogsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Deployment Logs</h2>
          <p className="text-gray-600 dark:text-gray-400">View and monitor deployment log entries</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Environment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLogColor(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {log.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.environment}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {log.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deployment Monitoring</h1>
                <p className="text-gray-600 dark:text-gray-400">Monitor deployment performance, alerts, and logs in real-time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex space-x-2 mb-6">
            <TabButton id="overview" label="Overview" icon={BarChart3} isActive={activeTab === 'overview'} />
            <TabButton id="alerts" label="Alerts" icon={Bell} isActive={activeTab === 'alerts'} />
            <TabButton id="logs" label="Logs" icon={Monitor} isActive={activeTab === 'logs'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'alerts' && renderAlertsTab()}
          {activeTab === 'logs' && renderLogsTab()}
        </div>
      </div>
    </div>
  );
};

export default DeploymentMonitoring;
