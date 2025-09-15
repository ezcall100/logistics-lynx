import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  TrendingUp,
  CheckCircle,
  Activity,
  Lock,
} from 'lucide-react';

/**
 * User Management Dashboard - Redesigned
 * Modern, comprehensive user management interface
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T23:15:00.000Z
 */

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   status: 'active' | 'inactive' | 'pending' | 'suspended';
//   lastLogin: string;
//   company: string;
//   department: string;
//   avatar?: string;
//   phone?: string;
//   location?: string;
//   joinDate: string;
//   plan: string;
//   permissions: string[];
// }

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  suspendedUsers: number;
  growthRate: number;
  avgSessionTime: string;
  topRoles: { role: string; count: number }[];
  recentActivity: { action: string; user: string; time: string }[];
}

interface UserManagementDashboardProps {
  initialTab?: string;
}

export const UserManagementDashboard: React.FC<UserManagementDashboardProps> = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [showFilters, setShowFilters] = useState(false);
  // const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);

  // Mock data
  useEffect(() => {
    // const mockUsers: User[] = [
    //   {
    //     id: '1',
    //     name: 'John Smith',
    //     email: 'john.smith@demo-company.com',
    //     role: 'Admin',
    //     status: 'active',
    //     lastLogin: '2025-09-14T10:30:00Z',
    //     company: 'DEMO Company A',
    //     department: 'Engineering',
    //     avatar:
    //       'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    //     phone: '+1-555-0001',
    //     location: 'New York, NY',
    //     joinDate: '2024-01-15',
    //     plan: 'Enterprise',
    //     permissions: ['read', 'write', 'admin'],
    //   },
    //   {
    //     id: '2',
    //     name: 'Sarah Johnson',
    //     email: 'sarah.johnson@demo-company.com',
    //     role: 'Manager',
    //     status: 'active',
    //     lastLogin: '2025-09-14T09:15:00Z',
    //     company: 'DEMO Company A',
    //     department: 'Marketing',
    //     avatar:
    //       'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    //     phone: '+1-555-0002',
    //     location: 'Los Angeles, CA',
    //     joinDate: '2024-02-20',
    //     plan: 'Professional',
    //     permissions: ['read', 'write'],
    //   },
    //   {
    //     id: '3',
    //     name: 'Mike Wilson',
    //     email: 'mike.wilson@demo-company.com',
    //     role: 'User',
    //     status: 'pending',
    //     lastLogin: '2025-09-13T16:45:00Z',
    //     company: 'DEMO Company B',
    //     department: 'Sales',
    //     avatar:
    //       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    //     phone: '+1-555-0003',
    //     location: 'Chicago, IL',
    //     joinDate: '2024-03-10',
    //     plan: 'Basic',
    //     permissions: ['read'],
    //   },
    // ];

    const mockStats: UserStats = {
      totalUsers: 1250,
      activeUsers: 1180,
      newUsers: 45,
      suspendedUsers: 25,
      growthRate: 12.5,
      avgSessionTime: '2h 34m',
      topRoles: [
        { role: 'User', count: 850 },
        { role: 'Manager', count: 250 },
        { role: 'Admin', count: 100 },
        { role: 'Guest', count: 50 },
      ],
      recentActivity: [
        { action: 'User registered', user: 'Alice Brown', time: '2 minutes ago' },
        { action: 'Role updated', user: 'Bob Davis', time: '5 minutes ago' },
        { action: 'Account activated', user: 'Carol White', time: '10 minutes ago' },
        { action: 'Password reset', user: 'David Green', time: '15 minutes ago' },
      ],
    };

    // setUsers(mockUsers);
    setStats(mockStats);
  }, []);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'active':
  //       return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
  //     case 'inactive':
  //       return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  //     case 'suspended':
  //       return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  //     default:
  //       return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  //   }
  // };

  // const getStatusIcon = (status: string) => {
  //   switch (status) {
  //     case 'active':
  //       return <CheckCircle className="w-4 h-4" />;
  //     case 'inactive':
  //       return <Clock className="w-4 h-4" />;
  //     case 'pending':
  //       return <AlertCircle className="w-4 h-4" />;
  //     case 'suspended':
  //       return <Lock className="w-4 h-4" />;
  //     default:
  //       return <Clock className="w-4 h-4" />;
  //     }
  // };


  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />+{stats?.growthRate}% from last month
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.activeUsers.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                {Math.round(((stats?.activeUsers || 0) / (stats?.totalUsers || 1)) * 100)}% of total
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
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.newUsers}</p>
              <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                <UserPlus className="w-4 h-4 mr-1" />
                This month
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <UserPlus className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Suspended</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.suspendedUsers}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                <Lock className="w-4 h-4 mr-1" />
                Needs attention
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Lock className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Top Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {stats?.recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Roles</h3>
          <div className="space-y-3">
            {stats?.topRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {role.role}
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{role.count} users</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderOverview()}
        </motion.div>
      </div>
    </div>
  );
};

export default UserManagementDashboard;
