import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Smartphone, 
  Wifi,
  MapPin,
  Camera,
  Mic,
  Hand
} from 'lucide-react';

const MobileTechnologyPage: React.FC = () => {
  const mobileFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive mobile applications designed for optimal performance on all devices.",
      features: ["iOS Apps", "Android Apps", "Responsive Web", "Progressive Web Apps"]
    },
    {
      icon: Globe,
      title: "Cross-Platform",
      description: "Unified mobile experience across different platforms and operating systems.",
      features: ["React Native", "Flutter", "Hybrid Apps", "Web Technologies"]
    },
    {
      icon: Wifi,
      title: "Offline Capability",
      description: "Full functionality even when offline with intelligent data synchronization.",
      features: ["Offline Storage", "Data Sync", "Background Updates", "Conflict Resolution"]
    },
    {
      icon: Hand,
      title: "Touch Optimization",
      description: "Intuitive touch interfaces optimized for mobile logistics operations.",
      features: ["Gesture Support", "Touch Feedback", "Accessibility", "User Experience"]
    }
  ];

  const mobileCapabilities = [
    {
      title: "GPS Tracking",
      description: "Real-time location tracking and navigation",
      icon: MapPin
    },
    {
      title: "Camera Integration",
      description: "Document scanning and image capture",
      icon: Camera
    },
    {
      title: "Voice Commands",
      description: "Hands-free operation with voice recognition",
      icon: Mic
    },
    {
      title: "Push Notifications",
      description: "Real-time alerts and notifications",
      icon: Hand
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100 responsive-container">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 text-white responsive-container">
        <div className="absolute inset-0 bg-black/20 responsive-container"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center responsive-container"
          >
            <div className="flex justify-center mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-2xl responsive-container">
                <Globe className="h-16 w-16 text-white responsive-container" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent responsive-container">
              Mobile Technology
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto responsive-container">
              Mobile-first solutions that provide seamless logistics management 
              on any device, anywhere, anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mobile Features Section */}
      <section className="py-20 bg-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Mobile Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Our mobile technology platform delivers comprehensive logistics management 
              capabilities optimized for mobile devices and field operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 responsive-container">
            {mobileFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200 responsive-container"
              >
                <div className="flex items-center mb-6 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl mr-4 responsive-container">
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
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 responsive-container"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Capabilities Section */}
      <section className="py-20 bg-gray-50 responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 responsive-container"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 responsive-container">
              Mobile Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Advanced mobile capabilities that enhance field operations and 
              provide real-time logistics management on the go.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
            {mobileCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center responsive-container"
              >
                <div className="flex justify-center mb-4 responsive-container">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl responsive-container">
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

      {/* Mobile Stats Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center responsive-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">100%</div>
              <div className="text-cyan-100 responsive-container">Mobile Coverage</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">&lt; 2s</div>
              <div className="text-cyan-100 responsive-container">Load Time</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">50+</div>
              <div className="text-cyan-100 responsive-container">Device Support</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 responsive-container">24/7</div>
              <div className="text-cyan-100 responsive-container">Access</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileTechnologyPage;
}