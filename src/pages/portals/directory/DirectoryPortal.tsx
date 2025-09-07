import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Users, 
  Building, 
  Search, 
  CheckCircle,
  Plus
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
    { label: 'Total Companies', value: directoryStats.totalCompanies.toLocaleString(), icon: Building, color: 'text-transbot-sky' },
    { label: 'Active Companies', value: directoryStats.activeCompanies.toLocaleString(), icon: Users, color: 'text-transbot-teal' },
    { label: 'Verified Companies', value: directoryStats.verifiedCompanies.toLocaleString(), icon: CheckCircle, color: 'text-transbot-purple' },
    { label: 'New This Week', value: directoryStats.newCompanies.toString(), icon: Plus, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="Directory Portal"
        description="Comprehensive directory of logistics companies and partners"
        icon={Users}
        color="from-green-500 to-emerald-600"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Company
          </motion.button>
        </div>
      </PortalHeader>
      <section className="pt-8 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

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
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Company Directory</h2>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Logistics Company Directory</h3>
              <p className="text-transbot-text-secondary">Comprehensive directory with search, filtering, and company management capabilities</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
