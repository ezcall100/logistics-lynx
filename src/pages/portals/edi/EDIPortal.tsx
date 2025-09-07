import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  CheckCircle, 
  Database, 
  Settings, 
  Search,
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  RefreshCw,
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  XCircle
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

const EDIPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [transactions] = useState([
    {
      id: 'EDI001',
      type: '856',
      partner: 'Walmart Inc.',
      status: 'Processed',
      timestamp: '2024-01-15 10:30:25',
      direction: 'Outbound',
      size: '2.4 KB',
      records: 156,
      processingTime: '0.8s'
    },
    {
      id: 'EDI002',
      type: '810',
      partner: 'Target Corp.',
      status: 'Pending',
      timestamp: '2024-01-15 10:25:12',
      direction: 'Inbound',
      size: '1.8 KB',
      records: 89,
      processingTime: 'N/A'
    },
    {
      id: 'EDI003',
      type: '997',
      partner: 'Amazon Logistics',
      status: 'Failed',
      timestamp: '2024-01-15 10:20:45',
      direction: 'Outbound',
      size: '0.5 KB',
      records: 1,
      processingTime: 'N/A'
    }
  ])

  const [partners] = useState([
    {
      id: 1,
      name: 'Walmart Inc.',
      idNumber: 'WALM001',
      status: 'Active',
      documents: ['856', '810', '997'],
      lastActivity: '2024-01-15 10:30',
      connectionType: 'AS2',
      compliance: 'Current'
    },
    {
      id: 2,
      name: 'Target Corp.',
      idNumber: 'TGT001',
      status: 'Active',
      documents: ['856', '810'],
      lastActivity: '2024-01-15 10:25',
      connectionType: 'FTP',
      compliance: 'Current'
    },
    {
      id: 3,
      name: 'Amazon Logistics',
      idNumber: 'AMZ001',
      status: 'Inactive',
      documents: ['856', '997'],
      lastActivity: '2024-01-14 16:45',
      connectionType: 'AS2',
      compliance: 'Expired'
    }
  ])

  const stats = {
    totalTransactions: 2847,
    processedToday: 156,
    failedToday: 3,
    activePartners: 12,
    avgProcessingTime: '1.2s',
    successRate: 98.7,
    totalVolume: '2.4 GB'
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
              <p className="text-sm text-slate-600">Total Transactions</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalTransactions.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-slate-600">Processed Today</p>
              <p className="text-3xl font-bold text-green-600">{stats.processedToday}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-slate-600">Failed Today</p>
              <p className="text-3xl font-bold text-red-600">{stats.failedToday}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
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
              <p className="text-sm text-slate-600">Success Rate</p>
              <p className="text-3xl font-bold text-purple-600">{stats.successRate}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  transaction.status === 'Processed' ? 'bg-green-500' :
                  transaction.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-slate-900">{transaction.id} - {transaction.type}</p>
                  <p className="text-sm text-slate-600">{transaction.partner}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{transaction.status}</p>
                <p className="text-xs text-slate-500">{transaction.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">EDI Transactions</h2>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Status</option>
          <option>Processed</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Types</option>
          <option>856 - Advance Ship Notice</option>
          <option>810 - Invoice</option>
          <option>997 - Functional Acknowledgment</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Direction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {transaction.partner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'Processed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {transaction.direction}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {transaction.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {transaction.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
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

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">EDI Partners</h2>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{partner.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                partner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {partner.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">ID Number</p>
                <p className="font-medium text-slate-900">{partner.idNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Connection Type</p>
                <p className="font-medium text-slate-900">{partner.connectionType}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Supported Documents</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {partner.documents.map((doc) => (
                    <span key={doc} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Last Activity</p>
                <p className="font-medium text-slate-900">{partner.lastActivity}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <span className={`text-sm ${
                  partner.compliance === 'Current' ? 'text-green-600' : 'text-red-600'
                }`}>
                  Compliance: {partner.compliance}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <Activity className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="EDI Portal"
        description="Electronic Data Interchange management and transaction processing"
        icon={Database}
        color="from-green-500 to-teal-600"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
                { id: 'transactions', label: 'Transactions', icon: FileText },
                { id: 'partners', label: 'Partners', icon: Users },
                { id: 'monitoring', label: 'Monitoring', icon: Activity },
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
          {activeTab === 'transactions' && renderTransactions()}
          {activeTab === 'partners' && renderPartners()}
          {activeTab === 'monitoring' && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Monitoring Coming Soon</h3>
              <p className="text-slate-600">Real-time monitoring and alerting features will be available soon.</p>
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

export default EDIPortal
