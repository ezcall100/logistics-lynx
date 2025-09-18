import React from 'react';
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

const FuelOptimizer = React.memo(function FuelOptimizer() {
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
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 responsive-container">
      {/* Header */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
          <div className="text-center responsive-container">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-8 responsive-container"
            >
              <Fuel className="w-10 h-10 text-white responsive-container" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 responsive-container"
            >
              Fuel Optimizer AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-xl text-green-200 mb-8 max-w-3xl mx-auto responsive-container"
            >
              Minimize fuel consumption with AI-powered optimization algorithms
            </motion.p>
          </div>
        </div>
      </div>

      {/* Agent Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center space-x-4 responsive-container">
              <div className={`w-3 h-3 rounded-full ${agentStatus === 'Optimized' ? 'bg-green-400' : agentStatus === 'Processing' ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
              <span className="text-white font-semibold responsive-container">Status: {agentStatus}</span>
            </div>
            <div className="text-right responsive-container">
              <div className="text-2xl font-bold text-green-400 responsive-container">{efficiency}%</div>
              <div className="text-sm text-green-200 responsive-container">Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container">Fuel Optimization</h3>
            
            <div className="space-y-4 mb-8 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <span className="text-green-200 responsive-container">Route Efficiency</span>
                <span className="text-white font-semibold responsive-container">94%</span>
              </div>
              <div className="flex items-center justify-between responsive-container">
                <span className="text-green-200 responsive-container">Driving Behavior</span>
                <span className="text-white font-semibold responsive-container">91%</span>
              </div>
              <div className="flex items-center justify-between responsive-container">
                <span className="text-green-200 responsive-container">Vehicle Maintenance</span>
                <span className="text-white font-semibold responsive-container">96%</span>
              </div>
            </div>

            <div className="flex space-x-4 responsive-container">
              <button
                onClick={startOptimization}
                disabled={isOptimizing}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
               aria-label="Button">
                {isOptimizing ? (
                  <div className="flex items-center justify-center responsive-container">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 responsive-container"></div>
                    Optimizing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center responsive-container">
                    <Play className="w-5 h-5 mr-2 responsive-container" />
                    Start Optimization
                  </div>
                )}
              </button>
              
              <button
                onClick={resetOptimization}
                className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 responsive-container"
               aria-label="Button">
                <RotateCcw className="w-5 h-5 responsive-container" />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container">Real-time Metrics</h3>
            
            <div className="space-y-6 responsive-container">
              <div className="flex items-center space-x-4 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center responsive-container">
                  <TrendingDown className="w-6 h-6 text-white responsive-container" />
                </div>
                <div>
                  <div className="text-white font-semibold responsive-container">Fuel Consumption</div>
                  <div className="text-green-200 responsive-container">23.5% reduction</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center responsive-container">
                  <Target className="w-6 h-6 text-white responsive-container" />
                </div>
                <div>
                  <div className="text-white font-semibold responsive-container">Route Optimization</div>
                  <div className="text-green-200 responsive-container">18.2% improvement</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center responsive-container">
                  <DollarSign className="w-6 h-6 text-white responsive-container" />
                </div>
                <div>
                  <div className="text-white font-semibold responsive-container">Cost Savings</div>
                  <div className="text-green-200 responsive-container">$2,847.50 this month</div>
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container">Optimization Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container">
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-green-400 mb-2 responsive-container">{optimizationResults.fuelSavings}%</div>
                <div className="text-green-200 responsive-container">Fuel Savings</div>
              </div>
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-blue-400 mb-2 responsive-container">{optimizationResults.routeOptimization}%</div>
                <div className="text-green-200 responsive-container">Route Optimization</div>
              </div>
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-purple-400 mb-2 responsive-container">{optimizationResults.drivingEfficiency}%</div>
                <div className="text-green-200 responsive-container">Driving Efficiency</div>
              </div>
              <div className="text-center responsive-container">
                <div className="text-3xl font-bold text-yellow-400 mb-2 responsive-container">${optimizationResults.totalSavings}</div>
                <div className="text-green-200 responsive-container">Total Savings</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
        <h2 className="text-3xl font-bold text-white text-center mb-12 responsive-container">Fuel Optimization Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
              <TrendingDown className="w-6 h-6 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 responsive-container">Smart Route Planning</h3>
            <p className="text-green-200 responsive-container">AI-powered route optimization to minimize fuel consumption and reduce travel time.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
              <Zap className="w-6 h-6 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 responsive-container">Real-time Monitoring</h3>
            <p className="text-green-200 responsive-container">Continuous monitoring of fuel consumption patterns and driving behavior optimization.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 responsive-container">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
              <BarChart3 className="w-6 h-6 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 responsive-container">Analytics Dashboard</h3>
            <p className="text-green-200 responsive-container">Comprehensive analytics and reporting on fuel efficiency and cost savings.</p>
          </div>
        </div>
      </div>
    </div>
  )
}