import { motion } from 'framer-motion'
import { 
  FileText, 
  BookOpen, 
  Video, 
  BarChart3, 
  Cpu, 
  MessageSquare,
  ArrowRight,
  Calendar,
  User,
  Clock,
  Star,
  Download,
  ExternalLink,
  Play,
  Book,
  Code,
  Lightbulb
} from 'lucide-react'

export default function ResourcesPage() {
  const resourceCategories = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      resources: [
        {
          title: 'Getting Started Guide',
          description: 'Learn the basics of Trans Bot AI platform',
          type: 'Guide',
          readTime: '15 min read',
          icon: Book
        },
        {
          title: 'API Reference',
          description: 'Complete API documentation and examples',
          type: 'Technical',
          readTime: '30 min read',
          icon: Code
        },
        {
          title: 'Integration Guide',
          description: 'Step-by-step integration instructions',
          type: 'Guide',
          readTime: '20 min read',
          icon: Cpu
        }
      ]
    },
    {
      icon: Video,
      title: 'Tutorials',
      description: 'Video tutorials and step-by-step guides',
      resources: [
        {
          title: 'Platform Overview',
          description: 'Complete platform walkthrough',
          type: 'Video',
          duration: '12 min',
          icon: Play
        },
        {
          title: 'Route Optimization',
          description: 'How to optimize your routes with AI',
          type: 'Video',
          duration: '8 min',
          icon: Play
        },
        {
          title: 'Analytics Dashboard',
          description: 'Understanding your data and insights',
          type: 'Video',
          duration: '10 min',
          icon: Play
        }
      ]
    },
    {
      icon: BarChart3,
      title: 'Case Studies',
      description: 'Real-world success stories and results',
      resources: [
        {
          title: 'FleetMax Logistics',
          description: 'How they increased efficiency by 40%',
          type: 'Case Study',
          readTime: '8 min read',
          icon: BarChart3
        },
        {
          title: 'Swift Transport',
          description: 'Route optimization success story',
          type: 'Case Study',
          readTime: '6 min read',
          icon: BarChart3
        },
        {
          title: 'Global Freight',
          description: 'Scaling operations with AI',
          type: 'Case Study',
          readTime: '10 min read',
          icon: BarChart3
        }
      ]
    },
    {
      icon: FileText,
      title: 'White Papers',
      description: 'Industry insights and research',
      resources: [
        {
          title: 'AI in Logistics',
          description: 'The future of AI-powered supply chains',
          type: 'White Paper',
          readTime: '25 min read',
          icon: FileText
        },
        {
          title: 'Route Optimization',
          description: 'Advanced algorithms and best practices',
          type: 'White Paper',
          readTime: '20 min read',
          icon: FileText
        },
        {
          title: 'Sustainability',
          description: 'Green logistics and carbon reduction',
          type: 'White Paper',
          readTime: '18 min read',
          icon: FileText
        }
      ]
    }
  ]

  const webinars = [
    {
      title: 'AI-Powered Logistics: The Future is Now',
      date: 'Dec 15, 2024',
      time: '2:00 PM EST',
      speaker: 'Dr. Sarah Johnson',
      role: 'Chief AI Officer',
      attendees: '1,200+',
      status: 'Upcoming'
    },
    {
      title: 'Route Optimization Best Practices',
      date: 'Dec 8, 2024',
      time: '1:00 PM EST',
      speaker: 'Mike Chen',
      role: 'Solutions Architect',
      attendees: '850+',
      status: 'Upcoming'
    },
    {
      title: 'Scaling Your Fleet Operations',
      date: 'Nov 30, 2024',
      time: '3:00 PM EST',
      speaker: 'Emily Rodriguez',
      role: 'Customer Success Manager',
      attendees: '1,100+',
      status: 'Recorded'
    }
  ]

  const blogPosts = [
    {
      title: '5 Ways AI is Transforming Logistics in 2024',
      excerpt: 'Discover how artificial intelligence is revolutionizing the logistics industry...',
      author: 'David Martinez',
      date: 'Dec 10, 2024',
      readTime: '5 min read',
      category: 'AI & Technology',
      image: '/api/placeholder/400/200'
    },
    {
      title: 'The Complete Guide to Fleet Management',
      excerpt: 'Everything you need to know about managing a modern fleet...',
      author: 'Lisa Chen',
      date: 'Dec 5, 2024',
      readTime: '8 min read',
      category: 'Fleet Management',
      image: '/api/placeholder/400/200'
    },
    {
      title: 'Sustainability in Logistics: A Practical Approach',
      excerpt: 'How to reduce your carbon footprint while improving efficiency...',
      author: 'John Smith',
      date: 'Nov 28, 2024',
      readTime: '6 min read',
      category: 'Sustainability',
      image: '/api/placeholder/400/200'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-transbot-bg-light via-white to-transbot-neutral-light">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-transbot-text-primary mb-6">
              Learning{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Resources
              </span>
            </h1>
            <p className="text-xl text-transbot-text-secondary max-w-3xl mx-auto leading-relaxed">
              Everything you need to master Trans Bot AI and optimize your logistics operations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {resourceCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-transbot-sky/10">
                    <category.icon className="w-8 h-8 text-transbot-sky" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-transbot-text-primary">{category.title}</h2>
                    <p className="text-transbot-text-secondary">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.resources.map((resource, resourceIndex) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (categoryIndex * 0.1) + (resourceIndex * 0.05) }}
                      className="group p-6 bg-white rounded-xl shadow-transbot border border-transbot-border/20 hover:shadow-transbot-lg transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-transbot-sky/10 group-hover:bg-transbot-sky/20 transition-colors duration-300">
                          <resource.icon className="w-5 h-5 text-transbot-sky" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-transbot-sky bg-transbot-sky/10 px-2 py-1 rounded">
                              {resource.type}
                            </span>
                            <span className="text-xs text-transbot-text-secondary">
                              {resource.readTime || resource.duration}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-transbot-text-primary mb-2 group-hover:text-transbot-sky transition-colors duration-300">
                            {resource.title}
                          </h3>
                          <p className="text-transbot-text-secondary text-sm mb-4">
                            {resource.description}
                          </p>
                          <div className="flex items-center gap-2 text-transbot-sky font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                            {resource.type === 'Video' ? 'Watch Now' : 'Read More'}
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
              Upcoming Webinars
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              Join our experts for live sessions and Q&A
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar, index) => (
              <motion.div
                key={webinar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-transbot border border-transbot-border/20"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-4 h-4 text-transbot-sky" />
                  <span className="text-sm text-transbot-text-secondary">{webinar.date}</span>
                  <span className="text-sm text-transbot-text-secondary">•</span>
                  <Clock className="w-4 h-4 text-transbot-sky" />
                  <span className="text-sm text-transbot-text-secondary">{webinar.time}</span>
                </div>

                <h3 className="text-xl font-bold text-transbot-text-primary mb-3">
                  {webinar.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-transbot-sky/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-transbot-sky" />
                  </div>
                  <div>
                    <div className="font-semibold text-transbot-text-primary">{webinar.speaker}</div>
                    <div className="text-sm text-transbot-text-secondary">{webinar.role}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-transbot-text-secondary" />
                    <span className="text-sm text-transbot-text-secondary">{webinar.attendees} registered</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    webinar.status === 'Upcoming' 
                      ? 'bg-transbot-teal/10 text-transbot-teal' 
                      : 'bg-transbot-sky/10 text-transbot-sky'
                  }`}>
                    {webinar.status}
                  </span>
                </div>

                <button className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  webinar.status === 'Upcoming'
                    ? 'bg-gradient-primary text-white hover:opacity-90'
                    : 'bg-transbot-neutral-light text-transbot-text-primary hover:bg-transbot-border'
                }`}>
                  {webinar.status === 'Upcoming' ? 'Register Now' : 'Watch Recording'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gradient-to-br from-transbot-sky/5 to-transbot-teal/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-transbot-text-primary mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-transbot-text-secondary">
              Industry insights, tips, and best practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-transbot border border-transbot-border/20 overflow-hidden hover:shadow-transbot-lg transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-transbot-sky/20 to-transbot-teal/20"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-transbot-sky bg-transbot-sky/10 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-xs text-transbot-text-secondary">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-transbot-text-primary mb-3 hover:text-transbot-sky transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-transbot-text-secondary mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-transbot-text-secondary" />
                      <span className="text-sm text-transbot-text-secondary">{post.author}</span>
                    </div>
                    <span className="text-sm text-transbot-text-secondary">{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">
              Need More Help?
            </h2>
            <p className="text-xl text-white/90">
              Our support team is here to help you succeed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-transbot-sky font-semibold rounded-xl hover:bg-transbot-neutral-light transition-all duration-200 shadow-transbot">
                Contact Support
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-transbot-sky transition-all duration-200">
                Join Community
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}