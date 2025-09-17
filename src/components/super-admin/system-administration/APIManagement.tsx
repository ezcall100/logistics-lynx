import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Key,
  Eye,
  EyeOff,
  Plus,
  Edit,
  Trash2,
  Copy,
  RefreshCw,
  Download,
  Settings,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  X,
  Play,
  Pause,
  BarChart3,
  Search,
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  permissions: string[];
  rateLimit: {
    requests: number;
    period: string;
  };
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastUsed: string;
  usageCount: number;
  expiresAt?: string;
}

interface APIEndpoint {
  id: string;
  path: string;
  method: string;
  description: string;
  version: string;
  status: 'active' | 'deprecated' | 'maintenance';
  rateLimit: {
    requests: number;
    period: string;
  };
  responseTime: number;
  successRate: number;
  callCount: number;
  lastCalled: string;
}

interface APILog {
  id: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  apiKey: string;
  requestSize: number;
  responseSize: number;
  error?: string;
}

const APIManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [logs, setLogs] = useState<APILog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('keys');
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const [newKey, setNewKey] = useState<Partial<APIKey>>({
    name: '',
    permissions: [],
    rateLimit: { requests: 1000, period: 'hour' },
    status: 'active',
  });


  // Mock data
  const mockApiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Web Application Key',
      key: 'ak_live_1234567890abcdef',
      secret: 'sk_live_abcdef1234567890',
      permissions: ['read:users', 'write:orders', 'read:analytics'],
      rateLimit: { requests: 1000, period: 'hour' },
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      lastUsed: '2024-01-15T10:30:00Z',
      usageCount: 15420,
      expiresAt: '2024-12-31T23:59:59Z',
    },
    {
      id: '2',
      name: 'Mobile App Key',
      key: 'ak_live_mobile123456789',
      secret: 'sk_live_mobile987654321',
      permissions: ['read:users', 'read:orders'],
      rateLimit: { requests: 500, period: 'hour' },
      status: 'active',
      createdAt: '2024-01-05T00:00:00Z',
      lastUsed: '2024-01-15T09:45:00Z',
      usageCount: 8932,
      expiresAt: '2024-12-31T23:59:59Z',
    },
    {
      id: '3',
      name: 'Analytics Dashboard Key',
      key: 'ak_live_analytics123456',
      secret: 'sk_live_analytics654321',
      permissions: ['read:analytics', 'read:reports'],
      rateLimit: { requests: 200, period: 'hour' },
      status: 'inactive',
      createdAt: '2024-01-10T00:00:00Z',
      lastUsed: '2024-01-14T16:20:00Z',
      usageCount: 2341,
    },
  ];

    const mockEndpoints: APIEndpoint[] = [
      {
        id: '1',
      path: '/api/v1/users',
        method: 'GET',
      description: 'Retrieve user information',
      version: 'v1',
        status: 'active',
      rateLimit: { requests: 100, period: 'minute' },
      responseTime: 45.2,
        successRate: 99.8,
      callCount: 12547,
      lastCalled: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
      path: '/api/v1/users',
        method: 'POST',
      description: 'Create new user',
      version: 'v1',
        status: 'active',
      rateLimit: { requests: 50, period: 'minute' },
      responseTime: 78.5,
        successRate: 98.5,
      callCount: 2341,
      lastCalled: '2024-01-15T10:25:00Z',
      },
      {
        id: '3',
      path: '/api/v1/orders',
      method: 'GET',
      description: 'Retrieve order information',
      version: 'v1',
        status: 'active',
      rateLimit: { requests: 200, period: 'minute' },
      responseTime: 32.1,
        successRate: 99.2,
      callCount: 8932,
      lastCalled: '2024-01-15T10:28:00Z',
      },
      {
        id: '4',
      path: '/api/v1/analytics',
      method: 'GET',
      description: 'Retrieve analytics data',
      version: 'v1',
        status: 'deprecated',
      rateLimit: { requests: 10, period: 'minute' },
      responseTime: 156.8,
      successRate: 95.5,
      callCount: 456,
      lastCalled: '2024-01-14T18:30:00Z',
    },
  ];

  const mockLogs: APILog[] = [
      {
        id: '1',
      endpoint: '/api/v1/users',
        method: 'GET',
      statusCode: 200,
      responseTime: 45.2,
      timestamp: '2024-01-15T10:30:00Z',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      apiKey: 'ak_live_1234567890abcdef',
      requestSize: 1024,
      responseSize: 2048,
      },
      {
        id: '2',
      endpoint: '/api/v1/orders',
        method: 'POST',
        statusCode: 201,
      responseTime: 78.5,
      timestamp: '2024-01-15T10:29:00Z',
      ipAddress: '192.168.1.101',
      userAgent: 'MobileApp/1.0.0 (iOS 17.0)',
      apiKey: 'ak_live_mobile123456789',
      requestSize: 2048,
      responseSize: 512,
      },
      {
        id: '3',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      statusCode: 429,
      responseTime: 12.3,
      timestamp: '2024-01-15T10:28:00Z',
        ipAddress: '192.168.1.102',
      userAgent: 'AnalyticsBot/1.0',
      apiKey: 'ak_live_analytics123456',
      requestSize: 512,
      responseSize: 0,
      error: 'Rate limit exceeded',
    },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    setApiKeys(mockApiKeys);
      setEndpoints(mockEndpoints);
      setLogs(mockLogs);
    } catch (error) {
      console.error('Failed to fetch API data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateKey = async () => {
    if (!newKey.name) return;

    try {
      const key: APIKey = {
        id: Date.now().toString(),
        name: newKey.name,
        key: `ak_live_${Math.random().toString(36).substr(2, 16)}`,
        secret: `sk_live_${Math.random().toString(36).substr(2, 16)}`,
        permissions: newKey.permissions || [],
        rateLimit: newKey.rateLimit || { requests: 1000, period: 'hour' },
        status: newKey.status || 'active',
        createdAt: new Date().toISOString(),
        lastUsed: new Date().toISOString(),
        usageCount: 0,
      };

      setApiKeys(prev => [...prev, key]);
      setShowCreateKey(false);
      setNewKey({ name: '', permissions: [], rateLimit: { requests: 1000, period: 'hour' }, status: 'active' });
    } catch (error) {
      console.error('Failed to create API key:', error);
    }
  };


  const handleToggleKeyStatus = async (id: string) => {
    try {
      setApiKeys(prev => prev.map(key => 
        key.id === id 
          ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
          : key
      ));
    } catch (error) {
      console.error('Failed to toggle key status:', error);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    try {
      setApiKeys(prev => prev.filter(key => key.id !== id));
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleSecretVisibility = (keyId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [keyId]: !prev[keyId],
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'suspended':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'deprecated':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'maintenance':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'inactive':
        return Pause;
      case 'suspended':
        return AlertTriangle;
      case 'deprecated':
        return AlertTriangle;
      case 'maintenance':
        return Settings;
      default:
        return Clock;
    }
  };

  const getStatusCodeColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600';
    if (statusCode >= 300 && statusCode < 400) return 'text-blue-600';
    if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600';
    if (statusCode >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredApiKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || key.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || endpoint.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
  return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            API Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage API keys, endpoints, and monitor usage
          </p>
            </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={fetchData}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {apiKeys.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">API Keys</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Key className="h-6 w-6 text-blue-600" />
              </div>
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
                {endpoints.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Endpoints</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
              </div>
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
              <div className="text-2xl font-bold text-purple-600">
                {apiKeys.reduce((sum, key) => sum + key.usageCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
              </div>
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
              <div className="text-2xl font-bold text-orange-600">
                {endpoints.reduce((sum, endpoint) => sum + endpoint.callCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">API Calls</div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
        </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'keys', name: 'API Keys', icon: Key },
              { id: 'endpoints', name: 'Endpoints', icon: Globe },
              { id: 'logs', name: 'API Logs', icon: Activity },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
              <button
                key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
              </button>
              );
            })}
          </nav>
          </div>

          <div className="p-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="deprecated">Deprecated</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          {/* API Keys Tab */}
          {activeTab === 'keys' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  API Keys
                </h3>
                <button
                  onClick={() => setShowCreateKey(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Key</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApiKeys.map((key) => {
                  const StatusIcon = getStatusIcon(key.status);
                  return (
                        <motion.div
                      key={key.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Key className="h-6 w-6 text-blue-600" />
                              </div>
                            <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {key.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {key.key}
                            </p>
                            </div>
                            </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleToggleKeyStatus(key.id)}
                            className={`p-1 transition-colors ${
                              key.status === 'active' 
                                ? 'text-green-600 hover:text-red-600' 
                                : 'text-gray-400 hover:text-green-600'
                            }`}
                            title={key.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {key.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteKey(key.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                            </div>
                            </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="h-4 w-4" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(key.status)}`}>
                              {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                            </span>
                    </div>
                  </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Secret</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-mono text-gray-900 dark:text-white">
                              {showSecrets[key.id] ? key.secret : '••••••••••••••••'}
                            </span>
                            <button
                              onClick={() => toggleSecretVisibility(key.id)}
                              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showSecrets[key.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </button>
                            <button
                              onClick={() => handleCopyToClipboard(key.secret)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            </div>
                          </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Usage</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {key.usageCount.toLocaleString()}
                          </span>
                          </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Rate Limit</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {key.rateLimit.requests}/{key.rateLimit.period}
                          </span>
                          </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Last Used</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {new Date(key.lastUsed).toLocaleDateString()}
                          </span>
                    </div>
                  </div>
                </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Endpoints Tab */}
          {activeTab === 'endpoints' && (
            <div className="space-y-6">
                      <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  API Endpoints
                </h3>
                          </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
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
                        Calls
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEndpoints.map((endpoint) => {
                      const StatusIcon = getStatusIcon(endpoint.status);
                      return (
                        <motion.tr
                          key={endpoint.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                        >
                          <td className="px-6 py-4">
                          <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {endpoint.path}
                            </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {endpoint.description}
                          </div>
                        </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                              endpoint.method === 'POST' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                              endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                            }`}>
                              {endpoint.method}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                              <StatusIcon className="h-4 w-4" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                                {endpoint.status.charAt(0).toUpperCase() + endpoint.status.slice(1)}
                          </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {endpoint.responseTime.toFixed(1)}ms
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {endpoint.successRate.toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                            {endpoint.callCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors" title="View">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                                <Edit className="h-4 w-4" />
                          </button>
                        </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
                      </div>
            </div>
          )}

          {/* API Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  API Logs
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Last 24 hours
                          </div>
                          </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Timestamp
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
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        API Key
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {logs.map((log) => (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {log.endpoint}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log.method === 'GET' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                            log.method === 'POST' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            log.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            log.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                          }`}>
                            {log.method}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${getStatusCodeColor(log.statusCode)}`}>
                            {log.statusCode}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {log.responseTime.toFixed(1)}ms
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {log.ipAddress}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {log.apiKey.slice(0, 20)}...
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                        </div>
                      </div>
          )}
                        </div>
                      </div>
                      
      {/* Create API Key Modal */}
      <AnimatePresence>
        {showCreateKey && (
                <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
                    <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create API Key
                </h3>
                <button
                  onClick={() => setShowCreateKey(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                          </div>
              
              <div className="space-y-4">
                          <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKey.name || ''}
                    onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter key name"
                  />
                            </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rate Limit
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={newKey.rateLimit?.requests || 1000}
                      onChange={(e) => setNewKey({ 
                        ...newKey, 
                        rateLimit: { 
                          ...newKey.rateLimit!, 
                          requests: Number(e.target.value) 
                        } 
                      })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="1000"
                    />
                    <select
                      value={newKey.rateLimit?.period || 'hour'}
                      onChange={(e) => setNewKey({ 
                        ...newKey, 
                        rateLimit: { 
                          ...newKey.rateLimit!, 
                          period: e.target.value 
                        } 
                      })}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="minute">Per Minute</option>
                      <option value="hour">Per Hour</option>
                      <option value="day">Per Day</option>
                    </select>
                      </div>
                    </div>
                    
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {['read:users', 'write:users', 'read:orders', 'write:orders', 'read:analytics', 'write:analytics'].map(permission => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newKey.permissions?.includes(permission) || false}
                          onChange={(e) => {
                            const permissions = newKey.permissions || [];
                            if (e.target.checked) {
                              setNewKey({ ...newKey, permissions: [...permissions, permission] });
                            } else {
                              setNewKey({ ...newKey, permissions: permissions.filter(p => p !== permission) });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{permission}</span>
                      </label>
                    ))}
                      </div>
                    </div>
                  </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateKey(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Key
                </button>
                  </div>
            </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
    </div>
  );
};

export default APIManagement;
