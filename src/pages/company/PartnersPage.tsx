import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const PartnersPage: React.FC = () => {
  const partners = [
    {
      name: 'Amazon Web Services',
      type: 'Cloud Infrastructure',
      logo: '☁️',
      description: 'Strategic cloud partnership for scalable AI infrastructure and global deployment',
      category: 'Technology'
    },
    {
      name: 'Microsoft Azure',
      type: 'AI Platform',
      logo: '🔵',
      description: 'Collaboration on AI services and enterprise integration solutions',
      category: 'Technology'
    },
    {
      name: 'FedEx',
      type: 'Logistics Partner',
      logo: '📦',
      description: 'Pilot program for AI-powered route optimization and fleet management',
      category: 'Logistics'
    },
    {
      name: 'UPS',
      type: 'Supply Chain',
      logo: '🚚',
      description: 'Integration of AI agents for predictive analytics and demand forecasting',
      category: 'Logistics'
    },
    {
      name: 'Oracle',
      type: 'Enterprise Software',
      logo: '🗄️',
      description: 'Database and enterprise application integration for seamless operations',
      category: 'Technology'
    },
    {
      name: 'SAP',
      type: 'ERP Integration',
      logo: '📊',
      description: 'Enterprise resource planning integration for comprehensive logistics management',
      category: 'Technology'
    }
  ]

  const partnershipTypes = [
    {
      title: 'Technology Partners',
      description: 'Leading technology companies that provide infrastructure and platform services',
      icon: '💻',
      benefits: ['Cloud Infrastructure', 'AI/ML Platforms', 'Enterprise Software', 'Security Solutions']
    },
    {
      title: 'Logistics Partners',
      description: 'Industry leaders in transportation, warehousing, and supply chain management',
      icon: '🚛',
      benefits: ['Fleet Management', 'Warehouse Operations', 'Last-Mile Delivery', 'Supply Chain Optimization']
    },
    {
      title: 'Integration Partners',
      description: 'Companies that help integrate our AI solutions with existing business systems',
      icon: '🔗',
      benefits: ['System Integration', 'Custom Development', 'API Development', 'Data Migration']
    },
    {
      title: 'Channel Partners',
      description: 'Resellers and consultants who help bring our solutions to market',
      icon: '🤝',
      benefits: ['Sales Channels', 'Implementation Services', 'Customer Support', 'Training Programs']
    }
  ]

  const benefits = [
    {
      title: 'For Technology Partners',
      description: 'Access to cutting-edge AI technology and logistics expertise',
      features: ['Co-development opportunities', 'Technical integration support', 'Joint go-to-market strategies']
    },
    {
      title: 'For Logistics Partners',
      description: 'AI-powered solutions to optimize operations and reduce costs',
      features: ['Pilot programs', 'Custom AI agent development', 'Performance analytics']
    },
    {
      title: 'For Integration Partners',
      description: 'Comprehensive support for seamless system integration',
      features: ['API documentation', 'Technical training', 'Certification programs']
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-16 responsive-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          {/* Header */}
          <div className="text-center mb-16 responsive-container">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 responsive-container">
              Strategic Partners
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Building the future of logistics through strategic partnerships with industry leaders
            </p>
          </div>

          {/* Partnership Types */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Partnership Types</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
              {partnershipTypes.map((type, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <div className="text-4xl mb-4 text-center responsive-container">{type.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center responsive-container">{type.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm responsive-container">{type.description}</p>
                  <ul className="space-y-2 responsive-container">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-sm text-gray-600 flex items-center responsive-container">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 responsive-container"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Current Partners */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Our Partners</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <div className="flex items-center mb-4 responsive-container">
                    <div className="text-4xl mr-4 responsive-container">{partner.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 responsive-container">{partner.name}</h3>
                      <p className="text-purple-600 font-semibold responsive-container">{partner.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 responsive-container">{partner.description}</p>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm responsive-container">
                    {partner.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Partnership Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8 responsive-container">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 responsive-container">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 responsive-container">{benefit.description}</p>
                  <ul className="space-y-3 responsive-container">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start responsive-container">
                        <svg className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0 responsive-container" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 responsive-container">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Become a Partner */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center responsive-container">
            <h2 className="text-3xl font-bold mb-4 responsive-container">Become a Partner</h2>
            <p className="text-xl mb-8 text-purple-100 responsive-container">
              Join our ecosystem of partners and help shape the future of AI-powered logistics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors responsive-container" aria-label="Button">
                Partnership Application
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors responsive-container" aria-label="Button">
                Contact Partnership Team
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 responsive-container">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center responsive-container">Partnership Contact</h2>
            <div className="grid md:grid-cols-2 gap-8 responsive-container">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container">General Partnerships</h3>
                <div className="space-y-2 responsive-container">
                  <p className="text-gray-600 responsive-container">Email: partners@transbotai.com</p>
                  <p className="text-gray-600 responsive-container">Phone: +1 (555) 123-4567</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container">Strategic Alliances</h3>
                <div className="space-y-2 responsive-container">
                  <p className="text-gray-600 responsive-container">Email: alliances@transbotai.com</p>
                  <p className="text-gray-600 responsive-container">Phone: +1 (555) 123-4568</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default PartnersPage