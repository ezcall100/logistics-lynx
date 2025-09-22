import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key,
  Plus,
  Search,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  Globe,
  Settings,
  MoreVertical,
  Calendar,
  User,
  Tag,
} from 'lucide-react';

/**
 * API Keys Page - Comprehensive API key management
 * Created by MCP 302 Agents
 * Features: Key generation, management, monitoring, and security
 */

interface APIKey {
  id: string;
  name: string;
  key: string;
  keyPreview: string;
  status: 'active' | 'inactive' | 'expired' | 'revoked';
  permissions: string[];
  rateLimit: number;
  usage: {
    requests: number;
    limit: number;
    resetDate: Date;
  };
  createdAt: Date;
  lastUsed: Date;
  expiresAt: Date | null;
  createdBy: string;
  description: string;
  environment: 'production' | 'staging' | 'development';
  ipWhitelist: string[];
  userAgentWhitelist: string[];
}

const APIKeys: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterEnvironment, setFilterEnvironment] = useState<string>('all');
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mock data initialization
  useEffect(() => {
    const mockApiKeys: APIKey[] = [
      {
        id: '1',
        name: 'Production API Key',
        key: 'sk-prod-1234567890abcdef1234567890abcdef12345678',
        keyPreview: 'sk-prod-...a1b2c3d4',
        status: 'active',
        permissions: ['read', 'write', 'admin'],
        rateLimit: 10000,
        usage: {
          requests: 8542,
          limit: 10000,
          resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 5 * 60 * 1000),
        expiresAt: null,
        createdBy: 'admin@company.com',
        description: 'Main production API key for all services',
        environment: 'production',
        ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
        userAgentWhitelist: ['MyApp/1.0', 'WebApp/2.0'],
      },
      {
        id: '2',
        name: 'Development API Key',
        key: 'sk-dev-abcdef1234567890abcdef1234567890abcdef12',
        keyPreview: 'sk-dev-...e5f6g7h8',
        status: 'active',
        permissions: ['read', 'write'],
        rateLimit: 1000,
        usage: {
          requests: 234,
          limit: 1000,
          resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        createdBy: 'dev@company.com',
        description: 'Development environment API key',
        environment: 'development',
        ipWhitelist: [],
        userAgentWhitelist: [],
      },
      {
        id: '3',
        name: 'Testing API Key',
        key: 'sk-test-567890abcdef1234567890abcdef1234567890ab',
        keyPreview: 'sk-test-...i9j0k1l2',
        status: 'active',
        permissions: ['read'],
        rateLimit: 100,
        usage: {
          requests: 45,
          limit: 100,
          resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdBy: 'tester@company.com',
        description: 'Testing environment API key with limited permissions',
        environment: 'staging',
        ipWhitelist: ['127.0.0.1'],
        userAgentWhitelist: ['TestRunner/1.0'],
      },
      {
        id: '4',
        name: 'Legacy API Key',
        key: 'sk-legacy-901234567890abcdef1234567890abcdef1234',
        keyPreview: 'sk-legacy-...m3n4o5p6',
        status: 'expired',
        permissions: ['read', 'write'],
        rateLimit: 5000,
        usage: {
          requests: 0,
          limit: 5000,
          resetDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdBy: 'admin@company.com',
        description: 'Legacy API key that has expired',
        environment: 'production',
        ipWhitelist: [],
        userAgentWhitelist: [],
      },
    ];

    setApiKeys(mockApiKeys);
  }, []);

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.keyPreview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || key.status === filterStatus;
    const matchesEnvironment = filterEnvironment === 'all' || key.environment === filterEnvironment;
    return matchesSearch && matchesStatus && matchesEnvironment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'revoked': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'staging': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'development': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getUsagePercentage = (usage: APIKey['usage']) => {
    return Math.round((usage.requests / usage.limit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSelectKey = (keyId: string) => {
    setSelectedKeys(prev => 
      prev.includes(keyId) 
        ? prev.filter(id => id !== keyId)
        : [...prev, keyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedKeys.length === filteredKeys.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(filteredKeys.map(key => key.id));
    }
  };

  const handleToggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const handleCopyKey = async (key: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Failed to copy key:', err);
    }
  };

  const handleViewKey = (key: APIKey) => {
    setSelectedKey(key);
    setShowKeyModal(true);
  };

  const handleRegenerateKey = (keyId: string) => {
    // In a real app, this would make an API call
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, key: `sk-${key.environment}-${Math.random().toString(36).substring(2, 42)}`, keyPreview: `sk-${key.environment}-...${Math.random().toString(36).substring(2, 8)}` }
        : key
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Key className="w-8 h-8 text-cyan-500 mr-3" />
            API Keys
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor your API keys and access tokens
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate New Key
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Keys</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{apiKeys.length}</p>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Key className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Keys</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {apiKeys.filter(key => key.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Expired Keys</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {apiKeys.filter(key => key.status === 'expired').length}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {apiKeys.reduce((acc, key) => acc + key.usage.requests, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search API keys..."
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
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
            </select>
            <select
              value={filterEnvironment}
              onChange={(e) => setFilterEnvironment(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>
          {selectedKeys.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedKeys.length} selected
              </span>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* API Keys Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKeys.map((key) => {
            const usagePercentage = getUsagePercentage(key.usage);
            const isVisible = visibleKeys.has(key.id);
            
            return (
              <div key={key.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedKeys.includes(key.id)}
                      onChange={() => handleSelectKey(key.id)}
                      className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{key.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{key.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(key.status)}`}>
                      {key.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(key.environment)}`}>
                      {key.environment}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">API Key</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <input
                        type={isVisible ? 'text' : 'password'}
                        value={isVisible ? key.key : key.keyPreview}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                      />
                      <button
                        onClick={() => handleToggleKeyVisibility(key.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleCopyKey(key.key, key.id)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title="Copy Key"
                      >
                        {copiedKey === key.id ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Usage</label>
                    <div className="mt-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-900 dark:text-white">
                          {key.usage.requests.toLocaleString()} / {key.usage.limit.toLocaleString()}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{usagePercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getUsageColor(usagePercentage)}`}
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Rate Limit</span>
                      <p className="text-gray-900 dark:text-white font-medium">{key.rateLimit.toLocaleString()}/hour</p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Last Used</span>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {key.lastUsed.toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Permissions</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {key.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewKey(key)}
                        className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRegenerateKey(key.id)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Regenerate Key"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Edit Key"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete Key"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Details Modal */}
      <AnimatePresence>
        {showKeyModal && selectedKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowKeyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  API Key Details: {selectedKey.name}
                </h3>
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Square className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedKey.status)}`}>
                      {selectedKey.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Environment
                    </label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(selectedKey.environment)}`}>
                      {selectedKey.environment}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="password"
                      value={selectedKey.key}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                    <button
                      onClick={() => handleCopyKey(selectedKey.key, selectedKey.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Created By
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedKey.createdBy}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Created At
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedKey.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Permissions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedKey.permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
                    Edit Key
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default APIKeys;
