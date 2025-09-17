import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Plus,
  Trash2,
  Search,
  RefreshCw,
  Download,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  X,
  CreditCard,
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  users: number;
  maxUsers: number;
  createdAt: string;
  lastActivity: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  billing: {
    monthlyRevenue: number;
    totalRevenue: number;
    nextBillingDate: string;
    paymentMethod: string;
  };
  features: string[];
  settings: {
    allowUserRegistration: boolean;
    requireEmailVerification: boolean;
    enableSSO: boolean;
    dataRetentionDays: number;
  };
}

interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  newCompanies: number;
  totalRevenue: number;
  averageUsersPerCompany: number;
  topIndustries: Array<{ industry: string; count: number; percentage: number }>;
  planDistribution: Array<{ plan: string; count: number; percentage: number }>;
}

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPlan, setFilterPlan] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: '',
    domain: '',
    industry: '',
    size: 'small',
    status: 'pending',
    plan: 'free',
    maxUsers: 10,
    contact: {
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
    },
    features: [],
    settings: {
      allowUserRegistration: true,
      requireEmailVerification: true,
      enableSSO: false,
      dataRetentionDays: 365,
    },
  });

  // Mock data
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      domain: 'techcorp.com',
      industry: 'Technology',
      size: 'large',
      status: 'active',
      plan: 'enterprise',
      users: 245,
      maxUsers: 500,
      createdAt: '2023-01-15T00:00:00Z',
      lastActivity: '2024-01-15T10:30:00Z',
      contact: {
        email: 'admin@techcorp.com',
        phone: '+1-555-0123',
        address: '123 Tech Street',
        city: 'San Francisco',
        country: 'United States',
      },
      billing: {
        monthlyRevenue: 2500,
        totalRevenue: 30000,
        nextBillingDate: '2024-02-15T00:00:00Z',
        paymentMethod: 'Credit Card',
      },
      features: ['SSO', 'Advanced Analytics', 'API Access', 'Priority Support'],
      settings: {
        allowUserRegistration: true,
        requireEmailVerification: true,
        enableSSO: true,
        dataRetentionDays: 1095,
      },
    },
    {
      id: '2',
      name: 'LogisticsCorp',
      domain: 'logisticscorp.com',
      industry: 'Logistics',
      size: 'medium',
      status: 'active',
      plan: 'premium',
      users: 89,
      maxUsers: 100,
      createdAt: '2023-06-20T00:00:00Z',
      lastActivity: '2024-01-15T09:45:00Z',
      contact: {
        email: 'contact@logisticscorp.com',
        phone: '+1-555-0456',
        address: '456 Logistics Ave',
        city: 'Chicago',
        country: 'United States',
      },
      billing: {
        monthlyRevenue: 1200,
        totalRevenue: 14400,
        nextBillingDate: '2024-02-20T00:00:00Z',
        paymentMethod: 'Bank Transfer',
      },
      features: ['Advanced Analytics', 'API Access', 'Priority Support'],
      settings: {
        allowUserRegistration: false,
        requireEmailVerification: true,
        enableSSO: false,
        dataRetentionDays: 730,
      },
    },
    {
      id: '3',
      name: 'FinanceCorp',
      domain: 'financecorp.com',
      industry: 'Finance',
      size: 'large',
      status: 'active',
      plan: 'enterprise',
      users: 156,
      maxUsers: 200,
      createdAt: '2023-03-10T00:00:00Z',
      lastActivity: '2024-01-15T08:20:00Z',
      contact: {
        email: 'admin@financecorp.com',
        phone: '+1-555-0789',
        address: '789 Finance Blvd',
        city: 'New York',
        country: 'United States',
      },
      billing: {
        monthlyRevenue: 3000,
        totalRevenue: 36000,
        nextBillingDate: '2024-02-10T00:00:00Z',
        paymentMethod: 'Credit Card',
      },
      features: ['SSO', 'Advanced Analytics', 'API Access', 'Priority Support', 'Custom Integrations'],
      settings: {
        allowUserRegistration: false,
        requireEmailVerification: true,
        enableSSO: true,
        dataRetentionDays: 2555,
      },
    },
    {
      id: '4',
      name: 'StartupCorp',
      domain: 'startupcorp.com',
      industry: 'Technology',
      size: 'small',
      status: 'active',
      plan: 'basic',
      users: 12,
      maxUsers: 25,
      createdAt: '2024-01-01T00:00:00Z',
      lastActivity: '2024-01-15T07:15:00Z',
      contact: {
        email: 'founder@startupcorp.com',
        phone: '+1-555-0321',
        address: '321 Startup Lane',
        city: 'Austin',
        country: 'United States',
      },
      billing: {
        monthlyRevenue: 99,
        totalRevenue: 99,
        nextBillingDate: '2024-02-01T00:00:00Z',
        paymentMethod: 'Credit Card',
      },
      features: ['Basic Analytics'],
      settings: {
        allowUserRegistration: true,
        requireEmailVerification: true,
        enableSSO: false,
        dataRetentionDays: 365,
      },
    },
    {
      id: '5',
      name: 'RetailCorp',
      domain: 'retailcorp.com',
      industry: 'Retail',
      size: 'medium',
      status: 'suspended',
      plan: 'premium',
      users: 67,
      maxUsers: 100,
      createdAt: '2023-09-15T00:00:00Z',
      lastActivity: '2024-01-10T15:30:00Z',
      contact: {
        email: 'admin@retailcorp.com',
        phone: '+1-555-0654',
        address: '654 Retail Road',
        city: 'Los Angeles',
        country: 'United States',
      },
      billing: {
        monthlyRevenue: 0,
        totalRevenue: 4800,
        nextBillingDate: '2024-02-15T00:00:00Z',
        paymentMethod: 'Credit Card',
      },
      features: ['Advanced Analytics', 'API Access'],
      settings: {
        allowUserRegistration: true,
        requireEmailVerification: true,
        enableSSO: false,
        dataRetentionDays: 365,
      },
    },
  ];

  const mockStats: CompanyStats = {
    totalCompanies: 1247,
    activeCompanies: 1156,
    newCompanies: 23,
    totalRevenue: 125000,
    averageUsersPerCompany: 45.2,
    topIndustries: [
      { industry: 'Technology', count: 456, percentage: 36.6 },
      { industry: 'Finance', count: 234, percentage: 18.8 },
      { industry: 'Healthcare', count: 189, percentage: 15.2 },
      { industry: 'Retail', count: 156, percentage: 12.5 },
      { industry: 'Other', count: 212, percentage: 17.0 },
    ],
    planDistribution: [
      { plan: 'Free', count: 567, percentage: 45.5 },
      { plan: 'Basic', count: 345, percentage: 27.7 },
      { plan: 'Premium', count: 234, percentage: 18.8 },
      { plan: 'Enterprise', count: 101, percentage: 8.1 },
    ],
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompanies(mockCompanies);
      setStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch company data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateCompany = async () => {
    if (!newCompany.name || !newCompany.domain || !newCompany.contact?.email) return;

    try {
      const company: Company = {
        id: Date.now().toString(),
        name: newCompany.name,
        domain: newCompany.domain,
        industry: newCompany.industry || 'Other',
        size: newCompany.size || 'small',
        status: newCompany.status || 'pending',
        plan: newCompany.plan || 'free',
        users: 0,
        maxUsers: newCompany.maxUsers || 10,
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        contact: newCompany.contact || {
          email: '',
          phone: '',
          address: '',
          city: '',
          country: '',
        },
        billing: {
          monthlyRevenue: 0,
          totalRevenue: 0,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          paymentMethod: 'Credit Card',
        },
        features: newCompany.features || [],
        settings: newCompany.settings || {
          allowUserRegistration: true,
          requireEmailVerification: true,
          enableSSO: false,
          dataRetentionDays: 365,
        },
      };

      setCompanies(prev => [...prev, company]);
      setShowCreateCompany(false);
      setNewCompany({
        name: '',
        domain: '',
        industry: '',
        size: 'small',
        status: 'pending',
        plan: 'free',
        maxUsers: 10,
        contact: {
          email: '',
          phone: '',
          address: '',
          city: '',
          country: '',
        },
        features: [],
        settings: {
          allowUserRegistration: true,
          requireEmailVerification: true,
          enableSSO: false,
          dataRetentionDays: 365,
        },
      });
    } catch (error) {
      console.error('Failed to create company:', error);
    }
  };


  const handleDeleteCompany = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company?')) return;

    try {
      setCompanies(prev => prev.filter(company => company.id !== id));
    } catch (error) {
      console.error('Failed to delete company:', error);
    }
  };

  const handleBulkAction = async (action: 'activate' | 'suspend' | 'delete') => {
    if (selectedCompanies.length === 0) return;

    try {
      switch (action) {
        case 'activate':
          setCompanies(prev => prev.map(company => 
            selectedCompanies.includes(company.id)
              ? { ...company, status: 'active' }
              : company
          ));
          break;
        case 'suspend':
          setCompanies(prev => prev.map(company => 
            selectedCompanies.includes(company.id)
              ? { ...company, status: 'suspended' }
              : company
          ));
          break;
        case 'delete':
          if (!confirm(`Are you sure you want to delete ${selectedCompanies.length} companies?`)) return;
          setCompanies(prev => prev.filter(company => !selectedCompanies.includes(company.id)));
          break;
      }
      setSelectedCompanies([]);
    } catch (error) {
      console.error('Failed to perform bulk action:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'inactive':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'suspended':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'inactive':
        return Clock;
      case 'suspended':
        return AlertTriangle;
      case 'pending':
        return Clock;
      default:
        return Clock;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'basic':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'premium':
        return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'enterprise':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || company.status === filterStatus;
    const matchesPlan = !filterPlan || company.plan === filterPlan;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  if (isLoading) {
    return (
    <div className="p-6 responsive-container">
        <div className="animate-pulse responsive-container">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 responsive-container">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container"></div>
            ))}
          </div>
          <div className="space-y-4 responsive-container">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container">
            Company Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container">
            Manage company accounts, billing, and settings
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
            <Download className="h-4 w-4 responsive-container" />
            <span>Export</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setShowCreateCompany(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container"
          >
            <Plus className="h-4 w-4 responsive-container" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container">
                  {stats.totalCompanies.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Total Companies</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
                <Building className="h-6 w-6 text-blue-600 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <div className="text-2xl font-bold text-green-600 responsive-container">
                  {stats.activeCompanies.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Active Companies</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container">
                <CheckCircle className="h-6 w-6 text-green-600 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <div className="text-2xl font-bold text-blue-600 responsive-container">
                  {stats.newCompanies}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">New This Month</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container">
                <TrendingUp className="h-6 w-6 text-blue-600 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <div className="text-2xl font-bold text-purple-600 responsive-container">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">Total Revenue</div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg responsive-container">
                <CreditCard className="h-6 w-6 text-purple-600 responsive-container" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              />
            </div>
            <div className="flex space-x-2 responsive-container">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
              >
                <option value="">All Plans</option>
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCompanies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 responsive-container"
        >
          <div className="flex items-center justify-between responsive-container">
            <div className="flex items-center space-x-2 responsive-container">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100 responsive-container">
                {selectedCompanies.length} company(ies) selected
              </span>
            </div>
            <div className="flex items-center space-x-2 responsive-container">
              <button
                onClick={() = aria-label="Button"> handleBulkAction('activate')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors responsive-container"
              >
                Activate
              </button>
              <button
                onClick={() = aria-label="Button"> handleBulkAction('suspend')}
                className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors responsive-container"
              >
                Suspend
              </button>
              <button
                onClick={() = aria-label="Button"> handleBulkAction('delete')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors responsive-container"
              >
                Delete
              </button>
              <button
                onClick={() = aria-label="Button"> setSelectedCompanies([])}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors responsive-container"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Companies List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden responsive-container">
        <div className="overflow-x-auto responsive-container">
          <table className="w-full responsive-container">
            <thead className="bg-gray-50 dark:bg-gray-700 responsive-container">
              <tr>
                <th className="px-6 py-3 text-left responsive-container">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCompanies(filteredCompanies.map(c => c.id));
                      } else {
                        setSelectedCompanies([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container">
              {filteredCompanies.map((company) => {
                const StatusIcon = getStatusIcon(company.status);
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.tr
                    key={company.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container"
                  >
                    <td className="px-6 py-4 responsive-container">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompanies([...selectedCompanies, company.id]);
                          } else {
                            setSelectedCompanies(selectedCompanies.filter(id => id !== company.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 responsive-container"
                      />
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-3 responsive-container">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm responsive-container">
                          {company.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white responsive-container">
                            {company.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-500 responsive-container">
                            {company.domain}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(company.plan)}`}>
                        {company.plan.charAt(0).toUpperCase() + company.plan.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="text-sm text-gray-900 dark:text-white responsive-container">
                        {company.users}/{company.maxUsers}
                      </div>
                    </td>
                    <td className="px-6 py-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <StatusIcon className="h-4 w-4 responsive-container" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                          {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container">
                      ${company.billing.monthlyRevenue.toLocaleString()}/mo
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container">
                      {new Date(company.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right responsive-container">
                      <div className="flex items-center justify-end space-x-2 responsive-container">
                        <button
                          onClick={() = aria-label="Button"> handleDeleteCompany(company.id)}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 responsive-container" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Company Modal */}
      <AnimatePresence>
        {showCreateCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto responsive-container"
            >
              <div className="flex items-center justify-between mb-4 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container">
                  Create New Company
                </h3>
                <button
                  onClick={() = aria-label="Button"> setShowCreateCompany(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container"
                >
                  <X className="h-5 w-5 responsive-container" />
                </button>
              </div>
              
              <div className="space-y-4 responsive-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={newCompany.name || ''}
                      onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Domain
                    </label>
                    <input
                      type="text"
                      value={newCompany.domain || ''}
                      onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                      placeholder="company.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Industry
                    </label>
                    <select
                      value={newCompany.industry || ''}
                      onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="">Select Industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Size
                    </label>
                    <select
                      value={newCompany.size || 'small'}
                      onChange={(e) => setNewCompany({ ...newCompany, size: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="small">Small (1-50)</option>
                      <option value="medium">Medium (51-200)</option>
                      <option value="large">Large (200+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                      Plan
                    </label>
                    <select
                      value={newCompany.plan || 'free'}
                      onChange={(e) => setNewCompany({ ...newCompany, plan: e.target.value as 'free' | 'basic' | 'premium' | 'enterprise' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    >
                      <option value="free">Free</option>
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={newCompany.contact?.email || ''}
                    onChange={(e) => setNewCompany({ 
                      ...newCompany, 
                      contact: { ...newCompany.contact!, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container"
                    placeholder="admin@company.com"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container">
                <button
                  onClick={() = aria-label="Button"> setShowCreateCompany(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCompany}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container"
                 aria-label="Button">
                  Create Company
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyManagement;
