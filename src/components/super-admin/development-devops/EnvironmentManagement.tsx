import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Globe,
  Database,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Activity,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Link,
  Bell,
  Star,
  Heart,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Zap,
  Shield,
  Key,
  Lock,
  Unlock,
  FileText,
  Code,
  Terminal,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  Globe2,
  Building,
  Calendar,
  Users,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';

/**
 * Environment Management - Multi-Environment Orchestration Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  region: string;
  provider: 'aws' | 'azure' | 'gcp' | 'on-premise';
  resources: EnvironmentResources;
  services: Service[];
  deployments: Deployment[];
  health: EnvironmentHealth;
  lastDeployment: string;
  uptime: string;
  cost: number;
  tags: string[];
}

interface EnvironmentResources {
  cpu: ResourceUsage;
  memory: ResourceUsage;
  storage: ResourceUsage;
  network: ResourceUsage;
  instances: number;
  loadBalancers: number;
  databases: number;
}

interface ResourceUsage {
  used: number;
  total: number;
  percentage: number;
  unit: string;
}

interface Service {
  id: string;
  name: string;
  type: 'web' | 'api' | 'database' | 'cache' | 'queue' | 'monitoring';
  status: 'running' | 'stopped' | 'error' | 'starting';
  version: string;
  replicas: number;
  cpu: number;
  memory: number;
  endpoints: string[];
  health: 'healthy' | 'unhealthy' | 'degraded';
}

interface Deployment {
  id: string;
  service: string;
  version: string;
  status: 'success' | 'failed' | 'in_progress' | 'rollback';
  deployedAt: string;
  deployedBy: string;
  duration: string;
  logs: string[];
}

interface EnvironmentHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  services: number;
  healthyServices: number;
  issues: HealthIssue[];
  lastCheck: string;
}

interface HealthIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  service: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const EnvironmentManagement: React.FC = () => {
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [selectedTab, setSelectedTab] = useState<'environments' | 'services' | 'deployments' | 'monitoring'>('environments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const mockEnvironments: Environment[] = [
      {
        id: '1',
        name: 'Production',
        type: 'production',
        status: 'active',
        region: 'us-east-1',
        provider: 'aws',
        resources: {
          cpu: { used: 45.2, total: 100, percentage: 45.2, unit: 'cores' },
          memory: { used: 67.8, total: 128, percentage: 53.0, unit: 'GB' },
          storage: { used: 234.5, total: 500, percentage: 46.9, unit: 'GB' },
          network: { used: 12.3, total: 25, percentage: 49.2, unit: 'Gbps' },
          instances: 12,
          loadBalancers: 2,
          databases: 3,
        },
        services: [
          {
            id: '1',
            name: 'Super Admin Portal',
            type: 'web',
            status: 'running',
            version: 'v2.1.4',
            replicas: 3,
            cpu: 2.5,
            memory: 4,
            endpoints: ['https://superadmin.transbotai.com'],
            health: 'healthy',
          },
          {
            id: '2',
            name: 'API Gateway',
            type: 'api',
            status: 'running',
            version: 'v1.8.2',
            replicas: 5,
            cpu: 1.8,
            memory: 3,
            endpoints: ['https://api.transbotai.com'],
            health: 'healthy',
          },
          {
            id: '3',
            name: 'PostgreSQL',
            type: 'database',
            status: 'running',
            version: 'v14.2',
            replicas: 1,
            cpu: 4.0,
            memory: 8,
            endpoints: ['postgresql://prod-db:5432'],
            health: 'healthy',
          },
        ],
        deployments: [
          {
            id: '1',
            service: 'Super Admin Portal',
            version: 'v2.1.4',
            status: 'success',
            deployedAt: '2025-09-14T18:30:00Z',
            deployedBy: 'MCP Agent Alpha',
            duration: '8m 45s',
            logs: ['Deployment started', 'Health checks passed', 'Deployment completed'],
          },
        ],
        health: {
          overall: 'healthy',
          services: 3,
          healthyServices: 3,
          issues: [],
          lastCheck: '2025-09-14T19:00:00Z',
        },
        lastDeployment: '2025-09-14T18:30:00Z',
        uptime: '99.9%',
        cost: 1247.50,
        tags: ['production', 'critical', 'high-availability'],
      },
      {
        id: '2',
        name: 'Staging',
        type: 'staging',
        status: 'active',
        region: 'us-west-2',
        provider: 'aws',
        resources: {
          cpu: { used: 23.1, total: 50, percentage: 46.2, unit: 'cores' },
          memory: { used: 34.5, total: 64, percentage: 53.9, unit: 'GB' },
          storage: { used: 89.2, total: 200, percentage: 44.6, unit: 'GB' },
          network: { used: 5.7, total: 10, percentage: 57.0, unit: 'Gbps' },
          instances: 6,
          loadBalancers: 1,
          databases: 2,
        },
        services: [
          {
            id: '4',
            name: 'Super Admin Portal',
            type: 'web',
            status: 'running',
            version: 'v2.2.0-beta',
            replicas: 2,
            cpu: 1.2,
            memory: 2,
            endpoints: ['https://staging-superadmin.transbotai.com'],
            health: 'healthy',
          },
          {
            id: '5',
            name: 'API Gateway',
            type: 'api',
            status: 'running',
            version: 'v1.9.0-beta',
            replicas: 2,
            cpu: 0.9,
            memory: 1.5,
            endpoints: ['https://staging-api.transbotai.com'],
            health: 'healthy',
          },
        ],
        deployments: [
          {
            id: '2',
            service: 'Super Admin Portal',
            version: 'v2.2.0-beta',
            status: 'success',
            deployedAt: '2025-09-14T17:15:00Z',
            deployedBy: 'MCP Agent Beta',
            duration: '6m 20s',
            logs: ['Deployment started', 'Tests passed', 'Deployment completed'],
          },
        ],
        health: {
          overall: 'healthy',
          services: 2,
          healthyServices: 2,
          issues: [],
          lastCheck: '2025-09-14T19:00:00Z',
        },
        lastDeployment: '2025-09-14T17:15:00Z',
        uptime: '99.7%',
        cost: 623.75,
        tags: ['staging', 'testing', 'pre-production'],
      },
      {
        id: '3',
        name: 'Development',
        type: 'development',
        status: 'active',
        region: 'us-east-1',
        provider: 'aws',
        resources: {
          cpu: { used: 15.8, total: 25, percentage: 63.2, unit: 'cores' },
          memory: { used: 18.4, total: 32, percentage: 57.5, unit: 'GB' },
          storage: { used: 45.7, total: 100, percentage: 45.7, unit: 'GB' },
          network: { used: 2.1, total: 5, percentage: 42.0, unit: 'Gbps' },
          instances: 3,
          loadBalancers: 1,
          databases: 1,
        },
        services: [
          {
            id: '6',
            name: 'Super Admin Portal',
            type: 'web',
            status: 'running',
            version: 'v2.3.0-dev',
            replicas: 1,
            cpu: 0.8,
            memory: 1,
            endpoints: ['https://dev-superadmin.transbotai.com'],
            health: 'degraded',
          },
        ],
        deployments: [
          {
            id: '3',
            service: 'Super Admin Portal',
            version: 'v2.3.0-dev',
            status: 'in_progress',
            deployedAt: '2025-09-14T19:00:00Z',
            deployedBy: 'MCP Agent Gamma',
            duration: '2m 15s',
            logs: ['Deployment started', 'Building application...'],
          },
        ],
        health: {
          overall: 'degraded',
          services: 1,
          healthyServices: 0,
          issues: [
            {
              id: '1',
              type: 'warning',
              service: 'Super Admin Portal',
              message: 'High memory usage detected',
              timestamp: '2025-09-14T18:45:00Z',
              severity: 'medium',
            },
          ],
          lastCheck: '2025-09-14T19:00:00Z',
        },
        lastDeployment: '2025-09-14T19:00:00Z',
        uptime: '98.5%',
        cost: 312.25,
        tags: ['development', 'testing', 'experimental'],
      },
    ];

    setEnvironments(mockEnvironments);
  }, []);

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'production':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'staging':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'testing':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'unhealthy':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="w-4 h-4 text-blue-500" />;
      case 'api':
        return <Network className="w-4 h-4 text-green-500" />;
      case 'database':
        return <Database className="w-4 h-4 text-purple-500" />;
      case 'cache':
        return <MemoryStick className="w-4 h-4 text-orange-500" />;
      case 'queue':
        return <Activity className="w-4 h-4 text-pink-500" />;
      case 'monitoring':
        return <Monitor className="w-4 h-4 text-indigo-500" />;
      default:
        return <Server className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleEnvironmentAction = (environmentId: string, action: string) => {
    console.log(`Environment ${environmentId} action: ${action}`);
    // Implement environment actions (start, stop, restart, etc.)
  };

  const tabs = [
    { id: 'environments', label: 'Environments', icon: Server },
    { id: 'services', label: 'Services', icon: Globe },
    { id: 'deployments', label: 'Deployments', icon: Activity },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Environment Management</h1>
            <p className="text-slate-600 dark:text-slate-400">Multi-environment orchestration and infrastructure management</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search environments..."
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
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Environment</span>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Environments</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{environments.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {environments.filter(e => e.status === 'active').length} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {environments.reduce((sum, e) => sum + e.services.length, 0)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {environments.reduce((sum, e) => sum + e.health.healthyServices, 0)} healthy
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Uptime</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(environments.reduce((sum, e) => sum + parseFloat(e.uptime), 0) / environments.length)}%
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Excellent
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Cost</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(environments.reduce((sum, e) => sum + e.cost, 0))}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Optimized
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
                    onClick={() => setSelectedTab(tab.id as 'overview' | 'environments' | 'configurations' | 'secrets')}
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
              {selectedTab === 'environments' && (
                <motion.div
                  key="environments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {environments.map((environment, index) => (
                    <motion.div
                      key={environment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{environment.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {environment.provider.toUpperCase()} • {environment.region} • {environment.services.length} services
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(environment.status)}`}>
                                {environment.status}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(environment.type)}`}>
                                {environment.type}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(environment.health.overall)}`}>
                                {environment.health.overall}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                Uptime: {environment.uptime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                              {formatCurrency(environment.cost)}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Monthly Cost
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEnvironmentAction(environment.id, 'start')}
                              className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Start Environment"
                            >
                              <Play className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handleEnvironmentAction(environment.id, 'stop')}
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Stop Environment"
                            >
                              <Pause className="w-4 h-4 text-red-600" />
                            </button>
                            <button
                              onClick={() => setSelectedEnvironment(environment)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Resource Usage */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Resource Usage</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">CPU</span>
                              <span className="text-xs font-medium text-slate-900 dark:text-white">
                                {environment.resources.cpu.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${environment.resources.cpu.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">Memory</span>
                              <span className="text-xs font-medium text-slate-900 dark:text-white">
                                {environment.resources.memory.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${environment.resources.memory.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">Storage</span>
                              <span className="text-xs font-medium text-slate-900 dark:text-white">
                                {environment.resources.storage.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-purple-500"
                                style={{ width: `${environment.resources.storage.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">Network</span>
                              <span className="text-xs font-medium text-slate-900 dark:text-white">
                                {environment.resources.network.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-orange-500"
                                style={{ width: `${environment.resources.network.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {environments.map(environment => (
                    <div key={environment.id} className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        {environment.name} Services
                      </h3>
                      <div className="space-y-3">
                        {environment.services.map((service, index) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {getServiceTypeIcon(service.type)}
                                <div>
                                  <h4 className="font-medium text-slate-900 dark:text-white">{service.name}</h4>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {service.type} • v{service.version} • {service.replicas} replicas
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                                  {service.status}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(service.health)}`}>
                                  {service.health}
                                </span>
                                <div className="text-right">
                                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                                    {service.cpu} CPU / {service.memory}GB
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'deployments' && (
                <motion.div
                  key="deployments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Deployment History</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Track and manage deployment history across all environments
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Deployment Logs
                    </button>
                  </div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Environment Health</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Health monitoring dashboard</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Resource Utilization</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Resource utilization charts</p>
                        </div>
                      </div>
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

export default EnvironmentManagement;
