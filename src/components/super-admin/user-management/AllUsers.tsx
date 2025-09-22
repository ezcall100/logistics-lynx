import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, UserPlus, Eye, Edit, Trash2, Shield, 
  CheckCircle, AlertCircle, Lock, X, RefreshCw, Bell,
  Users, UserCheck, Crown, Award, Target, Globe, CreditCard, TrendingUp,
  MoreVertical, Save, User, Mail, Phone, Building2, MapPin, Calendar
} from 'lucide-react';

/**
 * All Users Page - Modern User Management System
 * Comprehensive user listing with advanced filtering and management
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T17:30:00.000Z
 * Features: Advanced Search, Bulk Operations, User Analytics, Role Management
 */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  company: string;
  department: string;
  avatar?: string;
  phone?: string;
  location?: string;
  joinDate: string;
  plan: string;
  permissions: string[];
  loginCount: number;
  lastActivity: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  pending: number;
  suspended: number;
  verified: number;
  twoFactorEnabled: number;
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
    suspended: 0,
    verified: 0,
    twoFactorEnabled: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data - Modern user management system
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@transbot.com',
        role: 'Super Admin',
        status: 'active',
        lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Executive',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        joinDate: '2023-01-15',
        plan: 'Enterprise',
        permissions: ['admin', 'user_management', 'system_config'],
        loginCount: 1247,
        lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: true,
        riskLevel: 'low'
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@transbot.com',
        role: 'Operations Manager',
        status: 'active',
        lastLogin: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Operations',
        phone: '+1 (555) 234-5678',
        location: 'Los Angeles, CA',
        joinDate: '2023-03-22',
        plan: 'Professional',
        permissions: ['operations', 'fleet_management', 'reports'],
        loginCount: 892,
        lastActivity: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: true,
        riskLevel: 'low'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@transbot.com',
        role: 'Fleet Coordinator',
        status: 'active',
        lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Fleet Management',
        phone: '+1 (555) 345-6789',
        location: 'Chicago, IL',
        joinDate: '2023-06-10',
        plan: 'Standard',
        permissions: ['fleet_management', 'driver_management'],
        loginCount: 634,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: false,
        riskLevel: 'medium'
      },
      {
        id: '4',
        name: 'David Kim',
        email: 'david.kim@transbot.com',
        role: 'Customer Success',
        status: 'active',
        lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Customer Success',
        phone: '+1 (555) 456-7890',
        location: 'New York, NY',
        joinDate: '2023-08-05',
        plan: 'Professional',
        permissions: ['customer_support', 'account_management'],
        loginCount: 445,
        lastActivity: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: true,
        riskLevel: 'low'
      },
      {
        id: '5',
        name: 'Lisa Wang',
        email: 'lisa.wang@transbot.com',
        role: 'Data Analyst',
        status: 'pending',
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Analytics',
        phone: '+1 (555) 567-8901',
        location: 'Seattle, WA',
        joinDate: '2024-01-20',
        plan: 'Standard',
        permissions: ['analytics', 'reports'],
        loginCount: 89,
        lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isVerified: false,
        twoFactorEnabled: false,
        riskLevel: 'high'
      },
      {
        id: '6',
        name: 'James Wilson',
        email: 'james.wilson@transbot.com',
        role: 'Driver',
        status: 'inactive',
        lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Fleet',
        phone: '+1 (555) 678-9012',
        location: 'Houston, TX',
        joinDate: '2023-11-15',
        plan: 'Basic',
        permissions: ['driver_app', 'location_sharing'],
        loginCount: 156,
        lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: false,
        riskLevel: 'medium'
      },
      {
        id: '7',
        name: 'Maria Garcia',
        email: 'maria.garcia@transbot.com',
        role: 'Finance Manager',
        status: 'active',
        lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Finance',
        phone: '+1 (555) 789-0123',
        location: 'Miami, FL',
        joinDate: '2023-04-18',
        plan: 'Professional',
        permissions: ['finance', 'billing', 'reports'],
        loginCount: 723,
        lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: true,
        riskLevel: 'low'
      },
      {
        id: '8',
        name: 'Robert Taylor',
        email: 'robert.taylor@transbot.com',
        role: 'IT Administrator',
        status: 'suspended',
        lastLogin: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'IT',
        phone: '+1 (555) 890-1234',
        location: 'Austin, TX',
        joinDate: '2023-02-28',
        plan: 'Enterprise',
        permissions: ['admin', 'system_config', 'user_management'],
        loginCount: 445,
        lastActivity: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: true,
        riskLevel: 'high'
      },
      {
        id: '9',
        name: 'Jennifer Brown',
        email: 'jennifer.brown@transbot.com',
        role: 'HR Manager',
        status: 'active',
        lastLogin: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Human Resources',
        phone: '+1 (555) 901-2345',
        location: 'Denver, CO',
        joinDate: '2023-07-12',
        plan: 'Professional',
        permissions: ['hr_management', 'employee_records'],
        loginCount: 567,
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: true,
        riskLevel: 'low'
      },
      {
        id: '10',
        name: 'Alex Thompson',
        email: 'alex.thompson@transbot.com',
        role: 'Sales Representative',
        status: 'active',
        lastLogin: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        company: 'TransBot Logistics',
        department: 'Sales',
        phone: '+1 (555) 012-3456',
        location: 'Phoenix, AZ',
        joinDate: '2023-09-08',
        plan: 'Standard',
        permissions: ['sales', 'customer_management'],
        loginCount: 334,
        lastActivity: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        isVerified: true,
        twoFactorEnabled: false,
        riskLevel: 'medium'
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    
    // Calculate stats
    const userStats: UserStats = {
      total: mockUsers.length,
      active: mockUsers.filter(u => u.status === 'active').length,
      inactive: mockUsers.filter(u => u.status === 'inactive').length,
      pending: mockUsers.filter(u => u.status === 'pending').length,
      suspended: mockUsers.filter(u => u.status === 'suspended').length,
      verified: mockUsers.filter(u => u.isVerified).length,
      twoFactorEnabled: mockUsers.filter(u => u.twoFactorEnabled).length
    };
    setStats(userStats);
  }, []);

  // Filter, search, and sort users
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role.toLowerCase().includes(roleFilter.toLowerCase()));
    }

    // Sort users
    const sorted = filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof User];
      let bValue: any = b[sortBy as keyof User];

      if (sortBy === 'lastLogin' || sortBy === 'joinDate' || sortBy === 'lastActivity') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

    if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
    } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(sorted);
  }, [users, searchQuery, statusFilter, roleFilter, sortBy, sortOrder]);

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getRiskLevelColor = (riskLevel: User['riskLevel']) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'high': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('admin')) return Crown;
    if (role.toLowerCase().includes('manager')) return Shield;
    if (role.toLowerCase().includes('analyst')) return TrendingUp;
    if (role.toLowerCase().includes('driver')) return Target;
    if (role.toLowerCase().includes('sales')) return Award;
    if (role.toLowerCase().includes('finance')) return CreditCard;
    if (role.toLowerCase().includes('hr')) return Users;
    return Globe;
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case 'activate':
        setUsers(prev => prev.map(user =>
          selectedUsers.includes(user.id)
            ? { ...user, status: 'active' as const }
            : user
        ));
        addNotification('success', 'Users Activated', `${selectedUsers.length} users have been activated`);
        break;
      case 'deactivate':
        setUsers(prev => prev.map(user =>
          selectedUsers.includes(user.id)
            ? { ...user, status: 'inactive' as const }
            : user
        ));
        addNotification('warning', 'Users Deactivated', `${selectedUsers.length} users have been deactivated`);
        break;
      case 'suspend':
        setUsers(prev => prev.map(user =>
          selectedUsers.includes(user.id)
            ? { ...user, status: 'suspended' as const }
            : user
        ));
        addNotification('warning', 'Users Suspended', `${selectedUsers.length} users have been suspended`);
        break;
      case 'delete':
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
        addNotification('error', 'Users Deleted', `${selectedUsers.length} users have been deleted`);
        break;
      case 'export':
        addNotification('info', 'Export Started', `Exporting ${selectedUsers.length} users to CSV`);
        break;
    }

    setSelectedUsers([]);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'User data has been updated');
  };

  // CRUD Operations
  const handleCreateUser = (userData: any) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role,
      status: 'active',
      lastLogin: new Date().toISOString(),
      company: userData.company,
      department: userData.department,
      phone: userData.phone,
      location: userData.location || 'Unknown',
      joinDate: new Date().toISOString().split('T')[0],
      plan: 'Standard',
      permissions: ['basic'],
      loginCount: 0,
      lastActivity: new Date().toISOString(),
      isVerified: false,
      twoFactorEnabled: false,
      riskLevel: 'low'
    };

    setUsers(prev => [newUser, ...prev]);
    setShowCreateModal(false);
    addNotification('success', 'User Created', `User ${newUser.name} has been created successfully`);
  };

  const handleEditUser = (userData: any) => {
    if (!editingUser) return;

    const updatedUser = {
      ...editingUser,
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      role: userData.role,
      company: userData.company,
      department: userData.department,
      phone: userData.phone,
      location: userData.location,
    };

    setUsers(prev => prev.map(user => user.id === editingUser.id ? updatedUser : user));
    setShowEditModal(false);
    setEditingUser(null);
    addNotification('success', 'User Updated', `User ${updatedUser.name} has been updated successfully`);
  };

  const handleDeleteUser = () => {
    if (!deletingUserId) return;

    const userToDelete = users.find(user => user.id === deletingUserId);
    setUsers(prev => prev.filter(user => user.id !== deletingUserId));
    setShowDeleteModal(false);
    setDeletingUserId(null);
    addNotification('success', 'User Deleted', `User ${userToDelete?.name} has been deleted successfully`);
  };

  const handleViewUser = (user: User) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowEditModal(true);
    setShowActionMenu(null);
  };

  const handleDeleteClick = (userId: string) => {
    setDeletingUserId(userId);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const toggleActionMenu = (userId: string) => {
    setShowActionMenu(showActionMenu === userId ? null : userId);
  };

  // Close action menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showActionMenu) {
        setShowActionMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionMenu]);

  const formatLastLogin = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Users className="w-8 h-8 text-blue-500 mr-3" />
                All Users
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and monitor all system users with advanced controls
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
                  <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
                    </div>
                  </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
                  <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Verified</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.verified}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
                    </div>
                  </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
                  <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">2FA Enabled</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.twoFactorEnabled}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
                    </div>
                  </div>
                </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, company, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
                <option value="driver">Driver</option>
                <option value="sales">Sales</option>
                <option value="finance">Finance</option>
                <option value="hr">HR</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="lastLogin-desc">Last Login (Recent)</option>
                <option value="lastLogin-asc">Last Login (Oldest)</option>
                <option value="joinDate-desc">Join Date (Recent)</option>
                <option value="joinDate-asc">Join Date (Oldest)</option>
              </select>
                </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              </div>
              <div className="flex items-center space-x-2">
                  <button
                  onClick={() => handleBulkAction('activate')}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                  Activate
                  </button>
                <button
                  onClick={() => handleBulkAction('deactivate')}
                  className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction('suspend')}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={() => setSelectedUsers([])}
                  className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                      <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                          <div>
                          <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                              {user.isVerified && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{user.company} • {user.department}</p>
                          </div>
                          </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-900 dark:text-white">{user.role}</span>
                      </div>
                    </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                      </span>
                    </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {formatLastLogin(user.lastLogin)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.loginCount} logins
                      </div>
                    </td>
                      <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {user.twoFactorEnabled ? (
                            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                              <Shield className="w-4 h-4" />
                              <span className="text-xs">2FA</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-gray-400">
                              <Lock className="w-4 h-4" />
                              <span className="text-xs">No 2FA</span>
                            </div>
                        )}
                      </div>
                    </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                          {user.riskLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handleViewUser(user)}
                            className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                            title="View User"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleEditClick(user)}
                            className="p-1 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                            title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                          <div className="relative">
                        <button
                              onClick={() => toggleActionMenu(user.id)}
                              className="p-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                              title="More Actions"
                        >
                              <MoreVertical className="w-4 h-4" />
                        </button>
                            
                            {/* Three-dot dropdown menu */}
                            <AnimatePresence>
                              {showActionMenu === user.id && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="absolute right-0 top-8 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10"
                                >
                                  <div className="py-1">
                        <button
                                      onClick={() => handleEditClick(user)}
                                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                    >
                                      <Edit className="w-4 h-4" />
                                      <span>Edit User</span>
                                    </button>
                                    <button
                                      onClick={() => handleViewUser(user)}
                                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                    >
                                      <Eye className="w-4 h-4" />
                                      <span>View Details</span>
                                    </button>
                                    <button
                                      onClick={() => handleDeleteClick(user.id)}
                                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
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
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        <AnimatePresence>
          {showCreateModal && (
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New User</h3>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
          </div>

                <CreateUserForm onSubmit={handleCreateUser} onCancel={() => setShowCreateModal(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit User Modal */}
        <AnimatePresence>
          {showEditModal && editingUser && (
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit User</h3>
            <button
                      onClick={() => setShowEditModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
                      <X className="w-5 h-5 text-gray-500" />
            </button>
                  </div>
                </div>
                
                <EditUserForm user={editingUser} onSubmit={handleEditUser} onCancel={() => setShowEditModal(false)} />
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
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Details</h3>
                <button
                      onClick={() => setShowViewModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                </button>
                  </div>
                </div>
                
                <ViewUserForm user={viewingUser} onClose={() => setShowViewModal(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && deletingUserId && (
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete User</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to delete this user? This will permanently remove all user data and cannot be reversed.
                  </p>
                  
                  <div className="flex space-x-3">
            <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteUser}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete User
            </button>
          </div>
        </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'info' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertCircle className="w-5 h-5" />}
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
      </div>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
    </div>
      </div>
    </motion.div>
  );
};

// Create User Form Component
const CreateUserForm: React.FC<{ onSubmit: (data: any) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    company: '',
    department: '',
    phone: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
          <select
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
            <option value="driver">Driver</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="hr">HR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Create User
        </button>
      </div>
    </form>
  );
};

// Edit User Form Component
const EditUserForm: React.FC<{ user: User; onSubmit: (data: any) => void; onCancel: () => void }> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user.name.split(' ')[0] || '',
    lastName: user.name.split(' ').slice(1).join(' ') || '',
    email: user.email,
    role: user.role,
    company: user.company,
    department: user.department,
    phone: user.phone || '',
    location: user.location || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
          <select
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
            <option value="driver">Driver</option>
            <option value="sales">Sales</option>
            <option value="finance">Finance</option>
            <option value="hr">HR</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
          <input
            type="text"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Update User
        </button>
      </div>
    </form>
  );
};

// View User Form Component
const ViewUserForm: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
            user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
            user.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400' :
            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {user.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Role</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Company</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Department</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.department}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone || 'Not provided'}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.location || 'Not provided'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Join Date</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Security</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'} • {user.isVerified ? 'Verified' : 'Unverified'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Activity className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Risk Level</p>
              <p className={`text-sm font-medium ${
                user.riskLevel === 'low' ? 'text-green-600 dark:text-green-400' :
                user.riskLevel === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
