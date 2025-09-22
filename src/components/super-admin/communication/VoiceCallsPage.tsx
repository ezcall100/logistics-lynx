import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  Settings,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Square,
  Star,
  Clock,
  Users,
  MessageCircle,
  Calendar,
  MapPin,
  User,
  UserPlus,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Zap,
  Headphones,
  Speaker,
  Bluetooth,
  Wifi,
  Signal,
  Battery,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

interface Call {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed';
  contactId: string;
  contactName: string;
  contactAvatar: string;
  contactNumber: string;
  duration: number;
  timestamp: Date;
  isRecording?: boolean;
  recordingUrl?: string;
  notes?: string;
  tags: string[];
  status: 'active' | 'ended' | 'missed' | 'voicemail';
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  location?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  number: string;
  email?: string;
  company?: string;
  department?: string;
  isOnline: boolean;
  lastSeen?: Date;
  callHistory: Call[];
  notes?: string;
  tags: string[];
}

interface ActiveCall {
  id: string;
  contact: Contact;
  duration: number;
  isRecording: boolean;
  isMuted: boolean;
  isOnHold: boolean;
  isVideoEnabled: boolean;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  startTime: Date;
}

const VoiceCallsPage: React.FC = () => {
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isDialing, setIsDialing] = useState(false);
  const [dialNumber, setDialNumber] = useState('');
  const [showDialer, setShowDialer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'contacts' | 'history' | 'favorites'>('contacts');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mock contacts
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'JD',
      number: '+1 (555) 123-4567',
      email: 'john@example.com',
      company: 'ABC Corp',
      department: 'Sales',
      isOnline: true,
      lastSeen: new Date(Date.now() - 5 * 60 * 1000),
      callHistory: [
        {
          id: 'c1',
          type: 'outgoing',
          contactId: '1',
          contactName: 'John Doe',
          contactAvatar: 'JD',
          contactNumber: '+1 (555) 123-4567',
          duration: 180,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'ended',
          quality: 'excellent',
          tags: ['business', 'follow-up'],
          notes: 'Discussed Q4 sales targets'
        }
      ],
      tags: ['business', 'sales', 'important'],
      notes: 'Key client - prefers morning calls'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: 'SW',
      number: '+1 (555) 987-6543',
      email: 'sarah@company.com',
      company: 'XYZ Ltd',
      department: 'Support',
      isOnline: false,
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
      callHistory: [
        {
          id: 'c2',
          type: 'incoming',
          contactId: '2',
          contactName: 'Sarah Wilson',
          contactAvatar: 'SW',
          contactNumber: '+1 (555) 987-6543',
          duration: 240,
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          status: 'ended',
          quality: 'good',
          tags: ['support', 'technical'],
          notes: 'Resolved login issue'
        }
      ],
      tags: ['support', 'technical', 'regular'],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'MJ',
      number: '+1 (555) 456-7890',
      email: 'mike@tech.com',
      company: 'Tech Solutions',
      department: 'Engineering',
      isOnline: true,
      lastSeen: new Date(Date.now() - 2 * 60 * 1000),
      callHistory: [
        {
          id: 'c3',
          type: 'missed',
          contactId: '3',
          contactName: 'Mike Johnson',
          contactAvatar: 'MJ',
          contactNumber: '+1 (555) 456-7890',
          duration: 0,
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          status: 'missed',
          quality: 'good',
          tags: ['missed', 'urgent'],
          notes: 'Missed call - needs callback'
        }
      ],
      tags: ['engineering', 'urgent', 'callback'],
    },
  ];

  const currentContact = contacts.find(contact => contact.id === selectedContact);

  useEffect(() => {
    if (activeCall) {
      callTimerRef.current = setInterval(() => {
        setActiveCall(prev => prev ? { ...prev, duration: prev.duration + 1 } : null);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [activeCall]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const getCallTypeColor = (type: string) => {
    switch (type) {
      case 'incoming': return 'text-green-600';
      case 'outgoing': return 'text-blue-600';
      case 'missed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming': return '↓';
      case 'outgoing': return '↑';
      case 'missed': return '✕';
      default: return '•';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCall = (contact: Contact) => {
    setIsDialing(true);
    setTimeout(() => {
      setIsDialing(false);
      setActiveCall({
        id: `call-${Date.now()}`,
        contact,
        duration: 0,
        isRecording: false,
        isMuted: false,
        isOnHold: false,
        isVideoEnabled: false,
        quality: 'excellent',
        startTime: new Date(),
      });
    }, 2000);
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const handleToggleMute = () => {
    setActiveCall(prev => prev ? { ...prev, isMuted: !prev.isMuted } : null);
  };

  const handleToggleRecording = () => {
    setActiveCall(prev => prev ? { ...prev, isRecording: !prev.isRecording } : null);
  };

  const handleToggleHold = () => {
    setActiveCall(prev => prev ? { ...prev, isOnHold: !prev.isOnHold } : null);
  };

  const handleDial = () => {
    if (dialNumber.trim()) {
      const contact = {
        id: 'dial',
        name: dialNumber,
        avatar: 'DI',
        number: dialNumber,
        isOnline: true,
        callHistory: [],
        tags: [],
      };
      handleCall(contact);
      setShowDialer(false);
      setDialNumber('');
    }
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
                  <Phone className="w-6 h-6 text-green-500" />
                  <span>Voice Calls</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Call management & history</p>
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

        {/* View Mode Tabs */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { id: 'contacts', label: 'Contacts', icon: Users },
                { id: 'history', label: 'History', icon: Clock },
                { id: 'favorites', label: 'Favorites', icon: Star },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as 'grid' | 'list' | 'timeline')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode.id
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </button>
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
                placeholder="Search contacts or numbers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            {viewMode === 'history' && (
              <div className="flex space-x-2">
                {['all', 'incoming', 'outgoing', 'missed'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filterType === type
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowDialer(true)}
                className="flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Dial</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Contact</span>
              </button>
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === 'contacts' && (
            <div className="space-y-1">
              {contacts
                .filter(contact => 
                  contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  contact.number.includes(searchQuery)
                )
                .map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                      selectedContact === contact.id
                        ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-l-green-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {sidebarCollapsed ? (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {contact.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                            contact.isOnline ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(contact);
                          }}
                          className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {contact.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${
                                contact.isOnline ? 'bg-green-400' : 'bg-gray-400'
                              }`}></div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">{contact.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{contact.number}</p>
                              {contact.company && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">{contact.company}</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCall(contact);
                            }}
                            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {contact.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}

          {viewMode === 'history' && (
            <div className="space-y-1">
              {contacts
                .flatMap(contact => contact.callHistory.map(call => ({ ...call, contact })))
                .filter(call => 
                  filterType === 'all' || call.type === filterType
                )
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map((call) => (
                  <div
                    key={call.id}
                    className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {call.contactAvatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">{call.contactName}</h3>
                            <span className={`text-sm ${getCallTypeColor(call.type)}`}>
                              {getCallTypeIcon(call.type)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{call.contactNumber}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(call.timestamp)}
                            </span>
                            {call.duration > 0 && (
                              <>
                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatDuration(call.duration)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getQualityColor(call.quality)}`}></div>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors">
                          <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Voice System</p>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeCall ? (
          /* Active Call Interface */
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                  {activeCall.contact.avatar}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{activeCall.contact.name}</h3>
              <p className="text-lg opacity-90 mb-4">{activeCall.contact.number}</p>
              <p className="text-4xl font-mono mb-8">{formatDuration(activeCall.duration)}</p>
              
              <div className="flex items-center justify-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Signal className="w-5 h-5" />
                  <span className="text-sm">Signal: Excellent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className="w-5 h-5" />
                  <span className="text-sm">Battery: 85%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-5 h-5" />
                  <span className="text-sm">WiFi Connected</span>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleToggleMute}
                  className={`p-4 rounded-full transition-colors ${
                    activeCall.isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  {activeCall.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={handleToggleRecording}
                  className={`p-4 rounded-full transition-colors ${
                    activeCall.isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Square className="w-6 h-6" />
                </button>
                
                <button
                  onClick={handleToggleHold}
                  className={`p-4 rounded-full transition-colors ${
                    activeCall.isOnHold ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Pause className="w-6 h-6" />
                </button>
                
                <button className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Volume2 className="w-6 h-6" />
                </button>
                
                <button
                  onClick={handleEndCall}
                  className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
              
              {activeCall.isRecording && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-red-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Recording in progress...</span>
                </div>
              )}
              
              {activeCall.isOnHold && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-yellow-300">
                  <Pause className="w-4 h-4" />
                  <span className="text-sm">Call on hold</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* No Active Call */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Voice Calls Ready
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                Make and receive calls with high-quality audio, recording capabilities, and advanced call management features.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Contacts</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contacts.length} available</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Call History</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Track all calls</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Favorites</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Quick access</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialer Modal */}
      <AnimatePresence>
        {showDialer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDialer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dial Number</h3>
                <div className="space-y-4">
                  <input
                    type="tel"
                    value={dialNumber}
                    onChange={(e) => setDialNumber(e.target.value)}
                    placeholder="Enter phone number..."
                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowDialer(false)}
                      className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDial}
                      disabled={!dialNumber.trim()}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceCallsPage;
