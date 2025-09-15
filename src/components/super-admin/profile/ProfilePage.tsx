import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  Key,
  LogOut,
  Edit,
  Save,
  X,
  Camera,
  Upload,
  Download,
  Settings,
  Globe,
  CreditCard,
  FileText,
  Activity,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  Monitor,
  Smartphone,
  Tablet,
  Database,
  Building,
  Play,
  Pause,
  Trash2,
} from 'lucide-react';

interface ProfileTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface ActivityItem {
  id: number;
  type: 'login' | 'logout' | 'settings' | 'security' | 'data' | 'system';
  description: string;
  timestamp: string;
  ip: string;
  device: string;
  status: 'success' | 'warning' | 'error';
}

interface Session {
  id: number;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Super Admin',
    email: 'admin@transbotai.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Software Company Owner',
    company: 'TransBot AI Software Company',
    website: 'https://transbotai.com',
    supportEmail: 'support@transbotai.com',
    industry: 'Transportation Management Software',
    founded: 'January 2024',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // User Management CRUD State
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@transbotai.com',
      role: 'Manager',
      company: 'TransBot AI',
      status: 'Active',
      device: 'Desktop',
      location: 'New York, NY',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
      avatar: null,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@transbotai.com',
      role: 'Operator',
      company: 'TransBot AI',
      status: 'Idle',
      device: 'Mobile',
      location: 'Los Angeles, CA',
      ip: '192.168.1.101',
      lastActive: '15 minutes ago',
      avatar: null,
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@transbotai.com',
      role: 'Customer',
      company: 'Logistics Corp',
      status: 'Inactive',
      device: 'Tablet',
      location: 'Chicago, IL',
      ip: '192.168.1.102',
      lastActive: '2 hours ago',
      avatar: null,
    },
  ]);

  const [, setSelectedUser] = useState<{
    id: number;
    name: string;
    email: string;
    role: string;
    company: string;
    status: string;
    device: string;
    location: string;
    ip: string;
    lastActive: string;
    avatar: string | null;
  } | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [deviceFilter, setDeviceFilter] = useState('All');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRealTime, setIsRealTime] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Settings Management CRUD State
  const [settings, setSettings] = useState([
    {
      id: 1,
      category: 'General',
      key: 'app_name',
      value: 'TransBot AI',
      type: 'text',
      description: 'Application name displayed in the interface',
      isRequired: true,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 2,
      category: 'General',
      key: 'timezone',
      value: 'UTC',
      type: 'select',
      description: 'Default timezone for the application',
      isRequired: true,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 3,
      category: 'Security',
      key: 'session_timeout',
      value: '30',
      type: 'number',
      description: 'Session timeout in minutes',
      isRequired: true,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 4,
      category: 'Security',
      key: 'password_min_length',
      value: '8',
      type: 'number',
      description: 'Minimum password length requirement',
      isRequired: true,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 5,
      category: 'Notifications',
      key: 'email_notifications',
      value: 'true',
      type: 'boolean',
      description: 'Enable email notifications',
      isRequired: false,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 6,
      category: 'Notifications',
      key: 'push_notifications',
      value: 'true',
      type: 'boolean',
      description: 'Enable push notifications',
      isRequired: false,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 7,
      category: 'Appearance',
      key: 'default_theme',
      value: 'system',
      type: 'select',
      description: 'Default theme for new users',
      isRequired: false,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
    {
      id: 8,
      category: 'System',
      key: 'max_file_size',
      value: '10485760',
      type: 'number',
      description: 'Maximum file upload size in bytes',
      isRequired: true,
      isEditable: true,
      lastModified: '2024-01-15 10:30:00',
      modifiedBy: 'Super Admin',
    },
  ]);

  const [, setSelectedSetting] = useState<{
    id: number;
    category: string;
    key: string;
    value: string;
    type: string;
    description: string;
    isRequired: boolean;
    isEditable: boolean;
    lastModified: string;
    modifiedBy: string;
  } | null>(null);
  const [selectedSettings, setSelectedSettings] = useState<number[]>([]);
  const [settingsSearchTerm, setSettingsSearchTerm] = useState('');
  const [settingsCategoryFilter, setSettingsCategoryFilter] = useState('All');
  const [settingsTypeFilter, setSettingsTypeFilter] = useState('All');
  const [settingsSortField, setSettingsSortField] = useState('category');
  const [settingsSortDirection, setSettingsSortDirection] = useState('asc');
  const [settingsCurrentPage, setSettingsCurrentPage] = useState(1);
  const [settingsItemsPerPage, setSettingsItemsPerPage] = useState(10);

  const profileTabs: ProfileTab[] = [
    { id: 'overview', label: 'Dashboard', icon: User },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'company', label: 'Company Info', icon: Building },
    { id: 'users', label: 'User Management', icon: Users, count: 15 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'activity', label: 'Activity Log', icon: Activity, count: 127 },
    { id: 'sessions', label: 'Active Sessions', icon: Monitor, count: 3 },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      type: 'login',
      description: 'Successful login from Chrome on Windows',
      timestamp: '2 minutes ago',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: 2,
      type: 'settings',
      description: 'Updated notification preferences',
      timestamp: '1 hour ago',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: 3,
      type: 'security',
      description: 'Two-factor authentication enabled',
      timestamp: '3 hours ago',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: 4,
      type: 'data',
      description: 'Exported user data',
      timestamp: '1 day ago',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: 5,
      type: 'system',
      description: 'System configuration updated',
      timestamp: '2 days ago',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
  ];

  const activeSessions: Session[] = [
    {
      id: 1,
      device: 'Desktop',
      browser: 'Chrome 120.0.0.0',
      location: 'New York, NY',
      ip: '192.168.1.100',
      lastActive: 'Active now',
      current: true,
    },
    {
      id: 2,
      device: 'Mobile',
      browser: 'Safari 17.1',
      location: 'New York, NY',
      ip: '192.168.1.101',
      lastActive: '2 hours ago',
      current: false,
    },
    {
      id: 3,
      device: 'Tablet',
      browser: 'Chrome 120.0.0.0',
      location: 'New York, NY',
      ip: '192.168.1.102',
      lastActive: '1 day ago',
      current: false,
    },
  ];

  const handleSignOut = () => {
    // Sign out logic here
    console.log('Signing out...');
    setShowSignOutModal(false);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Profile update logic here
    console.log('Updating profile:', profileData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Password change logic here
    console.log('Changing password...');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('File uploaded:', file.name);
      // Handle successful upload
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordInputChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  // User Management CRUD Handlers

  const handleBulkDelete = () => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setLastUpdated(new Date());
  };

  const handleBulkActivate = () => {
    setUsers(prev =>
      prev.map(user => (selectedUsers.includes(user.id) ? { ...user, status: 'Active' } : user))
    );
    setSelectedUsers([]);
    setLastUpdated(new Date());
  };

  const handleBulkDeactivate = () => {
    setUsers(prev =>
      prev.map(user => (selectedUsers.includes(user.id) ? { ...user, status: 'Inactive' } : user))
    );
    setSelectedUsers([]);
    setLastUpdated(new Date());
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(prev =>
      prev.length === filteredUsers.length ? [] : filteredUsers.map(u => u.id)
    );
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'users-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Settings Management CRUD Handlers

  const handleBulkDeleteSettings = () => {
    setSettings(prev => prev.filter(setting => !selectedSettings.includes(setting.id)));
    setSelectedSettings([]);
    setLastUpdated(new Date());
  };

  const handleBulkResetSettings = () => {
    setSettings(prev =>
      prev.map(setting =>
        selectedSettings.includes(setting.id)
          ? {
              ...setting,
              value: getDefaultValue(setting.type),
              lastModified: new Date().toISOString().slice(0, 19).replace('T', ' '),
              modifiedBy: 'Super Admin',
            }
          : setting
      )
    );
    setSelectedSettings([]);
    setLastUpdated(new Date());
  };

  const handleSelectSetting = (settingId: number) => {
    setSelectedSettings(prev =>
      prev.includes(settingId) ? prev.filter(id => id !== settingId) : [...prev, settingId]
    );
  };

  const handleSelectAllSettings = () => {
    setSelectedSettings(prev =>
      prev.length === filteredSettings.length ? [] : filteredSettings.map(s => s.id)
    );
  };

  const handleSortSettings = (field: string) => {
    if (settingsSortField === field) {
      setSettingsSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSettingsSortField(field);
      setSettingsSortDirection('asc');
    }
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(filteredSettings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'settings-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setSettings(prev => [...prev, ...importedSettings]);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error importing settings:', error);
      }
    };
    reader.readAsText(file);
  };

  const getDefaultValue = (type: string) => {
    switch (type) {
      case 'boolean':
        return 'false';
      case 'number':
        return '0';
      case 'select':
        return '';
      default:
        return '';
    }
  };

  // Filtering and Sorting Logic
  const filteredUsers = users
    .filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      const matchesDevice = deviceFilter === 'All' || user.device === deviceFilter;

      return matchesSearch && matchesStatus && matchesRole && matchesDevice;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];

      if (sortDirection === 'asc') {
        return (aValue || '') < (bValue || '') ? -1 : (aValue || '') > (bValue || '') ? 1 : 0;
      } else {
        return (aValue || '') > (bValue || '') ? -1 : (aValue || '') < (bValue || '') ? 1 : 0;
      }
    });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Settings Filtering and Sorting Logic
  const filteredSettings = settings
    .filter(setting => {
      const matchesSearch =
        setting.key.toLowerCase().includes(settingsSearchTerm.toLowerCase()) ||
        setting.description.toLowerCase().includes(settingsSearchTerm.toLowerCase()) ||
        setting.value.toLowerCase().includes(settingsSearchTerm.toLowerCase());
      const matchesCategory =
        settingsCategoryFilter === 'All' || setting.category === settingsCategoryFilter;
      const matchesType = settingsTypeFilter === 'All' || setting.type === settingsTypeFilter;

      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      const aValue = a[settingsSortField as keyof typeof a];
      const bValue = b[settingsSortField as keyof typeof b];

      if (settingsSortDirection === 'asc') {
        return (aValue || '') < (bValue || '') ? -1 : (aValue || '') > (bValue || '') ? 1 : 0;
      } else {
        return (aValue || '') > (bValue || '') ? -1 : (aValue || '') < (bValue || '') ? 1 : 0;
      }
    });

  const settingsTotalPages = Math.ceil(filteredSettings.length / settingsItemsPerPage);
  const settingsStartIndex = (settingsCurrentPage - 1) * settingsItemsPerPage;
  const settingsEndIndex = settingsStartIndex + settingsItemsPerPage;
  const paginatedSettings = filteredSettings.slice(settingsStartIndex, settingsEndIndex);

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Modern Profile Header - 2025 Style */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="relative flex items-start space-x-8">
          <div className="relative group">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/20 backdrop-blur-sm">
              <User className="h-16 w-16 text-white" />
            </div>
            <label className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-110">
              <Camera className="h-5 w-5 text-gray-700" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}
          </div>

          <div className="flex-1 text-white">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={e => handleInputChange('fullName', e.target.value)}
                      className="text-3xl font-bold bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold">{profileData.fullName}</h1>
                  )}
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                    OWNER
                  </span>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.jobTitle}
                    onChange={e => handleInputChange('jobTitle', e.target.value)}
                    className="text-xl text-white/90 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 w-full max-w-md"
                  />
                ) : (
                  <p className="text-xl text-white/90 font-medium">{profileData.jobTitle}</p>
                )}

                <div className="flex items-center space-x-6 text-white/80">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                      />
                    ) : (
                      <span className="text-sm">{profileData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                      />
                    ) : (
                      <span className="text-sm">{profileData.phone}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleProfileUpdate}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                    >
                      <Save className="h-5 w-5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium backdrop-blur-sm"
                    >
                      <X className="h-5 w-5" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium backdrop-blur-sm"
                  >
                    <Edit className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-8">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">Verified</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Key className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium">2FA Enabled</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                <Calendar className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium">Since Jan 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,247</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Logins</p>
              <p className="text-xs text-green-600 dark:text-green-400">+12% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">15,942</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
              <p className="text-xs text-green-600 dark:text-green-400">+8.3% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">$449K</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Revenue</p>
              <p className="text-xs text-green-600 dark:text-green-400">+15.2% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Shield className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">99.98%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">System Uptime</p>
              <p className="text-xs text-green-600 dark:text-green-400">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            Company Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  {profileData.company}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Industry
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.industry}
                  onChange={e => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">{profileData.industry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Founded
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.founded}
                  onChange={e => handleInputChange('founded', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">{profileData.founded}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.website}
                  onChange={e => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <a
                  href={profileData.website}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.website.replace('https://', '')}
                </a>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Support Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.supportEmail}
                  onChange={e => handleInputChange('supportEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">{profileData.supportEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Recent Activity Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Activity
          </h3>
          <button
            onClick={() => setActiveTab('activity')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentActivity.slice(0, 3).map(activity => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.status === 'success'
                    ? 'bg-green-500'
                    : activity.status === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivityLog = () => (
    <div className="space-y-6">
      {/* Activity Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Activity Log</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {['All', 'Login', 'Settings', 'Security', 'Data', 'System'].map(filter => (
            <button
              key={filter}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map(activity => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div
                  className={`w-3 h-3 rounded-full mt-2 ${
                    activity.status === 'success'
                      ? 'bg-green-500'
                      : activity.status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">IP: {activity.ip}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.device}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSessions = () => (
    <div className="space-y-6">
      {/* Sessions Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Active Sessions
          </h3>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
            Sign Out All Other Sessions
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {activeSessions.map(session => (
          <div
            key={session.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    session.device === 'Desktop'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : session.device === 'Mobile'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}
                >
                  {session.device === 'Desktop' ? (
                    <Monitor className="h-6 w-6 text-blue-600" />
                  ) : session.device === 'Mobile' ? (
                    <Smartphone className="h-6 w-6 text-green-600" />
                  ) : (
                    <Tablet className="h-6 w-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{session.browser}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.location} • {session.ip}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last active: {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                  Revoke
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Security Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">Enabled</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Password Strength</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Strong</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <Key className="h-6 w-6 text-purple-600" />
            <div>
              <p className="font-medium text-purple-900 dark:text-purple-100">API Keys</p>
              <p className="text-sm text-purple-700 dark:text-purple-300">3 Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
          <Key className="h-5 w-5 mr-2 text-blue-600" />
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={e => handlePasswordInputChange('currentPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={e => handlePasswordInputChange('newPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={e => handlePasswordInputChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
                required
                minLength={8}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() =>
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
              }
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Key className="h-4 w-4" />
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Security Actions
        </h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage 2FA settings</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Key className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">API Keys</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage API access keys</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-orange-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-gray-100">Export Security Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download security logs and data
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Personal Information Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <User className="h-6 w-6 mr-3 text-blue-600" />
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            <Edit className="h-4 w-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Job Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.jobTitle}
                  onChange={e => handleInputChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.jobTitle}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.phone}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      {/* Company Information Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <Building className="h-6 w-6 mr-3 text-blue-600" />
            Company Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            <Edit className="h-4 w-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.company}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Industry
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.industry}
                  onChange={e => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.industry}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.website}
                  onChange={e => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <a
                  href={profileData.website}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-3 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.website.replace('https://', '')}
                </a>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Support Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.supportEmail}
                  onChange={e => handleInputChange('supportEmail', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.supportEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Founded
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.founded}
                  onChange={e => handleInputChange('founded', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3">
                  {profileData.founded}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Active
              </span>
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md font-medium"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <Settings className="h-6 w-6 mr-3 text-blue-600" />
              Settings Management
            </h3>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isRealTime ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isRealTime ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isRealTime ? 'Pause' : 'Resume'}</span>
            </button>

            <label className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={e => e.target.files?.[0] && handleImportSettings(e.target.files[0])}
                className="hidden"
              />
            </label>

            <button
              onClick={handleExportSettings}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            <button
              onClick={() => console.log('Add setting modal')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Setting</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search settings..."
                value={settingsSearchTerm}
                onChange={e => setSettingsSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={settingsCategoryFilter}
              onChange={e => setSettingsCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Categories</option>
              <option value="General">General</option>
              <option value="Security">Security</option>
              <option value="Notifications">Notifications</option>
              <option value="Appearance">Appearance</option>
              <option value="System">System</option>
              <option value="Integrations">Integrations</option>
              <option value="Billing">Billing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={settingsTypeFilter}
              onChange={e => setSettingsTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="select">Select</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="All">All Settings</option>
              <option value="Required">Required</option>
              <option value="Optional">Optional</option>
              <option value="Editable">Editable</option>
              <option value="Read-only">Read-only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedSettings.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {selectedSettings.length} setting{selectedSettings.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBulkResetSettings}
                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Reset to Default
              </button>
              <button
                onClick={handleBulkDeleteSettings}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedSettings.length === filteredSettings.length &&
                      filteredSettings.length > 0
                    }
                    onChange={handleSelectAllSettings}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSortSettings('category')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Category</span>
                    {settingsSortField === 'category' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSortSettings('key')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Key</span>
                    {settingsSortField === 'key' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSortSettings('value')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Value</span>
                    {settingsSortField === 'value' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSortSettings('type')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Type</span>
                    {settingsSortField === 'type' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedSettings.map(setting => (
                <tr
                  key={setting.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedSettings.includes(setting.id)}
                      onChange={() => handleSelectSetting(setting.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        setting.category === 'General'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          : setting.category === 'Security'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : setting.category === 'Notifications'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              : setting.category === 'Appearance'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                : setting.category === 'System'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}
                    >
                      {setting.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {setting.key}
                      </code>
                      {setting.isRequired && <span className="text-red-500 text-xs">*</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {setting.type === 'boolean' ? (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            setting.value === 'true'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}
                        >
                          {setting.value}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                          {setting.value}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
                      {setting.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                      {setting.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {setting.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSetting(setting);
                          console.log('View setting modal');
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View Setting"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {setting.isEditable && (
                        <button
                          onClick={() => {
                            setSelectedSetting(setting);
                            console.log('Edit setting modal');
                          }}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="Edit Setting"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedSetting(setting);
                          console.log('Delete setting modal');
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete Setting"
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
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setSettingsCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={settingsCurrentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setSettingsCurrentPage(prev => Math.min(prev + 1, settingsTotalPages))}
              disabled={settingsCurrentPage === settingsTotalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{settingsStartIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(settingsEndIndex, filteredSettings.length)}
                </span>{' '}
                of <span className="font-medium">{filteredSettings.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                <select
                  value={settingsItemsPerPage}
                  onChange={e => setSettingsItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: settingsTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setSettingsCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      page === settingsCurrentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Enterprise Plan</h3>
            <p className="text-gray-600 dark:text-gray-400">Full access to all features</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">$299</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">per month</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Unlimited Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">24/7 Support</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Advanced Analytics</span>
          </div>
        </div>

        <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
          Manage Subscription
        </button>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <CreditCard className="h-6 w-6 mr-3 text-blue-600" />
            Payment Methods
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add Payment Method</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  •••• •••• •••• 4242
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Default
              </span>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <FileText className="h-6 w-6 mr-3 text-blue-600" />
          Billing History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">Jan 15, 2024</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                  Enterprise Plan - Monthly
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">$299.00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">Dec 15, 2023</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                  Enterprise Plan - Monthly
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100">$299.00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
              <Users className="h-6 w-6 mr-3 text-blue-600" />
              User Management
            </h3>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {isRealTime ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isRealTime ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isRealTime ? 'Pause' : 'Resume'}</span>
            </button>

            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>

            <button
              onClick={() => console.log('Add user modal')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Idle">Idle</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Device
            </label>
            <select
              value={deviceFilter}
              onChange={e => setDeviceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Devices</option>
              <option value="Desktop">Desktop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleBulkActivate}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {sortField === 'name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {sortField === 'email' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {sortField === 'role' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === 'status' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('device')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Device</span>
                    {sortField === 'device' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : user.status === 'Idle'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {user.device === 'Desktop' ? (
                        <Monitor className="h-4 w-4 text-blue-600" />
                      ) : user.device === 'Mobile' ? (
                        <Smartphone className="h-4 w-4 text-green-600" />
                      ) : (
                        <Tablet className="h-4 w-4 text-purple-600" />
                      )}
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {user.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          console.log('View user modal');
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="View User"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          console.log('Edit user modal');
                        }}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          console.log('Delete user modal');
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete User"
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
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={e => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataPrivacy = () => (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <Download className="h-6 w-6 mr-3 text-blue-600" />
          Data Export
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Export Your Data
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Download a copy of all your personal data including profile information, activity
              logs, and preferences.
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4" />
              <span>Request Data Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <Shield className="h-6 w-6 mr-3 text-blue-600" />
          Privacy Settings
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Profile Visibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allow others to see your profile information
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Activity Tracking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your activity for analytics and improvements
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                Marketing Communications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive marketing emails and updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Deletion */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-red-200 dark:border-red-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <AlertTriangle className="h-6 w-6 mr-3 text-red-600" />
          Data Management
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
              Clear Activity Data
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              Permanently delete your activity logs and session history. This action cannot be
              undone.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Clear Activity Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'personal':
        return renderPersonalInfo();
      case 'company':
        return renderCompanyInfo();
      case 'users':
        return renderUserManagement();
      case 'activity':
        return renderActivityLog();
      case 'sessions':
        return renderActiveSessions();
      case 'security':
        return renderSecurity();
      case 'preferences':
        return renderPreferences();
      case 'billing':
        return renderBilling();
      case 'data':
        return renderDataPrivacy();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Profile & Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile, security, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Profile
              </h2>
              <nav className="space-y-2">
                {profileTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {tab.count && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Account Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Account Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowSignOutModal(true)}
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Settings className="h-5 w-5" />
                  <span>Preferences</span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderActiveTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sign Out Modal */}
        <AnimatePresence>
          {showSignOutModal && (
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
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <LogOut className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Sign Out
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Are you sure you want to sign out? You'll need to log in again to access your
                  account.
                </p>
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowSignOutModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
