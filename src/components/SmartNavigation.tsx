import { motion } from 'framer-motion'
import { ChevronDown, Brain, User, Settings, LogOut, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { MobileNavigation } from './MobileNavigation'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

export function SmartNavigation() {
  const { user } = useAuth()
  const [aiInsights, setAiInsights] = useState('')
  const userRole = user?.role || 'guest'

  useEffect(() => {
    // Simulate AI analyzing user behavior and providing insights
    const insights = [
      'AI suggests: Check your load board for new opportunities',
      'AI recommends: Optimize your current routes',
      'AI alerts: 3 new loads match your criteria',
      'AI suggests: Review your financial dashboard',
      'AI recommends: Update your driver schedules'
    ]
    
    const interval = setInterval(() => {
      setAiInsights(insights[Math.floor(Math.random() * insights.length)])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getMainMenu = () => {
    // Always show the 8 main pages
    return [
      'Home', 'Solutions', 'Pricing', 'Resources', 
      'Company', 'Industries', 'Portals', 'AI Agents'
    ]
  }

  const getRoleBasedMenu = () => {
    const baseMenu = getMainMenu()
    
    switch (userRole) {
      case 'broker':
        return [...baseMenu, 'Load Board', 'Carrier Network', 'Analytics']
      case 'carrier':
        return [...baseMenu, 'Fleet Management', 'Driver Portal', 'Maintenance']
      case 'shipper':
        return [...baseMenu, 'Shipment Tracking', 'Rate Management', 'Compliance']
      case 'superadmin':
        return [...baseMenu, 'Super Admin', 'System Control', 'AI Management']
      default:
        return baseMenu
    }
  }

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
            <Brain className="w-6 h-6 text-emerald-400" />
            Trans Bot AI
          </motion.div>

          {/* AI Insights Bar */}
          {aiInsights && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <Brain className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-600 dark:text-emerald-400">
                {aiInsights}
              </span>
            </motion.div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getRoleBasedMenu().map((item) => {
              const getPagePath = (pageName: string) => {
                switch (pageName) {
                  case 'Home': return '/'
                  case 'Solutions': return '/solutions'
                  case 'Pricing': return '/pricing'
                  case 'Resources': return '/resources'
                  case 'Company': return '/company'
                  case 'Industries': return '/industries'
                  case 'Portals': return '/portals'
                  case 'AI Agents': return '/ai-agents'
                  default: return '#'
                }
              }

              return (
                <Link key={item} to={getPagePath(item)}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <span>{item}</span>
                    <ChevronDown className="w-4 h-4" />
                  </motion.button>
                </Link>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {userRole === 'guest' ? (
              <>
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
              </>
            ) : (
              <>
                {userRole === 'superadmin' && (
                  <Link to="/super-admin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Super Admin</span>
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="capitalize">{userRole}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>

      </div>
    </nav>
  )
}
