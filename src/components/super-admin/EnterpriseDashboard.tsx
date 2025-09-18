import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  DollarSign,
  Activity,
  Shield,
  Zap,
  Globe,
  Database,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Settings,
  Bell,
  Download,
  Maximize2,
} from 'lucide-react';

/**
 * Interface representing a metric card for the dashboard
 * @interface MetricCard
 */
interface MetricCard {
  /** Unique identifier for the metric */
  id: string;
  /** Display title of the metric */
  title: string;
  /** Current value of the metric */
  value: string | number;
  /** Percentage change from previous period */
  change: number;
  /** Type of change (increase, decrease, or neutral) */
  changeType: 'increase' | 'decrease' | 'neutral';
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>;
  /** Color theme for the metric card */
  color: string;
  /** Historical trend data points */
  trend: number[];
  /** Description of what the metric represents */
  description: string;
}

interface SystemAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  source: string;
  resolved: boolean;
}

interface PortalStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  users: number;
  uptime: number;
  responseTime: number;
  lastUpdate: string;
}

interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  network: number;
  responseTime: number;
}

/**
 * EnterpriseDashboard Component
 * 
 * A comprehensive dashboard providing real-time system metrics,
 * performance monitoring, and portal status overview for enterprise
 * administrators.
 * 
 * @component
 * @returns {JSX.Element} The EnterpriseDashboard component
 */
const EnterpriseDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'minimal'>('overview');

  // Mock data for enterprise metrics
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      id: 'total-users',
      title: 'Total Users',
      value: '12,847',
      change: 12.5,
      changeType: 'increase',
      icon: Users,
      color: 'blue',
      trend: [12000, 12100, 12200, 12300, 12400, 12500, 12600, 12700, 12800, 12847],
      description: 'Active users across all portals',
    },
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '$2.4M',
      change: 8.2,
      changeType: 'increase',
      icon: DollarSign,
      color: 'green',
      trend: [
        2000000, 2050000, 2100000, 2150000, 2200000, 2250000, 2300000, 2350000, 2400000, 2400000,
      ],
      description: 'Recurring monthly revenue',
    },
    {
      id: 'system-health',
      title: 'System Health',
      value: '99.7%',
      change: 0.1,
      changeType: 'increase',
      icon: Shield,
      color: 'purple',
      trend: [99.5, 99.6, 99.7, 99.6, 99.7, 99.8, 99.7, 99.6, 99.7, 99.7],
      description: 'Overall system uptime and performance',
    },
    {
      id: 'active-agents',
      title: 'Active Agents',
      value: '248/250',
      change: -0.8,
      changeType: 'decrease',
      icon: Zap,
      color: 'orange',
      trend: [250, 250, 249, 250, 249, 248, 249, 248, 248, 248],
      description: 'MCP agents currently operational',
    },
    {
      id: 'api-requests',
      title: 'API Requests',
      value: '1.2M',
      change: 15.3,
      changeType: 'increase',
      icon: Activity,
      color: 'cyan',
      trend: [
        1000000, 1050000, 1100000, 1150000, 1200000, 1180000, 1200000, 1220000, 1200000, 1200000,
      ],
      description: 'Requests processed in last 24h',
    },
    {
      id: 'data-processed',
      title: 'Data Processed',
      value: '847GB',
      change: 22.1,
      changeType: 'increase',
      icon: Database,
      color: 'pink',
      trend: [700, 720, 750, 780, 800, 820, 840, 845, 847, 847],
      description: 'Data processed across all systems',
    },
  ]);

  const [alerts] = useState<SystemAlert[]>([
    {
      id: 'alert-1',
      type: 'critical',
      title: 'High CPU Usage',
      message: 'Server cluster-3 experiencing 95% CPU utilization',
      timestamp: '2 minutes ago',
      source: 'System Monitor',
      resolved: false,
    },
    {
      id: 'alert-2',
      type: 'warning',
      title: 'Memory Usage Alert',
      message: 'Database server approaching memory limit',
      timestamp: '5 minutes ago',
      source: 'Database Monitor',
      resolved: false,
    },
    {
      id: 'alert-3',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      timestamp: '1 hour ago',
      source: 'Backup Service',
      resolved: true,
    },
    {
      id: 'alert-4',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Portal maintenance scheduled for tonight',
      timestamp: '3 hours ago',
      source: 'Maintenance Scheduler',
      resolved: false,
    },
  ]);

  const [portalStatuses] = useState<PortalStatus[]>([
    {
      id: 'broker',
      name: 'Broker Portal',
      status: 'online',
      users: 3247,
      uptime: 99.9,
      responseTime: 145,
      lastUpdate: '1 min ago',
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      status: 'online',
      users: 2156,
      uptime: 99.8,
      responseTime: 167,
      lastUpdate: '2 min ago',
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      status: 'online',
      users: 1893,
      uptime: 99.7,
      responseTime: 123,
      lastUpdate: '1 min ago',
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      status: 'online',
      users: 4567,
      uptime: 99.6,
      responseTime: 189,
      lastUpdate: '3 min ago',
    },
    {
      id: 'financials',
      name: 'Financials Portal',
      status: 'maintenance',
      users: 892,
      uptime: 99.5,
      responseTime: 234,
      lastUpdate: '5 min ago',
    },
    {
      id: 'analytics',
      name: 'Analytics Portal',
      status: 'online',
      users: 1567,
      uptime: 99.8,
      responseTime: 156,
      lastUpdate: '2 min ago',
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      status: 'online',
      users: 1234,
      uptime: 99.9,
      responseTime: 134,
      lastUpdate: '1 min ago',
    },
    {
      id: 'marketplace',
      name: 'Marketplace Portal',
      status: 'online',
      users: 3456,
      uptime: 99.7,
      responseTime: 178,
      lastUpdate: '4 min ago',
    },
  ]);

  const [performanceData, setPerformanceData] = useState<PerformanceData[]>(
    Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i}:00`,
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
      responseTime: Math.floor(Math.random() * 500) + 100,
    }))
  );

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map(metric => ({
          ...metric,
          value:
            typeof metric.value === 'number'
              ? metric.value + (Math.random() - 0.5) * 100
              : metric.value,
          trend: [
            ...metric.trend.slice(1),
            metric.trend[metric.trend.length - 1] + (Math.random() - 0.5) * 100,
          ],
        }))
      );

      setPerformanceData(prevData =>
        prevData.map(point => ({
          ...point,
          cpu: Math.max(0, Math.min(100, point.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, point.memory + (Math.random() - 0.5) * 10)),
          network: Math.max(0, Math.min(100, point.network + (Math.random() - 0.5) * 10)),
          responseTime: Math.max(50, point.responseTime + (Math.random() - 0.5) * 50),
        }))
      );
    }, 3000);

    return (
    ) => clearInterval(interval);
  }, [autoRefresh]);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      green: 'from-green-500/20 to-green-600/20 border-green-500/30',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
      cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
      pink: 'from-pink-500/20 to-pink-600/20 border-pink-500/30',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-400/20';
      case 'offline':
        return 'text-red-400 bg-red-400/20';
      case 'maintenance':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'error':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-red-500/50 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10';
      case 'success':
        return 'border-green-500/50 bg-green-500/10';
      default:
        return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">🏢 Enterprise Dashboard</h1>
            <p className="text-gray-200 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
              Real-time system overview and performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                {autoRefresh ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
            aria-label="Button"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <select
              value={selectedTimeRange}
              onChange={e => setSelectedTimeRange(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            <select
              value={viewMode}
              onChange={e => setViewMode(e.target.value as 'overview' | 'detailed' | 'minimal')}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="overview">Overview</option>
              <option value="detailed">Detailed</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Download className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Settings className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${getColorClasses(metric.color)} backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer`}
            onClick={() => toggleCardExpansion(metric.id)}
          >
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <metric.icon className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">{metric.title}</h3>
                  <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {metric.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                ) : metric.changeType === 'decrease' ? (
                  <ArrowDownRight className="w-4 h-4 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                ) : null}
                <span
                  className={`text-sm font-medium ${
                    metric.changeType === 'increase'
                      ? 'text-green-400'
                      : metric.changeType === 'decrease'
                        ? 'text-red-400'
                        : 'text-gray-400'
                  }`}
                >
                  {metric.change > 0 ? '+' : ''}
                  {metric.change}%
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-300 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{metric.description}</p>

            {/* Mini Trend Chart */}
            <div className="h-16 flex items-end space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
              {metric.trend.slice(-12).map((value, trendIndex) => (
                <div
                  key={trendIndex}
                  className="flex-1 bg-white/30 rounded-t responsive-container sm:flex-col md:flex-row lg:grid"
                  style={{ height: `${(value / Math.max(...metric.trend)) * 100}%` }}
                ></div>
              ))}
            </div>

            {/* Expanded View */}
            <AnimatePresence>
              {expandedCards.has(metric.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex justify-between text-xs text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Peak Value</span>
                      <span>{Math.max(...metric.trend).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Average</span>
                      <span>
                        {Math.round(
                          metric.trend.reduce((a, b) => a + b, 0) / metric.trend.length
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Growth Rate</span>
                      <span className="text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">+{metric.change}%</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Left Column - Performance Charts */}
        <div className="lg:col-span-2 space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* System Performance Chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">System Performance</h3>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Maximize2 className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </div>

            <div className="h-64 flex items-end space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
              {performanceData.slice(-24).map((point, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-full flex flex-col space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div
                      className="bg-blue-400 rounded-t responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ height: `${point.cpu}%` }}
                      title={`CPU: ${point.cpu}%`}
                    ></div>
                    <div
                      className="bg-green-400 responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ height: `${point.memory}%` }}
                      title={`Memory: ${point.memory}%`}
                    ></div>
                    <div
                      className="bg-purple-400 rounded-b responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ height: `${point.network}%` }}
                      title={`Network: ${point.network}%`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{point.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-3 h-3 bg-blue-400 rounded responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">CPU</span>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-3 h-3 bg-green-400 rounded responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Memory</span>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-3 h-3 bg-purple-400 rounded responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Network</span>
              </div>
            </div>
          </div>

          {/* Portal Status */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Portal Status</h3>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Globe className="w-5 h-5 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">8 Portals</span>
              </div>
            </div>

            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              {portalStatuses.map((portal, index) => (
                <motion.div
                  key={portal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                        <Globe className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{portal.name}</h4>
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                          {portal.users.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.uptime}% uptime</p>
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{portal.responseTime}ms response</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(portal.status)}`}
                      >
                        {portal.status}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Alerts & Quick Actions */}
        <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* System Alerts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Bell className="w-5 h-5 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                <h3 className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">System Alerts</h3>
              </div>
              <span className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{alerts.length} alerts</span>
            </div>

            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              {alerts.slice(0, 4).map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <h4 className="text-sm font-medium text-white responsive-container sm:flex-col md:flex-row lg:grid">{alert.title}</h4>
                      <p className="text-xs text-gray-300 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Source: {alert.source}</p>
                    </div>
                    <div className="text-right ml-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{alert.timestamp}</span>
                      {alert.resolved && <CheckCircle className="w-4 h-4 text-green-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Quick Actions</h3>
            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Zap className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Deploy Update</span>
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Shield className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Run Security Scan</span>
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Database className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Backup Database</span>
              </button>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Activity className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Performance Report</span>
              </button>
            </div>
          </div>

          {/* System Resources */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">System Resources</h3>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>CPU Usage</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-blue-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>Memory Usage</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-green-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>Disk Usage</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-purple-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>Network I/O</span>
                  <span>89%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-orange-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
}