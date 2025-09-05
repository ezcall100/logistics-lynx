import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  DollarSign,
  CheckCircle
} from 'lucide-react'

export default function ShipperPortal() {

  const shipperStats = {
    totalShipments: 89,
    activeShipments: 5,
    completedShipments: 84,
    totalSpent: 125000,
    averageCost: 1404,
    onTimeRate: 92
  }

  const stats = [
    { label: 'Total Shipments', value: shipperStats.totalShipments.toString(), icon: Package, color: 'text-transbot-sky' },
    { label: 'Active Shipments', value: shipperStats.activeShipments.toString(), icon: Truck, color: 'text-transbot-teal' },
    { label: 'Total Spent', value: `$${shipperStats.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-purple' },
    { label: 'On-Time Rate', value: `${shipperStats.onTimeRate}%`, icon: CheckCircle, color: 'text-transbot-warning' }
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
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Shipper Portal</h1>
              <p className="text-transbot-text-secondary">Manage your shipping operations and track your freight</p>
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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Shipper Dashboard</h2>
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Shipment Management System</h3>
              <p className="text-transbot-text-secondary">Complete shipper portal with shipment tracking, carrier management, and cost optimization</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
