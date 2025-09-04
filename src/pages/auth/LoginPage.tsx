import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-cyan-500 bg-white/10 border-white/20 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
              Continue with Google
            </button>
            <button className="w-full py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
              Continue with Microsoft
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4 text-center">Demo Accounts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Admin:</span>
              <span className="text-cyan-400">admin@transbotai.com</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Broker:</span>
              <span className="text-cyan-400">broker@transbotai.com</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Carrier:</span>
              <span className="text-cyan-400">carrier@transbotai.com</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Driver:</span>
              <span className="text-cyan-400">driver@transbotai.com</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipper:</span>
              <span className="text-cyan-400">shipper@transbotai.com</span>
            </div>
            <div className="text-center mt-3 text-xs text-gray-400">
              Password: <span className="text-cyan-400">demo123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
