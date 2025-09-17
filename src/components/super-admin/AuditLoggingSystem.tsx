import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Search,
  Calendar,
  User,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  RefreshCw,
  Database,
  Shield,
  Key,
  Globe,
  Server,
  X,
} from 'lucide-react';

interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failed' | 'warning' | 'info';
  details: string;
  metadata?: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category:
    | 'authentication'
    | 'authorization'
    | 'data_access'
    | 'system_change'
    | 'security'
    | 'deployment';
}

interface AuditStats {
  totalEvents: number;
  eventsToday: number;
  failedAttempts: number;
  criticalEvents: number;
  topActions: Array<{ action: string; count: number }>;
  topUsers: Array<{ user: string; count: number }>;
}

const AuditLoggingSystem: React.FC = () => {
  const [auditEvents] = useState<AuditEvent[]>([
    {
      id: '1',
      timestamp: '2025-01-17T10:30:00.000Z',
      userId: '1',
      userName: 'Commander',
      action: 'LOGIN_SUCCESS',
      resource: 'Super Admin Portal',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      details: 'Successful login with MFA authentication',
      severity: 'low',
      category: 'authentication',
    },
    {
      id: '2',
      timestamp: '2025-01-17T10:25:00.000Z',
      userId: '1',
      userName: 'Commander',
      action: 'CREATE_USER',
      resource: 'User Management',
      resourceId: 'user_123',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      details: 'Created new user with role: manager',
      severity: 'medium',
      category: 'system_change',
    },
    {
      id: '3',
      timestamp: '2025-01-17T10:20:00.000Z',
      userId: '2',
      userName: 'System Admin',
      action: 'FAILED_LOGIN',
      resource: 'Super Admin Portal',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'failed',
      details: 'Invalid password attempt - account locked after 3 attempts',
      severity: 'high',
      category: 'security',
    },
    {
      id: '4',
      timestamp: '2025-01-17T10:15:00.000Z',
      userId: '1',
      userName: 'Commander',
      action: 'DEPLOYMENT_SUCCESS',
      resource: 'Autonomous Development System',
      ipAddress: '192.168.1.100',
      userAgent: 'MCP-Agent/1.0',
      status: 'success',
      details: 'Successfully deployed 302 MCP agents to production',
      severity: 'medium',
      category: 'deployment',
    },
    {
      id: '5',
      timestamp: '2025-01-17T10:10:00.000Z',
      userId: '3',
      userName: 'Operations Manager',
      action: 'DATA_EXPORT',
      resource: 'Audit Logs',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      status: 'success',
      details: 'Exported audit logs for compliance review',
      severity: 'low',
      category: 'data_access',
    },
  ]);

  const [stats] = useState<AuditStats>({
    totalEvents: 5,
    eventsToday: 5,
    failedAttempts: 1,
    criticalEvents: 0,
    topActions: [
      { action: 'LOGIN_SUCCESS', count: 2 },
      { action: 'CREATE_USER', count: 1 },
      { action: 'FAILED_LOGIN', count: 1 },
      { action: 'DEPLOYMENT_SUCCESS', count: 1 },
    ],
    topUsers: [
      { user: 'Commander', count: 3 },
      { user: 'System Admin', count: 1 },
      { user: 'Operations Manager', count: 1 },
    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      case 'info':
        return <Activity className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication':
        return <Key className="w-4 h-4" />;
      case 'authorization':
        return <Shield className="w-4 h-4" />;
      case 'data_access':
        return <Database className="w-4 h-4" />;
      case 'system_change':
        return <Server className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'deployment':
        return <Globe className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    const matchesSearch =
      event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus;

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
  });

  const exportAuditLogs = () => {
    const csvContent = [
      [
        'Timestamp',
        'User',
        'Action',
        'Resource',
        'IP Address',
        'Status',
        'Severity',
        'Category',
        'Details',
      ],
      ...filteredEvents.map(event => [
        new Date(event.timestamp).toISOString(),
        event.userName,
        event.action,
        event.resource,
        event.ipAddress,
        event.status,
        event.severity,
        event.category,
        event.details,
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comprehensive Audit Logging System</h1>
          <p className="text-gray-600 mt-2">
            Complete audit trail for all system activities with real-time monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={exportAuditLogs}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2 hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
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
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalEvents}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">Events Today</p>
              <p className="text-3xl font-bold text-green-600">{stats.eventsToday}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
              <p className="text-3xl font-bold text-red-600">{stats.failedAttempts}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
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
              <p className="text-sm font-medium text-gray-600">Critical Events</p>
              <p className="text-3xl font-bold text-orange-600">{stats.criticalEvents}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search audit events..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="authentication">Authentication</option>
            <option value="authorization">Authorization</option>
            <option value="data_access">Data Access</option>
            <option value="system_change">System Change</option>
            <option value="security">Security</option>
            <option value="deployment">Deployment</option>
          </select>
          <select
            value={filterSeverity}
            onChange={e => setFilterSeverity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>
      </div>

      {/* Audit Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Resource</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Severity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{event.userName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(event.category)}
                      <span className="text-gray-900">{event.action}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{event.resource}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(event.severity)}`}
                    >
                      {event.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div
                      className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}
                    >
                      {getStatusIcon(event.status)}
                      <span>{event.status.toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="p-2 text-gray-500 hover:text-blue-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Audit Event Details</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Event Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Action:</span>
                      <span className="font-medium">{selectedEvent.action}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resource:</span>
                      <span className="font-medium">{selectedEvent.resource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User:</span>
                      <span className="font-medium">{selectedEvent.userName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timestamp:</span>
                      <span className="font-medium">
                        {new Date(selectedEvent.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Security Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">IP Address:</span>
                      <span className="font-mono">{selectedEvent.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Severity:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(selectedEvent.severity)}`}
                      >
                        {selectedEvent.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <div
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEvent.status)}`}
                      >
                        {getStatusIcon(selectedEvent.status)}
                        <span>{selectedEvent.status.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Details</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedEvent.details}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">User Agent</h4>
                  <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg font-mono">
                    {selectedEvent.userAgent}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AuditLoggingSystem;
