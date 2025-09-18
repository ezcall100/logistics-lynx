import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Users,
  DollarSign,
  CheckCircle,
  Server,
  Database,
  Zap,
  RefreshCw,
  Download,
  Settings,
  Search,
  Plus,
  Trash2,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';

interface SystemMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
  trend: number[];
  lastUpdated: string;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  resolved: boolean;
}

interface SystemStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'degraded';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  health: 'excellent' | 'good' | 'fair' | 'poor';
}

const EnhancedSystemOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<Alert>>({
    type: 'info',
    title: '',
    message: '',
    severity: 'medium',
    source: 'Manual',
  });

  // Mock data with realistic enterprise metrics
  const mockMetrics: SystemMetric[] = [
    {
      id: '1',
      title: 'Total Users',
      value: '15,689',
      change: 12.5,
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active users across all portals',
      trend: [12000, 12500, 13000, 13500, 14000, 14500, 15000, 15689],
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Monthly Revenue',
      value: '$425,000',
      change: 8.3,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Total monthly recurring revenue',
      trend: [380000, 390000, 400000, 410000, 420000, 425000],
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'System Uptime',
      value: '99.97%',
      change: 0.02,
      changeType: 'increase',
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Overall system availability',
      trend: [99.95, 99.96, 99.97, 99.97, 99.97, 99.97],
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'API Calls',
      value: '1.25M',
      change: -2.1,
      changeType: 'decrease',
      icon: Zap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'API requests per hour',
      trend: [1300000, 1280000, 1260000, 1250000, 1250000],
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Database Queries',
      value: '890K',
      change: 5.7,
      changeType: 'increase',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Database operations per hour',
      trend: [800000, 820000, 840000, 860000, 880000, 890000],
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'MCP Agents',
      value: '301',
      change: 0,
      changeType: 'neutral',
      icon: Server,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Active MCP agents',
      trend: [301, 301, 301, 301, 301, 301],
      lastUpdated: new Date().toISOString(),
    },
  ];

  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server CPU usage has exceeded 85% for the last 10 minutes',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      severity: 'medium',
      source: 'System Monitor',
      resolved: false,
    },
    {
      id: '2',
      type: 'error',
      title: 'Database Connection Pool Exhausted',
      message: 'Database connection pool is at 95% capacity',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      severity: 'high',
      source: 'Database Monitor',
      resolved: false,
    },
    {
      id: '3',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2 AM EST',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      severity: 'low',
      source: 'Operations Team',
      resolved: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      severity: 'low',
      source: 'Backup System',
      resolved: true,
    },
  ];

  const mockSystemStatus: SystemStatus[] = [
    {
      id: '1',
      name: 'Web Server',
      status: 'online',
      uptime: 99.98,
      responseTime: 45,
      lastCheck: new Date().toISOString(),
      health: 'excellent',
    },
    {
      id: '2',
      name: 'Database Server',
      status: 'online',
      uptime: 99.95,
      responseTime: 12,
      lastCheck: new Date().toISOString(),
      health: 'excellent',
    },
    {
      id: '3',
      name: 'API Gateway',
      status: 'degraded',
      uptime: 99.85,
      responseTime: 120,
      lastCheck: new Date().toISOString(),
      health: 'fair',
    },
    {
      id: '4',
      name: 'File Storage',
      status: 'online',
      uptime: 99.99,
      responseTime: 8,
      lastCheck: new Date().toISOString(),
      health: 'excellent',
    },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(mockMetrics);
      setAlerts(mockAlerts);
      setSystemStatus(mockSystemStatus);
    } catch (error) {
      console.error('Failed to fetch system data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      // Simulate real-time metric updates
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: typeof metric.value === 'number' 
          ? metric.value + Math.floor(Math.random() * 10 - 5)
          : metric.value,
        lastUpdated: new Date().toISOString(),
      })));
    }, 30000); // Update every 30 seconds

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval);
  }, [fetchData]);

  const handleCreateAlert = async () => {
    if (!newAlert.title || !newAlert.message) return;

    try {
      const alert: Alert = {
        id: Date.now().toString(),
        title: newAlert.title,
        message: newAlert.message,
        type: newAlert.type || 'info',
        severity: newAlert.severity || 'medium',
        source: newAlert.source || 'Manual',
        timestamp: new Date().toISOString(),
        resolved: false,
      };

      setAlerts(prev => [alert, ...prev]);
      setShowCreateAlert(false);
      setNewAlert({
        type: 'info',
        title: '',
        message: '',
        severity: 'medium',
        source: 'Manual',
      });
    } catch (error) {
      console.error('Failed to create alert:', error);
    }
  };

  const handleResolveAlert = async (id: string) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, resolved: true } : alert
      ));
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  };

  const handleDeleteAlert = async (id: string) => {
    if (!confirm('Are you sure you want to delete this alert?')) return;

    try {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    } catch (error) {
      console.error('Failed to delete alert:', error);
    }
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'resolved' && alert.resolved) ||
                         (filterStatus === 'active' && !alert.resolved);
    return matchesSearch && matchesStatus;
  });


  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
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
            System Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Real-time system metrics and health monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const isExpanded = expandedCards.includes(metric.id);
          
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    onClick={() => toggleCardExpansion(metric.id)}
            aria-label="Button"
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Maximize2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.title}
                </h3>
                <div className="flex items-baseline space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {metric.value}
                  </span>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.changeType === 'increase' ? 'text-green-600' : 
                    metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.changeType === 'increase' ? (
                      <ArrowUpRight className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : metric.changeType === 'decrease' ? (
                      <ArrowDownRight className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <Minus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                    <span>{Math.abs(metric.change)}%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.description}
                </p>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                        <span>Trend (Last 7 days)</span>
                        <span>Last updated: {new Date(metric.lastUpdated).toLocaleTimeString()}</span>
                      </div>
                      <div className="h-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-end justify-between h-full responsive-container sm:flex-col md:flex-row lg:grid">
                          {metric.trend.map((value, i) => (
                            <div
                              key={i}
                              className="bg-blue-500 rounded-sm responsive-container sm:flex-col md:flex-row lg:grid"
                              style={{
                                height: `${(value / Math.max(...metric.trend)) * 100}%`,
                                width: `${100 / metric.trend.length}%`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* System Status and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              System Status
            </h2>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Settings className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>

          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {systemStatus.map((status) => (
              <div key={status.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className={`w-3 h-3 rounded-full ${
                    status.status === 'online' ? 'bg-green-500' :
                    status.status === 'offline' ? 'bg-red-500' :
                    status.status === 'maintenance' ? 'bg-yellow-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {status.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      Uptime: {status.uptime}% • Response: {status.responseTime}ms
                    </p>
                  </div>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className={`text-sm font-medium ${getHealthColor(status.health)}`}>
                    {status.health}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                    {new Date(status.lastCheck).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              System Alerts
            </h2>
            <button
              onClick={() => setShowCreateAlert(true)}
            aria-label="Button"
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Add Alert</span>
            </button>
          </div>

          {/* Alert Filters */}
          <div className="flex items-center space-x-4 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="all">All Alerts</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'error' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  alert.type === 'info' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  'border-green-500 bg-green-50 dark:bg-green-900/20'
                }`}
              >
                <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <h3 className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {alert.severity}
                      </span>
                      {alert.resolved && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 responsive-container sm:flex-col md:flex-row lg:grid">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      {alert.message}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Source: {alert.source}</span>
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 ml-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {!alert.resolved && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
            aria-label="Button"
                        className="p-1 text-green-600 hover:text-green-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                        title="Resolve Alert"
                      >
                        <CheckCircle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
            aria-label="Button"
                      className="p-1 text-red-600 hover:text-red-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Delete Alert"
                    >
                      <Trash2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Alert Modal */}
      <AnimatePresence>
        {showCreateAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Create New Alert
                </h3>
                <button
                  onClick={() => setShowCreateAlert(false)}
            aria-label="Button"
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Alert Type
                  </label>
                  <select
                    value={newAlert.type}
                    onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value as 'error' | 'warning' | 'info' | 'success' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                    <option value="success">Success</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Severity
                  </label>
                  <select
                    value={newAlert.severity}
                    onChange={(e) => setNewAlert({ ...newAlert, severity: e.target.value as 'low' | 'medium' | 'high' | 'critical' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newAlert.title || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter alert title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Message
                  </label>
                  <textarea
                    value={newAlert.message || ''}
                    onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    rows={3}
                    placeholder="Enter alert message"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() => setShowCreateAlert(false)}
            aria-label="Button"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAlert}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  Create Alert
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSystemOverview;
