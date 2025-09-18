import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import ErrorBoundary from '../../../components/ErrorBoundary';

const CompliancePortal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Compliance Dashboard' },
    { id: 'audits', label: 'Audits & Reviews' },
    { id: 'policies', label: 'Policies & Procedures' },
    { id: 'training', label: 'Training & Certification' },
    { id: 'reports', label: 'Compliance Reports' },
    { id: 'settings', label: 'Settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Compliance Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Active Audits
                </h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Progress</p>
              </div>
              <div
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Compliance Score
                </h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">94%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Excellent</p>
              </div>
              <div
                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Training Hours
                </h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">2,847</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This Month</p>
              </div>
            </div>
          </div>
        );
      case 'audits':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Audits & Reviews
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Audit management component</p>
          </div>
        );
      case 'policies':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Policies & Procedures
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Policy management component</p>
          </div>
        );
      case 'training':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Training & Certification
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Training management component</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Compliance Reports
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
                Compliance Portal
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
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">C</span>
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
                          ? 'bg-green-600 text-white'
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
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

export default CompliancePortal;
