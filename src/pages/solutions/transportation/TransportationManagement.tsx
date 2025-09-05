import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Truck, 
  Route, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Download
} from 'lucide-react'
import { trackFormSubmission, trackUserInteraction } from '../../../services/webhookService'

export default function TransportationManagement() {
  const [formData, setFormData] = useState({
    companyName: '',
    fleetSize: '',
    currentChallenges: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track form submission via webhook
    await trackFormSubmission('transportation_management_inquiry', formData)
    
    // Track user interaction
    await trackUserInteraction('transportation_form_submitted', {
      fleetSize: formData.fleetSize,
      challenges: formData.currentChallenges
    })

    alert('Thank you for your inquiry! Our team will contact you within 24 hours.')
    setFormData({
      companyName: '',
      fleetSize: '',
      currentChallenges: '',
      email: '',
      phone: ''
    })
  }

  const features = [
    {
      icon: Route,
      title: 'AI-Powered Route Optimization',
      description: 'Reduce fuel costs by 15-25% with intelligent routing algorithms that consider traffic, weather, and delivery windows.',
      benefits: ['15-25% fuel savings', 'Reduced delivery times', 'Lower carbon footprint']
    },
    {
      icon: Truck,
      title: 'Real-Time Fleet Tracking',
      description: 'Monitor your entire fleet with GPS tracking, driver behavior analysis, and predictive maintenance alerts.',
      benefits: ['100% visibility', 'Predictive maintenance', 'Driver safety scores']
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Get insights into performance metrics, cost analysis, and optimization opportunities with our AI dashboard.',
      benefits: ['Real-time insights', 'Cost optimization', 'Performance tracking']
    },
    {
      icon: Shield,
      title: 'Compliance Management',
      description: 'Stay compliant with DOT regulations, HOS tracking, and automated reporting for all your vehicles.',
      benefits: ['DOT compliance', 'HOS tracking', 'Automated reporting']
    }
  ]

  const stats = [
    { label: 'Average Fuel Savings', value: '22%', icon: TrendingUp },
    { label: 'Route Efficiency', value: '35%', icon: Route },
    { label: 'Cost Reduction', value: '18%', icon: DollarSign },
    { label: 'Delivery Time', value: '28%', icon: Clock }
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
              Transportation Management
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6">
              Revolutionize Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Fleet Operations</span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8">
              Transform your transportation business with AI-powered fleet management, 
              route optimization, and real-time analytics that drive profitability and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackUserInteraction('transportation_demo_requested', { source: 'hero_cta' })}
                className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackUserInteraction('transportation_roi_calculator', { source: 'hero_cta' })}
                className="border-2 border-transbot-sky text-transbot-sky px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:bg-transbot-sky hover:text-white transition-all duration-300"
              >
                <DollarSign className="w-5 h-5" />
                Calculate ROI
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
                <stat.icon className="w-8 h-8 text-transbot-sky mx-auto mb-3" />
                <div className="text-3xl font-bold text-transbot-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Complete Transportation Management Suite
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto">
              Everything you need to optimize your fleet operations, reduce costs, 
              and improve customer satisfaction.
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

      {/* Contact Form Section */}
      <section className="py-20 px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-6">
              Ready to Transform Your Fleet?
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              Get a personalized demo and see how Trans Bot AI can optimize your transportation operations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-transbot-border/20 shadow-transbot"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-transbot-text-primary mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-transbot-text-primary mb-2">
                    Fleet Size *
                  </label>
                  <select
                    name="fleetSize"
                    value={formData.fleetSize}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200"
                  >
                    <option value="">Select fleet size</option>
                    <option value="1-10">1-10 vehicles</option>
                    <option value="11-50">11-50 vehicles</option>
                    <option value="51-100">51-100 vehicles</option>
                    <option value="100+">100+ vehicles</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-transbot-text-primary mb-2">
                  Current Challenges
                </label>
                <textarea
                  name="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200"
                  placeholder="Tell us about your current transportation challenges..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-transbot-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-transbot-text-primary mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
              >
                Get Personalized Demo
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
