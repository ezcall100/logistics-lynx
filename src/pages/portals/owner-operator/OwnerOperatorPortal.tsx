import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  DollarSign, 
  MapPin, 
  Package, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Filter, 
  Plus, 
  CreditCard,
  FileText,
  Download,
  Route,
  ArrowRight,
  Eye
} from 'lucide-react'

const OwnerOperatorPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loads] = useState([
    {
      id: 'LO123456',
      origin: 'Chicago, IL',
      destination: 'Atlanta, GA',
      miles: 715,
      rate: 2850,
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-17',
      commodity: 'Electronics',
      weight: '45,000 lbs',
      status: 'Available',
      broker: 'Swift Logistics'
    },
    {
      id: 'LO123457',
      origin: 'Dallas, TX',
      destination: 'Denver, CO',
      miles: 925,
      rate: 3200,
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      commodity: 'Furniture',
      weight: '38,000 lbs',
      status: 'Booked',
      broker: 'Prime Transport'
    }
  ])

  const [payments] = useState([
    {
      id: 'PAY001',
      amount: 2850,
      date: '2024-01-15',
      status: 'Pending',
      loadId: 'LO123456',
      broker: 'Swift Logistics',
      type: 'Load Payment'
    },
    {
      id: 'PAY002',
      amount: 450,
      date: '2024-01-14',
      status: 'Paid',
      loadId: 'LO123455',
      broker: 'Prime Transport',
      type: 'Fuel Advance'
    }
  ])

  const stats = {
    totalLoads: 47,
    completedLoads: 45,
    pendingPayments: 3,
    totalEarnings: 127500,
    avgRate: 2.85,
    milesThisMonth: 12450,
    fuelExpenses: 8750,
    netProfit: 42750
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Loads</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalLoads}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Earnings</p>
              <p className="text-3xl font-bold text-green-600">${stats.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Miles This Month</p>
              <p className="text-3xl font-bold text-purple-600">{stats.milesThisMonth.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Route className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Net Profit</p>
              <p className="text-3xl font-bold text-orange-600">${stats.netProfit.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
            <Plus className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-slate-900">Find Loads</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors">
            <FileText className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-slate-900">Submit Documents</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-slate-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors">
            <CreditCard className="w-5 h-5 text-purple-600 mr-2" />
            <span className="font-medium text-slate-900">Request Payment</span>
          </button>
        </div>
      </motion.div>
    </div>
  )

  const renderLoads = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Available Loads</h2>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Find Loads
          </button>
        </div>
      </div>

      {/* Loads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loads.map((load) => (
          <div key={load.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Load {load.id}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                load.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {load.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                  <span className="text-sm text-slate-600">{load.origin}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                  <span className="text-sm text-slate-600">{load.destination}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Miles</p>
                  <p className="font-medium text-slate-900">{load.miles}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Rate</p>
                  <p className="font-medium text-slate-900">${load.rate.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Commodity</p>
                  <p className="font-medium text-slate-900">{load.commodity}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Weight</p>
                  <p className="font-medium text-slate-900">{load.weight}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Broker</p>
                    <p className="font-medium text-slate-900">{load.broker}</p>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Book Load
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Payments & Invoices</h2>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Request Payment
        </button>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Load ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Broker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    ${payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {payment.loadId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {payment.broker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {payment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Owner-Operator Portal</h1>
              <p className="text-slate-600">Independent trucking business management and load booking</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'loads', label: 'Loads', icon: Package },
                { id: 'payments', label: 'Payments', icon: DollarSign },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'loads' && renderLoads()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'documents' && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Documents Coming Soon</h3>
              <p className="text-slate-600">Document management and submission features will be available soon.</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Settings Coming Soon</h3>
              <p className="text-slate-600">Configuration and settings options will be available soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default OwnerOperatorPortal
