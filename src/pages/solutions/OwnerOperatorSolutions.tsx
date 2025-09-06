import React from 'react'
import { Truck, MapPin, DollarSign, Users, Clock, Shield, CheckCircle, BarChart3 } from 'lucide-react'

const OwnerOperatorSolutions: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Fleet Management",
      description: "Complete control over your truck operations with maintenance scheduling, fuel tracking, and performance monitoring."
    },
    {
      icon: MapPin,
      title: "Load Optimization",
      description: "AI-powered load selection and route optimization to maximize revenue and minimize deadhead miles."
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Comprehensive financial tools including expense tracking, profit analysis, and tax preparation assistance."
    },
    {
      icon: Users,
      title: "Customer Relations",
      description: "Build and maintain strong relationships with shippers and brokers through professional communication tools."
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Optimize your schedule with automated dispatch, appointment scheduling, and delivery tracking."
    },
    {
      icon: Shield,
      title: "Compliance & Safety",
      description: "Stay compliant with regulations, maintain safety records, and manage insurance requirements."
    }
  ]

  const benefits = [
    "Increase revenue by 40%",
    "Reduce operating costs by 30%",
    "Improve load selection by 55%",
    "Increase customer retention by 45%",
    "Reduce administrative time by 70%",
    "Improve safety scores by 35%"
  ]

  const ownerOperatorTypes = [
    {
      title: "Solo Owner Operators",
      description: "Independent drivers managing their own truck and business operations.",
      icon: "🚛"
    },
    {
      title: "Small Fleet Owners",
      description: "Owners managing 2-10 trucks with driver management capabilities.",
      icon: "🚚"
    },
    {
      title: "Lease Operators",
      description: "Drivers leasing trucks from carriers with business management tools.",
      icon: "📋"
    },
    {
      title: "Team Drivers",
      description: "Partnerships and team operations with shared business management.",
      icon: "👥"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-8">
              <Truck className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Owner Operator Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-amber-200 mb-8 max-w-4xl mx-auto">
              Maximize your independent trucking business with AI-powered solutions designed for owner operators
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Operator Types */}
      <div className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solutions for Every Type of Owner Operator
            </h2>
            <p className="text-xl text-amber-200 max-w-3xl mx-auto">
              Tailored solutions for different owner operator business models and operational needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ownerOperatorTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-amber-200 text-sm leading-relaxed">{type.description}</p>
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
              Comprehensive Owner Operator Features
            </h2>
            <p className="text-xl text-amber-200 max-w-3xl mx-auto">
              Everything you need to optimize your independent trucking business and maximize profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-amber-200 leading-relaxed">{feature.description}</p>
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
                Maximize Your Owner Operator Business
              </h2>
              <p className="text-xl text-amber-200 mb-8 leading-relaxed">
                Our AI-powered owner operator solutions deliver measurable results that directly impact your profitability. 
                Join thousands of owner operators already optimizing their business with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Owner Operator Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-200">Revenue Growth</span>
                    <span className="text-amber-400 font-bold text-xl">40% Increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-200">Operating Costs</span>
                    <span className="text-amber-400 font-bold text-xl">30% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-200">Load Selection</span>
                    <span className="text-amber-400 font-bold text-xl">55% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-200">Customer Retention</span>
                    <span className="text-amber-400 font-bold text-xl">45% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-amber-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Maximize Your Business?
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Join thousands of owner operators already increasing revenue and efficiency with our AI-powered solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
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

export default OwnerOperatorSolutions
