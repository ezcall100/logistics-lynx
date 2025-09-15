import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Crown,
  Shield,
  Users,
  Database,
  Server,
  Key,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function SuperAdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Check if user has Super Admin role
        const userRole = localStorage.getItem('userRole') || 'user';

        if (userRole === 'super-admin') {
          // Redirect to Super Admin Portal (Port 3005)
          window.location.href = 'http://localhost:3005';
        } else {
          setError('Access denied. Super Admin privileges required.');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const adminFeatures = [
    { icon: Users, text: 'User Management', status: 'active' },
    { icon: Database, text: 'System Administration', status: 'online' },
    { icon: Server, text: 'Portal Management', status: 'running' },
    { icon: Key, text: 'Security & Compliance', status: 'secure' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex">
      {/* Left Side - Super Admin Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating Admin Nodes */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute bottom-32 left-40 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-5 h-5 bg-indigo-300 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: '1.5s' }}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-purple-400/20"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Super Admin</h1>
                <p className="text-purple-200">Master Control System</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              Super Administrator
              <span className="block text-purple-400">Portal Access</span>
            </h2>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Access the complete Super Admin Portal for comprehensive system administration, user
              management, and enterprise control.
            </p>

            {/* Admin Features */}
            <div className="space-y-4">
              {adminFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-slate-300">{feature.text}</span>
                  <div className="ml-auto">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        feature.status === 'active'
                          ? 'bg-green-400'
                          : feature.status === 'online'
                            ? 'bg-blue-400'
                            : feature.status === 'running'
                              ? 'bg-purple-400'
                              : 'bg-green-400'
                      } animate-pulse`}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/30 rounded-lg p-4"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-purple-200 font-medium">Enterprise Security</span>
              </div>
              <p className="text-slate-300 text-sm mt-1">
                Multi-factor authentication and role-based access control
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Super Admin Portal</h1>
            <p className="text-slate-400">Sign in to access system administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="superadmin@transbotai.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-slate-600 rounded-lg bg-slate-800/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Access Super Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">Super Admin access required</p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Admin Portal Active</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
