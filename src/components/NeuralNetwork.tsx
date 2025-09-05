import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Agent {
  id: number
  x: number
  y: number
  status: 'active' | 'processing' | 'idle'
  task: string
  connections: number[]
}

export function NeuralNetwork() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [activeAgents, setActiveAgents] = useState(0)

  useEffect(() => {
    // Initialize 250 AI agents
    const initialAgents: Agent[] = []
    for (let i = 0; i < 250; i++) {
      initialAgents.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        status: 'idle',
        task: '',
        connections: []
      })
    }
    setAgents(initialAgents)

    // Simulate agent activation
    const interval = setInterval(() => {
      setActiveAgents(prev => {
        const newCount = Math.min(prev + 5, 250)
        
        // Update agent statuses
        setAgents(current => 
          current.map(agent => ({
            ...agent,
            status: agent.id < newCount ? 
              (Math.random() > 0.7 ? 'processing' : 'active') : 'idle',
            task: agent.id < newCount ? getRandomTask() : '',
            connections: agent.id < newCount ? 
              Array.from({length: Math.floor(Math.random() * 5)}, () => 
                Math.floor(Math.random() * 250)
              ) : []
          }))
        )
        
        return newCount
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const getRandomTask = () => {
    const tasks = [
      'Optimizing routes',
      'Predicting demand',
      'Processing data',
      'Learning patterns',
      'Automating tasks',
      'Analyzing trends',
      'Generating insights',
      'Managing logistics'
    ]
    return tasks[Math.floor(Math.random() * tasks.length)]
  }

  return (
    <div className="relative w-full h-96 bg-dark-darker rounded-2xl overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 bg-transbot-neural opacity-30"></div>
      
      {/* Agent Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {agents.map(agent => 
          agent.connections.map(connectionId => {
            const targetAgent = agents[connectionId]
            if (!targetAgent) return null
            
            return (
              <motion.line
                key={`${agent.id}-${connectionId}`}
                x1={`${agent.x}%`}
                y1={`${agent.y}%`}
                x2={`${targetAgent.x}%`}
                y2={`${targetAgent.y}%`}
                stroke="rgba(0, 255, 255, 0.3)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: Math.random() * 2 }}
              />
            )
          })
        )}
      </svg>

      {/* AI Agents */}
      {agents.map(agent => (
        <motion.div
          key={agent.id}
          className={`absolute w-3 h-3 rounded-full ${
            agent.status === 'active' ? 'bg-transbot-cyan shadow-transbot-glow' :
            agent.status === 'processing' ? 'bg-transbot-blue shadow-transbot-glow' :
            'bg-white/20'
          }`}
          style={{
            left: `${agent.x}%`,
            top: `${agent.y}%`,
          }}
          animate={{
            scale: agent.status === 'idle' ? 0.5 : [1, 1.2, 1],
            opacity: agent.status === 'idle' ? 0.3 : 1,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Agent Counter */}
      <div className="absolute top-4 left-4 bg-holographic-glass p-4 rounded-xl">
        <div className="text-2xl font-bold gradient-text-cyan">
          {activeAgents}/250
        </div>
        <div className="text-sm text-white/80">
          AI Agents Active
        </div>
      </div>

      {/* Task Display */}
      <div className="absolute bottom-4 right-4 bg-holographic-glass p-4 rounded-xl max-w-xs">
        <div className="text-sm text-white/80 mb-2">Current Tasks:</div>
        {agents
          .filter(agent => agent.status === 'processing')
          .slice(0, 3)
          .map(agent => (
            <div key={agent.id} className="text-xs text-transbot-cyan mb-1">
              Agent {agent.id}: {agent.task}
            </div>
          ))
        }
      </div>
    </div>
  )
}
