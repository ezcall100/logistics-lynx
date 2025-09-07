import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, Package, 
  DollarSign, 
  Plus,
  BarChart3, FileText, Bell,
  ArrowRight, Navigation,
  Fuel, Route,
  Camera, MessageSquare
} from 'lucide-react'

const DriverPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const stats = [
    { label: 'Current Load', value: 'LD-001', change: 'Active', icon: Package, color: 'text-blue-500' },
    { label: 'Miles Today', value: '450', change: '+50', icon: Route, color: 'text-green-500' },
    { label: 'Earnings Today', value: '$285', change: '+$35', icon: DollarSign, color: 'text-purple-500' },
    { label: 'Fuel Level', value: '75%', change: '-5%', icon: Fuel, color: 'text-orange-500' }
  ]

  const currentLoad = {
    id: 'LD-001',
    shipper: 'TechCorp Inc.',
    origin: 'Los Angeles, CA',
    destination: 'New York, NY',
    pickupTime: 'Today 2:00 PM',
    deliveryTime: 'Tomorrow 6:00 PM',
    rate: '$1,250',
    distance: '2,789 mi',
    progress: 65,
    nextStop: 'Kansas City, MO',
    eta: '1.5 days'
  }

  const recentEarnings = [
    { date: 'Today', amount: '$285', loads: 1, status: 'Completed' },
    { date: 'Yesterday', amount: '$420', loads: 2, status: 'Completed' },
    { date: '2 days ago', amount: '$380', loads: 1, status: 'Completed' },
    { date: '3 days ago', amount: '$295', loads: 1, status: 'Completed' }
  ]

  const documents = [
    { name: 'Bill of Lading', type: 'BOL', status: 'Completed', date: 'Today' },
    { name: 'Delivery Receipt', type: 'POD', status: 'Pending', date: 'Tomorrow' },
    { name: 'Fuel Receipt', type: 'Fuel', status: 'Completed', date: 'Today' },
    { name: 'Inspection Report', type: 'Inspection', status: 'Due', date: 'Tomorrow' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Driver Portal</h1>
                <p className="text-gray-600">Mobile-first driver experience and tools</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600"></div>
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
                { id: 'load', label: 'Current Load', icon: Package },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
                { id: 'documents', label: 'Documents', icon: FileText }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200">
                      <Navigation className="w-5 h-5" />
                      <span className="font-medium">Start Navigation</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                      <Camera className="w-5 h-5" />
                      <span className="font-medium">Take Photo</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">Upload Document</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium">Contact Dispatch</span>
                    </button>
                  </div>
                </div>

                {/* Current Load Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Load</h3>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                          <Package className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{currentLoad.id}</div>
                          <div className="text-sm text-gray-600">{currentLoad.shipper}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{currentLoad.rate}</div>
                        <div className="text-sm text-gray-600">{currentLoad.distance}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Route</div>
                        <div className="font-medium text-gray-900">
                          {currentLoad.origin} → {currentLoad.destination}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Next Stop</div>
                        <div className="font-medium text-gray-900">{currentLoad.nextStop}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Pickup Time</div>
                        <div className="font-medium text-gray-900">{currentLoad.pickupTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">ETA</div>
                        <div className="font-medium text-gray-900">{currentLoad.eta}</div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{currentLoad.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${currentLoad.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Earnings</h3>
                  <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {recentEarnings.map((earning, index) => (
                    <motion.div
                      key={earning.date}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <DollarSign className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{earning.date}</div>
                            <div className="text-sm text-gray-600">{earning.loads} loads completed</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{earning.amount}</div>
                          <div className="text-sm text-green-600">{earning.status}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Required Documents</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Upload Document
                  </button>
                </div>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <FileText className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-600">Type: {doc.type}</div>
                            <div className="text-xs text-gray-500">Due: {doc.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            doc.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {doc.status}
                          </div>
                          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                            {doc.status === 'Completed' ? 'View' : 'Upload'}
                          </button>
                        </div>
                      </div>
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

export default DriverPortal