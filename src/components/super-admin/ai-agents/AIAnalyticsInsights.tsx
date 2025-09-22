import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, TrendingUp, TrendingDown, PieChart, LineChart, Activity,
  Eye, Download, RefreshCw, Filter, Calendar, Target, Zap, Brain,
  Users, Clock, DollarSign, AlertTriangle, CheckCircle, X, Bell
} from 'lucide-react';

/**
 * AI Analytics & Insights - Comprehensive AI System Analytics and Business Intelligence
 * Advanced analytics dashboard for AI performance, usage patterns, and business insights
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T18:35:00.000Z
 * Features: Performance Analytics, Usage Patterns, Business Intelligence, Predictive Insights
 */

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'performance' | 'usage' | 'business' | 'technical';
}

interface UsagePattern {
  id: string;
  time: string;
  requests: number;
  users: number;
  cost: number;
  latency: number;
}

interface BusinessInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'revenue' | 'cost' | 'efficiency' | 'quality';
  confidence: number;
  actionable: boolean;
}


interface AnalyticsStats {
  totalRequests: number;
  activeUsers: number;
  averageLatency: number;
  totalCost: number;
  accuracyImprovement: number;
  efficiencyGain: number;
  costSavings: number;
  userSatisfaction: number;
}

const AIAnalyticsInsights: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [usagePatterns, setUsagePatterns] = useState<UsagePattern[]>([]);
  const [businessInsights, setBusinessInsights] = useState<BusinessInsight[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'performance' | 'usage' | 'business' | 'technical'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<AnalyticsStats>({
    totalRequests: 0,
    activeUsers: 0,
    averageLatency: 0,
    totalCost: 0,
    accuracyImprovement: 0,
    efficiencyGain: 0,
    costSavings: 0,
    userSatisfaction: 0
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
    const mockMetrics: AnalyticsMetric[] = [
      {
        id: 'metric-1',
        name: 'Model Accuracy',
        value: 94.2,
        unit: '%',
        change: 2.1,
        trend: 'up',
        category: 'performance'
      },
      {
        id: 'metric-2',
        name: 'Request Volume',
        value: 2847,
        unit: 'req/min',
        change: 12.5,
        trend: 'up',
        category: 'usage'
      },
      {
        id: 'metric-3',
        name: 'Cost per Request',
        value: 0.045,
        unit: '$',
        change: -8.3,
        trend: 'down',
        category: 'business'
      },
      {
        id: 'metric-4',
        name: 'Average Latency',
        value: 145,
        unit: 'ms',
        change: -15.2,
        trend: 'down',
        category: 'technical'
      },
      {
        id: 'metric-5',
        name: 'User Satisfaction',
        value: 4.6,
        unit: '/5',
        change: 0.3,
        trend: 'up',
        category: 'business'
      },
      {
        id: 'metric-6',
        name: 'System Uptime',
        value: 99.8,
        unit: '%',
        change: 0.1,
        trend: 'up',
        category: 'technical'
      }
    ];

    const mockUsagePatterns: UsagePattern[] = [
      { id: '1', time: '00:00', requests: 120, users: 45, cost: 12.50, latency: 180 },
      { id: '2', time: '04:00', requests: 89, users: 32, cost: 8.75, latency: 165 },
      { id: '3', time: '08:00', requests: 450, users: 180, cost: 45.20, latency: 142 },
      { id: '4', time: '12:00', requests: 680, users: 250, cost: 68.40, latency: 155 },
      { id: '5', time: '16:00', requests: 720, users: 280, cost: 72.80, latency: 148 },
      { id: '6', time: '20:00', requests: 340, users: 120, cost: 34.20, latency: 162 }
    ];

    const mockBusinessInsights: BusinessInsight[] = [
      {
        id: 'insight-1',
        title: 'AI-Driven Cost Reduction',
        description: 'Implementation of AI optimization has reduced operational costs by 23% this quarter',
        impact: 'high',
        category: 'cost',
        confidence: 94,
        actionable: true
      },
      {
        id: 'insight-2',
        title: 'Customer Service Efficiency',
        description: 'AI chatbot handling 67% of customer inquiries, reducing response time by 45%',
        impact: 'high',
        category: 'efficiency',
        confidence: 89,
        actionable: true
      },
      {
        id: 'insight-3',
        title: 'Predictive Maintenance Savings',
        description: 'ML models predicting equipment failures with 91% accuracy, saving $2.3M annually',
        impact: 'high',
        category: 'revenue',
        confidence: 91,
        actionable: true
      },
      {
        id: 'insight-4',
        title: 'Quality Improvement Trend',
        description: 'AI quality checks have improved product defect detection by 34%',
        impact: 'medium',
        category: 'quality',
        confidence: 87,
        actionable: true
      }
    ];


    setMetrics(mockMetrics);
    setUsagePatterns(mockUsagePatterns);
    setBusinessInsights(mockBusinessInsights);
    
    // Calculate stats
    const analyticsStats: AnalyticsStats = {
      totalRequests: 2847000,
      activeUsers: 1250,
      averageLatency: 145,
      totalCost: 28475.50,
      accuracyImprovement: 23.5,
      efficiencyGain: 45.2,
      costSavings: 2300000,
      userSatisfaction: 4.6
    };
    setStats(analyticsStats);
  }, []);

  const getTrendIcon = (trend: AnalyticsMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-gray-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: BusinessInsight['impact']) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: AnalyticsMetric['category']) => {
    switch (category) {
      case 'performance': return Target;
      case 'usage': return Users;
      case 'business': return DollarSign;
      case 'technical': return Zap;
      default: return BarChart3;
    }
  };

  const getCategoryColor = (category: AnalyticsMetric['category']) => {
    switch (category) {
      case 'performance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'usage': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'business': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'technical': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredMetrics = selectedCategory === 'all' 
    ? metrics 
    : metrics.filter(m => m.category === selectedCategory);

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Analytics data has been updated');
  };

  const handleExportData = () => {
    addNotification('success', 'Export Started', 'Analytics data export has been initiated');
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
                <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
                AI Analytics & Insights
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive analytics and business intelligence for AI systems
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{(stats.totalRequests / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cost Savings</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${(stats.costSavings / 1000000).toFixed(1)}M</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User Satisfaction</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.userSatisfaction}/5</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Analytics Metrics</h2>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'All', icon: BarChart3 },
                { id: 'performance', label: 'Performance', icon: Target },
                { id: 'usage', label: 'Usage', icon: Users },
                { id: 'business', label: 'Business', icon: DollarSign },
                { id: 'technical', label: 'Technical', icon: Zap }
              ].map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as any)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMetrics.map((metric) => {
              const CategoryIcon = getCategoryIcon(metric.category);
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(metric.category)}`}>
                          {metric.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(metric.trend)}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' :
                        metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}{metric.unit}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Business Insights */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Business Insights</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {businessInsights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact} impact
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {insight.category}
                      </span>
                      {insight.actionable && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs rounded-full">
                          Actionable
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{insight.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {insight.confidence}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Confidence
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Usage Patterns */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Usage Patterns (24h)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Requests</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Users</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Latency</th>
                </tr>
              </thead>
              <tbody>
                {usagePatterns.map((pattern) => (
                  <tr key={pattern.id} className="border-b border-gray-100 dark:border-slate-700">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{pattern.time}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{pattern.requests.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{pattern.users}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">${pattern.cost.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{pattern.latency}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default AIAnalyticsInsights;
