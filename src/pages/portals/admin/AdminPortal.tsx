import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Search,
  Eye,
  CheckCircle,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Database,
  Package,
  Activity
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    await trackUserInteraction('admin_portal_tab_changed', { tab })
    
    // Send to N8N for admin analytics
    await trackAIAgentActivity('AdminAnalytics', 'tab_analytics', {
      adminId: 'ADMIN_001',
      tab: tab,
      timestamp: new Date().toISOString()
    })
  }

  const systemStats = {
    totalUsers: 1247,
    activeShipments: 89,
    totalRevenue: 1250000,
    systemUptime: 99.9,
    apiCalls: 45678,
    webhookEvents: 1234
  }

  const stats = [
    { label: 'Total Users', value: systemStats.totalUsers.toLocaleString(), icon: Users, color: 'text-transbot-sky' },
    { label: 'Active Shipments', value: systemStats.activeShipments.toString(), icon: Package, color: 'text-transbot-teal' },
    { label: 'Total Revenue', value: `$${systemStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'System Uptime', value: `${systemStats.systemUptime}%`, icon: CheckCircle, color: 'text-transbot-warning' }
  ]

  const recentActivities = [
    { id: 1, type: 'user_registration', user: 'John Doe', action: 'Registered as Partner', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'shipment_created', user: 'ABC Logistics', action: 'Created shipment SH001', time: '5 minutes ago', status: 'success' },
    { id: 3, type: 'api_error', user: 'Developer Portal', action: 'API rate limit exceeded', time: '8 minutes ago', status: 'warning' },
    { id: 4, type: 'payment_processed', user: 'XYZ Transport', action: 'Payment of $2,500 processed', time: '12 minutes ago', status: 'success' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-purple/5 via-white to-transbot-sky/5">
      {/* Header */}
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Admin Portal</h1>
              <p className="text-transbot-text-secondary">System administration and monitoring dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search system..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackUserInteraction('system_backup_triggered', { source: 'admin_header' })}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                System Backup
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <div className="text-2xl font-bold text-transbot-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-transbot-border/20 shadow-transbot mb-8"
          >
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'system', label: 'System Monitor', icon: Activity },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white shadow-transbot'
                    : 'text-transbot-text-secondary hover:text-transbot-sky hover:bg-transbot-sky/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* System Overview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot">
                <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">System Overview</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transbot-teal mb-2">{systemStats.apiCalls.toLocaleString()}</div>
                    <div className="text-sm text-transbot-text-secondary">API Calls Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transbot-sky mb-2">{systemStats.webhookEvents.toLocaleString()}</div>
                    <div className="text-sm text-transbot-text-secondary">Webhook Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transbot-purple mb-2">{systemStats.systemUptime}%</div>
                    <div className="text-sm text-transbot-text-secondary">System Uptime</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transbot-text-primary">Recent Activity</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackUserInteraction('view_all_activity', { source: 'admin_dashboard' })}
                    className="text-transbot-sky hover:text-transbot-teal font-medium flex items-center gap-2"
                  >
                    View All
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-transbot-neutral-light rounded-lg border border-transbot-border/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-transbot-teal/10' :
                          activity.status === 'warning' ? 'bg-transbot-warning/10' :
                          'bg-transbot-sky/10'
                        }`}>
                          {activity.status === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-transbot-teal" />
                          ) : activity.status === 'warning' ? (
                            <AlertCircle className="w-5 h-5 text-transbot-warning" />
                          ) : (
                            <Activity className="w-5 h-5 text-transbot-sky" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-transbot-text-primary">{activity.user}</div>
                          <div className="text-sm text-transbot-text-secondary">{activity.action}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-transbot-text-secondary">{activity.time}</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === 'success' ? 'bg-transbot-teal/10 text-transbot-teal' :
                          activity.status === 'warning' ? 'bg-transbot-warning/10 text-transbot-warning' :
                          'bg-transbot-sky/10 text-transbot-sky'
                        }`}>
                          {activity.status}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('users')}
                >
                  <Users className="w-8 h-8 text-transbot-sky mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">User Management</h3>
                  <p className="text-transbot-text-secondary text-sm">Manage users, roles, and permissions</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('system')}
                >
                  <Activity className="w-8 h-8 text-transbot-teal mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">System Monitor</h3>
                  <p className="text-transbot-text-secondary text-sm">Monitor system performance and health</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('security')}
                >
                  <Shield className="w-8 h-8 text-transbot-purple mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Security Center</h3>
                  <p className="text-transbot-text-secondary text-sm">Security monitoring and threat detection</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">User Management</h2>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">User Administration</h3>
                <p className="text-transbot-text-secondary">Comprehensive user management interface</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">System Monitor</h2>
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">System Monitoring</h3>
                <p className="text-transbot-text-secondary">Real-time system performance monitoring</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Analytics Dashboard</h2>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Advanced Analytics</h3>
                <p className="text-transbot-text-secondary">Comprehensive system analytics and insights</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Security Center</h2>
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Security Monitoring</h3>
                <p className="text-transbot-text-secondary">Advanced security monitoring and threat detection</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">System Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Configuration</h3>
                <p className="text-transbot-text-secondary">System configuration and preferences</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
