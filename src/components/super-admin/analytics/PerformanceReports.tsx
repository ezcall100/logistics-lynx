import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Target,
  BarChart3,
  LineChart,
  PieChart,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Eye,
  Server,
  Database,
  Globe,
  Users,
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Gauge,
  Cpu,
  HardDrive,
  Network,
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  unit: string;
}

interface SystemPerformance {
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  responseTime: number;
  throughput: number;
}

interface ApplicationPerformance {
  endpoint: string;
  method: string;
  avgResponseTime: number;
  successRate: number;
  errorRate: number;
  requestCount: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
}

interface DatabasePerformance {
  query: string;
  avgExecutionTime: number;
  executionCount: number;
  slowQueries: number;
  cacheHitRate: number;
  connectionPool: number;
}

interface UserExperience {
  page: string;
  loadTime: number;
  bounceRate: number;
  conversionRate: number;
  userSatisfaction: number;
  errorRate: number;
}

const PerformanceReports: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [systemPerformance, setSystemPerformance] = useState<SystemPerformance[]>([]);
  const [applicationPerformance, setApplicationPerformance] = useState<ApplicationPerformance[]>([]);
  const [databasePerformance, setDatabasePerformance] = useState<DatabasePerformance[]>([]);
  const [userExperience, setUserExperience] = useState<UserExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('overview');

  // Mock data
    const mockMetrics: PerformanceMetric[] = [
      {
      id: '1',
        name: 'Average Response Time',
        value: 245,
      change: -12.5,
      changeType: 'decrease',
      period: 'vs last month',
      icon: Clock,
      color: 'text-green-600',
        unit: 'ms',
    },
    {
      id: '2',
      name: 'System Uptime',
      value: 99.9,
      change: 0.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: CheckCircle,
      color: 'text-blue-600',
        unit: '%',
    },
    {
      id: '3',
      name: 'Error Rate',
      value: 0.2,
      change: -0.3,
      changeType: 'decrease',
      period: 'vs last month',
      icon: AlertTriangle,
      color: 'text-red-600',
        unit: '%',
    },
    {
      id: '4',
      name: 'Throughput',
      value: 1250,
      change: 18.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: Zap,
      color: 'text-purple-600',
      unit: 'req/s',
    },
    {
      id: '5',
      name: 'CPU Usage',
      value: 45.2,
      change: -5.8,
      changeType: 'decrease',
      period: 'vs last month',
      icon: Cpu,
      color: 'text-orange-600',
        unit: '%',
    },
    {
      id: '6',
      name: 'Memory Usage',
      value: 67.8,
      change: 2.1,
      changeType: 'increase',
      period: 'vs last month',
      icon: HardDrive,
      color: 'text-indigo-600',
        unit: '%',
    },
  ];

  const mockSystemPerformance: SystemPerformance[] = [
    { timestamp: '2024-01-15T00:00:00Z', cpuUsage: 45.2, memoryUsage: 67.8, diskUsage: 34.5, networkLatency: 12.3, responseTime: 245, throughput: 1250 },
    { timestamp: '2024-01-15T01:00:00Z', cpuUsage: 42.1, memoryUsage: 65.4, diskUsage: 34.2, networkLatency: 11.8, responseTime: 238, throughput: 1180 },
    { timestamp: '2024-01-15T02:00:00Z', cpuUsage: 38.7, memoryUsage: 63.2, diskUsage: 33.9, networkLatency: 10.9, responseTime: 225, throughput: 1100 },
    { timestamp: '2024-01-15T03:00:00Z', cpuUsage: 35.4, memoryUsage: 61.8, diskUsage: 33.6, networkLatency: 9.8, responseTime: 215, throughput: 1050 },
    { timestamp: '2024-01-15T04:00:00Z', cpuUsage: 33.2, memoryUsage: 60.5, diskUsage: 33.3, networkLatency: 8.7, responseTime: 205, throughput: 980 },
    { timestamp: '2024-01-15T05:00:00Z', cpuUsage: 31.8, memoryUsage: 59.2, diskUsage: 33.0, networkLatency: 7.9, responseTime: 195, throughput: 920 },
    { timestamp: '2024-01-15T06:00:00Z', cpuUsage: 34.5, memoryUsage: 61.1, diskUsage: 33.2, networkLatency: 8.5, responseTime: 210, throughput: 1020 },
    { timestamp: '2024-01-15T07:00:00Z', cpuUsage: 48.7, memoryUsage: 68.9, diskUsage: 34.8, networkLatency: 13.2, responseTime: 265, throughput: 1350 },
    { timestamp: '2024-01-15T08:00:00Z', cpuUsage: 52.3, memoryUsage: 72.1, diskUsage: 35.5, networkLatency: 15.8, responseTime: 285, throughput: 1450 },
    { timestamp: '2024-01-15T09:00:00Z', cpuUsage: 55.8, memoryUsage: 74.6, diskUsage: 36.2, networkLatency: 18.2, responseTime: 305, throughput: 1520 },
    { timestamp: '2024-01-15T10:00:00Z', cpuUsage: 58.4, memoryUsage: 76.3, diskUsage: 36.8, networkLatency: 20.1, responseTime: 325, throughput: 1580 },
    { timestamp: '2024-01-15T11:00:00Z', cpuUsage: 56.7, memoryUsage: 75.1, diskUsage: 36.5, networkLatency: 19.3, responseTime: 315, throughput: 1550 },
    { timestamp: '2024-01-15T12:00:00Z', cpuUsage: 54.2, memoryUsage: 73.8, diskUsage: 36.1, networkLatency: 17.8, responseTime: 295, throughput: 1480 },
    { timestamp: '2024-01-15T13:00:00Z', cpuUsage: 51.6, memoryUsage: 72.4, diskUsage: 35.7, networkLatency: 16.2, responseTime: 275, throughput: 1420 },
    { timestamp: '2024-01-15T14:00:00Z', cpuUsage: 49.1, memoryUsage: 71.0, diskUsage: 35.3, networkLatency: 14.7, responseTime: 255, throughput: 1380 },
  ];

  const mockApplicationPerformance: ApplicationPerformance[] = [
    { endpoint: '/api/v1/users', method: 'GET', avgResponseTime: 45.2, successRate: 99.8, errorRate: 0.2, requestCount: 12547, p95ResponseTime: 89.5, p99ResponseTime: 156.8 },
    { endpoint: '/api/v1/users', method: 'POST', avgResponseTime: 78.5, successRate: 98.5, errorRate: 1.5, requestCount: 2341, p95ResponseTime: 145.2, p99ResponseTime: 234.7 },
    { endpoint: '/api/v1/orders', method: 'GET', avgResponseTime: 32.1, successRate: 99.2, errorRate: 0.8, requestCount: 8932, p95ResponseTime: 67.8, p99ResponseTime: 123.4 },
    { endpoint: '/api/v1/orders', method: 'POST', avgResponseTime: 95.3, successRate: 97.8, errorRate: 2.2, requestCount: 1567, p95ResponseTime: 178.9, p99ResponseTime: 289.1 },
    { endpoint: '/api/v1/analytics', method: 'GET', avgResponseTime: 156.8, successRate: 95.5, errorRate: 4.5, requestCount: 456, p95ResponseTime: 298.7, p99ResponseTime: 456.2 },
  ];

  const mockDatabasePerformance: DatabasePerformance[] = [
    { query: 'SELECT * FROM users WHERE status = ?', avgExecutionTime: 12.5, executionCount: 12547, slowQueries: 23, cacheHitRate: 94.2, connectionPool: 15 },
    { query: 'INSERT INTO orders (user_id, amount, status) VALUES (?, ?, ?)', avgExecutionTime: 8.7, executionCount: 2341, slowQueries: 5, cacheHitRate: 89.5, connectionPool: 12 },
    { query: 'UPDATE users SET last_login = ? WHERE id = ?', avgExecutionTime: 6.3, executionCount: 8932, slowQueries: 8, cacheHitRate: 96.8, connectionPool: 18 },
    { query: 'SELECT COUNT(*) FROM transactions WHERE date > ?', avgExecutionTime: 45.2, executionCount: 456, slowQueries: 12, cacheHitRate: 78.9, connectionPool: 8 },
    { query: 'DELETE FROM sessions WHERE expires_at < ?', avgExecutionTime: 15.8, executionCount: 1234, slowQueries: 3, cacheHitRate: 92.1, connectionPool: 10 },
  ];

  const mockUserExperience: UserExperience[] = [
    { page: '/dashboard', loadTime: 1.2, bounceRate: 15.2, conversionRate: 8.7, userSatisfaction: 4.5, errorRate: 0.8 },
    { page: '/orders', loadTime: 2.1, bounceRate: 22.5, conversionRate: 12.3, userSatisfaction: 4.2, errorRate: 1.2 },
    { page: '/analytics', loadTime: 3.5, bounceRate: 35.8, conversionRate: 5.4, userSatisfaction: 3.8, errorRate: 2.1 },
    { page: '/settings', loadTime: 1.8, bounceRate: 18.7, conversionRate: 15.6, userSatisfaction: 4.3, errorRate: 0.9 },
    { page: '/profile', loadTime: 1.5, bounceRate: 12.3, conversionRate: 18.9, userSatisfaction: 4.6, errorRate: 0.5 },
  ];

  const periods = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last year', value: '1y' },
  ];

  const categories = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'system', name: 'System Performance', icon: Server },
    { id: 'application', name: 'Application Performance', icon: Globe },
    { id: 'database', name: 'Database Performance', icon: Database },
    { id: 'user-experience', name: 'User Experience', icon: Users },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(mockMetrics);
      setSystemPerformance(mockSystemPerformance);
      setApplicationPerformance(mockApplicationPerformance);
      setDatabasePerformance(mockDatabasePerformance);
      setUserExperience(mockUserExperience);
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? ArrowUpRight : ArrowDownRight;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  const getPerformanceColor = (value: number, type: string) => {
    switch (type) {
      case 'responseTime':
        return value < 200 ? 'text-green-600' : value < 500 ? 'text-yellow-600' : 'text-red-600';
      case 'successRate':
        return value > 99 ? 'text-green-600' : value > 95 ? 'text-yellow-600' : 'text-red-600';
      case 'errorRate':
        return value < 1 ? 'text-green-600' : value < 5 ? 'text-yellow-600' : 'text-red-600';
      case 'cpuUsage':
        return value < 50 ? 'text-green-600' : value < 80 ? 'text-yellow-600' : 'text-red-600';
      case 'memoryUsage':
        return value < 70 ? 'text-green-600' : value < 90 ? 'text-yellow-600' : 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Performance Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            System and application performance monitoring and analysis
          </p>
          </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <select
              value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
            </select>
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const ChangeIcon = getChangeIcon(metric.changeType);
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {metric.value}{metric.unit}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{metric.name}</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Icon className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <ChangeIcon className={`h-4 w-4 ${getChangeColor(metric.changeType)}`} />
                <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{metric.period}</span>
              </div>
            </motion.div>
          );
        })}
        </div>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <button
                  key={category.id}
                  onClick={() = aria-label="Button"> setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{category.name}</span>
              </button>
              );
            })}
          </nav>
          </div>

          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Overview Tab */}
          {selectedCategory === 'overview' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      System Performance Trend
                    </h3>
                    <LineChart className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                      <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {systemPerformance.slice(-7).map((perf, index) => (
                      <div key={perf.timestamp} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="w-2 h-2 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(perf.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {perf.responseTime}ms
                              </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                              {perf.cpuUsage}% CPU
                              </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      Application Performance
                    </h3>
                    <BarChart3 className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                      <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {applicationPerformance.slice(0, 5).map((app, index) => (
                      <div key={`${app.endpoint}-${app.method}`} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-green-500' :
                            index === 1 ? 'bg-blue-500' :
                            index === 2 ? 'bg-purple-500' :
                            index === 3 ? 'bg-orange-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {app.method} {app.endpoint}
                              </span>
                            </div>
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div
                              className={`h-2 rounded-full ${
                                index === 0 ? 'bg-green-500' :
                                index === 1 ? 'bg-blue-500' :
                                index === 2 ? 'bg-purple-500' :
                                index === 3 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${(app.avgResponseTime / 200) * 100}%` }}
                            ></div>
                              </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right responsive-container sm:flex-col md:flex-row lg:grid">
                            {app.avgResponseTime}ms
                          </span>
                            </div>
                          </div>
                        ))}
                      </div>
                </motion.div>
                    </div>
                  </div>
          )}

          {/* System Performance Tab */}
          {selectedCategory === 'system' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
                <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                  <thead className="bg-gray-50 dark:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        CPU Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Memory Usage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Response Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Throughput
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    {systemPerformance.slice(-10).map((perf) => (
                      <motion.tr
                        key={perf.timestamp}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {new Date(perf.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <span className={`text-sm font-medium ${getPerformanceColor(perf.cpuUsage, 'cpuUsage')}`}>
                              {perf.cpuUsage}%
                              </span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                              <div
                                className="bg-blue-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                                style={{ width: `${perf.cpuUsage}%` }}
                              ></div>
                              </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <span className={`text-sm font-medium ${getPerformanceColor(perf.memoryUsage, 'memoryUsage')}`}>
                              {perf.memoryUsage}%
                            </span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                              <div
                                className="bg-green-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                                style={{ width: `${perf.memoryUsage}%` }}
                              ></div>
                      </div>
                    </div>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${getPerformanceColor(perf.responseTime, 'responseTime')}`}>
                            {perf.responseTime}ms
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {formatNumber(perf.throughput)} req/s
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                    </div>
                  </div>
          )}

          {/* Application Performance Tab */}
          {selectedCategory === 'application' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
                <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                  <thead className="bg-gray-50 dark:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Endpoint
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Method
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Avg Response Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Success Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Error Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Requests
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    {applicationPerformance.map((app) => (
                      <motion.tr
                        key={`${app.endpoint}-${app.method}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {app.endpoint}
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            app.method === 'GET' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            app.method === 'POST' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            app.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            app.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {app.method}
                          </span>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${getPerformanceColor(app.avgResponseTime, 'responseTime')}`}>
                            {app.avgResponseTime}ms
                                </span>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${getPerformanceColor(app.successRate, 'successRate')}`}>
                            {app.successRate}%
                                </span>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${getPerformanceColor(app.errorRate, 'errorRate')}`}>
                            {app.errorRate}%
                                </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {formatNumber(app.requestCount)}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                              </div>
                            </div>
          )}

          {/* Database Performance Tab */}
          {selectedCategory === 'database' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
                <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                  <thead className="bg-gray-50 dark:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Query
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Avg Execution Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Execution Count
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Slow Queries
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Cache Hit Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    {databasePerformance.map((db) => (
                      <motion.tr
                        key={db.query}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="text-sm font-mono text-gray-900 dark:text-white max-w-xs truncate responsive-container sm:flex-col md:flex-row lg:grid">
                            {db.query}
                          </div>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${getPerformanceColor(db.avgExecutionTime, 'responseTime')}`}>
                            {db.avgExecutionTime}ms
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {formatNumber(db.executionCount)}
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${db.slowQueries > 10 ? 'text-red-600' : db.slowQueries > 5 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {db.slowQueries}
                          </span>
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`text-sm font-medium ${getPerformanceColor(db.cacheHitRate, 'successRate')}`}>
                            {db.cacheHitRate}%
                            </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                          </div>
                        </div>
          )}

          {/* User Experience Tab */}
          {selectedCategory === 'user-experience' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                {userExperience.map((ux, index) => (
                <motion.div
                    key={ux.page}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                          <Globe className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </div>
                            <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {ux.page}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                            User Experience
                          </p>
                              </div>
                            </div>
                          </div>
                    
                    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Load Time</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(ux.loadTime * 1000, 'responseTime')}`}>
                          {ux.loadTime}s
                        </span>
                              </div>
                      
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Bounce Rate</span>
                        <span className={`text-sm font-medium ${ux.bounceRate > 30 ? 'text-red-600' : ux.bounceRate > 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {ux.bounceRate}%
                        </span>
                              </div>
                      
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Conversion Rate</span>
                        <span className="text-sm font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">
                          {ux.conversionRate}%
                        </span>
                            </div>
                      
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Satisfaction</span>
                        <span className="text-sm font-medium text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">
                          {ux.userSatisfaction}/5
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
