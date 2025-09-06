import React from 'react'
import { Route, Navigation, Zap, Target, Clock, MapPin, TrendingUp, BarChart3 } from 'lucide-react'

const RouteOptimization: React.FC = () => {
  const features = [
    {
      icon: Route,
      title: "AI-Powered Route Planning",
      description: "Advanced algorithms optimize routes in real-time for maximum efficiency and cost savings."
    },
    {
      icon: Navigation,
      title: "Dynamic Re-routing",
      description: "Automatically adjust routes based on traffic, weather, and delivery constraints."
    },
    {
      icon: Zap,
      title: "Fuel Optimization",
      description: "Reduce fuel consumption by up to 25% with intelligent route planning."
    },
    {
      icon: Target,
      title: "Delivery Time Accuracy",
      description: "Achieve 98% on-time delivery rates with predictive arrival times."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Monitor fleet performance and delivery status in real-time."
    },
    {
      icon: MapPin,
      title: "Multi-stop Optimization",
      description: "Optimize complex multi-stop routes for maximum efficiency."
    }
  ]

  const benefits = [
    "Reduce fuel costs by 25%",
    "Improve delivery times by 40%",
    "Increase driver productivity by 30%",
    "Reduce carbon emissions by 35%",
    "99.9% uptime guarantee",
    "24/7 customer support"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8">
              <Route className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Route Optimization
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto">
              AI-powered route planning that reduces costs, improves delivery times, and maximizes fleet efficiency
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
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
              Powerful Route Optimization Features
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Leverage cutting-edge AI technology to optimize your logistics operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-blue-200 leading-relaxed">{feature.description}</p>
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
                Transform Your Logistics Operations
              </h2>
              <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                Our AI-powered route optimization delivers measurable results that directly impact your bottom line. 
                Join thousands of companies already saving millions with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Fuel Savings</span>
                    <span className="text-green-400 font-bold text-xl">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Delivery Time</span>
                    <span className="text-green-400 font-bold text-xl">40% Faster</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Driver Productivity</span>
                    <span className="text-green-400 font-bold text-xl">30% Increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">On-time Delivery</span>
                    <span className="text-green-400 font-bold text-xl">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Routes?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of logistics companies already saving millions with our AI-powered route optimization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
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

export default RouteOptimization
