import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  Phone,
  Video,
  Calendar,
  FileText,
  CheckSquare,
  MessageSquare,
  Palette,
  Layout,
  Bell,
  Save,
  RefreshCw,
  Plus,
  Edit,
  Copy,
  Move,
  Lock,
  Smartphone,
  Monitor,
  Shield,
} from 'lucide-react';

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockCustomizationData = {
  themes: [
    {
      id: 1,
      name: 'Default Theme',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      isActive: true,
      isDefault: true
    },
    {
      id: 2,
      name: 'Dark Theme',
      primaryColor: '#6366F1',
      secondaryColor: '#A855F7',
      backgroundColor: '#1F2937',
      textColor: '#F9FAFB',
      isActive: false,
      isDefault: false
    },
    {
      id: 3,
      name: 'Corporate Theme',
      primaryColor: '#059669',
      secondaryColor: '#0D9488',
      backgroundColor: '#FFFFFF',
      textColor: '#111827',
      isActive: false,
      isDefault: false
    }
  ],
  layouts: [
    {
      id: 1,
      name: 'Default Layout',
      description: 'Standard communication hub layout',
      icon: Layout,
      isActive: true,
      isDefault: true
    },
    {
      id: 2,
      name: 'Compact Layout',
      description: 'Condensed view for smaller screens',
      icon: Monitor,
      isActive: false,
      isDefault: false
    },
    {
      id: 3,
      name: 'Mobile Layout',
      description: 'Optimized for mobile devices',
      icon: Smartphone,
      isActive: false,
      isDefault: false
    }
  ],
  channels: [
    {
      id: 1,
      name: 'AI Assistant',
      icon: MessageCircle,
      enabled: true,
      position: 1,
      color: '#8B5CF6',
      description: 'TransBot AI Assistant for automated responses'
    },
    {
      id: 2,
      name: 'Live Chat',
      icon: MessageSquare,
      enabled: true,
      position: 2,
      color: '#3B82F6',
      description: 'Real-time chat with support team'
    },
    {
      id: 3,
      name: 'Email',
      icon: Mail,
      enabled: true,
      position: 3,
      color: '#10B981',
      description: 'Email communication and notifications'
    },
    {
      id: 4,
      name: 'Phone',
      icon: Phone,
      enabled: true,
      position: 4,
      color: '#F59E0B',
      description: 'Voice calls and phone support'
    },
    {
      id: 5,
      name: 'Video',
      icon: Video,
      enabled: true,
      position: 5,
      color: '#EF4444',
      description: 'Video calls and screen sharing'
    },
    {
      id: 6,
      name: 'SMS',
      icon: MessageSquare,
      enabled: false,
      position: 6,
      color: '#06B6D4',
      description: 'SMS messaging and notifications'
    },
    {
      id: 7,
      name: 'Calendar',
      icon: Calendar,
      enabled: true,
      position: 7,
      color: '#6366F1',
      description: 'Calendar events and scheduling'
    },
    {
      id: 8,
      name: 'Tasks',
      icon: CheckSquare,
      enabled: true,
      position: 8,
      color: '#059669',
      description: 'Task management and to-dos'
    },
    {
      id: 9,
      name: 'Notes',
      icon: FileText,
      enabled: true,
      position: 9,
      color: '#6B7280',
      description: 'Note-taking and documentation'
    }
  ],
  notifications: {
    email: true,
    push: true,
    sms: false,
    desktop: true,
    sound: true,
    vibration: false
  },
  permissions: {
    admin: ['all'],
    manager: ['chat', 'email', 'phone', 'video', 'calendar', 'tasks', 'notes'],
    user: ['chat', 'email', 'calendar', 'tasks', 'notes'],
    guest: ['chat', 'email']
  }
};

const CommunicationHubCustomization: React.FC = () => {
  const [activeTab, setActiveTab] = useState('themes');
  const [themes, setThemes] = useState(mockCustomizationData.themes);
  const [layouts, setLayouts] = useState(mockCustomizationData.layouts);
  const [channels, setChannels] = useState(mockCustomizationData.channels);
  const [notifications, setNotifications] = useState(mockCustomizationData.notifications);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleThemeChange = (themeId: number) => {
    setThemes(prev => prev.map(theme => ({
      ...theme,
      isActive: theme.id === themeId
    })));
  };

  const handleLayoutChange = (layoutId: number) => {
    setLayouts(prev => prev.map(layout => ({
      ...layout,
      isActive: layout.id === layoutId
    })));
  };

  const handleChannelToggle = (channelId: number) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };


  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const tabs = [
    { id: 'themes', label: 'Themes', icon: Palette },
    { id: 'layouts', label: 'Layouts', icon: Layout },
    { id: 'channels', label: 'Channels', icon: MessageCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'permissions', label: 'Permissions', icon: Shield }
  ];

  if (isLoading) {
    return (
    <div className="flex items-center justify-center h-96 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span className="text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Loading customization settings...</span>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Communication Hub Customization</h1>
          <p className="text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Customize the appearance and behavior of the Communication Hub</p>
        </div>
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Save className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
            aria-label="Button"
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
        {activeTab === 'themes' && (
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Theme Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: theme.id * 0.1 }}
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                    theme.isActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  {theme.isActive && (
                    <div className="absolute top-2 right-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="w-2 h-2 bg-white rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">{theme.name}</h4>
                      {theme.isDefault && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="w-4 h-4 rounded responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ backgroundColor: theme.primaryColor }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Primary</span>
                      </div>
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="w-4 h-4 rounded responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ backgroundColor: theme.secondaryColor }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Secondary</span>
                      </div>
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="w-4 h-4 rounded border border-gray-300 responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ backgroundColor: theme.backgroundColor }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Background</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'layouts' && (
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Layout Customization</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {layouts.map((layout) => {
                const Icon = layout.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.div
                    key={layout.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: layout.id * 0.1 }}
                    className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      layout.isActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => handleLayoutChange(layout.id)}
                  >
                    {layout.isActive && (
                      <div className="absolute top-2 right-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="w-2 h-2 bg-white rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                        </div>
                      </div>
                    )}
                    <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">{layout.name}</h4>
                        {layout.isDefault && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                        <Icon className="h-8 w-8 text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{layout.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Channel Configuration</h3>
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Add Channel</span>
              </button>
            </div>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Move className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                        <span className="text-sm text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{channel.position}</span>
                      </div>
                      <div
                        className="p-2 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{ backgroundColor: `${channel.color}20`, color: channel.color }}
                      >
                        <Icon className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">{channel.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{channel.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button
                        onClick={() => handleChannelToggle(channel.id)}
            aria-label="Button"
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channel.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channel.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Edit className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Copy className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Notification Settings</h3>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                      <Bell className="h-5 w-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize responsive-container sm:flex-col md:flex-row lg:grid">{key} Notifications</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        {key === 'email' && 'Receive email notifications for new messages'}
                        {key === 'push' && 'Receive push notifications on mobile devices'}
                        {key === 'sms' && 'Receive SMS notifications for urgent messages'}
                        {key === 'desktop' && 'Receive desktop notifications'}
                        {key === 'sound' && 'Play sound for new notifications'}
                        {key === 'vibration' && 'Vibrate device for notifications'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(key)}
            aria-label="Button"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Permission Settings</h3>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {Object.entries(mockCustomizationData.permissions).map(([role, permissions]) => (
                <div key={role} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize responsive-container sm:flex-col md:flex-row lg:grid">{role} Role</h4>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Lock className="h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        {permissions.length} permissions
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    {permissions.map((permission) => (
                      <span
                        key={permission}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunicationHubCustomization;
