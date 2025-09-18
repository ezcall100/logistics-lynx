import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const InvestorsPage: React.FC = () => {
  const investors = [
    {
      name: 'Sequoia Capital',
      type: 'Series B Lead',
      logo: '🌲',
      description: 'Leading venture capital firm with investments in Apple, Google, and WhatsApp'
    },
    {
      name: 'Andreessen Horowitz',
      type: 'Series A Lead',
      logo: '🚀',
      description: 'Premier venture capital firm focused on technology companies'
    },
    {
      name: 'Kleiner Perkins',
      type: 'Seed Investor',
      logo: '💡',
      description: 'Early-stage venture capital firm with a history of backing breakthrough companies'
    },
    {
      name: 'General Catalyst',
      type: 'Strategic Investor',
      logo: '⚡',
      description: 'Venture capital firm investing in transformative technology companies'
    }
  ]

  const financialHighlights = [
    {
      metric: 'Total Funding Raised',
      value: '$75M',
      description: 'Across seed, Series A, and Series B rounds'
    },
    {
      metric: 'Latest Valuation',
      value: '$500M',
      description: 'Post-Series B valuation'
    },
    {
      metric: 'Revenue Growth',
      value: '300%',
      description: 'Year-over-year growth in 2023'
    },
    {
      metric: 'Customer Growth',
      value: '250%',
      description: 'Increase in enterprise customers'
    }
  ]

  const milestones = [
    {
      date: '2024',
      title: 'Series B Funding',
      description: 'Raised $50M to accelerate AI agent development and global expansion'
    },
    {
      date: '2023',
      title: 'Series A Funding',
      description: 'Secured $20M to scale operations and expand the AI agent ecosystem'
    },
    {
      date: '2022',
      title: 'Seed Funding',
      description: 'Raised $5M to develop core AI technology and initial product launch'
    },
    {
      date: '2021',
      title: 'Company Founded',
      description: 'Trans Bot AI founded by AI researchers and logistics experts'
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 py-16 responsive-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          {/* Header */}
          <div className="text-center mb-16 responsive-container">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 responsive-container">
              Investor Information
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Learn about our funding, growth metrics, and investment opportunities at Trans Bot AI
            </p>
          </div>

          {/* Financial Highlights */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Financial Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
              {financialHighlights.map((highlight, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <div className="text-4xl font-bold text-green-600 mb-2 responsive-container">{highlight.value}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 responsive-container">{highlight.metric}</h3>
                  <p className="text-gray-600 text-sm responsive-container">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Our Investors</h2>
            <div className="grid md:grid-cols-2 gap-8 responsive-container">
              {investors.map((investor, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <div className="flex items-center mb-4 responsive-container">
                    <div className="text-4xl mr-4 responsive-container">{investor.logo}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 responsive-container">{investor.name}</h3>
                      <p className="text-green-600 font-semibold responsive-container">{investor.type}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 responsive-container">{investor.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Milestones */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Company Milestones</h2>
            <div className="space-y-6 responsive-container">
              {milestones.map((milestone, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between responsive-container">
                    <div className="flex items-center mb-4 md:mb-0 responsive-container">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 responsive-container">
                        <span className="text-green-600 font-bold responsive-container">{milestone.date}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 responsive-container">{milestone.title}</h3>
                        <p className="text-gray-600 responsive-container">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Opportunities */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center responsive-container">
            <h2 className="text-3xl font-bold mb-4 responsive-container">Investment Opportunities</h2>
            <p className="text-xl mb-8 text-green-100 responsive-container">
              We're always looking for strategic partners and investors who share our vision
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors responsive-container" aria-label="Button">
                Download Investor Deck
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors responsive-container" aria-label="Button">
                Contact Investor Relations
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 responsive-container">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center responsive-container">Investor Relations Contact</h2>
            <div className="grid md:grid-cols-2 gap-8 responsive-container">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container">General Inquiries</h3>
                <div className="space-y-2 responsive-container">
                  <p className="text-gray-600 responsive-container">Email: investors@transbotai.com</p>
                  <p className="text-gray-600 responsive-container">Phone: +1 (555) 123-4567</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container">Media Inquiries</h3>
                <div className="space-y-2 responsive-container">
                  <p className="text-gray-600 responsive-container">Email: press@transbotai.com</p>
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

export default InvestorsPage
}