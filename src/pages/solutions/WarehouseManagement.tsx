import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const WarehouseManagement: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Warehouse Management
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Streamline warehouse operations with intelligent inventory management, automated picking, and space optimization
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Inventory Optimization</h2>
                <p className="text-green-200 mb-6">
                  AI-powered inventory management ensures optimal stock levels, reduces waste, and prevents stockouts.
                </p>
                <ul className="space-y-2 text-green-100">
                  <li>• Demand forecasting</li>
                  <li>• Safety stock optimization</li>
                  <li>• ABC analysis</li>
                  <li>• Expiry date tracking</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Automated Picking</h2>
                <p className="text-green-200 mb-6">
                  Optimize picking routes and sequences to minimize travel time and maximize efficiency.
                </p>
                <ul className="space-y-2 text-green-100">
                  <li>• Wave planning</li>
                  <li>• Pick path optimization</li>
                  <li>• Batch picking</li>
                  <li>• Zone picking</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Space Utilization</h2>
                <p className="text-green-200 mb-6">
                  Maximize warehouse space efficiency with intelligent slotting and layout optimization.
                </p>
                <ul className="space-y-2 text-green-100">
                  <li>• Dynamic slotting</li>
                  <li>• Capacity planning</li>
                  <li>• Layout optimization</li>
                  <li>• Storage density analysis</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Quality Control</h2>
                <p className="text-green-200 mb-6">
                  Ensure product quality with automated inspection and quality assurance processes.
                </p>
                <ul className="space-y-2 text-green-100">
                  <li>• Automated inspection</li>
                  <li>• Quality metrics tracking</li>
                  <li>• Defect analysis</li>
                  <li>• Compliance reporting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
export default WarehouseManagement

