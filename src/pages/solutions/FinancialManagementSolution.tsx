import React from 'react'
import { DollarSign, TrendingUp, CreditCard, Calculator, Shield, BarChart3, CheckCircle } from 'lucide-react'

const FinancialManagementSolution: React.FC = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Automated Invoicing",
      description: "Generate and send invoices automatically based on completed shipments and deliveries."
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Accept payments from multiple channels with integrated payment gateways and fraud protection."
    },
    {
      icon: Calculator,
      title: "Cost Management",
      description: "Track and analyze all operational costs with real-time visibility and automated reporting."
    },
    {
      icon: TrendingUp,
      title: "Revenue Optimization",
      description: "Maximize revenue with dynamic pricing, rate optimization, and demand forecasting."
    },
    {
      icon: BarChart3,
      title: "Financial Analytics",
      description: "Comprehensive financial reporting and analytics with customizable dashboards and KPIs."
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description: "Ensure financial compliance with automated tax calculations and secure data handling."
    }
  ]

  const benefits = [
    "Reduce invoice processing time by 70%",
    "Improve cash flow by 45%",
    "Lower payment processing costs by 25%",
    "Increase revenue by 20%",
    "Eliminate manual financial errors",
    "Ensure 100% compliance"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl mb-8">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Financial Management Solution
            </h1>
            
            <p className="text-xl md:text-2xl text-emerald-200 mb-8 max-w-4xl mx-auto">
              Streamline your financial operations with AI-powered invoicing, payments, and analytics
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Financial Management Features
            </h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Everything you need to manage your logistics finances efficiently and profitably
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-emerald-200 leading-relaxed">{feature.description}</p>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Optimize Your Financial Operations
              </h2>
              <p className="text-xl text-emerald-200 mb-8 leading-relaxed">
                Our AI-powered financial management solution delivers measurable results that directly impact your bottom line. 
                Join hundreds of companies already streamlining their financial operations with our platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Financial Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Invoice Processing</span>
                    <span className="text-emerald-400 font-bold text-xl">70% Faster</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Cash Flow</span>
                    <span className="text-emerald-400 font-bold text-xl">45% Improvement</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Processing Costs</span>
                    <span className="text-emerald-400 font-bold text-xl">25% Reduction</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-200">Revenue Growth</span>
                    <span className="text-emerald-400 font-bold text-xl">20% Increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-emerald-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your Finances?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join hundreds of companies already streamlining their financial operations with our AI-powered solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
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

export default FinancialManagementSolution
