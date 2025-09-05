import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Code, 
  Github, 
  Terminal, 
  BookOpen, 
  Settings, 
  Search,
  Eye,
  CheckCircle,
  Network,
  Zap,
  Key,
  Webhook,
  BarChart3
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function DeveloperPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [apiKey, setApiKey] = useState('tb_live_sk_1234567890abcdef')
  const [webhookUrl, setWebhookUrl] = useState('https://your-app.com/webhook')

  const handleTabChange = async (tab: string) => {
    setActiveTab(tab)
    await trackUserInteraction('developer_portal_tab_changed', { tab })
    
    // Send to N8N for developer analytics
    await trackAIAgentActivity('DeveloperAnalytics', 'tab_analytics', {
      developerId: 'DEV_001',
      tab: tab,
      timestamp: new Date().toISOString()
    })
  }

  const handleApiKeyGeneration = async () => {
    const newApiKey = `tb_live_sk_${Math.random().toString(36).substr(2, 32)}`
    setApiKey(newApiKey)
    
    await trackUserInteraction('api_key_generated', { keyType: 'live' })
    
    // Send to N8N for API key management
    await trackAIAgentActivity('APIManagement', 'key_generated', {
      keyType: 'live',
      timestamp: new Date().toISOString()
    })
  }

  const handleWebhookTest = async () => {
    await trackUserInteraction('webhook_test_triggered', { url: webhookUrl })
    
    // Test webhook via N8N
    await trackAIAgentActivity('WebhookTesting', 'test_triggered', {
      webhookUrl,
      timestamp: new Date().toISOString()
    })
  }

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/shipments',
      description: 'Create a new shipment',
      parameters: ['origin', 'destination', 'weight', 'equipment_type']
    },
    {
      method: 'GET',
      endpoint: '/api/v1/shipments/{id}',
      description: 'Get shipment details',
      parameters: ['shipment_id']
    },
    {
      method: 'POST',
      endpoint: '/api/v1/quotes',
      description: 'Get instant quote',
      parameters: ['origin', 'destination', 'weight', 'equipment_type']
    },
    {
      method: 'GET',
      endpoint: '/api/v1/tracking/{id}',
      description: 'Track shipment',
      parameters: ['tracking_id']
    }
  ]

  const stats = [
    { label: 'API Calls Today', value: '1,247', icon: Network, color: 'text-transbot-sky' },
    { label: 'Active Integrations', value: '8', icon: Zap, color: 'text-transbot-teal' },
    { label: 'Webhook Events', value: '342', icon: Webhook, color: 'text-transbot-purple' },
    { label: 'Success Rate', value: '99.2%', icon: CheckCircle, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-sky/5 via-white to-transbot-purple/5">
      {/* Header */}
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Developer Portal</h1>
              <p className="text-transbot-text-secondary">Build powerful logistics applications with our comprehensive API</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
                <input
                  type="text"
                  placeholder="Search API docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackUserInteraction('github_integration_requested', { source: 'header' })}
                className="bg-gradient-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub Integration
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
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

      {/* Navigation Tabs */}
      <section className="px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex space-x-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-transbot-border/20 shadow-transbot mb-8"
          >
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'api-docs', label: 'API Docs', icon: BookOpen },
              { id: 'webhooks', label: 'Webhooks', icon: Webhook },
              { id: 'sdk', label: 'SDK & Libraries', icon: Code },
              { id: 'testing', label: 'Testing', icon: Terminal },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-primary text-white shadow-transbot'
                    : 'text-transbot-text-secondary hover:text-transbot-sky hover:bg-transbot-sky/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content Area */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* API Key Management */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transbot-text-primary">API Key Management</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApiKeyGeneration}
                    className="bg-transbot-sky text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    Generate New Key
                  </motion.button>
                </div>
                <div className="bg-transbot-neutral-light rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-4 h-4 text-transbot-sky" />
                    <span className="text-sm font-medium text-transbot-text-primary">Live API Key</span>
                  </div>
                  <div className="font-mono text-sm bg-white rounded p-2 border">
                    {apiKey}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('api-docs')}
                >
                  <BookOpen className="w-8 h-8 text-transbot-sky mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">API Documentation</h3>
                  <p className="text-transbot-text-secondary text-sm">Complete API reference and examples</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('webhooks')}
                >
                  <Webhook className="w-8 h-8 text-transbot-teal mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Webhook Setup</h3>
                  <p className="text-transbot-text-secondary text-sm">Configure real-time event notifications</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-transbot-border/20 shadow-transbot cursor-pointer"
                  onClick={() => handleTabChange('testing')}
                >
                  <Terminal className="w-8 h-8 text-transbot-purple mb-4" />
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">API Testing</h3>
                  <p className="text-transbot-text-secondary text-sm">Test your API integrations</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'api-docs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot">
                <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">API Endpoints</h2>
                
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-transbot-neutral-light rounded-lg border border-transbot-border/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`px-3 py-1 rounded text-xs font-medium ${
                            endpoint.method === 'GET' ? 'bg-transbot-sky/10 text-transbot-sky' :
                            endpoint.method === 'POST' ? 'bg-transbot-teal/10 text-transbot-teal' :
                            'bg-transbot-purple/10 text-transbot-purple'
                          }`}>
                            {endpoint.method}
                          </div>
                          <code className="font-mono text-transbot-text-primary">{endpoint.endpoint}</code>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => trackUserInteraction('api_endpoint_viewed', { endpoint: endpoint.endpoint })}
                          className="p-2 hover:bg-transbot-sky/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-transbot-text-secondary" />
                        </motion.button>
                      </div>
                      <p className="text-transbot-text-secondary mb-3">{endpoint.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <span key={paramIndex} className="px-2 py-1 bg-transbot-sky/10 text-transbot-sky text-xs rounded">
                            {param}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'webhooks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Webhook Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-transbot-text-primary mb-2">
                    Webhook URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="flex-1 px-4 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                      placeholder="https://your-app.com/webhook"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleWebhookTest}
                      className="bg-transbot-teal text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Test
                    </motion.button>
                  </div>
                </div>

                <div className="bg-transbot-neutral-light rounded-lg p-4">
                  <h3 className="font-semibold text-transbot-text-primary mb-2">Webhook Events</h3>
                  <div className="space-y-2">
                    {['shipment.created', 'shipment.updated', 'shipment.delivered', 'quote.generated'].map((event) => (
                      <div key={event} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-transbot-teal" />
                        <code className="text-sm font-mono text-transbot-text-primary">{event}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sdk' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">SDK & Libraries</h2>
              <div className="text-center py-12">
                <Code className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Development Tools</h3>
                <p className="text-transbot-text-secondary">SDKs and libraries for popular programming languages</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'testing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">API Testing</h2>
              <div className="text-center py-12">
                <Terminal className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Interactive Testing</h3>
                <p className="text-transbot-text-secondary">Test API endpoints with our interactive console</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
            >
              <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Developer Settings</h2>
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">Account Settings</h3>
                <p className="text-transbot-text-secondary">Manage your developer account and API preferences</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
