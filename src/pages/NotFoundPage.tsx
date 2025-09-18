import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4 responsive-container">
      <div className="text-center max-w-2xl mx-auto responsive-container">
        {/* 404 Animation */}
        <div className="mb-8 responsive-container">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 responsive-container">
            404
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full responsive-container"></div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-white mb-4 responsive-container">Page Not Found</h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed responsive-container">
          The page you're looking for seems to have vanished into the digital void. Don't worry,
          even the best logistics systems sometimes lose a package!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 responsive-container">
          <Link
            to="/"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl responsive-container"
          >
            🏠 Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            aria-label="Go back to previous page"
            className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl responsive-container"
          >
            ← Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center responsive-container">
          <Link
            to="/solutions"
            className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-purple-500 responsive-container"
          >
            <div className="text-purple-400 text-2xl mb-2 responsive-container">🚛</div>
            <div className="text-white font-semibold responsive-container">Solutions</div>
            <div className="text-gray-400 text-sm responsive-container">Explore our services</div>
          </Link>

          <Link
            to="/portal"
            className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-purple-500 responsive-container"
          >
            <div className="text-purple-400 text-2xl mb-2 responsive-container">🔐</div>
            <div className="text-white font-semibold responsive-container">Portal</div>
            <div className="text-gray-400 text-sm responsive-container">Access your account</div>
          </Link>

          <Link
            to="/get-started"
            className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-purple-500 responsive-container"
          >
            <div className="text-purple-400 text-2xl mb-2 responsive-container">🚀</div>
            <div className="text-white font-semibold responsive-container">Get Started</div>
            <div className="text-gray-400 text-sm responsive-container">Begin your journey</div>
          </Link>
        </div>

        {/* Fun Fact */}
        <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700 responsive-container">
          <div className="text-purple-400 text-lg mb-2 responsive-container">💡 Did you know?</div>
          <p className="text-gray-300 text-sm responsive-container">
            In logistics, a 404 error is like a lost shipment - it happens, but we always find a way
            to get you back on track!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFoundPage;