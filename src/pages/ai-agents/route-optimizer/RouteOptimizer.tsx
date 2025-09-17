import React from 'react';
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Zap, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Play,
  RotateCcw,
  Download,
  Brain,
  CheckCircle
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

const RouteOptimizer = React.memo(function RouteOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Active')
  const [efficiency, setEfficiency] = useState(98)

  // Mock optimization process
  const startOptimization = async () => {
    setIsOptimizing(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('route_optimization_started', {
      agent: 'RouteOptimizer',
      timestamp: new Date().toISOString()
    })

    // Track AI agent activity
    await trackAIAgentActivity('RouteOptimizer', 'optimization_started', {
      routes: 15,
      vehicles: 8,
      constraints: ['traffic', 'weather', 'delivery_windows']
    })

    // Simulate optimization process
    setTimeout(() => {
      setOptimizationResults({
        originalDistance: 245.7,
        optimizedDistance: 198.3,
        timeSaved: 47.4,
        fuelSaved: 12.8,
        costReduction: 18.5,
        routes: [
          { id: 1, vehicle: 'Truck-001', stops: 8, distance: 45.2, time: 2.5 },
          { id: 2, vehicle: 'Truck-002', stops: 6, distance: 38.7, time: 2.1 },
          { id: 3, vehicle: 'Truck-003', stops: 7, distance: 42.1, time: 2.3 },
        ]
      })
      setIsOptimizing(false)
      setAgentStatus('Completed')
      setEfficiency(99)
    }, 3000)
  }

  const resetOptimization = () => {
    setOptimizationResults(null)
    setAgentStatus('Active')
    setEfficiency(98)
  }

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Advanced machine learning algorithms analyze traffic patterns, weather conditions, and historical data to optimize routes in real-time.',
      benefits: ['Machine Learning', 'Real-time Analysis', 'Predictive Modeling']
    },
    {
      icon: MapPin,
      title: 'Multi-Stop Optimization',
      description: 'Intelligently sequence multiple delivery stops to minimize total distance and time while respecting delivery windows.',
      benefits: ['Dynamic Sequencing', 'Time Windows', 'Capacity Constraints']
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Comprehensive analytics dashboard showing optimization results, cost savings, and performance improvements.',
      benefits: ['Cost Tracking', 'Performance Metrics', 'ROI Analysis']
    },
    {
      icon: Brain,
      title: 'Customizable Constraints',
      description: 'Configure optimization parameters including vehicle capacity, driver hours, fuel costs, and delivery priorities.',
      benefits: ['Flexible Parameters', 'Custom Rules', 'Business Logic']
    }
  ]

  const stats = [
    { label: 'Average Time Savings', value: '23%', icon: Clock, color: 'text-transbot-sky' },
    { label: 'Fuel Cost Reduction', value: '18%', icon: DollarSign, color: 'text-transbot-teal' },
    { label: 'Route Efficiency', value: '35%', icon: TrendingUp, color: 'text-transbot-purple' },
    { label: 'Customer Satisfaction', value: '94%', icon: CheckCircle, color: 'text-transbot-warning' }
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-transbot-purple/5 via-white to-transbot-sky/5 responsive-container">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 responsive-container">
        <div className="max-w-7xl mx-auto responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <div className="inline-flex items-center gap-2 bg-transbot-purple/10 text-transbot-purple px-4 py-2 rounded-full text-sm font-medium mb-6 responsive-container">
              <Brain className="w-4 h-4 responsive-container" />
              AI Agent: Route Optimizer
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6 responsive-container">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent responsive-container"> Route Optimization</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8 responsive-container">
              Our AI-powered Route Optimizer analyzes traffic patterns, weather conditions, 
              and delivery constraints to create the most efficient routes for your fleet.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8 responsive-container">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Active' ? 'bg-transbot-teal animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-warning animate-pulse' : 'bg-transbot-sky'}`}></div>
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
                <h2 className="text-2xl font-bold text-transbot-text-primary responsive-container">Optimization Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container">
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-sky mb-1 responsive-container">
                    {optimizationResults.optimizedDistance} mi
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Optimized Distance</div>
                  <div className="text-xs text-transbot-teal responsive-container">↓ {((optimizationResults.originalDistance - optimizationResults.optimizedDistance) / optimizationResults.originalDistance * 100).toFixed(1)}%</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-teal mb-1 responsive-container">
                    {optimizationResults.timeSaved} min
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Time Saved</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-purple mb-1 responsive-container">
                    {optimizationResults.fuelSaved} gal
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Fuel Saved</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-warning mb-1 responsive-container">
                    ${optimizationResults.costReduction}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Cost Reduction</div>
                </div>
              </div>

              <div className="flex gap-4 responsive-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('route_export_requested', { format: 'pdf' })}
                  className="bg-transbot-sky text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 responsive-container"
                >
                  <Download className="w-4 h-4 responsive-container" />
                  Export Routes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('route_visualization_requested', { type: 'map' })}
                  className="border-2 border-transbot-sky text-transbot-sky px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-sky hover:text-white transition-all duration-300 responsive-container"
                >
                  <MapPin className="w-4 h-4 responsive-container" />
                  View on Map
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
              Advanced Route Optimization Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto responsive-container">
              Powered by cutting-edge AI algorithms and real-time data analysis 
              to deliver the most efficient routes for your fleet.
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
