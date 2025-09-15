import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Play,
  Pause,
  Square,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Eye,
  Code,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  X,
} from 'lucide-react';

/**
 * CI/CD Pipeline Management Page
 * Comprehensive continuous integration and deployment pipeline management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:20:00.000Z
 */

interface Pipeline {
  id: string;
  name: string;
  description: string;
  repository: string;
  branch: string;
  status: 'active' | 'inactive' | 'paused' | 'error';
  lastRun: string;
  nextRun: string;
  successRate: number;
  totalRuns: number;
  avgDuration: string;
  stages: PipelineStage[];
  triggers: string[];
  environment: string;
  createdAt: string;
  updatedAt: string;
}

interface PipelineStage {
  id: string;
  name: string;
  type: 'build' | 'test' | 'deploy' | 'security' | 'notification';
  status: 'pending' | 'running' | 'success' | 'failed' | 'skipped';
  duration: string;
  startTime: string;
  endTime: string;
  logs: string[];
  artifacts: string[];
}

interface PipelineRun {
  id: string;
  pipelineId: string;
  status: 'running' | 'success' | 'failed' | 'cancelled';
  trigger: string;
  commit: string;
  author: string;
  startTime: string;
  endTime: string;
  duration: string;
  stages: PipelineStage[];
}

export const CICDPipeline: React.FC = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [pipelineRuns, setPipelineRuns] = useState<PipelineRun[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'pipelines' | 'runs' | 'analytics'>('pipelines');

  // Mock data
  useEffect(() => {
    const mockPipelines: Pipeline[] = [
      {
        id: '1',
        name: 'Frontend Build Pipeline',
        description: 'Build and deploy frontend application',
        repository: 'company/frontend-app',
        branch: 'main',
        status: 'active',
        lastRun: '2024-03-20T10:30:00Z',
        nextRun: '2024-03-20T11:30:00Z',
        successRate: 95.5,
        totalRuns: 150,
        avgDuration: '8m 30s',
        stages: [
          {
            id: '1',
            name: 'Install Dependencies',
            type: 'build',
            status: 'success',
            duration: '2m 15s',
            startTime: '2024-03-20T10:30:00Z',
            endTime: '2024-03-20T10:32:15Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '2',
            name: 'Run Tests',
            type: 'test',
            status: 'success',
            duration: '3m 45s',
            startTime: '2024-03-20T10:32:15Z',
            endTime: '2024-03-20T10:36:00Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '3',
            name: 'Build Application',
            type: 'build',
            status: 'success',
            duration: '2m 30s',
            startTime: '2024-03-20T10:36:00Z',
            endTime: '2024-03-20T10:38:30Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '4',
            name: 'Deploy to Staging',
            type: 'deploy',
            status: 'success',
            duration: '1m 45s',
            startTime: '2024-03-20T10:38:30Z',
            endTime: '2024-03-20T10:40:15Z',
            logs: [],
            artifacts: [],
          },
        ],
        triggers: ['push', 'pull_request'],
        environment: 'staging',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-03-20T10:40:15Z',
      },
      {
        id: '2',
        name: 'Backend API Pipeline',
        description: 'Build, test and deploy backend API services',
        repository: 'company/backend-api',
        branch: 'develop',
        status: 'active',
        lastRun: '2024-03-20T09:15:00Z',
        nextRun: '2024-03-20T10:15:00Z',
        successRate: 88.2,
        totalRuns: 200,
        avgDuration: '12m 45s',
        stages: [
          {
            id: '1',
            name: 'Install Dependencies',
            type: 'build',
            status: 'success',
            duration: '3m 20s',
            startTime: '2024-03-20T09:15:00Z',
            endTime: '2024-03-20T09:18:20Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '2',
            name: 'Run Unit Tests',
            type: 'test',
            status: 'success',
            duration: '4m 15s',
            startTime: '2024-03-20T09:18:20Z',
            endTime: '2024-03-20T09:22:35Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '3',
            name: 'Security Scan',
            type: 'security',
            status: 'success',
            duration: '2m 30s',
            startTime: '2024-03-20T09:22:35Z',
            endTime: '2024-03-20T09:25:05Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '4',
            name: 'Build Docker Image',
            type: 'build',
            status: 'success',
            duration: '2m 40s',
            startTime: '2024-03-20T09:25:05Z',
            endTime: '2024-03-20T09:27:45Z',
            logs: [],
            artifacts: [],
          },
        ],
        triggers: ['push', 'schedule'],
        environment: 'production',
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-03-20T09:27:45Z',
      },
      {
        id: '3',
        name: 'Database Migration Pipeline',
        description: 'Database schema migrations and data updates',
        repository: 'company/database-migrations',
        branch: 'main',
        status: 'paused',
        lastRun: '2024-03-19T14:00:00Z',
        nextRun: '2024-03-21T14:00:00Z',
        successRate: 100,
        totalRuns: 25,
        avgDuration: '5m 20s',
        stages: [
          {
            id: '1',
            name: 'Backup Database',
            type: 'deploy',
            status: 'success',
            duration: '2m 15s',
            startTime: '2024-03-19T14:00:00Z',
            endTime: '2024-03-19T14:02:15Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '2',
            name: 'Run Migrations',
            type: 'deploy',
            status: 'success',
            duration: '2m 30s',
            startTime: '2024-03-19T14:02:15Z',
            endTime: '2024-03-19T14:04:45Z',
            logs: [],
            artifacts: [],
          },
          {
            id: '3',
            name: 'Verify Schema',
            type: 'test',
            status: 'success',
            duration: '35s',
            startTime: '2024-03-19T14:04:45Z',
            endTime: '2024-03-19T14:05:20Z',
            logs: [],
            artifacts: [],
          },
        ],
        triggers: ['schedule'],
        environment: 'production',
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-03-19T14:05:20Z',
      },
    ];

    setPipelines(mockPipelines);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused':
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
      case 'paused':
        return <Pause className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStageTypeIcon = (type: string) => {
    switch (type) {
      case 'build':
        return <Code className="w-4 h-4" />;
      case 'test':
        return <CheckCircle className="w-4 h-4" />;
      case 'deploy':
        return <Server className="w-4 h-4" />;
      case 'security':
        return <Shield className="w-4 h-4" />;
      case 'notification':
        return <Zap className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'skipped':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs = [
    { id: 'pipelines', label: 'Pipelines', icon: GitBranch, count: pipelines.length },
    { id: 'runs', label: 'Recent Runs', icon: Activity, count: 0 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 0 },
  ];

  const filteredPipelines = pipelines.filter(pipeline => {
    const matchesSearch =
      pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pipeline.repository.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || pipeline.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                CI/CD Pipeline Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage continuous integration and deployment pipelines
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
                <span>Create Pipeline</span>
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
                  onClick={() => setViewMode(tab.id as 'pipelines' | 'runs' | 'analytics')}
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
                placeholder="Search pipelines..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="paused">Paused</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
          {viewMode === 'pipelines' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPipelines.map(pipeline => (
                  <motion.div
                    key={pipeline.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {pipeline.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}
                            >
                              {getStatusIcon(pipeline.status)}
                              <span className="ml-1 capitalize">{pipeline.status}</span>
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
                      {pipeline.description}
                    </p>

                    {/* Repository Info */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Repository:</span>
                        <span className="text-gray-900 dark:text-white font-mono">
                          {pipeline.repository}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500 dark:text-gray-400">Branch:</span>
                        <span className="text-gray-900 dark:text-white">{pipeline.branch}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500 dark:text-gray-400">Environment:</span>
                        <span className="text-gray-900 dark:text-white capitalize">
                          {pipeline.environment}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {pipeline.successRate}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Success Rate</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-600/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {pipeline.totalRuns}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Total Runs</div>
                      </div>
                    </div>

                    {/* Pipeline Stages */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Pipeline Stages
                      </h4>
                      <div className="space-y-2">
                        {pipeline.stages.map(stage => (
                          <div
                            key={stage.id}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-600/50 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              {getStageTypeIcon(stage.type)}
                              <span className="text-sm text-gray-900 dark:text-white">
                                {stage.name}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStageStatusColor(stage.status)}`}
                              >
                                {stage.status}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {stage.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                          View Details
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium">
                          View Logs
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

          {viewMode === 'runs' && (
            <div className="p-6">
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Recent Pipeline Runs
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  View and monitor recent pipeline execution history
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View All Runs
                </button>
              </div>
            </div>
          )}

          {viewMode === 'analytics' && (
            <div className="p-6">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Pipeline Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive analytics and performance metrics for your pipelines
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Analytics
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CICDPipeline;
