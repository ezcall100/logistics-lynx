import React, { useState, useCallback, useRef } from 'react';
import { User, Mail, Lock, Building, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * User Registration Form - Super Admin Component
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T22:49:10.772Z
 * Features: Complete form validation, real-time feedback, professional design
 */

interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  company: string;
  department: string;
  phone: string;
  timezone: string;
}

export const UserRegistrationForm: React.FC<{
  onSubmit: (data: UserRegistrationData) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserRegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    company: '',
    department: '',
    phone: '',
    timezone: 'UTC',
  });

  const [errors, setErrors] = useState<Partial<UserRegistrationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserRegistrationData> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
    console.error('Error:', error);
  } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof UserRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
    >
      <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <User className="w-6 h-6 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span>Register New User</span>
        </h2>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <X className="w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Personal Information */}
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-white/20'}`}
                placeholder="Enter first name"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-white/20'}`}
                placeholder="Enter last name"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Email Address *</label>
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-white/20'}`}
                placeholder="Enter email address"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            Account Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Password *</label>
              <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-white/20'}`}
                  placeholder="Enter password"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                Confirm Password *
              </label>
              <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={e => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-white/20'}`}
                  placeholder="Confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            Company Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Company *</label>
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                value={formData.company}
                onChange={e => handleInputChange('company', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company ? 'border-red-500' : 'border-white/20'}`}
                placeholder="Enter company name"
              />
            </div>
            {errors.company && <p className="mt-1 text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errors.company}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Role</label>
              <select
                value={formData.role}
                onChange={e => handleInputChange('role', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="Customer">Customer</option>
                <option value="Operator">Operator</option>
                <option value="Manager">Manager</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={e => handleInputChange('department', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                placeholder="Enter department"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Timezone</label>
            <select
              value={formData.timezone}
              onChange={e => handleInputChange('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span>Creating User...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Create User</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default UserRegistrationForm;
}