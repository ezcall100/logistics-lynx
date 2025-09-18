import { motion } from 'framer-motion';
import {
  Truck,
  Package,
  MapPin,
  BarChart3,
  Users,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Brain,
  Target,
  Clock,
  TrendingUp,
  Lightbulb,
  Database,
} from 'lucide-react';

export function EcosystemGrid() {
  const ecosystemJourney = [
    {
      phase: 'Intelligence Layer',
      description: 'The brain of your operations',
      color: 'blue',
      items: [
        {
          icon: <Brain className="w-5 h-5 responsive-container" />,
          title: 'AI Decision Engine',
          desc: '250 autonomous agents making real-time decisions',
        },
        {
          icon: <Target className="w-5 h-5 responsive-container" />,
          title: 'Predictive Analytics',
          desc: 'Forecast demand, optimize routes, prevent issues',
        },
        {
          icon: <Lightbulb className="w-5 h-5 responsive-container" />,
          title: 'Smart Automation',
          desc: 'Automate complex workflows and processes',
        },
      ],
    },
    {
      phase: 'Operations Layer',
      description: 'Core logistics functions',
      color: 'green',
      items: [
        {
          icon: <Truck className="w-5 h-5 responsive-container" />,
          title: 'Fleet Management',
          desc: 'Real-time tracking, maintenance, driver management',
        },
        {
          icon: <Package className="w-5 h-5 responsive-container" />,
          title: 'Warehouse Ops',
          desc: 'Inventory optimization, automated picking, storage',
        },
        {
          icon: <MapPin className="w-5 h-5 responsive-container" />,
          title: 'Route Optimization',
          desc: 'Dynamic routing, traffic analysis, fuel efficiency',
        },
      ],
    },
    {
      phase: 'Experience Layer',
      description: 'User interfaces and interactions',
      color: 'purple',
      items: [
        {
          icon: <Users className="w-5 h-5 responsive-container" />,
          title: 'Customer Portal',
          desc: 'Real-time tracking, notifications, self-service',
        },
        {
          icon: <Smartphone className="w-5 h-5 responsive-container" />,
          title: 'Mobile Platform',
          desc: 'Access anywhere, driver apps, field operations',
        },
        {
          icon: <BarChart3 className="w-5 h-5 responsive-container" />,
          title: 'Analytics Dashboard',
          desc: 'Insights, reporting, performance metrics',
        },
      ],
    },
    {
      phase: 'Integration Layer',
      description: 'Connect with the world',
      color: 'orange',
      items: [
        {
          icon: <Globe className="w-5 h-5 responsive-container" />,
          title: 'Global Network',
          desc: '500+ carriers, shippers, partners worldwide',
        },
        {
          icon: <Database className="w-5 h-5 responsive-container" />,
          title: 'API Ecosystem',
          desc: 'Seamless integration with existing systems',
        },
        {
          icon: <Shield className="w-5 h-5 responsive-container" />,
          title: 'Security & Compliance',
          desc: 'Enterprise-grade security, SOC 2 certified',
        },
      ],
    },
  ];

  const capabilities = [
    {
      title: 'Autonomous Operations',
      description:
        'Our AI agents work independently, making decisions and taking actions without human intervention.',
      icon: <Zap className="w-6 h-6 responsive-container" />,
      color: 'cyan',
      examples: ['Route optimization', 'Load matching', 'Demand forecasting'],
    },
    {
      title: 'Predictive Intelligence',
      description:
        'Anticipate problems before they happen with advanced machine learning and pattern recognition.',
      icon: <TrendingUp className="w-6 h-6 responsive-container" />,
      color: 'purple',
      examples: ['Maintenance alerts', 'Demand spikes', 'Market changes'],
    },
    {
      title: 'Real-time Adaptation',
      description:
        'Instantly adjust to changing conditions, from traffic jams to weather disruptions.',
      icon: <Clock className="w-6 h-6 responsive-container" />,
      color: 'green',
      examples: ['Dynamic routing', 'Capacity adjustment', 'Price optimization'],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white responsive-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 responsive-container"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 responsive-container">
            The{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent responsive-container">
              TransBot AI
            </span>{' '}
            Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed responsive-container">
            A comprehensive platform that transforms every aspect of logistics operations through
            intelligent automation and seamless integration.
          </p>
        </motion.div>

        {/* Ecosystem Journey */}
        <div className="space-y-12 mb-20 responsive-container">
          {ecosystemJourney.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative responsive-container"
            >
              {/* Phase Header */}
              <div className="flex items-center gap-4 mb-8 responsive-container">
                <div
                  className={`w-12 h-12 rounded-full bg-${phase.color}-500 flex items-center justify-center text-white font-bold text-lg`}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white responsive-container">{phase.phase}</h3>
                  <p className="text-gray-300 responsive-container">{phase.description}</p>
                </div>
              </div>

              {/* Phase Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container">
                {phase.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 responsive-container"
                  >
                    <div
                      className={`inline-flex p-3 rounded-lg bg-${phase.color}-500/20 text-${phase.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors responsive-container">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed responsive-container">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Connection Line */}
              {index < ecosystemJourney.length - 1 && (
                <div className="flex justify-center mt-8 responsive-container">
                  <div className="w-px h-8 bg-gradient-to-b from-cyan-400 to-blue-400 responsive-container"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* AI Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 responsive-container"
        >
          <h3 className="text-3xl font-bold text-center mb-12 responsive-container">
            Powered by{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent responsive-container">
              Advanced AI
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 responsive-container">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 responsive-container"
              >
                <div
                  className={`inline-flex p-3 rounded-lg bg-${capability.color}-500/20 text-${capability.color}-400 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {capability.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors responsive-container">
                  {capability.title}
                </h4>
                <p className="text-gray-300 mb-4 leading-relaxed responsive-container">{capability.description}</p>
                <div className="space-y-2 responsive-container">
                  {capability.examples.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="flex items-center gap-2 text-sm text-gray-400 responsive-container"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full responsive-container"></div>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center responsive-container"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 responsive-container">
            <h3 className="text-2xl font-bold mb-4 responsive-container">Experience the Future of Logistics</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto responsive-container">
              Join thousands of companies already using TransBot AI to revolutionize their logistics
              operations and achieve unprecedented efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 responsive-container"
              >
                Explore the Platform
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 responsive-container"
              >
                See AI in Action
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}