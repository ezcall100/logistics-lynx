import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  X,
  Save,
  Eye,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { formatCurrency, formatNumber, formatRelativeTime, getStatusColor, getStatusIcon } from '../../lib/utils';

interface Company {
  id: number;
  name: string;
  domain: string;
  users: number;
  plan: 'Basic' | 'Standard' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Suspended' | 'Inactive';
  revenue: number;
  growth: number;
  lastActive: string;
  features: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  settings: {
    maxUsers: number;
    storageLimit: number;
    apiCallsLimit: number;
    customBranding: boolean;
    ssoEnabled: boolean;
    auditLogs: boolean;
  };
  billing: {
    cycle: 'monthly' | 'yearly';
    nextBilling: string;
    paymentMethod: string;
    invoices: number;
  };
}

interface CompanyFormData {
  name: string;
  domain: string;
  plan: string;
  maxUsers: number;
  storageLimit: number;
  apiCallsLimit: number;
  customBranding: boolean;
  ssoEnabled: boolean;
  auditLogs: boolean;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    domain: '',
    plan: 'Basic',
    maxUsers: 10,
    storageLimit: 10,
    apiCallsLimit: 1000,
    customBranding: false,
    ssoEnabled: false,
    auditLogs: false,
    contact: {
      email: '',
      phone: '',
      address: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);

  // Mock data initialization
  useEffect(() => {
    const mockCompanies: Company[] = [
      {
        id: 1,
        name: 'Global Logistics Corp',
        domain: 'globallogistics.com',
        users: 1250,
        plan: 'Enterprise',
        status: 'Active',
        revenue: 45000,
        growth: 12,
        lastActive: '2024-01-15T10:30:00Z',
        features: ['TMS Core', 'Load Board', 'Fleet Management', 'Analytics', 'API Access'],
        contact: {
          email: 'admin@globallogistics.com',
          phone: '+1-555-0123',
          address: '123 Business Ave, New York, NY 10001'
        },
        settings: {
          maxUsers: 2000,
          storageLimit: 1000,
          apiCallsLimit: 100000,
          customBranding: true,
          ssoEnabled: true,
          auditLogs: true
        },
        billing: {
          cycle: 'yearly',
          nextBilling: '2024-12-15T00:00:00Z',
          paymentMethod: 'Credit Card',
          invoices: 12
        }
      },
      {
        id: 2,
        name: 'Swift Transport Ltd',
        domain: 'swifttransport.com',
        users: 890,
        plan: 'Professional',
        status: 'Active',
        revenue: 28500,
        growth: 8,
        lastActive: '2024-01-15T09:15:00Z',
        features: ['TMS Core', 'Load Board', 'Driver App'],
        contact: {
          email: 'contact@swifttransport.com',
          phone: '+1-555-0456',
          address: '456 Transport St, Los Angeles, CA 90210'
        },
        settings: {
          maxUsers: 1000,
          storageLimit: 500,
          apiCallsLimit: 50000,
          customBranding: true,
          ssoEnabled: false,
          auditLogs: true
        },
        billing: {
          cycle: 'monthly',
          nextBilling: '2024-02-15T00:00:00Z',
          paymentMethod: 'Bank Transfer',
          invoices: 24
        }
      },
      {
        id: 3,
        name: 'Metro Freight Inc',
        domain: 'metrofreight.com',
        users: 456,
        plan: 'Standard',
        status: 'Active',
        revenue: 15200,
        growth: 15,
        lastActive: '2024-01-15T08:45:00Z',
        features: ['TMS Core', 'Load Board'],
        contact: {
          email: 'info@metrofreight.com',
          phone: '+1-555-0789',
          address: '789 Freight Blvd, Chicago, IL 60601'
        },
        settings: {
          maxUsers: 500,
          storageLimit: 100,
          apiCallsLimit: 10000,
          customBranding: false,
          ssoEnabled: false,
          auditLogs: false
        },
        billing: {
          cycle: 'monthly',
          nextBilling: '2024-02-15T00:00:00Z',
          paymentMethod: 'Credit Card',
          invoices: 18
        }
      },
      {
        id: 4,
        name: 'Coastal Shipping Co',
        domain: 'coastalshipping.com',
        users: 234,
        plan: 'Basic',
        status: 'Trial',
        revenue: 0,
        growth: 0,
        lastActive: '2024-01-14T16:20:00Z',
        features: ['TMS Core'],
        contact: {
          email: 'hello@coastalshipping.com',
          phone: '+1-555-0321',
          address: '321 Harbor Dr, Miami, FL 33101'
        },
        settings: {
          maxUsers: 50,
          storageLimit: 10,
          apiCallsLimit: 1000,
          customBranding: false,
          ssoEnabled: false,
          auditLogs: false
        },
        billing: {
          cycle: 'monthly',
          nextBilling: '2024-02-14T00:00:00Z',
          paymentMethod: 'Trial',
          invoices: 0
        }
      }
    ];

    setCompanies(mockCompanies);
    setFilteredCompanies(mockCompanies);
  }, []);

  // Filter and search companies
  useEffect(() => {
    let filtered = companies;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(company => company.status === statusFilter);
    }

    // Plan filter
    if (planFilter !== 'all') {
      filtered = filtered.filter(company => company.plan === planFilter);
    }

    // Sort by company name
    filtered.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    setFilteredCompanies(filtered);
  }, [companies, searchQuery, statusFilter, planFilter]);

  const handleCreateCompany = async () => {
    setLoading(true);
    try {
      const newCompany: Company = {
        id: Math.max(...companies.map(c => c.id)) + 1,
        name: formData.name,
        domain: formData.domain,
        users: 0,
        plan: formData.plan as any,
        status: 'Trial',
        revenue: 0,
        growth: 0,
        lastActive: new Date().toISOString(),
        features: getFeaturesForPlan(formData.plan),
        contact: formData.contact,
        settings: {
          maxUsers: formData.maxUsers,
          storageLimit: formData.storageLimit,
          apiCallsLimit: formData.apiCallsLimit,
          customBranding: formData.customBranding,
          ssoEnabled: formData.ssoEnabled,
          auditLogs: formData.auditLogs
        },
        billing: {
          cycle: 'monthly',
          nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          paymentMethod: 'Trial',
          invoices: 0
        }
      };

      setCompanies(prev => [...prev, newCompany]);
      setShowCompanyModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCompany = async () => {
    if (!editingCompany) return;

    setLoading(true);
    try {
      const updatedCompany: Company = {
        ...editingCompany,
        name: formData.name,
        domain: formData.domain,
        plan: formData.plan as any,
        features: getFeaturesForPlan(formData.plan),
        contact: formData.contact,
        settings: {
          ...editingCompany.settings,
          maxUsers: formData.maxUsers,
          storageLimit: formData.storageLimit,
          apiCallsLimit: formData.apiCallsLimit,
          customBranding: formData.customBranding,
          ssoEnabled: formData.ssoEnabled,
          auditLogs: formData.auditLogs
        }
      };

      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? updatedCompany : c));
      setEditingCompany(null);
      setShowCompanyModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating company:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCompany = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} companies?`)) {
          setCompanies(prev => prev.filter(c => !bulkSelected.includes(c.id)));
          setBulkSelected([]);
        }
        break;
      case 'suspend':
        setCompanies(prev => prev.map(c => 
          bulkSelected.includes(c.id) ? { ...c, status: 'Suspended' as any } : c
        ));
        setBulkSelected([]);
        break;
      case 'activate':
        setCompanies(prev => prev.map(c => 
          bulkSelected.includes(c.id) ? { ...c, status: 'Active' as any } : c
        ));
        setBulkSelected([]);
        break;
    }
  };

  const getFeaturesForPlan = (plan: string): string[] => {
    switch (plan) {
      case 'Basic':
        return ['TMS Core'];
      case 'Standard':
        return ['TMS Core', 'Load Board'];
      case 'Professional':
        return ['TMS Core', 'Load Board', 'Driver App'];
      case 'Enterprise':
        return ['TMS Core', 'Load Board', 'Fleet Management', 'Analytics', 'API Access'];
      default:
        return ['TMS Core'];
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      domain: '',
      plan: 'Basic',
      maxUsers: 10,
      storageLimit: 10,
      apiCallsLimit: 1000,
      customBranding: false,
      ssoEnabled: false,
      auditLogs: false,
      contact: {
        email: '',
        phone: '',
        address: ''
      }
    });
  };

  const openEditModal = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      domain: company.domain,
      plan: company.plan,
      maxUsers: company.settings.maxUsers,
      storageLimit: company.settings.storageLimit,
      apiCallsLimit: company.settings.apiCallsLimit,
      customBranding: company.settings.customBranding,
      ssoEnabled: company.settings.ssoEnabled,
      auditLogs: company.settings.auditLogs,
      contact: company.contact
    });
    setShowCompanyModal(true);
  };

  const CompanyModal = () => (
    <AnimatePresence>
      {showCompanyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingCompany ? 'Edit Company' : 'Add New Company'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowCompanyModal(false);
                    setEditingCompany(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter company name"
                />
                <Input
                  label="Domain"
                  value={formData.domain}
                  onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                  placeholder="company.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData(prev => ({ ...prev, plan: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <Input
                  label="Max Users"
                  type="number"
                  value={formData.maxUsers}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: parseInt(e.target.value) }))}
                />
                <Input
                  label="Storage Limit (GB)"
                  type="number"
                  value={formData.storageLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, storageLimit: parseInt(e.target.value) }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Calls Limit</label>
                <Input
                  type="number"
                  value={formData.apiCallsLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, apiCallsLimit: parseInt(e.target.value) }))}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                  <Input
                    label="Phone"
                    value={formData.contact.phone}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, phone: e.target.value }
                    }))}
                    leftIcon={<Phone className="w-4 h-4" />}
                  />
                </div>
                <Input
                  label="Address"
                  value={formData.contact.address}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    contact: { ...prev.contact, address: e.target.value }
                  }))}
                  leftIcon={<MapPin className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                <div className="space-y-2">
                  {[
                    { key: 'customBranding', label: 'Custom Branding' },
                    { key: 'ssoEnabled', label: 'SSO Enabled' },
                    { key: 'auditLogs', label: 'Audit Logs' }
                  ].map((setting) => (
                    <label key={setting.key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData[setting.key as keyof CompanyFormData] as boolean}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          [setting.key]: e.target.checked 
                        }))}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{setting.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCompanyModal(false);
                  setEditingCompany(null);
                  resetForm();
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={editingCompany ? handleUpdateCompany : handleCreateCompany}
                loading={loading}
              >
                <Save className="w-4 h-4 mr-2" />
                {editingCompany ? 'Update Company' : 'Create Company'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Management</h2>
          <p className="text-gray-600">Manage client companies and their configurations</p>
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
          <Button onClick={() => setShowCompanyModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search companies..."
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
                <option value="Active">Active</option>
                <option value="Trial">Trial</option>
                <option value="Suspended">Suspended</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Plans</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
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
                {bulkSelected.length} companies selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('suspend')}>
                  Suspend
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

      {/* Companies Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={bulkSelected.length === filteredCompanies.length && filteredCompanies.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelected(filteredCompanies.map(c => c.id));
                        } else {
                          setBulkSelected([]);
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(company.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelected(prev => [...prev, company.id]);
                          } else {
                            setBulkSelected(prev => prev.filter(id => id !== company.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(company.users)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        company.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                        company.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                        company.plan === 'Standard' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {company.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(company.status)}`}>
                        {getStatusIcon(company.status)}
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(company.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      +{company.growth}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(company.lastActive)}
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
                          onClick={() => openEditModal(company)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteCompany(company.id)}
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

      {/* Modals */}
      <CompanyModal />
    </div>
  );
};

export default CompanyManagement;
