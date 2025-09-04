import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Zap, Globe, Shield, TrendingUp, Activity } from 'lucide-react'

interface AgentStats {
  active: number
  optimized: number
  languages: number
  uptime: number
}

export function AIAgentVisualization() {
  const [stats, setStats] = useState<AgentStats>({
    active: 176,
    optimized: 89,
    languages: 6,
    uptime: 99.9
  })

  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    speed: number
    color: string
  }>>([])

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 250 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? '#00D4FF' : '#00FF88'
    }))
    setParticles(newParticles)
  }, [])

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        active: Math.max(150, Math.min(250, prev.active + Math.floor(Math.random() * 10 - 5))),
        optimized: Math.max(80, Math.min(100, prev.optimized + Math.floor(Math.random() * 6 - 3))),
        languages: 6,
        uptime: Math.max(99.5, Math.min(100, prev.uptime + (Math.random() * 0.2 - 0.1)))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const agentTypes = [
    {
      name: 'Monitoring Agent',
      count: 45,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      description: 'Real-time system monitoring and health checks'
    },
    {
      name: 'Optimization Agent',
      count: 38,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'Performance optimization and efficiency improvements'
    },
    {
      name: 'Language Agent',
      count: 42,
      icon: Globe,
      color: 'from-purple-500 to-violet-500',
      description: 'Multi-language support and localization'
    },
    {
      name: 'Security Agent',
      count: 35,
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      description: 'Security monitoring and threat detection'
    },
    {
      name: 'Intelligence Agent',
      count: 52,
      icon: Brain,
      color: 'from-yellow-500 to-orange-500',
      description: 'AI decision making and predictive analytics'
    },
    {
      name: 'Automation Agent',
      count: 38,
      icon: Zap,
      color: 'from-cyan-500 to-blue-500',
      description: 'Workflow automation and process optimization'
    }
  ]

  return (
    <section id="ai-agents" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Powered by <span className="text-accent">250 AI Agents</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Autonomous intelligence working 24/7 to optimize every aspect of your logistics operations. 
            From real-time monitoring to predictive analytics, our AI agents never sleep.
          </p>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Active Agents', value: stats.active, suffix: '', color: 'text-accent' },
            { label: 'Optimized', value: stats.optimized, suffix: '%', color: 'text-green-400' },
            { label: 'Languages', value: stats.languages, suffix: '', color: 'text-blue-400' },
            { label: 'Uptime', value: stats.uptime, suffix: '%', color: 'text-purple-400' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl text-center"
            >
              <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}{stat.suffix}
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Agent Types Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {agentTypes.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl hover:scale-105 transition-transform group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${agent.color}`}>
                  <agent.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-accent">{agent.count}</div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {agent.name}
              </h3>
              <p className="text-white/70 text-sm">{agent.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Real-time Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Real-time Agent Activity</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm text-white/70">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { agent: 'Monitoring Agent #23', action: 'Optimized route for Load #1234', time: '2s ago' },
              { agent: 'Language Agent #15', action: 'Translated document to Spanish', time: '5s ago' },
              { agent: 'Security Agent #8', action: 'Blocked suspicious login attempt', time: '8s ago' },
              { agent: 'Optimization Agent #31', action: 'Reduced fuel costs by 12%', time: '12s ago' },
              { agent: 'Intelligence Agent #45', action: 'Predicted delivery delay', time: '15s ago' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <div>
                    <div className="text-white font-medium">{activity.agent}</div>
                    <div className="text-white/70 text-sm">{activity.action}</div>
                  </div>
                </div>
                <div className="text-white/50 text-sm">{activity.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Experience AI-Powered Logistics
            </h3>
            <p className="text-white/70 mb-6">
              See how our 250 AI agents work together to optimize your operations, 
              predict issues before they happen, and deliver unprecedented efficiency.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              See AI Agents in Action
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
