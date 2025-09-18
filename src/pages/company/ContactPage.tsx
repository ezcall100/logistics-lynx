import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const ContactPage: React.FC = () => {
  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 responsive-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          {/* Header */}
          <div className="text-center mb-16 responsive-container">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 responsive-container">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Ready to transform your logistics operations? Get in touch with our team of experts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 responsive-container">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 responsive-container">Send us a message</h2>
              <form className="space-y-6 responsive-container">
                <div className="grid md:grid-cols-2 gap-6 responsive-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container">
                    <option>General Inquiry</option>
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Partnership</option>
                    <option>Media</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                    placeholder="Tell us about your logistics challenges..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors responsive-container"
                 aria-label="Button">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 responsive-container">
              {/* Office Locations */}
              <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
                <h3 className="text-xl font-bold text-gray-900 mb-6 responsive-container">Our Offices</h3>
                <div className="space-y-6 responsive-container">
                  <div>
                    <h4 className="font-semibold text-gray-900 responsive-container">San Francisco, CA</h4>
                    <p className="text-gray-600 responsive-container">123 Innovation Drive<br />San Francisco, CA 94105</p>
                    <p className="text-sm text-gray-500 mt-2 responsive-container">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 responsive-container">New York, NY</h4>
                    <p className="text-gray-600 responsive-container">456 Business Plaza<br />New York, NY 10001</p>
                    <p className="text-sm text-gray-500 mt-2 responsive-container">+1 (555) 987-6543</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 responsive-container">London, UK</h4>
                    <p className="text-gray-600 responsive-container">789 Tech Street<br />London, UK EC1A 1BB</p>
                    <p className="text-sm text-gray-500 mt-2 responsive-container">+44 20 7123 4567</p>
                  </div>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
                <h3 className="text-xl font-bold text-gray-900 mb-6 responsive-container">Get in Touch</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex items-center responsive-container">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 responsive-container">
                      <span className="text-blue-600 responsive-container">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 responsive-container">Email</p>
                      <p className="text-gray-600 responsive-container">hello@transbotai.com</p>
                    </div>
                  </div>
                  <div className="flex items-center responsive-container">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 responsive-container">
                      <span className="text-green-600 responsive-container">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 responsive-container">Phone</p>
                      <p className="text-gray-600 responsive-container">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center responsive-container">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4 responsive-container">
                      <span className="text-purple-600 responsive-container">💬</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 responsive-container">Live Chat</p>
                      <p className="text-gray-600 responsive-container">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-8 responsive-container">
                <h3 className="text-xl font-bold text-gray-900 mb-6 responsive-container">Business Hours</h3>
                <div className="space-y-2 responsive-container">
                  <div className="flex justify-between responsive-container">
                    <span className="text-gray-600 responsive-container">Monday - Friday</span>
                    <span className="font-semibold text-gray-900 responsive-container">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between responsive-container">
                    <span className="text-gray-600 responsive-container">Saturday</span>
                    <span className="font-semibold text-gray-900 responsive-container">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between responsive-container">
                    <span className="text-gray-600 responsive-container">Sunday</span>
                    <span className="font-semibold text-gray-900 responsive-container">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default ContactPage
}