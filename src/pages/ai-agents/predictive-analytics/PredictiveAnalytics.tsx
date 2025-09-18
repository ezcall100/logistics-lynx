import React from 'react';
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  TrendingUp, 
  BarChart3, 
  Clock, 
  DollarSign, 
  Zap, 
  Brain,
  Play,
  RotateCcw,
  Download,
  CheckCircle,
  Target
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

const PredictiveAnalytics = React.memo(function PredictiveAnalytics() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [agentStatus, setAgentStatus] = useState('Learning')
  const [accuracy, setAccuracy] = useState(96)

  const startAnalysis = async () => {
    setIsAnalyzing(true)
    setAgentStatus('Processing')
    
    // Track user interaction
    await trackUserInteraction('predictive_analysis_started', {
      agent: 'PredictiveAnalytics',
      timestamp: new Date().toISOString()
    })

    // Track AI agent activity
    await trackAIAgentActivity('PredictiveAnalytics', 'analysis_started', {
      dataPoints: 50000,
      timeRange: '6_months',
      models: ['demand_forecasting', 'price_prediction', 'route_optimization']
    })

    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        demandForecast: {
          nextMonth: '+12%',
          nextQuarter: '+8%',
          confidence: 94
        },
        pricePredictions: {
          fuelCosts: '+5%',
          shippingRates: '+3%',
          confidence: 91
        },
        routeOptimization: {
          timeSavings: '18%',
          costReduction: '15%',
          confidence: 89
        },
        insights: [
          'Peak demand expected in Q2 2024',
          'Fuel costs likely to increase 5-8%',
          'Route optimization can save 15-20% costs',
          'Warehouse capacity needs 25% increase'
        ]
      })
      setIsAnalyzing(false)
      setAgentStatus('Completed')
      setAccuracy(97)
    }, 4000)
  }

  const resetAnalysis = () => {
    setAnalysisResults(null)
    setAgentStatus('Learning')
    setAccuracy(96)
  }

  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Models',
      description: 'Advanced ML algorithms analyze historical data to predict future trends, demand patterns, and market conditions.',
      benefits: ['Neural Networks', 'Time Series Analysis', 'Predictive Modeling']
    },
    {
      icon: BarChart3,
      title: 'Demand Forecasting',
      description: 'Predict customer demand, seasonal patterns, and market fluctuations to optimize inventory and capacity planning.',
      benefits: ['Seasonal Analysis', 'Trend Detection', 'Capacity Planning']
    },
    {
      icon: TrendingUp,
      title: 'Price Optimization',
      description: 'AI-powered pricing models that consider market conditions, competition, and demand elasticity for optimal pricing.',
      benefits: ['Dynamic Pricing', 'Market Analysis', 'Competitive Intelligence']
    },
    {
      icon: Target,
      title: 'Risk Assessment',
      description: 'Identify potential risks and opportunities through comprehensive analysis of market trends and operational data.',
      benefits: ['Risk Modeling', 'Opportunity Detection', 'Scenario Planning']
    }
  ]

  const stats = [
    { label: 'Prediction Accuracy', value: '96%', icon: Target, color: 'text-transbot-sky' },
    { label: 'Cost Savings', value: '22%', icon: DollarSign, color: 'text-transbot-teal' },
    { label: 'Demand Forecast', value: '94%', icon: TrendingUp, color: 'text-transbot-purple' },
    { label: 'Processing Speed', value: '2.1s', icon: Clock, color: 'text-transbot-warning' }
  ]

  return (
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
              <Brain className="w-4 h-4 responsive-container" />
              AI Agent: Predictive Analytics
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6 responsive-container">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent responsive-container"> Predictive Analytics</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8 responsive-container">
              Our AI-powered Predictive Analytics engine analyzes market trends, demand patterns, 
              and operational data to forecast future outcomes and optimize business decisions.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8 responsive-container">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Learning' ? 'bg-transbot-warning animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-sky animate-pulse' : 'bg-transbot-teal'}`}></div>
                <span className="text-sm font-medium text-transbot-text-primary responsive-container">{agentStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20 responsive-container">
                <Zap className="w-4 h-4 text-transbot-teal responsive-container" />
                <span className="text-sm font-medium text-transbot-text-primary responsive-container">{accuracy}% Accuracy</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 responsive-container" />
                    Start Analysis
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAnalysis}
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

      {/* Analysis Results */}
      {analysisResults && (
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
                <h2 className="text-2xl font-bold text-transbot-text-primary responsive-container">Analysis Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 responsive-container">
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-sky mb-1 responsive-container">
                    {analysisResults.demandForecast.nextMonth}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Next Month Demand</div>
                  <div className="text-xs text-transbot-teal responsive-container">{analysisResults.demandForecast.confidence}% confidence</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-teal mb-1 responsive-container">
                    {analysisResults.pricePredictions.fuelCosts}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Fuel Cost Prediction</div>
                  <div className="text-xs text-transbot-teal responsive-container">{analysisResults.pricePredictions.confidence}% confidence</div>
                </div>
                <div className="text-center responsive-container">
                  <div className="text-3xl font-bold text-transbot-purple mb-1 responsive-container">
                    {analysisResults.routeOptimization.timeSavings}
                  </div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">Time Savings</div>
                  <div className="text-xs text-transbot-teal responsive-container">{analysisResults.routeOptimization.confidence}% confidence</div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mb-6 responsive-container">
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-4 responsive-container">Key Insights</h3>
                <div className="space-y-3 responsive-container">
                  {analysisResults.insights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-transbot-neutral-light rounded-lg responsive-container">
                      <CheckCircle className="w-5 h-5 text-transbot-teal flex-shrink-0 responsive-container" />
                      <span className="text-transbot-text-primary responsive-container">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 responsive-container">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('analysis_export_requested', { format: 'pdf' })}
                  className="bg-transbot-teal text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 responsive-container"
                >
                  <Download className="w-4 h-4 responsive-container" />
                  Export Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('analysis_visualization_requested', { type: 'dashboard' })}
                  className="border-2 border-transbot-teal text-transbot-teal px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-teal hover:text-white transition-all duration-300 responsive-container"
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
              Advanced Predictive Analytics Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto responsive-container">
              Powered by cutting-edge machine learning algorithms and real-time data analysis 
              to deliver accurate predictions and actionable insights.
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