import React from 'react'
import { Truck, Fuel, Wrench, Users, Shield, CheckCircle } from 'lucide-react'

const FleetManagement: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: "Fleet Tracking",
      description: "Real-time GPS tracking and monitoring of all vehicles in your fleet with detailed location history."
    },
    {
      icon: Fuel,
      title: "Fuel Management",
      description: "Optimize fuel consumption with route planning, driver behavior analysis, and fuel efficiency reports."
    },
    {
      icon: Wrench,
      title: "Maintenance Scheduling",
      description: "Automated maintenance scheduling based on mileage, hours, and predictive analytics to prevent breakdowns."
    },
    {
      icon: Users,
      title: "Driver Management",
      description: "Comprehensive driver profiles, performance tracking, and safety score monitoring for optimal fleet operations."
    }
  ]

  const benefits = [
    "Reduce fuel costs by up to 25%",
    "Improve fleet utilization by 40%",
    "Decrease maintenance costs by 30%",
    "Enhance driver safety and compliance",
    "Real-time visibility and control",
    "Automated reporting and analytics"
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 responsive-container">
      {/* Hero Section */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 responsive-container">
          <div className="text-center responsive-container">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mb-8 responsive-container">
              <Truck className="w-10 h-10 text-white responsive-container" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 responsive-container">
              Fleet Management
            </h1>
            <p className="text-xl text-orange-200 mb-8 max-w-3xl mx-auto responsive-container">
              Comprehensive fleet control and optimization with real-time tracking, maintenance scheduling, and performance analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
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
            <h2 className="text-4xl font-bold text-white mb-4 responsive-container">Fleet Management Features</h2>
            <p className="text-xl text-orange-200 responsive-container">Complete control over your fleet operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
                  <feature.icon className="w-6 h-6 text-white responsive-container" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 responsive-container">{feature.title}</h3>
                <p className="text-orange-200 responsive-container">{feature.description}</p>
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
              <h2 className="text-4xl font-bold text-white mb-6 responsive-container">Optimize Your Fleet</h2>
              <p className="text-xl text-orange-200 mb-8 responsive-container">
                Our comprehensive fleet management solution helps you reduce costs, improve efficiency, 
                and maintain the highest standards of safety and compliance across your entire fleet.
              </p>
              
              <div className="space-y-4 responsive-container">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3 responsive-container">
                    <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 responsive-container" />
                    <span className="text-white text-lg responsive-container">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
              <div className="text-center responsive-container">
                <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4 responsive-container" />
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">Fleet Performance</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-orange-200 responsive-container">Fleet Utilization</span>
                    <span className="text-white font-semibold responsive-container">92%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-orange-200 responsive-container">Fuel Efficiency</span>
                    <span className="text-white font-semibold responsive-container">+25%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-orange-200 responsive-container">Maintenance Cost</span>
                    <span className="text-white font-semibold responsive-container">-30%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-orange-200 responsive-container">Safety Score</span>
                    <span className="text-white font-semibold responsive-container">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-orange-600 to-red-700 responsive-container">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 responsive-container">
          <h2 className="text-4xl font-bold text-white mb-6 responsive-container">Take Control of Your Fleet</h2>
          <p className="text-xl text-orange-100 mb-8 responsive-container">
            Join thousands of companies optimizing their fleet operations with our comprehensive management platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
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

export default FleetManagement

