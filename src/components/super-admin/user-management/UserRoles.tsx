import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Settings,
  Eye,
  XCircle,
  Search,
  Download,
  Crown,
  UserCheck,
  UserX,
  Key,
  Database,
  Globe,
  FileText,
  BarChart3,
  Activity,
  Clock,
  Star,
  Zap,
} from 'lucide-react';

/**
 * User Roles Page - Redesigned
 * Comprehensive role and permission management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T23:15:00.000Z
 */

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'read' | 'write' | 'admin';
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
  icon: string;
  priority: number;
}

interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  category: string;
}

export const UserRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  // const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [roleTemplates] = useState<RoleTemplate[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      category: 'System',
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Management level access with user and content management',
      permissions: ['user.read', 'user.write', 'content.read', 'content.write', 'reports.read'],
      category: 'Management',
    },
    {
      id: 'user',
      name: 'Standard User',
      description: 'Basic user access with limited permissions',
      permissions: ['user.read', 'content.read'],
      category: 'Standard',
    },
    {
      id: 'guest',
      name: 'Guest',
      description: 'Read-only access for external users',
      permissions: ['content.read'],
      category: 'Limited',
    },
  ]);

  // Mock data
  useEffect(() => {
    const mockPermissions: Permission[] = [
      // User Management
      {
        id: 'user.read',
        name: 'View Users',
        description: 'View user profiles and information',
        category: 'User Management',
        level: 'read',
      },
      {
        id: 'user.write',
        name: 'Edit Users',
        description: 'Create, edit, and delete users',
        category: 'User Management',
        level: 'write',
      },
      {
        id: 'user.admin',
        name: 'User Administration',
        description: 'Full user management capabilities',
        category: 'User Management',
        level: 'admin',
      },

      // Content Management
      {
        id: 'content.read',
        name: 'View Content',
        description: 'View all content and documents',
        category: 'Content Management',
        level: 'read',
      },
      {
        id: 'content.write',
        name: 'Edit Content',
        description: 'Create, edit, and delete content',
        category: 'Content Management',
        level: 'write',
      },
      {
        id: 'content.admin',
        name: 'Content Administration',
        description: 'Full content management capabilities',
        category: 'Content Management',
        level: 'admin',
      },

      // System Administration
      {
        id: 'system.read',
        name: 'View System',
        description: 'View system settings and logs',
        category: 'System Administration',
        level: 'read',
      },
      {
        id: 'system.write',
        name: 'Edit System',
        description: 'Modify system settings',
        category: 'System Administration',
        level: 'write',
      },
      {
        id: 'system.admin',
        name: 'System Administration',
        description: 'Full system administration',
        category: 'System Administration',
        level: 'admin',
      },

      // Reports & Analytics
      {
        id: 'reports.read',
        name: 'View Reports',
        description: 'View reports and analytics',
        category: 'Reports & Analytics',
        level: 'read',
      },
      {
        id: 'reports.write',
        name: 'Create Reports',
        description: 'Create and modify reports',
        category: 'Reports & Analytics',
        level: 'write',
      },
      {
        id: 'reports.admin',
        name: 'Report Administration',
        description: 'Full report management',
        category: 'Reports & Analytics',
        level: 'admin',
      },

      // Security
      {
        id: 'security.read',
        name: 'View Security',
        description: 'View security logs and settings',
        category: 'Security',
        level: 'read',
      },
      {
        id: 'security.write',
        name: 'Edit Security',
        description: 'Modify security settings',
        category: 'Security',
        level: 'write',
      },
      {
        id: 'security.admin',
        name: 'Security Administration',
        description: 'Full security management',
        category: 'Security',
        level: 'admin',
      },
    ];

    const mockRoles: Role[] = [
      {
        id: '1',
        name: 'Super Administrator',
        description: 'Full system access with all permissions and capabilities',
        permissions: mockPermissions,
        userCount: 5,
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
        icon: 'Crown',
        priority: 1,
      },
      {
        id: '2',
        name: 'Administrator',
        description: 'Administrative access with most system permissions',
        permissions: mockPermissions.filter(p => p.id !== 'system.admin'),
        userCount: 12,
        isSystem: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
        icon: 'Shield',
        priority: 2,
      },
      {
        id: '3',
        name: 'Manager',
        description: 'Management level access for team leaders',
        permissions: mockPermissions.filter(
          p =>
            p.category === 'User Management' ||
            p.category === 'Content Management' ||
            p.id === 'reports.read'
        ),
        userCount: 45,
        isSystem: false,
        createdAt: '2024-02-15T00:00:00Z',
        updatedAt: '2024-03-20T00:00:00Z',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        icon: 'UserCheck',
        priority: 3,
      },
      {
        id: '4',
        name: 'Standard User',
        description: 'Basic user access with essential permissions',
        permissions: mockPermissions.filter(
          p => p.level === 'read' && p.category !== 'System Administration'
        ),
        userCount: 850,
        isSystem: false,
        createdAt: '2024-02-15T00:00:00Z',
        updatedAt: '2024-02-15T00:00:00Z',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: 'Users',
        priority: 4,
      },
      {
        id: '5',
        name: 'Guest',
        description: 'Limited read-only access for external users',
        permissions: mockPermissions.filter(p => p.id === 'content.read'),
        userCount: 120,
        isSystem: false,
        createdAt: '2024-03-01T00:00:00Z',
        updatedAt: '2024-03-01T00:00:00Z',
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        icon: 'UserX',
        priority: 5,
      },
    ];

    setPermissions(mockPermissions);
    setRoles(mockRoles);
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Crown,
      Shield,
      UserCheck,
      Users,
      UserX,
      Settings,
      Key,
      Database,
      Globe,
      FileText,
      BarChart3,
      Activity,
      Clock,
      Star,
      Zap,
    };
    return icons[iconName] || Users;
  };

  const getPermissionLevelColor = (level: string) => {
    switch (level) {
      case 'read':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'write':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch =
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === 'all' ||
      (filterCategory === 'system' && role.isSystem) ||
      (filterCategory === 'custom' && !role.isSystem);
    return matchesSearch && matchesCategory;
  });

  const permissionCategories = [...new Set(permissions.map(p => p.category))];

  const handleCreateRole = (template?: RoleTemplate) => {
    // Implementation for creating new role
    console.log('Creating role from template:', template);
  };

  const handleEditRole = (role: Role) => {
    // setSelectedRole(role);
    // setShowEditModal(true);
    console.log('Edit role:', role);
  };

  const handleDeleteRole = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(prev => prev.filter(role => role.id !== roleId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Roles</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage user roles and permissions across your organization
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Role</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="all">All Roles</option>
              <option value="system">System Roles</option>
              <option value="custom">Custom Roles</option>
            </select>
          </div>
        </div>

        {/* Role Templates */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Start Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleTemplates.map(template => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => handleCreateRole(template)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {template.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {template.permissions.length} permissions
                  </span>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                    Use Template
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRoles.map(role => {
            const Icon = getIcon(role.icon);
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  {/* Role Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${role.color}`}
                          >
                            {role.isSystem ? 'System' : 'Custom'}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Priority {role.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        title="Edit Role"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {!role.isSystem && (
                        <button
                          onClick={() => handleDeleteRole(role.id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete Role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Role Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {role.description}
                  </p>

                  {/* Role Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {role.userCount}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Users</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {role.permissions.length}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Permissions</div>
                    </div>
                  </div>

                  {/* Permission Categories */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Permission Categories
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {permissionCategories.map(category => {
                        const categoryPermissions = role.permissions.filter(
                          p => p.category === category
                        );
                        if (categoryPermissions.length === 0) return null;
                        return (
                          <span
                            key={category}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            {categoryPermissions.length} {category.split(' ')[0]}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium">
                        Assign Users
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Create Role Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Create New Role
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <XCircle className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Role Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700"
                        placeholder="Enter role name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700"
                        placeholder="Enter role description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Permissions
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {permissionCategories.map(category => (
                          <div
                            key={category}
                            className="border border-gray-200 dark:border-slate-700 rounded-lg p-3"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {category}
                            </h4>
                            <div className="space-y-1">
                              {permissions
                                .filter(p => p.category === category)
                                .map(permission => (
                                  <label
                                    key={permission.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      {permission.name}
                                    </span>
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPermissionLevelColor(permission.level)}`}
                                    >
                                      {permission.level}
                                    </span>
                                  </label>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Create Role
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserRoles;
