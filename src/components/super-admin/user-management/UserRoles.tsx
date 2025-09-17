import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Trash2,
  X,
  Lock,
  Search,
  RefreshCw,
  Download,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  userCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  resource: string;
  action: string;
}

const UserRoles: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: [],
    isSystem: false,
  });

  // Mock permissions data
  const mockPermissions: Permission[] = [
    { id: '1', name: 'View Users', description: 'View user list and details', category: 'Users', resource: 'users', action: 'read' },
    { id: '2', name: 'Create Users', description: 'Create new user accounts', category: 'Users', resource: 'users', action: 'create' },
    { id: '3', name: 'Edit Users', description: 'Edit user information', category: 'Users', resource: 'users', action: 'update' },
    { id: '4', name: 'Delete Users', description: 'Delete user accounts', category: 'Users', resource: 'users', action: 'delete' },
    { id: '5', name: 'View Companies', description: 'View company information', category: 'Companies', resource: 'companies', action: 'read' },
    { id: '6', name: 'Manage Companies', description: 'Create and edit companies', category: 'Companies', resource: 'companies', action: 'manage' },
    { id: '7', name: 'View Analytics', description: 'View analytics and reports', category: 'Analytics', resource: 'analytics', action: 'read' },
    { id: '8', name: 'Export Data', description: 'Export data and reports', category: 'Analytics', resource: 'analytics', action: 'export' },
    { id: '9', name: 'System Settings', description: 'Access system settings', category: 'System', resource: 'system', action: 'manage' },
    { id: '10', name: 'Security Settings', description: 'Manage security policies', category: 'Security', resource: 'security', action: 'manage' },
  ];

  // Mock roles data
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: mockPermissions.map(p => p.id),
      isSystem: true,
      userCount: 2,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access to most system features',
      permissions: ['1', '2', '3', '5', '6', '7', '8'],
      isSystem: true,
      userCount: 5,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Management access to team and company features',
      permissions: ['1', '5', '7'],
      isSystem: true,
      userCount: 12,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '4',
      name: 'User',
      description: 'Standard user access to assigned features',
      permissions: ['1', '7'],
        isSystem: true,
      userCount: 45,
        createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '5',
      name: 'Viewer',
      description: 'Read-only access to assigned features',
      permissions: ['1', '7'],
      isSystem: true,
      userCount: 23,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
  ];

  // Fetch roles and permissions
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
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
        permissions: selectedPermissions,
        isSystem: false,
        userCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setRoles(prev => [...prev, role]);
      setShowCreateRole(false);
      setNewRole({ name: '', description: '', permissions: [], isSystem: false });
      setSelectedPermissions([]);
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };


  const handleDeleteRole = async (id: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      setRoles(prev => prev.filter(role => role.id !== id));
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getPermissionCategory = (category: string) => {
    switch (category) {
      case 'Users':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Companies':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Analytics':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'System':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'Security':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPermissions = permissions.filter(permission =>
    !filterCategory || permission.category === filterCategory
  );

  const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  if (isLoading) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="p-6 responsive-container">
        <div className="animate-pulse responsive-container">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container"></div>
          <div className="space-y-4 responsive-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container">
            <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container">
            User Roles
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container">
            Manage user roles and permissions
              </p>
            </div>
        <div className="flex items-center space-x-4 responsive-container">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
            <Download className="h-4 w-4 responsive-container" />
                <span>Export</span>
              </button>
              <button
            onClick={() = aria-label="Button"> setShowCreateRole(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
              >
            <Plus className="h-4 w-4 responsive-container" />
            <span>Add Role</span>
              </button>
          </div>
        </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 responsive-container">
            <div className="relative flex-1 responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              />
            </div>
            <select
              value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
          >
            <option value="">All Categories</option>
            <option value="Users">Users</option>
            <option value="Companies">Companies</option>
            <option value="Analytics">Analytics</option>
            <option value="System">System</option>
            <option value="Security">Security</option>
            </select>
          </div>
        </div>

        {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container">
        {filteredRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow responsive-container"
              >
            <div className="flex items-center justify-between mb-4 responsive-container">
                    <div className="flex items-center space-x-3 responsive-container">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
                  <Shield className="h-6 w-6 text-blue-600 responsive-container" />
                      </div>
                      <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white responsive-container">
                    {role.name}
                  </h3>
                  <div className="flex items-center space-x-2 responsive-container">
                    <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                      {role.userCount} users
                          </span>
                    {role.isSystem && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full responsive-container">
                        System
                          </span>
                    )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 responsive-container">
                      {!role.isSystem && (
                  <>
                        <button
                          onClick={() = aria-label="Button"> handleDeleteRole(role.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container"
                      title="Delete"
                        >
                      <Trash2 className="h-4 w-4 responsive-container" />
                        </button>
                  </>
                )}
                {role.isSystem && (
                  <div className="p-1 responsive-container" title="System Role">
                    <Lock className="h-4 w-4 text-gray-400 responsive-container" />
                  </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 responsive-container">
                    {role.description}
                  </p>

            <div className="space-y-2 responsive-container">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                Permissions ({role.permissions.length})
                  </div>
                    <div className="flex flex-wrap gap-1 responsive-container">
                {role.permissions.slice(0, 3).map(permissionId => {
                  const permission = permissions.find(p => p.id === permissionId);
                  return permission ? (
                          <span
                      key={permissionId}
                      className={`px-2 py-1 text-xs rounded-full ${getPermissionCategory(permission.category)}`}
                          >
                      {permission.name}
                          </span>
                  ) : null;
                })}
                {role.permissions.length > 3 && (
                  <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400 responsive-container">
                    +{role.permissions.length - 3} more
                  </span>
                )}
                  </div>
                </div>
              </motion.div>
        ))}
        </div>

        {/* Create Role Modal */}
        <AnimatePresence>
        {showCreateRole && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
            >
              <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto responsive-container"
            >
                  <div className="flex items-center justify-between mb-6 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container">
                      Create New Role
                </h3>
                    <button
                  onClick={() = aria-label="Button"> setShowCreateRole(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container"
                    >
                  <X className="h-5 w-5 responsive-container" />
                    </button>
                  </div>

              <div className="space-y-6 responsive-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                        Role Name
                      </label>
                      <input
                        type="text"
                      value={newRole.name || ''}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                        placeholder="Enter role name"
                      />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                        Description
                      </label>
                    <input
                      type="text"
                      value={newRole.description || ''}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                        placeholder="Enter role description"
                      />
                  </div>
                    </div>

                    <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 responsive-container">
                        Permissions
                      </label>
                  <div className="space-y-4 responsive-container">
                    {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                      <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 responsive-container">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3 responsive-container">
                              {category}
                            </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 responsive-container">
                          {categoryPermissions.map(permission => (
                                  <label
                                    key={permission.id}
                              className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer responsive-container"
                                  >
                                    <input
                                      type="checkbox"
                                checked={selectedPermissions.includes(permission.id)}
                                onChange={() => handlePermissionToggle(permission.id)}
                                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                                    />
                              <div className="flex-1 responsive-container">
                                <div className="font-medium text-gray-900 dark:text-white text-sm responsive-container">
                                      {permission.name}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 responsive-container">
                                  {permission.description}
                                </div>
                              </div>
                                  </label>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container">
                    <button
                  onClick={() = aria-label="Button"> setShowCreateRole(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container"
                    >
                      Cancel
                    </button>
                <button
                  onClick={handleCreateRole}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
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

export default UserRoles;