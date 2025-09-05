import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Shield, 
  Users,
  Brain,
  Truck,
  BarChart3,
  Target,
  Star,
  TrendingUp,
  Activity,
  FileText,
  DollarSign,
  Package,
  Route,
  Fuel,
  Sparkles,
  Rocket,
  PieChart,
  LineChart
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'

export function EnhancedHomePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  useEffect(() => {
    trackUserInteraction('enhanced_home_visited', { timestamp: Date.now() })
  }, [])

  const handleNavigation = async (path: string) => {
    await trackUserInteraction('home_navigation', { path })
    navigate(path)
  }

  const stats = [
    { label: 'Active Users', value: '2,500+', icon: Users, color: 'text-blue-500', change: '+12%' },
    { label: 'Loads Processed', value: '50K+', icon: Truck, color: 'text-green-500', change: '+8%' },
    { label: 'Routes Optimized', value: '15K+', icon: Target, color: 'text-purple-500', change: '+15%' },
    { label: 'AI Insights', value: '1.2M+', icon: Brain, color: 'text-orange-500', change: '+22%' }
  ]

  const dashboardTabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'performance', name: 'Performance', icon: Activity },
    { id: 'reports', name: 'Reports', icon: FileText }
  ]

  const recentActivities = [
    { id: 1, type: 'load', message: 'New load assigned to Driver #1234', time: '2 min ago', status: 'active' },
    { id: 2, type: 'route', message: 'Route optimized for Chicago delivery', time: '5 min ago', status: 'completed' },
    { id: 3, type: 'alert', message: 'Fuel efficiency alert for Fleet #567', time: '10 min ago', status: 'warning' },
    { id: 4, type: 'payment', message: 'Payment processed for Load #789', time: '15 min ago', status: 'completed' }
  ]

  const quickActions = [
    { name: 'Create Load', icon: Package, path: '/loads/create', color: 'bg-blue-500' },
    { name: 'Optimize Route', icon: Route, path: '/routes/optimize', color: 'bg-green-500' },
    { name: 'View Analytics', icon: BarChart3, path: '/analytics', color: 'bg-purple-500' },
    { name: 'Manage Fleet', icon: Truck, path: '/fleet', color: 'bg-orange-500' }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-transbot-text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
        <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <motion.button
              key={action.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(action.path)}
              className="flex flex-col items-center p-4 rounded-xl hover:bg-slate-50 transition-all duration-200"
            >
              <div className={`p-3 rounded-xl ${action.color} mb-3`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-transbot-text-primary">{action.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
        <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                activity.status === 'active' ? 'bg-blue-500' :
                activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm text-transbot-text-primary">{activity.message}</p>
                <p className="text-xs text-transbot-text-secondary">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-16 h-16 text-transbot-sky mx-auto mb-4" />
              <p className="text-transbot-text-secondary">Revenue analytics chart will be displayed here</p>
            </div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Load Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-transbot-teal mx-auto mb-4" />
              <p className="text-transbot-text-secondary">Load distribution chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Fleet Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">On-time Delivery</span>
              <span className="text-sm font-semibold text-green-600">96%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Fuel Efficiency</span>
              <span className="text-sm font-semibold text-blue-600">8.2 MPG</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Driver Safety</span>
              <span className="text-sm font-semibold text-purple-600">A+</span>
            </div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Route Optimization</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Miles Saved</span>
              <span className="text-sm font-semibold text-green-600">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Time Saved</span>
              <span className="text-sm font-semibold text-blue-600">23.5 hrs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Cost Reduction</span>
              <span className="text-sm font-semibold text-purple-600">$3,420</span>
            </div>
          </div>
        </div>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg">
          <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">AI Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Predictions</span>
              <span className="text-sm font-semibold text-orange-600">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Accuracy</span>
              <span className="text-sm font-semibold text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-transbot-text-secondary">Recommendations</span>
              <span className="text-sm font-semibold text-blue-600">89</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Monthly Revenue Report', icon: DollarSign, date: 'Dec 2024', status: 'Ready' },
          { name: 'Fleet Performance Report', icon: Truck, date: 'Dec 2024', status: 'Ready' },
          { name: 'Route Optimization Report', icon: Route, date: 'Dec 2024', status: 'Processing' },
          { name: 'Driver Safety Report', icon: Shield, date: 'Dec 2024', status: 'Ready' },
          { name: 'Fuel Efficiency Report', icon: Fuel, date: 'Dec 2024', status: 'Ready' },
          { name: 'Customer Satisfaction Report', icon: Star, date: 'Dec 2024', status: 'Draft' }
        ].map((report, index) => (
          <motion.div
            key={report.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-transbot-sky/10 rounded-lg">
                <report.icon className="w-5 h-5 text-transbot-sky" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-transbot-text-primary">{report.name}</h4>
                <p className="text-sm text-transbot-text-secondary">{report.date}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                report.status === 'Ready' ? 'bg-green-100 text-green-600' :
                report.status === 'Processing' ? 'bg-yellow-100 text-yellow-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {report.status}
              </span>
            </div>
            <button className="w-full py-2 px-4 bg-transbot-sky text-white rounded-lg hover:bg-transbot-sky/90 transition-colors">
              View Report
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-transbot-sky" />
              <span className="text-sm font-medium text-transbot-sky bg-transbot-sky/10 px-3 py-1 rounded-full">
                AI-Powered Logistics Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-transbot-text-primary mb-6">
              Trans Bot AI
              <span className="block text-transbot-sky">Supercharges Your</span>
              <span className="block">Trucking Company</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary mb-8 max-w-3xl mx-auto">
              Revolutionize your logistics with AI-powered automation, intelligent routing, 
              and real-time optimization that drives profitability and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/demo')}
                className="flex items-center gap-2 px-8 py-4 bg-transbot-sky text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Rocket className="w-5 h-5" />
                Experience AI Power
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/demo')}
                className="flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border border-slate-200/50 text-transbot-text-primary rounded-xl font-semibold hover:bg-white transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Watch AI Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-transbot-text-primary">Dashboard</h2>
                <p className="text-transbot-text-secondary">Monitor your logistics operations in real-time</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex space-x-1 bg-slate-100 rounded-xl p-1">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-transbot-sky shadow-sm'
                      : 'text-transbot-text-secondary hover:text-transbot-text-primary'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'performance' && renderPerformance()}
            {activeTab === 'reports' && renderReports()}
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
            Why Choose Trans Bot AI?
          </h2>
          <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto">
            Experience the future of logistics with our comprehensive AI-powered platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Book more loads, optimize capacity',
              description: 'AI-powered load matching and capacity optimization that maximizes your revenue potential',
              color: 'text-yellow-500'
            },
            {
              icon: Brain,
              title: 'Leverage AI & workflow automation',
              description: 'Intelligent automation for maximum efficiency and reduced operational costs',
              color: 'text-purple-500'
            },
            {
              icon: Shield,
              title: 'No-risk, easy onboarding',
              description: 'Seamless integration with existing systems and comprehensive support',
              color: 'text-green-500'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.color.replace('text-', 'bg-').replace('-500', '-100')} rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-transbot-text-primary mb-4">{feature.title}</h3>
              <p className="text-transbot-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
