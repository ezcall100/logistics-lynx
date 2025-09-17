import React from 'react'
import { Brain, Zap, Users, MessageCircle, Settings } from 'lucide-react'

const AIAgentsPage: React.FC = () => {
  const languages = [
    { name: "English", code: "EN", flag: "🇺🇸", agents: 50 },
    { name: "Spanish", code: "ES", flag: "🇪🇸", agents: 40 },
    { name: "French", code: "FR", flag: "🇫🇷", agents: 35 },
    { name: "Mandarin", code: "ZH", flag: "🇨🇳", agents: 45 },
    { name: "Hindi", code: "HI", flag: "🇮🇳", agents: 40 },
    { name: "Punjabi", code: "PA", flag: "🇮🇳", agents: 40 }
  ]

  const capabilities = [
    {
      icon: MessageCircle,
      title: "Multi-Language Communication",
      description: "Natural language processing in 6 languages",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant response and decision making",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "User Interaction",
      description: "Intelligent user assistance and support",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Settings,
      title: "System Automation",
      description: "Automated workflow and process management",
      color: "from-purple-500 to-violet-500"
    }
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="pt-16 min-h-screen responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-7xl mx-auto px-6 py-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 shadow-2xl responsive-container sm:flex-col md:flex-row lg:grid">
            <Brain className="w-12 h-12 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">250 AI Agents</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
            Autonomous intelligence working across all operations in 6 languages
          </p>
        </div>

        {/* Language Distribution */}
        <div className="mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-4xl font-bold text-white mb-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">Language Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {languages.map((language, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-3xl responsive-container sm:flex-col md:flex-row lg:grid">{language.flag}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{language.name}</h3>
                      <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{language.code}</p>
                    </div>
                  </div>
                  <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="text-2xl font-bold text-cyan-400 responsive-container sm:flex-col md:flex-row lg:grid">{language.agents}</div>
                    <div className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Agents</div>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000 responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{ width: `${(language.agents / 50) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-4xl font-bold text-white mb-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">AI Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500`}>
                  <capability.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  {capability.title}
                </h3>
                <p className="text-gray-300 leading-relaxed responsive-container sm:flex-col md:flex-row lg:grid">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">250</div>
              <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Total AI Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">6</div>
              <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Languages</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">24/7</div>
              <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Operation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">99.9%</div>
              <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Uptime</div>
            </div>
          </div>
        </div>

        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-4xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Experience AI-Powered Logistics</h2>
          <p className="text-xl text-gray-300 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            Let our 250 AI agents transform your operations
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            Start with AI Agents
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAgentsPage
