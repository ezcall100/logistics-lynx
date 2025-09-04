import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'
import { BarChart3, Users, Truck, Package, DollarSign, Settings } from 'lucide-react'

export function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'shipper':
        return <ShipperDashboard />
      case 'broker':
        return <BrokerDashboard />
      case 'carrier':
        return <CarrierDashboard />
      case 'driver':
        return <DriverDashboard />
      case 'superadmin':
        return <SuperAdminDashboard />
      default:
        return <ShipperDashboard />
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {getDashboardContent()}
      </div>
    </div>
  )
}

function ShipperDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Shipper Dashboard</h1>
        <p className="text-white/70">Manage your shipments and track deliveries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Shipments', value: '24', icon: Package, color: 'text-blue-400' },
          { title: 'Delivered Today', value: '12', icon: Truck, color: 'text-green-400' },
          { title: 'Total Cost', value: '$45,230', icon: DollarSign, color: 'text-yellow-400' },
          { title: 'On-Time Rate', value: '96%', icon: BarChart3, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Recent Shipments</h2>
        <div className="space-y-4">
          {[
            { id: 'SH-001', destination: 'Los Angeles, CA', status: 'In Transit', eta: '2 hours' },
            { id: 'SH-002', destination: 'Chicago, IL', status: 'Delivered', eta: 'Completed' },
            { id: 'SH-003', destination: 'Miami, FL', status: 'Scheduled', eta: 'Tomorrow' }
          ].map((shipment, index) => (
            <motion.div
              key={shipment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div>
                <div className="text-white font-medium">{shipment.id}</div>
                <div className="text-white/70 text-sm">{shipment.destination}</div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-sm">{shipment.status}</div>
                <div className="text-white/50 text-xs">{shipment.eta}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function BrokerDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Broker Dashboard</h1>
        <p className="text-white/70">Manage loads, carriers, and optimize margins</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Loads', value: '18', icon: Package, color: 'text-blue-400' },
          { title: 'Carriers', value: '156', icon: Users, color: 'text-green-400' },
          { title: 'Margin', value: '14.2%', icon: DollarSign, color: 'text-yellow-400' },
          { title: 'Loads Today', value: '8', icon: BarChart3, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Recent Loads</h2>
        <div className="space-y-4">
          {[
            { id: 'LD-001', route: 'LA → Chicago', rate: '$2,450', status: 'Posted' },
            { id: 'LD-002', route: 'Miami → NYC', rate: '$3,200', status: 'Booked' },
            { id: 'LD-003', route: 'Dallas → Seattle', rate: '$2,800', status: 'In Transit' }
          ].map((load, index) => (
            <motion.div
              key={load.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div>
                <div className="text-white font-medium">{load.id}</div>
                <div className="text-white/70 text-sm">{load.route}</div>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{load.rate}</div>
                <div className="text-white/70 text-sm">{load.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function CarrierDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Carrier Dashboard</h1>
        <p className="text-white/70">Manage your fleet and optimize routes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Trucks', value: '12', icon: Truck, color: 'text-blue-400' },
          { title: 'Drivers', value: '15', icon: Users, color: 'text-green-400' },
          { title: 'Revenue', value: '$89,450', icon: DollarSign, color: 'text-yellow-400' },
          { title: 'Utilization', value: '87%', icon: BarChart3, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Fleet Status</h2>
        <div className="space-y-4">
          {[
            { id: 'TR-001', driver: 'John Smith', location: 'I-40, TN', status: 'In Transit' },
            { id: 'TR-002', driver: 'Sarah Johnson', location: 'I-95, FL', status: 'Loading' },
            { id: 'TR-003', driver: 'Mike Davis', location: 'I-80, CA', status: 'Available' }
          ].map((truck, index) => (
            <motion.div
              key={truck.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
            >
              <div>
                <div className="text-white font-medium">{truck.id}</div>
                <div className="text-white/70 text-sm">{truck.driver}</div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-sm">{truck.location}</div>
                <div className="text-white/50 text-xs">{truck.status}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function DriverDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Driver Dashboard</h1>
        <p className="text-white/70">Track your loads and manage your schedule</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Current Load', value: 'LD-001', icon: Package, color: 'text-blue-400' },
          { title: 'HOS Remaining', value: '6.5 hrs', icon: BarChart3, color: 'text-green-400' },
          { title: 'Miles Today', value: '342', icon: Truck, color: 'text-yellow-400' },
          { title: 'Next Stop', value: '2.5 hrs', icon: Users, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Current Assignment</h2>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-white/5 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-white font-medium">Load LD-001</div>
              <div className="text-accent font-medium">In Transit</div>
            </div>
            <div className="text-white/70 text-sm mb-2">Route: Los Angeles, CA → Chicago, IL</div>
            <div className="text-white/70 text-sm">ETA: 2 hours 30 minutes</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function SuperAdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Super Admin Dashboard</h1>
        <p className="text-white/70">System overview and enterprise management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Users', value: '2,847', icon: Users, color: 'text-blue-400' },
          { title: 'Active Portals', value: '25', icon: Settings, color: 'text-green-400' },
          { title: 'AI Agents', value: '250', icon: BarChart3, color: 'text-yellow-400' },
          { title: 'System Health', value: '99.9%', icon: Package, color: 'text-purple-400' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </div>
            <div className="text-white/70 text-sm">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">System Overview</h2>
          <div className="space-y-4">
            {[
              { metric: 'CPU Usage', value: '45%', status: 'Normal' },
              { metric: 'Memory Usage', value: '67%', status: 'Normal' },
              { metric: 'Storage', value: '78%', status: 'Warning' },
              { metric: 'Network', value: '23%', status: 'Normal' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div className="text-white font-medium">{item.metric}</div>
                <div className="flex items-center space-x-3">
                  <div className="text-white/70">{item.value}</div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'Normal' ? 'bg-green-500/20 text-green-300' :
                    item.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {item.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New user registered', time: '2 minutes ago', type: 'User' },
              { action: 'Portal accessed', time: '5 minutes ago', type: 'System' },
              { action: 'AI agent optimized', time: '8 minutes ago', type: 'AI' },
              { action: 'Backup completed', time: '15 minutes ago', type: 'System' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
              >
                <div>
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-white/70 text-sm">{activity.type}</div>
                </div>
                <div className="text-white/50 text-sm">{activity.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
