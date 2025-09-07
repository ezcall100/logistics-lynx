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
  Star,
  Package,
  Truck,
  Shield,
  Layers,
  Database,
  Banknote,
  Code,
  HelpCircle,
  DollarSign,
  MapPin,
  Leaf,
  Heart
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
        { id: 'route-optimizer', label: 'Route Optimization', href: '/solutions/route-optimization', icon: Target, description: 'AI-powered route planning' },
        { id: 'load-matching', label: 'Load Matching', href: '/solutions/load-matching', icon: Zap, description: 'Smart load-carrier matching' },
        { id: 'predictive-analytics', label: 'Predictive Analytics', href: '/solutions/predictive-analytics', icon: BarChart3, description: 'Forecast and optimize' },
        { id: 'fleet-management', label: 'Fleet Management', href: '/solutions/fleet-management', icon: Rocket, description: 'Comprehensive fleet control' },
        { id: 'warehouse-management', label: 'Warehouse Management', href: '/solutions/warehouse', icon: Package, description: 'Smart warehouse operations' },
        { id: 'last-mile-delivery', label: 'Last Mile Delivery', href: '/solutions/last-mile', icon: Truck, description: 'Optimized final delivery' },
        { id: 'yard-management', label: 'Yard Management', href: '/solutions/yard-management', icon: MapPin, description: 'Optimize yard operations' },
        { id: 'financial-management', label: 'Financial Management', href: '/solutions/financial-management', icon: DollarSign, description: 'Streamline financial operations' },
        { id: 'load-board', label: 'Load Board', href: '/solutions/load-board', icon: Package, description: 'Connect shippers with carriers' },
        { id: 'crm', label: 'CRM Solution', href: '/solutions/crm', icon: Users, description: 'Customer relationship management' },
        { id: 'shipper-solutions', label: 'Shipper Solutions', href: '/solutions/shipper', icon: Package, description: 'Solutions for shippers' },
        { id: 'carrier-solutions', label: 'Carrier Solutions', href: '/solutions/carrier', icon: Truck, description: 'Solutions for carriers' },
        { id: 'broker-solutions', label: 'Broker Solutions', href: '/solutions/broker', icon: Briefcase, description: 'Solutions for brokers' },
        { id: 'owner-operator-solutions', label: 'Owner Operator Solutions', href: '/solutions/owner-operator', icon: Truck, description: 'Solutions for owner operators' },
        { id: 'driver-solutions', label: 'Driver Solutions', href: '/solutions/driver', icon: User, description: 'Solutions for drivers' }
      ],
      featured: [
        { id: 'tms-featured', label: 'Transportation Management', href: '/solutions/transportation', icon: Globe, featured: true, description: 'Complete TMS solution with AI integration' }
      ]
    },
    {
      title: 'AI Agents',
      items: [
        { id: 'route-optimizer', label: 'Route Optimizer', href: '/agents/route-optimizer', icon: Target, description: 'Optimize delivery routes' },
        { id: 'load-matcher', label: 'Load Matcher', href: '/agents/load-matcher', icon: Zap, description: 'Match loads with carriers' },
        { id: 'predictive-analytics', label: 'Predictive Analytics', href: '/agents/predictive-analytics', icon: BarChart3, description: 'Predict trends and optimize' },
        { id: 'fleet-manager', label: 'Fleet Manager', href: '/agents/fleet-manager', icon: Rocket, description: 'Manage fleet operations' },
        { id: 'fuel-optimizer', label: 'Fuel Optimizer', href: '/agents/fuel-optimizer', icon: Zap, description: 'Minimize fuel consumption' },
        { id: 'demand-forecaster', label: 'Demand Forecaster', href: '/agents/demand-forecaster', icon: BarChart3, description: 'Predict shipping demand' },
        { id: 'price-optimizer', label: 'Price Optimizer', href: '/agents/price-optimizer', icon: TrendingUp, description: 'Dynamic pricing strategies' },
        { id: 'maintenance-predictor', label: 'Maintenance Predictor', href: '/agents/maintenance-predictor', icon: Target, description: 'Predictive maintenance alerts' },
        { id: 'carbon-optimizer', label: 'Carbon Optimizer', href: '/agents/carbon-optimizer', icon: Leaf, description: 'Reduce carbon footprint' },
        { id: 'smart-warehouse', label: 'Smart Warehouse', href: '/agents/smart-warehouse', icon: Package, description: 'Autonomous warehouse operations' },
        { id: 'customer-experience', label: 'Customer Experience', href: '/agents/customer-experience', icon: Heart, description: 'Enhance customer satisfaction' },
        { id: 'risk-assessment', label: 'Risk Assessment', href: '/agents/risk-assessment', icon: Shield, description: 'Proactive risk identification' }
      ]
    },
    {
      title: 'Portals',
      items: [
        // Core TMS Portals (10)
        { id: 'customer-portal', label: 'Customer Portal', href: '/portals/customer', icon: Users, description: 'Customer self-service' },
        { id: 'broker-portal', label: 'Broker Portal', href: '/broker', icon: Briefcase, description: 'Freight brokerage management' },
        { id: 'carrier-portal', label: 'Carrier Portal', href: '/carrier', icon: Rocket, description: 'Carrier operations' },
        { id: 'driver-portal', label: 'Driver Portal', href: '/driver', icon: User, description: 'Mobile driver interface' },
        { id: 'shipper-portal', label: 'Shipper Portal', href: '/shipper', icon: Package, description: 'Shipment management' },
        { id: 'analytics-portal', label: 'Analytics Portal', href: '/analytics', icon: BarChart3, description: 'Business intelligence' },
        { id: 'autonomous-portal', label: 'Autonomous Portal', href: '/autonomous', icon: Rocket, description: 'Autonomous vehicle management' },
        { id: 'yms-portal', label: 'Yard Management Portal', href: '/yms', icon: Globe, description: 'Yard management system' },
        { id: 'directory-portal', label: 'Directory Portal', href: '/directory', icon: Users, description: 'Industry directory' },
        { id: 'rates-portal', label: 'Rates Portal', href: '/rates', icon: TrendingUp, description: 'Rate management' },
        
        // Business Operations Portals (15)
        { id: 'marketplace-portal', label: 'Marketplace Portal', href: '/marketplace', icon: Globe, description: 'Trading marketplace' },
        { id: 'financial-portal', label: 'Financial Portal', href: '/financials', icon: TrendingUp, description: 'Financial management' },
        { id: 'load-board-portal', label: 'Load Board Portal', href: '/load-board', icon: Package, description: 'Load board management' },
        { id: 'crm-portal', label: 'CRM Portal', href: '/crm', icon: Users, description: 'Customer relationship management' },
        { id: 'partner-portal', label: 'Partner Portal', href: '/portals/partner', icon: Users, description: 'Partner management' },
        { id: 'developer-portal', label: 'Developer Portal', href: '/portals/developer', icon: Target, description: 'API and integration tools' },
        { id: 'admin-portal', label: 'Admin Portal', href: '/portals/admin', icon: Users, description: 'System administration' },
        { id: 'super-admin-portal', label: 'Super Admin Portal', href: '/super-admin', icon: Shield, description: 'Master system control' },
        { id: 'mcp-agent-admin', label: 'MCP Agent Admin', href: '/admin/mcp-agents', icon: Bot, description: 'Manage AI agents' },
        { id: 'human-developer-admin', label: 'Human Developer Admin', href: '/admin/human-developers', icon: Users, description: 'Manage human developers' },
        { id: 'enhanced-broker-portal', label: 'Enhanced Broker Portal', href: '/portals/broker/enhanced', icon: Briefcase, description: 'Advanced brokerage features' },
        { id: 'portals-overview', label: 'Portals Overview', href: '/portals', icon: Layers, description: 'Overview of all portals' },
        { id: 'workers-portal', label: 'Workers Portal', href: '/workers', icon: Users, description: 'Workforce management' },
        { id: 'edi-portal', label: 'EDI Portal', href: '/edi', icon: Database, description: 'Electronic data interchange' },
        { id: 'owner-operator-portal', label: 'Owner-Operator Portal', href: '/owner-operator', icon: Truck, description: 'Independent trucking business' },
        { id: 'factoring-portal', label: 'Factoring Portal', href: '/factoring', icon: Banknote, description: 'Invoice factoring and cash flow' }
      ]
    },
    {
      title: 'Company',
      items: [
        { id: 'about', label: 'About Us', href: '/company', icon: Users, description: 'Learn about Trans Bot AI' },
        { id: 'careers', label: 'Careers', href: '/careers', icon: Briefcase, description: 'Join our team' },
        { id: 'contact', label: 'Contact', href: '/contact', icon: User, description: 'Get in touch' },
        { id: 'press', label: 'Press', href: '/press', icon: Star, description: 'News and updates' },
        { id: 'leadership', label: 'Leadership', href: '/leadership', icon: Users, description: 'Meet our leadership team' },
        { id: 'investors', label: 'Investors', href: '/investors', icon: TrendingUp, description: 'Investor information' },
        { id: 'partners', label: 'Partners', href: '/partners', icon: Globe, description: 'Strategic partnerships' },
        { id: 'security', label: 'Security', href: '/security', icon: Shield, description: 'Security and compliance' }
      ]
    },
    {
      title: 'Resources',
      items: [
        { id: 'blog', label: 'Blog', href: '/resources/blog', icon: Star, description: 'Latest insights and trends' },
        { id: 'case-studies', label: 'Case Studies', href: '/resources/case-studies', icon: TrendingUp, description: 'Success stories and results' },
        { id: 'api-docs', label: 'API Documentation', href: '/resources/api-docs', icon: Code, description: 'Developer resources and guides' },
        { id: 'webinars', label: 'Webinars', href: '/resources/webinars', icon: Users, description: 'Live events and recordings' },
        { id: 'help-center', label: 'Help Center', href: '/resources/help-center', icon: HelpCircle, description: 'Support and documentation' },
        { id: 'resources-overview', label: 'Resources Overview', href: '/resources', icon: BarChart3, description: 'All resources in one place' }
      ]
    }
  ]

  const mainMenuItems = [
    { id: 'solutions', label: 'Solutions', icon: Briefcase },
    { id: 'ai-agents', label: 'AI Agents', icon: Bot },
    { id: 'portals', label: 'Portals', icon: Globe },
    { id: 'company', label: 'Company', icon: Users },
    { id: 'resources', label: 'Resources', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', href: '/pricing', icon: TrendingUp }
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
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-xl max-h-[80vh] overflow-y-auto"
            >
              <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <div className="max-w-7xl mx-auto">
                  {megaMenuSections
                    .filter(section => {
                      // Map activeMenu to section titles
                      const menuToSection: { [key: string]: string } = {
                        'solutions': 'Solutions',
                        'ai-agents': 'AI Agents',
                        'portals': 'Portals',
                        'company': 'Company',
                        'resources': 'Resources'
                      }
                      return section.title === menuToSection[activeMenu]
                    })
                    .map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="space-y-8"
                      >
                        {/* Section Header */}
                        <div className="text-center mb-8">
                          <h2 className="text-3xl font-bold text-slate-900 mb-2">{section.title}</h2>
                          <p className="text-slate-600 max-w-2xl mx-auto">
                            {section.title === 'Solutions' && 'Complete transportation and logistics solutions powered by AI'}
                            {section.title === 'AI Agents' && 'Intelligent AI agents that automate and optimize your operations'}
                            {section.title === 'Portals' && 'Comprehensive portal ecosystem for all stakeholders'}
                            {section.title === 'Company' && 'Learn more about Trans Bot AI and our mission'}
                            {section.title === 'Resources' && 'Knowledge base, support, and learning resources'}
                          </p>
                        </div>

                        {/* Featured Item */}
                        {section.featured && (
                          <div className="mb-12">
                            <h3 className="text-xl font-semibold text-slate-800 mb-4">Featured Solution</h3>
                            {section.featured.map((item) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02, y: -2 }}
                                className="relative p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl border-2 border-blue-200 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => handleNavigation(item.href)}
                              >
                                <div className="flex items-center space-x-6">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <item.icon className="w-8 h-8 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">{item.label}</h4>
                                    <p className="text-lg text-slate-700 mb-4">{item.description}</p>
                                    <div className="flex items-center text-blue-600 font-semibold">
                                      <span>Explore Solution</span>
                                      <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                  </div>
                                  <div className="absolute top-4 right-4">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Special handling for Portals with organized categories */}
                        {section.title === 'Portals' ? (
                          <div className="space-y-8">
                            {/* Core TMS Portals */}
                            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                              <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                                  <Rocket className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-blue-900">Core TMS Portals</h3>
                                  <p className="text-blue-700 text-sm">Essential transportation management portals</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.items.slice(0, 11).map((item, itemIndex) => (
                                  <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    onClick={() => handleNavigation(item.href)}
                                    className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 text-left"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <item.icon className="w-5 h-5 text-blue-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors text-sm">
                                          {item.label}
                                        </h4>
                                        <p className="text-xs text-blue-600 leading-relaxed">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Business Operations Portals */}
                            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                              <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                                  <Briefcase className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-purple-900">Business Operations</h3>
                                  <p className="text-purple-700 text-sm">Business and administrative portals</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.items.slice(11, 17).map((item, itemIndex) => (
                                  <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    onClick={() => handleNavigation(item.href)}
                                    className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300 text-left"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <item.icon className="w-5 h-5 text-purple-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-purple-900 group-hover:text-purple-700 transition-colors text-sm">
                                          {item.label}
                                        </h4>
                                        <p className="text-xs text-purple-600 leading-relaxed">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Admin & Specialized Portals */}
                            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200">
                              <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                                  <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-emerald-900">Admin & Specialized</h3>
                                  <p className="text-emerald-700 text-sm">Administrative and specialized portals</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.items.slice(17).map((item, itemIndex) => (
                                  <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    onClick={() => handleNavigation(item.href)}
                                    className="group p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 text-left"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 group-hover:from-emerald-200 group-hover:to-emerald-300 rounded-lg flex items-center justify-center transition-all duration-300">
                                        <item.icon className="w-5 h-5 text-emerald-600" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-emerald-900 group-hover:text-emerald-700 transition-colors text-sm">
                                          {item.label}
                                        </h4>
                                        <p className="text-xs text-emerald-600 leading-relaxed">
                                          {item.description}
                                        </p>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Regular Items for other sections */
                          <div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-6">
                              {section.title === 'Solutions' && 'All Solutions'}
                              {section.title === 'AI Agents' && 'All AI Agents'}
                              {section.title === 'Portals' && 'All Portals'}
                              {section.title === 'Company' && 'Company Information'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {section.items.map((item, itemIndex) => (
                                <motion.button
                                  key={item.id}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                  whileHover={{ y: -4, scale: 1.02 }}
                                  onClick={() => handleNavigation(item.href)}
                                  className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left"
                                >
                                  <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100 rounded-xl flex items-center justify-center transition-all duration-300">
                                      <item.icon className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                                        {item.label}
                                      </h4>
                                      <p className="text-sm text-slate-500 leading-relaxed">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}
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
