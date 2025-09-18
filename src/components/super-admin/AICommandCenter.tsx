import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command, 
  Brain, 
  Zap, 
  Shield, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  Eye,
  Terminal,
  BarChart3,
  LineChart,
  Play,
  Pause,
  RotateCcw,
  Target,
  Cpu,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalHigh,
  X
} from 'lucide-react';

interface AIAgent {
  id: string;
  name: string;
  type: 'autonomous' | 'monitoring' | 'optimization' | 'security' | 'analytics' | 'automation';
  status: 'online' | 'offline' | 'maintenance' | 'error';
  performance: number;
  tasksActive: number;
  tasksCompleted: number;
  responseTime: number;
  accuracy: number;
  lastUpdate: string;
  location: string;
  capabilities: string[];
  health: number;
  cpu: number;
  memory: number;
  network: number;
}

interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  systemLoad: number;
  responseTime: number;
  accuracy: number;
  uptime: number;
  errors: number;
  warnings: number;
}

interface CommandCenterData {
  agents: AIAgent[];
  metrics: SystemMetrics;
  alerts: Array<{
    id: string;
    type: 'critical' | 'warning' | 'info';
    message: string;
    timestamp: string;
    agent?: string;
  }>;
  performanceHistory: Array<{
    timestamp: string;
    performance: number;
    responseTime: number;
    accuracy: number;
  }>;
}

const AICommandCenter: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'agents' | 'performance' | 'alerts'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // Mock data for AI Command Center
  const [data, setData] = useState<CommandCenterData>({
    agents: Array.from({ length: 50 }, (_, i) => ({
      id: `ai-agent-${i + 1}`,
      name: `AI Agent ${i + 1}`,
      type: ['autonomous', 'monitoring', 'optimization', 'security', 'analytics', 'automation'][Math.floor(Math.random() * 6)] as 'autonomous' | 'monitoring' | 'optimization' | 'security' | 'analytics' | 'automation',
      status: ['online', 'offline', 'maintenance', 'error'][Math.floor(Math.random() * 4)] as 'online' | 'offline' | 'maintenance' | 'error',
      performance: Math.floor(Math.random() * 100),
      tasksActive: Math.floor(Math.random() * 20),
      tasksCompleted: Math.floor(Math.random() * 1000),
      responseTime: Math.floor(Math.random() * 1000),
      accuracy: Math.floor(Math.random() * 100),
      lastUpdate: `${Math.floor(Math.random() * 60)} seconds ago`,
      location: ['US-East', 'US-West', 'EU-Central', 'AP-Southeast'][Math.floor(Math.random() * 4)],
      capabilities: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      health: Math.floor(Math.random() * 100),
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100)
    })),
    metrics: {
      totalAgents: 50,
      activeAgents: 42,
      systemLoad: 78,
      responseTime: 245,
      accuracy: 94.5,
      uptime: 99.8,
      errors: 3,
      warnings: 12
    },
    alerts: [
      {
        id: 'alert-1',
        type: 'critical',
        message: 'Agent AI-23 experiencing high CPU usage',
        timestamp: '2 minutes ago',
        agent: 'AI Agent 23'
      },
      {
        id: 'alert-2',
        type: 'warning',
        message: 'Network latency increased in EU-Central region',
        timestamp: '5 minutes ago'
      },
      {
        id: 'alert-3',
        type: 'info',
        message: 'Scheduled maintenance completed for Agent AI-15',
        timestamp: '10 minutes ago',
        agent: 'AI Agent 15'
      }
    ],
    performanceHistory: Array.from({ length: 24 }, (_, i) => ({
      timestamp: `${i}:00`,
      performance: Math.floor(Math.random() * 100),
      responseTime: Math.floor(Math.random() * 1000),
      accuracy: Math.floor(Math.random() * 100)
    }))
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        agents: prevData.agents.map(agent => ({
          ...agent,
          performance: Math.max(0, Math.min(100, agent.performance + (Math.random() - 0.5) * 10)),
          responseTime: Math.max(0, agent.responseTime + (Math.random() - 0.5) * 100),
          accuracy: Math.max(0, Math.min(100, agent.accuracy + (Math.random() - 0.5) * 5)),
          lastUpdate: 'Just now'
        })),
        metrics: {
          ...prevData.metrics,
          systemLoad: Math.max(0, Math.min(100, prevData.metrics.systemLoad + (Math.random() - 0.5) * 5)),
          responseTime: Math.max(0, prevData.metrics.responseTime + (Math.random() - 0.5) * 50),
          accuracy: Math.max(0, Math.min(100, prevData.metrics.accuracy + (Math.random() - 0.5) * 2))
        }
      }));
    }, 2000);

    return (
    ) => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/20';
      case 'offline': return 'text-red-400 bg-red-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'error': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'autonomous': return <Brain className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'monitoring': return <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'optimization': return <Target className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'security': return <Shield className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'analytics': return <BarChart3 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'automation': return <Zap className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default: return <Command className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getSignalIcon = (strength: number) => {
    if (strength >= 80) return <SignalHigh className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
    if (strength >= 60) return <Signal className="w-4 h-4 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
    if (strength >= 40) return <SignalLow className="w-4 h-4 text-orange-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
    if (strength >= 20) return <SignalZero className="w-4 h-4 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
    return <WifiOff className="w-4 h-4 text-red-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
  };

  const executeCommand = () => {
    if (!commandInput.trim()) return;
    
    setCommandHistory(prev => [...prev, `> ${commandInput}`]);
    
    // Simulate command execution
    const response = `Command executed: ${commandInput}`;
    setCommandHistory(prev => [...prev, response]);
    setCommandInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              🧠 AI Command Center
            </h1>
            <p className="text-gray-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
              Real-time AI agent monitoring and autonomous system control
            </p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                {autoRefresh ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
            aria-label="Button"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {autoRefresh ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'agents', label: 'Agents', icon: Brain },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id as 'overview' | 'agents' | 'performance' | 'alerts')}
            aria-label="Button"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Active Agents</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{data.metrics.activeAgents}</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">of {data.metrics.totalAgents} total</p>
              </div>
              <Brain className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">System Load</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{data.metrics.systemLoad}%</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU utilization</p>
              </div>
              <Cpu className="w-8 h-8 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Response Time</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{data.metrics.responseTime}ms</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Average latency</p>
              </div>
              <Clock className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Accuracy</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{data.metrics.accuracy}%</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">AI model accuracy</p>
              </div>
              <Target className="w-8 h-8 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Left Column - Agent List */}
        <div className="lg:col-span-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">AI Agents</h3>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Filter:</span>
                <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                  <option value="all">All Types</option>
                  <option value="autonomous">Autonomous</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="optimization">Optimization</option>
                  <option value="security">Security</option>
                  <option value="analytics">Analytics</option>
                  <option value="automation">Automation</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {data.agents.slice(0, 10).map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedAgent(agent)}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                        {getTypeIcon(agent.type)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{agent.name}</h4>
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{agent.type}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Performance</p>
                      <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{agent.performance}%</p>
                    </div>
                    <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Response</p>
                      <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{agent.responseTime}ms</p>
                    </div>
                    <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Accuracy</p>
                      <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{agent.accuracy}%</p>
                    </div>
                    <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Health</p>
                      <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{agent.health}%</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        {getSignalIcon(agent.network)}
                        <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{agent.location}</span>
                      </div>
                      <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{agent.lastUpdate}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Command Terminal & Alerts */}
        <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Command Terminal */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <Terminal className="w-5 h-5 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <h3 className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Command Terminal</h3>
            </div>

            <div className="bg-black/50 rounded-lg p-4 h-48 overflow-y-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {commandHistory.map((line, index) => (
                <div key={index} className="text-sm text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  {line}
                </div>
              ))}
            </div>

            <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter AI command..."
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              />
              <button
                onClick={executeCommand}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
                Execute
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <AlertTriangle className="w-5 h-5 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <h3 className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">System Alerts</h3>
            </div>

            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              {data.alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{alert.message}</p>
                      {alert.agent && (
                        <p className="text-xs text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Agent: {alert.agent}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">{alert.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <LineChart className="w-5 h-5 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <h3 className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Performance Trend</h3>
            </div>

            <div className="h-32 flex items-end space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
              {data.performanceHistory.slice(-12).map((point, index) => (
                <div
                  key={index}
                  className="flex-1 bg-blue-400 rounded-t responsive-container sm:flex-col md:flex-row lg:grid"
                  style={{ height: `${point.performance}%` }}
                ></div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4 text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Avg Performance</p>
                <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {Math.round(data.performanceHistory.reduce((sum, p) => sum + p.performance, 0) / data.performanceHistory.length)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Avg Response</p>
                <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {Math.round(data.performanceHistory.reduce((sum, p) => sum + p.responseTime, 0) / data.performanceHistory.length)}ms
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Avg Accuracy</p>
                <p className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {Math.round(data.performanceHistory.reduce((sum, p) => sum + p.accuracy, 0) / data.performanceHistory.length)}%
                </p>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    {getTypeIcon(selectedAgent.type)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.name}</h3>
                    <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Type: {selectedAgent.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
            aria-label="Button"
                  className="text-gray-400 hover:text-white transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</label>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedAgent.status)}`}>
                      {selectedAgent.status}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Location</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Update</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.lastUpdate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Tasks Active</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.tasksActive}</p>
                  </div>
                </div>

                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU Usage</label>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div 
                          className="bg-purple-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${selectedAgent.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.cpu}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory Usage</label>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div 
                          className="bg-blue-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${selectedAgent.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.memory}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Network</label>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div 
                          className="bg-green-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${selectedAgent.network}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.network}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Tasks Completed</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.tasksCompleted.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <label className="text-sm text-gray-400 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Capabilities</label>
                <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Play className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Start Agent</span>
                </button>
                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Pause className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Pause Agent</span>
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <RotateCcw className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
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

export default AICommandCenter;
}