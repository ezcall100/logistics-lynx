import React from 'react';
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Wrench, 
  AlertTriangle, 
  CheckCircle, 
  Play,
  RotateCcw,
  BarChart3,
  Brain,
  Clock
} from 'lucide-react'
import { trackUserInteraction } from '../../../services/webhookService'

const MaintenancePredictor = React.memo(function MaintenancePredictor() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Monitoring')
  const [accuracy, setAccuracy] = useState(96)

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('maintenance_prediction_started', {
      agent: 'MaintenancePredictor',
      timestamp: new Date().toISOString()
    })

    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        criticalAlerts: 2,
        warningAlerts: 5,
        preventiveActions: 8,
        costSavings: 12500,
        uptimeImprovement: 15.7
      })
      setIsAnalyzing(false)
      setAgentStatus('Analyzed')
      setAccuracy(96)
    }, 3000)
  }

  const resetAnalysis = () => {
    setAnalysisResults(null)
    setAgentStatus('Monitoring')
    setAccuracy(96)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 responsive-container">
      {/* Header */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
          <div className="text-center responsive-container">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl mb-8 responsive-container"
            >
              <Wrench className="w-10 h-10 text-white responsive-container" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 responsive-container"
            >
              Maintenance Predictor AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xl text-red-200 mb-8 max-w-3xl mx-auto responsive-container"
            >
              Predictive maintenance alerts with AI-powered failure prediction
            </motion.p>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center space-x-4 responsive-container">
              <div className={`w-3 h-3 rounded-full ${agentStatus === 'Analyzed' ? 'bg-green-400' : agentStatus === 'Processing' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
              <span className="text-white font-semibold responsive-container">Status: {agentStatus}</span>
            </div>
            <div className="text-right responsive-container">
              <div className="text-2xl font-bold text-red-400 responsive-container">{accuracy}%</div>
              <div className="text-sm text-red-200 responsive-container">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container">Maintenance Prediction</h3>
            
            <div className="space-y-4 mb-8 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <span className="text-red-200 responsive-container">Sensor Analysis</span>
                <span className="text-white font-semibold responsive-container">96%</span>
              </div>
              <div className="flex items-center justify-between responsive-container">
                <span className="text-red-200 responsive-container">Failure Prediction</span>
                <span className="text-white font-semibold responsive-container">94%</span>
              </div>
              <div className="flex items-center justify-between responsive-container">
                <span className="text-red-200 responsive-container">Preventive Actions</span>
                <span className="text-white font-semibold responsive-container">98%</span>
              </div>
            </div>

            <div className="flex space-x-4 responsive-container">
              <button
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
               aria-label="Button">
                {isAnalyzing ? (
                  <div className="flex items-center justify-center responsive-container">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 responsive-container"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center responsive-container">
                    <Play className="w-5 h-5 mr-2 responsive-container" />
                    Start Analysis
                  </div>
                )}
              </button>
              
              <button
                onClick={resetAnalysis}
                className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 responsive-container"
               aria-label="Button">
                <RotateCcw className="w-5 h-5 responsive-container" />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container">Maintenance Alerts</h3>
            
            <div className="space-y-6 responsive-container">
              <div className="flex items-center space-x-4 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center responsive-container">
                  <AlertTriangle className="w-6 h-6 text-white responsive-container" />
                </div>
                <div>
                  <div className="text-white font-semibold responsive-container">Critical Alerts</div>
                  <div className="text-red-200 responsive-container">2 immediate actions needed</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center responsive-container">
                  <Clock className="w-6 h-6 text-white responsive-container" />
                </div>
                <div>
                  <div className="text-white font-semibold responsive-container">Warning Alerts</div>
                  <div className="text-red-200 responsive-container">5 scheduled maintenance</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center responsive-container">
                  <CheckCircle className="w-6 h-6 text-white responsive-container" />
                </div>
                <div>
                  <div className="text-white font-semibold responsive-container">Preventive Actions</div>
                  <div className="text-red-200 responsive-container">8 recommendations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {analysisResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container">Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container">
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-red-400 mb-2 responsive-container">{analysisResults.criticalAlerts}</div>
                <div className="text-red-200 responsive-container">Critical Alerts</div>
              </div>
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-yellow-400 mb-2 responsive-container">{analysisResults.warningAlerts}</div>
                <div className="text-red-200 responsive-container">Warning Alerts</div>
              </div>
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-green-400 mb-2 responsive-container">{analysisResults.uptimeImprovement}%</div>
                <div className="text-red-200 responsive-container">Uptime Improvement</div>
              </div>
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-blue-400 mb-2 responsive-container">${analysisResults.costSavings}</div>
                <div className="text-red-200 responsive-container">Cost Savings</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
        <h2 className="text-3xl font-bold text-white text-center mb-12 responsive-container">Maintenance Prediction Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
              <Brain className="w-6 h-6 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 responsive-container">Predictive Analytics</h3>
            <p className="text-red-200 responsive-container">AI-powered failure prediction using sensor data and historical patterns.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
              <AlertTriangle className="w-6 h-6 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 responsive-container">Real-time Alerts</h3>
            <p className="text-red-200 responsive-container">Instant notifications for critical maintenance needs and preventive actions.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
              <BarChart3 className="w-6 h-6 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 responsive-container">Cost Optimization</h3>
            <p className="text-red-200 responsive-container">Reduce maintenance costs and improve equipment uptime with predictive insights.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
