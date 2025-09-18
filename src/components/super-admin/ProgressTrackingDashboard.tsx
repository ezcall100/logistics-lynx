import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Users,
  GitCommit,
  FileText,
  Zap,
  Target,
  Timer,
  AlertTriangle,
  XCircle,
  X,
} from 'lucide-react';

interface BuildTask {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedAgent: string;
  startTime: string | null;
  endTime: string | null;
  progress: number;
  changes: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedDuration: string;
  actualDuration?: string;
}

interface BuildProgress {
  overallProgress: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  failedTasks: number;
  currentBuild: string;
  buildStartTime: string;
  estimatedCompletion: string;
}

const ProgressTrackingDashboard: React.FC = () => {
  const [buildProgress, setBuildProgress] = useState<BuildProgress>({
    overallProgress: 25,
    totalTasks: 4,
    completedTasks: 0,
    inProgressTasks: 3,
    pendingTasks: 1,
    failedTasks: 0,
    currentBuild: 'Super Admin Portal Enhancement',
    buildStartTime: '2025-09-17T08:30:00.000Z',
    estimatedCompletion: '2025-09-17T10:30:00.000Z',
  });

  const [tasks, setTasks] = useState<BuildTask[]>([
    {
      id: 'fix-three-dot-menus',
      name: 'Fix three-dot menu functions',
      status: 'in_progress',
      assignedAgent: 'UIAgent-091',
      startTime: '2025-09-17T08:30:00.000Z',
      endTime: null,
      progress: 75,
      changes: [
        'Enhanced dropdown functionality',
        'Fixed click handlers',
        'Added accessibility features',
      ],
      priority: 'high',
      estimatedDuration: '2 hours',
      actualDuration: '1.5 hours',
    },
    {
      id: 'fix-crud-operations',
      name: 'Fix CRUD operations',
      status: 'in_progress',
      assignedAgent: 'BackendBot-203',
      startTime: '2025-09-17T08:31:00.000Z',
      endTime: null,
      progress: 60,
      changes: ['Fixed create operations', 'Enhanced update logic', 'Improved delete handling'],
      priority: 'high',
      estimatedDuration: '3 hours',
      actualDuration: '2 hours',
    },
    {
      id: 'fix-forms',
      name: 'Fix Add/Edit Forms',
      status: 'in_progress',
      assignedAgent: 'Forminator-144',
      startTime: '2025-09-17T08:32:00.000Z',
      endTime: null,
      progress: 45,
      changes: ['Fixed form validation', 'Enhanced input handling', 'Improved error messages'],
      priority: 'medium',
      estimatedDuration: '2.5 hours',
      actualDuration: '1.8 hours',
    },
    {
      id: 'fix-responsive-design',
      name: 'Fix responsive design',
      status: 'pending',
      assignedAgent: 'UIBalanceBot-033',
      startTime: null,
      endTime: null,
      progress: 0,
      changes: [],
      priority: 'medium',
      estimatedDuration: '1.5 hours',
    },
  ]);

  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedTask, setSelectedTask] = useState<BuildTask | null>(null);

  useEffect(() => {
    if (isAutoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time progress updates
        setTasks(prev =>
          prev.map(task => {
            if (task.status === 'in_progress') {
              const newProgress = Math.min(100, task.progress + Math.random() * 5);
              const updatedTask = { ...task, progress: newProgress };

              if (newProgress >= 100) {
                updatedTask.status = 'completed';
                updatedTask.endTime = new Date().toISOString();
              }

              return updatedTask;
            }
            return task;
          })
        );

        // Update overall progress
        setBuildProgress(prev => {
          const completed = tasks.filter(t => t.status === 'completed').length;
          const inProgress = tasks.filter(t => t.status === 'in_progress').length;
          const pending = tasks.filter(t => t.status === 'pending').length;
          const failed = tasks.filter(t => t.status === 'failed').length;

          const overallProgress = (completed / prev.totalTasks) * 100;

          return {
            ...prev,
            overallProgress,
            completedTasks: completed,
            inProgressTasks: inProgress,
            pendingTasks: pending,
            failedTasks: failed,
          };
        });
      }, 5000);

      return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval);
    }
  }, [isAutoRefresh, tasks]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'in_progress':
        return <Activity className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'pending':
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'failed':
        return <XCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDuration = (startTime: string | null, endTime: string | null) => {
    if (!startTime) return 'Not started';
    if (!endTime) return 'In progress';

    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Live Progress Tracking</h1>
          <p className="text-gray-600 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">Real-time build progress and agent assignments</p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Build Active</span>
          </div>
          <button
            onClick={() => setIsAutoRefresh(!isAutoRefresh)}
            aria-label="Button"
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${isAutoRefresh ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
          >
            {isAutoRefresh ? <Pause className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Play className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <span>{isAutoRefresh ? 'Live Updates ON' : 'Live Updates OFF'}</span>
          </button>
        </div>
      </div>

      {/* Build Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-xl font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
            Current Build: {buildProgress.currentBuild}
          </h2>
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Timer className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
              Started: {new Date(buildProgress.buildStartTime).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-3xl font-bold text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">
              {buildProgress.overallProgress.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Overall Progress</div>
          </div>
          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-3xl font-bold text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">{buildProgress.completedTasks}</div>
            <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Completed</div>
          </div>
          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-3xl font-bold text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">{buildProgress.inProgressTasks}</div>
            <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">In Progress</div>
          </div>
          <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-3xl font-bold text-yellow-600 responsive-container sm:flex-col md:flex-row lg:grid">{buildProgress.pendingTasks}</div>
            <div className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Pending</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
            initial={{ width: 0 }}
            animate={{ width: `${buildProgress.overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
          <span>
            Estimated completion: {new Date(buildProgress.estimatedCompletion).toLocaleString()}
          </span>
          <span>
            {buildProgress.completedTasks}/{buildProgress.totalTasks} tasks completed
          </span>
        </div>
      </div>

      {/* Task Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-xl font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Task Progress</h2>
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <BarChart3 className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Real-time updates</span>
          </div>
        </div>

        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(task.status)}`}
              onClick={() => setSelectedTask(task)}
            >
              <div className="flex items-center justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    {getStatusIcon(task.status)}
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{task.name}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Agent: {task.assignedAgent}</span>
                  <span className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                    Duration: {formatDuration(task.startTime, task.endTime)}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <motion.div
                  className="bg-blue-600 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                  initial={{ width: 0 }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>

              <div className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{task.progress.toFixed(0)}% complete</span>
                <span className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Est: {task.estimatedDuration}</span>
              </div>

              {task.changes.length > 0 && (
                <div className="mt-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Recent Changes:</p>
                  <ul className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    {task.changes.map((change, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <CheckCircle className="w-3 h-3 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Agent Status Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Agent Status Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {Array.from(new Set(tasks.map(t => t.assignedAgent))).map((agent, index) => {
            const agentTasks = tasks.filter(t => t.assignedAgent === agent);
            const activeTask = agentTasks.find(t => t.status === 'in_progress');
            const completedCount = agentTasks.filter(t => t.status === 'completed').length;

            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <motion.div
                key={agent}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center space-x-3 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="p-2 bg-blue-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                    <Users className="w-5 h-5 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{agent}</h3>
                    <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{agentTasks.length} tasks assigned</p>
                  </div>
                </div>

                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Completed:</span>
                    <span className="font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">{completedCount}</span>
                  </div>
                  {activeTask && (
                    <div className="text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Current: {activeTask.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-blue-600 h-1 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${activeTask.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={() => setSelectedTask(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xl font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Task Details</h3>
              <button
                onClick={() => setSelectedTask(null)}
            aria-label="Button"
                className="p-2 text-gray-500 hover:text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>

            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Task Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Name:</span>
                    <p className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{selectedTask.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Status:</span>
                    <p className="font-medium capitalize responsive-container sm:flex-col md:flex-row lg:grid">
                      {selectedTask.status.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Assigned Agent:</span>
                    <p className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{selectedTask.assignedAgent}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Priority:</span>
                    <p className="font-medium capitalize responsive-container sm:flex-col md:flex-row lg:grid">{selectedTask.priority}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div
                    className="bg-blue-600 h-3 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{ width: `${selectedTask.progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                  {selectedTask.progress.toFixed(0)}% complete
                </p>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Timing</h4>
                <div className="grid grid-cols-2 gap-4 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Start Time:</span>
                    <p>
                      {selectedTask.startTime
                        ? new Date(selectedTask.startTime).toLocaleString()
                        : 'Not started'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">End Time:</span>
                    <p>
                      {selectedTask.endTime
                        ? new Date(selectedTask.endTime).toLocaleString()
                        : 'In progress'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Estimated Duration:</span>
                    <p>{selectedTask.estimatedDuration}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Actual Duration:</span>
                    <p>{formatDuration(selectedTask.startTime, selectedTask.endTime)}</p>
                  </div>
                </div>
              </div>

              {selectedTask.changes.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Changes Made</h4>
                  <ul className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    {selectedTask.changes.map((change, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <CheckCircle className="w-3 h-3 text-green-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressTrackingDashboard;
