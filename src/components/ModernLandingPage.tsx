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
    { label: 'Active Companies', value: '5,000+', icon: Users },
    { label: 'Loads Optimized', value: '2M+', icon: Truck },
    { label: 'Routes Enhanced', value: '500K+', icon: Target },
    { label: 'AI Decisions', value: '50M+', icon: Brain }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Revolutionary AI-Powered Logistics',
      description: 'Transform your logistics operations with cutting-edge artificial intelligence that learns, adapts, and optimizes in real-time'
    },
    {
      icon: Brain,
      title: 'Intelligent Automation Suite',
      description: 'Deploy 250+ specialized AI agents that handle everything from route optimization to predictive maintenance'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Bank-level security with 99.9% uptime guarantee and comprehensive compliance across all regulations'
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
    <div className="min-h-screen bg-gradient-to-br from-transbot-bg-light via-white to-transbot-neutral-light responsive-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 responsive-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center responsive-container">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 responsive-container"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-transbot-teal/10 border border-transbot-teal/20 rounded-full responsive-container"
              >
                <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse responsive-container"></div>
                <span className="text-sm font-semibold text-transbot-teal responsive-container">250 AI AGENTS WORKING 24/7</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold text-transbot-text-primary leading-tight responsive-container"
              >
                Trans Bot AI{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent responsive-container">
                  Supercharges
                </span>{' '}
                Your Trucking Company
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-transbot-text-secondary leading-relaxed responsive-container"
              >
                Revolutionize your logistics with AI-powered automation, intelligent routing, 
                and real-time optimization that drives profitability and efficiency.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 responsive-container"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-transbot-border/20 shadow-transbot responsive-container"
                  >
                    <div className="flex items-center gap-3 responsive-container">
                      <div className="p-2 rounded-lg bg-transbot-sky/10 responsive-container">
                        <stat.icon className="w-5 h-5 text-transbot-sky responsive-container" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-transbot-text-primary responsive-container">{stat.value}</div>
                        <div className="text-sm text-transbot-text-secondary responsive-container">{stat.label}</div>
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
                className="flex flex-col sm:flex-row gap-4 responsive-container"
              >
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-200 shadow-transbot hover:shadow-transbot-lg responsive-container" aria-label="Button">
                  Experience AI Power
                  <ArrowRight className="w-5 h-5 responsive-container" />
                </button>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-transbot-neutral-dark text-white font-semibold rounded-xl hover:bg-transbot-text-primary transition-all duration-200 responsive-container" aria-label="Button">
                  <Play className="w-5 h-5 responsive-container" />
                  Watch AI Demo
                </button>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative responsive-container"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-transbot-sky/5 to-transbot-teal/5 rounded-3xl responsive-container"></div>
              
              {/* Main Visual */}
              <div className="relative p-8 responsive-container">
                {/* Network Visualization */}
                <div className="relative w-full h-96 responsive-container">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 responsive-container">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-transbot-lg responsive-container">
                      <Brain className="w-10 h-10 text-white responsive-container" />
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
                      className="absolute responsive-container"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-transbot border-2 border-transbot-sky/20 responsive-container">
                        <node.icon className="w-6 h-6 text-transbot-sky responsive-container" />
                      </div>
                      <div className="text-xs text-transbot-text-secondary text-center mt-2 font-medium responsive-container">
                        {node.label}
                      </div>
                    </motion.div>
                  ))}

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full responsive-container">
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
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-transbot border border-transbot-border/20 responsive-container"
                >
                  <div className="text-sm font-semibold text-transbot-text-primary responsive-container">250/250</div>
                  <div className="text-xs text-transbot-text-secondary responsive-container">Agents Active</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 }}
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-transbot border border-transbot-border/20 responsive-container"
                >
                  <div className="space-y-1 responsive-container">
                    <div className="text-xs text-transbot-text-secondary responsive-container">Agent 0: Predicting demand</div>
                    <div className="text-xs text-transbot-text-secondary responsive-container">Agent 4: Learning patterns</div>
                    <div className="text-xs text-transbot-text-secondary responsive-container">Agent 5: Processing data</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 responsive-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4 responsive-container">
              Why Choose Trans Bot AI?
            </h2>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto responsive-container">
              Experience the future of logistics with our comprehensive AI-powered platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 responsive-container">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-white rounded-2xl shadow-transbot border border-transbot-border/20 hover:shadow-transbot-lg transition-all duration-300 responsive-container"
              >
                <div className="p-3 rounded-xl bg-transbot-sky/10 w-fit mb-6 responsive-container">
                  <feature.icon className="w-8 h-8 text-transbot-sky responsive-container" />
                </div>
                <h3 className="text-xl font-bold text-transbot-text-primary mb-3 responsive-container">
                  {feature.title}
                </h3>
                <p className="text-transbot-text-secondary responsive-container">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-transbot-sky/5 to-transbot-teal/5 responsive-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4 responsive-container">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-transbot-text-secondary responsive-container">
              See what our customers say about Trans Bot AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 responsive-container">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-8 bg-white rounded-2xl shadow-transbot border border-transbot-border/20 responsive-container"
              >
                <div className="flex items-center gap-1 mb-4 responsive-container">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current responsive-container" />
                  ))}
                </div>
                <p className="text-transbot-text-secondary mb-6 italic responsive-container">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-transbot-text-primary responsive-container">{testimonial.name}</div>
                  <div className="text-sm text-transbot-text-secondary responsive-container">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary responsive-container">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 responsive-container"
          >
            <h2 className="text-4xl font-bold text-white responsive-container">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-xl text-white/90 responsive-container">
              Join thousands of companies already using Trans Bot AI to optimize their operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="px-8 py-4 bg-white text-transbot-sky font-semibold rounded-xl hover:bg-transbot-neutral-light transition-all duration-200 shadow-transbot responsive-container" aria-label="Button">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-transbot-sky transition-all duration-200 responsive-container" aria-label="Button">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
