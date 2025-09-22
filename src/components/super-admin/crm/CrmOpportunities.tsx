import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Building,
  Phone,
  Mail,
  MessageSquare,
} from 'lucide-react';

const CrmOpportunities: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const opportunities = [
    {
      id: '1',
      name: 'Enterprise TMS Implementation',
      company: 'Acme Corporation',
      contact: 'John Smith',
      stage: 'proposal',
      value: 125000,
      probability: 75,
      expectedClose: '2024-03-15',
      lastActivity: '2024-01-15',
      owner: 'Sarah Johnson',
      description: 'Complete TMS implementation for enterprise client',
      tags: ['enterprise', 'implementation', 'high-value'],
      priority: 'high',
    },
    {
      id: '2',
      name: 'API Integration Project',
      company: 'TechStart Inc',
      contact: 'Mike Chen',
      stage: 'qualified',
      value: 45000,
      probability: 60,
      expectedClose: '2024-02-28',
      lastActivity: '2024-01-14',
      owner: 'David Wilson',
      description: 'API integration and custom development',
      tags: ['api', 'integration', 'startup'],
      priority: 'medium',
    },
    {
      id: '3',
      name: 'System Upgrade Contract',
      company: 'Global Logistics Ltd',
      contact: 'Emily Rodriguez',
      stage: 'negotiation',
      value: 75000,
      probability: 85,
      expectedClose: '2024-02-15',
      lastActivity: '2024-01-13',
      owner: 'Robert Brown',
      description: 'System upgrade and performance optimization',
      tags: ['upgrade', 'optimization', 'renewal'],
      priority: 'high',
    },
  ];

  const stages = [
    { name: 'Prospecting', value: 15, color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' },
    { name: 'Qualification', value: 25, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { name: 'Proposal', value: 50, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { name: 'Negotiation', value: 75, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
    { name: 'Closed Won', value: 100, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
  ];

  const opportunityStats = [
    { label: 'Total Pipeline', value: '$2.4M', icon: DollarSign, color: 'text-blue-600' },
    { label: 'Active Opportunities', value: '24', icon: Target, color: 'text-green-600' },
    { label: 'Win Rate', value: '68%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Avg Deal Size', value: '$85K', icon: BarChart3, color: 'text-orange-600' },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
      case 'qualified': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'proposal': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'negotiation': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'closed-won': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
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

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return 'text-green-600';
    if (probability >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Opportunities</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your sales pipeline</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Opportunity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {opportunityStats.map((stat, index) => (
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

      {/* Pipeline Stages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage, index) => (
            <div key={stage.name} className="text-center">
              <div className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2`}>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${stage.color.split(' ')[0]}`}
                  style={{ width: `${stage.value}%` }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{stage.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">{stage.value}%</p>
            </div>
          ))}
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
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Stages</option>
            {stages.map(stage => (
              <option key={stage.name} value={stage.name.toLowerCase().replace(' ', '-')}>{stage.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Opportunities Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Opportunities</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Opportunity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Expected Close
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {opportunities.map((opportunity, index) => (
                <motion.tr
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{opportunity.name}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(opportunity.priority)}`}>
                          {opportunity.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.company}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{opportunity.contact}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(opportunity.stage)}`}>
                      {opportunity.stage.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${opportunity.value.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${opportunity.probability}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                        {opportunity.probability}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.expectedClose}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.owner}</p>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrmOpportunities;
