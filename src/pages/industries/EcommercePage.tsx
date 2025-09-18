import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const EcommercePage: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="container mx-auto px-4 py-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h1 className="text-5xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              E-commerce & Retail Solutions
            </h1>
            <p className="text-xl text-pink-200 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
              Optimize fulfillment, reduce delivery times, and enhance customer experience with AI-powered logistics
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Last-Mile Delivery</h2>
                <p className="text-pink-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Optimize the final leg of delivery with intelligent routing, real-time tracking, and customer communication.
                </p>
                <ul className="space-y-2 text-pink-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Dynamic delivery windows</li>
                  <li>• Customer preference learning</li>
                  <li>• Failed delivery prevention</li>
                  <li>• Alternative delivery options</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Inventory Management</h2>
                <p className="text-pink-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Maintain optimal stock levels across multiple channels with predictive analytics and automated replenishment.
                </p>
                <ul className="space-y-2 text-pink-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Multi-channel inventory sync</li>
                  <li>• Seasonal demand forecasting</li>
                  <li>• Automated reordering</li>
                  <li>• Stock allocation optimization</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Returns Processing</h2>
                <p className="text-pink-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Streamline returns with automated processing, quality assessment, and restocking workflows.
                </p>
                <ul className="space-y-2 text-pink-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Automated return authorization</li>
                  <li>• Quality assessment AI</li>
                  <li>• Restocking optimization</li>
                  <li>• Refund processing</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Customer Notifications</h2>
                <p className="text-pink-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Keep customers informed with proactive updates and personalized communication throughout the delivery process.
                </p>
                <ul className="space-y-2 text-pink-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Proactive status updates</li>
                  <li>• Delivery time predictions</li>
                  <li>• Personalized messaging</li>
                  <li>• Multi-channel notifications</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-3xl font-bold text-white text-center mb-8 responsive-container sm:flex-col md:flex-row lg:grid">Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-4xl font-bold text-pink-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">40%</div>
                <p className="text-pink-200 responsive-container sm:flex-col md:flex-row lg:grid">Reduction in delivery times</p>
              </div>
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-4xl font-bold text-pink-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">95%</div>
                <p className="text-pink-200 responsive-container sm:flex-col md:flex-row lg:grid">Customer satisfaction rate</p>
              </div>
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-4xl font-bold text-pink-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">25%</div>
                <p className="text-pink-200 responsive-container sm:flex-col md:flex-row lg:grid">Cost savings on logistics</p>
              </div>
            </div>
          </div>

          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default EcommercePage