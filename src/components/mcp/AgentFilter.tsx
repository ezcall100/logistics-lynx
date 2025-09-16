/**
 * Agent Filter Component
 * Advanced filtering and search for agents
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MCPAgent, MCPAgentFilter, MCPAgentStatus, MCPPortal, MCPAgentRole } from '../../types/mcp';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Activity,
  Clock,
  Settings,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface AgentFilterProps {
  filter: MCPAgentFilter;
  onFilterChange: (filter: MCPAgentFilter) => void;
  agents: MCPAgent[];
}

const statusOptions = [
  { value: 'all', label: 'All Status', icon: CheckCircle },
  { value: 'active', label: 'Active', icon: Activity },
  { value: 'idle', label: 'Idle', icon: Clock },
  { value: 'maintenance', label: 'Maintenance', icon: Settings },
  { value: 'error', label: 'Error', icon: AlertTriangle },
];

const priorityOptions = [
  { value: 'all', label: 'All Priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export const AgentFilter: React.FC<AgentFilterProps> = ({ filter, onFilterChange, agents }) => {
  // Get unique values for dropdowns
  const portals = Array.from(new Set(agents.map(a => a.portal))).sort();
  const roles = Array.from(new Set(agents.map(a => a.role))).sort();

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filter, search: value });
  };

  const handleStatusChange = (status: string) => {
    onFilterChange({ ...filter, status: status as MCPAgentStatus | 'all' });
  };

  const handlePortalChange = (portal: string) => {
    onFilterChange({ ...filter, portal: portal as MCPPortal | 'all' });
  };

  const handleRoleChange = (role: string) => {
    onFilterChange({ ...filter, role: role as MCPAgentRole | 'all' });
  };

  const handlePriorityChange = (priority: string) => {
    onFilterChange({
      ...filter,
      priority: priority as 'low' | 'medium' | 'high' | 'critical' | 'all',
    });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      status: 'all',
      portal: 'all',
      role: 'all',
      priority: 'all',
    });
  };

  const hasActiveFilters =
    filter.search ||
    filter.status !== 'all' ||
    filter.portal !== 'all' ||
    filter.role !== 'all' ||
    filter.priority !== 'all';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search agents by name, role, portal, or task..."
          value={filter.search}
          onChange={e => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        {filter.search && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Status
          </label>
          <select
            value={filter.status}
            onChange={e => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Portal Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Portal
          </label>
          <select
            value={filter.portal}
            onChange={e => handlePortalChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="all">All Portals</option>
            {portals.map(portal => (
              <option key={portal} value={portal}>
                {portal}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Role Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Role
          </label>
          <select
            value={filter.role}
            onChange={e => handleRoleChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Priority Filter */}
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Priority
          </label>
          <select
            value={filter.priority}
            onChange={e => handlePriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-8 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Active Filters & Clear */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/30"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Active Filters:
            </span>
            <div className="flex items-center gap-2">
              {filter.search && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  Search: "{filter.search}"
                </span>
              )}
              {filter.status !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  Status: {filter.status}
                </span>
              )}
              {filter.portal !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  Portal: {filter.portal}
                </span>
              )}
              {filter.role !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  Role: {filter.role}
                </span>
              )}
              {filter.priority !== 'all' && (
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  Priority: {filter.priority}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded transition-colors"
          >
            Clear All
          </button>
        </motion.div>
      )}
    </div>
  );
};
