import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  Package, 
  BarChart3, 
  Settings, 
  Search,
  DollarSign,
  Users,
  Plus,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function EnhancedBrokerPortal() {
  const [activeTab, setActiveTab] = useState('overview')
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

  const features = [
    {
      icon: Truck,
      title: 'Load Management',
      description: 'Post, track, and manage freight loads with AI-powered optimization',
      benefits: ['Instant load posting', 'Smart carrier matching', 'Real-time tracking', 'Automated updates']
    },
    {
      icon: Users,
      title: 'Carrier Network',
      description: 'Build and manage relationships with verified carriers',
      benefits: ['Carrier verification', 'Performance tracking', 'Rating system', 'Communication tools']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive analytics to optimize your brokerage performance',
      benefits: ['Revenue analytics', 'Market trends', 'Performance metrics', 'Predictive insights']
    },
    {
      icon: DollarSign,
      title: 'Rate Optimization',
      description: 'Dynamic pricing and rate optimization with market intelligence',
      benefits: ['Market rates', 'Competitive pricing', 'Profit optimization', 'Rate history']
    },
    {
      icon: Package,
      title: 'Load Tracking',
      description: 'Real-time tracking and updates for all your shipments',
      benefits: ['GPS tracking', 'Status updates', 'Delivery confirmation', 'Exception alerts']
    },
    {
      icon: Settings,
      title: 'Automation',
      description: 'Automated workflows and smart notifications for efficiency',
      benefits: ['Workflow automation', 'Smart notifications', 'Document management', 'Integration tools']
    }
  ]

  const benefits = [
    'Increase load volume by 40% with AI-powered carrier matching',
    'Reduce operational costs by 25% through automation',
    'Improve on-time delivery rates by 15%',
    'Boost profit margins by 20% with dynamic pricing',
    'Save 10+ hours per week with automated workflows',
    'Enhance customer satisfaction with real-time tracking'
  ]

  const stats = [
    { label: 'Total Loads', value: brokerStats.totalLoads.toLocaleString(), icon: Package, color: 'text-transbot-sky' },
    { label: 'Active Loads', value: brokerStats.activeLoads.toString(), icon: Truck, color: 'text-transbot-teal' },
    { label: 'Total Revenue', value: `$${brokerStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'Carrier Network', value: brokerStats.carrierCount.toString(), icon: Users, color: 'text-transbot-warning' }
  ]

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Broker Portal</h2>
          <p className="text-xl opacity-90 mb-6 max-w-3xl">
            The ultimate platform for freight brokers to manage loads, connect with carriers, 
            and optimize operations with AI-powered insights. Transform your brokerage with 
            intelligent automation and real-time analytics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2">Load Management</h3>
              <p className="text-sm opacity-80">Post, track, and manage freight loads efficiently with AI optimization</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2">Carrier Network</h3>
              <p className="text-sm opacity-80">Connect with verified carriers and build lasting relationships</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2">AI Analytics</h3>
              <p className="text-sm opacity-80">Get intelligent insights and recommendations for better decisions</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Features */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-transbot-text-primary mb-4">
            Powerful Features for Modern Brokers
          </h3>
          <p className="text-transbot-text-secondary max-w-2xl mx-auto">
            Everything you need to run a successful freight brokerage operation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-transbot-text-primary mb-3">
                {feature.title}
              </h4>
              <p className="text-transbot-text-secondary mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-slate-50 rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-transbot-text-primary mb-6 text-center">
            Transform Your Brokerage Operations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-transbot-text-primary mb-4">Key Benefits</h4>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-transbot-text-primary">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-transbot-text-primary mb-4">Success Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/50 text-center"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold text-transbot-text-primary">{stat.value}</div>
                    <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary text-white rounded-2xl p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Brokerage?</h3>
          <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
            Join thousands of successful brokers who have revolutionized their operations with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleLoadPost}
              className="bg-white text-transbot-sky px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-transbot-sky transition-colors">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-transbot-text-secondary text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-transbot-text-primary">{stat.value}</p>
                <p className="text-green-600 text-sm font-medium">+12% this month</p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
        <h3 className="text-xl font-semibold text-transbot-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={handleLoadPost}
            className="bg-gradient-primary text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Load</span>
          </button>
          <button className="bg-slate-100 text-slate-700 p-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Find Carriers</span>
          </button>
          <button className="bg-slate-100 text-slate-700 p-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>View Analytics</span>
          </button>
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
            <div>
              <h1 className="text-3xl font-bold text-transbot-text-primary mb-2">
                Broker Portal
              </h1>
              <p className="text-transbot-text-secondary">
                Manage loads, carriers, and optimize your brokerage operations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search loads, carriers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 border border-slate-200/50 rounded-lg text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent"
                />
              </div>
              <button 
                onClick={handleLoadPost}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Post Load</span>
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
              onClick={() => handleTabChange('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => handleTabChange('loads')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'loads'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Loads
            </button>
            <button
              onClick={() => handleTabChange('carriers')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'carriers'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Carriers
            </button>
            <button
              onClick={() => handleTabChange('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Analytics
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'loads' && (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/50">
              <h3 className="text-2xl font-bold text-transbot-text-primary mb-6">Load Management</h3>
              <p className="text-transbot-text-secondary">Load management features coming soon...</p>
            </div>
          )}
          {activeTab === 'carriers' && (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/50">
              <h3 className="text-2xl font-bold text-transbot-text-primary mb-6">Carrier Network</h3>
              <p className="text-transbot-text-secondary">Carrier management features coming soon...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/50">
              <h3 className="text-2xl font-bold text-transbot-text-primary mb-6">Analytics & Reports</h3>
              <p className="text-transbot-text-secondary">Analytics features coming soon...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
