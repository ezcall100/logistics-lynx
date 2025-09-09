import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Activity,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  TrendingUp,
  BarChart3,
  PieChart,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { cn, formatNumber, formatRelativeTime, formatPercentage, getStatusColor, getStatusIcon } from '../../lib/utils';

interface AIAgent {
  id: number;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  companyId: number;
  companyName: string;
  configuration: {
    algorithm: string;
    model: string;
    parameters: Record<string, any>;
    constraints: string[];
    preferences: string[];
  };
  performance: {
    successRate: number;
    avgResponseTime: number;
    throughput: number;
    accuracy: number;
    uptime: number;
  };
  metrics: {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    avgProcessingTime: number;
    lastActivity: string;
  };
  health: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
    lastCheck: string;
  };
}


const AICommandCenter: React.FC = () => {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<AIAgent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const companies = [
    { id: 1, name: 'Global Logistics Corp' },
    { id: 2, name: 'Swift Transport Ltd' },
    { id: 3, name: 'Metro Freight Inc' },
    { id: 4, name: 'Coastal Shipping Co' }
  ];

  const agentTypes = [
    { id: 'optimization', name: 'Route Optimizer', description: 'Optimizes delivery routes' },
    { id: 'matching', name: 'Load Matcher', description: 'Matches loads with carriers' },
    { id: 'prediction', name: 'Demand Forecaster', description: 'Predicts demand patterns' },
    { id: 'management', name: 'Fleet Manager', description: 'Manages fleet operations' },
    { id: 'analytics', name: 'Analytics Engine', description: 'Provides business insights' },
    { id: 'automation', name: 'Process Automator', description: 'Automates business processes' }
  ];

  // Mock data initialization
  useEffect(() => {
    const mockAgents: AIAgent[] = [
      {
        id: 1,
        name: 'Route Optimizer',
        type: 'optimization',
        description: 'Optimizes delivery routes for maximum efficiency',
        status: 'active',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        configuration: {
          algorithm: 'genetic',
          model: 'custom_model',
          parameters: {
            population_size: 100,
            generations: 50,
            mutation_rate: 0.1,
            crossover_rate: 0.8
          },
          constraints: ['time', 'fuel', 'capacity'],
          preferences: ['distance', 'cost', 'time']
        },
        performance: {
          successRate: 95.2,
          avgResponseTime: 2.5,
          throughput: 150,
          accuracy: 92.8,
          uptime: 99.5
        },
        metrics: {
          totalTasks: 1250,
          completedTasks: 1190,
          failedTasks: 60,
          avgProcessingTime: 2.3,
          lastActivity: '2024-01-15T10:30:00Z'
        },
        health: {
          cpu: 45,
          memory: 67,
          disk: 23,
          network: 12,
          lastCheck: '2024-01-15T10:30:00Z'
        }
      },
      {
        id: 2,
        name: 'Load Matcher',
        type: 'matching',
        description: 'Matches loads with available carriers',
        status: 'active',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        configuration: {
          algorithm: 'machine_learning',
          model: 'gpt-4',
          parameters: {
            confidence_threshold: 0.85,
            max_matches: 10,
            learning_rate: 0.001
          },
          constraints: ['capacity', 'location', 'time'],
          preferences: ['rate', 'reliability', 'distance']
        },
        performance: {
          successRate: 87.3,
          avgResponseTime: 1.8,
          throughput: 200,
          accuracy: 89.1,
          uptime: 98.8
        },
        metrics: {
          totalTasks: 890,
          completedTasks: 777,
          failedTasks: 113,
          avgProcessingTime: 1.6,
          lastActivity: '2024-01-15T10:25:00Z'
        },
        health: {
          cpu: 32,
          memory: 45,
          disk: 18,
          network: 8,
          lastCheck: '2024-01-15T10:30:00Z'
        }
      },
      {
        id: 3,
        name: 'Demand Forecaster',
        type: 'prediction',
        description: 'Predicts demand patterns and trends',
        status: 'active',
        companyId: 2,
        companyName: 'Swift Transport Ltd',
        configuration: {
          algorithm: 'lstm',
          model: 'tensorflow',
          parameters: {
            lookback_days: 30,
            forecast_days: 7,
            hidden_units: 128,
            epochs: 100
          },
          constraints: ['historical_data', 'seasonality'],
          preferences: ['accuracy', 'speed']
        },
        performance: {
          successRate: 89.1,
          avgResponseTime: 3.2,
          throughput: 80,
          accuracy: 91.5,
          uptime: 99.2
        },
        metrics: {
          totalTasks: 456,
          completedTasks: 406,
          failedTasks: 50,
          avgProcessingTime: 2.8,
          lastActivity: '2024-01-15T10:20:00Z'
        },
        health: {
          cpu: 28,
          memory: 52,
          disk: 31,
          network: 15,
          lastCheck: '2024-01-15T10:30:00Z'
        }
      },
      {
        id: 4,
        name: 'Fleet Manager',
        type: 'management',
        description: 'Manages fleet operations and maintenance',
        status: 'inactive',
        companyId: 3,
        companyName: 'Metro Freight Inc',
        configuration: {
          algorithm: 'reinforcement_learning',
          model: 'pytorch',
          parameters: {
            learning_rate: 0.01,
            epsilon: 0.1,
            batch_size: 32
          },
          constraints: ['maintenance_schedule', 'driver_availability'],
          preferences: ['efficiency', 'cost', 'safety']
        },
        performance: {
          successRate: 78.5,
          avgResponseTime: 4.1,
          throughput: 60,
          accuracy: 85.2,
          uptime: 95.8
        },
        metrics: {
          totalTasks: 234,
          completedTasks: 184,
          failedTasks: 50,
          avgProcessingTime: 3.9,
          lastActivity: '2024-01-14T16:20:00Z'
        },
        health: {
          cpu: 15,
          memory: 28,
          disk: 45,
          network: 5,
          lastCheck: '2024-01-15T10:30:00Z'
        }
      }
    ];

    setAgents(mockAgents);
    setFilteredAgents(mockAgents);
  }, []);

  // Filter and search agents
  useEffect(() => {
    let filtered = agents;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(agent => agent.status === statusFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(agent => agent.type === typeFilter);
    }

    // Company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(agent => agent.companyId === parseInt(companyFilter));
    }

    setFilteredAgents(filtered);
  }, [agents, searchQuery, statusFilter, typeFilter, companyFilter]);



  const handleDeleteAgent = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this AI agent?')) {
      setAgents(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleToggleAgent = async (id: number) => {
    setAgents(prev => prev.map(a => 
      a.id === id ? { 
        ...a, 
        status: a.status === 'active' ? 'inactive' : 'active' 
      } : a
    ));
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} agents?`)) {
          setAgents(prev => prev.filter(a => !bulkSelected.includes(a.id)));
          setBulkSelected([]);
        }
        break;
      case 'activate':
        setAgents(prev => prev.map(a => 
          bulkSelected.includes(a.id) ? { ...a, status: 'active' as any } : a
        ));
        setBulkSelected([]);
        break;
      case 'deactivate':
        setAgents(prev => prev.map(a => 
          bulkSelected.includes(a.id) ? { ...a, status: 'inactive' as any } : a
        ));
        setBulkSelected([]);
        break;
    }
  };


  const openEditModal = () => {
    alert('Agent editing feature coming soon');
  };

  const getTotalAgents = () => agents.length;
  const getActiveAgents = () => agents.filter(a => a.status === 'active').length;
  const getAverageSuccessRate = () => {
    const total = agents.reduce((sum, a) => sum + a.performance.successRate, 0);
    return agents.length > 0 ? total / agents.length : 0;
  };
  const getTotalTasks = () => agents.reduce((sum, a) => sum + a.metrics.totalTasks, 0);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Agents',
            value: formatNumber(getTotalAgents()),
            change: '+2 this month',
            icon: Bot,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50'
          },
          {
            title: 'Active Agents',
            value: formatNumber(getActiveAgents()),
            change: '+1 this week',
            icon: Activity,
            color: 'text-green-500',
            bgColor: 'bg-green-50'
          },
          {
            title: 'Success Rate',
            value: formatPercentage(getAverageSuccessRate()),
            change: '+2.3% vs last month',
            icon: TrendingUp,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50'
          },
          {
            title: 'Total Tasks',
            value: formatNumber(getTotalTasks()),
            change: '+15.7% vs last month',
            icon: BarChart3,
            color: 'text-orange-500',
            bgColor: 'bg-orange-50'
          }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-green-600 text-sm font-medium">{stat.change}</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Success rates and response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance analytics</p>
                <p className="text-sm text-gray-400">Real-time agent performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Task completion across agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Task distribution</p>
                <p className="text-sm text-gray-400">Visual breakdown of task completion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAgents = () => (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="error">Error</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {agentTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {bulkSelected.length} agents selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  <Play className="w-4 h-4 mr-2" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('deactivate')}>
                  <Pause className="w-4 h-4 mr-2" />
                  Deactivate
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={bulkSelected.length === filteredAgents.length && filteredAgents.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelected(filteredAgents.map(a => a.id));
                        } else {
                          setBulkSelected([]);
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Health
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(agent.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelected(prev => [...prev, agent.id]);
                          } else {
                            setBulkSelected(prev => prev.filter(id => id !== agent.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                          <div className="text-sm text-gray-500">{agent.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {agent.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleAgent(agent.id)}
                          className={cn(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                            agent.status === 'active' ? 'bg-primary-600' : 'bg-gray-200'
                          )}
                        >
                          <span
                            className={cn(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              agent.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(agent.status)}`}>
                          {getStatusIcon(agent.status)}
                          {agent.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">{formatPercentage(agent.performance.successRate)} success</div>
                        <div className="text-gray-500">{agent.performance.avgResponseTime}s avg</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">CPU: {agent.health.cpu}%</div>
                        <div className="text-gray-500">RAM: {agent.health.memory}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(agent.metrics.lastActivity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditModal()}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteAgent(agent.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Command Center</h2>
          <p className="text-gray-600">Monitor and manage autonomous AI agents</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => alert('Agent creation feature coming soon')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'agents', label: 'Agents', icon: Bot },
                { id: 'performance', label: 'Performance', icon: TrendingUp },
                { id: 'logs', label: 'Logs', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'agents' && renderAgents()}
          {activeTab === 'performance' && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Performance Analytics</h3>
              <p className="text-gray-500">Advanced performance analytics coming soon</p>
            </div>
          )}
          {activeTab === 'logs' && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Agent Logs</h3>
              <p className="text-gray-500">Real-time agent logs and monitoring coming soon</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AICommandCenter;
