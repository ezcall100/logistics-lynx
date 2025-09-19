import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Route, Users, BarChart3, Shield, Zap, Bot } from 'lucide-react';

const CarrierPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="responsive-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Trans Bot AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/solutions" className="text-blue-600 font-medium">Solutions</Link>
              <Link to="/product" className="text-gray-600 hover:text-gray-900 transition-colors">Product</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</Link>
              <Link to="/company" className="text-gray-600 hover:text-gray-900 transition-colors">Company</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Carrier Portal
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Optimize fleet operations with intelligent route planning, load optimization, 
              and comprehensive driver management tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link to="/company/contact" className="btn-secondary text-lg px-8 py-3">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fleet Management Made Simple
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to run an efficient and profitable fleet
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Route className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Route Optimization</h3>
              <p className="text-gray-600">
                AI-powered route planning to minimize fuel costs and maximize efficiency.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fleet Management</h3>
              <p className="text-gray-600">
                Complete fleet visibility with real-time tracking and maintenance scheduling.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Driver Management</h3>
              <p className="text-gray-600">
                Comprehensive driver tools with mobile apps and performance tracking.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Performance Analytics</h3>
              <p className="text-gray-600">
                Detailed insights into fleet performance, costs, and profitability.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety & Compliance</h3>
              <p className="text-gray-600">
                Built-in safety monitoring and compliance management for all regulations.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Load Optimization</h3>
              <p className="text-gray-600">
                Smart load matching and capacity optimization for maximum revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="responsive-container">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Optimize Your Fleet?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of carriers who trust Trans Bot AI for their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
                Start Free Trial
              </Link>
              <Link to="/company/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarrierPage;
