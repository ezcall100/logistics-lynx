import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Users,
  Zap,
  Shield,
  BarChart3,
  PieChart,
  LineChart,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Code,
  Monitor,
} from 'lucide-react';

/**
 * MCP Overview - Intelligent Agent Orchestration Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface MCPAgent {
  id: string;
  name: string;
  type: 'testing' | 'development' | 'security' | 'analytics' | 'automation' | 'monitoring';
  status: 'active' | 'idle' | 'busy' | 'offline' | 'error';
  performance: number;
  tasksCompleted: number;
  currentTask: string;
  lastActivity: string;
  location: string;
  version: string;
  capabilities: string[];
  workload: number;
  efficiency: number;
  reliability: number;
}

interface MCPTask {
  id: string;
  title: string;
  description: string;
  agent: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  estimatedTime: string;
  actualTime: string;
  createdAt: string;
  updatedAt: string;
}

interface MCPMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

export const MCPOverview: React.FC = () => {
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [tasks, setTasks] = useState<MCPTask[]>([]);
  const [metrics, setMetrics] = useState<MCPMetric[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'agents' | 'tasks' | 'performance' | 'analytics'
  >('overview');
  const [searchQuery, setSearchQuery] = useState('');
  // const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    const mockAgents: MCPAgent[] = [
      {
        id: '1',
        name: 'UI Testing Agent Alpha',
        type: 'testing',
        status: 'active',
        performance: 95.2,
        tasksCompleted: 1247,
        currentTask: 'Testing Super Admin Portal Navigation',
        lastActivity: '2025-09-14T19:00:00Z',
        location: 'Cloud Server A',
        version: '2.1.4',
        capabilities: ['UI Testing', 'Automation', 'Regression Testing'],
        workload: 78,
        efficiency: 92,
        reliability: 98,
      },
      {
        id: '2',
        name: 'Security Agent Beta',
        type: 'security',
        status: 'busy',
        performance: 88.7,
        tasksCompleted: 892,
        currentTask: 'Scanning System Vulnerabilities',
        lastActivity: '2025-09-14T18:58:00Z',
        location: 'Cloud Server B',
        version: '1.9.2',
        capabilities: ['Security Scanning', 'Threat Detection', 'Compliance'],
        workload: 95,
        efficiency: 89,
        reliability: 94,
      },
      {
        id: '3',
        name: 'Analytics Agent Gamma',
        type: 'analytics',
        status: 'active',
        performance: 91.3,
        tasksCompleted: 2156,
        currentTask: 'Generating Performance Reports',
        lastActivity: '2025-09-14T18:59:00Z',
        location: 'Cloud Server C',
        version: '3.0.1',
        capabilities: ['Data Analysis', 'Reporting', 'Predictive Analytics'],
        workload: 65,
        efficiency: 95,
        reliability: 97,
      },
      {
        id: '4',
        name: 'Development Agent Delta',
        type: 'development',
        status: 'idle',
        performance: 87.4,
        tasksCompleted: 1876,
        currentTask: 'Waiting for new tasks',
        lastActivity: '2025-09-14T18:45:00Z',
        location: 'Cloud Server D',
        version: '2.5.3',
        capabilities: ['Code Generation', 'Bug Fixing', 'Feature Development'],
        workload: 25,
        efficiency: 88,
        reliability: 91,
      },
      {
        id: '5',
        name: 'Monitoring Agent Epsilon',
        type: 'monitoring',
        status: 'active',
        performance: 93.8,
        tasksCompleted: 3421,
        currentTask: 'Monitoring System Health',
        lastActivity: '2025-09-14T19:00:00Z',
        location: 'Cloud Server E',
        version: '1.7.8',
        capabilities: ['System Monitoring', 'Alerting', 'Performance Tracking'],
        workload: 82,
        efficiency: 94,
        reliability: 99,
      },
    ];

    const mockTasks: MCPTask[] = [
      {
        id: '1',
        title: 'Complete Super Admin Portal Testing',
        description: 'Comprehensive testing of all Super Admin portal features',
        agent: 'UI Testing Agent Alpha',
        status: 'in_progress',
        priority: 'high',
        progress: 75,
        estimatedTime: '2h 30m',
        actualTime: '1h 45m',
        createdAt: '2025-09-14T16:30:00Z',
        updatedAt: '2025-09-14T18:45:00Z',
      },
      {
        id: '2',
        title: 'Security Vulnerability Assessment',
        description: 'Full system security scan and vulnerability assessment',
        agent: 'Security Agent Beta',
        status: 'in_progress',
        priority: 'critical',
        progress: 60,
        estimatedTime: '4h 15m',
        actualTime: '2h 30m',
        createdAt: '2025-09-14T15:00:00Z',
        updatedAt: '2025-09-14T18:30:00Z',
      },
      {
        id: '3',
        title: 'Generate Monthly Performance Report',
        description: 'Create comprehensive monthly performance analytics report',
        agent: 'Analytics Agent Gamma',
        status: 'completed',
        priority: 'medium',
        progress: 100,
        estimatedTime: '1h 20m',
        actualTime: '1h 15m',
        createdAt: '2025-09-14T17:00:00Z',
        updatedAt: '2025-09-14T18:15:00Z',
      },
    ];

    const mockMetrics: MCPMetric[] = [
      {
        name: 'Total Agents',
        value: 302,
        unit: 'agents',
        trend: 'up',
        threshold: 350,
        status: 'normal',
      },
      {
        name: 'Active Agents',
        value: 288,
        unit: 'agents',
        trend: 'up',
        threshold: 300,
        status: 'normal',
      },
      {
        name: 'Tasks Completed Today',
        value: 1247,
        unit: 'tasks',
        trend: 'up',
        threshold: 1000,
        status: 'normal',
      },
      {
        name: 'Average Performance',
        value: 91.2,
        unit: '%',
        trend: 'up',
        threshold: 85,
        status: 'normal',
      },
      {
        name: 'System Efficiency',
        value: 94.8,
        unit: '%',
        trend: 'up',
        threshold: 90,
        status: 'normal',
      },
      { name: 'Error Rate', value: 0.8, unit: '%', trend: 'down', threshold: 2, status: 'normal' },
    ];

    setAgents(mockAgents);
    setTasks(mockTasks);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'busy':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'offline':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'testing':
        return <CheckCircle className="w-5 h-5 text-green-600 responsive-container" />;
      case 'development':
        return <Code className="w-5 h-5 text-blue-600 responsive-container" />;
      case 'security':
        return <Shield className="w-5 h-5 text-red-600 responsive-container" />;
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-purple-600 responsive-container" />;
      case 'automation':
        return <Zap className="w-5 h-5 text-yellow-600 responsive-container" />;
      case 'monitoring':
        return <Monitor className="w-5 h-5 text-indigo-600 responsive-container" />;
      default:
        return <Brain className="w-5 h-5 text-gray-600 responsive-container" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: Activity },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container">
          <div className="flex-1 responsive-container">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">MCP Overview</h1>
            <p className="text-slate-600 dark:text-slate-400 responsive-container">
              Intelligent agent orchestration and management center
            </p>
          </div>

          <div className="flex gap-3 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl responsive-container"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Filter className="w-4 h-4 responsive-container" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <RefreshCw className="w-4 h-4 responsive-container" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Plus className="w-4 h-4 responsive-container" />
              <span>Deploy Agent</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Total Agents</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {metrics.find(m => m.name === 'Total Agents')?.value}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <TrendingUp className="w-4 h-4 mr-1 responsive-container" />
                  +12 this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  Active Agents
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {metrics.find(m => m.name === 'Active Agents')?.value}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-4 h-4 mr-1 responsive-container" />
                  {Math.round(
                    ((metrics.find(m => m.name === 'Active Agents')?.value || 0) /
                      (metrics.find(m => m.name === 'Total Agents')?.value || 1)) *
                      100
                  )}
                  % online
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  Tasks Completed
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {metrics.find(m => m.name === 'Tasks Completed Today')?.value.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1 responsive-container">
                  <TrendingUp className="w-4 h-4 mr-1 responsive-container" />
                  Today
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  System Efficiency
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {metrics.find(m => m.name === 'System Efficiency')?.value}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <TrendingUp className="w-4 h-4 mr-1 responsive-container" />
                  Excellent
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg responsive-container">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400 responsive-container" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8 responsive-container">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto responsive-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(
                    tab.id as 'overview' | 'agents' | 'tasks' | 'performance' | 'analytics'
                  )
                }
            aria-label="Button"
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4 responsive-container" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 responsive-container">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  {/* Agent Status Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                      Agent Status Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container">
                      {agents.slice(0, 6).map((agent, index) => (
                        <motion.div
                          key={agent.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer responsive-container"
                        >
                          <div className="flex items-center justify-between mb-4 responsive-container">
                            <div className="flex items-center space-x-3 responsive-container">
                              {getAgentTypeIcon(agent.type)}
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white responsive-container">
                                  {agent.name}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                                  {agent.currentTask}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}
                            >
                              {agent.status}
                            </span>
                          </div>

                          <div className="space-y-2 responsive-container">
                            <div className="flex items-center justify-between responsive-container">
                              <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                                Performance
                              </span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                                {agent.performance}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between responsive-container">
                              <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                                Tasks Completed
                              </span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                                {agent.tasksCompleted.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between responsive-container">
                              <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                                Workload
                              </span>
                              <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                                {agent.workload}%
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* System Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                      System Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 responsive-container"
                        >
                          <div className="flex items-center justify-between mb-2 responsive-container">
                            <h4 className="font-medium text-slate-900 dark:text-white responsive-container">
                              {metric.name}
                            </h4>
                            <div className="flex items-center space-x-1 responsive-container">
                              {metric.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500 responsive-container" />
                              ) : metric.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-red-500 responsive-container" />
                              ) : (
                                <Activity className="w-4 h-4 text-blue-500 responsive-container" />
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">
                            {metric.value} {metric.unit}
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                            <div
                              className={`h-2 rounded-full ${
                                metric.status === 'critical'
                                  ? 'bg-red-500'
                                  : metric.status === 'warning'
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                              }`}
                              style={{
                                width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'agents' && (
                <motion.div
                  key="agents"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 responsive-container"
                >
                  {agents.map((agent, index) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
                    >
                      <div className="flex items-center justify-between responsive-container">
                        <div className="flex items-center space-x-4 responsive-container">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                            {getAgentTypeIcon(agent.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white responsive-container">
                              {agent.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                              {agent.currentTask}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 responsive-container">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                                v{agent.version}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                                {agent.location}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                                {new Date(agent.lastActivity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 responsive-container">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}
                          >
                            {agent.status}
                          </span>
                          <div className="text-right responsive-container">
                            <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                              {agent.performance}%
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                              Performance
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'tasks' && (
                <motion.div
                  key="tasks"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 responsive-container"
                >
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
                    >
                      <div className="flex items-center justify-between responsive-container">
                        <div className="flex items-center space-x-4 responsive-container">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container">
                            <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400 responsive-container" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white responsive-container">
                              {task.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                              {task.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 responsive-container">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                                {task.agent}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                                {task.estimatedTime}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                                {new Date(task.updatedAt).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 responsive-container">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                          >
                            {task.priority}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
                          >
                            {task.status}
                          </span>
                          <div className="text-right responsive-container">
                            <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                              {task.progress}%
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                              Progress
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'performance' && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  {/* Performance Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Agent Performance
                      </h3>
                      <div className="h-64 flex items-center justify-center responsive-container">
                        <div className="text-center responsive-container">
                          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                          <p className="text-slate-500 dark:text-slate-400 responsive-container">
                            Performance analytics chart
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Task Completion Rate
                      </h3>
                      <div className="h-64 flex items-center justify-center responsive-container">
                        <div className="text-center responsive-container">
                          <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                          <p className="text-slate-500 dark:text-slate-400 responsive-container">
                            Task completion analytics
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                      Performance Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container">
                      {['Efficiency', 'Reliability', 'Workload', 'Response Time'].map(
                        (metric, index) => (
                          <div key={metric} className="bg-white dark:bg-slate-800 rounded-lg p-4 responsive-container">
                            <div className="flex items-center justify-between mb-2 responsive-container">
                              <h4 className="font-medium text-slate-900 dark:text-white responsive-container">
                                {metric}
                              </h4>
                              <TrendingUp className="w-5 h-5 text-green-500 responsive-container" />
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                              <div
                                className="h-2 rounded-full bg-green-500 responsive-container"
                                style={{ width: `${85 + index * 3}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 responsive-container">
                              {85 + index * 3}%
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  {/* Analytics Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Agent Activity
                      </h3>
                      <div className="h-64 flex items-center justify-center responsive-container">
                        <div className="text-center responsive-container">
                          <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                          <p className="text-slate-500 dark:text-slate-400 responsive-container">
                            Real-time agent activity chart
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        System Health
                      </h3>
                      <div className="h-64 flex items-center justify-center responsive-container">
                        <div className="text-center responsive-container">
                          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                          <p className="text-slate-500 dark:text-slate-400 responsive-container">
                            System health monitoring
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Summary */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                      Analytics Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container">
                      {[
                        { name: 'Total Tasks', value: '15,247', trend: '+12%' },
                        { name: 'Success Rate', value: '98.7%', trend: '+0.3%' },
                        { name: 'Avg Response Time', value: '1.2s', trend: '-0.1s' },
                        { name: 'System Uptime', value: '99.9%', trend: 'Stable' },
                        { name: 'Error Rate', value: '0.8%', trend: '-0.2%' },
                        { name: 'Resource Usage', value: '67%', trend: '+5%' },
                      ].map(item => (
                        <div key={item.name} className="bg-white dark:bg-slate-800 rounded-lg p-4 responsive-container">
                          <div className="flex items-center justify-between mb-2 responsive-container">
                            <h4 className="font-medium text-slate-900 dark:text-white responsive-container">
                              {item.name}
                            </h4>
                            <span className="text-sm text-green-600 dark:text-green-400 responsive-container">
                              {item.trend}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPOverview;
