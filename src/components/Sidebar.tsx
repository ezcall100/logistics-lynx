import React from 'react'
import { 
  BarChart3, Users, Truck, Package, 
  Brain, DollarSign, FileText, Settings 
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const portals = [
    { icon: BarChart3, name: "Dashboard", path: "/dashboard" },
    { icon: Users, name: "Broker Portal", path: "/portals/broker" },
    { icon: Truck, name: "Carrier Portal", path: "/portals/carrier" },
    { icon: Package, name: "Shipper Portal", path: "/portals/shipper" },
    { icon: Brain, name: "AI Portal", path: "/portals/autonomous" },
    { icon: DollarSign, name: "Financials", path: "/portals/financials" },
    { icon: FileText, name: "Load Board", path: "/portals/load-board" },
    { icon: Settings, name: "Admin Portal", path: "/portals/admin" }
  ]

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-white font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Portal Access</h3>
        <nav className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {portals.map((portal, index) => (
            <a
              key={index}
              href={portal.path}
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white/20 transition-colors group responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <portal.icon className="w-5 h-5 group-hover:text-cyan-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="group-hover:text-cyan-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">{portal.name}</span>
            </a>
          ))}
        </nav>

        {/* System Status */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
          <h4 className="text-white font-semibold mb-3 responsive-container sm:flex-col md:flex-row lg:grid">System Status</h4>
          <div className="space-y-2 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Portals</span>
              <span className="text-cyan-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">25 Active</span>
            </div>
            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">AI Agents</span>
              <span className="text-green-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">250 Online</span>
            </div>
            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Languages</span>
              <span className="text-purple-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">6 Supported</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
}