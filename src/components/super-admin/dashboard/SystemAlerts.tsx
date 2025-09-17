import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Clock,
  Server,
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockAlerts = [
  {
    id: 1,
    type: 'error',
    severity: 'critical',
    title: 'Database Connection Timeout',
    message: 'Primary database connection failed after 30 seconds. Fallback to secondary database activated.',
    timestamp: '2024-01-15T10:30:00Z',
    source: 'Database Server',
    status: 'active',
    resolved: false,
    acknowledged: false
  },
  {
    id: 2,
    type: 'warning',
    severity: 'high',
    title: 'High API Usage Detected',
    message: 'API calls are 20% above normal levels. Current rate: 1,250 calls/minute.',
    timestamp: '2024-01-15T10:25:00Z',
    source: 'API Gateway',
    status: 'active',
    resolved: false,
    acknowledged: true
  },
  {
    id: 3,
    type: 'info',
    severity: 'medium',
    title: 'Scheduled Maintenance Window',
    message: 'System maintenance scheduled for tonight from 2:00 AM to 4:00 AM EST.',
    timestamp: '2024-01-15T10:20:00Z',
    source: 'System Admin',
    status: 'scheduled',
    resolved: false,
    acknowledged: true
  },
  {
    id: 4,
    type: 'success',
    severity: 'low',
    title: 'Backup Completed Successfully',
    message: 'Daily backup completed successfully. 2.4GB of data backed up.',
    timestamp: '2024-01-15T10:15:00Z',
    source: 'Backup Service',
    status: 'resolved',
    resolved: true,
    acknowledged: true
  },
  {
    id: 5,
    type: 'warning',
    severity: 'medium',
    title: 'Disk Space Warning',
    message: 'Disk usage on server-01 is at 85%. Consider cleaning up old logs.',
    timestamp: '2024-01-15T10:10:00Z',
    source: 'Server Monitoring',
    status: 'active',
    resolved: false,
    acknowledged: false
  }
];

const SystemAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleAcknowledge = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleResolve = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true, status: 'resolved' } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="h-5 w-5 responsive-container" />;
      case 'warning': return <AlertCircle className="h-5 w-5 responsive-container" />;
      case 'success': return <CheckCircle className="h-5 w-5 responsive-container" />;
      default: return <Info className="h-5 w-5 responsive-container" />;
    }
  };

  const getAlertColor = (type: string, _severity: string) => {
    if (type === 'error') return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    if (type === 'warning') return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    if (type === 'success') return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const activeAlertsCount = alerts.filter(alert => alert.status === 'active').length;
  const criticalAlertsCount = alerts.filter(alert => alert.severity === 'critical' && alert.status === 'active').length;
  const resolvedAlertsCount = alerts.filter(alert => alert.status === 'resolved').length;

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">System Alerts</h1>
          <p className="text-gray-600 dark:text-gray-300 responsive-container">Monitor system alerts and notifications</p>
        </div>
        <div className="flex items-center space-x-2 responsive-container">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">{activeAlertsCount}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg responsive-container">
              <AlertTriangle className="h-6 w-6 text-red-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <Activity className="h-4 w-4 text-red-500 mr-1 responsive-container" />
            <span className="text-sm text-red-600 responsive-container">Requires attention</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Critical Alerts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">{criticalAlertsCount}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg responsive-container">
              <AlertCircle className="h-6 w-6 text-orange-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <TrendingDown className="h-4 w-4 text-orange-500 mr-1 responsive-container" />
            <span className="text-sm text-orange-600 responsive-container">Immediate action needed</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Resolved Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">{resolvedAlertsCount}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
              <CheckCircle className="h-6 w-6 text-green-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container" />
            <span className="text-sm text-green-600 responsive-container">System healthy</span>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container">
        <div className="flex flex-col sm:flex-row gap-4 responsive-container">
          <div className="flex-1 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 responsive-container">
            <Filter className="h-4 w-4 text-gray-400 responsive-container" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4 responsive-container">
        {filteredAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border ${getAlertColor(alert.type, alert.severity)}`}
          >
            <div className="flex items-start justify-between responsive-container">
              <div className="flex items-start space-x-4 responsive-container">
                <div className={`p-2 rounded-lg ${getAlertColor(alert.type, alert.severity)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 responsive-container">
                  <div className="flex items-center space-x-2 mb-2 responsive-container">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 responsive-container">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 responsive-container">
                    <div className="flex items-center space-x-1 responsive-container">
                      <Server className="h-4 w-4 responsive-container" />
                      <span>{alert.source}</span>
                    </div>
                    <div className="flex items-center space-x-1 responsive-container">
                      <Clock className="h-4 w-4 responsive-container" />
                      <span>{formatTimeAgo(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container">
                {!alert.acknowledged && (
                  <button
                    onClick={() = aria-label="Button"> handleAcknowledge(alert.id)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors responsive-container"
                  >
                    Acknowledge
                  </button>
                )}
                {!alert.resolved && (
                  <button
                    onClick={() = aria-label="Button"> handleResolve(alert.id)}
                    className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors responsive-container"
                  >
                    Resolve
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container" aria-label="Button">
                  <Eye className="h-4 w-4 responsive-container" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlerts;
