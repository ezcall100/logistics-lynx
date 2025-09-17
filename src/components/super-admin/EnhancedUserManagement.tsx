import React, { useState } from 'react';
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
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
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
    <div className="p-6 space-y-6">
      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Create New User</h3>
            <p className="text-gray-600 mb-4">
              User creation functionality will be implemented here.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">User Details</h3>
            <div className="space-y-2">
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
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Enhanced User Management</h1>
          <p className="text-gray-600 mt-2">
            Complete RBAC system with audit logging and security controls
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button
            onClick={() => setShowAuditModal(true)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg flex items-center space-x-2 hover:bg-gray-700"
          >
            <Activity className="w-4 h-4" />
            <span>Audit Logs</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">MFA Enabled</p>
              <p className="text-3xl font-bold text-purple-600">
                {users.filter(u => u.mfaEnabled).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Audit Events</p>
              <p className="text-3xl font-bold text-orange-600">{auditLogs.length}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterRole}
              onChange={e => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">MFA</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}
                    >
                      {user.role.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(user.lastLogin).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    {user.mfaEnabled ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-gray-500 hover:text-blue-600"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600">
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

      {/* Audit Logs Modal */}
      {showAuditModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAuditModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-6xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Audit Logs</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={exportAuditLogs}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Resource</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {users.find(u => u.id === log.userId)?.name || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{log.action}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{log.resource}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{log.ipAddress}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(log.status)}
                          <span className="text-sm capitalize">{log.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{log.details}</td>
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
