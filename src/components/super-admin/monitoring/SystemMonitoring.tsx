import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Server,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  Battery,
  Zap,
  Shield,
  Eye,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Download,
  Bell,
  BellOff,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  Info,
  AlertCircle,
} from 'lucide-react';
import { superAdminService } from '../../../services/supabase/superAdminService';

interface MonitoringMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: {
    warning: number;
    critical: number;
  };
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  category: 'system' | 'network' | 'database' | 'application';
}

interface Alert {
  id: string;
  type: 'metric' | 'system' | 'security' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: string;
  assignedTo?: string;
  resolution?: string;
  metadata: Record<string, any>;
}

interface MonitoringRule {
  id: string;
  name: string;
  description: string;
  metric: string;
  condition: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  enabled: boolean;
  actions: string[];
  createdAt: string;
  updatedAt: string;
}

const SystemMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<MonitoringMetric[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [rules, setRules] = useState<MonitoringRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [showCreateRule, setShowCreateRule] = useState(false);
  const [editingRule, setEditingRule] = useState<MonitoringRule | null>(null);
  const [filters, setFilters] = useState<{
    severity?: string;
    status?: string;
    type?: string;
  }>({});

  const [newRule, setNewRule] = useState<Partial<MonitoringRule>>({
    name: '',
    description: '',
    metric: '',
    condition: 'greater_than',
    threshold: 0,
    severity: 'medium',
    enabled: true,
    actions: [],
  });

  // Mock monitoring metrics
  const mockMetrics: MonitoringMetric[] = [
    {
      id: '1',
      name: 'CPU Usage',
      value: 65,
      unit: '%',
      threshold: { warning: 70, critical: 85 },
      status: 'healthy',
      trend: 'up',
      lastUpdated: new Date().toISOString(),
      category: 'system',
    },
    {
      id: '2',
      name: 'Memory Usage',
      value: 78,
      unit: '%',
      threshold: { warning: 80, critical: 90 },
      status: 'warning',
      trend: 'up',
      lastUpdated: new Date().toISOString(),
      category: 'system',
    },
    {
      id: '3',
      name: 'Disk Usage',
      value: 42,
      unit: '%',
      threshold: { warning: 80, critical: 90 },
      status: 'healthy',
      trend: 'stable',
      lastUpdated: new Date().toISOString(),
      category: 'system',
    },
    {
      id: '4',
      name: 'Network Latency',
      value: 12,
      unit: 'ms',
      threshold: { warning: 50, critical: 100 },
      status: 'healthy',
      trend: 'down',
      lastUpdated: new Date().toISOString(),
      category: 'network',
    },
    {
      id: '5',
      name: 'Database Connections',
      value: 45,
      unit: 'connections',
      threshold: { warning: 80, critical: 100 },
      status: 'healthy',
      trend: 'stable',
      lastUpdated: new Date().toISOString(),
      category: 'database',
    },
    {
      id: '6',
      name: 'Response Time',
      value: 45,
      unit: 'ms',
      threshold: { warning: 100, critical: 200 },
      status: 'healthy',
      trend: 'down',
      lastUpdated: new Date().toISOString(),
      category: 'application',
    },
  ];

  // Mock alerts
  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'metric',
      severity: 'high',
      title: 'High Memory Usage Detected',
      description: 'Memory usage has exceeded 80% on server-01',
      source: 'Server Monitoring',
      status: 'active',
      timestamp: new Date().toISOString(),
      metadata: { server: 'server-01', metric: 'memory_usage', value: 82 },
    },
    {
      id: '2',
      type: 'system',
      severity: 'critical',
      title: 'Database Connection Pool Exhausted',
      description: 'All database connection pools are at capacity',
      source: 'Database Monitor',
      status: 'acknowledged',
      assignedTo: 'admin@company.com',
      timestamp: new Date().toISOString(),
      metadata: { database: 'main', connections: 100, max_connections: 100 },
    },
    {
      id: '3',
      type: 'security',
      severity: 'medium',
      title: 'Failed Login Attempts',
      description: 'Multiple failed login attempts detected from IP 192.168.1.100',
      source: 'Security Monitor',
      status: 'active',
      timestamp: new Date().toISOString(),
      metadata: { ip: '192.168.1.100', attempts: 5, user: 'admin' },
    },
    {
      id: '4',
      type: 'performance',
      severity: 'low',
      title: 'Slow Query Detected',
      description: 'Query execution time exceeded 5 seconds',
      source: 'Query Monitor',
      status: 'resolved',
      resolution: 'Query optimized and index added',
      timestamp: new Date().toISOString(),
      metadata: { query: 'SELECT * FROM users', duration: 5.2 },
    },
  ];

  // Mock monitoring rules
  const mockRules: MonitoringRule[] = [
    {
      id: '1',
      name: 'High CPU Usage Alert',
      description: 'Alert when CPU usage exceeds 80%',
      metric: 'cpu_usage',
      condition: 'greater_than',
      threshold: 80,
      severity: 'high',
      enabled: true,
      actions: ['email', 'slack'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Memory Usage Warning',
      description: 'Warning when memory usage exceeds 70%',
      metric: 'memory_usage',
      condition: 'greater_than',
      threshold: 70,
      severity: 'medium',
      enabled: true,
      actions: ['email'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Database Connection Alert',
      description: 'Alert when database connections exceed 90%',
      metric: 'database_connections',
      condition: 'greater_than',
      threshold: 90,
      severity: 'critical',
      enabled: true,
      actions: ['email', 'slack', 'pagerduty'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Fetch monitoring data
  const fetchMonitoringData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMetrics(mockMetrics);
      setAlerts(mockAlerts);
      setRules(mockRules);
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitoringData();
  }, [fetchMonitoringData]);

  // Set up auto-refresh
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchMonitoringData, 30000); // Update every 30 seconds
    }
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, fetchMonitoringData]);

  const handleRefresh = async () => {
    await fetchMonitoringData();
  };

  const handleCreateRule = async () => {
    if (!newRule.name || !newRule.metric) return;

    try {
      const rule: MonitoringRule = {
        id: Date.now().toString(),
        name: newRule.name,
        description: newRule.description || '',
        metric: newRule.metric,
        condition: newRule.condition as any,
        threshold: newRule.threshold || 0,
        severity: newRule.severity as any,
        enabled: newRule.enabled || true,
        actions: newRule.actions || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setRules(prev => [...prev, rule]);
      setShowCreateRule(false);
      setNewRule({
        name: '',
        description: '',
        metric: '',
        condition: 'greater_than',
        threshold: 0,
        severity: 'medium',
        enabled: true,
        actions: [],
      });
    } catch (error) {
      console.error('Failed to create rule:', error);
    }
  };

  const handleUpdateRule = async (id: string, updates: Partial<MonitoringRule>) => {
    try {
      setRules(prev => prev.map(rule => 
        rule.id === id 
          ? { ...rule, ...updates, updatedAt: new Date().toISOString() }
          : rule
      ));
      setEditingRule(null);
    } catch (error) {
      console.error('Failed to update rule:', error);
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm('Are you sure you want to delete this monitoring rule?')) return;

    try {
      setRules(prev => prev.filter(rule => rule.id !== id));
    } catch (error) {
      console.error('Failed to delete rule:', error);
    }
  };

  const handleAcknowledgeAlert = async (id: string) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === id 
          ? { ...alert, status: 'acknowledged' as const, assignedTo: 'current-user@company.com' }
          : alert
      ));
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const handleResolveAlert = async (id: string) => {
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === id 
          ? { ...alert, status: 'resolved' as const, resolution: 'Resolved by system administrator' }
          : alert
      ));
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'metric':
        return Activity;
      case 'system':
        return Server;
      case 'security':
        return Shield;
      case 'performance':
        return Zap;
      default:
        return AlertTriangle;
    }
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'system':
        return Cpu;
      case 'network':
        return Wifi;
      case 'database':
        return Database;
      case 'application':
        return Globe;
      default:
        return Activity;
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
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const filteredAlerts = alerts.filter(alert => {
    if (filters.severity && alert.severity !== filters.severity) return false;
    if (filters.status && alert.status !== filters.status) return false;
    if (filters.type && alert.type !== filters.type) return false;
    return true;
  });

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            System Monitoring
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Real-time system monitoring and alerting
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            aria-label="Button"
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              autoRefresh
                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {autoRefresh ? <Pause className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Play className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <span>{autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {metrics.map((metric, index) => {
          const MetricIcon = getMetricIcon(metric.category);
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-lg ${
                  metric.status === 'healthy' ? 'bg-green-50 dark:bg-green-900/20' :
                  metric.status === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                  'bg-red-50 dark:bg-red-900/20'
                }`}>
                  <MetricIcon className={`h-6 w-6 ${
                    metric.status === 'healthy' ? 'text-green-600' :
                    metric.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-red-600' :
                  metric.trend === 'down' ? 'text-green-600' :
                  'text-gray-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : null}
                </div>
              </div>
              <div className="mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.value}{metric.unit}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.name}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.status === 'healthy' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                <span>Warning: {metric.threshold.warning}{metric.unit}</span>
                <span>Critical: {metric.threshold.critical}{metric.unit}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Alerts and Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Active Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              Active Alerts
            </h2>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <select
                value={filters.severity || ''}
                onChange={(e) => setFilters({ ...filters, severity: e.target.value || undefined })}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {filteredAlerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    alert.severity === 'high' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-start space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <AlertIcon className={`h-5 w-5 mt-0.5 ${
                        alert.severity === 'critical' ? 'text-red-600' :
                        alert.severity === 'high' ? 'text-orange-600' :
                        alert.severity === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {alert.title}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          {alert.description}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span>{alert.source}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      {alert.status === 'active' && (
                        <button
                          onClick={() => handleAcknowledgeAlert(alert.id)}
            aria-label="Button"
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                          title="Acknowledge"
                        >
                          <CheckCircle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      )}
                      {alert.status === 'acknowledged' && (
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
            aria-label="Button"
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                          title="Resolve"
                        >
                          <XCircle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Monitoring Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              Monitoring Rules
            </h2>
            <button
              onClick={() => setShowCreateRule(true)}
            aria-label="Button"
              className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>New Rule</span>
            </button>
          </div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {rule.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(rule.severity)}`}>
                      {rule.severity.toUpperCase()}
                    </span>
                    {rule.enabled ? (
                      <CheckCircle className="h-4 w-4 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <button
                      onClick={() => setEditingRule(rule)}
            aria-label="Button"
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
            aria-label="Button"
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {rule.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {rule.metric} {rule.condition} {rule.threshold} | Actions: {rule.actions.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Create Rule Modal */}
      <AnimatePresence>
        {showCreateRule && (
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
                  Create Monitoring Rule
                </h3>
                <button
                  onClick={() => setShowCreateRule(false)}
            aria-label="Button"
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
              
              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    value={newRule.name || ''}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter rule name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Description
                  </label>
                  <textarea
                    value={newRule.description || ''}
                    onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    rows={3}
                    placeholder="Enter rule description"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      Metric
                    </label>
                    <select
                      value={newRule.metric || ''}
                      onChange={(e) => setNewRule({ ...newRule, metric: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <option value="">Select Metric</option>
                      <option value="cpu_usage">CPU Usage</option>
                      <option value="memory_usage">Memory Usage</option>
                      <option value="disk_usage">Disk Usage</option>
                      <option value="network_latency">Network Latency</option>
                      <option value="database_connections">Database Connections</option>
                      <option value="response_time">Response Time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      Condition
                    </label>
                    <select
                      value={newRule.condition || 'greater_than'}
                      onChange={(e) => setNewRule({ ...newRule, condition: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <option value="greater_than">Greater Than</option>
                      <option value="less_than">Less Than</option>
                      <option value="equals">Equals</option>
                      <option value="not_equals">Not Equals</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      Threshold
                    </label>
                    <input
                      type="number"
                      value={newRule.threshold || 0}
                      onChange={(e) => setNewRule({ ...newRule, threshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      Severity
                    </label>
                    <select
                      value={newRule.severity || 'medium'}
                      onChange={(e) => setNewRule({ ...newRule, severity: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() => setShowCreateRule(false)}
            aria-label="Button"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRule}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  Create Rule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemMonitoring;
