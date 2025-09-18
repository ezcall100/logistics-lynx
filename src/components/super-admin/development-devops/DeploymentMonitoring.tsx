import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Eye,
  FileText,
  Package,
  Layers,
  RotateCcw,
  Target,
} from 'lucide-react';

/**
 * Deployment Monitoring - Real-time Deployment Tracking Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface Deployment {
  id: string;
  name: string;
  service: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  status: 'pending' | 'running' | 'success' | 'failed' | 'rollback' | 'cancelled';
  strategy: 'rolling' | 'blue-green' | 'canary' | 'recreate';
  progress: number;
  startedAt: string;
  completedAt?: string;
  duration?: string;
  deployedBy: string;
  commit: string;
  branch: string;
  stages: DeploymentStage[];
  metrics: DeploymentMetrics;
  logs: DeploymentLog[];
  healthChecks: HealthCheck[];
  rollbackInfo?: RollbackInfo;
}

interface DeploymentStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  progress: number;
  startedAt: string;
  completedAt?: string;
  duration?: string;
  steps: DeploymentStep[];
}

interface DeploymentStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  command: string;
  output: string;
  error?: string;
  duration?: string;
}

interface DeploymentMetrics {
  deploymentTime: string;
  downtime: string;
  rollbackTime?: string;
  successRate: number;
  errorRate: number;
  throughput: number;
  latency: number;
}

interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source: string;
}

interface HealthCheck {
  id: string;
  name: string;
  status: 'passing' | 'failing' | 'warning';
  responseTime: number;
  lastCheck: string;
  endpoint: string;
  message?: string;
}

interface RollbackInfo {
  reason: string;
  initiatedBy: string;
  initiatedAt: string;
  targetVersion: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export const DeploymentMonitoring: React.FC = () => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [selectedTab, setSelectedTab] = useState<'deployments' | 'stages' | 'logs' | 'health'>(
    'deployments'
  );
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
  // const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const mockDeployments: Deployment[] = [
      {
        id: '1',
        name: 'Super Admin Portal v2.1.4',
        service: 'Super Admin Portal',
        version: 'v2.1.4',
        environment: 'production',
        status: 'running',
        strategy: 'rolling',
        progress: 75,
        startedAt: '2025-09-14T18:30:00Z',
        deployedBy: 'MCP Agent Alpha',
        commit: 'a1b2c3d4e5f6',
        branch: 'main',
        stages: [
          {
            id: '1',
            name: 'Pre-deployment',
            status: 'success',
            progress: 100,
            startedAt: '2025-09-14T18:30:00Z',
            completedAt: '2025-09-14T18:32:15Z',
            duration: '2m 15s',
            steps: [
              {
                id: '1',
                name: 'Backup Current Version',
                status: 'success',
                command: 'kubectl create backup super-admin-v2.1.3',
                output: 'Backup created successfully',
                duration: '1m 30s',
              },
              {
                id: '2',
                name: 'Health Check Pre-deployment',
                status: 'success',
                command: 'curl -f https://superadmin.transbotai.com/health',
                output: 'Health check passed',
                duration: '45s',
              },
            ],
          },
          {
            id: '2',
            name: 'Deployment',
            status: 'running',
            progress: 75,
            startedAt: '2025-09-14T18:32:15Z',
            steps: [
              {
                id: '3',
                name: 'Deploy New Version',
                status: 'running',
                command: 'kubectl apply -f k8s/super-admin-v2.1.4.yaml',
                output: 'Deploying new version...',
              },
              {
                id: '4',
                name: 'Update Load Balancer',
                status: 'pending',
                command: 'kubectl patch service super-admin-lb',
                output: '',
              },
            ],
          },
          {
            id: '3',
            name: 'Post-deployment',
            status: 'pending',
            progress: 0,
            startedAt: '',
            steps: [
              {
                id: '5',
                name: 'Health Check Post-deployment',
                status: 'pending',
                command: 'curl -f https://superadmin.transbotai.com/health',
                output: '',
              },
              {
                id: '6',
                name: 'Smoke Tests',
                status: 'pending',
                command: 'npm run test:smoke',
                output: '',
              },
            ],
          },
        ],
        metrics: {
          deploymentTime: '8m 45s',
          downtime: '0s',
          successRate: 98.5,
          errorRate: 1.5,
          throughput: 1250,
          latency: 45,
        },
        logs: [
          {
            id: '1',
            timestamp: '2025-09-14T18:30:00Z',
            level: 'info',
            message: 'Deployment started for Super Admin Portal v2.1.4',
            source: 'deployment-controller',
          },
          {
            id: '2',
            timestamp: '2025-09-14T18:30:15Z',
            level: 'info',
            message: 'Creating backup of current version',
            source: 'backup-service',
          },
          {
            id: '3',
            timestamp: '2025-09-14T18:32:15Z',
            level: 'info',
            message: 'Pre-deployment checks completed successfully',
            source: 'health-checker',
          },
          {
            id: '4',
            timestamp: '2025-09-14T18:32:30Z',
            level: 'info',
            message: 'Starting rolling deployment',
            source: 'deployment-controller',
          },
        ],
        healthChecks: [
          {
            id: '1',
            name: 'API Health Check',
            status: 'passing',
            responseTime: 45,
            lastCheck: '2025-09-14T18:35:00Z',
            endpoint: 'https://superadmin.transbotai.com/api/health',
          },
          {
            id: '2',
            name: 'Database Connection',
            status: 'passing',
            responseTime: 12,
            lastCheck: '2025-09-14T18:35:00Z',
            endpoint: 'postgresql://prod-db:5432',
          },
          {
            id: '3',
            name: 'External API',
            status: 'warning',
            responseTime: 1200,
            lastCheck: '2025-09-14T18:35:00Z',
            endpoint: 'https://external-api.example.com',
            message: 'Response time higher than expected',
          },
        ],
      },
      {
        id: '2',
        name: 'API Gateway v1.8.2',
        service: 'API Gateway',
        version: 'v1.8.2',
        environment: 'staging',
        status: 'success',
        strategy: 'blue-green',
        progress: 100,
        startedAt: '2025-09-14T17:45:00Z',
        completedAt: '2025-09-14T17:51:18Z',
        duration: '6m 18s',
        deployedBy: 'MCP Agent Beta',
        commit: 'b2c3d4e5f6g7',
        branch: 'feature/api-v2',
        stages: [
          {
            id: '4',
            name: 'Pre-deployment',
            status: 'success',
            progress: 100,
            startedAt: '2025-09-14T17:45:00Z',
            completedAt: '2025-09-14T17:47:30Z',
            duration: '2m 30s',
            steps: [
              {
                id: '7',
                name: 'Build Docker Image',
                status: 'success',
                command: 'docker build -t api-gateway:v1.8.2 .',
                output: 'Docker image built successfully',
                duration: '2m 30s',
              },
            ],
          },
          {
            id: '5',
            name: 'Deployment',
            status: 'success',
            progress: 100,
            startedAt: '2025-09-14T17:47:30Z',
            completedAt: '2025-09-14T17:50:15Z',
            duration: '2m 45s',
            steps: [
              {
                id: '8',
                name: 'Deploy to Green Environment',
                status: 'success',
                command: 'kubectl apply -f k8s/green/api-gateway.yaml',
                output: 'Deployed to green environment',
                duration: '1m 30s',
              },
              {
                id: '9',
                name: 'Switch Traffic to Green',
                status: 'success',
                command: 'kubectl patch service api-gateway-lb',
                output: 'Traffic switched to green environment',
                duration: '1m 15s',
              },
            ],
          },
          {
            id: '6',
            name: 'Post-deployment',
            status: 'success',
            progress: 100,
            startedAt: '2025-09-14T17:50:15Z',
            completedAt: '2025-09-14T17:51:18Z',
            duration: '1m 3s',
            steps: [
              {
                id: '10',
                name: 'Health Check',
                status: 'success',
                command: 'curl -f https://staging-api.transbotai.com/health',
                output: 'Health check passed',
                duration: '30s',
              },
              {
                id: '11',
                name: 'Cleanup Blue Environment',
                status: 'success',
                command: 'kubectl delete deployment api-gateway-blue',
                output: 'Blue environment cleaned up',
                duration: '33s',
              },
            ],
          },
        ],
        metrics: {
          deploymentTime: '6m 18s',
          downtime: '0s',
          successRate: 100,
          errorRate: 0,
          throughput: 850,
          latency: 32,
        },
        logs: [
          {
            id: '5',
            timestamp: '2025-09-14T17:45:00Z',
            level: 'info',
            message: 'Blue-green deployment started for API Gateway v1.8.2',
            source: 'deployment-controller',
          },
          {
            id: '6',
            timestamp: '2025-09-14T17:47:30Z',
            level: 'info',
            message: 'Docker image built and pushed to registry',
            source: 'build-service',
          },
          {
            id: '7',
            timestamp: '2025-09-14T17:50:15Z',
            level: 'info',
            message: 'Traffic successfully switched to green environment',
            source: 'load-balancer',
          },
          {
            id: '8',
            timestamp: '2025-09-14T17:51:18Z',
            level: 'info',
            message: 'Deployment completed successfully',
            source: 'deployment-controller',
          },
        ],
        healthChecks: [
          {
            id: '4',
            name: 'API Health Check',
            status: 'passing',
            responseTime: 32,
            lastCheck: '2025-09-14T17:51:18Z',
            endpoint: 'https://staging-api.transbotai.com/health',
          },
          {
            id: '5',
            name: 'Database Connection',
            status: 'passing',
            responseTime: 8,
            lastCheck: '2025-09-14T17:51:18Z',
            endpoint: 'postgresql://staging-db:5432',
          },
        ],
      },
    ];

    setDeployments(mockDeployments);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rollback':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500 responsive-container" />;
      case 'running':
        return <Activity className="w-4 h-4 text-blue-500 responsive-container" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500 responsive-container" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500 responsive-container" />;
      case 'rollback':
        return <RotateCcw className="w-4 h-4 text-orange-500 responsive-container" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-500 responsive-container" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500 responsive-container" />;
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case 'rolling':
        return <Layers className="w-4 h-4 text-blue-500 responsive-container" />;
      case 'blue-green':
        return <Target className="w-4 h-4 text-green-500 responsive-container" />;
      case 'canary':
        return <Package className="w-4 h-4 text-purple-500 responsive-container" />;
      case 'recreate':
        return <RotateCcw className="w-4 h-4 text-orange-500 responsive-container" />;
      default:
        return <Package className="w-4 h-4 text-gray-500 responsive-container" />;
    }
  };

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'staging':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'development':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleDeploymentAction = (deploymentId: string, action: string) => {
    console.log(`Deployment ${deploymentId} action: ${action}`);
    // Implement deployment actions (rollback, cancel, retry, etc.)
  };

  const tabs = [
    { id: 'deployments', label: 'Deployments', icon: Package },
    { id: 'stages', label: 'Stages', icon: Layers },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'health', label: 'Health', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container">
          <div className="flex-1 responsive-container">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">
              Deployment Monitoring
            </h1>
            <p className="text-slate-600 dark:text-slate-400 responsive-container">
              Real-time deployment tracking and monitoring
            </p>
          </div>

          <div className="flex gap-3 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search deployments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl responsive-container"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Filter className="w-4 h-4 responsive-container" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <RefreshCw className="w-4 h-4 responsive-container" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => console.log('Create deployment modal')}
            aria-label="Button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 responsive-container"
            >
              <Plus className="w-4 h-4 responsive-container" />
              <span>Deploy</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  Total Deployments
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {deployments.length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-4 h-4 mr-1 responsive-container" />
                  {deployments.filter(d => d.status === 'success').length} successful
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  Running Deployments
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {deployments.filter(d => d.status === 'running').length}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1 responsive-container">
                  <Activity className="w-4 h-4 mr-1 responsive-container" />
                  In Progress
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Success Rate</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {Math.round(
                    deployments.reduce((sum, d) => sum + d.metrics.successRate, 0) /
                      deployments.length
                  )}
                  %
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <TrendingUp className="w-4 h-4 mr-1 responsive-container" />
                  Excellent
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  Avg Deployment Time
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {Math.round(
                    deployments.reduce((sum, d) => {
                      const time = d.duration ? parseInt(d.duration.split('m')[0]) : 0;
                      return sum + time;
                    }, 0) / deployments.length
                  )}
                  m
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1 responsive-container">
                  <Clock className="w-4 h-4 mr-1 responsive-container" />
                  Fast
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg responsive-container">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400 responsive-container" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8 responsive-container">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto responsive-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as 'deployments' | 'stages' | 'logs' | 'health')
                }
            aria-label="Button"
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4 responsive-container" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 responsive-container">
            <AnimatePresence mode="wait">
              {selectedTab === 'deployments' && (
                <motion.div
                  key="deployments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 responsive-container"
                >
                  {deployments.map((deployment, index) => (
                    <motion.div
                      key={deployment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container">
                        <div className="flex items-center space-x-4 responsive-container">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white responsive-container">
                              {deployment.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                              {deployment.service} • {deployment.commit.substring(0, 7)} •{' '}
                              {deployment.branch}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 responsive-container">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deployment.status)}`}
                              >
                                {deployment.status}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(deployment.environment)}`}
                              >
                                {deployment.environment}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                                {deployment.strategy}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                                {deployment.duration || 'In progress...'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 responsive-container">
                          <div className="text-right responsive-container">
                            <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                              {deployment.progress}%
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                              Progress
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 responsive-container">
                            {getStrategyIcon(deployment.strategy)}
                            {getStatusIcon(deployment.status)}
                            <button
                              onClick={() => handleDeploymentAction(deployment.id, 'rollback')}
            aria-label="Button"
                              className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg transition-colors responsive-container"
                              title="Rollback Deployment"
                            >
                              <RotateCcw className="w-4 h-4 text-orange-600 responsive-container" />
                            </button>
                            <button
                              onClick={() => handleDeploymentAction(deployment.id, 'cancel')}
            aria-label="Button"
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors responsive-container"
                              title="Cancel Deployment"
                            >
                              <XCircle className="w-4 h-4 text-red-600 responsive-container" />
                            </button>
                            <button
                              onClick={() => console.log('View deployment details', deployment.id)}
            aria-label="Button"
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors responsive-container"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-gray-600 responsive-container" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4 responsive-container">
                        <div className="flex items-center justify-between mb-2 responsive-container">
                          <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                            Deployment Progress
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">
                            {deployment.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                          <div
                            className="h-2 rounded-full bg-blue-500 transition-all duration-300 responsive-container"
                            style={{ width: `${deployment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Deployment Stages */}
                      <div className="mt-4 responsive-container">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 responsive-container">
                          Deployment Stages
                        </h4>
                        <div className="flex space-x-2 responsive-container">
                          {deployment.stages.map((stage, stageIndex) => (
                            <div key={stage.id} className="flex items-center space-x-2 responsive-container">
                              <div className={`p-2 rounded-lg ${getStatusColor(stage.status)}`}>
                                {getStatusIcon(stage.status)}
                              </div>
                              <div className="text-xs responsive-container">
                                <div className="font-medium text-slate-900 dark:text-white responsive-container">
                                  {stage.name}
                                </div>
                                <div className="text-slate-500 dark:text-slate-400 responsive-container">
                                  {stage.duration || 'In progress...'}
                                </div>
                              </div>
                              {stageIndex < deployment.stages.length - 1 && (
                                <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-600 responsive-container"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'stages' && (
                <motion.div
                  key="stages"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  <div className="text-center py-12 responsive-container">
                    <Layers className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 responsive-container">
                      Deployment Stages
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 responsive-container">
                      Detailed stage execution monitoring and management
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                      View Stage Details
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'logs' && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  <div className="text-center py-12 responsive-container">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 responsive-container">
                      Deployment Logs
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 responsive-container">
                      Real-time deployment logs and execution details
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                      View Live Logs
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'health' && (
                <motion.div
                  key="health"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Health Checks
                      </h3>
                      <div className="space-y-3 responsive-container">
                        {deployments[0]?.healthChecks.map(check => (
                          <div key={check.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 responsive-container">
                            <div className="flex items-center justify-between responsive-container">
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white responsive-container">
                                  {check.name}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 responsive-container">
                                  {check.endpoint}
                                </p>
                              </div>
                              <div className="text-right responsive-container">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    check.status === 'passing'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                      : check.status === 'warning'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                  }`}
                                >
                                  {check.status}
                                </span>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 responsive-container">
                                  {check.responseTime}ms
                                </div>
                              </div>
                            </div>
                            {check.message && (
                              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2 responsive-container">
                                {check.message}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Deployment Metrics
                      </h3>
                      <div className="h-64 flex items-center justify-center responsive-container">
                        <div className="text-center responsive-container">
                          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                          <p className="text-slate-500 dark:text-slate-400 responsive-container">
                            Deployment metrics chart
                          </p>
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

export default DeploymentMonitoring;
