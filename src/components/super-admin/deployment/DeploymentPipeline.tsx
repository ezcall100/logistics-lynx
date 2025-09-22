import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  Code,
  Package,
  Rocket,
  Play,
  Pause,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  Database,
  Globe,
  Shield,
  Activity,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react';

const DeploymentPipeline = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPipelines, setSelectedPipelines] = useState<string[]>([]);

  const pipelines = [
    {
      id: 'pipeline-001',
      name: 'Frontend Production Pipeline',
      description: 'Automated deployment for frontend application',
      status: 'active',
      stages: 4,
      lastRun: '2 hours ago',
      successRate: 96,
      avgDuration: '8m 34s',
      triggers: ['push', 'manual'],
      environment: 'Production',
      createdBy: 'John Doe',
      createdAt: '2024-01-15',
    },
    {
      id: 'pipeline-002',
      name: 'Backend API Pipeline',
      description: 'CI/CD pipeline for backend services',
      status: 'active',
      stages: 6,
      lastRun: '1 hour ago',
      successRate: 94,
      avgDuration: '12m 45s',
      triggers: ['push', 'tag'],
      environment: 'Staging',
      createdBy: 'Jane Smith',
      createdAt: '2024-01-10',
    },
    {
      id: 'pipeline-003',
      name: 'Database Migration Pipeline',
      description: 'Automated database schema updates',
      status: 'paused',
      stages: 3,
      lastRun: '1 day ago',
      successRate: 89,
      avgDuration: '5m 20s',
      triggers: ['manual'],
      environment: 'Development',
      createdBy: 'Mike Johnson',
      createdAt: '2024-01-08',
    },
    {
      id: 'pipeline-004',
      name: 'Microservices Pipeline',
      description: 'Multi-service deployment pipeline',
      status: 'active',
      stages: 8,
      lastRun: '30 minutes ago',
      successRate: 98,
      avgDuration: '15m 12s',
      triggers: ['push', 'schedule'],
      environment: 'Production',
      createdBy: 'Sarah Wilson',
      createdAt: '2024-01-12',
    },
    {
      id: 'pipeline-005',
      name: 'Testing Pipeline',
      description: 'Automated testing and quality checks',
      status: 'active',
      stages: 5,
      lastRun: '15 minutes ago',
      successRate: 92,
      avgDuration: '6m 30s',
      triggers: ['push', 'pr'],
      environment: 'Testing',
      createdBy: 'Alex Brown',
      createdAt: '2024-01-20',
    },
  ];

  const pipelineStages = [
    { name: 'Source', icon: GitBranch, status: 'success', duration: '0s' },
    { name: 'Build', icon: Code, status: 'success', duration: '2m 15s' },
    { name: 'Test', icon: Shield, status: 'success', duration: '3m 45s' },
    { name: 'Package', icon: Package, status: 'success', duration: '1m 20s' },
    { name: 'Deploy', icon: Rocket, status: 'success', duration: '1m 14s' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      case 'running': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPipelines = pipelines.filter(pipeline => {
    const matchesSearch = pipeline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pipeline.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || pipeline.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectPipeline = (pipelineId: string) => {
    setSelectedPipelines(prev => 
      prev.includes(pipelineId) 
        ? prev.filter(id => id !== pipelineId)
        : [...prev, pipelineId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPipelines(
      selectedPipelines.length === filteredPipelines.length 
        ? [] 
        : filteredPipelines.map(pipeline => pipeline.id)
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deployment Pipeline</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your CI/CD pipelines</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Settings className="w-4 h-4 mr-2 inline" />
            Bulk Actions
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Create Pipeline
          </button>
        </div>
      </div>

      {/* Pipeline Stages Example */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Stages</h3>
        <div className="flex items-center justify-between">
          {pipelineStages.map((stage, index) => (
            <div key={stage.name} className="flex flex-col items-center">
              <div className={`p-3 rounded-full ${
                stage.status === 'success' ? 'bg-green-100 dark:bg-green-900' : 
                stage.status === 'running' ? 'bg-blue-100 dark:bg-blue-900' : 
                'bg-gray-100 dark:bg-gray-700'
              }`}>
                <stage.icon className={`w-6 h-6 ${
                  stage.status === 'success' ? 'text-green-600 dark:text-green-400' : 
                  stage.status === 'running' ? 'text-blue-600 dark:text-blue-400' : 
                  'text-gray-600 dark:text-gray-400'
                }`} />
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{stage.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stage.duration}</p>
              </div>
              {index < pipelineStages.length - 1 && (
                <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pipelines..."
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
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="failed">Failed</option>
          <option value="running">Running</option>
        </select>
        <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Pipelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPipelines.map((pipeline, index) => (
          <motion.div
            key={pipeline.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedPipelines.includes(pipeline.id)}
                  onChange={() => handleSelectPipeline(pipeline.id)}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Rocket className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{pipeline.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pipeline.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pipeline.status)}`}>
                {getStatusIcon(pipeline.status)}
                <span className="ml-1 capitalize">{pipeline.status}</span>
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Stages</span>
                <span className="text-gray-900 dark:text-white">{pipeline.stages}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-gray-900 dark:text-white">{pipeline.successRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg Duration</span>
                <span className="text-gray-900 dark:text-white">{pipeline.avgDuration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Environment</span>
                <span className="text-gray-900 dark:text-white">{pipeline.environment}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Run</span>
                <span className="text-gray-900 dark:text-white">{pipeline.lastRun}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Triggers</span>
                <div className="flex space-x-1">
                  {pipeline.triggers.map((trigger, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Created by {pipeline.createdBy} on {pipeline.createdAt}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  {pipeline.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Actions */}
      {selectedPipelines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-orange-700 dark:text-orange-300">
              {selectedPipelines.length} pipeline(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                <Play className="w-4 h-4 mr-1 inline" />
                Start
              </button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors">
                <Pause className="w-4 h-4 mr-1 inline" />
                Pause
              </button>
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                <Trash2 className="w-4 h-4 mr-1 inline" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DeploymentPipeline;
