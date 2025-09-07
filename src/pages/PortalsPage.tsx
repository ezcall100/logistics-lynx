import React from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, Users, Truck, Package, 
  Brain, Settings,
  Shield, Globe, TrendingUp,
  Clock, CheckCircle,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const PortalsPage: React.FC = () => {
  const portalCategories = [
    {
      title: "Core TMS Portals",
      description: "Essential transportation management solutions",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      portals: [
        {
          title: "Shipper Portal",
          description: "Complete shipping management for businesses",
          path: "/portals/shipper",
          icon: Package,
          features: ["Load Planning", "Carrier Selection", "Real-time Tracking", "Invoice Management"],
          color: "from-green-500 to-emerald-500"
        },
        {
          title: "Carrier Portal", 
          description: "Fleet management and load optimization",
          path: "/portals/carrier",
          icon: Truck,
          features: ["Fleet Management", "Load Matching", "Route Optimization", "Driver Management"],
          color: "from-blue-500 to-indigo-500"
        },
        {
          title: "Broker Portal",
          description: "Load brokerage and relationship management",
          path: "/portals/broker", 
          icon: Users,
          features: ["Load Board", "Carrier Network", "Rate Management", "Customer Relations"],
          color: "from-purple-500 to-violet-500"
        },
        {
          title: "Driver Portal",
          description: "Mobile-first driver experience and tools",
          path: "/portals/driver",
          icon: Truck,
          features: ["Load Details", "Route Navigation", "Documentation", "Earnings Tracking"],
          color: "from-orange-500 to-red-500"
        }
      ]
    },
    {
      title: "Business Operations",
      description: "Advanced business intelligence and operations",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-500",
      portals: [
        {
          title: "Analytics Portal",
          description: "Advanced analytics and business intelligence",
          path: "/portals/analytics",
          icon: BarChart3,
          features: ["Performance Metrics", "Predictive Analytics", "Custom Reports", "Data Visualization"],
          color: "from-indigo-500 to-purple-500"
        },
        {
          title: "Customer Portal",
          description: "Customer relationship and service management",
          path: "/portals/customer",
          icon: Users,
          features: ["Account Management", "Service Requests", "Billing History", "Support Tickets"],
          color: "from-pink-500 to-rose-500"
        },
        {
          title: "Partner Portal",
          description: "Strategic partner collaboration and management",
          path: "/portals/partner",
          icon: Globe,
          features: ["Partner Directory", "Collaboration Tools", "Performance Tracking", "Revenue Sharing"],
          color: "from-cyan-500 to-blue-500"
        },
        {
          title: "Developer Portal",
          description: "API access and integration tools",
          path: "/portals/developer",
          icon: Settings,
          features: ["API Documentation", "SDKs", "Sandbox Environment", "Integration Guides"],
          color: "from-gray-500 to-slate-500"
        }
      ]
    },
    {
      title: "Admin & Specialized",
      description: "Administrative and specialized management tools",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      portals: [
        {
          title: "Admin Portal",
          description: "System administration and user management",
          path: "/portals/admin",
          icon: Settings,
          features: ["User Management", "System Configuration", "Security Settings", "Audit Logs"],
          color: "from-slate-500 to-gray-500"
        },
        {
          title: "Super Admin Portal",
          description: "Enterprise-level administration and control",
          path: "/super-admin",
          icon: Shield,
          features: ["Multi-tenant Management", "Global Settings", "Advanced Security", "System Monitoring"],
          color: "from-red-500 to-orange-500"
        },
        {
          title: "Autonomous Portal",
          description: "AI-powered autonomous operations management",
          path: "/portals/autonomous",
          icon: Brain,
          features: ["AI Agents", "Automated Decisions", "Machine Learning", "Predictive Operations"],
          color: "from-violet-500 to-purple-500"
        }
      ]
    }
  ]

  const stats = [
    { number: "27", label: "Portal Types", icon: Globe },
    { number: "500+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: CheckCircle },
    { number: "24/7", label: "Support", icon: Clock }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trans Bot AI Portals
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Comprehensive portal ecosystem designed for every stakeholder in the logistics industry
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className="w-6 h-6 text-blue-200" />
                    <span className="text-3xl font-bold">{stat.number}</span>
                  </div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Portal Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {portalCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="mb-16"
          >
            {/* Category Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${category.color} shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{category.title}</h2>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            </div>

            {/* Portal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.portals.map((portal, portalIndex) => (
                <motion.div
                  key={portal.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: portalIndex * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={portal.path}>
                    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Portal Header */}
                      <div className={`p-6 bg-gradient-to-br ${portal.color} text-white`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                            <portal.icon className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{portal.title}</h3>
                            <p className="text-white/80 text-sm">{portal.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Portal Features */}
                      <div className="p-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {portal.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-sm text-gray-500">Access Portal</span>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Logistics Operations?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Choose the portal that fits your role and start optimizing your logistics today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/get-started"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/company/contact"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PortalsPage