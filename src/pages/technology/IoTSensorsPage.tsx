import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const IoTSensorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 responsive-container">
      <section className="relative overflow-hidden bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 text-white responsive-container">
        <div className="absolute inset-0 bg-black/20 responsive-container"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center responsive-container"
          >
            <div className="flex justify-center mb-8 responsive-container">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-2xl responsive-container">
                <Target className="h-16 w-16 text-white responsive-container" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent responsive-container">
              IoT & Sensors
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto responsive-container">
              Internet of Things integration with smart sensors for real-time monitoring 
              and data collection across logistics operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white responsive-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center responsive-container">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 responsive-container">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
            This page is under development. IoT & Sensors technology will provide comprehensive 
            sensor integration and real-time data collection capabilities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default IoTSensorsPage;