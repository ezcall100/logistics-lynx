import React from 'react';
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  BarChart3, 
  Zap, 
  Play,
  RotateCcw,
  Download,
  CheckCircle,
  Target,
  Wrench,
  Fuel,
  Users
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

const FleetManager = React.memo(function FleetManager() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Monitoring')
  const [efficiency, setEfficiency] = useState(92)

  const startOptimization = async () => {
    setIsOptimizing(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('fleet_optimization_started', {
      agent: 'FleetManager',
      timestamp: new Date().toISOString()
    })

    // Track AI agent activity
    await trackAIAgentActivity('FleetManager', 'optimization_started', {
      fleetSize: 45,
      vehicles: ['trucks', 'vans', 'trailers'],
      metrics: ['fuel_efficiency', 'maintenance', 'driver_performance']
    })

    // Simulate optimization process
    setTimeout(() => {
      setOptimizationResults({
        fuelEfficiency: {
          improvement: '+18%',
          savings: '$12,500/month',
          confidence: 95
        },
        maintenance: {
          costReduction: '-25%',
          uptime: '98.5%',
          confidence: 93
        },
        driverPerformance: {
          safetyScore: '96%',
          efficiency: '+22%',
          confidence: 91
        },
        recommendations: [
          'Implement predictive maintenance on 12 vehicles',
          'Optimize routes for 8 high-mileage trucks',
          'Schedule driver training for 5 team members',
          'Replace 3 aging vehicles in Q2 2024'
        ]
      })
      setIsOptimizing(false)
      setAgentStatus('Optimized')
      setEfficiency(95)
    }, 3500)
  }

  const resetOptimization = () => {
    setOptimizationResults(null)
    setAgentStatus('Monitoring')
    setEfficiency(92)
  }

  const features = [
    {
      icon: Truck,
      title: 'Fleet Monitoring',
      description: 'Real-time monitoring of vehicle location, performance, fuel consumption, and driver behavior across your entire fleet.',
      benefits: ['GPS Tracking', 'Performance Metrics', 'Driver Analytics']
    },
    {
      icon: Wrench,
      title: 'Predictive Maintenance',
      description: 'AI-powered maintenance scheduling that predicts vehicle issues before they occur, reducing downtime and costs.',
      benefits: ['Predictive Alerts', 'Maintenance Scheduling', 'Cost Optimization']
    },
    {
      icon: Fuel,
      title: 'Fuel Optimization',
      description: 'Advanced fuel management system that optimizes consumption, tracks efficiency, and identifies cost-saving opportunities.',
      benefits: ['Fuel Tracking', 'Efficiency Analysis', 'Cost Reduction']
    },
    {
      icon: Users,
      title: 'Driver Management',
      description: 'Comprehensive driver performance tracking, safety monitoring, and training recommendations for optimal fleet operations.',
      benefits: ['Performance Tracking', 'Safety Monitoring', 'Training Programs']
    }
  ]

  const stats = [
    { label: 'Fleet Efficiency', value: '92%', icon: Target, color: 'text-transbot-sky' },
    { label: 'Fuel Savings', value: '18%', icon: Fuel, color: 'text-transbot-teal' },
    { label: 'Maintenance Cost', value: '-25%', icon: Wrench, color: 'text-transbot-purple' },
    { label: 'Driver Safety', value: '96%', icon: Users, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-sky/5 via-white to-transbot-teal/5 responsive-container">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 responsive-container">
        <div className="max-w-7xl mx-auto responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <div className="inline-flex items-center gap-2 bg-transbot-sky/10 text-transbot-sky px-4 py-2 rounded-full text-sm font-medium mb-6 responsive-container">
              <Truck className="w-4 h-4 responsive-container" />
              AI Agent: Fleet Manager
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6 responsive-container">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent responsive-container"> Fleet Management</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8 responsive-container">
              Our AI-powered Fleet Manager optimizes vehicle performance, reduces maintenance costs, 
              and maximizes efficiency across your entire fleet operations.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8 responsive-container">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Monitoring' ? 'bg-transbot-sky animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-warning animate-pulse' : 'bg-transbot-teal'}`}></div>
                <span className="text-sm font-medium text-transbot-text-primary responsive-container">{agentStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <Zap className="w-4 h-4 text-transbot-sky responsive-container" />
                <span className="text-sm font-medium text-transbot-text-primary responsive-container">{efficiency}% Efficiency</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startOptimization}
                disabled={isOptimizing}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
              >
                {isOptimizing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container"></div>
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 responsive-container" />
                    Start Optimization
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetOptimization}
                className="border-2 border-transbot-sky text-transbot-sky px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-transbot-sky hover:text-white transition-all duration-300 responsive-container"
              >
                <RotateCcw className="w-5 h-5 responsive-container" />
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 responsive-container"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-transbot-border/20 shadow-transbot responsive-container"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-transbot-text-primary mb-1 responsive-container">{stat.value}</div>
                <div className="text-sm text-transbot-text-secondary responsive-container">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Optimization Results */}
      {optimizationResults && (
        <section className="py-20 px-6 lg:px-8 responsive-container">
          <div className="max-w-7xl mx-auto responsive-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot mb-12 responsive-container"
            >
              <div className="flex items-center gap-3 mb-6 responsive-container">
                <CheckCircle className="w-6 h-6 text-transbot-teal responsive-container" />
                <h2 className="text-2xl font-bold text-transbot-text-primary responsive-container">Fleet Optimization Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 responsive-container">
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-sky mb-1 responsive-container">
                    {optimizationResults.fuelEfficiency.improvement}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Fuel Efficiency</div>
                  <div className="text-xs text-transbot-teal responsive-container">{optimizationResults.fuelEfficiency.savings}</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-teal mb-1 responsive-container">
                    {optimizationResults.maintenance.costReduction}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Maintenance Cost</div>
                  <div className="text-xs text-transbot-teal responsive-container">{optimizationResults.maintenance.uptime} uptime</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-purple mb-1 responsive-container">
                    {optimizationResults.driverPerformance.safetyScore}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Driver Safety</div>
                  <div className="text-xs text-transbot-teal responsive-container">{optimizationResults.driverPerformance.efficiency} efficiency</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6 responsive-container">
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-4 responsive-container">Optimization Recommendations</h3>
                <div className="space-y-3 responsive-container">
                  {optimizationResults.recommendations.map((recommendation: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-transbot-neutral-light rounded-lg responsive-container">
                      <CheckCircle className="w-5 h-5 text-transbot-teal flex-shrink-0 responsive-container" />
                      <span className="text-transbot-text-primary responsive-container">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 responsive-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('fleet_report_exported', { format: 'pdf' })}
                  className="bg-transbot-sky text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 responsive-container"
                >
                  <Download className="w-4 h-4 responsive-container" />
                  Export Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('fleet_dashboard_viewed', { type: 'analytics' })}
                  className="border-2 border-transbot-sky text-transbot-sky px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-sky hover:text-white transition-all duration-300 responsive-container"
                >
                  <BarChart3 className="w-4 h-4 responsive-container" />
                  View Dashboard
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 responsive-container">
        <div className="max-w-7xl mx-auto responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-6 responsive-container">
              Advanced Fleet Management Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto responsive-container">
              Comprehensive fleet management solution powered by AI to optimize performance, 
              reduce costs, and ensure maximum efficiency across your entire fleet.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 responsive-container">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 responsive-container"
              >
                <div className="flex items-start gap-4 responsive-container">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 responsive-container">
                    <feature.icon className="w-6 h-6 text-white responsive-container" />
                  </div>
                  <div className="flex-1 responsive-container">
                    <h3 className="text-xl font-bold text-transbot-text-primary mb-3 responsive-container">
                      {feature.title}
                    </h3>
                    <p className="text-transbot-text-secondary mb-4 responsive-container">
                      {feature.description}
                    </p>
                    <ul className="space-y-2 responsive-container">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-transbot-text-secondary responsive-container">
                          <CheckCircle className="w-4 h-4 text-transbot-teal flex-shrink-0 responsive-container" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}