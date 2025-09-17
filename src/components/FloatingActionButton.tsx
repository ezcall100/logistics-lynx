import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Sparkles, 
  MessageCircle, 
  Headphones, 
  Play, 
  Mail, 
  MessageSquare,
  X,
  Brain,
  BarChart3,
  HelpCircle
} from 'lucide-react'

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  const fabActions = [
    {
      icon: MessageCircle,
      label: 'AI Chat',
      color: 'bg-transbot-sky',
      action: () => console.log('AI Chat opened')
    },
    {
      icon: Headphones,
      label: 'Support',
      color: 'bg-transbot-teal',
      action: () => console.log('Support opened')
    },
    {
      icon: Play,
      label: 'Demo',
      color: 'bg-transbot-purple',
      action: () => console.log('Demo requested')
    },
    {
      icon: Mail,
      label: 'Contact',
      color: 'bg-transbot-navy',
      action: () => console.log('Contact opened')
    },
    {
      icon: MessageSquare,
      label: 'Feedback',
      color: 'bg-transbot-warning',
      action: () => console.log('Feedback opened')
    }
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="fixed bottom-6 right-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Secondary FABs */}
      <AnimatePresence>
        {isExpanded && (
          <div className="flex flex-col-reverse gap-3 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {fabActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className="bg-transbot-text-primary text-white px-3 py-2 rounded-lg text-sm font-medium shadow-transbot whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  {action.label}
                </motion.div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={action.action}
                  className={`w-12 h-12 ${action.color} text-white rounded-full shadow-transbot hover:shadow-transbot-lg transition-all duration-300 flex items-center justify-center`}
                >
                  <action.icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Primary FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-gradient-primary text-white rounded-full shadow-transbot-lg hover:shadow-transbot-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
          animate={{ 
            scale: isExpanded ? [1, 1.2, 1] : 1,
            opacity: isExpanded ? [0.5, 0.8, 0.5] : 0
          }}
          transition={{ duration: 0.6, repeat: isExpanded ? Infinity : 0 }}
        />

        {/* Icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
          ) : (
            <Sparkles className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
          )}
        </motion.div>

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-white/30 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Quick Stats FAB (when collapsed) */}
      {!isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-transbot border border-transbot-border/20 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-2 h-2 bg-transbot-teal rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <span className="text-xs font-semibold text-transbot-text-primary responsive-container sm:flex-col md:flex-row lg:grid">
              AI Active
            </span>
          </div>
        </motion.div>
      )}

      {/* Contextual FAB for different pages */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="absolute -left-20 top-1/2 transform -translate-y-1/2 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="flex flex-col gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* AI Status Indicator */}
          <motion.div
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-transbot border border-transbot-border/20 responsive-container sm:flex-col md:flex-row lg:grid"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Brain className="w-4 h-4 text-transbot-sky responsive-container sm:flex-col md:flex-row lg:grid" />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-transbot border border-transbot-border/20 responsive-container sm:flex-col md:flex-row lg:grid"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <BarChart3 className="w-4 h-4 text-transbot-teal responsive-container sm:flex-col md:flex-row lg:grid" />
          </motion.div>

          {/* Help */}
          <motion.div
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-transbot border border-transbot-border/20 responsive-container sm:flex-col md:flex-row lg:grid"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <HelpCircle className="w-4 h-4 text-transbot-warning responsive-container sm:flex-col md:flex-row lg:grid" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}