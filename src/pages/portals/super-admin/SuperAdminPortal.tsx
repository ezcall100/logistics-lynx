import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Crown, Building2, Globe, Users, 
  DollarSign, TrendingUp, Shield, Database,
  Plus, Search, Download,
  Eye, Edit, Settings, BarChart3,
  AlertTriangle, CheckCircle, Clock, Activity
} from 'lucide-react'

const SuperAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const enterpriseStats = [
    { label: 'Total Organizations', value: '1,247', change: '+23', icon: Building2, color: 'text-blue-500' },
    { label: 'Active Users', value: '45,892', change: '+1,234', icon: Users, color: 'text-green-500' },
    { label: 'Monthly Revenue', value: '$2.4M', change: '+18%', icon: DollarSign, color: 'text-emerald-500' },
    { label: 'System Uptime', value: '99.97%', change: '+0.01%', icon: Shield, color: 'text-purple-500' }
  ]

  const organizationData = [
    { id: 1, name: 'Global Logistics Corp', users: 1250, plan: 'Enterprise', status: 'Active', revenue: '$45,000', growth: '+12%' },
    { id: 2, name: 'Swift Transport Ltd', users: 890, plan: 'Professional', status: 'Active', revenue: '$28,500', growth: '+8%' },
    { id: 3, name: 'Metro Freight Inc', users: 456, plan: 'Standard', status: 'Active', revenue: '$15,200', growth: '+15%' },
    { id: 4, name: 'Coastal Shipping Co', users: 234, plan: 'Basic', status: 'Trial', revenue: '$0', growth: 'New' },
    { id: 5, name: 'Mountain Express', users: 678, plan: 'Professional', status: 'Active', revenue: '$22,100', growth: '+5%' }
  ]

  const systemMetrics = [
    { label: 'API Calls/min', value: '12,456', change: '+8%', color: 'text-blue-500' },
    { label: 'Database Queries', value: '89,234', change: '+12%', color: 'text-green-500' },
    { label: 'Storage Used', value: '2.4 TB', change: '+5%', color: 'text-orange-500' },
    { label: 'Bandwidth', value: '156 GB', change: '+3%', color: 'text-purple-500' }
  ]

  const recentEvents = [
    { id: 1, type: 'organization_created', message: 'New organization "Coastal Shipping Co" registered', time: '5 min ago', status: 'success' },
    { id: 2, type: 'payment_received', message: 'Payment of $45,000 received from Global Logistics Corp', time: '12 min ago', status: 'success' },
    { id: 3, type: 'system_alert', message: 'High API usage detected from Swift Transport Ltd', time: '18 min ago', status: 'warning' },
    { id: 4, type: 'user_limit', message: 'Metro Freight Inc approaching user limit', time: '25 min ago', status: 'info' },
    { id: 5, type: 'backup_complete', message: 'Enterprise backup completed successfully', time: '1 hour ago', status: 'success' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      case 'error': return 'text-red-600 bg-red-50'
      case 'info': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'info': return <Clock className="w-5 h-5 text-blue-500" />
      default: return <Activity className="w-5 h-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Super Admin Portal</h1>
                <p className="text-gray-600">Enterprise Management & System Control</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <Plus className="w-4 h-4" />
                Add Organization
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {enterpriseStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'organizations', label: 'Organizations', icon: Building2 },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'system', label: 'System', icon: Database },
                { id: 'billing', label: 'Billing', icon: DollarSign },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* System Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {systemMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{metric.value}</p>
                            <p className="text-sm text-green-600 mt-1">{metric.change}</p>
                          </div>
                          <div className={`w-8 h-8 rounded-lg bg-white flex items-center justify-center`}>
                            <TrendingUp className={`w-4 h-4 ${metric.color}`} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Recent Events */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Events</h3>
                  <div className="space-y-3">
                    {recentEvents.map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(event.status)}`}>
                            {getStatusIcon(event.status)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{event.message}</p>
                            <p className="text-sm text-gray-600">{event.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{event.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'organizations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Organizations</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search organizations..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <Plus className="w-4 h-4" />
                      Add Organization
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {organizationData.map((org) => (
                        <tr key={org.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{org.name}</div>
                                <div className="text-sm text-gray-500">ID: {org.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {org.users.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              org.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                              org.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                              org.plan === 'Standard' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {org.plan}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              org.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {org.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {org.revenue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            {org.growth}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-purple-600 hover:text-purple-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Settings className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Revenue Trends</h4>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Revenue chart placeholder</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">User Growth</h4>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Growth chart placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">System Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Database className="w-6 h-6 text-blue-500" />
                      <h4 className="font-medium text-gray-900">Database</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Connections</span>
                        <span>245/500</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '49%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="w-6 h-6 text-green-500" />
                      <h4 className="font-medium text-gray-900">API Gateway</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Requests/min</span>
                        <span>12,456</span>
                      </div>
                      <div className="text-sm text-green-600">+8% from last hour</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-purple-500" />
                      <h4 className="font-medium text-gray-900">Security</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Threats Blocked</span>
                        <span>1,247</span>
                      </div>
                      <div className="text-sm text-green-600">All systems secure</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Billing Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Monthly Recurring Revenue</h4>
                    <div className="text-3xl font-bold text-green-600">$2.4M</div>
                    <div className="text-sm text-green-600 mt-1">+18% from last month</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Active Subscriptions</h4>
                    <div className="text-3xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-green-600 mt-1">+23 this month</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Churn Rate</h4>
                    <div className="text-3xl font-bold text-orange-600">2.1%</div>
                    <div className="text-sm text-green-600 mt-1">-0.3% from last month</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Settings</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Global Configuration</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">System Maintenance</p>
                          <p className="text-sm text-gray-600">Schedule maintenance windows</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Configure
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">API Rate Limits</p>
                          <p className="text-sm text-gray-600">Configure global API limits</p>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminPortal