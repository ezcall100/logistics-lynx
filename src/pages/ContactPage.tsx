import React from 'react'
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from 'lucide-react'

const ContactPage: React.FC = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@transbotai.com",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      contact: "+1 (555) 123-4567",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 24/7",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "San Francisco, CA",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const offices = [
    {
      city: "San Francisco",
      address: "123 Tech Street, San Francisco, CA 94105",
      phone: "+1 (555) 123-4567",
      email: "sf@transbotai.com"
    },
    {
      city: "New York",
      address: "456 Business Ave, New York, NY 10001",
      phone: "+1 (555) 234-5678",
      email: "ny@transbotai.com"
    },
    {
      city: "London",
      address: "789 Innovation Road, London, UK EC1A 1BB",
      phone: "+44 20 7123 4567",
      email: "london@transbotai.com"
    }
  ]

  return (
    <div className="pt-16 min-h-screen responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-7xl mx-auto px-6 py-20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <h1 className="text-6xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
            Get in touch with our team. We're here to help you succeed.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 hover:scale-105 text-center responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-500`}>
                <method.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                {method.title}
              </h3>
              <p className="text-gray-300 text-sm mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                {method.description}
              </p>
              <p className="text-cyan-400 font-semibold responsive-container sm:flex-col md:flex-row lg:grid">
                {method.contact}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Send us a Message</h3>
            <form className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors resize-none responsive-container sm:flex-col md:flex-row lg:grid"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
                <Send className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-2xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Our Offices</h3>
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <h4 className="text-xl font-bold text-white mb-3 responsive-container sm:flex-col md:flex-row lg:grid">{office.city}</h4>
                <div className="space-y-2 text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <MapPin className="w-4 h-4 text-cyan-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Phone className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Mail className="w-4 h-4 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>{office.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-center space-x-3 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <Clock className="w-6 h-6 text-cyan-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Support Hours</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h4 className="text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Live Chat</h4>
              <p>24/7 Available</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Phone Support</h4>
              <p>Mon-Fri: 9AM-6PM PST</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Email Support</h4>
              <p>Response within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
}