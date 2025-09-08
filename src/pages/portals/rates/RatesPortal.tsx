import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

export default function RatesPortal() {
  const [searchQuery, setSearchQuery] = useState('')

  const ratesStats = {
    totalRates: 12500,
    activeRates: 8900,
    averageRate: 2.45,
    rateChanges: 156,
    marketTrend: '+5.2%',
    competitiveIndex: 87.5
  }

  const stats = [
    { label: 'Total Rates', value: ratesStats.totalRates.toLocaleString(), icon: DollarSign, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Active Rates', value: ratesStats.activeRates.toLocaleString(), icon: Target, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Average Rate', value: `$${ratesStats.averageRate}/mile`, icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Market Trend', value: ratesStats.marketTrend, icon: BarChart3, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ]

  const rateRoutes = [
    { id: 1, route: 'Chicago → New York', rate: '$2.85/mile', distance: '790 miles', trend: '+3.2%', status: 'Active', lastUpdate: '2 hours ago' },
    { id: 2, route: 'Los Angeles → Dallas', rate: '$2.45/mile', distance: '1,240 miles', trend: '-1.8%', status: 'Active', lastUpdate: '4 hours ago' },
    { id: 3, route: 'Miami → Atlanta', rate: '$2.15/mile', distance: '660 miles', trend: '+5.1%', status: 'Active', lastUpdate: '6 hours ago' },
    { id: 4, route: 'Seattle → Denver', rate: '$2.95/mile', distance: '1,320 miles', trend: '+2.3%', status: 'Active', lastUpdate: '8 hours ago' },
    { id: 5, route: 'Phoenix → Las Vegas', rate: '$1.95/mile', distance: '300 miles', trend: '-0.5%', status: 'Review', lastUpdate: '12 hours ago' },
    { id: 6, route: 'Boston → Philadelphia', rate: '$2.25/mile', distance: '310 miles', trend: '+4.2%', status: 'Active', lastUpdate: '1 day ago' }
  ]

  const marketInsights = [
    { id: 1, insight: 'Fuel prices increased 2.3% this week', impact: 'Medium', type: 'warning' },
    { id: 2, insight: 'Demand surge expected in Northeast corridor', impact: 'High', type: 'info' },
    { id: 3, insight: 'New competitor entered West Coast market', impact: 'Low', type: 'success' },
    { id: 4, insight: 'Weather delays affecting Midwest routes', impact: 'High', type: 'warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-yellow-50 pt-16">
      <PortalHeader
        title="Rates Portal"
        description="Dynamic rate management and market intelligence"
        icon={DollarSign}
        color="from-yellow-500 to-orange-600"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search rates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Rate
          </motion.button>
        </div>
      </PortalHeader>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rate Routes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Rate Routes</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {rateRoutes.map((route) => (
                  <div key={route.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{route.route}</h3>
                        <p className="text-sm text-gray-600">{route.distance}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">Updated {route.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{route.rate}</div>
                        <div className="text-xs text-gray-600">Rate</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm font-medium ${route.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {route.trend}
                        </div>
                        <div className="text-xs text-gray-600">Trend</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          route.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {route.status}
                        </div>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Market Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Market Insights</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {marketInsights.map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.type === 'success' ? 'bg-green-500' : 
                      insight.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{insight.insight}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                          insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {insight.impact} Impact
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Rate Analytics</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <BarChart3 className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Performance</h3>
                <p className="text-3xl font-bold text-yellow-600 mb-1">+5.2%</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Index</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">87.5</p>
                <p className="text-sm text-gray-600">Out of 100</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Rate Changes</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">156</p>
                <p className="text-sm text-gray-600">This week</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
