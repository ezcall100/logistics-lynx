import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Activity, 
  Zap, 
  Shield, 
  Brain, 
  Network, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  Database,
  Globe,
  Lock,
  Eye,
  Command,
  Terminal,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface MCPAgent {
  id: string;
  name: string;
  type: 'core' | 'portal' | 'security' | 'analytics' | 'automation' | 'integration';
  status: 'active' | 'idle' | 'error' | 'maintenance';
  cpu: number;
  memory: number;
  uptime: number;
  tasksCompleted: number;
  lastActivity: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  capabilities: string[];
  health: number;
}

interface AgentCluster {
  id: string;
  name: string;
  agents: MCPAgent[];
  totalCapacity: number;
  utilization: number;
  status: 'healthy' | 'warning' | 'critical';
}

const MCPAgentOrchestrationCenter: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cluster'>('cluster');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [realTimeData, setRealTimeData] = useState(true);

  // Mock data for 250 MCP agents organized by clusters
  const agentClusters: AgentCluster[] = [
    {
      id: 'core-systems',
      name: 'Core Systems',
      totalCapacity: 100,
      utilization: 78,
      status: 'healthy',
      agents: Array.from({ length: 50 }, (_, i) => ({
        id: `core-${i + 1}`,
        name: `Core Agent ${i + 1}`,
        type: 'core' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as 'active' | 'idle' | 'error' | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '2 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as 'critical' | 'high' | 'medium' | 'low',
        location: 'US-East-1',
        capabilities: ['System Management', 'Database Operations', 'API Management'],
        health: Math.floor(Math.random() * 100)
      }))
    },
    {
      id: 'portal-management',
      name: 'Portal Management',
      totalCapacity: 100,
      utilization: 65,
      status: 'healthy',
      agents: Array.from({ length: 40 }, (_, i) => ({
        id: `portal-${i + 1}`,
        name: `Portal Agent ${i + 1}`,
        type: 'portal' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as 'active' | 'idle' | 'error' | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '1 minute ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as 'critical' | 'high' | 'medium' | 'low',
        location: 'US-West-2',
        capabilities: ['Portal Control', 'User Management', 'Feature Toggles'],
        health: Math.floor(Math.random() * 100)
      }))
    },
    {
      id: 'security-monitoring',
      name: 'Security & Monitoring',
      totalCapacity: 100,
      utilization: 45,
      status: 'healthy',
      agents: Array.from({ length: 35 }, (_, i) => ({
        id: `security-${i + 1}`,
        name: `Security Agent ${i + 1}`,
        type: 'security' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as 'active' | 'idle' | 'error' | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '30 seconds ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as 'critical' | 'high' | 'medium' | 'low',
        location: 'EU-Central-1',
        capabilities: ['Threat Detection', 'Access Control', 'Audit Logging'],
        health: Math.floor(Math.random() * 100)
      }))
    },
    {
      id: 'analytics-intelligence',
      name: 'Analytics & Intelligence',
      totalCapacity: 100,
      utilization: 82,
      status: 'warning',
      agents: Array.from({ length: 30 }, (_, i) => ({
        id: `analytics-${i + 1}`,
        name: `Analytics Agent ${i + 1}`,
        type: 'analytics' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as 'active' | 'idle' | 'error' | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '5 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as 'critical' | 'high' | 'medium' | 'low',
        location: 'AP-Southeast-1',
        capabilities: ['Data Processing', 'ML Models', 'Predictive Analytics'],
        health: Math.floor(Math.random() * 100)
      }))
    },
    {
      id: 'automation-workflows',
      name: 'Automation & Workflows',
      totalCapacity: 100,
      utilization: 71,
      status: 'healthy',
      agents: Array.from({ length: 45 }, (_, i) => ({
        id: `automation-${i + 1}`,
        name: `Automation Agent ${i + 1}`,
        type: 'automation' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as 'active' | 'idle' | 'error' | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '3 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as 'critical' | 'high' | 'medium' | 'low',
        location: 'US-Central-1',
        capabilities: ['Workflow Automation', 'Task Scheduling', 'Process Optimization'],
        health: Math.floor(Math.random() * 100)
      }))
    },
    {
      id: 'integration-services',
      name: 'Integration Services',
      totalCapacity: 100,
      utilization: 58,
      status: 'healthy',
      agents: Array.from({ length: 50 }, (_, i) => ({
        id: `integration-${i + 1}`,
        name: `Integration Agent ${i + 1}`,
        type: 'integration' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as 'active' | 'idle' | 'error' | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '4 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as 'critical' | 'high' | 'medium' | 'low',
        location: 'Global',
        capabilities: ['API Integration', 'Data Sync', 'Third-party Services'],
        health: Math.floor(Math.random() * 100)
      }))
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'idle': return 'text-yellow-400 bg-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      case 'maintenance': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getClusterStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-green-500 bg-green-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'critical': return 'border-red-500 bg-red-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const totalAgents = agentClusters.reduce((sum, cluster) => sum + cluster.agents.length, 0);
  const activeAgents = agentClusters.reduce((sum, cluster) => 
    sum + cluster.agents.filter(agent => agent.status === 'active').length, 0
  );
  const errorAgents = agentClusters.reduce((sum, cluster) => 
    sum + cluster.agents.filter(agent => agent.status === 'error').length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🤖 MCP Agent Orchestration Center
            </h1>
            <p className="text-gray-300 text-lg">
              Real-time monitoring and control of all 250 MCP agents
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">Live</span>
            </div>
            <button 
              onClick={() => setRealTimeData(!realTimeData)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              {realTimeData ? 'Pause Updates' : 'Resume Updates'}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Agents</p>
                <p className="text-3xl font-bold text-white">{totalAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Agents</p>
                <p className="text-3xl font-bold text-green-400">{activeAgents}</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Error Agents</p>
                <p className="text-3xl font-bold text-red-400">{errorAgents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">System Health</p>
                <p className="text-3xl font-bold text-blue-400">99.7%</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="core">Core Systems</option>
            <option value="portal">Portal Management</option>
            <option value="security">Security & Monitoring</option>
            <option value="analytics">Analytics & Intelligence</option>
            <option value="automation">Automation & Workflows</option>
            <option value="integration">Integration Services</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('cluster')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'cluster' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Network className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agent Clusters */}
      <div className="space-y-8">
        {agentClusters.map((cluster, clusterIndex) => (
          <motion.div
            key={cluster.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: clusterIndex * 0.1 }}
            className={`rounded-xl border-2 ${getClusterStatusColor(cluster.status)} p-6`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{cluster.name}</h3>
                  <p className="text-gray-300">
                    {cluster.agents.length} agents • {cluster.utilization}% utilization
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-300">Capacity</p>
                  <p className="text-lg font-bold text-white">{cluster.totalCapacity}%</p>
                </div>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-white/20"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${cluster.utilization * 1.76} 176`}
                      className="text-purple-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{cluster.utilization}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {cluster.agents.slice(0, 8).map((agent, agentIndex) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: agentIndex * 0.05 }}
                  onClick={() => setSelectedAgent(agent)}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-white truncate">
                        {agent.name}
                      </span>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>CPU</span>
                      <span>{agent.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-purple-400 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${agent.cpu}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Memory</span>
                      <span>{agent.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${agent.memory}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Health</span>
                      <span className={getPriorityColor(agent.priority)}>{agent.health}%</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Tasks</span>
                      <span>{agent.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Location</span>
                      <span>{agent.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {cluster.agents.length > 8 && (
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-sm">+</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      +{cluster.agents.length - 8} more agents
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedAgent.name}</h3>
                    <p className="text-gray-300">Agent ID: {selectedAgent.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedAgent.status)}`}>
                      {selectedAgent.status}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Priority</label>
                    <p className={`text-sm font-medium ${getPriorityColor(selectedAgent.priority)}`}>
                      {selectedAgent.priority}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Location</label>
                    <p className="text-sm text-white">{selectedAgent.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Last Activity</label>
                    <p className="text-sm text-white">{selectedAgent.lastActivity}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">CPU Usage</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-400 h-2 rounded-full"
                          style={{ width: `${selectedAgent.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{selectedAgent.cpu}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Memory Usage</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-400 h-2 rounded-full"
                          style={{ width: `${selectedAgent.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{selectedAgent.memory}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Health Score</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-400 h-2 rounded-full"
                          style={{ width: `${selectedAgent.health}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{selectedAgent.health}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Tasks Completed</label>
                    <p className="text-sm text-white">{selectedAgent.tasksCompleted.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">Capabilities</label>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Start Agent</span>
                </button>
                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Pause className="w-4 h-4" />
                  <span>Pause Agent</span>
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Agent</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MCPAgentOrchestrationCenter;
