import React from 'react'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Logistics: 2024 Trends",
      excerpt: "Discover how artificial intelligence is revolutionizing the logistics industry with cutting-edge technologies and automation.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Route Optimization: Saving 25% on Fuel Costs",
      excerpt: "Learn how our AI-powered route optimization algorithms help companies reduce fuel consumption and improve efficiency.",
      author: "Mike Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Optimization",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Building the Next Generation TMS Platform",
      excerpt: "An inside look at how we're building the most advanced transportation management system with 250 AI agents.",
      author: "Alex Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Platform",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop"
    }
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 responsive-container">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="text-center responsive-container">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 responsive-container">
              Trans Bot AI Blog
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto responsive-container">
              Insights, trends, and innovations in logistics technology
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 responsive-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 responsive-container">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 responsive-container">
              <div className="aspect-video bg-gradient-to-r from-blue-400 to-purple-500 relative responsive-container">
                <div className="absolute inset-0 bg-black/20 responsive-container"></div>
                <div className="absolute top-4 left-4 responsive-container">
                  <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium responsive-container">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 responsive-container">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4 responsive-container">
                  <div className="flex items-center space-x-1 responsive-container">
                    <User className="w-4 h-4 responsive-container" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1 responsive-container">
                    <Calendar className="w-4 h-4 responsive-container" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1 responsive-container">
                    <Clock className="w-4 h-4 responsive-container" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors responsive-container">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 leading-relaxed responsive-container">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center space-x-2 text-blue-600 font-medium hover:text-blue-700 transition-colors responsive-container" aria-label="Button">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 responsive-container" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
