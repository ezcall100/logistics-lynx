/**
 * MCP Agent Integration - Super Admin Control for MCP Agents
 * Manage MCP agents for user onboarding and support
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  AlertTriangle,
  Info,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Star,
  Flag,
  Bookmark,
  Archive,
  Send,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  Settings,
  Bell,
  MessageSquare,
  FileText,
  CreditCard,
  Truck,
  Package,
  Car,
  User,
  Globe,
  Server,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  Award,
  Gift,
  Coffee,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Volume1,
  Volume2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Bot,
} from 'lucide-react';

// MCP Agent Status Types
type MCPAgentStatus = 'active' | 'idle' | 'maintenance' | 'error' | 'offline';

// MCP Agent Role Types
type MCPAgentRole =
  | 'User Onboarding'
  | 'Customer Support'
  | 'Data Processing'
  | 'System Monitoring'
  | 'Load Management'
  | 'Fleet Management'
  | 'Financial Processing'
  | 'Communication Hub'
  | 'Analytics Engine'
  | 'Compliance Checker'
  | 'Document Processor'
  | 'Notification Manager'
  | 'Integration Handler'
  | 'Security Monitor'
  | 'Performance Optimizer';

// MCP Agent Interface
interface MCPAgent {
  id: string;
  name: string;
  role: MCPAgentRole;
  status: MCPAgentStatus;
  assignedUsers: string[];
  maxUsers: number;
  currentLoad: number;
  performance: {
    uptime: number;
    responseTime: number;
    successRate: number;
    errorRate: number;
  };
  capabilities: string[];
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
  configuration: {
    autoAssign: boolean;
    priority: 'low' | 'medium' | 'high' | 'critical';
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
    notifications: boolean;
    logging: boolean;
  };
  metrics: {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    averageTaskTime: number;
    userSatisfaction: number;
  };
}

// User Assignment Interface
interface UserAssignment {
  userId: string;
  userName: string;
  userEmail: string;
  companyName: string;
  userRole: string;
  assignedAgent: string;
  assignedAt: string;
  status: 'active' | 'completed' | 'transferred' | 'cancelled';
  tasks: {
    onboarding: boolean;
    training: boolean;
    support: boolean;
    monitoring: boolean;
  };
}

function MCPAgentIntegration() {
  // State Management
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [userAssignments, setUserAssignments] = useState<UserAssignment[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);

  // Mock Data
  useEffect(() => {
    const mockAgents: MCPAgent[] = [
      {
        id: 'MCP-001',
        name: 'Onboarding Specialist',
        role: 'User Onboarding',
        status: 'active',
        assignedUsers: ['user-1', 'user-2', 'user-3'],
        maxUsers: 10,
        currentLoad: 30,
        performance: {
          uptime: 99.8,
          responseTime: 150,
          successRate: 98.5,
          errorRate: 1.5,
        },
        capabilities: ['User Registration', 'Account Setup', 'Training', 'Documentation'],
        lastActivity: '2025-01-15T10:30:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-15T10:30:00Z',
        configuration: {
          autoAssign: true,
          priority: 'high',
          workingHours: {
            start: '09:00',
            end: '17:00',
            timezone: 'UTC',
          },
          notifications: true,
          logging: true,
        },
        metrics: {
          totalTasks: 245,
          completedTasks: 238,
          failedTasks: 7,
          averageTaskTime: 12.5,
          userSatisfaction: 4.8,
        },
      },
      {
        id: 'MCP-002',
        name: 'Support Assistant',
        role: 'Customer Support',
        status: 'active',
        assignedUsers: ['user-4', 'user-5'],
        maxUsers: 15,
        currentLoad: 13.3,
        performance: {
          uptime: 99.9,
          responseTime: 200,
          successRate: 97.2,
          errorRate: 2.8,
        },
        capabilities: ['Issue Resolution', 'FAQ', 'Live Chat', 'Ticket Management'],
        lastActivity: '2025-01-15T10:25:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-15T10:25:00Z',
        configuration: {
          autoAssign: true,
          priority: 'medium',
          workingHours: {
            start: '08:00',
            end: '20:00',
            timezone: 'UTC',
          },
          notifications: true,
          logging: true,
        },
        metrics: {
          totalTasks: 189,
          completedTasks: 184,
          failedTasks: 5,
          averageTaskTime: 8.3,
          userSatisfaction: 4.6,
        },
      },
      {
        id: 'MCP-003',
        name: 'Load Manager',
        role: 'Load Management',
        status: 'idle',
        assignedUsers: ['user-6', 'user-7', 'user-8', 'user-9'],
        maxUsers: 20,
        currentLoad: 20,
        performance: {
          uptime: 99.5,
          responseTime: 100,
          successRate: 99.1,
          errorRate: 0.9,
        },
        capabilities: ['Load Creation', 'Route Optimization', 'Tracking', 'Delivery Management'],
        lastActivity: '2025-01-15T09:45:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-15T09:45:00Z',
        configuration: {
          autoAssign: false,
          priority: 'high',
          workingHours: {
            start: '06:00',
            end: '22:00',
            timezone: 'UTC',
          },
          notifications: true,
          logging: true,
        },
        metrics: {
          totalTasks: 156,
          completedTasks: 154,
          failedTasks: 2,
          averageTaskTime: 15.2,
          userSatisfaction: 4.9,
        },
      },
      {
        id: 'MCP-004',
        name: 'Financial Processor',
        role: 'Financial Processing',
        status: 'maintenance',
        assignedUsers: ['user-10'],
        maxUsers: 25,
        currentLoad: 4,
        performance: {
          uptime: 99.2,
          responseTime: 300,
          successRate: 96.8,
          errorRate: 3.2,
        },
        capabilities: ['Invoice Processing', 'Payment Tracking', 'Financial Reports', 'Compliance'],
        lastActivity: '2025-01-15T08:15:00Z',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-15T08:15:00Z',
        configuration: {
          autoAssign: true,
          priority: 'critical',
          workingHours: {
            start: '00:00',
            end: '23:59',
            timezone: 'UTC',
          },
          notifications: true,
          logging: true,
        },
        metrics: {
          totalTasks: 98,
          completedTasks: 95,
          failedTasks: 3,
          averageTaskTime: 25.8,
          userSatisfaction: 4.7,
        },
      },
    ];

    const mockAssignments: UserAssignment[] = [
      {
        userId: 'user-1',
        userName: 'John Smith',
        userEmail: 'john.smith@abclogistics.com',
        companyName: 'ABC Logistics',
        userRole: 'shipper',
        assignedAgent: 'MCP-001',
        assignedAt: '2025-01-10T10:00:00Z',
        status: 'active',
        tasks: {
          onboarding: true,
          training: false,
          support: true,
          monitoring: true,
        },
      },
      {
        userId: 'user-2',
        userName: 'Sarah Johnson',
        userEmail: 'sarah.johnson@xyztrucking.com',
        companyName: 'XYZ Trucking',
        userRole: 'carrier',
        assignedAgent: 'MCP-001',
        assignedAt: '2025-01-12T14:00:00Z',
        status: 'active',
        tasks: {
          onboarding: false,
          training: true,
          support: true,
          monitoring: true,
        },
      },
      {
        userId: 'user-3',
        userName: 'Mike Davis',
        userEmail: 'mike.davis@freightsolutions.com',
        companyName: 'Freight Solutions Inc',
        userRole: 'broker',
        assignedAgent: 'MCP-001',
        assignedAt: '2025-01-14T16:00:00Z',
        status: 'active',
        tasks: {
          onboarding: true,
          training: true,
          support: false,
          monitoring: true,
        },
      },
    ];

    setAgents(mockAgents);
    setUserAssignments(mockAssignments);
  }, []);

  // Event Handlers
  const handleAgentAction = async (
    agentId: string,
    action: 'start' | 'stop' | 'restart' | 'maintenance'
  ) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setAgents(prev =>
        prev.map(agent => {
          if (agent.id === agentId) {
            switch (action) {
              case 'start':
                return { ...agent, status: 'active', lastActivity: new Date().toISOString() };
              case 'stop':
                return { ...agent, status: 'offline', lastActivity: new Date().toISOString() };
              case 'restart':
                return { ...agent, status: 'active', lastActivity: new Date().toISOString() };
              case 'maintenance':
                return { ...agent, status: 'maintenance', lastActivity: new Date().toISOString() };
              default:
                return agent;
            }
          }
          return agent;
        })
      );
    } catch (error) {
      console.error('Error updating agent:', error);
    } finally {
      // Cleanup or additional logic can go here
    }
  };

  const handleViewAgent = (agent: MCPAgent) => {
    setSelectedAgent(agent);
    setShowAgentDetails(true);
  };

  const handleAssignUser = (agent: MCPAgent) => {
    setSelectedAgent(agent);
  };

  // Status color helper
  const getStatusColor = (status: MCPAgentStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'offline':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Load color helper
  const getLoadColor = (load: number) => {
    if (load < 25) return 'text-green-600 dark:text-green-400';
    if (load < 50) return 'text-yellow-600 dark:text-yellow-400';
    if (load < 75) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Render Agent Details Modal
  const renderAgentDetailsModal = () => {
    if (!selectedAgent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Agent Details: {selectedAgent.name}
            </h2>
            <button
              onClick={() => setShowAgentDetails(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agent Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Agent Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Agent ID
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedAgent.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedAgent.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Role
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedAgent.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAgent.status)}`}
                  >
                    {selectedAgent.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Current Load
                  </label>
                  <p
                    className={`text-gray-900 dark:text-white ${getLoadColor(selectedAgent.currentLoad)}`}
                  >
                    {selectedAgent.currentLoad}% ({selectedAgent.assignedUsers.length}/
                    {selectedAgent.maxUsers} users)
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Last Activity
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(selectedAgent.lastActivity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Metrics
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Uptime
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.performance.uptime}%
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Response Time
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.performance.responseTime}ms
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Success Rate
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.performance.successRate}%
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Error Rate
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.performance.errorRate}%
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    User Satisfaction
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.metrics.userSatisfaction}/5.0
                  </p>
                </div>
              </div>
            </div>

            {/* Capabilities */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Capabilities</h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedAgent.capabilities.map(capability => (
                  <span
                    key={capability}
                    className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>

            {/* Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Auto Assign
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.configuration.autoAssign ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Priority
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedAgent.configuration.priority}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Working Hours
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.configuration.workingHours.start} -{' '}
                    {selectedAgent.configuration.workingHours.end} (
                    {selectedAgent.configuration.workingHours.timezone})
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Notifications
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedAgent.configuration.notifications ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Users */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Assigned Users
            </h3>
            <div className="space-y-2">
              {userAssignments
                .filter(assignment => assignment.assignedAgent === selectedAgent.id)
                .map(assignment => (
                  <div
                    key={assignment.userId}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {assignment.userName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {assignment.companyName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {assignment.userRole}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          assignment.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}
                      >
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            {selectedAgent.status === 'offline' && (
              <button
                onClick={() => handleAgentAction(selectedAgent.id, 'start')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Agent
              </button>
            )}
            {selectedAgent.status === 'active' && (
              <button
                onClick={() => handleAgentAction(selectedAgent.id, 'stop')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Stop Agent
              </button>
            )}
            {selectedAgent.status === 'error' && (
              <button
                onClick={() => handleAgentAction(selectedAgent.id, 'restart')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Restart Agent
              </button>
            )}
            <button
              onClick={() => handleAssignUser(selectedAgent)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Assign User
            </button>
            <button
              onClick={() => setShowAgentDetails(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                MCP Agent Integration
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage MCP agents for user support and automation
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Bot className="w-4 h-4 mr-2" />
                Create Agent
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Agents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{agents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Agents
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {agents.filter(a => a.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Assigned Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {agents.reduce((sum, agent) => sum + agent.assignedUsers.length, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Uptime
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(
                    agents.reduce((sum, agent) => sum + agent.performance.uptime, 0) / agents.length
                  ).toFixed(1)}
                  %
                </p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Agents Table */}
      <div className="px-6 py-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Load
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {agents.map(agent => (
                  <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {agent.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{agent.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white">{agent.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              agent.currentLoad < 25
                                ? 'bg-green-500'
                                : agent.currentLoad < 50
                                  ? 'bg-yellow-500'
                                  : agent.currentLoad < 75
                                    ? 'bg-orange-500'
                                    : 'bg-red-500'
                            }`}
                            style={{ width: `${agent.currentLoad}%` }}
                          />
                        </div>
                        <span className={`text-sm ${getLoadColor(agent.currentLoad)}`}>
                          {agent.currentLoad}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {agent.performance.uptime}% uptime
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {agent.performance.responseTime}ms response
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {agent.assignedUsers.length}/{agent.maxUsers}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">users assigned</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(agent.lastActivity).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewAgent(agent)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {agent.status === 'offline' && (
                          <button
                            onClick={() => handleAgentAction(agent.id, 'start')}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                        )}
                        {agent.status === 'active' && (
                          <button
                            onClick={() => handleAgentAction(agent.id, 'stop')}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Pause className="w-4 h-4" />
                          </button>
                        )}
                        {agent.status === 'error' && (
                          <button
                            onClick={() => handleAgentAction(agent.id, 'restart')}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>{showAgentDetails && renderAgentDetailsModal()}</AnimatePresence>
    </div>
  );
}

export default MCPAgentIntegration;
