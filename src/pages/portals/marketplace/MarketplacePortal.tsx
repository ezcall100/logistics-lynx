import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Store, 
  Package, 
  Search, 
  CheckCircle,
  Plus,
  DollarSign
} from 'lucide-react'

export default function MarketplacePortal() {
  const [searchQuery, setSearchQuery] = useState('')

  const marketplaceStats = {
    totalListings: 2500,
    activeListings: 1800,
    completedTransactions: 12500,
    totalValue: 2500000,
    averageRating: 4.7,
    newListings: 45
  }

  const stats = [
    { label: 'Total Listings', value: marketplaceStats.totalListings.toLocaleString(), icon: Store, color: 'text-transbot-sky' },
    { label: 'Active Listings', value: marketplaceStats.activeListings.toLocaleString(), icon: Package, color: 'text-transbot-teal' },
    { label: 'Completed Transactions', value: marketplaceStats.completedTransactions.toLocaleString(), icon: CheckCircle, color: 'text-transbot-purple' },
    { label: 'Total Value', value: `$${(marketplaceStats.totalValue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Marketplace Portal</h1>
              <p className="text-transbot-text-secondary">Connect shippers, brokers, and carriers in one unified marketplace</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search marketplace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Listing
              </motion.button>
            </div>
          </motion.div>

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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Marketplace Dashboard</h2>
            <div className="text-center py-12">
              <Store className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Logistics Marketplace</h3>
              <p className="text-transbot-text-secondary">Comprehensive marketplace connecting all logistics stakeholders with AI-powered matching</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
