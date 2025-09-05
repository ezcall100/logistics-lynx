import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Brain, 
  Menu, 
  X, 
  User, 
  LogIn,
  Play
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'

export function SimplifiedHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
          
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => handleNavigation('/')}
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
              <p className="text-xs text-transbot-text-secondary font-medium">
                Intelligent Logistics Platform
              </p>
            </div>
          </motion.div>

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
