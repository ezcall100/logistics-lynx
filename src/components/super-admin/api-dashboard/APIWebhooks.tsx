import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Webhook,
  Plus,
  Play,
  Square,
  Settings,
  Trash2,
  Copy,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Globe,
  Key,
  RefreshCw,
} from 'lucide-react';

/**
 * API Webhooks Page - Comprehensive webhook management
 * Created by MCP 302 Agents
 * Features: Webhook configuration, monitoring, and delivery management
 */

const APIWebhooks: React.FC = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      name: 'User Registration Webhook',
      url: 'https://app.example.com/webhooks/user-registered',
      events: ['user.created', 'user.updated'],
      status: 'active',
      secret: 'whsec_1234567890abcdef',
      lastDelivery: new Date(Date.now() - 5 * 60 * 1000),
      successRate: 98.5,
      totalDeliveries: 1240,
    },
    {
      id: '2',
      name: 'Payment Webhook',
      url: 'https://billing.example.com/webhooks/payment',
      events: ['payment.completed', 'payment.failed'],
      status: 'active',
      secret: 'whsec_abcdef1234567890',
      lastDelivery: new Date(Date.now() - 2 * 60 * 1000),
      successRate: 99.2,
      totalDeliveries: 892,
    },
    {
      id: '3',
      name: 'Order Processing Webhook',
      url: 'https://orders.example.com/webhooks/order-updated',
      events: ['order.created', 'order.updated', 'order.cancelled'],
      status: 'inactive',
      secret: 'whsec_567890abcdef1234',
      lastDelivery: new Date(Date.now() - 2 * 60 * 60 * 1000),
      successRate: 95.8,
      totalDeliveries: 456,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Webhook className="w-8 h-8 text-cyan-500 mr-3" />
            API Webhooks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure and monitor webhook endpoints for real-time event delivery
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Webhook
          </button>
        </div>
      </div>

      {/* Webhooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{webhook.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{webhook.url}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                webhook.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>
                {webhook.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Events</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {webhook.events.map((event, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-gray-900 dark:text-white">{webhook.successRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Deliveries</span>
                <span className="text-gray-900 dark:text-white">{webhook.totalDeliveries.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Delivery</span>
                <span className="text-gray-900 dark:text-white">
                  {webhook.lastDelivery.toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700 mt-4">
              <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                <Play className="w-4 h-4" />
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

      {/* Recent Deliveries */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deliveries</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">User Registration Webhook</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">user.created event</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">245ms</span>
              <span className="text-sm text-green-600 dark:text-green-400">DELIVERED</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Payment Webhook</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">payment.failed event</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">5.2s</span>
              <span className="text-sm text-red-600 dark:text-red-400">FAILED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIWebhooks;
