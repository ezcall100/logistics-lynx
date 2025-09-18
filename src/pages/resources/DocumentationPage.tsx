import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const DocumentationPage: React.FC = () => {
  const docs = [
    {
      title: 'Getting Started Guide',
      description: 'Complete setup and configuration guide for new users',
      category: 'Setup',
      difficulty: 'Beginner',
      time: '15 min'
    },
    {
      title: 'API Documentation',
      description: 'Comprehensive API reference with examples and code samples',
      category: 'Development',
      difficulty: 'Advanced',
      time: '45 min'
    },
    {
      title: 'Integration Guide',
      description: 'Step-by-step integration instructions for popular platforms',
      category: 'Integration',
      difficulty: 'Intermediate',
      time: '30 min'
    },
    {
      title: 'Best Practices',
      description: 'Industry best practices and recommendations for optimal performance',
      category: 'Guidelines',
      difficulty: 'Intermediate',
      time: '20 min'
    },
    {
      title: 'Troubleshooting Guide',
      description: 'Common issues and their solutions',
      category: 'Support',
      difficulty: 'Beginner',
      time: '10 min'
    },
    {
      title: 'Security Guidelines',
      description: 'Security best practices and compliance requirements',
      category: 'Security',
      difficulty: 'Advanced',
      time: '25 min'
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 responsive-container">
        <div className="container mx-auto px-4 py-16 responsive-container">
          <div className="text-center mb-16 responsive-container">
            <h1 className="text-5xl font-bold text-white mb-6 responsive-container">
              Documentation
            </h1>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto responsive-container">
              Comprehensive guides and references to help you get the most out of our AI-powered logistics platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 responsive-container">
            {docs.map((doc, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group responsive-container">
                <div className="flex items-center justify-between mb-4 responsive-container">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.category === 'Setup' ? 'bg-green-500/20 text-green-300' :
                    doc.category === 'Development' ? 'bg-blue-500/20 text-blue-300' :
                    doc.category === 'Integration' ? 'bg-purple-500/20 text-purple-300' :
                    doc.category === 'Guidelines' ? 'bg-orange-500/20 text-orange-300' :
                    doc.category === 'Support' ? 'bg-red-500/20 text-red-300' :
                    'bg-cyan-500/20 text-cyan-300'
                  }`}>
                    {doc.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    doc.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                    doc.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {doc.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors responsive-container">
                  {doc.title}
                </h3>
                <p className="text-cyan-200 mb-4 responsive-container">{doc.description}</p>
                
                <div className="flex items-center justify-between responsive-container">
                  <span className="text-cyan-300 text-sm responsive-container">⏱️ {doc.time}</span>
                  <button className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm responsive-container" aria-label="Button">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container">
            <div className="text-center responsive-container">
              <h2 className="text-3xl font-bold text-white mb-4 responsive-container">Need Help?</h2>
              <p className="text-cyan-200 mb-6 responsive-container">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
                <button className="bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-all duration-300 responsive-container" aria-label="Button">
                  Contact Support
                </button>
                <button className="bg-white/10 text-cyan-300 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-cyan-500/30 responsive-container" aria-label="Button">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default DocumentationPage