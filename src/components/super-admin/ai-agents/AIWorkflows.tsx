import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Settings,
  Eye,
  Edit,
  Trash2,
  Copy,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Database,
  Globe,
  Brain,
} from 'lucide-react';

const AIWorkflows = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const workflows = [
    {
      id: 'wf-001',
      name: 'Customer Onboarding',
      description: 'Automated customer onboarding process',
      status: 'active',
      triggers: 3,
      steps: 8,
      lastRun: '2 minutes ago',
      successRate: 94,
      avgDuration: '2.3 min',
      createdBy: 'John Doe',
      createdAt: '2024-01-15',
    },
    {
      id: 'wf-002',
      name: 'Data Processing Pipeline',
      description: 'Process and validate incoming data',
      status: 'active',
      triggers: 1,
      steps: 12,
      lastRun: '5 minutes ago',
      successRate: 98,
      avgDuration: '5.7 min',
      createdBy: 'Jane Smith',
      createdAt: '2024-01-10',
    },
    {
      id: 'wf-003',
      name: 'Content Generation',
      description: 'Generate marketing content automatically',
      status: 'paused',
      triggers: 2,
      steps: 6,
      lastRun: '1 hour ago',
      successRate: 89,
      avgDuration: '1.8 min',
      createdBy: 'Mike Johnson',
      createdAt: '2024-01-08',
    },
    {
      id: 'wf-004',
      name: 'Security Monitoring',
      description: 'Monitor system security and alerts',
      status: 'active',
      triggers: 5,
      steps: 15,
      lastRun: '30 seconds ago',
      successRate: 99,
      avgDuration: '0.5 min',
      createdBy: 'Sarah Wilson',
      createdAt: '2024-01-12',
    },
    {
      id: 'wf-005',
      name: 'Report Generation',
      description: 'Generate daily and weekly reports',
      status: 'draft',
      triggers: 0,
      steps: 4,
      lastRun: 'Never',
      successRate: 0,
      avgDuration: 'N/A',
      createdBy: 'Alex Brown',
      createdAt: '2024-01-20',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || workflow.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Workflows</h1>
          <p className="text-gray-600 dark:text-gray-400">Design and manage automated workflows</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Copy className="w-4 h-4 mr-2 inline" />
            Import
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Create Workflow
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Workflows</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{workflows.length}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Workflow className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600">{workflows.filter(w => w.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Success Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Runs Today</p>
              <p className="text-2xl font-bold text-orange-600">1,247</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          <option value="draft">Draft</option>
          <option value="error">Error</option>
        </select>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow, index) => (
          <motion.div
            key={workflow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Workflow className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{workflow.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{workflow.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                {getStatusIcon(workflow.status)}
                <span className="ml-1 capitalize">{workflow.status}</span>
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Triggers</span>
                <span className="text-gray-900 dark:text-white">{workflow.triggers}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Steps</span>
                <span className="text-gray-900 dark:text-white">{workflow.steps}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-gray-900 dark:text-white">{workflow.successRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg Duration</span>
                <span className="text-gray-900 dark:text-white">{workflow.avgDuration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Last Run</span>
                <span className="text-gray-900 dark:text-white">{workflow.lastRun}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Created by {workflow.createdBy} on {workflow.createdAt}
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  {workflow.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

export default AIWorkflows;
