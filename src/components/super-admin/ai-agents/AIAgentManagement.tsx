import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Settings,
  Trash2,
  Edit,
  Eye,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Database,
  Globe,
  Shield,
} from 'lucide-react';

const AIAgentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  const agents = [
    {
      id: 'agent-001',
      name: 'Customer Support Agent',
      type: 'Customer Support',
      status: 'active',
      tasks: 12,
      efficiency: 96,
      lastActive: '2 minutes ago',
      version: 'v2.1.3',
      location: 'US-East',
      cpu: 45,
      memory: 62,
    },
    {
      id: 'agent-002',
      name: 'Data Processing Bot',
      type: 'Data Processing',
      status: 'active',
      tasks: 8,
      efficiency: 92,
      lastActive: '5 minutes ago',
      version: 'v1.8.2',
      location: 'EU-West',
      cpu: 78,
      memory: 45,
    },
    {
      id: 'agent-003',
      name: 'Content Generator',
      type: 'Content Generation',
      status: 'maintenance',
      tasks: 0,
      efficiency: 89,
      lastActive: '1 hour ago',
      version: 'v3.0.1',
      location: 'US-West',
      cpu: 12,
      memory: 23,
    },
    {
      id: 'agent-004',
      name: 'Analytics Engine',
      type: 'Analytics',
      status: 'active',
      tasks: 15,
      efficiency: 94,
      lastActive: '1 minute ago',
      version: 'v2.5.0',
      location: 'Asia-Pacific',
      cpu: 67,
      memory: 78,
    },
    {
      id: 'agent-005',
      name: 'Security Monitor',
      type: 'Security',
      status: 'active',
      tasks: 3,
      efficiency: 98,
      lastActive: '30 seconds ago',
      version: 'v1.9.4',
      location: 'US-East',
      cpu: 34,
      memory: 56,
    },
    {
      id: 'agent-006',
      name: 'Workflow Automator',
      type: 'Automation',
      status: 'idle',
      tasks: 0,
      efficiency: 87,
      lastActive: '3 hours ago',
      version: 'v2.3.1',
      location: 'EU-Central',
      cpu: 8,
      memory: 34,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'idle': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'maintenance': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'idle': return <Clock className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || agent.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectAgent = (agentId: string) => {
    setSelectedAgents(prev => 
      prev.includes(agentId) 
        ? prev.filter(id => id !== agentId)
        : [...prev, agentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAgents(
      selectedAgents.length === filteredAgents.length 
        ? [] 
        : filteredAgents.map(agent => agent.id)
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor your AI agents</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Settings className="w-4 h-4 mr-2 inline" />
            Bulk Actions
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Plus className="w-4 h-4 mr-2 inline" />
            Create Agent
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="maintenance">Maintenance</option>
          <option value="error">Error</option>
        </select>
        <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Agents Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAgents.length === filteredAgents.length && filteredAgents.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Resources
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAgents.map((agent, index) => (
                <motion.tr
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedAgents.includes(agent.id)}
                      onChange={() => handleSelectAgent(agent.id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{agent.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{agent.type}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">v{agent.version} • {agent.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {getStatusIcon(agent.status)}
                      <span className="ml-1 capitalize">{agent.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {agent.tasks}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${agent.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{agent.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      <div>CPU: {agent.cpu}%</div>
                      <div>RAM: {agent.memory}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {agent.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                        {agent.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Actions */}
      {selectedAgents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700 dark:text-purple-300">
              {selectedAgents.length} agent(s) selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                <Play className="w-4 h-4 mr-1 inline" />
                Start
              </button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 transition-colors">
                <Pause className="w-4 h-4 mr-1 inline" />
                Pause
              </button>
              <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                <Trash2 className="w-4 h-4 mr-1 inline" />
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAgentManagement;
