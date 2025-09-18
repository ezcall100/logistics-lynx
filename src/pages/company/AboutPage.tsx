import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const AboutPage: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 responsive-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          {/* Header */}
          <div className="text-center mb-16 responsive-container">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 responsive-container">
              About Trans Bot AI
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Revolutionizing logistics through artificial intelligence and cutting-edge technology
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 responsive-container">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed responsive-container">
              To transform the logistics industry by providing intelligent, automated solutions that optimize 
              supply chains, reduce costs, and improve efficiency for businesses worldwide. We believe in 
              making logistics smarter, faster, and more sustainable through the power of AI.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-12 responsive-container">
            <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 responsive-container">Our Story</h3>
              <p className="text-gray-600 leading-relaxed responsive-container">
                Founded in 2023 by a team of logistics experts and AI researchers, Trans Bot AI emerged 
                from a simple observation: the logistics industry was ripe for disruption. With decades 
                of combined experience in supply chain management, we set out to create solutions that 
                would revolutionize how goods move around the world.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 responsive-container">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed responsive-container">
                We envision a future where logistics operations are fully autonomous, predictive, and 
                optimized. A world where supply chains are resilient, sustainable, and efficient, 
                powered by artificial intelligence that anticipates needs and solves problems before 
                they occur.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 responsive-container">
              <div className="text-center responsive-container">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 responsive-container">
                  <span className="text-2xl responsive-container">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 responsive-container">Innovation</h3>
                <p className="text-gray-600 responsive-container">
                  We constantly push the boundaries of what's possible in logistics technology
                </p>
              </div>
              <div className="text-center responsive-container">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 responsive-container">
                  <span className="text-2xl responsive-container">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 responsive-container">Partnership</h3>
                <p className="text-gray-600 responsive-container">
                  We work closely with our clients to understand their unique challenges
                </p>
              </div>
              <div className="text-center responsive-container">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 responsive-container">
                  <span className="text-2xl responsive-container">🌱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 responsive-container">Sustainability</h3>
                <p className="text-gray-600 responsive-container">
                  We're committed to creating solutions that benefit both business and environment
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white responsive-container">
            <h2 className="text-3xl font-bold mb-8 text-center responsive-container">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center responsive-container">
              <div>
                <div className="text-4xl font-bold mb-2 responsive-container">500+</div>
                <div className="text-blue-100 responsive-container">Companies Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 responsive-container">$2.5B+</div>
                <div className="text-blue-100 responsive-container">Cost Savings Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 responsive-container">99.9%</div>
                <div className="text-blue-100 responsive-container">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2 responsive-container">24/7</div>
                <div className="text-blue-100 responsive-container">AI Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default AboutPage