import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Search,
  Filter,
  Clock,
  AlertCircle,
  Users,
  Eye,
  Edit,
  UserPlus,
  Star,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Settings,
  Zap,
  Bug,
  MoreVertical,
} from 'lucide-react';

const UnassignedTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const unassignedTickets = [
    {
      id: 'TICK-005',
      title: 'Performance issue with dashboard',
      description: 'Dashboard loading slowly for users with large datasets',
      status: 'open',
      priority: 'medium',
      type: 'problem',
      reporter: 'Jennifer Lee',
      company: 'StartupHub Ventures',
      createdDate: '2024-01-11',
      lastUpdated: '2024-01-13',
      tags: ['performance', 'dashboard', 'optimization'],
      comments: 1,
      isStarred: false,
    },
    {
      id: 'TICK-006',
      title: 'Email notifications not working',
      description: 'Users not receiving email notifications for ticket updates',
      status: 'open',
      priority: 'high',
      type: 'incident',
      reporter: 'Michael Brown',
      company: 'Global Tech Corp',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-12',
      tags: ['email', 'notifications', 'urgent'],
      comments: 3,
      isStarred: true,
    },
    {
      id: 'TICK-007',
      title: 'Request for mobile app feature',
      description: 'Need to add offline mode functionality to mobile app',
      status: 'open',
      priority: 'low',
      type: 'service-request',
      reporter: 'Anna Wilson',
      company: 'MobileFirst Inc',
      createdDate: '2024-01-09',
      lastUpdated: '2024-01-11',
      tags: ['mobile', 'feature', 'offline'],
      comments: 2,
      isStarred: false,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertCircle;
      case 'service-request': return Settings;
      case 'change': return Zap;
      case 'problem': return Bug;
      default: return Ticket;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'incident': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'service-request': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'change': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'problem': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Unassigned Tickets</h1>
          <p className="text-gray-600 dark:text-gray-400">Tickets waiting to be assigned to team members</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Auto Assign
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Unassigned', value: '23', icon: Ticket, color: 'text-red-600' },
          { label: 'High Priority', value: '8', icon: AlertCircle, color: 'text-orange-600' },
          { label: 'Overdue', value: '3', icon: Clock, color: 'text-red-600' },
          { label: 'Avg Wait Time', value: '2.5h', icon: Clock, color: 'text-blue-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search unassigned tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {unassignedTickets.map((ticket, index) => {
          const TypeIcon = getTypeIcon(ticket.type);
          return (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.id}</p>
                    {ticket.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{ticket.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.company}</p>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{ticket.description}</p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <TypeIcon className="w-4 h-4 text-gray-500" />
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(ticket.type)}`}>
                    {ticket.type.replace('-', ' ')}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>Created: {ticket.createdDate}</span>
                <span>{ticket.comments} comments</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Assign
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default UnassignedTickets;
