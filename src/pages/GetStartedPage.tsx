import { motion } from 'framer-motion'
import { SubdomainApplicationForm } from '../components/SubdomainApplicationForm'
import { 
  Globe, 
  Building, 
  Users, 
  Zap, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Clock
} from 'lucide-react'

export function GetStartedPage() {
  const features = [
    {
      icon: Globe,
      title: 'Custom Subdomain',
      description: 'Get your own branded subdomain like yourcompany.transbotai.com'
    },
    {
      icon: Building,
      title: '25 Specialized Portals',
      description: 'Access to all our logistics and transportation management portals'
    },
    {
      icon: Users,
      title: 'Multi-User Access',
      description: 'Invite your team members with role-based permissions'
    },
    {
      icon: Zap,
      title: 'AI-Powered Features',
      description: 'Leverage our 250 AI agents for intelligent automation'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with data encryption and compliance'
    },
    {
      icon: Award,
      title: '24/7 Support',
      description: 'Dedicated support team to help you succeed'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Submit Application',
      description: 'Fill out our simple application form with your company details'
    },
    {
      number: '02',
      title: 'Review Process',
      description: 'Our team reviews your application within 24-48 hours'
    },
    {
      number: '03',
      title: 'Get Your Subdomain',
      description: 'Receive your custom subdomain and portal access credentials'
    },
    {
      number: '04',
      title: 'Start Using',
      description: 'Begin managing your logistics with our AI-powered platform'
    }
  ]

  const stats = [
    { label: 'Active Companies', value: '500+', icon: Building },
    { label: 'Subdomains Created', value: '1,200+', icon: Globe },
    { label: 'Portals Deployed', value: '25,000+', icon: Zap },
    { label: 'Success Rate', value: '99.8%', icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-transbot-text-primary mb-6">
              Get Your Own
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Trans Bot AI</span>
              <br />Subdomain
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto mb-8">
              Create your branded logistics platform with access to all 25 specialized portals. 
              Join hundreds of companies already using Trans Bot AI to transform their operations.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-transbot-text-primary">{stat.value}</div>
                  <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-transbot-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-transbot-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-transbot-text-primary mb-4">
                How It Works
              </h2>
              <p className="text-transbot-text-secondary max-w-2xl mx-auto">
                Getting your own Trans Bot AI subdomain is simple and fast
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-transbot-text-secondary text-sm">
                    {step.description}
                  </p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-transbot-sky mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-transbot-text-primary mb-4">
                What Our Customers Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Trans Bot AI transformed our logistics operations. The custom subdomain made it feel like our own platform.",
                  author: "Sarah Johnson",
                  company: "TechLogistics Inc.",
                  rating: 5
                },
                {
                  quote: "The 25 portals give us everything we need. Our team loves the intuitive interface and AI features.",
                  author: "Mike Chen",
                  company: "Global Shipping Co.",
                  rating: 5
                },
                {
                  quote: "Setup was incredibly fast. We had our subdomain and all portals running within 48 hours.",
                  author: "Emily Rodriguez",
                  company: "Fleet Management Ltd.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/50"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-transbot-text-secondary mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="font-semibold text-transbot-text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-transbot-text-secondary">
                      {testimonial.company}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <SubdomainApplicationForm />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-primary rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Logistics?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Join hundreds of companies already using Trans Bot AI
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm opacity-80">
                <Clock className="w-4 h-4" />
                <span>Average setup time: 24-48 hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
