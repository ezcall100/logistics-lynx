import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const TestDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 responsive-container">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="flex items-center justify-between h-16 responsive-container">
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center responsive-container">
                <span className="text-white font-bold responsive-container">LL</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 responsive-container">Trans Bot AI</h1>
                <p className="text-xs text-gray-500 responsive-container">Portal Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center responsive-container">
                <span className="text-white text-sm font-medium responsive-container">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        <div className="space-y-6 responsive-container">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white responsive-container">
            <h1 className="text-3xl font-bold mb-2 responsive-container">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-blue-100 text-lg responsive-container">
              Here's what's happening with your logistics operations today.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 responsive-container">Active Loads</p>
                  <p className="text-2xl font-bold text-gray-900 responsive-container">247</p>
                  <div className="flex items-center mt-2 responsive-container">
                    <span className="text-sm font-medium text-green-600 responsive-container">+12%</span>
                    <span className="text-sm text-gray-500 ml-1 responsive-container">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center responsive-container">
                  <span className="text-white text-xl responsive-container">📦</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 responsive-container">Fleet Vehicles</p>
                  <p className="text-2xl font-bold text-gray-900 responsive-container">89</p>
                  <div className="flex items-center mt-2 responsive-container">
                    <span className="text-sm font-medium text-green-600 responsive-container">+3%</span>
                    <span className="text-sm text-gray-500 ml-1 responsive-container">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center responsive-container">
                  <span className="text-white text-xl responsive-container">🚛</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 responsive-container">Active Drivers</p>
                  <p className="text-2xl font-bold text-gray-900 responsive-container">156</p>
                  <div className="flex items-center mt-2 responsive-container">
                    <span className="text-sm font-medium text-green-600 responsive-container">+8%</span>
                    <span className="text-sm text-gray-500 ml-1 responsive-container">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center responsive-container">
                  <span className="text-white text-xl responsive-container">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 responsive-container">Revenue (MTD)</p>
                  <p className="text-2xl font-bold text-gray-900 responsive-container">$2.4M</p>
                  <div className="flex items-center mt-2 responsive-container">
                    <span className="text-sm font-medium text-green-600 responsive-container">+15%</span>
                    <span className="text-sm text-gray-500 ml-1 responsive-container">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center responsive-container">
                  <span className="text-white text-xl responsive-container">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 responsive-container">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 responsive-container">
              {[
                { label: 'Create Load', emoji: '📦' },
                { label: 'Add Driver', emoji: '👤' },
                { label: 'Add Vehicle', emoji: '🚛' },
                { label: 'View Reports', emoji: '📊' },
                { label: 'Schedule', emoji: '📅' },
                { label: 'Settings', emoji: '⚙️' }
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors responsive-container"
                 aria-label="Button">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 responsive-container">
                    <span className="text-2xl responsive-container">{action.emoji}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 text-center responsive-container">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestDashboard;
