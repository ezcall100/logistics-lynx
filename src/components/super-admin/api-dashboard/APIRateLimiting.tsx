import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  Globe,
  User,
  Server,
  Zap,
  BarChart3,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

/**
 * API Rate Limiting Page - Comprehensive rate limiting management
 * Created by MCP 302 Agents
 * Features: Rate limit configuration, monitoring, and enforcement
 */

interface RateLimit {
  id: string;
  name: string;
  type: 'global' | 'per-user' | 'per-ip' | 'per-endpoint';
  scope: string;
  requests: number;
  window: 'second' | 'minute' | 'hour' | 'day';
  burstLimit: number;
  status: 'active' | 'inactive' | 'warning';
  currentUsage: number;
  peakUsage: number;
  violations: number;
  lastViolation: Date | null;
  description: string;
  endpoints: string[];
  users: string[];
  ipRanges: string[];
}

const APIRateLimiting: React.FC = () => {
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLimits, setSelectedLimits] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<RateLimit | null>(null);

  // Mock data initialization
  useEffect(() => {
    const mockRateLimits: RateLimit[] = [
      {
        id: '1',
        name: 'Global API Rate Limit',
        type: 'global',
        scope: 'all',
        requests: 10000,
        window: 'hour',
        burstLimit: 1000,
        status: 'active',
        currentUsage: 7542,
        peakUsage: 8920,
        violations: 23,
        lastViolation: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: 'Global rate limit for all API endpoints',
        endpoints: ['*'],
        users: ['*'],
        ipRanges: ['*'],
      },
      {
        id: '2',
        name: 'User Authentication Limit',
        type: 'per-endpoint',
        scope: '/api/v1/auth/login',
        requests: 5,
        window: 'minute',
        burstLimit: 10,
        status: 'active',
        currentUsage: 2,
        peakUsage: 8,
        violations: 156,
        lastViolation: new Date(Date.now() - 15 * 60 * 1000),
        description: 'Rate limit for login attempts to prevent brute force',
        endpoints: ['/api/v1/auth/login'],
        users: ['*'],
        ipRanges: ['*'],
      },
      {
        id: '3',
        name: 'Premium User Limit',
        type: 'per-user',
        scope: 'premium-users',
        requests: 5000,
        window: 'hour',
        burstLimit: 500,
        status: 'active',
        currentUsage: 2340,
        peakUsage: 4200,
        violations: 0,
        lastViolation: null,
        description: 'Higher rate limit for premium users',
        endpoints: ['*'],
        users: ['premium'],
        ipRanges: ['*'],
      },
      {
        id: '4',
        name: 'IP-based Limit',
        type: 'per-ip',
        scope: '192.168.1.0/24',
        requests: 1000,
        window: 'hour',
        burstLimit: 100,
        status: 'warning',
        currentUsage: 950,
        peakUsage: 1200,
        violations: 45,
        lastViolation: new Date(Date.now() - 30 * 60 * 1000),
        description: 'Rate limit for specific IP range',
        endpoints: ['*'],
        users: ['*'],
        ipRanges: ['192.168.1.0/24'],
      },
    ];

    setRateLimits(mockRateLimits);
  }, []);

  const filteredLimits = rateLimits.filter(limit => {
    const matchesSearch = limit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         limit.scope.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         limit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || limit.type === filterType;
    const matchesStatus = filterStatus === 'all' || limit.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'global': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'per-user': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'per-ip': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'per-endpoint': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getUsagePercentage = (current: number, limit: number) => {
    return Math.round((current / limit) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSelectLimit = (limitId: string) => {
    setSelectedLimits(prev => 
      prev.includes(limitId) 
        ? prev.filter(id => id !== limitId)
        : [...prev, limitId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLimits.length === filteredLimits.length) {
      setSelectedLimits([]);
    } else {
      setSelectedLimits(filteredLimits.map(limit => limit.id));
    }
  };

  const handleEditLimit = (limit: RateLimit) => {
    setSelectedLimit(limit);
    setShowEditModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Shield className="w-8 h-8 text-cyan-500 mr-3" />
            Rate Limiting
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure and monitor API rate limits and throttling
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Rate Limit
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Limits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{rateLimits.length}</p>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <Shield className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Limits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {rateLimits.filter(limit => limit.status === 'active').length}
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Violations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {rateLimits.reduce((acc, limit) => acc + limit.violations, 0)}
              </p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Usage</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(rateLimits.reduce((acc, limit) => acc + getUsagePercentage(limit.currentUsage, limit.requests), 0) / rateLimits.length)}%
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                placeholder="Search rate limits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="global">Global</option>
              <option value="per-user">Per User</option>
              <option value="per-ip">Per IP</option>
              <option value="per-endpoint">Per Endpoint</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="warning">Warning</option>
            </select>
          </div>
          {selectedLimits.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedLimits.length} selected
              </span>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Rate Limits Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedLimits.length === filteredLimits.length && filteredLimits.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Rate Limit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Scope</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Limit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Usage</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Violations</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLimits.map((limit) => {
                const usagePercentage = getUsagePercentage(limit.currentUsage, limit.requests);
                
                return (
                  <tr key={limit.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedLimits.includes(limit.id)}
                        onChange={() => handleSelectLimit(limit.id)}
                        className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{limit.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{limit.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(limit.type)}`}>
                        {limit.type.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900 dark:text-white font-mono">{limit.scope}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {limit.requests.toLocaleString()} / {limit.window}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Burst: {limit.burstLimit.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-900 dark:text-white">
                              {limit.currentUsage.toLocaleString()}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">{usagePercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getUsageColor(usagePercentage)}`}
                              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                            />
                          </div>
                        </div>
                        {usagePercentage >= 90 && (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(limit.status)}`}>
                        {limit.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-900 dark:text-white">{limit.violations}</span>
                        {limit.violations > 0 && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditLimit(limit)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Edit Rate Limit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          title="View Details"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Rate Limit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default APIRateLimiting;
