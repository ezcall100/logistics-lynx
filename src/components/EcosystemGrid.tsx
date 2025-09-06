import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { portals } from '../data/portals'

export function EcosystemGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', 'Core TMS', 'Business Operations', 'Admin']
  const filteredPortals = selectedCategory === 'All' 
    ? portals 
    : portals.filter(portal => portal.category === selectedCategory)

  return (
    <section id="ecosystem" className="py-16">
      <div className="container-pro">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            The Unified <span className="text-[#00D4FF]">Ecosystem</span>
          </h2>
          <p className="subhead">
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
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ease-out ${
                selectedCategory === category
                  ? 'bg-[#00D4FF] text-[#0A0E27]'
                  : 'bg-[rgba(255,255,255,0.08)] text-[#EAF2FF]/80 hover:text-[#EAF2FF] hover:bg-[rgba(255,255,255,0.14)] border border-[rgba(255,255,255,0.15)]'
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
              className="portal-card group cursor-pointer"
            >
              {/* Portal Icon */}
              <div className="portal-card__icon">
                {portal.icon}
              </div>

              {/* Portal Info */}
              <h3 className="portal-card__title">
                {portal.name}
              </h3>
              <p className="portal-card__desc">
                {portal.description}
              </p>

              {/* Category Badge */}
              <div className="flex items-center justify-between mt-4">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  portal.category === 'Core TMS' ? 'bg-[#00D4FF]/20 text-[#00D4FF]' :
                  portal.category === 'Business Operations' ? 'bg-[#00FF88]/20 text-[#00FF88]' :
                  'bg-[#EAF2FF]/20 text-[#EAF2FF]/70'
                }`}>
                  {portal.category}
                </span>
                <ExternalLink className="w-4 h-4 text-[#EAF2FF]/40 group-hover:text-[#00D4FF] transition-colors" />
              </div>

              {/* Features Preview */}
              <div className="space-y-2 mt-4">
                {portal.features.slice(0, 2).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />
                    <span className="text-xs text-[#EAF2FF]/60">{feature}</span>
                  </div>
                ))}
                {portal.features.length > 2 && (
                  <div className="text-xs text-[#EAF2FF]/40">
                    +{portal.features.length - 2} more features
                  </div>
                )}
              </div>
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
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Ready to Experience the Full Ecosystem?
            </h3>
            <p className="text-[#EAF2FF]/70 mb-6">
              See how all 25 portals work together in perfect harmony. 
              From lead capture to final payment, experience the complete freight lifecycle.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
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
