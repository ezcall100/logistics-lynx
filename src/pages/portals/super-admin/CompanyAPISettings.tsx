import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Key,
  Globe,
  Zap,
  Shield,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Settings,
  RefreshCw,
  Link,
  Code,
} from 'lucide-react';

/**
 * Company API & Integrations Settings - Super Admin
 * Created by MCP 301 Agents - SecurityBot & IntegrationBot
 * Timestamp: 2025-09-14T18:58:00.000Z
 * Features: API key management, integrations, webhooks, rate limiting
 */

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'expired';
  usage: {
    requests: number;
    limit: number;
    resetDate: string;
  };
}

interface Integration {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'oauth' | 'sdk';
  status: 'connected' | 'disconnected' | 'error';
  description: string;
  lastSync: string;
  config: Record<string, unknown>;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'failed';
  lastTriggered: string;
  successRate: number;
}

const CompanyAPISettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('keys');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  // Modal states for future use
  // const [showAddKey, setShowAddKey] = useState(false);
  // const [showAddIntegration, setShowAddIntegration] = useState(false);
  // const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  // Mock API data - MCP 301 Agents created this
  useEffect(() => {
    const mockAPIKeys: APIKey[] = [
      {
        id: '1',
        name: 'Production API Key',
        key: 'sk-prod-1234567890abcdef',
        permissions: ['read', 'write', 'admin'],
        lastUsed: '2025-09-14T10:30:00Z',
        createdAt: '2025-08-01T00:00:00Z',
        status: 'active',
        usage: {
          requests: 45230,
          limit: 100000,
          resetDate: '2025-10-01T00:00:00Z',
        },
      },
      {
        id: '2',
        name: 'Development API Key',
        key: 'sk-dev-abcdef1234567890',
        permissions: ['read', 'write'],
        lastUsed: '2025-09-13T15:45:00Z',
        createdAt: '2025-08-15T00:00:00Z',
        status: 'active',
        usage: {
          requests: 12340,
          limit: 50000,
          resetDate: '2025-10-01T00:00:00Z',
        },
      },
      {
        id: '3',
        name: 'Read-Only API Key',
        key: 'sk-read-9876543210fedcba',
        permissions: ['read'],
        lastUsed: '2025-09-10T09:20:00Z',
        createdAt: '2025-09-01T00:00:00Z',
        status: 'active',
        usage: {
          requests: 8900,
          limit: 25000,
          resetDate: '2025-10-01T00:00:00Z',
        },
      },
    ];

    const mockIntegrations: Integration[] = [
      {
        id: '1',
        name: 'Stripe Payment Gateway',
        type: 'api',
        status: 'connected',
        description: 'Payment processing integration',
        lastSync: '2025-09-14T10:30:00Z',
        config: { apiKey: 'sk_test_***', webhookSecret: 'whsec_***' },
      },
      {
        id: '2',
        name: 'Slack Notifications',
        type: 'webhook',
        status: 'connected',
        description: 'Team notification system',
        lastSync: '2025-09-14T09:15:00Z',
        config: { webhookUrl: 'https://hooks.slack.com/***', channel: '#alerts' },
      },
      {
        id: '3',
        name: 'Google Analytics',
        type: 'oauth',
        status: 'error',
        description: 'Analytics data integration',
        lastSync: '2025-09-12T14:20:00Z',
        config: { clientId: '***', scope: 'analytics.readonly' },
      },
    ];

    const mockWebhooks: Webhook[] = [
      {
        id: '1',
        name: 'Order Status Updates',
        url: 'https://api.example.com/webhooks/orders',
        events: ['order.created', 'order.updated', 'order.completed'],
        status: 'active',
        lastTriggered: '2025-09-14T10:30:00Z',
        successRate: 98.5,
      },
      {
        id: '2',
        name: 'User Activity Log',
        url: 'https://logs.example.com/webhook',
        events: ['user.login', 'user.logout', 'user.action'],
        status: 'active',
        lastTriggered: '2025-09-14T10:25:00Z',
        successRate: 99.2,
      },
      {
        id: '3',
        name: 'Payment Notifications',
        url: 'https://payments.example.com/notify',
        events: ['payment.success', 'payment.failed'],
        status: 'failed',
        lastTriggered: '2025-09-13T16:45:00Z',
        successRate: 85.3,
      },
    ];

    setApiKeys(mockAPIKeys);
    setIntegrations(mockIntegrations);
    setWebhooks(mockWebhooks);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20';
      case 'connected':
        return 'text-green-400 bg-green-400/20';
      case 'inactive':
        return 'text-gray-400 bg-gray-400/20';
      case 'disconnected':
        return 'text-gray-400 bg-gray-400/20';
      case 'error':
        return 'text-red-400 bg-red-400/20';
      case 'failed':
        return 'text-red-400 bg-red-400/20';
      case 'expired':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'connected':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'inactive':
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'disconnected':
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webhook':
        return <Link className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'api':
        return <Key className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'oauth':
        return <Shield className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'sdk':
        return <Code className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const toggleKeyVisibility = (keyId: string) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const tabs = [
    { id: 'keys', name: 'API Keys', icon: Key },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'webhooks', name: 'Webhooks', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="p-3 bg-purple-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Key className="w-8 h-8 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">API & Integrations</h1>
              <p className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                Manage API keys, integrations, and webhooks • MCP 301 Agents
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">Live API Data</span>
            </div>
            <button
              onClick={() = aria-label="Button"> console.log('Add API key clicked')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Add API Key</span>
            </button>
          </div>
        </div>
      </div>

      {/* API Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active API Keys</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {apiKeys.filter(k => k.status === 'active').length}
              </p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">All systems go</p>
            </div>
            <Key className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Connected Integrations</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {integrations.filter(i => i.status === 'connected').length}
              </p>
              <p className="text-sm text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">Running smoothly</p>
            </div>
            <Globe className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Webhooks</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {webhooks.filter(w => w.status === 'active').length}
              </p>
              <p className="text-sm text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid">Real-time sync</p>
            </div>
            <Zap className="w-8 h-8 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">API Requests Today</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {apiKeys.reduce((sum, key) => sum + key.usage.requests, 0).toLocaleString()}
              </p>
              <p className="text-sm text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid">Across all keys</p>
            </div>
            <BarChart3 className="w-8 h-8 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="border-b border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
          <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() = aria-label="Button"> setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <AnimatePresence mode="wait">
            {activeTab === 'keys' && (
              <motion.div
                key="keys"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">API Keys</h3>
                  <button
                    onClick={() = aria-label="Button"> console.log('Add API key clicked')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Create API Key</span>
                  </button>
                </div>

                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  {apiKeys.map(key => (
                    <div key={key.id} className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-purple-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            <Key className="w-5 h-5 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{key.name}</h4>
                            <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                              Created {new Date(key.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(key.status)}`}
                          >
                            {getStatusIcon(key.status)}
                            <span className="ml-1 responsive-container sm:flex-col md:flex-row lg:grid">{key.status}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            API Key
                          </label>
                          <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <input
                              type={visibleKeys.has(key.id) ? 'text' : 'password'}
                              value={key.key}
                              readOnly
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                            />
                            <button
                              onClick={() = aria-label="Button"> toggleKeyVisibility(key.id)}
                              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                            >
                              {visibleKeys.has(key.id) ? (
                                <EyeOff className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                              ) : (
                                <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                              )}
                            </button>
                            <button
                              onClick={() = aria-label="Button"> copyToClipboard(key.key)}
                              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                            >
                              <Copy className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            Permissions
                          </label>
                          <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            {key.permissions.map(permission => (
                              <span
                                key={permission}
                                className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                              >
                                {permission}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div>
                          <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Used</p>
                          <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{new Date(key.lastUsed).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Usage This Month</p>
                          <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {key.usage.requests.toLocaleString()} /{' '}
                            {key.usage.limit.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Reset Date</p>
                          <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(key.usage.resetDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Edit</span>
                        </button>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <RefreshCw className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Regenerate</span>
                        </button>
                        <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Integrations</h3>
                  <button
                    onClick={() = aria-label="Button"> console.log('Add integration clicked')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Add Integration</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  {integrations.map(integration => (
                    <div
                      key={integration.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-blue-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            {getTypeIcon(integration.type)}
                          </div>
                          <div>
                            <h4 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{integration.name}</h4>
                            <p className="text-sm text-gray-400 capitalize responsive-container sm:flex-col md:flex-row lg:grid">{integration.type}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(integration.status)}`}
                        >
                          {getStatusIcon(integration.status)}
                          <span className="ml-1 responsive-container sm:flex-col md:flex-row lg:grid">{integration.status}</span>
                        </span>
                      </div>

                      <p className="text-sm text-gray-300 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{integration.description}</p>

                      <div className="mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Sync</p>
                        <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {new Date(integration.lastSync).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Configure</span>
                        </button>
                        <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                        <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'webhooks' && (
              <motion.div
                key="webhooks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Webhooks</h3>
                  <button
                    onClick={() = aria-label="Button"> console.log('Add webhook clicked')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Add Webhook</span>
                  </button>
                </div>

                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  {webhooks.map(webhook => (
                    <div
                      key={webhook.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-green-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            <Zap className="w-5 h-5 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{webhook.name}</h4>
                            <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{webhook.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(webhook.status)}`}
                          >
                            {getStatusIcon(webhook.status)}
                            <span className="ml-1 responsive-container sm:flex-col md:flex-row lg:grid">{webhook.status}</span>
                          </span>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                            {webhook.successRate}% success
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            Events
                          </label>
                          <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            {webhook.events.map(event => (
                              <span
                                key={event}
                                className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                              >
                                {event}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            Last Triggered
                          </label>
                          <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(webhook.lastTriggered).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Edit</span>
                        </button>
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Zap className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Test</span>
                        </button>
                        <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Delete</span>
                        </button>
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
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">API Analytics</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="text-lg font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Request Volume</h4>
                    <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Today</span>
                        <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">
                          {apiKeys
                            .reduce((sum, key) => sum + key.usage.requests, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">This Month</span>
                        <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">1,234,567</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Peak Hour</span>
                        <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">2:00 PM - 3:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="text-lg font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Response Times</h4>
                    <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Average</span>
                        <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">145ms</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">95th Percentile</span>
                        <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">320ms</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Error Rate</span>
                        <span className="text-green-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">0.02%</span>
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
  );
};

export default CompanyAPISettings;
