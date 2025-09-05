import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Lightbulb,
  Shield,
  Brain,
  Building,
  Cpu
} from 'lucide-react'

export default function CompanyPage() {
  const values = [
    {
      icon: Brain,
      title: 'AI Innovation',
      description: 'We push the boundaries of artificial intelligence to solve complex logistics challenges.'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Our clients\' success is our success. We\'re committed to delivering exceptional value.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Enterprise-grade security and reliability you can count on for your critical operations.'
    },
    {
      icon: Lightbulb,
      title: 'Continuous Innovation',
      description: 'We never stop improving, evolving our platform to meet tomorrow\'s challenges.'
    }
  ]

  const leadership = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Engineering at Amazon Logistics, 15+ years in supply chain optimization.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher with 20+ years experience, former Google DeepMind engineer.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'Emily Johnson',
      role: 'VP of Product',
      bio: 'Product leader with deep logistics expertise, former Uber Freight executive.',
      image: '/api/placeholder/300/300'
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Full-stack engineering leader, former Microsoft Azure architect.',
      image: '/api/placeholder/300/300'
    }
  ]

  const stats = [
    { label: 'Years of Innovation', value: '5+', icon: Award },
    { label: 'Enterprise Clients', value: '500+', icon: Building },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'AI Models Deployed', value: '50+', icon: Cpu }
  ]

  const milestones = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Trans Bot AI was founded with a vision to revolutionize logistics through AI.'
    },
    {
      year: '2020',
      title: 'First AI Model',
      description: 'Launched our first route optimization AI model, achieving 15% efficiency gains.'
    },
    {
      year: '2021',
      title: 'Series A Funding',
      description: 'Raised $25M to accelerate AI development and expand our platform.'
    },
    {
      year: '2022',
      title: 'Enterprise Launch',
      description: 'Launched enterprise-grade platform serving Fortune 500 companies.'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to 25+ countries with localized AI models and support.'
    },
    {
      year: '2024',
      title: 'AI Revolution',
      description: 'Deployed 50+ AI models, processing over 1M logistics decisions daily.'
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
              About{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Trans Bot AI
              </span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto leading-relaxed">
              We're the AI software company powering the future of logistics. Our intelligent platform 
              helps logistics companies optimize operations, reduce costs, and scale efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="p-4 rounded-full bg-transbot-sky/10 w-fit mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-transbot-sky" />
                </div>
                <div className="text-4xl font-bold text-transbot-sky mb-2">{stat.value}</div>
                <div className="text-transbot-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-transbot-text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-transbot-text-secondary mb-6 leading-relaxed">
                To revolutionize logistics through artificial intelligence, empowering companies 
                to operate more efficiently, sustainably, and profitably in an increasingly 
                complex global supply chain.
              </p>
              <p className="text-lg text-transbot-text-secondary leading-relaxed">
                We believe that AI should augment human decision-making, not replace it. 
                Our platform provides intelligent insights that help logistics professionals 
                make better, faster decisions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-transbot-sky/10 to-transbot-teal/10 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-transbot-text-primary mb-2">AI-First</h3>
                    <p className="text-sm text-transbot-text-secondary">Every solution powered by advanced AI</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-transbot-text-primary mb-2">Results-Driven</h3>
                    <p className="text-sm text-transbot-text-secondary">Measurable impact on your operations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-transbot-text-primary mb-2">Enterprise-Grade</h3>
                    <p className="text-sm text-transbot-text-secondary">Security and reliability you can trust</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-transbot-text-primary mb-2">Global Scale</h3>
                    <p className="text-sm text-transbot-text-secondary">Serving logistics companies worldwide</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-white rounded-2xl shadow-transbot border border-transbot-border/20 hover:shadow-transbot-lg transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-transbot-sky/10 w-fit mb-6">
                  <value.icon className="w-8 h-8 text-transbot-sky" />
                </div>
                <h3 className="text-xl font-bold text-transbot-text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-transbot-text-secondary">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              The visionaries behind Trans Bot AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-48 h-48 bg-gradient-to-br from-transbot-sky/20 to-transbot-teal/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-16 h-16 text-transbot-sky" />
                </div>
                <h3 className="text-xl font-bold text-transbot-text-primary mb-2">
                  {leader.name}
                </h3>
                <div className="text-transbot-sky font-semibold mb-3">
                  {leader.role}
                </div>
                <p className="text-transbot-text-secondary text-sm">
                  {leader.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              Key milestones in our mission to revolutionize logistics
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-transbot border border-transbot-border/20">
                      <div className="text-2xl font-bold text-transbot-sky mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-transbot-text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-transbot-text-secondary">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-gradient-primary rounded-full border-4 border-white shadow-transbot z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
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
              Join the logistics leaders who trust Trans Bot AI to power their operations
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