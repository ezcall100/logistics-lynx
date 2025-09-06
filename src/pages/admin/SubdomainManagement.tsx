import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Globe, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Settings,
  Eye,
  Mail,
  Calendar,
  Search
} from 'lucide-react'
import { subdomainService, UserApplication, SubdomainConfig } from '../../services/subdomainService'

export function SubdomainManagement() {
  const [applications, setApplications] = useState<UserApplication[]>([])
  const [subdomains, setSubdomains] = useState<SubdomainConfig[]>([])
  const [activeTab, setActiveTab] = useState<'applications' | 'subdomains'>('applications')
  const [selectedApplication, setSelectedApplication] = useState<UserApplication | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [apps, subs] = await Promise.all([
        subdomainService.getAllApplications(),
        subdomainService.getAllSubdomains()
      ])
      setApplications(apps)
      setSubdomains(subs)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleApproveApplication = async (applicationId: string) => {
    try {
      const subdomainConfig = await subdomainService.approveApplication(applicationId, 'Approved by admin')
      setSubdomains(prev => [...prev, subdomainConfig])
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: 'approved' } : app
      ))
      setSelectedApplication(null)
    } catch (error) {
      console.error('Failed to approve application:', error)
    }
  }

  const handleRejectApplication = async (applicationId: string) => {
    try {
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      ))
      setSelectedApplication(null)
    } catch (error) {
      console.error('Failed to reject application:', error)
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'under_review': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'under_review': return <Eye className="w-4 h-4" />
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-transbot-sky border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transbot-text-primary mb-2">
            Subdomain Management
          </h1>
          <p className="text-transbot-text-secondary">
            Manage user applications and subdomain configurations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'applications'
                ? 'bg-transbot-sky text-white shadow-lg'
                : 'bg-white text-transbot-text-secondary hover:bg-slate-50'
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('subdomains')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'subdomains'
                ? 'bg-transbot-sky text-white shadow-lg'
                : 'bg-white text-transbot-text-secondary hover:bg-slate-50'
            }`}
          >
            Active Subdomains ({subdomains.length})
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-transbot-text-secondary" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-transbot-text-primary">
                        {application.companyName}
                      </h3>
                      <p className="text-sm text-transbot-text-secondary">
                        {application.industry}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span>{application.status.replace('_', ' ')}</span>
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                    <Mail className="w-4 h-4" />
                    <span>{application.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>{application.companySize}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(application.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-transbot-text-primary mb-2">Requested Portals:</h4>
                  <div className="flex flex-wrap gap-1">
                    {application.requestedPortals.slice(0, 3).map(portal => (
                      <span key={portal} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        {portal}
                      </span>
                    ))}
                    {application.requestedPortals.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        +{application.requestedPortals.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedApplication(application)}
                    className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200 transition-colors"
                  >
                    View Details
                  </button>
                  {application.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveApplication(application.id)}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectApplication(application.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Subdomains Tab */}
        {activeTab === 'subdomains' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {subdomains.map((subdomain) => (
              <motion.div
                key={subdomain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-transbot-text-primary">
                        {subdomain.subdomain}.transbotai.com
                      </h3>
                      <p className="text-sm text-transbot-text-secondary">
                        {subdomain.companyName}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    subdomain.status === 'active' ? 'bg-green-100 text-green-800' :
                    subdomain.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    subdomain.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {subdomain.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {new Date(subdomain.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                    <Users className="w-4 h-4" />
                    <span>Plan: {subdomain.plan}</span>
                  </div>
                  {subdomain.customDomain && (
                    <div className="flex items-center space-x-2 text-sm text-transbot-text-secondary">
                      <Globe className="w-4 h-4" />
                      <span>Custom: {subdomain.customDomain}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-transbot-text-primary mb-2">Active Portals:</h4>
                  <div className="flex flex-wrap gap-1">
                    {subdomain.portals.slice(0, 3).map(portal => (
                      <span key={portal} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        {portal}
                      </span>
                    ))}
                    {subdomain.portals.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                        +{subdomain.portals.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                    <Settings className="w-4 h-4 inline mr-2" />
                    Manage
                  </button>
                  <button className="bg-transbot-sky text-white py-2 px-4 rounded-lg font-medium hover:bg-transbot-sky/80 transition-colors">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Visit
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Application Detail Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transbot-text-primary">
                    Application Details
                  </h2>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="text-transbot-text-secondary hover:text-transbot-text-primary"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-transbot-text-primary mb-2">Company Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-transbot-text-secondary">Company Name</label>
                        <p className="font-medium">{selectedApplication.companyName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-transbot-text-secondary">Industry</label>
                        <p className="font-medium">{selectedApplication.industry}</p>
                      </div>
                      <div>
                        <label className="text-sm text-transbot-text-secondary">Company Size</label>
                        <p className="font-medium">{selectedApplication.companySize}</p>
                      </div>
                      <div>
                        <label className="text-sm text-transbot-text-secondary">Contact Email</label>
                        <p className="font-medium">{selectedApplication.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-transbot-text-primary mb-2">Use Case</h3>
                    <p className="text-transbot-text-secondary">{selectedApplication.useCase}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-transbot-text-primary mb-2">Requested Portals</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedApplication.requestedPortals.map(portal => (
                        <span key={portal} className="px-3 py-2 bg-blue-100 text-blue-600 text-sm rounded-lg">
                          {portal}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedApplication.customDomain && (
                    <div>
                      <h3 className="font-semibold text-transbot-text-primary mb-2">Custom Domain</h3>
                      <p className="text-transbot-text-secondary">{selectedApplication.customDomain}</p>
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4 border-t">
                    {selectedApplication.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveApplication(selectedApplication.id)}
                          className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                        >
                          Approve Application
                        </button>
                        <button
                          onClick={() => handleRejectApplication(selectedApplication.id)}
                          className="flex-1 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                        >
                          Reject Application
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
