import React from 'react';

const SimpleCustomerPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🚛 Customer Portal</h1>
          <p className="text-xl text-gray-300">Welcome to your TransBot AI Customer Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Shipments</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <div className="text-blue-400 text-2xl">📦</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Shipments</p>
                <p className="text-2xl font-bold text-white">8</p>
              </div>
              <div className="text-yellow-400 text-2xl">⏰</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">$89,450</p>
              </div>
              <div className="text-green-400 text-2xl">💰</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Account Rating</p>
                <p className="text-2xl font-bold text-white">4.8</p>
              </div>
              <div className="text-purple-400 text-2xl">⭐</div>
            </div>
          </div>
        </div>

        {/* Active Shipments */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Active Shipments</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">CS-001</h3>
                  <p className="text-gray-300">Los Angeles, CA → New York, NY</p>
                  <p className="text-sm text-gray-400">Swift Logistics</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-semibold">In Transit</p>
                  <p className="text-gray-300">ETA: 2 days</p>
                  <p className="text-white font-bold">$1,450</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">75% Complete</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">CS-002</h3>
                  <p className="text-gray-300">Chicago, IL → Miami, FL</p>
                  <p className="text-sm text-gray-400">Prime Transport</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-semibold">Loading</p>
                  <p className="text-gray-300">ETA: 3 days</p>
                  <p className="text-white font-bold">$980</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">25% Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            📋 New Shipment
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            📊 View Analytics
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            💬 Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleCustomerPortal;
