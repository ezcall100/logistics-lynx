import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Fuel, 
  TrendingDown, 
  Zap, 
  Play,
  RotateCcw,
  Target,
  BarChart3,
  DollarSign
} from 'lucide-react'
import { trackUserInteraction } from '../../../services/webhookService'

export default function FuelOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Monitoring')
  const [efficiency, setEfficiency] = useState(94)

  const startOptimization = async () => {
    setIsOptimizing(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('fuel_optimization_started', {
      agent: 'FuelOptimizer',
      timestamp: new Date().toISOString()
    })

    // Simulate optimization process
    setTimeout(() => {
      setOptimizationResults({
        fuelSavings: 23.5,
        routeOptimization: 18.2,
        drivingEfficiency: 15.8,
        maintenanceAlerts: 3,
        totalSavings: 2847.50
      })
      setIsOptimizing(false)
      setAgentStatus('Optimized')
      setEfficiency(96)
    }, 3000)
  }

  const resetOptimization = () => {
    setOptimizationResults(null)
    setAgentStatus('Monitoring')
    setEfficiency(94)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-8"
            >
              <Fuel className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Fuel Optimizer AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xl text-green-200 mb-8 max-w-3xl mx-auto"
            >
              Minimize fuel consumption with AI-powered optimization algorithms
            </motion.p>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${agentStatus === 'Optimized' ? 'bg-green-400' : agentStatus === 'Processing' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
              <span className="text-white font-semibold">Status: {agentStatus}</span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">{efficiency}%</div>
              <div className="text-sm text-green-200">Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Fuel Optimization</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-green-200">Route Efficiency</span>
                <span className="text-white font-semibold">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-200">Driving Behavior</span>
                <span className="text-white font-semibold">91%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-green-200">Vehicle Maintenance</span>
                <span className="text-white font-semibold">96%</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={startOptimization}
                disabled={isOptimizing}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOptimizing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Optimizing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2" />
                    Start Optimization
                  </div>
                )}
              </button>
              
              <button
                onClick={resetOptimization}
                className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Real-time Metrics</h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Fuel Consumption</div>
                  <div className="text-green-200">23.5% reduction</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Route Optimization</div>
                  <div className="text-green-200">18.2% improvement</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Cost Savings</div>
                  <div className="text-green-200">$2,847.50 this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {optimizationResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Optimization Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{optimizationResults.fuelSavings}%</div>
                <div className="text-green-200">Fuel Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{optimizationResults.routeOptimization}%</div>
                <div className="text-green-200">Route Optimization</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{optimizationResults.drivingEfficiency}%</div>
                <div className="text-green-200">Driving Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">${optimizationResults.totalSavings}</div>
                <div className="text-green-200">Total Savings</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Fuel Optimization Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Route Planning</h3>
            <p className="text-green-200">AI-powered route optimization to minimize fuel consumption and reduce travel time.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time Monitoring</h3>
            <p className="text-green-200">Continuous monitoring of fuel consumption patterns and driving behavior optimization.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Analytics Dashboard</h3>
            <p className="text-green-200">Comprehensive analytics and reporting on fuel efficiency and cost savings.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
