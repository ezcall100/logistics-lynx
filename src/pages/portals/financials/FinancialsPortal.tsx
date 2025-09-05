import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Plus,
  Download,
  Target,
  Zap
} from 'lucide-react'

export default function FinancialsPortal() {

  const financialsStats = {
    totalRevenue: 2500000,
    totalExpenses: 1800000,
    netProfit: 700000,
    profitMargin: 28.0,
    cashFlow: 450000,
    outstandingInvoices: 125000
  }

  const stats = [
    { label: 'Total Revenue', value: `$${(financialsStats.totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-transbot-sky' },
    { label: 'Net Profit', value: `$${(financialsStats.netProfit / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-transbot-teal' },
    { label: 'Profit Margin', value: `${financialsStats.profitMargin}%`, icon: Target, color: 'text-transbot-purple' },
    { label: 'Cash Flow', value: `$${(financialsStats.cashFlow / 1000).toFixed(0)}K`, icon: Zap, color: 'text-transbot-warning' }
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Financials Portal</h1>
              <p className="text-transbot-text-secondary">Comprehensive financial management and analytics</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transbot-sky text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Transaction
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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Financial Dashboard</h2>
            <div className="text-center py-12">
              <DollarSign className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Financial Management System</h3>
              <p className="text-transbot-text-secondary">Complete financial management with real-time analytics, invoicing, and reporting</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
