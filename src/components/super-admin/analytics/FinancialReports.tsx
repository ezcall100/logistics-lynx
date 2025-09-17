import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  FileText,
  Calculator,
  Receipt,
  Target,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Users,
  Package,
} from 'lucide-react';

interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  margin: number;
}

interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
}

interface CashFlowData {
  period: string;
  inflow: number;
  outflow: number;
  netFlow: number;
}

interface FinancialStatement {
  type: 'income' | 'expense' | 'profit';
  category: string;
  amount: number;
  percentage: number;
}

const FinancialReports: React.FC = () => {
  const [metrics, setMetrics] = useState<FinancialMetric[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([]);
  const [financialStatements, setFinancialStatements] = useState<FinancialStatement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data
    const mockMetrics: FinancialMetric[] = [
      {
      id: '1',
        name: 'Total Revenue',
      value: 1247500,
        change: 12.5,
      changeType: 'increase',
        period: 'vs last month',
      icon: DollarSign,
      color: 'text-green-600',
      },
      {
      id: '2',
        name: 'Total Expenses',
      value: 892300,
        change: 8.3,
      changeType: 'increase',
        period: 'vs last month',
      icon: Receipt,
      color: 'text-red-600',
      },
      {
      id: '3',
        name: 'Net Profit',
      value: 355200,
        change: 18.7,
      changeType: 'increase',
        period: 'vs last month',
      icon: Target,
      color: 'text-blue-600',
    },
    {
      id: '4',
      name: 'Profit Margin',
      value: 28.5,
        change: 2.1,
      changeType: 'increase',
        period: 'vs last month',
      icon: Percent,
      color: 'text-purple-600',
    },
    {
      id: '5',
      name: 'Operating Expenses',
      value: 456700,
      change: 5.2,
      changeType: 'increase',
        period: 'vs last month',
      icon: Calculator,
      color: 'text-orange-600',
    },
    {
      id: '6',
      name: 'Cash Flow',
      value: 234100,
      change: 15.8,
      changeType: 'increase',
        period: 'vs last month',
      icon: Activity,
      color: 'text-indigo-600',
      },
    ];

    const mockRevenueData: RevenueData[] = [
    { date: '2024-01-01', revenue: 45000, expenses: 32000, profit: 13000, margin: 28.9 },
    { date: '2024-01-02', revenue: 52000, expenses: 36000, profit: 16000, margin: 30.8 },
    { date: '2024-01-03', revenue: 48000, expenses: 34000, profit: 14000, margin: 29.2 },
    { date: '2024-01-04', revenue: 61000, expenses: 42000, profit: 19000, margin: 31.1 },
    { date: '2024-01-05', revenue: 55000, expenses: 38000, profit: 17000, margin: 30.9 },
    { date: '2024-01-06', revenue: 67000, expenses: 45000, profit: 22000, margin: 32.8 },
    { date: '2024-01-07', revenue: 72000, expenses: 48000, profit: 24000, margin: 33.3 },
    { date: '2024-01-08', revenue: 58000, expenses: 40000, profit: 18000, margin: 31.0 },
    { date: '2024-01-09', revenue: 63000, expenses: 43000, profit: 20000, margin: 31.7 },
    { date: '2024-01-10', revenue: 69000, expenses: 46000, profit: 23000, margin: 33.3 },
    { date: '2024-01-11', revenue: 75000, expenses: 50000, profit: 25000, margin: 33.3 },
    { date: '2024-01-12', revenue: 82000, expenses: 54000, profit: 28000, margin: 34.1 },
    { date: '2024-01-13', revenue: 78000, expenses: 52000, profit: 26000, margin: 33.3 },
    { date: '2024-01-14', revenue: 85000, expenses: 56000, profit: 29000, margin: 34.1 },
    { date: '2024-01-15', revenue: 92000, expenses: 60000, profit: 32000, margin: 34.8 },
  ];

  const mockExpenseCategories: ExpenseCategory[] = [
    { category: 'Personnel', amount: 234500, percentage: 26.3, change: 8.2, icon: Users },
    { category: 'Technology', amount: 156700, percentage: 17.6, change: 12.5, icon: Package },
    { category: 'Marketing', amount: 123400, percentage: 13.8, change: 15.3, icon: Target },
    { category: 'Operations', amount: 98700, percentage: 11.1, change: 5.7, icon: Activity },
    { category: 'Administration', amount: 78900, percentage: 8.8, change: 3.2, icon: FileText },
    { category: 'Other', amount: 200100, percentage: 22.4, change: 7.8, icon: Calculator },
    ];

    const mockCashFlowData: CashFlowData[] = [
    { period: 'Jan', inflow: 1247500, outflow: 892300, netFlow: 355200 },
    { period: 'Feb', inflow: 1189200, outflow: 856700, netFlow: 332500 },
    { period: 'Mar', inflow: 1323400, outflow: 923400, netFlow: 400000 },
    { period: 'Apr', inflow: 1287600, outflow: 897800, netFlow: 389800 },
    { period: 'May', inflow: 1412300, outflow: 987600, netFlow: 424700 },
    { period: 'Jun', inflow: 1356700, outflow: 945300, netFlow: 411400 },
  ];

  const mockFinancialStatements: FinancialStatement[] = [
    { type: 'income', category: 'Service Revenue', amount: 1247500, percentage: 100.0 },
    { type: 'income', category: 'Product Sales', amount: 234500, percentage: 18.8 },
    { type: 'income', category: 'Consulting', amount: 156700, percentage: 12.6 },
    { type: 'expense', category: 'Personnel Costs', amount: 234500, percentage: 18.8 },
    { type: 'expense', category: 'Technology', amount: 156700, percentage: 12.6 },
    { type: 'expense', category: 'Marketing', amount: 123400, percentage: 9.9 },
    { type: 'expense', category: 'Operations', amount: 98700, percentage: 7.9 },
    { type: 'expense', category: 'Administration', amount: 78900, percentage: 6.3 },
    { type: 'profit', category: 'Gross Profit', amount: 892400, percentage: 71.5 },
    { type: 'profit', category: 'Net Profit', amount: 355200, percentage: 28.5 },
  ];

  const periods = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last year', value: '1y' },
  ];

  const reports = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'income', name: 'Income Statement', icon: TrendingUp },
    { id: 'expenses', name: 'Expense Analysis', icon: TrendingDown },
    { id: 'cashflow', name: 'Cash Flow', icon: Activity },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    setMetrics(mockMetrics);
    setRevenueData(mockRevenueData);
      setExpenseCategories(mockExpenseCategories);
    setCashFlowData(mockCashFlowData);
      setFinancialStatements(mockFinancialStatements);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [selectedPeriod, mockCashFlowData, mockExpenseCategories, mockFinancialStatements, mockMetrics, mockRevenueData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };


  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? ArrowUpRight : ArrowDownRight;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  if (isLoading) {
    return (
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Financial Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Comprehensive financial performance and analysis
          </p>
          </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <select
              value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
            </select>
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export PDF</span>
            </button>
          </div>
        </div>

      {/* Report Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <button
                  key={report.id}
                  onClick={() = aria-label="Button"> setSelectedReport(report.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedReport === report.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{report.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Overview Tab */}
          {selectedReport === 'overview' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  const ChangeIcon = getChangeIcon(metric.changeType);
                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
                      key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
            >
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {metric.name === 'Profit Margin' || metric.name === 'Cash Flow'
                              ? `${metric.value}%`
                              : formatCurrency(metric.value)
                            }
                  </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{metric.name}</div>
                </div>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                          <Icon className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
              </div>
                      <div className="mt-4 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <ChangeIcon className={`h-4 w-4 ${getChangeColor(metric.changeType)}`} />
                        <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{metric.period}</span>
              </div>
            </motion.div>
                  );
                })}
        </div>

              {/* Revenue vs Expenses Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      Revenue vs Expenses
                    </h3>
                    <BarChart3 className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </div>
                  <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {revenueData.slice(-7).map((day) => (
                      <div key={day.date} className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {formatCurrency(day.profit)}
                          </span>
                      </div>
                        <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex-1 bg-green-100 dark:bg-green-900/20 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div
                              className="bg-green-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                              style={{ width: `${(day.revenue / 100000) * 100}%` }}
                            ></div>
                    </div>
                          <div className="flex-1 bg-red-100 dark:bg-red-900/20 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div
                              className="bg-red-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                              style={{ width: `${(day.expenses / 100000) * 100}%` }}
                            ></div>
                      </div>
                            </div>
                          </div>
                        ))}
                      </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      Expense Categories
                    </h3>
                    <PieChart className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                      <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {expenseCategories.map((category) => {
                      const Icon = category.icon;
                      return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                        <div key={category.category} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            <Icon className="h-4 w-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {category.category}
                              </span>
                            </div>
                          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                              <div
                                className="h-2 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                                style={{ width: `${category.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right responsive-container sm:flex-col md:flex-row lg:grid">
                              {formatCurrency(category.amount)}
                              </span>
                            </div>
                          </div>
                      );
                    })}
                      </div>
                </motion.div>
                    </div>
                  </div>
          )}

          {/* Income Statement Tab */}
          {selectedReport === 'income' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
                <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                  <thead className="bg-gray-50 dark:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    {financialStatements.map((statement) => (
                      <motion.tr
                        key={`${statement.type}-${statement.category}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            {statement.type === 'income' && <TrendingUp className="h-4 w-4 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />}
                            {statement.type === 'expense' && <TrendingDown className="h-4 w-4 text-red-600 responsive-container sm:flex-col md:flex-row lg:grid" />}
                            {statement.type === 'profit' && <Target className="h-4 w-4 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />}
                            <span className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {statement.category}
                                </span>
                              </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {formatCurrency(statement.amount)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {statement.percentage.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statement.type === 'income' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            statement.type === 'expense' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>
                            {statement.type.charAt(0).toUpperCase() + statement.type.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                          </div>
                        </div>
          )}

          {/* Expense Analysis Tab */}
          {selectedReport === 'expenses' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                {expenseCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <motion.div
                      key={category.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            <Icon className="h-6 w-6 text-red-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </div>
                            <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {category.category}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                              {category.percentage.toFixed(1)}% of total
                            </p>
                              </div>
                            </div>
                          </div>
                      
                      <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Amount</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {formatCurrency(category.amount)}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Change</span>
                          <span className="text-sm font-medium text-red-600 responsive-container sm:flex-col md:flex-row lg:grid">
                            +{category.change}%
                          </span>
                            </div>
                        
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div
                            className="bg-red-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                          </div>
                        </div>
                      </motion.div>
                  );
                })}
              </div>
                  </div>
              )}

          {/* Cash Flow Tab */}
          {selectedReport === 'cashflow' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      Monthly Cash Flow
                    </h3>
                    <Activity className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    {cashFlowData.map((flow) => (
                      <div key={flow.period} className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {flow.period}
                                </span>
                          <span className={`text-sm font-medium ${
                            flow.netFlow >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(flow.netFlow)}
                                </span>
                              </div>
                        <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex-1 bg-green-100 dark:bg-green-900/20 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div
                              className="bg-green-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                              style={{ width: `${(flow.inflow / 1500000) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex-1 bg-red-100 dark:bg-red-900/20 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div
                              className="bg-red-500 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                              style={{ width: `${(flow.outflow / 1500000) * 100}%` }}
                            ></div>
                            </div>
                          </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span>In: {formatCurrency(flow.inflow)}</span>
                          <span>Out: {formatCurrency(flow.outflow)}</span>
                          </div>
                        </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      Cash Flow Summary
                    </h3>
                    <Calculator className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Inflow</span>
                      <span className="text-sm font-medium text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">
                        {formatCurrency(cashFlowData.reduce((sum, flow) => sum + flow.inflow, 0))}
                      </span>
                            </div>
                    <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Outflow</span>
                      <span className="text-sm font-medium text-red-600 responsive-container sm:flex-col md:flex-row lg:grid">
                        {formatCurrency(cashFlowData.reduce((sum, flow) => sum + flow.outflow, 0))}
                                </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">Net Cash Flow</span>
                        <span className="text-sm font-medium text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">
                          {formatCurrency(cashFlowData.reduce((sum, flow) => sum + flow.netFlow, 0))}
                                </span>
                              </div>
                            </div>
                          </div>
                </motion.div>
                          </div>
                        </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
