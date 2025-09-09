import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, DollarSign, Activity, MoreHorizontal,
  Eye, Edit, Trash2, Settings, TrendingUp, TrendingDown
} from 'lucide-react';
import { Company } from '../../types';

interface CompanyTableProps {
  companies: Company[];
  onViewCompany: (company: Company) => void;
  onEditCompany: (company: Company) => void;
  onDeleteCompany: (company: Company) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  onViewCompany,
  onEditCompany,
  onDeleteCompany
}) => {
  const [sortField, setSortField] = useState<keyof Company>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const sortedCompanies = [...companies].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCompanies = filterStatus === 'all' 
    ? sortedCompanies 
    : sortedCompanies.filter(company => company.status === filterStatus);

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      suspended: { color: 'bg-red-100 text-red-800', label: 'Suspended' },
      trial: { color: 'bg-yellow-100 text-yellow-800', label: 'Trial' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      basic: { color: 'bg-gray-100 text-gray-800', label: 'Basic' },
      professional: { color: 'bg-blue-100 text-blue-800', label: 'Professional' },
      enterprise: { color: 'bg-purple-100 text-purple-800', label: 'Enterprise' }
    };
    const config = planConfig[plan as keyof typeof planConfig] || planConfig.basic;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getHealthIndicator = (health: string) => {
    const healthConfig = {
      excellent: { color: 'bg-green-500', label: 'Excellent' },
      good: { color: 'bg-blue-500', label: 'Good' },
      warning: { color: 'bg-yellow-500', label: 'Warning' },
      critical: { color: 'bg-red-500', label: 'Critical' }
    };
    const config = healthConfig[health as keyof typeof healthConfig] || healthConfig.good;
    
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.color}`}></div>
        <span className="text-sm text-gray-600">{config.label}</span>
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Companies</h3>
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="trial">Trial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50/70 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('status')}
              >
                Status
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('plan')}
              >
                Plan
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('users')}
              >
                Users
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('revenue')}
              >
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200/50">
            {filteredCompanies.map((company, index) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50/70 transition-all duration-200 hover:scale-[1.01]"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.subdomain}.transbotai.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(company.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPlanBadge(company.plan)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{company.users}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">${company.revenue.toLocaleString()}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getHealthIndicator(company.health || 'good')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewCompany(company)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="View Company"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditCompany(company)}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Edit Company"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteCompany(company)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Company"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200/30 bg-gray-50/70 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
              Previous
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
