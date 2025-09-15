import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Globe,
  Shield,
  Users,
  Bot,
  Crown,
  Building,
  Truck,
  User,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function CentralizedLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubdomain, setCurrentSubdomain] = useState<string | null>(null);
  const { login } = useAuth();

  useEffect(() => {
    // Detect current subdomain
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length >= 3 && parts[1] === 'transbotai' && parts[2] === 'com') {
      setCurrentSubdomain(parts[0]);
    } else if (hostname === 'transbotai.com' || hostname === 'www.transbotai.com') {
      setCurrentSubdomain('main');
    } else {
      setCurrentSubdomain('main');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        const userRole = localStorage.getItem('userRole') || 'user';

        // Redirect based on subdomain and role
        if (
          currentSubdomain === 'mcp' &&
          (userRole === 'mcp-admin' || userRole === 'super-admin')
        ) {
          window.location.href = 'http://localhost:3002';
        } else if (currentSubdomain === 'superadmin' && userRole === 'super-admin') {
          window.location.href = 'http://localhost:3005';
        } else if (
          currentSubdomain === 'broker' &&
          (userRole === 'broker' || userRole === 'admin' || userRole === 'super-admin')
        ) {
          window.location.href = 'http://localhost:3000/broker';
        } else if (
          currentSubdomain === 'carrier' &&
          (userRole === 'carrier' || userRole === 'admin' || userRole === 'super-admin')
        ) {
          window.location.href = 'http://localhost:3000/carrier';
        } else if (
          currentSubdomain === 'driver' &&
          (userRole === 'driver' || userRole === 'admin' || userRole === 'super-admin')
        ) {
          window.location.href = 'http://localhost:3000/driver';
        } else if (
          currentSubdomain === 'shipper' &&
          (userRole === 'shipper' || userRole === 'admin' || userRole === 'super-admin')
        ) {
          window.location.href = 'http://localhost:3000/shipper';
        } else {
          // Default redirect to main website
          window.location.href = 'http://localhost:3000';
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

  const getSubdomainInfo = () => {
    switch (currentSubdomain) {
      case 'mcp':
        return {
          name: 'MCP Dashboard',
          description: 'Model Context Protocol Command Center',
          icon: Bot,
          color: 'from-cyan-500 to-blue-600',
          bgColor: 'from-slate-900 via-blue-900 to-cyan-900',
        };
      case 'superadmin':
        return {
          name: 'Super Admin Portal',
          description: 'Master Control System Administration',
          icon: Crown,
          color: 'from-purple-500 to-indigo-600',
          bgColor: 'from-slate-900 via-purple-900 to-indigo-900',
        };
      case 'broker':
        return {
          name: 'Broker Portal',
          description: 'Freight Broker Management System',
          icon: Building,
          color: 'from-green-500 to-emerald-600',
          bgColor: 'from-slate-900 via-green-900 to-emerald-900',
        };
      case 'carrier':
        return {
          name: 'Carrier Portal',
          description: 'Transportation Network Management',
          icon: Truck,
          color: 'from-orange-500 to-red-600',
          bgColor: 'from-slate-900 via-orange-900 to-red-900',
        };
      case 'driver':
        return {
          name: 'Driver Portal',
          description: 'Mobile-First Driver Operations',
          icon: User,
          color: 'from-blue-500 to-indigo-600',
          bgColor: 'from-slate-900 via-blue-900 to-indigo-900',
        };
      case 'shipper':
        return {
          name: 'Shipper Portal',
          description: 'Cargo Management System',
          icon: Building,
          color: 'from-teal-500 to-cyan-600',
          bgColor: 'from-slate-900 via-teal-900 to-cyan-900',
        };
      default:
        return {
          name: 'TransBot AI',
          description: 'Universal Login Portal',
          icon: Globe,
          color: 'from-slate-500 to-gray-600',
          bgColor: 'from-slate-900 via-gray-900 to-slate-900',
        };
    }
  };

  const subdomainInfo = getSubdomainInfo();
  const IconComponent = subdomainInfo.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${subdomainInfo.bgColor} flex`}>
      {/* Left Side - Subdomain Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating Nodes */}
          <div className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-pulse opacity-60"></div>
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-white/20 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute bottom-32 left-40 w-2 h-2 bg-white/20 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-5 h-5 bg-white/20 rounded-full animate-pulse opacity-60"
            style={{ animationDelay: '1.5s' }}
          ></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-white/20"></div>
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
              <div
                className={`w-12 h-12 bg-gradient-to-r ${subdomainInfo.color} rounded-xl flex items-center justify-center`}
              >
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{subdomainInfo.name}</h1>
                <p className="text-white/70">TransBot AI Platform</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              {subdomainInfo.name}
              <span className="block text-white/80">Portal Access</span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {subdomainInfo.description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/70">Secure Authentication</span>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/70">Role-Based Access</span>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/70">Portal Management</span>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            </div>
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
            <div
              className={`w-16 h-16 bg-gradient-to-r ${subdomainInfo.color} rounded-xl flex items-center justify-center`}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{subdomainInfo.name}</h1>
            <p className="text-white/70">Sign in to access your portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/50" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/50" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/50 hover:text-white/70" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 backdrop-blur-sm"
              >
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r ${subdomainInfo.color} text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/50 text-sm">
              {currentSubdomain === 'main'
                ? 'Universal Login Portal'
                : `${subdomainInfo.name} Access`}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-white/40">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <span>Portal Active</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
