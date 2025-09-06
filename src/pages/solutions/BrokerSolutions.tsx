import React from 'react'
import { Briefcase, Users, TrendingUp, Target, Clock, Shield, CheckCircle, BarChart3 } from 'lucide-react'

const BrokerSolutions: React.FC = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Load Management",
      description: "Comprehensive load posting, matching, and tracking with automated carrier notifications."
    },
    {
      icon: Users,
      title: "Carrier Network",
      description: "Access to verified carrier network with ratings, capacity, and performance tracking."
    },
    {
      icon: TrendingUp,
      title: "Rate Management",
      description: "Dynamic pricing tools with market analysis and competitive rate optimization."
    },
    {
      icon: Target,
      title: "Customer Management",
      description: "Complete customer relationship management with automated follow-ups and reporting."
    },
    {
      icon: Clock,
      title: "Dispatch Operations",
      description: "Streamlined dispatch with real-time tracking, communication, and status updates."
    },
    {
      icon: Shield,
      title: "Compliance & Insurance",
      description: "Automated compliance monitoring, insurance verification, and regulatory reporting."
    }
  ]

  const benefits = [
    "Increase load volume by 50%",
    "Improve profit margins by 35%",
    "Reduce operational costs by 40%",
    "Increase carrier utilization by 45%",
    "Improve customer satisfaction by 60%",
    "Automate 70% of routine tasks"
  ]

  const brokerTypes = [
    {
      title: "Freight Brokers",
      description: "Connect shippers with carriers for optimal load matching and service delivery.",
      icon: "🚚"
    },
    {
      title: "3PL Providers",
      description: "Comprehensive logistics services with integrated brokerage capabilities.",
      icon: "📋"
    },
    {
      title: "Load Boards",
      description: "Digital marketplace solutions for connecting shippers and carriers.",
      icon: "💻"
    },
    {
      title: "Asset-Light Brokers",
      description: "Flexible brokerage operations without fleet ownership requirements.",
      icon: "⚡"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-8">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Broker Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-4xl mx-auto">
              Streamline your brokerage operations with AI-powered solutions for maximum efficiency and profitability
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Broker Types */}
      <div className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solutions for Every Type of Broker
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Tailored solutions for different brokerage models and business requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {brokerTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-purple-200 text-sm leading-relaxed">{type.description}</p>
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
              Comprehensive Broker Features
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Everything you need to optimize your brokerage operations and maximize profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-200 leading-relaxed">{feature.description}</p>
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
                Optimize Your Brokerage Operations
              </h2>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed">
                Our AI-powered broker solutions deliver measurable results that directly impact your profitability. 
                Join thousands of brokers already optimizing their operations with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Broker Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Load Volume</span>
                    <span className="text-purple-400 font-bold text-xl">50% Increase</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Profit Margins</span>
                    <span className="text-purple-400 font-bold text-xl">35% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Operational Costs</span>
                    <span className="text-purple-400 font-bold text-xl">40% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Customer Satisfaction</span>
                    <span className="text-purple-400 font-bold text-xl">60% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-600 to-pink-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Brokerage?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of brokers already increasing profits and efficiency with our AI-powered solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
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

export default BrokerSolutions
