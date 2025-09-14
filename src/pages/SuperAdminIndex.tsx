import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Shield,
  Settings,
  Bell,
  Menu,
  Brain,
  BarChart3,
  User as UserIcon,
  MessageCircle,
  Building,
  Bot,
  Activity,
  Zap,
  CheckCircle,
  Clock,
  Star,
} from 'lucide-react';
import MCP301AgentsWorking from './portals/super-admin/MCP301AgentsWorking';

/**
 * Super Admin Index Page - Main Entry Point
 * Created by MCP 301 Agents for Real-time Development
 * Timestamp: 2025-09-14T18:26:00.000Z
 * Features: Complete Super Admin portal with all MCP 301 agents
 */

interface MCPAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'working' | 'idle';
  progress: number;
  lastActivity: string;
}

const SuperAdminIndex: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mcpAgents, setMcpAgents] = useState<MCPAgent[]>([]);
  const [isLiveUpdate, setIsLiveUpdate] = useState(true);

  // Mock MCP 301 agents data
  useEffect(() => {
    const agents: MCPAgent[] = [
      {
        id: '1',
        name: 'PlanBot',
        role: 'Strategy Planner',
        status: 'active',
        progress: 100,
        lastActivity: '2 min ago',
      },
      {
        id: '2',
        name: 'FormBot',
        role: 'Form Developer',
        status: 'working',
        progress: 85,
        lastActivity: '1 min ago',
      },
      {
        id: '3',
        name: 'TableBot',
        role: 'Table Specialist',
        status: 'working',
        progress: 90,
        lastActivity: '30 sec ago',
      },
      {
        id: '4',
        name: 'UIBot',
        role: 'UI Designer',
        status: 'active',
        progress: 95,
        lastActivity: '1 min ago',
      },
      {
        id: '5',
        name: 'SecurityBot',
        role: 'Security Expert',
        status: 'working',
        progress: 80,
        lastActivity: '45 sec ago',
      },
      {
        id: '6',
        name: 'PerformanceBot',
        role: 'Performance Optimizer',
        status: 'active',
        progress: 88,
        lastActivity: '2 min ago',
      },
      {
        id: '7',
        name: 'TestBot',
        role: 'Quality Tester',
        status: 'working',
        progress: 92,
        lastActivity: '1 min ago',
      },
      {
        id: '8',
        name: 'IntegrationBot',
        role: 'API Integrator',
        status: 'active',
        progress: 87,
        lastActivity: '30 sec ago',
      },
    ];
    setMcpAgents(agents);

    // Simulate real-time updates
    if (isLiveUpdate) {
      const interval = setInterval(() => {
        setMcpAgents(prev =>
          prev.map(agent => ({
            ...agent,
            progress: Math.min(100, agent.progress + Math.random() * 2),
            lastActivity: 'Just now',
          }))
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveUpdate]);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, color: 'blue' },
    { id: 'users', name: 'User Management', icon: Users, color: 'green' },
    { id: 'companies', name: 'Company Management', icon: Building, color: 'purple' },
    { id: 'security', name: 'Security Center', icon: Shield, color: 'red' },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp, color: 'yellow' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'gray' },
    { id: 'mcp-agents', name: 'MCP Agents', icon: Bot, color: 'indigo' },
    { id: 'communication', name: 'Communication Hub', icon: MessageCircle, color: 'pink' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'working':
        return 'text-blue-400';
      case 'idle':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'working':
        return <Activity className="w-4 h-4" />;
      case 'idle':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Super Admin Portal</h1>
                <p className="text-sm text-gray-400">MCP 301 Agents • Real-time Development</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isLiveUpdate ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm text-gray-400">
                {isLiveUpdate ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <button
              onClick={() => setIsLiveUpdate(!isLiveUpdate)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isLiveUpdate ? 'Pause' : 'Resume'}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <UserIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarCollapsed ? 80 : 280 }}
          className="bg-white/5 backdrop-blur-sm border-r border-white/10 min-h-screen"
        >
          <div className="p-4">
            <nav className="space-y-2">
              {modules.map(module => (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeModule === module.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <module.icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="font-medium">{module.name}</span>}
                </button>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeModule === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-gray-400">Real-time Updates</span>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Users</p>
                        <p className="text-2xl font-bold text-white">12,450</p>
                        <p className="text-sm text-green-400">+12% this month</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Active Companies</p>
                        <p className="text-2xl font-bold text-white">1,234</p>
                        <p className="text-sm text-green-400">+8% this month</p>
                      </div>
                      <Building className="w-8 h-8 text-green-400" />
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">MCP Agents</p>
                        <p className="text-2xl font-bold text-white">301</p>
                        <p className="text-sm text-blue-400">All Active</p>
                      </div>
                      <Bot className="w-8 h-8 text-purple-400" />
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">System Health</p>
                        <p className="text-2xl font-bold text-white">99.9%</p>
                        <p className="text-sm text-green-400">Optimal</p>
                      </div>
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                  </div>
                </div>

                {/* MCP Agents Status */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">MCP 301 Agents Status</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">All Systems Operational</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mcpAgents.map(agent => (
                      <div
                        key={agent.id}
                        className="bg-white/5 border border-white/10 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(agent.status)}
                            <span className={`text-sm font-medium ${getStatusColor(agent.status)}`}>
                              {agent.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">{agent.lastActivity}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{agent.role}</p>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${agent.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {Math.round(agent.progress)}% complete
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      {
                        action: 'FormBot created new user registration form',
                        time: '2 minutes ago',
                        icon: CheckCircle,
                        color: 'green',
                      },
                      {
                        action: 'TableBot optimized data table performance',
                        time: '5 minutes ago',
                        icon: Zap,
                        color: 'blue',
                      },
                      {
                        action: 'SecurityBot implemented new security measures',
                        time: '8 minutes ago',
                        icon: Shield,
                        color: 'red',
                      },
                      {
                        action: 'UIBot enhanced glass-morphism design',
                        time: '12 minutes ago',
                        icon: Star,
                        color: 'yellow',
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                      >
                        <activity.icon className={`w-5 h-5 text-${activity.color}-400`} />
                        <div className="flex-1">
                          <p className="text-sm text-white">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeModule === 'mcp-agents' && (
              <motion.div
                key="mcp-agents"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <MCP301AgentsWorking />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminIndex;
