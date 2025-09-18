import { motion } from 'framer-motion'
import { 
  Brain, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  Facebook,
  ArrowRight,
  Truck,
  Zap,
  Shield,
  Globe,
  Award,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  MessageSquare,
  Download,
  Play
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface SubPage {
  name: string
  path: string
  icon?: unknown
  description?: string
}

interface MenuSection {
  title: string
  path: string
  subpages: SubPage[]
  icon?: unknown
}

export function Footer() {
  const menuSections: MenuSection[] = [
    {
      title: 'Solutions',
      path: '/solutions',
      icon: Truck,
      subpages: [
        { name: 'Transportation Management', path: '/solutions/transportation', icon: Truck, description: 'Complete TMS solution' },
        { name: 'Route Optimization', path: '/solutions/route-optimization', icon: Zap, description: 'AI-powered route planning' },
        { name: 'Load Matching', path: '/solutions/load-matching', icon: TrendingUp, description: 'Smart load-carrier matching' },
        { name: 'Fleet Management', path: '/solutions/fleet-management', icon: Truck, description: 'Comprehensive fleet control' },
        { name: 'Warehouse Management', path: '/solutions/warehouse-management', icon: MapPin, description: 'Smart warehouse operations' },
        { name: 'Last Mile Delivery', path: '/solutions/last-mile-delivery', icon: Clock, description: 'Optimized final delivery' },
        { name: 'Predictive Analytics', path: '/solutions/predictive-analytics', icon: TrendingUp, description: 'Forecast and optimize' },
        { name: 'Load Board', path: '/solutions/load-board', icon: TrendingUp, description: 'Connect shippers with carriers' },
        { name: 'Shipper Solutions', path: '/solutions/shipper-solutions', icon: Users, description: 'Solutions for shippers' },
        { name: 'Carrier Solutions', path: '/solutions/carrier-solutions', icon: Truck, description: 'Solutions for carriers' },
        { name: 'Broker Solutions', path: '/solutions/broker-solutions', icon: Users, description: 'Solutions for brokers' },
        { name: 'Owner Operator Solutions', path: '/solutions/owner-operator-solutions', icon: Users, description: 'Solutions for owner operators' }
      ]
    },
    {
      title: 'AI Agents',
      path: '/ai-agents',
      icon: Brain,
      subpages: [
        { name: 'Route Optimizer', path: '/agents/route-optimizer', icon: Zap, description: 'Optimize delivery routes' },
        { name: 'Load Matcher', path: '/agents/load-matcher', icon: TrendingUp, description: 'Match loads with carriers' },
        { name: 'Predictive Analytics', path: '/agents/predictive-analytics', icon: TrendingUp, description: 'Predict trends and optimize' },
        { name: 'Fleet Manager', path: '/agents/fleet-manager', icon: Truck, description: 'Manage fleet operations' },
        { name: 'Fuel Optimizer', path: '/agents/fuel-optimizer', icon: Zap, description: 'Minimize fuel consumption' },
        { name: 'Demand Forecaster', path: '/agents/demand-forecaster', icon: TrendingUp, description: 'Predict shipping demand' },
        { name: 'Price Optimizer', path: '/agents/price-optimizer', icon: TrendingUp, description: 'Dynamic pricing strategies' },
        { name: 'Maintenance Predictor', path: '/agents/maintenance-predictor', icon: Clock, description: 'Predictive maintenance alerts' },
        { name: 'Carbon Optimizer', path: '/agents/carbon-optimizer', icon: Globe, description: 'Reduce carbon footprint' },
        { name: 'Smart Warehouse', path: '/agents/smart-warehouse', icon: MapPin, description: 'Intelligent warehouse operations' },
        { name: 'Customer Experience', path: '/agents/customer-experience', icon: Users, description: 'Enhance customer satisfaction' },
        { name: 'Risk Assessment', path: '/agents/risk-assessment', icon: Shield, description: 'Assess and mitigate risks' }
      ]
    },
    {
      title: 'Technology',
      path: '/technology',
      icon: Globe,
      subpages: [
        { name: 'AI Technology', path: '/technology/ai', icon: Brain, description: 'Advanced AI and machine learning' },
        { name: 'Blockchain', path: '/technology/blockchain', icon: Shield, description: 'Secure blockchain technology' },
        { name: 'Cloud Infrastructure', path: '/technology/cloud', icon: Globe, description: 'Scalable cloud architecture' },
        { name: 'API Platform', path: '/technology/api', icon: Zap, description: 'Developer-friendly APIs' },
        { name: 'Data Analytics', path: '/technology/analytics', icon: TrendingUp, description: 'Advanced data processing' },
        { name: 'Security', path: '/technology/security', icon: Shield, description: 'Enterprise-grade security' },
        { name: 'Integration', path: '/technology/integration', icon: Users, description: 'Seamless system integration' },
        { name: 'Automation', path: '/technology/automation', icon: Zap, description: 'Intelligent automation' },
        { name: 'Mobile Technology', path: '/technology/mobile', icon: Globe, description: 'Mobile-first solutions' },
        { name: 'IoT & Sensors', path: '/technology/iot', icon: MapPin, description: 'Internet of Things integration' },
        { name: 'Edge Computing', path: '/technology/edge', icon: Clock, description: 'Real-time edge processing' },
        { name: 'Microservices', path: '/technology/microservices', icon: Users, description: 'Scalable microservices architecture' }
      ]
    },
    {
      title: 'Resources',
      path: '/resources',
      icon: Download,
      subpages: [
        { name: 'Blog', path: '/resources/blog', icon: MessageSquare, description: 'Latest insights & news' },
        { name: 'Case Studies', path: '/resources/case-studies', icon: Award, description: 'Success stories' },
        { name: 'API Documentation', path: '/resources/api-documentation', icon: Globe, description: 'Developer resources' },
        { name: 'Webinars', path: '/resources/webinars', icon: Play, description: 'Educational content' },
        { name: 'Help Center', path: '/resources/help-center', icon: MessageSquare, description: 'Support & guides' },
        { name: 'Resources Overview', path: '/resources', icon: Download, description: 'All resources in one place' }
      ]
    },
    {
      title: 'Company',
      path: '/company',
      icon: Users,
      subpages: [
        { name: 'About Us', path: '/company/about', icon: Users, description: 'Learn about Trans Bot AI' },
        { name: 'Leadership', path: '/company/leadership', icon: Award, description: 'Meet our leadership team' },
        { name: 'Careers', path: '/company/careers', icon: Users, description: 'Join our team' },
        { name: 'Contact', path: '/company/contact', icon: MessageSquare, description: 'Get in touch' },
        { name: 'Press', path: '/company/press', icon: MessageSquare, description: 'News and updates' },
        { name: 'Investors', path: '/company/investors', icon: TrendingUp, description: 'Investor information' },
        { name: 'Partners', path: '/company/partners', icon: Users, description: 'Strategic partnerships' },
        { name: 'Security', path: '/company/security', icon: Shield, description: 'Security and compliance' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/transbotai', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/transbotai', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/transbotai', color: 'hover:text-gray-300' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/transbotai', color: 'hover:text-blue-500' }
  ]

  const stats = [
    { number: '500+', label: 'Companies Served', icon: Users },
    { number: '$2.5B+', label: 'Cost Savings Generated', icon: TrendingUp },
    { number: '99.9%', label: 'Uptime Guarantee', icon: Shield },
    { number: '24/7', label: 'AI Monitoring', icon: Clock }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden responsive-container">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 responsive-container">
        <div className="absolute inset-0 responsive-container" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 responsive-container">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 responsive-container">
            {/* Brand Section */}
            <div className="lg:col-span-4 responsive-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-8 responsive-container"
              >
                {/* Logo */}
                <div className="flex items-center gap-4 responsive-container">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg responsive-container">
                    <Brain className="w-10 h-10 text-white responsive-container" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white responsive-container">Trans Bot AI</h3>
                    <p className="text-blue-200 text-sm font-medium responsive-container">Intelligent Logistics Platform</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-lg responsive-container">
                  Revolutionizing logistics through artificial intelligence. Streamline your supply chain, 
                  optimize routes, and enhance visibility with our comprehensive AI-powered platform.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 responsive-container">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 responsive-container"
                    >
                      <div className="flex items-center gap-3 responsive-container">
                        <div className="p-2 rounded-lg bg-blue-500/20 responsive-container">
                          <stat.icon className="w-5 h-5 text-blue-400 responsive-container" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white responsive-container">{stat.number}</div>
                          <div className="text-xs text-gray-400 responsive-container">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="space-y-4 responsive-container">
                  <h4 className="text-white font-semibold text-lg responsive-container">Get in Touch</h4>
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors responsive-container">
                      <div className="p-2 rounded-lg bg-green-500/20 responsive-container">
                        <Mail className="w-4 h-4 text-green-400 responsive-container" />
                      </div>
                      <span>contact@transbotai.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors responsive-container">
                      <div className="p-2 rounded-lg bg-blue-500/20 responsive-container">
                        <Phone className="w-4 h-4 text-blue-400 responsive-container" />
                      </div>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors responsive-container">
                      <div className="p-2 rounded-lg bg-purple-500/20 responsive-container">
                        <MapPin className="w-4 h-4 text-purple-400 responsive-container" />
                      </div>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4 responsive-container">
                  <h4 className="text-white font-semibold text-lg responsive-container">Follow Us</h4>
                  <div className="flex items-center gap-4 responsive-container">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 ${social.color} transition-all duration-200 hover:bg-white/10`}
                      >
                        <social.icon className="w-6 h-6 responsive-container" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-8 responsive-container">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 responsive-container">
                {menuSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="space-y-6 responsive-container"
                  >
                    <Link
                      to={section.path}
                      className="group flex items-center gap-3 text-white font-bold text-xl hover:text-blue-400 transition-colors duration-200 responsive-container"
                    >
                      <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors responsive-container">
                        <section.icon className="w-6 h-6 text-blue-400 responsive-container" />
                      </div>
                      {section.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 responsive-container" />
                    </Link>
                    
                    <ul className="space-y-3 responsive-container">
                      {section.subpages.map((subpage) => (
                        <li key={subpage.name}>
                          <Link
                            to={subpage.path}
                            className="group flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-200 responsive-container"
                          >
                            <div className="p-1 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors mt-0.5 responsive-container">
                              {subpage.icon && <subpage.icon className="w-4 h-4 text-blue-400 responsive-container" />}
                            </div>
                            <div>
                              <div className="font-medium text-sm group-hover:text-white transition-colors responsive-container">
                                {subpage.name}
                              </div>
                              {subpage.description && (
                                <div className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors responsive-container">
                                  {subpage.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 responsive-container"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 responsive-container">
            <div className="text-center responsive-container">
              <div className="flex items-center justify-center gap-3 mb-4 responsive-container">
                <div className="p-2 rounded-lg bg-blue-500/20 responsive-container">
                  <Mail className="w-6 h-6 text-blue-400 responsive-container" />
                </div>
                <h3 className="text-3xl font-bold text-white responsive-container">
                  Stay Ahead of the Curve
                </h3>
              </div>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto responsive-container">
                Get the latest AI insights, product updates, and industry trends delivered to your inbox. 
                Join 10,000+ logistics professionals who trust Trans Bot AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto responsive-container">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 responsive-container"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl responsive-container"
                >
                  Subscribe Now
                </motion.button>
              </div>
              <p className="text-gray-400 text-sm mt-4 responsive-container">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-white/10 bg-black/20 backdrop-blur-sm responsive-container"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 responsive-container">
              <div className="flex items-center gap-6 responsive-container">
                <div className="text-gray-400 text-sm responsive-container">
                  © 2024 Trans Bot AI. All rights reserved.
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm responsive-container">
                  <Shield className="w-4 h-4 responsive-container" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm responsive-container">
                  <CheckCircle className="w-4 h-4 responsive-container" />
                  <span>GDPR Ready</span>
                </div>
              </div>
              
              <div className="flex items-center gap-8 text-sm responsive-container">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 responsive-container">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 responsive-container">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200 responsive-container">
                  Cookie Policy
                </Link>
                <Link to="/security" className="text-gray-400 hover:text-white transition-colors duration-200 responsive-container">
                  Security
                </Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-200 responsive-container">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}