import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Server, 
  Shield, 
  Database,
  Network,
  Cloud,
  Cpu,
  Wifi,
  Monitor
} from 'lucide-react';

const CloudInfrastructurePage: React.FC = () => {
  const cloudFeatures = [
    {
      icon: Globe,
      title: "Global CDN",
      description: "Content delivery network spanning multiple continents for ultra-fast access worldwide.",
      features: ["Global Edge Locations", "Low Latency", "High Availability", "Automatic Failover"]
    },
    {
      icon: Server,
      title: "Auto-Scaling",
      description: "Automatically scales resources based on demand to ensure optimal performance.",
      features: ["Dynamic Scaling", "Load Balancing", "Resource Optimization", "Cost Efficiency"]
    },
    {
      icon: Database,
      title: "Multi-Cloud Deployment",
      description: "Distributed across multiple cloud providers for maximum reliability and redundancy.",
      features: ["AWS Integration", "Azure Support", "Google Cloud", "Hybrid Cloud"]
    },
    {
      icon: Shield,
      title: "99.9% Uptime",
      description: "Enterprise-grade reliability with guaranteed uptime and disaster recovery.",
      features: ["SLA Guarantee", "Disaster Recovery", "Backup Systems", "Monitoring"]
    }
  ];

  const infrastructureComponents = [
    {
      title: "Load Balancing",
      description: "Distribute traffic across multiple servers for optimal performance",
      icon: Network
    },
    {
      title: "Container Orchestration",
      description: "Kubernetes-based container management for scalable deployments",
      icon: Cpu
    },
    {
      title: "Edge Computing",
      description: "Process data closer to users for reduced latency",
      icon: Wifi
    },
    {
      title: "Real-time Monitoring",
      description: "24/7 monitoring and alerting for system health",
      icon: Monitor
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-100 responsive-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-900 via-blue-900 to-indigo-900 text-white responsive-container">
        <div className="absolute inset-0 bg-black/20 responsive-container"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center responsive-container"
          >
            <div className="flex justify-center mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-2xl responsive-container">
                <Cloud className="h-16 w-16 text-white responsive-container" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent responsive-container">
              Cloud Infrastructure
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto responsive-container">
              Scalable cloud architecture built on modern cloud platforms for global reach, 
              reliability, and enterprise-grade performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cloud Features Section */}
      <section className="py-20 bg-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Cloud Infrastructure Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Our cloud infrastructure is designed for scale, security, and performance 
              to support enterprise logistics operations worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
            {cloudFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200 responsive-container"
              >
                <div className="flex items-center mb-6 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl mr-4 responsive-container">
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
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 responsive-container"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Components Section */}
      <section className="py-20 bg-gray-50 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Infrastructure Components
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Advanced infrastructure components that power our cloud platform 
              for optimal performance and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {infrastructureComponents.map((component, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center responsive-container"
              >
                <div className="flex justify-center mb-4 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl responsive-container">
                    <component.icon className="h-8 w-8 text-white responsive-container" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 responsive-container">
                  {component.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed responsive-container">
                  {component.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center responsive-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">99.9%</div>
              <div className="text-green-100 responsive-container">Uptime SLA</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">&lt; 50ms</div>
              <div className="text-green-100 responsive-container">Response Time</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">50+</div>
              <div className="text-green-100 responsive-container">Global Regions</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">24/7</div>
              <div className="text-green-100 responsive-container">Monitoring</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudInfrastructurePage;
}