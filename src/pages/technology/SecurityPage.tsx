import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Key,
  Database,
  Network,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const SecurityPage: React.FC = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Multi-layered security architecture designed for enterprise-grade protection.",
      features: ["Firewall Protection", "Intrusion Detection", "DDoS Mitigation", "Security Monitoring"]
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "End-to-end encryption for all data transmission and storage operations.",
      features: ["AES-256 Encryption", "SSL/TLS Security", "Data at Rest", "Data in Transit"]
    },
    {
      icon: Key,
      title: "Access Control",
      description: "Advanced authentication and authorization systems for secure access management.",
      features: ["Multi-Factor Authentication", "Role-Based Access", "Single Sign-On", "Identity Management"]
    },
    {
      icon: Database,
      title: "Compliance",
      description: "Full compliance with industry standards and regulatory requirements.",
      features: ["SOC 2 Type II", "ISO 27001", "GDPR Compliance", "HIPAA Ready"]
    }
  ];

  const securityCapabilities = [
    {
      title: "Threat Detection",
      description: "Advanced threat detection and prevention systems",
      icon: AlertTriangle
    },
    {
      title: "Audit Trails",
      description: "Comprehensive logging and audit trail capabilities",
      icon: Eye
    },
    {
      title: "Network Security",
      description: "Secure network infrastructure and protocols",
      icon: Network
    },
    {
      title: "Security Validation",
      description: "Regular security assessments and penetration testing",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 responsive-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-900 via-orange-900 to-yellow-900 text-white responsive-container">
        <div className="absolute inset-0 bg-black/20 responsive-container"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center responsive-container"
          >
            <div className="flex justify-center mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl shadow-2xl responsive-container">
                <Shield className="h-16 w-16 text-white responsive-container" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent responsive-container">
              Security
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto responsive-container">
              Enterprise-grade security with multi-layered protection, advanced encryption, 
              and comprehensive compliance for your logistics data and operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-20 bg-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Security Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Our comprehensive security framework protects your logistics operations 
              with enterprise-grade security measures and compliance standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200 responsive-container"
              >
                <div className="flex items-center mb-6 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl mr-4 responsive-container">
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
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 responsive-container"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Capabilities Section */}
      <section className="py-20 bg-gray-50 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Security Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Advanced security capabilities that ensure the highest level of protection 
              for your logistics operations and data.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {securityCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center responsive-container"
              >
                <div className="flex justify-center mb-4 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl responsive-container">
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

      {/* Security Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center responsive-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">256-bit</div>
              <div className="text-red-100 responsive-container">Encryption</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">99.9%</div>
              <div className="text-red-100 responsive-container">Uptime</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">0</div>
              <div className="text-red-100 responsive-container">Data Breaches</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">24/7</div>
              <div className="text-red-100 responsive-container">Monitoring</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;