import React from 'react';

const TestCustomerPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 Customer Portal Test</h1>
          <p className="text-xl text-gray-300 mb-8">
            This is a test version of the Customer Portal
          </p>
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Subdomain Routing Working! ✅
            </h2>
            <p className="text-gray-300 mb-4">
              The subdomain{' '}
              <code className="bg-white/20 px-2 py-1 rounded">customer.transbotai.com</code> is
              correctly routing to this portal.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-500/20 p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold">✅ Domain Detection</h3>
                <p className="text-sm text-gray-300">Working</p>
              </div>
              <div className="bg-green-500/20 p-4 rounded-lg">
                <h3 className="text-green-400 font-semibold">✅ Component Rendering</h3>
                <p className="text-sm text-gray-300">Working</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCustomerPortal;
