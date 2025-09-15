import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Globe,
  Search,
  Download,
  RefreshCw,
} from 'lucide-react';

/**
 * Business Analytics - Comprehensive Business Intelligence Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T19:00:00.000Z
 */

interface BusinessMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  period: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface RevenueData {
  period: string;
  revenue: number;
  growth: number;
  customers: number;
  orders: number;
}

interface CustomerSegment {
  segment: string;
  count: number;
  percentage: number;
  revenue: number;
  avgOrderValue: number;
  growth: number;
}

interface GeographicData {
  region: string;
  revenue: number;
  customers: number;
  growth: number;
  marketShare: number;
}

export const BusinessAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<BusinessMetric[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'revenue' | 'customers' | 'geographic' | 'trends'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const mockMetrics: BusinessMetric[] = [
      {
        name: 'Total Revenue',
        value: 2847592,
        unit: '$',
        trend: 'up',
        change: 12.5,
        period: 'vs last month',
        status: 'excellent',
      },
      {
        name: 'Active Customers',
        value: 15420,
        unit: 'customers',
        trend: 'up',
        change: 8.3,
        period: 'vs last month',
        status: 'good',
      },
      {
        name: 'Order Volume',
        value: 8947,
        unit: 'orders',
        trend: 'up',
        change: 15.2,
        period: 'vs last month',
        status: 'excellent',
      },
      {
        name: 'Average Order Value',
        value: 318.45,
        unit: '$',
        trend: 'down',
        change: -2.1,
        period: 'vs last month',
        status: 'warning',
      },
      {
        name: 'Customer Retention',
        value: 87.3,
        unit: '%',
        trend: 'up',
        change: 3.2,
        period: 'vs last month',
        status: 'excellent',
      },
      {
        name: 'Market Share',
        value: 23.7,
        unit: '%',
        trend: 'up',
        change: 1.8,
        period: 'vs last quarter',
        status: 'good',
      },
    ];

    const mockRevenueData: RevenueData[] = [
      { period: 'Jan', revenue: 2100000, growth: 8.5, customers: 12000, orders: 6500 },
      { period: 'Feb', revenue: 2250000, growth: 7.1, customers: 12800, orders: 7200 },
      { period: 'Mar', revenue: 2400000, growth: 6.7, customers: 13500, orders: 7800 },
      { period: 'Apr', revenue: 2580000, growth: 7.5, customers: 14200, orders: 8200 },
      { period: 'May', revenue: 2720000, growth: 5.4, customers: 14800, orders: 8600 },
      { period: 'Jun', revenue: 2847592, growth: 4.7, customers: 15420, orders: 8947 },
    ];

    const mockCustomerSegments: CustomerSegment[] = [
      {
        segment: 'Enterprise',
        count: 1250,
        percentage: 8.1,
        revenue: 1850000,
        avgOrderValue: 1480,
        growth: 12.3,
      },
      {
        segment: 'Mid-Market',
        count: 3200,
        percentage: 20.8,
        revenue: 650000,
        avgOrderValue: 203,
        growth: 8.7,
      },
      {
        segment: 'SMB',
        count: 8900,
        percentage: 57.7,
        revenue: 280000,
        avgOrderValue: 31.5,
        growth: 15.2,
      },
      {
        segment: 'Startup',
        count: 2070,
        percentage: 13.4,
        revenue: 67792,
        avgOrderValue: 32.7,
        growth: 22.1,
      },
    ];

    const mockGeographicData: GeographicData[] = [
      { region: 'North America', revenue: 1420000, customers: 8200, growth: 9.2, marketShare: 35.2 },
      { region: 'Europe', revenue: 890000, customers: 4200, growth: 7.8, marketShare: 22.1 },
      { region: 'Asia Pacific', revenue: 380000, customers: 1800, growth: 18.5, marketShare: 9.4 },
      { region: 'Latin America', revenue: 120000, customers: 800, growth: 25.3, marketShare: 3.0 },
      { region: 'Middle East & Africa', revenue: 37592, customers: 420, growth: 31.2, marketShare: 0.9 },
    ];

    setMetrics(mockMetrics);
    setRevenueData(mockRevenueData);
    setCustomerSegments(mockCustomerSegments);
    setGeographicData(mockGeographicData);
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'geographic', label: 'Geographic', icon: Globe },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Business Analytics</h1>
            <p className="text-slate-600 dark:text-slate-400">Comprehensive business intelligence and insights</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search analytics..."
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
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
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

        {/* Key Metrics */}
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
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.name}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {metric.unit === '$' ? formatCurrency(metric.value) : formatNumber(metric.value)}
                  </p>
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
                  {/* Revenue Chart */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Revenue Trend</h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">Revenue trend chart</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Segments */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Customer Segments</h3>
                      <div className="space-y-4">
                        {customerSegments.map((segment) => (
                          <div key={segment.segment} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{segment.segment}</h4>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {segment.percentage}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>{formatNumber(segment.count)} customers</span>
                              <span>{formatCurrency(segment.revenue)}</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                              <div
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${segment.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Geographic Distribution</h3>
                      <div className="space-y-4">
                        {geographicData.map((region) => (
                          <div key={region.region} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{region.region}</h4>
                              <span className="text-sm text-slate-500 dark:text-slate-400">
                                {region.marketShare}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>{formatNumber(region.customers)} customers</span>
                              <span>{formatCurrency(region.revenue)}</span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                              <div
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: `${region.marketShare * 4}%` }}
                              ></div>
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Monthly Revenue</h3>
                      <div className="space-y-4">
                        {revenueData.map((data) => (
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
                              <span>{formatNumber(data.customers)} customers</span>
                              <span>{formatNumber(data.orders)} orders</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Revenue Breakdown</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Revenue breakdown chart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'customers' && (
                <motion.div
                  key="customers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Customer Analytics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Customer Segments</h3>
                      <div className="space-y-4">
                        {customerSegments.map((segment) => (
                          <div key={segment.segment} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{segment.segment}</h4>
                              <span className="text-sm text-green-600 dark:text-green-400">
                                +{segment.growth}%
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                              {formatNumber(segment.count)}
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>Avg Order: {formatCurrency(segment.avgOrderValue)}</span>
                              <span>Revenue: {formatCurrency(segment.revenue)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Customer Growth</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Customer growth chart</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'geographic' && (
                <motion.div
                  key="geographic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Geographic Analytics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Regional Performance</h3>
                      <div className="space-y-4">
                        {geographicData.map((region) => (
                          <div key={region.region} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-slate-900 dark:text-white">{region.region}</h4>
                              <span className="text-sm text-green-600 dark:text-green-400">
                                +{region.growth}%
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                              {formatCurrency(region.revenue)}
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>{formatNumber(region.customers)} customers</span>
                              <span>{region.marketShare}% market share</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Market Share</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Globe className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Market share visualization</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'trends' && (
                <motion.div
                  key="trends"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Trend Analytics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Growth Trends</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <TrendingUp className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Growth trends analysis</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Performance Indicators</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Revenue Growth', value: '12.5%', trend: 'up' },
                          { name: 'Customer Growth', value: '8.3%', trend: 'up' },
                          { name: 'Order Growth', value: '15.2%', trend: 'up' },
                          { name: 'Retention Rate', value: '87.3%', trend: 'up' },
                        ].map((indicator) => (
                          <div key={indicator.name} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-900 dark:text-white">{indicator.name}</span>
                              <div className="flex items-center space-x-2">
                                {getTrendIcon(indicator.trend)}
                                <span className="font-bold text-slate-900 dark:text-white">{indicator.value}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default BusinessAnalytics;
