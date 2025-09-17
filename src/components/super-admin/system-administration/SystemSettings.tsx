import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  RefreshCw,
  Database,
  Shield,
  Mail,
  Bell,
  Eye,
  EyeOff,
  Monitor,
  Cpu,
  HardDrive,
  Activity,
} from 'lucide-react';

interface SystemSetting {
  id: string;
  category: string;
  key: string;
  value: string | number | boolean | object;
  type: 'string' | 'number' | 'boolean' | 'json' | 'file';
  description: string;
  isRequired: boolean;
  isSensitive: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  options?: string[];
  };
}

interface SystemInfo {
  version: string;
  buildDate: string;
  uptime: string;
  environment: string;
  nodeVersion: string;
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  cpuUsage: number;
  diskUsage: {
    used: number;
    total: number;
    percentage: number;
  };
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [editingSettings, setEditingSettings] = useState<Record<string, string | number | boolean | object>>({});
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});

  // Mock settings data
  const mockSettings: SystemSetting[] = [
    // General Settings
      {
        id: '1',
        category: 'general',
      key: 'app_name',
      value: 'Logistics Lynx',
        type: 'string',
      description: 'Application name displayed in the UI',
      isRequired: true,
      isSensitive: false,
      },
      {
        id: '2',
        category: 'general',
      key: 'app_version',
      value: '1.0.0',
      type: 'string',
      description: 'Current application version',
      isRequired: true,
      isSensitive: false,
      },
      {
        id: '3',
      category: 'general',
      key: 'maintenance_mode',
      value: false,
      type: 'boolean',
      description: 'Enable maintenance mode to restrict access',
      isRequired: false,
      isSensitive: false,
      },
      {
        id: '4',
      category: 'general',
      key: 'max_file_size',
      value: 10485760,
      type: 'number',
      description: 'Maximum file upload size in bytes',
      isRequired: true,
      isSensitive: false,
      validation: { min: 1024, max: 104857600 },
    },

    // Database Settings
      {
        id: '5',
      category: 'database',
      key: 'connection_pool_size',
      value: 20,
        type: 'number',
      description: 'Maximum number of database connections in the pool',
      isRequired: true,
      isSensitive: false,
      validation: { min: 5, max: 100 },
      },
      {
        id: '6',
      category: 'database',
      key: 'query_timeout',
      value: 30000,
      type: 'number',
      description: 'Database query timeout in milliseconds',
      isRequired: true,
      isSensitive: false,
      validation: { min: 1000, max: 300000 },
    },
    {
      id: '7',
      category: 'database',
      key: 'backup_enabled',
        value: true,
        type: 'boolean',
      description: 'Enable automatic database backups',
      isRequired: false,
      isSensitive: false,
    },

    // Security Settings
    {
      id: '8',
      category: 'security',
      key: 'session_timeout',
      value: 3600,
      type: 'number',
      description: 'User session timeout in seconds',
      isRequired: true,
      isSensitive: false,
      validation: { min: 300, max: 86400 },
    },
    {
      id: '9',
      category: 'security',
      key: 'password_min_length',
      value: 8,
      type: 'number',
      description: 'Minimum password length requirement',
      isRequired: true,
      isSensitive: false,
      validation: { min: 6, max: 32 },
    },
    {
      id: '10',
      category: 'security',
      key: 'max_login_attempts',
      value: 5,
      type: 'number',
      description: 'Maximum login attempts before account lockout',
      isRequired: true,
      isSensitive: false,
      validation: { min: 3, max: 10 },
    },
    {
      id: '11',
      category: 'security',
      key: 'jwt_secret',
      value: 'your-secret-key-here',
      type: 'string',
      description: 'JWT secret key for token signing',
      isRequired: true,
      isSensitive: true,
    },

    // Email Settings
    {
      id: '12',
      category: 'email',
      key: 'smtp_host',
      value: 'smtp.gmail.com',
      type: 'string',
      description: 'SMTP server hostname',
      isRequired: true,
      isSensitive: false,
    },
    {
      id: '13',
      category: 'email',
      key: 'smtp_port',
      value: 587,
      type: 'number',
      description: 'SMTP server port',
      isRequired: true,
      isSensitive: false,
      validation: { min: 1, max: 65535 },
    },
    {
      id: '14',
      category: 'email',
      key: 'smtp_username',
      value: 'your-email@gmail.com',
      type: 'string',
      description: 'SMTP authentication username',
      isRequired: true,
      isSensitive: true,
    },
    {
      id: '15',
      category: 'email',
      key: 'smtp_password',
      value: 'your-app-password',
      type: 'string',
      description: 'SMTP authentication password',
      isRequired: true,
      isSensitive: true,
    },

    // Notification Settings
    {
      id: '16',
      category: 'notifications',
      key: 'email_notifications',
      value: true,
      type: 'boolean',
      description: 'Enable email notifications',
      isRequired: false,
      isSensitive: false,
    },
    {
      id: '17',
      category: 'notifications',
      key: 'push_notifications',
      value: true,
      type: 'boolean',
      description: 'Enable push notifications',
      isRequired: false,
      isSensitive: false,
    },
    {
      id: '18',
      category: 'notifications',
      key: 'notification_retention_days',
      value: 30,
      type: 'number',
      description: 'Number of days to retain notifications',
      isRequired: true,
      isSensitive: false,
      validation: { min: 1, max: 365 },
    },
  ];

  const mockSystemInfo: SystemInfo = {
    version: '1.0.0',
    buildDate: '2024-01-15T10:00:00Z',
    uptime: '7 days, 14 hours, 32 minutes',
    environment: 'production',
    nodeVersion: '18.17.0',
    memoryUsage: {
      used: 1024,
      total: 2048,
      percentage: 50,
    },
    cpuUsage: 25.5,
    diskUsage: {
      used: 50,
      total: 100,
      percentage: 50,
    },
  };

  const categories = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  // Fetch settings and system info
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSettings(mockSettings);
      setSystemInfo(mockSystemInfo);
      
      // Initialize editing state
      const initialEditing: Record<string, string | number | boolean | object> = {};
      mockSettings.forEach(setting => {
        initialEditing[setting.key] = setting.value;
      });
      setEditingSettings(initialEditing);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [mockSettings, mockSystemInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSettingChange = (key: string, value: string | number | boolean | object) => {
    setEditingSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update settings with new values
      setSettings(prev => prev.map(setting => ({
        ...setting,
        value: editingSettings[setting.key] !== undefined ? editingSettings[setting.key] : setting.value,
      })));
      
      console.log('Settings saved:', editingSettings);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleResetSettings = () => {
    const resetEditing: Record<string, string | number | boolean | object> = {};
    settings.forEach(setting => {
      resetEditing[setting.key] = setting.value;
    });
    setEditingSettings(resetEditing);
  };

  const toggleSensitiveVisibility = (key: string) => {
    setShowSensitive(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Settings;
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const filteredSettings = settings.filter(setting => setting.category === selectedCategory);

  const hasChanges = Object.keys(editingSettings).some(key => {
    const originalSetting = settings.find(s => s.key === key);
    return originalSetting && editingSettings[key] !== originalSetting.value;
  });

  if (isLoading) {
  return (
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="lg:col-span-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            </div>
            <div className="lg:col-span-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            </div>
          </div>
        </div>
          </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Configure system-wide settings and preferences
          </p>
            </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
            </button>
              <button 
            onClick={handleSaveSettings}
            disabled={saving || !hasChanges}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
            <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
          </div>
        </div>

      {/* System Info */}
      {systemInfo && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemInfo.version}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Version</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Monitor className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <div className="text-2xl font-bold text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemInfo.uptime}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Uptime</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Activity className="h-6 w-6 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <div className="text-2xl font-bold text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemInfo.memoryUsage.percentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory Usage</div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Cpu className="h-6 w-6 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <div className="text-2xl font-bold text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid">
                  {systemInfo.diskUsage.percentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Disk Usage</div>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <HardDrive className="h-6 w-6 text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              Categories
            </h3>
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <button
                    key={category.id}
                    onClick={() = aria-label="Button"> setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{category.name}</span>
              </button>
                        );
                      })}
                    </div>
                  </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                {React.createElement(getCategoryIcon(selectedCategory), { className: "h-6 w-6 text-gray-600 dark:text-gray-400" })}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {getCategoryName(selectedCategory)} Settings
                </h3>
              </div>
              {hasChanges && (
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    onClick={handleResetSettings}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    Reset
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {filteredSettings.map((setting) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-start justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <h4 className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {setting.key}
                        </h4>
                        {setting.isRequired && (
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                                  Required
                                </span>
                              )}
                        {setting.isSensitive && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                            Sensitive
                              </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        {setting.description}
                      </p>
                            </div>
                        </div>
                        
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    {setting.type === 'boolean' ? (
                      <label className="flex items-center space-x-2 cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid">
                              <input
                                type="checkbox"
                          checked={Boolean(editingSettings[setting.key])}
                          onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                          {editingSettings[setting.key] ? 'Enabled' : 'Disabled'}
                              </span>
                            </label>
                    ) : setting.type === 'number' ? (
                      <input
                        type="number"
                        value={String(editingSettings[setting.key] || '')}
                        onChange={(e) => handleSettingChange(setting.key, Number(e.target.value))}
                        min={setting.validation?.min}
                        max={setting.validation?.max}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                      />
                    ) : (
                      <div className="flex-1 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <input
                          type={setting.isSensitive && !showSensitive[setting.key] ? 'password' : 'text'}
                          value={String(editingSettings[setting.key] || '')}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                        />
                        {setting.isSensitive && (
                          <button
                            onClick={() = aria-label="Button"> toggleSensitiveVisibility(setting.key)}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                          >
                            {showSensitive[setting.key] ? (
                              <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            ) : (
                              <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            )}
                          </button>
                          )}
                        </div>
                    )}
                  </div>

                  {setting.validation && (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      {setting.validation.min !== undefined && setting.validation.max !== undefined && (
                        <span>Range: {setting.validation.min} - {setting.validation.max}</span>
                      )}
                      {setting.validation.options && (
                        <span>Options: {setting.validation.options.join(', ')}</span>
                      )}
                          </div>
                  )}
                    </motion.div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
