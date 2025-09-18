import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Bot, 
  Settings, 
  Play,
  Target,
  Clock,
  CheckCircle,
  Activity
} from 'lucide-react';

const AutomationPage: React.FC = () => {
  const automationFeatures = [
    {
      icon: Bot,
      title: "Intelligent Automation",
      description: "AI-powered automation that learns and adapts to optimize logistics operations.",
      features: ["Machine Learning", "Predictive Automation", "Adaptive Workflows", "Smart Routing"]
    },
    {
      icon: Settings,
      title: "Workflow Automation",
      description: "Automated workflows that streamline complex logistics processes and reduce manual work.",
      features: ["Process Automation", "Task Scheduling", "Conditional Logic", "Error Handling"]
    },
    {
      icon: Play,
      title: "Process Orchestration",
      description: "End-to-end process orchestration that coordinates multiple systems and workflows.",
      features: ["Multi-System Coordination", "Event-Driven Processing", "State Management", "Rollback Capabilities"]
    },
    {
      icon: Target,
      title: "Smart Triggers",
      description: "Intelligent triggers that automatically initiate actions based on conditions and events.",
      features: ["Event-Based Triggers", "Time-Based Scheduling", "Condition Monitoring", "Threshold Alerts"]
    }
  ];

  const automationCapabilities = [
    {
      title: "Rule Engine",
      description: "Powerful rule engine for complex automation logic",
      icon: Settings
    },
    {
      title: "Scheduling",
      description: "Advanced scheduling and task management",
      icon: Clock
    },
    {
      title: "Monitoring",
      description: "Real-time monitoring of automated processes",
      icon: Activity
    },
    {
      title: "Validation",
      description: "Comprehensive testing and validation of automation",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-100 responsive-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-yellow-900 via-orange-900 to-red-900 text-white responsive-container">
        <div className="absolute inset-0 bg-black/20 responsive-container"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center responsive-container"
          >
            <div className="flex justify-center mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl shadow-2xl responsive-container">
                <Zap className="h-16 w-16 text-white responsive-container" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent responsive-container">
              Automation
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-3xl mx-auto responsive-container">
              Intelligent automation that streamlines logistics operations, reduces manual work, 
              and optimizes processes for maximum efficiency and accuracy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Automation Features Section */}
      <section className="py-20 bg-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Automation Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Our automation platform provides intelligent process automation and workflow 
              orchestration for streamlined logistics operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
            {automationFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 responsive-container"
              >
                <div className="flex items-center mb-6 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl mr-4 responsive-container">
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
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 responsive-container"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automation Capabilities Section */}
      <section className="py-20 bg-gray-50 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Automation Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Advanced automation capabilities that enable intelligent process management 
              and optimization across your logistics operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {automationCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center responsive-container"
              >
                <div className="flex justify-center mb-4 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl responsive-container">
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

      {/* Automation Stats Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 to-orange-600 text-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center responsive-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">90%</div>
              <div className="text-yellow-100 responsive-container">Process Automation</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">75%</div>
              <div className="text-yellow-100 responsive-container">Time Savings</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">99.9%</div>
              <div className="text-yellow-100 responsive-container">Accuracy</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">24/7</div>
              <div className="text-yellow-100 responsive-container">Operation</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutomationPage;
}