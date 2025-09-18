import React from 'react';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  ChevronDown, 
  Menu, 
  X,
  Truck,
  Warehouse,
  Route,
  BarChart3,
  Users,
  Shield,
  Clock,
  Zap,
  Globe,
  FileText,
  BookOpen,
  Video,
  Building,
  Briefcase,
  Car,
  Factory,
  ShoppingCart,
  Stethoscope,
  Utensils,
  Wrench,
  Pill,
  User,
  Settings,
  Bot,
  TrendingUp,
  Cpu,
  Target,
  MessageSquare
} from 'lucide-react'

interface SubPage {
  name: string
  path: string
  icon?: unknown
  description?: string
}

interface MenuSection {
  title: string
  path: string
  icon: unknown
  description: string
  subpages: SubPage[]
}

export function MegaMenuHeader() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuSections: MenuSection[] = [
    {
      title: 'Solutions',
      path: '/solutions',
      icon: Truck,
      description: 'Comprehensive logistics solutions',
      subpages: [
        { name: 'Transportation Management', path: '/solutions/transportation', icon: Truck, description: 'End-to-end transportation optimization' },
        { name: 'Warehouse Management', path: '/solutions/warehouse', icon: Warehouse, description: 'Smart warehouse operations' },
        { name: 'Fleet Management', path: '/solutions/fleet', icon: Car, description: 'Complete fleet visibility and control' },
        { name: 'Load Optimization', path: '/solutions/load-optimization', icon: BarChart3, description: 'AI-powered load planning' },
        { name: 'Route Planning', path: '/solutions/route-planning', icon: Route, description: 'Intelligent route optimization' },
        { name: 'Real-time Tracking', path: '/solutions/tracking', icon: Clock, description: 'Live shipment monitoring' },
        { name: 'Supply Chain Analytics', path: '/solutions/analytics', icon: TrendingUp, description: 'Advanced analytics and insights' },
        { name: 'Inventory Management', path: '/solutions/inventory', icon: Warehouse, description: 'Smart inventory optimization' }
      ]
    },
    {
      title: 'Pricing',
      path: '/pricing',
      icon: BarChart3,
      description: 'Flexible pricing plans',
      subpages: [
        { name: 'Starter Plan', path: '/pricing/starter', icon: Zap, description: 'Perfect for small businesses' },
        { name: 'Professional Plan', path: '/pricing/professional', icon: Users, description: 'Advanced features for growing companies' },
        { name: 'Enterprise Plan', path: '/pricing/enterprise', icon: Building, description: 'Full-scale enterprise solution' },
        { name: 'Custom Solutions', path: '/pricing/custom', icon: Settings, description: 'Tailored to your needs' },
        { name: 'Compare Plans', path: '/pricing/compare', icon: BarChart3, description: 'See all features side by side' },
        { name: 'ROI Calculator', path: '/pricing/calculator', icon: TrendingUp, description: 'Calculate your savings' },
        { name: 'Free Trial', path: '/pricing/trial', icon: Zap, description: 'Try risk-free for 30 days' },
        { name: 'Volume Discounts', path: '/pricing/volume', icon: Users, description: 'Special rates for high volume' }
      ]
    },
    {
      title: 'Resources',
      path: '/resources',
      icon: BookOpen,
      description: 'Learning and support materials',
      subpages: [
        { name: 'Documentation', path: '/resources/documentation', icon: FileText, description: 'Complete API and user guides' },
        { name: 'API Reference', path: '/resources/api', icon: Cpu, description: 'Developer documentation' },
        { name: 'Tutorials', path: '/resources/tutorials', icon: BookOpen, description: 'Step-by-step guides' },
        { name: 'Case Studies', path: '/resources/case-studies', icon: BarChart3, description: 'Success stories and results' },
        { name: 'White Papers', path: '/resources/whitepapers', icon: FileText, description: 'Industry insights and research' },
        { name: 'Webinars', path: '/resources/webinars', icon: Video, description: 'Live and recorded sessions' },
        { name: 'Blog', path: '/resources/blog', icon: FileText, description: 'Latest news and insights' },
        { name: 'Support Center', path: '/resources/support', icon: MessageSquare, description: 'Help and troubleshooting' }
      ]
    },
    {
      title: 'Company',
      path: '/company',
      icon: Building,
      description: 'About our organization',
      subpages: [
        { name: 'About Us', path: '/company/about', icon: Building, description: 'Our mission and vision' },
        { name: 'Leadership', path: '/company/leadership', icon: Users, description: 'Meet our executive team' },
        { name: 'Careers', path: '/company/careers', icon: Briefcase, description: 'Join our growing team' },
        { name: 'Press', path: '/company/press', icon: FileText, description: 'Latest news and announcements' },
        { name: 'Partners', path: '/company/partners', icon: Users, description: 'Our strategic partnerships' },
        { name: 'Contact', path: '/company/contact', icon: MessageSquare, description: 'Get in touch with us' },
        { name: 'Investor Relations', path: '/company/investors', icon: TrendingUp, description: 'Financial information' },
        { name: 'News & Updates', path: '/company/news', icon: FileText, description: 'Company updates and milestones' }
      ]
    },
    {
      title: 'Industries',
      path: '/industries',
      icon: Factory,
      description: 'Industry-specific solutions',
      subpages: [
        { name: 'E-commerce', path: '/industries/ecommerce', icon: ShoppingCart, description: 'Online retail optimization' },
        { name: 'Manufacturing', path: '/industries/manufacturing', icon: Factory, description: 'Production line logistics' },
        { name: 'Retail', path: '/industries/retail', icon: ShoppingCart, description: 'Store and distribution networks' },
        { name: 'Healthcare', path: '/industries/healthcare', icon: Stethoscope, description: 'Medical supply chain' },
        { name: 'Food & Beverage', path: '/industries/food-beverage', icon: Utensils, description: 'Temperature-controlled logistics' },
        { name: 'Automotive', path: '/industries/automotive', icon: Car, description: 'Parts and vehicle logistics' },
        { name: 'Construction', path: '/industries/construction', icon: Wrench, description: 'Heavy equipment and materials' },
        { name: 'Pharmaceuticals', path: '/industries/pharma', icon: Pill, description: 'Regulated pharmaceutical logistics' }
      ]
    },
    {
      title: 'Portals',
      path: '/portals',
      icon: User,
      description: 'Role-based access portals',
      subpages: [
        { name: 'Shipper Portal', path: '/portals/shipper', icon: Truck, description: 'Shipment management for shippers' },
        { name: 'Broker Portal', path: '/portals/broker', icon: Users, description: 'Load matching and brokerage' },
        { name: 'Carrier Portal', path: '/portals/carrier', icon: Car, description: 'Fleet and load management' },
        { name: 'Driver Portal', path: '/portals/driver', icon: User, description: 'Mobile driver interface' },
        { name: 'Admin Portal', path: '/portals/admin', icon: Settings, description: 'System administration' },
        { name: 'Super Admin', path: '/super-admin', icon: Shield, description: 'Platform management' },
        { name: 'Partner Portal', path: '/portals/partner', icon: Users, description: 'Partner collaboration' },
        { name: 'Developer Portal', path: '/portals/developer', icon: Cpu, description: 'API and integration tools' }
      ]
    },
    {
      title: 'AI Agents',
      path: '/ai-agents',
      icon: Bot,
      description: 'Intelligent automation tools',
      subpages: [
        { name: 'MCP Agents', path: '/ai-agents/mcp', icon: Bot, description: 'Multi-agent coordination platform' },
        { name: 'Automation Tools', path: '/ai-agents/automation', icon: Zap, description: 'Workflow automation' },
        { name: 'AI Analytics', path: '/ai-agents/analytics', icon: TrendingUp, description: 'Predictive analytics' },
        { name: 'Machine Learning', path: '/ai-agents/ml', icon: Cpu, description: 'ML model deployment' },
        { name: 'Agent Marketplace', path: '/ai-agents/marketplace', icon: Globe, description: 'Pre-built agent solutions' },
        { name: 'Custom Agents', path: '/ai-agents/custom', icon: Settings, description: 'Tailored AI solutions' },
        { name: 'Predictive Analytics', path: '/ai-agents/predictive', icon: Target, description: 'Future trend analysis' },
        { name: 'Smart Routing', path: '/ai-agents/routing', icon: Route, description: 'AI-powered route optimization' }
      ]
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-transbot-border shadow-transbot responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
        <div className="flex items-center justify-between h-16 responsive-container">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 responsive-container"
          >
            <div className="p-2 rounded-xl bg-gradient-primary responsive-container">
              <Brain className="w-6 h-6 text-white responsive-container" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-transbot-text-primary responsive-container">Trans Bot AI</h1>
              <p className="text-xs text-transbot-text-secondary responsive-container">Intelligent Logistics</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 responsive-container">
            {menuSections.map((section) => (
              <div
                key={section.title}
                className="relative responsive-container"
                onMouseEnter={() => setActiveDropdown(section.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-2 text-transbot-text-secondary hover:text-transbot-sky transition-colors duration-200 font-medium responsive-container" aria-label="Button">
                  <section.icon className="w-4 h-4 responsive-container" />
                  {section.title}
                  <ChevronDown className="w-4 h-4 responsive-container" />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDropdown === section.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-transbot-lg border border-transbot-border p-6 responsive-container"
                    >
                      <div className="space-y-4 responsive-container">
                        <div className="flex items-center gap-3 pb-3 border-b border-transbot-border responsive-container">
                          <div className="p-2 rounded-lg bg-transbot-sky/10 responsive-container">
                            <section.icon className="w-5 h-5 text-transbot-sky responsive-container" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-transbot-text-primary responsive-container">{section.title}</h3>
                            <p className="text-sm text-transbot-text-secondary responsive-container">{section.description}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 responsive-container">
                          {section.subpages.map((subpage) => (
                            <a
                              key={subpage.name}
                              href={subpage.path}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-transbot-neutral-light transition-colors duration-200 group responsive-container"
                            >
                              <div className="p-1.5 rounded-md bg-transbot-border group-hover:bg-transbot-sky/10 transition-colors duration-200 responsive-container">
                                {subpage.icon && <subpage.icon className="w-4 h-4 text-transbot-text-secondary group-hover:text-transbot-sky responsive-container" />}
                              </div>
                              <div className="flex-1 min-w-0 responsive-container">
                                <p className="text-sm font-medium text-transbot-text-primary group-hover:text-transbot-sky responsive-container">
                                  {subpage.name}
                                </p>
                                {subpage.description && (
                                  <p className="text-xs text-transbot-text-secondary mt-1 line-clamp-2 responsive-container">
                                    {subpage.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4 responsive-container">
            <button className="text-transbot-text-secondary hover:text-transbot-sky transition-colors duration-200 font-medium responsive-container" aria-label="Button">
              Login
            </button>
            <button className="px-6 py-2 bg-gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 shadow-transbot responsive-container" aria-label="Button">
              Get Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Button"
            className="lg:hidden p-2 rounded-lg text-transbot-text-secondary hover:bg-transbot-neutral-light transition-colors duration-200 responsive-container"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 responsive-container" /> : <Menu className="w-6 h-6 responsive-container" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-transbot-border responsive-container"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 responsive-container">
              <div className="space-y-4 responsive-container">
                {menuSections.map((section) => (
                  <div key={section.title} className="space-y-2 responsive-container">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-transbot-neutral-light responsive-container">
                      <section.icon className="w-5 h-5 text-transbot-sky responsive-container" />
                      <div>
                        <h3 className="font-semibold text-transbot-text-primary responsive-container">{section.title}</h3>
                        <p className="text-sm text-transbot-text-secondary responsive-container">{section.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2 ml-8 responsive-container">
                      {section.subpages.map((subpage) => (
                        <a
                          key={subpage.name}
                          href={subpage.path}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-transbot-neutral-light transition-colors duration-200 responsive-container"
                        >
                          {subpage.icon && <subpage.icon className="w-4 h-4 text-transbot-text-secondary responsive-container" />}
                          <span className="text-sm text-transbot-text-primary responsive-container">{subpage.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-transbot-border space-y-3 responsive-container">
                  <button className="w-full text-left p-3 text-transbot-text-primary hover:bg-transbot-neutral-light rounded-lg transition-colors duration-200 responsive-container" aria-label="Button">
                    Login
                  </button>
                  <button className="w-full p-3 bg-gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 responsive-container" aria-label="Button">
                    Get Demo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}