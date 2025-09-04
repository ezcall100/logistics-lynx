import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { portals } from '../data/portals'

export function EcosystemGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null)

  const categories = ['All', 'Core TMS', 'Business Operations', 'Admin']
  const filteredPortals = selectedCategory === 'All' 
    ? portals 
    : portals.filter(portal => portal.category === selectedCategory)

  return (
    <section id="ecosystem" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            The Unified <span className="text-accent">Ecosystem</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            25 integrated portals working in perfect harmony. From lead capture to final payment, 
            every aspect of logistics is unified in one intelligent operating system.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-primary'
                  : 'glass text-white/80 hover:text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portal Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPortals.map((portal, index) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredPortal(portal.id)}
              onMouseLeave={() => setHoveredPortal(null)}
              className="portal-card group cursor-pointer"
            >
              {/* Portal Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{portal.icon}</div>
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${portal.color}`} />
              </div>

              {/* Portal Info */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {portal.name}
              </h3>
              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                {portal.description}
              </p>

              {/* Category Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  portal.category === 'Core TMS' ? 'bg-blue-500/20 text-blue-300' :
                  portal.category === 'Business Operations' ? 'bg-green-500/20 text-green-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {portal.category}
                </span>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors" />
              </div>

              {/* Features Preview */}
              <div className="space-y-2">
                {portal.features.slice(0, 2).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-xs text-white/60">{feature}</span>
                  </div>
                ))}
                {portal.features.length > 2 && (
                  <div className="text-xs text-white/40">
                    +{portal.features.length - 2} more features
                  </div>
                )}
              </div>

              {/* Hover Effect */}
              {hoveredPortal === portal.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-2xl pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience the Full Ecosystem?
            </h3>
            <p className="text-white/70 mb-6">
              See how all 25 portals work together in perfect harmony. 
              From lead capture to final payment, experience the complete freight lifecycle.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2 mx-auto"
            >
              <span>Explore All Portals</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
