
import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          The Future of
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Logistics</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Enterprise-grade transportation management powered by AI. Streamline operations, 
          reduce costs, and scale your logistics business with intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Start Free Trial</Button>
          </Link>
          <button className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-all duration-200">
            <Play className="w-5 h-5" />
            <span>Watch Demo</span>
          </button>
        </div>
      </div>
    </section>
  );
};
