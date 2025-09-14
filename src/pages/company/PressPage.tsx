import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const PressPage: React.FC = () => {
  const pressReleases = [
    {
      date: '2024-01-15',
      title: 'Trans Bot AI Raises $50M Series B to Accelerate AI-Powered Logistics Innovation',
      summary: 'Funding will be used to expand our AI agent ecosystem and scale operations globally.',
      category: 'Funding'
    },
    {
      date: '2024-01-10',
      title: 'Trans Bot AI Partners with Major Shipping Companies for Autonomous Fleet Management',
      summary: 'Strategic partnerships to deploy AI agents across 10,000+ vehicles worldwide.',
      category: 'Partnership'
    },
    {
      date: '2024-01-05',
      title: 'New AI Agent Reduces Logistics Costs by 30% for Enterprise Customers',
      summary: 'Breakthrough in predictive analytics and route optimization technology.',
      category: 'Product'
    }
  ]

  const mediaCoverage = [
    {
      outlet: 'TechCrunch',
      title: 'How AI is Revolutionizing the Logistics Industry',
      date: '2024-01-12',
      link: '#'
    },
    {
      outlet: 'Forbes',
      title: 'The Future of Supply Chain: AI-Powered Automation',
      date: '2024-01-08',
      link: '#'
    },
    {
      outlet: 'Logistics Today',
      title: 'Trans Bot AI: Leading the Charge in Smart Logistics',
      date: '2024-01-03',
      link: '#'
    }
  ]

  const awards = [
    {
      year: '2024',
      award: 'Best AI Innovation in Logistics',
      organization: 'Supply Chain Excellence Awards',
      description: 'Recognized for breakthrough AI agent technology'
    },
    {
      year: '2023',
      award: 'Top 10 Logistics Tech Companies',
      organization: 'Logistics Technology Review',
      description: 'Leading innovation in AI-powered supply chain solutions'
    },
    {
      year: '2023',
      award: 'Startup of the Year',
      organization: 'Tech Innovation Awards',
      description: 'Outstanding contribution to logistics technology'
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Press & News
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, press releases, and media coverage about Trans Bot AI
            </p>
          </div>

          {/* Press Releases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Press Releases</h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {release.category}
                      </span>
                      <span className="text-gray-500 text-sm">{release.date}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{release.title}</h3>
                  <p className="text-gray-600 mb-6">{release.summary}</p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Media Coverage */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Media Coverage</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mediaCoverage.map((article, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-sm text-gray-500 mb-2">{article.outlet}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{article.title}</h3>
                  <div className="text-sm text-gray-500 mb-4">{article.date}</div>
                  <a 
                    href={article.link}
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                  >
                    Read Article →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Awards & Recognition</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">🏆</div>
                  <div className="text-sm text-gray-500 mb-2">{award.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{award.award}</h3>
                  <div className="text-blue-600 font-semibold mb-3">{award.organization}</div>
                  <p className="text-gray-600 text-sm">{award.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Media Kit */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
            <p className="text-xl mb-8 text-blue-100">
              Download our media kit for logos, images, and company information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Download Media Kit
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                Contact Media Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default PressPage
