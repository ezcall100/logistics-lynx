import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  GitBranch, 
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  Users,
  MapPin,
  Briefcase
} from 'lucide-react'
import PortalHeader from '../../../components/portals/PortalHeader'

interface HumanDeveloper {
  id: string
  name: string
  email: string
  role: 'lead' | 'senior' | 'junior' | 'intern'
  specialization: string[]
  status: 'active' | 'busy' | 'away' | 'offline'
  performance: number
  projects: string[]
  skills: string[]
  experience: string
  location: string
  joinDate: string
  lastActivity: string
  commits: number
  pullRequests: number
  codeReviews: number
  workingHours: {
    start: string
    end: string
    timezone: string
  }
  availability: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
}

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'completed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedDevelopers: string[]
  progress: number
  deadline: string
  technologies: string[]
  repository: string
  createdAt: string
}

interface Team {
  id: string
  name: string
  lead: string
  members: string[]
  projects: string[]
  specialization: string
  performance: number
  lastMeeting: string
}

export function HumanDeveloperAdmin() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedDeveloper, setSelectedDeveloper] = useState<HumanDeveloper | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const developers: HumanDeveloper[] = [
    {
      id: 'dev_001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@transbotai.com',
      role: 'lead',
      specialization: ['React', 'TypeScript', 'Node.js'],
      status: 'active',
      performance: 95,
      projects: ['dashboard-portal', 'broker-portal', 'analytics-portal'],
      skills: ['Frontend Development', 'UI/UX Design', 'Team Leadership'],
      experience: '8 years',
      location: 'San Francisco, CA',
      joinDate: '2022-03-15',
      lastActivity: '2024-01-15 14:30:15',
      commits: 1247,
      pullRequests: 89,
      codeReviews: 156,
      workingHours: { start: '09:00', end: '17:00', timezone: 'PST' },
      availability: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false }
    },
    {
      id: 'dev_002',
      name: 'Mike Chen',
      email: 'mike.chen@transbotai.com',
      role: 'senior',
      specialization: ['Python', 'Django', 'PostgreSQL'],
      status: 'busy',
      performance: 92,
      projects: ['carrier-portal', 'driver-portal', 'financials-portal'],
      skills: ['Backend Development', 'Database Design', 'API Development'],
      experience: '6 years',
      location: 'Austin, TX',
      joinDate: '2022-06-20',
      lastActivity: '2024-01-15 14:28:42',
      commits: 892,
      pullRequests: 67,
      codeReviews: 134,
      workingHours: { start: '08:00', end: '16:00', timezone: 'CST' },
      availability: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: false }
    },
    {
      id: 'dev_003',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@transbotai.com',
      role: 'senior',
      specialization: ['Java', 'Spring Boot', 'Microservices'],
      status: 'active',
      performance: 89,
      projects: ['load-board-portal', 'marketplace-portal', 'crm-portal'],
      skills: ['Java Development', 'System Architecture', 'DevOps'],
      experience: '5 years',
      location: 'Seattle, WA',
      joinDate: '2023-01-10',
      lastActivity: '2024-01-15 14:25:18',
      commits: 654,
      pullRequests: 45,
      codeReviews: 98,
      workingHours: { start: '10:00', end: '18:00', timezone: 'PST' },
      availability: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false }
    },
    {
      id: 'dev_004',
      name: 'David Kim',
      email: 'david.kim@transbotai.com',
      role: 'junior',
      specialization: ['JavaScript', 'Vue.js', 'CSS'],
      status: 'away',
      performance: 87,
      projects: ['customer-portal', 'partner-portal'],
      skills: ['Frontend Development', 'Responsive Design', 'Testing'],
      experience: '2 years',
      location: 'New York, NY',
      joinDate: '2023-08-15',
      lastActivity: '2024-01-15 13:45:33',
      commits: 234,
      pullRequests: 23,
      codeReviews: 45,
      workingHours: { start: '09:00', end: '17:00', timezone: 'EST' },
      availability: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false }
    },
    {
      id: 'dev_005',
      name: 'Alex Thompson',
      email: 'alex.thompson@transbotai.com',
      role: 'intern',
      specialization: ['React', 'JavaScript', 'HTML/CSS'],
      status: 'offline',
      performance: 78,
      projects: ['developer-portal'],
      skills: ['Web Development', 'Git', 'Agile Methodology'],
      experience: '6 months',
      location: 'Chicago, IL',
      joinDate: '2023-12-01',
      lastActivity: '2024-01-15 12:30:22',
      commits: 89,
      pullRequests: 12,
      codeReviews: 23,
      workingHours: { start: '09:00', end: '17:00', timezone: 'CST' },
      availability: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: false, sunday: false }
    }
  ]

  const projects: Project[] = [
    {
      id: 'proj_001',
      name: 'Dashboard Portal Redesign',
      description: 'Complete redesign of the main dashboard with new analytics features',
      status: 'development',
      priority: 'high',
      assignedDevelopers: ['dev_001', 'dev_002'],
      progress: 75,
      deadline: '2024-02-15',
      technologies: ['React', 'TypeScript', 'Chart.js'],
      repository: 'https://github.com/transbotai/dashboard-portal',
      createdAt: '2024-01-01'
    },
    {
      id: 'proj_002',
      name: 'Mobile Driver App',
      description: 'Native mobile application for driver portal',
      status: 'testing',
      priority: 'critical',
      assignedDevelopers: ['dev_003', 'dev_004'],
      progress: 90,
      deadline: '2024-01-30',
      technologies: ['React Native', 'Redux', 'Firebase'],
      repository: 'https://github.com/transbotai/driver-mobile',
      createdAt: '2023-12-15'
    },
    {
      id: 'proj_003',
      name: 'API Gateway Implementation',
      description: 'Centralized API gateway for all portal services',
      status: 'planning',
      priority: 'medium',
      assignedDevelopers: ['dev_002', 'dev_003'],
      progress: 20,
      deadline: '2024-03-01',
      technologies: ['Node.js', 'Express', 'Redis'],
      repository: 'https://github.com/transbotai/api-gateway',
      createdAt: '2024-01-10'
    }
  ]

  const teams: Team[] = [
    {
      id: 'team_001',
      name: 'Frontend Team',
      lead: 'dev_001',
      members: ['dev_001', 'dev_004', 'dev_005'],
      projects: ['dashboard-portal', 'customer-portal', 'partner-portal'],
      specialization: 'Frontend Development',
      performance: 92,
      lastMeeting: '2024-01-15 10:00:00'
    },
    {
      id: 'team_002',
      name: 'Backend Team',
      lead: 'dev_002',
      members: ['dev_002', 'dev_003'],
      projects: ['carrier-portal', 'driver-portal', 'financials-portal'],
      specialization: 'Backend Development',
      performance: 89,
      lastMeeting: '2024-01-15 11:00:00'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-blue-100 text-blue-800'
      case 'away': return 'bg-yellow-100 text-yellow-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'busy': return <Activity className="w-4 h-4" />
      case 'away': return <Clock className="w-4 h-4" />
      case 'offline': return <XCircle className="w-4 h-4" />
      default: return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'lead': return 'bg-purple-100 text-purple-800'
      case 'senior': return 'bg-blue-100 text-blue-800'
      case 'junior': return 'bg-green-100 text-green-800'
      case 'intern': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'development': return 'bg-green-100 text-green-800'
      case 'testing': return 'bg-yellow-100 text-yellow-800'
      case 'deployment': return 'bg-orange-100 text-orange-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <User className="w-12 h-12" />
            <div>
              <h2 className="text-4xl font-bold">Human Developer Management</h2>
              <p className="text-xl opacity-90">Coordinate and manage human development teams</p>
            </div>
          </div>
          <p className="text-lg opacity-80 max-w-3xl">
            Manage human developers working alongside MCP Agents. Track performance, 
            assign projects, monitor progress, and ensure seamless collaboration between 
            human and AI development teams.
          </p>
        </motion.div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Total Developers</p>
              <p className="text-2xl font-bold text-transbot-text-primary">15</p>
              <p className="text-green-600 text-sm font-medium">+3 this month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Active Projects</p>
              <p className="text-2xl font-bold text-transbot-text-primary">12</p>
              <p className="text-green-600 text-sm font-medium">+2 this week</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Avg Performance</p>
              <p className="text-2xl font-bold text-transbot-text-primary">88.2%</p>
              <p className="text-green-600 text-sm font-medium">+5.1% this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-transbot-text-secondary text-sm font-medium">Code Commits</p>
              <p className="text-2xl font-bold text-transbot-text-primary">3,116</p>
              <p className="text-green-600 text-sm font-medium">+156 today</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <GitBranch className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('developers')}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Developer Management</h3>
          <p className="text-transbot-text-secondary">Manage individual developers and their assignments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('projects')}
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Briefcase className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Project Management</h3>
          <p className="text-transbot-text-secondary">Track and manage development projects</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('teams')}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Team Management</h3>
          <p className="text-transbot-text-secondary">Organize developers into teams and departments</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setActiveTab('analytics')}
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">Performance Analytics</h3>
          <p className="text-transbot-text-secondary">Analyze team and individual performance</p>
        </motion.div>
      </div>
    </div>
  )

  const renderDevelopers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">Developer Management</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search developers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-white/80 border border-slate-200/50 rounded-lg text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Developer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {developers.map((dev, index) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-transbot-text-primary">{dev.name}</h4>
                  <p className="text-sm text-transbot-text-secondary">{dev.email}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(dev.status)}`}>
                  {getStatusIcon(dev.status)}
                  <span>{dev.status}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(dev.role)}`}>
                  {dev.role}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-transbot-text-secondary">Performance</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${dev.performance}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-transbot-text-primary">{dev.performance}%</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Experience</p>
                <p className="text-sm text-transbot-text-primary font-medium">{dev.experience}</p>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Location</p>
                <div className="flex items-center space-x-1 text-sm text-transbot-text-primary">
                  <MapPin className="w-4 h-4" />
                  <span>{dev.location}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Specializations</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {dev.specialization.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {dev.specialization.length > 3 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      +{dev.specialization.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-transbot-text-secondary">Commits</p>
                  <p className="font-semibold text-transbot-text-primary">{dev.commits}</p>
                </div>
                <div>
                  <p className="text-transbot-text-secondary">PRs</p>
                  <p className="font-semibold text-transbot-text-primary">{dev.pullRequests}</p>
                </div>
                <div>
                  <p className="text-transbot-text-secondary">Reviews</p>
                  <p className="font-semibold text-transbot-text-primary">{dev.codeReviews}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-transbot-text-secondary">Last activity: {dev.lastActivity}</p>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button 
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                onClick={() => setSelectedDeveloper(dev)}
              >
                Manage
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button className="bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">Project Management</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-transbot-text-primary">{project.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getProjectStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    project.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.priority}
                  </span>
                </div>
                <p className="text-transbot-text-secondary mb-3">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-transbot-text-secondary">Progress</span>
                    <span className="text-sm font-semibold text-transbot-text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-transbot-text-secondary">Technologies</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-transbot-text-secondary">Deadline</p>
                    <p className="font-medium text-transbot-text-primary">{project.deadline}</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderTeams = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-transbot-text-primary">Team Management</h3>
        <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Team</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-transbot-text-primary mb-1">{team.name}</h4>
                <p className="text-sm text-transbot-text-secondary">{team.specialization}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-transbot-text-secondary">Performance</p>
                <p className="text-lg font-bold text-transbot-text-primary">{team.performance}%</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-transbot-text-secondary">Team Lead</p>
                <p className="font-medium text-transbot-text-primary">{team.lead}</p>
              </div>
              
              <div>
                <p className="text-sm text-transbot-text-secondary">Members ({team.members.length})</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {team.members.map(member => (
                    <span key={member} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Projects ({team.projects.length})</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {team.projects.map(project => (
                    <span key={project} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-transbot-text-secondary">Last Meeting</p>
                <p className="text-sm text-transbot-text-primary">{team.lastMeeting}</p>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Manage Team
              </button>
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
              <button className="bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-transbot-text-primary">Performance Analytics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Developer Performance Trends</h4>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-16 h-16 text-slate-400" />
          </div>
        </div>
        <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50">
          <h4 className="text-lg font-semibold text-transbot-text-primary mb-4">Project Progress</h4>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-16 h-16 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <PortalHeader
        title="Human Developer Admin"
        description="Manage and coordinate human development teams"
        icon={User}
        color="from-blue-500 to-purple-600"
      >
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">
            Teams Status: Active
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Schedule Meeting
          </button>
        </div>
      </PortalHeader>
      <section className="pt-8 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-8"
          >
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('developers')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'developers'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Developer Management
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'projects'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Project Management
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'teams'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Team Management
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'analytics'
                  ? 'bg-white text-transbot-sky shadow-sm'
                  : 'text-transbot-text-secondary hover:text-transbot-text-primary'
              }`}
            >
              Analytics
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'developers' && renderDevelopers()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'teams' && renderTeams()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </section>

      {/* Developer Detail Modal */}
      {selectedDeveloper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transbot-text-primary">
                  {selectedDeveloper.name}
                </h2>
                <button
                  onClick={() => setSelectedDeveloper(null)}
                  className="text-transbot-text-secondary hover:text-transbot-text-primary"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Role</label>
                    <p className="font-medium capitalize">{selectedDeveloper.role}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Experience</label>
                    <p className="font-medium">{selectedDeveloper.experience}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Location</label>
                    <p className="font-medium">{selectedDeveloper.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-transbot-text-secondary">Join Date</label>
                    <p className="font-medium">{selectedDeveloper.joinDate}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-transbot-text-secondary">Skills</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedDeveloper.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-transbot-text-secondary">Working Hours</label>
                  <p className="font-medium">{selectedDeveloper.workingHours.start} - {selectedDeveloper.workingHours.end} ({selectedDeveloper.workingHours.timezone})</p>
                </div>
                
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                    Manage Developer
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
