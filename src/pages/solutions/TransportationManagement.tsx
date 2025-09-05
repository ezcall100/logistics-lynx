import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const TransportationManagement: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Transportation Management
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Optimize your transportation operations with AI-powered route planning, fleet management, and real-time tracking
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Route Optimization</h2>
                <p className="text-blue-200 mb-6">
                  Our AI algorithms analyze traffic patterns, weather conditions, and delivery constraints to find the most efficient routes.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li>• Real-time traffic analysis</li>
                  <li>• Multi-stop optimization</li>
                  <li>• Dynamic rerouting</li>
                  <li>• Fuel cost optimization</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Fleet Management</h2>
                <p className="text-blue-200 mb-6">
                  Monitor and manage your entire fleet with comprehensive tracking, maintenance scheduling, and performance analytics.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li>• Vehicle tracking and monitoring</li>
                  <li>• Predictive maintenance</li>
                  <li>• Driver performance analytics</li>
                  <li>• Compliance management</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Real-time Tracking</h2>
                <p className="text-blue-200 mb-6">
                  Provide customers with accurate, real-time updates on their shipments with our advanced tracking system.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li>• GPS tracking integration</li>
                  <li>• Automated notifications</li>
                  <li>• Delivery confirmation</li>
                  <li>• Exception handling</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Cost Analytics</h2>
                <p className="text-blue-200 mb-6">
                  Gain insights into your transportation costs with detailed analytics and reporting capabilities.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li>• Cost per mile analysis</li>
                  <li>• Fuel consumption tracking</li>
                  <li>• Driver efficiency metrics</li>
                  <li>• ROI calculations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default TransportationManagement
