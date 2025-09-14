import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Phone, Video, Share2, Paperclip, 
  Smile, MoreVertical, Search, Filter, Settings, Bell,
  Users, Hash, Lock, Globe, Mic, MicOff, Camera, CameraOff,
  Volume2, VolumeX, Maximize2, Minimize2, X, Check, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Complete Communication Hub - Super Admin Component
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T17:58:56.530Z
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

type TabId = 'chat' | 'notifications' | 'alerts' | 'calls';

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
  const [isTyping, setIsTyping] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
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
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      {
        id: '2',
        sender: 'Sarah Johnson',
        content: 'Great progress! The MCP 301 agents are working perfectly as a team.',
        timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
        type: 'text',
        isRead: true,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
      },
      {
        id: '3',
        sender: 'Mike Wilson',
        content: 'All CRUD functions are complete and working beautifully!',
        timestamp: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
        type: 'text',
        isRead: false,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
      }
    ];

    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'New User Registered',
        message: 'John Doe has been registered as a new user',
        type: 'success',
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        isRead: false,
        action: 'View User'
      },
      {
        id: '2',
        title: 'System Update Available',
        message: 'A new system update is available for installation',
        type: 'info',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        isRead: false,
        action: 'Update Now'
      },
      {
        id: '3',
        title: 'Security Alert',
        message: 'Unusual login activity detected from IP 192.168.1.100',
        type: 'warning',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        isRead: true,
        action: 'Review'
      }
    ];

    const mockUsers: User[] = [
      { id: '1', name: 'John Smith', status: 'online', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      { id: '2', name: 'Sarah Johnson', status: 'away', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
      { id: '3', name: 'Mike Wilson', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
      { id: '4', name: 'Emily Davis', status: 'busy', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
      { id: '5', name: 'David Brown', status: 'offline', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' }
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
      isRead: true
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
      isRead: true
    };

    setMessages(prev => [...prev, message]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <Check className="w-4 h-4 text-green-400" />;
      case 'warning': return <Bell className="w-4 h-4 text-yellow-400" />;
      case 'error': return <X className="w-4 h-4 text-red-400" />;
      default: return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 w-96 h-[600px] bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <MessageSquare className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Communication Hub</h3>
            <p className="text-xs text-gray-400">Real-time collaboration</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minimize2 className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'alerts', label: 'Alerts', icon: Settings },
          { id: 'calls', label: 'Calls', icon: Phone }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {/* Online Users */}
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Online Users</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  {users.filter(user => user.status === 'online').map((user) => (
                    <div key={user.id} className="relative">
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-gray-900`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <img
                      src={message.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(message.sender)}&background=6366f1&color=fff`}
                      alt={message.sender}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-white">{message.sender}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                        {!message.isRead && message.sender !== 'You' && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-300">{message.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
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
              className="h-full overflow-y-auto p-4 space-y-3"
            >
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${notification.isRead ? 'bg-white/5 border-white/10' : 'bg-blue-500/10 border-blue-500/30'}`}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                        {notification.action && (
                          <button className="text-xs text-blue-400 hover:text-blue-300">
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
              className="h-full flex items-center justify-center"
            >
              <div className="text-center">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">System Alerts</h3>
                <p className="text-sm text-gray-400">No active alerts at this time</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'calls' && (
            <motion.div
              key="calls"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col items-center justify-center p-4"
            >
              {isCallActive ? (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Call in Progress</h3>
                  <p className="text-sm text-gray-400 mb-6">Connected to team meeting</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3 rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} text-white transition-colors`}
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                      className={`p-3 rounded-full ${isVideoEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white transition-colors`}
                    >
                      {isVideoEnabled ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => setIsCallActive(false)}
                      className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Start a Call</h3>
                  <p className="text-sm text-gray-400 mb-6">Connect with your team</p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsCallActive(true)}
                      className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
                      <Video className="w-5 h-5" />
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
