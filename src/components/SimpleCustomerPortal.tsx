import React from 'react';

const SimpleCustomerPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="container mx-auto px-4 py-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <div className="text-center mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <h1 className="text-4xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">🚛 Customer Portal</h1>
          <p className="text-xl text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Welcome to your TransBot AI Customer Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Total Shipments</p>
                <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">1,247</p>
              </div>
              <div className="text-blue-400 text-2xl responsive-container sm:flex-col md:flex-row lg:grid">📦</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Active Shipments</p>
                <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">8</p>
              </div>
              <div className="text-yellow-400 text-2xl responsive-container sm:flex-col md:flex-row lg:grid">⏰</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Total Spent</p>
                <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">$89,450</p>
              </div>
              <div className="text-green-400 text-2xl responsive-container sm:flex-col md:flex-row lg:grid">💰</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Account Rating</p>
                <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">4.8</p>
              </div>
              <div className="text-purple-400 text-2xl responsive-container sm:flex-col md:flex-row lg:grid">⭐</div>
            </div>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-2xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Active Shipments</h2>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="bg-white/5 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <h3 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">CS-001</h3>
                  <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Los Angeles, CA → New York, NY</p>
                  <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Swift Logistics</p>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-green-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">In Transit</p>
                  <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">ETA: 2 days</p>
                  <p className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">$1,450</p>
                </div>
              </div>
              <div className="mt-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-blue-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">75% Complete</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <h3 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">CS-002</h3>
                  <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Chicago, IL → Miami, FL</p>
                  <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Prime Transport</p>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-yellow-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">Loading</p>
                  <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">ETA: 3 days</p>
                  <p className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">$980</p>
                </div>
              </div>
              <div className="mt-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-yellow-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" style={{ width: '25%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">25% Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            📋 New Shipment
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            📊 View Analytics
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            💬 Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleCustomerPortal;
}