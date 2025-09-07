import React from 'react'
import { Calendar, Clock, Users, Play, ArrowRight } from 'lucide-react'

const WebinarsPage: React.FC = () => {
  const webinars = [
    {
      id: 1,
      title: "AI-Powered Route Optimization: Best Practices",
      description: "Learn how to implement AI-driven route optimization to reduce costs and improve efficiency.",
      date: "2024-02-15",
      time: "2:00 PM EST",
      duration: "45 minutes",
      attendees: 1250,
      speaker: "Dr. Sarah Johnson",
      speakerTitle: "Chief AI Officer",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Building Scalable Logistics with 250 AI Agents",
      description: "Discover how our multi-agent system revolutionizes logistics operations at scale.",
      date: "2024-01-20",
      time: "3:00 PM EST",
      duration: "60 minutes",
      attendees: 2100,
      speaker: "Mike Chen",
      speakerTitle: "Lead AI Engineer",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
      status: "recorded"
    },
    {
      id: 3,
      title: "Predictive Analytics in Transportation",
      description: "Master the art of predictive analytics to forecast demand and optimize operations.",
      date: "2024-01-10",
      time: "1:00 PM EST",
      duration: "50 minutes",
      attendees: 1800,
      speaker: "Alex Rodriguez",
      speakerTitle: "Data Science Director",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      status: "recorded"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Webinars & Events
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Learn from industry experts and discover the latest in logistics technology
            </p>
          </div>
        </div>
      </div>

      {/* Webinars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {webinars.map((webinar) => (
            <div key={webinar.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-r from-purple-400 to-blue-500 relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {webinar.status === 'upcoming' ? (
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 text-white" />
                    </button>
                  )}
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    webinar.status === 'upcoming' 
                      ? 'bg-green-500/90 text-white' 
                      : 'bg-blue-500/90 text-white'
                  }`}>
                    {webinar.status === 'upcoming' ? 'Upcoming' : 'Recorded'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-purple-600 transition-colors">
                  {webinar.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {webinar.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{webinar.time} • {webinar.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{webinar.attendees.toLocaleString()} attendees</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {webinar.speaker.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{webinar.speaker}</div>
                      <div className="text-sm text-gray-500">{webinar.speakerTitle}</div>
                    </div>
                  </div>
                  
                  <button className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors ${
                    webinar.status === 'upcoming'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    <span>{webinar.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WebinarsPage
