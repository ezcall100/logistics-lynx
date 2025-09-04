import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Check } from 'lucide-react'

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    role: 'shipper',
    agreeToTerms: false
  })

  const roles = [
    { value: 'shipper', label: 'Shipper' },
    { value: 'broker', label: 'Broker' },
    { value: 'carrier', label: 'Carrier' },
    { value: 'driver', label: 'Driver' },
    { value: 'owner-operator', label: 'Owner-Operator' },
    { value: 'admin', label: 'Admin' },
    { value: 'super-admin', label: 'Super Admin' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    console.log('Signup attempt:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 shadow-2xl">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
            Trans Bot AI
          </h1>
          <p className="text-gray-300">Create your account</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
      <div>
                <label className="block text-white font-semibold mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
                    type="text"
                    name="firstName"
            value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="John"
  required
                  />
                </div>
              </div>
        <div>
                <label className="block text-white font-semibold mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
                    type="text"
                    name="lastName"
            value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="Doe"
  required
                  />
                </div>
        </div>
      </div>

            {/* Email Field */}
      <div>
              <label className="block text-white font-semibold mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
                  type="email"
                  name="email"
          value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="john@company.com"
  required
          />
              </div>
            </div>

            {/* Company Field */}
      <div>
              <label className="block text-white font-semibold mb-2">Company</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Your Company"
  required
        />
              </div>
                </div>

            {/* Role Selection */}
            <div>
              <label className="block text-white font-semibold mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                required
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value} className="bg-gray-800">
                    {role.label}
                  </option>
                ))}
              </select>
          </div>

            {/* Password Fields */}
            <div>
              <label className="block text-white font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white font-semibold mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
        </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
          <input
                type="checkbox"
                name="agreeToTerms"
            checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-5 h-5 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500 focus:ring-2 mt-1"
  required
              />
              <label className="text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-cyan-400 hover:text-cyan-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300">
                  Privacy Policy
                </Link>
              </label>
    </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
          </div>

        {/* Features */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 text-center">What you get:</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Access to 25 Portals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>250 AI Agents</span>
                </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>6 Language Support</span>
          </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
