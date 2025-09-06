import React from 'react'
import { Truck, MapPin, Users, TrendingUp, Clock, Shield, CheckCircle, BarChart3 } from 'lucide-react'

const CarrierSolutions: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Complete fleet visibility with real-time tracking, maintenance scheduling, and performance monitoring."
    },
    {
      icon: MapPin,
      title: "Load Optimization",
      description: "AI-powered load matching and route optimization to maximize revenue and minimize empty miles."
    },
    {
      icon: Users,
      title: "Driver Management",
      description: "Comprehensive driver tools including mobile apps, performance tracking, and compliance monitoring."
    },
    {
      icon: Clock,
      title: "Dispatch Operations",
      description: "Streamlined dispatch with automated load assignment, real-time communication, and status updates."
    },
    {
      icon: TrendingUp,
      title: "Revenue Management",
      description: "Dynamic pricing, rate optimization, and financial analytics to maximize profitability."
    },
    {
      icon: Shield,
      title: "Compliance & Safety",
      description: "Automated compliance monitoring, safety scoring, and regulatory reporting to ensure standards."
    }
  ]

  const benefits = [
    "Increase revenue by 35%",
    "Reduce empty miles by 40%",
    "Improve driver retention by 50%",
    "Lower operational costs by 25%",
    "Increase load acceptance rate by 60%",
    "Improve safety scores by 30%"
  ]

  const carrierTypes = [
    {
      title: "Truckload Carriers",
      description: "Optimize long-haul operations with advanced routing and load matching.",
      icon: "🚛"
    },
    {
      title: "LTL Carriers",
      description: "Maximize efficiency with multi-stop optimization and consolidation.",
      icon: "📦"
    },
    {
      title: "Regional Carriers",
      description: "Streamline regional operations with local market optimization.",
      icon: "🗺️"
    },
    {
      title: "Specialized Carriers",
      description: "Handle specialized freight with custom solutions and compliance tools.",
      icon: "⚡"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-8">
              <Truck className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Carrier Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-green-200 mb-8 max-w-4xl mx-auto">
              Maximize your fleet efficiency and profitability with AI-powered carrier solutions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carrier Types */}
      <div className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solutions for Every Type of Carrier
            </h2>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Tailored solutions for different carrier operations and business models
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {carrierTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-green-200 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Carrier Features
            </h2>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Everything you need to optimize your fleet operations and maximize profitability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-green-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Maximize Your Carrier Operations
              </h2>
              <p className="text-xl text-green-200 mb-8 leading-relaxed">
                Our AI-powered carrier solutions deliver measurable results that directly impact your profitability. 
                Join thousands of carriers already optimizing their operations with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Carrier Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Revenue Growth</span>
                    <span className="text-green-400 font-bold text-xl">35% Increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Empty Miles</span>
                    <span className="text-green-400 font-bold text-xl">40% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Driver Retention</span>
                    <span className="text-green-400 font-bold text-xl">50% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-200">Load Acceptance</span>
                    <span className="text-green-400 font-bold text-xl">60% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Maximize Your Fleet?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of carriers already increasing revenue and efficiency with our AI-powered solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
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

export default CarrierSolutions
