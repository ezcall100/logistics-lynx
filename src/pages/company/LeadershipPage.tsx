import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const LeadershipPage: React.FC = () => {
  const leaders = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      image: '👩‍💼',
      bio: 'Former VP of Operations at Amazon with 15+ years in logistics and supply chain management. Sarah has led digital transformation initiatives at Fortune 500 companies and holds an MBA from Stanford.',
      expertise: ['Operations', 'Strategy', 'Digital Transformation'],
      linkedin: '#'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      image: '👨‍💻',
      bio: 'AI researcher and former Google engineer specializing in machine learning and automation. Marcus has published 20+ papers on AI applications in logistics and holds a PhD in Computer Science from MIT.',
      expertise: ['AI/ML', 'Engineering', 'Research'],
      linkedin: '#'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of AI Research',
      image: '👩‍🔬',
      bio: 'Leading AI researcher with expertise in autonomous systems and predictive analytics. Emily has led research teams at top universities and holds multiple patents in AI applications.',
      expertise: ['AI Research', 'Autonomous Systems', 'Predictive Analytics'],
      linkedin: '#'
    },
    {
      name: 'James Thompson',
      role: 'VP of Engineering',
      image: '👨‍🔧',
      bio: 'Former Microsoft architect with extensive experience in building scalable enterprise systems. James has led engineering teams of 100+ developers and specializes in cloud architecture.',
      expertise: ['Engineering', 'Cloud Architecture', 'Team Leadership'],
      linkedin: '#'
    },
    {
      name: 'Lisa Park',
      role: 'VP of Sales',
      image: '👩‍💼',
      bio: 'Sales leader with 12+ years in enterprise software sales. Lisa has consistently exceeded revenue targets and built strong relationships with Fortune 1000 companies.',
      expertise: ['Sales', 'Enterprise', 'Customer Relations'],
      linkedin: '#'
    },
    {
      name: 'David Kumar',
      role: 'VP of Product',
      image: '👨‍💼',
      bio: 'Product strategist with deep experience in logistics technology. David has launched multiple successful products and has a strong track record of understanding customer needs.',
      expertise: ['Product Strategy', 'User Experience', 'Market Research'],
      linkedin: '#'
    }
  ]

  return (
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="container mx-auto px-4 py-16 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center mb-16 responsive-container sm:flex-col md:flex-row lg:grid">
            <h1 className="text-5xl font-bold text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              Leadership Team
            </h1>
            <p className="text-xl text-violet-200 max-w-3xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
              Meet the visionary leaders driving innovation in AI-powered logistics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {leaders.map((leader, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-center mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-8xl mb-4 group-hover:scale-110 transition-transform duration-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {leader.image}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{leader.name}</h3>
                  <p className="text-violet-300 font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{leader.role}</p>
                </div>
                
                <p className="text-violet-200 mb-6 text-sm leading-relaxed responsive-container sm:flex-col md:flex-row lg:grid">
                  {leader.bio}
                </p>
                
                <div className="mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <h4 className="text-white font-semibold mb-3 responsive-container sm:flex-col md:flex-row lg:grid">Areas of Expertise</h4>
                  <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    {leader.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <a 
                    href={leader.linkedin}
                    className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <svg className="w-5 h-5 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-3xl font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Join Our Team</h2>
              <p className="text-violet-200 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                We're always looking for talented individuals who share our passion for innovation and excellence.
              </p>
              <button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-violet-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default LeadershipPage
}