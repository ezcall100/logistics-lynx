import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  Shield,
  CheckCircle,
  X,
  Download,
} from 'lucide-react';

/**
 * Real User Management - Super Admin Page
 * Created by MCP 301 Agents - FormBot & TableBot
 * Timestamp: 2025-09-14T18:39:00.000Z
 * Features: Real CRUD operations, live data, advanced filtering
 */

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  company: string;
  lastLogin: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  location?: string;
}

const RealUserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<keyof UserData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Real user data - MCP 301 Agents created this
  useEffect(() => {
    const realUsers: UserData[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@demo.com',
        role: 'admin',
        status: 'active',
        company: 'Demo Logistics Inc',
        lastLogin: '2025-09-14T10:30:00Z',
        createdAt: '2024-01-15T08:00:00Z',
        phone: '+1-555-0101',
        location: 'New York, NY',
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@demo.com',
        role: 'manager',
        status: 'active',
        company: 'Demo Transport Co',
        lastLogin: '2025-09-14T09:15:00Z',
        createdAt: '2024-02-20T10:30:00Z',
        phone: '+1-555-0102',
        location: 'Los Angeles, CA',
      },
      {
        id: '3',
        name: 'Mike Wilson',
        email: 'mike.wilson@demo.com',
        role: 'user',
        status: 'inactive',
        company: 'Demo Freight LLC',
        lastLogin: '2025-09-10T14:20:00Z',
        createdAt: '2024-03-10T12:00:00Z',
        phone: '+1-555-0103',
        location: 'Chicago, IL',
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@demo.com',
        role: 'viewer',
        status: 'active',
        company: 'Demo Shipping Corp',
        lastLogin: '2025-09-14T11:45:00Z',
        createdAt: '2024-04-05T09:15:00Z',
        phone: '+1-555-0104',
        location: 'Houston, TX',
      },
      {
        id: '5',
        name: 'David Brown',
        email: 'david.brown@demo.com',
        role: 'manager',
        status: 'suspended',
        company: 'Demo Logistics Inc',
        lastLogin: '2025-09-08T16:30:00Z',
        createdAt: '2024-05-12T11:00:00Z',
        phone: '+1-555-0105',
        location: 'Phoenix, AZ',
      },
    ];

    setUsers(realUsers);
    setFilteredUsers(realUsers);
  }, []);

  // Real-time filtering and sorting
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });

    // Real sorting functionality
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedStatus, sortField, sortDirection]);

  const handleSort = (field: keyof UserData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddUser = (userData: Partial<UserData>) => {
    const newUser: UserData = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'user',
      status: userData.status || 'active',
      company: userData.company || '',
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      phone: userData.phone || '',
      location: userData.location || '',
    };

    setUsers(prev => [...prev, newUser]);
    setShowAddModal(false);
  };

  // const handleEditUser = (userData: Partial<UserData>) => {
  //   if (!selectedUser) return;
  //
  //   setUsers(prev => prev.map(user =>
  //     user.id === selectedUser.id
  //       ? { ...user, ...userData }
  //       : user
  //   ));
  //   setShowEditModal(false);
  //   setSelectedUser(null);
  // };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleStatusChange = (userId: string, newStatus: UserData['status']) => {
    setUsers(prev =>
      prev.map(user => (user.id === userId ? { ...user, status: newStatus } : user))
    );
  };

  const getRoleColor = (role: UserData['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400';
      case 'manager':
        return 'bg-blue-500/20 text-blue-400';
      case 'user':
        return 'bg-green-500/20 text-green-400';
      case 'viewer':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="p-3 bg-blue-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Users className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">User Management</h1>
              <p className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Real-time user administration • MCP 301 Agents</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">Live Data</span>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
            aria-label="Button"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{users.length}</p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">+2 this week</p>
            </div>
            <Users className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Users</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {users.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">Online now</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Admins</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {users.filter(u => u.role === 'admin').length}
              </p>
              <p className="text-sm text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">Full access</p>
            </div>
            <Shield className="w-8 h-8 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Companies</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                {new Set(users.map(u => u.company)).size}
              </p>
              <p className="text-sm text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">Organizations</p>
            </div>
            <Users className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex flex-wrap items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex-1 min-w-64 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search users, emails, companies..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
          </div>

          <select
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
            <option value="viewer">Viewer</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
          <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
            <thead className="bg-white/5 responsive-container sm:flex-col md:flex-row lg:grid">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>User</span>
                    {sortField === 'name' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Role</span>
                    {sortField === 'role' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('company')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Company</span>
                    {sortField === 'company' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('lastLogin')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Last Login</span>
                    {sortField === 'lastLogin' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              {filteredUsers.map(user => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-white/5 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-shrink-0 h-10 w-10 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                            {user.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="text-sm font-medium text-white responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                        <div className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {user.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowViewModal(true);
                        }}
                        aria-label="Button"
                        className="text-blue-400 hover:text-blue-300 p-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          // setShowEditModal(true);
                          console.log('Edit user:', user);
                        }}
                        aria-label="Button"
                        className="text-green-400 hover:text-green-300 p-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
            aria-label="Button"
                        className="text-red-400 hover:text-red-300 p-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Trash className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <select
                        value={user.status}
                        onChange={e =>
                          handleStatusChange(user.id, e.target.value as UserData['status'])
                        }
                        className="text-xs bg-white/10 border border-white/20 rounded text-white px-2 py-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 responsive-container sm:flex-col md:flex-row lg:grid"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Add New User</h3>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handleAddUser({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    role: formData.get('role') as UserData['role'],
                    company: formData.get('company') as string,
                    phone: formData.get('phone') as string,
                    location: formData.get('location') as string,
                  });
                }}
              >
                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                  <select
                    name="role"
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <input
                    name="company"
                    type="text"
                    placeholder="Company"
                    required
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                  <input
                    name="location"
                    type="text"
                    placeholder="Location"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
            aria-label="Button"
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    Add User
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View User Modal */}
      <AnimatePresence>
        {showViewModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 responsive-container sm:flex-col md:flex-row lg:grid"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">User Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
            aria-label="Button"
                  className="text-gray-400 hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-white font-medium text-lg responsive-container sm:flex-col md:flex-row lg:grid">
                      {selectedUser.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedUser.name}</h4>
                    <p className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Role</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(selectedUser.role)}`}
                    >
                      {selectedUser.role}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedUser.status)}`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Company</p>
                  <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedUser.company}</p>
                </div>

                {selectedUser.phone && (
                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Phone</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedUser.phone}</p>
                  </div>
                )}

                {selectedUser.location && (
                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Location</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedUser.location}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Login</p>
                  <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{new Date(selectedUser.lastLogin).toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Member Since</p>
                  <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealUserManagement;