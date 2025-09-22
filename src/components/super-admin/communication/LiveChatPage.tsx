import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MessageCircle,
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Pin,
  UserPlus,
  Settings,
  Smile,
  Paperclip,
  Mic,
  MicOff,
  Volume2,
  Users,
  Clock,
  Check,
  CheckCheck,
  Zap,
  Bot,
  Crown,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'user' | 'agent' | 'admin' | 'bot';
  content: string;
  timestamp: Date;
  isRead: boolean;
  isTyping?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
  isPinned?: boolean;
  isEdited?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  participants: Array<{
    id: string;
    name: string;
    avatar: string;
    role: 'user' | 'agent' | 'admin' | 'bot';
    isOnline: boolean;
    lastSeen?: Date;
  }>;
  lastMessage: Message;
  unreadCount: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  status: 'active' | 'waiting' | 'resolved' | 'closed';
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LiveChatPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      title: 'Technical Support - Login Issues',
      participants: [
        { id: 'u1', name: 'John Doe', avatar: 'JD', role: 'user', isOnline: true },
        { id: 'a1', name: 'Sarah Wilson', avatar: 'SW', role: 'agent', isOnline: true },
      ],
      lastMessage: {
        id: 'm1',
        senderId: 'u1',
        senderName: 'John Doe',
        senderAvatar: 'JD',
        senderRole: 'user',
        content: 'The login page is not loading properly. Can you help?',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        isRead: false,
      },
      unreadCount: 3,
      priority: 'high',
      tags: ['technical', 'login', 'urgent'],
      status: 'active',
      isPinned: true,
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Billing Inquiry - Invoice #12345',
      participants: [
        { id: 'u2', name: 'Mike Johnson', avatar: 'MJ', role: 'user', isOnline: false, lastSeen: new Date(Date.now() - 5 * 60 * 1000) },
        { id: 'a2', name: 'Alex Chen', avatar: 'AC', role: 'agent', isOnline: true },
      ],
      lastMessage: {
        id: 'm2',
        senderId: 'a2',
        senderName: 'Alex Chen',
        senderAvatar: 'AC',
        senderRole: 'agent',
        content: 'I\'ve sent the updated invoice to your email. Please check your inbox.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: true,
      },
      unreadCount: 0,
      priority: 'medium',
      tags: ['billing', 'invoice'],
      status: 'resolved',
      isPinned: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Feature Request - Mobile App',
      participants: [
        { id: 'u3', name: 'Emily Davis', avatar: 'ED', role: 'user', isOnline: true },
        { id: 'a3', name: 'David Kim', avatar: 'DK', role: 'agent', isOnline: true },
      ],
      lastMessage: {
        id: 'm3',
        senderId: 'u3',
        senderName: 'Emily Davis',
        senderAvatar: 'ED',
        senderRole: 'user',
        content: 'Would it be possible to add dark mode to the mobile app?',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        isRead: false,
        isTyping: true,
      },
      unreadCount: 1,
      priority: 'low',
      tags: ['feature-request', 'mobile', 'ui'],
      status: 'active',
      isPinned: false,
      createdAt: new Date(Date.now() - 45 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 60 * 1000),
    },
  ];

  const messages: { [key: string]: Message[] } = useMemo(() => ({
    '1': [
      {
        id: 'm1',
        senderId: 'a1',
        senderName: 'Sarah Wilson',
        senderAvatar: 'SW',
        senderRole: 'agent',
        content: 'Hi John! I\'m here to help you with your login issues. Can you tell me what specific error you\'re seeing?',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm2',
        senderId: 'u1',
        senderName: 'John Doe',
        senderAvatar: 'JD',
        senderRole: 'user',
        content: 'I\'m getting a 404 error when I try to access the login page. The page just won\'t load at all.',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm3',
        senderId: 'a1',
        senderName: 'Sarah Wilson',
        senderAvatar: 'SW',
        senderRole: 'agent',
        content: 'I see the issue. This looks like a server-side problem. Let me check our system status and get this resolved for you.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm4',
        senderId: 'a1',
        senderName: 'Sarah Wilson',
        senderAvatar: 'SW',
        senderRole: 'agent',
        content: 'I\'ve identified the issue and our team is working on it now. You should be able to log in within the next 10-15 minutes. I\'ll keep you updated.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm5',
        senderId: 'u1',
        senderName: 'John Doe',
        senderAvatar: 'JD',
        senderRole: 'user',
        content: 'Thank you so much for the quick response! I really appreciate your help.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm6',
        senderId: 'a1',
        senderName: 'Sarah Wilson',
        senderAvatar: 'SW',
        senderRole: 'agent',
        content: 'You\'re very welcome, John! The login issue should now be resolved. Please try logging in again and let me know if you encounter any other problems.',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        isRead: false,
      },
    ],
    '2': [
      {
        id: 'm7',
        senderId: 'u2',
        senderName: 'Mike Johnson',
        senderAvatar: 'MJ',
        senderRole: 'user',
        content: 'Hi, I received an invoice but the amount seems incorrect. Can you please review it?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm8',
        senderId: 'a2',
        senderName: 'Alex Chen',
        senderAvatar: 'AC',
        senderRole: 'agent',
        content: 'Hello Mike! I\'d be happy to help you with your invoice. Could you please share the invoice number so I can look it up?',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm9',
        senderId: 'u2',
        senderName: 'Mike Johnson',
        senderAvatar: 'MJ',
        senderRole: 'user',
        content: 'The invoice number is #12345. The amount shows $500 but I was only charged $450 last month.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm10',
        senderId: 'a2',
        senderName: 'Alex Chen',
        senderAvatar: 'AC',
        senderRole: 'agent',
        content: 'I\'ve reviewed your invoice #12345 and you\'re absolutely right. There was a billing error on our end. I\'ve corrected it and sent the updated invoice to your email.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isRead: true,
      },
    ],
    '3': [
      {
        id: 'm11',
        senderId: 'u3',
        senderName: 'Emily Davis',
        senderAvatar: 'ED',
        senderRole: 'user',
        content: 'Hi! I love using your platform, but I was wondering if you have plans to add a dark mode feature to the mobile app?',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm12',
        senderId: 'a3',
        senderName: 'David Kim',
        senderAvatar: 'DK',
        senderRole: 'agent',
        content: 'Hello Emily! That\'s a great suggestion. Dark mode is actually something we\'re actively working on. We expect to release it in our next mobile app update.',
        timestamp: new Date(Date.now() - 40 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm13',
        senderId: 'u3',
        senderName: 'Emily Davis',
        senderAvatar: 'ED',
        senderRole: 'user',
        content: 'That\'s exciting! Do you have an estimated timeline for when that update might be available?',
        timestamp: new Date(Date.now() - 35 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm14',
        senderId: 'a3',
        senderName: 'David Kim',
        senderAvatar: 'DK',
        senderRole: 'agent',
        content: 'We\'re targeting a release within the next 2-3 weeks. I\'ll make sure to reach out to you personally when it\'s available so you can be among the first to try it!',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'm15',
        senderId: 'u3',
        senderName: 'Emily Davis',
        senderAvatar: 'ED',
        senderRole: 'user',
        content: 'Would it be possible to add dark mode to the mobile app?',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        isRead: false,
        isTyping: true,
      },
    ],
  }), []);

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
  const currentMessages = useMemo(() => 
    selectedConversation ? messages[selectedConversation] || [] : [], 
    [selectedConversation, messages]
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'waiting': return 'bg-yellow-500';
      case 'resolved': return 'bg-blue-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      } flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Chat</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active conversations</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        {!sidebarCollapsed && (
          <div className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              {['all', 'active', 'waiting', 'resolved', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations
            .filter(conv => 
              (filterStatus === 'all' || conv.status === filterStatus) &&
              (searchQuery === '' || conv.title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                  selectedConversation === conversation.id
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {sidebarCollapsed ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {conversation.participants.find(p => p.role === 'user')?.avatar || 'U'}
                      </div>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(conversation.priority)}`}></div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {conversation.title}
                          </h3>
                          {conversation.isPinned && <Pin className="w-3 h-3 text-yellow-500" />}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation.participants.find(p => p.role === 'user')?.name}
                          </span>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            conversation.participants.find(p => p.role === 'user')?.isOnline ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(conversation.priority)}`}></div>
                        {conversation.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
                      {conversation.lastMessage.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(conversation.status)}`}></div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {conversation.status}
                        </span>
                      </div>
                    </div>
                    
                    {conversation.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {conversation.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {conversation.tags.length > 2 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{conversation.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  YS
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">You</p>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {currentConversation?.participants.slice(0, 3).map((participant) => (
                      <div key={participant.id} className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white dark:border-gray-800">
                          {participant.avatar}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                          participant.isOnline ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    ))}
                    {currentConversation && currentConversation.participants.length > 3 && (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs font-medium border-2 border-white dark:border-gray-800">
                        +{currentConversation.participants.length - 3}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {currentConversation?.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(currentConversation?.status || '')}`}></div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {currentConversation?.status}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {currentConversation?.participants.filter(p => p.isOnline).length} online
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Video className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <UserPlus className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message, index) => {
                const isUser = message.senderRole === 'user';
                const isBot = message.senderRole === 'bot';
                const showAvatar = index === 0 || currentMessages[index - 1].senderId !== message.senderId;
                const showTime = index === currentMessages.length - 1 || 
                  Math.abs(currentMessages[index + 1].timestamp.getTime() - message.timestamp.getTime()) > 5 * 60 * 1000;

                return (
                  <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {showAvatar && !isUser && (
                        <div className="flex-shrink-0 mr-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            isBot ? 'bg-gradient-to-br from-purple-500 to-pink-600' :
                            message.senderRole === 'admin' ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                            'bg-gradient-to-br from-blue-500 to-green-600'
                          }`}>
                            {isBot ? <Bot className="w-4 h-4" /> : message.senderAvatar}
                          </div>
                        </div>
                      )}
                      
                      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                        {showAvatar && !isUser && (
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {message.senderName}
                            </span>
                            {message.senderRole === 'admin' && <Crown className="w-3 h-3 text-yellow-500" />}
                            {message.senderRole === 'bot' && <Bot className="w-3 h-3 text-purple-500" />}
                          </div>
                        )}
                        
                        <div className={`relative px-4 py-2 rounded-2xl ${
                          isUser 
                            ? 'bg-blue-500 text-white' 
                            : isBot
                            ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment) => (
                                <div key={attachment.id} className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded-lg">
                                  <Paperclip className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700 dark:text-gray-300">{attachment.name}</span>
                                  <span className="text-xs text-gray-500">{attachment.size}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {message.reactions && message.reactions.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {message.reactions.map((reaction, idx) => (
                                <button
                                  key={idx}
                                  className="flex items-center space-x-1 px-2 py-1 bg-white dark:bg-gray-600 rounded-full text-xs hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                                >
                                  <span>{reaction.emoji}</span>
                                  <span>{reaction.count}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {showTime && (
                          <div className={`flex items-center space-x-1 mt-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTime(message.timestamp)}
                            </span>
                            {isUser && (
                              <div className="flex items-center space-x-1">
                                {message.isRead ? (
                                  <CheckCheck className="w-3 h-3 text-blue-500" />
                                ) : (
                                  <Check className="w-3 h-3 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {currentConversation?.participants.some(p => p.isOnline) && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Someone is typing...</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-end space-x-3">
                <button
                  onClick={() => setShowAttachments(!showAttachments)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Smile className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-3 rounded-full transition-colors ${
                    isRecording 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Press Enter to send, Shift+Enter for new line
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <Zap className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                    <Volume2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No Conversation Selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose a conversation from the sidebar to start chatting with your customers and team members.
              </p>
              <div className="mt-8 flex justify-center space-x-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Active</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{conversations.filter(c => c.status === 'active').length}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Waiting</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{conversations.filter(c => c.status === 'waiting').length}</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Resolved</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{conversations.filter(c => c.status === 'resolved').length}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChatPage;
