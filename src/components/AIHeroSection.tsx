import { motion } from 'framer-motion'
import { Brain, ArrowRight, Play, Activity } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NeuralNetwork } from './NeuralNetwork'

export function AIHeroSection() {
  const [agentCount, setAgentCount] = useState(0)
  const [activeTasks, setActiveTasks] = useState<string[]>([])

  useEffect(() => {
    // Animate agent count to 250
    const timer = setTimeout(() => {
      let count = 0
      const interval = setInterval(() => {
        count += 2
        setAgentCount(count)
        if (count >= 250) {
          clearInterval(interval)
          setAgentCount(250)
        }
      }, 30)
      return () => clearInterval(interval)
    }, 500)

    // Simulate active tasks
    const taskInterval = setInterval(() => {
      const tasks = [
        'Optimizing 1,247 routes in real-time',
        'Processing 15.3M data points',
        'Predicting demand for 847 loads',
        'Automating 23 workflow processes',
        'Learning from 2.1M interactions',
        'Generating 156 insights',
        'Managing 89 active shipments',
        'Analyzing 3.4TB of logistics data'
      ]
      
      setActiveTasks(prev => {
        const newTasks = [...prev]
        if (newTasks.length < 4) {
          newTasks.push(tasks[Math.floor(Math.random() * tasks.length)])
        } else {
          newTasks.shift()
          newTasks.push(tasks[Math.floor(Math.random() * tasks.length)])
        }
        return newTasks
      })
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(taskInterval)
    }
  }, [])

  return (
    <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
      {/* Advanced AI Background */}
      <div className="absolute inset-0">
        {/* Quantum Grid */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        
        {/* Floating AI Orbs */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-transbot-cyan rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      <div className="container-pro relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - AI Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full holographic-glass text-sm mb-6 animate-holographic"
            >
              <Brain className="w-4 h-4 text-transbot-cyan" />
              <span className="gradient-text-cyan font-semibold">250 AI AGENTS</span>
              <span className="text-white">WORKING 24/7</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">Trans Bot AI</span>
              <br />
              <span className="text-white">Powered by</span>
              <br />
              <span className="gradient-text-cyan">{agentCount} AI Agents</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-white/80 mb-8 max-w-2xl"
            >
              Our neural network of 250 specialized AI agents works continuously to optimize your trucking operations, predict market trends, and automate complex logistics decisions.
            </motion.p>

            {/* Active Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-transbot-cyan" />
                <span className="text-white font-semibold">Live AI Activity:</span>
              </div>
              {activeTasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 p-3 rounded-lg holographic-glass hover:scale-105 transition-transform"
                >
                  <div className="w-2 h-2 bg-transbot-cyan rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm">{task}</span>
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
                className="btn-primary flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Experience AI Power</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>Watch AI Demo</span>
              </motion.button>
            </motion.div>

            {/* AI Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-4"
            >
              <div className="text-center p-3 rounded-lg holographic-glass">
                <div className="text-2xl font-bold gradient-text-cyan">250</div>
                <div className="text-xs text-white/60">AI Agents</div>
              </div>
              <div className="text-center p-3 rounded-lg holographic-glass">
                <div className="text-2xl font-bold gradient-text-blue">99.9%</div>
                <div className="text-xs text-white/60">Uptime</div>
              </div>
              <div className="text-center p-3 rounded-lg holographic-glass">
                <div className="text-2xl font-bold gradient-text-cyan">24/7</div>
                <div className="text-xs text-white/60">Active</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Neural Network */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-2xl">
              <NeuralNetwork />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
