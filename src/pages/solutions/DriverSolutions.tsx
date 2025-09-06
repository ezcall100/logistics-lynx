import React from 'react'
import { User, Smartphone, MapPin, Clock, TrendingUp, Shield, CheckCircle, BarChart3 } from 'lucide-react'

const DriverSolutions: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile Driver App",
      description: "Comprehensive mobile app with load management, navigation, and real-time communication tools."
    },
    {
      icon: MapPin,
      title: "Smart Navigation",
      description: "AI-powered navigation with traffic optimization, fuel stops, and route planning for maximum efficiency."
    },
    {
      icon: Clock,
      title: "Hours Management",
      description: "Automated hours of service tracking with ELD integration and compliance monitoring."
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Real-time performance metrics, fuel efficiency monitoring, and driver scorecards."
    },
    {
      icon: User,
      title: "Communication Hub",
      description: "Direct communication with dispatch, customers, and support teams through integrated messaging."
    },
    {
      icon: Shield,
      title: "Safety & Compliance",
      description: "Safety monitoring, incident reporting, and automated compliance documentation."
    }
  ]

  const benefits = [
    "Increase earning potential by 25%",
    "Reduce fuel costs by 20%",
    "Improve safety scores by 40%",
    "Reduce administrative time by 80%",
    "Increase job satisfaction by 35%",
    "Improve work-life balance by 30%"
  ]

  const driverTypes = [
    {
      title: "Long Haul Drivers",
      description: "Cross-country drivers with advanced route planning and fuel optimization tools.",
      icon: "🛣️"
    },
    {
      title: "Regional Drivers",
      description: "Regional route drivers with local market optimization and home time management.",
      icon: "🗺️"
    },
    {
      title: "Local Drivers",
      description: "Local delivery drivers with multi-stop optimization and customer communication tools.",
      icon: "🚚"
    },
    {
      title: "Team Drivers",
      description: "Team operations with shared scheduling and communication management.",
      icon: "👥"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-8">
              <User className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Driver Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-cyan-200 mb-8 max-w-4xl mx-auto">
              Empower your driving career with AI-powered mobile solutions designed for professional drivers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Download App
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Types */}
      <div className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solutions for Every Type of Driver
            </h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              Tailored mobile solutions for different driving roles and operational requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {driverTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-cyan-200 text-sm leading-relaxed">{type.description}</p>
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
              Comprehensive Driver Features
            </h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              Everything you need to optimize your driving career and maximize your earning potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-cyan-200 leading-relaxed">{feature.description}</p>
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
                Maximize Your Driving Career
              </h2>
              <p className="text-xl text-cyan-200 mb-8 leading-relaxed">
                Our AI-powered driver solutions deliver measurable results that directly impact your earning potential and job satisfaction. 
                Join thousands of drivers already optimizing their careers with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Driver Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Earning Potential</span>
                    <span className="text-cyan-400 font-bold text-xl">25% Increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Fuel Costs</span>
                    <span className="text-cyan-400 font-bold text-xl">20% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Safety Scores</span>
                    <span className="text-cyan-400 font-bold text-xl">40% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Job Satisfaction</span>
                    <span className="text-cyan-400 font-bold text-xl">35% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-cyan-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Maximize Your Driving Career?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Join thousands of drivers already increasing their earning potential and job satisfaction with our AI-powered solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Download App
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverSolutions
