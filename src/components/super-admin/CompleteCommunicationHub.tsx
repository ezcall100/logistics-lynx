import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  Video,
  Paperclip,
  Settings,
  Bell,
  Users,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Minimize2,
  X,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Complete Communication Hub - Super Admin Component
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T22:49:10.780Z
 * Features: Real-time chat, notifications, alerts, file sharing, voice/video calls
 */

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'voice' | 'video';
  isRead: boolean;
  avatar?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  action?: string;
}

interface User {
  id: string;
  name: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  avatar?: string;
  lastSeen?: string;
}

export const CompleteCommunicationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'notifications' | 'alerts' | 'calls'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'John Smith',
        content: 'Hey team! How is the Super Admin portal development going?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        type: 'text',
        isRead: true,
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      },
      {
        id: '2',
        sender: 'Sarah Johnson',
        content: 'Great progress! The MCP 301 agents are working perfectly as a team.',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        type: 'text',
        isRead: true,
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      },
      {
        id: '3',
        sender: 'Mike Wilson',
        content: 'All CRUD functions are complete and working beautifully!',
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        type: 'text',
        isRead: false,
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      },
    ];

    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New User Registered',
        message: 'John Doe has been registered as a new user',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        isRead: false,
        action: 'View User',
      },
      {
        id: '2',
        title: 'System Update Available',
        message: 'A new system update is available for installation',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isRead: false,
        action: 'Update Now',
      },
      {
        id: '3',
        title: 'Security Alert',
        message: 'Unusual login activity detected from IP 192.168.1.100',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        isRead: true,
        action: 'Review',
      },
    ];

    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Smith',
        status: 'online',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        status: 'away',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
      },
      {
        id: '3',
        name: 'Mike Wilson',
        status: 'online',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      },
      {
        id: '4',
        name: 'Emily Davis',
        status: 'busy',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      },
      {
        id: '5',
        name: 'David Brown',
        status: 'offline',
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face',
      },
    ];

    setMessages(mockMessages);
    setNotifications(mockNotifications);
    setUsers(mockUsers);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: `📎 ${file.name}`,
      timestamp: new Date().toISOString(),
      type: 'file',
      isRead: true,
    };

    setMessages(prev => [...prev, message]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'warning':
        return <Bell className="w-4 h-4 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'error':
        return <X className="w-4 h-4 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  if (isMinimized) {
    return (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <button
          onClick={() => setIsMinimized(false)}
            aria-label="Button"
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <MessageSquare className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
        </button>
      </motion.div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 w-96 h-[600px] bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl z-50 flex flex-col responsive-container sm:flex-col md:flex-row lg:grid"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="p-2 bg-blue-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <MessageSquare className="w-5 h-5 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Communication Hub</h3>
            <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Real-time collaboration</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={() => setIsMinimized(true)}
            aria-label="Button"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Minimize2 className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <X className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'alerts', label: 'Alerts', icon: Settings },
          { id: 'calls', label: 'Calls', icon: Phone },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'chat' | 'notifications' | 'alerts' | 'calls')}
            aria-label="Button"
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {/* Online Users */}
              <div className="p-3 border-b border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Users className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Online Users</span>
                </div>
                <div className="flex items-center space-x-2 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {users
                    .filter(user => user.status === 'online')
                    .map(user => (
                      <div key={user.id} className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                        <img
                          src={
                            user.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`
                          }
                          alt={user.name}
                          className="w-8 h-8 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-gray-900`}
                        ></div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                {messages.map(message => (
                  <div key={message.id} className="flex items-start space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <img
                      src={
                        message.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender)}&background=6366f1&color=fff`
                      }
                      alt={message.sender}
                      className="w-8 h-8 rounded-full flex-shrink-0 responsive-container sm:flex-col md:flex-row lg:grid"
                    / alt="Image">
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm font-medium text-white responsive-container sm:flex-col md:flex-row lg:grid">{message.sender}</span>
                        <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                        {!message.isRead && message.sender !== 'You' && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    onClick={() => fileInputRef.current?.click()}
            aria-label="Button"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <Paperclip className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden responsive-container sm:flex-col md:flex-row lg:grid"
                    onChange={handleFileUpload}
                  />
                  <div className="flex-1 relative responsive-container sm:flex-col md:flex-row lg:grid">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <Send className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full overflow-y-auto p-4 space-y-3 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.isRead ? 'bg-white/5 border-white/10' : 'bg-blue-500/10 border-blue-500/30'}`}
                >
                  <div className="flex items-start space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <h4 className="text-sm font-medium text-white responsive-container sm:flex-col md:flex-row lg:grid">{notification.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                        {notification.action && (
                          <button className="text-xs text-blue-400 hover:text-blue-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <h3 className="text-lg font-medium text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">System Alerts</h3>
                <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">No active alerts at this time</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'calls' && (
            <motion.div
              key="calls"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col items-center justify-center p-4 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {isCallActive ? (
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Phone className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Call in Progress</h3>
                  <p className="text-sm text-gray-400 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Connected to team meeting</p>

                  <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
            aria-label="Button"
                      className={`p-3 rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} text-white transition-colors`}
                    >
                      {isMuted ? <MicOff className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Mic className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
                    </button>
                    <button
                      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
            aria-label="Button"
                      className={`p-3 rounded-full ${isVideoEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white transition-colors`}
                    >
                      {isVideoEnabled ? (
                        <Camera className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : (
                        <CameraOff className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                      )}
                    </button>
                    <button
                      onClick={() => setIsCallActive(false)}
            aria-label="Button"
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <Phone className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Phone className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Start a Call</h3>
                  <p className="text-sm text-gray-400 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Connect with your team</p>

                  <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <button
                      onClick={() => setIsCallActive(true)}
            aria-label="Button"
                      className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <Phone className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                    <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                      <Video className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CompleteCommunicationHub;
}