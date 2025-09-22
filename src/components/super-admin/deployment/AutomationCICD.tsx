import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  GitBranch,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Settings,
  Eye,
  Filter,
  Search,
  BarChart3,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  TrendingUp,
  TrendingDown,
  Bell,
  ExternalLink,
  Copy,
  Trash2,
  Edit,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Info,
  Warning,
  Download,
  Upload,
  RefreshCw,
  Target,
  Gauge,
  Timer,
  Users,
  Calendar,
  MapPin,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'running' | 'failed' | 'paused';
  trigger: 'manual' | 'push' | 'schedule' | 'webhook';
  lastRun: string;
  nextRun?: string;
  successRate: number;
  averageDuration: number;
  stages: PipelineStage[];
  repository: string;
  branch: string;
  environment: string;
  createdBy: string;
  lastModified: string;
}

interface PipelineStage {
  id: string;
  name: string;
  type: 'build' | 'test' | 'deploy' | 'security' | 'notification';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  duration: number;
  startTime: string;
  endTime?: string;
  logs: string[];
  artifacts: string[];
}

interface BuildJob {
  id: string;
  pipelineId: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  trigger: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  commit: string;
  author: string;
  message: string;
  stages: PipelineStage[];
  artifacts: {
    name: string;
    size: string;
    type: string;
    url: string;
  }[];
}

const AutomationCICD: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pipelines');
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  // Pipelines State
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Production Deployment Pipeline',
      description: 'Automated deployment pipeline for production releases',
      status: 'active',
      trigger: 'push',
      lastRun: '2025-09-21 08:25:00',
      nextRun: '2025-09-21 14:00:00',
      successRate: 95.2,
      averageDuration: 12,
      stages: [
        { id: '1', name: 'Build', type: 'build', status: 'completed', duration: 3, startTime: '08:25:00', endTime: '08:28:00', logs: ['Building application...', 'Dependencies installed', 'Build completed'], artifacts: ['app.tar.gz'] },
        { id: '2', name: 'Test', type: 'test', status: 'completed', duration: 5, startTime: '08:28:00', endTime: '08:33:00', logs: ['Running unit tests...', 'Running integration tests...', 'All tests passed'], artifacts: ['test-results.xml'] },
        { id: '3', name: 'Security Scan', type: 'security', status: 'completed', duration: 2, startTime: '08:33:00', endTime: '08:35:00', logs: ['Security scan started...', 'No vulnerabilities found', 'Security scan completed'], artifacts: ['security-report.pdf'] },
        { id: '4', name: 'Deploy', type: 'deploy', status: 'completed', duration: 2, startTime: '08:35:00', endTime: '08:37:00', logs: ['Deploying to production...', 'Health checks passed', 'Deployment completed'], artifacts: ['deployment-log.txt'] }
      ],
      repository: 'transbot/logistics-lynx',
      branch: 'main',
      environment: 'production',
      createdBy: 'John Doe',
      lastModified: '2025-09-20 16:30:00'
    },
    {
      id: '2',
      name: 'Staging Deployment Pipeline',
      description: 'Automated deployment pipeline for staging environment',
      status: 'active',
      trigger: 'push',
      lastRun: '2025-09-21 07:45:00',
      successRate: 98.7,
      averageDuration: 8,
      stages: [
        { id: '1', name: 'Build', type: 'build', status: 'completed', duration: 2, startTime: '07:45:00', endTime: '07:47:00', logs: ['Building application...', 'Build completed'], artifacts: ['app.tar.gz'] },
        { id: '2', name: 'Test', type: 'test', status: 'completed', duration: 4, startTime: '07:47:00', endTime: '07:51:00', logs: ['Running tests...', 'All tests passed'], artifacts: ['test-results.xml'] },
        { id: '3', name: 'Deploy', type: 'deploy', status: 'completed', duration: 2, startTime: '07:51:00', endTime: '07:53:00', logs: ['Deploying to staging...', 'Deployment completed'], artifacts: ['deployment-log.txt'] }
      ],
      repository: 'transbot/logistics-lynx',
      branch: 'develop',
      environment: 'staging',
      createdBy: 'Sarah Wilson',
      lastModified: '2025-09-19 14:20:00'
    },
    {
      id: '3',
      name: 'Security & Compliance Pipeline',
      description: 'Automated security scanning and compliance checks',
      status: 'running',
      trigger: 'schedule',
      lastRun: '2025-09-21 08:40:00',
      nextRun: '2025-09-22 08:40:00',
      successRate: 99.1,
      averageDuration: 15,
      stages: [
        { id: '1', name: 'Security Scan', type: 'security', status: 'running', duration: 0, startTime: '08:40:00', logs: ['Starting security scan...'], artifacts: [] },
        { id: '2', name: 'Compliance Check', type: 'security', status: 'pending', duration: 0, startTime: '', logs: [], artifacts: [] },
        { id: '3', name: 'Vulnerability Assessment', type: 'security', status: 'pending', duration: 0, startTime: '', logs: [], artifacts: [] }
      ],
      repository: 'transbot/logistics-lynx',
      branch: 'main',
      environment: 'all',
      createdBy: 'Mike Johnson',
      lastModified: '2025-09-18 10:15:00'
    }
  ]);

  // Build Jobs State
  const [buildJobs, setBuildJobs] = useState<BuildJob[]>([
    {
      id: '1',
      pipelineId: '1',
      status: 'completed',
      trigger: 'Push to main',
      startedAt: '2025-09-21 08:25:00',
      completedAt: '2025-09-21 08:37:00',
      duration: 12,
      commit: 'a1b2c3d',
      author: 'John Doe',
      message: 'feat: Add AI agent enhancements',
      stages: [],
      artifacts: [
        { name: 'app.tar.gz', size: '45.2 MB', type: 'Archive', url: '/artifacts/app.tar.gz' },
        { name: 'test-results.xml', size: '2.1 MB', type: 'Report', url: '/artifacts/test-results.xml' },
        { name: 'security-report.pdf', size: '1.8 MB', type: 'Report', url: '/artifacts/security-report.pdf' }
      ]
    },
    {
      id: '2',
      pipelineId: '2',
      status: 'running',
      trigger: 'Push to develop',
      startedAt: '2025-09-21 08:42:00',
      commit: 'e4f5g6h',
      author: 'Sarah Wilson',
      message: 'fix: Resolve authentication timeout issue',
      stages: [],
      artifacts: []
    },
    {
      id: '3',
      pipelineId: '1',
      status: 'failed',
      trigger: 'Manual trigger',
      startedAt: '2025-09-21 07:15:00',
      completedAt: '2025-09-21 07:22:00',
      duration: 7,
      commit: 'i7j8k9l',
      author: 'Alex Rodriguez',
      message: 'feat: Add new dashboard components',
      stages: [],
      artifacts: []
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'running':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
      case 'paused':
      case 'pending':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'queued':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'cancelled':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStageTypeColor = (type: string) => {
    switch (type) {
      case 'build': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'test': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'deploy': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200';
      case 'security': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'notification': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleRunPipeline = async (pipelineId: string) => {
    setIsRunning(true);
    setBuildProgress(0);

    // Simulate pipeline execution
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setBuildProgress(i);
    }

    // Update pipeline status
    setPipelines(prev => prev.map(pipeline => 
      pipeline.id === pipelineId 
        ? { ...pipeline, status: 'running' as const, lastRun: new Date().toISOString().slice(0, 19).replace('T', ' ') }
        : pipeline
    ));

    // Add new build job
    const newJob: BuildJob = {
      id: Date.now().toString(),
      pipelineId,
      status: 'completed',
      trigger: 'Manual trigger',
      startedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      completedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      duration: 10,
      commit: 'm1n2o3p',
      author: 'Current User',
      message: 'Manual pipeline execution',
      stages: [],
      artifacts: []
    };

    setBuildJobs(prev => [newJob, ...prev]);

    setIsRunning(false);
    setBuildProgress(0);
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

  const renderPipelinesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">CI/CD Pipelines</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage automated build, test, and deployment pipelines</p>
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
            <span>Create Pipeline</span>
          </button>
        </div>
      </div>

      {/* Pipeline Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pipelines</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pipelines.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{pipelines.filter(p => p.status === 'active').length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Running</p>
              <p className="text-2xl font-bold text-blue-600">{pipelines.filter(p => p.status === 'running').length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-2xl font-bold text-purple-600">97.7%</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pipelines List */}
      <div className="space-y-4">
        {pipelines.map((pipeline) => (
          <motion.div
            key={pipeline.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{pipeline.name}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pipeline.status)}`}>
                    {pipeline.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{pipeline.environment}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{pipeline.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Success Rate</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{pipeline.successRate}%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Avg Duration</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{pipeline.averageDuration} min</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Stages</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{pipeline.stages.length}</p>
                  </div>
                </div>

                {/* Pipeline Stages */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Pipeline Stages</h4>
                  <div className="flex space-x-2">
                    {pipeline.stages.map((stage, index) => (
                      <div key={stage.id} className="flex items-center space-x-2">
                        <div className={`px-2 py-1 text-xs font-semibold rounded-full ${getStageTypeColor(stage.type)}`}>
                          {stage.name}
                        </div>
                        {index < pipeline.stages.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <GitBranch className="w-4 h-4" />
                    <span>{pipeline.repository}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Last run: {pipeline.lastRun}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Settings className="w-4 h-4" />
                    <span>By: {pipeline.createdBy}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => setSelectedPipeline(pipeline)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRunPipeline(pipeline.id)}
                  disabled={isRunning || pipeline.status === 'running'}
                  className="p-2 text-green-600 hover:text-green-700 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
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

  const renderBuildJobsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Build Jobs</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor build jobs and pipeline executions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-4">
        {buildJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Pipeline: {pipelines.find(p => p.id === job.pipelineId)?.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.commit}
                  </span>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{job.message}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">by {job.author}</p>
                </div>
                
                {job.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Running...</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                    </div>
                  </div>
                )}
                
                {job.artifacts.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Artifacts</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.artifacts.map((artifact, index) => (
                        <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Download className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{artifact.name}</span>
                          <span className="text-xs text-gray-500">({artifact.size})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Started: {job.startedAt}</span>
                  </span>
                  {job.completedAt && (
                    <span className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completed: {job.completedAt}</span>
                    </span>
                  )}
                  {job.duration && (
                    <span className="flex items-center space-x-1">
                      <Timer className="w-4 h-4" />
                      <span>Duration: {job.duration} min</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Download className="w-4 h-4" />
                </button>
              </div>
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
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Automation & CI/CD</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage continuous integration, deployment, and automation pipelines</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Pipeline Run</p>
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
            <TabButton id="pipelines" label="Pipelines" icon={Zap} isActive={activeTab === 'pipelines'} />
            <TabButton id="build-jobs" label="Build Jobs" icon={Activity} isActive={activeTab === 'build-jobs'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'pipelines' && renderPipelinesTab()}
          {activeTab === 'build-jobs' && renderBuildJobsTab()}
        </div>

        {/* Pipeline Execution Modal */}
        <AnimatePresence>
          {isRunning && (
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
                    <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Running Pipeline</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Please wait while the pipeline executes...</p>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <motion.div
                      className="bg-blue-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${buildProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{buildProgress}% Complete</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AutomationCICD;
