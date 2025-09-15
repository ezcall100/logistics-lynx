import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  Clock,
  Activity,
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Eye,
  FileText,
  Zap,
} from 'lucide-react';

/**
 * CI/CD Pipeline - Advanced Pipeline Orchestration Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'success' | 'failed' | 'pending' | 'cancelled';
  trigger: 'manual' | 'push' | 'pull_request' | 'schedule' | 'webhook';
  branch: string;
  environment: 'development' | 'staging' | 'production';
  duration: string;
  startedAt: string;
  completedAt?: string;
  stages: PipelineStage[];
  artifacts: Artifact[];
  metrics: PipelineMetrics;
  lastRun: string;
  successRate: number;
  totalRuns: number;
}

interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration: string;
  startedAt: string;
  completedAt?: string;
  steps: PipelineStep[];
  logs: string[];
  artifacts: string[];
}

interface PipelineStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration: string;
  command: string;
  output: string;
  error?: string;
}

interface Artifact {
  id: string;
  name: string;
  type: 'build' | 'test' | 'deployment' | 'documentation';
  size: string;
  url: string;
  createdAt: string;
}

interface PipelineMetrics {
  avgDuration: string;
  successRate: number;
  failureRate: number;
  avgQueueTime: string;
  throughput: number;
}

export const CICDPipeline: React.FC = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    'pipelines' | 'stages' | 'artifacts' | 'analytics'
  >('pipelines');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  // const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const mockPipelines: Pipeline[] = [
      {
        id: '1',
        name: 'Super Admin Portal CI/CD',
        description: 'Complete CI/CD pipeline for Super Admin portal deployment',
        status: 'running',
        trigger: 'push',
        branch: 'main',
        environment: 'production',
        duration: '12m 34s',
        startedAt: '2025-09-14T18:30:00Z',
        stages: [
          {
            id: '1',
            name: 'Build',
            status: 'success',
            duration: '3m 45s',
            startedAt: '2025-09-14T18:30:00Z',
            completedAt: '2025-09-14T18:33:45Z',
            steps: [
              {
                id: '1',
                name: 'Install Dependencies',
                status: 'success',
                duration: '1m 20s',
                command: 'npm install',
                output: 'Dependencies installed successfully',
              },
              {
                id: '2',
                name: 'TypeScript Compilation',
                status: 'success',
                duration: '2m 25s',
                command: 'npm run build',
                output: 'Build completed successfully',
              },
            ],
            logs: ['Installing dependencies...', 'Compiling TypeScript...', 'Build completed'],
            artifacts: ['dist/index.html', 'dist/assets/index.js'],
          },
          {
            id: '2',
            name: 'Test',
            status: 'success',
            duration: '4m 12s',
            startedAt: '2025-09-14T18:33:45Z',
            completedAt: '2025-09-14T18:37:57Z',
            steps: [
              {
                id: '3',
                name: 'Unit Tests',
                status: 'success',
                duration: '2m 30s',
                command: 'npm run test',
                output: 'All tests passed',
              },
              {
                id: '4',
                name: 'Integration Tests',
                status: 'success',
                duration: '1m 42s',
                command: 'npm run test:integration',
                output: 'Integration tests passed',
              },
            ],
            logs: ['Running unit tests...', 'Running integration tests...', 'All tests passed'],
            artifacts: ['coverage/lcov-report/index.html'],
          },
          {
            id: '3',
            name: 'Deploy',
            status: 'running',
            duration: '4m 37s',
            startedAt: '2025-09-14T18:37:57Z',
            steps: [
              {
                id: '5',
                name: 'Deploy to Staging',
                status: 'success',
                duration: '2m 15s',
                command: 'npm run deploy:staging',
                output: 'Deployed to staging successfully',
              },
              {
                id: '6',
                name: 'Deploy to Production',
                status: 'running',
                duration: '2m 22s',
                command: 'npm run deploy:production',
                output: 'Deploying to production...',
              },
            ],
            logs: ['Deploying to staging...', 'Deploying to production...'],
            artifacts: ['deployment-logs.txt'],
          },
        ],
        artifacts: [
          {
            id: '1',
            name: 'super-admin-portal-v2.1.4.tar.gz',
            type: 'build',
            size: '45.2 MB',
            url: '/artifacts/build/super-admin-portal-v2.1.4.tar.gz',
            createdAt: '2025-09-14T18:33:45Z',
          },
          {
            id: '2',
            name: 'test-coverage-report.html',
            type: 'test',
            size: '2.1 MB',
            url: '/artifacts/test/coverage-report.html',
            createdAt: '2025-09-14T18:37:57Z',
          },
        ],
        metrics: {
          avgDuration: '8m 45s',
          successRate: 94.2,
          failureRate: 5.8,
          avgQueueTime: '1m 23s',
          throughput: 12.5,
        },
        lastRun: '2025-09-14T18:30:00Z',
        successRate: 94.2,
        totalRuns: 127,
      },
      {
        id: '2',
        name: 'API Gateway Pipeline',
        description: 'Microservices API gateway deployment pipeline',
        status: 'success',
        trigger: 'pull_request',
        branch: 'feature/api-v2',
        environment: 'staging',
        duration: '6m 18s',
        startedAt: '2025-09-14T17:45:00Z',
        completedAt: '2025-09-14T17:51:18Z',
        stages: [
          {
            id: '4',
            name: 'Build',
            status: 'success',
            duration: '2m 30s',
            startedAt: '2025-09-14T17:45:00Z',
            completedAt: '2025-09-14T17:47:30Z',
            steps: [
              {
                id: '7',
                name: 'Docker Build',
                status: 'success',
                duration: '2m 30s',
                command: 'docker build -t api-gateway:latest .',
                output: 'Docker image built successfully',
              },
            ],
            logs: ['Building Docker image...', 'Docker image built successfully'],
            artifacts: ['api-gateway:latest'],
          },
          {
            id: '5',
            name: 'Test',
            status: 'success',
            duration: '2m 15s',
            startedAt: '2025-09-14T17:47:30Z',
            completedAt: '2025-09-14T17:49:45Z',
            steps: [
              {
                id: '8',
                name: 'API Tests',
                status: 'success',
                duration: '2m 15s',
                command: 'npm run test:api',
                output: 'API tests passed',
              },
            ],
            logs: ['Running API tests...', 'API tests passed'],
            artifacts: ['api-test-results.json'],
          },
          {
            id: '6',
            name: 'Deploy',
            status: 'success',
            duration: '1m 33s',
            startedAt: '2025-09-14T17:49:45Z',
            completedAt: '2025-09-14T17:51:18Z',
            steps: [
              {
                id: '9',
                name: 'Deploy to Staging',
                status: 'success',
                duration: '1m 33s',
                command: 'kubectl apply -f k8s/staging/',
                output: 'Deployed to staging successfully',
              },
            ],
            logs: ['Deploying to staging...', 'Deployed to staging successfully'],
            artifacts: ['deployment-manifest.yaml'],
          },
        ],
        artifacts: [
          {
            id: '3',
            name: 'api-gateway:latest',
            type: 'build',
            size: '156.7 MB',
            url: '/artifacts/docker/api-gateway:latest',
            createdAt: '2025-09-14T17:47:30Z',
          },
        ],
        metrics: {
          avgDuration: '5m 45s',
          successRate: 98.7,
          failureRate: 1.3,
          avgQueueTime: '45s',
          throughput: 18.2,
        },
        lastRun: '2025-09-14T17:45:00Z',
        successRate: 98.7,
        totalRuns: 89,
      },
    ];

    setPipelines(mockPipelines);
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
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'push':
        return <GitBranch className="w-4 h-4 text-blue-500" />;
      case 'pull_request':
        return <GitBranch className="w-4 h-4 text-purple-500" />;
      case 'manual':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'schedule':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'webhook':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      default:
        return <GitBranch className="w-4 h-4 text-gray-500" />;
    }
  };

  const handlePipelineAction = (pipelineId: string, action: string) => {
    console.log(`Pipeline ${pipelineId} action: ${action}`);
    // Implement pipeline actions (start, stop, restart, etc.)
  };

  const tabs = [
    { id: 'pipelines', label: 'Pipelines', icon: GitBranch },
    { id: 'stages', label: 'Stages', icon: Activity },
    { id: 'artifacts', label: 'Artifacts', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              CI/CD Pipeline
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Advanced pipeline orchestration and deployment management
            </p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search pipelines..."
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
              onClick={() => console.log('Create pipeline modal')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Pipeline</span>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Pipelines
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {pipelines.length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {pipelines.filter(p => p.status === 'success').length} successful
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <GitBranch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Running Pipelines
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {pipelines.filter(p => p.status === 'running').length}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <Activity className="w-4 h-4 mr-1" />
                  Active
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(
                    pipelines.reduce((sum, p) => sum + p.successRate, 0) / pipelines.length
                  )}
                  %
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Excellent
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Runs</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {pipelines.reduce((sum, p) => sum + p.totalRuns, 0).toLocaleString()}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <Zap className="w-4 h-4 mr-1" />
                  All Time
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
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
                onClick={() =>
                  setSelectedTab(tab.id as 'pipelines' | 'stages' | 'artifacts' | 'analytics')
                }
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
              {selectedTab === 'pipelines' && (
                <motion.div
                  key="pipelines"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {pipelines.map((pipeline, index) => (
                    <motion.div
                      key={pipeline.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <GitBranch className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                              {pipeline.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {pipeline.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}
                              >
                                {pipeline.status}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {pipeline.branch}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {pipeline.environment}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {pipeline.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                              {pipeline.successRate}%
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Success Rate
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTriggerIcon(pipeline.trigger)}
                            {getStatusIcon(pipeline.status)}
                            <button
                              onClick={() => handlePipelineAction(pipeline.id, 'start')}
                              className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                              title="Start Pipeline"
                            >
                              <Play className="w-4 h-4 text-green-600" />
                            </button>
                            <button
                              onClick={() => handlePipelineAction(pipeline.id, 'stop')}
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Stop Pipeline"
                            >
                              <Pause className="w-4 h-4 text-red-600" />
                            </button>
                            <button
                              onClick={() => console.log('View pipeline details', pipeline.id)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Pipeline Stages */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                          Pipeline Stages
                        </h4>
                        <div className="flex space-x-2">
                          {pipeline.stages.map((stage, stageIndex) => (
                            <div key={stage.id} className="flex items-center space-x-2">
                              <div className={`p-2 rounded-lg ${getStatusColor(stage.status)}`}>
                                {getStatusIcon(stage.status)}
                              </div>
                              <div className="text-xs">
                                <div className="font-medium text-slate-900 dark:text-white">
                                  {stage.name}
                                </div>
                                <div className="text-slate-500 dark:text-slate-400">
                                  {stage.duration}
                                </div>
                              </div>
                              {stageIndex < pipeline.stages.length - 1 && (
                                <div className="w-4 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
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
                  className="space-y-8"
                >
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Pipeline Stages
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Detailed stage execution monitoring and management
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View Stage Details
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'artifacts' && (
                <motion.div
                  key="artifacts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Build Artifacts
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Manage and download build artifacts and deployment packages
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Browse Artifacts
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Pipeline Performance
                      </h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">
                            Performance analytics chart
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Success Rate Trends
                      </h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Success rate trends</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Summary */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Pipeline Analytics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { name: 'Avg Duration', value: '6m 45s', trend: '-1m 20s' },
                        { name: 'Success Rate', value: '96.4%', trend: '+2.1%' },
                        { name: 'Failed Runs', value: '8', trend: '-3' },
                        { name: 'Active Pipelines', value: '3', trend: '+1' },
                      ].map(item => (
                        <div key={item.name} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">
                              {item.name}
                            </h4>
                            <span className="text-sm text-green-600 dark:text-green-400">
                              {item.trend}
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            {item.value}
                          </div>
                        </div>
                      ))}
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

export default CICDPipeline;
