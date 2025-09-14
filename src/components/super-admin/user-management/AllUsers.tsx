import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  UserPlus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Lock,
  Unlock,
  Star,
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ChevronDown,
  X,
} from 'lucide-react';

/**
 * All Users Page - Redesigned
 * Comprehensive user listing with advanced features
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T23:15:00.000Z
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
  verified: boolean;
  twoFactorEnabled: boolean;
  loginCount: number;
  avgSessionTime: string;
}

interface FilterOptions {
  status: string[];
  role: string[];
  company: string[];
  department: string[];
  plan: string[];
  verified: boolean | null;
  twoFactor: boolean | null;
}

export const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    role: [],
    company: [],
    department: [],
    plan: [],
    verified: null,
    twoFactor: null,
  });

  // Mock data
  useEffect(() => {
    const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@demo-company.com`,
      role: ['Admin', 'Manager', 'User', 'Guest'][Math.floor(Math.random() * 4)],
      status: ['active', 'inactive', 'pending', 'suspended'][Math.floor(Math.random() * 4)] as
        | 'active'
        | 'inactive'
        | 'pending'
        | 'suspended',
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      company: `DEMO Company ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
      department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][
        Math.floor(Math.random() * 5)
      ],
      avatar: `https://images.unsplash.com/photo-${1472099645785 + i}?w=40&h=40&fit=crop&crop=face`,
      phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'][
        Math.floor(Math.random() * 5)
      ],
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      plan: ['Enterprise', 'Professional', 'Basic', 'Free'][Math.floor(Math.random() * 4)],
      permissions: ['read', 'write', 'admin'].slice(0, Math.floor(Math.random() * 3) + 1),
      verified: Math.random() > 0.2,
      twoFactorEnabled: Math.random() > 0.5,
      loginCount: Math.floor(Math.random() * 1000),
      avgSessionTime: `${Math.floor(Math.random() * 5)}h ${Math.floor(Math.random() * 60)}m`,
    }));

    setUsers(mockUsers);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'suspended':
        return <Lock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'User':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Guest':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filters.status.length === 0 || filters.status.includes(user.status);
    const matchesRole = filters.role.length === 0 || filters.role.includes(user.role);
    const matchesCompany = filters.company.length === 0 || filters.company.includes(user.company);
    const matchesDepartment =
      filters.department.length === 0 || filters.department.includes(user.department);
    const matchesPlan = filters.plan.length === 0 || filters.plan.includes(user.plan);
    const matchesVerified = filters.verified === null || user.verified === filters.verified;
    const matchesTwoFactor =
      filters.twoFactor === null || user.twoFactorEnabled === filters.twoFactor;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRole &&
      matchesCompany &&
      matchesDepartment &&
      matchesPlan &&
      matchesVerified &&
      matchesTwoFactor
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortBy as keyof User];
    let bValue = b[sortBy as keyof User];

    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();

    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const bulkActions = [
    { label: 'Activate', action: 'activate' },
    { label: 'Deactivate', action: 'deactivate' },
    { label: 'Send Email', action: 'email' },
    { label: 'Export', action: 'export' },
    { label: 'Delete', action: 'delete' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Users</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredUsers.length} users found • {selectedUsers.length} selected
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Add User</span>
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
                placeholder="Search users by name, email, or company..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 border rounded-lg transition-colors flex items-center space-x-2 ${
                showFilters
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {Object.values(filters).some(filter =>
                Array.isArray(filter) ? filter.length > 0 : filter !== null
              ) && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <div className="space-y-2">
                      {['active', 'inactive', 'pending', 'suspended'].map(status => (
                        <label key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.status.includes(status)}
                            onChange={e => {
                              if (e.target.checked) {
                                setFilters(prev => ({ ...prev, status: [...prev.status, status] }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  status: prev.status.filter(s => s !== status),
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Role Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <div className="space-y-2">
                      {['Admin', 'Manager', 'User', 'Guest'].map(role => (
                        <label key={role} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.role.includes(role)}
                            onChange={e => {
                              if (e.target.checked) {
                                setFilters(prev => ({ ...prev, role: [...prev.role, role] }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  role: prev.role.filter(r => r !== role),
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {role}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Plan Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Plan
                    </label>
                    <div className="space-y-2">
                      {['Enterprise', 'Professional', 'Basic', 'Free'].map(plan => (
                        <label key={plan} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.plan.includes(plan)}
                            onChange={e => {
                              if (e.target.checked) {
                                setFilters(prev => ({ ...prev, plan: [...prev.plan, plan] }));
                              } else {
                                setFilters(prev => ({
                                  ...prev,
                                  plan: prev.plan.filter(p => p !== plan),
                                }));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {plan}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() =>
                      setFilters({
                        status: [],
                        role: [],
                        company: [],
                        department: [],
                        plan: [],
                        verified: null,
                        twoFactor: null,
                      })
                    }
                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                {bulkActions.map(action => (
                  <button
                    key={action.action}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedUsers([])}
                  className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Table */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>User</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Role</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                    onClick={() => handleSort('lastLogin')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Last Login</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600"
                    onClick={() => handleSort('company')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Company</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {paginatedUsers.map(user => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.avatar}
                            alt={user.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            {user.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {user.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                      >
                        {getStatusIcon(user.status)}
                        <span className="ml-1 capitalize">{user.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div>{new Date(user.lastLogin).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {user.loginCount} logins
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{user.company}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.department}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">{user.plan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {user.twoFactorEnabled ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <Shield className="w-3 h-3 mr-1" />
                            2FA
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                            <Shield className="w-3 h-3 mr-1" />
                            No 2FA
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Show</span>
            <select
              value={itemsPerPage}
              onChange={e => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-200 dark:border-slate-700 rounded px-2 py-1 text-sm bg-white dark:bg-slate-700"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-700 dark:text-gray-300">per page</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-200 dark:border-slate-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
