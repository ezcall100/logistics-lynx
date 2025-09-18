/**
 * MCP Agents - Enhanced Enterprise Dashboard Component
 * Real-time dashboard with interactive charts, activity feed, and modern design
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  RefreshCw,
  Globe,
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
} from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { formatCurrency, formatNumber } from '../../lib/utils';

interface DashboardMetrics {
  totalCompanies: number;
  totalUsers: number;
  monthlyRevenue: number;
  systemUptime: number;
  activePortals: number;
  apiCalls: number;
  storageUsed: number;
  bandwidth: number;
  mcpAgents: number;
  responseTime: number;
  errorRate: number;
  lastUpdate: string;
}

interface ChartData {
  name: string;
  value: number;
  change: number;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'company' | 'user' | 'portal' | 'system' | 'security' | 'agent';
  action: string;
  user: string;
  time: string;
  status: 'success' | 'warning' | 'error' | 'info';
  details?: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  time: string;
  resolved: boolean;
}

const EnhancedDashboard: React.FC = () => {
  const [metrics] = useState<DashboardMetrics>({
    totalCompanies: 1247,
    totalUsers: 15689,
    monthlyRevenue: 425000,
    systemUptime: 99.97,
    activePortals: 24,
    apiCalls: 1250000,
    storageUsed: 2.4,
    bandwidth: 15.8,
    mcpAgents: 250,
    responseTime: 45,
    errorRate: 0.03,
    lastUpdate: '2 minutes ago',
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'company',
      action: 'New company registered',
      user: 'Acme Corporation',
      time: '2 minutes ago',
      status: 'success',
      details: 'Technology sector',
      icon: Building2,
    },
    {
      id: '2',
      type: 'user',
      action: 'User account created',
      user: 'john.smith@acme.com',
      time: '5 minutes ago',
      status: 'success',
      details: 'Admin role assigned',
      icon: Users,
    },
    {
      id: '3',
      type: 'system',
      action: 'System maintenance completed',
      user: 'System Administrator',
      time: '15 minutes ago',
      status: 'success',
      details: 'All services restored',
      icon: Activity,
    },
    {
      id: '4',
      type: 'agent',
      action: 'MCP Agent optimization',
      user: 'AI Coordinator',
      time: '1 hour ago',
      status: 'success',
      details: 'Performance improved by 15%',
      icon: Zap,
    },
    {
      id: '5',
      type: 'security',
      action: 'Security scan completed',
      user: 'Security System',
      time: '2 hours ago',
      status: 'success',
      details: 'No threats detected',
      icon: Shield,
    },
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'success',
      title: 'All Systems Operational',
      message: 'All 250 MCP agents are running optimally',
      time: '5 minutes ago',
      resolved: true,
    },
    {
      id: '2',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System maintenance scheduled for tonight at 2 AM',
      time: '1 hour ago',
      resolved: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'High API Usage',
      message: 'API calls are 20% above normal levels',
      time: '3 hours ago',
      resolved: false,
    },
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for charts
  const revenueData: ChartData[] = [
    { name: 'Jan', value: 320000, change: 12.5, color: '#0ea5e9' },
    { name: 'Feb', value: 350000, change: 9.4, color: '#3b82f6' },
    { name: 'Mar', value: 380000, change: 8.6, color: '#6366f1' },
    { name: 'Apr', value: 410000, change: 7.9, color: '#8b5cf6' },
    { name: 'May', value: 425000, change: 3.7, color: '#a855f7' },
  ];

  const portalUsageData: ChartData[] = [
    { name: 'Customer Portal', value: 85, change: 5.2, color: '#22c55e' },
    { name: 'Admin Portal', value: 92, change: 2.1, color: '#16a34a' },
    { name: 'API Portal', value: 78, change: -1.5, color: '#15803d' },
    { name: 'Mobile Portal', value: 65, change: 8.7, color: '#166534' },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'warning':
        return AlertTriangle;
      case 'error':
        return XCircle;
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getAlertColor = (type: SystemAlert['type']) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-amber-200 bg-amber-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent responsive-container sm:flex-col md:flex-row lg:grid">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Monitor and manage your entire platform ecosystem</p>
        </div>

        <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1 responsive-container sm:flex-col md:flex-row lg:grid">
            {(['1h', '24h', '7d', '30d'] as const).map(range => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
            aria-label="Button"
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeRange === range
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Total Companies"
            value={formatNumber(metrics.totalCompanies)}
            change={{ value: 12.5, type: 'increase' }}
            icon={<Building2 className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            className="bg-blue-50 border-blue-200 responsive-container sm:flex-col md:flex-row lg:grid"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Total Users"
            value={formatNumber(metrics.totalUsers)}
            change={{ value: 8.3, type: 'increase' }}
            icon={<Users className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            className="bg-green-50 border-green-200 responsive-container sm:flex-col md:flex-row lg:grid"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(metrics.monthlyRevenue)}
            change={{ value: 15.7, type: 'increase' }}
            icon={<DollarSign className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            className="bg-purple-50 border-purple-200 responsive-container sm:flex-col md:flex-row lg:grid"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="System Health"
            value={`${metrics.systemUptime}%`}
            change={{ value: 0.1, type: 'increase' }}
            icon={<Activity className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            className="bg-emerald-50 border-emerald-200 responsive-container sm:flex-col md:flex-row lg:grid"
          />
        </motion.div>
      </div>

      {/* MCP Agents Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 responsive-container sm:flex-col md:flex-row lg:grid">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Zap className="w-5 h-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              MCP Agents Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-3xl font-bold text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">{metrics.mcpAgents}</div>
                <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Active Agents</div>
              </div>
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-3xl font-bold text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">{metrics.responseTime}ms</div>
                <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Avg Response Time</div>
              </div>
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-3xl font-bold text-red-600 responsive-container sm:flex-col md:flex-row lg:grid">{metrics.errorRate}%</div>
                <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Error Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Revenue Analytics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <BarChart3 className="w-5 h-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Revenue Analytics
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">
                  <TrendingUp className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  +15.7%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                {revenueData.map(item => (
                  <div key={item.name} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div
                        className="w-3 h-3 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-sm font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{formatCurrency(item.value)}</span>
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          item.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {item.change > 0 ? (
                          <ArrowUpRight className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        )}
                        {Math.abs(item.change)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portal Usage */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Globe className="w-5 h-5 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Portal Usage
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Activity className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  {metrics.activePortals} Active
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                {portalUsageData.map(item => (
                  <div key={item.name} className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.name}</span>
                      <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{item.value}%</span>
                        <div
                          className={`flex items-center gap-1 text-xs ${
                            item.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {item.change > 0 ? (
                            <ArrowUpRight className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                          )}
                          {Math.abs(item.change)}%
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div
                        className="h-2 rounded-full transition-all duration-500 responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Clock className="w-5 h-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Recent Activity
                </CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                {recentActivity.map((activity, index) => {
                  const StatusIcon = getStatusIcon(activity.status);
                  const ActivityIcon = activity.icon;

                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                        <ActivityIcon className="w-4 h-4 text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center gap-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{activity.action}</p>
                          <StatusIcon
                            className={`w-4 h-4 ${getStatusColor(activity.status).split(' ')[0]}`}
                          />
                        </div>
                        <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{activity.user}</p>
                        {activity.details && (
                          <p className="text-xs text-gray-500 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{activity.details}</p>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{activity.time}</div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <AlertTriangle className="w-5 h-5 text-amber-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                {systemAlerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                  >
                    <div className="flex items-start gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{alert.title}</p>
                        <p className="text-xs text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">{alert.time}</p>
                      </div>
                      {alert.resolved && (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 responsive-container sm:flex-col md:flex-row lg:grid" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
}