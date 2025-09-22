import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Globe,
  Database,
  Shield,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Eye,
  Edit,
  Play,
  Pause,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Zap,
  Users,
  BarChart3,
  TrendingUp,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
} from 'lucide-react';

const DeploymentEnvironments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const environments = [
    {
      id: 'env-001',
      name: 'Production',
      description: 'Live production environment',
      status: 'healthy',
      region: 'US-East',
      instances: 12,
      cpu: 45,
      memory: 62,
      storage: 78,
      uptime: '99.9%',
      lastDeploy: '2 hours ago',
      version: 'v2.1.3',
      healthChecks: 8,
      failedChecks: 0,
      responseTime: '120ms',
      traffic: 'High',
      ssl: true,
      monitoring: true,
      autoScaling: true,
    },
    {
      id: 'env-002',
      name: 'Staging',
      description: 'Pre-production testing environment',
      status: 'healthy',
      region: 'US-West',
      instances: 6,
      cpu: 38,
      memory: 45,
      storage: 52,
      uptime: '99.8%',
      lastDeploy: '1 hour ago',
      version: 'v2.1.4-beta',
      healthChecks: 6,
      failedChecks: 0,
      responseTime: '95ms',
      traffic: 'Medium',
      ssl: true,
      monitoring: true,
      autoScaling: false,
    },
    {
      id: 'env-003',
      name: 'Development',
      description: 'Development and testing environment',
      status: 'warning',
      region: 'EU-Central',
      instances: 4,
      cpu: 78,
      memory: 85,
      storage: 45,
      uptime: '98.5%',
      lastDeploy: '30 minutes ago',
      version: 'v2.2.0-dev',
      healthChecks: 4,
      failedChecks: 1,
      responseTime: '200ms',
      traffic: 'Low',
      ssl: false,
      monitoring: true,
      autoScaling: false,
    },
    {
      id: 'env-004',
      name: 'Testing',
      description: 'Automated testing environment',
      status: 'healthy',
      region: 'Asia-Pacific',
      instances: 3,
      cpu: 25,
      memory: 35,
      storage: 28,
      uptime: '99.7%',
      lastDeploy: '3 hours ago',
      version: 'v2.1.2',
      healthChecks: 3,
      failedChecks: 0,
      responseTime: '150ms',
      traffic: 'Low',
      ssl: true,
      monitoring: true,
      autoScaling: false,
    },
    {
      id: 'env-005',
      name: 'Disaster Recovery',
      description: 'Backup and disaster recovery environment',
      status: 'idle',
      region: 'US-Central',
      instances: 2,
      cpu: 5,
      memory: 12,
      storage: 15,
      uptime: '99.9%',
      lastDeploy: '1 week ago',
      version: 'v2.0.8',
      healthChecks: 2,
      failedChecks: 0,
      responseTime: '300ms',
      traffic: 'None',
      ssl: true,
      monitoring: true,
      autoScaling: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'idle': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'idle': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'None': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredEnvironments = environments.filter(env => {
    const matchesSearch = env.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         env.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || env.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deployment Environments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your deployment environments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Settings className="w-4 h-4 mr-2 inline" />
            Environment Settings
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Create Environment
          </button>
        </div>
      </div>

      {/* Environment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Environments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{environments.length}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Server className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Healthy</p>
              <p className="text-2xl font-bold text-green-600">{environments.filter(e => e.status === 'healthy').length}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Instances</p>
              <p className="text-2xl font-bold text-blue-600">{environments.reduce((acc, env) => acc + env.instances, 0)}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Uptime</p>
              <p className="text-2xl font-bold text-purple-600">99.6%</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search environments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="healthy">Healthy</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
          <option value="idle">Idle</option>
        </select>
        <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Environments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEnvironments.map((env, index) => (
          <motion.div
            key={env.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Server className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{env.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{env.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{env.region}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(env.status)}`}>
                {getStatusIcon(env.status)}
                <span className="ml-1 capitalize">{env.status}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Instances</span>
                  <span className="text-gray-900 dark:text-white">{env.instances}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Version</span>
                  <span className="text-gray-900 dark:text-white">{env.version}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                  <span className="text-gray-900 dark:text-white">{env.uptime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="text-gray-900 dark:text-white">{env.responseTime}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Health Checks</span>
                  <span className="text-gray-900 dark:text-white">{env.healthChecks - env.failedChecks}/{env.healthChecks}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Deploy</span>
                  <span className="text-gray-900 dark:text-white">{env.lastDeploy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Traffic</span>
                  <span className={`px-2 py-1 rounded text-xs ${getTrafficColor(env.traffic)}`}>
                    {env.traffic}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">SSL</span>
                  <span className="text-gray-900 dark:text-white">{env.ssl ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>

            {/* Resource Usage */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Resource Usage</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">CPU</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${env.cpu}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{env.cpu}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Memory</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${env.memory}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{env.memory}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Storage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${env.storage}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{env.storage}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {env.monitoring && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                    Monitoring
                  </span>
                )}
                {env.autoScaling && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded">
                    Auto Scaling
                  </span>
                )}
                {env.ssl && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded">
                    SSL
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {env.failedChecks > 0 && (
                  <span className="text-red-600">{env.failedChecks} failed health checks</span>
                )}
                {env.failedChecks === 0 && (
                  <span className="text-green-600">All systems operational</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DeploymentEnvironments;
