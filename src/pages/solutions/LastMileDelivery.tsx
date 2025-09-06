import React from 'react'
import { Package, MapPin, Clock, Users, CheckCircle, Target } from 'lucide-react'

const LastMileDelivery: React.FC = () => {
  const features = [
    {
      icon: Package,
      title: "Smart Delivery Routing",
      description: "AI-powered route optimization for the final mile delivery to ensure fastest and most cost-effective delivery."
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Live tracking and notifications for customers with accurate delivery time predictions and updates."
    },
    {
      icon: Users,
      title: "Driver Management",
      description: "Comprehensive driver app with navigation, delivery confirmations, and customer communication tools."
    },
    {
      icon: Clock,
      title: "Time Window Optimization",
      description: "Intelligent scheduling to meet customer delivery preferences and optimize driver efficiency."
    }
  ]

  const benefits = [
    "Reduce delivery costs by up to 35%",
    "Improve delivery success rate to 98%",
    "Enhance customer satisfaction scores",
    "Optimize driver productivity by 40%",
    "Real-time delivery tracking",
    "Automated customer notifications"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-8">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Last Mile Delivery
            </h1>
            <p className="text-xl text-cyan-200 mb-8 max-w-3xl mx-auto">
              Optimized final delivery solutions with smart routing, real-time tracking, and exceptional customer experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
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
            <h2 className="text-4xl font-bold text-white mb-4">Last Mile Features</h2>
            <p className="text-xl text-cyan-200">Complete solution for final delivery optimization</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-cyan-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Deliver Excellence</h2>
              <p className="text-xl text-cyan-200 mb-8">
                Our last mile delivery solution transforms the final step of your supply chain, 
                ensuring fast, reliable, and cost-effective delivery to your customers.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-cyan-500 flex-shrink-0" />
                    <span className="text-white text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Target className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Delivery Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Delivery Success Rate</span>
                    <span className="text-white font-semibold">98.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Average Delivery Time</span>
                    <span className="text-white font-semibold">2.1 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Cost Reduction</span>
                    <span className="text-white font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cyan-200">Customer Satisfaction</span>
                    <span className="text-white font-semibold">4.9/5</span>
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
          <h2 className="text-4xl font-bold text-white mb-6">Optimize Your Last Mile</h2>
          <p className="text-xl text-cyan-100 mb-8">
            Transform your final delivery operations with our intelligent last mile solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyan-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-cyan-50 transition-all duration-300 transform hover:scale-105">
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

export default LastMileDelivery

