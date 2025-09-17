import { motion } from 'framer-motion';
import { Brain, Shield, Globe, TrendingUp, Target, Lightbulb, Rocket } from 'lucide-react';

export function FeaturesSection() {
  const problemSolutions = [
    {
      problem: 'Manual Route Planning',
      solution: 'AI-Powered Optimization',
      description:
        'Stop wasting hours on inefficient routes. Our AI analyzes traffic, weather, and historical data to create optimal paths in seconds.',
      icon: <Target className="w-8 h-8 responsive-container" />,
      color: 'blue',
      impact: '67% faster delivery',
    },
    {
      problem: 'Unpredictable Demand',
      solution: 'Predictive Intelligence',
      description:
        'Never run out of capacity or overbook again. Our AI predicts demand patterns with 94% accuracy, helping you scale intelligently.',
      icon: <Brain className="w-8 h-8 responsive-container" />,
      color: 'purple',
      impact: '94% accuracy',
    },
    {
      problem: 'Fragmented Systems',
      solution: 'Unified Platform',
      description:
        'Connect all your logistics operations in one intelligent ecosystem. No more switching between 10+ different tools.',
      icon: <Globe className="w-8 h-8 responsive-container" />,
      color: 'green',
      impact: 'One platform',
    },
    {
      problem: 'Reactive Operations',
      solution: 'Proactive Automation',
      description:
        'Transform from reactive to proactive. Our AI agents work 24/7 to prevent issues before they impact your business.',
      icon: <Rocket className="w-8 h-8 responsive-container" />,
      color: 'orange',
      impact: '24/7 automation',
    },
  ];

  const innovations = [
    {
      title: 'Autonomous Decision Making',
      description:
        'Our AI agents make complex logistics decisions in real-time, from load matching to route optimization, without human intervention.',
      icon: <Brain className="w-6 h-6 responsive-container" />,
      color: 'cyan',
    },
    {
      title: 'Predictive Maintenance',
      description:
        'Prevent breakdowns before they happen. Our AI predicts equipment failures with 98% accuracy, saving millions in downtime.',
      icon: <Shield className="w-6 h-6 responsive-container" />,
      color: 'green',
    },
    {
      title: 'Dynamic Pricing',
      description:
        'Maximize revenue with AI-driven pricing that adapts to market conditions, demand patterns, and competitor analysis.',
      icon: <TrendingUp className="w-6 h-6 responsive-container" />,
      color: 'purple',
    },
    {
      title: 'Carbon Optimization',
      description:
        'Reduce your environmental impact while cutting costs. Our AI optimizes for both efficiency and sustainability.',
      icon: <Lightbulb className="w-6 h-6 responsive-container" />,
      color: 'emerald',
    },
  ];

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <section className="py-20 bg-white responsive-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 responsive-container"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 responsive-container">
            From <span className="text-red-500 responsive-container">Problems</span> to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent responsive-container">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed responsive-container">
            See how TransBot AI transforms the biggest challenges in logistics into competitive
            advantages.
          </p>
        </motion.div>

        {/* Problem-Solution Pairs */}
        <div className="space-y-16 mb-20 responsive-container">
          {problemSolutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
            >
              {/* Problem Side */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 responsive-container">
                  <div className="flex items-center gap-3 mb-4 responsive-container">
                    <div className="w-3 h-3 bg-red-500 rounded-full responsive-container"></div>
                    <span className="text-red-600 font-semibold text-sm uppercase tracking-wide responsive-container">
                      The Problem
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 responsive-container">{item.problem}</h3>
                  <p className="text-gray-600 leading-relaxed responsive-container">
                    Traditional logistics operations struggle with manual processes, unpredictable
                    demand, and fragmented systems that lead to inefficiencies and lost
                    opportunities.
                  </p>
                </div>
              </div>

              {/* Solution Side */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 responsive-container">
                  <div className="flex items-center gap-3 mb-4 responsive-container">
                    <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                    <span
                      className={`text-${item.color}-600 font-semibold text-sm uppercase tracking-wide`}
                    >
                      Our Solution
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 responsive-container">
                    <div className={`p-3 rounded-xl bg-${item.color}-100 text-${item.color}-600`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 responsive-container">{item.solution}</h3>
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-${item.color}-100 text-${item.color}-700 mt-2`}
                      >
                        {item.impact}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed responsive-container">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Innovation Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 responsive-container"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4 responsive-container">
            Revolutionary{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent responsive-container">
              AI Innovations
            </span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto responsive-container">
            Experience the cutting-edge technologies that set TransBot AI apart from traditional
            logistics platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container">
          {innovations.map((innovation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 responsive-container"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-${innovation.color}-100 text-${innovation.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {innovation.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors responsive-container">
                {innovation.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed responsive-container">{innovation.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16 responsive-container"
        >
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white responsive-container">
            <h3 className="text-2xl font-bold mb-4 responsive-container">Ready to Transform Your Logistics?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto responsive-container">
              Join the logistics revolution. Experience the power of AI-driven operations that
              deliver measurable results from day one.
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
