import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowRight, 
  Play, 
  Star, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  BarChart3, 
  Truck, 
  Package, 
  CheckCircle,
  Route,
  Brain,
  X,
  Sparkles
} from 'lucide-react'

const OutstandingHomePage: React.FC = () => {
  const navigate = useNavigate()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [stats, setStats] = useState({
    companies: 0,
    savings: 0,
    efficiency: 0,
    satisfaction: 0
  })

  // Animated stats counter
  useEffect(() => {
    const animateStats = () => {
      const targets = { companies: 50000, savings: 35, efficiency: 45, satisfaction: 98 }
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setStats({
          companies: Math.floor(targets.companies * progress),
          savings: Math.floor(targets.savings * progress),
          efficiency: Math.floor(targets.efficiency * progress),
          satisfaction: Math.floor(targets.satisfaction * progress)
        })

        if (step >= steps) {
          clearInterval(timer)
        }
      }, stepDuration)
    }

    animateStats()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Global Logistics Corp",
      role: "CEO",
      content: "Trans Bot AI transformed our operations. We've seen a 40% reduction in delivery times and 25% cost savings in just 6 months.",
      avatar: "👩‍💼",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "Swift Transport",
      role: "Operations Director",
      content: "The AI-powered route optimization is incredible. Our drivers love the real-time updates and we've eliminated 90% of delivery delays.",
      avatar: "👨‍💻",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      company: "EcoFreight Solutions",
      role: "Fleet Manager",
      content: "Trans Bot AI's predictive analytics helped us reduce fuel consumption by 30% while maintaining our delivery standards. Game-changing technology.",
      avatar: "👩‍🚀",
      rating: 5
    }
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms that continuously optimize your logistics operations",
      benefits: ["Real-time optimization", "Predictive analytics", "Automated decision making"]
    },
    {
      icon: Route,
      title: "Smart Route Planning",
      description: "Dynamic routing that considers traffic, weather, and delivery windows for maximum efficiency",
      benefits: ["25% faster deliveries", "15% fuel savings", "Real-time updates"]
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights and reporting to drive data-driven decisions across your operations",
      benefits: ["Performance metrics", "Cost analysis", "Trend forecasting"]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance with industry standards",
      benefits: ["SOC 2 compliance", "Data encryption", "Access controls"]
    },
    {
      icon: Zap,
      title: "Real-Time Tracking",
      description: "Complete visibility into your fleet with GPS tracking and driver behavior monitoring",
      benefits: ["Live location updates", "Driver analytics", "Incident alerts"]
    },
    {
      icon: Globe,
      title: "Global Scalability",
      description: "Built to scale from local operations to global enterprise deployments",
      benefits: ["Multi-region support", "Cloud infrastructure", "API integration"]
    }
  ]

  const solutions = [
    {
      title: "Transportation Management",
      description: "Complete TMS solution with AI integration",
      icon: Truck,
      stats: "35% cost reduction",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Fleet Optimization",
      description: "Maximize fleet efficiency with intelligent automation",
      icon: Route,
      stats: "45% efficiency gain",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Predictive Analytics",
      description: "Forecast demand and optimize operations",
      icon: TrendingUp,
      stats: "30% better forecasting",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Load Matching",
      description: "Smart matching of loads with carriers",
      icon: Package,
      stats: "50% faster matching",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const handleGetStarted = () => {
    navigate('/get-started')
  }

  const handleWatchDemo = () => {
    setIsVideoPlaying(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Logistics Platform
                </motion.div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
                  Revolutionize Your
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {" "}Logistics
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                  Transform your transportation business with AI-powered fleet management, 
                  route optimization, and real-time analytics for unparalleled reliability and efficiency.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWatchDemo}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">{stats.companies.toLocaleString()}+</div>
                  <div className="text-sm text-slate-600">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{stats.savings}%</div>
                  <div className="text-sm text-slate-600">Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stats.efficiency}%</div>
                  <div className="text-sm text-slate-600">Efficiency Gain</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-900">Live Operations</h3>
                    <div className="flex items-center text-green-600 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-slate-600">Active Routes</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">98.7%</div>
                      <div className="text-sm text-slate-600">On-Time Delivery</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">$2.4M</div>
                      <div className="text-sm text-slate-600">Cost Saved</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">45%</div>
                      <div className="text-sm text-slate-600">Efficiency Gain</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Route Optimization</span>
                      <span className="text-green-600 font-semibold">+25% faster</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Fuel Efficiency</span>
                      <span className="text-blue-600 font-semibold">+18% savings</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Driver Satisfaction</span>
                      <span className="text-purple-600 font-semibold">+32% improvement</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Why Choose Trans Bot AI?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with deep industry expertise 
              to deliver unprecedented results for your logistics operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Complete Solutions for Every Need
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From transportation management to predictive analytics, we provide comprehensive 
              solutions that address every aspect of your logistics operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-3">{solution.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{solution.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        {solution.stats}
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See what our customers are saying about their transformation with Trans Bot AI.
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 lg:p-12 rounded-3xl max-w-4xl mx-auto"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl lg:text-2xl text-slate-700 leading-relaxed mb-8">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{testimonials[currentTestimonial].avatar}</div>
                  <div>
                    <div className="font-semibold text-slate-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-slate-600">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of companies already using Trans Bot AI to revolutionize their operations. 
              Start your free trial today and experience the future of logistics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWatchDemo}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-blue-100 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Free 30-day trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Setup in minutes
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Trans Bot AI Demo</h3>
                <button
                  onClick={() => setIsVideoPlaying(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>
              
              <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-slate-600">Demo video would play here</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OutstandingHomePage
