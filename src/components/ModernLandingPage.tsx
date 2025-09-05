import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Shield, 
  Users,
  Globe,
  Brain,
  Truck,
  BarChart3,
  Clock,
  Target,
  Star
} from 'lucide-react'

export function ModernLandingPage() {
  const stats = [
    { label: 'Active Users', value: '2,500+', icon: Users },
    { label: 'Loads Processed', value: '50K+', icon: Truck },
    { label: 'Routes Optimized', value: '15K+', icon: Target },
    { label: 'AI Insights', value: '1.2M+', icon: Brain }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Book more loads, optimize capacity',
      description: 'AI-powered load matching and capacity optimization'
    },
    {
      icon: Brain,
      title: 'Leverage AI & workflow automation',
      description: 'Intelligent automation for maximum efficiency'
    },
    {
      icon: Shield,
      title: 'No-risk, easy onboarding',
      description: 'Seamless integration with existing systems'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, FleetMax Logistics',
      content: 'Trans Bot AI increased our efficiency by 40% in just 3 months.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Operations Director, Swift Transport',
      content: 'The AI insights have revolutionized our route planning.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'CTO, Global Freight Solutions',
      content: 'Best logistics platform we\'ve ever used. Game changer!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-bg-light via-white to-transbot-neutral-light">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-transbot-teal/10 border border-transbot-teal/20 rounded-full"
              >
                <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-transbot-teal">250 AI AGENTS WORKING 24/7</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-transbot-text-primary leading-tight"
              >
                Trans Bot AI{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Supercharges
                </span>{' '}
                Your Trucking Company
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-transbot-text-secondary leading-relaxed"
              >
                Revolutionize your logistics with AI-powered automation, intelligent routing, 
                and real-time optimization that drives profitability and efficiency.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-transbot-border/20 shadow-transbot"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-transbot-sky/10">
                        <stat.icon className="w-5 h-5 text-transbot-sky" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-transbot-text-primary">{stat.value}</div>
                        <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-transbot hover:shadow-transbot-lg">
                  Experience AI Power
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transbot-neutral-dark text-white font-semibold rounded-xl hover:bg-transbot-text-primary transition-all duration-200">
                  <Play className="w-5 h-5" />
                  Watch AI Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transbot-sky/5 to-transbot-teal/5 rounded-3xl"></div>
              
              {/* Main Visual */}
              <div className="relative p-8">
                {/* Network Visualization */}
                <div className="relative w-full h-96">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-transbot-lg">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Connected Nodes */}
                  {[
                    { x: '20%', y: '20%', icon: Truck, label: 'Fleet' },
                    { x: '80%', y: '20%', icon: BarChart3, label: 'Analytics' },
                    { x: '20%', y: '80%', icon: Globe, label: 'Global' },
                    { x: '80%', y: '80%', icon: Clock, label: 'Real-time' }
                  ].map((node, index) => (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                      className="absolute"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-transbot border-2 border-transbot-sky/20">
                        <node.icon className="w-6 h-6 text-transbot-sky" />
                      </div>
                      <div className="text-xs text-transbot-text-secondary text-center mt-2 font-medium">
                        {node.label}
                      </div>
                    </motion.div>
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full">
                    {[
                      { x1: '50%', y1: '50%', x2: '20%', y2: '20%' },
                      { x1: '50%', y1: '50%', x2: '80%', y2: '20%' },
                      { x1: '50%', y1: '50%', x2: '20%', y2: '80%' },
                      { x1: '50%', y1: '50%', x2: '80%', y2: '80%' }
                    ].map((line, index) => (
                      <motion.line
                        key={index}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    ))}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0284C7" />
                        <stop offset="100%" stopColor="#14B8A6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-transbot border border-transbot-border/20"
                >
                  <div className="text-sm font-semibold text-transbot-text-primary">250/250</div>
                  <div className="text-xs text-transbot-text-secondary">Agents Active</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 }}
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-transbot border border-transbot-border/20"
                >
                  <div className="space-y-1">
                    <div className="text-xs text-transbot-text-secondary">Agent 0: Predicting demand</div>
                    <div className="text-xs text-transbot-text-secondary">Agent 4: Learning patterns</div>
                    <div className="text-xs text-transbot-text-secondary">Agent 5: Processing data</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
              Why Choose Trans Bot AI?
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto">
              Experience the future of logistics with our comprehensive AI-powered platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-white rounded-2xl shadow-transbot border border-transbot-border/20 hover:shadow-transbot-lg transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-transbot-sky/10 w-fit mb-6">
                  <feature.icon className="w-8 h-8 text-transbot-sky" />
                </div>
                <h3 className="text-xl font-bold text-transbot-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-transbot-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-transbot-sky/5 to-transbot-teal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              See what our customers say about Trans Bot AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-white rounded-2xl shadow-transbot border border-transbot-border/20"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-transbot-text-secondary mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-transbot-text-primary">{testimonial.name}</div>
                  <div className="text-sm text-transbot-text-secondary">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of companies already using Trans Bot AI to optimize their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-transbot-sky font-semibold rounded-xl hover:bg-transbot-neutral-light transition-all duration-200 shadow-transbot">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-transbot-sky transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
