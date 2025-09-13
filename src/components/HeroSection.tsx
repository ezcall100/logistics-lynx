import { motion } from 'framer-motion';
import {
  Brain,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Truck,
  TrendingUp,
  Users,
  CheckCircle,
  Sparkles,
  Target,
  Clock,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [agentCount, setAgentCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    <section className="relative pt-20 pb-16 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating AI Nodes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div
          className="absolute bottom-32 left-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 right-1/4 w-5 h-5 bg-green-400 rounded-full animate-pulse opacity-40"
          style={{ animationDelay: '1.5s' }}
        ></div>

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <motion.line
            x1="10%"
            y1="20%"
            x2="30%"
            y2="40%"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />
          <motion.line
            x1="70%"
            y1="30%"
            x2="90%"
            y2="60%"
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Innovation Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm mb-6"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-semibold">NEXT-GEN AI</span>
              <span className="text-white">LOGISTICS PLATFORM</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">The Future of</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Logistics
              </span>
              <br />
              <span className="text-white">is Here</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              {isVisible && (
                <span className="text-cyan-400 font-semibold">
                  {agentCount} autonomous AI agents
                </span>
              )}{' '}
              are revolutionizing how the world moves goods. Experience unprecedented efficiency,
              predictive intelligence, and seamless automation.
            </motion.p>

            {/* Key Value Propositions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
            >
              {[
                {
                  icon: <Target className="w-5 h-5" />,
                  text: 'Precision Optimization',
                  metric: '99.7%',
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  text: 'Real-time Decisions',
                  metric: '<1ms',
                },
                {
                  icon: <TrendingUp className="w-5 h-5" />,
                  text: 'Revenue Growth',
                  metric: '+47%',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-cyan-400 flex-shrink-0 p-2 rounded-lg bg-cyan-400/10">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{item.text}</div>
                    <div className="text-cyan-400 font-bold text-lg">{item.metric}</div>
                  </div>
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
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 text-white border-2 border-white/30 font-semibold px-8 py-4 rounded-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-lg backdrop-blur-sm"
              >
                <Play className="w-5 h-5" />
                <span>See AI in Action</span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div>
                  <span className="text-white font-bold text-lg">4.9/5</span>
                  <span className="text-gray-300 ml-1">(2,847 reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Trusted by Fortune 500 companies</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - AI Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* AI Brain Visualization */}
              <div className="w-96 h-96 relative">
                {/* Central AI Core */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                    <Brain className="w-16 h-16 text-white" />
                  </div>
                </motion.div>

                {/* Orbiting Elements */}
                {[
                  { icon: <Truck className="w-6 h-6" />, color: 'blue', delay: 0 },
                  { icon: <Zap className="w-6 h-6" />, color: 'yellow', delay: 0.5 },
                  { icon: <Shield className="w-6 h-6" />, color: 'green', delay: 1 },
                  { icon: <Users className="w-6 h-6" />, color: 'purple', delay: 1.5 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: item.delay,
                    }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`w-12 h-12 rounded-full bg-${item.color}-500 flex items-center justify-center text-white shadow-lg`}
                      >
                        {item.icon}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Data Flow Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {[0, 90, 180, 270].map((angle, index) => (
                    <motion.line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`}
                      y2={`${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`}
                      stroke="url(#neuralGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        delay: index * 0.5,
                      }}
                    />
                  ))}
                </svg>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="text-cyan-400 font-bold text-2xl">250</div>
                <div className="text-white text-sm">AI Agents</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              >
                <div className="text-green-400 font-bold text-2xl">99.9%</div>
                <div className="text-white text-sm">Uptime</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
