import { motion } from 'framer-motion';
import { Star, Award, TrendingUp, Clock, Shield, Zap } from 'lucide-react';

export function TrustedBy() {
  const impactStats = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: '$2.3B',
      label: 'Cost Savings Generated',
      color: 'green',
      description: 'For our clients in 2024',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: '47%',
      label: 'Faster Delivery Times',
      color: 'blue',
      description: 'Average improvement',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      number: '99.9%',
      label: 'System Uptime',
      color: 'purple',
      description: 'Enterprise-grade reliability',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: '250',
      label: 'AI Agents Active',
      color: 'orange',
      description: 'Working 24/7 globally',
    },
  ];

  const successStories = [
    {
      company: 'Global Freight Co.',
      industry: 'International Shipping',
      challenge: 'Manual route optimization causing 30% fuel waste',
      solution: 'AI-powered dynamic routing',
      result: '67% reduction in fuel costs, $12M annual savings',
      logo: '🚛',
    },
    {
      company: 'Metro Logistics',
      industry: 'Last-Mile Delivery',
      challenge: 'Unpredictable demand leading to overcapacity',
      solution: 'Predictive demand forecasting',
      result: '89% accuracy in demand prediction, 45% efficiency gain',
      logo: '📦',
    },
    {
      company: 'FleetMax Transport',
      industry: 'Fleet Management',
      challenge: 'Reactive maintenance causing costly breakdowns',
      solution: 'Predictive maintenance AI',
      result: '78% reduction in unplanned downtime, $8M saved',
      logo: '🚚',
    },
  ];

  const companies = [
    'FedEx',
    'UPS',
    'DHL',
    'Amazon',
    'Walmart',
    'Target',
    'Home Depot',
    "Lowe's",
    'Costco',
    'Best Buy',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real{' '}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Impact
            </span>
            , Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See the measurable difference TransBot AI makes for logistics companies worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div
                className={`inline-flex p-4 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-700 font-semibold mb-2">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Success{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{story.logo}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{story.company}</h4>
                <p className="text-blue-600 font-semibold text-sm mb-4">{story.industry}</p>

                <div className="space-y-4">
                  <div>
                    <div className="text-red-600 font-semibold text-sm mb-1">Challenge:</div>
                    <p className="text-gray-600 text-sm">{story.challenge}</p>
                  </div>
                  <div>
                    <div className="text-blue-600 font-semibold text-sm mb-1">Solution:</div>
                    <p className="text-gray-600 text-sm">{story.solution}</p>
                  </div>
                  <div>
                    <div className="text-green-600 font-semibold text-sm mb-1">Result:</div>
                    <p className="text-gray-600 text-sm font-semibold">{story.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by Industry Leaders</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {company}
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 font-semibold">4.9/5</span>
              <span className="text-gray-500">(2,847 reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Award className="w-4 h-4" />
              <span className="text-sm">SOC 2 Certified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
