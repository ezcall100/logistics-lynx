import React, { useState } from 'react'
import { Copy, Check, Key, Database, Zap } from 'lucide-react'

const APIDocumentationPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/v1/routes/optimize',
      description: 'Optimize delivery routes',
      parameters: [
        { name: 'origin', type: 'string', required: true, description: 'Starting location' },
        { name: 'destinations', type: 'array', required: true, description: 'List of delivery destinations' },
        { name: 'vehicle_type', type: 'string', required: false, description: 'Type of vehicle' }
      ],
      example: `curl -X GET "https://api.transbot.ai/v1/routes/optimize" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "origin": "New York, NY",
    "destinations": ["Boston, MA", "Philadelphia, PA"],
    "vehicle_type": "truck"
  }'`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/loads/match',
      description: 'Match loads with carriers',
      parameters: [
        { name: 'load_details', type: 'object', required: true, description: 'Load information' },
        { name: 'preferences', type: 'object', required: false, description: 'Matching preferences' }
      ],
      example: `curl -X POST "https://api.transbot.ai/v1/loads/match" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "load_details": {
      "origin": "Los Angeles, CA",
      "destination": "Chicago, IL",
      "weight": 25000,
      "pickup_date": "2024-01-20"
    }
  }'`
    },
    {
      method: 'GET',
      endpoint: '/api/v1/analytics/predictions',
      description: 'Get predictive analytics',
      parameters: [
        { name: 'metric', type: 'string', required: true, description: 'Analytics metric' },
        { name: 'timeframe', type: 'string', required: false, description: 'Time period' }
      ],
      example: `curl -X GET "https://api.transbot.ai/v1/analytics/predictions?metric=fuel_consumption&timeframe=30d" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              API Documentation
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Integrate Trans Bot AI into your applications with our powerful API
            </p>
          </div>
        </div>
      </div>

      {/* API Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Key className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Authentication</h3>
            <p className="text-blue-200">Secure API access with JWT tokens and rate limiting</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Real-time Data</h3>
            <p className="text-blue-200">Access live data and real-time updates</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">High Performance</h3>
            <p className="text-blue-200">Sub-second response times with 99.9% uptime</p>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-8">API Endpoints</h2>
          
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    endpoint.method === 'GET' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-white font-mono text-lg">{endpoint.endpoint}</code>
                </div>
                <p className="text-blue-200 text-lg">{endpoint.description}</p>
              </div>
              
              <div className="p-6">
                <h4 className="text-white font-semibold mb-4">Parameters</h4>
                <div className="space-y-3 mb-6">
                  {endpoint.parameters.map((param, paramIndex) => (
                    <div key={paramIndex} className="flex items-start space-x-4">
                      <code className="text-blue-400 font-mono text-sm min-w-[100px]">{param.name}</code>
                      <span className="text-gray-300 text-sm min-w-[80px]">{param.type}</span>
                      <span className={`text-sm ${param.required ? 'text-red-400' : 'text-gray-400'}`}>
                        {param.required ? 'Required' : 'Optional'}
                      </span>
                      <span className="text-blue-200 text-sm">{param.description}</span>
                    </div>
                  ))}
                </div>
                
                <h4 className="text-white font-semibold mb-4">Example</h4>
                <div className="relative">
                  <pre className="bg-slate-800 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                    <code>{endpoint.example}</code>
                  </pre>
                  <button
                    onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                    className="absolute top-2 right-2 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    {copiedCode === `example-${index}` ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default APIDocumentationPage
