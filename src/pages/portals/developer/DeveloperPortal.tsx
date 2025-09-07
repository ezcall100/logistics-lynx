import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, Code, Globe, Terminal,
  BookOpen, Download, Play,
  CheckCircle, Clock,
  Plus, Search, Filter, Copy,
  Zap, Shield
} from 'lucide-react'

const DeveloperPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const devStats = [
    { label: 'API Calls Today', value: '12.4K', change: '+8%', icon: Code, color: 'text-blue-500' },
    { label: 'Active Projects', value: '8', change: '+2', icon: Globe, color: 'text-green-500' },
    { label: 'API Uptime', value: '99.9%', change: '+0.1%', icon: CheckCircle, color: 'text-emerald-500' },
    { label: 'Documentation Views', value: '1.2K', change: '+15%', icon: BookOpen, color: 'text-purple-500' }
  ]

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/shipments',
      description: 'Retrieve shipment data',
      status: 'Active',
      calls: '2.4K',
      responseTime: '120ms'
    },
    {
      method: 'POST',
      endpoint: '/api/v1/shipments',
      description: 'Create new shipment',
      status: 'Active',
      calls: '1.8K',
      responseTime: '95ms'
    },
    {
      method: 'GET',
      endpoint: '/api/v1/carriers',
      description: 'Get carrier information',
      status: 'Active',
      calls: '3.2K',
      responseTime: '85ms'
    },
    {
      method: 'PUT',
      endpoint: '/api/v1/tracking',
      description: 'Update shipment tracking',
      status: 'Active',
      calls: '4.1K',
      responseTime: '110ms'
    }
  ]

  const sdks = [
    {
      name: 'JavaScript SDK',
      version: 'v2.1.0',
      downloads: '15.2K',
      lastUpdate: '2 days ago',
      status: 'Stable',
      language: 'JavaScript'
    },
    {
      name: 'Python SDK',
      version: 'v1.8.3',
      downloads: '8.7K',
      lastUpdate: '1 week ago',
      status: 'Stable',
      language: 'Python'
    },
    {
      name: 'Java SDK',
      version: 'v1.5.2',
      downloads: '6.3K',
      lastUpdate: '3 days ago',
      status: 'Beta',
      language: 'Java'
    },
    {
      name: 'PHP SDK',
      version: 'v1.2.1',
      downloads: '4.1K',
      lastUpdate: '5 days ago',
      status: 'Stable',
      language: 'PHP'
    }
  ]

  const integrationGuides = [
    {
      title: 'Getting Started with Trans Bot API',
      description: 'Learn how to authenticate and make your first API call',
      difficulty: 'Beginner',
      time: '15 min',
      category: 'Authentication'
    },
    {
      title: 'Real-time Shipment Tracking',
      description: 'Implement real-time tracking using WebSocket connections',
      difficulty: 'Intermediate',
      time: '45 min',
      category: 'Real-time'
    },
    {
      title: 'Bulk Operations',
      description: 'Process multiple shipments efficiently using batch endpoints',
      difficulty: 'Advanced',
      time: '60 min',
      category: 'Performance'
    },
    {
      title: 'Webhook Integration',
      description: 'Set up webhooks to receive real-time notifications',
      difficulty: 'Intermediate',
      time: '30 min',
      category: 'Webhooks'
    }
  ]

  const sandboxProjects = [
    {
      name: 'E-commerce Integration',
      description: 'Sample integration for online retailers',
      language: 'JavaScript',
      lastModified: '2 hours ago',
      status: 'Active'
    },
    {
      name: 'Mobile App Backend',
      description: 'API integration for mobile applications',
      language: 'Python',
      lastModified: '1 day ago',
      status: 'Active'
    },
    {
      name: 'Analytics Dashboard',
      description: 'Real-time analytics using our APIs',
      language: 'React',
      lastModified: '3 days ago',
      status: 'Draft'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-500 to-slate-600">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Developer Portal</h1>
                <p className="text-gray-600">API access and integration tools</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                API Status: Online
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-slate-600"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dev Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {devStats.map((stat, index) => (
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
                { id: 'overview', label: 'Overview', icon: Globe },
                { id: 'api', label: 'API Reference', icon: Code },
                { id: 'sdks', label: 'SDKs', icon: Download },
                { id: 'guides', label: 'Integration Guides', icon: BookOpen },
                { id: 'sandbox', label: 'Sandbox', icon: Terminal }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-gray-500 text-gray-600'
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
              <div className="space-y-8">
                {/* Quick Start */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">1. Get API Key</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Generate your API key from the dashboard</p>
                      <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                        Generate Key
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <Code className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">2. Make First Call</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Test your integration with our API</p>
                      <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                        Try API
                      </button>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900">3. Go Live</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Deploy your integration to production</p>
                      <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                        Deploy
                      </button>
                    </div>
                  </div>
                </div>

                {/* API Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">API Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {apiEndpoints.slice(0, 4).map((endpoint, index) => (
                      <motion.div
                        key={endpoint.endpoint}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-sm font-mono text-gray-700">{endpoint.endpoint}</code>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600">Online</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{endpoint.calls} calls</span>
                          <span>{endpoint.responseTime} avg</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">API Endpoints</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search endpoints..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <motion.div
                      key={endpoint.endpoint}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono text-gray-900">{endpoint.endpoint}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">{endpoint.status}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{endpoint.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Calls Today</div>
                          <div className="font-semibold text-gray-900">{endpoint.calls}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Avg Response Time</div>
                          <div className="font-semibold text-gray-900">{endpoint.responseTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Status</div>
                          <div className="font-semibold text-green-600">Healthy</div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                          View Docs
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                          Try It
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sdks' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Software Development Kits</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Request SDK
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sdks.map((sdk, index) => (
                    <motion.div
                      key={sdk.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Code className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{sdk.name}</div>
                            <div className="text-sm text-gray-600">{sdk.language}</div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          sdk.status === 'Stable' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {sdk.status}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Version:</span>
                          <span className="font-medium text-gray-900">{sdk.version}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Downloads:</span>
                          <span className="font-medium text-gray-900">{sdk.downloads}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Update:</span>
                          <span className="font-medium text-gray-900">{sdk.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                          Download
                        </button>
                        <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                          Docs
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'guides' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Integration Guides</h3>
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                      <option>All Categories</option>
                      <option>Authentication</option>
                      <option>Real-time</option>
                      <option>Performance</option>
                      <option>Webhooks</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrationGuides.map((guide, index) => (
                    <motion.div
                      key={guide.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{guide.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{guide.description}</p>
                        </div>
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                          {guide.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{guide.time}</span>
                          </div>
                          <div className={`px-2 py-1 rounded text-xs font-medium ${
                            guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {guide.difficulty}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                          Read Guide
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          <Play className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sandbox' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Sandbox Environment</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    New Project
                  </button>
                </div>
                <div className="space-y-4">
                  {sandboxProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <Terminal className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{project.name}</div>
                            <div className="text-sm text-gray-600">{project.description}</div>
                            <div className="text-xs text-gray-500">Last modified: {project.lastModified}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{project.language}</div>
                            <div className={`text-xs font-medium ${
                              project.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {project.status}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">
                              Open
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              <Copy className="w-4 h-4" />
                            </button>
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

export default DeveloperPortal