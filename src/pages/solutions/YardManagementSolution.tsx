import React from 'react'
import { MapPin, Clock, Users, Truck, CheckCircle, BarChart3, Shield } from 'lucide-react'

const YardManagementSolution: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Yard Visibility",
      description: "Track every vehicle, trailer, and container in your yard with real-time GPS and IoT sensors."
    },
    {
      icon: Clock,
      title: "Automated Gate Management",
      description: "Streamline entry and exit processes with automated gate systems and driver check-in."
    },
    {
      icon: Users,
      title: "Driver Management",
      description: "Manage driver schedules, assignments, and performance with integrated workforce tools."
    },
    {
      icon: Truck,
      title: "Trailer Tracking",
      description: "Monitor trailer locations, status, and availability across your entire yard network."
    },
    {
      icon: BarChart3,
      title: "Yard Analytics",
      description: "Gain insights into yard efficiency, dwell times, and operational bottlenecks."
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Ensure security protocols and regulatory compliance with automated monitoring."
    }
  ]

  const benefits = [
    "Reduce yard dwell time by 40%",
    "Improve gate throughput by 60%",
    "Eliminate manual tracking errors",
    "Increase yard capacity by 25%",
    "Reduce security incidents by 80%",
    "Lower operational costs by 30%"
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 responsive-container">
      {/* Hero Section */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 responsive-container">
          <div className="text-center responsive-container">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mb-8 responsive-container">
              <MapPin className="w-10 h-10 text-white responsive-container" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 responsive-container">
              Yard Management Solution
            </h1>
            
            <p className="text-xl md:text-2xl text-green-200 mb-8 max-w-4xl mx-auto responsive-container">
              Transform your yard operations with AI-powered visibility, automation, and optimization
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 responsive-container" aria-label="Button">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 responsive-container">
              Comprehensive Yard Management Features
            </h2>
            <p className="text-xl text-green-200 max-w-3xl mx-auto responsive-container">
              Everything you need to optimize your yard operations and maximize efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 responsive-container">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl mb-6 responsive-container">
                  <feature.icon className="w-8 h-8 text-white responsive-container" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">{feature.title}</h3>
                <p className="text-green-200 leading-relaxed responsive-container">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center responsive-container">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 responsive-container">
                Transform Your Yard Operations
              </h2>
              <p className="text-xl text-green-200 mb-8 leading-relaxed responsive-container">
                Our AI-powered yard management solution delivers measurable results that directly impact your bottom line. 
                Join hundreds of companies already optimizing their yard operations with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 responsive-container">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 responsive-container">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center responsive-container">
                      <CheckCircle className="w-4 h-4 text-white responsive-container" />
                    </div>
                    <span className="text-white font-medium responsive-container">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
              <div className="text-center responsive-container">
                <BarChart3 className="w-16 h-16 text-green-400 mx-auto mb-6 responsive-container" />
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">Performance Metrics</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Yard Dwell Time</span>
                    <span className="text-green-400 font-bold text-xl responsive-container">40% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Gate Throughput</span>
                    <span className="text-green-400 font-bold text-xl responsive-container">60% Increase</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Yard Capacity</span>
                    <span className="text-green-400 font-bold text-xl responsive-container">25% Increase</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-green-200 responsive-container">Operational Costs</span>
                    <span className="text-green-400 font-bold text-xl responsive-container">30% Reduction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-green-600 to-blue-700 responsive-container">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 responsive-container">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 responsive-container">
            Ready to Optimize Your Yard?
          </h2>
          <p className="text-xl text-green-100 mb-8 responsive-container">
            Join hundreds of companies already maximizing their yard efficiency with our AI-powered solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
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

export default YardManagementSolution
