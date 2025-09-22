import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Save,
  Palette,
  Bell,
  Shield,
  Monitor,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const GeneralSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Application Settings
    application: {
      name: 'TransBot AI',
      version: '2.1.0',
      environment: 'Production',
      timezone: 'UTC-5 (EST)',
      language: 'English',
      currency: 'USD'
    },
    // Display Settings
    display: {
      theme: 'dark',
      sidebarCollapsed: false,
      animations: true,
      compactMode: false,
      showNotifications: true
    },
    // Performance Settings
    performance: {
      cacheEnabled: true,
      realTimeUpdates: true,
      backgroundSync: true,
      compressionEnabled: true,
      maxConcurrentUsers: 1000
    },
    // Notification Settings
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      desktopNotifications: true,
      soundEnabled: true
    },
    // Security Settings
    security: {
      sessionTimeout: 30,
      requireTwoFactor: false,
      passwordComplexity: 'high',
      loginAttempts: 5,
      autoLogout: true
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (category: string, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const SettingCard = ({ title, icon: Icon, children, description }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; description: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );

  const SettingRow = ({ label, children, description }: { label: string; children: React.ReactNode; description?: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">General Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Configure your application preferences and system behavior</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isSaving
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : saveStatus === 'error'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Saved</span>
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Error</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Settings */}
          <SettingCard
            title="Application Settings"
            icon={Monitor}
            description="Basic application configuration and system information"
          >
            <div className="space-y-1">
              <SettingRow label="Application Name">
                <input
                  type="text"
                  value={settings.application.name}
                  onChange={(e) => updateSetting('application', 'name', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </SettingRow>
              <SettingRow label="Environment" description="Current deployment environment">
                <select
                  value={settings.application.environment}
                  onChange={(e) => updateSetting('application', 'environment', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Development">Development</option>
                  <option value="Staging">Staging</option>
                  <option value="Production">Production</option>
                </select>
              </SettingRow>
              <SettingRow label="Timezone" description="System timezone for all operations">
                <select
                  value={settings.application.timezone}
                  onChange={(e) => updateSetting('application', 'timezone', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="UTC-5 (EST)">UTC-5 (EST)</option>
                  <option value="UTC-8 (PST)">UTC-8 (PST)</option>
                  <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                </select>
              </SettingRow>
              <SettingRow label="Language">
                <select
                  value={settings.application.language}
                  onChange={(e) => updateSetting('application', 'language', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </SettingRow>
              <SettingRow label="Currency">
                <select
                  value={settings.application.currency}
                  onChange={(e) => updateSetting('application', 'currency', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </SettingRow>
            </div>
          </SettingCard>

          {/* Display Settings */}
          <SettingCard
            title="Display Settings"
            icon={Palette}
            description="Customize the user interface and visual preferences"
          >
            <div className="space-y-1">
              <SettingRow label="Theme" description="Choose your preferred color scheme">
                <select
                  value={settings.display.theme}
                  onChange={(e) => updateSetting('display', 'theme', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </SettingRow>
              <SettingRow label="Animations" description="Enable smooth transitions and animations">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.display.animations}
                    onChange={(e) => updateSetting('display', 'animations', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Compact Mode" description="Reduce spacing for more content">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.display.compactMode}
                    onChange={(e) => updateSetting('display', 'compactMode', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Show Notifications" description="Display notification badges and alerts">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.display.showNotifications}
                    onChange={(e) => updateSetting('display', 'showNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
            </div>
          </SettingCard>

          {/* Performance Settings */}
          <SettingCard
            title="Performance Settings"
            icon={Zap}
            description="Optimize system performance and resource usage"
          >
            <div className="space-y-1">
              <SettingRow label="Cache Enabled" description="Enable caching for better performance">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.performance.cacheEnabled}
                    onChange={(e) => updateSetting('performance', 'cacheEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Real-time Updates" description="Enable live data updates">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.performance.realTimeUpdates}
                    onChange={(e) => updateSetting('performance', 'realTimeUpdates', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Background Sync" description="Sync data in the background">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.performance.backgroundSync}
                    onChange={(e) => updateSetting('performance', 'backgroundSync', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Max Concurrent Users" description="Maximum number of simultaneous users">
                <input
                  type="number"
                  value={settings.performance.maxConcurrentUsers}
                  onChange={(e) => updateSetting('performance', 'maxConcurrentUsers', parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </SettingRow>
            </div>
          </SettingCard>

          {/* Notification Settings */}
          <SettingCard
            title="Notification Settings"
            icon={Bell}
            description="Configure how you receive notifications and alerts"
          >
            <div className="space-y-1">
              <SettingRow label="Email Notifications" description="Receive notifications via email">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Push Notifications" description="Receive push notifications">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => updateSetting('notifications', 'pushNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Desktop Notifications" description="Show desktop notifications">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.desktopNotifications}
                    onChange={(e) => updateSetting('notifications', 'desktopNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
              <SettingRow label="Sound Enabled" description="Play notification sounds">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.soundEnabled}
                    onChange={(e) => updateSetting('notifications', 'soundEnabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
            </div>
          </SettingCard>
        </div>

        {/* Security Settings */}
        <SettingCard
          title="Security Settings"
          icon={Shield}
          description="Configure security policies and authentication settings"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <SettingRow label="Session Timeout (minutes)" description="Auto-logout after inactivity">
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </SettingRow>
              <SettingRow label="Require Two-Factor Authentication">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.requireTwoFactor}
                    onChange={(e) => updateSetting('security', 'requireTwoFactor', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </SettingRow>
            </div>
            <div className="space-y-1">
              <SettingRow label="Password Complexity" description="Minimum password requirements">
                <select
                  value={settings.security.passwordComplexity}
                  onChange={(e) => updateSetting('security', 'passwordComplexity', e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low (6+ characters)</option>
                  <option value="medium">Medium (8+ chars, numbers)</option>
                  <option value="high">High (8+ chars, numbers, symbols)</option>
                </select>
              </SettingRow>
              <SettingRow label="Max Login Attempts" description="Lock account after failed attempts">
                <input
                  type="number"
                  value={settings.security.loginAttempts}
                  onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </SettingRow>
            </div>
          </div>
        </SettingCard>

        {/* Status Messages */}
        {saveStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200 font-medium">Settings saved successfully!</p>
            </div>
          </motion.div>
        )}

        {saveStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200 font-medium">Failed to save settings. Please try again.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GeneralSettings;
