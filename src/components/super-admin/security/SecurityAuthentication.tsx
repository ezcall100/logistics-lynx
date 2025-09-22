import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Key,
  Fingerprint,
  Smartphone,
  Lock,
  Eye,
  Settings,
  Plus,
  Search,
  Edit,
  CheckCircle,
  AlertCircle,
  X,
  Clock,
  MoreVertical,
  User,
  Globe,
  Activity,
} from 'lucide-react';

const SecurityAuthentication = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const authMethods = [
    {
      id: 'auth-001',
      name: 'Multi-Factor Authentication (MFA)',
      description: 'Two-factor authentication using SMS, email, or authenticator apps',
      type: 'MFA',
      status: 'enabled',
      users: 245,
      coverage: 98,
      lastUsed: '2 minutes ago',
      securityLevel: 'High',
      provider: 'Google Authenticator',
    },
    {
      id: 'auth-002',
      name: 'Single Sign-On (SSO)',
      description: 'Centralized authentication using SAML/OAuth providers',
      type: 'SSO',
      status: 'enabled',
      users: 250,
      coverage: 100,
      lastUsed: '1 minute ago',
      securityLevel: 'High',
      provider: 'Azure AD',
    },
    {
      id: 'auth-003',
      name: 'Password Authentication',
      description: 'Traditional username and password authentication',
      type: 'Password',
      status: 'enabled',
      users: 250,
      coverage: 100,
      lastUsed: '30 seconds ago',
      securityLevel: 'Medium',
      provider: 'Internal',
    },
    {
      id: 'auth-004',
      name: 'Biometric Authentication',
      description: 'Fingerprint and facial recognition authentication',
      type: 'Biometric',
      status: 'enabled',
      users: 180,
      coverage: 72,
      lastUsed: '5 minutes ago',
      securityLevel: 'High',
      provider: 'Device Native',
    },
    {
      id: 'auth-005',
      name: 'Hardware Tokens',
      description: 'Physical security keys for authentication',
      type: 'Hardware',
      status: 'disabled',
      users: 25,
      coverage: 10,
      lastUsed: '1 hour ago',
      securityLevel: 'Very High',
      provider: 'YubiKey',
    },
  ];

  const authSessions = [
    {
      id: 'session-001',
      user: 'john.doe@company.com',
      method: 'MFA',
      device: 'Chrome on Windows',
      location: 'New York, US',
      ipAddress: '192.168.1.100',
      status: 'active',
      loginTime: '2 hours ago',
      lastActivity: '2 minutes ago',
      expiresIn: '6 hours',
    },
    {
      id: 'session-002',
      user: 'jane.smith@company.com',
      method: 'SSO',
      device: 'Safari on macOS',
      location: 'London, UK',
      ipAddress: '10.0.0.50',
      status: 'active',
      loginTime: '1 hour ago',
      lastActivity: '5 minutes ago',
      expiresIn: '7 hours',
    },
    {
      id: 'session-003',
      user: 'mike.johnson@company.com',
      method: 'Password',
      device: 'Firefox on Linux',
      location: 'Tokyo, Japan',
      ipAddress: '172.16.0.25',
      status: 'expired',
      loginTime: '8 hours ago',
      lastActivity: '2 hours ago',
      expiresIn: 'Expired',
    },
    {
      id: 'session-004',
      user: 'sarah.wilson@company.com',
      method: 'Biometric',
      device: 'Chrome on Android',
      location: 'San Francisco, US',
      ipAddress: '203.0.113.10',
      status: 'active',
      loginTime: '30 minutes ago',
      lastActivity: '1 minute ago',
      expiresIn: '7.5 hours',
    },
    {
      id: 'session-005',
      user: 'alex.brown@company.com',
      method: 'Hardware',
      device: 'Edge on Windows',
      location: 'Berlin, Germany',
      ipAddress: '198.51.100.5',
      status: 'suspicious',
      loginTime: '15 minutes ago',
      lastActivity: '10 minutes ago',
      expiresIn: '7.75 hours',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled':
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'disabled':
      case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'suspicious': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enabled':
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'disabled':
      case 'expired': return <X className="w-4 h-4" />;
      case 'suspicious': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'High': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'MFA': return <Smartphone className="w-5 h-5" />;
      case 'SSO': return <Globe className="w-5 h-5" />;
      case 'Password': return <Key className="w-5 h-5" />;
      case 'Biometric': return <Fingerprint className="w-5 h-5" />;
      case 'Hardware': return <Shield className="w-5 h-5" />;
      default: return <Lock className="w-5 h-5" />;
    }
  };

  const filteredMethods = authMethods.filter(method => {
    const matchesSearch = method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         method.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || method.type === filterType;
    const matchesStatus = filterStatus === 'all' || method.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Authentication</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage authentication methods and sessions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Settings className="w-4 h-4 mr-2 inline" />
            Settings
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Method
          </button>
        </div>
      </div>

      {/* Authentication Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Sessions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{authSessions.filter(s => s.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MFA Enabled</p>
              <p className="text-2xl font-bold text-blue-600">{authMethods.find(m => m.type === 'MFA')?.users || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Smartphone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">SSO Users</p>
              <p className="text-2xl font-bold text-purple-600">{authMethods.find(m => m.type === 'SSO')?.users || 0}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Score</p>
              <p className="text-2xl font-bold text-orange-600">94%</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authentication Methods</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search methods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="MFA">MFA</option>
              <option value="SSO">SSO</option>
              <option value="Password">Password</option>
              <option value="Biometric">Biometric</option>
              <option value="Hardware">Hardware</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    {getMethodIcon(method.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{method.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(method.status)}`}>
                  {getStatusIcon(method.status)}
                  <span className="ml-1 capitalize">{method.status}</span>
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Type</span>
                  <span className="text-gray-900 dark:text-white">{method.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Users</span>
                  <span className="text-gray-900 dark:text-white">{method.users}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Coverage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${method.coverage}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{method.coverage}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Security Level</span>
                  <span className={`px-2 py-1 rounded text-xs ${getSecurityLevelColor(method.securityLevel)}`}>
                    {method.securityLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Provider</span>
                  <span className="text-gray-900 dark:text-white">{method.provider}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Used</span>
                  <span className="text-gray-900 dark:text-white">{method.lastUsed}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {method.status === 'enabled' ? 'Active' : 'Inactive'}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {authSessions.map((session, index) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{session.user}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{session.ipAddress}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(session.method)}
                      <span className="text-sm text-gray-900 dark:text-white">{session.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {session.device}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {session.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                      {getStatusIcon(session.status)}
                      <span className="ml-1 capitalize">{session.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {session.lastActivity}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuthentication;
