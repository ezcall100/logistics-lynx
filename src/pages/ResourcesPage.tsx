import React from 'react'
import { FileText, Book, Video, Download, MessageCircle, HelpCircle, Users } from 'lucide-react'

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Complete API and user documentation",
      color: "from-blue-500 to-indigo-500",
      items: ["API Reference", "User Guides", "Integration Docs"]
    },
    {
      icon: Book,
      title: "Tutorials",
      description: "Step-by-step learning resources",
      color: "from-green-500 to-emerald-500",
      items: ["Getting Started", "Advanced Features", "Best Practices"]
    },
    {
      icon: Video,
      title: "Video Guides",
      description: "Visual learning and demonstrations",
      color: "from-purple-500 to-violet-500",
      items: ["Portal Walkthroughs", "Feature Demos", "Training Videos"]
    },
    {
      icon: Download,
      title: "Downloads",
      description: "Resources and tools for development",
      color: "from-yellow-500 to-orange-500",
      items: ["SDKs", "Templates", "Sample Code"]
    },
    {
      icon: MessageCircle,
      title: "Support Center",
      description: "Get help and support",
      color: "from-cyan-500 to-blue-500",
      items: ["FAQ", "Troubleshooting", "Contact Support"]
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with other users",
      color: "from-pink-500 to-rose-500",
      items: ["Forums", "User Groups", "Events"]
    }
  ]

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">Resources</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to get the most out of Trans Bot AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${resource.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/25 transition-all duration-500`}>
                <resource.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                {resource.title}
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {resource.description}
              </p>
              <ul className="space-y-2">
                {resource.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-400 flex items-center">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Start Guide</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Sign Up</h4>
                  <p className="text-gray-300 text-sm">Create your account and choose a plan</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Access Portals</h4>
                  <p className="text-gray-300 text-sm">Explore the portals available in your plan</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Configure AI Agents</h4>
                  <p className="text-gray-300 text-sm">Set up your AI agents for automation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Need Help?</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <HelpCircle className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-white font-semibold">Documentation</h4>
                  <p className="text-gray-300 text-sm">Comprehensive guides and references</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h4 className="text-white font-semibold">Live Chat</h4>
                  <p className="text-gray-300 text-sm">Get instant help from our support team</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
                <div>
                  <h4 className="text-white font-semibold">Community</h4>
                  <p className="text-gray-300 text-sm">Connect with other users and experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Explore our resources and start your journey with Trans Bot AI
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
            Browse Resources
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage
