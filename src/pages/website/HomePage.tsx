import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, Shield, Users, BarChart3, CheckCircle, Star } from 'lucide-react';
import { Navigation } from '../../components/Navigation';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Revolutionizing Logistics with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Trans Bot AI unifies 24 logistics portals into one intelligent Core Portal OS. 
              One login. One dashboard. Infinite possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                Sign Up Free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link to="/company/contact" className="btn-outline text-lg px-8 py-3">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Trans Bot AI?
            </h2>
            <p className="text-xl text-gray-600">
              One platform, 24 portals, infinite possibilities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">One Platform, 24 Portals</h3>
              <p className="text-gray-600">
                Unified access to all logistics portals through one intelligent interface.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Automation</h3>
              <p className="text-gray-600">
                Intelligent automation that learns and adapts to your logistics workflows.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise-Grade Security</h3>
              <p className="text-gray-600">
                Bank-level security with advanced encryption and compliance standards.
              </p>
            </div>
            
            <div className="glass-effect rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scalable by Design</h3>
              <p className="text-gray-600">
                Built to grow with your business, from startup to enterprise scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0/5.0</span>
              </div>
              <blockquote className="text-xl text-gray-700 mb-6">
                "Trans Bot AI reduced our load management time by 40%. The unified dashboard 
                gives us complete visibility across all our logistics operations."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-gray-600">Logistics Director, Global Freight Co.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section className="py-20 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Access Your Portals
            </h2>
            <p className="text-xl text-gray-600">
              Quick access to your specialized logistics portals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/super-admin" className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Super Admin Portal</h3>
                  <p className="text-gray-600 text-sm">System administration and management</p>
                </div>
              </div>
            </Link>
            
            <Link to="/mcp-dashboard" className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">MCP Dashboard</h3>
                  <p className="text-gray-600 text-sm">Monitor 302 AI agents and automation</p>
                </div>
              </div>
            </Link>
            
            <Link to="/solutions" className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">All Solutions</h3>
                  <p className="text-gray-600 text-sm">Browse all 24 logistics portals</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="responsive-container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Trans Bot AI</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing logistics with AI-powered automation and intelligent decision-making.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <div className="space-y-2">
                <Link to="/solutions/broker" className="block text-gray-400 hover:text-white transition-colors">
                  Broker Portal
                </Link>
                <Link to="/solutions/carrier" className="block text-gray-400 hover:text-white transition-colors">
                  Carrier Portal
                </Link>
                <Link to="/solutions/shipper" className="block text-gray-400 hover:text-white transition-colors">
                  Shipper Portal
                </Link>
                <Link to="/solutions/driver" className="block text-gray-400 hover:text-white transition-colors">
                  Driver Portal
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2">
                <Link to="/product/portal-os" className="block text-gray-400 hover:text-white transition-colors">
                  Portal OS
                </Link>
                <Link to="/product/automation" className="block text-gray-400 hover:text-white transition-colors">
                  Automation
                </Link>
                <Link to="/product/security" className="block text-gray-400 hover:text-white transition-colors">
                  Security
                </Link>
                <Link to="/product/integrations" className="block text-gray-400 hover:text-white transition-colors">
                  Integrations
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <Link to="/company/about" className="block text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link to="/company/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link to="/company/careers" className="block text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
                <Link to="/resources/support" className="block text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Trans Bot AI. All rights reserved. Built with ❤️ by the TransBot team.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;