import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  Package, 
  BarChart3, 
  Settings, 
  Search,
  Eye,
  Plus,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp
} from 'lucide-react'
import { trackUserInteraction } from '../../../services/webhookService'

export default function CustomerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    await trackUserInteraction('customer_portal_tab_changed', { tab })
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    await trackUserInteraction('customer_portal_search', { query })
  }

  const shipments = [
    { id: 'SH001', origin: 'Los Angeles, CA', destination: 'New York, NY', status: 'In Transit', eta: '2 days', value: '$15,000' },
    { id: 'SH002', origin: 'Chicago, IL', destination: 'Miami, FL', status: 'Delivered', eta: 'Completed', value: '$8,500' },
    { id: 'SH003', origin: 'Dallas, TX', destination: 'Seattle, WA', status: 'Pending', eta: '1 day', value: '$12,000' }
  ]

  const stats = [
    { label: 'Active Shipments', value: '12', icon: Truck, color: 'text-transbot-sky' },
    { label: 'Total Value', value: '$125K', icon: DollarSign, color: 'text-transbot-teal' },
    { label: 'On-Time Rate', value: '94%', icon: CheckCircle, color: 'text-transbot-purple' },
    { label: 'Cost Savings', value: '18%', icon: TrendingUp, color: 'text-transbot-warning' }
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Customer Portal</h1>
              <p className="text-transbot-text-secondary">Manage your shipments and track deliveries in real-time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackUserInteraction('new_shipment_requested', { source: 'header' })}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Shipment
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
              { id: 'shipments', label: 'Shipments', icon: Package },
              { id: 'tracking', label: 'Tracking', icon: Truck },
              { id: 'reports', label: 'Reports', icon: TrendingUp },
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
              {/* Recent Shipments */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transbot-text-primary">Recent Shipments</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => trackUserInteraction('view_all_shipments', { source: 'dashboard' })}
                    className="text-transbot-sky hover:text-transbot-teal font-medium flex items-center gap-2"
                  >
                    View All
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <motion.div
                      key={shipment.id}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-transbot-text-primary">{shipment.id}</div>
                          <div className="text-sm text-transbot-text-secondary">
                            {shipment.origin} → {shipment.destination}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-semibold text-transbot-text-primary">{shipment.value}</div>
                          <div className="text-sm text-transbot-text-secondary">{shipment.eta}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          shipment.status === 'Delivered' ? 'bg-transbot-teal/10 text-transbot-teal' :
                          shipment.status === 'In Transit' ? 'bg-transbot-sky/10 text-transbot-sky' :
                          'bg-transbot-warning/10 text-transbot-warning'
                        }`}>
                          {shipment.status}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => trackUserInteraction('shipment_details_viewed', { shipmentId: shipment.id })}
                          className="p-2 hover:bg-transbot-sky/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-transbot-text-secondary" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg cursor-pointer"
                  onClick={() => trackUserInteraction('track_shipment_clicked', { source: 'quick_actions' })}
                >
                  <Truck className="w-8 h-8 text-transbot-sky mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Track Shipment</h3>
                  <p className="text-transbot-text-secondary text-sm">Enter tracking number to get real-time updates</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg cursor-pointer"
                  onClick={() => trackUserInteraction('get_quote_clicked', { source: 'quick_actions' })}
                >
                  <DollarSign className="w-8 h-8 text-transbot-teal mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Get Quote</h3>
                  <p className="text-transbot-text-secondary text-sm">Get instant pricing for your shipment</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg cursor-pointer"
                  onClick={() => trackUserInteraction('schedule_pickup_clicked', { source: 'quick_actions' })}
                >
                  <Clock className="w-8 h-8 text-transbot-purple mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Schedule Pickup</h3>
                  <p className="text-transbot-text-secondary text-sm">Schedule a pickup for your shipment</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'shipments' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">All Shipments</h2>
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Shipments Management</h3>
                <p className="text-transbot-text-secondary">Full shipment management interface coming soon</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'tracking' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Real-Time Tracking</h2>
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Live Tracking</h3>
                <p className="text-transbot-text-secondary">Real-time shipment tracking interface coming soon</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Analytics & Reports</h2>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Performance Analytics</h3>
                <p className="text-transbot-text-secondary">Comprehensive reporting dashboard coming soon</p>
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
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Account Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Settings Panel</h3>
                <p className="text-transbot-text-secondary">Account and preference settings coming soon</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
