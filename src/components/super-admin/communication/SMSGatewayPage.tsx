import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  Users,
  Clock,
  Star,
  Archive,
  Trash2,
  Settings,
  Search,
  Filter,
  Plus,
  MoreVertical,
  AlertTriangle,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
  Globe,
  Wifi,
  Signal,
  Battery,
} from 'lucide-react';

interface SMSMessage {
  id: string;
  to: string;
  from: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  type: 'sms' | 'mms';
  cost: number;
  deliveryReport?: {
    deliveredAt: Date;
    readAt?: Date;
    failureReason?: string;
  };
  campaignId?: string;
  tags: string[];
}

interface SMSCampaign {
  id: string;
  name: string;
  description: string;
  recipients: number;
  sent: number;
  delivered: number;
  failed: number;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused';
  scheduledAt?: Date;
  createdAt: Date;
  tags: string[];
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  group: string;
  tags: string[];
  isActive: boolean;
  lastContact?: Date;
}

const SMSGatewayPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'messages' | 'campaigns' | 'contacts' | 'analytics'>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    content: '',
    type: 'sms' as 'sms' | 'mms'
  });

  // Mock data
  const messages: SMSMessage[] = [
    {
      id: '1',
      to: '+1 (555) 123-4567',
      from: 'TransBot',
      content: 'Your delivery has been scheduled for tomorrow at 2:00 PM. Track your shipment at: https://track.transbot.com/12345',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'delivered',
      type: 'sms',
      cost: 0.05,
      deliveryReport: {
        deliveredAt: new Date(Date.now() - 25 * 60 * 1000),
        readAt: new Date(Date.now() - 20 * 60 * 1000)
      },
      tags: ['delivery', 'tracking']
    },
    {
      id: '2',
      to: '+1 (555) 987-6543',
      from: 'TransBot',
      content: 'Reminder: Your appointment is tomorrow at 10:00 AM. Please arrive 15 minutes early.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'sent',
      type: 'sms',
      cost: 0.05,
      tags: ['reminder', 'appointment']
    },
    {
      id: '3',
      to: '+1 (555) 456-7890',
      from: 'TransBot',
      content: 'Welcome to TransBot! Your account has been activated. Download our app: https://app.transbot.com',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'delivered',
      type: 'sms',
      cost: 0.05,
      deliveryReport: {
        deliveredAt: new Date(Date.now() - 23 * 60 * 60 * 1000)
      },
      tags: ['welcome', 'onboarding']
    }
  ];

  const campaigns: SMSCampaign[] = [
    {
      id: 'c1',
      name: 'Q4 Promotional Campaign',
      description: 'Promotional messages for Q4 sales',
      recipients: 1000,
      sent: 1000,
      delivered: 987,
      failed: 13,
      status: 'completed',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      tags: ['promotion', 'q4', 'sales']
    },
    {
      id: 'c2',
      name: 'Holiday Greetings',
      description: 'Holiday greeting messages to all customers',
      recipients: 5000,
      sent: 4500,
      delivered: 4450,
      failed: 50,
      status: 'sending',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ['holiday', 'greetings']
    }
  ];

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john@example.com',
      group: 'VIP Customers',
      tags: ['premium', 'frequent'],
      isActive: true,
      lastContact: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      phone: '+1 (555) 987-6543',
      email: 'sarah@company.com',
      group: 'Regular Customers',
      tags: ['regular', 'business'],
      isActive: true,
      lastContact: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'sent': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      case 'pending': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCheck className="w-4 h-4 text-green-600" />;
      case 'sent': return <Check className="w-4 h-4 text-blue-600" />;
      case 'failed': return <X className="w-4 h-4 text-red-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.to && newMessage.content) {
      console.log('Sending SMS:', newMessage);
      setNewMessage({ to: '', content: '', type: 'sms' });
      setShowCompose(false);
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
                  <MessageSquare className="w-6 h-6 text-green-500" />
                  <span>SMS Gateway</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">SMS messaging & automation</p>
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

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowCompose(true)}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mb-2"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Send SMS</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Zap className="w-4 h-4" />
              <span className="font-medium">Create Campaign</span>
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {[
                { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.length },
                { id: 'campaigns', label: 'Campaigns', icon: Users, count: campaigns.length },
                { id: 'contacts', label: 'Contacts', icon: Users, count: contacts.length },
                { id: 'analytics', label: 'Analytics', icon: Zap, count: null },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'messages' | 'contacts' | 'analytics')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.count !== null && (
                    <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">SMS Gateway</p>
                  <p className="text-xs text-green-600">Active</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {selectedTab}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedTab === 'messages' && `Manage your SMS messages and delivery status`}
                {selectedTab === 'campaigns' && `Create and manage SMS campaigns`}
                {selectedTab === 'contacts' && `Manage your contact list and groups`}
                {selectedTab === 'analytics' && `View SMS performance and analytics`}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {selectedTab === 'messages' && (
                <button
                  onClick={() => setShowCompose(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Send SMS</span>
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedTab === 'messages' && (
            <div className="space-y-4">
              {messages
                .filter(msg => 
                  msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  msg.to.includes(searchQuery)
                )
                .map((message) => (
                  <div key={message.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{message.to}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(message.timestamp)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(message.status)}
                        <span className={`text-sm font-medium ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{message.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Type: {message.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Cost: ${message.cost.toFixed(2)}
                        </span>
                        {message.deliveryReport?.deliveredAt && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Delivered: {formatDate(message.deliveryReport.deliveredAt)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {message.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {selectedTab === 'campaigns' && (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{campaign.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{campaign.description}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'sending' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.recipients}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Recipients</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{campaign.sent}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{campaign.delivered}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">{campaign.failed}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Failed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {formatDate(campaign.createdAt)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {campaign.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'contacts' && (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        contact.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Group: {contact.group}
                      </p>
                      {contact.lastContact && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last contact: {formatDate(contact.lastContact)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {contact.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Messages</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <CheckCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1,156</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                    <X className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">78</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Failed</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$61.70</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Send SMS</h3>
                <button
                  onClick={() => setShowCompose(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                <input
                  type="tel"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                  value={newMessage.content}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Type your message here..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {newMessage.content.length}/160 characters
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowCompose(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.to || !newMessage.content}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Send SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SMSGatewayPage;
