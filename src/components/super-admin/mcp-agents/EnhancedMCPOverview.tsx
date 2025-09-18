import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Activity,
  Users,
  CheckCircle,
  Clock,
  Play,
  Square,
  RefreshCw,
  Settings,
  Eye,
  EyeOff,
  Download,
  MoreVertical,
  BarChart3,
  Brain,
  Sparkles,
} from 'lucide-react';

interface MCPAgent {
  id: string;
  name: string;
  type: 'autonomous' | 'assistant' | 'monitor' | 'analyzer' | 'orchestrator';
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  health: 'excellent' | 'good' | 'fair' | 'poor';
  performance: number;
  tasksCompleted: number;
  tasksInProgress: number;
  uptime: number;
  lastActivity: string;
  location: string;
  capabilities: string[];
  resources: {
    cpu: number;
    memory: number;
    storage: number;
    network: number;
  };
  metrics: {
    responseTime: number;
    successRate: number;
    errorRate: number;
    throughput: number;
  };
  description: string;
  version: string;
  created: string;
  updated: string;
}

interface AgentTask {
  id: string;
  agentId: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startedAt: string;
  estimatedCompletion: string;
  description: string;
}

interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  totalTasks: number;
  completedTasks: number;
  systemHealth: number;
  averageResponseTime: number;
  totalUptime: number;
}

const EnhancedMCPOverview: React.FC = () => {
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Mock data
  const mockAgents: MCPAgent[] = [
    {
      id: '1',
      name: 'Alpha Orchestrator',
      type: 'orchestrator',
      status: 'active',
      health: 'excellent',
      performance: 98,
      tasksCompleted: 1247,
      tasksInProgress: 3,
      uptime: 99.8,
      lastActivity: new Date().toISOString(),
      location: 'US-East-1',
      capabilities: ['Task Management', 'Resource Allocation', 'Load Balancing', 'Error Recovery'],
      resources: { cpu: 45, memory: 62, storage: 23, network: 78 },
      metrics: { responseTime: 12, successRate: 99.2, errorRate: 0.8, throughput: 1250 },
      description: 'Primary orchestration agent responsible for coordinating all MCP operations',
      version: '2.1.0',
      created: '2024-01-01T00:00:00Z',
      updated: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Beta Analyzer',
      type: 'analyzer',
      status: 'active',
      health: 'good',
      performance: 87,
      tasksCompleted: 892,
      tasksInProgress: 1,
      uptime: 99.5,
      lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      location: 'US-West-2',
      capabilities: ['Data Analysis', 'Pattern Recognition', 'Predictive Modeling', 'Report Generation'],
      resources: { cpu: 67, memory: 78, storage: 45, network: 34 },
      metrics: { responseTime: 45, successRate: 96.8, errorRate: 3.2, throughput: 890 },
      description: 'Advanced analytics agent for data processing and insights generation',
      version: '2.0.8',
      created: '2024-01-02T00:00:00Z',
      updated: '2024-01-14T15:30:00Z',
    },
    {
      id: '3',
      name: 'Gamma Monitor',
      type: 'monitor',
      status: 'active',
      health: 'excellent',
      performance: 95,
      tasksCompleted: 2156,
      tasksInProgress: 0,
      uptime: 99.9,
      lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      location: 'EU-Central-1',
      capabilities: ['System Monitoring', 'Alert Management', 'Performance Tracking', 'Health Checks'],
      resources: { cpu: 23, memory: 34, storage: 12, network: 56 },
      metrics: { responseTime: 8, successRate: 99.7, errorRate: 0.3, throughput: 2150 },
      description: 'System monitoring agent for real-time health and performance tracking',
      version: '2.1.2',
      created: '2024-01-03T00:00:00Z',
      updated: '2024-01-15T08:45:00Z',
    },
    {
      id: '4',
      name: 'Delta Assistant',
      type: 'assistant',
      status: 'maintenance',
      health: 'fair',
      performance: 72,
      tasksCompleted: 567,
      tasksInProgress: 0,
      uptime: 98.2,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      location: 'AP-Southeast-1',
      capabilities: ['User Assistance', 'Query Processing', 'Content Generation', 'Task Automation'],
      resources: { cpu: 89, memory: 91, storage: 67, network: 23 },
      metrics: { responseTime: 120, successRate: 94.5, errorRate: 5.5, throughput: 560 },
      description: 'User assistance agent for handling queries and providing support',
      version: '1.9.5',
      created: '2024-01-04T00:00:00Z',
      updated: '2024-01-13T12:20:00Z',
    },
    {
      id: '5',
      name: 'Epsilon Autonomous',
      type: 'autonomous',
      status: 'error',
      health: 'poor',
      performance: 45,
      tasksCompleted: 234,
      tasksInProgress: 2,
      uptime: 95.1,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      location: 'US-Central-1',
      capabilities: ['Autonomous Operations', 'Decision Making', 'Self-Healing', 'Adaptive Learning'],
      resources: { cpu: 95, memory: 88, storage: 89, network: 45 },
      metrics: { responseTime: 300, successRate: 78.3, errorRate: 21.7, throughput: 230 },
      description: 'Autonomous agent for independent decision making and operations',
      version: '2.0.3',
      created: '2024-01-05T00:00:00Z',
      updated: '2024-01-12T16:10:00Z',
    },
  ];

  const mockTasks: AgentTask[] = [
    {
      id: '1',
      agentId: '1',
      name: 'System Health Check',
      status: 'running',
      priority: 'high',
      progress: 75,
      startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      description: 'Comprehensive system health assessment across all nodes',
    },
    {
      id: '2',
      agentId: '2',
      name: 'Data Analysis Report',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      estimatedCompletion: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      description: 'Monthly analytics report generation for business insights',
    },
    {
      id: '3',
      agentId: '3',
      name: 'Performance Optimization',
      status: 'pending',
      priority: 'low',
      progress: 0,
      startedAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      description: 'Optimize system performance based on recent metrics',
    },
  ];

  const mockSystemMetrics: SystemMetrics = {
    totalAgents: 301,
    activeAgents: 298,
    totalTasks: 15689,
    completedTasks: 15234,
    systemHealth: 96.5,
    averageResponseTime: 45,
    totalUptime: 99.7,
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAgents(mockAgents);
      setTasks(mockTasks);
      setSystemMetrics(mockSystemMetrics);
    } catch (error) {
      console.error('Failed to fetch MCP data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAgentAction = async (agentId: string, action: string) => {
    try {
      switch (action) {
        case 'start':
          setAgents(prev => prev.map(agent => 
            agent.id === agentId ? { ...agent, status: 'active' as const } : agent
          ));
          break;
        case 'stop':
          setAgents(prev => prev.map(agent => 
            agent.id === agentId ? { ...agent, status: 'inactive' as const } : agent
          ));
          break;
        case 'restart':
          setAgents(prev => prev.map(agent => 
            agent.id === agentId ? { ...agent, status: 'maintenance' as const } : agent
          ));
          break;
      }
    } catch (error) {
      console.error('Failed to perform agent action:', error);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesType = filterType === 'all' || agent.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'maintenance': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'orchestrator': return Brain;
      case 'analyzer': return BarChart3;
      case 'monitor': return Activity;
      case 'assistant': return Users;
      case 'autonomous': return Sparkles;
      default: return Bot;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            MCP Agent Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Monitor and manage 301 MCP agents across the system
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
          <button
            onClick={() => setShowDetailedView(!showDetailedView)}
            aria-label="Button"
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {showDetailedView ? <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <span>{showDetailedView ? 'Simple View' : 'Detailed View'}</span>
          </button>
        </div>
      </div>

      {/* System Metrics */}
      {systemMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-3 rounded-lg bg-blue-50 responsive-container sm:flex-col md:flex-row lg:grid">
                <Bot className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.totalAgents}
                </div>
                <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.activeAgents} active
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
              Total Agents
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-3 rounded-lg bg-green-50 responsive-container sm:flex-col md:flex-row lg:grid">
                <CheckCircle className="h-6 w-6 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.completedTasks.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.totalTasks.toLocaleString()} total
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
              Tasks Completed
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-3 rounded-lg bg-purple-50 responsive-container sm:flex-col md:flex-row lg:grid">
                <Activity className="h-6 w-6 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.systemHealth}%
                </div>
                <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.averageResponseTime}ms avg
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
              System Health
            </h3>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="p-3 rounded-lg bg-orange-50 responsive-container sm:flex-col md:flex-row lg:grid">
                <Clock className="h-6 w-6 text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemMetrics.totalUptime}%
                </div>
                <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  Uptime
                </div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
              System Uptime
            </h3>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="lg:col-span-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
              />
              <Bot className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
            <option value="error">Error</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Types</option>
            <option value="orchestrator">Orchestrator</option>
            <option value="analyzer">Analyzer</option>
            <option value="monitor">Monitor</option>
            <option value="assistant">Assistant</option>
            <option value="autonomous">Autonomous</option>
          </select>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {filteredAgents.map((agent, index) => {
          const TypeIcon = getTypeIcon(agent.type);
          
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="p-3 rounded-lg bg-blue-50 responsive-container sm:flex-col md:flex-row lg:grid">
                    <TypeIcon className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      {agent.type} • v{agent.version}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                {agent.description}
              </p>

              <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    Performance
                  </span>
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div
                        className="bg-blue-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{ width: `${agent.performance}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      {agent.performance}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    Health
                  </span>
                  <span className={`text-sm font-medium ${getHealthColor(agent.health)}`}>
                    {agent.health}
                  </span>
                </div>

                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    Tasks
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                    {agent.tasksCompleted} completed, {agent.tasksInProgress} in progress
                  </span>
                </div>

                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    Uptime
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                    {agent.uptime}%
                  </span>
                </div>
              </div>

              {showDetailedView && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="grid grid-cols-2 gap-4 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">CPU</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-red-500 h-1 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${agent.resources.cpu}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Memory</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-blue-500 h-1 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${agent.resources.memory}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Storage</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-green-500 h-1 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${agent.resources.storage}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Network</div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-purple-500 h-1 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${agent.resources.network}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {agent.status === 'active' ? (
                    <button
                      onClick={() => handleAgentAction(agent.id, 'stop')}
            aria-label="Button"
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Stop Agent"
                    >
                      <Square className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAgentAction(agent.id, 'start')}
            aria-label="Button"
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Start Agent"
                    >
                      <Play className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  )}
                  <button
                    onClick={() => handleAgentAction(agent.id, 'restart')}
            aria-label="Button"
                    className="p-1 text-gray-400 hover:text-yellow-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    title="Restart Agent"
                  >
                    <RefreshCw className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Settings className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {new Date(agent.lastActivity).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Active Tasks */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Active Tasks
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            {tasks.length} tasks
          </span>
        </div>

        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'running' ? 'bg-blue-500 animate-pulse' :
                  task.status === 'completed' ? 'bg-green-500' :
                  task.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {task.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                    {task.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {task.progress}%
                  </div>
                  <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div
                      className="bg-blue-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {new Date(task.startedAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedMCPOverview;
}