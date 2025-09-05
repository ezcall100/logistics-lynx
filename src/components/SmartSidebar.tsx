import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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
  ChevronRight,
  ChevronDown,
  Search,
  Settings,
  User,
  Bell,
  Activity,
  TrendingUp,
  Cpu,
  Network,
  Database,
  Lock,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Star,
  Award,
  Clock,
  Users,
  FileText,
  Video,
  BookOpen,
  MessageSquare,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Grid3X3,
  Menu,
  X
} from 'lucide-react'

export function SmartSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [aiInsights, setAiInsights] = useState([
    'Route optimization increased by 15%',
    'New load matching opportunity detected',
    'Fleet efficiency trending upward'
  ])

  const mainSections = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: Home,
      color: 'transbot-sky',
      items: [
        { name: 'Overview', icon: Activity, path: '/dashboard' },
        { name: 'Analytics', icon: BarChart3, path: '/analytics' },
        { name: 'Performance', icon: TrendingUp, path: '/performance' }
      ]
    },
    {
      id: 'solutions',
      name: 'Solutions',
      icon: Target,
      color: 'transbot-teal',
      items: [
        { name: 'Transportation', icon: Truck, path: '/solutions/transportation' },
        { name: 'Warehouse', icon: Building, path: '/solutions/warehouse' },
        { name: 'Fleet Management', icon: Route, path: '/solutions/fleet' },
        { name: 'Load Optimization', icon: Zap, path: '/solutions/load-optimization' }
      ]
    },
    {
      id: 'ai-agents',
      name: 'AI Agents',
      icon: Brain,
      color: 'transbot-purple',
      items: [
        { name: 'Route Optimizer', icon: Cpu, path: '/agents/route-optimizer' },
        { name: 'Load Matcher', icon: Network, path: '/agents/load-matcher' },
        { name: 'Predictive Analytics', icon: Database, path: '/agents/analytics' },
        { name: 'Fleet Manager', icon: Shield, path: '/agents/fleet-manager' }
      ]
    },
    {
      id: 'resources',
      name: 'Resources',
      icon: Globe,
      color: 'transbot-navy',
      items: [
        { name: 'Documentation', icon: FileText, path: '/docs' },
        { name: 'Tutorials', icon: Video, path: '/tutorials' },
        { name: 'Case Studies', icon: BookOpen, path: '/case-studies' },
        { name: 'Support', icon: HelpCircle, path: '/support' }
      ]
    }
  ]

  const quickActions = [
    { name: 'New Route', icon: Route, action: () => console.log('New Route') },
    { name: 'Optimize Fleet', icon: Zap, action: () => console.log('Optimize Fleet') },
    { name: 'View Reports', icon: BarChart3, action: () => console.log('View Reports') },
    { name: 'AI Insights', icon: Brain, action: () => console.log('AI Insights') }
  ]

  const recentActivity = [
    { action: 'Route optimized', time: '2 min ago', icon: Route },
    { action: 'Load matched', time: '5 min ago', icon: Truck },
    { action: 'Report generated', time: '10 min ago', icon: FileText },
    { action: 'AI analysis complete', time: '15 min ago', icon: Brain }
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed left-0 top-20 bottom-0 z-30 transition-all duration-500 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}
    >
      <div className="h-full bg-white/95 backdrop-blur-xl border-r border-transbot-border/20 shadow-transbot">
        
        {/* Header */}
        <div className="p-4 border-b border-transbot-border/20">
          <div className="flex items-center justify-between">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-transbot-text-primary">Smart Panel</h2>
                  <p className="text-xs text-transbot-text-secondary">AI-Powered Navigation</p>
                </div>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-transbot-neutral-light hover:bg-transbot-border transition-colors duration-200"
            >
              {isExpanded ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Search */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-transbot-text-secondary" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transbot-neutral-light border border-transbot-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-transbot-sky/20 focus:border-transbot-sky transition-all duration-200"
              />
            </div>
          </motion.div>
        )}

        {/* AI Insights */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4"
          >
            <div className="bg-gradient-to-r from-transbot-sky/10 to-transbot-teal/10 rounded-xl p-4 border border-transbot-sky/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-transbot-sky" />
                <h3 className="font-semibold text-transbot-text-primary text-sm">AI Insights</h3>
              </div>
              <div className="space-y-2">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-xs text-transbot-text-secondary bg-white/50 rounded-lg p-2"
                  >
                    {insight}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {mainSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + sectionIndex * 0.1 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-gradient-primary text-white shadow-transbot'
                    : 'bg-transbot-neutral-light hover:bg-transbot-border text-transbot-text-primary'
                }`}
              >
                <section.icon className={`w-5 h-5 ${
                  activeSection === section.id ? 'text-white' : `text-${section.color}`
                }`} />
                {isExpanded && (
                  <>
                    <span className="font-medium">{section.name}</span>
                    {activeSection === section.id ? (
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </>
                )}
              </motion.button>

              {/* Sub-items */}
              <AnimatePresence>
                {activeSection === section.id && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-4 space-y-1"
                  >
                    {section.items.map((item, itemIndex) => (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: itemIndex * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg text-transbot-text-secondary hover:text-transbot-sky hover:bg-transbot-sky/5 transition-all duration-200"
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="text-sm">{item.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="p-4 border-t border-transbot-border/20"
          >
            <h3 className="font-semibold text-transbot-text-primary text-sm mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className="p-3 bg-transbot-neutral-light hover:bg-transbot-border rounded-lg transition-all duration-200"
                >
                  <action.icon className="w-4 h-4 text-transbot-sky mx-auto mb-1" />
                  <span className="text-xs text-transbot-text-primary font-medium">{action.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="p-4 border-t border-transbot-border/20"
          >
            <h3 className="font-semibold text-transbot-text-primary text-sm mb-3">Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-transbot-neutral-light transition-colors duration-200"
                >
                  <activity.icon className="w-4 h-4 text-transbot-sky" />
                  <div className="flex-1">
                    <p className="text-xs text-transbot-text-primary">{activity.action}</p>
                    <p className="text-xs text-transbot-text-secondary">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Collapsed State Icons */}
        {!isExpanded && (
          <div className="flex flex-col items-center py-4 space-y-4">
            {mainSections.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-lg bg-transbot-neutral-light hover:bg-transbot-border transition-colors duration-200"
                title={section.name}
              >
                <section.icon className={`w-5 h-5 text-${section.color}`} />
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.aside>
  )
}
