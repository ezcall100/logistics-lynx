import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Database,
  Shield,
  Mail,
  Bell,
  Eye,
  EyeOff,
  Download,
  Upload,
  X,
  Info,
} from 'lucide-react';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  value: string | number | boolean | object;
  type: 'string' | 'number' | 'boolean' | 'select' | 'json';
  description: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  sensitive?: boolean;
}

interface SystemStatus {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'error';
  value: string;
  lastCheck: string;
  description: string;
}

const EnhancedSystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [showSensitiveValues, setShowSensitiveValues] = useState<Record<string, boolean>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // Mock settings data
  const mockSettings: SystemSetting[] = [
    // General Settings
    {
      id: '1',
      category: 'general',
      name: 'System Name',
      value: 'TransBot AI Platform',
      type: 'string',
      description: 'The name of the system displayed to users',
      required: true,
    },
    {
      id: '2',
      category: 'general',
      name: 'System Version',
      value: '2.1.0',
      type: 'string',
      description: 'Current system version',
      required: true,
    },
    {
      id: '3',
      category: 'general',
      name: 'Maintenance Mode',
      value: false,
      type: 'boolean',
      description: 'Enable maintenance mode to restrict access',
      required: false,
    },
    {
      id: '4',
      category: 'general',
      name: 'Default Language',
      value: 'en',
      type: 'select',
      description: 'Default language for the system',
      required: true,
      options: ['en', 'es', 'fr', 'de', 'zh'],
    },
    
    // Database Settings
    {
      id: '5',
      category: 'database',
      name: 'Database Host',
      value: 'localhost',
      type: 'string',
      description: 'Database server hostname',
      required: true,
      sensitive: true,
    },
    {
      id: '6',
      category: 'database',
      name: 'Database Port',
      value: 5432,
      type: 'number',
      description: 'Database server port',
      required: true,
      validation: { min: 1, max: 65535 },
    },
    {
      id: '7',
      category: 'database',
      name: 'Database Name',
      value: 'transbot_ai',
      type: 'string',
      description: 'Database name',
      required: true,
    },
    {
      id: '8',
      category: 'database',
      name: 'Connection Pool Size',
      value: 20,
      type: 'number',
      description: 'Maximum number of database connections',
      required: true,
      validation: { min: 1, max: 100 },
    },
    
    // Security Settings
    {
      id: '9',
      category: 'security',
      name: 'Session Timeout',
      value: 3600,
      type: 'number',
      description: 'Session timeout in seconds',
      required: true,
      validation: { min: 300, max: 86400 },
    },
    {
      id: '10',
      category: 'security',
      name: 'Password Min Length',
      value: 8,
      type: 'number',
      description: 'Minimum password length',
      required: true,
      validation: { min: 6, max: 32 },
    },
    {
      id: '11',
      category: 'security',
      name: 'Enable 2FA',
      value: true,
      type: 'boolean',
      description: 'Enable two-factor authentication',
      required: false,
    },
    {
      id: '12',
      category: 'security',
      name: 'Allowed IPs',
      value: ['*'],
      type: 'json',
      description: 'List of allowed IP addresses (use * for all)',
      required: false,
    },
    
    // Email Settings
    {
      id: '13',
      category: 'email',
      name: 'SMTP Host',
      value: 'smtp.gmail.com',
      type: 'string',
      description: 'SMTP server hostname',
      required: true,
    },
    {
      id: '14',
      category: 'email',
      name: 'SMTP Port',
      value: 587,
      type: 'number',
      description: 'SMTP server port',
      required: true,
      validation: { min: 1, max: 65535 },
    },
    {
      id: '15',
      category: 'email',
      name: 'SMTP Username',
      value: 'noreply@transbot.ai',
      type: 'string',
      description: 'SMTP authentication username',
      required: true,
      sensitive: true,
    },
    {
      id: '16',
      category: 'email',
      name: 'Enable TLS',
      value: true,
      type: 'boolean',
      description: 'Enable TLS encryption for SMTP',
      required: false,
    },
    
    // Notification Settings
    {
      id: '17',
      category: 'notifications',
      name: 'Email Notifications',
      value: true,
      type: 'boolean',
      description: 'Enable email notifications',
      required: false,
    },
    {
      id: '18',
      category: 'notifications',
      name: 'Push Notifications',
      value: true,
      type: 'boolean',
      description: 'Enable push notifications',
      required: false,
    },
    {
      id: '19',
      category: 'notifications',
      name: 'Notification Frequency',
      value: 'immediate',
      type: 'select',
      description: 'How often to send notifications',
      required: true,
      options: ['immediate', 'hourly', 'daily', 'weekly'],
    },
  ];

  const mockSystemStatus: SystemStatus[] = [
    {
      id: '1',
      name: 'Database Connection',
      status: 'healthy',
      value: 'Connected',
      lastCheck: new Date().toISOString(),
      description: 'Database connection status',
    },
    {
      id: '2',
      name: 'API Response Time',
      status: 'healthy',
      value: '45ms',
      lastCheck: new Date().toISOString(),
      description: 'Average API response time',
    },
    {
      id: '3',
      name: 'Memory Usage',
      status: 'warning',
      value: '78%',
      lastCheck: new Date().toISOString(),
      description: 'System memory usage',
    },
    {
      id: '4',
      name: 'Disk Space',
      status: 'healthy',
      value: '2.4GB / 100GB',
      lastCheck: new Date().toISOString(),
      description: 'Available disk space',
    },
    {
      id: '5',
      name: 'CPU Usage',
      status: 'healthy',
      value: '23%',
      lastCheck: new Date().toISOString(),
      description: 'CPU utilization',
    },
    {
      id: '6',
      name: 'Email Service',
      status: 'error',
      value: 'Failed',
      lastCheck: new Date().toISOString(),
      description: 'Email service status',
    },
  ];

  const categories = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSettings(mockSettings);
      setSystemStatus(mockSystemStatus);
    } catch (error) {
      console.error('Failed to fetch system settings:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [mockSettings, mockSystemStatus]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSettingChange = (id: string, value: string | number | boolean | object) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setHasUnsavedChanges(false);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleBackupSettings = async () => {
    try {
      const backupData = {
        settings: settings,
        timestamp: new Date().toISOString(),
        version: '2.1.0',
      };
      
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `system-settings-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setShowBackupModal(false);
    } catch (error) {
      console.error('Failed to backup settings:', error);
    }
  };

  const handleRestoreSettings = async (file: File) => {
    try {
      const text = await file.text();
      const backupData = JSON.parse(text);
      
      if (backupData.settings && Array.isArray(backupData.settings)) {
        setSettings(backupData.settings);
        setHasUnsavedChanges(true);
        setShowRestoreModal(false);
        alert('Settings restored successfully! Please save to apply changes.');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (error) {
      console.error('Failed to restore settings:', error);
      alert('Failed to restore settings. Please check the file format.');
    }
  };

  const toggleSensitiveValue = (settingId: string) => {
    setShowSensitiveValues(prev => ({
      ...prev,
      [settingId]: !prev[settingId],
    }));
  };


  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      default: return Info;
    }
  };

  const filteredSettings = settings.filter(setting => setting.category === activeCategory);

  if (isLoading) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
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
            onClick={() = aria-label="Button"> setShowBackupModal(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Backup</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setShowRestoreModal(true)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Upload className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Restore</span>
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={saving || !hasUnsavedChanges}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <Save className={`h-4 w-4 ${saving ? 'animate-spin' : ''}`} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasUnsavedChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <AlertTriangle className="h-5 w-5 text-yellow-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-yellow-800 dark:text-yellow-200 font-medium responsive-container sm:flex-col md:flex-row lg:grid">
              You have unsaved changes. Don't forget to save your settings.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              Categories
            </h3>
            <nav className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <button
                    key={category.id}
                    onClick={() = aria-label="Button"> setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{category.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              System Status
            </h3>
            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              {systemStatus.map((status) => {
                const StatusIcon = getStatusIcon(status.status);
                
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <div key={status.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <StatusIcon className={`h-4 w-4 ${
                        status.status === 'healthy' ? 'text-green-600' :
                        status.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {status.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                          {status.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                        {status.value}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        {new Date(status.lastCheck).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {categories.find(c => c.id === activeCategory)?.name} Settings
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                {filteredSettings.length} settings
              </span>
            </div>

            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {filteredSettings.map((setting) => (
                <div key={setting.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-start justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {setting.name}
                        </h3>
                        {setting.required && (
                          <span className="text-red-500 text-sm responsive-container sm:flex-col md:flex-row lg:grid">*</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                        {setting.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {setting.type === 'string' && (
                      <input
                        type={setting.sensitive && !showSensitiveValues[setting.id] ? 'password' : 'text'}
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}

                    {setting.type === 'number' && (
                      <input
                        type="number"
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.id, Number(e.target.value))}
                        min={setting.validation?.min}
                        max={setting.validation?.max}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                        placeholder={`Enter ${setting.name.toLowerCase()}`}
                      />
                    )}

                    {setting.type === 'boolean' && (
                      <label className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <input
                          type="checkbox"
                          checked={setting.value}
                          onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                          {setting.value ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    )}

                    {setting.type === 'select' && (
                      <select
                        value={setting.value}
                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        {setting.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {setting.type === 'json' && (
                      <textarea
                        value={Array.isArray(setting.value) ? JSON.stringify(setting.value, null, 2) : setting.value}
                        onChange={(e) => {
                          try {
                            const parsed = JSON.parse(e.target.value);
                            handleSettingChange(setting.id, parsed);
                          } catch {
                            // Invalid JSON, keep the raw value
                            handleSettingChange(setting.id, e.target.value);
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                        rows={3}
                        placeholder="Enter JSON value"
                      />
                    )}

                    {setting.sensitive && (
                      <button
                        onClick={() = aria-label="Button"> toggleSensitiveValue(setting.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                        title={showSensitiveValues[setting.id] ? 'Hide value' : 'Show value'}
                      >
                        {showSensitiveValues[setting.id] ? (
                          <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        ) : (
                          <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backup Modal */}
      <AnimatePresence>
        {showBackupModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Backup Settings
                </h3>
                <button
                  onClick={() = aria-label="Button"> setShowBackupModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  This will create a backup file containing all current system settings. 
                  You can use this file to restore settings later.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Info className="h-4 w-4 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="text-sm text-blue-800 dark:text-blue-200 responsive-container sm:flex-col md:flex-row lg:grid">
                      Backup includes all settings except sensitive values
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() = aria-label="Button"> setShowBackupModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBackupSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  Download Backup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Restore Modal */}
      <AnimatePresence>
        {showRestoreModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Restore Settings
                </h3>
                <button
                  onClick={() = aria-label="Button"> setShowRestoreModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  Select a backup file to restore system settings. This will overwrite current settings.
                </p>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleRestoreSettings(file);
                      }
                    }}
                    className="hidden responsive-container sm:flex-col md:flex-row lg:grid"
                    id="restore-file"
                  />
                  <label
                    htmlFor="restore-file"
                    className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:text-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    Click to select backup file
                  </label>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="text-sm text-yellow-800 dark:text-yellow-200 responsive-container sm:flex-col md:flex-row lg:grid">
                      This action cannot be undone. Make sure to backup current settings first.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() = aria-label="Button"> setShowRestoreModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSystemSettings;
