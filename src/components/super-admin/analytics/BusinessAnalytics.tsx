import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Truck,
  Clock,
  Target,
  Activity,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  PieChart,
  LineChart,
} from 'lucide-react';

interface BusinessMetric {
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
  orders: number;
  customers: number;
}

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

interface CustomerSegment {
  segment: string;
  count: number;
  revenue: number;
  percentage: number;
}

interface GeographicData {
  region: string;
  revenue: number;
  orders: number;
  growth: number;
}

const BusinessAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<BusinessMetric[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [customerSegments, setCustomerSegments] = useState<CustomerSegment[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data
  const mockMetrics: BusinessMetric[] = [
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
      name: 'Total Orders',
      value: 8932,
      change: 8.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: ShoppingCart,
      color: 'text-blue-600',
    },
    {
      id: '3',
      name: 'Active Customers',
      value: 4567,
      change: 15.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      id: '4',
      name: 'Average Order Value',
      value: 139.50,
      change: -2.1,
      changeType: 'decrease',
      period: 'vs last month',
      icon: Target,
      color: 'text-orange-600',
    },
    {
      id: '5',
      name: 'Conversion Rate',
      value: 3.24,
      change: 0.8,
      changeType: 'increase',
      period: 'vs last month',
      icon: Percent,
      color: 'text-indigo-600',
    },
    {
      id: '6',
      name: 'Customer Retention',
      value: 78.5,
      change: 4.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: Activity,
      color: 'text-pink-600',
    },
  ];

  const mockRevenueData: RevenueData[] = [
    { date: '2024-01-01', revenue: 45000, orders: 320, customers: 280 },
    { date: '2024-01-02', revenue: 52000, orders: 380, customers: 320 },
    { date: '2024-01-03', revenue: 48000, orders: 350, customers: 290 },
    { date: '2024-01-04', revenue: 61000, orders: 420, customers: 360 },
    { date: '2024-01-05', revenue: 55000, orders: 390, customers: 330 },
    { date: '2024-01-06', revenue: 67000, orders: 480, customers: 410 },
    { date: '2024-01-07', revenue: 72000, orders: 520, customers: 450 },
    { date: '2024-01-08', revenue: 58000, orders: 410, customers: 350 },
    { date: '2024-01-09', revenue: 63000, orders: 450, customers: 380 },
    { date: '2024-01-10', revenue: 69000, orders: 490, customers: 420 },
    { date: '2024-01-11', revenue: 75000, orders: 540, customers: 460 },
    { date: '2024-01-12', revenue: 82000, orders: 580, customers: 500 },
    { date: '2024-01-13', revenue: 78000, orders: 560, customers: 480 },
    { date: '2024-01-14', revenue: 85000, orders: 610, customers: 520 },
    { date: '2024-01-15', revenue: 92000, orders: 660, customers: 560 },
  ];

  const mockTopProducts: TopProduct[] = [
    { id: '1', name: 'Premium Logistics Package', sales: 1234, revenue: 185100, growth: 15.2 },
    { id: '2', name: 'Standard Shipping Service', sales: 2341, revenue: 140460, growth: 8.7 },
    { id: '3', name: 'Express Delivery', sales: 892, revenue: 133800, growth: 22.1 },
    { id: '4', name: 'Warehouse Storage', sales: 567, revenue: 113400, growth: 5.3 },
    { id: '5', name: 'Custom Packaging', sales: 345, revenue: 69000, growth: 18.9 },
  ];

  const mockCustomerSegments: CustomerSegment[] = [
    { segment: 'Enterprise', count: 156, revenue: 623400, percentage: 50.0 },
    { segment: 'SMB', count: 1234, revenue: 370200, percentage: 29.7 },
    { segment: 'Startup', count: 2341, revenue: 187320, percentage: 15.0 },
    { segment: 'Individual', count: 567, revenue: 66580, percentage: 5.3 },
  ];

  const mockGeographicData: GeographicData[] = [
    { region: 'North America', revenue: 456700, orders: 3245, growth: 12.5 },
    { region: 'Europe', revenue: 389200, orders: 2789, growth: 8.3 },
    { region: 'Asia Pacific', revenue: 234100, orders: 1678, growth: 18.7 },
    { region: 'Latin America', revenue: 123400, orders: 892, growth: 15.2 },
    { region: 'Middle East & Africa', revenue: 44100, orders: 328, growth: 22.1 },
  ];

  const periods = [
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' },
    { label: 'Last year', value: '1y' },
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
      setTopProducts(mockTopProducts);
      setCustomerSegments(mockCustomerSegments);
      setGeographicData(mockGeographicData);
    } catch (error) {
      console.error('Failed to fetch business analytics:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [selectedPeriod, mockMetrics, mockRevenueData, mockTopProducts, mockCustomerSegments, mockGeographicData]);

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

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? ArrowUpRight : ArrowDownRight;
  };

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Business Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive business performance insights and trends
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const ChangeIcon = getChangeIcon(metric.changeType);
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.name === 'Total Revenue' || metric.name === 'Average Order Value' 
                      ? formatCurrency(metric.value)
                      : metric.name === 'Conversion Rate' || metric.name === 'Customer Retention'
                      ? `${metric.value}%`
                      : formatNumber(metric.value)
                    }
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <ChangeIcon className={`h-4 w-4 ${getChangeColor(metric.changeType)}`} />
                <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{metric.period}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Revenue Trend
            </h3>
            <LineChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {revenueData.slice(-7).map((day, index) => (
              <div key={day.date} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(day.revenue)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {day.orders} orders
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Customer Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Segments
            </h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {customerSegments.map((segment, index) => (
              <div key={segment.segment} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {segment.segment}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {segment.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Products and Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Products
            </h3>
            <Package className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatNumber(product.sales)} sales
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(product.revenue)}
                  </div>
                  <div className="text-xs text-green-600">
                    +{product.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Geographic Performance
            </h3>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {geographicData.map((region, index) => (
              <div key={region.region} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {region.region.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {region.region}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatNumber(region.orders)} orders
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(region.revenue)}
                  </div>
                  <div className="text-xs text-green-600">
                    +{region.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance Summary
          </h3>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {formatCurrency(revenueData.reduce((sum, day) => sum + day.revenue, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</div>
            <div className="text-xs text-green-600 mt-1">+12.5% vs last period</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {formatNumber(revenueData.reduce((sum, day) => sum + day.orders, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
            <div className="text-xs text-green-600 mt-1">+8.3% vs last period</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {formatNumber(revenueData.reduce((sum, day) => sum + day.customers, 0))}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Customers</div>
            <div className="text-xs text-green-600 mt-1">+15.2% vs last period</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessAnalytics;