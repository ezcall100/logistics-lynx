import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Settings,
  Key,
  RefreshCw,
  BarChart3,
  Monitor,
  Clock,
  LineChart,
} from 'lucide-react';

/**
 * API Management - Comprehensive API Operations Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T18:30:00.000Z
 */

interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'active' | 'inactive' | 'deprecated' | 'maintenance';
  version: string;
  description: string;
  category: string;
  responseTime: number;
  successRate: number;
  requestCount: number;
  lastUsed: string;
  rateLimit: number;
  authentication: 'none' | 'api-key' | 'oauth' | 'jwt';
  documentation: string;
  tags: string[];
  environment: 'production' | 'staging' | 'development';
}

interface APIRequest {
  id: string;
  endpoint: string;
  method: string;
  status: 'success' | 'error' | 'pending';
  responseTime: number;
  timestamp: string;
  user: string;
  ipAddress: string;
  userAgent: string;
  requestSize: number;
  responseSize: number;
  statusCode: number;
  errorMessage?: string;
}

interface APIMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  lastUsed: string;
  expiresAt: string;
  usage: number;
  rateLimit: number;
  environment: string;
}

export const APIManagement: React.FC = () => {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [requests, setRequests] = useState<APIRequest[]>([]);
  const [metrics, setMetrics] = useState<APIMetric[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'endpoints' | 'requests' | 'keys' | 'monitoring'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);

  useEffect(() => {
    const mockEndpoints: APIEndpoint[] = [
      {
        id: '1',
        name: 'Get User Profile',
        path: '/api/v1/users/{id}',
        method: 'GET',
        status: 'active',
        version: 'v1.2.0',
        description: 'Retrieve user profile information by ID',
        category: 'Users',
        responseTime: 145,
        successRate: 99.8,
        requestCount: 15420,
        lastUsed: '2025-09-14T12:30:00Z',
        rateLimit: 1000,
        authentication: 'jwt',
        documentation: 'https://docs.transbotai.com/api/users',
        tags: ['users', 'profile', 'authentication'],
        environment: 'production',
      },
      {
        id: '2',
        name: 'Create Shipment',
        path: '/api/v1/shipments',
        method: 'POST',
        status: 'active',
        version: 'v1.1.0',
        description: 'Create a new shipment record',
        category: 'Shipments',
        responseTime: 234,
        successRate: 98.5,
        requestCount: 8920,
        lastUsed: '2025-09-14T12:25:00Z',
        rateLimit: 500,
        authentication: 'oauth',
        documentation: 'https://docs.transbotai.com/api/shipments',
        tags: ['shipments', 'create', 'logistics'],
        environment: 'production',
      },
      {
        id: '3',
        name: 'Update Tracking',
        path: '/api/v1/tracking/{trackingId}',
        method: 'PUT',
        status: 'active',
        version: 'v1.0.0',
        description: 'Update shipment tracking information',
        category: 'Tracking',
        responseTime: 89,
        successRate: 99.2,
        requestCount: 25680,
        lastUsed: '2025-09-14T12:28:00Z',
        rateLimit: 2000,
        authentication: 'api-key',
        documentation: 'https://docs.transbotai.com/api/tracking',
        tags: ['tracking', 'update', 'logistics'],
        environment: 'production',
      },
      {
        id: '4',
        name: 'Delete User',
        path: '/api/v1/users/{id}',
        method: 'DELETE',
        status: 'deprecated',
        version: 'v0.9.0',
        description: 'Delete user account (deprecated - use deactivate instead)',
        category: 'Users',
        responseTime: 0,
        successRate: 0,
        requestCount: 0,
        lastUsed: '2025-08-15T10:00:00Z',
        rateLimit: 100,
        authentication: 'jwt',
        documentation: 'https://docs.transbotai.com/api/users',
        tags: ['users', 'delete', 'deprecated'],
        environment: 'production',
      },
    ];

    const mockRequests: APIRequest[] = [
      {
        id: '1',
        endpoint: '/api/v1/users/123',
        method: 'GET',
        status: 'success',
        responseTime: 145,
        timestamp: '2025-09-14T12:30:00Z',
        user: 'admin@transbotai.com',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        requestSize: 256,
        responseSize: 1024,
        statusCode: 200,
      },
      {
        id: '2',
        endpoint: '/api/v1/shipments',
        method: 'POST',
        status: 'success',
        responseTime: 234,
        timestamp: '2025-09-14T12:25:00Z',
        user: 'user@transbotai.com',
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        requestSize: 512,
        responseSize: 2048,
        statusCode: 201,
      },
      {
        id: '3',
        endpoint: '/api/v1/tracking/TRK123456',
        method: 'PUT',
        status: 'error',
        responseTime: 89,
        timestamp: '2025-09-14T12:28:00Z',
        user: 'system@transbotai.com',
        ipAddress: '192.168.1.102',
        userAgent: 'TransBot-API-Client/1.0',
        requestSize: 128,
        responseSize: 256,
        statusCode: 400,
        errorMessage: 'Invalid tracking ID format',
      },
    ];

    const mockMetrics: APIMetric[] = [
      { name: 'Total Requests', value: 125000, unit: 'requests', trend: 'up', threshold: 200000, status: 'normal' },
      { name: 'Average Response Time', value: 156, unit: 'ms', trend: 'down', threshold: 500, status: 'normal' },
      { name: 'Success Rate', value: 99.2, unit: '%', trend: 'up', threshold: 95, status: 'normal' },
      { name: 'Error Rate', value: 0.8, unit: '%', trend: 'down', threshold: 5, status: 'normal' },
      { name: 'Active Endpoints', value: 45, unit: 'endpoints', trend: 'up', threshold: 100, status: 'normal' },
      { name: 'API Keys', value: 1250, unit: 'keys', trend: 'up', threshold: 5000, status: 'normal' },
    ];

    const mockApiKeys: APIKey[] = [
      {
        id: '1',
        name: 'Production API Key',
        key: 'sk_live_1234567890abcdef',
        permissions: ['read', 'write', 'admin'],
        status: 'active',
        createdAt: '2025-08-01T00:00:00Z',
        lastUsed: '2025-09-14T12:30:00Z',
        expiresAt: '2026-08-01T00:00:00Z',
        usage: 15420,
        rateLimit: 10000,
        environment: 'production',
      },
      {
        id: '2',
        name: 'Development API Key',
        key: 'sk_test_abcdef1234567890',
        permissions: ['read', 'write'],
        status: 'active',
        createdAt: '2025-09-01T00:00:00Z',
        lastUsed: '2025-09-14T11:45:00Z',
        expiresAt: '2025-12-01T00:00:00Z',
        usage: 8920,
        rateLimit: 1000,
        environment: 'development',
      },
      {
        id: '3',
        name: 'Read-Only API Key',
        key: 'sk_read_9876543210fedcba',
        permissions: ['read'],
        status: 'inactive',
        createdAt: '2025-07-01T00:00:00Z',
        lastUsed: '2025-09-10T15:30:00Z',
        expiresAt: '2025-10-01T00:00:00Z',
        usage: 25680,
        rateLimit: 5000,
        environment: 'production',
      },
    ];

    setEndpoints(mockEndpoints);
    setRequests(mockRequests);
    setMetrics(mockMetrics);
    setApiKeys(mockApiKeys);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'deprecated':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'POST':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'DELETE':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'PATCH':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // const getAuthIcon = (auth: string) => {
  //   switch (auth) {
  //     case 'jwt':
  //       return <Key className="w-4 h-4" />;
  //     case 'oauth':
  //       return <Globe className="w-4 h-4" />;
  //     case 'api-key':
  //       return <Lock className="w-4 h-4" />;
  //     default:
  //       return <Unlock className="w-4 h-4" />;
  //   }
  // };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'endpoints', label: 'Endpoints', icon: Code },
    { id: 'requests', label: 'Requests', icon: Activity },
    { id: 'keys', label: 'API Keys', icon: Key },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">API Management</h1>
            <p className="text-slate-600 dark:text-slate-400">Comprehensive API operations and monitoring center</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Endpoint</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Endpoints</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{endpoints.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {endpoints.filter(ep => ep.status === 'active').length} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.find(m => m.name === 'Total Requests')?.value.toLocaleString()}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15% this month
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.find(m => m.name === 'Success Rate')?.value}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Excellent
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">API Keys</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {apiKeys.filter(key => key.status === 'active').length}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center mt-1">
                  <Key className="w-4 h-4 mr-1" />
                  {apiKeys.length} total
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Key className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* API Endpoints Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">API Endpoints</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {endpoints.slice(0, 4).map((endpoint, index) => (
                        <motion.div
                          key={endpoint.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                          onClick={() => console.log('Endpoint clicked:', endpoint.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                                {endpoint.method}
                              </span>
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">{endpoint.name}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{endpoint.path}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                              {endpoint.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Response Time</p>
                              <p className="font-medium text-slate-900 dark:text-white">{endpoint.responseTime}ms</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Success Rate</p>
                              <p className="font-medium text-slate-900 dark:text-white">{endpoint.successRate}%</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Requests</p>
                              <p className="font-medium text-slate-900 dark:text-white">{endpoint.requestCount.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Rate Limit</p>
                              <p className="font-medium text-slate-900 dark:text-white">{endpoint.rateLimit}/hour</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{metric.name}</h4>
                            <div className="flex items-center space-x-1">
                              {metric.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : metric.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <Activity className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {metric.value.toLocaleString()} {metric.unit}
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                metric.status === 'critical' ? 'bg-red-500' :
                                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'endpoints' && (
                <motion.div
                  key="endpoints"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {endpoints.map((endpoint, index) => (
                    <motion.div
                      key={endpoint.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{endpoint.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{endpoint.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                                {endpoint.method}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {endpoint.path}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                v{endpoint.version}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                            {endpoint.status}
                          </span>
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'requests' && (
                <motion.div
                  key="requests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {requests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Request #{request.id}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {request.user} • {request.ipAddress} • {new Date(request.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            request.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {request.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                             request.status === 'error' ? <AlertTriangle className="w-4 h-4" /> :
                             <Clock className="w-4 h-4" />}
                            <span className="ml-1 capitalize">{request.status}</span>
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {request.responseTime}ms
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(request.method)}`}>
                            {request.method}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            Status: {request.statusCode}
                          </span>
                        </div>
                        <code className="text-sm text-slate-800 dark:text-slate-200 font-mono">
                          {request.endpoint}
                        </code>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>Request: {request.requestSize} bytes</span>
                        <span>Response: {request.responseSize} bytes</span>
                        <span>Duration: {request.responseTime}ms</span>
                      </div>
                      
                      {request.errorMessage && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <p className="text-sm text-red-800 dark:text-red-400">
                            <strong>Error:</strong> {request.errorMessage}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'keys' && (
                <motion.div
                  key="keys"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {apiKeys.map((key, index) => (
                    <motion.div
                      key={key.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <Key className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{key.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {key.key.substring(0, 20)}... • {key.environment}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {key.permissions.join(', ')}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {key.usage.toLocaleString()} uses
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                Limit: {key.rateLimit}/hour
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            key.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            key.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {key.status === 'active' ? <CheckCircle className="w-4 h-4" /> :
                             key.status === 'inactive' ? <Clock className="w-4 h-4" /> :
                             <AlertTriangle className="w-4 h-4" />}
                            <span className="ml-1 capitalize">{key.status}</span>
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            Expires: {new Date(key.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Real-time Monitoring Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Request Volume</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Real-time request volume chart</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Response Times</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Response time trends</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Rate Monitoring */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Error Rate by Endpoint</h3>
                    <div className="space-y-4">
                      {endpoints.map((endpoint) => (
                        <div key={endpoint.id} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{endpoint.name}</h4>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {100 - endpoint.successRate}% error rate
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-red-500"
                              style={{ width: `${100 - endpoint.successRate}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIManagement;
