import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  Zap
} from 'lucide-react'

export default function AnalyticsPortal() {

  const analyticsStats = {
    totalDataPoints: 1250000,
    activeReports: 15,
    insightsGenerated: 89,
    accuracyRate: 94.5,
    processingTime: 2.3,
    userEngagement: 87
  }

  const stats = [
    { label: 'Data Points', value: analyticsStats.totalDataPoints.toLocaleString(), icon: BarChart3, color: 'text-transbot-sky' },
    { label: 'Active Reports', value: analyticsStats.activeReports.toString(), icon: TrendingUp, color: 'text-transbot-teal' },
    { label: 'Insights Generated', value: analyticsStats.insightsGenerated.toString(), icon: Zap, color: 'text-transbot-purple' },
    { label: 'Accuracy Rate', value: `${analyticsStats.accuracyRate}%`, icon: Target, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-sky/5 via-white to-transbot-teal/5">
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Analytics Portal</h1>
              <p className="text-transbot-text-secondary">Advanced analytics and business intelligence for your logistics operations</p>
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
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot"
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
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
          >
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Analytics Dashboard</h2>
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Business Intelligence Platform</h3>
              <p className="text-transbot-text-secondary">Advanced analytics with real-time insights, predictive modeling, and comprehensive reporting</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
