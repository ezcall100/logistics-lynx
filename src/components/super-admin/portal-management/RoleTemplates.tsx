import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Copy, 
  Trash2, 
  Users, 
  Shield, 
  Settings, 
  BarChart3, 
  Mail, 
  Calendar, 
  FileText, 
  Database, 
  Rocket,
  CheckCircle,
  XCircle
} from 'lucide-react';

const RoleTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('admin');
  const [templates, setTemplates] = useState([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all features enabled',
      color: 'bg-red-500',
      permissions: ['All Access'],
      features: {
        dashboard: ['overview', 'analytics', 'reports', 'system-health'],
        sidebar: ['dashboard', 'users', 'system', 'security', 'ai-agents', 'analytics', 'deployment', 'company-settings'],
        header: ['logo', 'search', 'notifications', 'messages', 'profile', 'theme', 'settings'],
        widgets: ['stats', 'charts', 'recent-activity', 'user-list', 'notifications', 'quick-actions', 'reports', 'database', 'security']
      },
      isDefault: true
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Team and project management with reporting access',
      color: 'bg-blue-500',
      permissions: ['Team Management', 'Project Oversight', 'Reports'],
      features: {
        dashboard: ['overview', 'team-analytics', 'project-status', 'reports'],
        sidebar: ['dashboard', 'users', 'analytics', 'reports', 'company-settings'],
        header: ['logo', 'search', 'notifications', 'messages', 'profile', 'theme'],
        widgets: ['stats', 'charts', 'recent-activity', 'user-list', 'notifications', 'reports']
      },
      isDefault: true
    },
    {
      id: 'analyst',
      name: 'Data Analyst',
      description: 'Access to analytics and reporting tools',
      color: 'bg-green-500',
      permissions: ['Data Analysis', 'Reporting', 'Export'],
      features: {
        dashboard: ['analytics', 'reports', 'data-visualization'],
        sidebar: ['dashboard', 'analytics', 'reports'],
        header: ['logo', 'search', 'profile', 'theme'],
        widgets: ['charts', 'data-visualization', 'export-tools']
      },
      isDefault: true
    },
    {
      id: 'developer',
      name: 'Developer',
      description: 'Access to deployment and system configuration',
      color: 'bg-purple-500',
      permissions: ['Code Access', 'Deployment', 'System Config'],
      features: {
        dashboard: ['system-health', 'deployment-status', 'logs', 'performance'],
        sidebar: ['dashboard', 'system', 'deployment', 'security'],
        header: ['logo', 'search', 'profile', 'settings'],
        widgets: ['system-health', 'code-repos', 'deployment-status', 'logs', 'performance']
      },
      isDefault: false
    },
    {
      id: 'support',
      name: 'Support Agent',
      description: 'Manage customer support tickets and inquiries',
      color: 'bg-orange-500',
      permissions: ['Ticket Management', 'Customer Info'],
      features: {
        dashboard: ['ticket-queue', 'customer-info', 'chat'],
        sidebar: ['dashboard', 'users', 'communication'],
        header: ['logo', 'search', 'notifications', 'messages', 'profile'],
        widgets: ['ticket-queue', 'customer-info', 'knowledge-base', 'chat']
      },
      isDefault: false
    }
  ]);

  const availableFeatures = {
    dashboard: {
      name: 'Dashboard Widgets',
      icon: BarChart3,
      items: [
        { id: 'overview', name: 'Overview Stats', icon: BarChart3 },
        { id: 'analytics', name: 'Analytics Charts', icon: BarChart3 },
        { id: 'reports', name: 'Reports Summary', icon: FileText },
        { id: 'system-health', name: 'System Health', icon: Database },
        { id: 'team-analytics', name: 'Team Analytics', icon: Users },
        { id: 'project-status', name: 'Project Status', icon: Calendar },
        { id: 'data-visualization', name: 'Data Visualization', icon: BarChart3 },
        { id: 'export-tools', name: 'Export Tools', icon: Settings },
        { id: 'ticket-queue', name: 'Ticket Queue', icon: Mail },
        { id: 'customer-info', name: 'Customer Info', icon: Users },
        { id: 'knowledge-base', name: 'Knowledge Base', icon: FileText },
        { id: 'chat', name: 'Chat', icon: Mail },
        { id: 'code-repos', name: 'Code Repositories', icon: Database },
        { id: 'deployment-status', name: 'Deployment Status', icon: Rocket },
        { id: 'logs', name: 'Logs', icon: FileText },
        { id: 'performance', name: 'Performance', icon: BarChart3 }
      ]
    },
    sidebar: {
      name: 'Sidebar Menu',
      icon: Settings,
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
        { id: 'users', name: 'Users & Access', icon: Users },
        { id: 'portal-management', name: 'Portal Management', icon: Settings },
        { id: 'system', name: 'System Health', icon: Database },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'ai-agents', name: 'AI Agents', icon: Settings },
        { id: 'deployment', name: 'Deployment', icon: Rocket },
        { id: 'company-settings', name: 'Company Settings', icon: Settings },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
        { id: 'reports', name: 'Reports', icon: FileText },
        { id: 'communication', name: 'Communication', icon: Mail },
      ]
    },
    header: {
      name: 'Header Elements',
      icon: Settings,
      items: [
        { id: 'logo', name: 'Logo', icon: Settings },
        { id: 'search', name: 'Search Bar', icon: Settings },
        { id: 'notifications', name: 'Notifications', icon: Mail },
        { id: 'messages', name: 'Messages', icon: Mail },
        { id: 'profile', name: 'Profile Menu', icon: Users },
        { id: 'theme', name: 'Theme Toggle', icon: Settings },
        { id: 'settings', name: 'Settings Icon', icon: Settings },
      ]
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleSaveTemplate = () => {
    console.log('Saving template:', selectedTemplate, templates.find(t => t.id === selectedTemplate));
    // Implement save logic here
  };

  const handleDuplicateTemplate = () => {
    const current = templates.find(t => t.id === selectedTemplate);
    if (current) {
      const newId = `${current.id}_copy_${Date.now()}`;
      const newTemplate = { ...current, id: newId, name: `${current.name} (Copy)`, isDefault: false };
      setTemplates(prev => [...prev, newTemplate]);
      setSelectedTemplate(newId);
    }
  };

  const handleDeleteTemplate = () => {
    setTemplates(prev => prev.filter(t => t.id !== selectedTemplate));
    setSelectedTemplate(templates[0]?.id || '');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Role Templates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage pre-built and custom templates for different user roles.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSaveTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save Template</span>
          </button>
          <button
            onClick={handleDuplicateTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Copy className="h-4 w-4" />
            <span>Duplicate</span>
          </button>
          <button
            onClick={handleDeleteTemplate}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {templates.map(template => (
            <motion.button
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTemplateChange(template.id)}
              className={`relative p-4 rounded-lg border-2 transition-all duration-200
                ${selectedTemplate === template.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
            >
              {template.isDefault && (
                <span className="absolute top-2 right-2 text-xs font-semibold text-blue-600 dark:text-blue-400">Default</span>
              )}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 mx-auto ${template.color}`}>
                {template.id === 'admin' && <Users className="h-5 w-5 text-white" />}
                {template.id === 'manager' && <Shield className="h-5 w-5 text-white" />}
                {template.id === 'analyst' && <BarChart3 className="h-5 w-5 text-white" />}
                {template.id === 'developer' && <Rocket className="h-5 w-5 text-white" />}
                {template.id === 'support' && <Mail className="h-5 w-5 text-white" />}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-1">{template.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {selectedTemplate && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Template Details: {templates.find(t => t.id === selectedTemplate)?.name}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Permissions</h3>
              <div className="space-y-2">
                {templates.find(t => t.id === selectedTemplate)?.permissions.map(permission => (
                  <div key={permission} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{permission}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Configurable Features</h3>
              <div className="space-y-4">
                {Object.entries(availableFeatures).map(([categoryKey, category]) => (
                  <div key={categoryKey}>
                    <h4 className="flex items-center space-x-2 text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {category.icon && <category.icon className="h-4 w-4 text-blue-500" />}
                      <span>{category.name}</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                      {category.items.map(feature => (
                        <div key={feature.id} className="flex items-center space-x-2">
                          {templates.find(t => t.id === selectedTemplate)?.features[categoryKey as keyof typeof templates[0]['features']]?.includes(feature.id) ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span>{feature.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleTemplates;
