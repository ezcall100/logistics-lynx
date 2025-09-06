import { motion } from 'framer-motion'
import { Brain, Zap, Shield, BarChart3, Users, Globe } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: '250 AI agents working 24/7 to optimize your operations, predict demand, and automate decision-making.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast Setup',
    description: 'Get up and running in minutes, not months. Our intuitive interface requires no training.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance, end-to-end encryption, and regular audits.'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Make data-driven decisions with live dashboards, predictive insights, and custom reports.'
  },
  {
    icon: Users,
    title: 'Unified Team Collaboration',
    description: 'Connect your entire team with role-based access, real-time communication, and workflow automation.'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Support for 6 languages, multiple currencies, and compliance with international regulations.'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-[#0F1436]">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transbot-text-primary mb-6">
            All-in-one TMS software
          </h2>
          <p className="text-xl text-[#EAF2FF]/80 max-w-3xl mx-auto">
            Everything you need to run a modern trucking company, powered by artificial intelligence and designed for scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="card group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#00D4FF]/10 group-hover:bg-[#00D4FF]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#00D4FF]" />
                </div>
                <h3 className="text-xl font-semibold text-transbot-text-primary">
                  {feature.title}
                </h3>
              </div>
              <p className="text-[#EAF2FF]/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-transbot-text-primary mb-4">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-[#EAF2FF]/70 mb-6">
              Join thousands of trucking companies already using TransBot AI to streamline their operations and increase profitability.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 text-lg px-8 py-4"
            >
              Start Your Free Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
