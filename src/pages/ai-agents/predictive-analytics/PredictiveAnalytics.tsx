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

export default function PredictiveAnalytics() {
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
              <Brain className="w-4 h-4" />
              AI Agent: Predictive Analytics
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6">
              Intelligent
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Predictive Analytics</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8">
              Our AI-powered Predictive Analytics engine analyzes market trends, demand patterns, 
              and operational data to forecast future outcomes and optimize business decisions.
            </p>
            
            {/* Agent Status */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20">
                <div className={`w-2 h-2 rounded-full ${agentStatus === 'Learning' ? 'bg-transbot-warning animate-pulse' : agentStatus === 'Processing' ? 'bg-transbot-sky animate-pulse' : 'bg-transbot-teal'}`}></div>
                <span className="text-sm font-medium text-transbot-text-primary">{agentStatus}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-transbot-border/20">
                <Zap className="w-4 h-4 text-transbot-teal" />
                <span className="text-sm font-medium text-transbot-text-primary">{accuracy}% Accuracy</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Analysis
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAnalysis}
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

      {/* Analysis Results */}
      {analysisResults && (
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
                <h2 className="text-2xl font-bold text-transbot-text-primary">Analysis Complete!</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-sky mb-1">
                    {analysisResults.demandForecast.nextMonth}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Next Month Demand</div>
                  <div className="text-xs text-transbot-teal">{analysisResults.demandForecast.confidence}% confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-teal mb-1">
                    {analysisResults.pricePredictions.fuelCosts}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Fuel Cost Prediction</div>
                  <div className="text-xs text-transbot-teal">{analysisResults.pricePredictions.confidence}% confidence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-transbot-purple mb-1">
                    {analysisResults.routeOptimization.timeSavings}
                  </div>
                  <div className="text-sm text-transbot-text-secondary">Time Savings</div>
                  <div className="text-xs text-transbot-teal">{analysisResults.routeOptimization.confidence}% confidence</div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-4">Key Insights</h3>
                <div className="space-y-3">
                  {analysisResults.insights.map((insight: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-transbot-neutral-light rounded-lg">
                      <CheckCircle className="w-5 h-5 text-transbot-teal flex-shrink-0" />
                      <span className="text-transbot-text-primary">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('analysis_export_requested', { format: 'pdf' })}
                  className="bg-transbot-teal text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackUserInteraction('analysis_visualization_requested', { type: 'dashboard' })}
                  className="border-2 border-transbot-teal text-transbot-teal px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-transbot-teal hover:text-white transition-all duration-300"
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
              Advanced Predictive Analytics Features
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto">
              Powered by cutting-edge machine learning algorithms and real-time data analysis 
              to deliver accurate predictions and actionable insights.
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
