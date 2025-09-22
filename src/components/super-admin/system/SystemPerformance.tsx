import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  MemoryStick,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  RefreshCw,
  Settings,
  Eye,
  Download,
  Filter,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Server,
  Database,
  Globe,
  Users,
} from 'lucide-react';

const SystemPerformance = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const performanceMetrics = [
    {
      name: 'CPU Usage',
      current: 45,
      average: 42,
      peak: 78,
      trend: 'down',
      status: 'good',
      icon: Cpu,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Memory Usage',
      current: 62,
      average: 58,
      peak: 85,
      trend: 'up',
      status: 'good',
      icon: MemoryStick,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Disk I/O',
      current: 35,
      average: 38,
      peak: 65,
      trend: 'down',
      status: 'good',
      icon: HardDrive,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Network I/O',
      current: 28,
      average: 32,
      peak: 55,
      trend: 'down',
      status: 'good',
      icon: Globe,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Response Time',
      current: 120,
      average: 135,
      peak: 250,
      trend: 'down',
      status: 'good',
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Throughput',
      current: 1250,
      average: 1180,
      peak: 1800,
      trend: 'up',
      status: 'good',
      icon: Activity,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  const topProcesses = [
    { name: 'nginx', pid: 1234, cpu: 15.2, memory: 8.5, status: 'running' },
    { name: 'postgresql', pid: 5678, cpu: 12.8, memory: 45.2, status: 'running' },
    { name: 'redis-server', pid: 9012, cpu: 8.4, memory: 12.1, status: 'running' },
    { name: 'node', pid: 3456, cpu: 6.7, memory: 25.8, status: 'running' },
    { name: 'systemd', pid: 1, cpu: 2.1, memory: 1.2, status: 'running' },
  ];

  const performanceAlerts = [
    { metric: 'CPU Usage', message: 'CPU usage exceeded 80%', time: '2 hours ago', severity: 'warning' },
    { metric: 'Memory Usage', message: 'Memory usage approaching limit', time: '4 hours ago', severity: 'info' },
    { metric: 'Disk I/O', message: 'High disk I/O detected', time: '6 hours ago', severity: 'warning' },
    { metric: 'Response Time', message: 'Response time increased significantly', time: '8 hours ago', severity: 'critical' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'running': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
      case 'running': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <X className="w-4 h-4" />;
      case 'info': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  const filteredMetrics = performanceMetrics.filter(metric => 
    selectedMetric === 'all' || metric.name.toLowerCase().includes(selectedMetric.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Performance</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and analyze system performance metrics</p>
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
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Metrics</option>
            <option value="cpu">CPU</option>
            <option value="memory">Memory</option>
            <option value="disk">Disk</option>
            <option value="network">Network</option>
            <option value="response">Response Time</option>
            <option value="throughput">Throughput</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${metric.bgColor} dark:bg-gray-700`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 capitalize">{metric.status}</span>
                  </span>
                </div>
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {metric.name === 'Response Time' ? `${metric.current}ms` : 
                   metric.name === 'Throughput' ? `${metric.current}/s` : `${metric.current}%`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Average</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {metric.name === 'Response Time' ? `${metric.average}ms` : 
                   metric.name === 'Throughput' ? `${metric.average}/s` : `${metric.average}%`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Peak</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {metric.name === 'Response Time' ? `${metric.peak}ms` : 
                   metric.name === 'Throughput' ? `${metric.peak}/s` : `${metric.peak}%`}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    metric.current > 80 ? 'bg-red-500' :
                    metric.current > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(metric.current, 100)}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Processes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Processes</h3>
          <div className="space-y-3">
            {topProcesses.map((process, index) => (
              <div key={process.pid} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{process.name}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">PID: {process.pid}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{process.cpu}% CPU</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{process.memory}% Memory</div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                    {getStatusIcon(process.status)}
                    <span className="ml-1 capitalize">{process.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Alerts</h3>
          <div className="space-y-3">
            {performanceAlerts.map((alert, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.severity)}`}>
                  {getStatusIcon(alert.severity)}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.metric}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Performance trends chart will be displayed here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SystemPerformance;
