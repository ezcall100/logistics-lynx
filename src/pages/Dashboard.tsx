import React from 'react'
import { 
  Brain, Truck, Users, BarChart3, 
  Package, DollarSign, FileText, 
    Settings,
  Zap,
  ArrowRight, CheckCircle
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const portals = [
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "System Overview & Analytics",
      color: "from-cyan-500 to-blue-500",
      iconColor: "text-cyan-400",
      status: "active"
    },
    {
      icon: Users,
      title: "Broker Portal",
      description: "Load Brokerage & Management",
      color: "from-blue-500 to-indigo-500",
      iconColor: "text-blue-400",
      status: "active"
    },
    {
      icon: Truck,
      title: "Carrier Portal",
      description: "Fleet Operations & Tracking",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-400",
      status: "active"
    },
    {
      icon: Package,
      title: "Shipper Portal",
      description: "Shipment Creation & Tracking",
      color: "from-purple-500 to-violet-500",
      iconColor: "text-purple-400",
      status: "active"
    },
    {
      icon: Brain,
      title: "AI Portal",
      description: "Autonomous Intelligence",
      color: "from-pink-500 to-rose-500",
      iconColor: "text-pink-400",
      status: "active"
    },
    {
      icon: DollarSign,
      title: "Financials",
      description: "Invoicing & Payment Processing",
      color: "from-yellow-500 to-orange-500",
      iconColor: "text-yellow-400",
      status: "active"
    },
    {
      icon: FileText,
      title: "Load Board",
      description: "Freight Posting & Booking",
      color: "from-teal-500 to-cyan-500",
      iconColor: "text-teal-400",
      status: "active"
    },
    {
      icon: Settings,
      title: "Admin Portal",
      description: "System Administration",
      color: "from-gray-500 to-slate-500",
      iconColor: "text-gray-400",
      status: "active"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="w-full h-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 responsive-container sm:flex-col md:flex-row lg:grid"></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 text-center pt-16 pb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 shadow-2xl responsive-container sm:flex-col md:flex-row lg:grid">
          <Brain className="w-10 h-10 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
        </div>
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 tracking-tight responsive-container sm:flex-col md:flex-row lg:grid">
          Trans Bot AI
        </h1>
        <p className="text-2xl text-gray-300 font-light mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
          Intelligent Logistics Management System
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <CheckCircle className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>25 Portals Active</span>
          </div>
          <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <CheckCircle className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>250 AI Agents</span>
          </div>
          <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <CheckCircle className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>6 Languages</span>
          </div>
        </div>
      </div>

      {/* Portal Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {portals.map((portal, index) => (
            <div 
              key={index}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${portal.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Status Indicator */}
              <div className="absolute top-4 right-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 responsive-container sm:flex-col md:flex-row lg:grid"></div>
              </div>
              
              {/* Icon */}
              <div className="relative z-10 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${portal.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all duration-500`}>
                  <portal.icon className={`w-8 h-8 ${portal.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  {portal.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed responsive-container sm:flex-col md:flex-row lg:grid">
                  {portal.description}
                </p>
                
                {/* Action Button */}
                <div className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 cursor-pointer hover:scale-110 transition-all duration-300 group responsive-container sm:flex-col md:flex-row lg:grid">
          <Zap className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300 responsive-container sm:flex-col md:flex-row lg:grid" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-4 left-4 z-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-4 py-3 shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-white text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">System Online</span>
            </div>
            <div className="w-px h-4 bg-white/20 responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <div className="text-gray-300 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-cyan-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">99.9%</span> Uptime
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="fixed top-4 right-4 z-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-xl responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-4 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-cyan-400 font-bold text-lg responsive-container sm:flex-col md:flex-row lg:grid">25</div>
              <div className="text-gray-300 text-xs responsive-container sm:flex-col md:flex-row lg:grid">Portals</div>
            </div>
            <div className="w-px h-8 bg-white/20 responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-green-400 font-bold text-lg responsive-container sm:flex-col md:flex-row lg:grid">250</div>
              <div className="text-gray-300 text-xs responsive-container sm:flex-col md:flex-row lg:grid">AI Agents</div>
            </div>
            <div className="w-px h-8 bg-white/20 responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-purple-400 font-bold text-lg responsive-container sm:flex-col md:flex-row lg:grid">6</div>
              <div className="text-gray-300 text-xs responsive-container sm:flex-col md:flex-row lg:grid">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard