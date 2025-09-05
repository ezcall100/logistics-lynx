import React from 'react'
import { motion } from 'framer-motion'
import { Truck, Route, Clock, Shield, BarChart3, Users, Zap, Globe } from 'lucide-react'

export default function TransportationManagement() {
  const features = [
    {
      icon: Truck,
      title: 'Fleet Management',
      description: 'Complete visibility and control over your entire fleet with real-time tracking and optimization.',
      color: 'text-blue-400'
    },
    {
      icon: Route,
      title: 'Route Optimization',
      description: 'AI-powered route planning that reduces fuel costs and delivery times by up to 30%.',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Monitor shipments in real-time with GPS tracking and automated status updates.',
      color: 'text-purple-400'
    },
    {
      icon: Shield,
      title: 'Compliance Management',
      description: 'Automated compliance monitoring for DOT regulations, HOS, and safety requirements.',
      color: 'text-red-400'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Comprehensive analytics dashboard with performance metrics and business intelligence.',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      title: 'Driver Management',
      description: 'Complete driver lifecycle management from onboarding to performance tracking.',
      color: 'text-cyan-400'
    }
  ]

  const benefits = [
    { metric: '30%', label: 'Reduction in Fuel Costs' },
    { metric: '25%', label: 'Faster Delivery Times' },
    { metric: '40%', label: 'Improved Fleet Utilization' },
    { metric: '99.9%', label: 'On-time Delivery Rate' }
  ]

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Transportation Management
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Revolutionize your transportation operations with AI-powered fleet management, 
            route optimization, and real-time tracking capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-4 rounded-xl text-center"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {benefit.metric}
                </div>
                <div className="text-white/70 text-sm">
                  {benefit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center glass p-12 rounded-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Transportation Operations?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using TransBot AI to optimize their 
            transportation management and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-4 text-lg"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}