import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Unlock,
  Eye,
  Key,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  CheckCircle,
  Clock,
  Database,
  BarChart3,
  Activity,
} from 'lucide-react';

/**
 * Access Control Page - Redesigned
 * Comprehensive access control and permission management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:15:00.000Z
 */

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'read' | 'write' | 'admin' | 'deny';
  resource: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AccessRule {
  id: string;
  name: string;
  description: string;
  type: 'allow' | 'deny' | 'conditional';
  conditions: string[];
  permissions: Permission[];
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  appliedTo: {
    users: number;
    roles: number;
    groups: number;
  };
}

interface Resource {
  id: string;
  name: string;
  type: 'api' | 'page' | 'feature' | 'data';
  path: string;
  description: string;
  isProtected: boolean;
  accessLevel: 'public' | 'authenticated' | 'restricted' | 'admin';
  lastAccessed: string;
  accessCount: number;
}

export const AccessControl: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [accessRules, setAccessRules] = useState<AccessRule[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedTab, setSelectedTab] = useState<'permissions' | 'rules' | 'resources' | 'audit'>(
    'permissions'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  // const [showCreateModal, setShowCreateModal] = useState(false);
  // const [selectedItem, setSelectedItem] = useState<Permission | AccessRule | Resource | null>(null);

  // Mock data
  useEffect(() => {
    const mockPermissions: Permission[] = [
      {
        id: '1',
        name: 'View User Profiles',
        description: 'Allow viewing of user profile information',
        category: 'User Management',
        level: 'read',
        resource: '/api/users',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '2',
        name: 'Edit User Data',
        description: 'Allow modification of user information',
        category: 'User Management',
        level: 'write',
        resource: '/api/users',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '3',
        name: 'Delete Users',
        description: 'Allow deletion of user accounts',
        category: 'User Management',
        level: 'admin',
        resource: '/api/users',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: '4',
        name: 'View Analytics',
        description: 'Access to analytics and reporting features',
        category: 'Analytics',
        level: 'read',
        resource: '/analytics',
        isActive: true,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
      },
      {
        id: '5',
        name: 'Export Data',
        description: 'Permission to export data from the system',
        category: 'Data Management',
        level: 'write',
        resource: '/api/export',
        isActive: true,
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z',
      },
    ];

    const mockAccessRules: AccessRule[] = [
      {
        id: '1',
        name: 'Admin Full Access',
        description: 'Full system access for administrators',
        type: 'allow',
        conditions: ['role:admin', 'status:active'],
        permissions: mockPermissions,
        priority: 1,
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        appliedTo: { users: 5, roles: 1, groups: 2 },
      },
      {
        id: '2',
        name: 'Manager Limited Access',
        description: 'Limited access for managers',
        type: 'allow',
        conditions: ['role:manager', 'department:management'],
        permissions: mockPermissions.filter(p => p.level !== 'admin'),
        priority: 2,
        isActive: true,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        appliedTo: { users: 25, roles: 1, groups: 3 },
      },
      {
        id: '3',
        name: 'Guest Read Only',
        description: 'Read-only access for guest users',
        type: 'allow',
        conditions: ['role:guest', 'status:active'],
        permissions: mockPermissions.filter(p => p.level === 'read'),
        priority: 3,
        isActive: true,
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z',
        appliedTo: { users: 120, roles: 1, groups: 1 },
      },
    ];

    const mockResources: Resource[] = [
      {
        id: '1',
        name: 'User Management API',
        type: 'api',
        path: '/api/users',
        description: 'API endpoints for user management operations',
        isProtected: true,
        accessLevel: 'restricted',
        lastAccessed: '2024-03-15T10:30:00Z',
        accessCount: 1250,
      },
      {
        id: '2',
        name: 'Analytics Dashboard',
        type: 'page',
        path: '/analytics',
        description: 'Analytics and reporting dashboard',
        isProtected: true,
        accessLevel: 'authenticated',
        lastAccessed: '2024-03-15T09:15:00Z',
        accessCount: 890,
      },
      {
        id: '3',
        name: 'System Settings',
        type: 'feature',
        path: '/settings',
        description: 'System configuration and settings',
        isProtected: true,
        accessLevel: 'admin',
        lastAccessed: '2024-03-15T08:45:00Z',
        accessCount: 45,
      },
      {
        id: '4',
        name: 'Public Documentation',
        type: 'page',
        path: '/docs',
        description: 'Public documentation and help',
        isProtected: false,
        accessLevel: 'public',
        lastAccessed: '2024-03-15T11:20:00Z',
        accessCount: 2100,
      },
    ];

    setPermissions(mockPermissions);
    setAccessRules(mockAccessRules);
    setResources(mockResources);
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'read':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'write':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'deny':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'allow':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'deny':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'conditional':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'public':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'authenticated':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'restricted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch =
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || permission.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredRules = accessRules.filter(rule => {
    const matchesSearch =
      rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.path.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const tabs = [
    { id: 'permissions', label: 'Permissions', icon: Key, count: permissions.length },
    { id: 'rules', label: 'Access Rules', icon: Shield, count: accessRules.length },
    { id: 'resources', label: 'Resources', icon: Database, count: resources.length },
    { id: 'audit', label: 'Audit Log', icon: Activity, count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        {/* Header */}
        <div className="mb-8 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 responsive-container">
                Access Control
              </h1>
              <p className="text-gray-600 dark:text-gray-400 responsive-container">
                Manage permissions, access rules, and resource security across your system
              </p>
            </div>
            <div className="flex items-center space-x-3 responsive-container">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 responsive-container" aria-label="Button">
                <Download className="w-4 h-4 responsive-container" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 responsive-container" aria-label="Button">
                <Upload className="w-4 h-4 responsive-container" />
                <span>Import</span>
              </button>
              <button
                onClick={() = aria-label="Button"> console.log('Create modal clicked')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 responsive-container"
              >
                <Plus className="w-4 h-4 responsive-container" />
                <span>Add Rule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 responsive-container">
          <div className="border-b border-gray-200 dark:border-slate-700 responsive-container">
            <nav className="-mb-px flex space-x-8 responsive-container">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <button
                    key={tab.id}
                    onClick={() = aria-label="Button">
                      setSelectedTab(tab.id as 'permissions' | 'rules' | 'resources' | 'audit')
                    }
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 responsive-container" />
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs responsive-container">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 responsive-container">
          <div className="flex flex-col lg:flex-row gap-4 responsive-container">
            <div className="relative flex-1 responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search permissions, rules, or resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm responsive-container"
              />
            </div>
            {selectedTab === 'permissions' && (
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 responsive-container"
              >
                <option value="all">All Categories</option>
                <option value="User Management">User Management</option>
                <option value="Analytics">Analytics</option>
                <option value="Data Management">Data Management</option>
                <option value="System Administration">System Administration</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden responsive-container">
          {selectedTab === 'permissions' && (
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
                <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                  {filteredPermissions.map(permission => (
                    <motion.tr
                      key={permission.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                    >
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                            {permission.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                            {permission.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span className="text-sm text-gray-900 dark:text-white responsive-container">
                          {permission.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(permission.level)}`}
                        >
                          {permission.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <code className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded responsive-container">
                          {permission.resource}
                        </code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            permission.isActive
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                          }`}
                        >
                          {permission.isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1 responsive-container" />
                              Active
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1 responsive-container" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                            title="View"
                           aria-label="Button">
                            <Eye className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Edit"
                           aria-label="Button">
                            <Edit className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 responsive-container"
                            title="Delete"
                           aria-label="Button">
                            <Trash2 className="w-4 h-4 responsive-container" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'rules' && (
            <div className="p-6 responsive-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 responsive-container">
                {filteredRules.map(rule => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow responsive-container"
                  >
                    <div className="flex items-start justify-between mb-4 responsive-container">
                      <div className="flex items-center space-x-3 responsive-container">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg responsive-container">
                          <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 responsive-container" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white responsive-container">
                            {rule.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1 responsive-container">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(rule.type)}`}
                            >
                              {rule.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                              Priority {rule.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 responsive-container">
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container"
                          title="Edit"
                         aria-label="Button">
                          <Edit className="w-4 h-4 responsive-container" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 responsive-container"
                          title="Delete"
                         aria-label="Button">
                          <Trash2 className="w-4 h-4 responsive-container" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 responsive-container">
                      {rule.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 mb-4 responsive-container">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg responsive-container">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container">
                          {rule.appliedTo.users}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">Users</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg responsive-container">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container">
                          {rule.appliedTo.roles}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">Roles</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg responsive-container">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container">
                          {rule.appliedTo.groups}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">Groups</div>
                      </div>
                    </div>

                    <div className="mb-4 responsive-container">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 responsive-container">
                        Conditions
                      </h4>
                      <div className="flex flex-wrap gap-1 responsive-container">
                        {rule.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 responsive-container"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium responsive-container" aria-label="Button">
                          View Details
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium responsive-container" aria-label="Button">
                          Test Rule
                        </button>
                      </div>
                      <div className="flex items-center space-x-1 responsive-container">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container" aria-label="Button">
                          <Eye className="w-4 h-4 responsive-container" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 responsive-container" aria-label="Button">
                          <Settings className="w-4 h-4 responsive-container" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'resources' && (
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
                <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Access Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Protection
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                  {filteredResources.map(resource => (
                    <motion.tr
                      key={resource.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                    >
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                            {resource.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                            {resource.description}
                          </div>
                          <code className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded responsive-container">
                            {resource.path}
                          </code>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span className="text-sm text-gray-900 dark:text-white capitalize responsive-container">
                          {resource.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccessLevelColor(resource.accessLevel)}`}
                        >
                          {resource.accessLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            resource.isProtected
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          }`}
                        >
                          {resource.isProtected ? (
                            <>
                              <Lock className="w-3 h-3 mr-1 responsive-container" />
                              Protected
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3 h-3 mr-1 responsive-container" />
                              Public
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {resource.accessCount} accesses
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                          Last: {new Date(resource.lastAccessed).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                            title="View"
                           aria-label="Button">
                            <Eye className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Edit"
                           aria-label="Button">
                            <Edit className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Analytics"
                           aria-label="Button">
                            <BarChart3 className="w-4 h-4 responsive-container" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'audit' && (
            <div className="p-6 responsive-container">
              <div className="text-center py-12 responsive-container">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4 responsive-container" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 responsive-container">
                  Audit Log
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 responsive-container">
                  Access control audit logs and security events will be displayed here.
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                  Enable Audit Logging
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
