import React from 'react'
import { ResponsiveContainer } from '../components/ResponsiveContainer'

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      category: 'Documentation',
      items: [
        { title: 'Getting Started Guide', description: 'Complete setup and configuration guide', type: 'PDF' },
        { title: 'API Documentation', description: 'Comprehensive API reference and examples', type: 'Web' },
        { title: 'Integration Guide', description: 'Step-by-step integration instructions', type: 'PDF' },
        { title: 'Best Practices', description: 'Industry best practices and recommendations', type: 'Web' }
      ]
    },
    {
      category: 'Case Studies',
      items: [
        { title: 'E-commerce Success Story', description: 'How we reduced delivery times by 40%', type: 'PDF' },
        { title: 'Manufacturing Optimization', description: 'Streamlined supply chain operations', type: 'Video' },
        { title: 'Healthcare Compliance', description: 'Ensured regulatory compliance and safety', type: 'PDF' },
        { title: 'Global Expansion', description: 'Scaled operations across 50+ countries', type: 'Web' }
      ]
    },
    {
      category: 'Webinars & Training',
      items: [
        { title: 'AI in Logistics Webinar', description: 'Understanding AI applications in logistics', type: 'Video' },
        { title: 'Platform Training', description: 'Comprehensive platform training course', type: 'Video' },
        { title: 'Advanced Analytics', description: 'Mastering analytics and reporting features', type: 'Web' },
        { title: 'Integration Workshop', description: 'Hands-on integration workshop', type: 'Video' }
      ]
    },
    {
      category: 'Support',
      items: [
        { title: 'Knowledge Base', description: 'Searchable database of articles and FAQs', type: 'Web' },
        { title: 'Community Forum', description: 'Connect with other users and experts', type: 'Web' },
        { title: 'Technical Support', description: '24/7 technical support and assistance', type: 'Web' },
        { title: 'Feature Requests', description: 'Submit and vote on feature requests', type: 'Web' }
      ]
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Resources & Support
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Everything you need to succeed with our AI-powered logistics platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {resources.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-green-200 text-sm">{item.description}</p>
                        </div>
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.type === 'PDF' ? 'bg-red-500/20 text-red-300' :
                            item.type === 'Video' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Documentation</h3>
              <p className="text-green-200 mb-6">Comprehensive guides and references to help you get the most out of our platform.</p>
              <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300">
                Browse Docs
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Video Tutorials</h3>
              <p className="text-green-200 mb-6">Step-by-step video tutorials covering all aspects of the platform.</p>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all duration-300">
                Watch Videos
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <p className="text-green-200 mb-6">Connect with other users, share experiences, and get help from the community.</p>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default ResourcesPage