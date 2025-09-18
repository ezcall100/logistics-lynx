import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Code
} from 'lucide-react'

export function SmartSidebar() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

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
        { name: 'Fleet Management', icon: Truck, path: '/solutions/fleet' },
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
        { name: 'Predictive Analytics', icon: Database, path: '/agents/predictive-analytics' },
        { name: 'Fleet Manager', icon: Shield, path: '/agents/fleet-manager' }
      ]
    },
    {
      id: 'portals',
      name: 'Portals',
      icon: Users,
      color: 'transbot-warning',
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
      color: 'transbot-navy',
      items: [
        { name: 'Documentation', icon: FileText, path: '/docs' },
        { name: 'Tutorials', icon: Video, path: '/tutorials' },
        { name: 'Case Studies', icon: BookOpen, path: '/case-studies' },
        { name: 'Support', icon: HelpCircle, path: '/support' }
      ]
    }
  ]


  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="hidden md:block fixed left-0 top-20 bottom-0 z-30 w-64 responsive-container sm:flex-col md:flex-row lg:grid"
    >
      <div className="h-full bg-white/95 backdrop-blur-xl border-r border-transbot-border/20 shadow-transbot responsive-container sm:flex-col md:flex-row lg:grid">
        
        {/* Header */}
        <div className="p-4 border-b border-transbot-border/20 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <Brain className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h2 className="font-bold text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid">Navigation</h2>
              <p className="text-xs text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid">Quick Access</p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {mainSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
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
                <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{section.name}</span>
                {activeSection === section.id ? (
                  <ChevronDown className="w-4 h-4 ml-auto responsive-container sm:flex-col md:flex-row lg:grid" />
                ) : (
                  <ChevronRight className="w-4 h-4 ml-auto responsive-container sm:flex-col md:flex-row lg:grid" />
                )}
              </motion.button>

              {/* Sub-items */}
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-4 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                                         {section.items.map((item, itemIndex) => (
                       <motion.button
                         key={item.name}
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: itemIndex * 0.05 }}
                         whileHover={{ scale: 1.02 }}
                         onClick={() => handleNavigation(item.path)}
                         className="w-full flex items-center gap-3 p-2 rounded-lg text-transbot-text-secondary hover:text-transbot-sky hover:bg-transbot-sky/5 transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
                       >
                         <item.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                         <span className="text-sm responsive-container sm:flex-col md:flex-row lg:grid">{item.name}</span>
                       </motion.button>
                     ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  )
}