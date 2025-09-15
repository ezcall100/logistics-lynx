import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Database,
  Globe,
  Cloud,
  Monitor,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Eye,
  Play,
  Pause,
  Square,
  RefreshCw,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Calendar,
  X,
} from 'lucide-react';

/**
 * Environment Management Page
 * Comprehensive environment and infrastructure management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:25:00.000Z
 */

interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  region: string;
  provider: string;
  description: string;
  url: string;
  lastDeployment: string;
  nextMaintenance: string;
  resources: EnvironmentResource[];
  services: EnvironmentService[];
  monitoring: EnvironmentMonitoring;
  security: EnvironmentSecurity;
  createdAt: string;
  updatedAt: string;
}

interface EnvironmentResource {
  id: string;
  name: string;
  type: 'server' | 'database' | 'load-balancer' | 'cache' | 'storage';
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  cost: number;
  uptime: number;
}

interface EnvironmentService {
  id: string;
  name: string;
  version: string;
  status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
  port: number;
  protocol: string;
  healthCheck: string;
  lastCheck: string;
  responseTime: number;
}

interface EnvironmentMonitoring {
  uptime: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  alerts: number;
  lastAlert: string;
}

interface EnvironmentSecurity {
  sslEnabled: boolean;
  firewallEnabled: boolean;
  accessControl: boolean;
  encryption: boolean;
  lastSecurityScan: string;
  vulnerabilities: number;
}

export const EnvironmentManagement: React.FC = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'environments' | 'resources' | 'monitoring'>(
    'environments'
  );

  // Mock data
  useEffect(() => {
    const mockEnvironments: Environment[] = [
      {
        id: '1',
        name: 'Production Environment',
        type: 'production',
        status: 'active',
        region: 'us-east-1',
        provider: 'AWS',
        description: 'Main production environment for customer-facing applications',
        url: 'https://app.company.com',
        lastDeployment: '2024-03-20T10:30:00Z',
        nextMaintenance: '2024-03-25T02:00:00Z',
        resources: [
          {
            id: '1',
            name: 'Web Server 1',
            type: 'server',
            status: 'running',
            cpu: 45,
            memory: 67,
            storage: 78,
            network: 23,
            cost: 120.5,
            uptime: 99.9,
          },
          {
            id: '2',
            name: 'Database Cluster',
            type: 'database',
            status: 'running',
            cpu: 32,
            memory: 89,
            storage: 45,
            network: 12,
            cost: 250.75,
            uptime: 99.95,
          },
        ],
        services: [
          {
            id: '1',
            name: 'API Gateway',
            version: 'v2.1.0',
            status: 'healthy',
            port: 8080,
            protocol: 'HTTP',
            healthCheck: '/health',
            lastCheck: '2024-03-20T15:30:00Z',
            responseTime: 45,
          },
          {
            id: '2',
            name: 'User Service',
            version: 'v1.8.2',
            status: 'healthy',
            port: 3001,
            protocol: 'HTTP',
            healthCheck: '/api/health',
            lastCheck: '2024-03-20T15:30:00Z',
            responseTime: 23,
          },
        ],
        monitoring: {
          uptime: 99.9,
          responseTime: 156,
          errorRate: 0.1,
          throughput: 1250,
          alerts: 2,
          lastAlert: '2024-03-20T14:15:00Z',
        },
        security: {
          sslEnabled: true,
          firewallEnabled: true,
          accessControl: true,
          encryption: true,
          lastSecurityScan: '2024-03-19T00:00:00Z',
          vulnerabilities: 0,
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-03-20T10:30:00Z',
      },
      {
        id: '2',
        name: 'Staging Environment',
        type: 'staging',
        status: 'active',
        region: 'us-west-2',
        provider: 'AWS',
        description: 'Staging environment for testing and validation',
        url: 'https://staging.company.com',
        lastDeployment: '2024-03-20T09:15:00Z',
        nextMaintenance: '2024-03-22T01:00:00Z',
        resources: [
          {
            id: '1',
            name: 'Staging Server',
            type: 'server',
            status: 'running',
            cpu: 23,
            memory: 45,
            storage: 56,
            network: 8,
            cost: 85.25,
            uptime: 98.5,
          },
        ],
        services: [
          {
            id: '1',
            name: 'API Gateway',
            version: 'v2.1.0',
            status: 'healthy',
            port: 8080,
            protocol: 'HTTP',
            healthCheck: '/health',
            lastCheck: '2024-03-20T15:30:00Z',
            responseTime: 67,
          },
        ],
        monitoring: {
          uptime: 98.5,
          responseTime: 234,
          errorRate: 0.3,
          throughput: 450,
          alerts: 0,
          lastAlert: '2024-03-19T16:30:00Z',
        },
        security: {
          sslEnabled: true,
          firewallEnabled: true,
          accessControl: true,
          encryption: true,
          lastSecurityScan: '2024-03-18T00:00:00Z',
          vulnerabilities: 1,
        },
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-03-20T09:15:00Z',
      },
      {
        id: '3',
        name: 'Development Environment',
        type: 'development',
        status: 'active',
        region: 'us-east-1',
        provider: 'AWS',
        description: 'Development environment for feature development',
        url: 'https://dev.company.com',
        lastDeployment: '2024-03-20T08:00:00Z',
        nextMaintenance: '2024-03-21T03:00:00Z',
        resources: [
          {
            id: '1',
            name: 'Dev Server',
            type: 'server',
            status: 'running',
            cpu: 67,
            memory: 78,
            storage: 89,
            network: 15,
            cost: 45.5,
            uptime: 95.2,
          },
        ],
        services: [
          {
            id: '1',
            name: 'API Gateway',
            version: 'v2.2.0-beta',
            status: 'degraded',
            port: 8080,
            protocol: 'HTTP',
            healthCheck: '/health',
            lastCheck: '2024-03-20T15:30:00Z',
            responseTime: 156,
          },
        ],
        monitoring: {
          uptime: 95.2,
          responseTime: 345,
          errorRate: 1.2,
          throughput: 200,
          alerts: 5,
          lastAlert: '2024-03-20T15:00:00Z',
        },
        security: {
          sslEnabled: false,
          firewallEnabled: true,
          accessControl: false,
          encryption: false,
          lastSecurityScan: '2024-03-17T00:00:00Z',
          vulnerabilities: 3,
        },
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-03-20T08:00:00Z',
      },
    ];

    setEnvironments(mockEnvironments);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'staging':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'testing':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      case 'maintenance':
        return <Clock className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server className="w-4 h-4" />;
      case 'database':
        return <Database className="w-4 h-4" />;
      case 'load-balancer':
        return <Network className="w-4 h-4" />;
      case 'cache':
        return <MemoryStick className="w-4 h-4" />;
      case 'storage':
        return <HardDrive className="w-4 h-4" />;
      default:
        return <Server className="w-4 h-4" />;
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'unhealthy':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'unknown':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'environments', label: 'Environments', icon: Globe, count: environments.length },
    { id: 'resources', label: 'Resources', icon: Server, count: 0 },
    { id: 'monitoring', label: 'Monitoring', icon: BarChart3, count: 0 },
  ];

  const filteredEnvironments = environments.filter(environment => {
    const matchesSearch =
      environment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      environment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      environment.provider.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || environment.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Environment Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and monitor your infrastructure environments
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Environment</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id as 'environments' | 'resources' | 'monitoring')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors rounded-lg ${
                    viewMode === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      viewMode === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search environments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="all">All Types</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
          {viewMode === 'environments' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredEnvironments.map(environment => (
                  <motion.div
                    key={environment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {environment.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(environment.type)}`}
                            >
                              {environment.type}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(environment.status)}`}
                            >
                              {getStatusIcon(environment.status)}
                              <span className="ml-1 capitalize">{environment.status}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Play className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {environment.description}
                    </p>

                    {/* Environment Info */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Provider:</span>
                        <span className="text-gray-900 dark:text-white">
                          {environment.provider}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500 dark:text-gray-400">Region:</span>
                        <span className="text-gray-900 dark:text-white">{environment.region}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500 dark:text-gray-400">URL:</span>
                        <span className="text-gray-900 dark:text-white text-xs">
                          {environment.url}
                        </span>
                      </div>
                    </div>

                    {/* Monitoring Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {environment.monitoring.uptime}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Uptime</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {environment.monitoring.responseTime}ms
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Response Time
                        </div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Services
                      </h4>
                      <div className="space-y-2">
                        {environment.services.map(service => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-600/50 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {service.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                v{service.version}
                              </span>
                            </div>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getServiceStatusColor(service.status)}`}
                            >
                              {service.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Security
                      </h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">SSL</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Firewall</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            Encryption
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                          View Details
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium">
                          Monitor
                        </button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'resources' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Server className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Resource Management
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor and manage infrastructure resources across all environments
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Resources
                </button>
              </div>
            </div>
          )}

          {viewMode === 'monitoring' && (
            <div className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Environment Monitoring
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time monitoring and alerting for all environments
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Monitoring
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentManagement;
