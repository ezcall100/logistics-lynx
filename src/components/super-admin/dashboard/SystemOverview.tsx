import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load heavy components
const LazySystemMetrics = lazy(() => import('./SystemMetrics'));
const LazyActivityFeed = lazy(() => import('./ActivityFeed'));
const LazyPerformanceChart = lazy(() => import('./PerformanceChart'));
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

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8 responsive-container sm:flex-col md:flex-row lg:grid">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 responsive-container sm:flex-col md:flex-row lg:grid"></div>
  </div>
);

// Error boundary for System Overview
class SystemOverviewErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('System Overview Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
        <div className="p-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-red-600 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">System Overview Error</h3>
          <button 
            onClick={() = aria-label="Button"> this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const SystemOverview: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [systemData, setSystemData] = useState(mockSystemData);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);

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
      case 'error': return <AlertTriangle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'success': return <CheckCircle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default: return <Activity className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span className="text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Loading system overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">System Overview</h1>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                {isRealTimeEnabled ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
            Real-time system metrics and performance monitoring
            {lastUpdated && (
              <span className="ml-2 text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid"
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
           aria-label="Button">
            {isRealTimeEnabled ? <Pause className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Play className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <span>{isRealTimeEnabled ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setIsFullscreen(!isFullscreen)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Maximize2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
          </button>
        </div>
      </div>

      {/* Enhanced Key Metrics Grid with Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={() => toggleCardExpansion('companies')}
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatNumber(systemData.systemMetrics.totalCompanies)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Building2 className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">+12.5%</span>
              <span className="text-sm text-gray-500 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">from last month</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('companies') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Companies</span>
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{formatNumber(systemData.systemMetrics.totalCompanies * 0.85)}</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">New This Month</span>
                    <span className="font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">+{formatNumber(156)}</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Churn Rate</span>
                    <span className="font-medium text-red-600 responsive-container sm:flex-col md:flex-row lg:grid">2.1%</span>
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
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={() => toggleCardExpansion('users')}
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatNumber(systemData.systemMetrics.totalUsers)}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Users className="h-6 w-6 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">+8.3%</span>
              <span className="text-sm text-gray-500 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">from last month</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('users') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Users</span>
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{formatNumber(systemData.systemMetrics.totalUsers * 0.78)}</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">New Signups</span>
                    <span className="font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">+{formatNumber(1247)}</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Retention Rate</span>
                    <span className="font-medium text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">94.2%</span>
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
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={() => toggleCardExpansion('revenue')}
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatCurrency(systemData.systemMetrics.monthlyRevenue)}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <DollarSign className="h-6 w-6 text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">+15.2%</span>
              <span className="text-sm text-gray-500 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">from last month</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('revenue') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">ARPU</span>
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{formatCurrency(systemData.systemMetrics.monthlyRevenue / systemData.systemMetrics.totalUsers)}</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">MRR Growth</span>
                    <span className="font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">+15.2%</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Churn Revenue</span>
                    <span className="font-medium text-red-600 responsive-container sm:flex-col md:flex-row lg:grid">-{formatCurrency(8500)}</span>
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
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={() => toggleCardExpansion('uptime')}
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatPercentage(systemData.systemMetrics.systemUptime)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Activity className="h-6 w-6 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">All systems operational</span>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
          <AnimatePresence>
            {expandedCards.includes('uptime') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Downtime</span>
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">2 days ago</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Avg Response Time</span>
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{systemData.systemMetrics.responseTime}ms</span>
                  </div>
                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Error Rate</span>
                    <span className="font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">{formatPercentage(systemData.systemMetrics.errorRate)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">System Performance</h3>
            <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-3 h-3 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU</span>
                </div>
                <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-3 h-3 bg-green-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory</span>
                </div>
                <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Disk</span>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Settings className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {systemData.performanceData.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center space-y-2 group cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
                title={`CPU: ${data.cpu}%, Memory: ${data.memory}%, Disk: ${data.disk}%`}
              >
                <div className="flex flex-col space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <motion.div
                    className="w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{ height: `${data.cpu}px` }}
                    whileHover={{ scaleY: 1.1 }}
                  ></motion.div>
                  <motion.div
                    className="w-8 bg-green-500 hover:bg-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{ height: `${data.memory}px` }}
                    whileHover={{ scaleY: 1.1 }}
                  ></motion.div>
                  <motion.div
                    className="w-8 bg-yellow-500 rounded-b hover:bg-yellow-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{ height: `${data.disk}px` }}
                    whileHover={{ scaleY: 1.1 }}
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{data.time}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
            <span>Real-time performance monitoring</span>
            <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span>Live</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">System Health</h3>
            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <RefreshCw className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Server className="h-5 w-5 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">API Server</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Response time: {systemData.systemMetrics.responseTime}ms</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <CheckCircle className="h-5 w-5 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">Healthy</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Database className="h-5 w-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Database</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Queries: {formatNumber(systemData.systemMetrics.databaseQueries)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <CheckCircle className="h-5 w-5 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">Healthy</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Brain className="h-5 w-5 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">MCP Agents</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active: {systemData.systemMetrics.mcpAgents}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <CheckCircle className="h-5 w-5 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">Active</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Shield className="h-5 w-5 text-red-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Security</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Error rate: {formatPercentage(systemData.systemMetrics.errorRate)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <CheckCircle className="h-5 w-5 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">Secure</span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
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
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Recent Activity</h3>
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="all">All Types</option>
              <option value="user_login">User Login</option>
              <option value="system_alert">System Alert</option>
              <option value="payment">Payment</option>
              <option value="error">Error</option>
            </select>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">View All</button>
          </div>
        </div>
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
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
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className={`p-2 rounded-lg ${getSeverityColor(activity.severity)}`}>
                {getSeverityIcon(activity.severity)}
              </div>
              <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Clock className="h-4 w-4 inline mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
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
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
            No activities found matching your criteria.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SystemOverview;
