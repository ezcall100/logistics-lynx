import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Globe, 
  Shield, 
  Database, 
  Mail, 
  Bell,
  Palette,
  Clock,
  Users,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

interface Setting {
  id: string;
  category: string;
  name: string;
  value: any;
  type: 'text' | 'number' | 'boolean' | 'select' | 'password';
  description: string;
  required: boolean;
  options?: string[];
}

const GlobalSettings: React.FC = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'timezone', name: 'Timezone', icon: Clock },
    { id: 'users', name: 'Users', icon: Users }
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockSettings: Setting[] = [
          // General Settings
          {
            id: '1',
            category: 'general',
            name: 'Company Name',
            value: 'Logistics Lynx',
            type: 'text',
            description: 'The name of your organization',
            required: true
          },
          {
            id: '2',
            category: 'general',
            name: 'Company Email',
            value: 'admin@logisticslynx.com',
            type: 'text',
            description: 'Primary contact email address',
            required: true
          },
          {
            id: '3',
            category: 'general',
            name: 'Default Language',
            value: 'en',
            type: 'select',
            description: 'Default language for the application',
            required: true,
            options: ['en', 'es', 'fr', 'de', 'zh', 'ja']
          },
          {
            id: '4',
            category: 'general',
            name: 'Maintenance Mode',
            value: false,
            type: 'boolean',
            description: 'Enable maintenance mode to restrict access',
            required: false
          },

          // Security Settings
          {
            id: '5',
            category: 'security',
            name: 'Session Timeout',
            value: 30,
            type: 'number',
            description: 'Session timeout in minutes',
            required: true
          },
          {
            id: '6',
            category: 'security',
            name: 'Password Policy',
            value: 'strong',
            type: 'select',
            description: 'Password complexity requirements',
            required: true,
            options: ['weak', 'medium', 'strong', 'very-strong']
          },
          {
            id: '7',
            category: 'security',
            name: 'Two-Factor Authentication',
            value: true,
            type: 'boolean',
            description: 'Require 2FA for all users',
            required: false
          },
          {
            id: '8',
            category: 'security',
            name: 'API Key',
            value: 'sk-1234567890abcdef',
            type: 'password',
            description: 'Master API key for system operations',
            required: true
          },

          // Appearance Settings
          {
            id: '9',
            category: 'appearance',
            name: 'Theme',
            value: 'light',
            type: 'select',
            description: 'Default theme for the application',
            required: true,
            options: ['light', 'dark', 'auto']
          },
          {
            id: '10',
            category: 'appearance',
            name: 'Primary Color',
            value: '#3B82F6',
            type: 'text',
            description: 'Primary brand color (hex code)',
            required: true
          },
          {
            id: '11',
            category: 'appearance',
            name: 'Logo URL',
            value: 'https://company.com/logo.png',
            type: 'text',
            description: 'URL to your company logo',
            required: false
          },

          // Notification Settings
          {
            id: '12',
            category: 'notifications',
            name: 'Email Notifications',
            value: true,
            type: 'boolean',
            description: 'Enable email notifications',
            required: false
          },
          {
            id: '13',
            category: 'notifications',
            name: 'Push Notifications',
            value: true,
            type: 'boolean',
            description: 'Enable push notifications',
            required: false
          },
          {
            id: '14',
            category: 'notifications',
            name: 'SMS Notifications',
            value: false,
            type: 'boolean',
            description: 'Enable SMS notifications',
            required: false
          },

          // Database Settings
          {
            id: '15',
            category: 'database',
            name: 'Connection Pool Size',
            value: 10,
            type: 'number',
            description: 'Maximum number of database connections',
            required: true
          },
          {
            id: '16',
            category: 'database',
            name: 'Query Timeout',
            value: 30,
            type: 'number',
            description: 'Database query timeout in seconds',
            required: true
          },
          {
            id: '17',
            category: 'database',
            name: 'Backup Frequency',
            value: 'daily',
            type: 'select',
            description: 'How often to backup the database',
            required: true,
            options: ['hourly', 'daily', 'weekly', 'monthly']
          },

          // Email Settings
          {
            id: '18',
            category: 'email',
            name: 'SMTP Host',
            value: 'smtp.gmail.com',
            type: 'text',
            description: 'SMTP server hostname',
            required: true
          },
          {
            id: '19',
            category: 'email',
            name: 'SMTP Port',
            value: 587,
            type: 'number',
            description: 'SMTP server port',
            required: true
          },
          {
            id: '20',
            category: 'email',
            name: 'SMTP Username',
            value: 'noreply@logisticslynx.com',
            type: 'text',
            description: 'SMTP authentication username',
            required: true
          },
          {
            id: '21',
            category: 'email',
            name: 'SMTP Password',
            value: 'password123',
            type: 'password',
            description: 'SMTP authentication password',
            required: true
          },

          // Timezone Settings
          {
            id: '22',
            category: 'timezone',
            name: 'Default Timezone',
            value: 'UTC',
            type: 'select',
            description: 'Default timezone for the application',
            required: true,
            options: ['UTC', 'EST', 'PST', 'GMT', 'CET', 'JST']
          },
          {
            id: '23',
            category: 'timezone',
            name: 'Date Format',
            value: 'MM/DD/YYYY',
            type: 'select',
            description: 'Default date format',
            required: true,
            options: ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']
          },

          // User Settings
          {
            id: '24',
            category: 'users',
            name: 'Default Role',
            value: 'user',
            type: 'select',
            description: 'Default role for new users',
            required: true,
            options: ['user', 'manager', 'admin', 'super-admin']
          },
          {
            id: '25',
            category: 'users',
            name: 'Auto-approve Users',
            value: false,
            type: 'boolean',
            description: 'Automatically approve new user registrations',
            required: false
          },
          {
            id: '26',
            category: 'users',
            name: 'Max Users',
            value: 1000,
            type: 'number',
            description: 'Maximum number of users allowed',
            required: true
          }
        ];

        setSettings(mockSettings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSettingChange = (id: string, value: any) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Settings saved:', settings);
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      setIsSaving(false);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategorySettings = (category: string) => {
    return settings.filter(setting => setting.category === category);
  };

  const renderSettingInput = (setting: Setting) => {
    const commonProps = {
      value: setting.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => 
        handleSettingChange(setting.id, e.target.value),
      className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    };

    switch (setting.type) {
      case 'text':
        return <input type="text" {...commonProps} />;
      case 'number':
        return <input type="number" {...commonProps} />;
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              {setting.value ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        );
      case 'select':
        return (
          <select {...commonProps}>
            {setting.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'password':
        return (
          <div className="relative">
            <input
              type={showPasswords[setting.id] ? 'text' : 'password'}
              value={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(setting.id)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPasswords[setting.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        );
      default:
        return <input type="text" {...commonProps} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>
          <p className="text-gray-600">Configure your application settings</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <nav className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const categorySettings = getCategorySettings(category.id);
                const hasChanges = categorySettings.some(setting => 
                  setting.value !== settings.find(s => s.id === setting.id)?.value
                );

                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="flex-1">{category.name}</span>
                    {hasChanges && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              {(() => {
                const category = categories.find(c => c.id === activeCategory);
                const Icon = category?.icon || Settings;
                return <Icon className="w-5 h-5 text-blue-600" />;
              })()}
              <h2 className="text-xl font-semibold text-gray-900">
                {categories.find(c => c.id === activeCategory)?.name} Settings
              </h2>
            </div>

            <div className="space-y-6">
              {getCategorySettings(activeCategory).map((setting) => (
                <motion.div
                  key={setting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {setting.name}
                        {setting.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                    <div className="md:col-span-2">
                      {renderSettingInput(setting)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {getCategorySettings(activeCategory).length === 0 && (
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Settings Found</h3>
                <p className="text-gray-500">No settings available for this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;