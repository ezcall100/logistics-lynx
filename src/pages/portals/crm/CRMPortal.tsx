import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Users, 
  User, 
  Search,
  Plus,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

export default function CRMPortal() {
  const [searchQuery, setSearchQuery] = useState('')

  const crmStats = {
    totalContacts: 2500,
    activeLeads: 180,
    convertedLeads: 45,
    totalRevenue: 850000,
    averageDealSize: 18900,
    conversionRate: 25.0
  }

  const stats = [
    { label: 'Total Contacts', value: crmStats.totalContacts.toLocaleString(), icon: Users, color: 'text-transbot-sky' },
    { label: 'Active Leads', value: crmStats.activeLeads.toString(), icon: User, color: 'text-transbot-teal' },
    { label: 'Converted Leads', value: crmStats.convertedLeads.toString(), icon: CheckCircle, color: 'text-transbot-purple' },
    { label: 'Conversion Rate', value: `${crmStats.conversionRate}%`, icon: TrendingUp, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-sky/5 via-white to-transbot-teal/5">
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">CRM Portal</h1>
              <p className="text-transbot-text-secondary">Customer relationship management for logistics businesses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </motion.button>
            </div>
          </motion.div>

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
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot"
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
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
          >
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">CRM Dashboard</h2>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Customer Relationship Management</h3>
              <p className="text-transbot-text-secondary">Complete CRM system with lead management, contact tracking, and sales analytics</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
