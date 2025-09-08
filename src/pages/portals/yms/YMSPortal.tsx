import { motion } from 'framer-motion'
import { 
  Building, 
  Truck,
  Clock,
  Target,
  MapPin,
  Activity,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  Filter
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
    { label: 'Total Yards', value: ymsStats.totalYards.toString(), icon: Building, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Active Vehicles', value: ymsStats.activeVehicles.toString(), icon: Truck, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Avg Wait Time', value: `${ymsStats.averageWaitTime} min`, icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Throughput', value: `${ymsStats.throughput}%`, icon: Target, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ]

  const yardOperations = [
    { id: 1, name: 'Main Yard', location: 'Building A', vehicles: 45, status: 'Active', utilization: '85%' },
    { id: 2, name: 'Secondary Yard', location: 'Building B', vehicles: 32, status: 'Active', utilization: '72%' },
    { id: 3, name: 'Loading Dock', location: 'Building C', vehicles: 28, status: 'Maintenance', utilization: '60%' },
    { id: 4, name: 'Storage Yard', location: 'Building D', vehicles: 51, status: 'Active', utilization: '90%' }
  ]

  const recentActivities = [
    { id: 1, action: 'Vehicle Entry', vehicle: 'Truck-001', yard: 'Main Yard', time: '2 min ago', status: 'success' },
    { id: 2, action: 'Vehicle Exit', vehicle: 'Truck-045', yard: 'Secondary Yard', time: '5 min ago', status: 'success' },
    { id: 3, action: 'Maintenance Alert', vehicle: 'Truck-023', yard: 'Loading Dock', time: '8 min ago', status: 'warning' },
    { id: 4, action: 'Capacity Alert', vehicle: 'Truck-067', yard: 'Storage Yard', time: '12 min ago', status: 'info' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16">
      <PortalHeader
        title="YMS Portal"
        description="Yard Management System for optimized yard operations"
        icon={Building}
        color="from-blue-500 to-cyan-600"
      />
      
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
          {/* Yard Operations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Yard Operations</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {yardOperations.map((yard) => (
                  <div key={yard.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{yard.name}</h3>
                        <p className="text-sm text-gray-600">{yard.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{yard.vehicles}</div>
                        <div className="text-xs text-gray-600">Vehicles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{yard.utilization}</div>
                        <div className="text-xs text-gray-600">Utilization</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        yard.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {yard.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.vehicle} • {activity.yard}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
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
              <h2 className="text-xl font-bold text-gray-900">Yard Analytics</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <BarChart3 className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Efficiency</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">89.5%</p>
                <p className="text-sm text-gray-600">+2.3% from last week</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Utilization</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">78.2%</p>
                <p className="text-sm text-gray-600">+1.8% from last week</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cost Savings</h3>
                <p className="text-3xl font-bold text-purple-600 mb-1">$25K</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
