import { motion } from 'framer-motion'
import { ChevronDown, Menu, X, Brain } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark dark:glass-light border-b border-slate-300/20 dark:border-slate-600/20">
      <div className="container-pro">
        <div className="flex items-center justify-between h-16">
                           {/* Trans Bot AI Logo */}
                 <motion.div
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-2xl font-bold gradient-text flex items-center gap-2"
                 >
                   <Brain className="w-6 h-6 text-cyan-400" />
                   Trans Bot AI
                 </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['Who We Help', 'Product', 'Resources', 'Pricing'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ y: -2 }}
                className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
              >
                <span>{item}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Get Demo
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-[rgba(255,255,255,0.1)]"
          >
            <div className="space-y-4">
              {['Who We Help', 'Product', 'Resources', 'Pricing'].map((item) => (
                <button key={item} className="block w-full text-left text-white/80 hover:text-white">
                  {item}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                <button className="block w-full text-left text-white/80 hover:text-white">
                  Login
                </button>
                <button className="btn-primary w-full">
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
