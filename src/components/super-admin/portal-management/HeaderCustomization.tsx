import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  Eye, 
  Search, 
  Bell, 
  User, 
  Settings, 
  Sun, 
  MessageSquare,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  X,
  Layout,
  Palette
} from 'lucide-react';

interface HeaderTemplate {
  id: string;
  name: string;
  layout: string;
  logo: {
    enabled: boolean;
    position: string;
    size: string;
  };
  search: {
    enabled: boolean;
    placeholder: string;
    position: string;
  };
  navigation: {
    enabled: boolean;
    items: string[];
  };
  actions: {
    notifications: boolean;
    messages: boolean;
    profile: boolean;
    theme: boolean;
    settings: boolean;
  };
  styling: {
    theme: string;
    background: string;
    textColor: string;
    borderColor: string;
    shadow: string;
  };
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
}

const HeaderCustomization = () => {
  // CRUD State Variables
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<HeaderTemplate | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<HeaderTemplate | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock data for header templates
  const [headerTemplates, setHeaderTemplates] = useState<HeaderTemplate[]>([
    {
      id: '1',
      name: 'Standard Header',
      layout: 'standard',
      logo: { enabled: true, position: 'left', size: 'medium' },
      search: { enabled: true, placeholder: 'Search...', position: 'center' },
      navigation: { enabled: true, items: ['dashboard', 'analytics', 'reports', 'settings'] },
      actions: { notifications: true, messages: true, profile: true, theme: true, settings: true },
      styling: { theme: 'light', background: 'white', textColor: 'gray-900', borderColor: 'gray-200', shadow: 'sm' },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    },
    {
      id: '2',
      name: 'Minimal Header',
      layout: 'minimal',
      logo: { enabled: true, position: 'left', size: 'small' },
      search: { enabled: false, placeholder: '', position: 'center' },
      navigation: { enabled: false, items: [] },
      actions: { notifications: true, messages: false, profile: true, theme: true, settings: false },
      styling: { theme: 'dark', background: 'gray-900', textColor: 'white', borderColor: 'gray-700', shadow: 'none' },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    },
    {
      id: '3',
      name: 'Enterprise Header',
      layout: 'enterprise',
      logo: { enabled: true, position: 'left', size: 'large' },
      search: { enabled: true, placeholder: 'Search employees, reports...', position: 'center' },
      navigation: { enabled: true, items: ['dashboard', 'analytics', 'reports', 'settings', 'admin', 'users'] },
      actions: { notifications: true, messages: true, profile: true, theme: true, settings: true },
      styling: { theme: 'light', background: 'blue-50', textColor: 'blue-900', borderColor: 'blue-200', shadow: 'lg' },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isActive: false
    }
  ]);

  const [currentConfig, setCurrentConfig] = useState<HeaderTemplate['logo' | 'search' | 'navigation' | 'actions' | 'styling']>({
    logo: { enabled: true, position: 'left', size: 'medium' },
    search: { enabled: true, placeholder: 'Search...', position: 'center' },
    navigation: { enabled: true, items: ['dashboard', 'analytics', 'reports', 'settings'] },
    actions: { notifications: true, messages: true, profile: true, theme: true, settings: true },
    styling: { theme: 'light', background: 'white', textColor: 'gray-900', borderColor: 'gray-200', shadow: 'sm' }
  });

  // Notification system
  const addNotification = useCallback((type: Notification['type'], message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  // CRUD Functions
  const handleCreateTemplate = useCallback(() => {
    try {
      const newTemplate: HeaderTemplate = {
        id: Date.now().toString(),
        name: 'Custom Header Template',
        layout: 'standard',
        logo: currentConfig.logo,
        search: currentConfig.search,
        navigation: currentConfig.navigation,
        actions: currentConfig.actions,
        styling: currentConfig.styling,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      };
      
      setHeaderTemplates(prev => [...prev, newTemplate]);
      setShowCreateModal(false);
      addNotification('success', 'Header template created successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification('error', `Failed to create template: ${errorMessage}`);
    }
  }, [currentConfig, addNotification]);

  const handleEditTemplate = useCallback((template: HeaderTemplate) => {
    setEditingTemplate(template);
    setCurrentConfig({
      logo: template.logo,
      search: template.search,
      navigation: template.navigation,
      actions: template.actions,
      styling: template.styling
    });
    setShowEditModal(true);
  }, []);

  const handleUpdateTemplate = useCallback(() => {
    if (!editingTemplate) return;
    
    try {
      const updatedTemplate: HeaderTemplate = {
        ...editingTemplate,
        name: editingTemplate.name,
        logo: currentConfig.logo,
        search: currentConfig.search,
        navigation: currentConfig.navigation,
        actions: currentConfig.actions,
        styling: currentConfig.styling,
        updatedAt: new Date().toISOString()
      };
      
      setHeaderTemplates(prev => 
        prev.map(template => 
          template.id === editingTemplate.id ? updatedTemplate : template
        )
      );
      setShowEditModal(false);
      setEditingTemplate(null);
      addNotification('success', 'Header template updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification('error', `Failed to update template: ${errorMessage}`);
    }
  }, [editingTemplate, currentConfig, addNotification]);

  const handleDeleteTemplate = useCallback((templateId: string) => {
    setDeletingTemplateId(templateId);
    setShowDeleteModal(true);
  }, []);

  const confirmDeleteTemplate = useCallback(() => {
    if (!deletingTemplateId) return;
    
    try {
      setHeaderTemplates(prev => prev.filter(template => template.id !== deletingTemplateId));
      setShowDeleteModal(false);
      setDeletingTemplateId(null);
      addNotification('success', 'Header template deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification('error', `Failed to delete template: ${errorMessage}`);
    }
  }, [deletingTemplateId, addNotification]);

  const handleViewTemplate = useCallback((template: HeaderTemplate) => {
    setViewingTemplate(template);
    setShowViewModal(true);
  }, []);

  const toggleActionMenu = useCallback((templateId: string | null) => {
    setShowActionMenu(showActionMenu === templateId ? null : templateId);
  }, [showActionMenu]);

  const handleCreateClick = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionMenu) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showActionMenu]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg shadow-lg ${
                notification.type === 'success' ? 'bg-green-500 text-white' :
                notification.type === 'error' ? 'bg-red-500 text-white' :
                notification.type === 'warning' ? 'bg-yellow-500 text-white' :
                'bg-blue-500 text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Settings className="w-5 h-5" />}
                <span className="font-medium">{notification.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Header Customization</h1>
              <p className="text-gray-600 dark:text-gray-400">Create and manage header templates for different layouts</p>
            </div>
            <button
              onClick={handleCreateClick}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Template</span>
            </button>
          </div>
        </div>

        {/* Header Templates Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Header Templates</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your header templates</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Layout</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Features</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Theme</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {headerTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.layout === 'standard' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        template.layout === 'minimal' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      }`}>
                        {template.layout.charAt(0).toUpperCase() + template.layout.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {[
                        template.logo.enabled && 'Logo',
                        template.search.enabled && 'Search',
                        template.navigation.enabled && 'Nav',
                        template.actions.notifications && 'Notifications',
                        template.actions.messages && 'Messages'
                      ].filter(Boolean).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {template.styling.theme.charAt(0).toUpperCase() + template.styling.theme.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => toggleActionMenu(template.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                        
                        {showActionMenu === template.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                            <button
                              onClick={() => {
                                handleViewTemplate(template);
                                toggleActionMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => {
                                handleEditTemplate(template);
                                toggleActionMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                            >
                              <Edit className="w-4 h-4" />
                              <span>Edit Template</span>
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteTemplate(template.id);
                                toggleActionMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2>
          
          {/* Header Preview */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              {/* Logo */}
              {currentConfig.logo.enabled && (
                <div className="flex items-center space-x-2">
                  <div className={`bg-blue-600 rounded-lg flex items-center justify-center ${
                    currentConfig.logo.size === 'small' ? 'w-6 h-6' :
                    currentConfig.logo.size === 'medium' ? 'w-8 h-8' :
                    'w-10 h-10'
                  }`}>
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">TransBot AI</span>
                </div>
              )}

              {/* Search */}
              {currentConfig.search.enabled && (
                <div className="flex-1 max-w-md mx-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={currentConfig.search.placeholder}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {currentConfig.actions.notifications && (
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
                {currentConfig.actions.messages && (
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
                {currentConfig.actions.theme && (
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Sun className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
                {currentConfig.actions.profile && (
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
                {currentConfig.actions.settings && (
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Logo Customization</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">Position, size, and visibility controls</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-300">Search Integration</h3>
              <p className="text-sm text-green-600 dark:text-green-400">Customizable search bar with placeholder text</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300">Action Buttons</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Notifications, messages, theme, profile, settings</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Theme Support</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Light and dark mode compatibility</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Header Template</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value="Custom Header Template"
                    readOnly
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Configuration
                  </label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Logo: {currentConfig.logo.enabled ? 'Enabled' : 'Disabled'}</p>
                    <p>• Search: {currentConfig.search.enabled ? 'Enabled' : 'Disabled'}</p>
                    <p>• Navigation: {currentConfig.navigation.enabled ? 'Enabled' : 'Disabled'}</p>
                    <p>• Actions: {Object.values(currentConfig.actions).filter(Boolean).length} enabled</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTemplate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Template
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Header Template</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    readOnly
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Configuration
                  </label>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Logo: {currentConfig.logo.enabled ? 'Enabled' : 'Disabled'}</p>
                    <p>• Search: {currentConfig.search.enabled ? 'Enabled' : 'Disabled'}</p>
                    <p>• Navigation: {currentConfig.navigation.enabled ? 'Enabled' : 'Disabled'}</p>
                    <p>• Actions: {Object.values(currentConfig.actions).filter(Boolean).length} enabled</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateTemplate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Template
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && viewingTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Template Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{viewingTemplate.name}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Layout
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{viewingTemplate.layout}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {viewingTemplate.logo.enabled && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm">Logo</span>}
                    {viewingTemplate.search.enabled && <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-full text-sm">Search</span>}
                    {viewingTemplate.navigation.enabled && <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 rounded-full text-sm">Navigation</span>}
                    {viewingTemplate.actions.notifications && <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-full text-sm">Notifications</span>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Theme
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{viewingTemplate.styling.theme}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    viewingTemplate.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {viewingTemplate.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Created
                  </label>
                  <p className="text-gray-900 dark:text-white">{new Date(viewingTemplate.createdAt).toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Updated
                  </label>
                  <p className="text-gray-900 dark:text-white">{new Date(viewingTemplate.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Delete</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this header template? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteTemplate}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderCustomization;