import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Link,
  Bell,
  Star,
  Heart,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Zap,
  Shield,
  Key,
  Lock,
  Unlock,
  Database,
  Server,
  Network,
  HardDrive,
  Cpu,
  MemoryStick,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  Globe,
  Globe2,
  Building,
  Calendar,
  Users,
  Play,
  Pause,
  RotateCcw,
  Package,
  Layers,
  Target,
  Terminal,
  Folder,
  File,
  Save,
  Upload,
  Download as DownloadIcon,
  BarChart3,
  PieChart,
  LineChart,
  GitBranch,
  Code,
  FileText,
} from 'lucide-react';

/**
 * DevOps Analytics - Performance Intelligence Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface DevOpsMetric {
  id: string;
  name: string;
  category: 'deployment' | 'performance' | 'reliability' | 'efficiency' | 'cost';
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastUpdated: string;
  description: string;
}

interface DeploymentMetric {
  id: string;
  environment: string;
  service: string;
  frequency: number;
  successRate: number;
  avgDuration: number;
  leadTime: number;
  mttr: number;
  changeFailureRate: number;
  lastDeployment: string;
  trend: 'up' | 'down' | 'stable';
}

interface PerformanceMetric {
  id: string;
  service: string;
  environment: string;
  responseTime: number;
  throughput: number;
  errorRate: number;
  availability: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  lastUpdated: string;
}

interface ReliabilityMetric {
  id: string;
  service: string;
  environment: string;
  uptime: number;
  mttr: number;
  mtbf: number;
  incidentCount: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  lastIncident: string;
  trend: 'up' | 'down' | 'stable';
}

interface CostMetric {
  id: string;
  service: string;
  environment: string;
  monthlyCost: number;
  resourceCost: number;
  computeCost: number;
  storageCost: number;
  networkCost: number;
  trend: 'up' | 'down' | 'stable';
  budget: number;
  utilization: number;
}

export const DevOpsAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<DevOpsMetric[]>([]);
  const [deploymentMetrics, setDeploymentMetrics] = useState<DeploymentMetric[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [reliabilityMetrics, setReliabilityMetrics] = useState<ReliabilityMetric[]>([]);
  const [costMetrics, setCostMetrics] = useState<CostMetric[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'deployments' | 'performance' | 'reliability' | 'cost'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    const mockMetrics: DevOpsMetric[] = [
      {
        id: '1',
        name: 'Deployment Frequency',
        category: 'deployment',
        value: 12.5,
        unit: 'deployments/day',
        trend: 'up',
        change: 15.2,
        target: 10,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Average number of deployments per day',
      },
      {
        id: '2',
        name: 'Lead Time',
        category: 'deployment',
        value: 2.3,
        unit: 'hours',
        trend: 'down',
        change: -8.5,
        target: 4,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Time from commit to production',
      },
      {
        id: '3',
        name: 'Mean Time to Recovery',
        category: 'reliability',
        value: 15.2,
        unit: 'minutes',
        trend: 'down',
        change: -12.3,
        target: 30,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Average time to recover from incidents',
      },
      {
        id: '4',
        name: 'Change Failure Rate',
        category: 'reliability',
        value: 2.1,
        unit: '%',
        trend: 'down',
        change: -1.8,
        target: 5,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Percentage of deployments causing incidents',
      },
      {
        id: '5',
        name: 'System Availability',
        category: 'reliability',
        value: 99.9,
        unit: '%',
        trend: 'stable',
        change: 0.1,
        target: 99.5,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'System uptime percentage',
      },
      {
        id: '6',
        name: 'Response Time',
        category: 'performance',
        value: 145,
        unit: 'ms',
        trend: 'down',
        change: -8.2,
        target: 200,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Average API response time',
      },
      {
        id: '7',
        name: 'Error Rate',
        category: 'performance',
        value: 0.05,
        unit: '%',
        trend: 'down',
        change: -0.02,
        target: 0.1,
        status: 'excellent',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Percentage of failed requests',
      },
      {
        id: '8',
        name: 'Monthly Cost',
        category: 'cost',
        value: 2847.50,
        unit: 'USD',
        trend: 'down',
        change: -5.2,
        target: 3000,
        status: 'good',
        lastUpdated: '2025-09-14T19:00:00Z',
        description: 'Total monthly infrastructure cost',
      },
    ];

    const mockDeploymentMetrics: DeploymentMetric[] = [
      {
        id: '1',
        environment: 'production',
        service: 'Super Admin Portal',
        frequency: 8.5,
        successRate: 98.2,
        avgDuration: 12.3,
        leadTime: 1.8,
        mttr: 12.5,
        changeFailureRate: 1.8,
        lastDeployment: '2025-09-14T18:30:00Z',
        trend: 'up',
      },
      {
        id: '2',
        environment: 'staging',
        service: 'API Gateway',
        frequency: 15.2,
        successRate: 99.1,
        avgDuration: 8.7,
        leadTime: 2.1,
        mttr: 8.3,
        changeFailureRate: 0.9,
        lastDeployment: '2025-09-14T17:45:00Z',
        trend: 'up',
      },
      {
        id: '3',
        environment: 'development',
        service: 'Worker Services',
        frequency: 25.8,
        successRate: 96.5,
        avgDuration: 5.2,
        leadTime: 0.8,
        mttr: 18.7,
        changeFailureRate: 3.5,
        lastDeployment: '2025-09-14T19:00:00Z',
        trend: 'stable',
      },
    ];

    const mockPerformanceMetrics: PerformanceMetric[] = [
      {
        id: '1',
        service: 'Super Admin Portal',
        environment: 'production',
        responseTime: 145,
        throughput: 1250,
        errorRate: 0.05,
        availability: 99.9,
        cpuUsage: 45.2,
        memoryUsage: 67.8,
        diskUsage: 34.5,
        lastUpdated: '2025-09-14T19:00:00Z',
      },
      {
        id: '2',
        service: 'API Gateway',
        environment: 'production',
        responseTime: 89,
        throughput: 2100,
        errorRate: 0.02,
        availability: 99.95,
        cpuUsage: 32.1,
        memoryUsage: 45.6,
        diskUsage: 28.9,
        lastUpdated: '2025-09-14T19:00:00Z',
      },
    ];

    const mockReliabilityMetrics: ReliabilityMetric[] = [
      {
        id: '1',
        service: 'Super Admin Portal',
        environment: 'production',
        uptime: 99.9,
        mttr: 12.5,
        mtbf: 720,
        incidentCount: 2,
        severity: 'low',
        lastIncident: '2025-09-10T14:30:00Z',
        trend: 'up',
      },
      {
        id: '2',
        service: 'API Gateway',
        environment: 'production',
        uptime: 99.95,
        mttr: 8.3,
        mtbf: 960,
        incidentCount: 1,
        severity: 'low',
        lastIncident: '2025-09-08T09:15:00Z',
        trend: 'up',
      },
    ];

    const mockCostMetrics: CostMetric[] = [
      {
        id: '1',
        service: 'Super Admin Portal',
        environment: 'production',
        monthlyCost: 1247.50,
        resourceCost: 890.25,
        computeCost: 567.30,
        storageCost: 123.45,
        networkCost: 66.50,
        trend: 'down',
        budget: 1500,
        utilization: 83.2,
      },
      {
        id: '2',
        service: 'API Gateway',
        environment: 'production',
        monthlyCost: 623.75,
        resourceCost: 445.12,
        computeCost: 283.65,
        storageCost: 61.73,
        networkCost: 33.25,
        trend: 'down',
        budget: 800,
        utilization: 78.0,
      },
    ];

    setMetrics(mockMetrics);
    setDeploymentMetrics(mockDeploymentMetrics);
    setPerformanceMetrics(mockPerformanceMetrics);
    setReliabilityMetrics(mockReliabilityMetrics);
    setCostMetrics(mockCostMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <Activity className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'deployment':
        return <GitBranch className="w-4 h-4 text-blue-500" />;
      case 'performance':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'reliability':
        return <Shield className="w-4 h-4 text-purple-500" />;
      case 'efficiency':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'cost':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'deployments', label: 'Deployments', icon: GitBranch },
    { id: 'performance', label: 'Performance', icon: Activity },
    { id: 'reliability', label: 'Reliability', icon: Shield },
    { id: 'cost', label: 'Cost', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">DevOps Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400">Performance intelligence and DevOps metrics dashboard</p>
          </div>
          
          <div className="flex gap-3">
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.slice(0, 4).map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  {getCategoryIcon(metric.category)}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{metric.name}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {metric.category === 'cost' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                </p>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                    metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">vs target</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                    onClick={() => setSelectedTab(tab.id as 'overview' | 'performance' | 'costs' | 'security')}
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
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* All Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getCategoryIcon(metric.category)}
                            <h3 className="font-semibold text-slate-900 dark:text-white">{metric.name}</h3>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                            {metric.status}
                          </span>
                        </div>
                        <div className="mb-4">
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            {metric.category === 'cost' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{metric.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(metric.trend)}
                            <span className={`text-sm font-medium ${
                              metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                              metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                              'text-blue-600 dark:text-blue-400'
                            }`}>
                              {metric.change > 0 ? '+' : ''}{metric.change}%
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-slate-500 dark:text-slate-400">Target</div>
                            <div className="text-sm font-medium text-slate-900 dark:text-white">
                              {metric.category === 'cost' ? formatCurrency(metric.target) : `${metric.target}${metric.unit}`}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'deployments' && (
                <motion.div
                  key="deployments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {deploymentMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{metric.service}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{metric.environment}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            Last: {new Date(metric.lastDeployment).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Frequency</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.frequency}/day</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Success Rate</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.successRate}%</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Lead Time</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.leadTime}h</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">MTTR</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.mttr}m</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'performance' && (
                <motion.div
                  key="performance"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {performanceMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{metric.service}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{metric.environment}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Availability</div>
                          <div className="text-xl font-bold text-green-600 dark:text-green-400">{metric.availability}%</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Response Time</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.responseTime}ms</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Throughput</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.throughput}/s</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Error Rate</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.errorRate}%</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">CPU Usage</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.cpuUsage}%</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'reliability' && (
                <motion.div
                  key="reliability"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {reliabilityMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{metric.service}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{metric.environment}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            metric.severity === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            metric.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            metric.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {metric.severity}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Uptime</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.uptime}%</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">MTTR</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.mttr}m</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">MTBF</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.mtbf}h</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Incidents</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.incidentCount}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'cost' && (
                <motion.div
                  key="cost"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {costMetrics.map((metric, index) => (
                    <motion.div
                      key={metric.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{metric.service}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{metric.environment}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <div className="text-right">
                            <div className="text-sm text-slate-500 dark:text-slate-400">Budget Utilization</div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">{metric.utilization}%</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Total Cost</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(metric.monthlyCost)}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Compute</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(metric.computeCost)}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Storage</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(metric.storageCost)}</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">Network</div>
                          <div className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(metric.networkCost)}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsAnalytics;
