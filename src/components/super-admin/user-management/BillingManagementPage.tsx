import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Building,
  PieChart,
  BarChart3,
  Activity,
  XCircle,
} from 'lucide-react';

/**
 * Billing Management Page - Financial Overview & Payment Tracking
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T18:10:00.000Z
 */

interface BillingInfo {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  dueDate: string;
  paymentMethod: string;
  lastPayment: string;
  nextBilling: string;
  usage: {
    current: number;
    limit: number;
    unit: string;
  };
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'success' | 'failed' | 'pending';
  description: string;
  transactionId: string;
}

interface SubscriptionMetrics {
  totalRevenue: number;
  monthlyRecurring: number;
  churnRate: number;
  growthRate: number;
  activeSubscriptions: number;
  pendingPayments: number;
  overdueAmount: number;
  averageRevenuePerUser: number;
}

export const BillingManagementPage: React.FC = () => {
  const [billingData, setBillingData] = useState<BillingInfo[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [metrics, setMetrics] = useState<SubscriptionMetrics | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'billing' | 'payments'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockBillingData: BillingInfo[] = [
      {
        id: '1',
        customer: 'Acme Corporation',
        email: 'billing@acme.com',
        plan: 'Enterprise',
        amount: 2999.00,
        status: 'paid',
        dueDate: '2025-10-01',
        paymentMethod: 'Credit Card',
        lastPayment: '2025-09-01',
        nextBilling: '2025-10-01',
        usage: { current: 850, limit: 1000, unit: 'users' },
      },
      {
        id: '2',
        customer: 'TechStart Inc',
        email: 'admin@techstart.com',
        plan: 'Professional',
        amount: 499.00,
        status: 'pending',
        dueDate: '2025-09-15',
        paymentMethod: 'Bank Transfer',
        lastPayment: '2025-08-15',
        nextBilling: '2025-09-15',
        usage: { current: 45, limit: 50, unit: 'users' },
      },
      {
        id: '3',
        customer: 'Global Solutions',
        email: 'finance@globalsolutions.com',
        plan: 'Basic',
        amount: 99.00,
        status: 'overdue',
        dueDate: '2025-09-01',
        paymentMethod: 'Credit Card',
        lastPayment: '2025-08-01',
        nextBilling: '2025-10-01',
        usage: { current: 8, limit: 10, unit: 'users' },
      },
    ];

    const mockPaymentHistory: PaymentHistory[] = [
      {
        id: '1',
        date: '2025-09-14',
        amount: 2999.00,
        method: 'Credit Card',
        status: 'success',
        description: 'Monthly subscription - Acme Corporation',
        transactionId: 'TXN-2025-0914-001',
      },
      {
        id: '2',
        date: '2025-09-13',
        amount: 499.00,
        method: 'Bank Transfer',
        status: 'pending',
        description: 'Monthly subscription - TechStart Inc',
        transactionId: 'TXN-2025-0913-002',
      },
      {
        id: '3',
        date: '2025-09-12',
        amount: 99.00,
        method: 'Credit Card',
        status: 'failed',
        description: 'Monthly subscription - Global Solutions',
        transactionId: 'TXN-2025-0912-003',
      },
    ];

    const mockMetrics: SubscriptionMetrics = {
      totalRevenue: 125000,
      monthlyRecurring: 45000,
      churnRate: 2.5,
      growthRate: 15.8,
      activeSubscriptions: 1250,
      pendingPayments: 25,
      overdueAmount: 5500,
      averageRevenuePerUser: 100,
    };

    setBillingData(mockBillingData);
    setPaymentHistory(mockPaymentHistory);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 responsive-container" />;
      case 'pending':
        return <Clock className="w-4 h-4 responsive-container" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 responsive-container" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 responsive-container" />;
      default:
        return <Clock className="w-4 h-4 responsive-container" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const tabs: Array<{ id: 'overview' | 'billing' | 'payments'; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'payments', label: 'Payments', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-6 py-8 responsive-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 responsive-container">
          <div className="flex-1 responsive-container">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 responsive-container">Billing Management</h1>
            <p className="text-slate-600 dark:text-slate-400 responsive-container">Financial overview and payment tracking</p>
          </div>
          
          <div className="flex gap-3 responsive-container">
            <div className="relative responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl responsive-container"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Filter className="w-4 h-4 responsive-container" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Download className="w-4 h-4 responsive-container" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 responsive-container" aria-label="Button">
              <Plus className="w-4 h-4 responsive-container" />
              <span>Add Invoice</span>
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  ${metrics?.totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1 responsive-container">
                  <TrendingUp className="w-4 h-4 mr-1 responsive-container" />+{metrics?.growthRate}% this month
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">MRR</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  ${metrics?.monthlyRecurring.toLocaleString()}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1 responsive-container">
                  <Activity className="w-4 h-4 mr-1 responsive-container" />
                  Monthly recurring
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Active Subscriptions</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  {metrics?.activeSubscriptions.toLocaleString()}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center mt-1 responsive-container">
                  <Users className="w-4 h-4 mr-1 responsive-container" />
                  {metrics?.churnRate}% churn rate
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400 responsive-container" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl responsive-container"
          >
            <div className="flex items-center justify-between responsive-container">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Overdue Amount</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white responsive-container">
                  ${metrics?.overdueAmount.toLocaleString()}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1 responsive-container">
                  <AlertCircle className="w-4 h-4 mr-1 responsive-container" />
                  {metrics?.pendingPayments} pending
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg responsive-container">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 responsive-container" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8 responsive-container">
          <div className="flex border-b border-slate-200 dark:border-slate-700 responsive-container">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
            aria-label="Button"
                className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4 responsive-container" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 responsive-container">
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container">
                {/* Revenue Chart Placeholder */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">Revenue Trend</h3>
                  <div className="h-64 flex items-center justify-center responsive-container">
                    <div className="text-center responsive-container">
                      <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4 responsive-container" />
                      <p className="text-slate-500 dark:text-slate-400 responsive-container">Revenue chart visualization</p>
                    </div>
                  </div>
                </div>

                {/* Subscription Distribution */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 responsive-container">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 responsive-container">Subscription Distribution</h3>
                  <div className="space-y-4 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Enterprise</span>
                      <div className="flex items-center space-x-2 responsive-container">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                          <div className="h-2 rounded-full bg-blue-500 responsive-container" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between responsive-container">
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Professional</span>
                      <div className="flex items-center space-x-2 responsive-container">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                          <div className="h-2 rounded-full bg-green-500 responsive-container" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between responsive-container">
                      <span className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Basic</span>
                      <div className="flex items-center space-x-2 responsive-container">
                        <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 responsive-container">
                          <div className="h-2 rounded-full bg-purple-500 responsive-container" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white responsive-container">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'billing' && (
              <div className="space-y-4 responsive-container">
                {billingData.map((billing, index) => (
                  <motion.div
                    key={billing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
                  >
                    <div className="flex items-center justify-between responsive-container">
                      <div className="flex items-center space-x-4 responsive-container">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container">
                          <Building className="w-6 h-6 text-blue-600 dark:text-blue-400 responsive-container" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white responsive-container">{billing.customer}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">{billing.email}</p>
                          <div className="flex items-center space-x-4 mt-2 responsive-container">
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded responsive-container">
                              {billing.plan}
                            </span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                              {billing.paymentMethod}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                              Usage: {billing.usage.current}/{billing.usage.limit} {billing.usage.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right responsive-container">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">
                          ${billing.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-2 mt-2 responsive-container">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(billing.status)}`}>
                            {getStatusIcon(billing.status)}
                            <span className="ml-1 capitalize responsive-container">{billing.status}</span>
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 responsive-container">
                          Due: {new Date(billing.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'payments' && (
              <div className="space-y-4 responsive-container">
                {paymentHistory.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 responsive-container"
                  >
                    <div className="flex items-center justify-between responsive-container">
                      <div className="flex items-center space-x-4 responsive-container">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg responsive-container">
                          <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400 responsive-container" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white responsive-container">{payment.description}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                            Transaction ID: {payment.transactionId}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 responsive-container">
                            <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded responsive-container">
                              {payment.method}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                              {new Date(payment.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right responsive-container">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white responsive-container">
                          ${payment.amount.toLocaleString()}
                        </div>
                        <div className="flex items-center space-x-2 mt-2 responsive-container">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1 capitalize responsive-container">{payment.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingManagementPage;
}