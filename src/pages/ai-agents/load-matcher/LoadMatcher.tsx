import React from 'react';
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Network, 
  Zap, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Truck, 
  Play,
  RotateCcw,
  Download,
  CheckCircle,
  Users,
  Target
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

const LoadMatcher = React.memo(function LoadMatcher() {
  const [isMatching, setIsMatching] = useState(false)
  const [matchingResults, setMatchingResults] = useState<any>(null)
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
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-transbot-teal/5 via-white to-transbot-purple/5 responsive-container">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 responsive-container">
        <div className="max-w-7xl mx-auto responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <div className="inline-flex items-center gap-2 bg-transbot-teal/10 text-transbot-teal px-4 py-2 rounded-full text-sm font-medium mb-6 responsive-container">
              <Network className="w-4 h-4 responsive-container" />
              AI Agent: Load Matcher
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6 responsive-container">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent responsive-container"> Load Matching</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8 responsive-container">
              Our AI-powered Load Matcher connects shippers with the perfect carriers, 
              optimizing rates, timing, and capacity utilization for maximum efficiency.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8 responsive-container">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Learning' ? 'bg-transbot-warning animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-sky animate-pulse' : 'bg-transbot-teal'}`}></div>
                <span className="text-sm font-medium text-transbot-text-primary responsive-container">{agentStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <Zap className="w-4 h-4 text-transbot-teal responsive-container" />
                <span className="text-sm font-medium text-transbot-text-primary responsive-container">{efficiency}% Efficiency</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startMatching}
                disabled={isMatching}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
              >
                {isMatching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container"></div>
                    Matching Loads...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 responsive-container" />
                    Start Matching
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetMatching}
                className="border-2 border-transbot-teal text-transbot-teal px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-transbot-teal hover:text-white transition-all duration-300 responsive-container"
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

      {/* Matching Results */}
      {matchingResults && (
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
                <h2 className="text-2xl font-bold text-transbot-text-primary responsive-container">Matching Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container">
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-sky mb-1 responsive-container">
                    {matchingResults.matchedLoads}/{matchingResults.totalLoads}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Loads Matched</div>
                  <div className="text-xs text-transbot-teal responsive-container">↑ {matchingResults.matchRate}% match rate</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-teal mb-1 responsive-container">
                    ${matchingResults.averageRate}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Avg Rate/Mile</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-purple mb-1 responsive-container">
                    ${matchingResults.totalValue.toLocaleString()}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Total Value</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-warning mb-1 responsive-container">
                    {matchingResults.matchRate}%
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Match Rate</div>
                </div>
              </div>

              {/* Top Matches */}
              <div className="mb-6 responsive-container">
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-4 responsive-container">Top Matches</h3>
                <div className="space-y-3 responsive-container">
                  {matchingResults.matches.map((match: unknown) => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-transbot-neutral-light rounded-lg responsive-container">
                      <div className="flex items-center gap-4 responsive-container">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center responsive-container">
                          <Truck className="w-5 h-5 text-white responsive-container" />
                        </div>
                        <div>
                          <div className="font-semibold text-transbot-text-primary responsive-container">{match.load}</div>
                          <div className="text-sm text-transbot-text-secondary responsive-container">{match.carrier}</div>
                        </div>
                      </div>
                      <div className="text-right responsive-container">
                        <div className="font-semibold text-transbot-text-primary responsive-container">${match.rate}/mi</div>
                        <div className="text-sm text-transbot-text-secondary responsive-container">{match.distance} mi</div>
                        <div className="text-xs text-transbot-teal responsive-container">{match.matchScore}% match</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 responsive-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('load_matches_exported', { format: 'csv' })}
                  className="bg-transbot-teal text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 responsive-container"
                >
                  <Download className="w-4 h-4 responsive-container" />
                  Export Matches
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('load_matches_visualized', { type: 'network' })}
                  className="border-2 border-transbot-teal text-transbot-teal px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-teal hover:text-white transition-all duration-300 responsive-container"
                >
                  <Network className="w-4 h-4 responsive-container" />
                  View Network
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
              Advanced Load Matching Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto responsive-container">
              Powered by machine learning algorithms and real-time market data 
              to deliver the most profitable and efficient load matches.
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
