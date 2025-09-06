import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  User, 
  LogIn,
  Search,
  ChevronDown,
  Globe,
  Bot,
  Briefcase,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
  TrendingUp,
  Brain,
  Target,
  Rocket,
  Star
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'

interface MenuItem {
  id: string
  label: string
  href: string
  icon?: any
  description?: string
  children?: MenuItem[]
  featured?: boolean
}

interface MegaMenuSection {
  title: string
  items: MenuItem[]
  featured?: MenuItem[]
}

export function HorizontalMegaMenu() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = async (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
    setActiveMenu(null)
    await trackUserInteraction('navigation', { path })
  }

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await trackUserInteraction('search', { query })
      // Implement search functionality
      console.log('Searching for:', query)
    }
  }

  const megaMenuSections: MegaMenuSection[] = [
    {
      title: 'Solutions',
      items: [
        { id: 'tms', label: 'Transportation Management', href: '/solutions/transportation', icon: Globe, description: 'Complete TMS solution' },
        { id: 'route-optimizer', label: 'Route Optimization', href: '/ai-agents/route-optimizer', icon: Target, description: 'AI-powered route planning' },
        { id: 'load-matching', label: 'Load Matching', href: '/ai-agents/load-matcher', icon: Zap, description: 'Smart load-carrier matching' },
        { id: 'predictive-analytics', label: 'Predictive Analytics', href: '/ai-agents/predictive-analytics', icon: BarChart3, description: 'Forecast and optimize' },
        { id: 'fleet-management', label: 'Fleet Management', href: '/ai-agents/fleet-manager', icon: Rocket, description: 'Comprehensive fleet control' }
      ],
      featured: [
        { id: 'tms-featured', label: 'Transportation Management', href: '/solutions/transportation', icon: Globe, featured: true, description: 'Complete TMS solution with AI integration' }
      ]
    },
    {
      title: 'AI Agents',
      items: [
        { id: 'route-optimizer', label: 'Route Optimizer', href: '/ai-agents/route-optimizer', icon: Target, description: 'Optimize delivery routes' },
        { id: 'load-matcher', label: 'Load Matcher', href: '/ai-agents/load-matcher', icon: Zap, description: 'Match loads with carriers' },
        { id: 'predictive-analytics', label: 'Predictive Analytics', href: '/ai-agents/predictive-analytics', icon: BarChart3, description: 'Predict trends and optimize' },
        { id: 'fleet-manager', label: 'Fleet Manager', href: '/ai-agents/fleet-manager', icon: Rocket, description: 'Manage fleet operations' }
      ]
    },
    {
      title: 'Portals',
      items: [
        { id: 'customer-portal', label: 'Customer Portal', href: '/portals/customer', icon: Users, description: 'Customer self-service' },
        { id: 'broker-portal', label: 'Broker Portal', href: '/portals/broker', icon: Briefcase, description: 'Freight brokerage management' },
        { id: 'carrier-portal', label: 'Carrier Portal', href: '/portals/carrier', icon: Rocket, description: 'Carrier operations' },
        { id: 'driver-portal', label: 'Driver Portal', href: '/portals/driver', icon: User, description: 'Mobile driver interface' },
        { id: 'analytics-portal', label: 'Analytics Portal', href: '/portals/analytics', icon: BarChart3, description: 'Business intelligence' },
        { id: 'marketplace-portal', label: 'Marketplace Portal', href: '/portals/marketplace', icon: Globe, description: 'Trading marketplace' }
      ]
    },
    {
      title: 'Company',
      items: [
        { id: 'about', label: 'About Us', href: '/company', icon: Users, description: 'Learn about Trans Bot AI' },
        { id: 'careers', label: 'Careers', href: '/careers', icon: Briefcase, description: 'Join our team' },
        { id: 'contact', label: 'Contact', href: '/contact', icon: User, description: 'Get in touch' },
        { id: 'press', label: 'Press', href: '/press', icon: Star, description: 'News and updates' }
      ]
    }
  ]

  const mainMenuItems = [
    { id: 'solutions', label: 'Solutions', icon: Briefcase },
    { id: 'ai-agents', label: 'AI Agents', icon: Bot },
    { id: 'portals', label: 'Portals', icon: Globe },
    { id: 'company', label: 'Company', icon: Users },
    { id: 'pricing', label: 'Pricing', href: '/pricing', icon: TrendingUp },
    { id: 'resources', label: 'Resources', href: '/resources', icon: BarChart3 }
  ]

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200/50' 
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 lg:space-x-3 cursor-pointer"
              onClick={() => handleNavigation('/')}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Trans Bot AI
                </h1>
                <p className="text-xs text-slate-500 -mt-1 hidden lg:block">Intelligent Logistics</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {mainMenuItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => item.href ? handleNavigation(item.href) : setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeMenu === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm xl:text-base">{item.label}</span>
                    {!item.href && <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.id ? 'rotate-180' : ''}`} />}
                  </button>
                </div>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-10 pr-4 py-2 w-32 lg:w-48 xl:w-56 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavigation('/login')}
                  className="flex items-center space-x-1 px-3 lg:px-4 py-2 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:block">Sign In</span>
                </button>
                <button
                  onClick={() => handleNavigation('/signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                >
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdowns */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl"
            >
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {megaMenuSections.map((section, index) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">{section.title}</h3>
                      
                      {section.featured && (
                        <div className="mb-6">
                          {section.featured.map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.02 }}
                              className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 cursor-pointer"
                              onClick={() => handleNavigation(item.href)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                  <item.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-slate-900">{item.label}</h4>
                                  <p className="text-sm text-slate-600">{item.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-blue-600 ml-auto" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2">
                        {section.items.map((item) => (
                          <motion.button
                            key={item.id}
                            whileHover={{ x: 4 }}
                            onClick={() => handleNavigation(item.href)}
                            className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                              <div>
                                <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                                  {item.label}
                                </p>
                                <p className="text-sm text-slate-500">{item.description}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 pt-8 border-t border-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">Ready to Transform Your Logistics?</h4>
                      <p className="text-slate-600">Join thousands of companies already using Trans Bot AI</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleNavigation('/get-started')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleNavigation('/demo')}
                        className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-16 right-0 bottom-0 w-80 sm:w-96 bg-white shadow-xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Navigation */}
                <nav className="space-y-4">
                  {mainMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => item.href ? handleNavigation(item.href) : null}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-slate-400" />
                      <span className="font-medium text-slate-900">{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Auth Buttons */}
                <div className="pt-6 border-t border-slate-200 space-y-3">
                  <button
                    onClick={() => handleNavigation('/login')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/signup')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside to close mega menu */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </>
  )
}
