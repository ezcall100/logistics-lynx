import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Users,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Mail,
  MessageSquare,
  Bell,
  Shield,
  Award,
  Zap,
  Star,
  Globe,
  Building,
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Settings,
  FileText,
  Image,
  Video,
  Link,
  ExternalLink,
} from 'lucide-react';

/**
 * User Onboarding Page - Redesigned
 * Comprehensive user onboarding flow management and optimization
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:35:00.000Z
 */

interface OnboardingFlow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'draft' | 'archived' | 'testing';
  steps: OnboardingStep[];
  targetAudience: string[];
  completionRate: number;
  avgCompletionTime: number;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: 'welcome' | 'form' | 'tutorial' | 'verification' | 'completion';
  order: number;
  isRequired: boolean;
  estimatedTime: number;
  completionRate: number;
  content: {
    title: string;
    description: string;
    media?: string;
    formFields?: Record<string, unknown>[];
    actions: string[];
  };
}

interface OnboardingMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface UserProgress {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  flowId: string;
  flowName: string;
  currentStep: number;
  totalSteps: number;
  progress: number;
  status: 'in-progress' | 'completed' | 'abandoned' | 'paused';
  startedAt: string;
  lastActivity: string;
  completedAt?: string;
  timeSpent: number;
  device: 'desktop' | 'mobile' | 'tablet';
  source: string;
}

export const UserOnboarding: React.FC = () => {
  const [flows, setFlows] = useState<OnboardingFlow[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedFlow, setSelectedFlow] = useState<OnboardingFlow | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'flows' | 'progress' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFlowModal, setShowFlowModal] = useState(false);

  // Mock onboarding metrics
  const onboardingMetrics: OnboardingMetric[] = [
    {
      id: 'total-flows',
      title: 'Total Flows',
      value: 8,
      change: 2,
      changeType: 'increase',
      period: 'vs last month',
      icon: UserPlus,
      color: 'bg-blue-500',
    },
    {
      id: 'active-users',
      title: 'Users in Onboarding',
      value: 234,
      change: 15.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      value: 78.5,
      change: 5.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: Target,
      color: 'bg-purple-500',
    },
    {
      id: 'avg-time',
      title: 'Avg Completion Time',
      value: 12.3,
      change: -8.1,
      changeType: 'decrease',
      period: 'vs last month',
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      id: 'abandonment-rate',
      title: 'Abandonment Rate',
      value: 21.5,
      change: -3.2,
      changeType: 'decrease',
      period: 'vs last month',
      icon: XCircle,
      color: 'bg-red-500',
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction Score',
      value: 4.6,
      change: 0.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: Star,
      color: 'bg-indigo-500',
    },
  ];

  // Mock data
  useEffect(() => {
    const mockFlows: OnboardingFlow[] = [
      {
        id: 'flow_1',
        name: 'New User Welcome',
        description: 'Complete onboarding flow for new users',
        version: '2.1',
        status: 'active',
        steps: [
          {
            id: 'step_1',
            title: 'Welcome Message',
            description: 'Welcome new users to the platform',
            type: 'welcome',
            order: 1,
            isRequired: true,
            estimatedTime: 2,
            completionRate: 95,
            content: {
              title: 'Welcome to Our Platform!',
              description: 'Let\'s get you started with a quick tour.',
              actions: ['Get Started', 'Skip Tour'],
            },
          },
          {
            id: 'step_2',
            title: 'Profile Setup',
            description: 'Complete user profile information',
            type: 'form',
            order: 2,
            isRequired: true,
            estimatedTime: 5,
            completionRate: 87,
            content: {
              title: 'Complete Your Profile',
              description: 'Tell us a bit about yourself.',
              formFields: ['name', 'company', 'role'],
              actions: ['Save & Continue', 'Skip'],
            },
          },
          {
            id: 'step_3',
            title: 'Feature Tour',
            description: 'Interactive tour of key features',
            type: 'tutorial',
            order: 3,
            isRequired: false,
            estimatedTime: 8,
            completionRate: 72,
            content: {
              title: 'Explore Key Features',
              description: 'Learn about the main features of our platform.',
              actions: ['Start Tour', 'Skip'],
            },
          },
        ],
        targetAudience: ['new-users', 'free-trial'],
        completionRate: 78.5,
        avgCompletionTime: 12.3,
        userCount: 1247,
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-03-20T00:00:00Z',
        createdBy: 'Admin User',
      },
      {
        id: 'flow_2',
        name: 'Premium Upgrade',
        description: 'Onboarding flow for premium plan users',
        version: '1.3',
        status: 'active',
        steps: [
          {
            id: 'step_1',
            title: 'Welcome to Premium',
            description: 'Welcome message for premium users',
            type: 'welcome',
            order: 1,
            isRequired: true,
            estimatedTime: 3,
            completionRate: 92,
            content: {
              title: 'Welcome to Premium!',
              description: 'Unlock all premium features.',
              actions: ['Explore Features', 'Get Started'],
            },
          },
          {
            id: 'step_2',
            title: 'Premium Features',
            description: 'Overview of premium features',
            type: 'tutorial',
            order: 2,
            isRequired: true,
            estimatedTime: 10,
            completionRate: 85,
            content: {
              title: 'Premium Features Overview',
              description: 'Discover what\'s included in your premium plan.',
              actions: ['Continue', 'Skip'],
            },
          },
        ],
        targetAudience: ['premium-users'],
        completionRate: 85.2,
        avgCompletionTime: 8.7,
        userCount: 456,
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-03-15T00:00:00Z',
        createdBy: 'Admin User',
      },
    ];

    const mockUserProgress: UserProgress[] = Array.from({ length: 50 }, (_, i) => ({
      id: `progress_${i + 1}`,
      userId: `user_${i + 1}`,
      userName: `User ${i + 1}`,
      userEmail: `user${i + 1}@demo-company.com`,
      flowId: `flow_${Math.floor(Math.random() * 2) + 1}`,
      flowName: ['New User Welcome', 'Premium Upgrade'][Math.floor(Math.random() * 2)],
      currentStep: Math.floor(Math.random() * 5) + 1,
      totalSteps: 5,
      progress: Math.floor(Math.random() * 100),
      status: ['in-progress', 'completed', 'abandoned', 'paused'][Math.floor(Math.random() * 4)] as 'in-progress' | 'completed' | 'abandoned' | 'paused',
      startedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString(),
      completedAt: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      timeSpent: Math.floor(Math.random() * 30) + 5,
      device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)] as 'desktop' | 'mobile' | 'tablet',
      source: ['direct', 'email', 'social', 'referral'][Math.floor(Math.random() * 4)],
    }));

    setFlows(mockFlows);
    setUserProgress(mockUserProgress);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'testing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'abandoned':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'draft':
      case 'paused':
        return <Pause className="w-4 h-4" />;
      case 'archived':
        return <XCircle className="w-4 h-4" />;
      case 'testing':
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'abandoned':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return <UserPlus className="w-4 h-4" />;
      case 'form':
        return <FileText className="w-4 h-4" />;
      case 'tutorial':
        return <Play className="w-4 h-4" />;
      case 'verification':
        return <Shield className="w-4 h-4" />;
      case 'completion':
        return <Award className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop':
        return Monitor;
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const getDeviceColor = (device: string) => {
    switch (device) {
      case 'desktop':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'mobile':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'tablet':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProgress = userProgress.filter(progress => {
    const matchesSearch = progress.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         progress.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         progress.flowName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || progress.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'flows', label: 'Onboarding Flows', icon: UserPlus, count: flows.length },
    { id: 'progress', label: 'User Progress', icon: Users, count: userProgress.length },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Onboarding</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Design, manage, and optimize user onboarding flows for better user experience
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Flow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as 'overview' | 'flows' | 'progress' | 'analytics')}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search flows, users, or progress..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="testing">Testing</option>
              <option value="archived">Archived</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="abandoned">Abandoned</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              {onboardingMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                        <Icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        {metric.changeType === 'increase' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : metric.changeType === 'decrease' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.changeType === 'increase' ? 'text-green-600 dark:text-green-400' :
                          metric.changeType === 'decrease' ? 'text-red-600 dark:text-red-400' :
                          'text-gray-600 dark:text-gray-400'
                        }`}>
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {metric.value}
                      {metric.id === 'completion-rate' && '%'}
                      {metric.id === 'avg-time' && 'm'}
                      {metric.id === 'abandonment-rate' && '%'}
                      {metric.id === 'satisfaction' && '/5'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {metric.period}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Flows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Flows</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {flows.slice(0, 3).map((flow) => (
                      <motion.div
                        key={flow.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          setSelectedFlow(flow);
                          setShowFlowModal(true);
                        }}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{flow.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{flow.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-white">{flow.completionRate}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">completion</div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(flow.status)}`}>
                            {getStatusIcon(flow.status)}
                            <span className="ml-1 capitalize">{flow.status}</span>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Progress</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {userProgress.slice(0, 5).map((progress) => {
                      const DeviceIcon = getDeviceIcon(progress.device);
                      return (
                        <motion.div
                          key={progress.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              <UserPlus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{progress.userName}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{progress.flowName}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{progress.progress}%</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Step {progress.currentStep}/{progress.totalSteps}</div>
                            </div>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDeviceColor(progress.device)}`}>
                              <DeviceIcon className="w-3 h-3 mr-1" />
                              {progress.device}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'flows' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredFlows.map((flow) => (
              <motion.div
                key={flow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedFlow(flow);
                  setShowFlowModal(true);
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{flow.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flow.status)}`}>
                            {getStatusIcon(flow.status)}
                            <span className="ml-1 capitalize">{flow.status}</span>
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">v{flow.version}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{flow.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{flow.completionRate}%</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Completion</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{flow.avgCompletionTime}m</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Avg Time</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Steps ({flow.steps.length})</h4>
                    <div className="space-y-2">
                      {flow.steps.slice(0, 3).map((step) => (
                        <div key={step.id} className="flex items-center space-x-2 text-sm">
                          <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded">
                            {getStepTypeIcon(step.type)}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{step.title}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">({step.completionRate}%)</span>
                        </div>
                      ))}
                      {flow.steps.length > 3 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{flow.steps.length - 3} more steps
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                      <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium">
                        Analytics
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {selectedTab === 'progress' && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Flow
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Time Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredProgress.map((progress) => {
                    const DeviceIcon = getDeviceIcon(progress.device);
                    return (
                      <motion.tr
                        key={progress.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {progress.userName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {progress.userEmail}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {progress.flowName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {progress.flowId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${progress.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900 dark:text-white">
                              {progress.progress}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Step {progress.currentStep}/{progress.totalSteps}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(progress.status)}`}>
                            {getStatusIcon(progress.status)}
                            <span className="ml-1 capitalize">{progress.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDeviceColor(progress.device)}`}>
                            <DeviceIcon className="w-3 h-3 mr-1" />
                            {progress.device}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {progress.timeSpent}m
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {new Date(progress.lastActivity).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(progress.lastActivity).toLocaleTimeString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" title="Message">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" title="Reset">
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Completion Trends</h3>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                  <p>Completion trends chart will be displayed here</p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Flow Performance</h3>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <PieChart className="w-12 h-12 mx-auto mb-2" />
                  <p>Flow performance chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;
