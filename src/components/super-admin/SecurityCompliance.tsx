import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Key, 
  UserCheck,
  FileText,
  Clock,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Activity,
  Database,
  Globe,
  Server
} from 'lucide-react';

interface SecurityCheck {
  id: string;
  name: string;
  category: 'authentication' | 'authorization' | 'encryption' | 'network' | 'data' | 'compliance';
  status: 'pass' | 'fail' | 'warning' | 'pending';
  description: string;
  lastChecked: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendation?: string;
}

interface ComplianceStandard {
  id: string;
  name: string;
  status: 'compliant' | 'non-compliant' | 'partial' | 'not-assessed';
  score: number;
  lastAudit: string;
  nextAudit: string;
  requirements: number;
  met: number;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'permission' | 'data' | 'system' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  source: string;
  resolved: boolean;
}

const SecurityCompliance: React.FC = () => {
  const [securityChecks, setSecurityChecks] = useState<SecurityCheck[]>([]);
  const [complianceStandards, setComplianceStandards] = useState<ComplianceStandard[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchSecurityData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockSecurityChecks: SecurityCheck[] = [
          {
            id: '1',
            name: 'Password Policy Enforcement',
            category: 'authentication',
            status: 'pass',
            description: 'Strong password requirements are enforced',
            lastChecked: '2024-01-15 10:30',
            severity: 'high',
            recommendation: 'Consider implementing password expiration'
          },
          {
            id: '2',
            name: 'Two-Factor Authentication',
            category: 'authentication',
            status: 'pass',
            description: '2FA is enabled for all admin accounts',
            lastChecked: '2024-01-15 10:30',
            severity: 'high'
          },
          {
            id: '3',
            name: 'SSL/TLS Configuration',
            category: 'encryption',
            status: 'pass',
            description: 'All connections use TLS 1.3',
            lastChecked: '2024-01-15 10:25',
            severity: 'critical'
          },
          {
            id: '4',
            name: 'Database Encryption',
            category: 'encryption',
            status: 'warning',
            description: 'Database is encrypted but backup encryption needs review',
            lastChecked: '2024-01-15 10:20',
            severity: 'medium',
            recommendation: 'Enable encryption for database backups'
          },
          {
            id: '5',
            name: 'API Rate Limiting',
            category: 'network',
            status: 'pass',
            description: 'Rate limiting is properly configured',
            lastChecked: '2024-01-15 10:15',
            severity: 'medium'
          },
          {
            id: '6',
            name: 'Data Retention Policy',
            category: 'data',
            status: 'fail',
            description: 'Data retention policy is not properly implemented',
            lastChecked: '2024-01-15 10:10',
            severity: 'high',
            recommendation: 'Implement automated data retention policies'
          },
          {
            id: '7',
            name: 'Access Logging',
            category: 'authorization',
            status: 'pass',
            description: 'All access attempts are logged',
            lastChecked: '2024-01-15 10:05',
            severity: 'medium'
          },
          {
            id: '8',
            name: 'Session Management',
            category: 'authentication',
            status: 'warning',
            description: 'Session timeout could be more restrictive',
            lastChecked: '2024-01-15 10:00',
            severity: 'medium',
            recommendation: 'Reduce session timeout to 15 minutes'
          }
        ];

        const mockComplianceStandards: ComplianceStandard[] = [
          {
            id: '1',
            name: 'SOC 2 Type II',
            status: 'compliant',
            score: 95,
            lastAudit: '2024-01-01',
            nextAudit: '2024-07-01',
            requirements: 20,
            met: 19
          },
          {
            id: '2',
            name: 'GDPR',
            status: 'compliant',
            score: 88,
            lastAudit: '2023-12-15',
            nextAudit: '2024-06-15',
            requirements: 15,
            met: 13
          },
          {
            id: '3',
            name: 'HIPAA',
            status: 'partial',
            score: 72,
            lastAudit: '2023-11-20',
            nextAudit: '2024-05-20',
            requirements: 12,
            met: 9
          },
          {
            id: '4',
            name: 'PCI DSS',
            status: 'non-compliant',
            score: 45,
            lastAudit: '2023-10-10',
            nextAudit: '2024-04-10',
            requirements: 8,
            met: 4
          }
        ];

        const mockSecurityEvents: SecurityEvent[] = [
          {
            id: '1',
            type: 'login',
            severity: 'medium',
            message: 'Multiple failed login attempts detected',
            timestamp: '2024-01-15 09:45',
            source: '192.168.1.100',
            resolved: true
          },
          {
            id: '2',
            type: 'permission',
            severity: 'high',
            message: 'Unauthorized access attempt to admin panel',
            timestamp: '2024-01-15 08:30',
            source: '10.0.0.50',
            resolved: true
          },
          {
            id: '3',
            type: 'system',
            severity: 'low',
            message: 'Security scan completed successfully',
            timestamp: '2024-01-15 07:00',
            source: 'System',
            resolved: true
          },
          {
            id: '4',
            type: 'data',
            severity: 'critical',
            message: 'Suspicious data access pattern detected',
            timestamp: '2024-01-14 23:15',
            source: 'Database',
            resolved: false
          },
          {
            id: '5',
            type: 'network',
            severity: 'medium',
            message: 'Unusual network traffic detected',
            timestamp: '2024-01-14 22:30',
            source: 'Firewall',
            resolved: true
          }
        ];

        setSecurityChecks(mockSecurityChecks);
        setComplianceStandards(mockComplianceStandards);
        setSecurityEvents(mockSecurityEvents);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching security data:', error);
        setIsLoading(false);
      }
    };

    fetchSecurityData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
      case 'compliant':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'partial':
        return 'text-yellow-600 bg-yellow-100';
      case 'fail':
      case 'non-compliant':
        return 'text-red-600 bg-red-100';
      case 'pending':
      case 'not-assessed':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
      case 'compliant':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'partial':
        return <AlertTriangle className="w-4 h-4" />;
      case 'fail':
      case 'non-compliant':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
      case 'not-assessed':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <UserCheck className="w-4 h-4" />;
      case 'authorization': return <Shield className="w-4 h-4" />;
      case 'encryption': return <Lock className="w-4 h-4" />;
      case 'network': return <Globe className="w-4 h-4" />;
      case 'data': return <Database className="w-4 h-4" />;
      case 'compliance': return <FileText className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'login': return <UserCheck className="w-4 h-4" />;
      case 'permission': return <Shield className="w-4 h-4" />;
      case 'data': return <Database className="w-4 h-4" />;
      case 'system': return <Server className="w-4 h-4" />;
      case 'network': return <Globe className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Loading security data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Compliance</h1>
          <p className="text-gray-600">Monitor security status and compliance standards</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Security Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-green-600">87%</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Status</p>
              <p className="text-2xl font-bold text-blue-600">3/4</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Threats</p>
              <p className="text-2xl font-bold text-red-600">1</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Scan</p>
              <p className="text-2xl font-bold text-gray-600">2h ago</p>
            </div>
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Security Overview' },
            { id: 'compliance', name: 'Compliance' },
            { id: 'events', name: 'Security Events' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Security Checks */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Checks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityChecks.map((check) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(check.category)}
                      <h3 className="font-medium text-gray-900">{check.name}</h3>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                      {getStatusIcon(check.status)}
                      <span className="capitalize">{check.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{check.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Last checked: {check.lastChecked}</span>
                    <span className={`px-2 py-1 rounded-full ${getSeverityColor(check.severity)}`}>
                      {check.severity}
                    </span>
                  </div>
                  
                  {check.recommendation && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                      <strong>Recommendation:</strong> {check.recommendation}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance Standards */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Compliance Standards</h2>
            <div className="space-y-4">
              {complianceStandards.map((standard) => (
                <motion.div
                  key={standard.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{standard.name}</h3>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(standard.status)}`}>
                      {getStatusIcon(standard.status)}
                      <span className="capitalize">{standard.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Score</p>
                      <p className="text-2xl font-bold text-gray-900">{standard.score}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Requirements Met</p>
                      <p className="text-2xl font-bold text-gray-900">{standard.met}/{standard.requirements}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Audit</p>
                      <p className="text-sm text-gray-900">{standard.lastAudit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Next Audit</p>
                      <p className="text-sm text-gray-900">{standard.nextAudit}</p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        standard.score >= 90 ? 'bg-green-500' :
                        standard.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${standard.score}%` }}
                    ></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-6">
          {/* Security Events */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Security Events</h2>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getSeverityColor(event.severity)}`}>
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{event.message}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>Source: {event.source}</span>
                          <span>Time: {event.timestamp}</span>
                          <span className="capitalize">Type: {event.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {event.resolved ? 'Resolved' : 'Open'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityCompliance;