import React from 'react'
import { Truck, Users, MapPin, Clock, TrendingUp, Shield, Zap, Target } from 'lucide-react'

const LoadMatching: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Smart Matching Algorithm",
      description: "AI-powered matching that considers capacity, location, and preferences to find the perfect load-carrier match."
    },
    {
      icon: Users,
      title: "Multi-Party Coordination",
      description: "Seamlessly coordinate between shippers, brokers, and carriers for optimal load distribution."
    },
    {
      icon: MapPin,
      title: "Real-Time Location Tracking",
      description: "Track available capacity and location in real-time for instant matching opportunities."
    },
    {
      icon: Clock,
      title: "Instant Notifications",
      description: "Get notified immediately when matching loads become available based on your criteria."
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Analyze matching success rates and optimize your load acceptance strategies."
    },
    {
      icon: Shield,
      title: "Verified Carriers",
      description: "Work with pre-verified carriers with proven track records and insurance coverage."
    }
  ]

  const benefits = [
    "Reduce empty miles by up to 40%",
    "Increase carrier utilization by 35%",
    "Improve on-time delivery rates by 25%",
    "Lower operational costs by 30%"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%234F46E5%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-8">
              <Target className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Smart Load Matching
            </h1>
            <p className="text-xl text-green-200 mb-8 max-w-3xl mx-auto">
              AI-powered load-carrier matching that maximizes efficiency and reduces empty miles through intelligent algorithms and real-time coordination.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                Start Matching
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
            <h2 className="text-4xl font-bold text-white mb-4">Powerful Matching Features</h2>
            <p className="text-xl text-green-200">Advanced AI algorithms that understand your business needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-green-200">{feature.description}</p>
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
              <h2 className="text-4xl font-bold text-white mb-6">Proven Results</h2>
              <p className="text-xl text-green-200 mb-8">
                Our smart load matching system has helped thousands of logistics companies optimize their operations and increase profitability.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Optimize?</h3>
                <p className="text-green-200 mb-6">
                  Start using our smart load matching system today and see immediate improvements in your operations.
                </p>
                <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 w-full">
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-500/20 to-teal-600/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Transform Your Load Matching Today
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Join thousands of logistics companies already using our AI-powered load matching system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
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

export default LoadMatching
