import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const TestAuth: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-4xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
        <h1 className="text-3xl font-bold mb-8 responsive-container sm:flex-col md:flex-row lg:grid">Authentication Test</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-sm responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-xl font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Auth Status</h2>
          
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <strong>Is Loading:</strong> {isLoading ? 'Yes' : 'No'}
            </div>
            
            <div>
              <strong>Is Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
            </div>
            
            <div>
              <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'No user'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;
}