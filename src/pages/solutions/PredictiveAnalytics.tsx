import React from 'react'
import { BarChart3, TrendingUp, Brain, Target, CheckCircle } from 'lucide-react'

const PredictiveAnalytics: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Forecasting",
      description: "Advanced machine learning models predict demand, capacity, and market trends with 95% accuracy."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Get instant insights and recommendations based on live data streams and historical patterns."
    },
    {
      icon: Target,
      title: "Predictive Maintenance",
      description: "Anticipate equipment failures and maintenance needs before they impact your operations."
    },
    {
      icon: BarChart3,
      title: "Performance Optimization",
      description: "Identify bottlenecks and optimization opportunities across your entire supply chain."
    }
  ]

  const capabilities = [
    "Demand forecasting with 95% accuracy",
    "Route optimization predictions",
    "Fuel consumption forecasting",
    "Maintenance scheduling optimization",
    "Market trend analysis",
    "Risk assessment and mitigation",
    "Capacity planning insights",
    "Cost optimization recommendations"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 responsive-container">
      {/* Hero Section */}
      <div className="relative overflow-hidden responsive-container">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 responsive-container"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 responsive-container">
          <div className="text-center responsive-container">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-8 responsive-container">
              <Brain className="w-10 h-10 text-white responsive-container" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 responsive-container">
              Predictive Analytics
            </h1>
            <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto responsive-container">
              Forecast and optimize your logistics operations with AI-powered predictive analytics that anticipate trends and opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 responsive-container" aria-label="Button">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white/5 backdrop-blur-lg responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center mb-16 responsive-container">
            <h2 className="text-4xl font-bold text-white mb-4 responsive-container">Advanced Analytics Features</h2>
            <p className="text-xl text-purple-200 responsive-container">Harness the power of AI to predict and optimize</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 responsive-container">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 responsive-container">
                  <feature.icon className="w-6 h-6 text-white responsive-container" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 responsive-container">{feature.title}</h3>
                <p className="text-purple-200 responsive-container">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="py-24 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center responsive-container">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6 responsive-container">Predictive Capabilities</h2>
              <p className="text-xl text-purple-200 mb-8 responsive-container">
                Our AI-powered analytics platform provides comprehensive insights and predictions 
                to help you make data-driven decisions and stay ahead of the competition.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 responsive-container">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center space-x-3 responsive-container">
                    <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 responsive-container" />
                    <span className="text-white responsive-container">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
              <div className="text-center responsive-container">
                <TrendingUp className="w-16 h-16 text-purple-500 mx-auto mb-4 responsive-container" />
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container">Analytics Dashboard</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-purple-200 responsive-container">Forecast Accuracy</span>
                    <span className="text-white font-semibold responsive-container">95.2%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-purple-200 responsive-container">Data Points Analyzed</span>
                    <span className="text-white font-semibold responsive-container">2.3M+</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-purple-200 responsive-container">Cost Savings</span>
                    <span className="text-white font-semibold responsive-container">30%</span>
                  </div>
                  <div className="flex justify-between items-center responsive-container">
                    <span className="text-purple-200 responsive-container">Efficiency Gain</span>
                    <span className="text-white font-semibold responsive-container">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-600 to-indigo-700 responsive-container">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 responsive-container">
          <h2 className="text-4xl font-bold text-white mb-6 responsive-container">Start Predicting the Future</h2>
          <p className="text-xl text-purple-100 mb-8 responsive-container">
            Transform your logistics operations with AI-powered predictive analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 responsive-container" aria-label="Button">
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

export default PredictiveAnalytics