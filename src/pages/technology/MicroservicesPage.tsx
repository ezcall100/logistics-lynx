import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const MicroservicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-pink-100">
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-900 via-pink-900 to-purple-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-2xl">
                <Layers className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
              Microservices
            </h1>
            <p className="text-xl md:text-2xl text-rose-100 mb-8 max-w-3xl mx-auto">
              Scalable microservices architecture that enables flexible, maintainable, 
              and independently deployable logistics applications.
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
            This page is under development. Microservices architecture will provide 
            scalable and maintainable application development capabilities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MicroservicesPage;
