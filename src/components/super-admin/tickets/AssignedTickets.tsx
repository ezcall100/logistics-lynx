import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Eye,
  Edit,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Star,
  User,
  Building,
  Tag,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Settings,
  Zap,
  Bug,
} from 'lucide-react';

const AssignedTickets: React.FC = () => {
  const [selectedAssignee, setSelectedAssignee] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assignedTickets = [
    {
      id: 'TICK-001',
      title: 'Login issue with TMS portal',
      description: 'Users unable to login to the TMS portal after recent update',
      status: 'open',
      priority: 'high',
      type: 'incident',
      assignee: 'John Smith',
      reporter: 'Sarah Johnson',
      company: 'Acme Corporation',
      createdDate: '2024-01-15',
      lastUpdated: '2024-01-16',
      tags: ['login', 'portal', 'urgent'],
      comments: 5,
      isStarred: true,
      estimatedHours: 8,
      actualHours: 4,
    },
    {
      id: 'TICK-002',
      title: 'Request for new reporting feature',
      description: 'Need to add custom report generation functionality',
      status: 'in-progress',
      priority: 'medium',
      type: 'service-request',
      assignee: 'Mike Chen',
      reporter: 'Emily Rodriguez',
      company: 'TechStart Inc',
      createdDate: '2024-01-14',
      lastUpdated: '2024-01-16',
      tags: ['feature', 'reporting', 'enhancement'],
      comments: 3,
      isStarred: false,
      estimatedHours: 16,
      actualHours: 12,
    },
    {
      id: 'TICK-004',
      title: 'Change request for user permissions',
      description: 'Need to modify user role permissions for specific departments',
      status: 'pending',
      priority: 'low',
      type: 'change',
      assignee: 'Lisa Davis',
      reporter: 'Tom Wilson',
      company: 'MegaFreight Solutions',
      createdDate: '2024-01-12',
      lastUpdated: '2024-01-14',
      tags: ['permissions', 'roles', 'change'],
      comments: 2,
      isStarred: false,
      estimatedHours: 4,
      actualHours: 1,
    },
  ];

  const assignees = [
    { name: 'John Smith', tickets: 12, avatar: 'JS', color: 'bg-blue-500' },
    { name: 'Mike Chen', tickets: 8, avatar: 'MC', color: 'bg-green-500' },
    { name: 'Lisa Davis', tickets: 15, avatar: 'LD', color: 'bg-purple-500' },
    { name: 'David Wilson', tickets: 6, avatar: 'DW', color: 'bg-orange-500' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'pending': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'resolved': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assigned Tickets</h1>
          <p className="text-gray-600 dark:text-gray-400">Tickets assigned to team members</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Assignees</option>
            {assignees.map(assignee => (
              <option key={assignee.name} value={assignee.name}>{assignee.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignee Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assignees.map((assignee, index) => (
          <motion.div
            key={assignee.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${assignee.color} text-white rounded-full flex items-center justify-center text-lg font-medium`}>
                {assignee.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{assignee.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{assignee.tickets} tickets</p>
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
                placeholder="Search assigned tickets..."
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

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Assigned Tickets</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {assignedTickets.map((ticket, index) => {
                const TypeIcon = getTypeIcon(ticket.type);
                const progress = (ticket.actualHours / ticket.estimatedHours) * 100;
                return (
                  <motion.tr
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{ticket.id}</p>
                          {ticket.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{ticket.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{ticket.company}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {ticket.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.assignee}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {ticket.actualHours}h/{ticket.estimatedHours}h
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.createdDate}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400">
                          <MessageSquare className="w-4 h-4" />
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
    </div>
  );
};

export default AssignedTickets;
