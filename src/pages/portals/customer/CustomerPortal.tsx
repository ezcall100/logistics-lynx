import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Package, MessageSquare,
  DollarSign, FileText, Star,
  Plus, Search, Filter, Download,
  Clock,
  CreditCard, Bell
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

const CustomerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const accountStats = [
    { label: 'Total Shipments', value: '1,247', change: '+23', icon: Package, color: 'text-blue-500' },
    { label: 'Active Shipments', value: '8', change: '+2', icon: Clock, color: 'text-yellow-500' },
    { label: 'Total Spent', value: '$89,450', change: '+$12K', icon: DollarSign, color: 'text-green-500' },
    { label: 'Account Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-purple-500' }
  ]

  const activeShipments = [
    {
      id: 'CS-001',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      carrier: 'Swift Logistics',
      status: 'In Transit',
      progress: 75,
      eta: '2 days',
      cost: '$1,450'
    },
    {
      id: 'CS-002',
      origin: 'Chicago, IL',
      destination: 'Miami, FL',
      carrier: 'Prime Transport',
      status: 'Loading',
      progress: 25,
      eta: '3 days',
      cost: '$980'
    },
    {
      id: 'CS-003',
      origin: 'Seattle, WA',
      destination: 'Denver, CO',
      carrier: 'Western Freight',
      status: 'Scheduled',
      progress: 0,
      eta: 'Tomorrow',
      cost: '$1,200'
    }
  ]

  const recentInvoices = [
    { id: 'INV-001', date: '2024-01-15', amount: '$2,450', status: 'Paid', shipments: 2 },
    { id: 'INV-002', date: '2024-01-10', amount: '$1,850', status: 'Paid', shipments: 1 },
    { id: 'INV-003', date: '2024-01-05', amount: '$3,200', status: 'Pending', shipments: 3 },
    { id: 'INV-004', date: '2023-12-28', amount: '$1,980', status: 'Paid', shipments: 2 }
  ]

  const supportTickets = [
    {
      id: 'TKT-001',
      subject: 'Delivery Delay Inquiry',
      status: 'Open',
      priority: 'Medium',
      created: '2 hours ago',
      assigned: 'Sarah Johnson'
    },
    {
      id: 'TKT-002',
      subject: 'Billing Question',
      status: 'Resolved',
      priority: 'Low',
      created: '1 day ago',
      assigned: 'Mike Wilson'
    },
    {
      id: 'TKT-003',
      subject: 'New Service Request',
      status: 'In Progress',
      priority: 'High',
      created: '3 days ago',
      assigned: 'Lisa Chen'
    }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      <PortalHeader
        title="Customer Portal"
        description="Customer relationship and service management"
        icon={Users}
        color="from-pink-500 to-rose-600"
      >
        <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600"></div>
      </PortalHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accountStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gray-50">
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
                { id: 'dashboard', label: 'Dashboard', icon: Package },
                { id: 'shipments', label: 'My Shipments', icon: Package },
                { id: 'billing', label: 'Billing', icon: CreditCard },
                { id: 'support', label: 'Support', icon: MessageSquare }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
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
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl hover:from-pink-600 hover:to-rose-700 transition-all duration-200">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">New Shipment</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                      <Search className="w-5 h-5" />
                      <span className="font-medium">Track Shipment</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium">Contact Support</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">View Invoices</span>
                    </button>
                  </div>
                </div>

                {/* Active Shipments */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Active Shipments</h3>
                    <button className="text-pink-600 hover:text-pink-700 font-medium">
                      View All
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeShipments.map((shipment, index) => (
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
                              <div className="text-xs text-gray-500">{shipment.carrier}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{shipment.cost}</div>
                              <div className="text-sm text-gray-600">ETA: {shipment.eta}</div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium ${
                                shipment.status === 'In Transit' ? 'text-blue-600' :
                                shipment.status === 'Loading' ? 'text-yellow-600' :
                                'text-green-600'
                              }`}>
                                {shipment.status}
                              </div>
                            </div>
                            <div className="w-16">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
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

            {activeTab === 'billing' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Billing & Invoices</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {recentInvoices.map((invoice, index) => (
                    <motion.div
                      key={invoice.id}
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
                            <div className="font-semibold text-gray-900">{invoice.id}</div>
                            <div className="text-sm text-gray-600">{invoice.date}</div>
                            <div className="text-xs text-gray-500">{invoice.shipments} shipments</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{invoice.amount}</div>
                            <div className={`text-sm font-medium ${
                              invoice.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {invoice.status}
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium">
                            {invoice.status === 'Paid' ? 'Download' : 'Pay Now'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    New Ticket
                  </button>
                </div>
                <div className="space-y-4">
                  {supportTickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <MessageSquare className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{ticket.subject}</div>
                            <div className="text-sm text-gray-600">Ticket #{ticket.id}</div>
                            <div className="text-xs text-gray-500">Created {ticket.created}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              ticket.status === 'Resolved' ? 'text-green-600' :
                              ticket.status === 'In Progress' ? 'text-blue-600' :
                              'text-yellow-600'
                            }`}>
                              {ticket.status}
                            </div>
                            <div className="text-xs text-gray-500">Assigned to {ticket.assigned}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                            ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {ticket.priority}
                          </div>
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

export default CustomerPortal