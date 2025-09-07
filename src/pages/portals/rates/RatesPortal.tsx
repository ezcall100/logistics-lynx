import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Plus
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
    { label: 'Total Rates', value: ratesStats.totalRates.toLocaleString(), icon: DollarSign, color: 'text-transbot-sky' },
    { label: 'Active Rates', value: ratesStats.activeRates.toLocaleString(), icon: Target, color: 'text-transbot-teal' },
    { label: 'Average Rate', value: `$${ratesStats.averageRate}/mile`, icon: TrendingUp, color: 'text-transbot-purple' },
    { label: 'Market Trend', value: ratesStats.marketTrend, icon: BarChart3, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="Rates Portal"
        description="Dynamic rate management and market intelligence"
        icon={DollarSign}
        color="from-yellow-500 to-orange-600"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search rates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-4 py-2 border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Rate
          </motion.button>
        </div>
      </PortalHeader>
      <section className="pt-8 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

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

      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Rate Management</h2>
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Dynamic Rate Management System</h3>
              <p className="text-transbot-text-secondary">AI-powered rate optimization with market intelligence and competitive analysis</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
