import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Truck, Package, BarChart3, Shield, Zap, Bot } from 'lucide-react';
import Navigation from '../../components/Navigation';

const BrokerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Empower Your Brokers. Move More Freight, Faster.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Centralized quoting, load matching, and carrier management with AI suggestions. 
              Automated load posting, real-time status, compliance docs, profit optimization.
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
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600">
              Powerful tools designed specifically for freight brokers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Load Matching</h3>
              <p className="text-gray-600">
                AI-powered load matching connects shippers with the right carriers automatically.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Carrier Management</h3>
              <p className="text-gray-600">
                Comprehensive carrier database with ratings, insurance, and compliance tracking.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Analytics & Reporting</h3>
              <p className="text-gray-600">
                Real-time insights and comprehensive reporting for better decision making.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automation</h3>
              <p className="text-gray-600">
                Automated workflows for quotes, bookings, and document management.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compliance</h3>
              <p className="text-gray-600">
                Built-in compliance monitoring and regulatory reporting capabilities.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Document Management</h3>
              <p className="text-gray-600">
                Digital document storage and management with automated processing.
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
              Ready to Transform Your Brokerage?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of brokers who trust Trans Bot AI for their operations.
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

export default BrokerPage;
