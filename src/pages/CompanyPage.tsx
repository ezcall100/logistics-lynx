import React from 'react'
import { ResponsiveContainer } from '../components/ResponsiveContainer'

const CompanyPage: React.FC = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      image: '👩‍💼',
      bio: 'Former VP of Operations at Amazon, 15+ years in logistics and supply chain management.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      image: '👨‍💻',
      bio: 'AI researcher and former Google engineer, specializing in machine learning and automation.'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of AI Research',
      image: '👩‍🔬',
      bio: 'PhD in Computer Science from MIT, leading our AI research and development initiatives.'
    },
    {
      name: 'James Thompson',
      role: 'VP of Engineering',
      image: '👨‍🔧',
      bio: 'Former Microsoft architect, building scalable systems for enterprise logistics.'
    }
  ]

  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Started with a vision to revolutionize logistics through AI' },
    { year: '2021', event: 'First AI Agent Deployed', description: 'Successfully deployed our first autonomous logistics agent' },
    { year: '2022', event: 'Series A Funding', description: 'Raised $25M to accelerate product development' },
    { year: '2023', event: 'Global Expansion', description: 'Expanded operations to 15 countries worldwide' },
    { year: '2024', event: '250 AI Agents Active', description: 'Reached milestone of 250 active AI agents managing logistics' }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              About Our Company
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              We're revolutionizing logistics through AI-powered automation, making supply chains smarter, faster, and more efficient.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-indigo-200">
                To transform global logistics through intelligent automation, making supply chains more efficient, 
                sustainable, and responsive to the needs of businesses and consumers worldwide.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-indigo-200">
                A world where logistics operations are fully autonomous, intelligent, and seamlessly integrated, 
                enabling businesses to focus on what they do best while we handle the complexity of supply chain management.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-indigo-300 font-semibold mb-4">{member.role}</p>
                  <p className="text-indigo-200 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.event}</h3>
                    <p className="text-indigo-200">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-indigo-200">
                We constantly push the boundaries of what's possible with AI and automation in logistics.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Collaboration</h3>
              <p className="text-indigo-200">
                We work closely with our clients to understand their unique challenges and deliver tailored solutions.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
              <p className="text-indigo-200">
                We strive for excellence in everything we do, from product development to customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default CompanyPage
