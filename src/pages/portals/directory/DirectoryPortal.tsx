import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Users, 
  Building, 
  Search, 
  CheckCircle,
  Plus,
  Globe,
  Filter,
  Download,
  Star,
  TrendingUp
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

export default function DirectoryPortal() {
  const [searchQuery, setSearchQuery] = useState('')

  const directoryStats = {
    totalCompanies: 1250,
    activeCompanies: 1180,
    verifiedCompanies: 950,
    newCompanies: 25,
    totalContacts: 5600,
    lastUpdated: '2 hours ago'
  }

  const stats = [
    { label: 'Total Companies', value: directoryStats.totalCompanies.toLocaleString(), icon: Building, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Active Companies', value: directoryStats.activeCompanies.toLocaleString(), icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Verified Companies', value: directoryStats.verifiedCompanies.toLocaleString(), icon: CheckCircle, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'New This Week', value: directoryStats.newCompanies.toString(), icon: Plus, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ]

  const companies = [
    { id: 1, name: 'TransLogistics Inc.', type: 'Carrier', location: 'Chicago, IL', rating: 4.8, verified: true, employees: '500-1000', status: 'Active' },
    { id: 2, name: 'Freight Solutions LLC', type: 'Broker', location: 'Dallas, TX', rating: 4.6, verified: true, employees: '100-500', status: 'Active' },
    { id: 3, name: 'Global Shipping Co.', type: 'Shipper', location: 'Los Angeles, CA', rating: 4.9, verified: true, employees: '1000+', status: 'Active' },
    { id: 4, name: 'Quick Transport', type: 'Carrier', location: 'Miami, FL', rating: 4.3, verified: false, employees: '50-100', status: 'Pending' },
    { id: 5, name: 'Elite Logistics', type: 'Broker', location: 'Seattle, WA', rating: 4.7, verified: true, employees: '200-500', status: 'Active' },
    { id: 6, name: 'Metro Freight', type: 'Carrier', location: 'New York, NY', rating: 4.5, verified: true, employees: '300-500', status: 'Active' }
  ]

  const recentActivity = [
    { id: 1, action: 'New Company Added', company: 'Swift Transport', time: '5 min ago', type: 'success' },
    { id: 2, action: 'Company Verified', company: 'Global Shipping Co.', time: '12 min ago', type: 'info' },
    { id: 3, action: 'Profile Updated', company: 'TransLogistics Inc.', time: '18 min ago', type: 'warning' },
    { id: 4, action: 'New Contact Added', company: 'Freight Solutions LLC', time: '25 min ago', type: 'success' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 pt-16">
      <PortalHeader
        title="Directory Portal"
        description="Comprehensive directory of logistics companies and partners"
        icon={Users}
        color="from-green-500 to-emerald-600"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Company
          </motion.button>
        </div>
      </PortalHeader>
      
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
          {/* Companies List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Company Directory</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{company.name}</h3>
                          {company.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-gray-600">{company.type} • {company.location}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{company.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-600">{company.employees} employees</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        company.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {company.status}
                      </div>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg">
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' : 
                      activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.company}</p>
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
              <h2 className="text-xl font-bold text-gray-900">Directory Analytics</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <TrendingUp className="w-4 h-4" />
                View Report
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">+12.5%</p>
                <p className="text-sm text-gray-600">This month</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification Rate</h3>
                <p className="text-3xl font-bold text-blue-600 mb-1">76%</p>
                <p className="text-sm text-gray-600">Companies verified</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avg Rating</h3>
                <p className="text-3xl font-bold text-purple-600 mb-1">4.6</p>
                <p className="text-sm text-gray-600">Out of 5.0</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
