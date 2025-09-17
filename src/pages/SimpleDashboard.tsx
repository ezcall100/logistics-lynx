import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const SimpleDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Not Authenticated</h1>
          <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gray-100 p-8 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-6xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white rounded-lg shadow-sm p-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            Welcome, {user?.name}!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="bg-blue-50 p-6 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-lg font-semibold text-blue-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Role</h3>
              <p className="text-blue-700 responsive-container sm:flex-col md:flex-row lg:grid">{user?.role}</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-lg font-semibold text-green-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Company</h3>
              <p className="text-green-700 responsive-container sm:flex-col md:flex-row lg:grid">{user?.company}</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-lg font-semibold text-purple-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Email</h3>
              <p className="text-purple-700 responsive-container sm:flex-col md:flex-row lg:grid">{user?.email}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">User Details</h3>
            <pre className="text-sm text-gray-700 overflow-auto responsive-container sm:flex-col md:flex-row lg:grid">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          
          <div className="mt-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <a 
              href="/test-auth" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              Test Auth Status
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
