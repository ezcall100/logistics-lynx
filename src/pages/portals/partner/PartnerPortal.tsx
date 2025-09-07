import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, Users,
  DollarSign, Target, BarChart3,
  Plus, Search, Filter,
  Star, MessageSquare,
  Bell
} from 'lucide-react'

const PartnerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')

  const partnerStats = [
    { label: 'Active Partnerships', value: '24', change: '+3', icon: Users, color: 'text-blue-500' },
    { label: 'Revenue Generated', value: '$156K', change: '+18%', icon: DollarSign, color: 'text-green-500' },
    { label: 'Partner Rating', value: '4.9', change: '+0.1', icon: Star, color: 'text-yellow-500' },
    { label: 'Joint Projects', value: '12', change: '+2', icon: Target, color: 'text-purple-500' }
  ]

  const activePartnerships = [
    {
      name: 'TechCorp Solutions',
      type: 'Technology Partner',
      status: 'Active',
      revenue: '$45K',
      projects: 3,
      rating: 4.9,
      lastActivity: '2 days ago'
    },
    {
      name: 'Logistics Pro',
      type: 'Service Partner',
      status: 'Active',
      revenue: '$32K',
      projects: 2,
      rating: 4.8,
      lastActivity: '1 week ago'
    },
    {
      name: 'Data Analytics Inc',
      type: 'Data Partner',
      status: 'Active',
      revenue: '$28K',
      projects: 1,
      rating: 4.7,
      lastActivity: '3 days ago'
    }
  ]

  const jointProjects = [
    {
      name: 'AI Route Optimization',
      partner: 'TechCorp Solutions',
      status: 'In Progress',
      progress: 75,
      budget: '$50K',
      deadline: '2024-03-15',
      team: '8 members'
    },
    {
      name: 'Real-time Tracking System',
      partner: 'Logistics Pro',
      status: 'Planning',
      progress: 25,
      budget: '$35K',
      deadline: '2024-04-20',
      team: '6 members'
    },
    {
      name: 'Predictive Analytics Platform',
      partner: 'Data Analytics Inc',
      status: 'Completed',
      progress: 100,
      budget: '$42K',
      deadline: '2024-01-30',
      team: '10 members'
    }
  ]

  const revenueSharing = [
    { month: 'Jan 2024', amount: '$12,450', partners: 8, growth: '+15%' },
    { month: 'Dec 2023', amount: '$10,820', partners: 7, growth: '+8%' },
    { month: 'Nov 2023', amount: '$9,980', partners: 6, growth: '+12%' },
    { month: 'Oct 2023', amount: '$8,920', partners: 5, growth: '+5%' }
  ]

  const partnerDirectory = [
    {
      name: 'Swift Logistics',
      category: 'Carrier',
      location: 'Nationwide',
      specialties: ['Dry Van', 'Refrigerated'],
      rating: 4.8,
      status: 'Available'
    },
    {
      name: 'Tech Solutions Ltd',
      category: 'Technology',
      location: 'San Francisco, CA',
      specialties: ['AI/ML', 'Data Analytics'],
      rating: 4.9,
      status: 'Available'
    },
    {
      name: 'Green Transport Co',
      category: 'Sustainability',
      location: 'Portland, OR',
      specialties: ['Electric Vehicles', 'Carbon Tracking'],
      rating: 4.7,
      status: 'Busy'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Partner Portal</h1>
                <p className="text-gray-600">Strategic partner collaboration and management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Partner Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {partnerStats.map((stat, index) => (
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
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'partnerships', label: 'Partnerships', icon: Users },
                { id: 'projects', label: 'Joint Projects', icon: Target },
                { id: 'directory', label: 'Partner Directory', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-500 text-cyan-600'
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
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200">
                      <Plus className="w-5 h-5" />
                      <span className="font-medium">New Partnership</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                      <Target className="w-5 h-5" />
                      <span className="font-medium">Start Project</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-medium">Contact Partner</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200">
                      <BarChart3 className="w-5 h-5" />
                      <span className="font-medium">View Reports</span>
                    </button>
                  </div>
                </div>

                {/* Revenue Sharing */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Sharing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {revenueSharing.map((revenue, index) => (
                      <motion.div
                        key={revenue.month}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="text-sm text-gray-600 mb-1">{revenue.month}</div>
                        <div className="text-xl font-bold text-gray-900 mb-1">{revenue.amount}</div>
                        <div className="text-sm text-gray-600 mb-1">{revenue.partners} partners</div>
                        <div className="text-sm text-green-600 font-medium">{revenue.growth}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'partnerships' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Active Partnerships</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search partners..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {activePartnerships.map((partnership, index) => (
                    <motion.div
                      key={partnership.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Users className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{partnership.name}</div>
                            <div className="text-sm text-gray-600">{partnership.type}</div>
                            <div className="text-xs text-gray-500">Last activity: {partnership.lastActivity}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{partnership.revenue}</div>
                            <div className="text-xs text-gray-500">Revenue</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900">{partnership.projects}</div>
                            <div className="text-xs text-gray-500">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-semibold text-gray-900">{partnership.rating}</span>
                            </div>
                            <div className="text-xs text-gray-500">Rating</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            partnership.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {partnership.status}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Joint Projects</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    New Project
                  </button>
                </div>
                <div className="space-y-4">
                  {jointProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-600">Partner: {project.partner}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {project.status}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Budget</div>
                          <div className="font-semibold text-gray-900">{project.budget}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Deadline</div>
                          <div className="font-semibold text-gray-900">{project.deadline}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Team Size</div>
                          <div className="font-semibold text-gray-900">{project.team}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Progress</div>
                          <div className="font-semibold text-gray-900">{project.progress}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'directory' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Partner Directory</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search directory..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partnerDirectory.map((partner, index) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Users className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{partner.name}</div>
                            <div className="text-sm text-gray-600">{partner.category}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium text-gray-900">{partner.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`font-medium ${
                            partner.status === 'Available' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {partner.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Specialties:</div>
                        <div className="flex flex-wrap gap-2">
                          {partner.specialties.map((specialty, idx) => (
                            <span key={idx} className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-medium">
                          Contact
                        </button>
                        <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                          View Profile
                        </button>
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

export default PartnerPortal