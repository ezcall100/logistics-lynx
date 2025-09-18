import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Mail,
  CreditCard as CardIcon,
  PieChart,
  BarChart3,
  Activity,
  Target,
} from 'lucide-react';

/**
 * Billing Management Page - Redesigned
 * Comprehensive billing and subscription management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:25:00.000Z
 */

interface BillingMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  format: 'currency' | 'number' | 'percentage';
}

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  amount: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly' | 'lifetime';
  startDate: string;
  endDate: string;
  nextBillingDate: string;
  paymentMethod: string;
  autoRenew: boolean;
  features: string[];
  usage: {
    current: number;
    limit: number;
    unit: string;
  };
}

interface Invoice {
  id: string;
  subscriptionId: string;
  userId: string;
  userName: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentMethod: string;
  invoiceUrl: string;
}

interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank' | 'paypal' | 'crypto';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  status: 'active' | 'expired' | 'failed';
  createdAt: string;
}

export const BillingManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    'overview' | 'subscriptions' | 'invoices' | 'payments'
  >('overview');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  // const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock billing metrics
  const billingMetrics: BillingMetric[] = [
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: 125430,
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: DollarSign,
      color: 'bg-green-500',
      format: 'currency',
    },
    {
      id: 'active-subscriptions',
      title: 'Active Subscriptions',
      value: 892,
      change: 8.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: Users,
      color: 'bg-blue-500',
      format: 'number',
    },
    {
      id: 'mrr',
      title: 'Monthly Recurring Revenue',
      value: 45670,
      change: 15.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: TrendingUp,
      color: 'bg-purple-500',
      format: 'currency',
    },
    {
      id: 'churn-rate',
      title: 'Churn Rate',
      value: 3.2,
      change: -0.8,
      changeType: 'decrease',
      period: 'vs last month',
      icon: TrendingDown,
      color: 'bg-red-500',
      format: 'percentage',
    },
    {
      id: 'avg-revenue',
      title: 'Avg Revenue Per User',
      value: 140.5,
      change: 5.7,
      changeType: 'increase',
      period: 'vs last month',
      icon: Target,
      color: 'bg-yellow-500',
      format: 'currency',
    },
    {
      id: 'payment-success',
      title: 'Payment Success Rate',
      value: 98.7,
      change: 0.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: CheckCircle,
      color: 'bg-indigo-500',
      format: 'percentage',
    },
  ];

  // Mock data
  useEffect(() => {
    const mockSubscriptions: Subscription[] = Array.from({ length: 50 }, (_, i) => ({
      id: `sub_${i + 1}`,
      userId: `user_${i + 1}`,
      userName: `User ${i + 1}`,
      userEmail: `user${i + 1}@demo-company.com`,
      plan: ['Enterprise', 'Professional', 'Basic', 'Free'][Math.floor(Math.random() * 4)],
      status: ['active', 'cancelled', 'expired', 'pending'][Math.floor(Math.random() * 4)] as
        | 'active'
        | 'cancelled'
        | 'expired'
        | 'pending',
      amount: [299, 99, 29, 0][Math.floor(Math.random() * 4)],
      currency: 'USD',
      billingCycle: ['monthly', 'yearly', 'lifetime'][Math.floor(Math.random() * 3)] as
        | 'monthly'
        | 'yearly'
        | 'lifetime',
      startDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      nextBillingDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      paymentMethod: ['Visa ****1234', 'Mastercard ****5678', 'PayPal', 'Bank Transfer'][
        Math.floor(Math.random() * 4)
      ],
      autoRenew: Math.random() > 0.3,
      features: ['Unlimited Users', 'Advanced Analytics', 'Priority Support', 'API Access'].slice(
        0,
        Math.floor(Math.random() * 4) + 1
      ),
      usage: {
        current: Math.floor(Math.random() * 1000),
        limit: 1000,
        unit: 'API calls',
      },
    }));

    const mockInvoices: Invoice[] = Array.from({ length: 100 }, (_, i) => ({
      id: `inv_${i + 1}`,
      subscriptionId: `sub_${Math.floor(Math.random() * 50) + 1}`,
      userId: `user_${Math.floor(Math.random() * 50) + 1}`,
      userName: `User ${Math.floor(Math.random() * 50) + 1}`,
      amount: [299, 99, 29, 0][Math.floor(Math.random() * 4)],
      currency: 'USD',
      status: ['paid', 'pending', 'failed', 'refunded'][Math.floor(Math.random() * 4)] as
        | 'paid'
        | 'pending'
        | 'failed'
        | 'refunded',
      issueDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      paidDate:
        Math.random() > 0.3
          ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      items: [
        {
          description: 'Monthly Subscription',
          quantity: 1,
          unitPrice: [299, 99, 29, 0][Math.floor(Math.random() * 4)],
          total: [299, 99, 29, 0][Math.floor(Math.random() * 4)],
        },
      ],
      paymentMethod: ['Visa ****1234', 'Mastercard ****5678', 'PayPal', 'Bank Transfer'][
        Math.floor(Math.random() * 4)
      ],
      invoiceUrl: `https://billing.demo.com/invoices/inv_${i + 1}`,
    }));

    const mockPaymentMethods: PaymentMethod[] = Array.from({ length: 30 }, (_, i) => ({
      id: `pm_${i + 1}`,
      userId: `user_${Math.floor(Math.random() * 50) + 1}`,
      type: ['card', 'bank', 'paypal', 'crypto'][Math.floor(Math.random() * 4)] as
        | 'card'
        | 'bank'
        | 'paypal'
        | 'crypto',
      last4: String(Math.floor(Math.random() * 9000) + 1000),
      brand: ['Visa', 'Mastercard', 'American Express', 'Discover'][Math.floor(Math.random() * 4)],
      expiryMonth: Math.floor(Math.random() * 12) + 1,
      expiryYear: new Date().getFullYear() + Math.floor(Math.random() * 5),
      isDefault: Math.random() > 0.7,
      status: ['active', 'expired', 'failed'][Math.floor(Math.random() * 3)] as
        | 'active'
        | 'expired'
        | 'failed',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    setSubscriptions(mockSubscriptions);
    setInvoices(mockInvoices);
    setPaymentMethods(mockPaymentMethods);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'refunded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return <CheckCircle className="w-4 h-4 responsive-container" />;
      case 'pending':
        return <Clock className="w-4 h-4 responsive-container" />;
      case 'cancelled':
      case 'failed':
        return <XCircle className="w-4 h-4 responsive-container" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 responsive-container" />;
      case 'refunded':
        return <RefreshCw className="w-4 h-4 responsive-container" />;
      default:
        return <Clock className="w-4 h-4 responsive-container" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Professional':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Basic':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Free':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch =
      subscription.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.plan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch =
      invoice.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'subscriptions', label: 'Subscriptions', icon: Users, count: subscriptions.length },
    { id: 'invoices', label: 'Invoices', icon: Receipt, count: invoices.length },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard, count: paymentMethods.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        {/* Header */}
        <div className="mb-8 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 responsive-container">
                Billing Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 responsive-container">
                Manage subscriptions, invoices, and payment processing across your platform
              </p>
            </div>
            <div className="flex items-center space-x-3 responsive-container">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 responsive-container" aria-label="Button">
                <RefreshCw className="w-4 h-4 responsive-container" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 responsive-container" aria-label="Button">
                <Download className="w-4 h-4 responsive-container" />
                <span>Export</span>
              </button>
              <button
                onClick={() => console.log('Create modal clicked')}
            aria-label="Button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 responsive-container"
              >
                <Plus className="w-4 h-4 responsive-container" />
                <span>Add Subscription</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 responsive-container">
          <div className="border-b border-gray-200 dark:border-slate-700 responsive-container">
            <nav className="-mb-px flex space-x-8 responsive-container">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(
                        tab.id as 'overview' | 'subscriptions' | 'invoices' | 'payments'
                      )
                    }
            aria-label="Button"
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 responsive-container" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs responsive-container">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 responsive-container">
          <div className="flex flex-col lg:flex-row gap-4 responsive-container">
            <div className="relative flex-1 responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search subscriptions, invoices, or users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm responsive-container"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 responsive-container"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8 responsive-container">
              {billingMetrics.map(metric => {
                const Icon = metric.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow responsive-container"
                  >
                    <div className="flex items-center justify-between mb-4 responsive-container">
                      <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                        <Icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="flex items-center space-x-1 responsive-container">
                        {metric.changeType === 'increase' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500 responsive-container" />
                        ) : metric.changeType === 'decrease' ? (
                          <ArrowDownRight className="w-4 h-4 text-red-500 responsive-container" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-500 responsive-container" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            metric.changeType === 'increase'
                              ? 'text-green-600 dark:text-green-400'
                              : metric.changeType === 'decrease'
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 responsive-container">
                      {formatValue(metric.value, metric.format)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">{metric.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 responsive-container">
                      {metric.period}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Charts and Additional Overview Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container">
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container">
                  Revenue Trends
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 responsive-container">
                  <div className="text-center responsive-container">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2 responsive-container" />
                    <p>Revenue chart will be displayed here</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container">
                  Subscription Distribution
                </h3>
                <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 responsive-container">
                  <div className="text-center responsive-container">
                    <PieChart className="w-12 h-12 mx-auto mb-2 responsive-container" />
                    <p>Subscription distribution chart will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'subscriptions' && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden responsive-container">
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
                <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Next Billing
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                  {filteredSubscriptions.slice(0, 20).map(subscription => (
                    <motion.tr
                      key={subscription.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                    >
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                            {subscription.userName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                            {subscription.userEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(subscription.plan)}`}
                        >
                          {subscription.plan}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 responsive-container">
                          {subscription.billingCycle}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                          ${subscription.amount}/
                          {subscription.billingCycle === 'yearly' ? 'year' : 'month'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                          {subscription.currency}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}
                        >
                          {getStatusIcon(subscription.status)}
                          <span className="ml-1 capitalize responsive-container">{subscription.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {new Date(subscription.nextBillingDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                          {subscription.autoRenew ? 'Auto-renew' : 'Manual'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {subscription.usage.current}/{subscription.usage.limit}{' '}
                          {subscription.usage.unit}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1 responsive-container">
                          <div
                            className="bg-blue-600 h-2 rounded-full responsive-container"
                            style={{
                              width: `${(subscription.usage.current / subscription.usage.limit) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                            title="View"
                           aria-label="Button">
                            <Eye className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Edit"
                           aria-label="Button">
                            <Edit className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Invoice"
                           aria-label="Button">
                            <Receipt className="w-4 h-4 responsive-container" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'invoices' && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden responsive-container">
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
                <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Issue Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                  {filteredInvoices.slice(0, 20).map(invoice => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                    >
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                          {invoice.id}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                          {invoice.subscriptionId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                          {invoice.userName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                          {invoice.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                          ${invoice.amount} {invoice.currency}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                          {invoice.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                        >
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1 capitalize responsive-container">{invoice.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </div>
                        {invoice.paidDate && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                            Paid: {new Date(invoice.paidDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                            title="View"
                           aria-label="Button">
                            <Eye className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Download"
                           aria-label="Button">
                            <Download className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Send"
                           aria-label="Button">
                            <Mail className="w-4 h-4 responsive-container" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'payments' && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden responsive-container">
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
                <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Expiry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                  {paymentMethods.slice(0, 20).map(payment => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                    >
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                          {payment.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <CardIcon className="w-4 h-4 text-gray-400 responsive-container" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                              {payment.brand} ****{payment.last4}
                            </div>
                            {payment.isDefault && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 responsive-container">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span className="text-sm text-gray-900 dark:text-white capitalize responsive-container">
                          {payment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                        >
                          {getStatusIcon(payment.status)}
                          <span className="ml-1 capitalize responsive-container">{payment.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {payment.expiryMonth}/{payment.expiryYear}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <button
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                            title="View"
                           aria-label="Button">
                            <Eye className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Edit"
                           aria-label="Button">
                            <Edit className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 responsive-container"
                            title="Delete"
                           aria-label="Button">
                            <Trash2 className="w-4 h-4 responsive-container" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingManagement;
}