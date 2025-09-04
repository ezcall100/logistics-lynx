import React from 'react'
import { Truck, Users, Package, Brain, DollarSign, FileText, Settings, Shield } from 'lucide-react'

const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Complete fleet tracking and optimization",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Broker Operations",
      description: "Load brokerage and carrier management",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Package,
      title: "Shipment Tracking",
      description: "Real-time shipment visibility",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Brain,
      title: "AI Automation",
      description: "Intelligent process automation",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Complete financial operations",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Digital document processing",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Settings,
      title: "System Administration",
      description: "Complete system control",
      color: "from-gray-500 to-slate-500"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security",
      color: "from-red-500 to-pink-500"
    }
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">Complete Solutions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive logistics solutions powered by AI and automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all duration-500`}>
                <solution.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                {solution.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Operations?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Choose the solutions that fit your business needs
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
            Explore Solutions
          </button>
        </div>
      </div>
    </div>
  )
}

export default SolutionsPage
