import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react';

interface AlertChannel {
  id: string;
  name: string;
  type: 'slack' | 'discord' | 'email';
  status: 'active' | 'inactive' | 'error';
  lastMessage: string;
  messageCount: number;
}

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
}

const AlertIntegration: React.FC = () => {
  const [channels, _setChannels] = useState<AlertChannel[]>([
    {
      id: 'slack-1',
      name: 'Super Admin Alerts',
      type: 'slack',
      status: 'active',
      lastMessage: '2025-09-17T08:45:00.000Z',
      messageCount: 23,
    },
    {
      id: 'discord-1',
      name: 'Development Updates',
      type: 'discord',
      status: 'active',
      lastMessage: '2025-09-17T08:44:30.000Z',
      messageCount: 15,
    },
  ]);

  const [rules, _setRules] = useState<AlertRule[]>([
    {
      id: 'rule-1',
      name: 'Task Completion',
      condition: 'When task status changes to completed',
      action: 'Send notification to all channels',
      enabled: true,
    },
    {
      id: 'rule-2',
      name: 'Agent Error',
      condition: 'When agent status changes to error',
      action: 'Send urgent alert to Slack',
      enabled: true,
    },
    {
      id: 'rule-3',
      name: 'System Health',
      condition: 'When system health changes to warning',
      action: 'Send notification to Discord',
      enabled: false,
    },
  ]);

  const [_showAddChannel, _setShowAddChannel] = useState(false);
  const [_showAddRule, _setShowAddRule] = useState(false);

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'slack':
        return <MessageSquare className="w-4 h-4" />;
      case 'discord':
        return <MessageSquare className="w-4 h-4" />;
      case 'email':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-50';
      case 'inactive':
        return 'text-yellow-500 bg-yellow-50';
      case 'error':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Alert Integration</h2>
            <p className="text-sm text-gray-500">Real-time notifications</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => _setShowAddChannel(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alert Channels */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Alert Channels</h3>
        <div className="space-y-3">
          {channels.map(channel => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">{getChannelIcon(channel.type)}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{channel.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{channel.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}
                >
                  {getStatusIcon(channel.status)}
                  <span>{channel.status.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{channel.messageCount}</p>
                  <p className="text-xs text-gray-500">messages</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alert Rules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Alert Rules</h3>
          <button
            onClick={() => _setShowAddRule(true)}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {rules.map(rule => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <div
                    className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-400'}`}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{rule.condition}</p>
                <p className="text-sm text-gray-500">{rule.action}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-gray-700">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertIntegration;
