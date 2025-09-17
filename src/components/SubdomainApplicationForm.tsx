import React from 'react';
import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { subdomainService } from '../services/subdomainService'

interface ApplicationFormData {
  companyName: string
  industry: string
  companySize: string
  useCase: string
  requestedPortals: string[]
  customDomain?: string
  contactEmail: string
  contactName: string
  phoneNumber: string
}

const PORTAL_OPTIONS = [
  { id: 'dashboard', name: 'Dashboard Portal', description: 'Main control center' },
  { id: 'broker', name: 'Broker Portal', description: 'Load management and carrier connections' },
  { id: 'carrier', name: 'Carrier Portal', description: 'Fleet and route management' },
  { id: 'shipper', name: 'Shipper Portal', description: 'Shipment tracking and management' },
  { id: 'driver', name: 'Driver Portal', description: 'Mobile driver interface' },
  { id: 'analytics', name: 'Analytics Portal', description: 'Business intelligence and reporting' },
  { id: 'financials', name: 'Financials Portal', description: 'Billing and payment management' },
  { id: 'crm', name: 'CRM Portal', description: 'Customer relationship management' },
  { id: 'load-board', name: 'Load Board Portal', description: 'Load posting and matching' },
  { id: 'marketplace', name: 'Marketplace Portal', description: 'Trading and marketplace features' },
  { id: 'autonomous', name: 'Autonomous Portal', description: 'AI-powered automation' },
  { id: 'yms', name: 'Yard Management Portal', description: 'Yard and dock management' },
  { id: 'directory', name: 'Directory Portal', description: 'Industry directory and networking' },
  { id: 'rates', name: 'Rates Portal', description: 'Rate management and pricing' },
  { id: 'edi', name: 'EDI Portal', description: 'Electronic data interchange' },
  { id: 'factoring', name: 'Factoring Portal', description: 'Invoice factoring services' },
  { id: 'onboarding', name: 'Onboarding Portal', description: 'User and partner onboarding' },
  { id: 'tms-admin', name: 'TMS Admin Portal', description: 'System administration' },
  { id: 'owner-operator', name: 'Owner-Operator Portal', description: 'Independent contractor tools' },
  { id: 'shipper-admin', name: 'Shipper Admin Portal', description: 'Shipper administration' },
  { id: 'broker-admin', name: 'Broker Admin Portal', description: 'Broker administration' },
  { id: 'carrier-admin', name: 'Carrier Admin Portal', description: 'Carrier administration' },
  { id: 'customer', name: 'Customer Portal', description: 'End customer interface' },
  { id: 'partner', name: 'Partner Portal', description: 'Partner and vendor management' },
  { id: 'developer', name: 'Developer Portal', description: 'API and integration tools' }
]

const INDUSTRY_OPTIONS = [
  'Transportation & Logistics',
  'Manufacturing',
  'Retail & E-commerce',
  'Food & Beverage',
  'Healthcare & Pharmaceuticals',
  'Automotive',
  'Construction',
  'Energy & Utilities',
  'Technology',
  'Agriculture',
  'Other'
]

const COMPANY_SIZE_OPTIONS = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
]

export function SubdomainApplicationForm() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    companyName: '',
    industry: '',
    companySize: '',
    useCase: '',
    requestedPortals: [],
    customDomain: '',
    contactEmail: '',
    contactName: '',
    phoneNumber: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [subdomainSuggestions, setSubdomainSuggestions] = useState<string[]>([])

  const handleInputChange = (field: keyof ApplicationFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Generate subdomain suggestions when company name changes
    if (field === 'companyName' && typeof value === 'string') {
      const suggestions = subdomainService.generateSubdomainSuggestions(value)
      setSubdomainSuggestions(suggestions)
    }
  }

  const handlePortalToggle = (portalId: string) => {
    setFormData(prev => ({
      ...prev,
      requestedPortals: prev.requestedPortals.includes(portalId)
        ? prev.requestedPortals.filter(id => id !== portalId)
        : [...prev.requestedPortals, portalId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await subdomainService.submitApplication({
        email: formData.contactEmail,
        companyName: formData.companyName,
        industry: formData.industry,
        companySize: formData.companySize,
        useCase: formData.useCase,
        requestedPortals: formData.requestedPortals,
        customDomain: formData.customDomain
      })
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Application submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <CheckCircle className="w-10 h-10 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-transbot-text-primary mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            Application Submitted Successfully!
          </h2>
          
          <p className="text-transbot-text-secondary mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            Thank you for your interest in Trans Bot AI. Our team will review your application 
            and get back to you within 24-48 hours with your custom subdomain and portal access.
          </p>
          
          <div className="bg-slate-50 rounded-xl p-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="font-semibold text-transbot-text-primary mb-3 responsive-container sm:flex-col md:flex-row lg:grid">What happens next?</h3>
            <div className="space-y-2 text-sm text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid">
              <div>1. Our team reviews your application</div>
              <div>2. We create your custom subdomain (e.g., {formData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.transbotai.com)</div>
              <div>3. We set up your requested portals</div>
              <div>4. You receive login credentials and setup instructions</div>
            </div>
          </div>
          
          <button
            onClick={() = aria-label="Button"> setIsSubmitted(false)}
            className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-transbot-lg transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            Submit Another Application
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 responsive-container sm:flex-col md:flex-row lg:grid"
    >
      <div className="text-center mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <h1 className="text-3xl font-bold text-transbot-text-primary mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
          Get Your Custom Trans Bot AI Portal
        </h1>
        <p className="text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid">
          Create your own branded subdomain with access to our 25 specialized portals
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Company Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              placeholder="Enter your company name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              Industry *
            </label>
            <select
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              required
            >
              <option value="">Select your industry</option>
              {INDUSTRY_OPTIONS.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              Contact Name *
            </label>
            <input
              type="text"
              value={formData.contactName}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              placeholder="your@company.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            Company Size *
          </label>
          <select
            value={formData.companySize}
            onChange={(e) => handleInputChange('companySize', e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
            required
          >
            <option value="">Select company size</option>
            {COMPANY_SIZE_OPTIONS.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Use Case */}
        <div>
          <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            How do you plan to use Trans Bot AI? *
          </label>
          <textarea
            value={formData.useCase}
            onChange={(e) => handleInputChange('useCase', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
            placeholder="Describe your logistics challenges and how Trans Bot AI can help..."
            required
          />
        </div>

        {/* Subdomain Suggestions */}
        {subdomainSuggestions.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              Suggested Subdomains
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {subdomainSuggestions.slice(0, 6).map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-50 rounded-lg text-sm text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  {suggestion}.transbotai.com
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Domain */}
        <div>
          <label className="block text-sm font-medium text-transbot-text-primary mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            Custom Domain (Optional)
          </label>
          <input
            type="text"
            value={formData.customDomain}
            onChange={(e) => handleInputChange('customDomain', e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-slate-200/50 rounded-xl text-transbot-text-primary placeholder-transbot-text-secondary focus:outline-none focus:ring-2 focus:ring-transbot-sky focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
            placeholder="yourcompany.com (if you want to use your own domain)"
          />
          <p className="text-xs text-transbot-text-secondary mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            If you have your own domain, we can set it up to point to your Trans Bot AI portal
          </p>
        </div>

        {/* Portal Selection */}
        <div>
          <label className="block text-sm font-medium text-transbot-text-primary mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            Select Portals You Need *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {PORTAL_OPTIONS.map(portal => (
              <motion.div
                key={portal.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.requestedPortals.includes(portal.id)
                    ? 'border-transbot-sky bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => handlePortalToggle(portal.id)}
              >
                <div className="flex items-start space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <input
                    type="checkbox"
                    checked={formData.requestedPortals.includes(portal.id)}
                    onChange={() => handlePortalToggle(portal.id)}
                    className="mt-1 w-4 h-4 text-transbot-sky border-slate-300 rounded focus:ring-transbot-sky responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                  <div>
                    <h4 className="font-medium text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid">{portal.name}</h4>
                    <p className="text-sm text-transbot-text-secondary responsive-container sm:flex-col md:flex-row lg:grid">{portal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.button
            type="submit"
            disabled={isSubmitting || formData.requestedPortals.length === 0}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
            ) : (
              <>
                <span>Submit Application</span>
                <ArrowRight className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              </>
            )}
          </motion.button>
          
          <p className="text-sm text-transbot-text-secondary mt-4 responsive-container sm:flex-col md:flex-row lg:grid">
            By submitting this application, you agree to our terms of service and privacy policy.
            We'll review your application and get back to you within 24-48 hours.
          </p>
        </div>
      </form>
    </motion.div>
  )
}
