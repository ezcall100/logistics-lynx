import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Send,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  Mail,
  Calendar,
  Users,
  Target,
  TrendingUp,
  Filter,
  Search,
  X,
  Plus,
  Settings,
  Bell,
  UserCheck,
  UserX,
} from 'lucide-react';

interface OnboardingInvite {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string;
  status: 'pending' | 'sent' | 'accepted' | 'expired' | 'cancelled';
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  acceptedAt?: string;
  reminderCount: number;
  lastReminderAt?: string;
}

interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  steps: Array<{
  id: string;
  title: string;
  description: string;
    type: 'email' | 'task' | 'approval';
  order: number;
  isRequired: boolean;
  }>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OnboardingStats {
  totalInvites: number;
  pendingInvites: number;
  acceptedInvites: number;
  expiredInvites: number;
  averageAcceptanceTime: number;
  completionRate: number;
}

const UserOnboarding: React.FC = () => {
  const [invites, setInvites] = useState<OnboardingInvite[]>([]);
  const [templates, setTemplates] = useState<OnboardingTemplate[]>([]);
  const [stats, setStats] = useState<OnboardingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateInvite, setShowCreateInvite] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [newInvite, setNewInvite] = useState<Partial<OnboardingInvite>>({
    email: '',
    name: '',
    role: 'user',
    company: '',
    status: 'pending',
  });

  // Mock data
  const mockInvites: OnboardingInvite[] = [
    {
      id: '1',
      email: 'john.doe@techcorp.com',
      name: 'John Doe',
      role: 'Developer',
      company: 'TechCorp',
      status: 'pending',
      invitedBy: 'admin@techcorp.com',
      invitedAt: '2024-01-15T10:00:00Z',
      expiresAt: '2024-01-22T10:00:00Z',
      reminderCount: 0,
    },
    {
      id: '2',
      email: 'sarah.smith@techcorp.com',
      name: 'Sarah Smith',
      role: 'Manager',
      company: 'TechCorp',
      status: 'sent',
      invitedBy: 'admin@techcorp.com',
      invitedAt: '2024-01-14T14:30:00Z',
      expiresAt: '2024-01-21T14:30:00Z',
      reminderCount: 1,
      lastReminderAt: '2024-01-16T09:00:00Z',
    },
    {
      id: '3',
      email: 'mike.wilson@logistics.com',
      name: 'Mike Wilson',
      role: 'User',
      company: 'LogisticsCorp',
      status: 'accepted',
      invitedBy: 'admin@logistics.com',
      invitedAt: '2024-01-13T16:00:00Z',
      expiresAt: '2024-01-20T16:00:00Z',
      acceptedAt: '2024-01-14T11:30:00Z',
      reminderCount: 0,
    },
    {
      id: '4',
      email: 'emily.davis@finance.com',
      name: 'Emily Davis',
      role: 'Analyst',
      company: 'FinanceCorp',
      status: 'expired',
      invitedBy: 'admin@finance.com',
      invitedAt: '2024-01-10T12:00:00Z',
      expiresAt: '2024-01-17T12:00:00Z',
      reminderCount: 2,
      lastReminderAt: '2024-01-16T10:00:00Z',
    },
  ];

  const mockTemplates: OnboardingTemplate[] = [
    {
      id: '1',
      name: 'Standard User Onboarding',
      description: 'Basic onboarding flow for new users',
        steps: [
          {
          id: '1',
          title: 'Welcome Email',
          description: 'Send welcome email with login credentials',
          type: 'email',
            order: 1,
            isRequired: true,
        },
        {
          id: '2',
            title: 'Profile Setup',
            description: 'Complete user profile information',
          type: 'task',
            order: 2,
            isRequired: true,
        },
        {
          id: '3',
          title: 'Manager Approval',
          description: 'Manager approval for account activation',
          type: 'approval',
            order: 3,
          isRequired: true,
        },
      ],
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Manager Onboarding',
      description: 'Extended onboarding for management roles',
        steps: [
          {
          id: '1',
          title: 'Welcome Email',
          description: 'Send welcome email with login credentials',
          type: 'email',
            order: 1,
            isRequired: true,
        },
        {
          id: '2',
          title: 'Security Training',
          description: 'Complete security awareness training',
          type: 'task',
            order: 2,
            isRequired: true,
        },
        {
          id: '3',
          title: 'Admin Approval',
          description: 'Admin approval for elevated permissions',
          type: 'approval',
          order: 3,
          isRequired: true,
        },
      ],
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
  ];

  const mockStats: OnboardingStats = {
    totalInvites: 1247,
    pendingInvites: 23,
    acceptedInvites: 1156,
    expiredInvites: 68,
    averageAcceptanceTime: 2.5,
    completionRate: 92.7,
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInvites(mockInvites);
      setTemplates(mockTemplates);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch onboarding data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateInvite = async () => {
    if (!newInvite.email || !newInvite.name || !newInvite.company) return;

    try {
      const invite: OnboardingInvite = {
        id: Date.now().toString(),
        email: newInvite.email,
        name: newInvite.name,
        role: newInvite.role || 'user',
        company: newInvite.company,
        status: 'pending',
        invitedBy: 'current-user@company.com',
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        reminderCount: 0,
      };

      setInvites(prev => [...prev, invite]);
      setShowCreateInvite(false);
      setNewInvite({ email: '', name: '', role: 'user', company: '', status: 'pending' });
    } catch (error) {
      console.error('Failed to create invite:', error);
    }
  };

  const handleSendInvite = async (id: string) => {
    try {
      setInvites(prev => prev.map(invite => 
        invite.id === id 
          ? { ...invite, status: 'sent', invitedAt: new Date().toISOString() }
          : invite
      ));
    } catch (error) {
      console.error('Failed to send invite:', error);
    }
  };

  const handleSendReminder = async (id: string) => {
    try {
      setInvites(prev => prev.map(invite => 
        invite.id === id 
          ? { 
              ...invite, 
              reminderCount: invite.reminderCount + 1,
              lastReminderAt: new Date().toISOString()
            }
          : invite
      ));
    } catch (error) {
      console.error('Failed to send reminder:', error);
    }
  };

  const handleCancelInvite = async (id: string) => {
    try {
      setInvites(prev => prev.map(invite => 
        invite.id === id 
          ? { ...invite, status: 'cancelled' }
          : invite
      ));
    } catch (error) {
      console.error('Failed to cancel invite:', error);
    }
  };

  const handleDeleteInvite = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invite?')) return;

    try {
      setInvites(prev => prev.filter(invite => invite.id !== id));
    } catch (error) {
      console.error('Failed to delete invite:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'sent':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'accepted':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'expired':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'sent':
        return Send;
      case 'accepted':
        return UserCheck;
      case 'expired':
        return AlertTriangle;
      case 'cancelled':
        return UserX;
      default:
        return Clock;
    }
  };

  const filteredInvites = invites.filter(invite => {
    const matchesSearch = invite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invite.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invite.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || invite.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="p-6 responsive-container">
        <div className="animate-pulse responsive-container">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 responsive-container">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container"></div>
            ))}
          </div>
          <div className="space-y-4 responsive-container">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container">
            <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container">
                User Onboarding
              </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container">
            Manage user invitations and onboarding process
              </p>
            </div>
        <div className="flex items-center space-x-4 responsive-container">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
            <Download className="h-4 w-4 responsive-container" />
                <span>Export</span>
              </button>
              <button
            onClick={() = aria-label="Button"> setShowCreateInvite(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
              >
            <UserPlus className="h-4 w-4 responsive-container" />
            <span>Invite User</span>
              </button>
          </div>
        </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container">
                  {stats.totalInvites.toLocaleString()}
                      </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Total Invites</div>
                      </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
                <UserPlus className="h-6 w-6 text-blue-600 responsive-container" />
                    </div>
                    </div>
                  </motion.div>

                      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
                          <div>
                <div className="text-2xl font-bold text-green-600 responsive-container">
                  {stats.acceptedInvites.toLocaleString()}
                            </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Accepted</div>
                            </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container">
                <UserCheck className="h-6 w-6 text-green-600 responsive-container" />
                          </div>
                        </div>
                      </motion.div>

                        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
                            <div>
                <div className="text-2xl font-bold text-yellow-600 responsive-container">
                  {stats.pendingInvites}
                              </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Pending</div>
                              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg responsive-container">
                <Clock className="h-6 w-6 text-yellow-600 responsive-container" />
                            </div>
                          </div>
                        </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
                      <div>
                <div className="text-2xl font-bold text-purple-600 responsive-container">
                  {stats.completionRate.toFixed(1)}%
                        </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Completion Rate</div>
                      </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg responsive-container">
                <Target className="h-6 w-6 text-purple-600 responsive-container" />
                    </div>
                    </div>
          </motion.div>
                        </div>
                      )}

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 responsive-container">
          <div className="relative flex-1 responsive-container">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
            <input
              type="text"
              placeholder="Search invites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
            />
                    </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
                    </div>
                  </div>

      {/* Invites List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden responsive-container">
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
            <thead className="bg-gray-50 dark:bg-gray-700 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Role & Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Invited
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Expires
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Reminders
                    </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container">
              {filteredInvites.map((invite) => {
                const StatusIcon = getStatusIcon(invite.status);
                    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                      <motion.tr
                    key={invite.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container"
                  >
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-3 responsive-container">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm responsive-container">
                          {invite.name.split(' ').map(n => n[0]).join('')}
                        </div>
                          <div>
                          <div className="font-medium text-gray-900 dark:text-white responsive-container">
                            {invite.name}
                            </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-500 responsive-container">
                            <Mail className="h-3 w-3 responsive-container" />
                            <span>{invite.email}</span>
                          </div>
                            </div>
                          </div>
                        </td>
                    <td className="px-6 py-4 responsive-container">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white responsive-container">
                          {invite.role}
                          </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500 responsive-container">
                          {invite.company}
                        </div>
                          </div>
                        </td>
                    <td className="px-6 py-4 responsive-container">
                          <div className="flex items-center space-x-2 responsive-container">
                        <StatusIcon className="h-4 w-4 responsive-container" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invite.status)}`}>
                          {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                            </span>
                          </div>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-1 text-sm text-gray-900 dark:text-white responsive-container">
                        <Calendar className="h-4 w-4 text-gray-400 responsive-container" />
                        <span>{new Date(invite.invitedAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-1 text-sm text-gray-900 dark:text-white responsive-container">
                        <Clock className="h-4 w-4 text-gray-400 responsive-container" />
                        <span>{new Date(invite.expiresAt).toLocaleDateString()}</span>
                          </div>
                        </td>
                    <td className="px-6 py-4 responsive-container">
                          <div className="text-sm text-gray-900 dark:text-white responsive-container">
                        {invite.reminderCount}
                          </div>
                        </td>
                    <td className="px-6 py-4 text-right responsive-container">
                      <div className="flex items-center justify-end space-x-2 responsive-container">
                        {invite.status === 'pending' && (
                            <button
                            onClick={() = aria-label="Button"> handleSendInvite(invite.id)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors responsive-container"
                            title="Send Invite"
                            >
                            <Send className="h-4 w-4 responsive-container" />
                            </button>
                        )}
                        {(invite.status === 'sent' || invite.status === 'pending') && (
                            <button
                            onClick={() = aria-label="Button"> handleSendReminder(invite.id)}
                            className="p-1 text-gray-400 hover:text-yellow-600 transition-colors responsive-container"
                            title="Send Reminder"
                            >
                            <Bell className="h-4 w-4 responsive-container" />
                            </button>
                        )}
                            <button
                          onClick={() = aria-label="Button"> handleCancelInvite(invite.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container"
                          title="Cancel"
                        >
                          <X className="h-4 w-4 responsive-container" />
                        </button>
                        <button
                          onClick={() = aria-label="Button"> handleDeleteInvite(invite.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 responsive-container" />
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

      {/* Create Invite Modal */}
      <AnimatePresence>
        {showCreateInvite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 responsive-container"
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container">
                  Invite New User
              </h3>
                <button
                  onClick={() = aria-label="Button"> setShowCreateInvite(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container"
                >
                  <X className="h-5 w-5 responsive-container" />
                </button>
                </div>
              
              <div className="space-y-4 responsive-container">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newInvite.name || ''}
                    onChange={(e) => setNewInvite({ ...newInvite, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    placeholder="Enter full name"
                  />
              </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newInvite.email || ''}
                    onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    placeholder="Enter email address"
                  />
            </div>
                
                <div className="grid grid-cols-2 gap-4 responsive-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Role
                    </label>
                    <select
                      value={newInvite.role || 'user'}
                      onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Company
                    </label>
                    <select
                      value={newInvite.company || ''}
                      onChange={(e) => setNewInvite({ ...newInvite, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="">Select Company</option>
                      <option value="TechCorp">TechCorp</option>
                      <option value="LogisticsCorp">LogisticsCorp</option>
                      <option value="FinanceCorp">FinanceCorp</option>
                    </select>
              </div>
            </div>
          </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container">
                <button
                  onClick={() = aria-label="Button"> setShowCreateInvite(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateInvite}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
                 aria-label="Button">
                  Create Invite
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserOnboarding;