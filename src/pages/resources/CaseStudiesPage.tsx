import React from 'react'
import { TrendingUp, DollarSign, Clock, Star } from 'lucide-react'

const CaseStudiesPage: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      company: "Global Freight Solutions",
      industry: "International Shipping",
      challenge: "High fuel costs and inefficient routing",
      solution: "AI-powered route optimization and fleet management",
      results: {
        fuelSavings: "35%",
        timeReduction: "40%",
        costReduction: "28%",
        satisfaction: "98%"
      },
      testimonial: "Trans Bot AI transformed our operations completely. The fuel savings alone paid for the system in 3 months.",
      author: "John Smith, CEO"
    },
    {
      id: 2,
      company: "Metro Logistics",
      industry: "Last Mile Delivery",
      challenge: "Delayed deliveries and customer complaints",
      solution: "Predictive analytics and real-time optimization",
      results: {
        fuelSavings: "25%",
        timeReduction: "45%",
        costReduction: "32%",
        satisfaction: "99%"
      },
      testimonial: "Our delivery times improved dramatically. Customers are happier than ever before.",
      author: "Sarah Johnson, Operations Director"
    },
    {
      id: 3,
      company: "Regional Transport Co.",
      industry: "Regional Trucking",
      challenge: "Driver shortage and maintenance costs",
      solution: "Fleet management and predictive maintenance",
      results: {
        fuelSavings: "30%",
        timeReduction: "35%",
        costReduction: "25%",
        satisfaction: "97%"
      },
      testimonial: "The predictive maintenance feature saved us thousands in unexpected repairs.",
      author: "Mike Chen, Fleet Manager"
    }
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 responsive-container">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center responsive-container">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 responsive-container">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto responsive-container">
              Real results from companies using Trans Bot AI
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
        <div className="space-y-16 responsive-container">
          {caseStudies.map((study, index) => (
            <div key={study.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
                  <div className="flex items-center space-x-3 mb-6 responsive-container">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center responsive-container">
                      <TrendingUp className="w-6 h-6 text-white responsive-container" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 responsive-container">{study.company}</h3>
                      <p className="text-gray-600 responsive-container">{study.industry}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8 responsive-container">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 responsive-container">Challenge:</h4>
                      <p className="text-gray-600 responsive-container">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 responsive-container">Solution:</h4>
                      <p className="text-gray-600 responsive-container">{study.solution}</p>
                    </div>
                  </div>
                  
                  <blockquote className="bg-gray-50 rounded-xl p-6 mb-6 responsive-container">
                    <p className="text-gray-700 italic mb-4 responsive-container">"{study.testimonial}"</p>
                    <cite className="text-gray-600 font-medium responsive-container">— {study.author}</cite>
                  </blockquote>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white responsive-container">
                  <h4 className="text-2xl font-bold mb-8 responsive-container">Results</h4>
                  <div className="grid grid-cols-2 gap-6 responsive-container">
                    <div className="text-center responsive-container">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 responsive-container">
                        <DollarSign className="w-8 h-8 responsive-container" />
                      </div>
                      <div className="text-3xl font-bold mb-1 responsive-container">{study.results.fuelSavings}</div>
                      <div className="text-green-100 responsive-container">Fuel Savings</div>
                    </div>
                    <div className="text-center responsive-container">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 responsive-container">
                        <Clock className="w-8 h-8 responsive-container" />
                      </div>
                      <div className="text-3xl font-bold mb-1 responsive-container">{study.results.timeReduction}</div>
                      <div className="text-green-100 responsive-container">Time Reduction</div>
                    </div>
                    <div className="text-center responsive-container">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 responsive-container">
                        <TrendingUp className="w-8 h-8 responsive-container" />
                      </div>
                      <div className="text-3xl font-bold mb-1 responsive-container">{study.results.costReduction}</div>
                      <div className="text-green-100 responsive-container">Cost Reduction</div>
                    </div>
                    <div className="text-center responsive-container">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 responsive-container">
                        <Star className="w-8 h-8 responsive-container" />
                      </div>
                      <div className="text-3xl font-bold mb-1 responsive-container">{study.results.satisfaction}</div>
                      <div className="text-green-100 responsive-container">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CaseStudiesPage