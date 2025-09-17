import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Shield,
  Activity,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Plus,
  Search,
  Download,
  Eye,
  UserCheck,
  X,
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
  mfaEnabled: boolean;
  loginAttempts: number;
}

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  details: string;
  status: 'success' | 'failed' | 'warning';
}

const EnhancedUserManagement: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      email: 'commander@transbot.ai',
      name: 'Commander',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2025-01-17T10:30:00.000Z',
      createdAt: '2025-01-01T00:00:00.000Z',
      permissions: ['all'],
      mfaEnabled: true,
      loginAttempts: 0,
    },
    {
      id: '2',
      email: 'admin@transbot.ai',
      name: 'System Admin',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-17T09:15:00.000Z',
      createdAt: '2025-01-02T00:00:00.000Z',
      permissions: ['users', 'settings', 'logs'],
      mfaEnabled: true,
      loginAttempts: 0,
    },
    {
      id: '3',
      email: 'manager@transbot.ai',
      name: 'Operations Manager',
      role: 'manager',
      status: 'active',
      lastLogin: '2025-01-17T08:45:00.000Z',
      createdAt: '2025-01-03T00:00:00.000Z',
      permissions: ['users', 'reports'],
      mfaEnabled: false,
      loginAttempts: 0,
    },
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      userId: '1',
      action: 'LOGIN',
      resource: 'Super Admin Portal',
      timestamp: '2025-01-17T10:30:00.000Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: 'Successful login with MFA',
      status: 'success',
    },
    {
      id: '2',
      userId: '1',
      action: 'CREATE_USER',
      resource: 'User Management',
      timestamp: '2025-01-17T10:25:00.000Z',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: 'Created new user: manager@transbot.ai',
      status: 'success',
    },
    {
      id: '3',
      userId: '2',
      action: 'FAILED_LOGIN',
      resource: 'Super Admin Portal',
      timestamp: '2025-01-17T09:10:00.000Z',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      details: 'Invalid password attempt',
      status: 'failed',
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-700';
      case 'admin':
        return 'bg-orange-100 text-orange-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'user':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const exportAuditLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Resource', 'IP Address', 'Status', 'Details'],
      ...auditLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        users.find(u => u.id === log.userId)?.name || 'Unknown',
        log.action,
        log.resource,
        log.ipAddress,
        log.status,
        log.details,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Create New User</h3>
            <p className="text-gray-600 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              User creation functionality will be implemented here.
            </p>
            <div className="flex justify-end space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                Cancel
              </button>
              <button
                onClick={() = aria-label="Button"> setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">User Details</h3>
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <p>
                <strong>Status:</strong> {selectedUser.status}
              </p>
            </div>
            <div className="flex justify-end mt-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setSelectedUser(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Enhanced User Management</h1>
          <p className="text-gray-600 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">
            Complete RBAC system with audit logging and security controls
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={() = aria-label="Button"> setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Add User</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setShowAuditModal(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center space-x-2 hover:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Activity className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Audit Logs</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Users className="w-6 h-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Active Users</p>
              <p className="text-3xl font-bold text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <UserCheck className="w-6 h-6 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">MFA Enabled</p>
              <p className="text-3xl font-bold text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid">
                {users.filter(u => u.mfaEnabled).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Shield className="w-6 h-6 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Audit Events</p>
              <p className="text-3xl font-bold text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid">{auditLogs.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Activity className="w-6 h-6 text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex flex-col md:flex-row gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
          </div>
          <div className="flex gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
          <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
            <thead>
              <tr className="border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">MFA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <td className="py-4 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <div className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                      <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {user.mfaEnabled ? (
                      <CheckCircle className="w-5 h-5 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                  </td>
                  <td className="py-4 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button
                        onClick={() = aria-label="Button"> setSelectedUser(user)}
                        className="p-2 text-gray-500 hover:text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs Modal */}
      {showAuditModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={() => setShowAuditModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[80vh] overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xl font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Audit Logs</h3>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={exportAuditLogs}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 hover:bg-green-700 responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() = aria-label="Button"> setShowAuditModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
              <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                <thead>
                  <tr className="border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Resource</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
                      <td className="py-3 px-4 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                        {users.find(u => u.id === log.userId)?.name || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{log.action}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{log.resource}</td>
                      <td className="py-3 px-4 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{log.ipAddress}</td>
                      <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          {getStatusIcon(log.status)}
                          <span className="text-sm capitalize responsive-container sm:flex-col md:flex-row lg:grid">{log.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedUserManagement;
