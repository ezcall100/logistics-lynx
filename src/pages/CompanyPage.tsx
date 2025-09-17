import React from 'react';
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  Shield, 
  ArrowRight,
  Play,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Brain,
  Briefcase,
  MessageCircle
} from 'lucide-react'

const CompanyPage = React.memo(function CompanyPage() {
  const navigate = useNavigate()
  const [activeSection] = useState('about')

  const sections = [
    { id: 'about', label: 'About Us', icon: Users, route: '/company/about' },
    { id: 'leadership', label: 'Leadership', icon: Award, route: '/company/leadership' },
    { id: 'careers', label: 'Careers', icon: Briefcase, route: '/company/careers' },
    { id: 'contact', label: 'Contact', icon: MessageCircle, route: '/company/contact' },
    { id: 'press', label: 'Press', icon: Globe, route: '/company/press' },
    { id: 'investors', label: 'Investors', icon: Building2, route: '/company/investors' },
    { id: 'partners', label: 'Partners', icon: Users, route: '/company/partners' },
    { id: 'security', label: 'Security', icon: Shield, route: '/company/security' }
  ]

  const leadership = [
    {
      name: 'Sarah Chen',
      position: 'Chief Executive Officer',
      bio: 'Former VP of Engineering at Amazon, leading Trans Bot AI\'s vision for AI-powered logistics transformation.',
      image: '/api/placeholder/300/300',
      linkedin: '#',
      achievements: ['15+ years in logistics', 'Led 3 successful exits', 'AI innovation expert']
    },
    {
      name: 'Marcus Rodriguez',
      position: 'Chief Technology Officer',
      bio: 'Ex-Google AI researcher with expertise in machine learning and autonomous systems for transportation.',
      image: '/api/placeholder/300/300',
      linkedin: '#',
      achievements: ['PhD in AI', '50+ patents', 'ML systems architect']
    },
    {
      name: 'Dr. Emily Watson',
      position: 'Chief Data Officer',
      bio: 'Former McKinsey partner specializing in data-driven logistics optimization and predictive analytics.',
      image: '/api/placeholder/300/300',
      linkedin: '#',
      achievements: ['PhD in Statistics', 'Data science pioneer', 'Industry thought leader']
    },
    {
      name: 'James Park',
      position: 'Chief Operating Officer',
      bio: 'Former COO at FedEx, bringing 20+ years of operational excellence in global logistics.',
      image: '/api/placeholder/300/300',
      linkedin: '#',
      achievements: ['Global operations expert', 'Supply chain optimization', 'Team leadership']
    }
  ]

  const values = [
    {
      icon: Brain,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and machine learning in logistics.',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Our customers\' success is our success. We build solutions that deliver real value.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and data protection for our clients.',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'We\'re building solutions that make logistics more efficient and sustainable worldwide.',
      color: 'from-orange-500 to-red-600'
    }
  ]


  const careers = [
    {
      title: 'Senior AI Engineer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Lead development of next-generation AI agents for logistics optimization.',
      requirements: ['5+ years ML experience', 'Python, TensorFlow', 'Logistics domain knowledge']
    },
    {
      title: 'Product Manager',
      location: 'Remote',
      type: 'Full-time',
      department: 'Product',
      description: 'Drive product strategy and roadmap for our AI-powered logistics platform.',
      requirements: ['3+ years PM experience', 'B2B SaaS background', 'Technical understanding']
    },
    {
      title: 'Customer Success Manager',
      location: 'New York, NY',
      type: 'Full-time',
      department: 'Customer Success',
      description: 'Help customers maximize value from our AI solutions and drive adoption.',
      requirements: ['2+ years CS experience', 'Logistics industry knowledge', 'Strong communication']
    }
  ]

  const renderHeroSection = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 responsive-container">
      {/* Animated Background */}
      <div className="absolute inset-0 responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 responsive-container"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center responsive-container"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 responsive-container">
            <Building2 className="w-4 h-4 mr-2 responsive-container" />
            About Trans Bot AI
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight responsive-container">
            Pioneering the Future of
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent responsive-container">
              AI-Powered Logistics
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed responsive-container">
            We're building the world's most intelligent logistics platform, powered by advanced AI agents 
            that optimize, automate, and revolutionize how goods move around the globe.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 responsive-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/company/careers')}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 responsive-container"
            >
              <Briefcase className="w-5 h-5 mr-2 responsive-container" />
              Join Our Team
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/company/contact')}
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 responsive-container"
            >
              <MessageCircle className="w-5 h-5 mr-2 responsive-container" />
              Get in Touch
            </motion.button>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 responsive-container"
        >
          {[
            { label: 'Team Members', value: '150+', icon: Users },
            { label: 'Countries', value: '15', icon: Globe },
            { label: 'AI Agents', value: '12', icon: Brain },
            { label: 'Years Experience', value: '20+', icon: Award }
          ].map((stat, index) => (
            <div key={index} className="text-center responsive-container">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 responsive-container">
                <stat.icon className="w-8 h-8 text-white responsive-container" />
              </div>
              <div className="text-3xl font-bold text-white mb-2 responsive-container">{stat.value}</div>
              <div className="text-white/70 responsive-container">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )

  const renderNavigation = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
      <div className="flex flex-wrap justify-center gap-4 responsive-container">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(section.route)}
            className="flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-blue-300 responsive-container"
          >
            <section.icon className="w-5 h-5 mr-2 responsive-container" />
            {section.label}
          </motion.button>
        ))}
      </div>
    </div>
  )

  const renderAboutSection = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 responsive-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center responsive-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6 responsive-container">Our Story</h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed responsive-container">
            Founded in 2020 by a team of AI researchers and logistics experts, Trans Bot AI emerged from a simple 
            observation: the logistics industry was ripe for disruption through artificial intelligence.
          </p>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed responsive-container">
            Today, we're proud to serve over 2,500 customers worldwide, helping them optimize their operations, 
            reduce costs, and deliver better service through our suite of intelligent AI agents.
          </p>
          <div className="flex items-center space-x-6 responsive-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/solutions')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 responsive-container"
            >
              Explore Solutions
              <ArrowRight className="w-4 h-4 ml-2 responsive-container" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/demo')}
              className="inline-flex items-center px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-300 responsive-container"
            >
              <Play className="w-4 h-4 mr-2 responsive-container" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative responsive-container"
        >
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white responsive-container">
            <h3 className="text-2xl font-bold mb-4 responsive-container">Our Mission</h3>
            <p className="text-lg leading-relaxed mb-6 responsive-container">
              To revolutionize global logistics through intelligent AI agents that optimize, automate, 
              and transform how goods move around the world.
            </p>
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center responsive-container">
                <Target className="w-6 h-6 responsive-container" />
              </div>
              <div>
                <div className="font-semibold responsive-container">Making Logistics Smarter</div>
                <div className="text-sm opacity-80 responsive-container">One AI agent at a time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )

  const renderValuesSection = () => (
    <div className="bg-slate-50 py-20 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 responsive-container"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6 responsive-container">Our Values</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto responsive-container">
            These core values guide everything we do and shape how we build products, serve customers, and grow as a team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 responsive-container"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                <value.icon className="w-8 h-8 text-white responsive-container" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 responsive-container">{value.title}</h3>
              <p className="text-slate-600 leading-relaxed responsive-container">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLeadershipSection = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 responsive-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16 responsive-container"
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-6 responsive-container">Leadership Team</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto responsive-container">
          Meet the visionary leaders driving innovation and growth at Trans Bot AI.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
        {leadership.map((leader, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center responsive-container"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center responsive-container">
              <Users className="w-12 h-12 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 responsive-container">{leader.name}</h3>
            <p className="text-blue-600 font-semibold mb-4 responsive-container">{leader.position}</p>
            <p className="text-slate-600 text-sm leading-relaxed mb-4 responsive-container">{leader.bio}</p>
            <div className="space-y-2 responsive-container">
              {leader.achievements.map((achievement, idx) => (
                <div key={idx} className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded responsive-container">
                  {achievement}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderCareersSection = () => (
    <div className="bg-slate-50 py-20 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 responsive-container"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6 responsive-container">Join Our Team</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto responsive-container">
            We're looking for passionate individuals who want to shape the future of AI-powered logistics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
          {careers.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 responsive-container"
            >
              <div className="flex items-start justify-between mb-4 responsive-container">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 responsive-container">{job.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 responsive-container">
                    <span className="flex items-center responsive-container">
                      <MapPin className="w-4 h-4 mr-1 responsive-container" />
                      {job.location}
                    </span>
                    <span className="flex items-center responsive-container">
                      <Clock className="w-4 h-4 mr-1 responsive-container" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium responsive-container">
                  {job.department}
                </span>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed responsive-container">{job.description}</p>
              <div className="mb-6 responsive-container">
                <h4 className="font-semibold text-slate-900 mb-3 responsive-container">Requirements:</h4>
                <div className="flex flex-wrap gap-2 responsive-container">
                  {job.requirements.map((req, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm responsive-container">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 responsive-container"
              >
                Apply Now
                <ArrowRight className="w-4 h-4 ml-2 responsive-container" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContactSection = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 responsive-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 responsive-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6 responsive-container">Get in Touch</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed responsive-container">
            Ready to transform your logistics operations? We'd love to hear from you and discuss how our AI solutions can help your business.
          </p>
          
          <div className="space-y-6 responsive-container">
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center responsive-container">
                <MapPin className="w-6 h-6 text-white responsive-container" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 responsive-container">Headquarters</div>
                <div className="text-slate-600 responsive-container">San Francisco, CA</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center responsive-container">
                <Phone className="w-6 h-6 text-white responsive-container" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 responsive-container">Phone</div>
                <div className="text-slate-600 responsive-container">+1 (555) 123-4567</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center responsive-container">
                <Mail className="w-6 h-6 text-white responsive-container" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 responsive-container">Email</div>
                <div className="text-slate-600 responsive-container">hello@transbotai.com</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg responsive-container"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 responsive-container">Send us a message</h3>
          <form className="space-y-6 responsive-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 responsive-container">First Name</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 responsive-container">Last Name</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 responsive-container">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 responsive-container">Company</label>
              <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 responsive-container">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 responsive-container"
            >
              Send Message
              <ArrowRight className="w-4 h-4 ml-2 responsive-container" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <>
            {renderAboutSection()}
            {renderValuesSection()}
          </>
        )
      case 'mission':
        return renderAboutSection()
      case 'leadership':
        return renderLeadershipSection()
      case 'careers':
        return renderCareersSection()
      case 'contact':
        return renderContactSection()
      default:
        return renderAboutSection()
    }
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-white responsive-container">
      {renderHeroSection()}
      {renderNavigation()}
      {renderContent()}
    </div>
  )
}