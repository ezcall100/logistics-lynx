import { motion } from 'framer-motion'
import { useState } from 'react'

export function DemoForm() {
  const [formData, setFormData] = useState({
    businessType: '',
    loadsPerMonth: '',
    companyName: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="max-w-md mx-auto lg:mx-0"
    >
      {/* Professional Glass Card - Like Alvys */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get a Free Demo</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Business Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What type of business?*
          </label>
          <select
            value={formData.businessType}
            onChange={(e) => setFormData({...formData, businessType: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          >
            <option value="">Select business type</option>
            <option value="carrier">Carrier</option>
            <option value="broker">Broker</option>
            <option value="shipper">Shipper</option>
            <option value="owner-operator">Owner Operator</option>
            <option value="factoring">Factoring</option>
          </select>
        </div>

        {/* Loads Per Month Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How many loads per month?*
          </label>
          <select
            value={formData.loadsPerMonth}
            onChange={(e) => setFormData({...formData, loadsPerMonth: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          >
            <option value="">Select volume</option>
            <option value="1-50">1-50 loads</option>
            <option value="51-200">51-200 loads</option>
            <option value="201-500">201-500 loads</option>
            <option value="500+">500+ loads</option>
          </select>
        </div>

        {/* Company Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name*
          </label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Enter your company name"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Continue
        </motion.button>
      </form>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        By providing a telephone number and submitting the form you are consenting to be contacted by SMS text message. 
        Message & data rates may apply. Reply STOP to opt out of further messaging.
      </p>
      </div>
    </motion.div>
  )
}
