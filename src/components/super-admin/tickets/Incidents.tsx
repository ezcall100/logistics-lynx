import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Users,
  Eye,
  Edit,
  Star,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Zap,
  Bug,
  Settings,
} from 'lucide-react';

const Incidents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const incidents = [
    {
      id: 'INC-001',
      title: 'Login issue with TMS portal',
      description: 'Users unable to login to the TMS portal after recent update',
      status: 'open',
      priority: 'high',
      severity: 'critical',
      assignee: 'John Smith',
      reporter: 'Sarah Johnson',
      company: 'Acme Corporation',
      createdDate: '2024-01-15',
      lastUpdated: '2024-01-16',
      tags: ['login', 'portal', 'urgent'],
      comments: 5,
      isStarred: true,
      affectedUsers: 45,
    },
    {
      id: 'INC-002',
      title: 'API integration failing',
      description: 'Third-party API calls are returning 500 errors',
      status: 'resolved',
      priority: 'high',
      severity: 'high',
      assignee: 'David Wilson',
      reporter: 'Robert Brown',
      company: 'Global Logistics Ltd',
      createdDate: '2024-01-13',
      lastUpdated: '2024-01-15',
      tags: ['api', 'integration', 'error'],
      comments: 8,
      isStarred: true,
      affectedUsers: 12,
    },
    {
      id: 'INC-003',
      title: 'Email notifications not working',
      description: 'Users not receiving email notifications for ticket updates',
      status: 'open',
      priority: 'high',
      severity: 'medium',
      assignee: 'Unassigned',
      reporter: 'Michael Brown',
      company: 'Global Tech Corp',
      createdDate: '2024-01-10',
      lastUpdated: '2024-01-12',
      tags: ['email', 'notifications', 'urgent'],
      comments: 3,
      isStarred: false,
      affectedUsers: 156,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Incidents</h1>
          <p className="text-gray-600 dark:text-gray-400">Critical system issues and outages</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Incidents', value: '12', icon: AlertCircle, color: 'text-red-600' },
          { label: 'Critical', value: '3', icon: AlertCircle, color: 'text-red-600' },
          { label: 'Resolved Today', value: '8', icon: CheckCircle, color: 'text-green-600' },
          { label: 'Avg Resolution', value: '2.3h', icon: Clock, color: 'text-blue-600' },
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
                placeholder="Search incidents..."
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

      {/* Incidents Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Incidents</h3>
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
                  Incident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Affected Users
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
              {incidents.map((incident, index) => (
                <motion.tr
                  key={incident.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{incident.id}</p>
                        {incident.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{incident.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{incident.company}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident.status)}`}>
                      {incident.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{incident.assignee}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{incident.affectedUsers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{incident.createdDate}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Incidents;
