import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Brain, 
  Home, 
  Target, 
  BarChart3, 
  Globe, 
  Building, 
  Truck, 
  Shield, 
  Zap,
  ChevronDown,
  Activity,
  TrendingUp,
  Cpu,
  Network,
  Database,
  FileText,
  Video,
  BookOpen,
  HelpCircle,
  Users,
  User,
  Code,
  Search
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'

export function IntelligentSidebar() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = async (path: string) => {
    navigate(path)
    await trackUserInteraction('sidebar_navigation', { path })
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      await trackUserInteraction('sidebar_search', { query })
    }
  }

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  const navigationSections = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      color: 'text-transbot-sky',
      path: '/dashboard',
      items: [
        { name: 'Overview', icon: BarChart3, path: '/dashboard/overview' },
        { name: 'Analytics', icon: TrendingUp, path: '/dashboard/analytics' },
        { name: 'Performance', icon: Activity, path: '/dashboard/performance' }
      ]
    },
    {
      id: 'solutions',
      name: 'Solutions',
      icon: Target,
      color: 'text-transbot-teal',
      items: [
        { name: 'Transportation', icon: Truck, path: '/solutions/transportation' },
        { name: 'Warehouse', icon: Building, path: '/solutions/warehouse' },
        { name: 'Fleet Management', icon: Truck, path: '/solutions/fleet' },
        { name: 'Load Optimization', icon: Zap, path: '/solutions/load-optimization' }
      ]
    },
    {
      id: 'ai-agents',
      name: 'AI Agents',
      icon: Brain,
      color: 'text-transbot-purple',
      items: [
        { name: 'Route Optimizer', icon: Cpu, path: '/agents/route-optimizer' },
        { name: 'Load Matcher', icon: Network, path: '/agents/load-matcher' },
        { name: 'Predictive Analytics', icon: Database, path: '/agents/predictive-analytics' },
        { name: 'Fleet Manager', icon: Shield, path: '/agents/fleet-manager' }
      ]
    },
    {
      id: 'portals',
      name: 'Portals',
      icon: Users,
      color: 'text-transbot-warning',
      items: [
        { name: 'Customer Portal', icon: User, path: '/portals/customer' },
        { name: 'Partner Portal', icon: Users, path: '/portals/partner' },
        { name: 'Developer Portal', icon: Code, path: '/portals/developer' },
        { name: 'Admin Portal', icon: Shield, path: '/portals/admin' }
      ]
    },
    {
      id: 'resources',
      name: 'Resources',
      icon: Globe,
      color: 'text-transbot-navy',
      items: [
        { name: 'Documentation', icon: FileText, path: '/docs' },
        { name: 'Tutorials', icon: Video, path: '/tutorials' },
        { name: 'Case Studies', icon: BookOpen, path: '/case-studies' },
        { name: 'Support', icon: HelpCircle, path: '/support' }
      ]
    }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden md:block fixed left-0 top-20 bottom-0 z-30 w-64"
    >
      <div className="h-full bg-white/95 backdrop-blur-xl border-r border-transbot-border/20 shadow-transbot">
        
        {/* Header */}
        <div className="p-4 border-b border-transbot-border/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-transbot-text-primary">Navigation</h2>
              <p className="text-xs text-transbot-text-secondary">Smart Access</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-transbot-border/20">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-transbot-text-secondary" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationSections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-1"
            >
              {/* Section Header */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => section.path ? handleNavigation(section.path) : toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition-all duration-200 ${
                  section.path && isActive(section.path)
                    ? 'bg-gradient-primary text-white shadow-transbot'
                    : 'text-transbot-text-primary hover:bg-transbot-sky/5 hover:text-transbot-sky'
                }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon className={`w-5 h-5 ${section.color}`} />
                  <span>{section.name}</span>
                </div>
                {section.items && (
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    activeSection === section.id ? 'rotate-180' : ''
                  }`} />
                )}
              </motion.button>

              {/* Sub-items */}
              <AnimatePresence>
                {activeSection === section.id && section.items && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 space-y-1"
                  >
                    {section.items.map((item, index) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm transition-all duration-200 ${
                          isActive(item.path)
                            ? 'bg-transbot-sky/10 text-transbot-sky font-medium'
                            : 'text-transbot-text-secondary hover:text-transbot-sky hover:bg-transbot-sky/5'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-transbot-border/20">
          <div className="flex items-center gap-2 text-xs text-transbot-text-secondary">
            <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse"></div>
            <span>AI System Active</span>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
