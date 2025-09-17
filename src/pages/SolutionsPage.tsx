import { motion } from 'framer-motion'
import { 
  Truck, 
  Warehouse, 
  Route, 
  BarChart3, 
  Clock, 
  Shield, 
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp
} from 'lucide-react'

const SolutionsPage = React.memo(function SolutionsPage() {
  const solutions = [
    {
      icon: Truck,
      title: 'Transportation Management',
      description: 'End-to-end transportation optimization with AI-powered load matching and route planning.',
      features: ['Load Optimization', 'Route Planning', 'Real-time Tracking', 'Fleet Management'],
      path: '/solutions/transportation'
    },
    {
      icon: Warehouse,
      title: 'Warehouse Management',
      description: 'Smart warehouse operations with automated inventory management and optimization.',
      features: ['Inventory Control', 'Automated Picking', 'Space Optimization', 'Quality Control'],
      path: '/solutions/warehouse'
    },
    {
      icon: Route,
      title: 'Fleet Management',
      description: 'Complete fleet visibility and control with predictive maintenance and driver optimization.',
      features: ['Vehicle Tracking', 'Maintenance Alerts', 'Driver Performance', 'Fuel Optimization'],
      path: '/solutions/fleet'
    },
    {
      icon: BarChart3,
      title: 'Load Optimization',
      description: 'AI-powered load planning and capacity optimization for maximum efficiency.',
      features: ['Load Matching', 'Capacity Planning', 'Weight Distribution', 'Cost Optimization'],
      path: '/solutions/load-optimization'
    },
    {
      icon: Clock,
      title: 'Route Planning',
      description: 'Intelligent route optimization with real-time traffic and weather integration.',
      features: ['Dynamic Routing', 'Traffic Integration', 'Weather Alerts', 'ETAs'],
      path: '/solutions/route-planning'
    },
    {
      icon: Globe,
      title: 'Real-time Tracking',
      description: 'Live shipment monitoring with comprehensive visibility across your supply chain.',
      features: ['Live Updates', 'Geofencing', 'Delivery Alerts', 'Customer Portal'],
      path: '/solutions/tracking'
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Increase Efficiency',
      description: 'Reduce operational costs by up to 30% with AI-powered optimization',
      stat: '30%'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate routine tasks and focus on strategic decision-making',
      stat: '50%'
    },
    {
      icon: Shield,
      title: 'Reduce Risk',
      description: 'Predictive analytics help prevent issues before they occur',
      stat: '40%'
    },
    {
      icon: Users,
      title: 'Scale Operations',
      description: 'Handle growing demand without proportional increase in resources',
      stat: '3x'
    }
  ]

  const testimonials = [
    {
      name: 'David Martinez',
      role: 'Operations Manager, Metro Logistics',
      content: 'Trans Bot AI transformed our operations. We\'ve seen a 35% increase in efficiency.',
      rating: 5
    },
    {
      name: 'Lisa Chen',
      role: 'CEO, Express Freight',
      content: 'The AI insights have revolutionized our route planning and cost management.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-bg-light via-white to-transbot-neutral-light responsive-container">
      {/* Hero Section */}
      <section className="pt-20 pb-16 responsive-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6 responsive-container">
              Comprehensive{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent responsive-container">
                Logistics Solutions
              </span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto leading-relaxed responsive-container">
              Transform your logistics operations with our AI-powered platform designed for modern supply chains
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 responsive-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 bg-white rounded-2xl shadow-transbot border border-transbot-border/20 hover:shadow-transbot-lg transition-all duration-300 responsive-container"
              >
                <div className="p-4 rounded-xl bg-transbot-sky/10 w-fit mb-6 group-hover:bg-transbot-sky/20 transition-colors duration-300 responsive-container">
                  <solution.icon className="w-8 h-8 text-transbot-sky responsive-container" />
                </div>
                
                <h3 className="text-2xl font-bold text-transbot-text-primary mb-4 responsive-container">
                  {solution.title}
                </h3>
                
                <p className="text-transbot-text-secondary mb-6 leading-relaxed responsive-container">
                  {solution.description}
                </p>

                <div className="space-y-2 mb-6 responsive-container">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 responsive-container">
                      <CheckCircle className="w-4 h-4 text-transbot-teal responsive-container" />
                      <span className="text-sm text-transbot-text-secondary responsive-container">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={solution.path}
                  className="inline-flex items-center gap-2 text-transbot-sky hover:text-transbot-navy font-semibold transition-colors duration-200 responsive-container"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 responsive-container" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Proven Results
            </h2>
            <p className="text-xl text-transbot-text-secondary responsive-container">
              See the measurable impact of our solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 responsive-container"
              >
                <div className="p-4 rounded-full bg-gradient-primary w-fit mx-auto mb-4 responsive-container">
                  <benefit.icon className="w-8 h-8 text-white responsive-container" />
                </div>
                <div className="text-4xl font-bold text-transbot-sky mb-2 responsive-container">{benefit.stat}</div>
                <h3 className="text-xl font-bold text-transbot-text-primary mb-2 responsive-container">{benefit.title}</h3>
                <p className="text-transbot-text-secondary responsive-container">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              What Our Customers Say
            </h2>
            <p className="text-xl text-transbot-text-secondary responsive-container">
              Real results from real companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
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
                <p className="text-transbot-text-secondary mb-6 italic text-lg responsive-container">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-transbot-text-primary text-lg responsive-container">{testimonial.name}</div>
                  <div className="text-transbot-text-secondary responsive-container">{testimonial.role}</div>
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
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl text-white/90 responsive-container">
              Discover how our solutions can optimize your logistics and drive growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="px-8 py-4 bg-white text-transbot-sky font-semibold rounded-xl hover:bg-transbot-neutral-light transition-all duration-200 shadow-transbot responsive-container" aria-label="Button">
                Get Custom Demo
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-transbot-sky transition-all duration-200 responsive-container" aria-label="Button">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}