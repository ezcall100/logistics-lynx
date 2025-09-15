import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  Key,
  User,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  TrendingUp,
  Search,
  Filter,
  Download,
  Plus,
  MoreVertical,
} from 'lucide-react';

/**
 * Access Control Page - Security Matrix & Real-time Monitoring
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T18:10:00.000Z
 */

interface AccessRule {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  condition: string;
  effect: 'allow' | 'deny';
  priority: number;
  isActive: boolean;
  lastModified: string;
  modifiedBy: string;
}

interface SecurityEvent {
  id: string;
  type: 'access_denied' | 'suspicious_activity' | 'policy_violation' | 'login_attempt';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  resource: string;
  timestamp: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved';
}

interface UserAccess {
  id: string;
  user: string;
  role: string;
  permissions: string[];
  lastAccess: string;
  ipAddress: string;
  location: string;
  device: string;
  isActive: boolean;
}

export const AccessControlPage: React.FC = () => {
  const [accessRules, setAccessRules] = useState<AccessRule[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [userAccess, setUserAccess] = useState<UserAccess[]>([]);
  const [selectedTab, setSelectedTab] = useState<'rules' | 'events' | 'users'>('rules');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockAccessRules: AccessRule[] = [
      {
        id: '1',
        name: 'Admin Full Access',
        description: 'Full administrative access to all resources',
        resource: '*',
        action: '*',
        condition: 'role:admin',
        effect: 'allow',
        priority: 1,
        isActive: true,
        lastModified: '2025-09-14T10:30:00Z',
        modifiedBy: 'System Admin',
      },
      {
        id: '2',
        name: 'User Read Access',
        description: 'Read-only access to user resources',
        resource: 'users/*',
        action: 'read',
        condition: 'role:user',
        effect: 'allow',
        priority: 2,
        isActive: true,
        lastModified: '2025-09-14T09:15:00Z',
        modifiedBy: 'Security Admin',
      },
      {
        id: '3',
        name: 'Guest Limited Access',
        description: 'Limited access for guest users',
        resource: 'public/*',
        action: 'read',
        condition: 'role:guest',
        effect: 'allow',
        priority: 3,
        isActive: true,
        lastModified: '2025-09-14T08:45:00Z',
        modifiedBy: 'Security Admin',
      },
    ];

    const mockSecurityEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'access_denied',
        severity: 'medium',
        user: 'john.doe@demo.com',
        resource: '/admin/users',
        timestamp: '2025-09-14T12:30:00Z',
        description: 'Unauthorized access attempt to admin panel',
        status: 'investigating',
      },
      {
        id: '2',
        type: 'suspicious_activity',
        severity: 'high',
        user: 'unknown',
        resource: '/api/auth',
        timestamp: '2025-09-14T12:25:00Z',
        description: 'Multiple failed login attempts from same IP',
        status: 'open',
      },
      {
        id: '3',
        type: 'policy_violation',
        severity: 'low',
        user: 'jane.smith@demo.com',
        resource: '/files/confidential',
        timestamp: '2025-09-14T12:20:00Z',
        description: 'Attempted to access restricted file',
        status: 'resolved',
      },
    ];

    const mockUserAccess: UserAccess[] = [
      {
        id: '1',
        user: 'admin@demo.com',
        role: 'Admin',
        permissions: ['read', 'write', 'delete', 'admin'],
        lastAccess: '2025-09-14T12:30:00Z',
        ipAddress: '192.168.1.100',
        location: 'New York, NY',
        device: 'Desktop',
        isActive: true,
      },
      {
        id: '2',
        user: 'user@demo.com',
        role: 'User',
        permissions: ['read', 'write'],
        lastAccess: '2025-09-14T12:25:00Z',
        ipAddress: '192.168.1.101',
        location: 'Los Angeles, CA',
        device: 'Mobile',
        isActive: true,
      },
      {
        id: '3',
        user: 'guest@demo.com',
        role: 'Guest',
        permissions: ['read'],
        lastAccess: '2025-09-14T12:20:00Z',
        ipAddress: '192.168.1.102',
        location: 'Chicago, IL',
        device: 'Tablet',
        isActive: false,
      },
    ];

    setAccessRules(mockAccessRules);
    setSecurityEvents(mockSecurityEvents);
    setUserAccess(mockUserAccess);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'access_denied':
        return <Lock className="w-4 h-4" />;
      case 'suspicious_activity':
        return <AlertTriangle className="w-4 h-4" />;
      case 'policy_violation':
        return <Shield className="w-4 h-4" />;
      case 'login_attempt':
        return <Key className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'investigating':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs: Array<{ id: 'rules' | 'events' | 'users'; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'rules', label: 'Access Rules', icon: Shield },
    { id: 'events', label: 'Security Events', icon: AlertTriangle },
    { id: 'users', label: 'User Access', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Access Control</h1>
            <p className="text-slate-600 dark:text-slate-400">Security matrix and real-time access monitoring</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Rule</span>
            </button>
          </div>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Rules</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{accessRules.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />+2 this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Events</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{securityEvents.length}</p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />+5 today
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {userAccess.filter(u => u.isActive).length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {Math.round((userAccess.filter(u => u.isActive).length / userAccess.length) * 100)}% active
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Blocked Attempts</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {securityEvents.filter(e => e.type === 'access_denied').length}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center mt-1">
                  <Lock className="w-4 h-4 mr-1" />
                  Last 24h
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'rules' && (
              <div className="space-y-4">
                {accessRules.map((rule, index) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${rule.effect === 'allow' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                          {rule.effect === 'allow' ? (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{rule.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{rule.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded">
                              {rule.resource}
                            </span>
                            <span className="text-xs bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 px-2 py-1 rounded">
                              {rule.action}
                            </span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                              Priority: {rule.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rule.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {rule.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'events' && (
              <div className="space-y-4">
                {securityEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{event.description}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            User: {event.user} • Resource: {event.resource}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                              {event.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {new Date(event.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(event.status)}
                        <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                          {event.status}
                        </span>
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'users' && (
              <div className="space-y-4">
                {userAccess.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{user.user}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Role: {user.role} • Device: {user.device}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                              {user.ipAddress}
                            </span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                              {user.location}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Last access: {new Date(user.lastAccess).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControlPage;
