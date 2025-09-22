import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plug, Zap, Database, Cloud, Shield, CheckCircle, AlertTriangle,
  Plus, Edit, Trash2, Eye, RefreshCw, Settings, Bell, X, Save,
  Download, Upload, Activity, TrendingUp, Globe, Server
} from 'lucide-react';

/**
 * AI Integrations - Third-party AI Service Integration Management
 * Comprehensive integration management for AI services and APIs
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T18:25:00.000Z
 * Features: Service Integration, API Management, Authentication, Monitoring
 */

interface AIIntegration {
  id: string;
  name: string;
  provider: string;
  type: 'nlp' | 'vision' | 'speech' | 'translation' | 'custom';
  status: 'active' | 'inactive' | 'error' | 'pending';
  apiKey: string;
  endpoint: string;
  rateLimit: number;
  usage: {
    requests: number;
    limit: number;
    resetDate: string;
  };
  features: string[];
  lastUsed: string;
  createdAt: string;
}

interface IntegrationStats {
  totalIntegrations: number;
  activeIntegrations: number;
  totalRequests: number;
  errorRate: number;
  averageLatency: number;
  monthlyCost: number;
}

const AIIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState<AIIntegration[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<AIIntegration | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<IntegrationStats>({
    totalIntegrations: 0,
    activeIntegrations: 0,
    totalRequests: 0,
    errorRate: 0,
    averageLatency: 0,
    monthlyCost: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data
  useEffect(() => {
    const mockIntegrations: AIIntegration[] = [
      {
        id: 'integration-1',
        name: 'OpenAI GPT-4',
        provider: 'OpenAI',
        type: 'nlp',
        status: 'active',
        apiKey: 'sk-***...***1234',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        rateLimit: 10000,
        usage: {
          requests: 8475,
          limit: 10000,
          resetDate: '2025-01-21'
        },
        features: ['Text Generation', 'Chat Completion', 'Code Generation'],
        lastUsed: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        createdAt: '2024-01-15'
      },
      {
        id: 'integration-2',
        name: 'Google Vision API',
        provider: 'Google Cloud',
        type: 'vision',
        status: 'active',
        apiKey: 'AIza***...***5678',
        endpoint: 'https://vision.googleapis.com/v1/images:annotate',
        rateLimit: 1800,
        usage: {
          requests: 1205,
          limit: 1800,
          resetDate: '2025-01-21'
        },
        features: ['Image Analysis', 'Object Detection', 'Text Recognition'],
        lastUsed: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        createdAt: '2024-02-10'
      },
      {
        id: 'integration-3',
        name: 'Azure Speech Services',
        provider: 'Microsoft Azure',
        type: 'speech',
        status: 'active',
        apiKey: '***...***9012',
        endpoint: 'https://eastus.stt.speech.microsoft.com/',
        rateLimit: 5000,
        usage: {
          requests: 3200,
          limit: 5000,
          resetDate: '2025-01-21'
        },
        features: ['Speech-to-Text', 'Text-to-Speech', 'Voice Recognition'],
        lastUsed: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        createdAt: '2024-03-05'
      },
      {
        id: 'integration-4',
        name: 'AWS Translate',
        provider: 'Amazon Web Services',
        type: 'translation',
        status: 'inactive',
        apiKey: 'AKIA***...***3456',
        endpoint: 'https://translate.us-east-1.amazonaws.com/',
        rateLimit: 20000,
        usage: {
          requests: 0,
          limit: 20000,
          resetDate: '2025-01-21'
        },
        features: ['Language Translation', 'Real-time Translation'],
        lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: '2024-01-20'
      },
      {
        id: 'integration-5',
        name: 'Custom ML Model',
        provider: 'Internal',
        type: 'custom',
        status: 'error',
        apiKey: 'custom-key-***',
        endpoint: 'https://api.internal.com/ml/predict',
        rateLimit: 1000,
        usage: {
          requests: 0,
          limit: 1000,
          resetDate: '2025-01-21'
        },
        features: ['Custom Classification', 'Predictive Analytics'],
        lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        createdAt: '2024-04-12'
      }
    ];

    setIntegrations(mockIntegrations);
    
    // Calculate stats
    const integrationStats: IntegrationStats = {
      totalIntegrations: mockIntegrations.length,
      activeIntegrations: mockIntegrations.filter(i => i.status === 'active').length,
      totalRequests: mockIntegrations.reduce((sum, i) => sum + i.usage.requests, 0),
      errorRate: mockIntegrations.filter(i => i.status === 'error').length / mockIntegrations.length * 100,
      averageLatency: 245,
      monthlyCost: 2847.50
    };
    setStats(integrationStats);
  }, []);

  const getStatusColor = (status: AIIntegration['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: AIIntegration['type']) => {
    switch (type) {
      case 'nlp': return Zap;
      case 'vision': return Eye;
      case 'speech': return Bell;
      case 'translation': return Globe;
      case 'custom': return Settings;
      default: return Plug;
    }
  };

  const getProviderIcon = (provider: string) => {
    if (provider.includes('Google')) return Cloud;
    if (provider.includes('Microsoft')) return Server;
    if (provider.includes('Amazon')) return Database;
    return Cloud;
  };

  const handleToggleStatus = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === 'active' ? 'inactive' as const : 'active' as const 
          }
        : integration
    ));
    addNotification('success', 'Status Updated', 'Integration status has been changed');
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Integration data has been updated');
  };

  const handleDeleteIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.filter(i => i.id !== integrationId));
    addNotification('success', 'Integration Removed', 'AI integration has been deleted');
  };

  const formatLastUsed = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getUsagePercentage = (requests: number, limit: number) => {
    return (requests / limit) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Plug className="w-8 h-8 text-blue-500 mr-3" />
                AI Integrations
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage third-party AI services and API integrations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Integration
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Integrations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalIntegrations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Plug className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.activeIntegrations}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalRequests.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Cost</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">${stats.monthlyCost}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Service Integrations</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                Test All
              </button>
              <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                Export
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {integrations.map((integration) => {
              const TypeIcon = getTypeIcon(integration.type);
              const ProviderIcon = getProviderIcon(integration.provider);
              const usagePercentage = getUsagePercentage(integration.usage.requests, integration.usage.limit);
              
              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <ProviderIcon className="w-4 h-4" />
                          <span>{integration.provider}</span>
                          <span>•</span>
                          <span className="capitalize">{integration.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleToggleStatus(integration.id)}
                          className={`p-1 rounded transition-colors ${
                            integration.status === 'active'
                              ? 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                              : 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                          }`}
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingIntegration(integration)}
                          className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteIntegration(integration.id)}
                          className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">API Usage</p>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">
                          {integration.usage.requests.toLocaleString()} / {integration.usage.limit.toLocaleString()}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {usagePercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            usagePercentage > 80 ? 'bg-red-500' :
                            usagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Rate Limit</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {integration.rateLimit.toLocaleString()} / hour
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Last Used</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatLastUsed(integration.lastUsed)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'info' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AIIntegrations;
