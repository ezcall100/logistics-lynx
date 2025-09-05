import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Brain, User, Settings, LogOut, Shield, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { MobileNavigation } from './MobileNavigation'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface SubPage {
  name: string
  path: string
}

interface MenuItem {
  name: string
  path: string
  hasSubmenu: boolean
  subpages?: SubPage[]
}

export function SmartNavigation() {
  const { user } = useAuth()
  const [aiInsights, setAiInsights] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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

  const getMainMenu = (): MenuItem[] => {
    // Always show the 8 main pages with their sub-pages
    return [
      { name: 'Home', path: '/', hasSubmenu: false },
      { 
        name: 'Solutions', 
        path: '/solutions', 
        hasSubmenu: true,
        subpages: [
          { name: 'Transportation Management', path: '/solutions/transportation' },
          { name: 'Warehouse Management', path: '/solutions/warehouse' },
          { name: 'Fleet Management', path: '/solutions/fleet' },
          { name: 'Load Optimization', path: '/solutions/load-optimization' },
          { name: 'Route Planning', path: '/solutions/route-planning' },
          { name: 'Real-time Tracking', path: '/solutions/tracking' }
        ]
      },
      { 
        name: 'Pricing', 
        path: '/pricing', 
        hasSubmenu: true,
        subpages: [
          { name: 'Starter Plan', path: '/pricing/starter' },
          { name: 'Professional Plan', path: '/pricing/professional' },
          { name: 'Enterprise Plan', path: '/pricing/enterprise' },
          { name: 'Custom Solutions', path: '/pricing/custom' },
          { name: 'Compare Plans', path: '/pricing/compare' }
        ]
      },
      { 
        name: 'Resources', 
        path: '/resources', 
        hasSubmenu: true,
        subpages: [
          { name: 'Documentation', path: '/resources/documentation' },
          { name: 'Case Studies', path: '/resources/case-studies' },
          { name: 'API Reference', path: '/resources/api' },
          { name: 'Tutorials', path: '/resources/tutorials' },
          { name: 'Blog', path: '/resources/blog' },
          { name: 'Support Center', path: '/resources/support' }
        ]
      },
      { 
        name: 'Company', 
        path: '/company', 
        hasSubmenu: true,
        subpages: [
          { name: 'About Us', path: '/company/about' },
          { name: 'Leadership', path: '/company/leadership' },
          { name: 'Careers', path: '/company/careers' },
          { name: 'Press', path: '/company/press' },
          { name: 'Partners', path: '/company/partners' },
          { name: 'Contact', path: '/company/contact' }
        ]
      },
      { 
        name: 'Industries', 
        path: '/industries', 
        hasSubmenu: true,
        subpages: [
          { name: 'E-commerce', path: '/industries/ecommerce' },
          { name: 'Manufacturing', path: '/industries/manufacturing' },
          { name: 'Retail', path: '/industries/retail' },
          { name: 'Healthcare', path: '/industries/healthcare' },
          { name: 'Food & Beverage', path: '/industries/food-beverage' },
          { name: 'Automotive', path: '/industries/automotive' }
        ]
      },
      { 
        name: 'Portals', 
        path: '/portals', 
        hasSubmenu: true,
        subpages: [
          { name: 'Shipper Portal', path: '/portals/shipper' },
          { name: 'Broker Portal', path: '/portals/broker' },
          { name: 'Carrier Portal', path: '/portals/carrier' },
          { name: 'Driver Portal', path: '/portals/driver' },
          { name: 'Admin Portal', path: '/portals/admin' },
          { name: 'Super Admin', path: '/super-admin' }
        ]
      },
      { 
        name: 'AI Agents', 
        path: '/ai-agents', 
        hasSubmenu: true,
        subpages: [
          { name: 'MCP Agents', path: '/ai-agents/mcp' },
          { name: 'Automation Tools', path: '/ai-agents/automation' },
          { name: 'AI Analytics', path: '/ai-agents/analytics' },
          { name: 'Machine Learning', path: '/ai-agents/ml' },
          { name: 'Agent Marketplace', path: '/ai-agents/marketplace' },
          { name: 'Custom Agents', path: '/ai-agents/custom' }
        ]
      }
    ]
  }

  const getRoleBasedMenu = (): MenuItem[] => {
    const baseMenu = getMainMenu()
    
    // For now, return the base menu for all roles
    // Role-specific items can be added later
    return baseMenu
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark dark:glass-light border-b border-slate-300/20 dark:border-slate-600/20">
      <div className="container-pro">
        <div className="flex items-center justify-between h-16">
          {/* Trans Bot AI Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold gradient-text flex items-center gap-2 flex-shrink-0"
          >
            <Brain className="w-6 h-6 text-emerald-400" />
            Trans Bot AI
          </motion.div>

          {/* Center Content Area */}
          <div className="flex-1 flex items-center justify-center">
            {/* AI Insights Bar - Desktop */}
            {aiInsights && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <Brain className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-600 dark:text-emerald-400">
                  {aiInsights}
                </span>
              </motion.div>
            )}

            {/* AI Insights Bar - Tablet */}
            {aiInsights && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:flex xl:hidden items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
              >
                <Brain className="w-3 h-3 text-emerald-400" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 truncate max-w-32">
                  {aiInsights}
                </span>
              </motion.div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
            {getRoleBasedMenu().map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={item.path}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.hasSubmenu && <ChevronDown className="w-3 h-3" />}
                  </motion.button>
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.hasSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 glass-dark rounded-xl shadow-2xl border border-white/10 z-50"
                    >
                      <div className="p-3">
                        {item.subpages?.map((subpage: SubPage, index: number) => (
                          <motion.div
                            key={subpage.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={subpage.path}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors group"
                            >
                              <span className="text-white/90 group-hover:text-white text-sm">
                                {subpage.name}
                              </span>
                              <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-white/80 transition-colors" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center space-x-4 flex-shrink-0">
            {getRoleBasedMenu().slice(0, 4).map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to={item.path}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-2 rounded-lg hover:bg-white/5"
                  >
                    <span className="text-xs font-medium">{item.name}</span>
                    {item.hasSubmenu && <ChevronDown className="w-3 h-3" />}
                  </motion.button>
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.hasSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 glass-dark rounded-xl shadow-2xl border border-white/10 z-50"
                    >
                      <div className="p-2">
                        {item.subpages?.slice(0, 4).map((subpage: SubPage, index: number) => (
                          <motion.div
                            key={subpage.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              to={subpage.path}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors group"
                            >
                              <span className="text-white/90 group-hover:text-white text-xs">
                                {subpage.name}
                              </span>
                              <ArrowRight className="w-3 h-3 text-white/50 group-hover:text-white/80 transition-colors" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <ThemeToggle />
            
            {userRole === 'guest' ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-4 py-2 text-sm"
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
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors text-sm"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Super Admin</span>
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <User className="w-4 h-4" />
                  <span className="capitalize text-sm">{userRole}</span>
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

          {/* Action Buttons - Tablet */}
          <div className="hidden md:flex lg:hidden items-center space-x-2 flex-shrink-0">
            <ThemeToggle />
            
            {userRole === 'guest' ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-2 rounded-lg hover:bg-white/5 text-xs"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-3 py-2 text-xs"
                >
                  Demo
                </motion.button>
              </>
            ) : (
              <>
                {userRole === 'superadmin' && (
                  <Link to="/super-admin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 px-2 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors text-xs"
                    >
                      <Shield className="w-3 h-3" />
                      <span>Admin</span>
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2 py-2 rounded-lg hover:bg-white/5"
                >
                  <User className="w-3 h-3" />
                  <span className="capitalize text-xs">{userRole}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                </motion.button>
              </>
            )}
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex md:hidden items-center space-x-2 flex-shrink-0">
            <ThemeToggle />
            
            {userRole === 'guest' ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors px-2 py-2 rounded-lg hover:bg-white/5 text-xs"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-3 py-2 text-xs"
                >
                  Demo
                </motion.button>
              </>
            ) : (
              <>
                {userRole === 'superadmin' && (
                  <Link to="/super-admin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 px-2 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors text-xs"
                    >
                      <Shield className="w-3 h-3" />
                    </motion.button>
                  </Link>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
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
