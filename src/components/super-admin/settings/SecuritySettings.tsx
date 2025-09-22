import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Save,
  RefreshCw,
  Trash2,
  Plus
} from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('authentication');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    authentication: {
      requireTwoFactor: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      rememberDevice: true,
      biometricAuth: false,
      ssoEnabled: false,
      ldapEnabled: false
    },
    accessControl: {
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      allowedCountries: ['US', 'CA', 'GB'],
      timeRestrictions: true,
      workingHours: { start: '09:00', end: '17:00' },
      weekendAccess: false,
      holidayAccess: false
    },
    encryption: {
      dataEncryption: true,
      encryptionLevel: 'AES-256',
      keyRotation: 90,
      backupEncryption: true,
      communicationEncryption: true,
      fileEncryption: true
    },
    monitoring: {
      loginLogging: true,
      activityLogging: true,
      auditTrail: true,
      anomalyDetection: true,
      realTimeAlerts: true,
      logRetention: 365
    }
  });

  // Sample data for tables
  const [activeSessions] = useState([
    { id: 1, user: 'john.doe@company.com', ip: '192.168.1.100', location: 'New York, US', loginTime: '2024-01-15 09:30', device: 'Chrome on Windows', status: 'active' },
    { id: 2, user: 'jane.smith@company.com', ip: '10.0.0.50', location: 'Toronto, CA', loginTime: '2024-01-15 08:45', device: 'Safari on macOS', status: 'active' },
    { id: 3, user: 'mike.wilson@company.com', ip: '172.16.0.25', location: 'London, GB', loginTime: '2024-01-15 14:20', device: 'Firefox on Linux', status: 'active' }
  ]);

  const [securityLogs] = useState([
    { id: 1, timestamp: '2024-01-15 15:30', event: 'Failed login attempt', user: 'unknown@example.com', ip: '203.0.113.1', severity: 'high', status: 'blocked' },
    { id: 2, timestamp: '2024-01-15 14:15', event: 'Password changed', user: 'john.doe@company.com', ip: '192.168.1.100', severity: 'medium', status: 'success' },
    { id: 3, timestamp: '2024-01-15 13:45', event: 'Two-factor authentication enabled', user: 'jane.smith@company.com', ip: '10.0.0.50', severity: 'medium', status: 'success' },
    { id: 4, timestamp: '2024-01-15 12:30', event: 'Suspicious login pattern', user: 'mike.wilson@company.com', ip: '172.16.0.25', severity: 'high', status: 'flagged' }
  ]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (category: string, key: string, value: string | number | boolean | string[] | object) => {
    setSecuritySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const SettingCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
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

  const renderAuthenticationTab = () => (
    <div className="space-y-6">
      <SettingCard title="Authentication Settings">
        <div className="space-y-1">
          <SettingRow label="Two-Factor Authentication" description="Require 2FA for all users">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.authentication.requireTwoFactor}
                onChange={(e) => updateSetting('authentication', 'requireTwoFactor', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
          <SettingRow label="Session Timeout (minutes)" description="Auto-logout after inactivity">
            <input
              type="number"
              value={securitySettings.authentication.sessionTimeout}
              onChange={(e) => updateSetting('authentication', 'sessionTimeout', parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </SettingRow>
          <SettingRow label="Max Login Attempts" description="Lock account after failed attempts">
            <input
              type="number"
              value={securitySettings.authentication.maxLoginAttempts}
              onChange={(e) => updateSetting('authentication', 'maxLoginAttempts', parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </SettingRow>
          <SettingRow label="Password Expiry (days)" description="Force password change after days">
            <input
              type="number"
              value={securitySettings.authentication.passwordExpiry}
              onChange={(e) => updateSetting('authentication', 'passwordExpiry', parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </SettingRow>
          <SettingRow label="Biometric Authentication" description="Enable fingerprint/face recognition">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.authentication.biometricAuth}
                onChange={(e) => updateSetting('authentication', 'biometricAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
        </div>
      </SettingCard>

      <SettingCard title="Single Sign-On (SSO)">
        <div className="space-y-1">
          <SettingRow label="Enable SSO" description="Allow users to sign in with external providers">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.authentication.ssoEnabled}
                onChange={(e) => updateSetting('authentication', 'ssoEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
          <SettingRow label="LDAP Integration" description="Connect to Active Directory">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.authentication.ldapEnabled}
                onChange={(e) => updateSetting('authentication', 'ldapEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
        </div>
      </SettingCard>
    </div>
  );

  const renderAccessControlTab = () => (
    <div className="space-y-6">
      <SettingCard title="IP Access Control">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Allowed IP Ranges</label>
            <div className="space-y-2">
              {securitySettings.accessControl.ipWhitelist.map((ip, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={ip}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Plus className="w-4 h-4" />
                <span>Add IP Range</span>
              </button>
            </div>
          </div>
        </div>
      </SettingCard>

      <SettingCard title="Geographic Restrictions">
        <div className="space-y-1">
          <SettingRow label="Allowed Countries" description="Restrict access by country">
            <select
              multiple
              value={securitySettings.accessControl.allowedCountries}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                updateSetting('accessControl', 'allowedCountries', values);
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
            </select>
          </SettingRow>
        </div>
      </SettingCard>

      <SettingCard title="Time-Based Access">
        <div className="space-y-1">
          <SettingRow label="Enable Time Restrictions" description="Restrict access to specific hours">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.accessControl.timeRestrictions}
                onChange={(e) => updateSetting('accessControl', 'timeRestrictions', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
          <SettingRow label="Working Hours" description="Allowed access hours">
            <div className="flex items-center space-x-2">
              <input
                type="time"
                value={securitySettings.accessControl.workingHours.start}
                onChange={(e) => updateSetting('accessControl', 'workingHours', { ...securitySettings.accessControl.workingHours, start: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="time"
                value={securitySettings.accessControl.workingHours.end}
                onChange={(e) => updateSetting('accessControl', 'workingHours', { ...securitySettings.accessControl.workingHours, end: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </SettingRow>
          <SettingRow label="Weekend Access" description="Allow access on weekends">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.accessControl.weekendAccess}
                onChange={(e) => updateSetting('accessControl', 'weekendAccess', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
        </div>
      </SettingCard>
    </div>
  );

  const renderMonitoringTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingCard title="Active Sessions">
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900 dark:text-white">{session.user}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session.device}</p>
                  <p className="text-xs text-gray-400">{session.location} • {session.loginTime}</p>
                </div>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </SettingCard>

        <SettingCard title="Security Logs">
          <div className="space-y-3">
            {securityLogs.map((log) => (
              <div key={log.id} className={`p-3 rounded-lg border-l-4 ${
                log.severity === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                log.severity === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                'border-green-500 bg-green-50 dark:bg-green-900/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {log.severity === 'high' ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                     log.severity === 'medium' ? <Clock className="w-4 h-4 text-yellow-600" /> :
                     <CheckCircle className="w-4 h-4 text-green-600" />}
                    <span className="font-medium text-gray-900 dark:text-white">{log.event}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    log.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    log.status === 'blocked' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{log.user} • {log.ip}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{log.timestamp}</p>
              </div>
            ))}
          </div>
        </SettingCard>
      </div>

      <SettingCard title="Audit Settings">
        <div className="space-y-1">
          <SettingRow label="Login Logging" description="Log all login attempts">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.monitoring.loginLogging}
                onChange={(e) => updateSetting('monitoring', 'loginLogging', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
          <SettingRow label="Activity Logging" description="Log user activities">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.monitoring.activityLogging}
                onChange={(e) => updateSetting('monitoring', 'activityLogging', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
          <SettingRow label="Anomaly Detection" description="Detect unusual access patterns">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.monitoring.anomalyDetection}
                onChange={(e) => updateSetting('monitoring', 'anomalyDetection', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </SettingRow>
          <SettingRow label="Log Retention (days)" description="How long to keep security logs">
            <input
              type="number"
              value={securitySettings.monitoring.logRetention}
              onChange={(e) => updateSetting('monitoring', 'logRetention', parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </SettingRow>
        </div>
      </SettingCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Settings</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage authentication, access control, and security monitoring</p>
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
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Saved</span>
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
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

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex space-x-2 mb-6">
            <TabButton id="authentication" label="Authentication" icon={Lock} isActive={activeTab === 'authentication'} />
            <TabButton id="access" label="Access Control" icon={Users} isActive={activeTab === 'access'} />
            <TabButton id="monitoring" label="Monitoring" icon={Eye} isActive={activeTab === 'monitoring'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'authentication' && renderAuthenticationTab()}
          {activeTab === 'access' && renderAccessControlTab()}
          {activeTab === 'monitoring' && renderMonitoringTab()}
        </div>

        {/* Status Messages */}
        {saveStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200 font-medium">Security settings saved successfully!</p>
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
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200 font-medium">Failed to save security settings. Please try again.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
