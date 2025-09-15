import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Settings,
  Search,
  Filter,
  Plus,
  RefreshCw,
  BarChart3,
  Activity,
  TrendingUp,
  TrendingDown,
  Globe,
  Network,
  Database,
  User,
  Users,
  FileText,
  Monitor,
} from 'lucide-react';

/**
 * Security Settings - Advanced Security Control Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T18:30:00.000Z
 */

interface SecurityPolicy {
  id: string;
  name: string;
  type: 'authentication' | 'authorization' | 'encryption' | 'network' | 'data' | 'compliance';
  status: 'active' | 'inactive' | 'pending';
  description: string;
  rules: string[];
  lastModified: string;
  modifiedBy: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  compliance: string[];
}

interface SecurityEvent {
  id: string;
  type: 'login_attempt' | 'permission_denied' | 'data_access' | 'system_change' | 'network_scan' | 'malware_detected';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  description: string;
  status: 'investigating' | 'resolved' | 'false_positive';
  riskScore: number;
  source: string;
}

interface SecurityMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

interface SecurityUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  ipAddress: string;
  location: string;
  device: string;
  status: 'active' | 'suspended' | 'locked';
  permissions: string[];
  riskScore: number;
  mfaEnabled: boolean;
  ssoEnabled: boolean;
}

export const SecuritySettings: React.FC = () => {
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [users, setUsers] = useState<SecurityUser[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'policies' | 'events' | 'users' | 'monitoring'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedPolicy, setSelectedPolicy] = useState<SecurityPolicy | null>(null);

  useEffect(() => {
    const mockPolicies: SecurityPolicy[] = [
      {
        id: '1',
        name: 'Multi-Factor Authentication',
        type: 'authentication',
        status: 'active',
        description: 'Enforce MFA for all user accounts',
        rules: ['Require MFA for admin users', 'MFA timeout: 30 minutes', 'Allow backup codes'],
        lastModified: '2025-09-14T10:30:00Z',
        modifiedBy: 'Security Admin',
        severity: 'high',
        compliance: ['SOC2', 'GDPR', 'HIPAA'],
      },
      {
        id: '2',
        name: 'Data Encryption at Rest',
        type: 'encryption',
        status: 'active',
        description: 'Encrypt all sensitive data stored in databases',
        rules: ['AES-256 encryption', 'Key rotation every 90 days', 'Encrypt backups'],
        lastModified: '2025-09-14T09:15:00Z',
        modifiedBy: 'Security Admin',
        severity: 'critical',
        compliance: ['SOC2', 'GDPR', 'HIPAA', 'PCI-DSS'],
      },
      {
        id: '3',
        name: 'Network Access Control',
        type: 'network',
        status: 'active',
        description: 'Control network access based on user roles',
        rules: ['VPN required for remote access', 'IP whitelist for admin access', 'Block suspicious IPs'],
        lastModified: '2025-09-14T08:45:00Z',
        modifiedBy: 'Network Admin',
        severity: 'high',
        compliance: ['SOC2', 'ISO27001'],
      },
      {
        id: '4',
        name: 'Data Loss Prevention',
        type: 'data',
        status: 'pending',
        description: 'Prevent unauthorized data exfiltration',
        rules: ['Monitor file transfers', 'Block sensitive data uploads', 'Audit data access'],
        lastModified: '2025-09-14T07:30:00Z',
        modifiedBy: 'Data Admin',
        severity: 'high',
        compliance: ['GDPR', 'HIPAA'],
      },
    ];

    const mockEvents: SecurityEvent[] = [
      {
        id: '1',
        type: 'login_attempt',
        severity: 'medium',
        user: 'admin@transbotai.com',
        ipAddress: '192.168.1.100',
        location: 'New York, NY',
        timestamp: '2025-09-14T12:30:00Z',
        description: 'Successful login from new IP address',
        status: 'investigating',
        riskScore: 65,
        source: 'Web Portal',
      },
      {
        id: '2',
        type: 'permission_denied',
        severity: 'high',
        user: 'user@transbotai.com',
        ipAddress: '192.168.1.101',
        location: 'Los Angeles, CA',
        timestamp: '2025-09-14T12:25:00Z',
        description: 'Attempted to access admin panel without permission',
        status: 'investigating',
        riskScore: 85,
        source: 'API',
      },
      {
        id: '3',
        type: 'data_access',
        severity: 'low',
        user: 'analyst@transbotai.com',
        ipAddress: '192.168.1.102',
        location: 'Chicago, IL',
        timestamp: '2025-09-14T12:20:00Z',
        description: 'Accessed sensitive customer data',
        status: 'resolved',
        riskScore: 25,
        source: 'Database',
      },
    ];

    const mockMetrics: SecurityMetric[] = [
      { name: 'Active Policies', value: 12, unit: 'policies', trend: 'up', threshold: 20, status: 'normal' },
      { name: 'Security Events (24h)', value: 45, unit: 'events', trend: 'down', threshold: 100, status: 'normal' },
      { name: 'High Risk Users', value: 3, unit: 'users', trend: 'down', threshold: 10, status: 'normal' },
      { name: 'MFA Adoption', value: 95.2, unit: '%', trend: 'up', threshold: 90, status: 'normal' },
      { name: 'Failed Login Attempts', value: 12, unit: 'attempts', trend: 'down', threshold: 50, status: 'normal' },
      { name: 'Data Breach Risk', value: 15.8, unit: '%', trend: 'down', threshold: 25, status: 'normal' },
    ];

    const mockUsers: SecurityUser[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@transbotai.com',
        role: 'Admin',
        lastLogin: '2025-09-14T12:30:00Z',
        ipAddress: '192.168.1.100',
        location: 'New York, NY',
        device: 'Desktop',
        status: 'active',
        permissions: ['read', 'write', 'admin'],
        riskScore: 25,
        mfaEnabled: true,
        ssoEnabled: true,
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@transbotai.com',
        role: 'User',
        lastLogin: '2025-09-14T11:45:00Z',
        ipAddress: '192.168.1.101',
        location: 'Los Angeles, CA',
        device: 'Mobile',
        status: 'active',
        permissions: ['read', 'write'],
        riskScore: 45,
        mfaEnabled: true,
        ssoEnabled: false,
      },
      {
        id: '3',
        name: 'Mike Wilson',
        email: 'mike.wilson@transbotai.com',
        role: 'Guest',
        lastLogin: '2025-09-14T10:15:00Z',
        ipAddress: '192.168.1.102',
        location: 'Chicago, IL',
        device: 'Tablet',
        status: 'suspended',
        permissions: ['read'],
        riskScore: 85,
        mfaEnabled: false,
        ssoEnabled: false,
      },
    ];

    setPolicies(mockPolicies);
    setEvents(mockEvents);
    setMetrics(mockMetrics);
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
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

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

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    if (score >= 60) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  };

  const getPolicyIcon = (type: string) => {
    switch (type) {
      case 'authentication':
        return <Key className="w-5 h-5 text-blue-600" />;
      case 'authorization':
        return <Shield className="w-5 h-5 text-green-600" />;
      case 'encryption':
        return <Lock className="w-5 h-5 text-purple-600" />;
      case 'network':
        return <Network className="w-5 h-5 text-orange-600" />;
      case 'data':
        return <Database className="w-5 h-5 text-red-600" />;
      case 'compliance':
        return <FileText className="w-5 h-5 text-indigo-600" />;
      default:
        return <Shield className="w-5 h-5 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'policies', label: 'Policies', icon: Shield },
    { id: 'events', label: 'Events', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Security Settings</h1>
            <p className="text-slate-600 dark:text-slate-400">Advanced security control and monitoring center</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search security..."
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
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Policy</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Policies</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {policies.filter(p => p.status === 'active').length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {policies.length} total
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
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {events.filter(e => e.status === 'investigating').length}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {events.filter(e => e.severity === 'critical').length} critical
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MFA Adoption</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {metrics.find(m => m.name === 'MFA Adoption')?.value}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +5% this month
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Key className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Risk Score</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(users.reduce((sum, u) => sum + u.riskScore, 0) / users.length)}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  -12% this week
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
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
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Security Policies Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Security Policies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {policies.slice(0, 4).map((policy, index) => (
                        <motion.div
                          key={policy.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                          onClick={() => console.log('Policy clicked:', policy.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              {getPolicyIcon(policy.type)}
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">{policy.name}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{policy.description}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                              {policy.status}
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600 dark:text-slate-400">Severity</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(policy.severity)}`}>
                                {policy.severity}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600 dark:text-slate-400">Compliance</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {policy.compliance.join(', ')}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-600 dark:text-slate-400">Rules</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {policy.rules.length} rules
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Security Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Security Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {metrics.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{metric.name}</h4>
                            <div className="flex items-center space-x-1">
                              {metric.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : metric.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <Activity className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {metric.value} {metric.unit}
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                metric.status === 'critical' ? 'bg-red-500' :
                                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'policies' && (
                <motion.div
                  key="policies"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {policies.map((policy, index) => (
                    <motion.div
                      key={policy.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            {getPolicyIcon(policy.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{policy.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{policy.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {policy.type}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {policy.rules.length} rules
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                Modified: {new Date(policy.lastModified).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                            {policy.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(policy.severity)}`}>
                            {policy.severity}
                          </span>
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{event.description}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {event.user} • {event.ipAddress} • {event.location}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {event.type.replace('_', ' ')}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {event.source}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskScoreColor(event.riskScore)}`}>
                            Risk: {event.riskScore}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.status === 'investigating' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            event.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {users.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{user.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {user.role}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {user.device}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {user.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskScoreColor(user.riskScore)}`}>
                            Risk: {user.riskScore}
                          </span>
                          <div className="flex items-center space-x-1">
                            {user.mfaEnabled && <Key className="w-4 h-4 text-green-500" />}
                            {user.ssoEnabled && <Globe className="w-4 h-4 text-blue-500" />}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Real-time Security Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Security Events</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Real-time security events chart</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Risk Assessment</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Risk assessment dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Compliance Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {['SOC2', 'GDPR', 'HIPAA', 'PCI-DSS'].map((compliance) => (
                        <div key={compliance} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{compliance}</h4>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div className="h-2 rounded-full bg-green-500" style={{ width: '95%' }}></div>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">95% compliant</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
