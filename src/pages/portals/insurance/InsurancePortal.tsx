import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import ErrorBoundary from '../../../components/ErrorBoundary';

const InsurancePortal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Insurance Dashboard' },
    { id: 'policies', label: 'Policy Management' },
    { id: 'claims', label: 'Claims Processing' },
    { id: 'coverage', label: 'Coverage Analysis' },
    { id: 'reports', label: 'Insurance Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Insurance Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Active Policies
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">47</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Force</p>
              </div>
              <div
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Claims This Month
                </h3>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pending Review</p>
              </div>
              <div
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Coverage Value
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">$2.4M</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Coverage</p>
              </div>
            </div>
          </div>
        );
      case 'policies':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Policy Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Policy management component</p>
          </div>
        );
      case 'claims':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Claims Processing
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Claims processing component</p>
          </div>
        );
      case 'coverage':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Coverage Analysis
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Coverage analysis component</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Insurance Reports
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Reporting component</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Settings component</p>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Component coming soon...</p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <header
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} shadow-sm`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Insurance Portal
              </h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  )}
                </button>
                <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">I</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} w-64`}
          >
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left p-2 rounded-lg flex items-center space-x-2 transition-colors ${
                        activeTab === item.id
                          ? 'bg-orange-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="w-5 h-5 flex-shrink-0">
                        {/* Placeholder icon */}
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div
              className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default InsurancePortal;
