import React, { useState, useEffect } from 'react';
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
  User,
  UserCog,
  Clock,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { formatNumber, formatRelativeTime, getStatusColor, getStatusIcon } from '../../lib/utils';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer';
  company: string;
  companyId: number;
  status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  profile: {
    avatar?: string;
    phone?: string;
    department?: string;
    title?: string;
  };
  security: {
    twoFactorEnabled: boolean;
    passwordLastChanged: string;
    loginAttempts: number;
    lastFailedLogin?: string;
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  level: number;
  color: string;
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  companyId: number;
  phone: string;
  department: string;
  title: string;
  permissions: string[];
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'User',
    companyId: 1,
    phone: '',
    department: '',
    title: '',
    permissions: []
  });
  const [loading, setLoading] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);

  const roles: Role[] = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Full system access and control',
      permissions: ['*'],
      level: 5,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Company administration and management',
      permissions: ['user_management', 'company_settings', 'billing', 'analytics'],
      level: 4,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Team and project management',
      permissions: ['user_management', 'project_management', 'reports'],
      level: 3,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'user',
      name: 'User',
      description: 'Standard user access',
      permissions: ['basic_access', 'view_reports'],
      level: 2,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['view_only'],
      level: 1,
      color: 'text-gray-600 bg-gray-50'
    }
  ];

  const companies = [
    { id: 1, name: 'Global Logistics Corp' },
    { id: 2, name: 'Swift Transport Ltd' },
    { id: 3, name: 'Metro Freight Inc' },
    { id: 4, name: 'Coastal Shipping Co' }
  ];

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
    'system_settings'
  ];

  // Mock data initialization
  useEffect(() => {
    const mockUsers: User[] = [
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
          title: 'Operations Manager'
        },
        security: {
          twoFactorEnabled: true,
          passwordLastChanged: '2024-01-01T00:00:00Z',
          loginAttempts: 0
        }
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
          title: 'Logistics Coordinator'
        },
        security: {
          twoFactorEnabled: false,
          passwordLastChanged: '2023-12-15T00:00:00Z',
          loginAttempts: 1,
          lastFailedLogin: '2024-01-10T15:30:00Z'
        }
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
          title: 'Fleet Coordinator'
        },
        security: {
          twoFactorEnabled: true,
          passwordLastChanged: '2024-01-05T00:00:00Z',
          loginAttempts: 0
        }
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
          title: 'Financial Analyst'
        },
        security: {
          twoFactorEnabled: false,
          passwordLastChanged: '2024-01-14T16:00:00Z',
          loginAttempts: 0
        }
      }
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter and search users
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
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
    filtered.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter, roleFilter, companyFilter]);

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role as any,
        company: companies.find(c => c.id === formData.companyId)?.name || '',
        companyId: formData.companyId,
        status: 'Pending',
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        permissions: formData.permissions,
        profile: {
          phone: formData.phone,
          department: formData.department,
          title: formData.title
        },
        security: {
          twoFactorEnabled: false,
          passwordLastChanged: new Date().toISOString(),
          loginAttempts: 0
        }
      };

      setUsers(prev => [...prev, newUser]);
      setShowUserModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setLoading(true);
    try {
      const updatedUser: User = {
        ...editingUser,
        name: formData.name,
        email: formData.email,
        role: formData.role as any,
        company: companies.find(c => c.id === formData.companyId)?.name || '',
        companyId: formData.companyId,
        permissions: formData.permissions,
        profile: {
          ...editingUser.profile,
          phone: formData.phone,
          department: formData.department,
          title: formData.title
        }
      };

      setUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u));
      setEditingUser(null);
      setShowUserModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} users?`)) {
          setUsers(prev => prev.filter(u => !bulkSelected.includes(u.id)));
          setBulkSelected([]);
        }
        break;
      case 'suspend':
        setUsers(prev => prev.map(u => 
          bulkSelected.includes(u.id) ? { ...u, status: 'Suspended' as any } : u
        ));
        setBulkSelected([]);
        break;
      case 'activate':
        setUsers(prev => prev.map(u => 
          bulkSelected.includes(u.id) ? { ...u, status: 'Active' as any } : u
        ));
        setBulkSelected([]);
        break;
      case 'reset-password':
        // Handle password reset
        setBulkSelected([]);
        break;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'User',
      companyId: 1,
      phone: '',
      department: '',
      title: '',
      permissions: []
    });
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      phone: user.profile.phone || '',
      department: user.profile.department || '',
      title: user.profile.title || '',
      permissions: user.permissions
    });
    setShowUserModal(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return <Crown className="w-4 h-4" />;
      case 'Admin':
        return <Shield className="w-4 h-4" />;
      case 'Manager':
        return <UserCog className="w-4 h-4" />;
      case 'User':
        return <User className="w-4 h-4" />;
      case 'Viewer':
        return <Eye className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingUser ? 'Edit User' : 'Add New User'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter full name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@company.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyId: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1-555-0123"
                />
                <Input
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Operations"
                />
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-2">
                  {availablePermissions.map(permission => (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {permission.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                  resetForm();
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={editingUser ? handleUpdateUser : handleCreateUser}
                loading={loading}
              >
                <Save className="w-4 h-4 mr-2" />
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowUserModal(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', count: formatNumber(users.length), icon: Users, color: 'text-blue-500' },
          { title: 'Active Users', count: formatNumber(users.filter(u => u.status === 'Active').length), icon: UserCheck, color: 'text-green-500' },
          { title: 'Pending Users', count: formatNumber(users.filter(u => u.status === 'Pending').length), icon: Clock, color: 'text-yellow-500' },
          { title: 'Suspended Users', count: formatNumber(users.filter(u => u.status === 'Suspended').length), icon: UserX, color: 'text-red-500' }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                  <div className="text-gray-600 text-sm">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {bulkSelected.length} users selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('suspend')}>
                  <UserX className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('reset-password')}>
                  <Key className="w-4 h-4 mr-2" />
                  Reset Password
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={bulkSelected.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelected(filteredUsers.map(u => u.id));
                        } else {
                          setBulkSelected([]);
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelected(prev => [...prev, user.id]);
                          } else {
                            setBulkSelected(prev => prev.filter(id => id !== user.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {user.security.twoFactorEnabled ? (
                          <span className="text-green-600" title="2FA Enabled">
                            <Shield className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-gray-400" title="2FA Disabled">
                            <Shield className="w-4 h-4" />
                          </span>
                        )}
                        {user.security.loginAttempts > 0 && (
                          <span className="text-red-600" title={`${user.security.loginAttempts} failed attempts`}>
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditModal(user)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
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
