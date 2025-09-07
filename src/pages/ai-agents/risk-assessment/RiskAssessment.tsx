import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Play,
  RotateCcw,
  Target,
  Brain,
  Eye
} from 'lucide-react'
import { trackUserInteraction } from '../../../services/webhookService'

export default function RiskAssessment() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Monitoring')
  const [accuracy, setAccuracy] = useState(97)

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('risk_assessment_started', {
      agent: 'RiskAssessment',
      timestamp: new Date().toISOString()
    })

    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        riskScore: 12.3,
        threatsDetected: 3,
        vulnerabilities: 7,
        mitigationActions: 15,
        totalRiskReduction: 78.5
      })
      setIsAnalyzing(false)
      setAgentStatus('Analyzed')
      setAccuracy(97)
    }, 3000)
  }

  const resetAnalysis = () => {
    setAnalysisResults(null)
    setAgentStatus('Monitoring')
    setAccuracy(97)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-slate-500 to-gray-600 rounded-2xl mb-8"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Risk Assessment AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xl text-slate-200 mb-8 max-w-3xl mx-auto"
            >
              Proactive risk identification and mitigation with AI-powered threat analysis
            </motion.p>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${agentStatus === 'Analyzed' ? 'bg-green-400' : agentStatus === 'Processing' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
              <span className="text-white font-semibold">Status: {agentStatus}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-400">{accuracy}%</div>
              <div className="text-sm text-slate-200">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Risk Assessment</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-slate-200">Threat Detection</span>
                <span className="text-white font-semibold">97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-200">Vulnerability Scan</span>
                <span className="text-white font-semibold">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-200">Mitigation Planning</span>
                <span className="text-white font-semibold">93%</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-slate-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-slate-600 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Start Assessment
                  </div>
                )}
              </button>
              
              <button
                onClick={resetAnalysis}
                className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Risk Metrics</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Risk Score</div>
                  <div className="text-slate-200">12.3 (Low Risk)</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Threats Detected</div>
                  <div className="text-slate-200">3 active threats</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Mitigation Actions</div>
                  <div className="text-slate-200">15 recommendations</div>
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Assessment Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-400 mb-2">{analysisResults.riskScore}</div>
                <div className="text-slate-200">Risk Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">{analysisResults.threatsDetected}</div>
                <div className="text-slate-200">Threats Detected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{analysisResults.vulnerabilities}</div>
                <div className="text-slate-200">Vulnerabilities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{analysisResults.totalRiskReduction}%</div>
                <div className="text-slate-200">Risk Reduction</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Risk Assessment Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-gray-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Threat Intelligence</h3>
            <p className="text-slate-200">AI-powered threat detection and analysis with real-time risk monitoring.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Vulnerability Assessment</h3>
            <p className="text-slate-200">Comprehensive vulnerability scanning and security gap analysis.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Mitigation Planning</h3>
            <p className="text-slate-200">Automated risk mitigation strategies and action plan recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
