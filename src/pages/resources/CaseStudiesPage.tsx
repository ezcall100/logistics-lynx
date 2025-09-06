import React from 'react'
import { TrendingUp, Users, DollarSign, Clock, ArrowRight, Star } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Real results from companies using Trans Bot AI
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div key={study.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{study.company}</h3>
                      <p className="text-gray-600">{study.industry}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-600">{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-600">{study.solution}</p>
                    </div>
                  </div>
                  
                  <blockquote className="bg-gray-50 rounded-xl p-6 mb-6">
                    <p className="text-gray-700 italic mb-4">"{study.testimonial}"</p>
                    <cite className="text-gray-600 font-medium">— {study.author}</cite>
                  </blockquote>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-8 text-white">
                  <h4 className="text-2xl font-bold mb-8">Results</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <DollarSign className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{study.results.fuelSavings}</div>
                      <div className="text-green-100">Fuel Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{study.results.timeReduction}</div>
                      <div className="text-green-100">Time Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{study.results.costReduction}</div>
                      <div className="text-green-100">Cost Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Star className="w-8 h-8" />
                      </div>
                      <div className="text-3xl font-bold mb-1">{study.results.satisfaction}</div>
                      <div className="text-green-100">Satisfaction</div>
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