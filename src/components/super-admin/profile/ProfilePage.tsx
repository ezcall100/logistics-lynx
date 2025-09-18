import React, { useState, useCallback, useRef } from 'react';
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
        return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      aValue || '') < (bValue || '') ? -1 : (aValue || '') > (bValue || '') ? 1 : 0;
      } else {
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      aValue || '') > (bValue || '') ? -1 : (aValue || '') < (bValue || '') ? 1 : 0;
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
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      aValue || '') < (bValue || '') ? -1 : (aValue || '') > (bValue || '') ? 1 : 0;
      } else {
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      aValue || '') > (bValue || '') ? -1 : (aValue || '') < (bValue || '') ? 1 : 0;
      }
    });

  const settingsTotalPages = Math.ceil(filteredSettings.length / settingsItemsPerPage);
  const settingsStartIndex = (settingsCurrentPage - 1) * settingsItemsPerPage;
  const settingsEndIndex = settingsStartIndex + settingsItemsPerPage;
  const paginatedSettings = filteredSettings.slice(settingsStartIndex, settingsEndIndex);

  const renderOverview = () => (
    <div className="space-y-8 responsive-container">
      {/* Modern Profile Header - 2025 Style */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl responsive-container">
        <div className="absolute inset-0 opacity-20 responsive-container">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent responsive-container"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] responsive-container"></div>
        </div>
        
        <div className="relative flex items-start space-x-8 responsive-container">
          <div className="relative group responsive-container">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-white/20 backdrop-blur-sm responsive-container">
              <User className="h-16 w-16 text-white responsive-container" />
            </div>
            <label className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group-hover:scale-110 responsive-container">
              <Camera className="h-5 w-5 text-gray-700 responsive-container" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden responsive-container"
                disabled={isUploading}
              />
            </label>
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center backdrop-blur-sm responsive-container">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white responsive-container"></div>
              </div>
            )}
          </div>
          
          <div className="flex-1 text-white responsive-container">
            <div className="flex items-start justify-between responsive-container">
              <div className="space-y-3 responsive-container">
                <div className="flex items-center space-x-4 responsive-container">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={e => handleInputChange('fullName', e.target.value)}
                      className="text-3xl font-bold bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 responsive-container"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold responsive-container">{profileData.fullName}</h1>
                  )}
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg responsive-container">
                    OWNER
                  </span>
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.jobTitle}
                    onChange={e => handleInputChange('jobTitle', e.target.value)}
                    className="text-xl text-white/90 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 w-full max-w-md responsive-container"
                  />
                ) : (
                  <p className="text-xl text-white/90 font-medium responsive-container">{profileData.jobTitle}</p>
                )}
                
                <div className="flex items-center space-x-6 text-white/80 responsive-container">
                  <div className="flex items-center space-x-2 responsive-container">
                    <Mail className="h-4 w-4 responsive-container" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 responsive-container"
                      />
                    ) : (
                      <span className="text-sm responsive-container">{profileData.email}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 responsive-container">
                    <Phone className="h-4 w-4 responsive-container" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        className="bg-white/10 backdrop-blur-sm border border-white/30 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 responsive-container"
                      />
                    ) : (
                      <span className="text-sm responsive-container">{profileData.phone}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 responsive-container">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleProfileUpdate}
                      className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium responsive-container"
                     aria-label="Button">
                      <Save className="h-5 w-5 responsive-container" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
            aria-label="Button"
                      className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium backdrop-blur-sm responsive-container"
                    >
                      <X className="h-5 w-5 responsive-container" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
            aria-label="Button"
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium backdrop-blur-sm responsive-container"
                  >
                    <Edit className="h-5 w-5 responsive-container" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex items-center space-x-8 responsive-container">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 responsive-container">
                <Shield className="h-4 w-4 text-green-400 responsive-container" />
                <span className="text-sm font-medium responsive-container">Verified</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 responsive-container">
                <Key className="h-4 w-4 text-blue-400 responsive-container" />
                <span className="text-sm font-medium responsive-container">2FA Enabled</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 responsive-container">
                <Calendar className="h-4 w-4 text-purple-400 responsive-container" />
                <span className="text-sm font-medium responsive-container">Since Jan 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 responsive-container">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow responsive-container">
          <div className="flex items-center space-x-3 responsive-container">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg responsive-container">
              <Activity className="h-5 w-5 text-blue-600 responsive-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">1,247</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">Total Logins</p>
              <p className="text-xs text-green-600 dark:text-green-400 responsive-container">+12% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow responsive-container">
          <div className="flex items-center space-x-3 responsive-container">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg responsive-container">
              <Users className="h-5 w-5 text-green-600 responsive-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">15,942</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">Total Users</p>
              <p className="text-xs text-green-600 dark:text-green-400 responsive-container">+8.3% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow responsive-container">
          <div className="flex items-center space-x-3 responsive-container">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg responsive-container">
              <TrendingUp className="h-5 w-5 text-purple-600 responsive-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">$449K</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">Monthly Revenue</p>
              <p className="text-xs text-green-600 dark:text-green-400 responsive-container">+15.2% this month</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow responsive-container">
          <div className="flex items-center space-x-3 responsive-container">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg responsive-container">
              <Shield className="h-5 w-5 text-orange-600 responsive-container" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">99.98%</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">System Uptime</p>
              <p className="text-xs text-green-600 dark:text-green-400 responsive-container">All systems operational</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between mb-4 responsive-container">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center responsive-container">
            <Globe className="h-5 w-5 mr-2 text-blue-600 responsive-container" />
            Company Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            aria-label="Button"
            className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
          >
            <Edit className="h-4 w-4 responsive-container" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container">
          <div className="space-y-4 responsive-container">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium responsive-container">
                  {profileData.company}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                Industry
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.industry}
                  onChange={e => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 responsive-container">{profileData.industry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                Founded
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.founded}
                  onChange={e => handleInputChange('founded', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 responsive-container">{profileData.founded}</p>
              )}
            </div>
          </div>
          <div className="space-y-4 responsive-container">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.website}
                  onChange={e => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                />
              ) : (
                <a
                  href={profileData.website}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.website.replace('https://', '')}
                </a>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                Support Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.supportEmail}
                  onChange={e => handleInputChange('supportEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 responsive-container">{profileData.supportEmail}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                Status
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 responsive-container">
                Active
              </span>
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="mt-6 flex items-center justify-end space-x-3 responsive-container">
            <button
              onClick={() => setIsEditing(false)}
            aria-label="Button"
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors responsive-container"
            >
              Cancel
            </button>
            <button
              onClick={handleProfileUpdate}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
             aria-label="Button">
              <Save className="h-4 w-4 responsive-container" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Recent Activity Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between mb-4 responsive-container">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
            Recent Activity
          </h3>
          <button
            onClick={() => setActiveTab('activity')}
            aria-label="Button"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium responsive-container"
          >
            View All
          </button>
        </div>
        <div className="space-y-3 responsive-container">
          {recentActivity.slice(0, 3).map(activity => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors responsive-container"
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
              <div className="flex-1 responsive-container">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 responsive-container">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivityLog = () => (
    <div className="space-y-6 responsive-container">
      {/* Activity Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between mb-4 responsive-container">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">Activity Log</h3>
          <div className="flex items-center space-x-3 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
              />
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
              <Filter className="h-4 w-4 responsive-container" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 responsive-container">
          {['All', 'Login', 'Settings', 'Security', 'Data', 'System'].map(filter => (
            <button
              key={filter}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container"
             aria-label="Button">
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="p-6 responsive-container">
          <div className="space-y-4 responsive-container">
            {recentActivity.map(activity => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container"
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
                <div className="flex-1 responsive-container">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-1 responsive-container">
                    <p className="text-xs text-gray-500 dark:text-gray-400 responsive-container">{activity.timestamp}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 responsive-container">IP: {activity.ip}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 responsive-container">{activity.device}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded responsive-container" aria-label="Button">
                  <MoreVertical className="h-4 w-4 text-gray-400 responsive-container" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSessions = () => (
    <div className="space-y-6 responsive-container">
      {/* Sessions Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between responsive-container">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
            Active Sessions
          </h3>
          <button className="text-red-600 hover:text-red-700 text-sm font-medium responsive-container" aria-label="Button">
            Sign Out All Other Sessions
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4 responsive-container">
        {activeSessions.map(session => (
          <div
            key={session.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div className="flex items-center space-x-4 responsive-container">
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
                    <Monitor className="h-6 w-6 text-blue-600 responsive-container" />
                  ) : session.device === 'Mobile' ? (
                    <Smartphone className="h-6 w-6 text-green-600 responsive-container" />
                  ) : (
                    <Tablet className="h-6 w-6 text-purple-600 responsive-container" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 responsive-container">
                    <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container">{session.device}</p>
                    {session.current && (
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full responsive-container">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">{session.browser}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                    {session.location} • {session.ip}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                    Last active: {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button className="text-red-600 hover:text-red-700 text-sm font-medium responsive-container" aria-label="Button">
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
    <div className="space-y-6 responsive-container">
      {/* Security Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 responsive-container">
          Security Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container">
          <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container">
            <CheckCircle className="h-6 w-6 text-green-600 responsive-container" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100 responsive-container">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 responsive-container">Enabled</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
            <Shield className="h-6 w-6 text-blue-600 responsive-container" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100 responsive-container">Password Strength</p>
              <p className="text-sm text-blue-700 dark:text-blue-300 responsive-container">Strong</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg responsive-container">
            <Key className="h-6 w-6 text-purple-600 responsive-container" />
            <div>
              <p className="font-medium text-purple-900 dark:text-purple-100 responsive-container">API Keys</p>
              <p className="text-sm text-purple-700 dark:text-purple-300 responsive-container">3 Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center responsive-container">
          <Key className="h-5 w-5 mr-2 text-blue-600 responsive-container" />
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4 responsive-container">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Current Password
            </label>
            <div className="relative responsive-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={e => handlePasswordInputChange('currentPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
            aria-label="Button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center responsive-container"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400 responsive-container" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400 responsive-container" />
                )}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={e => handlePasswordInputChange('newPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Confirm Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={e => handlePasswordInputChange('confirmPassword', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
                placeholder="Confirm new password"
                required
                minLength={8}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 responsive-container">
            <button
              type="button"
              onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' }
            aria-label="Button")
              }
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors responsive-container"
            >
              Clear
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
             aria-label="Button">
              <Key className="h-4 w-4 responsive-container" />
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Security Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 responsive-container">
          Security Actions
        </h3>
        <div className="space-y-4 responsive-container">
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
            <div className="flex items-center space-x-3 responsive-container">
              <Shield className="h-5 w-5 text-green-600 responsive-container" />
              <div className="text-left responsive-container">
                <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">Manage 2FA settings</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 responsive-container" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
            <div className="flex items-center space-x-3 responsive-container">
              <Key className="h-5 w-5 text-purple-600 responsive-container" />
              <div className="text-left responsive-container">
                <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container">API Keys</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">Manage API access keys</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 responsive-container" />
          </button>
          <button className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
            <div className="flex items-center space-x-3 responsive-container">
              <Download className="h-5 w-5 text-orange-600 responsive-container" />
              <div className="text-left responsive-container">
                <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container">Export Security Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                  Download security logs and data
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 responsive-container" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6 responsive-container">
      {/* Personal Information Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between mb-6 responsive-container">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center responsive-container">
            <User className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
            Personal Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            aria-label="Button"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md responsive-container"
          >
            <Edit className="h-4 w-4 responsive-container" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
        
        <form onSubmit={handleProfileUpdate} className="space-y-6 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={e => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.fullName}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Job Title
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.jobTitle}
                  onChange={e => handleInputChange('jobTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.jobTitle}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.email}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.phone}
                </p>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 responsive-container">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
            aria-label="Button"
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium responsive-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md font-medium responsive-container"
               aria-label="Button">
                <Save className="h-4 w-4 responsive-container" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderCompanyInfo = () => (
    <div className="space-y-6 responsive-container">
      {/* Company Information Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between mb-6 responsive-container">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center responsive-container">
            <Building className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
            Company Information
          </h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            aria-label="Button"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md responsive-container"
          >
            <Edit className="h-4 w-4 responsive-container" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
        
        <form onSubmit={handleProfileUpdate} className="space-y-6 responsive-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Company Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.company}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Industry
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.industry}
                  onChange={e => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.industry}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.website}
                  onChange={e => handleInputChange('website', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <a
                  href={profileData.website}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-3 block responsive-container"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.website.replace('https://', '')}
                </a>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Support Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.supportEmail}
                  onChange={e => handleInputChange('supportEmail', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.supportEmail}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Founded
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.founded}
                  onChange={e => handleInputChange('founded', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all responsive-container"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 font-medium py-3 responsive-container">
                  {profileData.founded}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 responsive-container">
                Status
              </label>
              <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 responsive-container">
                Active
              </span>
            </div>
          </div>
          
          {isEditing && (
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700 responsive-container">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
            aria-label="Button"
                className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium responsive-container"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-md font-medium responsive-container"
               aria-label="Button">
                <Save className="h-4 w-4 responsive-container" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6 responsive-container">
      {/* Header with Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 responsive-container">
          <div className="flex items-center space-x-4 responsive-container">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center responsive-container">
              <Settings className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
              Settings Management
            </h3>
            <div className="flex items-center space-x-2 responsive-container">
              <div
                className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                {isRealTime ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 responsive-container">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
            aria-label="Button"
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container"
            >
              {isRealTime ? <Pause className="h-4 w-4 responsive-container" /> : <Play className="h-4 w-4 responsive-container" />}
              <span>{isRealTime ? 'Pause' : 'Resume'}</span>
            </button>
            
            <label className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer responsive-container">
              <Upload className="h-4 w-4 responsive-container" />
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={e => e.target.files?.[0] && handleImportSettings(e.target.files[0])}
                className="hidden responsive-container"
              />
            </label>
            
            <button
              onClick={handleExportSettings}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
             aria-label="Button">
              <Download className="h-4 w-4 responsive-container" />
              <span>Export</span>
            </button>
            
            <button
              onClick={() => console.log('Add setting modal')}
            aria-label="Button"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium responsive-container"
            >
              <Plus className="h-4 w-4 responsive-container" />
              <span>Add Setting</span>
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 responsive-container">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 responsive-container">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Search
            </label>
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search settings..."
                value={settingsSearchTerm}
                onChange={e => setSettingsSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Category
            </label>
            <select
              value={settingsCategoryFilter}
              onChange={e => setSettingsCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Type
            </label>
            <select
              value={settingsTypeFilter}
              onChange={e => setSettingsTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
            >
              <option value="All">All Types</option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="select">Select</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container">
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
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-lg border border-blue-200 dark:border-blue-800 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center space-x-3 responsive-container">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100 responsive-container">
                {selectedSettings.length} setting{selectedSettings.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2 responsive-container">
              <button
                onClick={handleBulkResetSettings}
                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors responsive-container"
               aria-label="Button">
                Reset to Default
              </button>
              <button
                onClick={handleBulkDeleteSettings}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors responsive-container"
               aria-label="Button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden responsive-container">
        <div className="overflow-x-auto responsive-container">
          <table className="w-full responsive-container">
            <thead className="bg-gray-50 dark:bg-gray-700 responsive-container">
              <tr>
                <th className="px-6 py-3 text-left responsive-container">
                  <input
                    type="checkbox"
                    checked={
                      selectedSettings.length === filteredSettings.length &&
                      filteredSettings.length > 0
                    }
                    onChange={handleSelectAllSettings}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSortSettings('category')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Category</span>
                    {settingsSortField === 'category' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSortSettings('key')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Key</span>
                    {settingsSortField === 'key' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSortSettings('value')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Value</span>
                    {settingsSortField === 'value' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSortSettings('type')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Type</span>
                    {settingsSortField === 'type' && (
                      <span>{settingsSortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Last Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 responsive-container">
              {paginatedSettings.map(setting => (
                <tr
                  key={setting.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container"
                >
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <input
                      type="checkbox"
                      checked={selectedSettings.includes(setting.id)}
                      onChange={() => handleSelectSetting(setting.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
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
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
                      <code className="text-sm font-mono text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded responsive-container">
                        {setting.key}
                      </code>
                      {setting.isRequired && <span className="text-red-500 text-xs responsive-container">*</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
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
                        <span className="text-sm text-gray-900 dark:text-gray-100 font-mono responsive-container">
                          {setting.value}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 responsive-container">
                      {setting.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 responsive-container">
                    <p className="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate responsive-container">
                      {setting.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 responsive-container">
                    {setting.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
                      <button
                        onClick={() => {
                          setSelectedSetting(setting);
                          console.log('View setting modal');
                        }
            aria-label="Button"}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                        title="View Setting"
                      >
                        <Eye className="h-4 w-4 responsive-container" />
                      </button>
                      {setting.isEditable && (
                        <button
                          onClick={() => {
                            setSelectedSetting(setting);
                            console.log('Edit setting modal');
                          }
            aria-label="Button"}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 responsive-container"
                          title="Edit Setting"
                        >
                          <Edit className="h-4 w-4 responsive-container" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedSetting(setting);
                          console.log('Delete setting modal');
                        }
            aria-label="Button"}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 responsive-container"
                        title="Delete Setting"
                      >
                        <Trash2 className="h-4 w-4 responsive-container" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 responsive-container">
          <div className="flex-1 flex justify-between sm:hidden responsive-container">
            <button
              onClick={() => setSettingsCurrentPage(prev => Math.max(prev - 1, 1))}
            aria-label="Button"
              disabled={settingsCurrentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
            >
              Previous
            </button>
            <button
              onClick={() => setSettingsCurrentPage(prev => Math.min(prev + 1, settingsTotalPages))}
            aria-label="Button"
              disabled={settingsCurrentPage === settingsTotalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between responsive-container">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 responsive-container">
                Showing <span className="font-medium responsive-container">{settingsStartIndex + 1}</span> to{' '}
                <span className="font-medium responsive-container">
                  {Math.min(settingsEndIndex, filteredSettings.length)}
                </span>{' '}
                of <span className="font-medium responsive-container">{filteredSettings.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-4 responsive-container">
              <div className="flex items-center space-x-2 responsive-container">
                <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container">Show:</span>
                <select
                  value={settingsItemsPerPage}
                  onChange={e => setSettingsItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-1 responsive-container">
                {Array.from({ length: settingsTotalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setSettingsCurrentPage(page)}
            aria-label="Button"
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
    <div className="space-y-6 responsive-container">
      {/* Current Plan */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg border border-blue-200 dark:border-blue-800 responsive-container">
        <div className="flex items-center justify-between mb-6 responsive-container">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">Enterprise Plan</h3>
            <p className="text-gray-600 dark:text-gray-400 responsive-container">Full access to all features</p>
          </div>
          <div className="text-right responsive-container">
            <div className="text-3xl font-bold text-blue-600 responsive-container">$299</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">per month</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 responsive-container">
          <div className="flex items-center space-x-2 responsive-container">
            <CheckCircle className="h-5 w-5 text-green-600 responsive-container" />
            <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container">Unlimited Users</span>
          </div>
          <div className="flex items-center space-x-2 responsive-container">
            <CheckCircle className="h-5 w-5 text-green-600 responsive-container" />
            <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container">24/7 Support</span>
          </div>
          <div className="flex items-center space-x-2 responsive-container">
            <CheckCircle className="h-5 w-5 text-green-600 responsive-container" />
            <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container">Advanced Analytics</span>
          </div>
        </div>
        
        <button className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium responsive-container" aria-label="Button">
          Manage Subscription
        </button>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex items-center justify-between mb-6 responsive-container">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center responsive-container">
            <CreditCard className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
            Payment Methods
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
            <Plus className="h-4 w-4 responsive-container" />
            <span>Add Payment Method</span>
          </button>
        </div>
        
        <div className="space-y-4 responsive-container">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl responsive-container">
            <div className="flex items-center space-x-4 responsive-container">
              <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center responsive-container">
                <CreditCard className="h-5 w-5 text-white responsive-container" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  •••• •••• •••• 4242
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Expires 12/25</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 responsive-container">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full responsive-container">
                Default
              </span>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container" aria-label="Button">
                <MoreVertical className="h-4 w-4 responsive-container" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center responsive-container">
          <FileText className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
          Billing History
        </h3>
        
        <div className="overflow-x-auto responsive-container">
          <table className="w-full responsive-container">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600 responsive-container">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700 responsive-container">
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100 responsive-container">Jan 15, 2024</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100 responsive-container">
                  Enterprise Plan - Monthly
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100 responsive-container">$299.00</td>
                <td className="py-3 px-4 responsive-container">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full responsive-container">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 responsive-container">
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium responsive-container" aria-label="Button">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-700 responsive-container">
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100 responsive-container">Dec 15, 2023</td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100 responsive-container">
                  Enterprise Plan - Monthly
                </td>
                <td className="py-3 px-4 text-gray-900 dark:text-gray-100 responsive-container">$299.00</td>
                <td className="py-3 px-4 responsive-container">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full responsive-container">
                    Paid
                  </span>
                </td>
                <td className="py-3 px-4 responsive-container">
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium responsive-container" aria-label="Button">
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
    <div className="space-y-6 responsive-container">
      {/* Header with Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 responsive-container">
          <div className="flex items-center space-x-4 responsive-container">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center responsive-container">
              <Users className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
              User Management
            </h3>
            <div className="flex items-center space-x-2 responsive-container">
              <div
                className={`w-2 h-2 rounded-full ${isRealTime ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                {isRealTime ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 responsive-container">
            <button
              onClick={() => setIsRealTime(!isRealTime)}
            aria-label="Button"
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container"
            >
              {isRealTime ? <Pause className="h-4 w-4 responsive-container" /> : <Play className="h-4 w-4 responsive-container" />}
              <span>{isRealTime ? 'Pause' : 'Resume'}</span>
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
             aria-label="Button">
              <Download className="h-4 w-4 responsive-container" />
              <span>Export</span>
            </button>
            
            <button
              onClick={() => console.log('Add user modal')}
            aria-label="Button"
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium responsive-container"
            >
              <Plus className="h-4 w-4 responsive-container" />
              <span>Add User</span>
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 responsive-container">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 responsive-container">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Search
            </label>
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Idle">Idle</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
            >
              <option value="All">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container">
              Device
            </label>
            <select
              value={deviceFilter}
              onChange={e => setDeviceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container"
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
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 shadow-lg border border-blue-200 dark:border-blue-800 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center space-x-3 responsive-container">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100 responsive-container">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2 responsive-container">
              <button
                onClick={handleBulkActivate}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
               aria-label="Button">
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors responsive-container"
               aria-label="Button">
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors responsive-container"
               aria-label="Button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden responsive-container">
        <div className="overflow-x-auto responsive-container">
          <table className="w-full responsive-container">
            <thead className="bg-gray-50 dark:bg-gray-700 responsive-container">
              <tr>
                <th className="px-6 py-3 text-left responsive-container">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === filteredUsers.length && filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                  />
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Name</span>
                    {sortField === 'name' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Email</span>
                    {sortField === 'email' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Role</span>
                    {sortField === 'role' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Status</span>
                    {sortField === 'status' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('device')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Device</span>
                    {sortField === 'device' && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 responsive-container">
              {paginatedUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container"
                >
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <div className="flex items-center responsive-container">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold responsive-container">
                        {user.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </div>
                      <div className="ml-4 responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                          {user.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 responsive-container">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 responsive-container">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
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
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
                      {user.device === 'Desktop' ? (
                        <Monitor className="h-4 w-4 text-blue-600 responsive-container" />
                      ) : user.device === 'Mobile' ? (
                        <Smartphone className="h-4 w-4 text-green-600 responsive-container" />
                      ) : (
                        <Tablet className="h-4 w-4 text-purple-600 responsive-container" />
                      )}
                      <span className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                        {user.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 responsive-container">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                    <div className="flex items-center space-x-2 responsive-container">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          console.log('View user modal');
                        }
            aria-label="Button"}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                        title="View User"
                      >
                        <Eye className="h-4 w-4 responsive-container" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          console.log('Edit user modal');
                        }
            aria-label="Button"}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 responsive-container"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4 responsive-container" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          console.log('Delete user modal');
                        }
            aria-label="Button"}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 responsive-container"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4 responsive-container" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 responsive-container">
          <div className="flex-1 flex justify-between sm:hidden responsive-container">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            aria-label="Button"
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            aria-label="Button"
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed responsive-container"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between responsive-container">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 responsive-container">
                Showing <span className="font-medium responsive-container">{startIndex + 1}</span> to{' '}
                <span className="font-medium responsive-container">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                <span className="font-medium responsive-container">{filteredUsers.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-4 responsive-container">
              <div className="flex items-center space-x-2 responsive-container">
                <span className="text-sm text-gray-700 dark:text-gray-300 responsive-container">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={e => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-1 responsive-container">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
            aria-label="Button"
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
    <div className="space-y-6 responsive-container">
      {/* Data Export */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center responsive-container">
          <Download className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
          Data Export
        </h3>
        
        <div className="space-y-4 responsive-container">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl responsive-container">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 responsive-container">
              Export Your Data
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 responsive-container">
              Download a copy of all your personal data including profile information, activity
              logs, and preferences.
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
              <Download className="h-4 w-4 responsive-container" />
              <span>Request Data Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 responsive-container">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center responsive-container">
          <Shield className="h-6 w-6 mr-3 text-blue-600 responsive-container" />
          Privacy Settings
        </h3>
        
        <div className="space-y-6 responsive-container">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl responsive-container">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 responsive-container">Profile Visibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                Allow others to see your profile information
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer responsive-container">
              <input type="checkbox" defaultChecked className="sr-only peer responsive-container" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 responsive-container"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl responsive-container">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 responsive-container">Activity Tracking</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                Track your activity for analytics and improvements
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer responsive-container">
              <input type="checkbox" defaultChecked className="sr-only peer responsive-container" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 responsive-container"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl responsive-container">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                Marketing Communications
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                Receive marketing emails and updates
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer responsive-container">
              <input type="checkbox" className="sr-only peer responsive-container" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 responsive-container"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Deletion */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-red-200 dark:border-red-800 responsive-container">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center responsive-container">
          <AlertTriangle className="h-6 w-6 mr-3 text-red-600 responsive-container" />
          Data Management
        </h3>
        
        <div className="space-y-4 responsive-container">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl responsive-container">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2 responsive-container">
              Clear Activity Data
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4 responsive-container">
              Permanently delete your activity logs and session history. This action cannot be
              undone.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors responsive-container" aria-label="Button">
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
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 responsive-container">
      <div className="max-w-7xl mx-auto responsive-container">
        {/* Header */}
        <div className="mb-8 responsive-container">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 responsive-container">
            Profile & Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 responsive-container">
            Manage your profile, security, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 responsive-container">
          {/* Profile Navigation */}
          <div className="lg:col-span-1 responsive-container">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 responsive-container">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 responsive-container">
                Profile
              </h2>
              <nav className="space-y-2 responsive-container">
                {profileTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
            aria-label="Button"
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3 responsive-container">
                      <tab.icon className="h-5 w-5 responsive-container" />
                      <span className="font-medium responsive-container">{tab.label}</span>
                    </div>
                    {tab.count && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full responsive-container">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Account Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 responsive-container">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 responsive-container">
                Account Actions
              </h3>
              <div className="space-y-3 responsive-container">
                <button
                  onClick={() => setShowSignOutModal(true)}
            aria-label="Button"
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 responsive-container"
                >
                  <LogOut className="h-5 w-5 responsive-container" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setActiveTab('security')}
            aria-label="Button"
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 responsive-container"
                >
                  <Shield className="h-5 w-5 responsive-container" />
                  <span>Security Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
            aria-label="Button"
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600 responsive-container"
                >
                  <Settings className="h-5 w-5 responsive-container" />
                  <span>Preferences</span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-3 responsive-container">
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 responsive-container"
              >
                <div className="flex items-center space-x-3 mb-4 responsive-container">
                  <LogOut className="h-6 w-6 text-red-600 responsive-container" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                    Sign Out
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 responsive-container">
                  Are you sure you want to sign out? You'll need to log in again to access your
                  account.
                </p>
                <div className="flex items-center justify-end space-x-3 responsive-container">
                  <button
                    onClick={() => setShowSignOutModal(false)}
            aria-label="Button"
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors responsive-container"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors responsive-container"
                   aria-label="Button">
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
