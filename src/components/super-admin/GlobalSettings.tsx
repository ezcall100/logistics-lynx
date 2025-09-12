import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Database,
  Mail,
  Bell,
  Lock,
  Eye,
  Upload,
  Download,
  Trash2,
  Plus,
  Edit,
  Search,
  Activity,
  Zap,
  Power,
  PowerOff,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { cn, formatRelativeTime, getStatusColor, getStatusIcon } from '../../lib/utils';

interface SystemSettings {
  id: string;
  category: string;
  name: string;
  description: string;
  value: unknown;
  type: 'string' | 'number' | 'boolean' | 'select' | 'json';
  options?: string[];
  required: boolean;
  sensitive: boolean;
  lastModified: string;
  modifiedBy: string;
}

interface MaintenanceWindow {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  affectedServices: string[];
  notifications: boolean;
  createdBy: string;
  createdAt: string;
}

interface SystemHealth {
  service: string;
  status: 'healthy' | 'warning' | 'error' | 'maintenance';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  details: string;
}

interface BackupInfo {
  id: number;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: number;
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled';
  createdAt: string;
  expiresAt: string;
  location: string;
}

const GlobalSettings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings[]>([]);
  const [maintenanceWindows, setMaintenanceWindows] = useState<MaintenanceWindow[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([]);
  const [backups, setBackups] = useState<BackupInfo[]>([]);
  const [activeTab, setActiveTab] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const settingCategories = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'api', name: 'API', icon: Zap },
    { id: 'backup', name: 'Backup', icon: Database },
    { id: 'monitoring', name: 'Monitoring', icon: Activity },
  ];

  // Mock data initialization
  useEffect(() => {
    const mockSettings: SystemSettings[] = [
      {
        id: 'app_name',
        category: 'general',
        name: 'Application Name',
        description: 'The name of the application displayed to users',
        value: 'Trans Bot AI',
        type: 'string',
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'app_version',
        category: 'general',
        name: 'Application Version',
        description: 'Current version of the application',
        value: '1.0.0',
        type: 'string',
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'maintenance_mode',
        category: 'general',
        name: 'Maintenance Mode',
        description: 'Enable maintenance mode to restrict access',
        value: false,
        type: 'boolean',
        required: false,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'session_timeout',
        category: 'security',
        name: 'Session Timeout',
        description: 'User session timeout in minutes',
        value: 30,
        type: 'number',
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'password_policy',
        category: 'security',
        name: 'Password Policy',
        description: 'Password complexity requirements',
        value: 'strong',
        type: 'select',
        options: ['weak', 'medium', 'strong', 'very_strong'],
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'two_factor_required',
        category: 'security',
        name: 'Two-Factor Authentication',
        description: 'Require 2FA for all users',
        value: true,
        type: 'boolean',
        required: false,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'database_pool_size',
        category: 'database',
        name: 'Database Pool Size',
        description: 'Maximum number of database connections',
        value: 20,
        type: 'number',
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'backup_frequency',
        category: 'backup',
        name: 'Backup Frequency',
        description: 'How often to perform automated backups',
        value: 'daily',
        type: 'select',
        options: ['hourly', 'daily', 'weekly', 'monthly'],
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'smtp_host',
        category: 'email',
        name: 'SMTP Host',
        description: 'SMTP server hostname',
        value: 'smtp.example.com',
        type: 'string',
        required: true,
        sensitive: true,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
      {
        id: 'api_rate_limit',
        category: 'api',
        name: 'API Rate Limit',
        description: 'Maximum API requests per minute per user',
        value: 1000,
        type: 'number',
        required: true,
        sensitive: false,
        lastModified: '2024-01-15T10:30:00Z',
        modifiedBy: 'Super Admin',
      },
    ];

    const mockMaintenanceWindows: MaintenanceWindow[] = [
      {
        id: 1,
        name: 'Database Optimization',
        description: 'Scheduled database maintenance and optimization',
        startTime: '2024-01-20T02:00:00Z',
        endTime: '2024-01-20T04:00:00Z',
        status: 'scheduled',
        affectedServices: ['Database', 'API', 'Web Portal'],
        notifications: true,
        createdBy: 'Super Admin',
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        name: 'Security Updates',
        description: 'Apply critical security patches',
        startTime: '2024-01-18T01:00:00Z',
        endTime: '2024-01-18T02:00:00Z',
        status: 'completed',
        affectedServices: ['All Services'],
        notifications: true,
        createdBy: 'Super Admin',
        createdAt: '2024-01-15T10:30:00Z',
      },
    ];

    const mockSystemHealth: SystemHealth[] = [
      {
        service: 'Database',
        status: 'healthy',
        uptime: 99.9,
        responseTime: 12,
        lastCheck: '2024-01-15T10:30:00Z',
        details: 'All database connections healthy',
      },
      {
        service: 'API Gateway',
        status: 'healthy',
        uptime: 99.8,
        responseTime: 45,
        lastCheck: '2024-01-15T10:30:00Z',
        details: 'API gateway responding normally',
      },
      {
        service: 'Web Portal',
        status: 'healthy',
        uptime: 99.7,
        responseTime: 120,
        lastCheck: '2024-01-15T10:30:00Z',
        details: 'Web portal accessible',
      },
      {
        service: 'Email Service',
        status: 'warning',
        uptime: 98.5,
        responseTime: 250,
        lastCheck: '2024-01-15T10:30:00Z',
        details: 'Email service experiencing delays',
      },
    ];

    const mockBackups: BackupInfo[] = [
      {
        id: 1,
        name: 'Daily Backup - 2024-01-15',
        type: 'full',
        size: 2.5,
        status: 'completed',
        createdAt: '2024-01-15T02:00:00Z',
        expiresAt: '2024-02-15T02:00:00Z',
        location: 's3://backups/daily-2024-01-15.tar.gz',
      },
      {
        id: 2,
        name: 'Weekly Backup - 2024-01-14',
        type: 'full',
        size: 2.3,
        status: 'completed',
        createdAt: '2024-01-14T02:00:00Z',
        expiresAt: '2024-02-14T02:00:00Z',
        location: 's3://backups/weekly-2024-01-14.tar.gz',
      },
      {
        id: 3,
        name: 'Incremental Backup - 2024-01-15',
        type: 'incremental',
        size: 0.2,
        status: 'in_progress',
        createdAt: '2024-01-15T10:30:00Z',
        expiresAt: '2024-01-22T10:30:00Z',
        location: 's3://backups/incremental-2024-01-15.tar.gz',
      },
    ];

    setSettings(mockSettings);
    setMaintenanceWindows(mockMaintenanceWindows);
    setSystemHealth(mockSystemHealth);
    setBackups(mockBackups);
  }, []);

  const filteredSettings = settings.filter(setting => {
    const matchesSearch =
      setting.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || setting.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleUpdateSetting = async (settingId: string, newValue: unknown) => {
    setLoading(true);
    try {
      setSettings(prev =>
        prev.map(setting =>
          setting.id === settingId
            ? {
                ...setting,
                value: newValue,
                lastModified: new Date().toISOString(),
                modifiedBy: 'Super Admin',
              }
            : setting
        )
      );
    } catch (error) {
      console.error('Error updating setting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMaintenanceMode = async () => {
    setLoading(true);
    try {
      const newValue = !maintenanceMode;
      setMaintenanceMode(newValue);
      await handleUpdateSetting('maintenance_mode', newValue);
    } catch (error) {
      console.error('Error toggling maintenance mode:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      {/* Maintenance Mode Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Control system-wide maintenance and access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${maintenanceMode ? 'bg-red-100' : 'bg-green-100'}`}>
                {maintenanceMode ? (
                  <PowerOff className="w-5 h-5 text-red-600" />
                ) : (
                  <Power className="w-5 h-5 text-green-600" />
                )}
              </div>
              <div>
                <div className="font-medium text-gray-900">Maintenance Mode</div>
                <div className="text-sm text-gray-600">
                  {maintenanceMode ? 'System is in maintenance mode' : 'System is operational'}
                </div>
              </div>
            </div>
            <Button
              onClick={handleToggleMaintenanceMode}
              loading={loading}
              variant={maintenanceMode ? 'default' : 'outline'}
            >
              {maintenanceMode ? 'Disable Maintenance' : 'Enable Maintenance'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Monitor system services and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map(health => (
              <div
                key={health.service}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      health.status === 'healthy'
                        ? 'bg-green-500'
                        : health.status === 'warning'
                          ? 'bg-yellow-500'
                          : health.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-gray-500'
                    }`}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{health.service}</div>
                    <div className="text-sm text-gray-600">{health.details}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{health.uptime}% uptime</div>
                  <div className="text-sm text-gray-600">{health.responseTime}ms avg</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings</CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search settings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-64"
                leftIcon={<Search className="w-4 h-4" />}
              />
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {settingCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSettings.map(setting => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-900">{setting.name}</div>
                    {setting.required && <span className="text-red-500 text-xs">*</span>}
                    {setting.sensitive && <Lock className="w-4 h-4 text-gray-400" />}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{setting.description}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Last modified: {formatRelativeTime(setting.lastModified)} by{' '}
                    {setting.modifiedBy}
                  </div>
                </div>
                <div className="ml-4">
                  {setting.type === 'boolean' ? (
                    <button
                      onClick={() => handleUpdateSetting(setting.id, !setting.value)}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                        setting.value ? 'bg-primary-600' : 'bg-gray-200'
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        )}
                      />
                    </button>
                  ) : setting.type === 'select' ? (
                    <select
                      value={setting.value as string}
                      onChange={e => handleUpdateSetting(setting.id, e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {setting.options?.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={setting.type === 'number' ? 'number' : 'text'}
                      value={setting.value as string}
                      onChange={e =>
                        handleUpdateSetting(
                          setting.id,
                          setting.type === 'number' ? parseFloat(e.target.value) : e.target.value
                        )
                      }
                      className="w-48"
                      rightIcon={setting.sensitive ? <Eye className="w-4 h-4" /> : undefined}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMaintenanceWindows = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Maintenance Windows</h3>
          <p className="text-gray-600">Schedule and manage system maintenance</p>
        </div>
        <Button onClick={() => alert('Maintenance scheduling feature coming soon')}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      <div className="space-y-4">
        {maintenanceWindows.map(window => (
          <Card key={window.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{window.name}</h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(window.status)}`}
                    >
                      {getStatusIcon(window.status)}
                      {window.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{window.description}</p>
                  <div className="text-sm text-gray-500">
                    <div>Start: {formatRelativeTime(window.startTime)}</div>
                    <div>End: {formatRelativeTime(window.endTime)}</div>
                    <div>Affected Services: {window.affectedServices.join(', ')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBackups = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Backup Management</h3>
          <p className="text-gray-600">Manage system backups and recovery</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert('Backup creation feature coming soon')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Backup
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restore
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {backups.map(backup => (
          <Card key={backup.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{backup.name}</h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(backup.status)}`}
                    >
                      {getStatusIcon(backup.status)}
                      {backup.status}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {backup.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div>Size: {backup.size} GB</div>
                    <div>Created: {formatRelativeTime(backup.createdAt)}</div>
                    <div>Expires: {formatRelativeTime(backup.expiresAt)}</div>
                    <div>Location: {backup.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Global Settings</h2>
          <p className="text-gray-600">System-wide configuration and maintenance controls</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {settingCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === category.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'general' && renderGeneralSettings()}
          {activeTab === 'security' && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
              <p className="text-gray-500">Security configuration panel coming soon</p>
            </div>
          )}
          {activeTab === 'database' && (
            <div className="text-center py-12">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Database Settings</h3>
              <p className="text-gray-500">Database configuration panel coming soon</p>
            </div>
          )}
          {activeTab === 'email' && (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Settings</h3>
              <p className="text-gray-500">Email configuration panel coming soon</p>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Settings</h3>
              <p className="text-gray-500">Notification configuration panel coming soon</p>
            </div>
          )}
          {activeTab === 'api' && (
            <div className="text-center py-12">
              <Zap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">API Settings</h3>
              <p className="text-gray-500">API configuration panel coming soon</p>
            </div>
          )}
          {activeTab === 'backup' && renderBackups()}
          {activeTab === 'monitoring' && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Monitoring Settings</h3>
              <p className="text-gray-500">Monitoring configuration panel coming soon</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Maintenance Windows Tab */}
      {activeTab === 'general' && (
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Windows</CardTitle>
            <CardDescription>Schedule and manage system maintenance</CardDescription>
          </CardHeader>
          <CardContent>{renderMaintenanceWindows()}</CardContent>
        </Card>
      )}
    </div>
  );
};

export default GlobalSettings;
