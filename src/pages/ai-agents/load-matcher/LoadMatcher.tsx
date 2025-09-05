import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Network, 
  Zap, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Truck, 
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Download,
  Settings,
  Brain,
  CheckCircle,
  AlertCircle,
  Users,
  Target
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function LoadMatcher() {
  const [isMatching, setIsMatching] = useState(false)
  const [matchingResults, setMatchingResults] = useState(null)
  const [agentStatus, setAgentStatus] = useState('Learning')
  const [efficiency, setEfficiency] = useState(94)

  // Mock load matching process
  const startMatching = async () => {
    setIsMatching(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('load_matching_started', {
      agent: 'LoadMatcher',
      timestamp: new Date().toISOString()
    })

    // Track AI agent activity
    await trackAIAgentActivity('LoadMatcher', 'matching_started', {
      availableLoads: 25,
      availableCarriers: 12,
      criteria: ['location', 'capacity', 'timing', 'rate']
    })

    // Simulate matching process
    setTimeout(() => {
      setMatchingResults({
        totalLoads: 25,
        matchedLoads: 18,
        matchRate: 72,
        averageRate: 2.45,
        totalValue: 125000,
        matches: [
          { id: 1, load: 'LAX-NYC', carrier: 'Swift Transport', rate: 2.50, distance: 2800, matchScore: 95 },
          { id: 2, load: 'CHI-ATL', carrier: 'Prime Inc', rate: 2.30, distance: 750, matchScore: 92 },
          { id: 3, load: 'DAL-PHX', carrier: 'Schneider', rate: 2.60, distance: 1000, matchScore: 88 },
        ]
      })
      setIsMatching(false)
      setAgentStatus('Completed')
      setEfficiency(96)
    }, 4000)
  }

  const resetMatching = () => {
    setMatchingResults(null)
    setAgentStatus('Learning')
    setEfficiency(94)
  }

  const features = [
    {
      icon: Network,
      title: 'Intelligent Matching Algorithm',
      description: 'Advanced AI algorithms analyze carrier capacity, location, rates, and preferences to find the perfect load matches.',
      benefits: ['Smart Algorithms', 'Real-time Analysis', 'Preference Learning']
    },
    {
      icon: Target,
      title: 'Multi-Criteria Optimization',
      description: 'Considers multiple factors including distance, rate, timing, equipment type, and carrier preferences for optimal matches.',
      benefits: ['Multi-factor Analysis', 'Preference Weighting', 'Optimization Engine']
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Comprehensive dashboard showing match rates, revenue optimization, and carrier satisfaction metrics.',
      benefits: ['Match Analytics', 'Revenue Tracking', 'Performance Metrics']
    },
    {
      icon: Users,
      title: 'Carrier Relationship Management',
      description: 'Build and maintain strong relationships with carriers through intelligent matching and communication tools.',
      benefits: ['Relationship Building', 'Communication Tools', 'Satisfaction Tracking']
    }
  ]

  const stats = [
    { label: 'Match Rate', value: '72%', icon: Target, color: 'text-transbot-sky' },
    { label: 'Revenue Increase', value: '28%', icon: DollarSign, color: 'text-transbot-teal' },
    { label: 'Carrier Satisfaction', value: '91%', icon: Users, color: 'text-transbot-purple' },
    { label: 'Processing Speed', value: '3.2s', icon: Clock, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-teal/5 via-white to-transbot-purple/5">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-transbot-teal/10 text-transbot-teal px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Network className="w-4 h-4" />
              AI Agent: Load Matcher
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Load Matching</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8">
              Our AI-powered Load Matcher connects shippers with the perfect carriers, 
              optimizing rates, timing, and capacity utilization for maximum efficiency.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Learning' ? 'bg-transbot-warning animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-sky animate-pulse' : 'bg-transbot-teal'}`}></div>
                <span className="text-sm font-medium text-transbot-text-primary">{agentStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20">
                <Zap className="w-4 h-4 text-transbot-teal" />
                <span className="text-sm font-medium text-transbot-text-primary">{efficiency}% Efficiency</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startMatching}
                disabled={isMatching}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMatching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Matching Loads...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Matching
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetMatching}
                className="border-2 border-transbot-teal text-transbot-teal px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-transbot-teal hover:text-white transition-all duration-300"
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

      {/* Matching Results */}
      {matchingResults && (
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
                <h2 className="text-2xl font-bold text-transbot-text-primary">Matching Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-sky mb-1">
                    {matchingResults.matchedLoads}/{matchingResults.totalLoads}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Loads Matched</div>
                  <div className="text-xs text-transbot-teal">↑ {matchingResults.matchRate}% match rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-teal mb-1">
                    ${matchingResults.averageRate}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Avg Rate/Mile</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-purple mb-1">
                    ${matchingResults.totalValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Total Value</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-warning mb-1">
                    {matchingResults.matchRate}%
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Match Rate</div>
                </div>
              </div>

              {/* Top Matches */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Top Matches</h3>
                <div className="space-y-3">
                  {matchingResults.matches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-transbot-neutral-light rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Truck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-transbot-text-primary">{match.load}</div>
                          <div className="text-sm text-transbot-text-secondary">{match.carrier}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-transbot-text-primary">${match.rate}/mi</div>
                        <div className="text-sm text-transbot-text-secondary">{match.distance} mi</div>
                        <div className="text-xs text-transbot-teal">{match.matchScore}% match</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('load_matches_exported', { format: 'csv' })}
                  className="bg-transbot-teal text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Matches
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('load_matches_visualized', { type: 'network' })}
                  className="border-2 border-transbot-teal text-transbot-teal px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-teal hover:text-white transition-all duration-300"
                >
                  <Network className="w-4 h-4" />
                  View Network
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
              Advanced Load Matching Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto">
              Powered by machine learning algorithms and real-time market data 
              to deliver the most profitable and efficient load matches.
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
