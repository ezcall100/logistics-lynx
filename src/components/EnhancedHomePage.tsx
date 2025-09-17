import React from 'react';
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
  TrendingUp,
  Package,
  Route,
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
    { id: 'ai-insights', name: 'AI Insights', icon: Brain }
  ]

  const quickActions = [
    { name: 'Create Load', icon: Package, path: '/loads/create', color: 'bg-blue-500' },
    { name: 'Optimize Route', icon: Route, path: '/routes/optimize', color: 'bg-green-500' },
    { name: 'View Analytics', icon: BarChart3, path: '/analytics', color: 'bg-purple-500' },
    { name: 'Manage Fleet', icon: Truck, path: '/fleet', color: 'bg-orange-500' }
  ]

  const renderOverview = () => (
    <div className="space-y-6 responsive-container">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 responsive-container"
          >
            <div className="flex items-center justify-between mb-4 responsive-container">
              <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full responsive-container">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-transbot-text-primary mb-1 responsive-container">{stat.value}</div>
            <div className="text-sm text-transbot-text-secondary responsive-container">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg responsive-container">
        <h3 className="text-lg font-semibold text-transbot-text-primary mb-4 responsive-container">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 responsive-container">
          {quickActions.map((action) => (
            <motion.button
              key={action.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(action.path)}
              className={`p-4 rounded-xl text-white font-medium transition-all duration-300 ${action.color} hover:shadow-lg`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-2 responsive-container" />
              <span className="text-sm responsive-container">{action.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6 responsive-container">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg responsive-container">
        <h3 className="text-lg font-semibold text-transbot-text-primary mb-6 responsive-container">Performance Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container">
          <div className="space-y-4 responsive-container">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl responsive-container">
              <div className="flex items-center space-x-3 responsive-container">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center responsive-container">
                  <PieChart className="w-5 h-5 text-blue-600 responsive-container" />
                </div>
                <div>
                  <p className="font-medium text-transbot-text-primary responsive-container">Load Distribution</p>
                  <p className="text-sm text-transbot-text-secondary responsive-container">Across all routes</p>
                </div>
              </div>
              <div className="text-right responsive-container">
                <p className="text-2xl font-bold text-transbot-text-primary responsive-container">2,847</p>
                <p className="text-sm text-green-600 responsive-container">+12%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl responsive-container">
              <div className="flex items-center space-x-3 responsive-container">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center responsive-container">
                  <LineChart className="w-5 h-5 text-green-600 responsive-container" />
                </div>
                <div>
                  <p className="font-medium text-transbot-text-primary responsive-container">Efficiency Rate</p>
                  <p className="text-sm text-transbot-text-secondary responsive-container">Route optimization</p>
                </div>
              </div>
              <div className="text-right responsive-container">
                <p className="text-2xl font-bold text-transbot-text-primary responsive-container">94.2%</p>
                <p className="text-sm text-green-600 responsive-container">+3.1%</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 responsive-container">
            <h4 className="font-semibold text-transbot-text-primary mb-4 responsive-container">AI Insights</h4>
            <div className="space-y-3 responsive-container">
              <div className="flex items-center space-x-3 responsive-container">
                <div className="w-2 h-2 bg-blue-500 rounded-full responsive-container"></div>
                <p className="text-sm text-transbot-text-secondary responsive-container">Route optimization can improve by 15%</p>
              </div>
              <div className="flex items-center space-x-3 responsive-container">
                <div className="w-2 h-2 bg-green-500 rounded-full responsive-container"></div>
                <p className="text-sm text-transbot-text-secondary responsive-container">Fuel costs reduced by $2,400 this month</p>
              </div>
              <div className="flex items-center space-x-3 responsive-container">
                <div className="w-2 h-2 bg-purple-500 rounded-full responsive-container"></div>
                <p className="text-sm text-transbot-text-secondary responsive-container">3 new efficiency opportunities identified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAIInsights = () => (
    <div className="space-y-6 responsive-container">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg responsive-container">
        <h3 className="text-lg font-semibold text-transbot-text-primary mb-6 responsive-container">AI Agent Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container">
          <div className="space-y-4 responsive-container">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 responsive-container">
              <div className="flex items-center space-x-3 mb-3 responsive-container">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center responsive-container">
                  <Brain className="w-4 h-4 text-white responsive-container" />
                </div>
                <h4 className="font-semibold text-transbot-text-primary responsive-container">Route Optimizer</h4>
              </div>
              <p className="text-sm text-transbot-text-secondary mb-2 responsive-container">Analyzing 2,847 routes for optimization opportunities</p>
              <div className="w-full bg-slate-200 rounded-full h-2 responsive-container">
                <div className="bg-blue-600 h-2 rounded-full responsive-container" style={{ width: '78%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1 responsive-container">78% complete</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 responsive-container">
              <div className="flex items-center space-x-3 mb-3 responsive-container">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center responsive-container">
                  <Target className="w-4 h-4 text-white responsive-container" />
                </div>
                <h4 className="font-semibold text-transbot-text-primary responsive-container">Load Matcher</h4>
              </div>
              <p className="text-sm text-transbot-text-secondary mb-2 responsive-container">Processing 156 new load requests</p>
              <div className="w-full bg-slate-200 rounded-full h-2 responsive-container">
                <div className="bg-green-600 h-2 rounded-full responsive-container" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1 responsive-container">92% complete</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 responsive-container">
            <h4 className="font-semibold text-transbot-text-primary mb-4 responsive-container">Real-time Recommendations</h4>
            <div className="space-y-3 responsive-container">
              <div className="flex items-start space-x-3 responsive-container">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 responsive-container"></div>
                <div>
                  <p className="text-sm font-medium text-transbot-text-primary responsive-container">Route 847 can be optimized</p>
                  <p className="text-xs text-transbot-text-secondary responsive-container">Save 23 minutes and $45 in fuel costs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 responsive-container">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 responsive-container"></div>
                <div>
                  <p className="text-sm font-medium text-transbot-text-primary responsive-container">New carrier match found</p>
                  <p className="text-xs text-transbot-text-secondary responsive-container">Carrier ABC Logistics for Load #2341</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 responsive-container">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 responsive-container"></div>
                <div>
                  <p className="text-sm font-medium text-transbot-text-primary responsive-container">Fleet maintenance alert</p>
                  <p className="text-xs text-transbot-text-secondary responsive-container">Truck #789 needs inspection in 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 responsive-container">
      {/* Hero Section */}
      <section className="py-16 responsive-container">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 responsive-container">
              Welcome to Trans Bot AI
            </h1>
            <p className="text-xl text-transbot-text-secondary mb-8 max-w-3xl mx-auto responsive-container">
              Your intelligent logistics platform powered by 250 AI agents working 24/7 to optimize your operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/get-started')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 responsive-container"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 responsive-container" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('/demo')}
                className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center justify-center space-x-2 responsive-container"
              >
                <Play className="w-5 h-5 responsive-container" />
                <span>Watch Demo</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 responsive-container">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12 responsive-container"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-transbot-text-primary mb-4 responsive-container">
              AI-Powered Dashboard
            </h2>
            <p className="text-xl text-transbot-text-secondary mb-8 max-w-3xl mx-auto responsive-container">
              Monitor and manage your logistics operations with real-time insights and AI recommendations
            </p>
          </motion.div>

          {/* Dashboard Tabs */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg mb-8 responsive-container">
            <div className="flex flex-wrap border-b border-slate-200 responsive-container">
              {dashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() = aria-label="Button"> setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 responsive-container" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
            <div className="p-6 responsive-container">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'analytics' && renderAnalytics()}
              {activeTab === 'ai-insights' && renderAIInsights()}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 responsive-container">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-12 responsive-container"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-transbot-text-primary mb-4 responsive-container">
              Why Choose Trans Bot AI?
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto responsive-container">
              Experience the future of logistics with our AI-powered platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8 responsive-container">
            {[
              {
                icon: Brain,
                title: '250 AI Agents',
                description: 'Advanced artificial intelligence working around the clock to optimize your operations',
                color: 'text-blue-500'
              },
              {
                icon: Zap,
                title: 'Real-time Optimization',
                description: 'Instant route adjustments and load matching for maximum efficiency',
                color: 'text-yellow-500'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-grade security with comprehensive data protection and compliance',
                color: 'text-green-500'
              },
              {
                icon: Users,
                title: 'Scalable Platform',
                description: 'Grows with your business from startup to enterprise scale',
                color: 'text-purple-500'
              },
              {
                icon: Rocket,
                title: 'Lightning Fast',
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
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 responsive-container"
              >
                <div className={`w-12 h-12 ${feature.color.replace('text-', 'bg-').replace('-500', '-100')} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-transbot-text-primary mb-4 responsive-container">{feature.title}</h3>
                <p className="text-transbot-text-secondary responsive-container">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}