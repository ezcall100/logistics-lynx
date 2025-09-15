import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Activity,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  BarChart3,
  Play,
  Pause,
  Search,
  Filter,
  Plus,
  RefreshCw,
  FileText,
  Eye,
} from 'lucide-react';

/**
 * Agent Workflows - Intelligent Workflow Automation Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'running' | 'paused' | 'error';
  priority: 'low' | 'medium' | 'high' | 'critical';
  triggers: string[];
  steps: WorkflowStep[];
  lastRun: string;
  nextRun: string;
  successRate: number;
  totalRuns: number;
  avgDuration: string;
  createdBy: string;
  createdAt: string;
  tags: string[];
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'action' | 'condition' | 'loop' | 'parallel' | 'delay';
  agent: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  duration: string;
  output: string;
  error?: string;
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: string;
  steps: WorkflowStep[];
  triggeredBy: string;
  progress: number;
}

export const AgentWorkflows: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [selectedTab, setSelectedTab] = useState<'workflows' | 'executions' | 'templates' | 'analytics'>('workflows');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  // const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const mockWorkflows: Workflow[] = [
      {
        id: '1',
        name: 'Super Admin Portal Testing',
        description: 'Comprehensive testing workflow for Super Admin portal features',
        status: 'active',
        priority: 'high',
        triggers: ['schedule', 'manual', 'webhook'],
        steps: [
          {
            id: '1',
            name: 'Initialize Testing Environment',
            type: 'action',
            agent: 'UI Testing Agent Alpha',
            status: 'completed',
            duration: '2m 15s',
            output: 'Environment initialized successfully',
          },
          {
            id: '2',
            name: 'Run Navigation Tests',
            type: 'action',
            agent: 'UI Testing Agent Alpha',
            status: 'running',
            duration: '1m 30s',
            output: 'Running navigation tests...',
          },
          {
            id: '3',
            name: 'Validate User Management',
            type: 'action',
            agent: 'UI Testing Agent Alpha',
            status: 'pending',
            duration: '0s',
            output: '',
          },
        ],
        lastRun: '2025-09-14T18:30:00Z',
        nextRun: '2025-09-14T20:00:00Z',
        successRate: 94.2,
        totalRuns: 127,
        avgDuration: '15m 32s',
        createdBy: 'MCP Admin',
        createdAt: '2025-09-01T10:00:00Z',
        tags: ['testing', 'ui', 'automation'],
      },
      {
        id: '2',
        name: 'Security Vulnerability Scan',
        description: 'Automated security scanning and vulnerability assessment',
        status: 'running',
        priority: 'critical',
        triggers: ['schedule', 'manual'],
        steps: [
          {
            id: '1',
            name: 'System Scan',
            type: 'action',
            agent: 'Security Agent Beta',
            status: 'completed',
            duration: '8m 45s',
            output: 'System scan completed, 3 vulnerabilities found',
          },
          {
            id: '2',
            name: 'Vulnerability Analysis',
            type: 'action',
            agent: 'Security Agent Beta',
            status: 'running',
            duration: '3m 20s',
            output: 'Analyzing vulnerabilities...',
          },
        ],
        lastRun: '2025-09-14T18:00:00Z',
        nextRun: '2025-09-14T22:00:00Z',
        successRate: 98.7,
        totalRuns: 89,
        avgDuration: '12m 15s',
        createdBy: 'Security Admin',
        createdAt: '2025-08-15T14:30:00Z',
        tags: ['security', 'scanning', 'vulnerability'],
      },
      {
        id: '3',
        name: 'Performance Report Generation',
        description: 'Generate comprehensive performance analytics reports',
        status: 'active',
        priority: 'medium',
        triggers: ['schedule'],
        steps: [
          {
            id: '1',
            name: 'Collect Metrics',
            type: 'action',
            agent: 'Analytics Agent Gamma',
            status: 'completed',
            duration: '5m 10s',
            output: 'Metrics collected successfully',
          },
          {
            id: '2',
            name: 'Generate Report',
            type: 'action',
            agent: 'Analytics Agent Gamma',
            status: 'completed',
            duration: '3m 45s',
            output: 'Report generated and saved',
          },
        ],
        lastRun: '2025-09-14T17:00:00Z',
        nextRun: '2025-09-15T09:00:00Z',
        successRate: 99.1,
        totalRuns: 156,
        avgDuration: '8m 55s',
        createdBy: 'Analytics Admin',
        createdAt: '2025-07-20T09:15:00Z',
        tags: ['analytics', 'reporting', 'performance'],
      },
    ];

    const mockExecutions: WorkflowExecution[] = [
      {
        id: '1',
        workflowId: '1',
        workflowName: 'Super Admin Portal Testing',
        status: 'running',
        startTime: '2025-09-14T18:30:00Z',
        progress: 65,
        triggeredBy: 'Scheduled Trigger',
        steps: [
          {
            id: '1',
            name: 'Initialize Testing Environment',
            type: 'action',
            agent: 'UI Testing Agent Alpha',
            status: 'completed',
            duration: '2m 15s',
            output: 'Environment initialized successfully',
          },
          {
            id: '2',
            name: 'Run Navigation Tests',
            type: 'action',
            agent: 'UI Testing Agent Alpha',
            status: 'running',
            duration: '1m 30s',
            output: 'Running navigation tests...',
          },
          {
            id: '3',
            name: 'Validate User Management',
            type: 'action',
            agent: 'UI Testing Agent Alpha',
            status: 'pending',
            duration: '0s',
            output: '',
          },
        ],
      },
      {
        id: '2',
        workflowId: '2',
        workflowName: 'Security Vulnerability Scan',
        status: 'completed',
        startTime: '2025-09-14T18:00:00Z',
        endTime: '2025-09-14T18:12:15Z',
        duration: '12m 15s',
        progress: 100,
        triggeredBy: 'Manual Trigger',
        steps: [
          {
            id: '1',
            name: 'System Scan',
            type: 'action',
            agent: 'Security Agent Beta',
            status: 'completed',
            duration: '8m 45s',
            output: 'System scan completed, 3 vulnerabilities found',
          },
          {
            id: '2',
            name: 'Vulnerability Analysis',
            type: 'action',
            agent: 'Security Agent Beta',
            status: 'completed',
            duration: '3m 30s',
            output: 'Vulnerability analysis completed',
          },
        ],
      },
    ];

    setWorkflows(mockWorkflows);
    setExecutions(mockExecutions);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'running':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-500" />;
      case 'skipped':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleWorkflowAction = (workflowId: string, action: string) => {
    console.log(`Workflow ${workflowId} action: ${action}`);
    // Implement workflow actions (start, stop, pause, etc.)
  };

  const tabs = [
    { id: 'workflows', label: 'Workflows', icon: Brain },
    { id: 'executions', label: 'Executions', icon: Activity },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Agent Workflows</h1>
            <p className="text-slate-600 dark:text-slate-400">Intelligent workflow automation and orchestration</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search workflows..."
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
              onClick={() => console.log('Create modal')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Workflow</span>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Workflows</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{workflows.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {workflows.filter(w => w.status === 'active').length} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Running Executions</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {executions.filter(e => e.status === 'running').length}
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
                  {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Executions</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {workflows.reduce((sum, w) => sum + w.totalRuns, 0).toLocaleString()}
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
                onClick={() => setSelectedTab(tab.id as any)}
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
              {selectedTab === 'workflows' && (
                <motion.div
                  key="workflows"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {workflows.map((workflow, index) => (
                    <motion.div
                      key={workflow.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{workflow.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{workflow.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                                {workflow.status}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(workflow.priority)}`}>
                                {workflow.priority}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {workflow.totalRuns} runs
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right mr-4">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                              {workflow.successRate}%
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Success Rate
                            </div>
                          </div>
                          <button
                            onClick={() => handleWorkflowAction(workflow.id, 'start')}
                            className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Start Workflow"
                          >
                            <Play className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleWorkflowAction(workflow.id, 'pause')}
                            className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                            title="Pause Workflow"
                          >
                            <Pause className="w-4 h-4 text-yellow-600" />
                          </button>
                          <button
                            onClick={() => console.log('Selected workflow:', workflow.id)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Workflow Steps */}
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Workflow Steps</h4>
                        <div className="space-y-2">
                          {workflow.steps.map((step) => (
                            <div key={step.id} className="flex items-center space-x-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
                              <div className="flex-shrink-0">
                                {getStepStatusIcon(step.status)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-900 dark:text-white">{step.name}</span>
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{step.duration}</span>
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {step.agent} • {step.type}
                                </div>
                                {step.output && (
                                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                    {step.output}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'executions' && (
                <motion.div
                  key="executions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {executions.map((execution, index) => (
                    <motion.div
                      key={execution.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{execution.workflowName}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Started: {new Date(execution.startTime).toLocaleString()}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(execution.status)}`}>
                                {execution.status}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {execution.triggeredBy}
                              </span>
                              {execution.duration && (
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  Duration: {execution.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                              {execution.progress}%
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              Progress
                            </div>
                          </div>
                          <div className="w-16 h-16 relative">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-slate-200 dark:text-slate-700"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-blue-600"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${execution.progress}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'templates' && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Workflow Templates</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                      Pre-built workflow templates for common automation tasks
                    </p>
                    <button 
                      onClick={() => console.log('Create modal')}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Browse Templates
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
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Execution Trends</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Execution trends chart</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Success Rates</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Success rate analytics</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Summary */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Workflow Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { name: 'Avg Execution Time', value: '12m 34s', trend: '-2m 15s' },
                        { name: 'Success Rate', value: '97.3%', trend: '+1.2%' },
                        { name: 'Failed Executions', value: '23', trend: '-5' },
                        { name: 'Active Workflows', value: '8', trend: '+2' },
                      ].map((item) => (
                        <div key={item.name} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{item.name}</h4>
                            <span className="text-sm text-green-600 dark:text-green-400">{item.trend}</span>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</div>
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

export default AgentWorkflows;
