import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  FileText,
  CheckCircle,
  Activity,
  Search,
  Filter,
  RefreshCw,
  Plus,
  Settings,
  Eye,
  Play,
  Server,
  Package,
  Terminal,
} from 'lucide-react';

/**
 * Infrastructure as Code - IaC Management Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface InfrastructureTemplate {
  id: string;
  name: string;
  description: string;
  type: 'terraform' | 'cloudformation' | 'kubernetes' | 'docker' | 'ansible';
  version: string;
  status: 'active' | 'draft' | 'archived' | 'error';
  provider: 'aws' | 'azure' | 'gcp' | 'on-premise';
  environment: 'development' | 'staging' | 'production';
  resources: InfrastructureResource[];
  variables: TemplateVariable[];
  outputs: TemplateOutput[];
  lastModified: string;
  modifiedBy: string;
  deployments: Deployment[];
  validation: ValidationResult;
  tags: string[];
}

interface InfrastructureResource {
  id: string;
  name: string;
  type: string;
  provider: string;
  status: 'created' | 'updated' | 'deleted' | 'pending' | 'error';
  configuration: Record<string, unknown>;
  dependencies: string[];
  outputs: Record<string, unknown>;
}

interface TemplateVariable {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'list' | 'map';
  description: string;
  defaultValue?: unknown;
  required: boolean;
  sensitive: boolean;
}

interface TemplateOutput {
  id: string;
  name: string;
  description: string;
  value: unknown;
  sensitive: boolean;
}

interface Deployment {
  id: string;
  templateId: string;
  environment: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  startedAt: string;
  completedAt?: string;
  duration?: string;
  deployedBy: string;
  plan: DeploymentPlan;
  logs: DeploymentLog[];
}

interface DeploymentPlan {
  id: string;
  changes: PlanChange[];
  summary: PlanSummary;
  generatedAt: string;
}

interface PlanChange {
  id: string;
  resource: string;
  action: 'create' | 'update' | 'delete' | 'no-op';
  changes: Record<string, unknown>;
}

interface PlanSummary {
  toAdd: number;
  toChange: number;
  toDestroy: number;
  total: number;
}

interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  resource?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  lastValidated: string;
}

interface ValidationError {
  id: string;
  message: string;
  resource: string;
  line: number;
  column: number;
}

interface ValidationWarning {
  id: string;
  message: string;
  resource: string;
  line: number;
  column: number;
}

export const InfrastructureAsCode: React.FC = () => {
  const [templates, setTemplates] = useState<InfrastructureTemplate[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    'templates' | 'deployments' | 'resources' | 'validation'
  >('templates');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedTemplate, setSelectedTemplate] = useState<InfrastructureTemplate | null>(null);
  // const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const mockTemplates: InfrastructureTemplate[] = [
      {
        id: '1',
        name: 'Super Admin Portal Infrastructure',
        description:
          'Complete infrastructure setup for Super Admin portal including VPC, EKS, RDS, and ALB',
        type: 'terraform',
        version: 'v1.2.3',
        status: 'active',
        provider: 'aws',
        environment: 'production',
        resources: [
          {
            id: '1',
            name: 'super-admin-vpc',
            type: 'aws_vpc',
            provider: 'aws',
            status: 'created',
            configuration: {
              cidr_block: '10.0.0.0/16',
              enable_dns_hostnames: true,
              enable_dns_support: true,
            },
            dependencies: [],
            outputs: {
              vpc_id: 'vpc-12345678',
              cidr_block: '10.0.0.0/16',
            },
          },
          {
            id: '2',
            name: 'super-admin-eks',
            type: 'aws_eks_cluster',
            provider: 'aws',
            status: 'created',
            configuration: {
              name: 'super-admin-cluster',
              version: '1.28',
              role_arn: 'arn:aws:iam::123456789012:role/eks-cluster-role',
            },
            dependencies: ['super-admin-vpc'],
            outputs: {
              cluster_id: 'super-admin-cluster',
              cluster_endpoint: 'https://super-admin-cluster.region.eks.amazonaws.com',
            },
          },
          {
            id: '3',
            name: 'super-admin-rds',
            type: 'aws_db_instance',
            provider: 'aws',
            status: 'created',
            configuration: {
              identifier: 'super-admin-db',
              engine: 'postgres',
              engine_version: '14.9',
              instance_class: 'db.t3.medium',
              allocated_storage: 100,
            },
            dependencies: ['super-admin-vpc'],
            outputs: {
              db_instance_endpoint: 'super-admin-db.region.rds.amazonaws.com:5432',
              db_instance_id: 'super-admin-db',
            },
          },
        ],
        variables: [
          {
            id: '1',
            name: 'environment',
            type: 'string',
            description: 'Environment name (development, staging, production)',
            defaultValue: 'production',
            required: true,
            sensitive: false,
          },
          {
            id: '2',
            name: 'db_password',
            type: 'string',
            description: 'Database password',
            required: true,
            sensitive: true,
          },
          {
            id: '3',
            name: 'instance_count',
            type: 'number',
            description: 'Number of EKS worker nodes',
            defaultValue: 3,
            required: false,
            sensitive: false,
          },
        ],
        outputs: [
          {
            id: '1',
            name: 'vpc_id',
            description: 'VPC ID',
            value: 'vpc-12345678',
            sensitive: false,
          },
          {
            id: '2',
            name: 'cluster_endpoint',
            description: 'EKS cluster endpoint',
            value: 'https://super-admin-cluster.region.eks.amazonaws.com',
            sensitive: false,
          },
          {
            id: '3',
            name: 'db_endpoint',
            description: 'RDS database endpoint',
            value: 'super-admin-db.region.rds.amazonaws.com:5432',
            sensitive: false,
          },
        ],
        lastModified: '2025-09-14T18:30:00Z',
        modifiedBy: 'MCP Agent Alpha',
        deployments: [
          {
            id: '1',
            templateId: '1',
            environment: 'production',
            status: 'success',
            startedAt: '2025-09-14T18:30:00Z',
            completedAt: '2025-09-14T18:45:00Z',
            duration: '15m 00s',
            deployedBy: 'MCP Agent Alpha',
            plan: {
              id: '1',
              changes: [
                {
                  id: '1',
                  resource: 'aws_vpc.super-admin-vpc',
                  action: 'create',
                  changes: { cidr_block: '10.0.0.0/16' },
                },
                {
                  id: '2',
                  resource: 'aws_eks_cluster.super-admin-eks',
                  action: 'create',
                  changes: { name: 'super-admin-cluster' },
                },
              ],
              summary: {
                toAdd: 8,
                toChange: 0,
                toDestroy: 0,
                total: 8,
              },
              generatedAt: '2025-09-14T18:25:00Z',
            },
            logs: [
              {
                id: '1',
                timestamp: '2025-09-14T18:30:00Z',
                level: 'info',
                message: 'Starting infrastructure deployment',
                resource: 'template',
              },
              {
                id: '2',
                timestamp: '2025-09-14T18:35:00Z',
                level: 'info',
                message: 'VPC created successfully',
                resource: 'aws_vpc.super-admin-vpc',
              },
              {
                id: '3',
                timestamp: '2025-09-14T18:45:00Z',
                level: 'info',
                message: 'Infrastructure deployment completed',
                resource: 'template',
              },
            ],
          },
        ],
        validation: {
          isValid: true,
          errors: [],
          warnings: [
            {
              id: '1',
              message: 'Consider using smaller instance types for cost optimization',
              resource: 'aws_db_instance.super-admin-rds',
              line: 45,
              column: 12,
            },
          ],
          lastValidated: '2025-09-14T18:30:00Z',
        },
        tags: ['production', 'super-admin', 'aws', 'terraform'],
      },
      {
        id: '2',
        name: 'API Gateway Infrastructure',
        description: 'API Gateway infrastructure with Lambda functions and API Gateway',
        type: 'terraform',
        version: 'v2.1.0',
        status: 'active',
        provider: 'aws',
        environment: 'staging',
        resources: [
          {
            id: '4',
            name: 'api-gateway',
            type: 'aws_api_gateway_rest_api',
            provider: 'aws',
            status: 'created',
            configuration: {
              name: 'transbot-api-gateway',
              description: 'TransBot API Gateway',
            },
            dependencies: [],
            outputs: {
              api_id: 'abc123def4',
              execution_arn: 'arn:aws:execute-api:region:account:abc123def4/*',
            },
          },
          {
            id: '5',
            name: 'lambda-functions',
            type: 'aws_lambda_function',
            provider: 'aws',
            status: 'created',
            configuration: {
              function_name: 'transbot-api-handler',
              runtime: 'nodejs18.x',
              handler: 'index.handler',
            },
            dependencies: ['api-gateway'],
            outputs: {
              function_arn: 'arn:aws:lambda:region:account:function:transbot-api-handler',
              function_name: 'transbot-api-handler',
            },
          },
        ],
        variables: [
          {
            id: '4',
            name: 'api_name',
            type: 'string',
            description: 'API Gateway name',
            defaultValue: 'transbot-api-gateway',
            required: true,
            sensitive: false,
          },
          {
            id: '5',
            name: 'lambda_runtime',
            type: 'string',
            description: 'Lambda runtime version',
            defaultValue: 'nodejs18.x',
            required: false,
            sensitive: false,
          },
        ],
        outputs: [
          {
            id: '4',
            name: 'api_endpoint',
            description: 'API Gateway endpoint URL',
            value: 'https://abc123def4.execute-api.region.amazonaws.com/prod',
            sensitive: false,
          },
          {
            id: '5',
            name: 'lambda_arn',
            description: 'Lambda function ARN',
            value: 'arn:aws:lambda:region:account:function:transbot-api-handler',
            sensitive: false,
          },
        ],
        lastModified: '2025-09-14T17:15:00Z',
        modifiedBy: 'MCP Agent Beta',
        deployments: [
          {
            id: '2',
            templateId: '2',
            environment: 'staging',
            status: 'success',
            startedAt: '2025-09-14T17:15:00Z',
            completedAt: '2025-09-14T17:25:00Z',
            duration: '10m 00s',
            deployedBy: 'MCP Agent Beta',
            plan: {
              id: '2',
              changes: [
                {
                  id: '3',
                  resource: 'aws_api_gateway_rest_api.api-gateway',
                  action: 'create',
                  changes: { name: 'transbot-api-gateway' },
                },
              ],
              summary: {
                toAdd: 5,
                toChange: 0,
                toDestroy: 0,
                total: 5,
              },
              generatedAt: '2025-09-14T17:10:00Z',
            },
            logs: [
              {
                id: '4',
                timestamp: '2025-09-14T17:15:00Z',
                level: 'info',
                message: 'Starting API Gateway deployment',
                resource: 'template',
              },
              {
                id: '5',
                timestamp: '2025-09-14T17:25:00Z',
                level: 'info',
                message: 'API Gateway deployment completed',
                resource: 'template',
              },
            ],
          },
        ],
        validation: {
          isValid: true,
          errors: [],
          warnings: [],
          lastValidated: '2025-09-14T17:15:00Z',
        },
        tags: ['staging', 'api-gateway', 'aws', 'terraform'],
      },
    ];

    setTemplates(mockTemplates);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'terraform':
        return <Code className="w-4 h-4 text-purple-500 responsive-container" />;
      case 'cloudformation':
        return <FileText className="w-4 h-4 text-blue-500 responsive-container" />;
      case 'kubernetes':
        return <Package className="w-4 h-4 text-cyan-500 responsive-container" />;
      case 'docker':
        return <Package className="w-4 h-4 text-blue-500 responsive-container" />;
      case 'ansible':
        return <Terminal className="w-4 h-4 text-red-500 responsive-container" />;
      default:
        return <Code className="w-4 h-4 text-gray-500 responsive-container" />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'aws':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'azure':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'gcp':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'on-premise':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
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

  const handleTemplateAction = (templateId: string, action: string) => {
    console.log(`Template ${templateId} action: ${action}`);
    // Implement template actions (deploy, validate, plan, etc.)
  };

  const tabs = [
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'deployments', label: 'Deployments', icon: Activity },
    { id: 'resources', label: 'Resources', icon: Server },
    { id: 'validation', label: 'Validation', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container">
          <div className="flex-1 responsive-container">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">
              Infrastructure as Code
            </h1>
            <p className="text-slate-600 dark:text-slate-400 responsive-container">
              IaC template management and infrastructure automation
            </p>
          </div>

          <div className="flex gap-3 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search templates..."
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
              onClick={() => console.log('Create template modal')}
            aria-label="Button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 responsive-container"
            >
              <Plus className="w-4 h-4 responsive-container" />
              <span>Create Template</span>
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
                  Total Templates
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {templates.length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-4 h-4 mr-1 responsive-container" />
                  {templates.filter(t => t.status === 'active').length} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
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
                  Total Resources
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {templates.reduce((sum, t) => sum + t.resources.length, 0)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-4 h-4 mr-1 responsive-container" />
                  {templates.reduce(
                    (sum, t) => sum + t.resources.filter(r => r.status === 'created').length,
                    0
                  )}{' '}
                  deployed
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
                <Server className="w-6 h-6 text-green-600 dark:text-green-400 responsive-container" />
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">
                  Valid Templates
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {templates.filter(t => t.validation.isValid).length}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-4 h-4 mr-1 responsive-container" />
                  {Math.round(
                    (templates.filter(t => t.validation.isValid).length / templates.length) * 100
                  )}
                  % valid
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
                  Total Deployments
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {templates.reduce((sum, t) => sum + t.deployments.length, 0)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-4 h-4 mr-1 responsive-container" />
                  {templates.reduce(
                    (sum, t) => sum + t.deployments.filter(d => d.status === 'success').length,
                    0
                  )}{' '}
                  successful
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg responsive-container">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400 responsive-container" />
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
                onClick={() => setSelectedTab(tab.id as 'templates' | 'deployments' | 'resources' | 'validation')
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
              {selectedTab === 'templates' && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4 responsive-container"
                >
                  {templates.map((template, index) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container">
                        <div className="flex items-center space-x-4 responsive-container">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                            {getTypeIcon(template.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white responsive-container">
                              {template.name}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                              {template.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 responsive-container">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}
                              >
                                {template.status}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getProviderColor(template.provider)}`}
                              >
                                {template.provider.toUpperCase()}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(template.environment)}`}
                              >
                                {template.environment}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                                v{template.version}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 responsive-container">
                          <div className="text-right responsive-container">
                            <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                              {template.resources.length}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                              Resources
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 responsive-container">
                            <button
                              onClick={() => handleTemplateAction(template.id, 'plan')}
            aria-label="Button"
                              className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors responsive-container"
                              title="Generate Plan"
                            >
                              <Eye className="w-4 h-4 text-blue-600 responsive-container" />
                            </button>
                            <button
                              onClick={() => handleTemplateAction(template.id, 'deploy')}
            aria-label="Button"
                              className="p-2 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors responsive-container"
                              title="Deploy Template"
                            >
                              <Play className="w-4 h-4 text-green-600 responsive-container" />
                            </button>
                            <button
                              onClick={() => handleTemplateAction(template.id, 'validate')}
            aria-label="Button"
                              className="p-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-lg transition-colors responsive-container"
                              title="Validate Template"
                            >
                              <CheckCircle className="w-4 h-4 text-purple-600 responsive-container" />
                            </button>
                            <button
                              onClick={() => console.log('View template details', template.id)}
            aria-label="Button"
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900/20 rounded-lg transition-colors responsive-container"
                              title="View Details"
                            >
                              <Settings className="w-4 h-4 text-gray-600 responsive-container" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Resources Summary */}
                      <div className="mt-4 responsive-container">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 responsive-container">
                          Infrastructure Resources
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 responsive-container">
                          {template.resources.map(resource => (
                            <div
                              key={resource.id}
                              className="bg-white dark:bg-slate-800 rounded-lg p-3 responsive-container"
                            >
                              <div className="flex items-center justify-between mb-2 responsive-container">
                                <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">
                                  {resource.name}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    resource.status === 'created'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                      : resource.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                  }`}
                                >
                                  {resource.status}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                                {resource.type} • {resource.provider}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'deployments' && (
                <motion.div
                  key="deployments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  <div className="text-center py-12 responsive-container">
                    <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 responsive-container">
                      Deployment History
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 responsive-container">
                      Track and manage infrastructure deployment history
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                      View Deployment Logs
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  <div className="text-center py-12 responsive-container">
                    <Server className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 responsive-container">
                      Infrastructure Resources
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 responsive-container">
                      Manage and monitor infrastructure resources across all environments
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                      View Resource Details
                    </button>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'validation' && (
                <motion.div
                  key="validation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 responsive-container"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Validation Results
                      </h3>
                      <div className="space-y-3 responsive-container">
                        {templates.map(template => (
                          <div
                            key={template.id}
                            className="bg-white dark:bg-slate-800 rounded-lg p-4 responsive-container"
                          >
                            <div className="flex items-center justify-between responsive-container">
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white responsive-container">
                                  {template.name}
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 responsive-container">
                                  {template.validation.errors.length} errors,{' '}
                                  {template.validation.warnings.length} warnings
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  template.validation.isValid
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                }`}
                              >
                                {template.validation.isValid ? 'Valid' : 'Invalid'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">
                        Validation Summary
                      </h3>
                      <div className="h-64 flex items-center justify-center responsive-container">
                        <div className="text-center responsive-container">
                          <CheckCircle className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                          <p className="text-slate-500 dark:text-slate-400 responsive-container">
                            Validation summary chart
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

export default InfrastructureAsCode;
}