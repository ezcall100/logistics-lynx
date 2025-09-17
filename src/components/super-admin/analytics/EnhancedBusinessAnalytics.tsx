import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  PieChart,
  Zap,
  Clock,
  Target,
  Award,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';

interface AnalyticsMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  description: string;
  trend: number[];
  period: string;
}

interface ChartData {
  id: string;
  name: string;
  data: Array<{
    x: string;
    y: number;
  }>;
  color: string;
}

interface UserSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  color: string;
  trend: number;
}

interface DeviceUsage {
  device: string;
  count: number;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const EnhancedBusinessAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [userSegments, setUserSegments] = useState<UserSegment[]>([]);
  const [deviceUsage, setDeviceUsage] = useState<DeviceUsage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric] = useState('all');
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Mock analytics data
  const mockMetrics: AnalyticsMetric[] = [
    {
      id: '1',
      title: 'Total Users',
      value: '15,689',
      change: 12.5,
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Active users across all portals',
      trend: [12000, 12500, 13000, 13500, 14000, 14500, 15000, 15689],
      period: '30 days',
    },
    {
      id: '2',
      title: 'Monthly Revenue',
      value: '$425,000',
      change: 8.3,
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Total monthly recurring revenue',
      trend: [380000, 390000, 400000, 410000, 420000, 425000],
      period: '6 months',
    },
    {
      id: '3',
      title: 'Conversion Rate',
      value: '3.2%',
      change: -0.5,
      changeType: 'decrease',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Visitor to customer conversion',
      trend: [3.5, 3.4, 3.3, 3.2, 3.2, 3.2],
      period: '6 months',
    },
    {
      id: '4',
      title: 'Session Duration',
      value: '4m 32s',
      change: 15.2,
      changeType: 'increase',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Average session duration',
      trend: [240, 250, 260, 270, 280, 272],
      period: '6 months',
    },
    {
      id: '5',
      title: 'Page Views',
      value: '2.4M',
      change: 22.1,
      changeType: 'increase',
      icon: Eye,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Total page views this month',
      trend: [1800000, 1900000, 2000000, 2100000, 2200000, 2400000],
      period: '6 months',
    },
    {
      id: '6',
      title: 'Bounce Rate',
      value: '42.3%',
      change: -3.2,
      changeType: 'decrease',
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Percentage of single-page sessions',
      trend: [48, 46, 45, 44, 43, 42.3],
      period: '6 months',
    },
  ];

  const mockChartData: ChartData[] = [
    {
      id: '1',
      name: 'Users',
      data: [
        { x: 'Jan', y: 12000 },
        { x: 'Feb', y: 12500 },
        { x: 'Mar', y: 13000 },
        { x: 'Apr', y: 13500 },
        { x: 'May', y: 14000 },
        { x: 'Jun', y: 14500 },
        { x: 'Jul', y: 15000 },
        { x: 'Aug', y: 15689 },
      ],
      color: '#3B82F6',
    },
    {
      id: '2',
      name: 'Revenue',
      data: [
        { x: 'Jan', y: 380000 },
        { x: 'Feb', y: 390000 },
        { x: 'Mar', y: 400000 },
        { x: 'Apr', y: 410000 },
        { x: 'May', y: 420000 },
        { x: 'Jun', y: 425000 },
      ],
      color: '#10B981',
    },
  ];

  const mockUserSegments: UserSegment[] = [
    {
      id: '1',
      name: 'New Users',
      count: 3240,
      percentage: 20.6,
      color: '#3B82F6',
      trend: 15.2,
    },
    {
      id: '2',
      name: 'Returning Users',
      count: 8560,
      percentage: 54.5,
      color: '#10B981',
      trend: 8.3,
    },
    {
      id: '3',
      name: 'Premium Users',
      count: 2889,
      percentage: 18.4,
      color: '#8B5CF6',
      trend: 22.1,
    },
    {
      id: '4',
      name: 'Enterprise Users',
      count: 1000,
      percentage: 6.5,
      color: '#F59E0B',
      trend: 5.7,
    },
  ];

  const mockDeviceUsage: DeviceUsage[] = [
    {
      device: 'Desktop',
      count: 8560,
      percentage: 54.5,
      icon: Monitor,
      color: '#3B82F6',
    },
    {
      device: 'Mobile',
      count: 6289,
      percentage: 40.1,
      icon: Smartphone,
      color: '#10B981',
    },
    {
      device: 'Tablet',
      count: 840,
      percentage: 5.4,
      icon: Tablet,
      color: '#8B5CF6',
    },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(mockMetrics);
      setChartData(mockChartData);
      setUserSegments(mockUserSegments);
      setDeviceUsage(mockDeviceUsage);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [mockChartData, mockDeviceUsage, mockMetrics, mockUserSegments]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredMetrics = selectedMetric === 'all' 
    ? metrics 
    : metrics.filter(metric => metric.id === selectedMetric);

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return ArrowUpRight;
      case 'decrease': return ArrowDownRight;
      default: return Minus;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid"></div>
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
            Business Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Comprehensive analytics and insights for business performance
          </p>
        </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
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
            <span>Export</span>
          </button>
          <button
            onClick={() = aria-label="Button"> setShowDetailedView(!showDetailedView)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {showDetailedView ? <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
            <span>{showDetailedView ? 'Simple View' : 'Detailed View'}</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {filteredMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const ChangeIcon = getChangeIcon(metric.changeType);
          
          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${getChangeColor(metric.changeType)}`}>
                  <ChangeIcon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>

              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.title}
                </h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {metric.description}
                </p>
              </div>

              {showDetailedView && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span>Trend ({metric.period})</span>
                    <span>Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                  <div className="h-16 bg-gray-50 dark:bg-gray-700 rounded-lg p-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-end justify-between h-full responsive-container sm:flex-col md:flex-row lg:grid">
                      {metric.trend.map((value, i) => (
                        <div
                          key={i}
                          className="bg-blue-500 rounded-sm responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{
                            height: `${(value / Math.max(...metric.trend)) * 100}%`,
                            width: `${100 / metric.trend.length}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              User Growth
            </h2>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <BarChart3 className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Line Chart</span>
            </div>
          </div>
          
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-end justify-between h-full responsive-container sm:flex-col md:flex-row lg:grid">
              {chartData[0]?.data.map((point, i) => (
                <div key={i} className="flex flex-col items-center space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div
                    className="bg-blue-500 rounded-sm w-8 responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{
                      height: `${(point.y / Math.max(...chartData[0].data.map(d => d.y))) * 200}px`,
                    }}
                  />
                  <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{point.x}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
            <span className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Total Growth: +{((chartData[0]?.data[chartData[0].data.length - 1].y - chartData[0]?.data[0].y) / chartData[0]?.data[0].y * 100).toFixed(1)}%</span>
            <span className="text-blue-600 font-medium responsive-container sm:flex-col md:flex-row lg:grid">Trending Up</span>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              Revenue Growth
            </h2>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <TrendingUp className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Bar Chart</span>
            </div>
          </div>
          
          <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-end justify-between h-full responsive-container sm:flex-col md:flex-row lg:grid">
              {chartData[1]?.data.map((point, i) => (
                <div key={i} className="flex flex-col items-center space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div
                    className="bg-green-500 rounded-sm w-8 responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{
                      height: `${(point.y / Math.max(...chartData[1].data.map(d => d.y))) * 200}px`,
                    }}
                  />
                  <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{point.x}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
            <span className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Total Growth: +{((chartData[1]?.data[chartData[1].data.length - 1].y - chartData[1]?.data[0].y) / chartData[1]?.data[0].y * 100).toFixed(1)}%</span>
            <span className="text-green-600 font-medium responsive-container sm:flex-col md:flex-row lg:grid">Trending Up</span>
          </div>
        </div>
      </div>

      {/* User Segments and Device Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* User Segments */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              User Segments
            </h2>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <PieChart className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Distribution</span>
            </div>
          </div>
          
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {userSegments.map((segment) => (
              <div key={segment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div 
                    className="w-4 h-4 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                    style={{ backgroundColor: segment.color }}
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {segment.name}
                    </div>
                    <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      {segment.count.toLocaleString()} users
                    </div>
                  </div>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {segment.percentage}%
                  </div>
                  <div className={`text-sm flex items-center space-x-1 ${
                    segment.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {segment.trend > 0 ? (
                      <ArrowUpRight className="h-3 w-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                    <span>{Math.abs(segment.trend)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
              Device Usage
            </h2>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Globe className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Platforms</span>
            </div>
          </div>
          
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {deviceUsage.map((device) => {
              const DeviceIcon = device.icon;
              
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <div key={device.device} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <DeviceIcon className={`h-5 w-5 ${device.color}`} />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                        {device.device}
                      </div>
                      <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                        {device.count.toLocaleString()} users
                      </div>
                    </div>
                  </div>
                  <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {device.percentage}%
                    </div>
                    <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div
                        className="h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{
                          width: `${device.percentage}%`,
                          backgroundColor: device.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Performance Insights
          </h2>
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Zap className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Key Metrics</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="text-2xl font-bold text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">98.5%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Uptime</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="text-2xl font-bold text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">45ms</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Avg Response</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="text-2xl font-bold text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid">4.8/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">User Rating</div>
          </div>
          
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <Target className="h-8 w-8 text-orange-600 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
            <div className="text-2xl font-bold text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid">92%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Goal Achievement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBusinessAnalytics;