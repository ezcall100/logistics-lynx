import { motion } from 'framer-motion';
import { Star, Brain, Zap, Shield, ArrowRight, Play } from 'lucide-react';
import { DemoForm } from './DemoForm';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [agentCount, setAgentCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate agent count to 250
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count += 5;
        setAgentCount(count);
        if (count >= 250) {
          clearInterval(interval);
          setAgentCount(250);
        }
      }, 50);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Light Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-64 bg-blue-200 rounded-lg"></div>
          <div className="absolute top-40 right-32 w-80 h-48 bg-indigo-200 rounded-lg"></div>
          <div className="absolute bottom-32 left-1/3 w-72 h-56 bg-purple-200 rounded-lg"></div>
        </div>

        {/* Subtle floating elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-300 rounded-full opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-indigo-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-purple-300 rounded-full opacity-30"></div>

        {/* Light grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="container-pro relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Trans Bot AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 text-sm mb-6 shadow-lg"
            >
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-semibold">#1 AI-POWERED</span>
              <span className="text-gray-700">TRUCKING TMS SOFTWARE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trans Bot AI
              </span>
              <br />
              <span className="text-gray-900">Supercharges Your</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Trucking Company
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
              {isVisible && (
                <span className="text-blue-600 font-semibold">{agentCount} AI agents</span>
              )}{' '}
              working 24/7 to optimize your operations, predict demand, and automate
              decision-making.
            </motion.p>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-4 mb-8"
            >
              {[
                { icon: <Zap className="w-5 h-5" />, text: 'Book more loads, optimize capacity' },
                { icon: <Brain className="w-5 h-5" />, text: 'Leverage AI & workflow automation' },
                { icon: <Shield className="w-5 h-5" />, text: 'No-risk, easy onboarding' },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/60 backdrop-blur-sm border border-blue-100 hover:scale-105 transition-transform shadow-sm"
                >
                  <div className="text-blue-600 flex-shrink-0">{benefit.icon}</div>
                  <span className="text-gray-700 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <span>Get Free Demo</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-700 border border-gray-300 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-900 font-semibold">4.9</span>
                <span className="text-gray-600">70 reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-gray-600 text-sm">Capterra</div>
                <div className="text-gray-600 text-sm">Google</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Demo Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <DemoForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
