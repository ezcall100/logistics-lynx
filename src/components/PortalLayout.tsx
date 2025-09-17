import React from 'react';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Menu, 
  ChevronRight,
  Home,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  User,
  Zap,
  Target,
  TrendingUp,
  Activity,
  Globe,
  Truck,
  Package,
  DollarSign,
  FileText,
  Calendar,
  MessageSquare,
  HelpCircle,
  Info,
  Brain,
  Plus
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SidebarItem {
  id: string
  label: string
  icon: unknown
  href?: string
  children?: SidebarItem[]
  badge?: string
  description?: string
}

interface PortalSection {
  title: string
  items: SidebarItem[]
}

export function PortalLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (href: string) => {
    navigate(href)
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const portalSections: PortalSection[] = [
    {
      title: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/dashboard', description: 'Main overview' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics', description: 'Performance metrics' },
        { id: 'activity', label: 'Activity Feed', icon: Activity, href: '/activity', description: 'Recent activities' }
      ]
    },
    {
      title: 'Core Operations',
      items: [
        { id: 'loads', label: 'Load Management', icon: Package, href: '/loads', description: 'Manage freight loads' },
        { id: 'carriers', label: 'Carrier Network', icon: Truck, href: '/carriers', description: 'Carrier management' },
        { id: 'routes', label: 'Route Planning', icon: Globe, href: '/routes', description: 'Route optimization' },
        { id: 'rates', label: 'Rate Management', icon: DollarSign, href: '/rates', description: 'Pricing and rates' }
      ]
    },
    {
      title: 'AI & Automation',
      items: [
        { id: 'ai-insights', label: 'AI Insights', icon: Brain, href: '/ai-insights', description: 'AI recommendations' },
        { id: 'automation', label: 'Automation', icon: Zap, href: '/automation', description: 'Automated workflows' },
        { id: 'predictions', label: 'Predictions', icon: TrendingUp, href: '/predictions', description: 'Predictive analytics' },
        { id: 'optimization', label: 'Optimization', icon: Target, href: '/optimization', description: 'Performance optimization' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/messages', description: 'Communication center', badge: '3' },
        { id: 'notifications', label: 'Notifications', icon: Bell, href: '/notifications', description: 'System alerts' },
        { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar', description: 'Schedule management' }
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'users', label: 'User Management', icon: Users, href: '/users', description: 'Manage users and roles' },
        { id: 'reports', label: 'Reports', icon: FileText, href: '/reports', description: 'Generate reports' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', description: 'Portal configuration' },
        { id: 'help', label: 'Help & Support', icon: HelpCircle, href: '/help', description: 'Documentation and support' }
      ]
    }
  ]

  const quickActions = [
    { label: 'Create Load', icon: Plus, action: () => console.log('Create Load') },
    { label: 'Find Carrier', icon: Search, action: () => console.log('Find Carrier') },
    { label: 'Generate Report', icon: FileText, action: () => console.log('Generate Report') },
    { label: 'Contact Support', icon: MessageSquare, action: () => console.log('Contact Support') }
  ]

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const isActive = location.pathname === item.href

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div key={item.id}>
        <motion.button
          whileHover={{ x: level === 0 ? 4 : 8 }}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else if (item.href) {
              handleNavigation(item.href)
            }
          }}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
            isActive 
              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
              : 'hover:bg-slate-50 text-slate-700'
          } ${level > 0 ? 'ml-4' : ''}`}
        >
          <div className="flex items-center space-x-3 responsive-container">
            <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
            <div className="text-left responsive-container">
              <p className={`font-medium ${isActive ? 'text-blue-700' : 'text-slate-900'}`}>
                {item.label}
                {item.badge && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full responsive-container">
                    {item.badge}
                  </span>
                )}
              </p>
              {item.description && (
                <p className="text-xs text-slate-500 responsive-container">{item.description}</p>
              )}
            </div>
          </div>
          {hasChildren && (
            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          )}
        </motion.button>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1 space-y-1 responsive-container"
            >
              {item.children?.map(child => renderSidebarItem(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 responsive-container">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm responsive-container">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6 responsive-container">
          {/* Left side */}
          <div className="flex items-center space-x-4 responsive-container">
            <button
              onClick={() = aria-label="Button"> setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden responsive-container"
            >
              <Menu className="w-5 h-5 responsive-container" />
            </button>
            
            <div className="flex items-center space-x-3 responsive-container">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center responsive-container">
                <Brain className="w-5 h-5 text-white responsive-container" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 responsive-container">Portal Dashboard</h1>
                <p className="text-xs text-slate-500 responsive-container">Trans Bot AI</p>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 responsive-container" />
              <input
                type="text"
                placeholder="Search portal features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4 responsive-container">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors responsive-container" aria-label="Button">
              <Bell className="w-5 h-5 text-slate-600 responsive-container" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full responsive-container"></span>
            </button>

            {/* User Menu */}
            <div className="flex items-center space-x-3 responsive-container">
              <div className="text-right hidden sm:block responsive-container">
                <p className="text-sm font-medium text-slate-900 responsive-container">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-500 responsive-container">{user?.role || 'User'}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center responsive-container">
                <User className="w-4 h-4 text-white responsive-container" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16 responsive-container">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed lg:static top-16 left-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 shadow-lg z-30 overflow-y-auto responsive-container"
            >
              <div className="p-6 space-y-8 responsive-container">
                {/* Quick Actions */}
                <div className="space-y-4 responsive-container">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider responsive-container">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3 responsive-container">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={action.action}
                        className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-200 responsive-container"
                      >
                        <action.icon className="w-5 h-5 text-blue-600 mx-auto mb-2 responsive-container" />
                        <p className="text-xs font-medium text-slate-700 text-center responsive-container">{action.label}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Navigation Sections */}
                {portalSections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-3 responsive-container"
                  >
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider responsive-container">
                      {section.title}
                    </h3>
                    <div className="space-y-1 responsive-container">
                      {section.items.map(item => renderSidebarItem(item))}
                    </div>
                  </motion.div>
                ))}

                {/* Help & Support */}
                <div className="pt-6 border-t border-slate-200 responsive-container">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 responsive-container">
                    <div className="flex items-center space-x-3 mb-3 responsive-container">
                      <HelpCircle className="w-5 h-5 text-blue-600 responsive-container" />
                      <h4 className="font-semibold text-slate-900 responsive-container">Need Help?</h4>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 responsive-container">
                      Get instant support from our AI assistant or contact our team.
                    </p>
                    <div className="space-y-2 responsive-container">
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                        <MessageSquare className="w-4 h-4 responsive-container" />
                        <span>AI Assistant</span>
                      </button>
                      <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors responsive-container" aria-label="Button">
                        <Info className="w-4 h-4 responsive-container" />
                        <span>Documentation</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}`}>
          <div className="p-6 responsive-container">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden responsive-container"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
