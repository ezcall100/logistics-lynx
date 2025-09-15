import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Database, 
  FileText,
  Users,
  Zap,
  Eye
} from 'lucide-react';

const BlockchainPage: React.FC = () => {
  const blockchainFeatures = [
    {
      icon: Shield,
      title: "Smart Contracts",
      description: "Self-executing contracts with terms directly written into code, ensuring automatic compliance.",
      features: ["Automated Execution", "Transparent Terms", "Immutable Records", "Cost Reduction"]
    },
    {
      icon: Database,
      title: "Decentralized Storage",
      description: "Distributed data storage across multiple nodes for enhanced security and reliability.",
      features: ["Data Redundancy", "No Single Point of Failure", "Global Distribution", "Enhanced Security"]
    },
    {
      icon: Lock,
      title: "Cryptographic Security",
      description: "Advanced encryption ensures data integrity and prevents unauthorized access.",
      features: ["End-to-End Encryption", "Digital Signatures", "Hash Verification", "Secure Transactions"]
    },
    {
      icon: FileText,
      title: "Immutable Records",
      description: "Once recorded, data cannot be altered, ensuring complete audit trails and transparency.",
      features: ["Tamper-Proof Records", "Complete Audit Trail", "Transparent History", "Regulatory Compliance"]
    }
  ];

  const blockchainBenefits = [
    {
      title: "Enhanced Security",
      description: "Cryptographic protection against fraud and cyber attacks",
      icon: Shield
    },
    {
      title: "Transparency",
      description: "All transactions are visible and verifiable by authorized parties",
      icon: Eye
    },
    {
      title: "Trust & Reliability",
      description: "Eliminates the need for intermediaries and builds trust",
      icon: Users
    },
    {
      title: "Cost Efficiency",
      description: "Reduces transaction costs and eliminates middlemen",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <Shield className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Blockchain Technology
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Secure, transparent, and immutable blockchain technology ensures data integrity and trust 
              across all logistics operations and transactions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blockchain Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blockchain Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our blockchain implementation provides enterprise-grade security and transparency 
              for all logistics operations and data transactions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blockchainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
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
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blockchain Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the advantages of blockchain technology in logistics management 
              and supply chain operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blockchainBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Security Uptime</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">256-bit</div>
              <div className="text-blue-100">Encryption</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">0</div>
              <div className="text-blue-100">Data Breaches</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Transparency</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlockchainPage;
