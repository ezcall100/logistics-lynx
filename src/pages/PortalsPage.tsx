import React from 'react'
import { 
  BarChart3, Users, Truck, Package, 
  Brain, DollarSign, FileText, Settings,
} from 'lucide-react'

const PortalsPage: React.FC = () => {
  const portals = [
    {
      icon: BarChart3,
      title: "Dashboard Portal",
      description: "System overview and analytics",
      color: "from-cyan-500 to-blue-500",
      features: ["Real-time KPIs", "System monitoring", "Performance analytics"]
    },
    {
      icon: Users,
      title: "Broker Portal",
      description: "Load brokerage and management",
      color: "from-blue-500 to-indigo-500",
      features: ["Load posting", "Carrier matching", "Rate negotiation"]
    },
    {
      icon: Truck,
      title: "Carrier Portal",
      description: "Fleet operations and tracking",
      color: "from-green-500 to-emerald-500",
      features: ["Fleet management", "Driver coordination", "Load assignment"]
    },
    {
      icon: Package,
      title: "Shipper Portal",
      description: "Shipment creation and tracking",
      color: "from-purple-500 to-violet-500",
      features: ["Shipment creation", "Real-time tracking", "Rate quotes"]
    },
    {
      icon: Brain,
      title: "AI Portal",
      description: "Autonomous intelligence",
      color: "from-pink-500 to-rose-500",
      features: ["AI agents", "Task automation", "Intelligent insights"]
    },
    {
      icon: DollarSign,
      title: "Financials Portal",
      description: "Financial management",
      color: "from-yellow-500 to-orange-500",
      features: ["Invoicing", "Payment processing", "Financial reporting"]
    },
    {
      icon: FileText,
      title: "Load Board Portal",
      description: "Freight posting and booking",
      color: "from-teal-500 to-cyan-500",
      features: ["Load posting", "Matching", "Booking system"]
    },
    {
      icon: Settings,
      title: "Admin Portal",
      description: "System administration",
      color: "from-gray-500 to-slate-500",
      features: ["User management", "System config", "Access control"]
    }
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">25 Portals</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete logistics ecosystem with specialized portals for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {portals.map((portal, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all duration-500`}>
                <portal.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                {portal.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {portal.description}
              </p>
              <ul className="space-y-1">
                {portal.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-xs text-gray-400 flex items-center">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-white mb-6">Access Your Portals</h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose the portals that fit your role and business needs
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
            Access Portals
          </button>
        </div>
      </div>
    </div>
  )
}

export default PortalsPage
