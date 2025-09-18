import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Download,
  Upload,
  AlertTriangle,
  Shield,
  Key,
  UserCheck,
  UserX,
  X,
  Save,
  Crown,
  UserCog,
  Clock,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { formatNumber, formatRelativeTime, getStatusColor, getStatusIcon } from '../../lib/utils';

/**
 * Interface representing user data structure
 * @interface UserData
 */
interface UserData {
  /** Unique identifier for the user */
  id: number;
  /** Full name of the user */
  name: string;
  /** Email address of the user */
  email: string;
  /** Role assigned to the user */
  role: 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer';
  /** Company name the user belongs to */
  company: string;
  /** Company ID reference */
  companyId: number;
  /** Current status of the user account */
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  /** Last login timestamp */
  lastLogin: string;
  /** Account creation timestamp */
  createdAt: string;
  /** Array of permission strings */
  permissions: string[];
  /** User profile information */
  profile: {
    /** Optional avatar URL */
    avatar?: string;
    /** Optional phone number */
    phone?: string;
    /** Optional department */
    department?: string;
    /** Optional job title */
    title?: string;
  };
  /** Security-related information */
  security: {
    /** Whether two-factor authentication is enabled */
    twoFactorEnabled: boolean;
    /** Last login attempt timestamp */
    lastLoginAttempt: string;
    /** Number of failed login attempts */
    loginAttempts: number;
    /** Current account security status */
    accountStatus: 'secure' | 'warning' | 'critical';
  };
}

/**
 * Interface representing user role structure
 * @interface Role
 */
interface Role {
  /** Unique identifier for the role */
  id: string;
  /** Display name of the role */
  name: string;
  /** Description of the role's purpose */
  description: string;
  /** Array of permission strings for this role */
  permissions: string[];
  /** Hierarchical level of the role (higher = more permissions) */
  level: number;
  /** CSS color classes for role display */
  color: string;
}

/**
 * Interface representing form data for user creation/editing
 * @interface UserFormData
 */
interface UserFormData {
  /** User's full name */
  name: string;
  /** User's email address */
  email: string;
  /** Selected role for the user */
  role: string;
  /** Selected company ID */
  companyId: number;
  /** User's phone number */
  phone: string;
  /** User's department */
  department: string;
  /** User's job title */
  title: string;
  /** Array of selected permissions */
  permissions: string[];
}

/**
 * UserManagement Component
 * 
 * A comprehensive user management interface for the super admin portal.
 * Provides functionality for creating, reading, updating, and deleting users
 * with role-based access control and security monitoring.
 * 
 * @component
 * @returns {JSX.Element} The UserManagement component
 */
const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUserData, setEditingUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'User',
    companyId: 1,
    phone: '',
    department: '',
    title: '',
    permissions: [],
  });
  const [loading, setLoading] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const roles: Role[] = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Full system access and control',
      permissions: ['*'],
      level: 5,
      color: 'text-red-600 bg-red-50',
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Company administration and management',
      permissions: ['user_management', 'company_settings', 'billing', 'analytics'],
      level: 4,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Team and project management',
      permissions: ['user_management', 'project_management', 'reports'],
      level: 3,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: 'user',
      name: 'User',
      description: 'Standard user access',
      permissions: ['basic_access', 'view_reports'],
      level: 2,
      color: 'text-green-600 bg-green-50',
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['view_only'],
      level: 1,
      color: 'text-gray-600 bg-gray-50',
    },
  ];

  const companies = useMemo(() => [
    { id: 1, name: 'Global Logistics Corp' },
    { id: 2, name: 'Swift Transport Ltd' },
    { id: 3, name: 'Metro Freight Inc' },
    { id: 4, name: 'Coastal Shipping Co' },
  ], []);

  const availablePermissions = [
    'user_management',
    'company_settings',
    'billing',
    'analytics',
    'project_management',
    'reports',
    'basic_access',
    'view_reports',
    'view_only',
    'api_access',
    'data_export',
    'system_settings',
  ];

  // Mock data initialization
  useEffect(() => {
    const mockUsers: UserData[] = [
      {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@globallogistics.com',
        role: 'Admin',
        company: 'Global Logistics Corp',
        companyId: 1,
        status: 'Active',
        lastLogin: '2024-01-15T10:30:00Z',
        createdAt: '2023-06-15T09:00:00Z',
        permissions: ['user_management', 'company_settings', 'billing', 'analytics'],
        profile: {
          phone: '+1-555-0123',
          department: 'Operations',
          title: 'Operations Manager',
        },
        security: {
          twoFactorEnabled: true,
          lastLoginAttempt: '2024-01-15T10:30:00Z',
          loginAttempts: 0,
          accountStatus: 'secure',
        },
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@swifttransport.com',
        role: 'Manager',
        company: 'Swift Transport Ltd',
        companyId: 2,
        status: 'Active',
        lastLogin: '2024-01-15T09:15:00Z',
        createdAt: '2023-08-20T14:30:00Z',
        permissions: ['user_management', 'project_management', 'reports'],
        profile: {
          phone: '+1-555-0456',
          department: 'Logistics',
          title: 'Logistics Coordinator',
        },
        security: {
          twoFactorEnabled: false,
          lastLoginAttempt: '2024-01-15T09:15:00Z',
          loginAttempts: 1,
          accountStatus: 'warning',
        },
      },
      {
        id: 3,
        name: 'Mike Davis',
        email: 'mike.davis@metrofreight.com',
        role: 'User',
        company: 'Metro Freight Inc',
        companyId: 3,
        status: 'Active',
        lastLogin: '2024-01-15T08:45:00Z',
        createdAt: '2023-10-10T11:20:00Z',
        permissions: ['basic_access', 'view_reports'],
        profile: {
          phone: '+1-555-0789',
          department: 'Fleet',
          title: 'Fleet Coordinator',
        },
        security: {
          twoFactorEnabled: true,
          lastLoginAttempt: '2024-01-15T08:45:00Z',
          loginAttempts: 0,
          accountStatus: 'secure',
        },
      },
      {
        id: 4,
        name: 'Emily Wilson',
        email: 'emily.wilson@coastalshipping.com',
        role: 'Viewer',
        company: 'Coastal Shipping Co',
        companyId: 4,
        status: 'Pending',
        lastLogin: '2024-01-14T16:20:00Z',
        createdAt: '2024-01-14T16:00:00Z',
        permissions: ['view_only'],
        profile: {
          phone: '+1-555-0321',
          department: 'Finance',
          title: 'Financial Analyst',
        },
        security: {
          twoFactorEnabled: false,
          lastLoginAttempt: '2024-01-14T16:20:00Z',
          loginAttempts: 0,
          accountStatus: 'secure',
        },
      },
    ];

    setUsers(mockUsers);
  }, []);

  // Memoized filtered users for better performance
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(user => user.companyId === parseInt(companyFilter));
    }

    // Sort by name
    return filtered.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  }, [users, searchQuery, statusFilter, roleFilter, companyFilter]);

  const handleCreateUser = useCallback(async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const newUserData: UserData = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role as 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer',
        company: companies.find(c => c.id === formData.companyId)?.name || '',
        companyId: formData.companyId,
        status: 'Pending',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        permissions: formData.permissions,
        profile: {
          phone: formData.phone,
          department: formData.department,
          title: formData.title,
        },
        security: {
          twoFactorEnabled: false,
          lastLoginAttempt: new Date().toISOString(),
          loginAttempts: 0,
          accountStatus: 'secure',
        },
      };

      setUsers(prev => [...prev, newUserData]);
      setShowUserModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [users, formData, companies]);

  const handleUpdateUser = useCallback(async () => {
    if (!editingUserData) return;
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updatedUserData: UserData = {
        ...editingUserData,
        name: formData.name,
        email: formData.email,
        role: formData.role as 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer',
        company: companies.find(c => c.id === formData.companyId)?.name || '',
        companyId: formData.companyId,
        permissions: formData.permissions,
        profile: {
          ...editingUserData.profile,
          phone: formData.phone,
          department: formData.department,
          title: formData.title,
        },
      };

      setUsers(prev => prev.map(u => (u.id === editingUserData.id ? updatedUserData : u)));
      setEditingUserData(null);
      setShowUserModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [editingUserData, formData, companies]);

  const handleDeleteUser = useCallback(async (id: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this user?')) {
        setUsers(prev => prev.filter(u => u.id !== id));
        alert('User deleted successfully.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  }, []);

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} users?`)) {
          setUsers(prev => prev.filter(u => !bulkSelected.includes(u.id)));
          setBulkSelected([]);
        }
        break;
      case 'suspend':
        setUsers(prev =>
          prev.map(u =>
            bulkSelected.includes(u.id)
              ? { ...u, status: 'Suspended' as 'Active' | 'Suspended' | 'Pending' }
              : u
          )
        );
        setBulkSelected([]);
        break;
      case 'activate':
        setUsers(prev =>
          prev.map(u =>
            bulkSelected.includes(u.id)
              ? { ...u, status: 'Active' as 'Active' | 'Suspended' | 'Pending' }
              : u
          )
        );
        setBulkSelected([]);
        break;
      case 'reset-password':
        // Handle password reset
        setBulkSelected([]);
        break;
    }
  };

  /**
   * Validates the user form data
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.role) {
      errors.role = 'Role is required';
    }
    
    if (!formData.companyId) {
      errors.companyId = 'Company is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  /**
   * Resets the form data and validation errors to initial state
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'User',
      companyId: 1,
      phone: '',
      department: '',
      title: '',
      permissions: [],
    });
    setFormErrors({});
  };

  /**
   * Opens the edit modal with the selected user's data
   * @param {UserData} user - The user to edit
   */
  const openEditModal = (user: UserData) => {
    setEditingUserData(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      phone: user.profile.phone || '',
      department: user.profile.department || '',
      title: user.profile.title || '',
      permissions: user.permissions,
    });
    setShowUserModal(true);
  };

  /**
   * Returns the appropriate icon for a given role
   * @param {string} role - The role name
   * @returns {JSX.Element} The icon component
   */
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return <Crown className="w-4 h-4 responsive-container" />;
      case 'Admin':
        return <Shield className="w-4 h-4 responsive-container" />;
      case 'Manager':
        return <UserCog className="w-4 h-4 responsive-container" />;
      case 'User':
        return <Users className="w-4 h-4 responsive-container" />;
      case 'Viewer':
        return <Eye className="w-4 h-4 responsive-container" />;
      default:
        return <Users className="w-4 h-4 responsive-container" />;
    }
  };

  /**
   * Returns the appropriate color classes for a given role
   * @param {string} role - The role name
   * @returns {string} CSS color classes
   */
  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.name === role);
    return roleData?.color || 'text-gray-600 bg-gray-50';
  };

  const UserModal = () => (
    <AnimatePresence>
      {showUserModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 responsive-container"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto responsive-container"
          >
            <div className="p-6 border-b border-gray-200 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <h2 className="text-xl font-bold text-gray-900 responsive-container">
                  {editingUserData ? 'Edit User' : 'Add New User'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUserData(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5 responsive-container" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6 responsive-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container">
                <div>
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    errorText={formErrors.name}
                  />
                </div>
                <div>
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="user@company.com"
                    errorText={formErrors.email}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container">Role</label>
                  <select
                    value={formData.role}
                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.role ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.role && (
                    <p className="text-red-500 text-sm mt-1 responsive-container">{formErrors.role}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container">Company</label>
                  <select
                    value={formData.companyId}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, companyId: parseInt(e.target.value) }))
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formErrors.companyId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.companyId && (
                    <p className="text-red-500 text-sm mt-1 responsive-container">{formErrors.companyId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container">
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1-555-0123"
                />
                <Input
                  label="Department"
                  value={formData.department}
                  onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Operations"
                />
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container">Permissions</label>
                <div className="grid grid-cols-2 gap-2 responsive-container">
                  {availablePermissions.map(permission => (
                    <label key={permission} className="flex items-center gap-2 responsive-container">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={e => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission],
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission),
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 responsive-container"
                      />
                      <span className="text-sm text-gray-700 capitalize responsive-container">
                        {permission.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 responsive-container">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUserData(null);
                  resetForm();
                }}
              >
                <X className="w-4 h-4 mr-2 responsive-container" />
                Cancel
              </Button>
              <Button
                onClick={editingUserData ? handleUpdateUser : handleCreateUser}
                loading={loading}
              >
                <Save className="w-4 h-4 mr-2 responsive-container" />
                {editingUserData ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6 responsive-container">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 responsive-container">User Management</h2>
          <p className="text-gray-600 responsive-container">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 responsive-container">
          <div className="flex gap-2 responsive-container">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2 responsive-container" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2 responsive-container" />
              Import
            </Button>
          </div>
          <Button onClick={() => setShowUserModal(true)} className="w-full sm:w-auto responsive-container">
            <UserPlus className="w-4 h-4 mr-2 responsive-container" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container">
        {[
          {
            title: 'Total Users',
            count: formatNumber(users.length),
            icon: Users,
            color: 'text-blue-500',
          },
          {
            title: 'Active Users',
            count: formatNumber(users.filter(u => u.status === 'Active').length),
            icon: UserCheck,
            color: 'text-green-500',
          },
          {
            title: 'Pending Users',
            count: formatNumber(users.filter(u => u.status === 'Pending').length),
            icon: Clock,
            color: 'text-yellow-500',
          },
          {
            title: 'Suspended Users',
            count: formatNumber(users.filter(u => u.status === 'Suspended').length),
            icon: UserX,
            color: 'text-red-500',
          },
        ].map(stat => (
          <Card key={stat.title}>
            <CardContent className="p-6 responsive-container">
              <div className="flex items-center space-x-4 responsive-container">
                <div className={`p-3 rounded-xl bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 responsive-container">{stat.count}</div>
                  <div className="text-gray-600 text-sm responsive-container">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 responsive-container">
          <div className="flex flex-col lg:flex-row gap-4 responsive-container">
            <div className="flex-1 responsive-container">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 responsive-container" />}
              />
            </div>
            <div className="flex gap-3 responsive-container">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              <select
                value={companyFilter}
                onChange={e => setCompanyFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container"
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2 responsive-container" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <Card>
          <CardContent className="p-4 responsive-container">
            <div className="flex items-center justify-between responsive-container">
              <span className="text-sm text-gray-600 responsive-container">{bulkSelected.length} users selected</span>
              <div className="flex gap-2 responsive-container">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  <UserCheck className="w-4 h-4 mr-2 responsive-container" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('suspend')}>
                  <UserX className="w-4 h-4 mr-2 responsive-container" />
                  Suspend
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction('reset-password')}
                >
                  <Key className="w-4 h-4 mr-2 responsive-container" />
                  Reset Password
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-2 responsive-container" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardContent className="p-0 responsive-container">
          <div className="overflow-x-auto responsive-container">
            <table className="w-full min-w-[800px] responsive-container">
              <thead className="bg-gray-50 border-b responsive-container">
                <tr>
                  <th className="px-6 py-4 text-left responsive-container">
                    <input
                      type="checkbox"
                      checked={
                        bulkSelected.length === filteredUsers.length && filteredUsers.length > 0
                      }
                      onChange={e => {
                        if (e.target.checked) {
                          setBulkSelected(filteredUsers.map(u => u.id));
                        } else {
                          setBulkSelected([]);
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 responsive-container"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    Security
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 responsive-container">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors responsive-container">
                    <td className="px-6 py-4 whitespace-nowrap responsive-container">
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(user.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setBulkSelected(prev => [...prev, user.id]);
                          } else {
                            setBulkSelected(prev => prev.filter(id => id !== user.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 responsive-container"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container">
                      <div className="flex items-center gap-3 responsive-container">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center responsive-container">
                          <span className="text-white font-medium text-sm responsive-container">
                            {user.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 responsive-container">{user.name}</div>
                          <div className="text-sm text-gray-500 responsive-container">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container">
                      {user.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}
                      >
                        {getRoleIcon(user.role)}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}
                      >
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 responsive-container">
                      {formatRelativeTime(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container">
                      <div className="flex items-center gap-2 responsive-container">
                        {user.security.twoFactorEnabled ? (
                          <span className="text-green-600 responsive-container" title="2FA Enabled">
                            <Shield className="w-4 h-4 responsive-container" />
                          </span>
                        ) : (
                          <span className="text-gray-400 responsive-container" title="2FA Disabled">
                            <Shield className="w-4 h-4 responsive-container" />
                          </span>
                        )}
                        {user.security.accountStatus === 'warning' && (
                          <span
                            className="text-yellow-600 responsive-container"
                            title="Account security warning"
                          >
                            <AlertTriangle className="w-4 h-4 responsive-container" />
                          </span>
                        )}
                        {user.security.accountStatus === 'critical' && (
                          <span
                            className="text-red-600 responsive-container"
                            title="Critical security issue"
                          >
                            <AlertTriangle className="w-4 h-4 responsive-container" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                      <div className="flex items-center gap-2 responsive-container">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4 responsive-container" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => openEditModal(user)}>
                          <Edit className="w-4 h-4 responsive-container" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 responsive-container" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4 responsive-container" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <UserModal />
    </div>
  );
};

export default UserManagement;
}