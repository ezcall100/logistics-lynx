import React from 'react';
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
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
        <div className="flex justify-between items-center h-16 responsive-container">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 responsive-container">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center responsive-container">
              <span className="text-primary font-bold text-sm responsive-container">TB</span>
            </div>
            <span className="text-xl font-bold text-transbot-text-primary responsive-container">Trans Bot AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 responsive-container">
            <Link to="/" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container">
              Home
            </Link>
            <Link to="/#ecosystem" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container">
              Ecosystem
            </Link>
            <Link to="/#ai-agents" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container">
              AI Agents
            </Link>
            <Link to="/#demo" className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container">
              Demo
            </Link>
          </nav>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4 responsive-container">
            {user ? (
              <div className="relative responsive-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-label="Button"
                  className="flex items-center space-x-2 glass px-3 py-2 rounded-lg hover:bg-white/20 transition-colors responsive-container"
                >
                  <User className="w-4 h-4 responsive-container" />
                  <span className="text-sm responsive-container">{user.name}</span>
                </button>
                
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-lg responsive-container"
                  >
                    <div className="py-2 responsive-container">
                      <Link
                        to={`/dashboard/${user.role}`}
                        className="block px-4 py-2 text-sm text-transbot-text-primary hover:bg-white/80 transition-colors responsive-container"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-transbot-text-primary hover:bg-white/80 transition-colors responsive-container"
                       aria-label="Button">
                        <LogOut className="w-4 h-4 mr-2 responsive-container" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 responsive-container">
                <Link
                  to="/login"
                  className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 responsive-container"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Button"
              className="md:hidden p-2 glass rounded-lg hover:bg-white/20 transition-colors responsive-container"
            >
              {isMenuOpen ? <X className="w-5 h-5 responsive-container" /> : <Menu className="w-5 h-5 responsive-container" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden py-4 border-t border-slate-200/50 responsive-container"
          >
            <nav className="flex flex-col space-y-4 responsive-container">
              <Link
                to="/"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/#ecosystem"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container"
                onClick={() => setIsMenuOpen(false)}
              >
                Ecosystem
              </Link>
              <Link
                to="/#ai-agents"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Agents
              </Link>
              <Link
                to="/#demo"
                className="text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container"
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