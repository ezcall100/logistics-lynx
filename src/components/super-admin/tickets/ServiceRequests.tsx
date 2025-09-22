import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
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
  AlertCircle,
} from 'lucide-react';

const ServiceRequests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const serviceRequests = [
    {
      id: 'SR-001',
      title: 'Request for new reporting feature',
      description: 'Need to add custom report generation functionality',
      status: 'in-progress',
      priority: 'medium',
      category: 'enhancement',
      assignee: 'Mike Chen',
      reporter: 'Emily Rodriguez',
      company: 'TechStart Inc',
      createdDate: '2024-01-14',
      lastUpdated: '2024-01-16',
      tags: ['feature', 'reporting', 'enhancement'],
      comments: 3,
      isStarred: false,
      estimatedCompletion: '2024-02-15',
    },
    {
      id: 'SR-002',
      title: 'Request for mobile app feature',
      description: 'Need to add offline mode functionality to mobile app',
      status: 'open',
      priority: 'low',
      category: 'feature',
      assignee: 'Unassigned',
      reporter: 'Anna Wilson',
      company: 'MobileFirst Inc',
      createdDate: '2024-01-09',
      lastUpdated: '2024-01-11',
      tags: ['mobile', 'feature', 'offline'],
      comments: 2,
      isStarred: false,
      estimatedCompletion: '2024-03-01',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'enhancement': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'feature': return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      case 'integration': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Service Requests</h1>
          <p className="text-gray-600 dark:text-gray-400">Feature requests and enhancement requests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Open Requests', value: '45', icon: Settings, color: 'text-blue-600' },
          { label: 'In Progress', value: '23', icon: Clock, color: 'text-yellow-600' },
          { label: 'Completed', value: '156', icon: CheckCircle, color: 'text-green-600' },
          { label: 'Avg Processing', value: '5.2d', icon: Clock, color: 'text-purple-600' },
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

      {/* Service Requests Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Requests</h3>
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
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {serviceRequests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{request.id}</p>
                        {request.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">{request.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{request.company}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                      {request.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(request.category)}`}>
                      {request.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{request.assignee}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{request.estimatedCompletion}</p>
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

export default ServiceRequests;
