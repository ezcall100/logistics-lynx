import { motion } from 'framer-motion'
import { 
  Building, 
  Truck,
  Clock,
  Target
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

export default function YMSPortal() {

  const ymsStats = {
    totalYards: 8,
    activeVehicles: 156,
    averageWaitTime: 45,
    throughput: 89.5,
    utilization: 78.2,
    costSavings: 25000
  }

  const stats = [
    { label: 'Total Yards', value: ymsStats.totalYards.toString(), icon: Building, color: 'text-transbot-sky' },
    { label: 'Active Vehicles', value: ymsStats.activeVehicles.toString(), icon: Truck, color: 'text-transbot-teal' },
    { label: 'Avg Wait Time', value: `${ymsStats.averageWaitTime} min`, icon: Clock, color: 'text-transbot-purple' },
    { label: 'Throughput', value: `${ymsStats.throughput}%`, icon: Target, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="YMS Portal"
        description="Yard Management System for optimized yard operations"
        icon={Building}
        color="from-blue-500 to-cyan-600"
      />
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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Yard Management Dashboard</h2>
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Yard Management System</h3>
              <p className="text-transbot-text-secondary">Comprehensive yard management with real-time tracking, optimization, and analytics</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
