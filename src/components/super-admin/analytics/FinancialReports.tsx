import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  CreditCard,
  Banknote,
  Calculator,
  Download,
  Search,
  RefreshCw,
} from 'lucide-react';

/**
 * Financial Reports - Advanced Financial Intelligence Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface FinancialMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  period: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  category: 'revenue' | 'expense' | 'profit' | 'cashflow';
}

interface RevenueData {
  period: string;
  revenue: number;
  growth: number;
  recurring: number;
  oneTime: number;
  subscriptions: number;
  services: number;
}

interface ExpenseData {
  category: string;
  amount: number;
  percentage: number;
  budget: number;
  variance: number;
  trend: 'up' | 'down' | 'stable';
}

interface ProfitabilityData {
  period: string;
  revenue: number;
  expenses: number;
  grossProfit: number;
  netProfit: number;
  margin: number;
  ebitda: number;
}

interface CashFlowData {
  period: string;
  operating: number;
  investing: number;
  financing: number;
  netCashFlow: number;
  cashBalance: number;
}

export const FinancialReports: React.FC = () => {
  const [metrics, setMetrics] = useState<FinancialMetric[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseData[]>([]);
  const [profitabilityData, setProfitabilityData] = useState<ProfitabilityData[]>([]);
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'revenue' | 'expenses' | 'profitability' | 'cashflow'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockMetrics: FinancialMetric[] = [
      {
        name: 'Total Revenue',
        value: 2847592,
        unit: '$',
        trend: 'up',
        change: 12.5,
        period: 'vs last month',
        status: 'excellent',
        category: 'revenue',
      },
      {
        name: 'Total Expenses',
        value: 1892341,
        unit: '$',
        trend: 'up',
        change: 8.3,
        period: 'vs last month',
        status: 'good',
        category: 'expense',
      },
      {
        name: 'Net Profit',
        value: 955251,
        unit: '$',
        trend: 'up',
        change: 18.7,
        period: 'vs last month',
        status: 'excellent',
        category: 'profit',
      },
      {
        name: 'Gross Margin',
        value: 67.8,
        unit: '%',
        trend: 'up',
        change: 2.1,
        period: 'vs last month',
        status: 'excellent',
        category: 'profit',
      },
      {
        name: 'Operating Cash Flow',
        value: 1245678,
        unit: '$',
        trend: 'up',
        change: 15.2,
        period: 'vs last month',
        status: 'excellent',
        category: 'cashflow',
      },
      {
        name: 'Cash Balance',
        value: 4567890,
        unit: '$',
        trend: 'up',
        change: 5.8,
        period: 'vs last month',
        status: 'excellent',
        category: 'cashflow',
      },
    ];

    const mockRevenueData: RevenueData[] = [
      { period: 'Jan', revenue: 2100000, growth: 8.5, recurring: 1800000, oneTime: 300000, subscriptions: 1200000, services: 900000 },
      { period: 'Feb', revenue: 2250000, growth: 7.1, recurring: 1950000, oneTime: 300000, subscriptions: 1300000, services: 950000 },
      { period: 'Mar', revenue: 2400000, growth: 6.7, recurring: 2100000, oneTime: 300000, subscriptions: 1400000, services: 1000000 },
      { period: 'Apr', revenue: 2580000, growth: 7.5, recurring: 2280000, oneTime: 300000, subscriptions: 1500000, services: 1080000 },
      { period: 'May', revenue: 2720000, growth: 5.4, recurring: 2420000, oneTime: 300000, subscriptions: 1600000, services: 1120000 },
      { period: 'Jun', revenue: 2847592, growth: 4.7, recurring: 2547592, oneTime: 300000, subscriptions: 1700000, services: 1147592 },
    ];

    const mockExpenseData: ExpenseData[] = [
      { category: 'Personnel', amount: 850000, percentage: 45.0, budget: 800000, variance: 6.25, trend: 'up' },
      { category: 'Technology', amount: 320000, percentage: 16.9, budget: 300000, variance: 6.67, trend: 'up' },
      { category: 'Marketing', amount: 280000, percentage: 14.8, budget: 350000, variance: -20.0, trend: 'down' },
      { category: 'Operations', amount: 180000, percentage: 9.5, budget: 200000, variance: -10.0, trend: 'down' },
      { category: 'Administrative', amount: 120000, percentage: 6.3, budget: 150000, variance: -20.0, trend: 'down' },
      { category: 'Other', amount: 142341, percentage: 7.5, budget: 100000, variance: 42.34, trend: 'up' },
    ];

    const mockProfitabilityData: ProfitabilityData[] = [
      { period: 'Q1', revenue: 6750000, expenses: 4200000, grossProfit: 4550000, netProfit: 2550000, margin: 37.8, ebitda: 3200000 },
      { period: 'Q2', revenue: 8147592, expenses: 5672341, grossProfit: 5475251, netProfit: 2475251, margin: 30.4, ebitda: 3100000 },
      { period: 'Q3', revenue: 9200000, expenses: 6200000, grossProfit: 6200000, netProfit: 3000000, margin: 32.6, ebitda: 3800000 },
      { period: 'Q4', revenue: 10800000, expenses: 7200000, grossProfit: 7200000, netProfit: 3600000, margin: 33.3, ebitda: 4500000 },
    ];

    const mockCashFlowData: CashFlowData[] = [
      { period: 'Jan', operating: 1800000, investing: -200000, financing: 500000, netCashFlow: 2100000, cashBalance: 2100000 },
      { period: 'Feb', operating: 1950000, investing: -150000, financing: 0, netCashFlow: 1800000, cashBalance: 3900000 },
      { period: 'Mar', operating: 2100000, investing: -300000, financing: -100000, netCashFlow: 1700000, cashBalance: 5600000 },
      { period: 'Apr', operating: 2280000, investing: -250000, financing: 200000, netCashFlow: 2230000, cashBalance: 7830000 },
      { period: 'May', operating: 2420000, investing: -180000, financing: -50000, netCashFlow: 2190000, cashBalance: 10020000 },
      { period: 'Jun', operating: 2547592, investing: -220000, financing: 100000, netCashFlow: 2427592, cashBalance: 12447592 },
    ];

    setMetrics(mockMetrics);
    setRevenueData(mockRevenueData);
    setExpenseData(mockExpenseData);
    setProfitabilityData(mockProfitabilityData);
    setCashFlowData(mockCashFlowData);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'revenue':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'expense':
        return <CreditCard className="w-5 h-5 text-red-600" />;
      case 'profit':
        return <Calculator className="w-5 h-5 text-blue-600" />;
      case 'cashflow':
        return <Banknote className="w-5 h-5 text-purple-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // const formatNumber = (value: number) => {
  //   return new Intl.NumberFormat('en-US').format(value);
  // };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'profitability', label: 'Profitability', icon: Calculator },
    { id: 'cashflow', label: 'Cash Flow', icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Financial Reports</h1>
            <p className="text-slate-600 dark:text-slate-400">Advanced financial intelligence and reporting</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search financial data..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value as any)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(metric.category)}
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {metric.unit === '$' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  {getTrendIcon(metric.trend)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{metric.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Financial Overview Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Revenue Trend</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Revenue trend chart</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Expense Breakdown</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Expense breakdown chart</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Monthly Performance</h3>
                      <div className="space-y-4">
                        {revenueData.slice(-3).map((data) => (
                          <div key={data.period} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{data.period}</h4>
                              <span className="text-sm text-green-600 dark:text-green-400">
                                +{data.growth}%
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                              {formatCurrency(data.revenue)}
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>Recurring: {formatCurrency(data.recurring)}</span>
                              <span>One-time: {formatCurrency(data.oneTime)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Expenses</h3>
                      <div className="space-y-4">
                        {expenseData.slice(0, 4).map((expense) => (
                          <div key={expense.category} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{expense.category}</h4>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {expense.percentage}%
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                              {formatCurrency(expense.amount)}
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>Budget: {formatCurrency(expense.budget)}</span>
                              <span className={expense.variance > 0 ? 'text-red-600' : 'text-green-600'}>
                                {expense.variance > 0 ? '+' : ''}{expense.variance}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'revenue' && (
                <motion.div
                  key="revenue"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Revenue Analytics */}
                  <div className="space-y-4">
                    {revenueData.map((data, index) => (
                      <motion.div
                        key={data.period}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{data.period}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Total Revenue: {formatCurrency(data.revenue)}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Recurring: {formatCurrency(data.recurring)}
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  One-time: {formatCurrency(data.oneTime)}
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Growth: +{data.growth}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {formatCurrency(data.subscriptions)}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Subscriptions
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-slate-900 dark:text-white">
                                {formatCurrency(data.services)}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                Services
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'expenses' && (
                <motion.div
                  key="expenses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Expense Analytics */}
                  <div className="space-y-4">
                    {expenseData.map((expense, index) => (
                      <motion.div
                        key={expense.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                              <CreditCard className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{expense.category}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Amount: {formatCurrency(expense.amount)}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  {expense.percentage}% of total
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Budget: {formatCurrency(expense.budget)}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  expense.variance > 0 
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                }`}>
                                  {expense.variance > 0 ? '+' : ''}{expense.variance}% variance
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(expense.trend)}
                            <div className="w-16 h-16 relative">
                              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                  className="text-slate-200 dark:text-slate-700"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  fill="none"
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                  className="text-red-500"
                                  stroke="currentColor"
                                  strokeWidth="3"
                                  fill="none"
                                  strokeDasharray={`${expense.percentage}, 100`}
                                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'profitability' && (
                <motion.div
                  key="profitability"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Profitability Analytics */}
                  <div className="space-y-4">
                    {profitabilityData.map((data, index) => (
                      <motion.div
                        key={data.period}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                              <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{data.period}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Revenue: {formatCurrency(data.revenue)} • Expenses: {formatCurrency(data.expenses)}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Gross Profit: {formatCurrency(data.grossProfit)}
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Margin: {data.margin}%
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  EBITDA: {formatCurrency(data.ebitda)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                              {formatCurrency(data.netProfit)}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              Net Profit
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'cashflow' && (
                <motion.div
                  key="cashflow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Cash Flow Analytics */}
                  <div className="space-y-4">
                    {cashFlowData.map((data, index) => (
                      <motion.div
                        key={data.period}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                              <Banknote className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{data.period}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Net Cash Flow: {formatCurrency(data.netCashFlow)}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Operating: {formatCurrency(data.operating)}
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Investing: {formatCurrency(data.investing)}
                                </span>
                                <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                  Financing: {formatCurrency(data.financing)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">
                              {formatCurrency(data.cashBalance)}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              Cash Balance
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
