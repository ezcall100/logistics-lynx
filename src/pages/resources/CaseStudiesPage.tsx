import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      title: 'E-commerce Giant Reduces Delivery Times by 40%',
      company: 'Global Retail Chain',
      industry: 'E-commerce',
      challenge: 'High delivery costs and long delivery times affecting customer satisfaction',
      solution: 'Implemented AI-powered route optimization and last-mile delivery automation',
      results: [
        '40% reduction in average delivery time',
        '25% decrease in delivery costs',
        '95% customer satisfaction rate',
        '30% increase in repeat orders'
      ],
      image: '🛒'
    },
    {
      title: 'Manufacturing Company Streamlines Supply Chain',
      company: 'Automotive Manufacturer',
      industry: 'Manufacturing',
      challenge: 'Complex supply chain with multiple suppliers and tight production schedules',
      solution: 'Deployed AI agents for supplier coordination and production planning',
      results: [
        '30% reduction in production delays',
        '20% improvement in supplier performance',
        '15% cost savings in logistics',
        '99.5% on-time delivery rate'
      ],
      image: '🏭'
    },
    {
      title: 'Healthcare Provider Ensures Compliance',
      company: 'Regional Hospital Network',
      industry: 'Healthcare',
      challenge: 'Critical need for temperature-controlled transport and regulatory compliance',
      solution: 'Implemented specialized AI agents for cold chain management and compliance tracking',
      results: [
        '100% compliance with regulatory requirements',
        'Zero temperature excursions',
        '50% reduction in manual monitoring',
        '24/7 automated compliance reporting'
      ],
      image: '🏥'
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Case Studies
            </h1>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Real-world success stories from companies that have transformed their logistics operations with our AI platform
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{study.image}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{study.title}</h2>
                        <p className="text-emerald-300 font-semibold">{study.company}</p>
                        <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm mt-2">
                          {study.industry}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Challenge</h3>
                        <p className="text-emerald-200">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Solution</h3>
                        <p className="text-emerald-200">{study.solution}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Results</h3>
                    <div className="space-y-3">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center">
                          <svg className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-emerald-200">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Logistics?</h2>
              <p className="text-emerald-200 mb-6">
                Join hundreds of companies that have already revolutionized their supply chain operations
              </p>
              <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                Start Your Success Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default CaseStudiesPage
