import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart,
  Target, Clock, Zap, AlertTriangle, CheckCircle, X, RefreshCw,
  Eye, Settings, Download, Filter, Search, Bell, Award, Star
} from 'lucide-react';

/**
 * AI Performance Monitoring - Real-time AI System Performance Analytics
 * Comprehensive monitoring and analytics for AI systems and models
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T18:20:00.000Z
 * Features: Real-time Metrics, Performance Analytics, Alert Management, System Health
 */

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  status: 'good' | 'warning' | 'critical';
  timestamp: string;
}

interface AIAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error' | 'maintenance';
  performance: {
    accuracy: number;
    latency: number;
    throughput: number;
    errorRate: number;
  };
  uptime: number;
  lastActivity: string;
}

interface Alert {
  id: string;
  type: 'performance' | 'error' | 'maintenance' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  agentId?: string;
}

interface PerformanceStats {
  totalAgents: number;
  activeAgents: number;
  averageAccuracy: number;
  totalAlerts: number;
  criticalAlerts: number;
  systemUptime: number;
  averageLatency: number;
  totalRequests: number;
}

const AIPerformanceMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<PerformanceStats>({
    totalAgents: 0,
    activeAgents: 0,
    averageAccuracy: 0,
    totalAlerts: 0,
    criticalAlerts: 0,
    systemUptime: 0,
    averageLatency: 0,
    totalRequests: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data
  useEffect(() => {
    const mockMetrics: PerformanceMetric[] = [
      {
        id: 'metric-1',
        name: 'System Accuracy',
        value: 94.2,
        unit: '%',
        trend: 'up',
        change: 2.1,
        status: 'good',
        timestamp: new Date().toISOString()
      },
      {
        id: 'metric-2',
        name: 'Average Latency',
        value: 145,
        unit: 'ms',
        trend: 'down',
        change: -12.5,
        status: 'good',
        timestamp: new Date().toISOString()
      },
      {
        id: 'metric-3',
        name: 'Request Throughput',
        value: 2847,
        unit: 'req/min',
        trend: 'up',
        change: 8.3,
        status: 'good',
        timestamp: new Date().toISOString()
      },
      {
        id: 'metric-4',
        name: 'Error Rate',
        value: 0.8,
        unit: '%',
        trend: 'down',
        change: -0.3,
        status: 'warning',
        timestamp: new Date().toISOString()
      },
      {
        id: 'metric-5',
        name: 'Memory Usage',
        value: 67.5,
        unit: '%',
        trend: 'up',
        change: 5.2,
        status: 'warning',
        timestamp: new Date().toISOString()
      },
      {
        id: 'metric-6',
        name: 'CPU Usage',
        value: 45.2,
        unit: '%',
        trend: 'stable',
        change: 0.1,
        status: 'good',
        timestamp: new Date().toISOString()
      }
    ];

    const mockAgents: AIAgent[] = [
      {
        id: 'agent-1',
        name: 'Customer Service Bot',
        type: 'NLP',
        status: 'active',
        performance: {
          accuracy: 94.2,
          latency: 120,
          throughput: 450,
          errorRate: 0.5
        },
        uptime: 99.8,
        lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString()
      },
      {
        id: 'agent-2',
        name: 'Route Optimizer',
        type: 'Reinforcement Learning',
        status: 'active',
        performance: {
          accuracy: 89.7,
          latency: 250,
          throughput: 120,
          errorRate: 1.2
        },
        uptime: 98.5,
        lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString()
      },
      {
        id: 'agent-3',
        name: 'Fraud Detector',
        type: 'Classification',
        status: 'active',
        performance: {
          accuracy: 96.8,
          latency: 85,
          throughput: 890,
          errorRate: 0.2
        },
        uptime: 99.9,
        lastActivity: new Date(Date.now() - 1 * 60 * 1000).toISOString()
      },
      {
        id: 'agent-4',
        name: 'Demand Forecaster',
        type: 'Time Series',
        status: 'error',
        performance: {
          accuracy: 72.1,
          latency: 1800,
          throughput: 15,
          errorRate: 12.5
        },
        uptime: 85.2,
        lastActivity: new Date(Date.now() - 45 * 60 * 1000).toISOString()
      },
      {
        id: 'agent-5',
        name: 'Document Processor',
        type: 'Computer Vision',
        status: 'maintenance',
        performance: {
          accuracy: 91.3,
          latency: 320,
          throughput: 180,
          errorRate: 2.1
        },
        uptime: 97.8,
        lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ];

    const mockAlerts: Alert[] = [
      {
        id: 'alert-1',
        type: 'performance',
        severity: 'high',
        title: 'High Error Rate Detected',
        description: 'Demand Forecaster agent showing 12.5% error rate',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        resolved: false,
        agentId: 'agent-4'
      },
      {
        id: 'alert-2',
        type: 'maintenance',
        severity: 'medium',
        title: 'Scheduled Maintenance',
        description: 'Document Processor under maintenance',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        resolved: false,
        agentId: 'agent-5'
      },
      {
        id: 'alert-3',
        type: 'performance',
        severity: 'low',
        title: 'Memory Usage Warning',
        description: 'System memory usage at 67.5%',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resolved: true
      },
      {
        id: 'alert-4',
        type: 'error',
        severity: 'critical',
        title: 'Agent Connection Lost',
        description: 'Route Optimizer connection timeout',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        resolved: true,
        agentId: 'agent-2'
      }
    ];

    setMetrics(mockMetrics);
    setAgents(mockAgents);
    setAlerts(mockAlerts);
    
    // Calculate stats
    const performanceStats: PerformanceStats = {
      totalAgents: mockAgents.length,
      activeAgents: mockAgents.filter(a => a.status === 'active').length,
      averageAccuracy: mockAgents.reduce((sum, agent) => sum + agent.performance.accuracy, 0) / mockAgents.length,
      totalAlerts: mockAlerts.length,
      criticalAlerts: mockAlerts.filter(a => a.severity === 'critical' && !a.resolved).length,
      systemUptime: mockAgents.reduce((sum, agent) => sum + agent.uptime, 0) / mockAgents.length,
      averageLatency: mockAgents.reduce((sum, agent) => sum + agent.performance.latency, 0) / mockAgents.length,
      totalRequests: mockAgents.reduce((sum, agent) => sum + agent.performance.throughput, 0)
    };
    setStats(performanceStats);
  }, []);

  const getStatusColor = (status: AIAgent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'idle': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getMetricStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'good': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Performance data has been updated');
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, resolved: true }
        : alert
    ));
    addNotification('success', 'Alert Resolved', 'Alert has been marked as resolved');
  };

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Activity className="w-8 h-8 text-blue-500 mr-3" />
                AI Performance Monitoring
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time monitoring and analytics for AI systems and agents
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalAgents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Agents</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeAgents}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Accuracy</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.averageAccuracy.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.criticalAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${getMetricStatusColor(metric.status)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value}{metric.unit}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {new Date(metric.timestamp).toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Agents Status */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">AI Agents Status</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{agent.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{agent.performance.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Latency</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{agent.performance.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Throughput</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{agent.performance.throughput}/min</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Error Rate</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{agent.performance.errorRate}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Uptime: {agent.uptime}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatLastActivity(agent.lastActivity)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Alerts</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Mark All Resolved
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                Export
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.filter(alert => !alert.resolved).map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {alert.type}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatLastActivity(alert.timestamp)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{alert.description}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleResolveAlert(alert.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Resolve
                    </button>
                    <button className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {alerts.filter(alert => !alert.resolved).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Active Alerts</h3>
              <p className="text-gray-500 dark:text-gray-400">All systems are running smoothly</p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'info' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AIPerformanceMonitoring;
