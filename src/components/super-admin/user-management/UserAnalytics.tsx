import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  UserPlus,
  UserMinus,
  Activity,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  Filter,
  Search,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
} from 'lucide-react';

/**
 * User Analytics Page - Redesigned
 * Comprehensive user analytics and insights dashboard
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:20:00.000Z
 */

interface AnalyticsMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
  device: 'desktop' | 'mobile' | 'tablet';
  location: string;
  ipAddress: string;
  sessionDuration: number;
}

interface UserSegment {
  id: string;
  name: string;
  description: string;
  userCount: number;
  percentage: number;
  color: string;
  criteria: string[];
  trend: 'up' | 'down' | 'stable';
}

interface GeographicData {
  country: string;
  users: number;
  percentage: number;
  growth: number;
}

export const UserAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // Mock analytics metrics
  const analyticsMetrics: AnalyticsMetric[] = [
    {
      id: 'total-users',
      title: 'Total Users',
      value: 1247,
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      id: 'active-users',
      title: 'Active Users',
      value: 892,
      change: 8.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      id: 'new-users',
      title: 'New Users',
      value: 156,
      change: -2.1,
      changeType: 'decrease',
      period: 'vs last month',
      icon: UserPlus,
      color: 'bg-purple-500',
    },
    {
      id: 'churned-users',
      title: 'Churned Users',
      value: 23,
      change: -15.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: UserMinus,
      color: 'bg-red-500',
    },
    {
      id: 'avg-session',
      title: 'Avg Session Duration',
      value: 24.5,
      change: 5.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      id: 'retention-rate',
      title: 'Retention Rate',
      value: 78.3,
      change: 3.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: Target,
      color: 'bg-indigo-500',
    },
  ];

  // Mock data
  useEffect(() => {
    const mockActivities: UserActivity[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      userId: `user_${i + 1}`,
      userName: `User ${i + 1}`,
      action: [
        'Login',
        'Logout',
        'Profile Update',
        'Password Change',
        'Data Export',
        'Settings Change',
      ][Math.floor(Math.random() * 6)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)] as
        | 'desktop'
        | 'mobile'
        | 'tablet',
      location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'][
        Math.floor(Math.random() * 5)
      ],
      ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
      sessionDuration: Math.floor(Math.random() * 120) + 5,
    }));

    const mockSegments: UserSegment[] = [
      {
        id: '1',
        name: 'Power Users',
        description: 'Users with high engagement and frequent activity',
        userCount: 234,
        percentage: 18.8,
        color: 'bg-blue-500',
        criteria: ['>10 sessions/week', '>2 hours/day', 'Premium features'],
        trend: 'up',
      },
      {
        id: '2',
        name: 'Regular Users',
        description: 'Users with consistent but moderate usage',
        userCount: 567,
        percentage: 45.5,
        color: 'bg-green-500',
        criteria: ['3-10 sessions/week', '30min-2hrs/day', 'Core features'],
        trend: 'stable',
      },
      {
        id: '3',
        name: 'Casual Users',
        description: 'Users with occasional usage patterns',
        userCount: 312,
        percentage: 25.0,
        color: 'bg-yellow-500',
        criteria: ['1-3 sessions/week', '<30min/day', 'Basic features'],
        trend: 'down',
      },
      {
        id: '4',
        name: 'At-Risk Users',
        description: 'Users showing signs of potential churn',
        userCount: 134,
        percentage: 10.7,
        color: 'bg-red-500',
        criteria: ['<1 session/week', 'Declining activity', 'No recent login'],
        trend: 'down',
      },
    ];

    const mockGeographicData: GeographicData[] = [
      { country: 'United States', users: 456, percentage: 36.6, growth: 8.2 },
      { country: 'Canada', users: 234, percentage: 18.8, growth: 12.1 },
      { country: 'United Kingdom', users: 189, percentage: 15.2, growth: 5.7 },
      { country: 'Germany', users: 156, percentage: 12.5, growth: -2.3 },
      { country: 'Australia', users: 98, percentage: 7.9, growth: 15.4 },
      { country: 'France', users: 67, percentage: 5.4, growth: 3.8 },
      { country: 'Japan', users: 45, percentage: 3.6, growth: -1.2 },
    ];

    setUserActivities(mockActivities);
    setUserSegments(mockSegments);
    setGeographicData(mockGeographicData);
  }, []);

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const getDeviceColor = (device: string) => {
    switch (device) {
      case 'desktop':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'mobile':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'tablet':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const periods = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: '1y', label: 'Last year' },
  ];

  const metrics = [
    { id: 'overview', label: 'Overview' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'retention', label: 'Retention' },
    { id: 'geographic', label: 'Geographic' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                User Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive insights into user behavior, engagement, and growth metrics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Period and Metric Selectors */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Period:</span>
              <div className="flex items-center space-x-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-lg p-1">
                {periods.map(period => (
                  <button
                    key={period.id}
                    onClick={() => setSelectedPeriod(period.id)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      selectedPeriod === period.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View:</span>
              <div className="flex items-center space-x-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-lg p-1">
                {metrics.map(metric => (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      selectedMetric === metric.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {analyticsMetrics.map(metric => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                    <Icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {metric.changeType === 'increase' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : metric.changeType === 'decrease' ? (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    ) : (
                      <Activity className="w-4 h-4 text-gray-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        metric.changeType === 'increase'
                          ? 'text-green-600 dark:text-green-400'
                          : metric.changeType === 'decrease'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value.toLocaleString()}
                  {metric.id === 'avg-session' && 'm'}
                  {metric.id === 'retention-rate' && '%'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{metric.period}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Segments */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    User Segments
                  </h3>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {userSegments.map(segment => (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${segment.color}`}></div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {segment.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {segment.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {segment.userCount} users
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {segment.percentage}%
                          </div>
                        </div>
                        {getTrendIcon(segment.trend)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Geographic Distribution
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {geographicData.slice(0, 5).map((country, index) => (
                    <motion.div
                      key={country.country}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-900 dark:text-white">
                          {country.country}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {country.users}
                        </span>
                        <span
                          className={`text-xs ${country.growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                        >
                          {country.growth > 0 ? '+' : ''}
                          {country.growth}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent User Activity
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {userActivities.slice(0, 10).map(activity => {
                  const DeviceIcon = getDeviceIcon(activity.device);
                  return (
                    <motion.tr
                      key={activity.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.userName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {activity.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDeviceColor(activity.device)}`}
                        >
                          <DeviceIcon className="w-3 h-3 mr-1" />
                          {activity.device}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {activity.location}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.ipAddress}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {activity.sessionDuration}m
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
