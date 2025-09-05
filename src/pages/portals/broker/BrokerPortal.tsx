import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  Package, 
  BarChart3, 
  Settings, 
  Search,
  Eye,
  DollarSign,
  TrendingUp,
  Users,
  Plus
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function BrokerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    await trackUserInteraction('broker_portal_tab_changed', { tab })
    
    // Send to N8N for broker analytics
    await trackAIAgentActivity('BrokerAnalytics', 'tab_analytics', {
      brokerId: 'BROKER_001',
      tab: tab,
      timestamp: new Date().toISOString()
    })
  }

  const handleLoadPost = async () => {
    await trackUserInteraction('load_posted', { source: 'broker_portal' })
    await trackAIAgentActivity('LoadManagement', 'load_posted', {
      brokerId: 'BROKER_001',
      action: 'post_load',
      timestamp: new Date().toISOString()
    })
  }

  const brokerStats = {
    totalLoads: 156,
    activeLoads: 23,
    completedLoads: 133,
    totalRevenue: 245000,
    averageRate: 2.45,
    carrierCount: 45,
    onTimeRate: 94
  }

  const stats = [
    { label: 'Total Loads', value: brokerStats.totalLoads.toLocaleString(), icon: Package, color: 'text-transbot-sky' },
    { label: 'Active Loads', value: brokerStats.activeLoads.toString(), icon: Truck, color: 'text-transbot-teal' },
    { label: 'Total Revenue', value: `$${brokerStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'Carrier Network', value: brokerStats.carrierCount.toString(), icon: Users, color: 'text-transbot-warning' }
  ]

  const recentLoads = [
    { 
      id: 'LOAD001', 
      origin: 'Los Angeles, CA', 
      destination: 'New York, NY', 
      distance: 2800, 
      rate: 2.50, 
      pickupTime: '2024-01-15 08:00',
      deliveryTime: '2024-01-17 18:00',
      equipment: 'Dry Van',
      weight: '45,000 lbs',
      status: 'Posted',
      carrier: null
    },
    { 
      id: 'LOAD002', 
      origin: 'Chicago, IL', 
      destination: 'Miami, FL', 
      distance: 1350, 
      rate: 2.80, 
      pickupTime: '2024-01-16 10:00',
      deliveryTime: '2024-01-18 16:00',
      equipment: 'Refrigerated',
      weight: '40,000 lbs',
      status: 'Assigned',
      carrier: 'Swift Transport'
    },
    { 
      id: 'LOAD003', 
      origin: 'Dallas, TX', 
      destination: 'Seattle, WA', 
      distance: 2100, 
      rate: 2.35, 
      pickupTime: '2024-01-17 06:00',
      deliveryTime: '2024-01-19 20:00',
      equipment: 'Flatbed',
      weight: '48,000 lbs',
      status: 'In Transit',
      carrier: 'Prime Inc'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Broker Portal</h1>
              <p className="text-transbot-text-secondary">Manage your freight brokerage operations with AI-powered efficiency</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search loads, carriers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadPost}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Post Load
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
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg"
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
            className="flex space-x-1 bg-white/95 backdrop-blur-sm rounded-xl p-1 border border-slate-200/50 shadow-lg mb-8"
          >
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'loads', label: 'Load Management', icon: Package },
              { id: 'carriers', label: 'Carrier Network', icon: Users },
              { id: 'rates', label: 'Rate Management', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
              {/* Recent Loads */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transbot-text-primary">Recent Loads</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTabChange('loads')}
                    className="text-transbot-sky hover:text-transbot-teal font-medium flex items-center gap-2"
                  >
                    View All
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {recentLoads.map((load) => (
                    <motion.div
                      key={load.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-transbot-neutral-light rounded-lg border border-transbot-border/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-transbot-text-primary">{load.id}</div>
                          <div className="text-sm text-transbot-text-secondary">
                            {load.origin} → {load.destination}
                          </div>
                          <div className="text-xs text-transbot-text-secondary mt-1">
                            {load.equipment} • {load.weight} • {load.distance} miles
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-semibold text-transbot-text-primary">${load.rate}/mile</div>
                          <div className="text-sm text-transbot-text-secondary">
                            ${(load.rate * load.distance).toLocaleString()} total
                          </div>
                          <div className="text-xs text-transbot-text-secondary">
                            Pickup: {load.pickupTime}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          load.status === 'Posted' ? 'bg-transbot-warning/10 text-transbot-warning' :
                          load.status === 'Assigned' ? 'bg-transbot-sky/10 text-transbot-sky' :
                          'bg-transbot-teal/10 text-transbot-teal'
                        }`}>
                          {load.status}
                        </div>
                        {load.carrier && (
                          <div className="text-right">
                            <div className="text-sm font-medium text-transbot-text-primary">{load.carrier}</div>
                            <div className="text-xs text-transbot-text-secondary">Carrier</div>
                          </div>
                        )}
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
                  onClick={() => handleTabChange('loads')}
                >
                  <Package className="w-8 h-8 text-transbot-sky mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Post New Load</h3>
                  <p className="text-transbot-text-secondary text-sm">Create and post a new load to the marketplace</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('carriers')}
                >
                  <Users className="w-8 h-8 text-transbot-teal mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Manage Carriers</h3>
                  <p className="text-transbot-text-secondary text-sm">View and manage your carrier network</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('analytics')}
                >
                  <BarChart3 className="w-8 h-8 text-transbot-purple mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">View Analytics</h3>
                  <p className="text-transbot-text-secondary text-sm">Analyze your brokerage performance</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'loads' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Load Management</h2>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Load Management System</h3>
                <p className="text-transbot-text-secondary">Comprehensive load management interface</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'carriers' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Carrier Network</h2>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Carrier Management</h3>
                <p className="text-transbot-text-secondary">Manage your carrier network and relationships</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'rates' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Rate Management</h2>
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Rate Optimization</h3>
                <p className="text-transbot-text-secondary">AI-powered rate management and optimization</p>
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
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Performance Analytics</h3>
                <p className="text-transbot-text-secondary">Comprehensive brokerage analytics and insights</p>
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
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Broker Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Account Settings</h3>
                <p className="text-transbot-text-secondary">Manage your broker account and preferences</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
