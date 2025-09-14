import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  Loader2,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
  Globe,
  Bell,
  Database,
  FileText,
  Zap,
  RotateCcw
} from 'lucide-react';

interface Setting {
  id: number;
  key: string;
  category: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'multiselect' | 'json' | 'file' | 'password' | 'email' | 'url' | 'date' | 'time' | 'datetime' | 'textarea' | 'color';
  description: string;
  isRequired: boolean;
  isEditable: boolean;
  isVisible: boolean;
  defaultValue: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  tags: string[];
  group: string;
  order: number;
  lastModified: string;
  modifiedBy: string;
  version: number;
  isActive: boolean;
  isSystem: boolean;
  isEncrypted: boolean;
  isBackedUp: boolean;
  backupCount: number;
  accessCount: number;
  lastAccessed?: string;
  dependencies: string[];
  conflicts: string[];
  metadata: Record<string, any>;
}

interface SettingsPageProps {
  settingsType?: 'global' | 'portal' | 'user' | 'security' | 'notification' | 'integration' | 'backup' | 'audit';
}

const SettingsPage: React.FC<SettingsPageProps> = ({ settingsType = 'global' }) => {
  // Comprehensive state management
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  
  // Filters and pagination
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
    status: '',
    group: '',
    tags: ''
  });
  
  const [sortBy, setSortBy] = useState<string>('key');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  
  // Selection and view
  const [selectedSettings, setSelectedSettings] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Real-time updates
  const [isRealTime, setIsRealTime] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
  // Get page configuration based on settings type
  const getPageConfig = (type: string) => {
    const configs = {
      global: {
        title: 'Global Settings',
        description: 'System-wide configuration settings for all portals',
        icon: SettingsIcon,
        color: 'text-emerald-500',
        bgColor: 'bg-emerald-50'
      },
      portal: {
        title: 'Portal Settings',
        description: 'Portal-specific configuration and customization',
        icon: Globe,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50'
      },
      user: {
        title: 'User Preferences',
        description: 'Default user preferences and behavior settings',
        icon: User,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50'
      },
      security: {
        title: 'Security Settings',
        description: 'Security policies, authentication, and access control',
        icon: Shield,
        color: 'text-red-500',
        bgColor: 'bg-red-50'
      },
      notification: {
        title: 'Notification Settings',
        description: 'Email, SMS, and push notification configurations',
        icon: Bell,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50'
      },
      integration: {
        title: 'Integration Settings',
        description: 'Third-party integrations and API configurations',
        icon: Zap,
        color: 'text-orange-500',
        bgColor: 'bg-orange-50'
      },
      backup: {
        title: 'Backup & Restore',
        description: 'Data backup, restore, and recovery settings',
        icon: Database,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-50'
      },
      audit: {
        title: 'Audit Logs',
        description: 'System audit logs and activity tracking',
        icon: FileText,
        color: 'text-gray-500',
        bgColor: 'bg-gray-50'
      }
    };
    return configs[type as keyof typeof configs] || configs.global;
  };

  const pageConfig = getPageConfig(settingsType);

  // Comprehensive mock data for demonstration
  const mockSettings: Setting[] = [
    {
      id: 1,
      key: 'app.name',
      category: 'General',
      value: 'TransBot AI',
      type: 'text',
      description: 'Application name displayed in the header',
      isRequired: true,
      isEditable: true,
      isVisible: true,
      defaultValue: 'TransBot AI',
      tags: ['app', 'general', 'branding'],
      group: 'General',
      order: 1,
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'admin',
      version: 1,
      isActive: true,
      isSystem: false,
      isEncrypted: false,
      isBackedUp: true,
      backupCount: 3,
      accessCount: 45,
      lastAccessed: '2024-01-15T10:30:00Z',
      dependencies: [],
      conflicts: [],
      metadata: {}
    },
    {
      id: 2,
      key: 'app.version',
      category: 'General',
      value: '1.0.0',
      type: 'text',
      description: 'Current application version',
      isRequired: true,
      isEditable: false,
      isVisible: true,
      defaultValue: '1.0.0',
      tags: ['app', 'version', 'system'],
      group: 'General',
      order: 2,
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'system',
      version: 1,
      isActive: true,
      isSystem: true,
      isEncrypted: false,
      isBackedUp: true,
      backupCount: 3,
      accessCount: 23,
      lastAccessed: '2024-01-15T10:30:00Z',
      dependencies: [],
      conflicts: [],
      metadata: {}
    },
    {
      id: 3,
      key: 'database.host',
      category: 'Database',
      value: 'localhost',
      type: 'text',
      description: 'Database server hostname',
      isRequired: true,
      isEditable: true,
      isVisible: true,
      defaultValue: 'localhost',
      tags: ['database', 'connection', 'server'],
      group: 'Database',
      order: 1,
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'admin',
      version: 1,
      isActive: true,
      isSystem: false,
      isEncrypted: false,
      isBackedUp: true,
      backupCount: 2,
      accessCount: 12,
      lastAccessed: '2024-01-15T10:30:00Z',
      dependencies: [],
      conflicts: [],
      metadata: {}
    },
    {
      id: 4,
      key: 'security.session_timeout',
      category: 'Security',
      value: '3600',
      type: 'number',
      description: 'Session timeout in seconds',
      isRequired: true,
      isEditable: true,
      isVisible: true,
      defaultValue: '3600',
      validation: { min: 300, max: 86400, message: 'Must be between 5 minutes and 24 hours' },
      tags: ['security', 'session', 'timeout'],
      group: 'Security',
      order: 1,
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'admin',
      version: 1,
      isActive: true,
      isSystem: false,
      isEncrypted: false,
      isBackedUp: true,
      backupCount: 1,
      accessCount: 8,
      lastAccessed: '2024-01-15T10:30:00Z',
      dependencies: [],
      conflicts: [],
      metadata: {}
    },
    {
      id: 5,
      key: 'notifications.email_enabled',
      category: 'Notifications',
      value: 'true',
      type: 'boolean',
      description: 'Enable email notifications',
      isRequired: false,
      isEditable: true,
      isVisible: true,
      defaultValue: 'true',
      tags: ['notifications', 'email', 'communication'],
      group: 'Notifications',
      order: 1,
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'admin',
      version: 1,
      isActive: true,
      isSystem: false,
      isEncrypted: false,
      isBackedUp: true,
      backupCount: 2,
      accessCount: 15,
      lastAccessed: '2024-01-15T10:30:00Z',
      dependencies: [],
      conflicts: [],
      metadata: {}
    }
  ];

  // Initialize settings with mock data
  useEffect(() => {
    setSettings(mockSettings);
  }, []);

  const handleBulkDelete = () => {
    setSettings(prev => prev.filter(setting => !selectedSettings.includes(setting.id)));
    setSelectedSettings([]);
  };

  const handleBulkReset = () => {
    setSettings(prev => prev.map(setting => 
      selectedSettings.includes(setting.id)
        ? { 
            ...setting, 
            value: setting.defaultValue,
            lastModified: new Date().toISOString(),
            modifiedBy: 'admin',
            version: setting.version + 1
          }
        : setting
    ));
    setSelectedSettings([]);
  };

  // Modal handlers
  const openModal = (type: string, data?: Setting) => {
    console.log(`Opening ${type} modal`, data);
  };

  // Filtering and sorting logic
  const filteredSettings = settings.filter(setting => {
    const matchesSearch = !filters.search || 
      setting.key.toLowerCase().includes(filters.search.toLowerCase()) ||
      setting.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      setting.category.toLowerCase().includes(filters.search.toLowerCase()) ||
      setting.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesCategory = !filters.category || setting.category === filters.category;
    const matchesType = !filters.type || setting.type === filters.type;
    const matchesStatus = !filters.status || 
      (filters.status === 'active' && setting.isActive) ||
      (filters.status === 'inactive' && !setting.isActive) ||
      (filters.status === 'system' && setting.isSystem) ||
      (filters.status === 'user' && !setting.isSystem);
    const matchesGroup = !filters.group || setting.group === filters.group;
    const matchesTags = !filters.tags || setting.tags.some(tag => tag.includes(filters.tags));

    return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesGroup && matchesTags;
  });

  const sortedSettings = [...filteredSettings].sort((a, b) => {
    const aValue = a[sortBy as keyof Setting];
    const bValue = b[sortBy as keyof Setting];
    
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  // Pagination
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedSettings = sortedSettings.slice(startIndex, endIndex);

  // Get unique values for filters
  const categories = [...new Set(settings.map(s => s.category))];
  const types = [...new Set(settings.map(s => s.type))];

  // Update pagination when filtered settings change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredSettings.length / limit));
    setCurrentPage(1);
  }, [filteredSettings.length, limit]);

  // Real-time updates
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setLastUpdated(new Date().toISOString());
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading settings...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <span className="ml-2 text-red-600">Error loading settings: {error}</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <pageConfig.icon className={`h-8 w-8 mr-3 ${pageConfig.color}`} />
              {pageConfig.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {pageConfig.description}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isRealTime
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              Real-time
            </button>
            <button
              onClick={() => setLastUpdated(new Date().toISOString())}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={() => openModal('add')}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Setting
            </button>
          </div>
        </div>
        
        {isRealTime && (
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
          </div>
        )}
      </div>

      {/* Filters and Controls */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search settings..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="system">System</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="key">Key</option>
                <option value="category">Category</option>
                <option value="type">Type</option>
                <option value="lastModified">Last Modified</option>
                <option value="accessCount">Access Count</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedSettings.length} selected
            </span>
            {selectedSettings.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBulkReset}
                  className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => openModal('export')}
                  className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
              </div>
            )}
            <button
              onClick={() => setSelectedSettings(settings.map(s => s.id))}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Select All
            </button>
          </div>
        </div>
      </div>

      {/* Settings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedSettings.length === settings.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSettings(settings.map(s => s.id));
                      } else {
                        setSelectedSettings([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Value
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Modified
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedSettings.map((setting) => (
                <tr key={setting.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedSettings.includes(setting.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSettings([...selectedSettings, setting.id]);
                        } else {
                          setSelectedSettings(selectedSettings.filter(id => id !== setting.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {setting.isSystem ? (
                          <Shield className="h-4 w-4 text-blue-500" />
                        ) : (
                          <User className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {setting.key}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {setting.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {setting.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {setting.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                      {setting.isEncrypted ? '••••••••' : setting.value}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        setting.isActive 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {setting.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {setting.isSystem && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          System
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(setting.lastModified).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal('view', setting)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('edit', setting)}
                        className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('delete', setting)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredSettings.length)} of {filteredSettings.length} settings
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
