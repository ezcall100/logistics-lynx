import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Settings, 
  BarChart3, 
  Code,
  Bot,
  User,
  Globe,
  Zap,
  Monitor,
  Server,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Crown
} from 'lucide-react'

interface Portal {
  id: string
  name: string
  category: 'Core TMS' | 'Business Operations'
  status: 'active' | 'development' | 'maintenance' | 'testing'
  developers: number
  lastUpdated: string
  version: string
  features: number
  bugs: number
}

interface Developer {
  id: string
  name: string
  type: 'mcp_agent' | 'human'
  role: 'lead' | 'senior' | 'junior'
  portals: string[]
  status: 'active' | 'busy' | 'offline'
  performance: number
  lastActivity: string
}

interface SystemMetric {
  label: string
  value: string
  change: string
  icon: any
  color: string
}

export function SuperAdminPortal() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null)

  const systemMetrics: SystemMetric[] = [
    { label: 'Active Portals', value: '25', change: '+2', icon: Globe, color: 'text-blue-600' },
    { label: 'MCP Agents', value: '250', change: '+50', icon: Bot, color: 'text-green-600' },
    { label: 'Human Developers', value: '15', change: '+3', icon: User, color: 'text-purple-600' },
    { label: 'System Uptime', value: '99.9%', change: '+0.1%', icon: Server, color: 'text-orange-600' },
    { label: 'Active Users', value: '12,450', change: '+1,200', icon: Users, color: 'text-indigo-600' },
    { label: 'API Calls', value: '2.4M', change: '+180K', icon: Zap, color: 'text-red-600' }
  ]

  const portals: Portal[] = [
    { id: 'dashboard', name: 'Dashboard Portal', category: 'Core TMS', status: 'active', developers: 8, lastUpdated: '2024-01-15', version: '2.1.0', features: 45, bugs: 2 },
    { id: 'broker', name: 'Broker Portal', category: 'Core TMS', status: 'active', developers: 12, lastUpdated: '2024-01-14', version: '1.8.2', features: 38, bugs: 1 },
    { id: 'carrier', name: 'Carrier Portal', category: 'Core TMS', status: 'active', developers: 10, lastUpdated: '2024-01-13', version: '2.0.1', features: 42, bugs: 3 },
    { id: 'shipper', name: 'Shipper Portal', category: 'Core TMS', status: 'development', developers: 6, lastUpdated: '2024-01-12', version: '1.5.0', features: 28, bugs: 5 },
    { id: 'driver', name: 'Driver Portal', category: 'Core TMS', status: 'active', developers: 9, lastUpdated: '2024-01-11', version: '1.9.3', features: 35, bugs: 1 },
    { id: 'analytics', name: 'Analytics Portal', category: 'Business Operations', status: 'testing', developers: 7, lastUpdated: '2024-01-10', version: '1.2.0', features: 22, bugs: 4 },
    { id: 'financials', name: 'Financials Portal', category: 'Business Operations', status: 'active', developers: 11, lastUpdated: '2024-01-09', version: '2.2.1', features: 48, bugs: 2 },
    { id: 'crm', name: 'CRM Portal', category: 'Business Operations', status: 'active', developers: 8, lastUpdated: '2024-01-08', version: '1.7.4', features: 33, bugs: 1 },
    { id: 'load-board', name: 'Load Board Portal', category: 'Business Operations', status: 'maintenance', developers: 5, lastUpdated: '2024-01-07', version: '1.4.2', features: 29, bugs: 6 },
    { id: 'marketplace', name: 'Marketplace Portal', category: 'Business Operations', status: 'development', developers: 9, lastUpdated: '2024-01-06', version: '0.9.1', features: 18, bugs: 8 }
  ]

  const developers: Developer[] = [
    { id: 'mcp_001', name: 'MCP Agent Alpha', type: 'mcp_agent', role: 'lead', portals: ['dashboard', 'broker'], status: 'active', performance: 98, lastActivity: '2024-01-15 14:30' },
    { id: 'mcp_002', name: 'MCP Agent Beta', type: 'mcp_agent', role: 'senior', portals: ['carrier', 'driver'], status: 'busy', performance: 95, lastActivity: '2024-01-15 14:25' },
    { id: 'human_001', name: 'Sarah Johnson', type: 'human', role: 'lead', portals: ['analytics', 'financials'], status: 'active', performance: 92, lastActivity: '2024-01-15 14:20' },
    { id: 'human_002', name: 'Mike Chen', type: 'human', role: 'senior', portals: ['crm', 'load-board'], status: 'active', performance: 89, lastActivity: '2024-01-15 14:15' },
    { id: 'mcp_003', name: 'MCP Agent Gamma', type: 'mcp_agent', role: 'junior', portals: ['marketplace'], status: 'offline', performance: 87, lastActivity: '2024-01-15 13:45' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'development': return 'bg-blue-100 text-blue-800'
      case 'testing': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      case 'busy': return 'bg-purple-100 text-purple-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'development': return <Code className="w-4 h-4" />
      case 'testing': return <Monitor className="w-4 h-4" />
      case 'maintenance': return <Settings className="w-4 h-4" />
      case 'busy': return <Activity className="w-4 h-4" />
      case 'offline': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <Crown className="w-12 h-12" />
            <div>
              <h2 className="text-4xl font-bold">Super Admin Portal</h2>
              <p className="text-xl opacity-90">Complete control over Trans Bot AI ecosystem</p>
            </div>
          </div>
          <p className="text-lg opacity-80 max-w-3xl">
            Manage all 25 portals, oversee 250 MCP Agents, coordinate human developers, 
            and maintain complete control over the Trans Bot AI platform infrastructure.
          </p>
        </motion.div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-transbot-text-secondary text-sm font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-transbot-text-primary">{metric.value}</p>
                <p className="text-green-600 text-sm font-medium">{metric.change}</p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('portals')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Portal Management</h3>
          <p className="text-transbot-text-secondary">Manage all 25 portals and their development status</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('developers')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Developer Control</h3>
          <p className="text-transbot-text-secondary">Oversee MCP Agents and human developers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('analytics')}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">System Analytics</h3>
          <p className="text-transbot-text-secondary">Monitor system performance and usage metrics</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('settings')}
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">System Settings</h3>
          <p className="text-transbot-text-secondary">Configure system-wide settings and permissions</p>
        </motion.div>
      </div>
    </div>
  )

  const renderPortals = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">Portal Development Dashboard</h3>
        <button className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Create New Portal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {portals.map((portal, index) => (
          <motion.div
            key={portal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedPortal(portal)}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-transbot-text-primary mb-1">{portal.name}</h4>
                <p className="text-sm text-transbot-text-secondary">{portal.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(portal.status)}`}>
                {getStatusIcon(portal.status)}
                <span>{portal.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-transbot-text-secondary">Developers</p>
                <p className="font-semibold text-transbot-text-primary">{portal.developers}</p>
              </div>
              <div>
                <p className="text-sm text-transbot-text-secondary">Version</p>
                <p className="font-semibold text-transbot-text-primary">{portal.version}</p>
              </div>
              <div>
                <p className="text-sm text-transbot-text-secondary">Features</p>
                <p className="font-semibold text-transbot-text-primary">{portal.features}</p>
              </div>
              <div>
                <p className="text-sm text-transbot-text-secondary">Bugs</p>
                <p className="font-semibold text-transbot-text-primary">{portal.bugs}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-transbot-text-secondary">Last updated: {portal.lastUpdated}</p>
              <div className="flex space-x-2">
                <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                  <Eye className="w-4 h-4 text-slate-600" />
                </button>
                <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                  <Edit className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderDevelopers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">Developer Management</h3>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <span>Deploy MCP Agent</span>
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Add Human Dev</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  dev.type === 'mcp_agent' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {dev.type === 'mcp_agent' ? (
                    <Bot className="w-6 h-6 text-green-600" />
                  ) : (
                    <User className="w-6 h-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-transbot-text-primary">{dev.name}</h4>
                  <p className="text-sm text-transbot-text-secondary">{dev.type === 'mcp_agent' ? 'MCP Agent' : 'Human Developer'}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(dev.status)}`}>
                {getStatusIcon(dev.status)}
                <span>{dev.status}</span>
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-transbot-text-secondary">Role</p>
                <p className="font-semibold text-transbot-text-primary capitalize">{dev.role}</p>
              </div>
              <div>
                <p className="text-sm text-transbot-text-secondary">Performance</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${dev.performance}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-transbot-text-primary">{dev.performance}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-transbot-text-secondary">Assigned Portals</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dev.portals.map(portal => (
                    <span key={portal} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      {portal}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-transbot-text-secondary">Last activity: {dev.lastActivity}</p>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                Manage
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-transbot-text-primary">System Analytics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Portal Development Progress</h4>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-slate-400" />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Developer Activity</h4>
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
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Security Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Two-Factor Authentication</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">API Rate Limiting</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Audit Logging</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Active</button>
            </div>
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Development Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Auto-Deploy MCP Agents</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Enabled</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Code Quality Gates</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">Configure</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-transbot-text-primary">Performance Monitoring</span>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Active</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <section className="pt-20 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transbot-text-primary">
                  Super Admin Portal
                </h1>
                <p className="text-transbot-text-secondary">
                  Complete control over Trans Bot AI ecosystem
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
                System Status: Healthy
              </div>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                Emergency Stop
              </button>
            </div>
          </motion.div>

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
              onClick={() => setActiveTab('portals')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'portals'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Portal Management
            </button>
            <button
              onClick={() => setActiveTab('developers')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'developers'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Developer Control
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
          {activeTab === 'portals' && renderPortals()}
          {activeTab === 'developers' && renderDevelopers()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </section>

      {/* Portal Detail Modal */}
      {selectedPortal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transbot-text-primary">
                  {selectedPortal.name}
                </h2>
                <button
                  onClick={() => setSelectedPortal(null)}
                  className="text-transbot-text-secondary hover:text-transbot-text-primary"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Category</label>
                    <p className="font-medium">{selectedPortal.category}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Status</label>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(selectedPortal.status)}`}>
                      {getStatusIcon(selectedPortal.status)}
                      <span>{selectedPortal.status}</span>
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Version</label>
                    <p className="font-medium">{selectedPortal.version}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Developers</label>
                    <p className="font-medium">{selectedPortal.developers}</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    Manage Portal
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                    Deploy Update
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
