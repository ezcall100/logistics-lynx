import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const ManufacturingPage: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Manufacturing Solutions
            </h1>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto">
              Streamline production logistics, supplier management, and quality control with AI-powered automation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Raw Material Tracking</h2>
                <p className="text-orange-200 mb-6">
                  Monitor raw materials from supplier to production line with real-time visibility and quality tracking.
                </p>
                <ul className="space-y-2 text-orange-100">
                  <li>• Supplier quality monitoring</li>
                  <li>• Batch traceability</li>
                  <li>• Quality certification tracking</li>
                  <li>• Compliance documentation</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Production Scheduling</h2>
                <p className="text-orange-200 mb-6">
                  Optimize production schedules with AI-driven planning that considers capacity, materials, and demand.
                </p>
                <ul className="space-y-2 text-orange-100">
                  <li>• Capacity optimization</li>
                  <li>• Material availability planning</li>
                  <li>• Changeover minimization</li>
                  <li>• Demand-driven scheduling</li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Quality Assurance</h2>
                <p className="text-orange-200 mb-6">
                  Ensure consistent quality with automated inspection, testing, and compliance monitoring.
                </p>
                <ul className="space-y-2 text-orange-100">
                  <li>• Automated quality checks</li>
                  <li>• Statistical process control</li>
                  <li>• Defect prediction</li>
                  <li>• Quality metrics dashboard</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-4">Supplier Collaboration</h2>
                <p className="text-orange-200 mb-6">
                  Streamline supplier relationships with integrated communication, performance tracking, and collaboration tools.
                </p>
                <ul className="space-y-2 text-orange-100">
                  <li>• Supplier performance metrics</li>
                  <li>• Collaborative planning</li>
                  <li>• Risk assessment</li>
                  <li>• Contract management</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Manufacturing Benefits</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">30%</div>
                <p className="text-orange-200">Reduction in production delays</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">20%</div>
                <p className="text-orange-200">Improvement in quality scores</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">15%</div>
                <p className="text-orange-200">Cost reduction in logistics</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">99.5%</div>
                <p className="text-orange-200">On-time delivery rate</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default ManufacturingPage
