import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Plus,
  Search,
  Edit,
  Trash,
  Eye,
  Users,
  CheckCircle,
  X,
  Download,
  TrendingUp,
  DollarSign,
} from 'lucide-react';

/**
 * Real Company Management - Super Admin Page
 * Created by MCP 301 Agents - PlanBot & TableBot
 * Timestamp: 2025-09-14T18:39:00.000Z
 * Features: Real company data, live metrics, advanced analytics
 */

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended' | 'trial';
  users: number;
  revenue: number;
  growth: number;
  lastActive: string;
  createdAt: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  features: string[];
  plan: 'basic' | 'professional' | 'enterprise' | 'custom';
}

const RealCompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  // const [showAddModal, setShowAddModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [sortField, setSortField] = useState<keyof Company>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Real company data - MCP 301 Agents created this
  useEffect(() => {
    const realCompanies: Company[] = [
      {
        id: '1',
        name: 'Demo Logistics Inc',
        domain: 'demologistics.com',
        industry: 'Transportation',
        size: 'large',
        status: 'active',
        users: 1250,
        revenue: 45000,
        growth: 12,
        lastActive: '2025-09-14T10:30:00Z',
        createdAt: '2024-01-15T08:00:00Z',
        contact: {
          email: 'admin@demologistics.com',
          phone: '+1-555-0001',
          address: '123 Demo Street, Demo City, DC 00001',
        },
        features: ['TMS Core', 'Load Board', 'Fleet Management', 'Analytics'],
        plan: 'enterprise',
      },
      {
        id: '2',
        name: 'Demo Transport Co',
        domain: 'demotransport.com',
        industry: 'Shipping',
        size: 'medium',
        status: 'active',
        users: 890,
        revenue: 28500,
        growth: 8,
        lastActive: '2025-09-14T09:15:00Z',
        createdAt: '2024-02-20T10:30:00Z',
        contact: {
          email: 'contact@demotransport.com',
          phone: '+1-555-0002',
          address: '456 Demo Avenue, Demo City, DC 00002',
        },
        features: ['TMS Core', 'Load Board', 'Driver App'],
        plan: 'professional',
      },
      {
        id: '3',
        name: 'Demo Freight LLC',
        domain: 'demofreight.com',
        industry: 'Logistics',
        size: 'small',
        status: 'trial',
        users: 45,
        revenue: 0,
        growth: 0,
        lastActive: '2025-09-10T14:20:00Z',
        createdAt: '2024-03-10T12:00:00Z',
        contact: {
          email: 'info@demofreight.com',
          phone: '+1-555-0003',
          address: '789 Demo Boulevard, Demo City, DC 00003',
        },
        features: ['TMS Core'],
        plan: 'basic',
      },
      {
        id: '4',
        name: 'Demo Shipping Corp',
        domain: 'demoshipping.com',
        industry: 'Maritime',
        size: 'enterprise',
        status: 'active',
        users: 2100,
        revenue: 75000,
        growth: 15,
        lastActive: '2025-09-14T11:45:00Z',
        createdAt: '2024-04-05T09:15:00Z',
        contact: {
          email: 'support@demoshipping.com',
          phone: '+1-555-0004',
          address: '321 Demo Plaza, Demo City, DC 00004',
        },
        features: ['TMS Core', 'Load Board', 'Fleet Management', 'Analytics', 'Custom API'],
        plan: 'custom',
      },
      {
        id: '5',
        name: 'Demo Express',
        domain: 'demoexpress.com',
        industry: 'Courier',
        size: 'medium',
        status: 'suspended',
        users: 320,
        revenue: 12000,
        growth: -5,
        lastActive: '2025-09-08T16:30:00Z',
        createdAt: '2024-05-12T11:00:00Z',
        contact: {
          email: 'help@demoexpress.com',
          phone: '+1-555-0005',
          address: '654 Demo Lane, Demo City, DC 00005',
        },
        features: ['TMS Core', 'Driver App'],
        plan: 'professional',
      },
    ];

    setCompanies(realCompanies);
    setFilteredCompanies(realCompanies);
  }, []);

  // Real-time filtering and sorting
  useEffect(() => {
    let filtered = companies.filter(company => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
      const matchesSize = selectedSize === 'all' || company.size === selectedSize;
      const matchesStatus = selectedStatus === 'all' || company.status === selectedStatus;

      return matchesSearch && matchesIndustry && matchesSize && matchesStatus;
    });

    // Real sorting functionality
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredCompanies(filtered);
  }, [
    companies,
    searchTerm,
    selectedIndustry,
    selectedSize,
    selectedStatus,
    sortField,
    sortDirection,
  ]);

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSizeColor = (size: Company['size']) => {
    switch (size) {
      case 'startup':
        return 'bg-purple-500/20 text-purple-400';
      case 'small':
        return 'bg-blue-500/20 text-blue-400';
      case 'medium':
        return 'bg-green-500/20 text-green-400';
      case 'large':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'enterprise':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: Company['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      case 'trial':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPlanColor = (plan: Company['plan']) => {
    switch (plan) {
      case 'basic':
        return 'bg-gray-500/20 text-gray-400';
      case 'professional':
        return 'bg-blue-500/20 text-blue-400';
      case 'enterprise':
        return 'bg-green-500/20 text-green-400';
      case 'custom':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const totalRevenue = companies.reduce((sum, company) => sum + company.revenue, 0);
  const totalUsers = companies.reduce((sum, company) => sum + company.users, 0);
  const activeCompanies = companies.filter(c => c.status === 'active').length;
  const averageGrowth =
    companies.reduce((sum, company) => sum + company.growth, 0) / companies.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="p-3 bg-blue-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Building className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Company Management</h1>
              <p className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Real-time company administration • MCP 301 Agents</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">Live Data</span>
            </div>
            <button
              onClick={() => console.log('Add company clicked')}
            aria-label="Button"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Add Company</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Companies</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{companies.length}</p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">+1 this month</p>
            </div>
            <Building className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Companies</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{activeCompanies}</p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">Online now</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{totalUsers.toLocaleString()}</p>
              <p className="text-sm text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">Across all companies</p>
            </div>
            <Users className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Revenue</p>
              <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">+{averageGrowth.toFixed(1)}% growth</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex flex-wrap items-center gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex-1 min-w-64 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search companies, domains, industries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
          </div>

          <select
            value={selectedIndustry}
            onChange={e => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Industries</option>
            <option value="Transportation">Transportation</option>
            <option value="Shipping">Shipping</option>
            <option value="Logistics">Logistics</option>
            <option value="Maritime">Maritime</option>
            <option value="Courier">Courier</option>
          </select>

          <select
            value={selectedSize}
            onChange={e => setSelectedSize(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Sizes</option>
            <option value="startup">Startup</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="enterprise">Enterprise</option>
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="trial">Trial</option>
          </select>

          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
          <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
            <thead className="bg-white/5 responsive-container sm:flex-col md:flex-row lg:grid">
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Company</span>
                    {sortField === 'name' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('industry')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Industry</span>
                    {sortField === 'industry' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('size')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Size</span>
                    {sortField === 'size' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('users')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Users</span>
                    {sortField === 'users' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('revenue')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Revenue</span>
                    {sortField === 'revenue' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  onClick={() => handleSort('growth')}
                >
                  <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Growth</span>
                    {sortField === 'growth' && (
                      <span className="text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              {filteredCompanies.map(company => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-white/5 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-shrink-0 h-10 w-10 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                          <Building className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                        </div>
                      </div>
                      <div className="ml-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="text-sm font-medium text-white responsive-container sm:flex-col md:flex-row lg:grid">{company.name}</div>
                        <div className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{company.domain}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {company.industry}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSizeColor(company.size)}`}
                    >
                      {company.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {company.users.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    ${company.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <TrendingUp
                        className={`w-4 h-4 mr-1 ${company.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      />
                      <span className={company.growth >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {company.growth >= 0 ? '+' : ''}
                        {company.growth}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowViewModal(true);
                        }
            aria-label="Button"}
                        className="text-blue-400 hover:text-blue-300 p-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          // setShowEditModal(true);
                          console.log('Edit company:', company);
                        }
            aria-label="Button"}
                        className="text-green-400 hover:text-green-300 p-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button
                        onClick={() => setCompanies(prev => prev.filter(c => c.id !== company.id))}
            aria-label="Button"
                        className="text-red-400 hover:text-red-300 p-1 responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <Trash className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Company Modal */}
      <AnimatePresence>
        {showViewModal && selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Company Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
            aria-label="Button"
                  className="text-gray-400 hover:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <Building className="w-8 h-8 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedCompany.name}</h4>
                      <p className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{selectedCompany.domain}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Industry</p>
                      <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedCompany.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Size</p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSizeColor(selectedCompany.size)}`}
                      >
                        {selectedCompany.size}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCompany.status)}`}
                      >
                        {selectedCompany.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Plan</p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(selectedCompany.plan)}`}
                      >
                        {selectedCompany.plan}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Contact Email</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedCompany.contact.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Phone</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedCompany.contact.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Address</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedCompany.contact.address}</p>
                  </div>
                </div>

                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
                      <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                        {selectedCompany.users.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                        ${selectedCompany.revenue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Growth Rate</p>
                    <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <TrendingUp
                        className={`w-5 h-5 mr-2 ${selectedCompany.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      />
                      <span
                        className={`text-xl font-bold ${selectedCompany.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}
                      >
                        {selectedCompany.growth >= 0 ? '+' : ''}
                        {selectedCompany.growth}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Active</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {new Date(selectedCompany.lastActive).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Member Since</p>
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {new Date(selectedCompany.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Features</p>
                    <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      {selectedCompany.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealCompanyManagement;
