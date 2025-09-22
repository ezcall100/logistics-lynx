import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Settings, Plus, Edit, Trash2, Eye, CheckCircle, X, Save,
  Crown, Key, Lock, Unlock, AlertTriangle, Clock, RefreshCw, Bell, Search,
  Filter, Download, Upload, Copy, Star, Award, Target, Zap, Globe, Building
} from 'lucide-react';

/**
 * Roles & Permissions Page - Advanced Role Management System
 * Comprehensive role and permission management with hierarchical access control
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T17:45:00.000Z
 * Features: Role Hierarchy, Permission Matrix, User Assignment, Access Analytics
 */

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
  level: 'read' | 'write' | 'admin';
  resource: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  level: number; // 1-10, higher = more privileges
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
  icon: string;
}

interface RoleStats {
  totalRoles: number;
  systemRoles: number;
  customRoles: number;
  totalPermissions: number;
  assignedUsers: number;
}

const RolesPermissions: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<RoleStats>({
    totalRoles: 0,
    systemRoles: 0,
    customRoles: 0,
    totalPermissions: 0,
    assignedUsers: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data - Comprehensive role and permission system
  useEffect(() => {
    const mockPermissions: Permission[] = [
      // User Management
      { id: 'user.read', name: 'View Users', category: 'User Management', description: 'View user profiles and information', level: 'read', resource: 'users' },
      { id: 'user.write', name: 'Manage Users', category: 'User Management', description: 'Create, edit, and delete users', level: 'write', resource: 'users' },
      { id: 'user.admin', name: 'User Administration', category: 'User Management', description: 'Full user management control', level: 'admin', resource: 'users' },
      
      // Role Management
      { id: 'role.read', name: 'View Roles', category: 'Role Management', description: 'View roles and permissions', level: 'read', resource: 'roles' },
      { id: 'role.write', name: 'Manage Roles', category: 'Role Management', description: 'Create and edit roles', level: 'write', resource: 'roles' },
      { id: 'role.admin', name: 'Role Administration', category: 'Role Management', description: 'Full role management control', level: 'admin', resource: 'roles' },
      
      // System Administration
      { id: 'system.read', name: 'View System', category: 'System Administration', description: 'View system settings and status', level: 'read', resource: 'system' },
      { id: 'system.write', name: 'Configure System', category: 'System Administration', description: 'Modify system settings', level: 'write', resource: 'system' },
      { id: 'system.admin', name: 'System Administration', category: 'System Administration', description: 'Full system control', level: 'admin', resource: 'system' },
      
      // Fleet Management
      { id: 'fleet.read', name: 'View Fleet', category: 'Fleet Management', description: 'View fleet vehicles and drivers', level: 'read', resource: 'fleet' },
      { id: 'fleet.write', name: 'Manage Fleet', category: 'Fleet Management', description: 'Add and edit fleet vehicles', level: 'write', resource: 'fleet' },
      { id: 'fleet.admin', name: 'Fleet Administration', category: 'Fleet Management', description: 'Full fleet management control', level: 'admin', resource: 'fleet' },
      
      // Operations
      { id: 'ops.read', name: 'View Operations', category: 'Operations', description: 'View operational data and reports', level: 'read', resource: 'operations' },
      { id: 'ops.write', name: 'Manage Operations', category: 'Operations', description: 'Create and edit operations', level: 'write', resource: 'operations' },
      { id: 'ops.admin', name: 'Operations Administration', category: 'Operations', description: 'Full operations control', level: 'admin', resource: 'operations' },
      
      // Finance
      { id: 'finance.read', name: 'View Finance', category: 'Finance', description: 'View financial data and reports', level: 'read', resource: 'finance' },
      { id: 'finance.write', name: 'Manage Finance', category: 'Finance', description: 'Process payments and invoices', level: 'write', resource: 'finance' },
      { id: 'finance.admin', name: 'Finance Administration', category: 'Finance', description: 'Full financial control', level: 'admin', resource: 'finance' },
      
      // Analytics
      { id: 'analytics.read', name: 'View Analytics', category: 'Analytics', description: 'View analytics and reports', level: 'read', resource: 'analytics' },
      { id: 'analytics.write', name: 'Create Reports', category: 'Analytics', description: 'Create custom reports', level: 'write', resource: 'analytics' },
      { id: 'analytics.admin', name: 'Analytics Administration', category: 'Analytics', description: 'Full analytics control', level: 'admin', resource: 'analytics' }
    ];

    const mockRoles: Role[] = [
      {
        id: 'super-admin',
        name: 'Super Administrator',
        description: 'Full system access with all permissions',
        level: 10,
        permissions: mockPermissions.map(p => p.id),
        userCount: 3,
        isSystem: true,
        createdAt: '2023-01-01',
        updatedAt: '2024-12-15',
        color: 'bg-red-500',
        icon: 'Crown'
      },
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Administrative access with most permissions',
        level: 8,
        permissions: mockPermissions.filter(p => p.level !== 'admin' || p.category === 'User Management').map(p => p.id),
        userCount: 5,
        isSystem: true,
        createdAt: '2023-01-01',
        updatedAt: '2024-11-20',
        color: 'bg-purple-500',
        icon: 'Shield'
      },
      {
        id: 'operations-manager',
        name: 'Operations Manager',
        description: 'Manage operations and fleet activities',
        level: 7,
        permissions: [
          'fleet.read', 'fleet.write', 'ops.read', 'ops.write', 'analytics.read',
          'user.read', 'role.read', 'system.read'
        ],
        userCount: 8,
        isSystem: false,
        createdAt: '2023-03-15',
        updatedAt: '2024-10-30',
        color: 'bg-blue-500',
        icon: 'Settings'
      },
      {
        id: 'fleet-coordinator',
        name: 'Fleet Coordinator',
        description: 'Coordinate fleet operations and drivers',
        level: 6,
        permissions: [
          'fleet.read', 'fleet.write', 'ops.read', 'user.read'
        ],
        userCount: 12,
        isSystem: false,
        createdAt: '2023-05-10',
        updatedAt: '2024-09-15',
        color: 'bg-green-500',
        icon: 'Target'
      },
      {
        id: 'finance-manager',
        name: 'Finance Manager',
        description: 'Manage financial operations and billing',
        level: 7,
        permissions: [
          'finance.read', 'finance.write', 'analytics.read', 'user.read'
        ],
        userCount: 4,
        isSystem: false,
        createdAt: '2023-04-20',
        updatedAt: '2024-08-25',
        color: 'bg-yellow-500',
        icon: 'Award'
      },
      {
        id: 'analyst',
        name: 'Data Analyst',
        description: 'Access to analytics and reporting tools',
        level: 4,
        permissions: [
          'analytics.read', 'analytics.write', 'ops.read', 'fleet.read'
        ],
        userCount: 6,
        isSystem: false,
        createdAt: '2023-07-01',
        updatedAt: '2024-07-10',
        color: 'bg-indigo-500',
        icon: 'Globe'
      },
      {
        id: 'driver',
        name: 'Driver',
        description: 'Basic access for fleet drivers',
        level: 2,
        permissions: [
          'fleet.read', 'ops.read'
        ],
        userCount: 45,
        isSystem: false,
        createdAt: '2023-06-15',
        updatedAt: '2024-06-20',
        color: 'bg-orange-500',
        icon: 'Users'
      },
      {
        id: 'viewer',
        name: 'Viewer',
        description: 'Read-only access to most resources',
        level: 1,
        permissions: [
          'user.read', 'fleet.read', 'ops.read', 'analytics.read'
        ],
        userCount: 15,
        isSystem: false,
        createdAt: '2023-08-01',
        updatedAt: '2024-05-15',
        color: 'bg-gray-500',
        icon: 'Eye'
      }
    ];

    setPermissions(mockPermissions);
    setRoles(mockRoles);
    setFilteredRoles(mockRoles);
    
    // Calculate stats
    const roleStats: RoleStats = {
      totalRoles: mockRoles.length,
      systemRoles: mockRoles.filter(r => r.isSystem).length,
      customRoles: mockRoles.filter(r => !r.isSystem).length,
      totalPermissions: mockPermissions.length,
      assignedUsers: mockRoles.reduce((sum, role) => sum + role.userCount, 0)
    };
    setStats(roleStats);
  }, []);

  // Filter roles
  useEffect(() => {
    let filtered = roles;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Level filter
    if (levelFilter !== 'all') {
      const level = parseInt(levelFilter);
      filtered = filtered.filter(role => role.level === level);
    }

    setFilteredRoles(filtered);
  }, [roles, searchQuery, levelFilter]);

  const getLevelColor = (level: number) => {
    if (level >= 8) return 'text-red-600 dark:text-red-400';
    if (level >= 6) return 'text-orange-600 dark:text-orange-400';
    if (level >= 4) return 'text-yellow-600 dark:text-yellow-400';
    if (level >= 2) return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getLevelBadge = (level: number) => {
    if (level >= 8) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    if (level >= 6) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    if (level >= 4) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    if (level >= 2) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown': return Crown;
      case 'Shield': return Shield;
      case 'Settings': return Settings;
      case 'Target': return Target;
      case 'Award': return Award;
      case 'Globe': return Globe;
      case 'Users': return Users;
      case 'Eye': return Eye;
      default: return Shield;
    }
  };

  const handleCreateRole = () => {
    setEditingRole({
      id: '',
      name: '',
      description: '',
      level: 1,
      permissions: [],
      userCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      color: 'bg-blue-500',
      icon: 'Shield'
    });
    setShowCreateModal(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setShowEditModal(true);
  };

  const handleDeleteRole = (roleId: string) => {
    if (roles.find(r => r.id === roleId)?.isSystem) {
      addNotification('error', 'Cannot Delete', 'System roles cannot be deleted');
      return;
    }
    
    setRoles(prev => prev.filter(role => role.id !== roleId));
    addNotification('success', 'Role Deleted', 'Role has been successfully deleted');
  };

  const handleViewPermissions = (role: Role) => {
    setSelectedRole(role);
    setShowPermissionsModal(true);
  };

  const handleSaveRole = () => {
    if (!editingRole) return;

    if (showCreateModal) {
      const newRole = {
        ...editingRole,
        id: `role-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setRoles(prev => [...prev, newRole]);
      addNotification('success', 'Role Created', `${newRole.name} has been created successfully`);
    } else {
      setRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...editingRole, updatedAt: new Date().toISOString() }
          : role
      ));
      addNotification('success', 'Role Updated', `${editingRole.name} has been updated successfully`);
    }

    setShowCreateModal(false);
    setShowEditModal(false);
    setEditingRole(null);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Role data has been updated');
  };

  const getPermissionCount = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.permissions.length : 0;
  };

  const getCategoryCount = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return 0;
    
    const categories = new Set(
      role.permissions.map(permId => 
        permissions.find(p => p.id === permId)?.category
      ).filter(Boolean)
    );
    return categories.size;
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
                <Shield className="w-8 h-8 text-blue-500 mr-3" />
                Roles & Permissions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage user roles and permissions with granular access control
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
                onClick={handleCreateRole}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Role
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Roles</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRoles}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Roles</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.systemRoles}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Custom Roles</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.customRoles}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Permissions</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.totalPermissions}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned Users</p>
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.assignedUsers}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
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
                placeholder="Search roles by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Level Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Levels</option>
                <option value="1">Level 1 (Basic)</option>
                <option value="2">Level 2 (Limited)</option>
                <option value="4">Level 4 (Standard)</option>
                <option value="6">Level 6 (Advanced)</option>
                <option value="7">Level 7 (Manager)</option>
                <option value="8">Level 8 (Admin)</option>
                <option value="10">Level 10 (Super Admin)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            const RoleIcon = getRoleIcon(role.icon);
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${role.color} rounded-lg flex items-center justify-center`}>
                      <RoleIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>{role.name}</span>
                        {role.isSystem && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Level {role.level}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadge(role.level)}`}>
                    Level {role.level}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {role.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Permissions</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {getPermissionCount(role.id)} total
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Categories</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {getCategoryCount(role.id)} areas
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Assigned Users</p>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">{role.userCount} users</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewPermissions(role)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="View Permissions"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditRole(role)}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                      title="Edit Role"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {!role.isSystem && (
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Updated {new Date(role.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No roles found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Create Role Modal */}
        <AnimatePresence>
          {showCreateModal && editingRole && (
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Role</h3>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <CreateRoleForm 
                  role={editingRole} 
                  permissions={permissions}
                  onSubmit={handleSaveRole} 
                  onCancel={() => setShowCreateModal(false)}
                  onUpdateRole={setEditingRole}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Role Modal */}
        <AnimatePresence>
          {showEditModal && editingRole && (
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Role</h3>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <EditRoleForm 
                  role={editingRole} 
                  permissions={permissions}
                  onSubmit={handleSaveRole} 
                  onCancel={() => setShowEditModal(false)}
                  onUpdateRole={setEditingRole}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Permissions Modal */}
        <AnimatePresence>
          {showPermissionsModal && selectedRole && (
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Role Permissions: {selectedRole.name}</h3>
                    <button
                      onClick={() => setShowPermissionsModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <ViewPermissionsForm 
                  role={selectedRole} 
                  permissions={permissions}
                  onClose={() => setShowPermissionsModal(false)} 
                />
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
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
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

// Create Role Form Component
const CreateRoleForm: React.FC<{ 
  role: Role; 
  permissions: Permission[]; 
  onSubmit: () => void; 
  onCancel: () => void; 
  onUpdateRole: (role: Role) => void; 
}> = ({ role, permissions, onSubmit, onCancel, onUpdateRole }) => {
  const [formData, setFormData] = useState({
    name: role.name,
    description: role.description,
    level: role.level,
    permissions: role.permissions,
    color: role.color,
    icon: role.icon
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRole({ ...role, ...formData });
    onSubmit();
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions</label>
        <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <div key={category} className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categoryPermissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{permission.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
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
          Create Role
        </button>
      </div>
    </form>
  );
};

// Edit Role Form Component (reuses CreateRoleForm logic)
const EditRoleForm: React.FC<{ 
  role: Role; 
  permissions: Permission[]; 
  onSubmit: () => void; 
  onCancel: () => void; 
  onUpdateRole: (role: Role) => void; 
}> = ({ role, permissions, onSubmit, onCancel, onUpdateRole }) => {
  const [formData, setFormData] = useState({
    name: role.name,
    description: role.description,
    level: role.level,
    permissions: role.permissions,
    color: role.color,
    icon: role.icon
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRole({ ...role, ...formData, updatedAt: new Date().toISOString() });
    onSubmit();
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(id => id !== permissionId)
    }));
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions</label>
        <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <div key={category} className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categoryPermissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.permissions.includes(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{permission.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
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
          Update Role
        </button>
      </div>
    </form>
  );
};

// View Permissions Form Component
const ViewPermissionsForm: React.FC<{ 
  role: Role; 
  permissions: Permission[]; 
  onClose: () => void; 
}> = ({ role, permissions }) => {
  const rolePermissions = permissions.filter(p => role.permissions.includes(p.id));
  const groupedPermissions = rolePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 ${role.color} rounded-xl flex items-center justify-center`}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{role.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{role.description}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                role.level >= 8 ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                role.level >= 5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                Level {role.level}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{role.userCount} users</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assigned Permissions ({rolePermissions.length})</h3>
        {Object.keys(groupedPermissions).length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
              <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        permission.level === 'admin' ? 'bg-red-500' :
                        permission.level === 'write' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{permission.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{permission.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        permission.level === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                        permission.level === 'write' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {permission.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Permissions Assigned</h3>
            <p className="text-gray-500 dark:text-gray-400">This role doesn't have any permissions assigned yet.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
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

export default RolesPermissions;
