import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Building2,
  DollarSign,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Database,
  Brain,
  Shield,
  RefreshCw,
  Download,
  Eye,
  Settings,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Search,
  MoreVertical,
} from 'lucide-react';

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockSystemData = {
  systemMetrics: {
    totalCompanies: 1247,
    totalUsers: 15689,
    monthlyRevenue: 425000,
    systemUptime: 99.97,
    apiCalls: 1250000,
    databaseQueries: 890000,
    storageUsed: 2.4,
    bandwidth: 15.8,
    mcpAgents: 250,
    responseTime: 45,
    errorRate: 0.03
  },
  recentActivity: [
    {
      id: 1,
      type: 'user_login',
      message: 'DEMO User logged in from New York',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'info'
    },
    {
      id: 2,
      type: 'system_alert',
      message: 'High API usage detected',
      timestamp: '2024-01-15T10:25:00Z',
      severity: 'warning'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment received from DEMO Company A',
      timestamp: '2024-01-15T10:20:00Z',
      severity: 'success'
    },
    {
      id: 4,
      type: 'error',
      message: 'Database connection timeout',
      timestamp: '2024-01-15T10:15:00Z',
      severity: 'error'
    }
  ],
  performanceData: [
    { time: '00:00', cpu: 45, memory: 60, disk: 30 },
    { time: '04:00', cpu: 35, memory: 55, disk: 32 },
    { time: '08:00', cpu: 65, memory: 70, disk: 35 },
    { time: '12:00', cpu: 80, memory: 75, disk: 38 },
    { time: '16:00', cpu: 70, memory: 65, disk: 40 },
    { time: '20:00', cpu: 50, memory: 58, disk: 42 }
  ]
};

const SystemOverview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [systemData, setSystemData] = useState(mockSystemData);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real-time data simulation
  const updateSystemData = useCallback(() => {
    setSystemData(prevData => ({
      ...prevData,
      systemMetrics: {
        ...prevData.systemMetrics,
        totalCompanies: prevData.systemMetrics.totalCompanies + Math.floor(Math.random() * 3),
        totalUsers: prevData.systemMetrics.totalUsers + Math.floor(Math.random() * 10),
        monthlyRevenue: prevData.systemMetrics.monthlyRevenue + Math.floor(Math.random() * 1000),
        systemUptime: Math.min(99.99, prevData.systemMetrics.systemUptime + (Math.random() - 0.5) * 0.01),
        apiCalls: prevData.systemMetrics.apiCalls + Math.floor(Math.random() * 100),
        databaseQueries: prevData.systemMetrics.databaseQueries + Math.floor(Math.random() * 50),
        responseTime: Math.max(10, prevData.systemMetrics.responseTime + (Math.random() - 0.5) * 10),
        errorRate: Math.max(0, prevData.systemMetrics.errorRate + (Math.random() - 0.5) * 0.01)
      },
      recentActivity: [
        {
          id: Date.now(),
          type: ['user_login', 'system_alert', 'payment', 'error'][Math.floor(Math.random() * 4)],
          message: `DEMO Activity ${Math.floor(Math.random() * 1000)}`,
          timestamp: new Date().toISOString(),
          severity: ['info', 'warning', 'success', 'error'][Math.floor(Math.random() * 4)]
        },
        ...prevData.recentActivity.slice(0, 9)
      ]
    }));
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(updateSystemData, 5000); // Update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isRealTimeEnabled, updateSystemData]);

  const handleRefresh = () => {
    setIsLoading(true);
    updateSystemData();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleRealTime = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled);
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(systemData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `system-overview-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Loading system overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">System Overview</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isRealTimeEnabled ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Real-time system metrics and performance monitoring
            {lastUpdated && (
              <span className="ml-2 text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={toggleRealTime}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isRealTimeEnabled
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isRealTimeEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRealTimeEnabled ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => toggleCardExpansion('companies')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(systemData.systemMetrics.totalCompanies)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12.5%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('companies') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Active Companies</span>
                    <span className="font-medium">{formatNumber(systemData.systemMetrics.totalCompanies * 0.85)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">New This Month</span>
                    <span className="font-medium text-green-600">+{formatNumber(156)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Churn Rate</span>
                    <span className="font-medium text-red-600">2.1%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => toggleCardExpansion('users')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(systemData.systemMetrics.totalUsers)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+8.3%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('users') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Active Users</span>
                    <span className="font-medium">{formatNumber(systemData.systemMetrics.totalUsers * 0.78)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">New Signups</span>
                    <span className="font-medium text-green-600">+{formatNumber(1247)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Retention Rate</span>
                    <span className="font-medium text-blue-600">94.2%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => toggleCardExpansion('revenue')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(systemData.systemMetrics.monthlyRevenue)}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+15.2%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('revenue') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">ARPU</span>
                    <span className="font-medium">{formatCurrency(systemData.systemMetrics.monthlyRevenue / systemData.systemMetrics.totalUsers)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">MRR Growth</span>
                    <span className="font-medium text-green-600">+15.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Churn Revenue</span>
                    <span className="font-medium text-red-600">-{formatCurrency(8500)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => toggleCardExpansion('uptime')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatPercentage(systemData.systemMetrics.systemUptime)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">All systems operational</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('uptime') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last Downtime</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg Response Time</span>
                    <span className="font-medium">{systemData.systemMetrics.responseTime}ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Error Rate</span>
                    <span className="font-medium text-green-600">{formatPercentage(systemData.systemMetrics.errorRate)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Performance</h3>
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
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Disk</span>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {systemData.performanceData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
                title={`CPU: ${data.cpu}%, Memory: ${data.memory}%, Disk: ${data.disk}%`}
              >
                <div className="flex flex-col space-y-1">
                  <motion.div
                    className="w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${data.cpu}px` }}
                    whileHover={{ scaleY: 1.1 }}
                  ></motion.div>
                  <motion.div
                    className="w-8 bg-green-500 hover:bg-green-600 transition-colors"
                    style={{ height: `${data.memory}px` }}
                    whileHover={{ scaleY: 1.1 }}
                  ></motion.div>
                  <motion.div
                    className="w-8 bg-yellow-500 rounded-b hover:bg-yellow-600 transition-colors"
                    style={{ height: `${data.disk}px` }}
                    whileHover={{ scaleY: 1.1 }}
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">{data.time}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Real-time performance monitoring</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">System Health</h3>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Server className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">API Server</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Response time: {systemData.systemMetrics.responseTime}ms</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">Healthy</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Database</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Queries: {formatNumber(systemData.systemMetrics.databaseQueries)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">Healthy</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">MCP Agents</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active: {systemData.systemMetrics.mcpAgents}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">Active</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Security</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Error rate: {formatPercentage(systemData.systemMetrics.errorRate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">Secure</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Types</option>
              <option value="user_login">User Login</option>
              <option value="system_alert">System Alert</option>
              <option value="payment">Payment</option>
              <option value="error">Error</option>
            </select>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
        </div>
        <div className="space-y-4">
          {systemData.recentActivity
            .filter(activity => {
              const matchesSearch = activity.message.toLowerCase().includes(searchQuery.toLowerCase());
              const matchesFilter = filterType === 'all' || activity.type === filterType;
              return matchesSearch && matchesFilter;
            })
            .map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group"
            >
              <div className={`p-2 rounded-lg ${getSeverityColor(activity.severity)}`}>
                {getSeverityIcon(activity.severity)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-500">
                  <Clock className="h-4 w-4 inline mr-1" />
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {systemData.recentActivity.filter(activity => {
          const matchesSearch = activity.message.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesFilter = filterType === 'all' || activity.type === filterType;
          return matchesSearch && matchesFilter;
        }).length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No activities found matching your criteria.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SystemOverview;
