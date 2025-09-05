import { motion } from 'framer-motion'
import { 
  User, 
  Truck, 
  MapPin, 
  DollarSign, 
  Fuel
} from 'lucide-react'

export default function DriverPortal() {

  const driverStats = {
    totalMiles: 12500,
    activeLoads: 2,
    completedLoads: 15,
    totalEarnings: 8500,
    hoursDriven: 45,
    fuelEfficiency: 7.2
  }

  const stats = [
    { label: 'Total Miles', value: driverStats.totalMiles.toLocaleString(), icon: MapPin, color: 'text-transbot-sky' },
    { label: 'Active Loads', value: driverStats.activeLoads.toString(), icon: Truck, color: 'text-transbot-teal' },
    { label: 'Total Earnings', value: `$${driverStats.totalEarnings.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'Fuel Efficiency', value: `${driverStats.fuelEfficiency} MPG`, icon: Fuel, color: 'text-transbot-warning' }
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Driver Portal</h1>
              <p className="text-transbot-text-secondary">Manage your driving operations and track your performance</p>
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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Driver Dashboard</h2>
            <div className="text-center py-12">
              <User className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Driver Management System</h3>
              <p className="text-transbot-text-secondary">Complete driver portal with load tracking, route optimization, and performance analytics</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
