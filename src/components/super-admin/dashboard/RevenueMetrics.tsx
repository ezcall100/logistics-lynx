import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  Target,
  Building2,
  Users,
} from 'lucide-react';

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockRevenueData = {
  totalRevenue: 425000,
  monthlyGrowth: 15.2,
  yearlyGrowth: 28.5,
  averageRevenuePerUser: 27.1,
  subscriptionRevenue: 380000,
  oneTimeRevenue: 45000,
  monthlyData: [
    { month: 'Jan', revenue: 320000, growth: 8.5 },
    { month: 'Feb', revenue: 345000, growth: 7.8 },
    { month: 'Mar', revenue: 365000, growth: 5.8 },
    { month: 'Apr', revenue: 380000, growth: 4.1 },
    { month: 'May', revenue: 395000, growth: 3.9 },
    { month: 'Jun', revenue: 410000, growth: 3.8 },
    { month: 'Jul', revenue: 425000, growth: 3.7 }
  ],
  revenueByPlan: [
    { plan: 'Enterprise', revenue: 180000, percentage: 42.4, users: 45 },
    { plan: 'Professional', revenue: 150000, percentage: 35.3, users: 120 },
    { plan: 'Standard', revenue: 75000, percentage: 17.6, users: 200 },
    { plan: 'Basic', revenue: 20000, percentage: 4.7, users: 150 }
  ],
  topCompanies: [
    { name: 'DEMO Company A', revenue: 45000, growth: 12.5, plan: 'Enterprise' },
    { name: 'DEMO Company B', revenue: 28500, growth: 8.3, plan: 'Professional' },
    { name: 'DEMO Company C', revenue: 15200, growth: 15.2, plan: 'Standard' },
    { name: 'DEMO Company D', revenue: 12800, growth: 6.7, plan: 'Professional' },
    { name: 'DEMO Company E', revenue: 9500, growth: 22.1, plan: 'Standard' }
  ]
};

const RevenueMetrics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <TrendingUp className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <TrendingDown className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
  };

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Revenue Metrics</h1>
          <p className="text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Track revenue performance and financial insights</p>
        </div>
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatCurrency(mockRevenueData.totalRevenue)}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <DollarSign className="h-6 w-6 text-emerald-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className={`flex items-center ${getGrowthColor(mockRevenueData.monthlyGrowth)}`}>
              {getGrowthIcon(mockRevenueData.monthlyGrowth)}
              <span className="text-sm ml-1 responsive-container sm:flex-col md:flex-row lg:grid">{formatPercentage(mockRevenueData.monthlyGrowth)}</span>
            </div>
            <span className="text-sm text-gray-500 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Growth</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatPercentage(mockRevenueData.monthlyGrowth)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <TrendingUp className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
            <Target className="h-4 w-4 text-blue-500 mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">Target: 12%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">ARPU</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatCurrency(mockRevenueData.averageRevenuePerUser)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <Users className="h-6 w-6 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className={`flex items-center ${getGrowthColor(8.5)}`}>
              {getGrowthIcon(8.5)}
              <span className="text-sm ml-1 responsive-container sm:flex-col md:flex-row lg:grid">+8.5%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2 responsive-container sm:flex-col md:flex-row lg:grid">from last month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Yearly Growth</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {formatPercentage(mockRevenueData.yearlyGrowth)}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
              <BarChart3 className="h-6 w-6 text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
            <Calendar className="h-4 w-4 text-orange-500 mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid">YTD Performance</span>
          </div>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Revenue Trend</h3>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-3 h-3 bg-blue-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Revenue</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {mockRevenueData.monthlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div
                  className="w-8 bg-blue-500 rounded-t responsive-container sm:flex-col md:flex-row lg:grid"
                  style={{ height: `${(data.revenue / 500000) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{data.month}</span>
                <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{formatCurrency(data.revenue)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Revenue by Plan</h3>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {mockRevenueData.revenueByPlan.map((plan, index) => (
              <div key={index} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-4 h-4 rounded-full bg-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">{plan.plan}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{plan.users} users</p>
                  </div>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">{formatCurrency(plan.revenue)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{formatPercentage(plan.percentage)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Companies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Top Revenue Companies</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">View All</button>
        </div>
        <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
          <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Growth</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockRevenueData.topCompanies.map((company, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 responsive-container sm:flex-col md:flex-row lg:grid">
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                        <Building2 className="h-4 w-4 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <span className="font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                      {company.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                    {formatCurrency(company.revenue)}
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className={`flex items-center ${getGrowthColor(company.growth)}`}>
                      {getGrowthIcon(company.growth)}
                      <span className="text-sm ml-1 responsive-container sm:flex-col md:flex-row lg:grid">{formatPercentage(company.growth)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right responsive-container sm:flex-col md:flex-row lg:grid">
                    <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                      <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default RevenueMetrics;
