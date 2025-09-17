import React from 'react';
import { Send } from 'lucide-react';
import type { ChatMessage } from './types';

interface ChatPanelProps {
  messages: ChatMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  onMarkAsRead: (id: number) => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  newMessage,
  setNewMessage,
  onSendMessage,
  onMarkAsRead,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Live Chat Header */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 responsive-container sm:flex-col md:flex-row lg:grid">
          Live Chat
        </h3>
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-3 w-3 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium responsive-container sm:flex-col md:flex-row lg:grid">
            Online
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-sm cursor-pointer ${
              msg.unread
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : 'bg-slate-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
            onClick={() => onMarkAsRead(msg.id)}
          >
            <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      msg.unread
                        ? 'bg-blue-600'
                        : 'bg-gray-500'
                    }`}
                  >
                    {msg.avatar || msg.sender
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                  {msg.status && (
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                      msg.status === 'online' ? 'bg-blue-500' :
                      msg.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`}></div>
                  )}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                    {msg.sender}
                  </span>
                  {msg.status && (
                    <span className={`text-xs ml-2 ${
                      msg.status === 'online' ? 'text-blue-600' :
                      msg.status === 'away' ? 'text-yellow-600' : 'text-gray-500'
                    }`}>
                      {msg.status}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium responsive-container sm:flex-col md:flex-row lg:grid">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed responsive-container sm:flex-col md:flex-row lg:grid">
              {msg.message}
            </p>
            {msg.unread && (
              <div className="absolute top-3 right-3 h-2 w-2 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 responsive-container sm:flex-col md:flex-row lg:grid">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600 transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
        />
        <button 
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
         aria-label="Button">
          <Send className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
        </button>
      </div>
    </div>
  );
};
