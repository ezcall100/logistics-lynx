import React from 'react'
import { Brain, Target, Users, Award, Globe } from 'lucide-react'

const AboutPage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-7xl mx-auto px-6 py-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <h1 className="text-6xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">About Trans Bot AI</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
            Revolutionizing logistics through artificial intelligence and autonomous operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              To transform the logistics industry through intelligent automation, 
              providing businesses with the tools they need to operate more efficiently, 
              reduce costs, and deliver exceptional service.
            </p>
            <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                <Target className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">Innovation First</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <Brain className="w-10 h-10 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">25 Portals</h3>
              <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Complete logistics ecosystem</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <Users className="w-8 h-8 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">250 AI Agents</h3>
            <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Autonomous intelligence working 24/7</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 flex items-center justify-center mx-auto mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <Globe className="w-8 h-8 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">6 Languages</h3>
            <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Global multi-language support</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <Award className="w-8 h-8 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Enterprise Grade</h3>
            <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Bank-level security & compliance</p>
          </div>
        </div>

        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-4xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Ready to Join the Future?</h2>
          <p className="text-xl text-gray-300 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            Experience the power of intelligent logistics management
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage