import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  Building,
  Settings,
  Award,
  Target,
  TrendingUp,
  Activity,
  Download,
  Edit,
  Plus,
  Search,
} from 'lucide-react';

/**
 * User Onboarding Page - Step Wizard & Progress Tracking
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T18:10:00.000Z
 */

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  required: boolean;
  estimatedTime: string;
  completedAt?: string;
}

interface OnboardingUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  startDate: string;
  progress: number;
  currentStep: number;
  totalSteps: number;
  status: 'active' | 'paused' | 'completed' | 'abandoned';
  steps: OnboardingStep[];
  assignedMentor?: string;
  lastActivity: string;
}

export const UserOnboardingPage: React.FC = () => {
  const [users, setUsers] = useState<OnboardingUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<OnboardingUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const mockUsers: OnboardingUser[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@demo-company.com',
        company: 'DEMO Company A',
        role: 'Software Engineer',
        startDate: '2025-09-14',
        progress: 75,
        currentStep: 3,
        totalSteps: 4,
        status: 'active',
        assignedMentor: 'Sarah Johnson',
        lastActivity: '2025-09-14T10:30:00Z',
        steps: [
          {
            id: '1',
            title: 'Account Setup',
            description: 'Create account and verify email',
            status: 'completed',
            required: true,
            estimatedTime: '5 min',
            completedAt: '2025-09-14T09:00:00Z',
          },
          {
            id: '2',
            title: 'Profile Completion',
            description: 'Complete user profile and preferences',
            status: 'completed',
            required: true,
            estimatedTime: '10 min',
            completedAt: '2025-09-14T09:15:00Z',
          },
          {
            id: '3',
            title: 'System Training',
            description: 'Complete system training modules',
            status: 'in_progress',
            required: true,
            estimatedTime: '30 min',
          },
          {
            id: '4',
            title: 'Team Introduction',
            description: 'Meet team members and understand roles',
            status: 'pending',
            required: true,
            estimatedTime: '15 min',
          },
        ],
      },
      {
        id: '2',
        name: 'Emily Davis',
        email: 'emily.davis@demo-company.com',
        company: 'DEMO Company B',
        role: 'Marketing Manager',
        startDate: '2025-09-13',
        progress: 100,
        currentStep: 4,
        totalSteps: 4,
        status: 'completed',
        assignedMentor: 'Mike Wilson',
        lastActivity: '2025-09-13T16:45:00Z',
        steps: [
          {
            id: '1',
            title: 'Account Setup',
            description: 'Create account and verify email',
            status: 'completed',
            required: true,
            estimatedTime: '5 min',
            completedAt: '2025-09-13T10:00:00Z',
          },
          {
            id: '2',
            title: 'Profile Completion',
            description: 'Complete user profile and preferences',
            status: 'completed',
            required: true,
            estimatedTime: '10 min',
            completedAt: '2025-09-13T10:15:00Z',
          },
          {
            id: '3',
            title: 'System Training',
            description: 'Complete system training modules',
            status: 'completed',
            required: true,
            estimatedTime: '30 min',
            completedAt: '2025-09-13T14:30:00Z',
          },
          {
            id: '4',
            title: 'Team Introduction',
            description: 'Meet team members and understand roles',
            status: 'completed',
            required: true,
            estimatedTime: '15 min',
            completedAt: '2025-09-13T16:45:00Z',
          },
        ],
      },
      {
        id: '3',
        name: 'David Brown',
        email: 'david.brown@demo-company.com',
        company: 'DEMO Company C',
        role: 'Sales Representative',
        startDate: '2025-09-12',
        progress: 25,
        currentStep: 1,
        totalSteps: 4,
        status: 'paused',
        assignedMentor: 'Alice Green',
        lastActivity: '2025-09-12T14:20:00Z',
        steps: [
          {
            id: '1',
            title: 'Account Setup',
            description: 'Create account and verify email',
            status: 'completed',
            required: true,
            estimatedTime: '5 min',
            completedAt: '2025-09-12T09:00:00Z',
          },
          {
            id: '2',
            title: 'Profile Completion',
            description: 'Complete user profile and preferences',
            status: 'pending',
            required: true,
            estimatedTime: '10 min',
          },
          {
            id: '3',
            title: 'System Training',
            description: 'Complete system training modules',
            status: 'pending',
            required: true,
            estimatedTime: '30 min',
          },
          {
            id: '4',
            title: 'Team Introduction',
            description: 'Meet team members and understand roles',
            status: 'pending',
            required: true,
            estimatedTime: '15 min',
          },
        ],
      },
    ];
    setUsers(mockUsers);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'abandoned': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'pending': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      case 'skipped': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 responsive-container" />;
      case 'in_progress': return <Clock className="w-4 h-4 responsive-container" />;
      case 'pending': return <AlertCircle className="w-4 h-4 responsive-container" />;
      case 'skipped': return <AlertCircle className="w-4 h-4 responsive-container" />;
      default: return <AlertCircle className="w-4 h-4 responsive-container" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeUsers = users.filter(user => user.status === 'active').length;
  const completedUsers = users.filter(user => user.status === 'completed').length;
  const pausedUsers = users.filter(user => user.status === 'paused').length;
  const avgProgress = users.reduce((sum, user) => sum + user.progress, 0) / users.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 responsive-container">Active Onboarding</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">{activeUsers}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <Activity className="w-3 h-3 mr-1 responsive-container" />In Progress
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl responsive-container">
                <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400 responsive-container" />
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 responsive-container">Completed</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">{completedUsers}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1 responsive-container">
                  <CheckCircle className="w-3 h-3 mr-1 responsive-container" />Finished
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl responsive-container">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 responsive-container" />
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 responsive-container">Paused</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">{pausedUsers}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center mt-1 responsive-container">
                  <Clock className="w-3 h-3 mr-1 responsive-container" />Waiting
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl responsive-container">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400 responsive-container" />
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 responsive-container">Avg Progress</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">{Math.round(avgProgress)}%</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1 responsive-container">
                  <TrendingUp className="w-3 h-3 mr-1 responsive-container" />Overall
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl responsive-container">
                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400 responsive-container" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container">
          <div className="relative flex-1 responsive-container">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 responsive-container" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl responsive-container"
            />
          </div>
          
          <div className="flex gap-3 responsive-container">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl responsive-container"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="abandoned">Abandoned</option>
            </select>
            
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Download className="w-4 h-4 responsive-container" />
              <span>Export</span>
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg responsive-container" aria-label="Button">
              <Plus className="w-4 h-4 responsive-container" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4 mb-8 responsive-container">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                selectedUser?.id === user.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <div className="flex items-center space-x-4 responsive-container">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl responsive-container">
                    <UserPlus className="w-5 h-5 text-blue-600 dark:text-blue-400 responsive-container" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white responsive-container">{user.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 responsive-container">{user.email} • {user.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                  <div className="text-right responsive-container">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white responsive-container">{user.progress}%</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">Progress</div>
                  </div>
                </div>
              </div>

              <div className="mb-4 responsive-container">
                <div className="flex items-center justify-between mb-2 responsive-container">
                  <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Onboarding Progress</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">{user.currentStep}/{user.totalSteps} steps</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 responsive-container"
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between responsive-container">
                <div className="flex items-center space-x-4 responsive-container">
                  <div className="flex items-center space-x-1 responsive-container">
                    <Building className="w-4 h-4 text-slate-400 responsive-container" />
                    <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">{user.role}</span>
                  </div>
                  <div className="flex items-center space-x-1 responsive-container">
                    <Users className="w-4 h-4 text-slate-400 responsive-container" />
                    <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">{user.assignedMentor || 'No mentor'}</span>
                  </div>
                  <div className="flex items-center space-x-1 responsive-container">
                    <Calendar className="w-4 h-4 text-slate-400 responsive-container" />
                    <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">Started {new Date(user.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 responsive-container">
                  <Activity className="w-4 h-4 text-slate-400 responsive-container" />
                  <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">
                    {new Date(user.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* User Details Panel */}
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between mb-6 responsive-container">
              <div className="flex items-center space-x-4 responsive-container">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl responsive-container">
                  <UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">{selectedUser.name}</h2>
                  <p className="text-slate-600 dark:text-slate-400 responsive-container">{selectedUser.email} • {selectedUser.company}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 responsive-container">
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
                  <Edit className="w-4 h-4 responsive-container" />
                  <span>Edit</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
                  <Settings className="w-4 h-4 responsive-container" />
                  <span>Configure</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
              {/* User Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">User Information</h3>
                <div className="space-y-4 responsive-container">
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Role</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">{selectedUser.role}</span>
                  </div>
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Company</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">{selectedUser.company}</span>
                  </div>
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Start Date</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">{new Date(selectedUser.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Mentor</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">{selectedUser.assignedMentor || 'Not assigned'}</span>
                  </div>
                  <div className="flex items-center justify-between responsive-container">
                    <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Last Activity</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400 responsive-container">{new Date(selectedUser.lastActivity).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Onboarding Steps */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">Onboarding Steps</h3>
                <div className="space-y-3 responsive-container">
                  {selectedUser.steps.map((step, stepIndex) => (
                    <div key={step.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg responsive-container">
                      <div className="flex items-center space-x-3 responsive-container">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 text-sm font-semibold text-slate-600 dark:text-slate-400 responsive-container">
                          {stepIndex + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white responsive-container">{step.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{step.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 responsive-container">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStepStatusColor(step.status)}`}>
                          {getStepStatusIcon(step.status)}
                          <span className="ml-1 capitalize responsive-container">{step.status.replace('_', ' ')}</span>
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{step.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserOnboardingPage;
