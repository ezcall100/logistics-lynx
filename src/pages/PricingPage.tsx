import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Star, 
  Zap, 
  Users, 
  Building, 
  ArrowRight,
  Shield,
  Clock,
  Globe,
  BarChart3,
  Brain,
  Target,
  TrendingUp
} from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for small businesses getting started',
      icon: Zap,
      features: [
        'Up to 10 vehicles',
        'Basic route optimization',
        'Real-time tracking',
        'Email support',
        'Mobile app access',
        'Basic reporting'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$299',
      period: '/month',
      description: 'Advanced features for growing companies',
      icon: Users,
      features: [
        'Up to 50 vehicles',
        'Advanced AI optimization',
        'Predictive analytics',
        'Priority support',
        'API access',
        'Custom reporting',
        'Multi-user accounts',
        'Integration support'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Full-scale solution for large operations',
      icon: Building,
      features: [
        'Unlimited vehicles',
        'Custom AI models',
        'Dedicated support',
        'White-label options',
        'Custom integrations',
        'Advanced security',
        'SLA guarantees',
        'Training & onboarding'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Optimization',
      description: 'Advanced machine learning algorithms optimize your routes and operations'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with SOC 2 compliance and data encryption'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Operate seamlessly across borders with international compliance'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive insights and reporting to drive better decisions'
    }
  ]

  const faqs = [
    {
      question: 'Can I change plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 30-day free trial for all plans with no credit card required.'
    },
    {
      question: 'What support is included?',
      answer: 'All plans include email support. Professional and Enterprise plans include priority support.'
    },
    {
      question: 'Do you offer custom pricing?',
      answer: 'Yes, we offer custom pricing for Enterprise customers with specific requirements.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-bg-light via-white to-transbot-neutral-light">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6">
              Simple, Transparent{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your business needs. All plans include our core AI-powered features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl shadow-transbot border transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-primary text-white border-transparent scale-105' 
                    : 'bg-white border-transbot-border/20 hover:shadow-transbot-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-transbot-teal text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`p-4 rounded-xl w-fit mx-auto mb-4 ${
                    plan.popular ? 'bg-white/20' : 'bg-transbot-sky/10'
                  }`}>
                    <plan.icon className={`w-8 h-8 ${
                      plan.popular ? 'text-white' : 'text-transbot-sky'
                    }`} />
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.popular ? 'text-white' : 'text-transbot-text-primary'
                  }`}>
                    {plan.name}
                  </h3>
                  
                  <p className={`mb-4 ${
                    plan.popular ? 'text-white/90' : 'text-transbot-text-secondary'
                  }`}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline justify-center">
                    <span className={`text-5xl font-bold ${
                      plan.popular ? 'text-white' : 'text-transbot-text-primary'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-lg ml-1 ${
                      plan.popular ? 'text-white/80' : 'text-transbot-text-secondary'
                    }`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${
                        plan.popular ? 'text-white' : 'text-transbot-teal'
                      }`} />
                      <span className={`${
                        plan.popular ? 'text-white/90' : 'text-transbot-text-secondary'
                      }`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white text-transbot-sky hover:bg-transbot-neutral-light'
                    : 'bg-gradient-primary text-white hover:opacity-90'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
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
              All Plans Include
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              Core features available across all pricing tiers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="p-4 rounded-full bg-transbot-sky/10 w-fit mx-auto mb-4">
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

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-transbot-sky/5 to-transbot-teal/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-transbot border border-transbot-border/20"
              >
                <h3 className="text-lg font-semibold text-transbot-text-primary mb-3">
                  {faq.question}
                </h3>
                <p className="text-transbot-text-secondary">
                  {faq.answer}
                </p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of companies already using Trans Bot AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-transbot-sky font-semibold rounded-xl hover:bg-transbot-neutral-light transition-all duration-200 shadow-transbot">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-transbot-sky transition-all duration-200">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}