/**
 * MCP Agent Integration - Super Admin Control for MCP Agents
 * Manage MCP agents for user onboarding and support
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  CheckCircle,
  XCircle,
  Eye,
  UserPlus,
  MessageSquare,
  BarChart3,
  Zap,
  Activity,
  Settings,
  Bell,
  LineChart,
} from 'lucide-react';

// Types
interface MCPAgent {
  id: string;
  name: string;
  type: 'onboarding' | 'support' | 'analytics' | 'automation';
  status: 'active' | 'idle' | 'maintenance' | 'error';
  assignedUsers: number;
  totalInteractions: number;
  successRate: number;
  lastActive: string;
  capabilities: string[];
}

interface AgentStats {
  totalAgents: number;
  activeAgents: number;
  totalInteractions: number;
  averageSuccessRate: number;
  totalUsersServed: number;
}

const MCPAgentIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);

  // Mock data
  const agentStats: AgentStats = {
    totalAgents: 12,
    activeAgents: 10,
    totalInteractions: 15420,
    averageSuccessRate: 94.2,
    totalUsersServed: 2847,
  };

  const mcpAgents: MCPAgent[] = [
    {
      id: 'agent-001',
      name: 'Onboarding Assistant',
      type: 'onboarding',
      status: 'active',
      assignedUsers: 45,
      totalInteractions: 1234,
      successRate: 96.5,
      lastActive: '2025-01-15T10:30:00Z',
      capabilities: ['User Registration', 'Profile Setup', 'Tutorial Guidance'],
    },
    {
      id: 'agent-002',
      name: 'Support Bot',
      type: 'support',
      status: 'active',
      assignedUsers: 23,
      totalInteractions: 856,
      successRate: 92.1,
      lastActive: '2025-01-15T10:25:00Z',
      capabilities: ['Issue Resolution', 'FAQ', 'Escalation'],
    },
    {
      id: 'agent-003',
      name: 'Analytics Engine',
      type: 'analytics',
      status: 'idle',
      assignedUsers: 0,
      totalInteractions: 2341,
      successRate: 98.7,
      lastActive: '2025-01-15T09:45:00Z',
      capabilities: ['Data Analysis', 'Reporting', 'Insights'],
    },
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'onboarding':
        return UserPlus;
      case 'support':
        return MessageSquare;
      case 'analytics':
        return BarChart3;
      case 'automation':
        return Zap;
      default:
        return Users;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Agents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {agentStats.totalAgents}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {agentStats.activeAgents}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Interactions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {agentStats.totalInteractions.toLocaleString()}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {agentStats.averageSuccessRate}%
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Agent Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mcpAgents.slice(0, 3).map(agent => {
              const TypeIcon = getTypeIcon(agent.type);
              return (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <TypeIcon className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{agent.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {agent.totalInteractions} interactions • {agent.assignedUsers} users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}
                    >
                      {agent.status}
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {agent.successRate}% success
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">MCP Agents</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mcpAgents.map(agent => {
          const TypeIcon = getTypeIcon(agent.type);
          return (
            <div key={agent.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <TypeIcon className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{agent.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {agent.type}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}
                >
                  {agent.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Users:</span>
                  <span className="text-gray-900 dark:text-white">{agent.assignedUsers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Interactions:</span>
                  <span className="text-gray-900 dark:text-white">{agent.totalInteractions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                  <span className="text-gray-900 dark:text-white">{agent.successRate}%</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowAgentDetails(true);
                  }}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="w-4 h-4 mr-1" />
                  Configure
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'agents':
        return renderAgents();
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                MCP Agent Integration
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage and monitor MCP agents</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6">
          <div className="flex space-x-8">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 transition-colors ${
                    activeTab === item.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Agent Details Modal */}
      {showAgentDetails && selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedAgent.name} Details
              </h3>
              <button
                onClick={() => setShowAgentDetails(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Type
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedAgent.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{selectedAgent.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Assigned Users
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedAgent.assignedUsers}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Success Rate
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedAgent.successRate}%</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Capabilities
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MCPAgentIntegration;
