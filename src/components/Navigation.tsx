import React from 'react';
import { motion } from 'framer-motion'
import { ChevronDown, Menu, X, Brain } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-lg dark:bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-lg border-b border-slate-300/20 dark:border-slate-600/20 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="container-pro responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between h-16 responsive-container sm:flex-col md:flex-row lg:grid">
                           {/* Trans Bot AI Logo */}
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-2xl font-bold gradient-text flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid"
                 >
                   <Brain className="w-6 h-6 text-cyan-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                   Trans Bot AI
                 </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {['Who We Help', 'Product', 'Resources', 'Pricing'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                className="flex items-center space-x-1 text-transbot-text-primary/80 hover:text-transbot-text-primary transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <span>{item}</span>
                <ChevronDown className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-transbot-text-primary transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              Get Demo
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {isMenuOpen ? <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Menu className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-[rgba(255,255,255,0.1)] responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {['Who We Help', 'Product', 'Resources', 'Pricing'].map((item) => (
                <button key={item} className="block w-full text-left text-transbot-text-primary/80 hover:text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  {item}
                </button>
              ))}
              <div className="pt-4 space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <button className="block w-full text-left text-transbot-text-primary/80 hover:text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  Login
                </button>
                <button className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 w-full responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  Get Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}