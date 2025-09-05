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
  Settings,
  DollarSign,
  Package,
  Route,
  Wrench,
  Fuel,
  Mail,
  CreditCard,
  FileCheck,
  UserCheck,
  Store,
  Layers,
  Calculator,
  ClipboardList,
  Lock,
  AlertTriangle,
  Briefcase,
  PanelLeft
} from 'lucide-react'
import { trackUserInteraction } from '../services/webhookService'
import { useSidebar } from '../contexts/SidebarContext'

export function ComprehensiveSidebar() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { isSidebarOpen, toggleSidebar } = useSidebar()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = async (path: string) => {
    navigate(path)
    await trackUserInteraction('sidebar_navigation', { path })
  }

  const handleSidebarToggle = async () => {
    toggleSidebar()
    await trackUserInteraction('sidebar_toggle', { isOpen: !isSidebarOpen })
  }

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId)
  }

  const navigationSections = [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      color: 'text-transbot-sky',
      path: '/',
      items: []
    },
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      color: 'text-transbot-teal',
      path: '/dashboard',
      items: [
        { name: 'Overview', icon: BarChart3, path: '/dashboard/overview' },
        { name: 'Analytics', icon: TrendingUp, path: '/dashboard/analytics' },
        { name: 'Performance', icon: Activity, path: '/dashboard/performance' },
        { name: 'Reports', icon: FileText, path: '/dashboard/reports' }
      ]
    },
    {
      id: 'solutions',
      name: 'Solutions',
      icon: Target,
      color: 'text-transbot-purple',
      items: [
        { name: 'Transportation Management', icon: Truck, path: '/solutions/transportation' },
        { name: 'Warehouse Management', icon: Building, path: '/solutions/warehouse' },
        { name: 'Fleet Management', icon: Truck, path: '/solutions/fleet' },
        { name: 'Load Optimization', icon: Zap, path: '/solutions/load-optimization' },
        { name: 'Route Planning', icon: Route, path: '/solutions/route-planning' },
        { name: 'Fuel Management', icon: Fuel, path: '/solutions/fuel-management' },
        { name: 'Maintenance Tracking', icon: Wrench, path: '/solutions/maintenance' }
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
        { name: 'Fleet Manager', icon: Shield, path: '/agents/fleet-manager' },
        { name: 'Demand Forecaster', icon: TrendingUp, path: '/agents/demand-forecaster' },
        { name: 'Price Optimizer', icon: DollarSign, path: '/agents/price-optimizer' },
        { name: 'Risk Assessor', icon: AlertTriangle, path: '/agents/risk-assessor' }
      ]
    },
    {
      id: 'core-portals',
      name: 'Core TMS Portals',
      icon: Shield,
      color: 'text-transbot-warning',
      items: [
        { name: 'Dashboard Portal', icon: Home, path: '/dashboard' },
        { name: 'Broker Portal', icon: Users, path: '/broker' },
        { name: 'Carrier Portal', icon: Truck, path: '/carrier' },
        { name: 'Driver Portal', icon: User, path: '/driver' },
        { name: 'Shipper Portal', icon: Package, path: '/shipper' },
        { name: 'Admin Portal', icon: Settings, path: '/admin' },
        { name: 'Super Admin Portal', icon: Shield, path: '/super-admin' },
        { name: 'Analytics Portal', icon: BarChart3, path: '/analytics' },
        { name: 'Autonomous Portal', icon: Cpu, path: '/autonomous' },
        { name: 'YMS Portal', icon: Building, path: '/yms' }
      ]
    },
    {
      id: 'business-portals',
      name: 'Business Portals',
      icon: Building,
      color: 'text-transbot-navy',
      items: [
        { name: 'Directory Portal', icon: Users, path: '/directory' },
        { name: 'Rates Portal', icon: DollarSign, path: '/rates' },
        { name: 'Workers Portal', icon: UserCheck, path: '/workers' },
        { name: 'Marketplace Portal', icon: Store, path: '/marketplace' },
        { name: 'EDI Portal', icon: Layers, path: '/edi' },
        { name: 'Financials Portal', icon: CreditCard, path: '/financials' },
        { name: 'CRM Portal', icon: Users, path: '/crm' },
        { name: 'Load Board Portal', icon: ClipboardList, path: '/load-board' },
        { name: 'Factoring Portal', icon: Calculator, path: '/factoring' },
        { name: 'Onboarding Portal', icon: UserCheck, path: '/onboarding' },
        { name: 'TMS Admin Portal', icon: Settings, path: '/tms-admin' },
        { name: 'Owner-Operator Portal', icon: User, path: '/owner-operator' },
        { name: 'Shipper Admin Portal', icon: Package, path: '/shipper-admin' },
        { name: 'Broker Admin Portal', icon: Users, path: '/broker-admin' },
        { name: 'Carrier Admin Portal', icon: Truck, path: '/carrier-admin' }
      ]
    },
    {
      id: 'resources',
      name: 'Resources',
      icon: Globe,
      color: 'text-transbot-sky',
      items: [
        { name: 'Documentation', icon: FileText, path: '/docs' },
        { name: 'API Documentation', icon: Code, path: '/api-docs' },
        { name: 'Tutorials', icon: Video, path: '/tutorials' },
        { name: 'Case Studies', icon: BookOpen, path: '/case-studies' },
        { name: 'Webinars', icon: Video, path: '/webinars' },
        { name: 'Support Center', icon: HelpCircle, path: '/support' },
        { name: 'Community', icon: Users, path: '/community' },
        { name: 'Blog', icon: FileText, path: '/blog' }
      ]
    },
    {
      id: 'industries',
      name: 'Industries',
      icon: Building,
      color: 'text-transbot-teal',
      items: [
        { name: 'Transportation & Logistics', icon: Truck, path: '/industries/transportation' },
        { name: 'Manufacturing', icon: Building, path: '/industries/manufacturing' },
        { name: 'Retail & E-commerce', icon: Store, path: '/industries/retail' },
        { name: 'Healthcare', icon: Shield, path: '/industries/healthcare' },
        { name: 'Food & Beverage', icon: Package, path: '/industries/food-beverage' },
        { name: 'Automotive', icon: Truck, path: '/industries/automotive' },
        { name: 'Construction', icon: Building, path: '/industries/construction' }
      ]
    },
    {
      id: 'company',
      name: 'Company',
      icon: Users,
      color: 'text-transbot-purple',
      items: [
        { name: 'About Us', icon: Users, path: '/company/about' },
        { name: 'Our Team', icon: User, path: '/company/team' },
        { name: 'Careers', icon: Briefcase, path: '/company/careers' },
        { name: 'News & Press', icon: FileText, path: '/company/news' },
        { name: 'Partners', icon: Users, path: '/company/partners' },
        { name: 'Contact', icon: Mail, path: '/company/contact' },
        { name: 'Privacy Policy', icon: Lock, path: '/company/privacy' },
        { name: 'Terms of Service', icon: FileCheck, path: '/company/terms' }
      ]
    }
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`hidden md:block fixed left-0 top-0 bottom-0 z-40 w-80 transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-full bg-white/98 backdrop-blur-xl border-r border-slate-200/60 shadow-xl">
        
        {/* Trans Bot AI Logo & Branding */}
        <div className="px-6 pt-20 pb-5 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4 cursor-pointer flex-1"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-transbot">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-transbot-teal rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Trans Bot AI
                </h1>
                <p className="text-xs text-transbot-text-secondary font-medium">
                  Intelligent Logistics Platform
                </p>
              </div>
            </motion.div>

            {/* Sidebar Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSidebarToggle}
              className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg hover:bg-blue-50 transition-all duration-200"
              title="Hide Sidebar"
            >
              <PanelLeft className="w-5 h-5 text-transbot-text-primary" />
            </motion.button>
          </div>
        </div>


        {/* Portal Status */}
        <div className="p-4 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-transbot-text-primary">25 Portals Active</span>
            </div>
            <div className="text-xs text-transbot-text-secondary">MCP Controlled</div>
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
                    : 'text-transbot-text-primary hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <section.icon className={`w-5 h-5 ${section.color}`} />
                  <span>{section.name}</span>
                  {section.items && (
                    <span className="text-xs bg-transbot-sky/10 text-transbot-sky px-2 py-1 rounded-full">
                      {section.items.length}
                    </span>
                  )}
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
                            : 'text-transbot-text-secondary hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="flex-1 text-left">{item.name}</span>
                        {item.path.includes('portal') && (
                          <div className="w-2 h-2 bg-transbot-teal rounded-full"></div>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/50">
          <div className="flex items-center justify-between text-xs text-transbot-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse"></div>
              <span>MCP Agents Active</span>
            </div>
            <span>250 Agents</span>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
