import { motion } from 'framer-motion'

const companies = [
  'Coyote Logistics',
  'OTR Solutions', 
  'Compass Payment Services',
  'Fleet One',
  'ACME Logistics',
  'Comdata',
  'Teletrac Navman',
  'Geotab'
]

export function TrustedBy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 bg-[#0F1436]"
    >
      <div className="container-pro text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-8">
            TRUSTED BY 2000+ MCs
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center justify-center h-12"
              >
                <div className="text-white/40 text-sm font-medium hover:text-white/60 transition-colors">
                  {company}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}