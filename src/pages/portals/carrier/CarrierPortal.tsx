import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  Package, 
  BarChart3, 
  Settings, 
  Search,
  Eye,
  DollarSign,
  TrendingUp,
  Users,
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function CarrierPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    await trackUserInteraction('carrier_portal_tab_changed', { tab })
    await trackAIAgentActivity('CarrierAnalytics', 'tab_analytics', {
      carrierId: 'CARRIER_001',
      tab: tab,
      timestamp: new Date().toISOString()
    })
  }

  const carrierStats = {
    totalTrucks: 45,
    activeLoads: 12,
    completedLoads: 89,
    totalRevenue: 180000,
    averageRate: 2.20,
    onTimeRate: 96
  }

  const stats = [
    { label: 'Total Trucks', value: carrierStats.totalTrucks.toString(), icon: Truck, color: 'text-transbot-sky' },
    { label: 'Active Loads', value: carrierStats.activeLoads.toString(), icon: Package, color: 'text-transbot-teal' },
    { label: 'Total Revenue', value: `$${carrierStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'On-Time Rate', value: `${carrierStats.onTimeRate}%`, icon: CheckCircle, color: 'text-transbot-warning' }
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Carrier Portal</h1>
              <p className="text-transbot-text-secondary">Manage your fleet operations with AI-powered efficiency</p>
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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Carrier Dashboard</h2>
            <div className="text-center py-12">
              <Truck className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Fleet Management System</h3>
              <p className="text-transbot-text-secondary">Comprehensive carrier portal with fleet tracking, load management, and driver coordination</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
