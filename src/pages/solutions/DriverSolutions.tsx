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
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 responsive-container">
      {/* Hero Section */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 responsive-container">
          <div className="text-center responsive-container">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-8 responsive-container">
              <User className="w-10 h-10 text-white responsive-container" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 responsive-container">
              Driver Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-cyan-200 mb-8 max-w-4xl mx-auto responsive-container">
              Empower your driving career with AI-powered mobile solutions designed for professional drivers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
                Download App
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 responsive-container" aria-label="Button">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Types */}
      <div className="py-16 bg-white/5 backdrop-blur-lg responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center mb-12 responsive-container">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 responsive-container">
              Solutions for Every Type of Driver
            </h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto responsive-container">
              Tailored mobile solutions for different driving roles and operational requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {driverTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center responsive-container">
                <div className="text-4xl mb-4 responsive-container">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 responsive-container">{type.title}</h3>
                <p className="text-cyan-200 text-sm leading-relaxed responsive-container">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center mb-16 responsive-container">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 responsive-container">
              Comprehensive Driver Features
            </h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto responsive-container">
              Everything you need to optimize your driving career and maximize your earning potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 responsive-container">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mb-6 responsive-container">
                  <feature.icon className="w-8 h-8 text-white responsive-container" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">{feature.title}</h3>
                <p className="text-cyan-200 leading-relaxed responsive-container">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white/5 backdrop-blur-lg responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center responsive-container">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 responsive-container">
                Maximize Your Driving Career
              </h2>
              <p className="text-xl text-cyan-200 mb-8 leading-relaxed responsive-container">
                Our AI-powered driver solutions deliver measurable results that directly impact your earning potential and job satisfaction. 
                Join thousands of drivers already optimizing their careers with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 responsive-container">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 responsive-container">
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center responsive-container">
                      <CheckCircle className="w-4 h-4 text-white responsive-container" />
                    </div>
                    <span className="text-white font-medium responsive-container">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
              <div className="text-center responsive-container">
                <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-6 responsive-container" />
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">Driver Performance</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-cyan-200 responsive-container">Earning Potential</span>
                    <span className="text-cyan-400 font-bold text-xl responsive-container">25% Increase</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-cyan-200 responsive-container">Fuel Costs</span>
                    <span className="text-cyan-400 font-bold text-xl responsive-container">20% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-cyan-200 responsive-container">Safety Scores</span>
                    <span className="text-cyan-400 font-bold text-xl responsive-container">40% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-cyan-200 responsive-container">Job Satisfaction</span>
                    <span className="text-cyan-400 font-bold text-xl responsive-container">35% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-cyan-600 to-blue-700 responsive-container">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 responsive-container">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 responsive-container">
            Ready to Maximize Your Driving Career?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 responsive-container">
            Join thousands of drivers already increasing their earning potential and job satisfaction with our AI-powered solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
              Download App
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 responsive-container" aria-label="Button">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverSolutions
