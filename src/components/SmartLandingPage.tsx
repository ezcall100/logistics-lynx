import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Brain, Zap, Shield, ArrowRight, Play, Activity, Users, TrendingUp } from 'lucide-react'
import { NeuralNetwork } from './NeuralNetwork'

export function SmartLandingPage() {
  const [agentCount, setAgentCount] = useState(0)
  const [liveStats, setLiveStats] = useState({
    activeUsers: 0,
    loadsProcessed: 0,
    routesOptimized: 0,
    aiInsights: 0
  })

  useEffect(() => {
    // Animate agent count to 250
    const agentTimer = setTimeout(() => {
      let count = 0
      const interval = setInterval(() => {
        count += 5
        setAgentCount(count)
        if (count >= 250) {
          clearInterval(interval)
          setAgentCount(250)
        }
      }, 50)
      return () => clearInterval(interval)
    }, 1000)

    // Simulate live statistics
    const statsInterval = setInterval(() => {
      setLiveStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        loadsProcessed: prev.loadsProcessed + Math.floor(Math.random() * 10),
        routesOptimized: prev.routesOptimized + Math.floor(Math.random() * 5),
        aiInsights: prev.aiInsights + Math.floor(Math.random() * 2)
      }))
    }, 2000)

    return () => {
      clearTimeout(agentTimer)
      clearInterval(statsInterval)
    }
  }, [])

  return (
    <div className="min-h-screen dark">
      {/* Hero Section with Live AI Agents */}
      <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
        {/* AI-Powered Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}></div>
          
          {/* Floating AI Orbs */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-60"
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
            {/* Left Column - Enhanced Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* AI Badge with Live Counter */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full transbot-card text-sm mb-6 animate-transbot"
              >
                <Brain className="w-4 h-4 text-emerald-400" />
                <span className="gradient-text-emerald font-semibold">{agentCount} AI AGENTS</span>
                <span className="text-slate-600 dark:text-slate-300">WORKING 24/7</span>
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
                <span className="text-slate-600 dark:text-slate-300">Supercharges Your</span>
                <br />
                <span className="gradient-text-teal">Trucking Company</span>
              </motion.h1>

              {/* Live Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                <div className="transbot-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text-emerald">{liveStats.activeUsers.toLocaleString()}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Active Users</div>
                </div>
                <div className="transbot-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text-teal">{liveStats.loadsProcessed.toLocaleString()}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Loads Processed</div>
                </div>
                <div className="transbot-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text-amber">{liveStats.routesOptimized.toLocaleString()}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Routes Optimized</div>
                </div>
                <div className="transbot-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text-emerald">{liveStats.aiInsights.toLocaleString()}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">AI Insights</div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
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

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="space-y-3"
              >
                {[
                  { icon: <Zap className="w-5 h-5" />, text: 'Book more loads, optimize capacity' },
                  { icon: <Brain className="w-5 h-5" />, text: 'Leverage AI & workflow automation' }, 
                  { icon: <Shield className="w-5 h-5" />, text: 'No-risk, easy onboarding' }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    className="flex items-center gap-3 p-3 rounded-lg transbot-card hover:scale-105 transition-transform"
                  >
                    <div className="text-emerald-400 flex-shrink-0">{feature.icon}</div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Live Neural Network */}
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

      {/* Live Statistics Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container-pro">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Live AI Performance</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Real-time data from our 250 AI agents working around the clock
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-8 h-8" />, label: 'Active Users', value: liveStats.activeUsers.toLocaleString(), color: 'emerald' },
              { icon: <TrendingUp className="w-8 h-8" />, label: 'Loads Processed', value: liveStats.loadsProcessed.toLocaleString(), color: 'teal' },
              { icon: <Activity className="w-8 h-8" />, label: 'Routes Optimized', value: liveStats.routesOptimized.toLocaleString(), color: 'amber' },
              { icon: <Brain className="w-8 h-8" />, label: 'AI Insights', value: liveStats.aiInsights.toLocaleString(), color: 'emerald' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="transbot-card text-center"
              >
                <div className={`text-${stat.color}-400 mb-4 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold gradient-text-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
