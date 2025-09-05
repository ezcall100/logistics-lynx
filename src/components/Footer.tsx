import { motion } from 'framer-motion'
import { 
  Brain, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Instagram,
  ArrowRight,
  Shield,
  Award,
  Users,
  Globe,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Heart
} from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'TMS Solutions', href: '/solutions/tms' },
        { name: 'AI Automation', href: '/solutions/ai' },
        { name: 'Global Operations', href: '/solutions/global' },
        { name: 'Mobile Apps', href: '/solutions/mobile' },
        { name: 'API Integration', href: '/solutions/api' },
        { name: 'Security & Compliance', href: '/solutions/security' }
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Trucking Companies', href: '/industries/trucking' },
        { name: 'Freight Brokers', href: '/industries/brokers' },
        { name: 'Shippers', href: '/industries/shippers' },
        { name: '3PL Providers', href: '/industries/3pl' },
        { name: 'Owner Operators', href: '/industries/owner-operators' },
        { name: 'Fleet Management', href: '/industries/fleet' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/resources/docs' },
        { name: 'API Reference', href: '/resources/api' },
        { name: 'Tutorials', href: '/resources/tutorials' },
        { name: 'Case Studies', href: '/resources/cases' },
        { name: 'White Papers', href: '/resources/whitepapers' },
        { name: 'Support Center', href: '/resources/support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Leadership Team', href: '/about/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press & Media', href: '/press' },
        { name: 'Partners', href: '/partners' },
        { name: 'Contact Us', href: '/contact' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/transbotai' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/transbotai' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/transbotai' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/transbotai' }
  ]

  const stats = [
    { icon: Users, value: '2,500+', label: 'Active Companies' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Zap, value: '250', label: 'AI Agents' }
  ]

  return (
    <footer className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section - Stats & Newsletter */}
        <div className="border-b border-slate-800 dark:border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-emerald-400" />
                  Trans Bot AI by the Numbers
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <stat.icon className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-6">Stay Updated with AI Insights</h3>
                <p className="text-slate-400 mb-6">
                  Get the latest updates on AI-powered logistics, industry trends, and Trans Bot AI features delivered to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center gap-2"
                    >
                      {isSubscribed ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Subscribed!
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-500">
                    By subscribing, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-lg font-semibold mb-4 text-emerald-400">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Contact & Social */}
        <div className="border-t border-slate-800 dark:border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-emerald-400" />
                  <span className="text-2xl font-bold gradient-text">Trans Bot AI</span>
                </div>
                <p className="text-slate-400 mb-4">
                  The world's most advanced AI-powered Transportation Management System. 
                  Empowering logistics companies with 250 AI agents working 24/7.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Enterprise Security</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>ISO 27001</span>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h5 className="font-semibold mb-4 text-emerald-400">Get in Touch</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-400">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>hello@transbotai.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>24/7 AI Support</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h5 className="font-semibold mb-4 text-emerald-400">Follow Us</h5>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-lg bg-slate-800 hover:bg-emerald-500 transition-all duration-200 group"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 dark:border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-slate-500">
                © 2024 Trans Bot AI. All rights reserved. Made with{' '}
                <Heart className="w-4 h-4 inline text-red-500" /> by our 250 AI agents.
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <a href="/privacy" className="text-slate-500 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-slate-500 hover:text-emerald-400 transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-slate-500 hover:text-emerald-400 transition-colors">
                  Cookie Policy
                </a>
                <a href="/security" className="text-slate-500 hover:text-emerald-400 transition-colors">
                  Security
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}