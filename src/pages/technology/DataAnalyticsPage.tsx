import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Database,
  Eye,
  Target,
  Zap
} from 'lucide-react';

const DataAnalyticsPage: React.FC = () => {
  const analyticsFeatures = [
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Live data processing and visualization for instant insights into logistics operations.",
      features: ["Live Dashboards", "Real-time Metrics", "Instant Alerts", "Performance Tracking"]
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Advanced forecasting models to predict trends and optimize logistics operations.",
      features: ["Demand Forecasting", "Route Optimization", "Risk Prediction", "Performance Forecasting"]
    },
    {
      icon: PieChart,
      title: "Business Intelligence",
      description: "Comprehensive reporting and data visualization for strategic decision making.",
      features: ["Custom Reports", "Data Visualization", "KPI Tracking", "Executive Dashboards"]
    },
    {
      icon: Activity,
      title: "Performance Monitoring",
      description: "Continuous monitoring of system performance and operational efficiency.",
      features: ["System Health", "Performance Metrics", "Efficiency Tracking", "Quality Assurance"]
    }
  ];

  const analyticsCapabilities = [
    {
      title: "Data Processing",
      description: "Process massive amounts of logistics data in real-time",
      icon: Database
    },
    {
      title: "Visualization",
      description: "Transform complex data into actionable insights",
      icon: Eye
    },
    {
      title: "Optimization",
      description: "Identify opportunities for operational improvement",
      icon: Target
    },
    {
      title: "Automation",
      description: "Automated reporting and alert systems",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-cyan-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl">
                <BarChart3 className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
              Data Analytics
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Advanced data processing and analytics capabilities that transform logistics data 
              into actionable insights for better decision making.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Analytics Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Analytics Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our analytics platform provides comprehensive data processing and visualization 
              tools for logistics optimization and performance monitoring.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {analyticsFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl mr-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Analytics Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful analytics capabilities designed to extract maximum value 
              from your logistics data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {analyticsCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                    <capability.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-emerald-100">Data Points</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-emerald-100">Accuracy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">&lt; 1s</div>
              <div className="text-emerald-100">Processing Time</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-emerald-100">Monitoring</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataAnalyticsPage;
