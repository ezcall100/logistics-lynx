import React, { useState } from 'react';
import {
  Monitor,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Server,
  RefreshCw,
  Bell,
  Eye,
} from 'lucide-react';

/**
 * API Monitoring Page - Comprehensive API monitoring and alerting
 * Created by MCP 302 Agents
 * Features: Real-time monitoring, alerts, and performance tracking
 */

const APIMonitoring: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1h');
  const [alerts] = useState([
    {
      id: '1',
      type: 'error',
      message: 'High error rate detected on /api/v1/payments',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      severity: 'high',
      status: 'active',
    },
    {
      id: '2',
      type: 'performance',
      message: 'Response time exceeded threshold for /api/v1/users',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: 'medium',
      status: 'resolved',
    },
    {
      id: '3',
      type: 'availability',
      message: 'Service availability dropped below 99.9%',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      severity: 'critical',
      status: 'active',
    },
  ]);

  const metrics = {
    availability: 99.95,
    responseTime: 245,
    errorRate: 0.5,
    throughput: 1250,
    activeConnections: 892,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Monitor className="w-8 h-8 text-cyan-500 mr-3" />
            API Monitoring
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time monitoring, alerts, and performance tracking
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="1h">Last hour</option>
            <option value="6h">Last 6 hours</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </select>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Availability</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.availability}%
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+0.1%</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.responseTime}ms
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Error Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.errorRate}%
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">+0.2%</span>
              </div>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Throughput</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.throughput}/s
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.activeConnections}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3%</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Server className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Alerts</h3>
          <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 text-sm">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {alerts.filter(alert => alert.status === 'active').map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  alert.severity === 'critical' ? 'bg-red-100 dark:bg-red-900' :
                  alert.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900' :
                  'bg-yellow-100 dark:bg-yellow-900'
                }`}>
                  <Bell className={`w-4 h-4 ${
                    alert.severity === 'critical' ? 'text-red-600 dark:text-red-400' :
                    alert.severity === 'high' ? 'text-orange-600 dark:text-orange-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{alert.message}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {alert.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  alert.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {alert.severity}
                </span>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response Time Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="bg-blue-500 rounded-t w-full mb-2"
                  style={{ height: `${Math.random() * 200 + 50}px` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {i.toString().padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Error Rate Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-1">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div
                  className="bg-red-500 rounded-t w-full mb-2"
                  style={{ height: `${Math.random() * 100 + 10}px` }}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {i.toString().padStart(2, '0')}:00
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIMonitoring;
