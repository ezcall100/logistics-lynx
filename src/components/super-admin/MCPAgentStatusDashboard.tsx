import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  AlertTriangle,
  Users,
  Database,
  Globe,
  Shield,
  BarChart3,
  Play,
  RotateCcw,
  Target,
  Monitor,
} from 'lucide-react';

type TabType = 'agents' | 'portals' | 'performance' | 'alerts';

interface MCPAgent {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'design' | 'devops' | 'qa' | 'integration' | 'ai';
  status: 'online' | 'offline' | 'maintenance' | 'error';
  performance: number;
  tasksActive: number;
  tasksCompleted: number;
  efficiency: number;
  location: string;
  lastUpdate: string;
  capabilities: string[];
  currentTask?: string;
}

interface PortalProgress {
  id: string;
  name: string;
  category: 'core' | 'business' | 'admin';
  progress: number;
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'complete';
  agentsAssigned: number;
  estimatedCompletion: string;
  blockers: string[];
}

export function MCPAgentStatusDashboard() {
  const [activeTab, setActiveTab] = useState<'agents' | 'portals' | 'performance' | 'alerts'>(
    'agents'
  );
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  // Mock MCP Agent data
  const [agents] = useState<MCPAgent[]>([
    {
      id: 'agent-001',
      name: 'Frontend Specialist Alpha',
      type: 'frontend',
      status: 'online',
      performance: 98,
      tasksActive: 3,
      tasksCompleted: 47,
      efficiency: 94,
      location: 'US-East-1',
      lastUpdate: '2 minutes ago',
      capabilities: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      currentTask: 'Building Broker Portal UI components',
    },
    {
      id: 'agent-002',
      name: 'Backend Engineer Beta',
      type: 'backend',
      status: 'online',
      performance: 96,
      tasksActive: 2,
      tasksCompleted: 52,
      efficiency: 92,
      location: 'EU-Central-1',
      lastUpdate: '1 minute ago',
      capabilities: ['Node.js', 'NestJS', 'PostgreSQL', 'Supabase'],
      currentTask: 'Implementing carrier API integrations',
    },
    {
      id: 'agent-003',
      name: 'UI/UX Designer Gamma',
      type: 'design',
      status: 'online',
      performance: 95,
      tasksActive: 4,
      tasksCompleted: 38,
      efficiency: 89,
      location: 'AP-Southeast-1',
      lastUpdate: '3 minutes ago',
      capabilities: ['Figma', 'Design Systems', 'Accessibility', 'Responsive Design'],
      currentTask: 'Creating driver portal mobile interface',
    },
    {
      id: 'agent-004',
      name: 'DevOps Engineer Delta',
      type: 'devops',
      status: 'online',
      performance: 99,
      tasksActive: 1,
      tasksCompleted: 61,
      efficiency: 97,
      location: 'US-West-2',
      lastUpdate: '30 seconds ago',
      capabilities: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
      currentTask: 'Setting up production deployment pipeline',
    },
    {
      id: 'agent-005',
      name: 'QA Automation Epsilon',
      type: 'qa',
      status: 'online',
      performance: 93,
      tasksActive: 2,
      tasksCompleted: 44,
      efficiency: 91,
      location: 'EU-West-1',
      lastUpdate: '4 minutes ago',
      capabilities: ['Jest', 'Cypress', 'Playwright', 'Security Testing'],
      currentTask: 'Running end-to-end tests for shipper portal',
    },
    {
      id: 'agent-006',
      name: 'Integration Specialist Zeta',
      type: 'integration',
      status: 'online',
      performance: 97,
      tasksActive: 3,
      tasksCompleted: 39,
      efficiency: 95,
      location: 'US-Central-1',
      lastUpdate: '1 minute ago',
      capabilities: ['n8n', 'API Integration', 'Webhooks', 'Data Sync'],
      currentTask: 'Configuring n8n workflow automation',
    },
    {
      id: 'agent-007',
      name: 'AI Optimization Agent Eta',
      type: 'ai',
      status: 'online',
      performance: 100,
      tasksActive: 1,
      tasksCompleted: 28,
      efficiency: 98,
      location: 'Global',
      lastUpdate: '2 minutes ago',
      capabilities: ['Machine Learning', 'Optimization', 'Predictive Analytics', 'Auto-healing'],
      currentTask: 'Optimizing portal performance algorithms',
    },
  ]);

  // Mock Portal Progress data
  const [portalProgress] = useState<PortalProgress[]>([
    {
      id: 'broker-portal',
      name: 'Broker Portal',
      category: 'core',
      progress: 85,
      status: 'development',
      agentsAssigned: 12,
      estimatedCompletion: '2 days',
      blockers: [],
    },
    {
      id: 'carrier-portal',
      name: 'Carrier Portal',
      category: 'core',
      progress: 78,
      status: 'development',
      agentsAssigned: 15,
      estimatedCompletion: '3 days',
      blockers: ['API rate limiting'],
    },
    {
      id: 'driver-portal',
      name: 'Driver Portal',
      category: 'core',
      progress: 92,
      status: 'testing',
      agentsAssigned: 8,
      estimatedCompletion: '1 day',
      blockers: [],
    },
    {
      id: 'financial-portal',
      name: 'Financial Portal',
      category: 'business',
      progress: 65,
      status: 'development',
      agentsAssigned: 10,
      estimatedCompletion: '5 days',
      blockers: ['Payment integration pending'],
    },
    {
      id: 'warehouse-portal',
      name: 'Warehouse Portal',
      category: 'business',
      progress: 71,
      status: 'development',
      agentsAssigned: 9,
      estimatedCompletion: '4 days',
      blockers: [],
    },
    {
      id: 'super-admin-portal',
      name: 'Super Admin Portal',
      category: 'admin',
      progress: 100,
      status: 'complete',
      agentsAssigned: 5,
      estimatedCompletion: 'Complete',
      blockers: [],
    },
  ]);

  const [systemMetrics] = useState({
    totalAgents: 250,
    activeAgents: 247,
    offlineAgents: 3,
    totalTasks: 1847,
    completedTasks: 1653,
    activeTasks: 194,
    systemEfficiency: 94.5,
    averageResponseTime: 1.2,
    errorRate: 0.3,
  });

  const handleDeployAgents = async () => {
    setIsDeploying(true);
    try {
      // Simulate agent deployment
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('MCP Agents deployed successfully');
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500/20 text-green-400';
      case 'offline':
        return 'bg-red-500/20 text-red-400';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'frontend':
        return Monitor;
      case 'backend':
        return Database;
      case 'design':
        return Target;
      case 'devops':
        return Globe;
      case 'qa':
        return Shield;
      case 'integration':
        return Zap;
      case 'ai':
        return Brain;
      default:
        return Users;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">MCP Agent Status Dashboard</h1>
              <p className="text-gray-300 text-lg">
                Real-time monitoring of 250 autonomous MCP agents building the complete portal
                ecosystem
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDeployAgents}
                disabled={isDeploying}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isDeploying ? (
                  <RotateCcw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isDeploying ? 'Deploying...' : 'Deploy Agents'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* System Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8"
        >
          {[
            { label: 'Total Agents', value: systemMetrics.totalAgents, color: 'blue' },
            { label: 'Active', value: systemMetrics.activeAgents, color: 'green' },
            { label: 'Offline', value: systemMetrics.offlineAgents, color: 'red' },
            { label: 'Total Tasks', value: systemMetrics.totalTasks, color: 'purple' },
            { label: 'Completed', value: systemMetrics.completedTasks, color: 'green' },
            { label: 'Active Tasks', value: systemMetrics.activeTasks, color: 'yellow' },
            { label: 'Efficiency', value: `${systemMetrics.systemEfficiency}%`, color: 'cyan' },
            { label: 'Error Rate', value: `${systemMetrics.errorRate}%`, color: 'red' },
          ].map((metric, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                {[
                  { id: 'agents', label: 'Agents', icon: Users, count: agents.length },
                  { id: 'portals', label: 'Portals', icon: Globe, count: portalProgress.length },
                  { id: 'performance', label: 'Performance', icon: BarChart3, count: 0 },
                  { id: 'alerts', label: 'Alerts', icon: AlertTriangle, count: 3 },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-white/20">
                <div className="flex">
                  {[
                    { id: 'agents', label: 'Agents', icon: Users },
                    { id: 'portals', label: 'Portals', icon: Globe },
                    { id: 'performance', label: 'Performance', icon: BarChart3 },
                    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'agents' && (
                    <motion.div
                      key="agents"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">MCP Agents</h3>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 text-sm">All Systems Operational</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {agents.map(agent => {
                          const IconComponent = getAgentIcon(agent.type);
                          return (
                            <div
                              key={agent.id}
                              onClick={() => setSelectedAgent(agent.id)}
                              className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                                selectedAgent === agent.id
                                  ? 'border-blue-500 bg-blue-500/20'
                                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                  <IconComponent className="w-6 h-6 text-blue-400" />
                                  <div>
                                    <h4 className="text-white font-semibold">{agent.name}</h4>
                                    <p className="text-gray-400 text-sm capitalize">
                                      {agent.type} Agent
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(agent.status)}`}
                                >
                                  {agent.status}
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-400">Performance</span>
                                  <span className="text-white font-medium">
                                    {agent.performance}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-400">Efficiency</span>
                                  <span className="text-white font-medium">
                                    {agent.efficiency}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-400">Tasks Active</span>
                                  <span className="text-white font-medium">
                                    {agent.tasksActive}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-400">Tasks Completed</span>
                                  <span className="text-white font-medium">
                                    {agent.tasksCompleted}
                                  </span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-400">Location: </span>
                                  <span className="text-white">{agent.location}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-400">Last Update: </span>
                                  <span className="text-white">{agent.lastUpdate}</span>
                                </div>
                              </div>

                              {agent.currentTask && (
                                <div className="mt-4 pt-4 border-t border-white/20">
                                  <div className="text-sm text-gray-400 mb-1">Current Task:</div>
                                  <div className="text-sm text-white">{agent.currentTask}</div>
                                </div>
                              )}

                              {selectedAgent === agent.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-4 pt-4 border-t border-white/20"
                                >
                                  <div className="text-sm text-gray-400 mb-2">Capabilities:</div>
                                  <div className="flex flex-wrap gap-2">
                                    {agent.capabilities.map((capability, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                                      >
                                        {capability}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'portals' && (
                    <motion.div
                      key="portals"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">
                          Portal Development Progress
                        </h3>
                        <div className="text-sm text-gray-400">
                          {portalProgress.filter(p => p.status === 'complete').length} of{' '}
                          {portalProgress.length} complete
                        </div>
                      </div>

                      <div className="space-y-4">
                        {portalProgress.map(portal => (
                          <div
                            key={portal.id}
                            className="bg-white/5 rounded-lg p-6 border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="text-white font-semibold">{portal.name}</h4>
                                <p className="text-gray-400 text-sm capitalize">
                                  {portal.category} Portal
                                </p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-400">
                                  {portal.agentsAssigned} agents
                                </div>
                                <div
                                  className={`px-3 py-1 rounded-full text-sm ${
                                    portal.status === 'complete'
                                      ? 'bg-green-500/20 text-green-400'
                                      : portal.status === 'testing'
                                        ? 'bg-blue-500/20 text-blue-400'
                                        : portal.status === 'development'
                                          ? 'bg-yellow-500/20 text-yellow-400'
                                          : 'bg-gray-500/20 text-gray-400'
                                  }`}
                                >
                                  {portal.status}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white font-medium">{portal.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${getProgressColor(portal.progress)}`}
                                  style={{ width: `${portal.progress}%` }}
                                ></div>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Estimated Completion</span>
                                <span className="text-white">{portal.estimatedCompletion}</span>
                              </div>
                              {portal.blockers.length > 0 && (
                                <div className="text-sm">
                                  <span className="text-red-400">Blockers: </span>
                                  <span className="text-white">{portal.blockers.join(', ')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'performance' && (
                    <motion.div
                      key="performance"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white">System Performance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <h4 className="text-white font-semibold mb-4">
                            Agent Performance Distribution
                          </h4>
                          <div className="space-y-3">
                            {[
                              { range: '90-100%', count: 198, color: 'bg-green-500' },
                              { range: '80-89%', count: 42, color: 'bg-blue-500' },
                              { range: '70-79%', count: 8, color: 'bg-yellow-500' },
                              { range: '60-69%', count: 2, color: 'bg-red-500' },
                            ].map((item, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-gray-400">{item.range}</span>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                  <span className="text-white">{item.count} agents</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                          <h4 className="text-white font-semibold mb-4">Task Completion Rate</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Today</span>
                              <span className="text-white font-medium">94.2%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">This Week</span>
                              <span className="text-white font-medium">96.8%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">This Month</span>
                              <span className="text-white font-medium">95.1%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">All Time</span>
                              <span className="text-white font-medium">94.5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'alerts' && (
                    <motion.div
                      key="alerts"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white">System Alerts</h3>
                      <div className="space-y-4">
                        {[
                          {
                            id: 'alert-001',
                            type: 'warning',
                            title: 'Agent Performance Degradation',
                            message: 'Agent Delta showing 15% performance drop',
                            timestamp: '5 minutes ago',
                            status: 'active',
                          },
                          {
                            id: 'alert-002',
                            type: 'info',
                            title: 'Portal Deployment Scheduled',
                            message: 'Broker Portal deployment scheduled for 2:00 PM',
                            timestamp: '1 hour ago',
                            status: 'scheduled',
                          },
                          {
                            id: 'alert-003',
                            type: 'error',
                            title: 'Integration Failure',
                            message: 'Carrier API integration failed - retrying',
                            timestamp: '3 hours ago',
                            status: 'resolved',
                          },
                        ].map(alert => (
                          <div
                            key={alert.id}
                            className="bg-white/5 rounded-lg p-4 border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 rounded-full ${
                                    alert.type === 'error'
                                      ? 'bg-red-400'
                                      : alert.type === 'warning'
                                        ? 'bg-yellow-400'
                                        : 'bg-blue-400'
                                  }`}
                                ></div>
                                <h4 className="text-white font-medium">{alert.title}</h4>
                              </div>
                              <div
                                className={`px-2 py-1 rounded text-xs ${
                                  alert.status === 'active'
                                    ? 'bg-red-500/20 text-red-400'
                                    : alert.status === 'scheduled'
                                      ? 'bg-blue-500/20 text-blue-400'
                                      : 'bg-green-500/20 text-green-400'
                                }`}
                              >
                                {alert.status}
                              </div>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{alert.message}</p>
                            <div className="text-xs text-gray-500">{alert.timestamp}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
