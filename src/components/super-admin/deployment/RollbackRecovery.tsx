import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Clock,
  History,
  Download,
  Upload,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Settings,
  Filter,
  Search,
  BarChart3,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
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
  Warning
} from 'lucide-react';

interface RollbackPoint {
  id: string;
  version: string;
  name: string;
  description: string;
  timestamp: string;
  environment: 'development' | 'staging' | 'production';
  status: 'available' | 'restored' | 'corrupted';
  size: string;
  services: string[];
  health: 'healthy' | 'degraded' | 'critical';
  createdBy: string;
  backupType: 'automatic' | 'manual' | 'scheduled';
  retentionDays: number;
}

interface RecoveryJob {
  id: string;
  type: 'rollback' | 'restore' | 'backup' | 'migration';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  source: string;
  target: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  progress: number;
  createdBy: string;
  description: string;
  logs: string[];
}

const RollbackRecovery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rollback-points');
  const [selectedRollback, setSelectedRollback] = useState<RollbackPoint | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [rollbackProgress, setRollbackProgress] = useState(0);

  // Rollback Points State
  const [rollbackPoints, setRollbackPoints] = useState<RollbackPoint[]>([
    {
      id: '1',
      version: 'v2.1.0',
      name: 'AI Enhancement Release',
      description: 'Stable production version with AI improvements',
      timestamp: '2025-09-21 08:25:00',
      environment: 'production',
      status: 'available',
      size: '2.4 GB',
      services: ['API Gateway', 'Database', 'Cache Service', 'Message Queue'],
      health: 'healthy',
      createdBy: 'John Doe',
      backupType: 'automatic',
      retentionDays: 30
    },
    {
      id: '2',
      version: 'v2.0.5',
      name: 'Security Patch Release',
      description: 'Previous stable version with security updates',
      timestamp: '2025-09-20 14:30:00',
      environment: 'production',
      status: 'available',
      size: '2.1 GB',
      services: ['API Gateway', 'Database', 'Cache Service', 'Message Queue'],
      health: 'healthy',
      createdBy: 'Mike Johnson',
      backupType: 'automatic',
      retentionDays: 30
    },
    {
      id: '3',
      version: 'v2.0.4',
      name: 'Bug Fix Release',
      description: 'Minor bug fixes and stability improvements',
      timestamp: '2025-09-18 10:15:00',
      environment: 'production',
      status: 'available',
      size: '2.0 GB',
      services: ['API Gateway', 'Database', 'Cache Service', 'Message Queue'],
      health: 'healthy',
      createdBy: 'Alex Rodriguez',
      backupType: 'manual',
      retentionDays: 30
    },
    {
      id: '4',
      version: 'v2.0.3',
      name: 'Feature Release',
      description: 'New features and performance improvements',
      timestamp: '2025-09-15 16:45:00',
      environment: 'production',
      status: 'corrupted',
      size: '1.9 GB',
      services: ['API Gateway', 'Database', 'Cache Service'],
      health: 'critical',
      createdBy: 'Sarah Wilson',
      backupType: 'automatic',
      retentionDays: 30
    }
  ]);

  // Recovery Jobs State
  const [recoveryJobs, setRecoveryJobs] = useState<RecoveryJob[]>([
    {
      id: '1',
      type: 'rollback',
      status: 'completed',
      source: 'v2.1.0',
      target: 'v2.0.5',
      startedAt: '2025-09-21 08:30:00',
      completedAt: '2025-09-21 08:35:00',
      duration: 5,
      progress: 100,
      createdBy: 'John Doe',
      description: 'Emergency rollback due to critical bug in v2.1.0',
      logs: [
        'Starting rollback process...',
        'Backing up current state...',
        'Restoring v2.0.5...',
        'Verifying services...',
        'Rollback completed successfully'
      ]
    },
    {
      id: '2',
      type: 'backup',
      status: 'running',
      source: 'production',
      target: 'backup-storage',
      startedAt: '2025-09-21 08:40:00',
      progress: 65,
      createdBy: 'System',
      description: 'Scheduled daily backup',
      logs: [
        'Starting backup process...',
        'Backing up database...',
        'Backing up application files...',
        'Compressing backup...'
      ]
    },
    {
      id: '3',
      type: 'restore',
      status: 'failed',
      source: 'backup-v2.0.3',
      target: 'staging',
      startedAt: '2025-09-21 07:15:00',
      completedAt: '2025-09-21 07:20:00',
      duration: 5,
      progress: 0,
      createdBy: 'Mike Johnson',
      description: 'Failed to restore corrupted backup',
      logs: [
        'Starting restore process...',
        'Verifying backup integrity...',
        'ERROR: Backup file corrupted',
        'Restore failed'
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
      case 'completed':
      case 'healthy':
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'restored':
      case 'running':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'corrupted':
      case 'failed':
      case 'critical':
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'rollback': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-200';
      case 'restore': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'backup': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'migration': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleRollback = async (rollbackPointId: string) => {
    setIsRollingBack(true);
    setRollbackProgress(0);

    // Simulate rollback process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setRollbackProgress(i);
    }

    // Update rollback point status
    setRollbackPoints(prev => prev.map(point => 
      point.id === rollbackPointId 
        ? { ...point, status: 'restored' as const }
        : point
    ));

    // Add recovery job
    const newJob: RecoveryJob = {
      id: Date.now().toString(),
      type: 'rollback',
      status: 'completed',
      source: 'current',
      target: rollbackPoints.find(p => p.id === rollbackPointId)?.version || '',
      startedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      completedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      duration: 5,
      progress: 100,
      createdBy: 'Current User',
      description: `Rollback to ${rollbackPoints.find(p => p.id === rollbackPointId)?.version}`,
      logs: [
        'Starting rollback process...',
        'Backing up current state...',
        'Restoring target version...',
        'Verifying services...',
        'Rollback completed successfully'
      ]
    };

    setRecoveryJobs(prev => [newJob, ...prev]);

    setIsRollingBack(false);
    setRollbackProgress(0);
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

  const renderRollbackPointsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Rollback Points</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage system rollback points and recovery options</p>
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
            <span>Create Backup</span>
          </button>
        </div>
      </div>

      {/* Rollback Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{rollbackPoints.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
              <p className="text-2xl font-bold text-green-600">{rollbackPoints.filter(r => r.status === 'available').length}</p>
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Corrupted</p>
              <p className="text-2xl font-bold text-red-600">{rollbackPoints.filter(r => r.status === 'corrupted').length}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Size</p>
              <p className="text-2xl font-bold text-purple-600">8.4 GB</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rollback Points List */}
      <div className="space-y-4">
        {rollbackPoints.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{point.version}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(point.status)}`}>
                    {point.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{point.environment}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{point.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{point.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Size</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{point.size}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Services</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{point.services.length}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Retention</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{point.retentionDays} days</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Created: {point.timestamp}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Settings className="w-4 h-4" />
                    <span>By: {point.createdBy}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Database className="w-4 h-4" />
                    <span>Type: {point.backupType}</span>
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => setSelectedRollback(point)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleRollback(point.id)}
                  disabled={isRollingBack || point.status !== 'available'}
                  className="p-2 text-orange-600 hover:text-orange-700 disabled:opacity-50"
                >
                  <RotateCcw className="w-4 h-4" />
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

  const renderRecoveryJobsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recovery Jobs</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor recovery and rollback operations</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-4">
        {recoveryJobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getJobTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {job.source} → {job.target}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">{job.description}</p>
                
                {job.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
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
                  <span className="flex items-center space-x-1">
                    <Settings className="w-4 h-4" />
                    <span>By: {job.createdBy}</span>
                  </span>
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
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Rollback & Recovery</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage system rollbacks, backups, and disaster recovery</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Backup</p>
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
            <TabButton id="rollback-points" label="Rollback Points" icon={History} isActive={activeTab === 'rollback-points'} />
            <TabButton id="recovery-jobs" label="Recovery Jobs" icon={Activity} isActive={activeTab === 'recovery-jobs'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'rollback-points' && renderRollbackPointsTab()}
          {activeTab === 'recovery-jobs' && renderRecoveryJobsTab()}
        </div>

        {/* Rollback Progress Modal */}
        <AnimatePresence>
          {isRollingBack && (
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
                  <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 mx-auto mb-4">
                    <RotateCcw className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Rolling Back System</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Please wait while we restore the previous version...</p>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                    <motion.div
                      className="bg-orange-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${rollbackProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{rollbackProgress}% Complete</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RollbackRecovery;
