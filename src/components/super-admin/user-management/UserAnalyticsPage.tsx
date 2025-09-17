import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Clock,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Eye,
  MousePointer,
  Download,
  RefreshCw,
  Settings,
  Target,
} from 'lucide-react';

/**
 * User Analytics Page - Beautiful Charts & Insights Dashboard
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T18:10:00.000Z
 */

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
}

interface UserActivity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  device: string;
  location: string;
  duration: number;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

export const UserAnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [selectedMetric, setSelectedMetric] = useState<AnalyticsMetric | null>(null);

  useEffect(() => {
    const mockMetrics: AnalyticsMetric[] = [
      {
        id: '1',
        name: 'Total Users',
        value: 1250,
        change: 12.5,
        changeType: 'increase',
        icon: 'users',
        color: 'blue',
      },
      {
        id: '2',
        name: 'Active Users',
        value: 980,
        change: 8.2,
        changeType: 'increase',
        icon: 'activity',
        color: 'green',
      },
      {
        id: '3',
        name: 'New Signups',
        value: 45,
        change: -2.1,
        changeType: 'decrease',
        icon: 'user-plus',
        color: 'purple',
      },
      {
        id: '4',
        name: 'Session Duration',
        value: 24.5,
        change: 15.3,
        changeType: 'increase',
        icon: 'clock',
        color: 'orange',
      },
      {
        id: '5',
        name: 'Page Views',
        value: 15680,
        change: 22.7,
        changeType: 'increase',
        icon: 'eye',
        color: 'cyan',
      },
      {
        id: '6',
        name: 'Bounce Rate',
        value: 32.1,
        change: -5.2,
        changeType: 'decrease',
        icon: 'mouse-pointer',
        color: 'red',
      },
    ];

    const mockActivities: UserActivity[] = [
      {
        id: '1',
        user: 'John Smith',
        action: 'Logged in',
        timestamp: '2025-09-14T12:30:00Z',
        device: 'Desktop',
        location: 'New York, NY',
        duration: 0,
      },
      {
        id: '2',
        user: 'Sarah Johnson',
        action: 'Viewed dashboard',
        timestamp: '2025-09-14T12:25:00Z',
        device: 'Mobile',
        location: 'Los Angeles, CA',
        duration: 45,
      },
      {
        id: '3',
        user: 'Mike Wilson',
        action: 'Updated profile',
        timestamp: '2025-09-14T12:20:00Z',
        device: 'Tablet',
        location: 'Chicago, IL',
        duration: 120,
      },
      {
        id: '4',
        user: 'Emily Davis',
        action: 'Downloaded report',
        timestamp: '2025-09-14T12:15:00Z',
        device: 'Desktop',
        location: 'Miami, FL',
        duration: 30,
      },
    ];

    setMetrics(mockMetrics);
    setActivities(mockActivities);
  }, []);

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'users': return <Users className="w-5 h-5 responsive-container" />;
      case 'activity': return <Activity className="w-5 h-5 responsive-container" />;
      case 'user-plus': return <Users className="w-5 h-5 responsive-container" />;
      case 'clock': return <Clock className="w-5 h-5 responsive-container" />;
      case 'eye': return <Eye className="w-5 h-5 responsive-container" />;
      case 'mouse-pointer': return <MousePointer className="w-5 h-5 responsive-container" />;
      default: return <BarChart3 className="w-5 h-5 responsive-container" />;
    }
  };

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'purple': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'orange': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'cyan': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400';
      case 'red': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop': return <Monitor className="w-4 h-4 responsive-container" />;
      case 'Mobile': return <Smartphone className="w-4 h-4 responsive-container" />;
      case 'Tablet': return <Monitor className="w-4 h-4 responsive-container" />;
      default: return <Globe className="w-4 h-4 responsive-container" />;
    }
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? 
      <TrendingUp className="w-4 h-4 responsive-container" /> : 
      <TrendingDown className="w-4 h-4 responsive-container" />;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 
      'text-green-600 dark:text-green-400' : 
      'text-red-600 dark:text-red-400';
  };

  // Mock chart data
  const userGrowthData: ChartData[] = [
    { label: 'Jan', value: 1200, color: 'bg-blue-500' },
    { label: 'Feb', value: 1350, color: 'bg-blue-500' },
    { label: 'Mar', value: 1180, color: 'bg-blue-500' },
    { label: 'Apr', value: 1420, color: 'bg-blue-500' },
    { label: 'May', value: 1580, color: 'bg-blue-500' },
    { label: 'Jun', value: 1250, color: 'bg-blue-500' },
  ];

  const deviceUsageData: ChartData[] = [
    { label: 'Desktop', value: 45, color: 'bg-blue-500' },
    { label: 'Mobile', value: 35, color: 'bg-green-500' },
    { label: 'Tablet', value: 20, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container">
          <div className="flex-1 responsive-container">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">User Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400 responsive-container">Comprehensive insights into user behavior and engagement</p>
          </div>
          
          <div className="flex gap-3 responsive-container">
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl responsive-container"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <RefreshCw className="w-4 h-4 responsive-container" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Download className="w-4 h-4 responsive-container" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 responsive-container">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                selectedMetric?.id === metric.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMetric(metric)}
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <div className={`p-3 rounded-xl ${getMetricColor(metric.color)}`}>
                  {getMetricIcon(metric.icon)}
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                  {getChangeIcon(metric.changeType)}
                  <span className="text-sm font-medium responsive-container">{Math.abs(metric.change)}%</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 responsive-container">
                  {metric.value.toLocaleString()}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">{metric.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 responsive-container">
          {/* User Growth Chart */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container">
            <div className="flex items-center justify-between mb-6 responsive-container">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white responsive-container">User Growth</h3>
              <div className="flex items-center space-x-2 responsive-container">
                <TrendingUp className="w-4 h-4 text-green-500 responsive-container" />
                <span className="text-sm text-green-600 dark:text-green-400 responsive-container">+12.5%</span>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-2 responsive-container">
              {userGrowthData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 responsive-container">
                  <div 
                    className={`w-8 ${data.color} rounded-t-lg transition-all duration-300 hover:opacity-80`}
                    style={{ height: `${(data.value / 1600) * 200}px` }}
                  ></div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{data.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage Chart */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container">
            <div className="flex items-center justify-between mb-6 responsive-container">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white responsive-container">Device Usage</h3>
              <div className="flex items-center space-x-2 responsive-container">
                <Globe className="w-4 h-4 text-blue-500 responsive-container" />
                <span className="text-sm text-blue-600 dark:text-blue-400 responsive-container">This month</span>
              </div>
            </div>
            
            <div className="space-y-4 responsive-container">
              {deviceUsageData.map((data, index) => (
                <div key={index} className="flex items-center justify-between responsive-container">
                  <div className="flex items-center space-x-3 responsive-container">
                    <div className={`w-4 h-4 rounded ${data.color}`}></div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">{data.label}</span>
                  </div>
                  <div className="flex items-center space-x-2 responsive-container">
                    <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                      <div 
                        className={`h-2 rounded-full ${data.color} transition-all duration-300`}
                        style={{ width: `${data.value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 w-8 responsive-container">{data.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container">
          <div className="flex items-center justify-between mb-6 responsive-container">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white responsive-container">Recent User Activity</h3>
            <button className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 responsive-container" aria-label="Button">
              View All
            </button>
          </div>
          
          <div className="space-y-4 responsive-container">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
              >
                <div className="flex items-center space-x-4 responsive-container">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg responsive-container">
                    <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400 responsive-container" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container">{activity.user}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{activity.action}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 responsive-container">
                  <div className="flex items-center space-x-1 responsive-container">
                    {getDeviceIcon(activity.device)}
                    <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{activity.device}</span>
                  </div>
                  <div className="flex items-center space-x-1 responsive-container">
                    <MapPin className="w-3 h-3 text-slate-400 responsive-container" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{activity.location}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Metric Details Panel */}
        {selectedMetric && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between mb-6 responsive-container">
              <div className="flex items-center space-x-4 responsive-container">
                <div className={`p-4 rounded-xl ${getMetricColor(selectedMetric.color)}`}>
                  {getMetricIcon(selectedMetric.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">{selectedMetric.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 responsive-container">Detailed analytics and insights</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container">
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
                  <Settings className="w-4 h-4 responsive-container" />
                  <span>Configure</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
                  <Download className="w-4 h-4 responsive-container" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 responsive-container">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">Current Value</h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">
                  {selectedMetric.value.toLocaleString()}
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor(selectedMetric.changeType)}`}>
                  {getChangeIcon(selectedMetric.changeType)}
                  <span className="text-sm font-medium responsive-container">{Math.abs(selectedMetric.change)}% from last period</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">Trend Analysis</h3>
                <div className="space-y-3 responsive-container">
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">7-day average</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                      {(selectedMetric.value * 0.95).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">30-day average</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                      {(selectedMetric.value * 0.88).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Peak value</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                      {(selectedMetric.value * 1.15).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">Insights</h3>
                <div className="space-y-3 responsive-container">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 responsive-container" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-400 responsive-container">Positive trend</span>
                    </div>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 responsive-container">
                      This metric is showing consistent growth over the selected period.
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
                      <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 responsive-container" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400 responsive-container">Above target</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 responsive-container">
                      Current performance exceeds the monthly target by 15%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAnalyticsPage;
