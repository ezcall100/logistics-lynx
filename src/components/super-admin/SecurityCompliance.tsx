import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  Search,
  Filter,
  Download,
  MoreVertical,
  RefreshCw,
  Settings,
  Info,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { formatNumber, formatRelativeTime } from '../../lib/utils';

interface SecurityEvent {
  id: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: number;
  userName?: string;
  companyId?: number;
  companyName?: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, unknown>;
  resolved: boolean;
  resolvedAt?: string;
  resolvedBy?: string;
  createdAt: string;
}

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  lastCheck: string;
  nextCheck: string;
  details: string;
  requirements: string[];
}

interface SecurityMetrics {
  totalEvents: number;
  criticalEvents: number;
  resolvedEvents: number;
  activeThreats: number;
  complianceScore: number;
  lastScan: string;
}

interface ThreatIntelligence {
  id: number;
  type: string;
  source: string;
  severity: string;
  description: string;
  indicators: string[];
  firstSeen: string;
  lastSeen: string;
  status: 'active' | 'investigating' | 'resolved' | 'false_positive';
}

const SecurityCompliance: React.FC = () => {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([]);
  const [, setThreatIntelligence] = useState<ThreatIntelligence[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalEvents: 0,
    resolvedEvents: 0,
    activeThreats: 0,
    complianceScore: 0,
    lastScan: '',
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [, setLoading] = useState(false);

  const complianceCategories = [
    'GDPR',
    'SOC2',
    'ISO27001',
    'HIPAA',
    'PCI-DSS',
    'CCPA',
    'NIST',
    'COBIT',
  ];

  // Mock data initialization
  useEffect(() => {
    const mockSecurityEvents: SecurityEvent[] = [
      {
        id: 1,
        type: 'failed_login',
        severity: 'medium',
        description: 'Multiple failed login attempts detected',
        userId: 2,
        userName: 'John Smith',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        details: {
          attempts: 5,
          timeframe: '10 minutes',
          location: 'New York, NY',
        },
        resolved: false,
        createdAt: '2024-01-15T10:30:00Z',
      },
      {
        id: 2,
        type: 'suspicious_activity',
        severity: 'high',
        description: 'Unusual API usage pattern detected',
        userId: 3,
        userName: 'Sarah Johnson',
        companyId: 2,
        companyName: 'Swift Transport Ltd',
        ipAddress: '10.0.0.50',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        details: {
          api_calls: 1000,
          timeframe: '1 hour',
          endpoint: '/api/loads',
        },
        resolved: true,
        resolvedAt: '2024-01-15T11:00:00Z',
        resolvedBy: 'Security Admin',
        createdAt: '2024-01-15T10:00:00Z',
      },
      {
        id: 3,
        type: 'data_breach',
        severity: 'critical',
        description: 'Potential data breach attempt detected',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        ipAddress: '203.0.113.42',
        userAgent: 'curl/7.68.0',
        details: {
          target: 'customer_database',
          method: 'sql_injection',
          blocked: true,
        },
        resolved: true,
        resolvedAt: '2024-01-15T09:45:00Z',
        resolvedBy: 'Security Admin',
        createdAt: '2024-01-15T09:30:00Z',
      },
      {
        id: 4,
        type: 'malware_detected',
        severity: 'high',
        description: 'Malware signature detected in uploaded file',
        userId: 4,
        userName: 'Mike Davis',
        companyId: 3,
        companyName: 'Metro Freight Inc',
        ipAddress: '172.16.0.25',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        details: {
          file_name: 'invoice.pdf',
          file_size: '2.3MB',
          malware_type: 'trojan',
        },
        resolved: false,
        createdAt: '2024-01-15T08:15:00Z',
      },
      {
        id: 5,
        type: 'unauthorized_access',
        severity: 'medium',
        description: 'Attempted access to restricted resource',
        userId: 5,
        userName: 'Emily Wilson',
        companyId: 4,
        companyName: 'Coastal Shipping Co',
        ipAddress: '198.51.100.10',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        details: {
          resource: '/admin/settings',
          permission_required: 'admin',
          user_role: 'user',
        },
        resolved: true,
        resolvedAt: '2024-01-15T08:30:00Z',
        resolvedBy: 'System',
        createdAt: '2024-01-15T08:20:00Z',
      },
    ];

    const mockComplianceChecks: ComplianceCheck[] = [
      {
        id: 'gdpr_data_protection',
        name: 'GDPR Data Protection',
        description: 'Ensure personal data is protected according to GDPR requirements',
        category: 'GDPR',
        status: 'pass',
        lastCheck: '2024-01-15T10:30:00Z',
        nextCheck: '2024-01-22T10:30:00Z',
        details: 'All personal data is encrypted and access is properly controlled',
        requirements: ['Data encryption', 'Access controls', 'Data retention policies'],
      },
      {
        id: 'soc2_availability',
        name: 'SOC2 Availability',
        description: 'System availability meets SOC2 requirements',
        category: 'SOC2',
        status: 'pass',
        lastCheck: '2024-01-15T10:30:00Z',
        nextCheck: '2024-01-22T10:30:00Z',
        details: 'System uptime is 99.9% which exceeds SOC2 requirements',
        requirements: ['99.9% uptime', 'Backup procedures', 'Disaster recovery'],
      },
      {
        id: 'iso27001_access_control',
        name: 'ISO27001 Access Control',
        description: 'Access control measures meet ISO27001 standards',
        category: 'ISO27001',
        status: 'warning',
        lastCheck: '2024-01-15T10:30:00Z',
        nextCheck: '2024-01-22T10:30:00Z',
        details: 'Some users have not changed passwords in 90+ days',
        requirements: ['Password policies', 'Access reviews', 'Privilege management'],
      },
      {
        id: 'pci_dss_encryption',
        name: 'PCI-DSS Encryption',
        description: 'Payment card data encryption compliance',
        category: 'PCI-DSS',
        status: 'fail',
        lastCheck: '2024-01-15T10:30:00Z',
        nextCheck: '2024-01-22T10:30:00Z',
        details: 'Payment data is not encrypted at rest',
        requirements: ['Data encryption', 'Secure transmission', 'Key management'],
      },
    ];

    const mockThreatIntelligence: ThreatIntelligence[] = [
      {
        id: 1,
        type: 'IP Address',
        source: 'Threat Intelligence Feed',
        severity: 'high',
        description: 'Known malicious IP address attempting connections',
        indicators: ['203.0.113.42', 'malware-c2.example.com'],
        firstSeen: '2024-01-15T09:30:00Z',
        lastSeen: '2024-01-15T10:30:00Z',
        status: 'active',
      },
      {
        id: 2,
        type: 'Domain',
        source: 'DNS Filtering',
        severity: 'medium',
        description: 'Suspicious domain associated with phishing campaigns',
        indicators: ['phishing-site.com', 'fake-login.net'],
        firstSeen: '2024-01-14T15:20:00Z',
        lastSeen: '2024-01-15T08:45:00Z',
        status: 'investigating',
      },
      {
        id: 3,
        type: 'File Hash',
        source: 'Malware Analysis',
        severity: 'critical',
        description: 'Known malware file hash detected',
        indicators: ['a1b2c3d4e5f6...', 'malware.exe'],
        firstSeen: '2024-01-15T08:15:00Z',
        lastSeen: '2024-01-15T08:15:00Z',
        status: 'resolved',
      },
    ];

    setSecurityEvents(mockSecurityEvents);
    setComplianceChecks(mockComplianceChecks);
    setThreatIntelligence(mockThreatIntelligence);

    setSecurityMetrics({
      totalEvents: mockSecurityEvents.length,
      criticalEvents: mockSecurityEvents.filter(e => e.severity === 'critical').length,
      resolvedEvents: mockSecurityEvents.filter(e => e.resolved).length,
      activeThreats: mockThreatIntelligence.filter(t => t.status === 'active').length,
      complianceScore: 75,
      lastScan: '2024-01-15T10:30:00Z',
    });
  }, []);

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch =
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.userName && event.userName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSeverity = severityFilter === 'all' || event.severity === severityFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'resolved' && event.resolved) ||
      (statusFilter === 'unresolved' && !event.resolved);
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleResolveEvent = async (eventId: number) => {
    setLoading(true);
    try {
      setSecurityEvents(prev =>
        prev.map(event =>
          event.id === eventId
            ? {
                ...event,
                resolved: true,
                resolvedAt: new Date().toISOString(),
                resolvedBy: 'Security Admin',
              }
            : event
        )
      );
    } catch (error) {
      console.error('Error resolving event:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'low':
        return <Info className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Info className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          {
            title: 'Total Events',
            value: formatNumber(securityMetrics.totalEvents),
            change: '+12 this week',
            icon: Shield,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Critical Events',
            value: formatNumber(securityMetrics.criticalEvents),
            change: '+2 this week',
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-50',
          },
          {
            title: 'Resolved Events',
            value: formatNumber(securityMetrics.resolvedEvents),
            change: '+8 this week',
            icon: CheckCircle,
            color: 'text-green-500',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Compliance Score',
            value: `${securityMetrics.complianceScore}%`,
            change: '+5% this month',
            icon: ShieldCheck,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
          },
        ].map(stat => (
          <Card key={stat.title}>
            <CardContent className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-green-600 text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{stat.change}</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{stat.value}</div>
              <div className="text-gray-600 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <Card>
          <CardHeader>
            <CardTitle>Security Events Trend</CardTitle>
            <CardDescription>Security events over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Security events trend</p>
                <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Real-time security monitoring</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threat Distribution</CardTitle>
            <CardDescription>Types of security threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Threat distribution</p>
                <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Breakdown of security threats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest security events and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
            {securityEvents.slice(0, 5).map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(event.severity)}`}
                  >
                    {getSeverityIcon(event.severity)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{event.description}</p>
                    <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                      {event.type.replace('_', ' ')} • {event.ipAddress}
                      {event.userName && ` • ${event.userName}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                    {formatRelativeTime(event.createdAt)}
                  </span>
                  {!event.resolved && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolveEvent(event.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecurityEvents = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex flex-col lg:flex-row gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <Input
                placeholder="Search security events..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
              />
            </div>
            <div className="flex gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <select
                value={severityFilter}
                onChange={e => setSeverityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="all">All Status</option>
                <option value="resolved">Resolved</option>
                <option value="unresolved">Unresolved</option>
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Events Table */}
      <Card>
        <CardContent className="p-0 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
            <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
              <thead className="bg-gray-50 border-b responsive-container sm:flex-col md:flex-row lg:grid">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Event
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Severity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    User/Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    IP Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                {filteredEvents.map(event => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <div>
                        <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{event.description}</div>
                        <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{event.type.replace('_', ' ')}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getSeverityColor(event.severity)}`}
                      >
                        {getSeverityIcon(event.severity)}
                        {event.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div>
                        {event.userName && <div>{event.userName}</div>}
                        {event.companyName && (
                          <div className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{event.companyName}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      {event.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${
                          event.resolved
                            ? 'text-green-600 bg-green-50 border-green-200'
                            : 'text-red-600 bg-red-50 border-red-200'
                        }`}
                      >
                        {event.resolved ? (
                          <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        ) : (
                          <XCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        )}
                        {event.resolved ? 'Resolved' : 'Open'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      {formatRelativeTime(event.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </Button>
                        {!event.resolved && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResolveEvent(event.id)}
                          >
                            Resolve
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {complianceCategories.map(category => {
          const categoryChecks = complianceChecks.filter(check => check.category === category);
          const passedChecks = categoryChecks.filter(check => check.status === 'pass').length;
          const totalChecks = categoryChecks.length;
          const score = totalChecks > 0 ? (passedChecks / totalChecks) * 100 : 0;

          return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <Card key={category}>
              <CardContent className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{score.toFixed(0)}%</div>
                  <ShieldCheck className="w-8 h-8 text-primary-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{category}</div>
                <div className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {passedChecks}/{totalChecks} checks passed
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Checks</CardTitle>
          <CardDescription>Detailed compliance status and requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {complianceChecks.map(check => (
              <div
                key={check.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center gap-3 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{check.name}</h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${
                        check.status === 'pass'
                          ? 'text-green-600 bg-green-50 border-green-200'
                          : check.status === 'fail'
                            ? 'text-red-600 bg-red-50 border-red-200'
                            : check.status === 'warning'
                              ? 'text-yellow-600 bg-yellow-50 border-yellow-200'
                              : 'text-gray-600 bg-gray-50 border-gray-200'
                      }`}
                    >
                      {check.status === 'pass' ? (
                        <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : check.status === 'fail' ? (
                        <XCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : check.status === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : (
                        <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      )}
                      {check.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{check.description}</p>
                  <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{check.details}</p>
                </div>
                <div className="ml-4 text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Last check</div>
                  <div className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{formatRelativeTime(check.lastCheck)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Security & Compliance</h2>
          <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Monitor security events and compliance status</p>
        </div>
        <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            Run Scan
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'events', label: 'Security Events', icon: Shield },
                { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
                { id: 'threats', label: 'Threat Intelligence', icon: AlertTriangle },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() = aria-label="Button"> setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'events' && renderSecurityEvents()}
          {activeTab === 'compliance' && renderCompliance()}
          {activeTab === 'threats' && (
            <div className="text-center py-12 responsive-container sm:flex-col md:flex-row lg:grid">
              <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Threat Intelligence</h3>
              <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Threat intelligence dashboard coming soon</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SecurityCompliance;
