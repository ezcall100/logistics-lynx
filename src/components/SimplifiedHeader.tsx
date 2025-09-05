import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  User, 
  LogIn,
  Play,
  Search,
  PanelLeft
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'
import { useSidebar } from '../contexts/SidebarContext'

export function SimplifiedHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { isSidebarOpen, toggleSidebar } = useSidebar()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = async (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
    await trackUserInteraction('header_navigation', { path })
  }

  const handleSignIn = async () => {
    await trackUserInteraction('sign_in_clicked', { source: 'header' })
    handleNavigation('/login')
  }

  const handleSignUp = async () => {
    await trackUserInteraction('sign_up_clicked', { source: 'header' })
    handleNavigation('/signup')
  }

  const handleDemo = async () => {
    await trackUserInteraction('demo_requested', { source: 'header' })
    handleNavigation('/demo')
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      await trackUserInteraction('header_search', { query })
    }
  }

  const handleSidebarToggle = async () => {
    toggleSidebar()
    await trackUserInteraction('sidebar_toggle', { isOpen: !isSidebarOpen })
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl border-b border-slate-200/60 shadow-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Sidebar Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSidebarToggle}
            className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg hover:bg-blue-50 transition-all duration-200"
            title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            <PanelLeft className={`w-5 h-5 text-transbot-text-primary transition-transform duration-200 ${
              isSidebarOpen ? 'rotate-0' : 'rotate-180'
            }`} />
          </motion.button>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
              <input
                type="text"
                placeholder="Search portals, pages..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Demo Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDemo}
              className="flex items-center gap-2 px-6 py-2 bg-transbot-sky text-white rounded-lg font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              Demo
            </motion.button>

            {/* Sign In */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              className="flex items-center gap-2 px-6 py-2 text-transbot-text-primary hover:text-transbot-sky font-semibold transition-colors duration-200"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </motion.button>

            {/* Sign Up */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignUp}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-primary text-white rounded-lg font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
            >
              <User className="w-4 h-4" />
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-transbot-text-primary"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-200/60 overflow-hidden"
      >
        <div className="px-6 py-4 space-y-4">
          {/* Mobile Sidebar Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSidebarToggle}
            className="w-full flex items-center gap-3 p-3 text-transbot-text-primary hover:bg-blue-50 rounded-lg font-semibold transition-colors"
          >
            <PanelLeft className={`w-5 h-5 transition-transform duration-200 ${
              isSidebarOpen ? 'rotate-0' : 'rotate-180'
            }`} />
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </motion.button>

          {/* Mobile Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
            <input
              type="text"
              placeholder="Search portals, pages..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDemo}
            className="w-full flex items-center gap-3 p-3 bg-transbot-sky text-white rounded-lg font-semibold"
          >
            <Play className="w-5 h-5" />
            Request Demo
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignIn}
            className="w-full flex items-center gap-3 p-3 text-transbot-text-primary hover:bg-blue-50 rounded-lg font-semibold transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignUp}
            className="w-full flex items-center gap-3 p-3 bg-gradient-primary text-white rounded-lg font-semibold"
          >
            <User className="w-5 h-5" />
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  )
}
