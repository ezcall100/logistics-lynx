import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Users, Settings, Shield, Activity, 
  Zap, Brain, Database, Server, Lock, 
  TrendingUp, Globe, Bot, Cog
} from 'lucide-react'

export function SuperAdminPortal() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: BarChart3,
      description: 'System overview and metrics',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 'users',
      title: 'User Management',
      icon: Users,
      description: 'Manage users, roles, and permissions',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'system',
      title: 'System Administration',
      icon: Server,
      description: 'Server monitoring and configuration',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 'security',
      title: 'Security Center',
      icon: Shield,
      description: 'Security monitoring and compliance',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: TrendingUp,
      description: 'Business intelligence and insights',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      icon: Globe,
      description: 'Third-party integrations and APIs',
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10'
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      icon: Bot,
      description: 'MCP agents and AI automation',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Cog,
      description: 'System configuration and preferences',
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10'
    }
  ]

  const getSectionContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />
      case 'users':
        return <UserManagementSection />
      case 'system':
        return <SystemAdminSection />
      case 'security':
        return <SecuritySection />
      case 'analytics':
        return <AnalyticsSection />
      case 'integrations':
        return <IntegrationsSection />
      case 'ai-agents':
        return <AIAgentsSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <DashboardSection />
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Super Admin Portal
          </h1>
          <p className="text-white/70 text-lg">
            Complete system management and control center
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="glass p-6 rounded-2xl sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Navigation</h2>
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${item.bgColor}`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-white/60 text-sm">{item.description}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass p-8 rounded-2xl"
            >
              {getSectionContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Section
function DashboardSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">System Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-400' },
          { title: 'Active Sessions', value: '1,234', change: '+8%', icon: Activity, color: 'text-green-400' },
          { title: 'System Health', value: '99.9%', change: '0%', icon: Server, color: 'text-purple-400' },
          { title: 'AI Agents', value: '250', change: '+5%', icon: Bot, color: 'text-pink-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-green-400 text-sm font-medium">{stat.change}</div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">System Performance</h3>
          <div className="space-y-4">
            {[
              { metric: 'CPU Usage', value: '45%', status: 'normal' },
              { metric: 'Memory Usage', value: '67%', status: 'normal' },
              { metric: 'Storage', value: '78%', status: 'warning' },
              { metric: 'Network', value: '23%', status: 'normal' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="text-white font-medium">{item.metric}</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white/70">{item.value}</div>
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'normal' ? 'bg-green-400' :
                    item.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'New user registered', time: '2 minutes ago', type: 'user' },
              { action: 'Portal accessed', time: '5 minutes ago', type: 'system' },
              { action: 'AI agent optimized', time: '8 minutes ago', type: 'ai' },
              { action: 'Backup completed', time: '15 minutes ago', type: 'system' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-white/60 text-sm">{activity.type}</div>
                </div>
                <div className="text-white/50 text-sm">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// User Management Section
function UserManagementSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: 'All Users', count: '2,847', icon: Users, color: 'text-blue-400' },
          { title: 'Active Users', count: '1,234', icon: Activity, color: 'text-green-400' },
          { title: 'User Roles', count: '8', icon: Shield, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold text-white">{stat.count}</div>
                <div className="text-white/70 text-sm">{stat.title}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-4">User Management Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'All Users', 'User Roles', 'User Groups', 'Access Control',
            'User Analytics', 'Billing Management', 'Support Tickets', 'User Onboarding'
          ].map((tool, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white text-left"
            >
              {tool}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// System Administration Section
function SystemAdminSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">System Administration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Database Management', icon: Database, color: 'text-blue-400' },
          { title: 'API Management', icon: Zap, color: 'text-green-400' },
          { title: 'Server Monitoring', icon: Server, color: 'text-purple-400' },
          { title: 'Deployment', icon: Settings, color: 'text-yellow-400' },
          { title: 'Configuration', icon: Cog, color: 'text-cyan-400' },
          { title: 'Backup & Recovery', icon: Shield, color: 'text-red-400' },
          { title: 'Security Settings', icon: Lock, color: 'text-pink-400' },
          { title: 'Integration Hub', icon: Globe, color: 'text-indigo-400' },
          { title: 'File Storage', icon: Database, color: 'text-orange-400' },
          { title: 'Email Services', icon: Zap, color: 'text-teal-400' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div className="text-white font-medium">{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Security Section
function SecuritySection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Security Center</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Security Score', value: '98%', icon: Shield, color: 'text-green-400' },
          { title: 'Active Threats', value: '0', icon: Lock, color: 'text-blue-400' },
          { title: 'Failed Logins', value: '12', icon: Activity, color: 'text-yellow-400' },
          { title: 'Security Events', value: '1,234', icon: BarChart3, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-4">Security Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Security Audit', 'Vulnerability Scan', 'Penetration Testing', 'Compliance Check',
            'Access Logs', 'Threat Detection', 'Incident Response', 'Security Policies'
          ].map((tool, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white text-left"
            >
              {tool}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Analytics Section
function AnalyticsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Analytics & Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Business Intelligence', icon: TrendingUp, color: 'text-blue-400' },
          { title: 'User Analytics', icon: Users, color: 'text-green-400' },
          { title: 'Performance Metrics', icon: BarChart3, color: 'text-purple-400' },
          { title: 'Revenue Analytics', icon: Activity, color: 'text-yellow-400' },
          { title: 'Custom Reports', icon: Settings, color: 'text-cyan-400' },
          { title: 'Data Export', icon: Database, color: 'text-red-400' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div className="text-white font-medium">{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Integrations Section
function IntegrationsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'API Management', icon: Zap, color: 'text-blue-400' },
          { title: 'Third-party Apps', icon: Globe, color: 'text-green-400' },
          { title: 'Webhook Management', icon: Settings, color: 'text-purple-400' },
          { title: 'Data Sync', icon: Database, color: 'text-yellow-400' },
          { title: 'Authentication', icon: Lock, color: 'text-cyan-400' },
          { title: 'Monitoring', icon: Activity, color: 'text-red-400' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div className="text-white font-medium">{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// AI Agents Section
function AIAgentsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">AI Agents & MCP</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Agents', value: '250', icon: Bot, color: 'text-blue-400' },
          { title: 'MCP Agents', value: '50', icon: Brain, color: 'text-green-400' },
          { title: 'Tasks Completed', value: '12,847', icon: Activity, color: 'text-purple-400' },
          { title: 'Success Rate', value: '99.2%', icon: TrendingUp, color: 'text-yellow-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-white mb-4">AI Agent Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'Agent Control', 'Task Management', 'Performance Monitoring', 'Agent Training',
            'MCP Configuration', 'Automation Rules', 'Agent Analytics', 'System Optimization'
          ].map((tool, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-white text-left"
            >
              {tool}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Settings Section
function SettingsSection() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'General Settings', icon: Settings, color: 'text-blue-400' },
          { title: 'Theme & Appearance', icon: Cog, color: 'text-green-400' },
          { title: 'Notifications', icon: Activity, color: 'text-purple-400' },
          { title: 'Backup Settings', icon: Database, color: 'text-yellow-400' },
          { title: 'Email Configuration', icon: Zap, color: 'text-cyan-400' },
          { title: 'System Preferences', icon: Shield, color: 'text-red-400' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <div className="text-white font-medium">{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
