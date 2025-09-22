import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Star,
  StarOff,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Tag,
  User,
  Building,
  Zap,
  Shield,
  Bug,
  Settings,
  RefreshCw,
} from 'lucide-react';

const TicketsOverview: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tickets = [
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
    },
    {
      id: 'TICK-003',
      title: 'API integration failing',
      description: 'Third-party API calls are returning 500 errors',
      status: 'resolved',
      priority: 'high',
      type: 'incident',
      assignee: 'David Wilson',
      reporter: 'Robert Brown',
      company: 'Global Logistics Ltd',
      createdDate: '2024-01-13',
      lastUpdated: '2024-01-15',
      tags: ['api', 'integration', 'error'],
      comments: 8,
      isStarred: true,
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
    },
    {
      id: 'TICK-005',
      title: 'Performance issue with dashboard',
      description: 'Dashboard loading slowly for users with large datasets',
      status: 'open',
      priority: 'medium',
      type: 'problem',
      assignee: 'Unassigned',
      reporter: 'Jennifer Lee',
      company: 'StartupHub Ventures',
      createdDate: '2024-01-11',
      lastUpdated: '2024-01-13',
      tags: ['performance', 'dashboard', 'optimization'],
      comments: 1,
      isStarred: false,
    },
  ];

  const ticketStats = [
    { label: 'Total Tickets', value: '1,247', icon: Ticket, color: 'text-blue-600', change: '+12%' },
    { label: 'Open', value: '89', icon: AlertCircle, color: 'text-red-600', change: '-5%' },
    { label: 'In Progress', value: '156', icon: Clock, color: 'text-yellow-600', change: '+8%' },
    { label: 'Resolved', value: '1,002', icon: CheckCircle, color: 'text-green-600', change: '+15%' },
  ];

  const priorityStats = [
    { priority: 'Critical', count: 12, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    { priority: 'High', count: 45, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
    { priority: 'Medium', count: 156, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { priority: 'Low', count: 234, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  ];

  const typeStats = [
    { type: 'Incidents', count: 89, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
    { type: 'Service Requests', count: 156, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { type: 'Changes', count: 45, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    { type: 'Problems', count: 23, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'pending': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'resolved': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'closed': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ticket Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage support tickets and service requests</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ticketStats.map((stat, index) => (
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
                <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Priority and Type Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Priority Distribution</h3>
          <div className="space-y-3">
            {priorityStats.map((stat, index) => (
              <div key={stat.priority} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{stat.priority}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${stat.color.split(' ')[0]}`}
                      style={{ width: `${(stat.count / 447) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Type Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ticket Types</h3>
          <div className="space-y-3">
            {typeStats.map((stat, index) => (
              <div key={stat.type} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{stat.type}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${stat.color.split(' ')[0]}`}
                      style={{ width: `${(stat.count / 313) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets by ID, title, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Tickets</h3>
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
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assignee
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
              {tickets.map((ticket, index) => {
                const TypeIcon = getTypeIcon(ticket.type);
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
                      <div className="flex items-center gap-2">
                        <TypeIcon className="w-4 h-4 text-gray-500" />
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(ticket.type)}`}>
                          {ticket.type.replace('-', ' ')}
                        </span>
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.assignee}</p>
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
                        <button className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
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

export default TicketsOverview;
