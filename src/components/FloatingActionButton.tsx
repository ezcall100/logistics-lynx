import React, { useState } from 'react'
import { Zap, Plus, Settings, HelpCircle, MessageCircle } from 'lucide-react'

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    { icon: Plus, label: "Quick Access", color: "from-cyan-500 to-blue-500" },
    { icon: Settings, label: "Settings", color: "from-blue-500 to-indigo-500" },
    { icon: MessageCircle, label: "Support", color: "from-green-500 to-emerald-500" },
    { icon: HelpCircle, label: "Help", color: "from-purple-500 to-violet-500" }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Sub Actions */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 shadow-xl animate-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium">{action.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-cyan-500/50 cursor-pointer hover:scale-110 transition-all duration-300 group"
      >
        <Zap className={`w-8 h-8 text-white transition-transform duration-300 ${isOpen ? 'rotate-45' : 'group-hover:rotate-12'}`} />
      </button>
    </div>
  )
}

export default FloatingActionButton
