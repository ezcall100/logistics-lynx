import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  UserCheck,
  UserX,
  AlertTriangle,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Eye,
  Target,
  Award,
  Zap,
} from 'lucide-react';

interface UserAnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  userGrowth: number;
  engagementRate: number;
  averageSessionTime: number;
  topRoles: Array<{ role: string; count: number; percentage: number }>;
  userActivity: Array<{ date: string; activeUsers: number; newUsers: number }>;
  companyDistribution: Array<{ company: string; users: number; percentage: number }>;
  loginTrends: Array<{ hour: number; logins: number }>;
  featureUsage: Array<{ feature: string; users: number; percentage: number }>;
}

interface TimeRange {
  label: string;
  value: string;
  days: number;
}

const UserAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<UserAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const timeRanges: TimeRange[] = [
    { label: 'Last 7 days', value: '7d', days: 7 },
    { label: 'Last 30 days', value: '30d', days: 30 },
    { label: 'Last 90 days', value: '90d', days: 90 },
    { label: 'Last year', value: '1y', days: 365 },
  ];

  // Mock analytics data
  const mockAnalytics: UserAnalytics = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 156,
    inactiveUsers: 199,
    userGrowth: 12.5,
    engagementRate: 78.3,
    averageSessionTime: 24.5,
    topRoles: [
      { role: 'User', count: 456, percentage: 36.6 },
      { role: 'Manager', count: 234, percentage: 18.8 },
      { role: 'Admin', count: 123, percentage: 9.9 },
      { role: 'Viewer', count: 345, percentage: 27.7 },
      { role: 'Super Admin', count: 89, percentage: 7.1 },
    ],
    userActivity: [
      { date: '2024-01-01', activeUsers: 234, newUsers: 12 },
      { date: '2024-01-02', activeUsers: 267, newUsers: 8 },
      { date: '2024-01-03', activeUsers: 289, newUsers: 15 },
      { date: '2024-01-04', activeUsers: 312, newUsers: 22 },
      { date: '2024-01-05', activeUsers: 298, newUsers: 18 },
      { date: '2024-01-06', activeUsers: 334, newUsers: 25 },
      { date: '2024-01-07', activeUsers: 356, newUsers: 19 },
    ],
    companyDistribution: [
      { company: 'TechCorp', users: 456, percentage: 36.6 },
      { company: 'LogisticsCorp', users: 234, percentage: 18.8 },
      { company: 'FinanceCorp', users: 189, percentage: 15.2 },
      { company: 'RetailCorp', users: 156, percentage: 12.5 },
      { company: 'Other', users: 212, percentage: 17.0 },
    ],
    loginTrends: [
      { hour: 0, logins: 12 },
      { hour: 1, logins: 8 },
      { hour: 2, logins: 5 },
      { hour: 3, logins: 3 },
      { hour: 4, logins: 4 },
      { hour: 5, logins: 7 },
      { hour: 6, logins: 15 },
      { hour: 7, logins: 34 },
      { hour: 8, logins: 67 },
      { hour: 9, logins: 89 },
      { hour: 10, logins: 78 },
      { hour: 11, logins: 65 },
      { hour: 12, logins: 45 },
      { hour: 13, logins: 52 },
      { hour: 14, logins: 68 },
      { hour: 15, logins: 72 },
      { hour: 16, logins: 58 },
      { hour: 17, logins: 43 },
      { hour: 18, logins: 28 },
      { hour: 19, logins: 19 },
      { hour: 20, logins: 15 },
      { hour: 21, logins: 12 },
      { hour: 22, logins: 9 },
      { hour: 23, logins: 7 },
    ],
    featureUsage: [
      { feature: 'Dashboard', users: 892, percentage: 71.5 },
      { feature: 'User Management', users: 456, percentage: 36.6 },
      { feature: 'Analytics', users: 234, percentage: 18.8 },
      { feature: 'Reports', users: 189, percentage: 15.2 },
      { feature: 'Settings', users: 156, percentage: 12.5 },
      { feature: 'API Access', users: 89, percentage: 7.1 },
    ],
  };

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [selectedTimeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return TrendingUp;
    if (growth < 0) return TrendingDown;
    return Activity;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive user behavior and engagement insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            onClick={fetchAnalytics}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className={`text-sm font-medium ${getGrowthColor(analytics.userGrowth)}`}>
              {analytics.userGrowth > 0 ? '+' : ''}{analytics.userGrowth}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">vs last period</span>
        </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {analytics.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-medium text-green-600">
              {((analytics.activeUsers / analytics.totalUsers) * 100).toFixed(1)}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">of total users</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {analytics.newUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">New Users</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-medium text-blue-600">
              This {timeRanges.find(r => r.value === selectedTimeRange)?.label.toLowerCase()}
            </span>
        </div>
        </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {analytics.engagementRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Engagement Rate</div>
                  </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-medium text-purple-600">
              {analytics.averageSessionTime}min avg
            </span>
                </div>
              </motion.div>
        </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              User Activity
                  </h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
              </div>
                <div className="space-y-4">
            {analytics.userActivity.slice(-7).map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {day.activeUsers}
                          </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">Active</div>
                          </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">
                      {day.newUsers}
                        </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">New</div>
                      </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Role Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Role Distribution
                </h3>
            <PieChart className="h-5 w-5 text-gray-400" />
              </div>
          <div className="space-y-4">
            {analytics.topRoles.map((role, index) => (
              <div key={role.role} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {role.role}
                        </span>
                      </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-orange-500' : 'bg-gray-500'
                      }`}
                      style={{ width: `${role.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {role.percentage}%
                        </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Company Distribution
              </h3>
            <Award className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analytics.companyDistribution.map((company, index) => (
              <div key={company.company} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                    {company.company.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {company.company}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {company.users} users
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {company.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Feature Usage
            </h3>
            <Activity className="h-5 w-5 text-gray-400" />
                        </div>
          <div className="space-y-4">
            {analytics.featureUsage.map((feature, index) => (
              <div key={feature.feature} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {feature.feature}
                        </span>
                        </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${feature.percentage}%` }}
                    ></div>
                        </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {feature.percentage}%
                        </span>
                        </div>
                        </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAnalytics;