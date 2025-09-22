import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Edit,
  Trash2,
  Eye,
  Star,
  StarOff,
  MoreVertical,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Flag,
  Zap,
  Settings,
} from 'lucide-react';

const CrmProjects: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: '1',
      name: 'TMS Implementation - Acme Corp',
      client: 'Acme Corporation',
      status: 'in-progress',
      priority: 'high',
      progress: 75,
      budget: 125000,
      spent: 93750,
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      team: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
      description: 'Complete TMS implementation for enterprise client',
      tags: ['enterprise', 'implementation', 'priority'],
    },
    {
      id: '2',
      name: 'API Integration - TechStart',
      client: 'TechStart Inc',
      status: 'planning',
      priority: 'medium',
      progress: 25,
      budget: 45000,
      spent: 11250,
      startDate: '2024-02-01',
      endDate: '2024-04-30',
      team: ['Emily Chen', 'David Wilson'],
      description: 'API integration and custom development',
      tags: ['api', 'integration', 'startup'],
    },
    {
      id: '3',
      name: 'System Upgrade - Global Logistics',
      client: 'Global Logistics Ltd',
      status: 'completed',
      priority: 'high',
      progress: 100,
      budget: 75000,
      spent: 72000,
      startDate: '2023-11-01',
      endDate: '2024-01-15',
      team: ['Robert Brown', 'Lisa Davis', 'Tom Wilson'],
      description: 'System upgrade and performance optimization',
      tags: ['upgrade', 'optimization', 'completed'],
    },
  ];

  const projectStats = [
    { label: 'Active Projects', value: '12', icon: FolderOpen, color: 'text-blue-600' },
    { label: 'Completed', value: '8', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Budget', value: '$2.4M', icon: DollarSign, color: 'text-purple-600' },
    { label: 'Team Members', value: '24', icon: Users, color: 'text-orange-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'on-hold': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your client projects</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => (
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{project.client}</p>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                {project.status.replace('-', ' ')}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Budget</span>
                <span className="font-medium text-gray-900 dark:text-white">${project.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Spent</span>
                <span className="font-medium text-gray-900 dark:text-white">${project.spent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Team</span>
                <span className="font-medium text-gray-900 dark:text-white">{project.team.length} members</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CrmProjects;
