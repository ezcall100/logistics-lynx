import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  Settings,
  Zap,
  Brain,
  Lightbulb,
  Code,
  FileText,
  Star,
  Bookmark,
  History,
  TrendingUp,
  Search,
  MoreVertical,
  Maximize2,
  Minimize2,
  Calendar,
} from 'lucide-react';

// Web Speech API type declarations
declare global {
  interface Window {
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: (() => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
  }
  
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
  
  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }
  
  interface SpeechRecognitionResult {
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }
}

interface AIConversation {
  id: string;
  title: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  tags: string[];
  category: 'general' | 'technical' | 'creative' | 'analytics' | 'automation';
}

interface AIMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  suggestions?: string[];
  actions?: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    action: string;
  }>;
  confidence?: number;
  sources?: Array<{
    title: string;
    url: string;
    relevance: number;
  }>;
}

interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  role: string;
  description: string;
  capabilities: string[];
  isActive: boolean;
  responseTime: number;
  accuracy: number;
  usage: number;
}

const AIAssistantPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('transbot-main');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);


  // Mock AI Agents
  const aiAgents: AIAgent[] = [
    {
      id: 'transbot-main',
      name: 'TransBot AI',
      avatar: '🤖',
      role: 'General Assistant',
      description: 'Your primary AI assistant for general queries and tasks',
      capabilities: ['Natural Language Processing', 'Task Automation', 'Data Analysis'],
      isActive: true,
      responseTime: 0.8,
      accuracy: 98,
      usage: 85,
    },
    {
      id: 'transbot-analytics',
      name: 'Analytics Pro',
      avatar: '📊',
      role: 'Data Analyst',
      description: 'Specialized in data analysis and business intelligence',
      capabilities: ['Data Visualization', 'Statistical Analysis', 'Predictive Modeling'],
      isActive: true,
      responseTime: 1.2,
      accuracy: 96,
      usage: 45,
    },
    {
      id: 'transbot-creative',
      name: 'Creative Genius',
      avatar: '🎨',
      role: 'Creative Assistant',
      description: 'Helps with creative writing, design, and content creation',
      capabilities: ['Content Creation', 'Design Assistance', 'Creative Writing'],
      isActive: true,
      responseTime: 1.5,
      accuracy: 94,
      usage: 32,
    },
    {
      id: 'transbot-technical',
      name: 'Tech Expert',
      avatar: '⚙️',
      role: 'Technical Support',
      description: 'Specialized in technical issues and code assistance',
      capabilities: ['Code Review', 'Debugging', 'Technical Documentation'],
      isActive: true,
      responseTime: 1.0,
      accuracy: 97,
      usage: 67,
    },
  ];

  // Mock conversations
  const conversations: AIConversation[] = [
    {
      id: '1',
      title: 'Logistics Optimization Analysis',
      messages: [
        {
          id: 'm1',
          type: 'user',
          content: 'Can you analyze our current logistics operations and suggest optimizations?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: 'm2',
          type: 'assistant',
          content: 'I\'d be happy to help analyze your logistics operations! I can examine your current processes and identify optimization opportunities.\n\nHere\'s what I can analyze:\n• Route efficiency and fuel consumption\n• Delivery time optimization\n• Cost reduction strategies\n• Inventory management improvements\n• Fleet utilization metrics\n\nWould you like me to start with a specific area, or shall I provide a comprehensive analysis?',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          confidence: 0.95,
          suggestions: [
            'Analyze route efficiency',
            'Review delivery times',
            'Check fleet utilization',
            'Examine cost patterns'
          ],
          actions: [
            { id: 'a1', label: 'Generate Report', icon: FileText, action: 'generate_report' },
            { id: 'a2', label: 'Create Dashboard', icon: TrendingUp, action: 'create_dashboard' },
            { id: 'a3', label: 'Schedule Analysis', icon: Calendar, action: 'schedule_analysis' }
          ]
        }
      ],
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      updatedAt: new Date(Date.now() - 25 * 60 * 1000),
      isPinned: true,
      tags: ['logistics', 'optimization', 'analysis'],
      category: 'analytics',
    },
    {
      id: '2',
      title: 'Customer Service Automation',
      messages: [
        {
          id: 'm3',
          type: 'user',
          content: 'How can I automate our customer service responses for common inquiries?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 'm4',
          type: 'assistant',
          content: 'Great question! Customer service automation can significantly improve efficiency and response times. Here are some strategies:\n\n**1. Chatbot Implementation**\n• Handle FAQs automatically\n• Route complex queries to human agents\n• 24/7 availability for basic support\n\n**2. Email Automation**\n• Auto-responses for common inquiries\n• Ticket categorization and routing\n• Follow-up sequences\n\n**3. Knowledge Base Integration**\n• Self-service portal for customers\n• Automated article suggestions\n• Search optimization\n\nWould you like me to help you set up any of these automation workflows?',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          confidence: 0.92,
          suggestions: [
            'Create chatbot workflow',
            'Set up email automation',
            'Build knowledge base',
            'Design response templates'
          ]
        }
      ],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
      isPinned: false,
      tags: ['automation', 'customer-service', 'chatbot'],
      category: 'automation',
    },
    {
      id: '3',
      title: 'Code Review Assistance',
      messages: [
        {
          id: 'm5',
          type: 'user',
          content: 'Can you review this JavaScript function for potential issues?',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
        },
        {
          id: 'm6',
          type: 'assistant',
          content: 'I\'d be happy to review your JavaScript function! However, I don\'t see the code in your message. Could you please share the function you\'d like me to review?\n\nOnce you provide the code, I can help with:\n• Syntax and logic errors\n• Performance optimizations\n• Security vulnerabilities\n• Best practices and code style\n• Alternative implementations\n\nPlease paste your code and I\'ll provide a detailed analysis!',
          timestamp: new Date(Date.now() - 40 * 60 * 1000),
          confidence: 0.89,
          suggestions: [
            'Share the code',
            'Explain the function purpose',
            'Describe expected behavior',
            'Mention any specific concerns'
          ]
        }
      ],
      createdAt: new Date(Date.now() - 45 * 60 * 1000),
      updatedAt: new Date(Date.now() - 40 * 60 * 1000),
      isPinned: false,
      tags: ['code-review', 'javascript', 'development'],
      category: 'technical',
    },
  ];

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
  const currentAgent = aiAgents.find(agent => agent.id === selectedAgent);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false);
        setNewMessage('');
      }, 2000);
    }
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as unknown as { webkitSpeechRecognition: new () => SpeechRecognition }).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setNewMessage(transcript);
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
      }
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'analytics': return 'bg-blue-500';
      case 'automation': return 'bg-green-500';
      case 'creative': return 'bg-purple-500';
      case 'technical': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-purple-500" />
                  <span>AI Assistant</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">TransBot AI Conversations</p>
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

        {/* AI Agent Selection */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Active Agent</h3>
            <div className="space-y-2">
              {aiAgents.slice(0, 2).map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAgent === agent.id
                      ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{agent.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{agent.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${agent.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{agent.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['all', 'analytics', 'automation', 'creative', 'technical'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filterCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations
            .filter(conv => 
              (filterCategory === 'all' || conv.category === filterCategory) &&
              (searchQuery === '' || conv.title.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            .map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                  selectedConversation === conversation.id
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-l-4 border-l-purple-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {sidebarCollapsed ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getCategoryColor(conversation.category)}`}>
                        {conversation.category.charAt(0).toUpperCase()}
                      </div>
                      {conversation.isPinned && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getCategoryColor(conversation.category)}`}></div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {conversation.title}
                          </h3>
                          {conversation.isPinned && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded-full text-white ${getCategoryColor(conversation.category)}`}>
                            {conversation.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-2">
                      {conversation.messages[conversation.messages.length - 1]?.content.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(conversation.updatedAt)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conversation.messages.length} messages
                      </span>
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
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">TransBot AI</p>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
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
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{currentAgent?.avatar}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {currentAgent?.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {currentAgent?.responseTime}s response time
                        </span>
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {currentAgent?.accuracy}% accuracy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Bookmark className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <History className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentConversation?.messages.map((message) => {
                const isUser = message.type === 'user';

                return (
                  <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-2xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      {!isUser && (
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            <Bot className="w-4 h-4" />
                          </div>
                        </div>
                      )}
                      
                      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                        {!isUser && (
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {currentAgent?.name}
                            </span>
                            {message.confidence && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {Math.round(message.confidence * 100)}% confidence
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className={`relative px-4 py-3 rounded-2xl ${
                          isUser 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-white'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Suggestions:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, idx) => (
                                  <button
                                    key={idx}
                                    className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Actions:</p>
                              <div className="flex flex-wrap gap-2">
                                {message.actions.map((action) => (
                                  <button
                                    key={action.id}
                                    className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                  >
                                    <action.icon className="w-3 h-3" />
                                    <span>{action.label}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Sources:</p>
                              <div className="space-y-1">
                                {message.sources.map((source, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg">
                                    <span className="text-xs text-gray-700 dark:text-gray-300">{source.title}</span>
                                    <span className="text-xs text-gray-500">{source.relevance}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className={`flex items-center space-x-1 mt-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                          {!isUser && message.confidence && (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {Math.round(message.confidence * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">TransBot is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-end space-x-3">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask TransBot AI anything..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={1}
                    style={{ minHeight: '48px', maxHeight: '120px' }}
                  />
                  
                  <button className="absolute right-3 top-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                    <Zap className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isProcessing}
                  className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
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
                    <Brain className="w-4 h-4 text-gray-500 dark:text-gray-400" />
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
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Welcome to TransBot AI
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                Your intelligent AI assistant is ready to help with analytics, automation, creative tasks, and technical support.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Analytics</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Data analysis & insights</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Zap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Automation</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Workflow optimization</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Lightbulb className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Creative</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Content & design help</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Code className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Technical</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Code & debugging</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPage;
