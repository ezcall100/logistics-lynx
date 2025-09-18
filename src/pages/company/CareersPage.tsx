import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const CareersPage: React.FC = () => {
  const openPositions = [
    {
      title: 'Senior AI Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead the development of our next-generation AI agents for logistics automation.',
      requirements: ['PhD in AI/ML or equivalent experience', 'Experience with autonomous systems', 'Strong Python and TensorFlow skills']
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Drive product strategy and roadmap for our AI-powered logistics platform.',
      requirements: ['Experience in B2B SaaS products', 'Strong analytical skills', 'Background in logistics or supply chain']
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build and maintain our cloud infrastructure supporting 250+ AI agents.',
      requirements: ['AWS/Azure expertise', 'Kubernetes experience', 'Infrastructure as Code']
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Help customers maximize value from our AI logistics platform.',
      requirements: ['Customer-facing experience', 'Technical aptitude', 'Logistics industry knowledge']
    }
  ]

  const benefits = [
    { icon: '🏥', title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
    { icon: '💰', title: 'Competitive Salary', description: 'Top-tier compensation with equity options' },
    { icon: '🏖️', title: 'Unlimited PTO', description: 'Flexible time off to recharge and explore' },
    { icon: '📚', title: 'Learning Budget', description: 'Annual budget for courses, conferences, and books' },
    { icon: '🏠', title: 'Remote Work', description: 'Flexible work arrangements and home office stipend' },
    { icon: '🚀', title: 'Career Growth', description: 'Clear paths for advancement and skill development' }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="container mx-auto px-4 py-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h1 className="text-5xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              Join Our Team
            </h1>
            <p className="text-xl text-amber-200 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
              Help us revolutionize logistics through AI. We're building the future of supply chain automation.
            </p>
          </div>

          {/* Open Positions */}
          <div className="mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-3xl font-bold text-white text-center mb-12 responsive-container sm:flex-col md:flex-row lg:grid">Open Positions</h2>
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="grid lg:grid-cols-2 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                          {position.department}
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                          {position.location}
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                          {position.type}
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                          {position.experience}
                        </span>
                      </div>
                      <p className="text-amber-200 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{position.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 responsive-container sm:flex-col md:flex-row lg:grid">Key Requirements</h4>
                      <ul className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start responsive-container sm:flex-col md:flex-row lg:grid">
                            <svg className="w-4 h-4 text-amber-400 mr-2 mt-1 flex-shrink-0 responsive-container sm:flex-col md:flex-row lg:grid" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-amber-200 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{req}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="mt-4 bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-3xl font-bold text-white text-center mb-12 responsive-container sm:flex-col md:flex-row lg:grid">Why Join Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-4xl mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3 responsive-container sm:flex-col md:flex-row lg:grid">{benefit.title}</h3>
                  <p className="text-amber-200 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Culture */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-3xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Our Culture</h2>
              <p className="text-amber-200 mb-6 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
                We're a diverse team of innovators, problem-solvers, and logistics enthusiasts. 
                We believe in the power of AI to transform industries and create a more efficient, 
                sustainable world. Join us in building the future of logistics.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-8 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-3xl font-bold text-amber-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">50+</div>
                  <p className="text-amber-200 responsive-container sm:flex-col md:flex-row lg:grid">Team Members</p>
                </div>
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-3xl font-bold text-amber-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">15</div>
                  <p className="text-amber-200 responsive-container sm:flex-col md:flex-row lg:grid">Countries</p>
                </div>
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-3xl font-bold text-amber-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">250+</div>
                  <p className="text-amber-200 responsive-container sm:flex-col md:flex-row lg:grid">AI Agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default CareersPage