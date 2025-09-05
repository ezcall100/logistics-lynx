import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  Package, 
  BarChart3, 
  Settings, 
  Search,
  Edit,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Award,
  Target
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function PartnerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [partnerStats] = useState({
    totalLoads: 45,
    completedLoads: 38,
    pendingLoads: 7,
    totalEarnings: 125000,
    rating: 4.8,
    onTimeRate: 94
  })

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    await trackUserInteraction('partner_portal_tab_changed', { tab })
    
    // Send to N8N for partner analytics
    await trackAIAgentActivity('PartnerAnalytics', 'tab_analytics', {
      partnerId: 'PARTNER_001',
      tab: tab,
      timestamp: new Date().toISOString()
    })
  }

  const handleLoadAcceptance = async (loadId: string) => {
    await trackUserInteraction('load_accepted', { loadId })
    
    // Trigger N8N workflow for load acceptance
    await trackAIAgentActivity('LoadManagement', 'load_accepted', {
      loadId,
      partnerId: 'PARTNER_001',
      action: 'accept',
      timestamp: new Date().toISOString()
    })
  }

  const availableLoads = [
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
      status: 'Available'
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
      status: 'Available'
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
      status: 'Available'
    }
  ]

  const stats = [
    { label: 'Available Loads', value: partnerStats.totalLoads.toString(), icon: Package, color: 'text-transbot-sky' },
    { label: 'Completed Loads', value: partnerStats.completedLoads.toString(), icon: CheckCircle, color: 'text-transbot-teal' },
    { label: 'Total Earnings', value: `$${partnerStats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'Partner Rating', value: partnerStats.rating.toString(), icon: Award, color: 'text-transbot-warning' }
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Partner Portal</h1>
              <p className="text-transbot-text-secondary">Manage your loads and maximize your earnings with AI optimization</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search loads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackUserInteraction('partner_profile_updated', { source: 'header' })}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Update Profile
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
              { id: 'loads', label: 'Available Loads', icon: Package },
              { id: 'my-loads', label: 'My Loads', icon: Truck },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'performance', label: 'Performance', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white shadow-lg'
                    : 'text-transbot-text-secondary hover:text-blue-600 hover:bg-blue-50'
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
              {/* Performance Overview */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Performance Overview</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transbot-teal mb-2">{partnerStats.onTimeRate}%</div>
                    <div className="text-sm text-transbot-text-secondary">On-Time Delivery Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transbot-sky mb-2">{partnerStats.rating}/5.0</div>
                    <div className="text-sm text-transbot-text-secondary">Partner Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-transbot-purple mb-2">{partnerStats.completedLoads}</div>
                    <div className="text-sm text-transbot-text-secondary">Loads Completed</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg cursor-pointer"
                  onClick={() => handleTabChange('loads')}
                >
                  <Package className="w-8 h-8 text-transbot-sky mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Browse Loads</h3>
                  <p className="text-transbot-text-secondary text-sm">Find and accept profitable loads</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg cursor-pointer"
                  onClick={() => trackUserInteraction('route_optimization_requested', { source: 'partner_dashboard' })}
                >
                  <Target className="w-8 h-8 text-transbot-teal mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Optimize Routes</h3>
                  <p className="text-transbot-text-secondary text-sm">AI-powered route optimization</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg cursor-pointer"
                  onClick={() => trackUserInteraction('earnings_report_requested', { source: 'partner_dashboard' })}
                >
                  <DollarSign className="w-8 h-8 text-transbot-purple mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">View Earnings</h3>
                  <p className="text-transbot-text-secondary text-sm">Track your revenue and payments</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'loads' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transbot-text-primary">Available Loads</h2>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-transbot-text-secondary" />
                    <span className="text-sm text-transbot-text-secondary">Filter by equipment, rate, distance</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {availableLoads.map((load) => (
                    <motion.div
                      key={load.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-slate-50 rounded-lg border border-slate-200/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Truck className="w-6 h-6 text-white" />
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
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLoadAcceptance(load.id)}
                            className="bg-transbot-teal text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-teal/90 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept Load
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'my-loads' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">My Active Loads</h2>
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Load Management</h3>
                <p className="text-transbot-text-secondary">Track and manage your accepted loads</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Earnings & Payments</h2>
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Revenue Tracking</h3>
                <p className="text-transbot-text-secondary">Detailed earnings and payment history</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'performance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Performance Analytics</h2>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Performance Metrics</h3>
                <p className="text-transbot-text-secondary">Comprehensive performance analytics and insights</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Partner Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Account Settings</h3>
                <p className="text-transbot-text-secondary">Manage your partner account and preferences</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
