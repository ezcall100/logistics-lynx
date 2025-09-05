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
  ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface SubPage {
  name: string
  path: string
}

interface MenuSection {
  title: string
  path: string
  subpages: SubPage[]
}

export function Footer() {
  const menuSections: MenuSection[] = [
    {
      title: 'Solutions',
      path: '/solutions',
      subpages: [
        { name: 'Transportation Management', path: '/solutions/transportation' },
        { name: 'Warehouse Management', path: '/solutions/warehouse' },
        { name: 'Fleet Management', path: '/solutions/fleet' },
        { name: 'Load Optimization', path: '/solutions/load-optimization' },
        { name: 'Route Planning', path: '/solutions/route-planning' },
        { name: 'Real-time Tracking', path: '/solutions/tracking' },
        { name: 'Supply Chain Analytics', path: '/solutions/analytics' },
        { name: 'Inventory Management', path: '/solutions/inventory' }
      ]
    },
    {
      title: 'Pricing',
      path: '/pricing',
      subpages: [
        { name: 'Starter Plan', path: '/pricing/starter' },
        { name: 'Professional Plan', path: '/pricing/professional' },
        { name: 'Enterprise Plan', path: '/pricing/enterprise' },
        { name: 'Custom Solutions', path: '/pricing/custom' },
        { name: 'Compare Plans', path: '/pricing/compare' },
        { name: 'ROI Calculator', path: '/pricing/calculator' },
        { name: 'Free Trial', path: '/pricing/trial' },
        { name: 'Volume Discounts', path: '/pricing/volume' }
      ]
    },
    {
      title: 'Resources',
      path: '/resources',
      subpages: [
        { name: 'Documentation', path: '/resources/documentation' },
        { name: 'API Reference', path: '/resources/api' },
        { name: 'Tutorials', path: '/resources/tutorials' },
        { name: 'Case Studies', path: '/resources/case-studies' },
        { name: 'White Papers', path: '/resources/whitepapers' },
        { name: 'Webinars', path: '/resources/webinars' },
        { name: 'Blog', path: '/resources/blog' },
        { name: 'Support Center', path: '/resources/support' }
      ]
    },
    {
      title: 'Company',
      path: '/company',
      subpages: [
        { name: 'About Us', path: '/company/about' },
        { name: 'Leadership', path: '/company/leadership' },
        { name: 'Careers', path: '/company/careers' },
        { name: 'Press', path: '/company/press' },
        { name: 'Partners', path: '/company/partners' },
        { name: 'Contact', path: '/company/contact' },
        { name: 'Investor Relations', path: '/company/investors' },
        { name: 'News & Updates', path: '/company/news' }
      ]
    },
    {
      title: 'Industries',
      path: '/industries',
      subpages: [
        { name: 'E-commerce', path: '/industries/ecommerce' },
        { name: 'Manufacturing', path: '/industries/manufacturing' },
        { name: 'Retail', path: '/industries/retail' },
        { name: 'Healthcare', path: '/industries/healthcare' },
        { name: 'Food & Beverage', path: '/industries/food-beverage' },
        { name: 'Automotive', path: '/industries/automotive' },
        { name: 'Construction', path: '/industries/construction' },
        { name: 'Pharmaceuticals', path: '/industries/pharma' }
      ]
    },
    {
      title: 'Portals',
      path: '/portals',
      subpages: [
        { name: 'Shipper Portal', path: '/portals/shipper' },
        { name: 'Broker Portal', path: '/portals/broker' },
        { name: 'Carrier Portal', path: '/portals/carrier' },
        { name: 'Driver Portal', path: '/portals/driver' },
        { name: 'Admin Portal', path: '/portals/admin' },
        { name: 'Super Admin', path: '/super-admin' },
        { name: 'Partner Portal', path: '/portals/partner' },
        { name: 'Developer Portal', path: '/portals/developer' }
      ]
    },
    {
      title: 'AI Agents',
      path: '/ai-agents',
      subpages: [
        { name: 'MCP Agents', path: '/ai-agents/mcp' },
        { name: 'Automation Tools', path: '/ai-agents/automation' },
        { name: 'AI Analytics', path: '/ai-agents/analytics' },
        { name: 'Machine Learning', path: '/ai-agents/ml' },
        { name: 'Agent Marketplace', path: '/ai-agents/marketplace' },
        { name: 'Custom Agents', path: '/ai-agents/custom' },
        { name: 'Predictive Analytics', path: '/ai-agents/predictive' },
        { name: 'Smart Routing', path: '/ai-agents/routing' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/transbotai' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/transbotai' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/transbotai' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/transbotai' }
  ]

  return (
    <footer className="bg-gradient-to-br from-transbot-bg-dark via-transbot-navy to-transbot-bg-dark border-t border-transbot-border">
      <div className="container-pro">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-primary">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Trans Bot AI</h3>
                    <p className="text-transbot-text-light text-sm">Intelligent Logistics Platform</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-transbot-text-light leading-relaxed">
                  Revolutionizing logistics with AI-powered solutions. Streamline your supply chain, 
                  optimize routes, and enhance visibility with our comprehensive platform.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-transbot-text-light">
                    <Mail className="w-4 h-4 text-transbot-teal" />
                    <span>contact@transbotai.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-transbot-text-light">
                    <Phone className="w-4 h-4 text-transbot-teal" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-transbot-text-light">
                    <MapPin className="w-4 h-4 text-transbot-teal" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-transbot-neutral-dark hover:bg-transbot-teal transition-colors duration-200"
                    >
                      <social.icon className="w-5 h-5 text-transbot-text-light hover:text-white" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {menuSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    <Link
                      to={section.path}
                      className="text-white font-semibold text-lg hover:text-transbot-teal transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {section.title}
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                    
                    <ul className="space-y-2">
                      {section.subpages.map((subpage) => (
                        <li key={subpage.name}>
                          <Link
                            to={subpage.path}
                            className="text-transbot-text-light hover:text-transbot-teal transition-colors duration-200 text-sm flex items-center gap-2 group"
                          >
                            {subpage.name}
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
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
          className="py-8 border-t border-transbot-border"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Trans Bot AI
            </h3>
            <p className="text-transbot-text-light mb-6">
              Get the latest insights, product updates, and industry news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-transbot-neutral-dark border border-transbot-border text-white placeholder-transbot-text-light focus:outline-none focus:ring-2 focus:ring-transbot-teal focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-accent text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-6 border-t border-transbot-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-transbot-text-light text-sm">
              © 2024 Trans Bot AI. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-transbot-text-light hover:text-transbot-teal transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-transbot-text-light hover:text-transbot-teal transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-transbot-text-light hover:text-transbot-teal transition-colors duration-200">
                Cookie Policy
              </Link>
              <Link to="/security" className="text-transbot-text-light hover:text-transbot-teal transition-colors duration-200">
                Security
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}