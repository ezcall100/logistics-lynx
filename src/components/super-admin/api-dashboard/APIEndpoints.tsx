import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  Play,
  Pause,
  Square,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Globe,
  Key,
  Settings,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

/**
 * API Endpoints Page - Comprehensive endpoint management
 * Created by MCP 302 Agents
 * Features: Endpoint CRUD, testing, monitoring, and configuration
 */

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: 'active' | 'inactive' | 'deprecated' | 'maintenance';
  responseTime: number;
  successRate: number;
  requestCount: number;
  lastUsed: Date;
  version: string;
  category: string;
  description: string;
  rateLimit: number;
  authentication: 'none' | 'api-key' | 'oauth' | 'jwt';
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  responses: Array<{
    status: number;
    description: string;
    schema: string;
  }>;
}

const APIEndpoints: React.FC = () => {
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedEndpoints, setSelectedEndpoints] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  // Mock data initialization
  useEffect(() => {
    const mockEndpoints: APIEndpoint[] = [
      {
        id: '1',
        name: 'User Authentication',
        method: 'POST',
        path: '/api/v1/auth/login',
        status: 'active',
        responseTime: 245,
        successRate: 98.5,
        requestCount: 15420,
        lastUsed: new Date(Date.now() - 5 * 60 * 1000),
        version: 'v1.2.0',
        category: 'Authentication',
        description: 'User login and authentication endpoint',
        rateLimit: 1000,
        authentication: 'none',
        parameters: [
          { name: 'email', type: 'string', required: true, description: 'User email address' },
          { name: 'password', type: 'string', required: true, description: 'User password' },
        ],
        responses: [
          { status: 200, description: 'Login successful', schema: 'UserToken' },
          { status: 401, description: 'Invalid credentials', schema: 'Error' },
        ],
      },
      {
        id: '2',
        name: 'Get User Profile',
        method: 'GET',
        path: '/api/v1/users/{id}',
        status: 'active',
        responseTime: 156,
        successRate: 99.2,
        requestCount: 8920,
        lastUsed: new Date(Date.now() - 2 * 60 * 1000),
        version: 'v1.2.0',
        category: 'Users',
        description: 'Retrieve user profile information',
        rateLimit: 5000,
        authentication: 'jwt',
        parameters: [
          { name: 'id', type: 'string', required: true, description: 'User ID' },
        ],
        responses: [
          { status: 200, description: 'User profile retrieved', schema: 'User' },
          { status: 404, description: 'User not found', schema: 'Error' },
        ],
      },
      {
        id: '3',
        name: 'Create User',
        method: 'POST',
        path: '/api/v1/users',
        status: 'active',
        responseTime: 320,
        successRate: 97.8,
        requestCount: 2340,
        lastUsed: new Date(Date.now() - 15 * 60 * 1000),
        version: 'v1.2.0',
        category: 'Users',
        description: 'Create a new user account',
        rateLimit: 100,
        authentication: 'api-key',
        parameters: [
          { name: 'name', type: 'string', required: true, description: 'User full name' },
          { name: 'email', type: 'string', required: true, description: 'User email address' },
          { name: 'role', type: 'string', required: false, description: 'User role' },
        ],
        responses: [
          { status: 201, description: 'User created successfully', schema: 'User' },
          { status: 400, description: 'Invalid input data', schema: 'Error' },
        ],
      },
      {
        id: '4',
        name: 'Update User',
        method: 'PUT',
        path: '/api/v1/users/{id}',
        status: 'active',
        responseTime: 280,
        successRate: 98.9,
        requestCount: 1560,
        lastUsed: new Date(Date.now() - 8 * 60 * 1000),
        version: 'v1.2.0',
        category: 'Users',
        description: 'Update user information',
        rateLimit: 1000,
        authentication: 'jwt',
        parameters: [
          { name: 'id', type: 'string', required: true, description: 'User ID' },
          { name: 'name', type: 'string', required: false, description: 'Updated name' },
          { name: 'email', type: 'string', required: false, description: 'Updated email' },
        ],
        responses: [
          { status: 200, description: 'User updated successfully', schema: 'User' },
          { status: 404, description: 'User not found', schema: 'Error' },
        ],
      },
      {
        id: '5',
        name: 'Delete User',
        method: 'DELETE',
        path: '/api/v1/users/{id}',
        status: 'deprecated',
        responseTime: 180,
        successRate: 99.5,
        requestCount: 45,
        lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        version: 'v0.9.0',
        category: 'Users',
        description: 'Delete user account (deprecated)',
        rateLimit: 10,
        authentication: 'jwt',
        parameters: [
          { name: 'id', type: 'string', required: true, description: 'User ID' },
        ],
        responses: [
          { status: 204, description: 'User deleted successfully', schema: 'null' },
          { status: 404, description: 'User not found', schema: 'Error' },
        ],
      },
    ];

    setEndpoints(mockEndpoints);
  }, []);

  const filteredEndpoints = endpoints.filter(endpoint => {
    const matchesSearch = endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'all' || endpoint.method === filterMethod;
    const matchesStatus = filterStatus === 'all' || endpoint.status === filterStatus;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'PATCH': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'deprecated': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'maintenance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAuthIcon = (auth: string) => {
    switch (auth) {
      case 'jwt': return <Key className="w-4 h-4" />;
      case 'api-key': return <Key className="w-4 h-4" />;
      case 'oauth': return <Globe className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleSelectEndpoint = (endpointId: string) => {
    setSelectedEndpoints(prev => 
      prev.includes(endpointId) 
        ? prev.filter(id => id !== endpointId)
        : [...prev, endpointId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEndpoints.length === filteredEndpoints.length) {
      setSelectedEndpoints([]);
    } else {
      setSelectedEndpoints(filteredEndpoints.map(ep => ep.id));
    }
  };

  const handleTestEndpoint = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
    setShowTestModal(true);
  };

  const handleToggleEndpoint = (endpointId: string) => {
    setExpandedEndpoint(expandedEndpoint === endpointId ? null : endpointId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Server className="w-8 h-8 text-cyan-500 mr-3" />
            API Endpoints
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and monitor your API endpoints
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Endpoint
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Endpoints</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{endpoints.length}</p>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Server className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Endpoints</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {endpoints.filter(ep => ep.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(endpoints.reduce((acc, ep) => acc + ep.responseTime, 0) / endpoints.length)}ms
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {endpoints.reduce((acc, ep) => acc + ep.requestCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Methods</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="deprecated">Deprecated</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          {selectedEndpoints.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedEndpoints.length} selected
              </span>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Endpoints Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedEndpoints.length === filteredEndpoints.length && filteredEndpoints.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Endpoint</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Response Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Success Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Requests</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEndpoints.map((endpoint) => (
                <React.Fragment key={endpoint.id}>
                  <tr className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedEndpoints.includes(endpoint.id)}
                        onChange={() => handleSelectEndpoint(endpoint.id)}
                        className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleToggleEndpoint(endpoint.id)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {expandedEndpoint === endpoint.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{endpoint.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">{endpoint.path}</div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">{endpoint.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                        {endpoint.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{endpoint.responseTime}ms</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{endpoint.successRate}%</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{endpoint.requestCount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleTestEndpoint(endpoint)}
                          className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                          title="Test Endpoint"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <button
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Edit Endpoint"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Endpoint"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedEndpoint === endpoint.id && (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 bg-gray-50 dark:bg-slate-800/50">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Description</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{endpoint.description}</p>
                            
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Authentication</h4>
                            <div className="flex items-center space-x-2 mb-4">
                              {getAuthIcon(endpoint.authentication)}
                              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{endpoint.authentication}</span>
                            </div>

                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Parameters</h4>
                            <div className="space-y-2">
                              {endpoint.parameters.map((param, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-mono text-gray-900 dark:text-white">{param.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400">({param.type})</span>
                                    {param.required && (
                                      <span className="text-red-500 text-xs">*</span>
                                    )}
                                  </div>
                                  <span className="text-gray-500 dark:text-gray-400">{param.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Responses</h4>
                            <div className="space-y-2">
                              {endpoint.responses.map((response, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                  <span className="font-mono text-gray-900 dark:text-white">{response.status}</span>
                                  <span className="text-gray-500 dark:text-gray-400">{response.description}</span>
                                </div>
                              ))}
                            </div>

                            <h4 className="font-medium text-gray-900 dark:text-white mb-3 mt-6">Rate Limit</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{endpoint.rateLimit} requests/hour</p>

                            <h4 className="font-medium text-gray-900 dark:text-white mb-3 mt-4">Last Used</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {endpoint.lastUsed.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Endpoint Modal */}
      <AnimatePresence>
        {showTestModal && selectedEndpoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowTestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Test Endpoint: {selectedEndpoint.name}
                </h3>
                <button
                  onClick={() => setShowTestModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Square className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Endpoint URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(selectedEndpoint.method)}`}>
                      {selectedEndpoint.method}
                    </span>
                    <input
                      type="text"
                      value={`https://api.example.com${selectedEndpoint.path}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white font-mono text-sm"
                    />
                  </div>
                </div>

                {selectedEndpoint.parameters.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Parameters
                    </label>
                    <div className="space-y-2">
                      {selectedEndpoint.parameters.map((param, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder={param.name}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {param.type} {param.required && '*'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowTestModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Test Endpoint
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default APIEndpoints;
