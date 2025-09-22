import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
  Eye,
  Bell,
  Download,
  Filter,
  Search,
  BarChart3,
  Monitor
} from 'lucide-react';

const SystemMonitoring: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // System Metrics State
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: { usage: 45, temperature: 62, cores: 8, load: [0.8, 1.2, 1.5] },
    memory: { usage: 68, total: 32, used: 21.8, available: 10.2 },
    disk: { usage: 42, total: 1000, used: 420, available: 580 },
    network: { incoming: 125.6, outgoing: 89.3, latency: 12, uptime: '99.9%' },
    database: { connections: 45, queries: 1250, responseTime: 15, size: 2.4 },
    applications: { total: 12, running: 11, stopped: 1, errors: 0 }
  });

  // Sample alerts data
  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage has exceeded 80% for the last 5 minutes',
      timestamp: '2024-01-15 15:30',
      status: 'active',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'error',
      title: 'Database Connection Failed',
      message: 'Failed to connect to primary database server',
      timestamp: '2024-01-15 15:25',
      status: 'resolved',
      severity: 'high'
    },
    {
      id: 3,
      type: 'info',
      title: 'SSL Certificate Expiring',
      message: 'SSL certificate for api.transbotai.com expires in 30 days',
      timestamp: '2024-01-15 15:20',
      status: 'pending',
      severity: 'low'
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      timestamp: '2024-01-15 15:15',
      status: 'completed',
      severity: 'low'
    }
  ]);

  // Sample log entries
  const [logs] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 15:35:22',
      level: 'INFO',
      source: 'API Server',
      message: 'User authentication successful for john.doe@company.com',
      details: { userId: 12345, ip: '192.168.1.100' }
    },
    {
      id: 2,
      timestamp: '2024-01-15 15:35:18',
      level: 'WARN',
      source: 'Database',
      message: 'Slow query detected: SELECT * FROM users WHERE...',
      details: { queryTime: '2.5s', queryId: 'q_789' }
    },
    {
      id: 3,
      timestamp: '2024-01-15 15:35:15',
      level: 'ERROR',
      source: 'Email Service',
      message: 'Failed to send email notification',
      details: { recipient: 'user@example.com', error: 'SMTP timeout' }
    },
    {
      id: 4,
      timestamp: '2024-01-15 15:35:10',
      level: 'INFO',
      source: 'Cache Service',
      message: 'Cache miss for key: user_preferences_12345',
      details: { key: 'user_preferences_12345', ttl: 3600 }
    }
  ]);

  // Performance data for charts
  const [performanceData] = useState({
    cpuHistory: [
      { time: '14:00', value: 45 },
      { time: '14:15', value: 52 },
      { time: '14:30', value: 48 },
      { time: '14:45', value: 61 },
      { time: '15:00', value: 67 },
      { time: '15:15', value: 58 },
      { time: '15:30', value: 73 }
    ],
    memoryHistory: [
      { time: '14:00', value: 65 },
      { time: '14:15', value: 68 },
      { time: '14:30', value: 71 },
      { time: '14:45', value: 69 },
      { time: '15:00', value: 74 },
      { time: '15:15', value: 72 },
      { time: '15:30', value: 76 }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate real-time updates
      setSystemMetrics(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          usage: Math.floor(Math.random() * 30) + 40,
          temperature: Math.floor(Math.random() * 10) + 60
        },
        memory: {
          ...prev.memory,
          usage: Math.floor(Math.random() * 10) + 65
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'info': return <Clock className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'WARN': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'INFO': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
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

  const MetricCard = ({ title, icon: Icon, value, unit, change, color }: { title: string; icon: React.ComponentType<{ className?: string }>; value: string; unit: string; change: string; color: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}{unit}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          change > 0 ? 'text-red-600' : 'text-green-600'
        }`}>
          {change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
    </motion.div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time system performance metrics</p>
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
        <MetricCard
          title="CPU Usage"
          icon={Cpu}
          value={systemMetrics.cpu.usage}
          unit="%"
          change={2.3}
          color="bg-blue-500"
        />
        <MetricCard
          title="Memory Usage"
          icon={Database}
          value={systemMetrics.memory.usage}
          unit="%"
          change={-1.2}
          color="bg-green-500"
        />
        <MetricCard
          title="Disk Usage"
          icon={HardDrive}
          value={systemMetrics.disk.usage}
          unit="%"
          change={0.8}
          color="bg-purple-500"
        />
        <MetricCard
          title="Network In"
          icon={Wifi}
          value={systemMetrics.network.incoming}
          unit=" Mbps"
          change={5.1}
          color="bg-orange-500"
        />
        <MetricCard
          title="Database Connections"
          icon={Server}
          value={systemMetrics.database.connections}
          unit=""
          change={-2.1}
          color="bg-red-500"
        />
        <MetricCard
          title="System Uptime"
          icon={Activity}
          value={systemMetrics.network.uptime}
          unit=""
          change={0}
          color="bg-indigo-500"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CPU Usage Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {performanceData.cpuHistory.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(point.value / 100) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{point.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Memory Usage Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {performanceData.memoryHistory.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t"
                  style={{ height: `${(point.value / 100) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{point.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Alerts</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor system alerts and notifications</p>
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
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp}</span>
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.status === 'active' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      alert.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {alert.status}
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
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Logs</h2>
          <p className="text-gray-600 dark:text-gray-400">View and monitor system log entries</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
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
                    {log.source}
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
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Monitoring</h1>
                <p className="text-gray-600 dark:text-gray-400">Monitor system performance, alerts, and logs in real-time</p>
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

export default SystemMonitoring;
