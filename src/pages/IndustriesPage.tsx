import React from 'react'
import { ResponsiveContainer } from '../components/ResponsiveContainer'

const IndustriesPage: React.FC = () => {
  const industries = [
    {
      name: 'E-commerce & Retail',
      description: 'Optimize fulfillment, reduce delivery times, and enhance customer experience',
      icon: '🛒',
      features: ['Last-mile delivery', 'Inventory management', 'Returns processing', 'Customer notifications']
    },
    {
      name: 'Manufacturing',
      description: 'Streamline production logistics, supplier management, and quality control',
      icon: '🏭',
      features: ['Raw material tracking', 'Production scheduling', 'Quality assurance', 'Supplier collaboration']
    },
    {
      name: 'Healthcare & Pharmaceuticals',
      description: 'Ensure compliance, temperature control, and secure delivery of medical supplies',
      icon: '🏥',
      features: ['Cold chain management', 'Regulatory compliance', 'Secure transport', 'Emergency logistics']
    },
    {
      name: 'Automotive',
      description: 'Manage complex supply chains, just-in-time delivery, and aftermarket services',
      icon: '🚗',
      features: ['Parts management', 'JIT delivery', 'Aftermarket logistics', 'Quality tracking']
    },
    {
      name: 'Food & Beverage',
      description: 'Maintain freshness, ensure safety, and optimize distribution networks',
      icon: '🍽️',
      features: ['Cold storage', 'Expiry management', 'Food safety', 'Distribution optimization']
    },
    {
      name: 'Technology & Electronics',
      description: 'Handle high-value shipments, manage returns, and ensure secure delivery',
      icon: '💻',
      features: ['High-value transport', 'Return management', 'Secure handling', 'Global distribution']
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="container mx-auto px-4 py-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h1 className="text-5xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              Industry Solutions
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
              Tailored logistics solutions for every industry, powered by AI and designed for your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  {industry.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{industry.name}</h3>
                <p className="text-purple-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">{industry.description}</p>
                <ul className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {industry.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-purple-100 flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <svg className="w-4 h-4 text-green-400 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-3xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Don't See Your Industry?</h2>
              <p className="text-purple-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                Our AI-powered platform adapts to any industry. Contact us to discuss your specific requirements.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default IndustriesPage