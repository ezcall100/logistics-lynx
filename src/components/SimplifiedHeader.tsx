import React from 'react';
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  User, 
  LogIn,
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
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => window.removeEventListener('scroll', handleScroll)
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


  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      await trackUserInteraction('header_search', { query })
    }
  }

  const handleSidebarToggle = async () => {
    console.log('Toggle clicked! Current state:', isSidebarOpen)
    toggleSidebar()
    console.log('After toggle, new state should be:', !isSidebarOpen)
    await trackUserInteraction('sidebar_toggle', { isOpen: !isSidebarOpen })
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between h-20 responsive-container sm:flex-col md:flex-row lg:grid">
          
          {/* Sidebar Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSidebarToggle}
            className="flex items-center justify-center w-10 h-10 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg hover:bg-blue-50 transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
            title={isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          >
            <PanelLeft className={`w-5 h-5 text-transbot-text-primary transition-transform duration-200 ${
              isSidebarOpen ? 'rotate-0' : 'rotate-180'
            }`} />
          </motion.button>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative w-full responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search portals, pages..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Sign In */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              className="flex items-center gap-2 px-6 py-2 text-transbot-text-primary hover:text-transbot-sky font-semibold transition-colors duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <LogIn className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              Sign In
            </motion.button>

            {/* Sign Up */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignUp}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-primary text-white rounded-lg font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <User className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              Sign Up
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {isMenuOpen ? <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Menu className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />}
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
        className="md:hidden bg-white/90 backdrop-blur-md border-t border-slate-200/50 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="px-6 py-4 space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Mobile Sidebar Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSidebarToggle}
            className="w-full flex items-center gap-3 p-3 text-transbot-text-primary hover:bg-blue-50 rounded-lg font-semibold transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <PanelLeft className={`w-5 h-5 transition-transform duration-200 ${
              isSidebarOpen ? 'rotate-0' : 'rotate-180'
            }`} />
            {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
          </motion.button>

          {/* Mobile Search */}
          <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid" />
            <input
              type="text"
              placeholder="Search portals, pages..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-sm responsive-container sm:flex-col md:flex-row lg:grid"
            />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignIn}
            className="w-full flex items-center gap-3 p-3 text-transbot-text-primary hover:bg-blue-50 rounded-lg font-semibold transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <LogIn className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            Sign In
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignUp}
            className="w-full flex items-center gap-3 p-3 bg-gradient-primary text-white rounded-lg font-semibold responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <User className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  )
}
