import React from 'react'
import { Package, Truck, MapPin, Clock, TrendingUp, Shield, CheckCircle, BarChart3 } from 'lucide-react'

const ShipperSolutions: React.FC = () => {
  const features = [
    {
      icon: Package,
      title: "Shipment Management",
      description: "Complete visibility and control over your shipments from pickup to delivery with real-time tracking."
    },
    {
      icon: Truck,
      title: "Carrier Selection",
      description: "AI-powered carrier matching based on performance, rates, and capacity to ensure optimal service."
    },
    {
      icon: MapPin,
      title: "Route Optimization",
      description: "Minimize shipping costs and delivery times with intelligent route planning and optimization."
    },
    {
      icon: Clock,
      title: "Delivery Scheduling",
      description: "Flexible scheduling options with automated notifications and delivery confirmations."
    },
    {
      icon: TrendingUp,
      title: "Cost Management",
      description: "Track shipping costs, analyze trends, and optimize your logistics spend with detailed analytics."
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "Ensure regulatory compliance and cargo security with automated documentation and monitoring."
    }
  ]

  const benefits = [
    "Reduce shipping costs by 30%",
    "Improve delivery times by 40%",
    "Increase shipment visibility by 95%",
    "Lower carrier management overhead by 50%",
    "Reduce shipping errors by 80%",
    "Improve customer satisfaction by 45%"
  ]

  const shipperTypes = [
    {
      title: "E-commerce Retailers",
      description: "Streamline last-mile delivery and manage high-volume shipments efficiently.",
      icon: "🛒"
    },
    {
      title: "Manufacturing Companies",
      description: "Optimize raw material and finished goods transportation with specialized solutions.",
      icon: "🏭"
    },
    {
      title: "Distribution Centers",
      description: "Manage complex distribution networks with advanced routing and inventory optimization.",
      icon: "📦"
    },
    {
      title: "Import/Export Businesses",
      description: "Navigate international shipping complexities with customs and compliance automation.",
      icon: "🌍"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-8">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Shipper Solutions
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-4xl mx-auto">
              Optimize your shipping operations with AI-powered solutions designed specifically for shippers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipper Types */}
      <div className="py-16 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solutions for Every Type of Shipper
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Tailored solutions for different shipper needs and business models
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shipperTypes.map((type, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{type.description}</p>
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
              Comprehensive Shipper Features
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Everything you need to optimize your shipping operations and reduce costs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-6">
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
      <div className="py-24 bg-white/5 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Transform Your Shipping Operations
              </h2>
              <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                Our AI-powered shipper solutions deliver measurable results that directly impact your bottom line. 
                Join thousands of shippers already optimizing their operations with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Shipper Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Shipping Costs</span>
                    <span className="text-blue-400 font-bold text-xl">30% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Delivery Times</span>
                    <span className="text-blue-400 font-bold text-xl">40% Faster</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Shipment Visibility</span>
                    <span className="text-blue-400 font-bold text-xl">95% Coverage</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">Customer Satisfaction</span>
                    <span className="text-blue-400 font-bold text-xl">45% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Shipping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of shippers already reducing costs and improving service with our AI-powered solutions
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

export default ShipperSolutions
