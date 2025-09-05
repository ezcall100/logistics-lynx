import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Brain } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'



export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)


  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    {
      label: 'Solutions',
      submenu: ['TMS Solutions', 'AI Automation', 'Global Operations', 'Industry Solutions']
    },
    {
      label: 'Pricing',
      submenu: ['Plans', 'Features', 'Custom Solutions', 'Enterprise']
    },
    {
      label: 'Resources',
      submenu: ['Documentation', 'API Reference', 'Tutorials', 'Case Studies']
    }
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg glass-dark dark:glass-light hover:scale-105 transition-all duration-200"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] glass-dark dark:glass-light z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-300/20 dark:border-slate-600/20">
                  <div className="flex items-center gap-2">
                    <Brain className="w-6 h-6 text-emerald-400" />
                    <span className="text-xl font-bold gradient-text">Trans Bot AI</span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <div key={item.label}>
                        <button
                          onClick={() => setActiveSubmenu(
                            activeSubmenu === item.label ? null : item.label
                          )}
                          className="w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {item.label}
                          </span>
                          <ChevronDown 
                            className={`w-4 h-4 text-slate-500 transition-transform ${
                              activeSubmenu === item.label ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeSubmenu === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 space-y-1 py-2">
                                {item.submenu.map((subItem) => (
                                  <a
                                    key={subItem}
                                    href="#"
                                    className="block p-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem}
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-300/20 dark:border-slate-600/20 space-y-3">
                  <button className="w-full btn-secondary">
                    Login
                  </button>
                  <button className="w-full btn-primary">
                    Get Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
