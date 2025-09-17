import { motion } from 'framer-motion'
import { Truck, Route, Clock, Shield, BarChart3, Users } from 'lucide-react'

const TransportationManagement = React.memo(function TransportationManagement() {
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
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 responsive-container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 responsive-container"
        >
          <h1 className="text-5xl font-bold text-transbot-text-primary mb-6 responsive-container">
            Transportation Management
          </h1>
          <p className="text-xl text-transbot-text-primary/70 max-w-3xl mx-auto mb-8 responsive-container">
            Revolutionize your transportation operations with AI-powered fleet management, 
            route optimization, and real-time tracking capabilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12 responsive-container">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-lg p-4 rounded-xl text-center responsive-container"
              >
                <div className="text-3xl font-bold text-emerald-400 mb-2 responsive-container">
                  {benefit.metric}
                </div>
                <div className="text-transbot-text-primary/70 text-sm responsive-container">
                  {benefit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 responsive-container">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-lg p-8 rounded-2xl hover:bg-white/80 transition-all duration-300 group responsive-container"
            >
              <div className="flex items-center mb-6 responsive-container">
                <div className="p-3 rounded-xl bg-white/80 group-hover:bg-white/20 transition-colors responsive-container">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-transbot-text-primary mb-4 responsive-container">
                {feature.title}
              </h3>
              <p className="text-transbot-text-primary/70 leading-relaxed responsive-container">
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
          className="text-center glass p-12 rounded-2xl responsive-container"
        >
          <h2 className="text-3xl font-bold text-transbot-text-primary mb-6 responsive-container">
            Ready to Transform Your Transportation Operations?
          </h2>
          <p className="text-transbot-text-primary/70 mb-8 max-w-2xl mx-auto responsive-container">
            Join thousands of companies already using TransBot AI to optimize their 
            transportation management and reduce costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 px-8 py-4 text-lg responsive-container"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/80 text-transbot-text-primary border border-slate-200/50 font-semibold hover:bg-slate-50 transition-all duration-300 px-8 py-4 text-lg responsive-container"
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}