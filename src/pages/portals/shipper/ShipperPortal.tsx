import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, Truck, 
  DollarSign, 
  Plus, Search, Filter,
  BarChart3, FileText, Bell,
  ArrowRight, Star, CheckCircle
} from 'lucide-react'

const ShipperPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Active Shipments', value: '24', change: '+12%', icon: Package, color: 'text-blue-500' },
    { label: 'Carriers Used', value: '8', change: '+2', icon: Truck, color: 'text-green-500' },
    { label: 'Avg. Cost/Shipment', value: '$1,250', change: '-5%', icon: DollarSign, color: 'text-purple-500' },
    { label: 'On-Time Delivery', value: '96%', change: '+3%', icon: CheckCircle, color: 'text-emerald-500' }
  ]

  const recentShipments = [
    {
      id: 'SH-001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      carrier: 'Swift Logistics',
      status: 'In Transit',
      cost: '$1,450',
      eta: '2 days',
      progress: 75
    },
    {
      id: 'SH-002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      carrier: 'Prime Transport',
      status: 'Delivered',
      cost: '$980',
      eta: 'Completed',
      progress: 100
    },
    {
      id: 'SH-003',
      origin: 'Seattle, WA',
      destination: 'Denver, CO',
      carrier: 'Western Freight',
      status: 'Scheduled',
      cost: '$1,200',
      eta: 'Tomorrow',
      progress: 0
    }
  ]

  const carriers = [
    {
      name: 'Swift Logistics',
      rating: 4.8,
      onTimeRate: 98,
      costRating: '$$',
      specialties: ['Dry Van', 'Refrigerated'],
      lastUsed: '2 hours ago'
    },
    {
      name: 'Prime Transport',
      rating: 4.9,
      onTimeRate: 99,
      costRating: '$$$',
      specialties: ['Flatbed', 'Heavy Haul'],
      lastUsed: '1 day ago'
    },
    {
      name: 'Western Freight',
      rating: 4.7,
      onTimeRate: 96,
      costRating: '$$',
      specialties: ['Dry Van', 'LTL'],
      lastUsed: '3 days ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Shipper Portal</h1>
                <p className="text-gray-600">Complete shipping management for your business</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'shipments', label: 'Shipments', icon: Package },
                { id: 'carriers', label: 'Carriers', icon: Truck },
                { id: 'reports', label: 'Reports', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">Create Shipment</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                      <Search className="w-5 h-5" />
                      <span className="font-medium">Find Carriers</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
                      <BarChart3 className="w-5 h-5" />
                      <span className="font-medium">View Reports</span>
                    </button>
                  </div>
                </div>

                {/* Recent Shipments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Shipments</h3>
                    <button className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentShipments.map((shipment, index) => (
                      <motion.div
                        key={shipment.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                              <Package className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{shipment.id}</div>
                              <div className="text-sm text-gray-600">
                                {shipment.origin} → {shipment.destination}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{shipment.cost}</div>
                              <div className="text-sm text-gray-600">{shipment.eta}</div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium ${
                                shipment.status === 'Delivered' ? 'text-green-600' :
                                shipment.status === 'In Transit' ? 'text-blue-600' :
                                'text-yellow-600'
                              }`}>
                                {shipment.status}
                              </div>
                              <div className="text-xs text-gray-500">{shipment.carrier}</div>
                            </div>
                            <div className="w-16">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${shipment.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'carriers' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Preferred Carriers</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search carriers..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {carriers.map((carrier, index) => (
                    <motion.div
                      key={carrier.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Truck className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{carrier.name}</div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{carrier.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{carrier.costRating}</div>
                          <div className="text-xs text-gray-500">Cost</div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">On-time Rate:</span>
                          <span className="font-medium text-gray-900">{carrier.onTimeRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Used:</span>
                          <span className="font-medium text-gray-900">{carrier.lastUsed}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Specialties:</div>
                        <div className="flex flex-wrap gap-2">
                          {carrier.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                        Book Carrier
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipperPortal