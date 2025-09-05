import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FloatingActionButton } from './FloatingActionButton'
import { 
  Brain, 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Globe,
  BarChart3,
  Truck,
  Target,
  Building,
  Cpu,
  Activity,
  Shield,
  ChevronDown
} from 'lucide-react'

export function WorldClassHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeAgent, setActiveAgent] = useState(0)
  const [aiStatus, setAiStatus] = useState('Processing...')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const agents = [
    { id: 0, name: 'Route Optimizer', status: 'Active', efficiency: 98 },
    { id: 1, name: 'Load Matcher', status: 'Learning', efficiency: 94 },
    { id: 2, name: 'Predictive Analytics', status: 'Processing', efficiency: 96 },
    { id: 3, name: 'Fleet Manager', status: 'Active', efficiency: 99 },
    { id: 4, name: 'Demand Forecaster', status: 'Analyzing', efficiency: 92 }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent(prev => (prev + 1) % agents.length)
      setAiStatus(agents[activeAgent].status)
    }, 2000)
    return () => clearInterval(interval)
  }, [activeAgent])

  const navigationItems = [
    { name: 'Solutions', icon: Target, hasSubmenu: true },
    { name: 'Pricing', icon: BarChart3, hasSubmenu: false },
    { name: 'Resources', icon: Globe, hasSubmenu: true },
    { name: 'Company', icon: Building, hasSubmenu: true },
    { name: 'Industries', icon: Truck, hasSubmenu: true },
    { name: 'Portals', icon: Shield, hasSubmenu: true },
    { name: 'AI Agents', icon: Brain, hasSubmenu: true }
  ]

  return (
    <>
      {/* Neural Network Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-5">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 100 + '%'}
              cy={Math.random() * 100 + '%'}
              r="2"
              fill="url(#neuralGradient)"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + '%'}
              y1={Math.random() * 100 + '%'}
              x2={Math.random() * 100 + '%'}
              y2={Math.random() * 100 + '%'}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Glassmorphism Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'backdrop-blur-2xl bg-white/80 shadow-2xl border-b border-transbot-border/20' 
            : 'backdrop-blur-xl bg-white/60 shadow-transbot'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Sidebar Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg bg-transbot-neutral-light hover:bg-transbot-border transition-colors duration-200 mr-4"
            >
              <Menu className="w-5 h-5 text-transbot-text-primary" />
            </motion.button>

            {/* Logo Section with AI Status */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-transbot">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-transbot-teal rounded-full"
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
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Trans Bot AI
                </h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse"></div>
                  <span className="text-xs text-transbot-text-secondary font-medium">
                    {agents[activeAgent].name} • {aiStatus}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
                          {navigationItems.map((item) => (
              <motion.div
                key={item.name}
                className="relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                  <button className="flex items-center gap-2 px-4 py-2 text-transbot-text-primary hover:text-transbot-sky font-medium transition-colors duration-200">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    {item.hasSubmenu && <ChevronDown className="w-3 h-3" />}
                  </button>
                  
                  {/* Hover Effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* AI Status Indicator */}
              <motion.div
                className="hidden md:flex items-center gap-3 px-4 py-2 bg-transbot-sky/10 rounded-full border border-transbot-sky/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-transbot-sky">
                    {agents[activeAgent].efficiency}% Efficiency
                  </span>
                </div>
                <Activity className="w-4 h-4 text-transbot-sky" />
              </motion.div>

              {/* Search */}
              <motion.button
                className="p-2 rounded-xl bg-transbot-neutral-light hover:bg-transbot-border transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5 text-transbot-text-primary" />
              </motion.button>

              {/* Notifications */}
              <motion.button
                className="relative p-2 rounded-xl bg-transbot-neutral-light hover:bg-transbot-border transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5 text-transbot-text-primary" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-transbot-teal rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.button>

              {/* User Menu */}
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-xl hover:opacity-90 transition-opacity duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block font-medium">Login</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 rounded-xl bg-transbot-neutral-light hover:bg-transbot-border transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
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
              className="lg:hidden border-t border-transbot-border/20 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-transbot-text-primary hover:text-transbot-sky hover:bg-transbot-sky/5 rounded-xl transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                    {item.hasSubmenu && <ChevronDown className="w-4 h-4 ml-auto" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* AI Agent Status Bar */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-20 left-4 z-40 hidden xl:block"
      >
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-transbot border border-transbot-border/20 p-4 w-80">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-transbot-sky/10">
              <Cpu className="w-5 h-5 text-transbot-sky" />
            </div>
            <div>
              <h3 className="font-semibold text-transbot-text-primary">AI Agents Status</h3>
              <p className="text-sm text-transbot-text-secondary">Real-time monitoring</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  activeAgent === index 
                    ? 'bg-gradient-primary text-white' 
                    : 'bg-transbot-neutral-light hover:bg-transbot-border'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activeAgent === index ? 'bg-white' : 'bg-transbot-teal'
                    } ${agent.status === 'Active' ? 'animate-pulse' : ''}`} />
                    <span className={`font-medium ${
                      activeAgent === index ? 'text-white' : 'text-transbot-text-primary'
                    }`}>
                      {agent.name}
                    </span>
                  </div>
                  <div className={`text-sm font-semibold ${
                    activeAgent === index ? 'text-white' : 'text-transbot-sky'
                  }`}>
                    {agent.efficiency}%
                  </div>
                </div>
                <div className={`text-xs mt-1 ${
                  activeAgent === index ? 'text-white/80' : 'text-transbot-text-secondary'
                }`}>
                  Status: {agent.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced FAB (Floating Action Button) */}
      <FloatingActionButton />
    </>
  )
}
