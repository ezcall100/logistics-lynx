import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  Phone,
  Video,
  Calendar,
  FileText,
  CheckSquare,
  MessageSquare,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Eye,
  RefreshCw,
  Download,
  Zap,
} from 'lucide-react';

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockCommunicationData = {
  overview: {
    totalMessages: 12547,
    activeUsers: 89,
    responseTime: 2.3,
    satisfactionRate: 94.5,
    aiAssistance: 78.2,
    liveChatSessions: 156,
    emailMessages: 2341,
    phoneCalls: 89,
    videoMeetings: 45,
    calendarEvents: 234,
    tasks: 567,
    smsMessages: 1234,
    notes: 890
  },
  recentActivity: [
    {
      id: 1,
      type: 'ai_assistant',
      user: 'DEMO User',
      action: 'AI response generated',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      type: 'live_chat',
      user: 'DEMO Customer',
      action: 'Chat session started',
      timestamp: '2024-01-15T10:25:00Z',
      status: 'active'
    },
    {
      id: 3,
      type: 'email',
      user: 'DEMO Manager',
      action: 'Email sent to team',
      timestamp: '2024-01-15T10:20:00Z',
      status: 'delivered'
    },
    {
      id: 4,
      type: 'video_call',
      user: 'DEMO Admin',
      action: 'Video meeting scheduled',
      timestamp: '2024-01-15T10:15:00Z',
      status: 'scheduled'
    }
  ],
  usageStats: [
    { channel: 'AI Assistant', usage: 45, growth: 12.5, users: 89 },
    { channel: 'Live Chat', usage: 32, growth: 8.3, users: 67 },
    { channel: 'Email', usage: 28, growth: 15.2, users: 123 },
    { channel: 'Phone', usage: 18, growth: 5.7, users: 45 },
    { channel: 'Video', usage: 15, growth: 22.1, users: 34 },
    { channel: 'SMS', usage: 12, growth: 18.9, users: 56 },
    { channel: 'Calendar', usage: 8, growth: 3.2, users: 78 },
    { channel: 'Tasks', usage: 6, growth: 9.8, users: 89 },
    { channel: 'Notes', usage: 4, growth: 7.4, users: 45 }
  ],
  performanceMetrics: [
    { time: '00:00', messages: 45, responseTime: 2.1, satisfaction: 92 },
    { time: '04:00', messages: 32, responseTime: 2.3, satisfaction: 94 },
    { time: '08:00', messages: 89, responseTime: 2.5, satisfaction: 91 },
    { time: '12:00', messages: 156, responseTime: 2.8, satisfaction: 89 },
    { time: '16:00', messages: 134, responseTime: 2.2, satisfaction: 95 },
    { time: '20:00', messages: 78, responseTime: 2.0, satisfaction: 96 }
  ]
};

const CommunicationHubOverview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [refreshKey]);

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey(prev => prev + 1);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'AI Assistant': return <MessageCircle className="h-5 w-5" />;
      case 'Live Chat': return <MessageSquare className="h-5 w-5" />;
      case 'Email': return <Mail className="h-5 w-5" />;
      case 'Phone': return <Phone className="h-5 w-5" />;
      case 'Video': return <Video className="h-5 w-5" />;
      case 'SMS': return <MessageSquare className="h-5 w-5" />;
      case 'Calendar': return <Calendar className="h-5 w-5" />;
      case 'Tasks': return <CheckSquare className="h-5 w-5" />;
      case 'Notes': return <FileText className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'AI Assistant': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'Live Chat': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Email': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Phone': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'Video': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'SMS': return 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20';
      case 'Calendar': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20';
      case 'Tasks': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
      case 'Notes': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ai_assistant': return <MessageCircle className="h-4 w-4" />;
      case 'live_chat': return <MessageSquare className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'video_call': return <Video className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'ai_assistant': return 'text-purple-500 bg-purple-50 dark:bg-purple-900/20';
      case 'live_chat': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'email': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      case 'video_call': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'active': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'scheduled': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Loading Communication Hub overview...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Communication Hub Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">Monitor all communication channels and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
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
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(mockCommunicationData.overview.totalMessages)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15.2%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {mockCommunicationData.overview.activeUsers}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">Live now</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatTime(mockCommunicationData.overview.responseTime)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-12%</span>
            <span className="text-sm text-gray-500 ml-2">faster than last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formatPercentage(mockCommunicationData.overview.satisfactionRate)}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
              <Zap className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+2.1%</span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </motion.div>
      </div>

      {/* Communication Channels Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Channel Usage</h3>
          <div className="space-y-4">
            {mockCommunicationData.usageStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getChannelColor(stat.channel)}`}>
                    {getChannelIcon(stat.channel)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{stat.channel}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.users} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{formatPercentage(stat.usage)}</p>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+{formatPercentage(stat.growth)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Performance Metrics</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {mockCommunicationData.performanceMetrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col space-y-1">
                  <div
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${(metric.messages / 200) * 100}px` }}
                  ></div>
                  <div
                    className="w-8 bg-green-500"
                    style={{ height: `${(metric.responseTime / 5) * 100}px` }}
                  ></div>
                  <div
                    className="w-8 bg-purple-500 rounded-b"
                    style={{ height: `${(metric.satisfaction / 100) * 100}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{metric.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {mockCommunicationData.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {activity.user} - {activity.action}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CommunicationHubOverview;
