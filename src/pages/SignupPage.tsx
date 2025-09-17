import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Phone,
  Briefcase,
  ArrowRight,
  Brain,
  Shield,
  Zap,
  Globe,
  AlertCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { useAuth, SignupData } from '../contexts/AuthContext';

const SignupPage = React.memo(function SignupPage() {
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    jobTitle: '',
    company: '',
    role: 'shipper',
    subdomain: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!value.includes('@')) return 'Please enter a valid email address';
        return '';
      case 'phone':
        return value.trim() ? '' : 'Phone number is required';
      case 'company':
        return value.trim() ? '' : 'Company name is required';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate all fields
    const errors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'subdomain' && key !== 'jobTitle') {
        const error = validateField(key, formData[key as keyof SignupData] || '');
        if (error) errors[key] = error;
      }
    });

    const confirmError = validateField('confirmPassword', confirmPassword);
    if (confirmError) errors.confirmPassword = confirmError;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the errors below');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    const success = await signup(formData);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('An account with this email already exists');
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup with ${provider}`);
    alert(`${provider} signup will be implemented soon!`);
  };

  const roles = [
    {
      value: 'shipper',
      label: 'Shipper',
      icon: '📦',
      description: 'Ship goods and manage logistics',
    },
    {
      value: 'carrier',
      label: 'Carrier',
      icon: '🚛',
      description: 'Transport goods and manage fleet',
    },
    { value: 'broker', label: 'Broker', icon: '🤝', description: 'Connect shippers with carriers' },
    { value: 'driver', label: 'Driver', icon: '👨‍💼', description: 'Drive and deliver shipments' },
    {
      value: 'owner-operator',
      label: 'Owner Operator',
      icon: '🚚',
      description: 'Independent trucking operator',
    },
    { value: 'admin', label: 'Administrator', icon: '⚙️', description: 'Manage system and users' },
    // Service Provider Roles
    {
      value: 'warehousing',
      label: 'Warehousing & 3PL',
      icon: '🏭',
      description: 'Storage, fulfillment, and distribution services',
    },
    {
      value: 'freight-forwarding',
      label: 'Freight Forwarding',
      icon: '🌍',
      description: 'International shipping and customs clearance',
    },
    {
      value: 'insurance',
      label: 'Insurance Services',
      icon: '🛡️',
      description: 'Transportation and cargo insurance',
    },
    {
      value: 'fleet-services',
      label: 'Fleet Services',
      icon: '⛽',
      description: 'Fuel cards, maintenance, and repair services',
    },
    {
      value: 'technology',
      label: 'Technology Solutions',
      icon: '💻',
      description: 'Software, apps, and digital tools for logistics',
    },
    {
      value: 'consulting',
      label: 'Consulting Services',
      icon: '📊',
      description: 'Logistics consulting and optimization',
    },
    {
      value: 'customs-brokerage',
      label: 'Customs Brokerage',
      icon: '📋',
      description: 'Customs clearance and import/export services',
    },
    {
      value: 'maintenance',
      label: 'Truck Maintenance & Repair',
      icon: '🔧',
      description: 'Vehicle maintenance and repair services',
    },
  ];

  const features = [
    { icon: Brain, text: 'AI-Powered Logistics', description: 'Smart optimization algorithms' },
    { icon: Shield, text: 'Enterprise Security', description: 'Bank-level data protection' },
    { icon: Zap, text: 'Real-time Tracking', description: 'Live shipment monitoring' },
    { icon: Globe, text: 'Global Network', description: 'Worldwide logistics coverage' },
  ];

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { number: '150+', label: 'Countries', icon: Globe, color: 'from-purple-500 to-pink-500' },
    { number: '24/7', label: 'Support', icon: Award, color: 'from-orange-500 to-red-500' },
  ];

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden responsive-container">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 responsive-container">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob responsive-container"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 responsive-container"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 responsive-container"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-1000 responsive-container"></div>
      </div>

      <div className="relative z-10 flex min-h-screen responsive-container">
        {/* Left Panel - Enhanced Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative responsive-container">
          <div className="flex flex-col justify-center px-12 py-16 w-full responsive-container">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 responsive-container"
            >
              <div className="flex items-center mb-6 responsive-container">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 responsive-container"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Sparkles className="w-7 h-7 text-white responsive-container" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white responsive-container">Trans Bot AI</h1>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 leading-tight responsive-container">
                Join the Future of
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent responsive-container">
                  {' '}
                  Logistics
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed responsive-container">
                Experience AI-powered logistics solutions that transform your business operations
              </p>
            </motion.div>

            {/* Enhanced Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6 mb-12 responsive-container"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 responsive-container"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 responsive-container">
                    <feature.icon className="w-6 h-6 text-white responsive-container" />
                  </div>
                  <div>
                    <span className="text-white font-medium block responsive-container">{feature.text}</span>
                    <span className="text-gray-400 text-sm responsive-container">{feature.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 gap-6 responsive-container"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 responsive-container"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
                  >
                    <stat.icon className="w-6 h-6 text-white responsive-container" />
                  </div>
                  <div className="text-2xl font-bold text-white responsive-container">{stat.number}</div>
                  <div className="text-sm text-gray-400 responsive-container">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Panel - Enhanced Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md responsive-container"
          >
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl responsive-container">
              <div className="text-center mb-8 responsive-container">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 responsive-container"
                >
                  <Star className="w-8 h-8 text-white responsive-container" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2 responsive-container">Create Account</h2>
                <p className="text-gray-300 responsive-container">Join thousands of logistics professionals</p>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-3 responsive-container"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 responsive-container" />
                    <span className="text-red-200 text-sm responsive-container">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6 responsive-container">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4 responsive-container">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-white mb-2 responsive-container"
                    >
                      First Name *
                    </label>
                    <div className="relative responsive-container">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          fieldErrors.firstName ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="John"
                      />
                      {formData.firstName && !fieldErrors.firstName && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 responsive-container" />
                      )}
                      {fieldErrors.firstName && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400 responsive-container" />
                      )}
                    </div>
                    {fieldErrors.firstName && (
                      <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white mb-2 responsive-container">
                      Last Name *
                    </label>
                    <div className="relative responsive-container">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          fieldErrors.lastName ? 'border-red-500' : 'border-white/20'
                        }`}
                        placeholder="Doe"
                      />
                      {formData.lastName && !fieldErrors.lastName && (
                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 responsive-container" />
                      )}
                      {fieldErrors.lastName && (
                        <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400 responsive-container" />
                      )}
                    </div>
                    {fieldErrors.lastName && (
                      <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Email Address *
                  </label>
                  <div className="relative responsive-container">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        fieldErrors.email ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="john@company.com"
                    />
                    {formData.email && !fieldErrors.email && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 responsive-container" />
                    )}
                    {fieldErrors.email && (
                      <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400 responsive-container" />
                    )}
                  </div>
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Phone Number *
                  </label>
                  <div className="relative responsive-container">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        fieldErrors.phone ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {formData.phone && !fieldErrors.phone && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 responsive-container" />
                    )}
                    {fieldErrors.phone && (
                      <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400 responsive-container" />
                    )}
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Job Title */}
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Job Title
                  </label>
                  <div className="relative responsive-container">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 responsive-container"
                      placeholder="Logistics Manager"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Company Name *
                  </label>
                  <div className="relative responsive-container">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-10 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        fieldErrors.company ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Your Company Inc."
                    />
                    {formData.company && !fieldErrors.company && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400 responsive-container" />
                    )}
                    {fieldErrors.company && (
                      <X className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-400 responsive-container" />
                    )}
                  </div>
                  {fieldErrors.company && (
                    <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.company}</p>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 responsive-container"
                  >
                    {roles.map(role => (
                      <option
                        key={role.value}
                        value={role.value}
                        className="bg-gray-800 text-white responsive-container"
                      >
                        {role.icon} {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2 responsive-container">
                    Password *
                  </label>
                  <div className="relative responsive-container">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        fieldErrors.password ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() = aria-label="Button"> setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors responsive-container"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5 responsive-container" /> : <Eye className="w-5 h-5 responsive-container" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 responsive-container">
                      <div className="flex items-center space-x-2 mb-1 responsive-container">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength(formData.password))}`}
                            style={{ width: `${(passwordStrength(formData.password) / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 responsive-container">
                          {getPasswordStrengthText(passwordStrength(formData.password))}
                        </span>
                      </div>
                    </div>
                  )}
                  {fieldErrors.password && (
                    <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-white mb-2 responsive-container"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative responsive-container">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-12 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        fieldErrors.confirmPassword ? 'border-red-500' : 'border-white/20'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() = aria-label="Button"> setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors responsive-container"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 responsive-container" />
                      ) : (
                        <Eye className="w-5 h-5 responsive-container" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1 responsive-container">{fieldErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-3 responsive-container">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={e => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2 responsive-container"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300 responsive-container">
                    I agree to the{' '}
                    <Link
                      to="/terms"
                      className="text-blue-400 hover:text-blue-300 transition-colors responsive-container"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="/privacy"
                      className="text-blue-400 hover:text-blue-300 transition-colors responsive-container"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 responsive-container"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin responsive-container" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 responsive-container" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Social Signup */}
              <div className="mt-6 responsive-container">
                <div className="relative responsive-container">
                  <div className="absolute inset-0 flex items-center responsive-container">
                    <div className="w-full border-t border-white/20 responsive-container" />
                  </div>
                  <div className="relative flex justify-center text-sm responsive-container">
                    <span className="px-2 bg-transparent text-gray-300 responsive-container">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 responsive-container">
                  {/* Google */}
                  <motion.button
                    type="button"
                    onClick={() => handleSocialSignup('Google')}
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
                    onClick={() => handleSocialSignup('Apple')}
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
                  onClick={() => handleSocialSignup('Microsoft')}
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

              {/* Sign In Link */}
              <div className="mt-6 text-center responsive-container">
                <p className="text-gray-300 responsive-container">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium responsive-container"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
