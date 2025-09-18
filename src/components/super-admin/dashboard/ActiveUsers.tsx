import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  User,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Shield,
  Activity,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Eye,
  UserCheck,
  UserX,
  RefreshCw,
  Edit,
  Trash2,
  Plus,
  X,
  AlertTriangle,
  Download,
  Mail,
  FileText,
  Lock,
  Pause,
  Play,
} from 'lucide-react';

interface ActiveUser {
  id: number;
  name: string;
  email: string;
  role: string;
  company: string;
  status: 'active' | 'idle' | 'inactive';
  lastActive: string;
  location: string;
  device: string;
  ipAddress: string;
  sessionDuration: string;
  actions: number;
  avatar?: string;
}

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockActiveUsers = [
  {
    id: 1,
    name: 'DEMO Admin User',
    email: 'admin@demo.com',
    role: 'Super Admin',
    company: 'DEMO Company A',
    status: 'active' as 'active' | 'idle' | 'inactive',
    lastActive: '2024-01-15T10:30:00Z',
    location: 'New York, NY',
    device: 'Desktop',
    ipAddress: '192.168.1.100',
    sessionDuration: '2h 15m',
    actions: 45,
  },
  {
    id: 2,
    name: 'DEMO Manager User',
    email: 'manager@demo.com',
    role: 'Manager',
    company: 'DEMO Company B',
    status: 'active' as 'active' | 'idle' | 'inactive',
    lastActive: '2024-01-15T10:25:00Z',
    location: 'Los Angeles, CA',
    device: 'Mobile',
    ipAddress: '192.168.1.101',
    sessionDuration: '1h 30m',
    actions: 32,
  },
  {
    id: 3,
    name: 'DEMO Operator User',
    email: 'operator@demo.com',
    role: 'Operator',
    company: 'DEMO Company C',
    status: 'idle' as 'active' | 'idle' | 'inactive',
    lastActive: '2024-01-15T10:20:00Z',
    location: 'Chicago, IL',
    device: 'Tablet',
    ipAddress: '192.168.1.102',
    sessionDuration: '45m',
    actions: 18,
  },
  {
    id: 4,
    name: 'DEMO Customer User',
    email: 'customer@demo.com',
    role: 'Customer',
    company: 'DEMO Company D',
    status: 'active' as 'active' | 'idle' | 'inactive',
    lastActive: '2024-01-15T10:15:00Z',
    location: 'Miami, FL',
    device: 'Desktop',
    ipAddress: '192.168.1.103',
    sessionDuration: '3h 20m',
    actions: 67,
  },
];

const ActiveUsers: React.FC = () => {
  const [users, setUsers] = useState(mockActiveUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<ActiveUser | null>(null);
  const [viewingUser, setViewingUser] = useState<ActiveUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<ActiveUser | null>(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    company: '',
    status: 'active' as 'active' | 'idle' | 'inactive',
    device: 'Desktop',
    location: '',
    ipAddress: '',
  });

  // Real-time data simulation
  const updateUserData = useCallback(() => {
    setUsers(prevUsers => 
      prevUsers.map(user => ({
        ...user,
        lastActive: new Date().toISOString(),
        sessionDuration: `${Math.floor(Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
        actions: user.actions + Math.floor(Math.random() * 5),
      }))
    );
    setLastUpdated(new Date());
  }, []);

  useEffect(() => {
    if (isRealTimeEnabled) {
      const interval = setInterval(updateUserData, 10000); // Update every 10 seconds
      return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval);
    }
  }, [isRealTimeEnabled, updateUserData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (_event: MouseEvent) => {
      if (openDropdown !== null) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleRefresh = () => {
    setIsLoading(true);
    updateUserData();
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleAddUser = () => {
    setFormData({
      name: '',
      email: '',
      role: 'User',
      company: '',
      status: 'active' as 'active' | 'idle' | 'inactive',
      device: 'Desktop',
      location: '',
      ipAddress: '',
    });
    setShowAddModal(true);
  };

  const handleEditUser = (user: ActiveUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      status: user.status,
      device: user.device,
      location: user.location,
      ipAddress: user.ipAddress,
    });
    setShowEditModal(true);
  };

  const handleViewUser = (user: ActiveUser) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  const handleDeleteUser = (user: ActiveUser) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Edit existing user
      setUsers(prev =>
        prev.map(user => (user.id === editingUser.id ? { ...user, ...formData } : user))
      );
      setShowEditModal(false);
      setEditingUser(null);
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        lastActive: new Date().toISOString(),
        sessionDuration: '0m',
        actions: 0,
      };
      setUsers(prev => [newUser, ...prev]);
      setShowAddModal(false);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingUser) {
    setUsers(prev => prev.filter(user => user.id !== deletingUser.id));
    setShowDeleteModal(false);
    setDeletingUser(null);
    }
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'activate':
        setUsers(prev =>
          prev.map(user => (selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user))
        );
        break;
      case 'deactivate':
        setUsers(prev =>
          prev.map(user =>
            selectedUsers.includes(user.id) ? { ...user, status: 'inactive' } : user
          )
        );
        break;
      case 'delete':
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
        break;
    }
    setSelectedUsers([]);
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
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
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `active-users-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDropdownToggle = (userId: number) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleDropdownAction = (action: string, user: ActiveUser) => {
    setOpenDropdown(null);
    switch (action) {
      case 'view':
        handleViewUser(user);
        break;
      case 'edit':
        handleEditUser(user);
        break;
      case 'delete':
        handleDeleteUser(user);
        break;
      case 'activate': {
        setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, status: 'active' } : u)));
        break;
      }
      case 'deactivate': {
        setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, status: 'inactive' } : u)));
        break;
      }
      case 'suspend': {
        setUsers(prev => prev.map(u => (u.id === user.id ? { ...u, status: 'idle' } : u)));
        break;
      }
      case 'send_email':
        // Simulate sending email
        alert(`Email sent to ${user.email}`);
        break;
      case 'reset_password':
        // Simulate password reset
        alert(`Password reset email sent to ${user.email}`);
        break;
      case 'export_user': {
        const userData = JSON.stringify(user, null, 2);
        const userBlob = new Blob([userData], { type: 'application/json' });
        const userUrl = URL.createObjectURL(userBlob);
        const userLink = document.createElement('a');
        userLink.href = userUrl;
        userLink.download = `user-${user.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
        userLink.click();
        URL.revokeObjectURL(userUrl);
        break;
      }
      case 'audit_log':
        alert(`Audit log for ${user.name} would be displayed here`);
        break;
      case 'permissions':
        alert(`Permission management for ${user.name} would be displayed here`);
        break;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesDevice = deviceFilter === 'all' || user.device === deviceFilter;
    return matchesSearch && matchesStatus && matchesRole && matchesDevice;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Desktop':
        return <Monitor className="h-4 w-4 responsive-container" />;
      case 'Mobile':
        return <Smartphone className="h-4 w-4 responsive-container" />;
      case 'Tablet':
        return <Tablet className="h-4 w-4 responsive-container" />;
      default:
        return <Globe className="h-4 w-4 responsive-container" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const activeUsersCount = users.filter(user => user.status === 'active').length;
  const totalUsersCount = users.length;

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container">
        <div>
          <div className="flex items-center space-x-3 responsive-container">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">Active Users</h1>
            <div className="flex items-center space-x-2 responsive-container">
              <div
                className={`w-2 h-2 rounded-full ${isRealTimeEnabled ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}
              ></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                {isRealTimeEnabled ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 responsive-container">
            Monitor user sessions and activity in real-time
            {lastUpdated && (
              <span className="ml-2 text-xs text-gray-500 responsive-container">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-2 responsive-container">
          <button
            onClick={() => setIsRealTimeEnabled(!isRealTimeEnabled)}
            aria-label="Button"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isRealTimeEnabled
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {isRealTimeEnabled ? <Pause className="h-4 w-4 responsive-container" /> : <Play className="h-4 w-4 responsive-container" />}
            <span>{isRealTimeEnabled ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container"
           aria-label="Button">
            <Download className="h-4 w-4 responsive-container" />
            <span>Export</span>
          </button>
          <button
            onClick={handleAddUser}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
           aria-label="Button">
            <Plus className="h-4 w-4 responsive-container" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                {activeUsersCount}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
              <UserCheck className="h-6 w-6 text-green-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container" />
            <span className="text-sm text-green-600 responsive-container">+12%</span>
            <span className="text-sm text-gray-500 ml-2 responsive-container">from last hour</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                {totalUsersCount}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
              <Users className="h-6 w-6 text-blue-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <Activity className="h-4 w-4 text-blue-500 mr-1 responsive-container" />
            <span className="text-sm text-blue-600 responsive-container">Live monitoring</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                Avg Session Time
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">2h 15m</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container">
              <Clock className="h-6 w-6 text-purple-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container" />
            <span className="text-sm text-green-600 responsive-container">+8%</span>
            <span className="text-sm text-gray-500 ml-2 responsive-container">from yesterday</span>
          </div>
        </motion.div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex flex-col lg:flex-row gap-4 responsive-container">
          <div className="flex-1 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 responsive-container">
            <Filter className="h-4 w-4 text-gray-400 responsive-container" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="idle">Idle</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
            >
              <option value="all">All Roles</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="Operator">Operator</option>
              <option value="Customer">Customer</option>
            </select>
            <select
              value={deviceFilter}
              onChange={e => setDeviceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
            >
              <option value="all">All Devices</option>
              <option value="Desktop">Desktop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
            </select>
          </div>
        </div>
        
        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2 responsive-container">
                <button
                  onClick={() => handleBulkAction('activate')}
            aria-label="Button"
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors responsive-container"
                >
                  <UserCheck className="h-4 w-4 responsive-container" />
                  <span>Activate</span>
                </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
            aria-label="Button"
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/30 transition-colors responsive-container"
                >
                  <UserX className="h-4 w-4 responsive-container" />
                  <span>Deactivate</span>
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
            aria-label="Button"
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors responsive-container"
                >
                  <Trash2 className="h-4 w-4 responsive-container" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden responsive-container">
        <div className="overflow-x-auto responsive-container">
          <table className="w-full responsive-container">
            <thead className="bg-gray-50 dark:bg-gray-700/50 responsive-container">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0
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
                    <span>User</span>
                    {sortField === 'name' && (
                      <span className="text-blue-500 responsive-container">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <span className="text-blue-500 responsive-container">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Location
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('device')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Device</span>
                    {sortField === 'device' && (
                      <span className="text-blue-500 responsive-container">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Session
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  onClick={() => handleSort('actions')}
                >
                  <div className="flex items-center space-x-1 responsive-container">
                    <span>Actions</span>
                    {sortField === 'actions' && (
                      <span className="text-blue-500 responsive-container">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container">
              {paginatedUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container"
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
                      <div className="flex-shrink-0 h-10 w-10 responsive-container">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center responsive-container">
                          <User className="h-5 w-5 text-blue-600 responsive-container" />
                        </div>
                      </div>
                      <div className="ml-4 responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">{user.email}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 responsive-container">
                          {user.role} • {user.company}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <div className="flex items-center text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1 responsive-container" />
                      {user.location}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">{user.ipAddress}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container">
                    <div className="flex items-center text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {getDeviceIcon(user.device)}
                      <span className="ml-2 responsive-container">{user.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 responsive-container">
                    {user.sessionDuration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 responsive-container">
                    {user.actions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 responsive-container">
                    {formatTimeAgo(user.lastActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium responsive-container">
                    <div className="flex items-center justify-end space-x-2 responsive-container">
                      <button 
                        onClick={() => handleViewUser(user)}
            aria-label="Button"
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 responsive-container"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 responsive-container" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
            aria-label="Button"
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20 responsive-container"
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4 responsive-container" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
            aria-label="Button"
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 responsive-container"
                        title="Delete User"
                      >
                        <Trash2 className="h-4 w-4 responsive-container" />
                      </button>
                      <div className="relative responsive-container">
                        <button 
                          onClick={() => handleDropdownToggle(user.id)}
            aria-label="Button"
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700/50 responsive-container"
                          title="More Options"
                        >
                          <MoreVertical className="h-4 w-4 responsive-container" />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {openDropdown === user.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.15 }}
                              className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 responsive-container"
                            >
                              <div className="py-1 responsive-container">
                                <button
                                  onClick={() => handleDropdownAction('view', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <Eye className="h-4 w-4 responsive-container" />
                                  <span>View Details</span>
                                </button>
                                <button
                                  onClick={() => handleDropdownAction('edit', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <Edit className="h-4 w-4 responsive-container" />
                                  <span>Edit User</span>
                                </button>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1 responsive-container"></div>
                                
                                <button
                                  onClick={() => handleDropdownAction('activate', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center space-x-2 responsive-container"
                                >
                                  <UserCheck className="h-4 w-4 responsive-container" />
                                  <span>Activate User</span>
                                </button>
                                <button
                                  onClick={() => handleDropdownAction('deactivate', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center space-x-2 responsive-container"
                                >
                                  <UserX className="h-4 w-4 responsive-container" />
                                  <span>Deactivate User</span>
                                </button>
                                <button
                                  onClick={() => handleDropdownAction('suspend', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex items-center space-x-2 responsive-container"
                                >
                                  <Pause className="h-4 w-4 responsive-container" />
                                  <span>Suspend User</span>
                                </button>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1 responsive-container"></div>
                                
                                <button
                                  onClick={() => handleDropdownAction('send_email', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <Mail className="h-4 w-4 responsive-container" />
                                  <span>Send Email</span>
                                </button>
                                <button
                                  onClick={() => handleDropdownAction('reset_password', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <Lock className="h-4 w-4 responsive-container" />
                                  <span>Reset Password</span>
                                </button>
                                <button
                                  onClick={() => handleDropdownAction('permissions', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <Shield className="h-4 w-4 responsive-container" />
                                  <span>Manage Permissions</span>
                                </button>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1 responsive-container"></div>
                                
                                <button
                                  onClick={() => handleDropdownAction('export_user', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <Download className="h-4 w-4 responsive-container" />
                                  <span>Export User Data</span>
                                </button>
                                <button
                                  onClick={() => handleDropdownAction('audit_log', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 responsive-container"
                                >
                                  <FileText className="h-4 w-4 responsive-container" />
                                  <span>View Audit Log</span>
                                </button>
                                
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1 responsive-container"></div>
                                
                                <button
                                  onClick={() => handleDropdownAction('delete', user)}
            aria-label="Button"
                                  className="w-full px-4 py-2 text-left text-sm text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2 responsive-container"
                                >
                                  <Trash2 className="h-4 w-4 responsive-container" />
                                  <span>Delete User</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 responsive-container">
          <div className="flex-1 flex justify-between sm:hidden responsive-container">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            aria-label="Button"
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 responsive-container"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            aria-label="Button"
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 responsive-container"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between responsive-container">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 responsive-container">
                Showing <span className="font-medium responsive-container">{(currentPage - 1) * itemsPerPage + 1}</span>{' '}
                to{' '}
                <span className="font-medium responsive-container">
                  {Math.min(currentPage * itemsPerPage, sortedUsers.length)}
                </span>{' '}
                of <span className="font-medium responsive-container">{sortedUsers.length}</span> results
              </p>
            </div>
            <div className="flex items-center space-x-2 responsive-container">
              <select
                value={itemsPerPage}
                onChange={e => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
              <div className="flex space-x-1 responsive-container">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
            aria-label="Button"
                    className={`px-3 py-1 text-sm rounded ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
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

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
              setEditingUser(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 responsive-container"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingUser(null);
                  }
            aria-label="Button"}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container"
                >
                  <X className="h-5 w-5 responsive-container" />
                </button>
              </div>
              
              <div className="space-y-4 responsive-container">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                    placeholder="Enter user name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Operator">Operator</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                    placeholder="Enter company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        status: e.target.value as 'active' | 'idle' | 'inactive',
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                  >
                    <option value="active">Active</option>
                    <option value="idle">Idle</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Device
                  </label>
                  <select
                    value={formData.device}
                    onChange={e => setFormData(prev => ({ ...prev, device: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                  >
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                    placeholder="Enter location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    IP Address
                  </label>
                  <input
                    type="text"
                    value={formData.ipAddress}
                    onChange={e => setFormData(prev => ({ ...prev, ipAddress: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
                    placeholder="Enter IP address"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingUser(null);
                  }
            aria-label="Button"}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors responsive-container"
                 aria-label="Button">
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View User Modal */}
      <AnimatePresence>
        {showViewModal && viewingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
            onClick={() => {
              setShowViewModal(false);
              setViewingUser(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4 responsive-container"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  User Details
                </h3>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingUser(null);
                  }
            aria-label="Button"}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container"
                >
                  <X className="h-5 w-5 responsive-container" />
                </button>
              </div>
              
              <div className="space-y-4 responsive-container">
                <div className="flex items-center space-x-4 responsive-container">
                  <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center responsive-container">
                    <User className="h-8 w-8 text-blue-600 responsive-container" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                      {viewingUser.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 responsive-container">{viewingUser.email}</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(viewingUser.status)}`}
                    >
                      {viewingUser.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 responsive-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Role
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">{viewingUser.role}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Company
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {viewingUser.company}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Device
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">{viewingUser.device}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Location
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {viewingUser.location}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      IP Address
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {viewingUser.ipAddress}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Session Duration
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {viewingUser.sessionDuration}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Actions Count
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {viewingUser.actions}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                      Last Active
                    </label>
                    <p className="text-sm text-gray-900 dark:text-gray-100 responsive-container">
                      {new Date(viewingUser.lastActive).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingUser(null);
                  }
            aria-label="Button"}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditUser(viewingUser);
                  }
            aria-label="Button"}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors responsive-container"
                >
                  Edit User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && deletingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
            onClick={() => {
              setShowDeleteModal(false);
              setDeletingUser(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 responsive-container"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4 responsive-container">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg responsive-container">
                  <AlertTriangle className="h-6 w-6 text-red-600 responsive-container" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                  Delete User
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 responsive-container">
                Are you sure you want to delete <strong>{deletingUser.name}</strong>? This action
                cannot be undone.
              </p>
              
              <div className="flex items-center justify-end space-x-3 responsive-container">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingUser(null);
                  }
            aria-label="Button"}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors responsive-container"
                 aria-label="Button">
                  Delete User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActiveUsers;
