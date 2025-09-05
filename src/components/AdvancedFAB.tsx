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
  BarChart3,
  Zap,
  Phone,
  Video,
  Send,
  Bot
} from 'lucide-react'
import { trackUserInteraction, trackFormSubmission } from '../services/webhookService'

export function AdvancedFAB() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [chatMessage, setChatMessage] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const fabActions = [
    {
      id: 'ai-chat',
      icon: MessageCircle,
      label: 'AI Chat',
      color: 'bg-transbot-sky',
      description: 'Chat with our AI assistant',
      action: () => setActiveAction('ai-chat')
    },
    {
      id: 'support',
      icon: Headphones,
      label: 'Support',
      color: 'bg-transbot-teal',
      description: 'Get instant support',
      action: () => setActiveAction('support')
    },
    {
      id: 'demo',
      icon: Play,
      label: 'Demo',
      color: 'bg-transbot-purple',
      description: 'Request a live demo',
      action: () => setActiveAction('demo')
    },
    {
      id: 'contact',
      icon: Mail,
      label: 'Contact',
      color: 'bg-transbot-navy',
      description: 'Send us a message',
      action: () => setActiveAction('contact')
    },
    {
      id: 'feedback',
      icon: MessageSquare,
      label: 'Feedback',
      color: 'bg-transbot-warning',
      description: 'Share your feedback',
      action: () => setActiveAction('feedback')
    }
  ]

  const handleAIChat = async () => {
    if (chatMessage.trim()) {
      await trackUserInteraction('ai_chat_message', { message: chatMessage })
      // Send to N8N webhook for AI processing
      await trackFormSubmission('ai_chat', { message: chatMessage })
      setChatMessage('')
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await trackFormSubmission('contact_form', contactForm)
    await trackUserInteraction('contact_form_submitted', contactForm)
    setContactForm({ name: '', email: '', company: '', message: '' })
    setActiveAction(null)
  }

  const handleSupportRequest = async () => {
    await trackUserInteraction('support_requested', { type: 'instant_support' })
    await trackFormSubmission('support_request', { type: 'instant_support' })
  }

  const handleDemoRequest = async () => {
    await trackUserInteraction('demo_requested', { type: 'live_demo' })
    await trackFormSubmission('demo_request', { type: 'live_demo' })
  }

  const handleFeedback = async () => {
    await trackUserInteraction('feedback_opened', { type: 'user_feedback' })
    await trackFormSubmission('feedback_request', { type: 'user_feedback' })
  }

  return (
    <>
      {/* FAB Actions */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 right-6 z-50 space-y-4"
          >
            {fabActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/95 backdrop-blur-xl rounded-lg px-4 py-2 shadow-transbot border border-transbot-border/20"
                >
                  <span className="text-sm font-medium text-transbot-text-primary">
                    {action.description}
                  </span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={action.action}
                  className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center shadow-transbot hover:shadow-transbot-lg transition-all duration-300`}
                >
                  <action.icon className="w-6 h-6 text-white" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-transbot hover:shadow-transbot-lg transition-all duration-300"
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-8 h-8 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {activeAction === 'ai-chat' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveAction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-transbot-lg border border-transbot-border/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-transbot-sky rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-transbot-text-primary">AI Assistant</h3>
                  <p className="text-sm text-transbot-text-secondary">How can I help you?</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-transbot-neutral-light rounded-lg p-3">
                  <p className="text-sm text-transbot-text-secondary">
                    Hi! I'm your AI assistant. I can help you with questions about our logistics solutions, 
                    AI agents, or any other inquiries. What would you like to know?
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                    onKeyPress={(e) => e.key === 'Enter' && handleAIChat()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAIChat}
                    className="px-4 py-2 bg-transbot-sky text-white rounded-lg flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {activeAction === 'support' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveAction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-transbot-lg border border-transbot-border/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-transbot-teal rounded-full flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-transbot-text-primary">Support Center</h3>
                  <p className="text-sm text-transbot-text-secondary">We're here to help!</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSupportRequest}
                  className="w-full flex items-center gap-3 p-4 bg-transbot-teal/10 rounded-lg border border-transbot-teal/20 hover:bg-transbot-teal/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-transbot-teal" />
                  <div className="text-left">
                    <div className="font-medium text-transbot-text-primary">Live Chat</div>
                    <div className="text-sm text-transbot-text-secondary">Get instant help</div>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSupportRequest}
                  className="w-full flex items-center gap-3 p-4 bg-transbot-sky/10 rounded-lg border border-transbot-sky/20 hover:bg-transbot-sky/20 transition-colors"
                >
                  <Video className="w-5 h-5 text-transbot-sky" />
                  <div className="text-left">
                    <div className="font-medium text-transbot-text-primary">Video Call</div>
                    <div className="text-sm text-transbot-text-secondary">Schedule a call</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Modal */}
      <AnimatePresence>
        {activeAction === 'demo' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveAction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-transbot-lg border border-transbot-border/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-transbot-purple rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-transbot-text-primary">Request Demo</h3>
                  <p className="text-sm text-transbot-text-secondary">See Trans Bot AI in action</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemoRequest}
                  className="w-full flex items-center gap-3 p-4 bg-transbot-purple/10 rounded-lg border border-transbot-purple/20 hover:bg-transbot-purple/20 transition-colors"
                >
                  <Video className="w-5 h-5 text-transbot-purple" />
                  <div className="text-left">
                    <div className="font-medium text-transbot-text-primary">Live Demo</div>
                    <div className="text-sm text-transbot-text-secondary">Interactive demonstration</div>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDemoRequest}
                  className="w-full flex items-center gap-3 p-4 bg-transbot-sky/10 rounded-lg border border-transbot-sky/20 hover:bg-transbot-sky/20 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-transbot-sky" />
                  <div className="text-left">
                    <div className="font-medium text-transbot-text-primary">ROI Calculator</div>
                    <div className="text-sm text-transbot-text-secondary">Calculate your savings</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {activeAction === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveAction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-transbot-lg border border-transbot-border/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-transbot-navy rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-transbot-text-primary">Contact Us</h3>
                  <p className="text-sm text-transbot-text-secondary">Send us a message</p>
                </div>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-3 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                  required
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full px-3 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                />
                <textarea
                  placeholder="Message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-transbot-border/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-transbot-sky/20"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-transbot-navy text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {activeAction === 'feedback' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveAction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md shadow-transbot-lg border border-transbot-border/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-transbot-warning rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-transbot-text-primary">Share Feedback</h3>
                  <p className="text-sm text-transbot-text-secondary">Help us improve</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFeedback}
                  className="w-full flex items-center gap-3 p-4 bg-transbot-warning/10 rounded-lg border border-transbot-warning/20 hover:bg-transbot-warning/20 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-transbot-warning" />
                  <div className="text-left">
                    <div className="font-medium text-transbot-text-primary">General Feedback</div>
                    <div className="text-sm text-transbot-text-secondary">Share your thoughts</div>
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFeedback}
                  className="w-full flex items-center gap-3 p-4 bg-transbot-sky/10 rounded-lg border border-transbot-sky/20 hover:bg-transbot-sky/20 transition-colors"
                >
                  <Zap className="w-5 h-5 text-transbot-sky" />
                  <div className="text-left">
                    <div className="font-medium text-transbot-text-primary">Feature Request</div>
                    <div className="text-sm text-transbot-text-secondary">Suggest new features</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
