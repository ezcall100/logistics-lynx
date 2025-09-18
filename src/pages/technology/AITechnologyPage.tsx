import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Target, 
  Eye, 
  MessageSquare,
  Cpu,
  Network,
  Activity,
  TrendingUp
} from 'lucide-react';

const AITechnologyPage: React.FC = () => {
  const aiFeatures = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Advanced machine learning algorithms that continuously learn and improve from data patterns.",
      features: ["Deep Learning", "Neural Networks", "Reinforcement Learning", "Transfer Learning"]
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "AI-powered visual recognition for automated inspection and quality control.",
      features: ["Object Detection", "Image Classification", "OCR Processing", "Video Analytics"]
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Intelligent text and speech processing for automated communication.",
      features: ["Text Analysis", "Sentiment Analysis", "Language Translation", "Voice Recognition"]
    },
    {
      icon: Target,
      title: "Predictive Analytics",
      description: "AI-driven forecasting for demand, maintenance, and route optimization.",
      features: ["Demand Forecasting", "Predictive Maintenance", "Route Optimization", "Risk Assessment"]
    }
  ];

  const aiCapabilities = [
    {
      title: "Autonomous Decision Making",
      description: "AI systems that make real-time decisions without human intervention",
      icon: Cpu
    },
    {
      title: "Pattern Recognition",
      description: "Identify complex patterns in logistics data for optimization",
      icon: Network
    },
    {
      title: "Real-time Processing",
      description: "Process massive amounts of data in real-time for instant insights",
      icon: Activity
    },
    {
      title: "Continuous Learning",
      description: "AI models that improve performance over time with more data",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 responsive-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white responsive-container">
        <div className="absolute inset-0 bg-black/20 responsive-container"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center responsive-container"
          >
            <div className="flex justify-center mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-2xl responsive-container">
                <Brain className="h-16 w-16 text-white responsive-container" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent responsive-container">
              AI Technology
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto responsive-container">
              Advanced artificial intelligence and machine learning algorithms power our intelligent logistics platform. 
              Experience the future of automated logistics management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              AI-Powered Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Our AI technology encompasses multiple domains to deliver comprehensive 
              intelligent automation across all logistics operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 responsive-container"
              >
                <div className="flex items-center mb-6 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mr-4 responsive-container">
                    <feature.icon className="h-8 w-8 text-white responsive-container" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 responsive-container">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed responsive-container">
                  {feature.description}
                </p>
                <div className="grid grid-cols-2 gap-3 responsive-container">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm text-gray-600 responsive-container">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 responsive-container"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <section className="py-20 bg-gray-50 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              AI Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Our AI systems deliver unprecedented capabilities in logistics automation 
              and optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center responsive-container"
              >
                <div className="flex justify-center mb-4 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl responsive-container">
                    <capability.icon className="h-8 w-8 text-white responsive-container" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 responsive-container">
                  {capability.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed responsive-container">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center responsive-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">95%</div>
              <div className="text-purple-100 responsive-container">Accuracy Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">10x</div>
              <div className="text-purple-100 responsive-container">Faster Processing</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">24/7</div>
              <div className="text-purple-100 responsive-container">Continuous Learning</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AITechnologyPage;
}