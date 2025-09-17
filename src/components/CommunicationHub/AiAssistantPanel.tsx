import React from 'react';
import { Bot, Send } from 'lucide-react';
import type { AIMessage } from './types';

interface AiAssistantPanelProps {
  messages: AIMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  isTyping: boolean;
  onSendMessage: () => void;
}

export const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({
  messages,
  newMessage,
  setNewMessage,
  isTyping,
  onSendMessage,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="space-y-3 responsive-container">
      {/* AI Assistant Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 responsive-container">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0 responsive-container">
          <div className="relative responsive-container">
            <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center responsive-container">
              <Bot className="h-4 w-4 text-white responsive-container" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-white animate-pulse responsive-container"></div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 responsive-container">
              TransBot AI Assistant
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-300 responsive-container">
              Intelligent system management
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 responsive-container">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse responsive-container"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium responsive-container">
            Active
          </span>
        </div>
      </div>

      {/* AI Messages */}
      <div className="space-y-3 max-h-64 overflow-y-auto responsive-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.type === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600'
            }`}>
              {msg.type === 'ai' && (
                <div className="flex items-center space-x-2 mb-2 responsive-container">
                  <Bot className="h-4 w-4 text-purple-600 responsive-container" />
                  <span className="text-xs font-medium text-purple-600 responsive-container">TransBot AI</span>
                </div>
              )}
              <p className={`text-sm ${msg.type === 'user' ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                {msg.message}
              </p>
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 space-y-2 responsive-container">
                  <p className="text-xs text-gray-600 dark:text-gray-400 responsive-container">Quick actions:</p>
                  <div className="flex flex-wrap gap-2 responsive-container">
                    {msg.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() = aria-label="Button"> setNewMessage(suggestion)}
                        className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors responsive-container"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <span className={`text-xs mt-1 block ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start responsive-container">
            <div className="bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 p-3 rounded-lg responsive-container">
              <div className="flex items-center space-x-2 responsive-container">
                <Bot className="h-4 w-4 text-blue-600 responsive-container" />
                <span className="text-xs font-medium text-blue-600 responsive-container">TransBot AI</span>
              </div>
              <div className="flex space-x-1 mt-2 responsive-container">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce responsive-container"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce responsive-container" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce responsive-container" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Input */}
      <div className="flex space-x-3 p-3 rounded-lg bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 responsive-container">
        <input
          type="text"
          placeholder="Ask TransBot AI anything..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600 transition-all duration-200 responsive-container"
        />
        <button 
          onClick={onSendMessage}
          disabled={!newMessage.trim() || isTyping}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 responsive-container"
         aria-label="Button">
          <Send className="h-4 w-4 responsive-container" />
        </button>
      </div>
    </div>
  );
};
