import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Users,
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Download,
  Filter,
  RefreshCw,
} from 'lucide-react';

/**
 * API Analytics Page - Comprehensive analytics and insights
 * Created by MCP 302 Agents
 * Features: Usage analytics, performance metrics, and insights
 */

const APIAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('requests');

  const analyticsData = {
    totalRequests: 2847392,
    totalUsers: 15420,
    avgResponseTime: 245,
    successRate: 98.5,
    errorRate: 1.5,
    topEndpoints: [
      { name: '/api/v1/users', requests: 892340, growth: 12.5 },
      { name: '/api/v1/auth/login', requests: 456230, growth: -2.3 },
      { name: '/api/v1/orders', requests: 234120, growth: 8.7 },
      { name: '/api/v1/products', requests: 189450, growth: 15.2 },
      { name: '/api/v1/payments', requests: 156780, growth: 5.4 },
    ],
    hourlyData: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      requests: Math.floor(Math.random() * 10000) + 5000,
      errors: Math.floor(Math.random() * 100) + 10,
    })),
    dailyData: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      requests: Math.floor(Math.random() * 100000) + 50000,
      users: Math.floor(Math.random() * 1000) + 500,
      responseTime: Math.floor(Math.random() * 200) + 150,
    })),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="w-8 h-8 text-cyan-500 mr-3" />
            API Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive analytics and insights for your API usage
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.totalRequests.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Activity className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.avgResponseTime}ms
              </p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">-5.2%</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.successRate}%
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+0.3%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Volume Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Request Volume</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Requests</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-1">
            {analyticsData.hourlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-cyan-500 rounded-t w-full mb-2"
                  style={{ height: `${(data.requests / 15000) * 200}px` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {data.hour.toString().padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Response Time Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Response Time</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">ms</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-1">
            {analyticsData.dailyData.slice(-7).map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="bg-blue-500 rounded-t w-full mb-2"
                  style={{ height: `${(data.responseTime / 400) * 200}px` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Day {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Endpoints */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Endpoints</h3>
          <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 text-sm">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {analyticsData.topEndpoints.map((endpoint, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white font-mono">
                    {endpoint.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {endpoint.requests.toLocaleString()} requests
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`flex items-center ${endpoint.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {endpoint.growth > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  <span className="text-sm font-medium">
                    {endpoint.growth > 0 ? '+' : ''}{endpoint.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Geographic Distribution</h3>
          <Globe className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { country: 'United States', requests: 1247392, percentage: 43.8 },
            { country: 'United Kingdom', requests: 456230, percentage: 16.0 },
            { country: 'Germany', requests: 234120, percentage: 8.2 },
            { country: 'France', requests: 189450, percentage: 6.7 },
            { country: 'Canada', requests: 156780, percentage: 5.5 },
            { country: 'Australia', requests: 123450, percentage: 4.3 },
          ].map((country, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">{country.country}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{country.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                <div
                  className="bg-cyan-500 h-2 rounded-full"
                  style={{ width: `${country.percentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {country.requests.toLocaleString()} requests
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIAnalytics;
