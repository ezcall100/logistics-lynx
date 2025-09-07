import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Play,
  RotateCcw,
  Target,
  Brain
} from 'lucide-react'
import { trackUserInteraction } from '../../../services/webhookService'

export default function DemandForecaster() {
  const [isForecasting, setIsForecasting] = useState(false)
  const [forecastResults, setForecastResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Analyzing')
  const [accuracy, setAccuracy] = useState(97)

  const startForecasting = async () => {
    setIsForecasting(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('demand_forecasting_started', {
      agent: 'DemandForecaster',
      timestamp: new Date().toISOString()
    })

    // Simulate forecasting process
    setTimeout(() => {
      setForecastResults({
        nextWeekDemand: 1247,
        nextMonthDemand: 5234,
        peakDays: ['Monday', 'Wednesday', 'Friday'],
        seasonalTrend: '+15.3%',
        accuracy: 97.2
      })
      setIsForecasting(false)
      setAgentStatus('Forecasted')
      setAccuracy(97)
    }, 3000)
  }

  const resetForecasting = () => {
    setForecastResults(null)
    setAgentStatus('Analyzing')
    setAccuracy(97)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-8"
            >
              <TrendingUp className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Demand Forecaster AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto"
            >
              Predict shipping demand with AI-powered forecasting algorithms
            </motion.p>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${agentStatus === 'Forecasted' ? 'bg-green-400' : agentStatus === 'Processing' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
              <span className="text-white font-semibold">Status: {agentStatus}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">{accuracy}%</div>
              <div className="text-sm text-purple-200">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecasting Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Demand Forecasting</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Historical Analysis</span>
                <span className="text-white font-semibold">97%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Market Trends</span>
                <span className="text-white font-semibold">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Seasonal Patterns</span>
                <span className="text-white font-semibold">96%</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={startForecasting}
                disabled={isForecasting}
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isForecasting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Forecasting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Start Forecasting
                  </div>
                )}
              </button>
              
              <button
                onClick={resetForecasting}
                className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Forecast Metrics</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Next Week Demand</div>
                  <div className="text-purple-200">1,247 shipments</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Monthly Trend</div>
                  <div className="text-purple-200">+15.3% increase</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Peak Days</div>
                  <div className="text-purple-200">Mon, Wed, Fri</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {forecastResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Forecast Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{forecastResults.nextWeekDemand}</div>
                <div className="text-purple-200">Next Week Demand</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{forecastResults.nextMonthDemand}</div>
                <div className="text-purple-200">Next Month Demand</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{forecastResults.seasonalTrend}</div>
                <div className="text-purple-200">Seasonal Trend</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{forecastResults.accuracy}%</div>
                <div className="text-purple-200">Forecast Accuracy</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Demand Forecasting Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI-Powered Analysis</h3>
            <p className="text-purple-200">Advanced machine learning algorithms analyze historical data and market trends.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Trend Prediction</h3>
            <p className="text-purple-200">Predict future demand patterns with high accuracy using time series analysis.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time Insights</h3>
            <p className="text-purple-200">Get instant insights and recommendations for capacity planning and resource allocation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
