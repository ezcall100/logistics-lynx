import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Activity,
  Zap,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Database,
  Settings,
  RefreshCw,
  Cpu,
  HardDrive,
  Wifi,
  X
} from 'lucide-react';

interface MCPAgent {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'testing' | 'error';
  type: 'refactoring' | 'security' | 'monitoring' | 'deployment';
  healthScore: number;
  lastActivity: string;
  assignedTasks: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  errorRate: number;
  uptime: number;
  location: string;
  ipAddress: string;
  version: string;
}

interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  inactiveAgents: number;
  testingAgents: number;
  errorAgents: number;
  averageHealthScore: number;
  totalTasksCompleted: number;
  totalErrorsFixed: number;
  systemUptime: number;
  lastUpdate: string;
}

const MCPDashboard: React.FC = () => {
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalAgents: 302,
    activeAgents: 285,
    inactiveAgents: 12,
    testingAgents: 3,
    errorAgents: 2,
    averageHealthScore: 94.5,
    totalTasksCompleted: 15420,
    totalErrorsFixed: 8932,
    systemUptime: 99.8,
    lastUpdate: new Date().toLocaleTimeString()
  });
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate agent data
  useEffect(() => {
    const generateAgents = (): MCPAgent[] => {
      const agentTypes = ['refactoring', 'security', 'monitoring', 'deployment'] as const;
      const statuses = ['active', 'inactive', 'testing', 'error'] as const;
      const locations = ['US-East', 'US-West', 'EU-Central', 'Asia-Pacific'];
      
      return Array.from({ length: 302 }, (_, i) => ({
        id: `agent-${i + 1}`,
        name: `MCP Agent ${i + 1}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        type: agentTypes[Math.floor(Math.random() * agentTypes.length)],
        healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
        lastActivity: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        assignedTasks: Math.floor(Math.random() * 50),
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        diskUsage: Math.floor(Math.random() * 100),
        networkLatency: Math.floor(Math.random() * 100) + 10,
        errorRate: Math.random() * 5,
        uptime: Math.random() * 100,
        location: locations[Math.floor(Math.random() * locations.length)],
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
        version: `v2.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`
      }));
    };

    setAgents(generateAgents());
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
      setIsRefreshing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-100';
      case 'inactive': return 'text-gray-500 bg-gray-100';
      case 'testing': return 'text-yellow-500 bg-yellow-100';
      case 'error': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'refactoring': return 'text-blue-500 bg-blue-100';
      case 'security': return 'text-red-500 bg-red-100';
      case 'monitoring': return 'text-purple-500 bg-purple-100';
      case 'deployment': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="responsive-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">MCP Dashboard</h1>
                <p className="text-sm text-gray-400">302 Agents Monitoring Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <div className="text-sm text-gray-400">
                Last updated: {metrics.lastUpdate}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="responsive-container py-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Agents</p>
                <p className="text-3xl font-bold text-white">{metrics.totalAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Agents</p>
                <p className="text-3xl font-bold text-green-500">{metrics.activeAgents}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Health Score</p>
                <p className="text-3xl font-bold text-white">{metrics.averageHealthScore}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tasks Completed</p>
                <p className="text-3xl font-bold text-white">{metrics.totalTasksCompleted.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-yellow-500" />
            </div>
          </motion.div>
        </div>

        {/* Agent Grid */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">MCP Agents Status</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Active ({metrics.activeAgents})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Testing ({metrics.testingAgents})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Error ({metrics.errorAgents})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {agents.slice(0, 20).map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedAgent(agent)}
                    className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-sm">{agent.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Health</span>
                        <span className={`font-medium ${getHealthColor(agent.healthScore)}`}>
                          {agent.healthScore}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Type</span>
                        <span className={`px-2 py-1 rounded text-xs ${getTypeColor(agent.type)}`}>
                          {agent.type}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Tasks</span>
                        <span className="text-white">{agent.assignedTasks}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">CPU</span>
                        <span className="text-white">{agent.cpuUsage}%</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-white">{agent.memoryUsage}%</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{agent.location}</span>
                        <span>{agent.version}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Showing 20 of {agents.length} agents
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">System Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-300">CPU Usage</span>
                </div>
                <span className="text-white">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <HardDrive className="w-5 h-5 text-green-500" />
                  <span className="text-gray-300">Memory Usage</span>
                </div>
                <span className="text-white">62%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wifi className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-300">Network Latency</span>
                </div>
                <span className="text-white">12ms</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-300">Database Status</span>
                </div>
                <span className="text-green-500">Healthy</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-300">Agent 45 completed security scan</span>
                <span className="text-gray-500 text-xs ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="text-gray-300">Agent 123 deployed new feature</span>
                <span className="text-gray-500 text-xs ml-auto">5 min ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-300">Agent 67 detected performance issue</span>
                <span className="text-gray-500 text-xs ml-auto">8 min ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="w-4 h-4 text-red-500" />
                <span className="text-gray-300">Agent 89 fixed security vulnerability</span>
                <span className="text-gray-500 text-xs ml-auto">12 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Agent Details</h2>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Info</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Name:</span>
                      <span className="ml-2 text-white">{selectedAgent.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getStatusColor(selectedAgent.status)}`}>
                        {selectedAgent.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type:</span>
                      <span className="ml-2 text-white">{selectedAgent.type}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Version:</span>
                      <span className="ml-2 text-white">{selectedAgent.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <span className="ml-2 text-white">{selectedAgent.location}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">IP Address:</span>
                      <span className="ml-2 text-white">{selectedAgent.ipAddress}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400">Health Score:</span>
                      <span className={`ml-2 font-medium ${getHealthColor(selectedAgent.healthScore)}`}>
                        {selectedAgent.healthScore}%
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">CPU Usage:</span>
                      <span className="ml-2 text-white">{selectedAgent.cpuUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Memory Usage:</span>
                      <span className="ml-2 text-white">{selectedAgent.memoryUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Disk Usage:</span>
                      <span className="ml-2 text-white">{selectedAgent.diskUsage}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Network Latency:</span>
                      <span className="ml-2 text-white">{selectedAgent.networkLatency}ms</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Error Rate:</span>
                      <span className="ml-2 text-white">{selectedAgent.errorRate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  <Pause className="w-4 h-4 inline mr-2" />
                  Pause
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 inline mr-2" />
                  Configure
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MCPDashboard;