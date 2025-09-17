import React from 'react'
import { Zap, Target, Users, Clock, BarChart3, CheckCircle } from 'lucide-react'

const LoadMatching: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Smart Load-Carrier Matching",
      description: "AI-powered algorithms match loads with the most suitable carriers based on location, capacity, and preferences."
    },
    {
      icon: Target,
      title: "Real-Time Matching",
      description: "Instant matching system that connects shippers with carriers in real-time for maximum efficiency."
    },
    {
      icon: Users,
      title: "Verified Network",
      description: "Access to a network of verified carriers with ratings, reviews, and performance metrics."
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock matching service ensuring your loads are always connected with available carriers."
    }
  ]

  const benefits = [
    "Reduce empty miles by up to 40%",
    "Increase carrier utilization by 60%",
    "Lower shipping costs by 25%",
    "Improve delivery times by 35%",
    "Enhanced visibility and tracking",
    "Automated documentation and billing"
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 responsive-container">
      {/* Hero Section */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 responsive-container">
          <div className="text-center responsive-container">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl mb-8 responsive-container">
              <Zap className="w-10 h-10 text-white responsive-container" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 responsive-container">
              Load Matching
            </h1>
            <p className="text-xl text-green-200 mb-8 max-w-3xl mx-auto responsive-container">
              Smart load-carrier matching powered by AI to optimize your logistics operations and reduce costs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 responsive-container" aria-label="Button">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/5 backdrop-blur-lg responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center mb-16 responsive-container">
            <h2 className="text-4xl font-bold text-white mb-4 responsive-container">Powerful Features</h2>
            <p className="text-xl text-green-200 responsive-container">Everything you need for intelligent load matching</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
                  <feature.icon className="w-6 h-6 text-white responsive-container" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 responsive-container">{feature.title}</h3>
                <p className="text-green-200 responsive-container">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center responsive-container">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 responsive-container">Transform Your Logistics</h2>
              <p className="text-xl text-green-200 mb-8 responsive-container">
                Our AI-powered load matching system revolutionizes how you connect with carriers, 
                reducing costs and improving efficiency across your entire supply chain.
              </p>
              
              <div className="space-y-4 responsive-container">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 responsive-container">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 responsive-container" />
                    <span className="text-white text-lg responsive-container">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
              <div className="text-center responsive-container">
                <BarChart3 className="w-16 h-16 text-green-500 mx-auto mb-4 responsive-container" />
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">Performance Metrics</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Load Match Rate</span>
                    <span className="text-white font-semibold responsive-container">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Average Match Time</span>
                    <span className="text-white font-semibold responsive-container">2.3 min</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Cost Reduction</span>
                    <span className="text-white font-semibold responsive-container">25%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Carrier Satisfaction</span>
                    <span className="text-white font-semibold responsive-container">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-600 to-teal-700 responsive-container">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 responsive-container">
          <h2 className="text-4xl font-bold text-white mb-6 responsive-container">Ready to Optimize Your Load Matching?</h2>
          <p className="text-xl text-green-100 mb-8 responsive-container">
            Join thousands of companies already using our AI-powered load matching system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 responsive-container" aria-label="Button">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadMatching