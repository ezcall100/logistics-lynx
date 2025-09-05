import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function NeuralBackground() {
  const [nodes, setNodes] = useState<Array<{id: number, x: number, y: number, connections: number[]}>>([])
  const [connections, setConnections] = useState<Array<{from: number, to: number}>>([])

  useEffect(() => {
    // Generate neural network nodes
    const generateNodes = () => {
      const newNodes: Array<{id: number, x: number, y: number, connections: number[]}> = []
      const nodeCount = 25
      
      for (let i = 0; i < nodeCount; i++) {
        newNodes.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          connections: []
        })
      }
      
      // Generate connections
      const newConnections: Array<{from: number, to: number}> = []
      for (let i = 0; i < newNodes.length; i++) {
        const connectionCount = Math.floor(Math.random() * 3) + 1
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * newNodes.length)
          if (targetIndex !== i && !newConnections.some(c => 
            (c.from === i && c.to === targetIndex) || 
            (c.from === targetIndex && c.to === i)
          )) {
            newConnections.push({ from: i, to: targetIndex })
            newNodes[i].connections.push(targetIndex)
          }
        }
      }
      
      setNodes(newNodes)
      setConnections(newConnections)
    }

    generateNodes()
    
    // Regenerate network every 30 seconds
    const interval = setInterval(generateNodes, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg className="w-full h-full opacity-10">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="25%" stopColor="#14B8A6" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="75%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.2" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        {connections.map((connection, index) => {
          const fromNode = nodes[connection.from]
          const toNode = nodes[connection.to]
          if (!fromNode || !toNode) return null

          return (
            <motion.line
              key={`connection-${index}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.g key={`node-${node.id}`}>
            {/* Glow Effect */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="8"
              fill="url(#neuralGradient)"
              filter="url(#glow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
            
            {/* Main Node */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="3"
              fill="url(#nodeGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
            />

            {/* Pulse Ring */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="6"
              fill="none"
              stroke="url(#neuralGradient)"
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 2, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.circle
            key={`particle-${index}`}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="1"
            fill="url(#neuralGradient)"
            initial={{ 
              opacity: 0,
              x: Math.random() * 100,
              y: Math.random() * 100
            }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "linear"
            }}
          />
        ))}

        {/* Data Flow Lines */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.path
            key={`dataflow-${index}`}
            d={`M ${Math.random() * 100} ${Math.random() * 100} Q ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100} ${Math.random() * 100}`}
            stroke="url(#neuralGradient)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>

      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transbot-sky/5 to-transparent pointer-events-none" />
      
      {/* Scanning Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-transbot-sky to-transparent"
          initial={{ y: 0 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
    </div>
  )
}
