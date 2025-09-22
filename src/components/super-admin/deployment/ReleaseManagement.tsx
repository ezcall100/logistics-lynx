import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  GitBranch,
  Tag,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Settings,
  Filter,
  Search,
  BarChart3,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  ExternalLink,
  Copy,
  Trash2,
  Edit,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Release {
  id: string;
  version: string;
  name: string;
  description: string;
  status: 'draft' | 'testing' | 'staging' | 'production' | 'rollback' | 'completed';
  environment: 'development' | 'staging' | 'production';
  releaseDate: string;
  createdBy: string;
  approvedBy?: string;
  features: string[];
  bugFixes: string[];
  breakingChanges: string[];
  deploymentTime: number;
  rollbackTime?: number;
  successRate: number;
  issues: number;
  metrics: {
    deploymentDuration: number;
    downtime: number;
    userImpact: number;
    performanceImpact: number;
  };
}

interface ReleaseEnvironment {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down' | 'maintenance';
  lastDeployment: string;
  version: string;
  uptime: string;
  health: number;
  services: {
    name: string;
    status: 'running' | 'stopped' | 'error';
    version: string;
    lastUpdate: string;
  }[];
}

const ReleaseManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('releases');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  // Releases State
  const [releases, setReleases] = useState<Release[]>([
    {
      id: '1',
      version: 'v2.1.0',
      name: 'AI Enhancement Release',
      description: 'Major AI agent improvements and new workflow capabilities',
      status: 'production',
      environment: 'production',
      releaseDate: '2025-09-21',
      createdBy: 'John Doe',
      approvedBy: 'Sarah Wilson',
      features: [
        'Enhanced AI agent performance',
        'New workflow automation',
        'Improved user interface',
        'Advanced analytics dashboard'
      ],
      bugFixes: [
        'Fixed authentication timeout issue',
        'Resolved data synchronization bug',
        'Corrected permission validation'
      ],
      breakingChanges: [
        'Updated API endpoints (v2.1)',
        'Modified database schema'
      ],
      deploymentTime: 15,
      successRate: 98.5,
      issues: 2,
      metrics: {
        deploymentDuration: 15,
        downtime: 2,
        userImpact: 5,
        performanceImpact: 12
      }
    },
    {
      id: '2',
      version: 'v2.0.5',
      name: 'Security Patch Release',
      description: 'Critical security updates and performance improvements',
      status: 'staging',
      environment: 'staging',
      releaseDate: '2025-09-20',
      createdBy: 'Mike Johnson',
      approvedBy: 'Lisa Chen',
      features: [
        'Enhanced security protocols',
        'Performance optimizations',
        'New monitoring tools'
      ],
      bugFixes: [
        'Fixed memory leak in data processing',
        'Resolved concurrent access issue',
        'Corrected timezone handling'
      ],
      breakingChanges: [],
      deploymentTime: 8,
      successRate: 99.2,
      issues: 0,
      metrics: {
        deploymentDuration: 8,
        downtime: 1,
        userImpact: 2,
        performanceImpact: 8
      }
    },
    {
      id: '3',
      version: 'v2.0.4',
      name: 'Bug Fix Release',
      description: 'Minor bug fixes and stability improvements',
      status: 'completed',
      environment: 'production',
      releaseDate: '2025-09-18',
      createdBy: 'Alex Rodriguez',
      approvedBy: 'Emma Davis',
      features: [],
      bugFixes: [
        'Fixed UI rendering issue',
        'Resolved notification delivery bug',
        'Corrected data export functionality'
      ],
      breakingChanges: [],
      deploymentTime: 5,
      successRate: 100,
      issues: 0,
      metrics: {
        deploymentDuration: 5,
        downtime: 0,
        userImpact: 0,
        performanceImpact: 3
      }
    }
  ]);

  // Environments State
  const [environments, setEnvironments] = useState<ReleaseEnvironment[]>([
    {
      id: '1',
      name: 'Production',
      status: 'healthy',
      lastDeployment: '2025-09-21 08:25:00',
      version: 'v2.1.0',
      uptime: '99.9%',
      health: 98,
      services: [
        { name: 'API Gateway', status: 'running', version: 'v2.1.0', lastUpdate: '2025-09-21 08:25:00' },
        { name: 'Database', status: 'running', version: 'v2.1.0', lastUpdate: '2025-09-21 08:25:00' },
        { name: 'Cache Service', status: 'running', version: 'v2.1.0', lastUpdate: '2025-09-21 08:25:00' },
        { name: 'Message Queue', status: 'running', version: 'v2.1.0', lastUpdate: '2025-09-21 08:25:00' }
      ]
    },
    {
      id: '2',
      name: 'Staging',
      status: 'healthy',
      lastDeployment: '2025-09-20 14:30:00',
      version: 'v2.0.5',
      uptime: '99.8%',
      health: 95,
      services: [
        { name: 'API Gateway', status: 'running', version: 'v2.0.5', lastUpdate: '2025-09-20 14:30:00' },
        { name: 'Database', status: 'running', version: 'v2.0.5', lastUpdate: '2025-09-20 14:30:00' },
        { name: 'Cache Service', status: 'running', version: 'v2.0.5', lastUpdate: '2025-09-20 14:30:00' },
        { name: 'Message Queue', status: 'running', version: 'v2.0.5', lastUpdate: '2025-09-20 14:30:00' }
      ]
    },
    {
      id: '3',
      name: 'Development',
      status: 'degraded',
      lastDeployment: '2025-09-21 10:15:00',
      version: 'v2.1.1-dev',
      uptime: '97.5%',
      health: 85,
      services: [
        { name: 'API Gateway', status: 'running', version: 'v2.1.1-dev', lastUpdate: '2025-09-21 10:15:00' },
        { name: 'Database', status: 'running', version: 'v2.1.1-dev', lastUpdate: '2025-09-21 10:15:00' },
        { name: 'Cache Service', status: 'error', version: 'v2.1.1-dev', lastUpdate: '2025-09-21 10:15:00' },
        { name: 'Message Queue', status: 'running', version: 'v2.1.1-dev', lastUpdate: '2025-09-21 10:15:00' }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production':
      case 'completed':
      case 'healthy':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'staging':
      case 'testing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'draft':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
      case 'rollback':
      case 'down':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'production':
      case 'completed':
      case 'healthy':
        return <CheckCircle className="w-4 h-4" />;
      case 'staging':
      case 'testing':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'rollback':
      case 'down':
        return <AlertTriangle className="w-4 h-4" />;
      case 'degraded':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleDeploy = async (releaseId: string, environment: string) => {
    setIsDeploying(true);
    setDeploymentProgress(0);

    // Simulate deployment process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDeploymentProgress(i);
    }

    // Update release status
    setReleases(prev => prev.map(release => 
      release.id === releaseId 
        ? { ...release, status: environment as any, environment: environment as any }
        : release
    ));

    setIsDeploying(false);
    setDeploymentProgress(0);
  };

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const renderReleasesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Release Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage software releases and deployments</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Release</span>
          </button>
        </div>
      </div>

      {/* Release Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Releases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{releases.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Rocket className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Production</p>
              <p className="text-2xl font-bold text-green-600">{releases.filter(r => r.status === 'production').length}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{releases.filter(r => ['staging', 'testing'].includes(r.status)).length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-purple-600">98.5%</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Releases List */}
      <div className="space-y-4">
        {releases.map((release) => (
          <motion.div
            key={release.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{release.version}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(release.status)}`}>
                    {release.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{release.environment}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{release.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{release.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Deployment Time</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{release.deploymentTime} min</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{release.successRate}%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issues</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{release.issues}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Release: {release.releaseDate}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Created by: {release.createdBy}</span>
                  </span>
                  {release.approvedBy && (
                    <span className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Approved by: {release.approvedBy}</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => setSelectedRelease(release)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeploy(release.id, 'production')}
                  disabled={isDeploying || release.status === 'production'}
                  className="p-2 text-green-600 hover:text-green-700 disabled:opacity-50"
                >
                  <Rocket className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderEnvironmentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Environment Status</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor deployment environments and service health</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {environments.map((env) => (
          <motion.div
            key={env.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{env.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">v{env.version}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(env.status)}`}>
                {env.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Health</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{env.health}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    env.health >= 95 ? 'bg-green-500' :
                    env.health >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${env.health}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{env.uptime}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">Services</h4>
              {env.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      service.status === 'running' ? 'bg-green-500' :
                      service.status === 'stopped' ? 'bg-gray-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{service.version}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Last deployment: {env.lastDeployment}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Release Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage software releases, deployments, and environment health</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Deployment</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">v2.1.0</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">2025-09-21 08:25:00</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex space-x-2 mb-6">
            <TabButton id="releases" label="Releases" icon={Rocket} isActive={activeTab === 'releases'} />
            <TabButton id="environments" label="Environments" icon={Server} isActive={activeTab === 'environments'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'releases' && renderReleasesTab()}
          {activeTab === 'environments' && renderEnvironmentsTab()}
        </div>

        {/* Deployment Progress Modal */}
        <AnimatePresence>
          {isDeploying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4"
              >
                <div className="text-center">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4">
                    <Rocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Deploying Release</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Please wait while we deploy your release...</p>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <motion.div
                      className="bg-blue-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${deploymentProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{deploymentProgress}% Complete</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReleaseManagement;
