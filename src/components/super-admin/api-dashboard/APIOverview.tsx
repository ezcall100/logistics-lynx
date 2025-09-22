import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Server,
  Key,
  Activity,
  TrendingUp,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Copy,
  Settings,
  LineChart,
  BarChart,
} from 'lucide-react';

/**
 * API Overview Page - Comprehensive API Management Dashboard
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T16:30:00.000Z
 * Features: Real-time API monitoring, endpoint management, analytics, and performance tracking
 */

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: 'active' | 'inactive' | 'deprecated' | 'maintenance';
  responseTime: number;
  successRate: number;
  requestCount: number;
  lastUsed: string;
  version: string;
  category: string;
  description: string;
  rateLimit: number;
  authentication: 'none' | 'api-key' | 'oauth' | 'jwt';
  tags: string[];
}

interface APIMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  color: string;
  icon: any;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  permissions: string[];
  usage: number;
  limit: number;
  createdAt: string;
  expiresAt: string;
  lastUsed: string;
}

const APIOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'endpoints' | 'keys' | 'analytics'>('overview');
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [metrics, setMetrics] = useState<APIMetric[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);

  // Mock data initialization
  useEffect(() => {
    const mockEndpoints: APIEndpoint[] = [
      {
        id: '1',
        name: 'User Authentication',
        method: 'POST',
        path: '/api/v1/auth/login',
        status: 'active',
        responseTime: 120,
        successRate: 99.8,
        requestCount: 15420,
        lastUsed: '2025-01-20T15:45:00Z',
        version: 'v1.2.0',
        category: 'Authentication',
        description: 'User login and authentication endpoint',
        rateLimit: 1000,
        authentication: 'none',
        tags: ['auth', 'login', 'security']
      },
      {
        id: '2',
        name: 'Get User Profile',
        method: 'GET',
        path: '/api/v1/users/{id}',
        status: 'active',
        responseTime: 85,
        successRate: 99.9,
        requestCount: 8920,
        lastUsed: '2025-01-20T15:44:00Z',
        version: 'v1.2.0',
        category: 'Users',
        description: 'Retrieve user profile information',
        rateLimit: 5000,
        authentication: 'jwt',
        tags: ['users', 'profile', 'data']
      },
      {
        id: '3',
        name: 'Create Order',
        method: 'POST',
        path: '/api/v1/orders',
        status: 'active',
        responseTime: 200,
        successRate: 98.5,
        requestCount: 3240,
        lastUsed: '2025-01-20T15:43:00Z',
        version: 'v1.1.0',
        category: 'Orders',
        description: 'Create a new order',
        rateLimit: 2000,
        authentication: 'jwt',
        tags: ['orders', 'create', 'business']
      },
      {
        id: '4',
        name: 'Update Product',
        method: 'PUT',
        path: '/api/v1/products/{id}',
        status: 'maintenance',
        responseTime: 0,
        successRate: 0,
        requestCount: 0,
        lastUsed: '2025-01-20T10:00:00Z',
        version: 'v1.0.0',
        category: 'Products',
        description: 'Update product information',
        rateLimit: 1000,
        authentication: 'api-key',
        tags: ['products', 'update', 'inventory']
      },
      {
        id: '5',
        name: 'Delete User',
        method: 'DELETE',
        path: '/api/v1/users/{id}',
        status: 'deprecated',
        responseTime: 0,
        successRate: 0,
        requestCount: 0,
        lastUsed: '2025-01-15T12:00:00Z',
        version: 'v0.9.0',
        category: 'Users',
        description: 'Delete user account (deprecated)',
        rateLimit: 100,
        authentication: 'oauth',
        tags: ['users', 'delete', 'deprecated']
      }
    ];

    const mockApiKeys: APIKey[] = [
      {
        id: '1',
        name: 'Production API Key',
        key: 'sk-prod-...a1b2c3d4',
        status: 'active',
        permissions: ['read', 'write', 'admin'],
        usage: 15420,
        limit: 100000,
        createdAt: '2025-01-01T00:00:00Z',
        expiresAt: '2025-12-31T23:59:59Z',
        lastUsed: '2025-01-20T15:45:00Z'
      },
      {
        id: '2',
        name: 'Development API Key',
        key: 'sk-dev-...e5f6g7h8',
        status: 'active',
        permissions: ['read', 'write'],
        usage: 3240,
        limit: 10000,
        createdAt: '2025-01-01T00:00:00Z',
        expiresAt: '2025-12-31T23:59:59Z',
        lastUsed: '2025-01-20T15:30:00Z'
      },
      {
        id: '3',
        name: 'Testing API Key',
        key: 'sk-test-...i9j0k1l2',
        status: 'inactive',
        permissions: ['read'],
        usage: 0,
        limit: 1000,
        createdAt: '2025-01-01T00:00:00Z',
        expiresAt: '2025-12-31T23:59:59Z',
        lastUsed: '2025-01-19T10:00:00Z'
      }
    ];

    const mockMetrics: APIMetric[] = [
      {
        id: '1',
        name: 'Total Requests',
        value: 125420,
        change: 12.5,
        trend: 'up',
        unit: 'requests',
        color: 'text-blue-600',
        icon: Activity
      },
      {
        id: '2',
        name: 'Success Rate',
        value: 99.2,
        change: 0.3,
        trend: 'up',
        unit: '%',
        color: 'text-green-600',
        icon: CheckCircle
      },
      {
        id: '3',
        name: 'Avg Response Time',
        value: 145,
        change: -8.2,
        trend: 'down',
        unit: 'ms',
        color: 'text-purple-600',
        icon: Clock
      },
      {
        id: '4',
        name: 'Active Endpoints',
        value: 24,
        change: 2,
        trend: 'up',
        unit: 'endpoints',
        color: 'text-orange-600',
        icon: Server
      }
    ];

    setEndpoints(mockEndpoints);
    setApiKeys(mockApiKeys);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'deprecated': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'POST': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'PATCH': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || endpoint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleBulkAction = (action: string) => {
    if (selectedEndpoints.length === 0) {
      alert('Please select endpoints to perform bulk actions');
      return;
    }
    
    console.log(`Bulk action: ${action} on endpoints:`, selectedEndpoints);
    // Implement bulk actions here
  };

  const handleEndpointAction = (endpointId: string, action: string) => {
    console.log(`Action: ${action} on endpoint: ${endpointId}`);
    // Implement individual endpoint actions here
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Code className="w-8 h-8 text-cyan-500 mr-3" />
                API Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Comprehensive API management and monitoring
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Endpoint
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value.toLocaleString()}{metric.unit}
                  </p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                      {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} {Math.abs(metric.change)}%
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric.color.replace('text-', 'bg-').replace('-600', '-100')} dark:bg-opacity-20`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart },
                { id: 'endpoints', label: 'Endpoints', icon: Server },
                { id: 'keys', label: 'API Keys', icon: Key },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {[
                          { action: 'New endpoint created', endpoint: '/api/v1/notifications', time: '2 minutes ago' },
                          { action: 'API key regenerated', endpoint: 'Production Key', time: '15 minutes ago' },
                          { action: 'Rate limit updated', endpoint: '/api/v1/users', time: '1 hour ago' },
                          { action: 'Endpoint deprecated', endpoint: '/api/v1/legacy', time: '2 hours ago' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.endpoint}</p>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top Endpoints */}
                    <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Endpoints</h3>
                      <div className="space-y-3">
                        {endpoints.slice(0, 5).map((endpoint) => (
                          <div key={endpoint.id} className="flex items-center justify-between py-2">
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{endpoint.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{endpoint.path}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{endpoint.requestCount.toLocaleString()}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">requests</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'endpoints' && (
                <motion.div
                  key="endpoints"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Search and Filters */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search endpoints..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="deprecated">Deprecated</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedEndpoints.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedEndpoints.length} selected
                          </span>
                          <button
                            onClick={() => handleBulkAction('activate')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Activate
                          </button>
                          <button
                            onClick={() => handleBulkAction('deactivate')}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                          >
                            Deactivate
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Endpoints Table */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                        <thead className="bg-gray-50 dark:bg-slate-700">
                          <tr>
                            <th className="px-6 py-3 text-left">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedEndpoints(filteredEndpoints.map(ep => ep.id));
                                  } else {
                                    setSelectedEndpoints([]);
                                  }
                                }}
                              />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Endpoint
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Method
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Response Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Success Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Requests
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                          {filteredEndpoints.map((endpoint) => (
                            <tr key={endpoint.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                  checked={selectedEndpoints.includes(endpoint.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedEndpoints([...selectedEndpoints, endpoint.id]);
                                    } else {
                                      setSelectedEndpoints(selectedEndpoints.filter(id => id !== endpoint.id));
                                    }
                                  }}
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {endpoint.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {endpoint.path}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
                                  {endpoint.method}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(endpoint.status)}`}>
                                  {endpoint.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {endpoint.responseTime}ms
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {endpoint.successRate}%
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                {endpoint.requestCount.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleEndpointAction(endpoint.id, 'view')}
                                    className="text-cyan-600 hover:text-cyan-900 dark:text-cyan-400 dark:hover:text-cyan-300"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleEndpointAction(endpoint.id, 'edit')}
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleEndpointAction(endpoint.id, 'delete')}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'keys' && (
                <motion.div
                  key="keys"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h3>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate New Key
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {apiKeys.map((key) => (
                      <div key={key.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{key.name}</h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(key.status)}`}>
                            {key.status}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">API Key</p>
                            <p className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
                              {key.key}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Usage</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {key.usage.toLocaleString()} / {key.limit.toLocaleString()}
                              </span>
                              <div className="w-20 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                                <div 
                                  className="bg-cyan-600 h-2 rounded-full" 
                                  style={{ width: `${(key.usage / key.limit) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Permissions</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {key.permissions.map((permission) => (
                                <span key={permission} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                            <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 text-sm">
                              <Copy className="w-4 h-4 inline mr-1" />
                              Copy
                            </button>
                            <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm">
                              <Trash2 className="w-4 h-4 inline mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Request Trends</h3>
                      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <BarChart className="w-12 h-12 mx-auto mb-2" />
                          <p>Request trends chart will be displayed here</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response Time Distribution</h3>
                      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <LineChart className="w-12 h-12 mx-auto mb-2" />
                          <p>Response time distribution chart will be displayed here</p>
                        </div>
                      </div>
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

export default APIOverview;
