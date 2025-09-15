import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Users,
  Plug,
  Key,
  CreditCard,
  FileText,
  Bell,
  Shield,
  Upload,
  Save,
  Edit,
  X,
  Settings as SettingsIcon,
  Plus,
  Download,
  CheckCircle,
  UserPlus,
  UserCheck,
  Crown,
  Shield as ShieldIcon,
  BarChart3,
  DollarSign,
  Ticket,
  Eye,
  Trash2,
  Search,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  // User,
  Monitor,
  Smartphone,
  Tablet,
  Check,
  Square,
  AlertTriangle,
  MessageCircle,
} from 'lucide-react';

interface CompanySettingsProps {
  onClose?: () => void;
}

interface CompanyTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

interface CompanyUser {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string;
  status: 'active' | 'idle' | 'inactive';
  device: 'desktop' | 'mobile' | 'tablet';
  location: string;
  ip: string;
  lastActive: string;
  avatar?: string;
}

interface NewUser {
  name: string;
  email: string;
  role: string;
  company: string;
  status: 'active' | 'idle' | 'inactive';
  device: 'desktop' | 'mobile' | 'tablet';
  location: string;
  ip: string;
}

const CompanySettings: React.FC<CompanySettingsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('company-profile');
  const [activeUserManagementTab, setActiveUserManagementTab] = useState('all-users');
  const [isEditing, setIsEditing] = useState(false);
  
  // Advanced All Users State Management
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [deviceFilter, setDeviceFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isRealTime, setIsRealTime] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const [companyInfo, setCompanyInfo] = useState({
    name: 'TransBot Logistics',
    logo: '',
    address: '123 Logistics Drive, Suite 100',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    email: 'info@transbotlogistics.com',
    website: 'https://transbotlogistics.com',
    taxId: '12-3456789',
    businessType: 'Carrier',
  });

  const [branding, setBranding] = useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    logoUrl: '',
    themePreference: 'light',
  });

  // User Management State
  const [users, setUsers] = useState<CompanyUser[]>([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@transbotai.com',
      role: 'Super Admin',
      company: 'TransBot AI',
      status: 'active',
      device: 'desktop',
      location: 'Chicago, IL',
      ip: '192.168.1.100',
      lastActive: '2 minutes ago',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@transbotai.com',
      role: 'Manager',
      company: 'TransBot AI',
      status: 'idle',
      device: 'mobile',
      location: 'New York, NY',
      ip: '192.168.1.101',
      lastActive: '15 minutes ago',
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@transbotai.com',
      role: 'Operator',
      company: 'TransBot AI',
      status: 'inactive',
      device: 'tablet',
      location: 'Los Angeles, CA',
      ip: '192.168.1.102',
      lastActive: '2 hours ago',
    },
  ]);

  // Modal States
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showViewUserModal, setShowViewUserModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<CompanyUser | null>(null);
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    email: '',
    role: '',
    company: '',
    status: 'active',
    device: 'desktop',
    location: '',
    ip: '',
  });

  // Auto-refresh functionality
  useEffect(() => {
    if (!isRealTime) return;
    
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // In a real app, you would fetch fresh data here
      console.log('Auto-refreshing user data...');
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [isRealTime]);

  const companyTabs: CompanyTab[] = [
    { id: 'company-profile', label: 'Company Profile', icon: Building },
    { id: 'user-management', label: 'User Management', icon: Users, count: 8 },
    { id: 'integrations', label: 'Integrations', icon: Plug, count: 8 },
    { id: 'api-keys', label: 'API Keys', icon: Key, count: 3 },
    { id: 'billing', label: 'Billing & Subscription', icon: CreditCard },
    { id: 'compliance', label: 'Compliance & Legal', icon: FileText, count: 12 },
    { id: 'notifications', label: 'Notifications', icon: Bell, count: 5 },
    { id: 'security', label: 'Security Settings', icon: Shield },
  ];

  // User Management Sub-tabs
  const userManagementTabs: CompanyTab[] = [
    { id: 'all-users', label: 'All Users', icon: Users, count: 15 },
    { id: 'user-roles', label: 'User Roles', icon: Crown, count: 5 },
    { id: 'user-groups', label: 'User Groups', icon: UserCheck, count: 8 },
    { id: 'access-control', label: 'Access Control', icon: ShieldIcon, count: 12 },
    { id: 'user-analytics', label: 'User Analytics', icon: BarChart3, count: 127 },
    { id: 'billing-management', label: 'Billing Management', icon: DollarSign, count: 15 },
    { id: 'support-tickets', label: 'Support Tickets', icon: Ticket, count: 23 },
    { id: 'user-onboarding', label: 'User Onboarding', icon: UserPlus, count: 7 },
  ];

  const handleSave = () => {
    // Save company settings logic here
    setIsEditing(false);
    console.log('Company settings saved');
  };

  const handleCancel = () => {
    setIsEditing(false);
    console.log('Changes cancelled');
  };

  // CRUD Handler Functions
  const handleAddUser = (userData: NewUser) => {
    const newUser: CompanyUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      company: userData.company,
      status: userData.status,
      device: userData.device,
      location: userData.location,
      ip: userData.ip,
      lastActive: new Date().toISOString(),
      avatar: userData.name
        .split(' ')
        .map(n => n[0])
        .join(''),
    };
    setUsers([...users, newUser]);
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: '',
      company: '',
      status: 'active',
      device: 'desktop',
      location: '',
      ip: '',
    });
    setLastUpdated(new Date());
  };

  const handleEditUser = (userData: NewUser) => {
    if (!selectedUser) return;
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, ...userData, lastActive: new Date().toISOString() }
        : user
    );
    setUsers(updatedUsers);
    setShowEditUserModal(false);
    setSelectedUser(null);
    setLastUpdated(new Date());
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowDeleteModal(false);
    setSelectedUser(null);
    setLastUpdated(new Date());
  };

  const handleViewUser = (user: CompanyUser) => {
    setSelectedUser(user);
    setShowViewUserModal(true);
  };

  const handleEditUserClick = (user: CompanyUser) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      status: user.status,
      device: user.device,
      location: user.location,
      ip: user.ip,
    });
    setShowEditUserModal(true);
  };

  const handleDeleteUserClick = (user: CompanyUser) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleBulkDelete = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
    setLastUpdated(new Date());
  };

  const handleBulkActivate = () => {
    const updatedUsers = users.map(user => 
      selectedUsers.includes(user.id) 
        ? { ...user, status: 'active' as const, lastActive: new Date().toISOString() }
        : user
    );
    setUsers(updatedUsers);
    setSelectedUsers([]);
    setLastUpdated(new Date());
  };

  const handleBulkDeactivate = () => {
    const updatedUsers = users.map(user => 
      selectedUsers.includes(user.id) 
        ? { ...user, status: 'inactive' as const, lastActive: new Date().toISOString() }
        : user
    );
    setUsers(updatedUsers);
    setSelectedUsers([]);
    setLastUpdated(new Date());
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    const filteredUserIds = filteredUsers.map(user => user.id);
    setSelectedUsers(selectedUsers.length === filteredUserIds.length ? [] : filteredUserIds);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredUsers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'users-export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Utility Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronUp className="h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Filtering and Sorting Logic
  const filteredUsers = users
    .filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDevice = deviceFilter === 'all' || user.device === deviceFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesDevice;
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof CompanyUser] || '';
      const bValue = b[sortField as keyof CompanyUser] || '';
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Building className="h-5 w-5 mr-2 text-blue-500" />
            Company Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={e => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Business Type
            </label>
            <select
              value={companyInfo.businessType}
              onChange={e => setCompanyInfo({ ...companyInfo, businessType: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
            >
              <option value="Carrier">Carrier</option>
              <option value="Broker">Broker</option>
              <option value="Shipper">Shipper</option>
              <option value="3PL">3PL</option>
              <option value="Freight Forwarder">Freight Forwarder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tax ID / EIN
            </label>
            <input
              type="text"
              value={companyInfo.taxId}
              onChange={e => setCompanyInfo({ ...companyInfo, taxId: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              value={companyInfo.website}
              onChange={e => setCompanyInfo({ ...companyInfo, website: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
            />
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={companyInfo.phone}
                onChange={e => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={e => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={companyInfo.address}
                onChange={e => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={companyInfo.city}
                onChange={e => setCompanyInfo({ ...companyInfo, city: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                State
              </label>
              <input
                type="text"
                value={companyInfo.state}
                onChange={e => setCompanyInfo({ ...companyInfo, state: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={companyInfo.zipCode}
                onChange={e => setCompanyInfo({ ...companyInfo, zipCode: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <input
                type="text"
                value={companyInfo.country}
                onChange={e => setCompanyInfo({ ...companyInfo, country: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Branding */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <SettingsIcon className="h-5 w-5 mr-2 text-purple-500" />
          Branding
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={branding.primaryColor}
                onChange={e => setBranding({ ...branding, primaryColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.primaryColor}
                onChange={e => setBranding({ ...branding, primaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={branding.secondaryColor}
                onChange={e => setBranding({ ...branding, secondaryColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.secondaryColor}
                onChange={e => setBranding({ ...branding, secondaryColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Accent Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={branding.accentColor}
                onChange={e => setBranding({ ...branding, accentColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={branding.accentColor}
                onChange={e => setBranding({ ...branding, accentColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme Preference
            </label>
            <select
              value={branding.themePreference}
              onChange={e => setBranding({ ...branding, themePreference: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Logo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              {branding.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt="Company Logo"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagementContent = () => {
    switch (activeUserManagementTab) {
      case 'all-users':
        return renderAllUsers();
      case 'user-roles':
        return renderUserRoles();
      case 'user-groups':
        return renderUserGroups();
      case 'access-control':
        return renderAccessControl();
      case 'user-analytics':
        return renderUserAnalytics();
      case 'billing-management':
        return renderBillingManagement();
      case 'support-tickets':
        return renderSupportTickets();
      case 'user-onboarding':
        return renderUserOnboarding();
      default:
        return renderAllUsers();
    }
  };

  const renderAllUsers = () => (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-500" />
            All Users
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({filteredUsers.length} users)
            </span>
          </h4>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all users in your organization with advanced controls
            </p>
          </div>
        
        <div className="flex items-center gap-3">
          {/* Real-time Toggle */}
          <button
            onClick={() => setIsRealTime(!isRealTime)}
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              isRealTime 
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {isRealTime ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
            {isRealTime ? 'Live' : 'Paused'}
            {isRealTime && (
              <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </button>
          
          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          
          {/* Add User Button */}
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>
        </div>
        
      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
                </div>
          
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="inactive">Inactive</option>
          </select>
          
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Manager">Manager</option>
            <option value="Operator">Operator</option>
            <option value="Customer">Customer</option>
          </select>
          
          {/* Device Filter */}
          <select
            value={deviceFilter}
            onChange={e => setDeviceFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Devices</option>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
          </select>
                </div>
              </div>

      {/* Bulk Actions Bar */}
      {selectedUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
                </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkActivate}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Advanced Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button onClick={handleSelectAll} className="flex items-center">
                    {selectedUsers.length === filteredUsers.length && filteredUsers.length > 0 ? (
                      <Check className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Square className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>User</span>
                    {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>Email</span>
                    {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>Role</span>
                    {getSortIcon('role')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>Status</span>
                    {getSortIcon('status')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('device')}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>Device</span>
                    {getSortIcon('device')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('lastActive')}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span>Last Active</span>
                    {getSortIcon('lastActive')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedUsers.map(user => {
                const DeviceIcon = getDeviceIcon(user.device);
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleSelectUser(user.id)}
                        className="flex items-center"
                      >
                        {selectedUsers.includes(user.id) ? (
                          <Check className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Square className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full">
                  {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <DeviceIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-900 dark:text-white capitalize">
                          {user.device}
                </span>
              </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {user.lastActive}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View user details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditUserClick(user)}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          title="Edit user"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUserClick(user)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
            </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
          <select
            value={itemsPerPage}
            onChange={e => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{' '}
            {filteredUsers.length} results
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );

  const renderUserRoles = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Roles</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage user roles and permissions
          </p>
        </div>
        <button 
          onClick={() => console.log('Add role')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Permissions</option>
          <option value="high">High Permissions</option>
          <option value="medium">Medium Permissions</option>
          <option value="low">Low Permissions</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedUsers.length} role(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Edit Permissions
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Delete Roles
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Roles Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 1,
                  name: 'Super Admin',
                  description: 'Full system access and control',
                  users: 2,
                  permissions: 'All',
                  status: 'active',
                },
                {
                  id: 2,
                  name: 'Manager',
                  description: 'Team management and oversight',
                  users: 5,
                  permissions: '15/20',
                  status: 'active',
                },
                {
                  id: 3,
                  name: 'Operator',
                  description: 'Standard operational access',
                  users: 12,
                  permissions: '8/20',
                  status: 'active',
                },
                {
                  id: 4,
                  name: 'Customer',
                  description: 'Limited customer access',
                  users: 25,
                  permissions: '3/20',
                  status: 'active',
                },
                {
                  id: 5,
                  name: 'Guest',
                  description: 'Read-only access',
                  users: 8,
                  permissions: '1/20',
                  status: 'inactive',
                },
              ].map(role => (
                <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {role.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{role.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {role.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {role.users} users
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                      role.permissions === 'All' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : role.permissions.includes('/') &&
                              parseInt(role.permissions.split('/')[0]) > 10
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}
                    >
                      {role.permissions}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                      role.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => console.log('View role:', role.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View role details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Edit role:', role.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Edit role"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Delete role:', role.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete role"
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
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
              <select className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserGroups = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Groups</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Organize users into groups for easier management
          </p>
        </div>
        <button 
          onClick={() => console.log('Add group')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Group</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Groups</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedUsers.length} group(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Edit Groups
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Delete Groups
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Groups Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Group Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Members
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 1,
                  name: 'Development Team',
                  description: 'Software development team',
                  members: 8,
                  created: '2024-01-15',
                  status: 'active',
                },
                {
                  id: 2,
                  name: 'Sales Team',
                  description: 'Sales and marketing team',
                  members: 5,
                  created: '2024-01-10',
                  status: 'active',
                },
                {
                  id: 3,
                  name: 'Support Team',
                  description: 'Customer support team',
                  members: 3,
                  created: '2024-01-08',
                  status: 'active',
                },
                {
                  id: 4,
                  name: 'Management',
                  description: 'Executive and management team',
                  members: 4,
                  created: '2024-01-05',
                  status: 'active',
                },
                {
                  id: 5,
                  name: 'QA Team',
                  description: 'Quality assurance team',
                  members: 6,
                  created: '2024-01-12',
                  status: 'inactive',
                },
              ].map(group => (
                <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {group.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {group.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {group.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {group.members} members
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {group.created}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                      group.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {group.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => console.log('View group:', group.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View group details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Edit group:', group.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Edit group"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Delete group:', group.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete group"
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
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
              <select className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessControl = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Access Control</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage role-based access control and permissions
          </p>
        </div>
        <button 
          onClick={() => console.log('Add permission')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Permission</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Modules</option>
          <option value="user-management">User Management</option>
          <option value="billing">Billing</option>
          <option value="analytics">Analytics</option>
          <option value="settings">Settings</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedUsers.length} permission(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Edit Permissions
              </button>
              <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Remove Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Access Control Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned Roles
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 1,
                  module: 'User Management',
                  permissions: ['Create', 'Read', 'Update', 'Delete'],
                  roles: ['Super Admin', 'Manager'],
                  status: 'active',
                },
                {
                  id: 2,
                  module: 'Billing',
                  permissions: ['Read', 'Update'],
                  roles: ['Super Admin', 'Manager'],
                  status: 'active',
                },
                {
                  id: 3,
                  module: 'Analytics',
                  permissions: ['Read'],
                  roles: ['Super Admin', 'Manager', 'Operator'],
                  status: 'active',
                },
                {
                  id: 4,
                  module: 'Settings',
                  permissions: ['Read', 'Update'],
                  roles: ['Super Admin'],
                  status: 'active',
                },
                {
                  id: 5,
                  module: 'Reports',
                  permissions: ['Read'],
                  roles: ['Super Admin', 'Manager'],
                  status: 'inactive',
                },
              ].map(item => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {item.module
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.module}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.permissions.map((permission, pIndex) => (
                        <span
                          key={pIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.roles.map((role, rIndex) => (
                        <span
                          key={rIndex}
                          className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => console.log('View access:', item.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View access details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Edit access:', item.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Edit access"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Delete access:', item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete access"
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
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
              <select className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Analytics</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track user activity and system usage
          </p>
        </div>
        <button 
          onClick={() => console.log('Export analytics')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Export Data</span>
        </button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Active Users', value: '127', change: '+12%', color: 'text-green-600' },
          { title: 'New Signups', value: '23', change: '+8%', color: 'text-blue-600' },
          { title: 'Page Views', value: '1,234', change: '+15%', color: 'text-purple-600' },
          { title: 'Session Time', value: '4.2m', change: '-2%', color: 'text-orange-600' },
        ].map((metric, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            placeholder="Search activities..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Actions</option>
          <option value="login">Login</option>
          <option value="profile">Profile Update</option>
          <option value="user-management">User Management</option>
          <option value="analytics">Analytics</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[
                {
                  id: 1,
                  user: 'John Smith',
                  action: 'Logged in',
                  module: 'Dashboard',
                  ip: '192.168.1.100',
                  device: 'Desktop',
                  time: '2 minutes ago',
                },
                {
                  id: 2,
                  user: 'Sarah Johnson',
                  action: 'Updated profile',
                  module: 'Profile',
                  ip: '192.168.1.101',
                  device: 'Mobile',
                  time: '5 minutes ago',
                },
                {
                  id: 3,
                  user: 'Mike Wilson',
                  action: 'Created user',
                  module: 'User Management',
                  ip: '192.168.1.102',
                  device: 'Desktop',
                  time: '10 minutes ago',
                },
                {
                  id: 4,
                  user: 'Lisa Brown',
                  action: 'Viewed analytics',
                  module: 'Analytics',
                  ip: '192.168.1.103',
                  device: 'Tablet',
                  time: '15 minutes ago',
                },
                {
                  id: 5,
                  user: 'David Lee',
                  action: 'Downloaded report',
                  module: 'Reports',
                  ip: '192.168.1.104',
                  device: 'Desktop',
                  time: '20 minutes ago',
                },
              ].map(activity => (
                <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {activity.user
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {activity.user}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {activity.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {activity.module}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {activity.ip}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {React.createElement(
                        getDeviceIcon(
                          activity.device.toLowerCase() as 'desktop' | 'mobile' | 'tablet'
                        ),
                        { className: 'h-4 w-4 text-gray-500' }
                      )}
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {activity.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {activity.time}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => console.log('View activity:', activity.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View activity details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => console.log('Export activity:', activity.id)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Export activity"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
              <select className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Previous
              </button>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</span>
              <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBillingManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-emerald-500" />
            Billing Management
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user billing, plans, and payments
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </button>
      </div>
      
      {/* Billing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Total Revenue', value: '$12,450', change: '+8%', color: 'text-green-600' },
          { title: 'Active Subscriptions', value: '45', change: '+3%', color: 'text-blue-600' },
          { title: 'Pending Payments', value: '$1,230', change: '-2%', color: 'text-orange-600' },
        ].map((metric, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`text-sm font-medium ${metric.color}`}>{metric.change}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Billing Plans */}
      <div className="space-y-4">
        <h5 className="font-medium text-gray-900 dark:text-white">Billing Plans</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              name: 'Basic',
              price: '$29',
              users: '5',
              features: ['Basic features', 'Email support'],
            },
            {
              name: 'Professional',
              price: '$79',
              users: '25',
              features: ['Advanced features', 'Priority support', 'Analytics'],
            },
            {
              name: 'Enterprise',
              price: '$199',
              users: 'Unlimited',
              features: ['All features', '24/7 support', 'Custom integrations'],
            },
          ].map((plan, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-center">
                <h6 className="font-medium text-gray-900 dark:text-white">{plan.name}</h6>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {plan.price}
                  <span className="text-sm text-gray-600 dark:text-gray-400">/month</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{plan.users} users</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSupportTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Ticket className="h-5 w-5 mr-2 text-pink-500" />
            Support Tickets
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage customer support tickets and inquiries
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </button>
      </div>
      
      {/* Ticket Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Open', value: '12', color: 'bg-red-500' },
          { title: 'In Progress', value: '8', color: 'bg-yellow-500' },
          { title: 'Resolved', value: '45', color: 'bg-green-500' },
          { title: 'Closed', value: '127', color: 'bg-gray-500' },
        ].map((stat, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Tickets */}
      <div className="space-y-4">
        <h5 className="font-medium text-gray-900 dark:text-white">Recent Tickets</h5>
        <div className="space-y-2">
          {[
            {
              id: '#1234',
              title: 'Login issues',
              user: 'John Smith',
              status: 'open',
              priority: 'high',
              time: '2 hours ago',
            },
            {
              id: '#1233',
              title: 'Feature request',
              user: 'Sarah Johnson',
              status: 'in_progress',
              priority: 'medium',
              time: '4 hours ago',
            },
            {
              id: '#1232',
              title: 'Billing question',
              user: 'Mike Wilson',
              status: 'resolved',
              priority: 'low',
              time: '1 day ago',
            },
            {
              id: '#1231',
              title: 'Account setup',
              user: 'Lisa Brown',
              status: 'closed',
              priority: 'medium',
              time: '2 days ago',
            },
          ].map((ticket, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {ticket.user
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {ticket.id} - {ticket.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.user}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'open'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      : ticket.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : ticket.status === 'resolved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                  }`}
                >
                  {ticket.status}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{ticket.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserOnboarding = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <UserPlus className="h-5 w-5 mr-2 text-cyan-500" />
            User Onboarding
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage new user onboarding process
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </button>
      </div>
      
      {/* Onboarding Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'In Progress', value: '7', color: 'bg-blue-500' },
          { title: 'Completed', value: '23', color: 'bg-green-500' },
          { title: 'Pending', value: '5', color: 'bg-gray-500' },
        ].map((stat, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Onboarding Steps */}
      <div className="space-y-4">
        <h5 className="font-medium text-gray-900 dark:text-white">Onboarding Steps</h5>
        <div className="space-y-3">
          {[
            { step: 'Account Setup', users: 35, completed: 30, progress: 86 },
            { step: 'Profile Completion', users: 30, completed: 25, progress: 83 },
            { step: 'Role Assignment', users: 25, completed: 20, progress: 80 },
            { step: 'Training Completion', users: 20, completed: 15, progress: 75 },
            { step: 'First Login', users: 15, completed: 15, progress: 100 },
          ].map((step, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-medium text-gray-900 dark:text-white">{step.step}</h6>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {step.completed}/{step.users} users
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-cyan-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${step.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {step.progress}% complete
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              User Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Comprehensive user management system with roles, groups, analytics, and more
            </p>
          </div>
        </div>

        {/* User Management Sub-navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {userManagementTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveUserManagementTab(tab.id)}
              className={`p-4 rounded-lg border transition-colors text-left ${
                activeUserManagementTab === tab.id
                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                  : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                  activeUserManagementTab === tab.id
                    ? 'bg-green-100 dark:bg-green-800'
                    : 'bg-gray-100 dark:bg-gray-600'
                  }`}
                >
                  <tab.icon
                    className={`h-5 w-5 ${
                    activeUserManagementTab === tab.id
                      ? 'text-green-600 dark:text-green-300'
                      : 'text-gray-600 dark:text-gray-300'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-medium text-sm ${
                    activeUserManagementTab === tab.id
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {tab.label}
                  </h4>
                  {tab.count && (
                    <p
                      className={`text-xs ${
                      activeUserManagementTab === tab.id
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {tab.count} items
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User Management Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUserManagementTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderUserManagementContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <Plug className="h-5 w-5 mr-2 text-orange-500" />
          Integrations
        </h3>

        {/* Real Integration Management - Created by MCP 301 Agents */}
        <div className="space-y-6">
          {/* MCP 301 Agents Live Activity Indicator */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    🤖 MCP 301 Agents Active
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    IntegrationBot, SecurityBot, FormBot, TableBot, UIBot, TestBot working...
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-purple-900 dark:text-purple-100">301</p>
                <p className="text-xs text-purple-600 dark:text-purple-400">Agents</p>
              </div>
            </div>
          </div>

          {/* Integration Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Connected</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">3</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Active</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">2</p>
                </div>
                <Play className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Errors</p>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">1</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Integration List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                Active Integrations
              </h4>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Integration</span>
              </button>
            </div>

            {/* Stripe Integration - Enhanced by MCP Agents */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg relative">
                    <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>Stripe Payment Gateway</span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                        🤖 Updated by IntegrationBot
                      </span>
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Payment processing integration • Last updated: 2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded-full flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Connected</span>
                  </span>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <SettingsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Slack Integration - Enhanced by MCP Agents */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg relative">
                    <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>Slack Notifications</span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full">
                        🔧 Enhanced by SecurityBot
                      </span>
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Team notification system • Security enhanced 5 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded-full flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Connected</span>
                  </span>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <SettingsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Google Analytics Integration - Being Fixed by MCP Agents */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg relative">
                    <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>Google Analytics</span>
                      <span className="text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 px-2 py-1 rounded-full">
                        🔧 Fixing by TestBot
                      </span>
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Analytics data integration • TestBot working on fix...
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 text-xs rounded-full flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span>Fixing</span>
                  </span>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <SettingsIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* MCP 301 Agents Real-Time Activity Feed */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>🤖 MCP 301 Agents Live Activity</span>
            </h4>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              <div className="flex items-center space-x-3 p-2 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">IntegrationBot #23</span> updated Stripe Payment
                    Gateway configuration
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">SecurityBot #67</span> enhanced Slack integration
                    security
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">TestBot #287</span> diagnosing Google Analytics
                    connection issue
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">8 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">UIBot #234</span> improved integration card
                    animations
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-2 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">FormBot #156</span> optimized integration form
                    validation
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">15 minutes ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Actions */}
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add New Integration</span>
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Config</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiKeys = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <Key className="h-5 w-5 mr-2 text-yellow-500" />
          API Keys Management
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          API Keys management functionality will be implemented here.
        </p>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <CreditCard className="h-5 w-5 mr-2 text-indigo-500" />
          Billing & Subscription
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Billing and subscription management functionality will be implemented here.
        </p>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <FileText className="h-5 w-5 mr-2 text-red-500" />
          Compliance & Legal
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Compliance and legal management functionality will be implemented here.
        </p>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <Bell className="h-5 w-5 mr-2 text-blue-500" />
          Notifications & Preferences
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Notification settings functionality will be implemented here.
        </p>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-6">
          <Shield className="h-5 w-5 mr-2 text-red-500" />
          Security Settings
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Security settings functionality will be implemented here.
        </p>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'company-profile':
        return renderCompanyProfile();
      case 'user-management':
        return renderUserManagement();
      case 'integrations':
        return renderIntegrations();
      case 'api-keys':
        return renderApiKeys();
      case 'billing':
        return renderBilling();
      case 'compliance':
        return renderCompliance();
      case 'notifications':
        return renderNotifications();
      case 'security':
        return renderSecurity();
      default:
        return renderCompanyProfile();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                <Building className="h-8 w-8 mr-3 text-blue-500" />
                Company Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your company's configuration and preferences
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Company Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Settings
              </h2>
              <nav className="space-y-2">
                {companyTabs.map(tab => (
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

            {/* Quick Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                >
                  <Edit className="h-5 w-5" />
                  <span>{isEditing ? 'Cancel Editing' : 'Edit Settings'}</span>
                </button>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center space-x-3 p-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Company Settings Content */}
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
      </div>

      {/* Modals */}
      {showAddUserModal && (
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
          onSave={userData => handleAddUser(userData)}
        user={newUser}
        setUser={setNewUser}
      />
      )}

      {/* View User Modal */}
      <AnimatePresence>
        {showViewUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full mx-4 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Details
                </h3>
                <button
                  onClick={() => setShowViewUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* User Profile */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                    {selectedUser.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedUser.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedUser.status)}`}
                      >
                        {selectedUser.status}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full">
                        {selectedUser.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedUser.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Device
                    </label>
                    <div className="flex items-center space-x-2">
                      {React.createElement(getDeviceIcon(selectedUser.device), {
                        className: 'h-4 w-4 text-gray-500',
                      })}
                      <span className="text-gray-900 dark:text-white capitalize">
                        {selectedUser.device}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedUser.location || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      IP Address
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {selectedUser.ip || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Active
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedUser.lastActive}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowViewUserModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowViewUserModal(false);
                      setShowEditUserModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Edit User
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {showEditUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit User</h3>
                <button
                  onClick={() => setShowEditUserModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form
                onSubmit={e => {
                e.preventDefault();
                handleEditUser(newUser);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Operator">Operator</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newUser.company}
                    onChange={e => setNewUser({ ...newUser, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={newUser.status}
                    onChange={e =>
                      setNewUser({
                        ...newUser,
                        status: e.target.value as 'active' | 'idle' | 'inactive',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="idle">Idle</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Device
                  </label>
                  <select
                    value={newUser.device}
                    onChange={e =>
                      setNewUser({
                        ...newUser,
                        device: e.target.value as 'desktop' | 'mobile' | 'tablet',
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newUser.location}
                    onChange={e => setNewUser({ ...newUser, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={newUser.ip}
                    onChange={e => setNewUser({ ...newUser, ip: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter IP address"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditUserModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete User Modal */}
      <AnimatePresence>
        {showDeleteModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete User</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Confirm Deletion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete <strong>{selectedUser.name}</strong>? This will
                    permanently remove the user and all associated data.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Components
const AddUserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: NewUser) => void;
  user: NewUser;
  setUser: React.Dispatch<React.SetStateAction<NewUser>>;
}> = ({ isOpen, onClose, onSave, user, setUser }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={user.name}
              onChange={e => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              value={user.role}
              onChange={e => setUser({ ...user, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={user.status}
              onChange={e =>
                setUser({ ...user, status: e.target.value as 'active' | 'idle' | 'inactive' })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="idle">Idle</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Device
            </label>
            <select
              value={user.device}
              onChange={e =>
                setUser({ ...user, device: e.target.value as 'desktop' | 'mobile' | 'tablet' })
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={user.location}
              onChange={e => setUser({ ...user, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter location"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              IP Address
            </label>
            <input
              type="text"
              value={user.ip}
              onChange={e => setUser({ ...user, ip: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Enter IP address"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(user)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanySettings;
