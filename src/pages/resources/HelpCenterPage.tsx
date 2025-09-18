import React, { useState } from 'react'
import { Search, HelpCircle, MessageCircle, Book, Video, FileText, ChevronRight } from 'lucide-react'

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      title: "Getting Started",
      icon: Book,
      articles: [
        "How to set up your first route",
        "Understanding the dashboard",
        "Connecting your fleet",
        "Basic navigation guide"
      ]
    },
    {
      title: "AI Agents",
      icon: HelpCircle,
      articles: [
        "Route Optimizer configuration",
        "Load Matching best practices",
        "Predictive Analytics setup",
        "Fleet Manager features"
      ]
    },
    {
      title: "Portals",
      icon: MessageCircle,
      articles: [
        "Broker Portal setup",
        "Carrier Portal features",
        "Driver Portal mobile app",
        "Admin Portal management"
      ]
    },
    {
      title: "API & Integration",
      icon: FileText,
      articles: [
        "API authentication",
        "Webhook configuration",
        "Third-party integrations",
        "Custom development"
      ]
    }
  ]

  const faqs = [
    {
      question: "How do I get started with Trans Bot AI?",
      answer: "Getting started is easy! Simply sign up for an account, complete the onboarding process, and connect your first fleet. Our AI agents will begin optimizing your operations immediately."
    },
    {
      question: "What makes Trans Bot AI different from other TMS platforms?",
      answer: "Trans Bot AI uses 250 specialized AI agents working together to provide unprecedented optimization. Our multi-agent system can handle complex logistics scenarios that traditional systems cannot."
    },
    {
      question: "How quickly can I see results?",
      answer: "Most customers see immediate improvements in route efficiency and cost savings within the first week. Full optimization typically takes 2-4 weeks as our AI learns your specific patterns."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is never shared with third parties."
    },
    {
      question: "Can I integrate with my existing systems?",
      answer: "Yes! Trans Bot AI offers comprehensive APIs and pre-built integrations with major ERP, WMS, and accounting systems. Our team can help with custom integrations."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 responsive-container">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center responsive-container">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 responsive-container">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 responsive-container">
              Find answers, get support, and learn how to maximize your Trans Bot AI experience
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto responsive-container">
              <div className="relative responsive-container">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 responsive-container">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow responsive-container">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 responsive-container">
              <MessageCircle className="w-8 h-8 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 responsive-container">Live Chat Support</h3>
            <p className="text-gray-600 mb-6 responsive-container">Get instant help from our support team</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all responsive-container" aria-label="Button">
              Start Chat
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow responsive-container">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 responsive-container">
              <Video className="w-8 h-8 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 responsive-container">Video Tutorials</h3>
            <p className="text-gray-600 mb-6 responsive-container">Watch step-by-step video guides</p>
            <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all responsive-container" aria-label="Button">
              Watch Videos
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow responsive-container">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6 responsive-container">
              <FileText className="w-8 h-8 text-white responsive-container" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 responsive-container">Documentation</h3>
            <p className="text-gray-600 mb-6 responsive-container">Comprehensive guides and references</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all responsive-container" aria-label="Button">
              Read Docs
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16 responsive-container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 responsive-container">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow responsive-container">
                <div className="flex items-center space-x-4 mb-6 responsive-container">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center responsive-container">
                    <category.icon className="w-6 h-6 text-white responsive-container" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 responsive-container">{category.title}</h3>
                </div>
                <div className="space-y-3 responsive-container">
                  {category.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer responsive-container">
                      <span className="text-gray-700 responsive-container">{article}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 responsive-container" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 responsive-container">Frequently Asked Questions</h2>
          <div className="space-y-4 responsive-container">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 responsive-container">
                <h3 className="text-lg font-bold text-gray-900 mb-4 responsive-container">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed responsive-container">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterPage
}