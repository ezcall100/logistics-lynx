import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, TrendingUp, PieChart, LineChart,
  DollarSign, Package, Truck, 
  Clock, MapPin, Target,
  Download, Filter, RefreshCw,
  ArrowUp, ArrowDown, Eye
} from 'lucide-react'

const AnalyticsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('30d')

  const kpiStats = [
    { 
      label: 'Total Revenue', 
      value: '$2.4M', 
      change: '+12.5%', 
      trend: 'up',
      icon: DollarSign, 
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Shipments Completed', 
      value: '1,247', 
      change: '+8.2%', 
      trend: 'up',
      icon: Package, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'On-Time Delivery', 
      value: '96.8%', 
      change: '+2.1%', 
      trend: 'up',
      icon: Clock, 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    { 
      label: 'Active Carriers', 
      value: '89', 
      change: '+5', 
      trend: 'up',
      icon: Truck, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ]

  const topRoutes = [
    { route: 'LA → NYC', shipments: 156, revenue: '$234K', efficiency: '94%' },
    { route: 'Chicago → Miami', shipments: 134, revenue: '$189K', efficiency: '97%' },
    { route: 'Seattle → Denver', shipments: 98, revenue: '$156K', efficiency: '92%' },
    { route: 'Atlanta → Dallas', shipments: 87, revenue: '$134K', efficiency: '95%' }
  ]

  const carrierPerformance = [
    { name: 'Swift Logistics', rating: 4.9, loads: 234, onTime: '98%', cost: '$$' },
    { name: 'Prime Transport', rating: 4.8, loads: 189, onTime: '97%', cost: '$$$' },
    { name: 'Western Freight', rating: 4.7, loads: 156, onTime: '96%', cost: '$$' },
    { name: 'Eastern Express', rating: 4.6, loads: 134, onTime: '95%', cost: '$$' }
  ]

  const insights = [
    {
      title: 'Peak Shipping Hours',
      description: 'Most shipments occur between 8-10 AM and 2-4 PM',
      impact: 'High',
      recommendation: 'Optimize carrier scheduling during peak hours'
    },
    {
      title: 'Route Optimization Opportunity',
      description: 'LA-NYC route can save 12% costs with alternative routing',
      impact: 'Medium',
      recommendation: 'Implement dynamic routing for cost savings'
    },
    {
      title: 'Carrier Performance Trend',
      description: 'Swift Logistics shows 15% improvement in on-time delivery',
      impact: 'High',
      recommendation: 'Increase load allocation to top performers'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics Portal</h1>
                <p className="text-gray-600">Advanced analytics and business intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'performance', label: 'Performance', icon: TrendingUp },
                { id: 'routes', label: 'Route Analysis', icon: MapPin },
                { id: 'insights', label: 'AI Insights', icon: Target }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                        <p className="text-gray-600">Revenue trend chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Distribution</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-600">Shipment distribution chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Routes */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top Performing Routes</h3>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                      View All
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topRoutes.map((route, index) => (
                      <motion.div
                        key={route.route}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-gray-900">{route.route}</div>
                            <div className="text-sm text-gray-600">{route.shipments} shipments</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{route.revenue}</div>
                            <div className="text-sm text-green-600">{route.efficiency} efficiency</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Carrier Performance</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {carrierPerformance.map((carrier, index) => (
                    <motion.div
                      key={carrier.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Truck className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{carrier.name}</div>
                            <div className="text-sm text-gray-600">{carrier.loads} loads completed</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{carrier.rating}</div>
                            <div className="text-xs text-gray-500">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{carrier.onTime}</div>
                            <div className="text-xs text-gray-500">On-time</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{carrier.cost}</div>
                            <div className="text-xs text-gray-500">Cost</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Powered Insights</h3>
                <div className="space-y-6">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                          <p className="text-gray-600 mb-3">{insight.description}</p>
                          <p className="text-sm text-indigo-600 font-medium">{insight.recommendation}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          insight.impact === 'High' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact} Impact
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPortal