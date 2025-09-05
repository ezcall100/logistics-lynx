import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Cpu, 
  Brain, 
  Zap, 
  Play, 
  Pause, 
  CheckCircle,
  DollarSign
} from 'lucide-react'
import { trackUserInteraction, trackAIAgentActivity } from '../../../services/webhookService'

export default function AutonomousPortal() {
  const [isAutonomousMode, setIsAutonomousMode] = useState(false)

  const handleAutonomousToggle = async () => {
    setIsAutonomousMode(!isAutonomousMode)
    await trackUserInteraction('autonomous_mode_toggled', { enabled: !isAutonomousMode })
    await trackAIAgentActivity('AutonomousSystem', 'mode_toggle', {
      autonomousId: 'AUTONOMOUS_001',
      mode: !isAutonomousMode ? 'enabled' : 'disabled',
      timestamp: new Date().toISOString()
    })
  }

  const autonomousStats = {
    activeAgents: 25,
    operationsCompleted: 1247,
    efficiencyGain: 34.5,
    costSavings: 89000,
    uptime: 99.2,
    learningCycles: 156
  }

  const stats = [
    { label: 'Active Agents', value: autonomousStats.activeAgents.toString(), icon: Brain, color: 'text-transbot-sky' },
    { label: 'Operations Completed', value: autonomousStats.operationsCompleted.toLocaleString(), icon: CheckCircle, color: 'text-transbot-teal' },
    { label: 'Efficiency Gain', value: `${autonomousStats.efficiencyGain}%`, icon: Zap, color: 'text-transbot-purple' },
    { label: 'Cost Savings', value: `$${autonomousStats.costSavings.toLocaleString()}`, icon: DollarSign, color: 'text-transbot-warning' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-transbot-text-primary mb-2">Autonomous Portal</h1>
              <p className="text-transbot-text-secondary">AI-powered autonomous operations for maximum efficiency</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAutonomousToggle}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 ${
                isAutonomousMode 
                  ? 'bg-transbot-teal text-white shadow-lg' 
                  : 'bg-transbot-sky text-white shadow-lg'
              }`}
            >
              {isAutonomousMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAutonomousMode ? 'Disable' : 'Enable'} Autonomous Mode
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <div className="text-2xl font-bold text-transbot-text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-transbot-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-transbot-text-primary mb-6">Autonomous Operations</h2>
            <div className="text-center py-12">
              <Cpu className="w-16 h-16 text-transbot-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-transbot-text-primary mb-2">AI-Powered Autonomous System</h3>
              <p className="text-transbot-text-secondary">Fully autonomous logistics operations with 25 AI agents working 24/7</p>
              <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                isAutonomousMode 
                  ? 'bg-transbot-teal/10 text-transbot-teal' 
                  : 'bg-transbot-sky/10 text-transbot-sky'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isAutonomousMode ? 'bg-transbot-teal' : 'bg-transbot-sky'} animate-pulse`}></div>
                {isAutonomousMode ? 'Autonomous Mode Active' : 'Autonomous Mode Inactive'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
