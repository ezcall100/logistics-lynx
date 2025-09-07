import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Clock, 
  MapPin, 
  Calendar, 
  TrendingUp,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Award
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

const WorkersPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [workers] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Driver',
      status: 'Active',
      location: 'Chicago, IL',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@transbot.com',
      nextShift: '2024-01-15 08:00',
      hoursWorked: 42,
      rating: 4.8,
      vehicle: 'Truck #1234',
      compliance: 'Current'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Dispatcher',
      status: 'Active',
      location: 'Dallas, TX',
      phone: '+1 (555) 234-5678',
      email: 'sarah.johnson@transbot.com',
      nextShift: '2024-01-15 06:00',
      hoursWorked: 38,
      rating: 4.9,
      vehicle: 'Office',
      compliance: 'Current'
    },
    {
      id: 3,
      name: 'Mike Davis',
      role: 'Warehouse Worker',
      status: 'On Break',
      location: 'Phoenix, AZ',
      phone: '+1 (555) 345-6789',
      email: 'mike.davis@transbot.com',
      nextShift: '2024-01-15 14:00',
      hoursWorked: 35,
      rating: 4.7,
      vehicle: 'N/A',
      compliance: 'Current'
    }
  ])

  const [schedules] = useState([
    {
      id: 1,
      worker: 'John Smith',
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '17:00',
      shift: 'Day',
      location: 'Warehouse A',
      tasks: ['Loading', 'Transport', 'Delivery']
    },
    {
      id: 2,
      worker: 'Sarah Johnson',
      date: '2024-01-15',
      startTime: '06:00',
      endTime: '15:00',
      shift: 'Morning',
      location: 'Dispatch Center',
      tasks: ['Route Planning', 'Communication', 'Monitoring']
    }
  ])

  const stats = {
    totalWorkers: 156,
    activeWorkers: 142,
    onBreak: 8,
    offDuty: 6,
    totalHours: 6240,
    avgRating: 4.8,
    complianceRate: 98.5
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
              <p className="text-sm text-slate-600">Total Workers</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalWorkers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-slate-600">Active Workers</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeWorkers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-slate-600">Total Hours</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalHours.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
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
              <p className="text-sm text-slate-600">Avg Rating</p>
              <p className="text-3xl font-bold text-orange-600">{stats.avgRating}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg border border-slate-200"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600">John Smith started his shift at 08:00 AM</span>
            <span className="text-xs text-slate-400 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Sarah Johnson completed route optimization</span>
            <span className="text-xs text-slate-400 ml-auto">15 min ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Mike Davis went on break</span>
            <span className="text-xs text-slate-400 ml-auto">1 hour ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderWorkers = () => (
    <div className="space-y-6">
      {/* Workers Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Workers Management</h2>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Worker
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workers..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Workers Table */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Worker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Next Shift</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {workers.map((worker) => (
                <tr key={worker.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{worker.name}</div>
                        <div className="text-sm text-slate-500">{worker.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {worker.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      worker.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {worker.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                      {worker.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {worker.nextShift}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-slate-900">{worker.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
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

  const renderScheduling = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Work Schedule</h2>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Calendar View</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => (
              <div key={i} className="aspect-square flex items-center justify-center text-sm border border-slate-200 rounded hover:bg-blue-50 cursor-pointer">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{schedule.worker}</h4>
                  <span className="text-sm text-slate-500">{schedule.shift}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {schedule.startTime} - {schedule.endTime}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {schedule.location}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {schedule.tasks.map((task, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="Workers Portal"
        description="Manage your workforce with AI-powered scheduling and optimization"
        icon={Users}
        color="from-blue-500 to-purple-600"
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
                { id: 'workers', label: 'Workers', icon: Users },
                { id: 'scheduling', label: 'Scheduling', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
          {activeTab === 'workers' && renderWorkers()}
          {activeTab === 'scheduling' && renderScheduling()}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics Coming Soon</h3>
              <p className="text-slate-600">Advanced analytics and reporting features will be available soon.</p>
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

export default WorkersPortal
