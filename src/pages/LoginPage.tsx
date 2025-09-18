import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Brain, Shield, Zap, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = React.memo(function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login functionality
    console.log(`Login with ${provider}`);
    // For now, just show an alert
    alert(`${provider} login will be implemented soon!`);
  };

  const features = [
    { icon: Brain, text: 'AI-Powered Logistics' },
    { icon: Shield, text: 'Enterprise Security' },
    { icon: Zap, text: 'Real-time Optimization' },
    { icon: Globe, text: 'Global Coverage' },
  ];

  const stats = [
    { number: '500+', label: 'Companies' },
    { number: '$2.5B+', label: 'Cost Savings' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'AI Monitoring' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden responsive-container">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 responsive-container">
        <div
          className="absolute inset-0 responsive-container"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex responsive-container">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-16 responsive-container">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg responsive-container"
          >
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl responsive-container">
                <Brain className="w-12 h-12 text-white responsive-container" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white responsive-container">Trans Bot AI</h1>
                <p className="text-blue-200 text-lg font-medium responsive-container">Intelligent Logistics Platform</p>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight responsive-container">
              Welcome to the Future of
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent responsive-container">
                {' '}
                Logistics
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed responsive-container">
              Experience AI-powered logistics management that transforms your supply chain
              operations. Join thousands of companies already optimizing with Trans Bot AI.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8 responsive-container">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white responsive-container"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg responsive-container">
                    <feature.icon className="w-5 h-5 text-blue-400 responsive-container" />
                  </div>
                  <span className="text-sm font-medium responsive-container">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 responsive-container">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 responsive-container"
                >
                  <div className="text-2xl font-bold text-white mb-1 responsive-container">{stat.number}</div>
                  <div className="text-sm text-gray-400 responsive-container">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md responsive-container"
          >
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8 responsive-container">
              <div className="flex items-center justify-center gap-3 mb-4 responsive-container">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg responsive-container">
                  <Brain className="w-8 h-8 text-white responsive-container" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white responsive-container">Trans Bot AI</h1>
                  <p className="text-blue-200 text-sm responsive-container">Intelligent Logistics Platform</p>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 shadow-2xl responsive-container">
              <div className="text-center mb-8 responsive-container">
                <h2 className="text-3xl font-bold text-white mb-2 responsive-container">Welcome Back</h2>
                <p className="text-gray-300 responsive-container">Sign in to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 responsive-container">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Email Address
                  </label>
                  <div className="relative responsive-container">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm responsive-container"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Password
                  </label>
                  <div className="relative responsive-container">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm responsive-container"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
            aria-label="Button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors responsive-container"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 responsive-container" /> : <Eye className="w-5 h-5 responsive-container" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm responsive-container"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4 responsive-container" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Social Login */}
              <div className="mt-6 responsive-container">
                <div className="relative responsive-container">
                  <div className="absolute inset-0 flex items-center responsive-container">
                    <div className="w-full border-t border-white/20 responsive-container" />
                  </div>
                  <div className="relative flex justify-center text-sm responsive-container">
                    <span className="px-2 bg-transparent text-gray-300 responsive-container">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 responsive-container">
                  {/* Google */}
                  <motion.button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/20 transition-all duration-200 responsive-container"
                  >
                    <svg className="w-5 h-5 responsive-container" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2 responsive-container">Google</span>
                  </motion.button>

                  {/* Apple */}
                  <motion.button
                    type="button"
                    onClick={() => handleSocialLogin('Apple')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/20 transition-all duration-200 responsive-container"
                  >
                    <svg className="w-5 h-5 responsive-container" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="ml-2 responsive-container">Apple</span>
                  </motion.button>
                </div>

                {/* Microsoft */}
                <motion.button
                  type="button"
                  onClick={() => handleSocialLogin('Microsoft')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-3 inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/20 transition-all duration-200 responsive-container"
                >
                  <svg className="w-5 h-5 responsive-container" viewBox="0 0 24 24">
                    <path fill="#F25022" d="M1 1h10v10H1z" />
                    <path fill="#00A4EF" d="M13 1h10v10H13z" />
                    <path fill="#7FBA00" d="M1 13h10v10H1z" />
                    <path fill="#FFB900" d="M13 13h10v10H13z" />
                  </svg>
                  <span className="ml-2 responsive-container">Microsoft</span>
                </motion.button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center responsive-container">
                <p className="text-gray-300 responsive-container">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium responsive-container"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Back to Home */}
              <div className="mt-4 text-center responsive-container">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm responsive-container">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}