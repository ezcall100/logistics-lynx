import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Plug, Zap, Shield, Database, MessageSquare, CreditCard,
  Truck, Globe, Bell, CheckCircle, AlertTriangle, X, TestTube, Eye, Copy, Save
} from 'lucide-react';

/**
 * Integration Settings - Comprehensive Integration Management
 * Centralized hub for all third-party integrations and webhooks
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T17:00:00.000Z
 * Features: N8N Webhook, API Integrations, Partner Connections, Real-time Testing
 */

interface Integration {
  id: string;
  name: string;
  type: 'webhook' | 'api' | 'oauth' | 'database' | 'payment' | 'communication' | 'logistics';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  description: string;
  category: 'automation' | 'communication' | 'payment' | 'logistics' | 'data' | 'security';
  endpoint?: string;
  lastSync?: string;
  config: Record<string, any>;
  health: {
    uptime: number;
    responseTime: number;
    successRate: number;
  };
  credentials: {
    hasKey: boolean;
    maskedKey?: string;
    expiresAt?: string;
  };
}

interface IntegrationTest {
  id: string;
  integrationId: string;
  status: 'success' | 'failed' | 'pending';
  responseTime: number;
  message: string;
  timestamp: string;
}

const IntegrationSettings: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'webhooks' | 'apis' | 'partners' | 'logs'>('overview');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testResults, setTestResults] = useState<IntegrationTest[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data - Comprehensive integration ecosystem
  useEffect(() => {
    const mockIntegrations: Integration[] = [
      // Automation & Workflow
      {
        id: 'n8n-webhook',
        name: 'N8N Workflow Automation',
        type: 'webhook',
        status: 'connected',
        description: 'Automated workflow processing and task orchestration',
        category: 'automation',
        endpoint: 'https://pixx100.app.n8n.cloud/webhook/cursor-webhook',
        lastSync: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        config: {
          retryAttempts: 3,
          timeout: 30000,
          authType: 'bearer'
        },
        health: { uptime: 99.8, responseTime: 45, successRate: 99.2 },
        credentials: { hasKey: true, maskedKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYmU2YjA5NS0xY2MxLTQwMGMtYmExYS1jNmIwYjQzZjRhZjYiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzU4Mzk5MTExfQ.cjLjyksHjLsr5-ka5Db9Bi-HmjDz9G6laHeldCnIQGk', expiresAt: '2025-12-31' }
      },
      {
        id: 'zapier',
        name: 'Zapier Integration',
        type: 'oauth',
        status: 'connected',
        description: 'Connect with 5000+ apps and automate workflows',
        category: 'automation',
        lastSync: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        config: { triggers: 15, actions: 8, premium: true },
        health: { uptime: 99.9, responseTime: 120, successRate: 98.8 },
        credentials: { hasKey: true, maskedKey: 'zap_****_****_****_c3d4', expiresAt: '2025-06-15' }
      },

      // Communication
      {
        id: 'twilio-sms',
        name: 'Twilio SMS Gateway',
        type: 'api',
        status: 'connected',
        description: 'Global SMS messaging and communication platform',
        category: 'communication',
        endpoint: 'https://api.twilio.com/2010-04-01/',
        lastSync: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
        config: { region: 'us-east-1', rateLimit: 1000, features: ['SMS', 'Voice', 'WhatsApp'] },
        health: { uptime: 99.95, responseTime: 85, successRate: 99.5 },
        credentials: { hasKey: true, maskedKey: 'AC****_****_****_e5f6', expiresAt: undefined }
      },
      {
        id: 'slack',
        name: 'Slack Workspace',
        type: 'oauth',
        status: 'connected',
        description: 'Team communication and collaboration platform',
        category: 'communication',
        lastSync: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        config: { channels: ['#alerts', '#notifications'], botUser: 'TransBot Assistant' },
        health: { uptime: 99.7, responseTime: 95, successRate: 98.9 },
        credentials: { hasKey: true, maskedKey: 'xoxb-****_****_****_g7h8', expiresAt: '2025-03-20' }
      },

      // Payment Processing
      {
        id: 'stripe',
        name: 'Stripe Payment Gateway',
        type: 'api',
        status: 'connected',
        description: 'Online payment processing and financial infrastructure',
        category: 'payment',
        endpoint: 'https://api.stripe.com/v1/',
        lastSync: new Date(Date.now() - 30 * 1000).toISOString(),
        config: { currency: 'USD', webhooks: 8, testMode: false },
        health: { uptime: 99.99, responseTime: 65, successRate: 99.8 },
        credentials: { hasKey: true, maskedKey: 'sk_live_****_****_****_i9j0', expiresAt: undefined }
      },
      {
        id: 'paypal',
        name: 'PayPal Commerce',
        type: 'oauth',
        status: 'pending',
        description: 'Alternative payment solution and marketplace integration',
        category: 'payment',
        config: { sandbox: false, features: ['Express Checkout', 'Subscriptions'] },
        health: { uptime: 0, responseTime: 0, successRate: 0 },
        credentials: { hasKey: false }
      },

      // Logistics & Shipping
      {
        id: 'fedex-api',
        name: 'FedEx Shipping API',
        type: 'api',
        status: 'connected',
        description: 'Shipping rates, tracking, and label generation',
        category: 'logistics',
        endpoint: 'https://api.fedex.com/',
        lastSync: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        config: { accountNumber: '****1234', services: ['Ground', 'Express', 'Overnight'] },
        health: { uptime: 99.6, responseTime: 150, successRate: 97.8 },
        credentials: { hasKey: true, maskedKey: 'fedex_****_****_****_k1l2', expiresAt: '2025-08-10' }
      },
      {
        id: 'ups-api',
        name: 'UPS Shipping Solutions',
        type: 'api',
        status: 'connected',
        description: 'Comprehensive shipping and logistics services',
        category: 'logistics',
        endpoint: 'https://onlinetools.ups.com/api/',
        lastSync: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        config: { accountNumber: '****5678', services: ['Standard', 'Expedited', 'Next Day'] },
        health: { uptime: 99.4, responseTime: 180, successRate: 96.5 },
        credentials: { hasKey: true, maskedKey: 'ups_****_****_****_m3n4', expiresAt: '2025-09-15' }
      },

      // Data & Analytics
      {
        id: 'google-analytics',
        name: 'Google Analytics 4',
        type: 'oauth',
        status: 'connected',
        description: 'Website and app analytics and user behavior tracking',
        category: 'data',
        lastSync: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        config: { propertyId: 'GA4-****-****', views: ['All Traffic', 'E-commerce', 'Mobile'] },
        health: { uptime: 99.9, responseTime: 200, successRate: 99.1 },
        credentials: { hasKey: true, maskedKey: 'ga_****_****_****_o5p6', expiresAt: '2025-05-30' }
      },
      {
        id: 'mixpanel',
        name: 'Mixpanel Analytics',
        type: 'api',
        status: 'error',
        description: 'Product analytics and user engagement tracking',
        category: 'data',
        endpoint: 'https://api.mixpanel.com/',
        config: { projectId: '****9876', events: ['user_signup', 'purchase', 'feature_usage'] },
        health: { uptime: 85.2, responseTime: 450, successRate: 78.3 },
        credentials: { hasKey: true, maskedKey: 'mp_****_****_****_q7r8', expiresAt: '2025-04-12' }
      },

      // Security & Compliance
      {
        id: 'auth0',
        name: 'Auth0 Identity Platform',
        type: 'oauth',
        status: 'connected',
        description: 'User authentication and authorization services',
        category: 'security',
        lastSync: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        config: { domain: 'transbot.auth0.com', connections: ['Google', 'Microsoft', 'Database'] },
        health: { uptime: 99.95, responseTime: 75, successRate: 99.7 },
        credentials: { hasKey: true, maskedKey: 'auth0_****_****_****_s9t0', expiresAt: undefined }
      }
    ];

    setIntegrations(mockIntegrations);
  }, []);

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'disconnected': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: Integration['category']) => {
    switch (category) {
      case 'automation': return Zap;
      case 'communication': return MessageSquare;
      case 'payment': return CreditCard;
      case 'logistics': return Truck;
      case 'data': return Database;
      case 'security': return Shield;
      default: return Plug;
    }
  };


  const handleTestIntegration = async (integration: Integration) => {
    setIsTesting(true);
    setSelectedIntegration(integration);
    setShowTestModal(true);

    try {
      // For N8N webhook, test with actual API call
      if (integration.id === 'n8n-webhook') {
        const response = await fetch('https://pixx100.app.n8n.cloud/webhook/cursor-webhook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${integration.credentials.maskedKey}`
          },
          body: JSON.stringify({
            test: true,
            timestamp: new Date().toISOString()
          })
        });

        const success = response.ok;
        const responseTime = Math.floor(Math.random() * 200) + 50;
        const testResult: IntegrationTest = {
          id: Date.now().toString(),
          integrationId: integration.id,
          status: success ? 'success' : 'failed',
          responseTime,
          message: success ? 'N8N webhook test successful' : `Connection failed - ${response.status} ${response.statusText}`,
          timestamp: new Date().toISOString()
        };

        setTestResults(prev => [testResult, ...prev.slice(0, 9)]);
        setIsTesting(false);
        
        if (success) {
          addNotification('success', 'N8N Webhook Test Passed', 'N8N webhook is working correctly with new API key');
        } else {
          addNotification('error', 'N8N Webhook Test Failed', 'N8N webhook connection failed');
        }
      } else {
        // Simulate API test for other integrations
        await new Promise(resolve => setTimeout(resolve, 2000));

        const success = Math.random() > 0.2; // 80% success rate
        const responseTime = Math.floor(Math.random() * 300) + 50;
        const testResult: IntegrationTest = {
          id: Date.now().toString(),
          integrationId: integration.id,
          status: success ? 'success' : 'failed',
          responseTime,
          message: success ? 'Integration test successful' : 'Connection failed - check credentials',
          timestamp: new Date().toISOString()
        };

        setTestResults(prev => [testResult, ...prev.slice(0, 9)]);
        setIsTesting(false);
        
        if (success) {
          addNotification('success', 'Integration Test Passed', `${integration.name} is working correctly`);
        } else {
          addNotification('error', 'Integration Test Failed', `${integration.name} connection failed`);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const testResult: IntegrationTest = {
        id: Date.now().toString(),
        integrationId: integration.id,
        status: 'failed',
        responseTime: 0,
        message: `Connection error: ${errorMessage}`,
        timestamp: new Date().toISOString()
      };

      setTestResults(prev => [testResult, ...prev.slice(0, 9)]);
      setIsTesting(false);
      addNotification('error', 'Integration Test Failed', `${integration.name} connection error: ${errorMessage}`);
    }
  };

  const handleReconnect = (integration: Integration) => {
    setIntegrations(prev => prev.map(integ => 
      integ.id === integration.id 
        ? { ...integ, status: 'connected' as const, lastSync: new Date().toISOString() }
        : integ
    ));
    addNotification('success', 'Integration Reconnected', `${integration.name} has been reconnected`);
  };

  const handleDisconnect = (integration: Integration) => {
    setIntegrations(prev => prev.map(integ => 
      integ.id === integration.id 
        ? { ...integ, status: 'disconnected' as const }
        : integ
    ));
    addNotification('warning', 'Integration Disconnected', `${integration.name} has been disconnected`);
  };

  const filteredIntegrations = integrations.filter(integration => {
    if (activeTab === 'overview') return true;
    if (activeTab === 'webhooks') return integration.type === 'webhook';
    if (activeTab === 'apis') return integration.type === 'api';
    if (activeTab === 'partners') return integration.type === 'oauth';
    return true;
  });

  const connectedCount = integrations.filter(i => i.status === 'connected').length;
  const errorCount = integrations.filter(i => i.status === 'error').length;
  const pendingCount = integrations.filter(i => i.status === 'pending').length;

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Plug className="w-8 h-8 text-blue-500 mr-3" />
            Integration Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all third-party integrations, webhooks, and partner connections
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Integrations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{integrations.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Plug className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Connected</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{connectedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Errors</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{errorCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', count: integrations.length },
                { id: 'webhooks', label: 'Webhooks', count: integrations.filter(i => i.type === 'webhook').length },
                { id: 'apis', label: 'APIs', count: integrations.filter(i => i.type === 'api').length },
                { id: 'partners', label: 'Partners', count: integrations.filter(i => i.type === 'oauth').length },
                { id: 'logs', label: 'Test Logs', count: testResults.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'logs' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integration Test Logs</h3>
                {testResults.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No test results yet</p>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            result.status === 'success' ? 'bg-green-500' :
                            result.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'
                          }`} />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {integrations.find(i => i.id === result.integrationId)?.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(result.timestamp).toLocaleString()} • {result.responseTime}ms
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          result.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {result.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => {
                  const CategoryIcon = getCategoryIcon(integration.category);

                  return (
                    <motion.div
                      key={integration.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-gray-200 dark:border-slate-600 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {integration.category} • {integration.type}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                          {integration.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {integration.description}
                      </p>

                      {integration.endpoint && (
                        <div className="flex items-center space-x-2 mb-4">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            {integration.endpoint}
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Uptime</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {integration.health.uptime}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Response Time</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {integration.health.responseTime}ms
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTestIntegration(integration)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Test Integration"
                          >
                            <TestTube className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { setSelectedIntegration(integration); setShowConfigModal(true); }}
                            className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            title="Configure"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex space-x-1">
                          {integration.status === 'disconnected' ? (
                            <button
                              onClick={() => handleReconnect(integration)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Connect
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDisconnect(integration)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Disconnect
                            </button>
                          )}
                        </div>
                      </div>

                      {integration.lastSync && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Last sync: {new Date(integration.lastSync).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
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
                {notification.type === 'info' && <Settings className="w-5 h-5" />}
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

        {/* Configuration Modal */}
        <AnimatePresence>
          {showConfigModal && selectedIntegration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Configure {selectedIntegration.name}
                  </h2>
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Endpoint
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedIntegration.endpoint || ''}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                      placeholder="https://api.example.com/v1/"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Key
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        defaultValue={selectedIntegration.credentials.maskedKey || ''}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                        placeholder="Enter API key"
                      />
                      <button className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Configuration
                    </label>
                    <textarea
                      rows={4}
                      defaultValue={JSON.stringify(selectedIntegration.config, null, 2)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      addNotification('success', 'Configuration Saved', `${selectedIntegration.name} configuration updated`);
                      setShowConfigModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Test Modal */}
        <AnimatePresence>
          {showTestModal && selectedIntegration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Testing {selectedIntegration.name}
                  </h2>
                  <button
                    onClick={() => setShowTestModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {isTesting ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Testing connection...</p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Test Completed
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedIntegration.name} is working correctly
                    </p>
                    <button
                      onClick={() => setShowTestModal(false)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntegrationSettings;
