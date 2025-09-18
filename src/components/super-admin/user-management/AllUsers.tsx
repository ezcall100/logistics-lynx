import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Search,
  Download,
  RefreshCw,
  Trash2,
  Clock,
  Mail,
  Building,
  Calendar,
  UserCheck,
  UserX,
  AlertTriangle,
  X,
  SortAsc,
  SortDesc,
} from 'lucide-react';
import { superAdminService, User } from '../../../services/supabase/superAdminService';

interface UserFilters {
  role?: string;
  status?: string;
  company?: string;
  search?: string;
}

interface SortConfig {
  field: keyof User;
  direction: 'asc' | 'desc';
}

const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [itemsPerPage] = useState(20);

  const [newUser, setNewUser] = useState<Partial<User>>({
    email: '',
    name: '',
    role: 'viewer',
    company: '',
    status: 'pending',
    permissions: [],
  });

  // Fetch users with pagination and filters
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const result = await superAdminService.getUsers({
        ...filters,
        limit: itemsPerPage,
        offset,
      });

      setUsers(result.users);
      setTotalUsers(result.total);
      setTotalPages(Math.ceil(result.total / itemsPerPage));
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [currentPage, itemsPerPage, filters]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Set up real-time subscription
  useEffect(() => {
    superAdminService.subscribeToUsers((updatedUsers) => {
      setUsers(updatedUsers);
    });

    return (
    ) => {
      superAdminService.unsubscribe('users');
    };
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    // Apply company filter
    if (filters.company) {
      filtered = filtered.filter(user => user.company === filters.company);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.field];
      const bValue = b[sortConfig.field];
      
      if (aValue == null || bValue == null) return 0;
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(filtered);
  }, [users, filters, sortConfig]);

  const handleRefresh = async () => {
    await fetchUsers();
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.name) return;

    try {
      await superAdminService.createUser({
        ...newUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Omit<User, 'id' | 'createdAt' | 'updatedAt'>);
      
      setShowCreateUser(false);
      setNewUser({
        email: '',
        name: '',
        role: 'viewer',
        company: '',
        status: 'pending',
        permissions: [],
      });
      await fetchUsers();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };


  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await superAdminService.deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedUsers.length === 0) return;

    try {
      switch (action) {
        case 'activate':
          await superAdminService.bulkUpdateUsers(selectedUsers, { status: 'active' });
          break;
        case 'deactivate':
          await superAdminService.bulkUpdateUsers(selectedUsers, { status: 'inactive' });
          break;
        case 'delete':
          if (!confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) return;
          await Promise.all(selectedUsers.map(id => superAdminService.deleteUser(id)));
          break;
      }
      setSelectedUsers([]);
      await fetchUsers();
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  const handleSort = (field: keyof User) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'suspended':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return UserCheck;
      case 'inactive':
        return UserX;
      case 'suspended':
        return AlertTriangle;
      case 'pending':
        return Clock;
      default:
        return UserX;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'admin':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'manager':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'user':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'viewer':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  if (isLoading) {
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="p-6 responsive-container">
        <div className="animate-pulse responsive-container">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container"></div>
          <div className="space-y-4 responsive-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container"></div>
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
            All Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container">
          <button
            onClick={handleRefresh}
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
            onClick={() => setShowCreateUser(true)}
            aria-label="Button"
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
          >
            <UserPlus className="h-4 w-4 responsive-container" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container">
                {totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Total Users</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
              <Users className="h-6 w-6 text-blue-600 responsive-container" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <div className="text-2xl font-bold text-green-600 responsive-container">
                {users.filter(u => u.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Active</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container">
              <UserCheck className="h-6 w-6 text-green-600 responsive-container" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <div className="text-2xl font-bold text-yellow-600 responsive-container">
                {users.filter(u => u.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Pending</div>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg responsive-container">
              <Clock className="h-6 w-6 text-yellow-600 responsive-container" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <div className="text-2xl font-bold text-red-600 responsive-container">
                {users.filter(u => u.status === 'suspended').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Suspended</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg responsive-container">
              <UserX className="h-6 w-6 text-red-600 responsive-container" />
            </div>
          </div>
        </motion.div>
        </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search users..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              />
            </div>
            <div className="flex space-x-2 responsive-container">
              <select
                value={filters.role || ''}
                onChange={(e) => setFilters({ ...filters, role: e.target.value || undefined })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              >
                <option value="">All Roles</option>
                <option value="superadmin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
                <option value="viewer">Viewer</option>
              </select>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
                    </div>
                  </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
            Showing {filteredUsers.length} of {totalUsers} users
                    </div>
                  </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center space-x-2 responsive-container">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100 responsive-container">
                {selectedUsers.length} user(s) selected
              </span>
            </div>
              <div className="flex items-center space-x-2 responsive-container">
              <button
                onClick={() => handleBulkAction('activate')}
            aria-label="Button"
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors responsive-container"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
            aria-label="Button"
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors responsive-container"
              >
                Deactivate
              </button>
                  <button
                onClick={() => handleBulkAction('delete')}
            aria-label="Button"
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors responsive-container"
                  >
                Delete
                  </button>
                <button
                  onClick={() => setSelectedUsers([])}
            aria-label="Button"
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors responsive-container"
                >
                Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden responsive-container">
          <div className="overflow-x-auto responsive-container">
            <table className="w-full responsive-container">
            <thead className="bg-gray-50 dark:bg-gray-700 responsive-container">
                <tr>
                  <th className="px-6 py-3 text-left responsive-container">
                    <input
                      type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                    />
                  </th>
                <th className="px-6 py-3 text-left responsive-container">
                  <button
                    onClick={() => handleSort('name')}
            aria-label="Button"
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  >
                    <span>Name</span>
                    {sortConfig.field === 'name' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-3 w-3 responsive-container" /> : <SortDesc className="h-3 w-3 responsive-container" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left responsive-container">
                  <button
                    onClick={() => handleSort('email')}
            aria-label="Button"
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  >
                    <span>Email</span>
                    {sortConfig.field === 'email' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-3 w-3 responsive-container" /> : <SortDesc className="h-3 w-3 responsive-container" />
                    )}
                  </button>
                  </th>
                <th className="px-6 py-3 text-left responsive-container">
                  <button
                    onClick={() => handleSort('role')}
            aria-label="Button"
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  >
                      <span>Role</span>
                    {sortConfig.field === 'role' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-3 w-3 responsive-container" /> : <SortDesc className="h-3 w-3 responsive-container" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left responsive-container">
                  <button
                    onClick={() => handleSort('company')}
            aria-label="Button"
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  >
                    <span>Company</span>
                    {sortConfig.field === 'company' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-3 w-3 responsive-container" /> : <SortDesc className="h-3 w-3 responsive-container" />
                    )}
                  </button>
                  </th>
                <th className="px-6 py-3 text-left responsive-container">
                  <button
                    onClick={() => handleSort('status')}
            aria-label="Button"
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  >
                      <span>Status</span>
                    {sortConfig.field === 'status' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-3 w-3 responsive-container" /> : <SortDesc className="h-3 w-3 responsive-container" />
                    )}
                  </button>
                  </th>
                <th className="px-6 py-3 text-left responsive-container">
                  <button
                    onClick={() => handleSort('lastLogin')}
            aria-label="Button"
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 responsive-container"
                  >
                      <span>Last Login</span>
                    {sortConfig.field === 'lastLogin' && (
                      sortConfig.direction === 'asc' ? <SortAsc className="h-3 w-3 responsive-container" /> : <SortDesc className="h-3 w-3 responsive-container" />
                    )}
                  </button>
                  </th>
                <th className="px-6 py-3 text-right responsive-container">Actions</th>
                </tr>
              </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container">
              {filteredUsers.map((user) => {
                const StatusIcon = getStatusIcon(user.status);
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container"
                  >
                    <td className="px-6 py-4 responsive-container">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                      />
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-3 responsive-container">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm responsive-container">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white responsive-container">
                              {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-500 responsive-container">
                            ID: {user.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <Mail className="h-4 w-4 text-gray-400 responsive-container" />
                        <span className="text-gray-900 dark:text-white responsive-container">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <Building className="h-4 w-4 text-gray-400 responsive-container" />
                        <span className="text-gray-900 dark:text-white responsive-container">{user.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <StatusIcon className="h-4 w-4 responsive-container" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <Calendar className="h-4 w-4 text-gray-400 responsive-container" />
                        <span className="text-gray-900 dark:text-white responsive-container">
                          {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right responsive-container">
                      <div className="flex items-center justify-end space-x-2 responsive-container">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
            aria-label="Button"
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 responsive-container" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              </tbody>
            </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 responsive-container">
            <div className="flex items-center justify-between responsive-container">
              <div className="text-sm text-gray-700 dark:text-gray-300 responsive-container">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalUsers)} of {totalUsers} results
          </div>
          <div className="flex items-center space-x-2 responsive-container">
            <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            aria-label="Button"
              disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container"
            >
              Previous
            </button>
                <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 responsive-container">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            aria-label="Button"
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <AnimatePresence>
        {showCreateUser && (
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
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 responsive-container"
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container">
                  Create New User
                </h3>
                <button
                  onClick={() => setShowCreateUser(false)}
            aria-label="Button"
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container"
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
                    value={newUser.name || ''}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email || ''}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    placeholder="Email address"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 responsive-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Role
                    </label>
                    <select
                      value={newUser.role || 'viewer'}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Status
                    </label>
                    <select
                      value={newUser.status || 'pending'}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value as 'pending' | 'active' | 'inactive' | 'suspended' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newUser.company || ''}
                    onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    placeholder="Company name"
                  />
        </div>
      </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container">
                <button
                  onClick={() => setShowCreateUser(false)}
            aria-label="Button"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
                 aria-label="Button">
                  Create User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllUsers;
}