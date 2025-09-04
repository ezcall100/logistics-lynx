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
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 overflow-y-auto">
      <div className="p-6">
        <h3 className="text-white font-semibold mb-4">Portal Access</h3>
        <nav className="space-y-2">
          {portals.map((portal, index) => (
            <a
              key={index}
              href={portal.path}
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white/20 transition-colors group"
            >
              <portal.icon className="w-5 h-5 group-hover:text-cyan-300 transition-colors" />
              <span className="group-hover:text-cyan-300 transition-colors">{portal.name}</span>
            </a>
          ))}
        </nav>

        {/* System Status */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/20">
          <h4 className="text-white font-semibold mb-3">System Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Portals</span>
              <span className="text-cyan-400 font-semibold">25 Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">AI Agents</span>
              <span className="text-green-400 font-semibold">250 Online</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Languages</span>
              <span className="text-purple-400 font-semibold">6 Supported</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
