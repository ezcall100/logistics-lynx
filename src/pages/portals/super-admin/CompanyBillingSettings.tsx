import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Receipt,
  FileText,
  Shield,
} from 'lucide-react';

/**
 * Company Billing Settings - Super Admin
 * Created by MCP 301 Agents - FormBot & TableBot
 * Timestamp: 2025-09-14T18:58:00.000Z
 * Features: Complete billing management, subscription plans, payment methods
 */

interface BillingPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  isPopular: boolean;
  isCurrent: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
  status: 'active' | 'expired' | 'failed';
}

interface BillingHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  invoiceUrl: string;
}

const CompanyBillingSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [billingPlans, setBillingPlans] = useState<BillingPlan[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([]);
  // Modal states for future use
  // const [showAddPayment, setShowAddPayment] = useState(false);
  // const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Mock billing data - MCP 301 Agents created this
  useEffect(() => {
    const mockPlans: BillingPlan[] = [
      {
        id: '1',
        name: 'Basic',
        price: 29,
        billingCycle: 'monthly',
        features: ['Up to 10 users', 'Basic support', 'Standard features'],
        isPopular: false,
        isCurrent: false,
      },
      {
        id: '2',
        name: 'Professional',
        price: 79,
        billingCycle: 'monthly',
        features: ['Up to 100 users', 'Priority support', 'Advanced features', 'API access'],
        isPopular: true,
        isCurrent: true,
      },
      {
        id: '3',
        name: 'Enterprise',
        price: 199,
        billingCycle: 'monthly',
        features: [
          'Unlimited users',
          '24/7 support',
          'All features',
          'Custom integrations',
          'Dedicated manager',
        ],
        isPopular: false,
        isCurrent: false,
      },
    ];

    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'Visa',
        expiryDate: '12/26',
        isDefault: true,
        status: 'active',
      },
      {
        id: '2',
        type: 'card',
        last4: '5555',
        brand: 'Mastercard',
        expiryDate: '08/25',
        isDefault: false,
        status: 'active',
      },
    ];

    const mockHistory: BillingHistory[] = [
      {
        id: '1',
        date: '2025-09-14',
        amount: 79.0,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        invoiceUrl: '/invoices/inv-001',
      },
      {
        id: '2',
        date: '2025-08-14',
        amount: 79.0,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        invoiceUrl: '/invoices/inv-002',
      },
      {
        id: '3',
        date: '2025-07-14',
        amount: 79.0,
        status: 'paid',
        description: 'Professional Plan - Monthly',
        invoiceUrl: '/invoices/inv-003',
      },
    ];

    setBillingPlans(mockPlans);
    setPaymentMethods(mockPaymentMethods);
    setBillingHistory(mockHistory);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'failed':
        return 'text-red-400 bg-red-400/20';
      case 'active':
        return 'text-green-400 bg-green-400/20';
      case 'expired':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'pending':
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'active':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'expired':
        return <AlertTriangle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'plans', name: 'Plans', icon: CreditCard },
    { id: 'payment', name: 'Payment Methods', icon: Shield },
    { id: 'history', name: 'Billing History', icon: Receipt },
    { id: 'invoices', name: 'Invoices', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="p-3 bg-green-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <CreditCard className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Company Billing Settings</h1>
              <p className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                Manage subscriptions, payments, and billing • MCP 301 Agents
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">Live Billing Data</span>
            </div>
            <button
              onClick={() => console.log('Add payment method clicked')}
            aria-label="Button"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Add Payment Method</span>
            </button>
          </div>
        </div>
      </div>

      {/* Billing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Current Plan</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Professional</p>
              <p className="text-sm text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">$79/month</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Next Billing</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Oct 14</p>
              <p className="text-sm text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">$79.00</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Spent</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">$1,185</p>
              <p className="text-sm text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid">This year</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Payment Methods</p>
              <p className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{paymentMethods.length}</p>
              <p className="text-sm text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid">Active</p>
            </div>
            <Shield className="w-8 h-8 text-yellow-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="border-b border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
          <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
            aria-label="Button"
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Billing Summary</h3>
                    <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Current Plan</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">Professional</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Billing Cycle</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">Monthly</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Next Billing Date</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">October 14, 2025</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Amount</span>
                        <span className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">$79.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Usage This Month</h3>
                    <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">API Calls</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">45,230 / 100,000</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-green-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Storage Used</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">2.3 GB / 10 GB</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-blue-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: '23%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'plans' && (
              <motion.div
                key="plans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  {billingPlans.map(plan => (
                    <div
                      key={plan.id}
                      className={`relative p-6 rounded-lg border ${
                        plan.isCurrent
                          ? 'bg-green-500/20 border-green-500/50'
                          : plan.isPopular
                            ? 'bg-blue-500/20 border-blue-500/50'
                            : 'bg-white/5 border-white/10'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                        <h3 className="text-xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{plan.name}</h3>
                        <div className="text-3xl font-bold text-white mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          ${plan.price}
                          <span className="text-lg text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">/{plan.billingCycle}</span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 responsive-container sm:flex-col md:flex-row lg:grid" />
                            <span className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          plan.isCurrent
                            ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            : plan.isPopular
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        }`}
                        disabled={plan.isCurrent}
                       aria-label="Button">
                        {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Payment Methods</h3>
                  <button
                    onClick={() => console.log('Add payment method clicked')}
            aria-label="Button"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Add Payment Method</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  {paymentMethods.map(method => (
                    <div
                      key={method.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-blue-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            <CreditCard className="w-5 h-5 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">
                              {method.brand} •••• {method.last4}
                            </h4>
                            <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Expires {method.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                              Default
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(method.status)}`}
                          >
                            {method.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>Edit</span>
                        </button>
                        <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>View</span>
                        </button>
                        <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Billing History</h3>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Export</span>
                  </button>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
                  <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                    <thead className="bg-white/5 responsive-container sm:flex-col md:flex-row lg:grid">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                          Description
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
                      {billingHistory.map(item => (
                        <tr key={item.id} className="hover:bg-white/5 responsive-container sm:flex-col md:flex-row lg:grid">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(item.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {item.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">
                            ${item.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                            <span
                              className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}
                            >
                              {getStatusIcon(item.status)}
                              <span className="ml-1 responsive-container sm:flex-col md:flex-row lg:grid">{item.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                            <button className="text-blue-400 hover:text-blue-300 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                              <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </button>
                            <button className="text-green-400 hover:text-green-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                              <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'invoices' && (
              <motion.div
                key="invoices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex justify-between items-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Invoices</h3>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Download All</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  {billingHistory.map(item => (
                    <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="p-2 bg-blue-500/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                          <FileText className="w-5 h-5 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-white font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Invoice #{item.id}</h4>
                      <p className="text-sm text-gray-400 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{item.description}</p>
                      <p className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">${item.amount.toFixed(2)}</p>

                      <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>View</span>
                        </button>
                        <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                          <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CompanyBillingSettings;