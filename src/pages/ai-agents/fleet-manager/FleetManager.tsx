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

export default function FleetManager() {
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
    <div className="min-h-screen bg-gradient-to-br from-transbot-sky/5 via-white to-transbot-teal/5">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-transbot-sky/10 text-transbot-sky px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Truck className="w-4 h-4" />
              AI Agent: Fleet Manager
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Fleet Management</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8">
              Our AI-powered Fleet Manager optimizes vehicle performance, reduces maintenance costs, 
              and maximizes efficiency across your entire fleet operations.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Monitoring' ? 'bg-transbot-sky animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-warning animate-pulse' : 'bg-transbot-teal'}`}></div>
                <span className="text-sm font-medium text-transbot-text-primary">{agentStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20">
                <Zap className="w-4 h-4 text-transbot-sky" />
                <span className="text-sm font-medium text-transbot-text-primary">{efficiency}% Efficiency</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startOptimization}
                disabled={isOptimizing}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isOptimizing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Optimization
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetOptimization}
                className="border-2 border-transbot-sky text-transbot-sky px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-transbot-sky hover:text-white transition-all duration-300"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-transbot-border/20 shadow-transbot"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold text-transbot-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Optimization Results */}
      {optimizationResults && (
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-transbot-teal" />
                <h2 className="text-2xl font-bold text-transbot-text-primary">Fleet Optimization Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-sky mb-1">
                    {optimizationResults.fuelEfficiency.improvement}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Fuel Efficiency</div>
                  <div className="text-xs text-transbot-teal">{optimizationResults.fuelEfficiency.savings}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-teal mb-1">
                    {optimizationResults.maintenance.costReduction}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Maintenance Cost</div>
                  <div className="text-xs text-transbot-teal">{optimizationResults.maintenance.uptime} uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-purple mb-1">
                    {optimizationResults.driverPerformance.safetyScore}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Driver Safety</div>
                  <div className="text-xs text-transbot-teal">{optimizationResults.driverPerformance.efficiency} efficiency</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Optimization Recommendations</h3>
                <div className="space-y-3">
                  {optimizationResults.recommendations.map((recommendation: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-transbot-neutral-light rounded-lg">
                      <CheckCircle className="w-5 h-5 text-transbot-teal flex-shrink-0" />
                      <span className="text-transbot-text-primary">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('fleet_report_exported', { format: 'pdf' })}
                  className="bg-transbot-sky text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('fleet_dashboard_viewed', { type: 'analytics' })}
                  className="border-2 border-transbot-sky text-transbot-sky px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-sky hover:text-white transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4" />
                  View Dashboard
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-6">
              Advanced Fleet Management Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto">
              Comprehensive fleet management solution powered by AI to optimize performance, 
              reduce costs, and ensure maximum efficiency across your entire fleet.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-transbot-text-primary mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-transbot-text-secondary mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-transbot-text-secondary">
                          <CheckCircle className="w-4 h-4 text-transbot-teal flex-shrink-0" />
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
