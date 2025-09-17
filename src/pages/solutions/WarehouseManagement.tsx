import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const WarehouseManagement: React.FC = () => {
  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="container mx-auto px-4 py-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h1 className="text-5xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              Warehouse Management
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
              Streamline warehouse operations with intelligent inventory management, automated picking, and space optimization
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Inventory Optimization</h2>
                <p className="text-green-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  AI-powered inventory management ensures optimal stock levels, reduces waste, and prevents stockouts.
                </p>
                <ul className="space-y-2 text-green-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Demand forecasting</li>
                  <li>• Safety stock optimization</li>
                  <li>• ABC analysis</li>
                  <li>• Expiry date tracking</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Automated Picking</h2>
                <p className="text-green-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Optimize picking routes and sequences to minimize travel time and maximize efficiency.
                </p>
                <ul className="space-y-2 text-green-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Wave planning</li>
                  <li>• Pick path optimization</li>
                  <li>• Batch picking</li>
                  <li>• Zone picking</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Space Utilization</h2>
                <p className="text-green-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Maximize warehouse space efficiency with intelligent slotting and layout optimization.
                </p>
                <ul className="space-y-2 text-green-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Dynamic slotting</li>
                  <li>• Capacity planning</li>
                  <li>• Layout optimization</li>
                  <li>• Storage density analysis</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Quality Control</h2>
                <p className="text-green-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  Ensure product quality with automated inspection and quality assurance processes.
                </p>
                <ul className="space-y-2 text-green-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  <li>• Automated inspection</li>
                  <li>• Quality metrics tracking</li>
                  <li>• Defect analysis</li>
                  <li>• Compliance reporting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
export default WarehouseManagement

