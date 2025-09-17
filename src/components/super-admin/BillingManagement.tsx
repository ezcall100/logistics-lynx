import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Upload,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  X,
  Save,
  FileText,
  PieChart,
  BarChart3,
  LineChart,
  Users,
  Building2,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatRelativeTime,
  getStatusColor,
  getStatusIcon,
} from '../../lib/utils';

interface BillingInfo {
  id: number;
  companyId: number;
  companyName: string;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  paymentMethod: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'active' | 'trial' | 'suspended' | 'cancelled';
  plan: string;
  features: string[];
  invoices: Invoice[];
  usage: {
    users: number;
    storage: number;
    apiCalls: number;
    overages: number;
  };
  limits: {
    maxUsers: number;
    maxStorage: number;
    maxApiCalls: number;
  };
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
  paymentMethod: string;
  paidAt?: string;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface BillingFormData {
  companyId: number;
  billingCycle: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: string;
  plan: string;
  features: string[];
}

const BillingManagement: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState<BillingInfo[]>([]);
  const [filteredBilling, setFilteredBilling] = useState<BillingInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [editingBilling, setEditingBilling] = useState<BillingInfo | null>(null);
  const [formData, setFormData] = useState<BillingFormData>({
    companyId: 1,
    billingCycle: 'monthly',
    paymentMethod: 'Credit Card',
    amount: 0,
    currency: 'USD',
    status: 'active',
    plan: 'Basic',
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  const companies = [
    { id: 1, name: 'Global Logistics Corp' },
    { id: 2, name: 'Swift Transport Ltd' },
    { id: 3, name: 'Metro Freight Inc' },
    { id: 4, name: 'Coastal Shipping Co' },
  ];

  const availablePlans = [
    { id: 'basic', name: 'Basic', price: 99, features: ['basic_access'] },
    { id: 'standard', name: 'Standard', price: 299, features: ['basic_access', 'analytics'] },
    {
      id: 'professional',
      name: 'Professional',
      price: 599,
      features: ['basic_access', 'analytics', 'api_access'],
    },
    { id: 'enterprise', name: 'Enterprise', price: 1299, features: ['*'] },
  ];

  const availableFeatures = [
    'basic_access',
    'analytics',
    'api_access',
    'custom_branding',
    'sso_enabled',
    'audit_logs',
    'priority_support',
    'custom_integrations',
    'advanced_reporting',
    'white_label',
  ];

  // Mock data initialization
  useEffect(() => {
    const mockBillingInfo: BillingInfo[] = [
      {
        id: 1,
        companyId: 1,
        companyName: 'Global Logistics Corp',
        billingCycle: 'yearly',
        nextBillingDate: '2024-12-15T00:00:00Z',
        paymentMethod: 'Credit Card',
        subscriptionId: 'sub_1234567890',
        amount: 45000,
        currency: 'USD',
        status: 'active',
        plan: 'Enterprise',
        features: ['*'],
        invoices: [
          {
            id: 'inv_001',
            number: 'INV-2024-001',
            date: '2024-01-15T00:00:00Z',
            dueDate: '2024-02-15T00:00:00Z',
            amount: 45000,
            status: 'paid',
            items: [
              {
                description: 'Enterprise Plan - Annual',
                quantity: 1,
                unitPrice: 45000,
                total: 45000,
              },
            ],
            paymentMethod: 'Credit Card',
            paidAt: '2024-01-15T10:30:00Z',
          },
        ],
        usage: {
          users: 1250,
          storage: 2.5,
          apiCalls: 45000,
          overages: 0,
        },
        limits: {
          maxUsers: 2000,
          maxStorage: 1000,
          maxApiCalls: 100000,
        },
      },
      {
        id: 2,
        companyId: 2,
        companyName: 'Swift Transport Ltd',
        billingCycle: 'monthly',
        nextBillingDate: '2024-02-15T00:00:00Z',
        paymentMethod: 'Bank Transfer',
        subscriptionId: 'sub_2345678901',
        amount: 28500,
        currency: 'USD',
        status: 'active',
        plan: 'Professional',
        features: ['basic_access', 'analytics', 'api_access'],
        invoices: [
          {
            id: 'inv_002',
            number: 'INV-2024-002',
            date: '2024-01-15T00:00:00Z',
            dueDate: '2024-02-15T00:00:00Z',
            amount: 28500,
            status: 'paid',
            items: [
              {
                description: 'Professional Plan - Monthly',
                quantity: 1,
                unitPrice: 28500,
                total: 28500,
              },
            ],
            paymentMethod: 'Bank Transfer',
            paidAt: '2024-01-15T09:15:00Z',
          },
        ],
        usage: {
          users: 890,
          storage: 1.2,
          apiCalls: 25000,
          overages: 0,
        },
        limits: {
          maxUsers: 1000,
          maxStorage: 500,
          maxApiCalls: 50000,
        },
      },
      {
        id: 3,
        companyId: 3,
        companyName: 'Metro Freight Inc',
        billingCycle: 'monthly',
        nextBillingDate: '2024-02-15T00:00:00Z',
        paymentMethod: 'Credit Card',
        subscriptionId: 'sub_3456789012',
        amount: 15200,
        currency: 'USD',
        status: 'active',
        plan: 'Standard',
        features: ['basic_access', 'analytics'],
        invoices: [
          {
            id: 'inv_003',
            number: 'INV-2024-003',
            date: '2024-01-15T00:00:00Z',
            dueDate: '2024-02-15T00:00:00Z',
            amount: 15200,
            status: 'paid',
            items: [
              {
                description: 'Standard Plan - Monthly',
                quantity: 1,
                unitPrice: 15200,
                total: 15200,
              },
            ],
            paymentMethod: 'Credit Card',
            paidAt: '2024-01-15T08:45:00Z',
          },
        ],
        usage: {
          users: 456,
          storage: 0.8,
          apiCalls: 12000,
          overages: 0,
        },
        limits: {
          maxUsers: 500,
          maxStorage: 100,
          maxApiCalls: 10000,
        },
      },
      {
        id: 4,
        companyId: 4,
        companyName: 'Coastal Shipping Co',
        billingCycle: 'monthly',
        nextBillingDate: '2024-02-14T00:00:00Z',
        paymentMethod: 'Trial',
        subscriptionId: 'sub_4567890123',
        amount: 0,
        currency: 'USD',
        status: 'trial',
        plan: 'Basic',
        features: ['basic_access'],
        invoices: [],
        usage: {
          users: 234,
          storage: 0.2,
          apiCalls: 2000,
          overages: 0,
        },
        limits: {
          maxUsers: 50,
          maxStorage: 10,
          maxApiCalls: 1000,
        },
      },
    ];

    setBillingInfo(mockBillingInfo);
    setFilteredBilling(mockBillingInfo);
  }, []);

  // Filter and search billing info
  useEffect(() => {
    let filtered = billingInfo;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        billing =>
          billing.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          billing.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          billing.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(billing => billing.status === statusFilter);
    }

    // Plan filter
    if (planFilter !== 'all') {
      filtered = filtered.filter(billing => billing.plan === planFilter);
    }

    // Sort by company name
    filtered.sort((a, b) => {
      return a.companyName.toLowerCase().localeCompare(b.companyName.toLowerCase());
    });

    setFilteredBilling(filtered);
  }, [billingInfo, searchQuery, statusFilter, planFilter]);

  const handleCreateBilling = async () => {
    setLoading(true);
    try {
      const newBilling: BillingInfo = {
        id: Math.max(...billingInfo.map(b => b.id)) + 1,
        companyId: formData.companyId,
        companyName: companies.find(c => c.id === formData.companyId)?.name || '',
        billingCycle: formData.billingCycle as 'monthly' | 'yearly',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: formData.paymentMethod,
        subscriptionId: `sub_${Date.now()}`,
        amount: formData.amount,
        currency: formData.currency,
        status: formData.status as 'active' | 'suspended' | 'trial' | 'cancelled',
        plan: formData.plan,
        features: formData.features,
        invoices: [],
        usage: {
          users: 0,
          storage: 0,
          apiCalls: 0,
          overages: 0,
        },
        limits: {
          maxUsers: 50,
          maxStorage: 10,
          maxApiCalls: 1000,
        },
      };

      setBillingInfo(prev => [...prev, newBilling]);
      setShowBillingModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating billing info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBilling = async () => {
    if (!editingBilling) return;

    setLoading(true);
    try {
      const updatedBilling: BillingInfo = {
        ...editingBilling,
        companyId: formData.companyId,
        companyName: companies.find(c => c.id === formData.companyId)?.name || '',
        billingCycle: formData.billingCycle as 'monthly' | 'yearly',
        paymentMethod: formData.paymentMethod,
        amount: formData.amount,
        currency: formData.currency,
        status: formData.status as 'active' | 'suspended' | 'trial' | 'cancelled',
        plan: formData.plan,
        features: formData.features,
      };

      setBillingInfo(prev => prev.map(b => (b.id === editingBilling.id ? updatedBilling : b)));
      setEditingBilling(null);
      setShowBillingModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating billing info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBilling = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this billing information?')) {
      setBillingInfo(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (
          window.confirm(`Are you sure you want to delete ${bulkSelected.length} billing records?`)
        ) {
          setBillingInfo(prev => prev.filter(b => !bulkSelected.includes(b.id)));
          setBulkSelected([]);
        }
        break;
      case 'suspend':
        setBillingInfo(prev =>
          prev.map(b =>
            bulkSelected.includes(b.id)
              ? { ...b, status: 'suspended' as 'active' | 'suspended' | 'trial' | 'cancelled' }
              : b
          )
        );
        setBulkSelected([]);
        break;
      case 'activate':
        setBillingInfo(prev =>
          prev.map(b =>
            bulkSelected.includes(b.id)
              ? { ...b, status: 'active' as 'active' | 'suspended' | 'trial' | 'cancelled' }
              : b
          )
        );
        setBulkSelected([]);
        break;
    }
  };

  const resetForm = () => {
    setFormData({
      companyId: 1,
      billingCycle: 'monthly',
      paymentMethod: 'Credit Card',
      amount: 0,
      currency: 'USD',
      status: 'active',
      plan: 'Basic',
      features: [],
    });
  };

  const openEditModal = (billing: BillingInfo) => {
    setEditingBilling(billing);
    setFormData({
      companyId: billing.companyId,
      billingCycle: billing.billingCycle,
      paymentMethod: billing.paymentMethod,
      amount: billing.amount,
      currency: billing.currency,
      status: billing.status,
      plan: billing.plan,
      features: billing.features,
    });
    setShowBillingModal(true);
  };

  const getTotalRevenue = () => {
    return billingInfo.reduce((sum, billing) => sum + billing.amount, 0);
  };

  const getActiveSubscriptions = () => {
    return billingInfo.filter(billing => billing.status === 'active').length;
  };

  const getChurnRate = () => {
    const total = billingInfo.length;
    const cancelled = billingInfo.filter(billing => billing.status === 'cancelled').length;
    return total > 0 ? (cancelled / total) * 100 : 0;
  };

  const getAverageRevenuePerUser = () => {
    const totalRevenue = getTotalRevenue();
    const totalUsers = billingInfo.reduce((sum, billing) => sum + billing.usage.users, 0);
    return totalUsers > 0 ? totalRevenue / totalUsers : 0;
  };

  const BillingModal = () => (
    <AnimatePresence>
      {showBillingModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                  {editingBilling ? 'Edit Billing Information' : 'Add New Billing'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowBillingModal(false);
                    setEditingBilling(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Company</label>
                  <select
                    value={formData.companyId}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, companyId: parseInt(e.target.value) }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Plan</label>
                  <select
                    value={formData.plan}
                    onChange={e => setFormData(prev => ({ ...prev, plan: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    {availablePlans.map(plan => (
                      <option key={plan.id} value={plan.name}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Billing Cycle
                  </label>
                  <select
                    value={formData.billingCycle}
                    onChange={e => setFormData(prev => ({ ...prev, billingCycle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Payment Method
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Trial">Trial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="suspended">Suspended</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <Input
                  label="Amount"
                  type="number"
                  value={formData.amount}
                  onChange={e =>
                    setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))
                  }
                  placeholder="0.00"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={e => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Features</label>
                <div className="grid grid-cols-2 gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {availableFeatures.map(feature => (
                    <label key={feature} className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={e => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              features: [...prev.features, feature],
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              features: prev.features.filter(f => f !== feature),
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 responsive-container sm:flex-col md:flex-row lg:grid"
                      />
                      <span className="text-sm text-gray-700 capitalize responsive-container sm:flex-col md:flex-row lg:grid">
                        {feature.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBillingModal(false);
                  setEditingBilling(null);
                  resetForm();
                }}
              >
                <X className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                Cancel
              </Button>
              <Button
                onClick={editingBilling ? handleUpdateBilling : handleCreateBilling}
                loading={loading}
              >
                <Save className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                {editingBilling ? 'Update Billing' : 'Create Billing'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderOverview = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          {
            title: 'Total Revenue',
            value: formatCurrency(getTotalRevenue()),
            change: '+15.7% vs last month',
            icon: DollarSign,
            color: 'text-green-500',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Active Subscriptions',
            value: formatNumber(getActiveSubscriptions()),
            change: '+8.3% vs last month',
            icon: CreditCard,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Churn Rate',
            value: formatPercentage(getChurnRate()),
            change: '-0.3% vs last month',
            icon: TrendingDown,
            color: 'text-red-500',
            bgColor: 'bg-red-50',
          },
          {
            title: 'ARPU',
            value: formatCurrency(getAverageRevenuePerUser()),
            change: '+12.5% vs last month',
            icon: Users,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50',
          },
        ].map(stat => (
          <Card key={stat.title}>
            <CardContent className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-green-600 text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{stat.change}</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{stat.value}</div>
              <div className="text-gray-600 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly recurring revenue and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
              <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Revenue analytics chart</p>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Interactive revenue trends and projections</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plan Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Subscription plans breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Plan distribution chart</p>
                <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Visual breakdown of subscription plans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Payment method distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Payment methods chart</p>
                <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Distribution of payment methods</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex flex-col lg:flex-row gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <Input
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
              />
            </div>
            <div className="flex gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="trial">Trial</option>
                <option value="suspended">Suspended</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={planFilter}
                onChange={e => setPlanFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="all">All Plans</option>
                {availablePlans.map(plan => (
                  <option key={plan.id} value={plan.name}>
                    {plan.name}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <Card>
          <CardContent className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                {bulkSelected.length} subscriptions selected
              </span>
              <div className="flex gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('activate')}>
                  <CheckCircle className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Activate
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('suspend')}>
                  <AlertTriangle className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Suspend
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscriptions Table */}
      <Card>
        <CardContent className="p-0 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
            <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
              <thead className="bg-gray-50 border-b responsive-container sm:flex-col md:flex-row lg:grid">
                <tr>
                  <th className="px-6 py-4 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                    <input
                      type="checkbox"
                      checked={
                        bulkSelected.length === filteredBilling.length && filteredBilling.length > 0
                      }
                      onChange={e => {
                        if (e.target.checked) {
                          setBulkSelected(filteredBilling.map(b => b.id));
                        } else {
                          setBulkSelected([]);
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Next Billing
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                {filteredBilling.map(billing => (
                  <tr key={billing.id} className="hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(billing.id)}
                        onChange={e => {
                          if (e.target.checked) {
                            setBulkSelected(prev => [...prev, billing.id]);
                          } else {
                            setBulkSelected(prev => prev.filter(id => id !== billing.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 responsive-container sm:flex-col md:flex-row lg:grid"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                          <Building2 className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                            {billing.companyName}
                          </div>
                          <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{billing.subscriptionId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          billing.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-800'
                            : billing.plan === 'Professional'
                              ? 'bg-blue-100 text-blue-800'
                              : billing.plan === 'Standard'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {billing.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(billing.status)}`}
                      >
                        {getStatusIcon(billing.status)}
                        {billing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      {formatCurrency(billing.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      {formatRelativeTime(billing.nextBillingDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                      {billing.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => openEditModal(billing)}>
                          <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteBilling(billing.id)}
                        >
                          <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
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
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Billing & Subscriptions</h2>
          <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Manage revenue, subscriptions, and payment processing</p>
        </div>
        <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            Import
          </Button>
          <Button onClick={() => setShowBillingModal(true)}>
            <Plus className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            Add Subscription
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
                { id: 'invoices', label: 'Invoices', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() = aria-label="Button"> setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
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
          {activeTab === 'subscriptions' && renderSubscriptions()}
          {activeTab === 'invoices' && (
            <div className="text-center py-12 responsive-container sm:flex-col md:flex-row lg:grid">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Invoice Management</h3>
              <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Invoice management system coming soon</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="text-center py-12 responsive-container sm:flex-col md:flex-row lg:grid">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Billing Analytics</h3>
              <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Advanced billing analytics coming soon</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      <BillingModal />
    </div>
  );
};

export default BillingManagement;
