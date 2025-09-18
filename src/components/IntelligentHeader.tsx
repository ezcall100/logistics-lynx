import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Brain, 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  ChevronDown,
  Truck,
  Target,
  Building,
  Cpu,
  Network,
  Database,
  Shield,
  Users,
  Code,
  Globe,
  FileText,
  Video,
  BookOpen,
  HelpCircle,
  Zap
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'

export function IntelligentHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [aiStatus, setAiStatus] = useState('Active')
  const navigate = useNavigate()

  // AI Agent Status
  const [activeAgent, setActiveAgent] = useState(0)
  const agents = [
    { name: 'Route Optimizer', status: 'Active', efficiency: 98 },
    { name: 'Load Matcher', status: 'Learning', efficiency: 94 },
    { name: 'Predictive Analytics', status: 'Processing', efficiency: 96 },
    { name: 'Fleet Manager', status: 'Active', efficiency: 99 }
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent(prev => (prev + 1) % agents.length)
      setAiStatus(agents[activeAgent].status)
    }, 3000)
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval)
  }, [activeAgent, agents])

  const navigationItems = [
    {
      name: 'Solutions',
      icon: Target,
      hasDropdown: true,
      items: [
        { name: 'Transportation Management', path: '/solutions/transportation', icon: Truck },
        { name: 'Warehouse Management', path: '/solutions/warehouse', icon: Building },
        { name: 'Fleet Management', path: '/solutions/fleet', icon: Truck },
        { name: 'Load Optimization', path: '/solutions/load-optimization', icon: Zap }
      ]
    },
    {
      name: 'AI Agents',
      icon: Brain,
      hasDropdown: true,
      items: [
        { name: 'Route Optimizer', path: '/agents/route-optimizer', icon: Cpu },
        { name: 'Load Matcher', path: '/agents/load-matcher', icon: Network },
        { name: 'Predictive Analytics', path: '/agents/predictive-analytics', icon: Database },
        { name: 'Fleet Manager', path: '/agents/fleet-manager', icon: Shield }
      ]
    },
    {
      name: 'Portals',
      icon: Users,
      hasDropdown: true,
      items: [
        { name: 'Customer Portal', path: '/portals/customer', icon: User },
        { name: 'Partner Portal', path: '/portals/partner', icon: Users },
        { name: 'Developer Portal', path: '/portals/developer', icon: Code },
        { name: 'Admin Portal', path: '/portals/admin', icon: Shield }
      ]
    },
    {
      name: 'Resources',
      icon: Globe,
      hasDropdown: true,
      items: [
        { name: 'Documentation', path: '/docs', icon: FileText },
        { name: 'Tutorials', path: '/tutorials', icon: Video },
        { name: 'Case Studies', path: '/case-studies', icon: BookOpen },
        { name: 'Support', path: '/support', icon: HelpCircle }
      ]
    }
  ]

  const handleNavigation = async (path: string) => {
    navigate(path)
    setActiveDropdown(null)
    await trackUserInteraction('header_navigation', { path })
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      await trackUserInteraction('header_search', { query })
    }
  }

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-transbot-border/20 shadow-transbot' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between h-20 responsive-container sm:flex-col md:flex-row lg:grid">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            whileHover={{ scale: 1.02 }}
            onClick={() => handleNavigation('/')}
          >
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-transbot responsive-container sm:flex-col md:flex-row lg:grid">
                <Brain className="w-7 h-7 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-transbot-teal rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
              />
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent responsive-container sm:flex-col md:flex-row lg:grid">
                Trans Bot AI
              </h1>
              <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span className="text-xs text-transbot-text-secondary font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                  {agents[activeAgent].name} • {aiStatus}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                <motion.button
                  whileHover={{ y: -2 }}
                  onClick={() => toggleDropdown(item.name)}
                  className="flex items-center gap-2 px-4 py-2 text-transbot-text-primary hover:text-transbot-sky font-medium transition-colors duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <item.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  {item.name}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    activeDropdown === item.name ? 'rotate-180' : ''
                  }`} />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl border border-transbot-border/20 shadow-transbot-lg overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {item.items.map((subItem, index) => (
                        <motion.button
                          key={subItem.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: 'rgba(20, 184, 166, 0.1)' }}
                          onClick={() => handleNavigation(subItem.path)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left text-transbot-text-primary hover:text-transbot-sky transition-colors duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          <subItem.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{subItem.name}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Search */}
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-white/80 backdrop-blur-sm border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-transbot-text-secondary hover:text-transbot-sky transition-colors duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Bell className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-transbot-warning rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
            </motion.button>

            {/* User Menu */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-transbot-text-secondary hover:text-transbot-sky transition-colors duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <User className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {isMenuOpen ? <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Menu className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-transbot-border/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="px-6 py-4 space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {/* Mobile Search */}
              <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 responsive-container sm:flex-col md:flex-row lg:grid"
                />
              </div>

              {/* Mobile Navigation */}
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => toggleDropdown(item.name)}
            aria-label="Button"
                    className="w-full flex items-center justify-between py-3 text-transbot-text-primary font-medium responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <item.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      {item.name}
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 space-y-2 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        {item.items.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => handleNavigation(subItem.path)}
            aria-label="Button"
                            className="w-full flex items-center gap-3 py-2 text-transbot-text-secondary hover:text-transbot-sky transition-colors duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
                          >
                            <subItem.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            {subItem.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
