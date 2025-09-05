import React from 'react'
import { ResponsiveContainer } from '../components/ResponsiveContainer'

const SolutionsPage: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              AI-Powered Logistics Solutions
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Transform your logistics operations with our comprehensive suite of AI-driven solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Transportation Management */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Transportation Management</h3>
              <p className="text-blue-200 mb-6">Optimize routes, reduce costs, and improve delivery times with AI-powered transportation solutions.</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Route Optimization</li>
                <li>• Fleet Management</li>
                <li>• Real-time Tracking</li>
                <li>• Cost Analytics</li>
              </ul>
            </div>

            {/* Warehouse Management */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Warehouse Management</h3>
              <p className="text-blue-200 mb-6">Streamline warehouse operations with intelligent inventory management and automation.</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Inventory Optimization</li>
                <li>• Automated Picking</li>
                <li>• Space Utilization</li>
                <li>• Quality Control</li>
              </ul>
            </div>

            {/* Supply Chain Visibility */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Supply Chain Visibility</h3>
              <p className="text-blue-200 mb-6">Gain complete visibility across your entire supply chain with real-time monitoring and analytics.</p>
              <ul className="space-y-2 text-blue-100">
                <li>• End-to-End Tracking</li>
                <li>• Predictive Analytics</li>
                <li>• Risk Management</li>
                <li>• Performance Metrics</li>
              </ul>
            </div>

            {/* AI Automation */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">AI Automation</h3>
              <p className="text-blue-200 mb-6">Automate complex logistics processes with intelligent AI agents and machine learning.</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Process Automation</li>
                <li>• Smart Decision Making</li>
                <li>• Predictive Maintenance</li>
                <li>• Autonomous Operations</li>
              </ul>
            </div>

            {/* Customer Experience */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Customer Experience</h3>
              <p className="text-blue-200 mb-6">Enhance customer satisfaction with personalized service and real-time communication.</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Real-time Updates</li>
                <li>• Personalized Service</li>
                <li>• Proactive Communication</li>
                <li>• Self-Service Portal</li>
              </ul>
            </div>

            {/* Analytics & Insights */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="w-16 h-16 bg-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Analytics & Insights</h3>
              <p className="text-blue-200 mb-6">Make data-driven decisions with comprehensive analytics and business intelligence.</p>
              <ul className="space-y-2 text-blue-100">
                <li>• Performance Dashboards</li>
                <li>• Predictive Analytics</li>
                <li>• Cost Optimization</li>
                <li>• Custom Reports</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Explore All Solutions
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default SolutionsPage