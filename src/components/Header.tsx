import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsUserMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">TB</span>
            </div>
            <span className="text-xl font-bold text-transbot-text-primary">Trans Bot AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors">
              Home
            </Link>
            <Link to="/#ecosystem" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors">
              Ecosystem
            </Link>
            <Link to="/#ai-agents" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors">
              AI Agents
            </Link>
            <Link to="/#demo" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors">
              Demo
            </Link>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 glass px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg"
                  >
                    <div className="py-2">
                      <Link
                        to={`/dashboard/${user.role}`}
                        className="block px-4 py-2 text-sm text-transbot-text-primary hover:bg-white/80 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-transbot-text-primary hover:bg-white/80 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 glass rounded-lg hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden py-4 border-t border-slate-200/50"
          >
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#ecosystem"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ecosystem
              </Link>
              <Link
                to="/#ai-agents"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Agents
              </Link>
              <Link
                to="/#demo"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}