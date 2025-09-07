import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Users, Truck, Package, 
  Brain, Settings,
  Shield, Globe, TrendingUp,
  Clock, CheckCircle,
  ArrowRight, Star,
  Search, Grid, List,
  Play
} from 'lucide-react'
import { Link } from 'react-router-dom'

const PortalsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('core')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  const portalCategories = {
    core: {
      title: "Core TMS Portals",
      description: "Essential transportation management solutions for daily operations",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      portals: [
        {
          title: "Shipper Portal",
          description: "Complete shipping management platform for businesses of all sizes",
          path: "/portals/shipper",
          icon: Package,
          features: ["Load Planning", "Carrier Selection", "Real-time Tracking", "Invoice Management"],
          color: "from-green-500 to-emerald-500",
          badge: "Most Popular",
          stats: { users: "2.5K+", rating: "4.9" }
        },
        {
          title: "Carrier Portal", 
          description: "Comprehensive fleet management and load optimization system",
          path: "/portals/carrier",
          icon: Truck,
          features: ["Fleet Management", "Load Matching", "Route Optimization", "Driver Management"],
          color: "from-blue-500 to-indigo-500",
          badge: "AI-Powered",
          stats: { users: "1.8K+", rating: "4.8" }
        },
        {
          title: "Broker Portal",
          description: "Advanced load brokerage and relationship management platform",
          path: "/portals/broker", 
          icon: Users,
          features: ["Load Board", "Carrier Network", "Rate Management", "Customer Relations"],
          color: "from-purple-500 to-violet-500",
          badge: "Enterprise",
          stats: { users: "1.2K+", rating: "4.7" }
        },
        {
          title: "Driver Portal",
          description: "Mobile-first driver experience with comprehensive tools",
          path: "/portals/driver",
          icon: Truck,
          features: ["Load Details", "Route Navigation", "Documentation", "Earnings Tracking"],
          color: "from-orange-500 to-red-500",
          badge: "Mobile Ready",
          stats: { users: "5.2K+", rating: "4.9" }
        },
        {
          title: "Owner Operator Portal",
          description: "Independent owner-operator business management suite",
          path: "/portals/owner-operator",
          icon: Truck,
          features: ["Load Management", "Expense Tracking", "Tax Tools", "Business Analytics"],
          color: "from-amber-500 to-orange-500",
          badge: "New",
          stats: { users: "850+", rating: "4.6" }
        },
        {
          title: "Workers Portal",
          description: "Comprehensive workforce management and scheduling system",
          path: "/portals/workers",
          icon: Users,
          features: ["Schedule Management", "Time Tracking", "Payroll Integration", "Performance Metrics"],
          color: "from-teal-500 to-cyan-500",
          badge: "HR Focused",
          stats: { users: "1.1K+", rating: "4.5" }
        }
      ]
    },
    business: {
      title: "Business Operations",
      description: "Advanced business intelligence, analytics, and operational tools",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      portals: [
        {
          title: "Analytics Portal",
          description: "Advanced analytics and business intelligence dashboard",
          path: "/portals/analytics",
          icon: BarChart3,
          features: ["Performance Metrics", "Predictive Analytics", "Custom Reports", "Data Visualization"],
          color: "from-indigo-500 to-purple-500",
          badge: "AI Analytics",
          stats: { users: "980+", rating: "4.8" }
        },
        {
          title: "Customer Portal",
          description: "Customer relationship and service management platform",
          path: "/portals/customer",
          icon: Users,
          features: ["Account Management", "Service Requests", "Billing History", "Support Tickets"],
          color: "from-pink-500 to-rose-500",
          badge: "CRM Ready",
          stats: { users: "1.5K+", rating: "4.7" }
        },
        {
          title: "Partner Portal",
          description: "Strategic partner collaboration and management system",
          path: "/portals/partner",
          icon: Globe,
          features: ["Partner Directory", "Collaboration Tools", "Performance Tracking", "Revenue Sharing"],
          color: "from-cyan-500 to-blue-500",
          badge: "Collaboration",
          stats: { users: "650+", rating: "4.6" }
        },
        {
          title: "Developer Portal",
          description: "Comprehensive API access and integration development tools",
          path: "/portals/developer",
          icon: Settings,
          features: ["API Documentation", "SDKs", "Sandbox Environment", "Integration Guides"],
          color: "from-gray-500 to-slate-500",
          badge: "Developer",
          stats: { users: "420+", rating: "4.9" }
        },
        {
          title: "YMS Portal",
          description: "Yard management system for efficient terminal operations",
          path: "/portals/yms",
          icon: Truck,
          features: ["Yard Planning", "Gate Management", "Trailer Tracking", "Dock Scheduling"],
          color: "from-emerald-500 to-green-500",
          badge: "Terminal Focus",
          stats: { users: "320+", rating: "4.5" }
        },
        {
          title: "Directory Portal",
          description: "Comprehensive business directory and networking platform",
          path: "/portals/directory",
          icon: Globe,
          features: ["Business Listings", "Contact Management", "Network Building", "Industry Connections"],
          color: "from-blue-500 to-indigo-500",
          badge: "Networking",
          stats: { users: "1.8K+", rating: "4.4" }
        },
        {
          title: "Rates Portal",
          description: "Dynamic pricing and rate management optimization",
          path: "/portals/rates",
          icon: TrendingUp,
          features: ["Rate Optimization", "Market Analysis", "Pricing Strategies", "Competitive Intelligence"],
          color: "from-green-500 to-emerald-500",
          badge: "AI Pricing",
          stats: { users: "750+", rating: "4.7" }
        },
        {
          title: "Marketplace Portal",
          description: "Load and capacity marketplace with advanced matching",
          path: "/portals/marketplace",
          icon: Globe,
          features: ["Load Posting", "Capacity Matching", "Bidding System", "Transaction Management"],
          color: "from-purple-500 to-violet-500",
          badge: "Marketplace",
          stats: { users: "2.1K+", rating: "4.6" }
        },
        {
          title: "Financials Portal",
          description: "Comprehensive financial management and accounting suite",
          path: "/portals/financials",
          icon: TrendingUp,
          features: ["Invoice Management", "Payment Processing", "Financial Reporting", "Cost Analysis"],
          color: "from-emerald-500 to-teal-500",
          badge: "Finance",
          stats: { users: "890+", rating: "4.8" }
        },
        {
          title: "Load Board Portal",
          description: "Advanced load board with intelligent matching algorithms",
          path: "/portals/load-board",
          icon: Package,
          features: ["Load Posting", "Carrier Matching", "Real-time Updates", "Rate Negotiation"],
          color: "from-blue-500 to-cyan-500",
          badge: "Smart Matching",
          stats: { users: "3.2K+", rating: "4.7" }
        },
        {
          title: "CRM Portal",
          description: "Customer relationship management with sales automation",
          path: "/portals/crm",
          icon: Users,
          features: ["Lead Management", "Customer Profiles", "Sales Pipeline", "Communication Tracking"],
          color: "from-pink-500 to-rose-500",
          badge: "Sales Focus",
          stats: { users: "1.3K+", rating: "4.6" }
        },
        {
          title: "EDI Portal",
          description: "Electronic data interchange management and automation",
          path: "/portals/edi",
          icon: Settings,
          features: ["Data Mapping", "Transaction Processing", "Integration Management", "Error Handling"],
          color: "from-gray-500 to-slate-500",
          badge: "Integration",
          stats: { users: "280+", rating: "4.5" }
        },
        {
          title: "Factoring Portal",
          description: "Invoice factoring and cash flow management solution",
          path: "/portals/factoring",
          icon: TrendingUp,
          features: ["Invoice Factoring", "Cash Flow Management", "Credit Analysis", "Payment Processing"],
          color: "from-green-500 to-emerald-500",
          badge: "Cash Flow",
          stats: { users: "450+", rating: "4.4" }
        }
      ]
    },
    admin: {
      title: "Admin & Specialized",
      description: "Administrative tools, AI systems, and specialized management platforms",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      portals: [
        {
          title: "Admin Portal",
          description: "System administration and user management dashboard",
          path: "/portals/admin",
          icon: Settings,
          features: ["User Management", "System Configuration", "Security Settings", "Audit Logs"],
          color: "from-slate-500 to-gray-500",
          badge: "System Admin",
          stats: { users: "150+", rating: "4.9" }
        },
        {
          title: "Super Admin Portal",
          description: "Enterprise-level administration and multi-tenant control",
          path: "/portals/super-admin",
          icon: Shield,
          features: ["Multi-tenant Management", "Global Settings", "Advanced Security", "System Monitoring"],
          color: "from-red-500 to-orange-500",
          badge: "Enterprise",
          stats: { users: "25+", rating: "5.0" }
        },
        {
          title: "Autonomous Portal",
          description: "AI-powered autonomous operations and decision making",
          path: "/portals/autonomous",
          icon: Brain,
          features: ["AI Agents", "Automated Decisions", "Machine Learning", "Predictive Operations"],
          color: "from-violet-500 to-purple-500",
          badge: "AI Powered",
          stats: { users: "180+", rating: "4.8" }
        },
        {
          title: "Enhanced Broker Portal",
          description: "Advanced brokerage management with AI and automation",
          path: "/portals/broker/enhanced",
          icon: Users,
          features: ["AI Load Matching", "Advanced Analytics", "Automated Negotiations", "Predictive Pricing"],
          color: "from-purple-500 to-indigo-500",
          badge: "AI Enhanced",
          stats: { users: "95+", rating: "4.7" }
        }
      ]
    }
  }

  const filteredPortals = portalCategories[activeTab as keyof typeof portalCategories].portals.filter(portal =>
    portal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portal.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPortals = Object.values(portalCategories).reduce((sum, category) => sum + category.portals.length, 0)

  const stats = [
    { number: totalPortals.toString(), label: "Portal Types", icon: Globe, color: "text-blue-600" },
    { number: "15K+", label: "Active Users", icon: Users, color: "text-green-600" },
    { number: "99.9%", label: "Uptime", icon: CheckCircle, color: "text-emerald-600" },
    { number: "24/7", label: "Support", icon: Clock, color: "text-purple-600" }
  ]

  const getBadgeColor = (badge: string) => {
    const colors: { [key: string]: string } = {
      'Most Popular': 'bg-green-100 text-green-800',
      'AI-Powered': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-blue-100 text-blue-800',
      'Mobile Ready': 'bg-orange-100 text-orange-800',
      'New': 'bg-emerald-100 text-emerald-800',
      'HR Focused': 'bg-teal-100 text-teal-800',
      'AI Analytics': 'bg-indigo-100 text-indigo-800',
      'CRM Ready': 'bg-pink-100 text-pink-800',
      'Collaboration': 'bg-cyan-100 text-cyan-800',
      'Developer': 'bg-gray-100 text-gray-800',
      'Terminal Focus': 'bg-emerald-100 text-emerald-800',
      'Networking': 'bg-blue-100 text-blue-800',
      'AI Pricing': 'bg-green-100 text-green-800',
      'Marketplace': 'bg-purple-100 text-purple-800',
      'Finance': 'bg-emerald-100 text-emerald-800',
      'Smart Matching': 'bg-blue-100 text-blue-800',
      'Sales Focus': 'bg-pink-100 text-pink-800',
      'Integration': 'bg-gray-100 text-gray-800',
      'Cash Flow': 'bg-green-100 text-green-800',
      'System Admin': 'bg-slate-100 text-slate-800',
      'AI Enhanced': 'bg-purple-100 text-purple-800',
      'AI Powered': 'bg-violet-100 text-violet-800'
    }
    return colors[badge] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Portal Ecosystem
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive suite of transportation management portals designed for every role in the logistics ecosystem
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="text-3xl font-bold text-white">{stat.number}</span>
                  </div>
                  <p className="text-blue-100 text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search portals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.entries(portalCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === key
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === key ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {category.portals.length}
              </span>
            </button>
          ))}
        </div>

        {/* Category Description */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${portalCategories[activeTab as keyof typeof portalCategories].bgColor} rounded-2xl p-6 mb-8 border border-gray-200`}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${portalCategories[activeTab as keyof typeof portalCategories].color} flex items-center justify-center`}>
              {React.createElement(portalCategories[activeTab as keyof typeof portalCategories].icon, { className: "w-6 h-6 text-white" })}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {portalCategories[activeTab as keyof typeof portalCategories].title}
              </h2>
              <p className="text-gray-600">
                {portalCategories[activeTab as keyof typeof portalCategories].description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Portals Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${viewMode}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredPortals.map((portal, index) => (
              <motion.div
                key={portal.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${portal.color} flex items-center justify-center shadow-lg`}>
                        <portal.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(portal.badge)}`}>
                          {portal.badge}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600">{portal.stats.rating}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {portal.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Active Users</span>
                        <span className="font-medium text-gray-900">{portal.stats.users}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">{portal.stats.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {portal.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                            {feature}
                          </span>
                        ))}
                        {portal.features.length > 3 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                            +{portal.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={portal.path}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium group-hover:shadow-lg"
                    >
                      <Play className="w-4 h-4" />
                      Access Portal
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${portal.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <portal.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 ml-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {portal.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(portal.badge)}`}>
                            {portal.badge}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-600">{portal.stats.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">
                        {portal.description}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-3">
                        <span>{portal.stats.users} users</span>
                        <span>•</span>
                        <span>{portal.features.length} features</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {portal.features.slice(0, 4).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                            {feature}
                          </span>
                        ))}
                        {portal.features.length > 4 && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                            +{portal.features.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      to={portal.path}
                      className="flex items-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium group-hover:shadow-lg flex-shrink-0"
                    >
                      <Play className="w-4 h-4" />
                      Access
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredPortals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No portals found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Operations?</h2>
            <p className="text-xl text-blue-100 mb-6">
              Join thousands of logistics professionals who trust our portal ecosystem to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortalsPage