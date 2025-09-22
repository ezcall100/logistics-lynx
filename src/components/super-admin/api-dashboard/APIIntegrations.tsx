import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Link,
  Plus,
  Settings,
  Trash2,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Globe,
  Key,
  RefreshCw,
  Zap,
} from 'lucide-react';

/**
 * API Integrations Page - Comprehensive third-party integrations management
 * Created by MCP 302 Agents
 * Features: Integration configuration, monitoring, and management
 */

const APIIntegrations: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: '1',
      name: 'Stripe Payment Gateway',
      description: 'Payment processing and subscription management',
      status: 'active',
      type: 'payment',
      lastSync: new Date(Date.now() - 10 * 60 * 1000),
      successRate: 99.8,
      totalRequests: 15420,
      apiKey: 'sk_live_...a1b2c3d4',
    },
    {
      id: '2',
      name: 'SendGrid Email Service',
      description: 'Transactional email delivery and management',
      status: 'active',
      type: 'email',
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      successRate: 98.5,
      totalRequests: 8920,
      apiKey: 'SG.abc123...def456',
    },
    {
      id: '3',
      name: 'AWS S3 Storage',
      description: 'File storage and content delivery',
      status: 'warning',
      type: 'storage',
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      successRate: 95.2,
      totalRequests: 2340,
      apiKey: 'AKIA...xyz789',
    },
    {
      id: '4',
      name: 'Slack Notifications',
      description: 'Team notifications and alerts',
      status: 'inactive',
      type: 'notification',
      lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000),
      successRate: 97.8,
      totalRequests: 1560,
      apiKey: 'xoxb-...token123',
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Link className="w-8 h-8 text-cyan-500 mr-3" />
            API Integrations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage third-party integrations and external service connections
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Integration
          </button>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{integration.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{integration.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                integration.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : integration.status === 'warning'
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>
                {integration.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Type</span>
                <span className="text-gray-900 dark:text-white capitalize">{integration.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-gray-900 dark:text-white">{integration.successRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Requests</span>
                <span className="text-gray-900 dark:text-white">{integration.totalRequests.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Sync</span>
                <span className="text-gray-900 dark:text-white">
                  {integration.lastSync.toLocaleTimeString()}
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">API Key</span>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="password"
                    value={integration.apiKey}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700 mt-4">
              <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                <Zap className="w-4 h-4" />
              </button>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                <Eye className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Status */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Integration Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Stripe Payment Gateway</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Payment processing active</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">99.8% success</span>
              <span className="text-sm text-green-600 dark:text-green-400">HEALTHY</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">AWS S3 Storage</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">High latency detected</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">95.2% success</span>
              <span className="text-sm text-yellow-600 dark:text-yellow-400">WARNING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIIntegrations;
