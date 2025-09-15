import React from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';

const EdgeComputingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100">
      <section className="relative overflow-hidden bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl shadow-2xl">
                <Server className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
              Edge Computing
            </h1>
            <p className="text-xl md:text-2xl text-violet-100 mb-8 max-w-3xl mx-auto">
              Real-time edge processing that brings computing power closer to data sources 
              for faster response times and reduced latency.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Coming Soon
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This page is under development. Edge Computing technology will provide 
            real-time processing capabilities at the edge of the network.
          </p>
        </div>
      </section>
    </div>
  );
};

export default EdgeComputingPage;
