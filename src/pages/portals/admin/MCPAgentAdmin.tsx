import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Monitor,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Cpu,
  MemoryStick,
  Network,
  TrendingUp,
  BarChart3,
  Clock,
  Target,
  Calendar
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

interface MCPAgent {
  id: string
  name: string
  specialization: string
  status: 'active' | 'idle' | 'busy' | 'offline' | 'maintenance'
  performance: number
  tasksCompleted: number
  currentTask: string
  assignedPortals: string[]
  uptime: string
  lastActivity: string
  capabilities: string[]
  version: string
  resources: {
    cpu: number
    memory: number
    network: number
  }
}

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  assignedAgent: string
  estimatedTime: string
  createdAt: string
}

export function MCPAgentAdmin() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const agents: MCPAgent[] = [
    {
      id: 'mcp_001',
      name: 'MCP Agent Alpha',
      specialization: 'Frontend Development',
      status: 'active',
      performance: 98,
      tasksCompleted: 1247,
      currentTask: 'Implementing responsive design for Broker Portal',
      assignedPortals: ['dashboard', 'broker', 'carrier'],
      uptime: '99.9%',
      lastActivity: '2024-01-15 14:30:15',
      capabilities: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      version: '2.1.0',
      resources: { cpu: 45, memory: 67, network: 23 }
    },
    {
      id: 'mcp_002',
      name: 'MCP Agent Beta',
      specialization: 'Backend Development',
      status: 'busy',
      performance: 95,
      tasksCompleted: 892,
      currentTask: 'Optimizing API performance for load management',
      assignedPortals: ['carrier', 'driver', 'analytics'],
      uptime: '99.7%',
      lastActivity: '2024-01-15 14:28:42',
      capabilities: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
      version: '2.0.8',
      resources: { cpu: 78, memory: 82, network: 45 }
    },
    {
      id: 'mcp_003',
      name: 'MCP Agent Gamma',
      specialization: 'AI/ML Engineering',
      status: 'active',
      performance: 92,
      tasksCompleted: 654,
      currentTask: 'Training recommendation models for rate optimization',
      assignedPortals: ['analytics', 'marketplace', 'autonomous'],
      uptime: '99.5%',
      lastActivity: '2024-01-15 14:25:18',
      capabilities: ['TensorFlow', 'PyTorch', 'OpenAI API', 'MLOps'],
      version: '1.9.5',
      resources: { cpu: 89, memory: 91, network: 34 }
    },
    {
      id: 'mcp_004',
      name: 'MCP Agent Delta',
      specialization: 'DevOps & Infrastructure',
      status: 'idle',
      performance: 97,
      tasksCompleted: 445,
      currentTask: 'Monitoring system health and performance',
      assignedPortals: ['all'],
      uptime: '99.8%',
      lastActivity: '2024-01-15 14:20:33',
      capabilities: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      version: '2.2.1',
      resources: { cpu: 23, memory: 34, network: 12 }
    },
    {
      id: 'mcp_005',
      name: 'MCP Agent Epsilon',
      specialization: 'UI/UX Design',
      status: 'active',
      performance: 89,
      tasksCompleted: 567,
      currentTask: 'Creating wireframes for new marketplace features',
      assignedPortals: ['marketplace', 'crm', 'customer'],
      uptime: '99.2%',
      lastActivity: '2024-01-15 14:22:55',
      capabilities: ['Figma', 'Adobe XD', 'Design Systems', 'User Research'],
      version: '1.8.3',
      resources: { cpu: 34, memory: 45, network: 18 }
    }
  ]

  const tasks: Task[] = [
    {
      id: 'task_001',
      title: 'Implement real-time tracking for driver portal',
      description: 'Add GPS tracking and real-time location updates',
      priority: 'high',
      status: 'in_progress',
      assignedAgent: 'mcp_001',
      estimatedTime: '4 hours',
      createdAt: '2024-01-15 10:00:00'
    },
    {
      id: 'task_002',
      title: 'Optimize database queries for analytics',
      description: 'Improve query performance for large datasets',
      priority: 'medium',
      status: 'pending',
      assignedAgent: 'mcp_002',
      estimatedTime: '6 hours',
      createdAt: '2024-01-15 11:30:00'
    },
    {
      id: 'task_003',
      title: 'Design new marketplace interface',
      description: 'Create modern, intuitive marketplace UI',
      priority: 'low',
      status: 'completed',
      assignedAgent: 'mcp_005',
      estimatedTime: '8 hours',
      createdAt: '2024-01-14 09:00:00'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-blue-100 text-blue-800'
      case 'idle': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'busy': return <Activity className="w-4 h-4" />
      case 'idle': return <Pause className="w-4 h-4" />
      case 'offline': return <XCircle className="w-4 h-4" />
      case 'maintenance': return <Settings className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <Bot className="w-12 h-12" />
            <div>
              <h2 className="text-4xl font-bold">MCP Agent Control Center</h2>
              <p className="text-xl opacity-90">Manage and monitor AI development agents</p>
            </div>
          </div>
          <p className="text-lg opacity-80 max-w-3xl">
            Oversee 250 MCP Agents working on 25 portals. Monitor performance, assign tasks, 
            and ensure optimal resource utilization across the development ecosystem.
          </p>
        </motion.div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Active Agents</p>
              <p className="text-2xl font-bold text-transbot-text-primary">250</p>
              <p className="text-green-600 text-sm font-medium">+12 this week</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Tasks Completed</p>
              <p className="text-2xl font-bold text-transbot-text-primary">3,805</p>
              <p className="text-green-600 text-sm font-medium">+245 today</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Avg Performance</p>
              <p className="text-2xl font-bold text-transbot-text-primary">94.2%</p>
              <p className="text-green-600 text-sm font-medium">+2.1% this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">System Uptime</p>
              <p className="text-2xl font-bold text-transbot-text-primary">99.8%</p>
              <p className="text-green-600 text-sm font-medium">Excellent</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Monitor className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('agents')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Bot className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Agent Management</h3>
          <p className="text-transbot-text-secondary">Monitor and control individual MCP agents</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('tasks')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Task Management</h3>
          <p className="text-transbot-text-secondary">Assign and track development tasks</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('analytics')}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Performance Analytics</h3>
          <p className="text-transbot-text-secondary">Analyze agent performance and productivity</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('settings')}
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">System Settings</h3>
          <p className="text-transbot-text-secondary">Configure agent behavior and limits</p>
        </motion.div>
      </div>
    </div>
  )

  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">MCP Agent Management</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-white/80 border border-slate-200/50 rounded-lg text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Deploy Agent</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-transbot-text-primary">{agent.name}</h4>
                  <p className="text-sm text-transbot-text-secondary">{agent.specialization}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(agent.status)}`}>
                {getStatusIcon(agent.status)}
                <span>{agent.status}</span>
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-transbot-text-secondary">Performance</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${agent.performance}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-transbot-text-primary">{agent.performance}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Current Task</p>
                <p className="text-sm text-transbot-text-primary font-medium">{agent.currentTask}</p>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Resources</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Cpu className="w-3 h-3 text-blue-500" />
                    <span>CPU: {agent.resources.cpu}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MemoryStick className="w-3 h-3 text-green-500" />
                    <span>RAM: {agent.resources.memory}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Network className="w-3 h-3 text-purple-500" />
                    <span>NET: {agent.resources.network}%</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Tasks Completed</p>
                <p className="text-lg font-bold text-transbot-text-primary">{agent.tasksCompleted}</p>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Assigned Portals</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {agent.assignedPortals.map(portal => (
                    <span key={portal} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      {portal}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button 
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                onClick={() => setSelectedAgent(agent)}
              >
                Manage
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                <Play className="w-4 h-4" />
              </button>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                <Pause className="w-4 h-4" />
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">Task Management</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-transbot-text-primary">{task.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-transbot-text-secondary mb-3">{task.description}</p>
                <div className="flex items-center space-x-6 text-sm text-transbot-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Bot className="w-4 h-4" />
                    <span>Assigned to: {task.assignedAgent}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Est. time: {task.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {task.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-transbot-text-primary">Performance Analytics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Agent Performance Trends</h4>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-slate-400" />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Resource Utilization</h4>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center">
            <Activity className="w-16 h-16 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-transbot-text-primary">System Settings</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Agent Configuration</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Auto-scaling</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Performance Monitoring</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Active</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Resource Limits</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Configure</button>
            </div>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Task Management</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Auto-assignment</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Priority Queue</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Active</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Deadline Alerts</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="MCP Agent Admin"
        description="Manage and monitor AI development agents"
        icon={Bot}
        color="from-green-500 to-blue-600"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
            System Status: Healthy
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Deploy New Agent
          </button>
        </div>
      </PortalHeader>
      <section className="pt-8 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-8"
          >
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'agents'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Agent Management
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'tasks'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Task Management
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Settings
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'agents' && renderAgents()}
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </section>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transbot-text-primary">
                  {selectedAgent.name}
                </h2>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-transbot-text-secondary hover:text-transbot-text-primary"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Specialization</label>
                    <p className="font-medium">{selectedAgent.specialization}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Version</label>
                    <p className="font-medium">{selectedAgent.version}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Status</label>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(selectedAgent.status)}`}>
                      {getStatusIcon(selectedAgent.status)}
                      <span>{selectedAgent.status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Uptime</label>
                    <p className="font-medium">{selectedAgent.uptime}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-transbot-text-secondary">Capabilities</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAgent.capabilities.map(capability => (
                      <span key={capability} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-lg">
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    Manage Agent
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                    View Logs
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
