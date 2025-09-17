import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Download,
  RefreshCw,
  Search,
  Filter,
  Calendar,
  User,
  Globe,
  Lock,
  Unlock,
  Activity,
  FileText,
  Settings,
  Bell,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Server,
  Database,
  Network,
  Key,
  Fingerprint,
  Scan,
  AlertCircle,
  Info,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'failed_login' | 'permission_denied' | 'data_access' | 'system_change' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  user: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  timestamp: string;
  resolved: boolean;
  source: string;
}

interface SecurityMetric {
  id: string;
  name: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
}

interface ComplianceItem {
  id: string;
  name: string;
  status: 'compliant' | 'non_compliant' | 'warning' | 'unknown';
  description: string;
  lastCheck: string;
  requirements: string[];
  evidence: string[];
}

const EnhancedSecurityCenter: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [compliance, setCompliance] = useState<ComplianceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('24h');
  const [expandedEvents, setExpandedEvents] = useState<string[]>([]);
  const [showSensitiveData, setShowSensitiveData] = useState(false);

  // Mock data
  const mockEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'failed_login',
      severity: 'high',
      title: 'Multiple Failed Login Attempts',
      description: 'User attempted to login 5 times with incorrect password',
      user: 'admin@example.com',
      ip: '192.168.1.100',
      location: 'New York, NY, USA',
      device: 'Desktop',
      browser: 'Chrome 120.0',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      resolved: false,
      source: 'Authentication System',
    },
    {
      id: '2',
      type: 'suspicious_activity',
      severity: 'critical',
      title: 'Unusual Data Access Pattern',
      description: 'User accessed 100+ records in 5 minutes from new location',
      user: 'john.doe@company.com',
      ip: '203.0.113.45',
      location: 'Tokyo, Japan',
      device: 'Mobile',
      browser: 'Safari 17.0',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      resolved: false,
      source: 'Access Monitor',
    },
    {
      id: '3',
      type: 'login',
      severity: 'low',
      title: 'Successful Login',
      description: 'User logged in successfully from trusted location',
      user: 'sarah.smith@company.com',
      ip: '192.168.1.50',
      location: 'San Francisco, CA, USA',
      device: 'Desktop',
      browser: 'Firefox 121.0',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      resolved: true,
      source: 'Authentication System',
    },
    {
      id: '4',
      type: 'permission_denied',
      severity: 'medium',
      title: 'Unauthorized Access Attempt',
      description: 'User attempted to access admin panel without permissions',
      user: 'user@company.com',
      ip: '192.168.1.75',
      location: 'Chicago, IL, USA',
      device: 'Desktop',
      browser: 'Chrome 120.0',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      resolved: false,
      source: 'Authorization System',
    },
    {
      id: '5',
      type: 'system_change',
      severity: 'high',
      title: 'System Configuration Modified',
      description: 'Database connection settings were modified',
      user: 'admin@company.com',
      ip: '192.168.1.10',
      location: 'San Francisco, CA, USA',
      device: 'Desktop',
      browser: 'Chrome 120.0',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      resolved: true,
      source: 'System Monitor',
    },
  ];

  const mockMetrics: SecurityMetric[] = [
    {
      id: '1',
      name: 'Security Score',
      value: '92%',
      change: 3.2,
      changeType: 'increase',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Overall security posture score',
    },
    {
      id: '2',
      name: 'Active Threats',
      value: '3',
      change: -1,
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Currently active security threats',
    },
    {
      id: '3',
      name: 'Failed Logins',
      value: '47',
      change: 12.5,
      changeType: 'increase',
      icon: XCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Failed login attempts in last 24h',
    },
    {
      id: '4',
      name: 'Compliance Rate',
      value: '98%',
      change: 0.5,
      changeType: 'increase',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Regulatory compliance percentage',
    },
  ];

  const mockCompliance: ComplianceItem[] = [
    {
      id: '1',
      name: 'GDPR Compliance',
      status: 'compliant',
      description: 'General Data Protection Regulation compliance',
      lastCheck: new Date().toISOString(),
      requirements: ['Data encryption', 'User consent', 'Right to deletion', 'Data portability'],
      evidence: ['Encryption certificates', 'Consent logs', 'Deletion procedures'],
    },
    {
      id: '2',
      name: 'SOC 2 Type II',
      status: 'compliant',
      description: 'Service Organization Control 2 Type II compliance',
      lastCheck: new Date().toISOString(),
      requirements: ['Security controls', 'Availability monitoring', 'Processing integrity', 'Confidentiality'],
      evidence: ['Security policies', 'Monitoring reports', 'Access logs'],
    },
    {
      id: '3',
      name: 'ISO 27001',
      status: 'warning',
      description: 'Information Security Management System',
      lastCheck: new Date().toISOString(),
      requirements: ['Risk assessment', 'Security policies', 'Incident response', 'Continuous improvement'],
      evidence: ['Risk register', 'Policy documents', 'Incident reports'],
    },
    {
      id: '4',
      name: 'HIPAA',
      status: 'non_compliant',
      description: 'Health Insurance Portability and Accountability Act',
      lastCheck: new Date().toISOString(),
      requirements: ['Administrative safeguards', 'Physical safeguards', 'Technical safeguards', 'Breach notification'],
      evidence: ['Safeguard documentation', 'Training records'],
    },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockEvents);
      setMetrics(mockMetrics);
      setCompliance(mockCompliance);
    } catch (error) {
      console.error('Failed to fetch security data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResolveEvent = async (id: string) => {
    try {
      setEvents(prev => prev.map(event => 
        event.id === id ? { ...event, resolved: true } : event
      ));
    } catch (error) {
      console.error('Failed to resolve event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this security event?')) return;

    try {
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ip.includes(searchTerm);
    
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesSeverity = filterSeverity === 'all' || event.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'resolved' && event.resolved) ||
                         (filterStatus === 'active' && !event.resolved);

    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle;
      case 'high': return AlertTriangle;
      case 'medium': return AlertCircle;
      case 'low': return Info;
      default: return Info;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return User;
      case 'logout': return User;
      case 'failed_login': return XCircle;
      case 'permission_denied': return Lock;
      case 'data_access': return Database;
      case 'system_change': return Settings;
      case 'suspicious_activity': return Scan;
      default: return Activity;
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'non_compliant': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'unknown': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle;
      case 'non_compliant': return XCircle;
      case 'warning': return AlertTriangle;
      case 'unknown': return Info;
      default: return Info;
    }
  };

  if (isLoading) {
    return (
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Security Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Monitor security events, threats, and compliance status
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setShowSensitiveData(!showSensitiveData)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {showSensitiveData ? <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <span>{showSensitiveData ? 'Hide' : 'Show'} Sensitive</span>
          </button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.changeType === 'increase' ? 'text-green-600' : 
                  metric.changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.changeType === 'increase' ? (
                    <TrendingUp className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : metric.changeType === 'decrease' ? (
                    <TrendingDown className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : null}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>

              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.name}
                </h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Compliance Status */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          Compliance Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {compliance.map((item) => {
            const ComplianceIcon = getComplianceIcon(item.status);
            
            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <div key={item.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <ComplianceIcon className={`h-5 w-5 ${
                    item.status === 'compliant' ? 'text-green-600' :
                    item.status === 'non_compliant' ? 'text-red-600' :
                    item.status === 'warning' ? 'text-yellow-600' : 'text-gray-600'
                  }`} />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getComplianceColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {item.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  Last check: {new Date(item.lastCheck).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Security Events
          </h2>
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <span className="text-sm text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
              {filteredEvents.length} events
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="lg:col-span-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Types</option>
            <option value="login">Login</option>
            <option value="failed_login">Failed Login</option>
            <option value="permission_denied">Permission Denied</option>
            <option value="suspicious_activity">Suspicious Activity</option>
            <option value="system_change">System Change</option>
          </select>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Events List */}
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {filteredEvents.map((event) => {
            const isExpanded = expandedEvents.includes(event.id);
            const SeverityIcon = getSeverityIcon(event.severity);
            const TypeIcon = getTypeIcon(event.type);
            
            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <div
                key={event.id}
                className={`border rounded-lg p-4 transition-colors ${
                  event.resolved 
                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700' 
                    : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-start space-x-4 flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className={`p-2 rounded-lg ${
                      event.severity === 'critical' ? 'bg-red-100' :
                      event.severity === 'high' ? 'bg-orange-100' :
                      event.severity === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <TypeIcon className={`h-5 w-5 ${
                        event.severity === 'critical' ? 'text-red-600' :
                        event.severity === 'high' ? 'text-orange-600' :
                        event.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-3 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <h3 className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {event.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </span>
                        {event.resolved && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 responsive-container sm:flex-col md:flex-row lg:grid">
                            Resolved
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <User className="h-3 w-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>{showSensitiveData ? event.user : '***@***.com'}</span>
                        </div>
                        <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <Globe className="h-3 w-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>{showSensitiveData ? event.ip : '***.***.***.***'}</span>
                        </div>
                        <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <MapPin className="h-3 w-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <Clock className="h-3 w-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>{new Date(event.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <button
                      onClick={() = aria-label="Button"> toggleEventExpansion(event.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="View Details"
                    >
                      {isExpanded ? <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                    </button>
                    {!event.resolved && (
                      <button
                        onClick={() = aria-label="Button"> handleResolveEvent(event.id)}
                        className="p-1 text-green-600 hover:text-green-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                        title="Resolve Event"
                      >
                        <CheckCircle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    )}
                    <button
                      onClick={() = aria-label="Button"> handleDeleteEvent(event.id)}
                      className="p-1 text-red-600 hover:text-red-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      title="Delete Event"
                    >
                      <XCircle className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            Event Details
                          </h4>
                          <div className="space-y-2 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Source:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">{event.source}</span>
                            </div>
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Device:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">{event.device}</span>
                            </div>
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Browser:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">{event.browser}</span>
                            </div>
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Timestamp:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            User Information
                          </h4>
                          <div className="space-y-2 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">User:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                                {showSensitiveData ? event.user : '***@***.com'}
                              </span>
                            </div>
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">IP Address:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                                {showSensitiveData ? event.ip : '***.***.***.***'}
                              </span>
                            </div>
                            <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                              <span className="text-gray-500 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Location:</span>
                              <span className="text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">{event.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EnhancedSecurityCenter;
