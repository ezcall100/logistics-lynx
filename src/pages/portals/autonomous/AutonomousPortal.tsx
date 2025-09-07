import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, Brain, Cpu, 
  Activity, TrendingUp, Target,
  Play, Pause, Settings,
  Eye, BarChart3
} from 'lucide-react'

const AutonomousPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAutonomousMode, setIsAutonomousMode] = useState(true)

  const aiStats = [
    { label: 'AI Models Active', value: '24', change: '+3', icon: Brain, color: 'text-purple-500' },
    { label: 'Autonomous Decisions', value: '15,847', change: '+1,234', icon: Bot, color: 'text-blue-500' },
    { label: 'Efficiency Gain', value: '34%', change: '+5%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Cost Savings', value: '$2.1M', change: '+18%', icon: Target, color: 'text-emerald-500' }
  ]

  const autonomousSystems = [
    { 
      id: 1, 
      name: 'Route Optimization AI', 
      status: 'Active', 
      efficiency: 94, 
      decisions: 1247, 
      lastUpdate: '2 min ago',
      description: 'Automatically optimizes delivery routes based on traffic, weather, and demand'
    },
    { 
      id: 2, 
      name: 'Demand Forecasting', 
      status: 'Active', 
      efficiency: 89, 
      decisions: 892, 
      lastUpdate: '5 min ago',
      description: 'Predicts shipping demand using machine learning and historical data'
    },
    { 
      id: 3, 
      name: 'Fleet Management AI', 
      status: 'Active', 
      efficiency: 91, 
      decisions: 1563, 
      lastUpdate: '1 min ago',
      description: 'Manages fleet operations, maintenance schedules, and resource allocation'
    },
    { 
      id: 4, 
      name: 'Customer Service Bot', 
      status: 'Active', 
      efficiency: 87, 
      decisions: 2341, 
      lastUpdate: '30 sec ago',
      description: 'Handles customer inquiries and provides automated support'
    },
    { 
      id: 5, 
      name: 'Risk Assessment AI', 
      status: 'Learning', 
      efficiency: 76, 
      decisions: 456, 
      lastUpdate: '10 min ago',
      description: 'Evaluates and mitigates operational risks in real-time'
    }
  ]

  const recentDecisions = [
    { id: 1, system: 'Route Optimization', decision: 'Rerouted 15 trucks to avoid traffic congestion', impact: 'Saved 2.3 hours', time: '2 min ago', confidence: 94 },
    { id: 2, system: 'Demand Forecasting', decision: 'Increased capacity for electronics shipping', impact: '+$45K revenue', time: '5 min ago', confidence: 89 },
    { id: 3, system: 'Fleet Management', decision: 'Scheduled maintenance for 3 vehicles', impact: 'Prevented breakdowns', time: '8 min ago', confidence: 91 },
    { id: 4, system: 'Customer Service', decision: 'Resolved 23 customer inquiries automatically', impact: '95% satisfaction', time: '12 min ago', confidence: 87 },
    { id: 5, system: 'Risk Assessment', decision: 'Flagged potential weather delay', impact: 'Proactive planning', time: '15 min ago', confidence: 76 }
  ]

  const performanceMetrics = [
    { label: 'Decision Accuracy', value: '94.2%', change: '+2.1%', color: 'text-green-500' },
    { label: 'Response Time', value: '0.3s', change: '-0.1s', color: 'text-blue-500' },
    { label: 'Cost Reduction', value: '34%', change: '+5%', color: 'text-emerald-500' },
    { label: 'Uptime', value: '99.8%', change: '+0.2%', color: 'text-purple-500' }
  ]


  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Autonomous Portal</h1>
                <p className="text-gray-600">AI-Powered Operations & Decision Making</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isAutonomousMode ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {isAutonomousMode ? 'Autonomous Mode ON' : 'Autonomous Mode OFF'}
                </span>
              </div>
              <button 
                onClick={() => setIsAutonomousMode(!isAutonomousMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isAutonomousMode 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isAutonomousMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutonomousMode ? 'Disable' : 'Enable'} AI
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4" />
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiStats.map((stat, index) => (
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
                { id: 'dashboard', label: 'Dashboard', icon: Activity },
                { id: 'systems', label: 'AI Systems', icon: Bot },
                { id: 'decisions', label: 'Decisions', icon: Brain },
                { id: 'performance', label: 'Performance', icon: BarChart3 },
                { id: 'learning', label: 'Learning', icon: Cpu },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
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
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {performanceMetrics.map((metric, index) => (
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

                {/* Recent Decisions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent AI Decisions</h3>
                  <div className="space-y-3">
                    {recentDecisions.map((decision) => (
                      <motion.div
                        key={decision.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{decision.decision}</p>
                            <p className="text-sm text-gray-600">{decision.system}</p>
                            <p className="text-sm text-green-600">Impact: {decision.impact}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getConfidenceColor(decision.confidence)}`}>
                            {decision.confidence}% confidence
                          </div>
                          <div className="text-sm text-gray-500">{decision.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'systems' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">AI Systems</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Bot className="w-4 h-4" />
                    Deploy New System
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {autonomousSystems.map((system) => (
                    <motion.div
                      key={system.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{system.name}</h4>
                            <p className="text-sm text-gray-600">{system.description}</p>
                          </div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          system.status === 'Active' ? 'bg-green-100 text-green-800' :
                          system.status === 'Learning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {system.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{system.efficiency}%</div>
                          <div className="text-xs text-gray-600">Efficiency</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{system.decisions}</div>
                          <div className="text-xs text-gray-600">Decisions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{system.lastUpdate}</div>
                          <div className="text-xs text-gray-600">Last Update</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                          <Settings className="w-4 h-4" />
                          Configure
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'decisions' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Decision History</h3>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">System</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentDecisions.map((decision) => (
                        <tr key={decision.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 text-indigo-500" />
                              <span className="text-sm font-medium text-gray-900">{decision.system}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{decision.decision}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-green-600">{decision.impact}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm font-medium ${getConfidenceColor(decision.confidence)}`}>
                              {decision.confidence}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {decision.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Decision Accuracy Over Time</h4>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Accuracy chart placeholder</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">System Efficiency</h4>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Efficiency chart placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">AI Learning & Training</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Cpu className="w-6 h-6 text-blue-500" />
                      <h4 className="font-medium text-gray-900">Model Training</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Training Progress</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-purple-500" />
                      <h4 className="font-medium text-gray-900">Data Processing</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processed Today</span>
                        <span>2.4M records</span>
                      </div>
                      <div className="text-sm text-green-600">+12% from yesterday</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-green-500" />
                      <h4 className="font-medium text-gray-900">Learning Rate</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Improvement</span>
                        <span>+5.2%</span>
                      </div>
                      <div className="text-sm text-green-600">This week</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">AI Configuration</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">Autonomous Mode Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Decision Threshold</p>
                          <p className="text-sm text-gray-600">Minimum confidence level for autonomous decisions</p>
                        </div>
                        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                          <option>85%</option>
                          <option>90%</option>
                          <option>95%</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Learning Mode</p>
                          <p className="text-sm text-gray-600">Enable continuous learning from decisions</p>
                        </div>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Enabled
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

export default AutonomousPortal