import React from 'react';
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
      return (
    ) => clearInterval(interval)
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

    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => {
      clearTimeout(timer)
      clearInterval(taskInterval)
    }
  }, [])

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center responsive-container">
      {/* Advanced AI Background */}
      <div className="absolute inset-0 responsive-container">
        {/* Quantum Grid */}
        <div className="absolute inset-0 opacity-20 responsive-container" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        
        {/* Floating AI Orbs */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-transbot-cyan rounded-full opacity-60 responsive-container"
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
      
      <div className="container-pro relative z-10 responsive-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center responsive-container">
          {/* Left Column - AI Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left responsive-container"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full holographic-glass text-sm mb-6 animate-holographic responsive-container"
            >
              <Brain className="w-4 h-4 text-transbot-cyan responsive-container" />
              <span className="gradient-text-cyan font-semibold responsive-container">250 AI AGENTS</span>
              <span className="text-transbot-text-primary responsive-container">WORKING 24/7</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 responsive-container"
            >
              <span className="gradient-text responsive-container">Trans Bot AI</span>
              <br />
              <span className="text-transbot-text-primary responsive-container">Powered by</span>
              <br />
              <span className="gradient-text-cyan responsive-container">{agentCount} AI Agents</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-transbot-text-primary/80 mb-8 max-w-2xl responsive-container"
            >
              Our neural network of 250 specialized AI agents works continuously to optimize your trucking operations, predict market trends, and automate complex logistics decisions.
            </motion.p>

            {/* Active Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-3 mb-8 responsive-container"
            >
              <div className="flex items-center gap-2 mb-4 responsive-container">
                <Activity className="w-5 h-5 text-transbot-cyan responsive-container" />
                <span className="text-transbot-text-primary font-semibold responsive-container">Live AI Activity:</span>
              </div>
              {activeTasks.map((task, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3 p-3 rounded-lg holographic-glass hover:scale-105 transition-transform responsive-container"
                >
                  <div className="w-2 h-2 bg-transbot-cyan rounded-full animate-pulse responsive-container"></div>
                  <span className="text-transbot-text-primary/90 text-sm responsive-container">{task}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-transbot-text-primary font-semibold shadow-transbot hover:shadow-transbot-lg transition-all duration-300 flex items-center gap-2 responsive-container"
              >
                <Brain className="w-4 h-4 responsive-container" />
                <span>Experience AI Power</span>
                <ArrowRight className="w-4 h-4 responsive-container" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/80 text-transbot-text-primary border border-slate-200/50 font-semibold hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 responsive-container"
              >
                <Play className="w-4 h-4 responsive-container" />
                <span>Watch AI Demo</span>
              </motion.button>
            </motion.div>

            {/* AI Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="grid grid-cols-3 gap-4 responsive-container"
            >
              <div className="text-center p-3 rounded-lg holographic-glass responsive-container">
                <div className="text-2xl font-bold gradient-text-cyan responsive-container">250</div>
                <div className="text-xs text-transbot-text-primary/60 responsive-container">AI Agents</div>
              </div>
              <div className="text-center p-3 rounded-lg holographic-glass responsive-container">
                <div className="text-2xl font-bold gradient-text-blue responsive-container">99.9%</div>
                <div className="text-xs text-transbot-text-primary/60 responsive-container">Uptime</div>
              </div>
              <div className="text-center p-3 rounded-lg holographic-glass responsive-container">
                <div className="text-2xl font-bold gradient-text-cyan responsive-container">24/7</div>
                <div className="text-xs text-transbot-text-primary/60 responsive-container">Active</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Neural Network */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end responsive-container"
          >
            <div className="w-full max-w-2xl responsive-container">
              <NeuralNetwork />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}