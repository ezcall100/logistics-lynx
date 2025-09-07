import React from 'react'
import { Package, Users, Zap, Target, Clock, BarChart3, CheckCircle } from 'lucide-react'

const LoadBoardSolution: React.FC = () => {
  const features = [
    {
      icon: Package,
      title: "Smart Load Matching",
      description: "AI-powered algorithms match loads with the most suitable carriers based on location, capacity, and preferences."
    },
    {
      icon: Users,
      title: "Carrier Network",
      description: "Access to a vast network of verified carriers with ratings, reviews, and performance metrics."
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications for new loads, status updates, and market changes."
    },
    {
      icon: Target,
      title: "Rate Optimization",
      description: "Dynamic pricing based on market conditions, demand, and carrier availability."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock access to loads and carriers with automated matching and booking."
    },
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Comprehensive market insights and trends to help you make informed decisions."
    }
  ]

  const benefits = [
    "Increase load fill rate by 50%",
    "Reduce empty miles by 35%",
    "Improve carrier utilization by 40%",
    "Lower operational costs by 25%",
    "Faster load matching in seconds",
    "Access to 10,000+ carriers"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mb-8">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Load Board Solution
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-4xl mx-auto">
              Connect shippers with carriers through our AI-powered load board platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Load Board Features
            </h2>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto">
              Everything you need to efficiently match loads with carriers and optimize your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-orange-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Maximize Your Load Board Efficiency
              </h2>
              <p className="text-xl text-orange-200 mb-8 leading-relaxed">
                Our AI-powered load board solution delivers measurable results that directly impact your bottom line. 
                Join thousands of companies already optimizing their load matching with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-orange-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-orange-200">Load Fill Rate</span>
                    <span className="text-orange-400 font-bold text-xl">50% Increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-200">Empty Miles</span>
                    <span className="text-orange-400 font-bold text-xl">35% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-200">Carrier Utilization</span>
                    <span className="text-orange-400 font-bold text-xl">40% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-200">Operational Costs</span>
                    <span className="text-orange-400 font-bold text-xl">25% Reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-orange-600 to-red-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Load Board?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of companies already maximizing their load matching efficiency with our AI-powered solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadBoardSolution
