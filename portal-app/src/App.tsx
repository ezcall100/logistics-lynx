import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, AlertCircle, User, Bot, Zap } from 'lucide-react';
import EnterpriseSuperAdminPortal from './EnterpriseSuperAdminPortal';
import { ThemeProvider } from './contexts/ThemeContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
  company?: string;
  avatar?: string;
  permissions?: string[];
  subdomain?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupRole, setSignupRole] = useState('shipper');
  const [signupCompany, setSignupCompany] = useState('');
  const [signupSubdomain, setSignupSubdomain] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('portalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mock authentication
    const mockUsers = [
      {
        id: '1',
        name: 'System Administrator',
        email: 'admin@transbotai.com',
        role: 'superadmin',
        company: 'Trans Bot AI',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: ['*'],
        subdomain: 'admin',
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        name: 'Super Administrator',
        email: 'superadmin@transbotai.com',
        role: 'superadmin',
        company: 'Trans Bot AI',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        permissions: ['*'],
        subdomain: 'superadmin',
        isActive: true,
        lastLogin: new Date().toISOString(),
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email && password === 'password123');
    
    if (foundUser) {
      setUser(foundUser as User);
      setIsLoggedIn(true);
      localStorage.setItem('portalUser', JSON.stringify(foundUser));
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Mock signup
    const newUser: User = {
      id: Date.now().toString(),
      name: `${signupFirstName} ${signupLastName}`.trim(),
      email: signupEmail,
      role: signupRole as 'superadmin' | 'admin' | 'user',
      company: signupCompany || 'Trans Bot AI',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      permissions: ['read'],
      subdomain: signupSubdomain || signupRole,
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('portalUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('portalUser');
    setEmail('');
    setPassword('');
    setError('');
  };

  const fillDemoAccount = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  const generateSubdomain = (companyName: string) => {
    return companyName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleCompanyChange = (companyName: string) => {
    setSignupCompany(companyName);
    if (companyName && !signupSubdomain) {
      setSignupSubdomain(generateSubdomain(companyName));
    }
  };

  // If not logged in, show login/signup page
  if (!isLoggedIn) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-center lg:justify-start mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl responsive-container sm:flex-col md:flex-row lg:grid">
                <Bot className="w-12 h-12 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div className="ml-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h1 className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Trans Bot AI</h1>
                <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Portal Access</p>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              The most advanced transportation management system with AI-powered optimization
            </h2>
            
            <div className="space-y-4 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="bg-green-100 p-2 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Shield className="w-5 h-5 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <span className="text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="bg-blue-100 p-2 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <Zap className="w-5 h-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <span className="text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Real-time Tracking</span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Login/Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'login'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() = aria-label="Button"> setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'signup'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <AlertCircle className="w-5 h-5 text-red-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-red-700 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{error}</span>
              </motion.div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Email Address
                  </label>
                  <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Password
                  </label>
                  <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() = aria-label="Button"> setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <label className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="ml-2 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 responsive-container sm:flex-col md:flex-row lg:grid">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </>
                  )}
                </button>

                <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="absolute inset-0 flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="w-full border-t border-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div className="relative flex justify-center text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="px-2 bg-white text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <svg className="w-5 h-5 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <svg className="w-5 h-5 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" fill="#1DA1F2" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </button>
                </div>
              </form>
            )}

            {/* Signup Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      First Name
                    </label>
                    <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <input
                        type="text"
                        value={signupFirstName}
                        onChange={(e) => setSignupFirstName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                        placeholder="First name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      Last Name
                    </label>
                    <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <input
                        type="text"
                        value={signupLastName}
                        onChange={(e) => setSignupLastName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Email Address
                  </label>
                  <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={signupCompany}
                    onChange={(e) => handleCompanyChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter your company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Role
                  </label>
                  <select
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="shipper">Shipper</option>
                    <option value="carrier">Carrier</option>
                    <option value="broker">Broker</option>
                    <option value="driver">Driver</option>
                    <option value="owner-operator">Owner Operator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Subdomain
                  </label>
                  <div className="flex responsive-container sm:flex-col md:flex-row lg:grid">
                    <input
                      type="text"
                      value={signupSubdomain}
                      onChange={(e) => setSignupSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="your-company"
                      required
                    />
                    <span className="px-3 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                      .transbotai.com
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">This will be your portal URL: {signupSubdomain || 'your-company'}.transbotai.com</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Password
                  </label>
                  <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() = aria-label="Button"> setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Confirm Password
                  </label>
                  <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <input
                      type={showSignupConfirmPassword ? 'text' : 'password'}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() = aria-label="Button"> setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {showSignupConfirmPassword ? <EyeOff className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Demo Accounts */}
            {activeTab === 'login' && (
              <div className="mt-8 pt-6 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-sm font-medium text-gray-700 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Demo Accounts</h3>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    onClick={() = aria-label="Button"> fillDemoAccount('admin@transbotai.com')}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <div>
                        <div className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Admin</div>
                        <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">admin@transbotai.com</div>
                      </div>
                      <div className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Copy</div>
                    </div>
                  </button>
                  <button
                    onClick={() = aria-label="Button"> fillDemoAccount('superadmin@transbotai.com')}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <div>
                        <div className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Super Admin</div>
                        <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">superadmin@transbotai.com</div>
                      </div>
                      <div className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Copy</div>
                    </div>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">Password for all demo accounts: password123</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // If logged in, show dashboard
  return <EnterpriseSuperAdminPortal user={user!} onLogout={handleLogout} />;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;