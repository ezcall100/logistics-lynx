import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Plus,
  Edit,
  Users,
  Lock,
  CheckCircle,
  XCircle,
  Crown,
  Star,
  Eye,
  Copy,
  Download,
  Upload,
} from 'lucide-react';

/**
 * User Roles Page - Interactive Role Management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T18:10:00.000Z
 */

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isEnabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  userCount: number;
  permissions: string[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UserRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const mockRoles: Role[] = [
      {
        id: '1',
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        color: 'purple',
        icon: 'crown',
        userCount: 3,
        permissions: ['all'],
        isDefault: false,
        createdAt: '2024-01-01',
        updatedAt: '2025-09-14',
      },
      {
        id: '2',
        name: 'Admin',
        description: 'Administrative access to most system features',
        color: 'blue',
        icon: 'shield',
        userCount: 12,
        permissions: ['user_management', 'system_settings', 'reports', 'billing'],
        isDefault: false,
        createdAt: '2024-01-15',
        updatedAt: '2025-09-10',
      },
      {
        id: '3',
        name: 'Manager',
        description: 'Team management and reporting capabilities',
        color: 'green',
        icon: 'users',
        userCount: 45,
        permissions: ['user_management', 'reports', 'team_settings'],
        isDefault: false,
        createdAt: '2024-02-01',
        updatedAt: '2025-09-12',
      },
      {
        id: '4',
        name: 'User',
        description: 'Standard user access with basic permissions',
        color: 'gray',
        icon: 'user',
        userCount: 1200,
        permissions: ['basic_access', 'profile_management'],
        isDefault: true,
        createdAt: '2024-01-01',
        updatedAt: '2025-09-14',
      },
    ];

    const mockPermissions: Permission[] = [
      { id: 'all', name: 'All Permissions', description: 'Full system access', category: 'System', isEnabled: false },
      { id: 'user_management', name: 'User Management', description: 'Create, edit, and manage users', category: 'Users', isEnabled: false },
      { id: 'system_settings', name: 'System Settings', description: 'Configure system-wide settings', category: 'System', isEnabled: false },
      { id: 'reports', name: 'Reports & Analytics', description: 'Access to reports and analytics', category: 'Analytics', isEnabled: false },
      { id: 'billing', name: 'Billing Management', description: 'Manage billing and subscriptions', category: 'Finance', isEnabled: false },
      { id: 'team_settings', name: 'Team Settings', description: 'Configure team-specific settings', category: 'Teams', isEnabled: false },
      { id: 'basic_access', name: 'Basic Access', description: 'Standard user functionality', category: 'General', isEnabled: false },
      { id: 'profile_management', name: 'Profile Management', description: 'Manage own profile and settings', category: 'Profile', isEnabled: false },
    ];

    setRoles(mockRoles);
    setPermissions(mockPermissions);
  }, []);

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'crown': return <Crown className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'user': return <Users className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getRoleColor = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'blue': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'gray': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPermissionCategoryColor = (category: string) => {
    switch (category) {
      case 'System': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'Users': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Analytics': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'Finance': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Teams': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'General': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      case 'Profile': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Roles</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{roles.length}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <Shield className="w-3 h-3 mr-1" />Active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />Assigned
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Permissions</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{permissions.length}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1">
                  <Lock className="w-3 h-3 mr-1" />Available
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Default Role</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">User</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center mt-1">
                  <Star className="w-3 h-3 mr-1" />Standard
                </p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search roles..."
                className="w-full pl-4 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-4 h-4" />
              <span>Create Role</span>
            </button>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                selectedRole?.id === role.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedRole(role)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${getRoleColor(role.color)}`}>
                    {getRoleIcon(role.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>{role.name}</span>
                      {role.isDefault && <Star className="w-4 h-4 text-amber-500" />}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{role.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Users</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{role.userCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Permissions</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{role.permissions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(role.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(role.color)}`}>
                    {role.isDefault ? 'Default' : 'Custom'}
                  </span>
                  <div className="flex items-center space-x-1">
                    {role.permissions.includes('all') ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {role.permissions.includes('all') ? 'Full Access' : 'Limited Access'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Role Details Panel */}
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl ${getRoleColor(selectedRole.color)}`}>
                  {getRoleIcon(selectedRole.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{selectedRole.name}</span>
                    {selectedRole.isDefault && <Star className="w-5 h-5 text-amber-500" />}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">{selectedRole.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
                  <Copy className="w-4 h-4" />
                  <span>Duplicate</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Role Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Role Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">User Count</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{selectedRole.userCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Permission Count</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{selectedRole.permissions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Created</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(selectedRole.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(selectedRole.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Permissions</h3>
                <div className="space-y-2">
                  {permissions.map((permission) => {
                    const isEnabled = selectedRole.permissions.includes(permission.id) || selectedRole.permissions.includes('all');
                    return (
                      <div key={permission.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {isEnabled ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-400" />
                          )}
                          <div>
                            <div className="text-sm font-medium text-slate-900 dark:text-white">{permission.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{permission.description}</div>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPermissionCategoryColor(permission.category)}`}>
                          {permission.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserRolesPage;
