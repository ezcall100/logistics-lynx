import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Save, 
  Eye, 
  BarChart3,
  Users,
  Calendar,
  FileText,
  TrendingUp,
  Activity,
  Bell,
  Mail,
  Database,
  Shield,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  X,
  Settings
} from 'lucide-react';

interface DashboardTemplate {
  id: string;
  name: string;
  role: string;
  layout: string;
  widgets: string[];
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

const UserDashboardBuilder = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [dashboardLayout, setDashboardLayout] = useState('grid');
  const [selectedWidgets, setSelectedWidgets] = useState(['stats', 'charts', 'recent-activity']);
  
  // CRUD State Variables
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DashboardTemplate | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<DashboardTemplate | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock data for dashboard templates
  const [dashboardTemplates, setDashboardTemplates] = useState<DashboardTemplate[]>([
    {
      id: '1',
      name: 'Admin Dashboard',
      role: 'admin',
      layout: 'grid',
      widgets: ['stats', 'charts', 'recent-activity', 'user-list'],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    },
    {
      id: '2',
      name: 'Manager Dashboard',
      role: 'manager',
      layout: 'list',
      widgets: ['stats', 'charts', 'notifications', 'calendar'],
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    },
    {
      id: '3',
      name: 'Analyst Dashboard',
      role: 'analyst',
      layout: 'grid',
      widgets: ['charts', 'database', 'recent-activity', 'documents'],
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      isActive: false
    }
  ]);

  const roles = [
    { id: 'admin', name: 'Administrator', color: 'bg-red-500' },
    { id: 'manager', name: 'Manager', color: 'bg-blue-500' },
    { id: 'analyst', name: 'Analyst', color: 'bg-green-500' },
    { id: 'support', name: 'Support', color: 'bg-yellow-500' }
  ];

  const availableWidgets = [
    { id: 'stats', name: 'Statistics', icon: BarChart3, category: 'analytics', description: 'Display key performance metrics and statistics' },
    { id: 'charts', name: 'Charts', icon: TrendingUp, category: 'analytics', description: 'Visualize data with interactive charts and graphs' },
    { id: 'recent-activity', name: 'Recent Activity', icon: Activity, category: 'activity', description: 'Show recent user activities and system events' },
    { id: 'user-list', name: 'User List', icon: Users, category: 'users', description: 'Display list of users and their status' },
    { id: 'notifications', name: 'Notifications', icon: Bell, category: 'communication', description: 'Show system notifications and alerts' },
    { id: 'messages', name: 'Messages', icon: Mail, category: 'communication', description: 'Display recent messages and communications' },
    { id: 'calendar', name: 'Calendar', icon: Calendar, category: 'productivity', description: 'Show calendar events and schedule' },
    { id: 'documents', name: 'Documents', icon: FileText, category: 'productivity', description: 'Display recent documents and files' },
    { id: 'database', name: 'Database', icon: Database, category: 'system', description: 'Show database status and metrics' },
    { id: 'security', name: 'Security', icon: Shield, category: 'system', description: 'Display security status and alerts' }
  ];

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
      const newTemplate: DashboardTemplate = {
        id: Date.now().toString(),
        name: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Dashboard Template`,
        role: selectedRole,
        layout: dashboardLayout,
        widgets: selectedWidgets,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      };
      
      setDashboardTemplates(prev => [...prev, newTemplate]);
      setShowCreateModal(false);
      addNotification('success', 'Dashboard template created successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification('error', `Failed to create template: ${errorMessage}`);
    }
  }, [selectedRole, dashboardLayout, selectedWidgets, addNotification]);

  const handleEditTemplate = useCallback((template: DashboardTemplate) => {
    setEditingTemplate(template);
    setSelectedRole(template.role);
    setDashboardLayout(template.layout);
    setSelectedWidgets(template.widgets);
    setShowEditModal(true);
  }, []);

  const handleUpdateTemplate = useCallback(() => {
    if (!editingTemplate) return;
    
    try {
      const updatedTemplate: DashboardTemplate = {
        ...editingTemplate,
        name: `${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Dashboard Template`,
        role: selectedRole,
        layout: dashboardLayout,
        widgets: selectedWidgets,
        updatedAt: new Date().toISOString()
      };
      
      setDashboardTemplates(prev => 
        prev.map(template => 
          template.id === editingTemplate.id ? updatedTemplate : template
        )
      );
      setShowEditModal(false);
      setEditingTemplate(null);
      addNotification('success', 'Dashboard template updated successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification('error', `Failed to update template: ${errorMessage}`);
    }
  }, [editingTemplate, selectedRole, dashboardLayout, selectedWidgets, addNotification]);

  const handleDeleteTemplate = useCallback((templateId: string) => {
    setDeletingTemplateId(templateId);
    setShowDeleteModal(true);
  }, []);

  const confirmDeleteTemplate = useCallback(() => {
    if (!deletingTemplateId) return;
    
    try {
      setDashboardTemplates(prev => prev.filter(template => template.id !== deletingTemplateId));
      setShowDeleteModal(false);
      setDeletingTemplateId(null);
      addNotification('success', 'Dashboard template deleted successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addNotification('error', `Failed to delete template: ${errorMessage}`);
    }
  }, [deletingTemplateId, addNotification]);

  const handleViewTemplate = useCallback((template: DashboardTemplate) => {
    setViewingTemplate(template);
    setShowViewModal(true);
  }, []);

  const toggleActionMenu = useCallback((templateId: string | null) => {
    setShowActionMenu(showActionMenu === templateId ? null : templateId);
  }, [showActionMenu]);

  const handleCreateClick = useCallback(() => {
    setShowCreateModal(true);
  }, []);

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev =>
      prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Dashboard Builder</h1>
              <p className="text-gray-600 dark:text-gray-400">Create and customize dashboards for different user roles</p>
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

        {/* Dashboard Templates Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard Templates</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your dashboard templates</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Layout</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Widgets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {dashboardTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        template.role === 'manager' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        template.role === 'analyst' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {template.role.charAt(0).toUpperCase() + template.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {template.layout.charAt(0).toUpperCase() + template.layout.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {template.widgets.length} widgets
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

        {/* Dashboard Builder Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Role Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Role</h2>
              <div className="space-y-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedRole === role.id
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${role.color}`}></div>
                      <span className="font-medium">{role.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Widget Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Widgets</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {availableWidgets.map((widget) => (
                  <button
                    key={widget.id}
                    onClick={() => handleWidgetToggle(widget.id)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      selectedWidgets.includes(widget.id)
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <widget.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{widget.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{widget.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Layout Options */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Layout Options</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setDashboardLayout('grid')}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    dashboardLayout === 'grid'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Layout className="h-5 w-5 inline mr-2" />
                  Grid Layout
                </button>
                <button
                  onClick={() => setDashboardLayout('list')}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    dashboardLayout === 'list'
                      ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <FileText className="h-5 w-5 inline mr-2" />
                  List Layout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Dashboard Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300">Role-Based Design</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">Templates for Admin, Manager, Analyst, etc.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 dark:text-green-300">Widget Selection</h3>
              <p className="text-sm text-green-600 dark:text-green-400">Choose from 10+ customizable widgets.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300">Category Organization</h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">Organize widgets by category.</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Layout Options</h3>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Grid, List, Masonry layouts.</p>
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Dashboard Template</h3>
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
                    value={`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Dashboard Template`}
                    readOnly
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selected Role: {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Layout: {dashboardLayout.charAt(0).toUpperCase() + dashboardLayout.slice(1)}
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selected Widgets: {selectedWidgets.length}
                  </label>
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
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Dashboard Template</h3>
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
                    value={`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Dashboard Template`}
                    readOnly
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selected Role: {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Layout: {dashboardLayout.charAt(0).toUpperCase() + dashboardLayout.slice(1)}
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selected Widgets: {selectedWidgets.length}
                  </label>
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
                    Role
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{viewingTemplate.role}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Layout
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">{viewingTemplate.layout}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Widgets
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {viewingTemplate.widgets.map((widgetId) => {
                      const widget = availableWidgets.find(w => w.id === widgetId);
                      return (
                        <span
                          key={widgetId}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {widget?.name || widgetId}
                        </span>
                      );
                    })}
                  </div>
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
                Are you sure you want to delete this dashboard template? This action cannot be undone.
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

export default UserDashboardBuilder;