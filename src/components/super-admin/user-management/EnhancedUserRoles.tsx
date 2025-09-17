import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  RefreshCw,
  Download,
  Users,
  Lock,
  Unlock,
  Eye,
  MoreVertical,
  X,
  Check,
  AlertTriangle,
  Settings,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  color: string;
  bgColor: string;
}

interface Permission {
  id: string;
  name: string;
  category: string;
  description: string;
}

const EnhancedUserRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState<string | null>(null);
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);

  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: [],
    isSystem: false,
    color: 'blue',
    bgColor: 'bg-blue-50',
  });

  // Mock data
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['*'],
      userCount: 3,
      isSystem: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access to most system features',
      permissions: ['users:manage', 'system:config', 'reports:view', 'analytics:access'],
      userCount: 12,
      isSystem: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Management access to team and project features',
      permissions: ['users:view', 'reports:view', 'analytics:access', 'projects:manage'],
      userCount: 45,
      isSystem: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: '4',
      name: 'User',
      description: 'Standard user access to basic features',
      permissions: ['profile:manage', 'basic:access'],
      userCount: 15689,
      isSystem: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const mockPermissions: Permission[] = [
    { id: 'users:read', name: 'View Users', category: 'Users', description: 'View user accounts and profiles' },
    { id: 'users:write', name: 'Edit Users', category: 'Users', description: 'Create and modify user accounts' },
    { id: 'users:manage', name: 'Manage Users', category: 'Users', description: 'Full user management capabilities' },
    { id: 'system:config', name: 'System Configuration', category: 'System', description: 'Configure system settings' },
    { id: 'reports:view', name: 'View Reports', category: 'Reports', description: 'Access to system reports' },
    { id: 'analytics:access', name: 'Analytics Access', category: 'Analytics', description: 'Access to analytics dashboard' },
    { id: 'projects:manage', name: 'Manage Projects', category: 'Projects', description: 'Create and manage projects' },
    { id: 'profile:manage', name: 'Manage Profile', category: 'Profile', description: 'Manage own profile' },
    { id: 'basic:access', name: 'Basic Access', category: 'General', description: 'Basic system access' },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRoles(mockRoles);
      setPermissions(mockPermissions);
    } catch (error) {
      console.error('Failed to fetch roles and permissions:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateRole = async () => {
    if (!newRole.name || !newRole.description) return;

    try {
      const role: Role = {
        id: Date.now().toString(),
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions || [],
        userCount: 0,
        isSystem: newRole.isSystem || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: newRole.color || 'text-blue-600',
        bgColor: newRole.bgColor || 'bg-blue-50',
      };

      setRoles(prev => [...prev, role]);
      setShowCreateRole(false);
      setNewRole({
        name: '',
        description: '',
        permissions: [],
        isSystem: false,
        color: 'blue',
        bgColor: 'bg-blue-50',
      });
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };

  const handleUpdateRole = async (id: string, updates: Partial<Role>) => {
    try {
      setRoles(prev => prev.map(role => 
        role.id === id ? { ...role, ...updates, updatedAt: new Date().toISOString() } : role
      ));
      setShowEditRole(null);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleDeleteRole = async (id: string) => {
    const role = roles.find(r => r.id === id);
    if (role?.isSystem) {
      alert('Cannot delete system roles');
      return;
    }

    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      setRoles(prev => prev.filter(role => role.id !== id));
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const toggleRoleExpansion = (roleId: string) => {
    setExpandedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPermissionCategory = (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    return permission?.category || 'Unknown';
  };

  if (isLoading) {
    return (
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            User Roles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Manage user roles and permissions across the system
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setShowCreateRole(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Add Role</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          />
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {filteredRoles.map((role, index) => {
          const isExpanded = expandedRoles.includes(role.id);
          
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-lg ${role.bgColor}`}>
                  <Shield className={`h-6 w-6 ${role.color}`} />
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {role.isSystem && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                      System
                    </span>
                  )}
                  <button
                    onClick={() = aria-label="Button"> toggleRoleExpansion(role.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    {isExpanded ? <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <MoreVertical className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {role.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {role.description}
                </p>
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Users className="h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="text-sm text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      {role.userCount} users
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                    {role.permissions.length} permissions
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {!role.isSystem && (
                    <button
                      onClick={() = aria-label="Button"> setShowEditRole(role.id)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Edit Role"
                    >
                      <Edit className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  )}
                  {!role.isSystem && (
                    <button
                      onClick={() = aria-label="Button"> handleDeleteRole(role.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Delete Role"
                    >
                      <Trash2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() = aria-label="Button"> toggleRoleExpansion(role.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  {isExpanded ? 'Hide Details' : 'View Details'}
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                        Permissions
                      </h4>
                      <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        {role.permissions.map((permission) => (
                          <div key={permission} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded responsive-container sm:flex-col md:flex-row lg:grid">
                            <div>
                              <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                                {permission}
                              </span>
                              <p className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                                {getPermissionCategory(permission)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                        Last updated: {new Date(role.updatedAt).toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Create Role Modal */}
      <AnimatePresence>
        {showCreateRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Create New Role
                </h3>
                <button
                  onClick={() = aria-label="Button"> setShowCreateRole(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Role Name *
                  </label>
                  <input
                    type="text"
                    value={newRole.name || ''}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter role name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Description *
                  </label>
                  <textarea
                    value={newRole.description || ''}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    rows={3}
                    placeholder="Enter role description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    Permissions
                  </label>
                  <div className="space-y-3 max-h-60 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <input
                          type="checkbox"
                          checked={newRole.permissions?.includes(permission.id) || false}
                          onChange={(e) => {
                            const currentPermissions = newRole.permissions || [];
                            if (e.target.checked) {
                              setNewRole({ ...newRole, permissions: [...currentPermissions, permission.id] });
                            } else {
                              setNewRole({ ...newRole, permissions: currentPermissions.filter(p => p !== permission.id) });
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                        />
                        <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {permission.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                            {permission.description}
                          </div>
                        </div>
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded responsive-container sm:flex-col md:flex-row lg:grid">
                          {permission.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() = aria-label="Button"> setShowCreateRole(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  Create Role
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedUserRoles;
