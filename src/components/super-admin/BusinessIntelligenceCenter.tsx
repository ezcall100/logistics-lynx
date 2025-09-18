import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Target,
  Brain,
  Eye,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from 'lucide-react';

interface BusinessMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  trend: number[];
  category: 'revenue' | 'users' | 'performance' | 'growth';
  description: string;
  target: number;
  unit: string;
}

interface PredictiveInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  recommendation: string;
  category: 'revenue' | 'users' | 'operations' | 'risk';
  status: 'active' | 'monitoring' | 'resolved';
}

interface ReportData {
  id: string;
  name: string;
  type: 'financial' | 'operational' | 'user' | 'performance';
  generatedAt: string;
  dataPoints: number;
  insights: number;
  status: 'ready' | 'generating' | 'error';
  downloadUrl?: string;
}

const BusinessIntelligenceCenter: React.FC = () => {
  const [viewMode, setViewMode] = useState<'overview' | 'insights' | 'reports' | 'predictions'>(
    'overview'
  );
  const [timeRange, setTimeRange] = useState('30d');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<PredictiveInsight | null>(null);

  // Mock data for business metrics
  const [metrics, setMetrics] = useState<BusinessMetric[]>([
    {
      id: 'revenue',
      name: 'Monthly Revenue',
      value: 2450000,
      change: 12.5,
      changeType: 'increase',
      trend: [2000000, 2100000, 2200000, 2300000, 2400000, 2450000],
      category: 'revenue',
      description: 'Total monthly recurring revenue',
      target: 2500000,
      unit: '$',
    },
    {
      id: 'users',
      name: 'Active Users',
      value: 12847,
      change: 8.2,
      changeType: 'increase',
      trend: [12000, 12100, 12200, 12300, 12400, 12847],
      category: 'users',
      description: 'Monthly active users across all portals',
      target: 15000,
      unit: '',
    },
    {
      id: 'conversion',
      name: 'Conversion Rate',
      value: 15.8,
      change: -2.1,
      changeType: 'decrease',
      trend: [18, 17.5, 17, 16.5, 16, 15.8],
      category: 'performance',
      description: 'Trial to paid conversion rate',
      target: 20,
      unit: '%',
    },
    {
      id: 'churn',
      name: 'Churn Rate',
      value: 3.2,
      change: -0.5,
      changeType: 'decrease',
      trend: [4, 3.8, 3.6, 3.4, 3.3, 3.2],
      category: 'performance',
      description: 'Monthly customer churn rate',
      target: 2.5,
      unit: '%',
    },
    {
      id: 'ltv',
      name: 'Customer LTV',
      value: 12500,
      change: 15.3,
      changeType: 'increase',
      trend: [10000, 10500, 11000, 11500, 12000, 12500],
      category: 'revenue',
      description: 'Average customer lifetime value',
      target: 15000,
      unit: '$',
    },
    {
      id: 'cac',
      name: 'Customer CAC',
      value: 850,
      change: -8.7,
      changeType: 'decrease',
      trend: [950, 920, 900, 880, 870, 850],
      category: 'revenue',
      description: 'Customer acquisition cost',
      target: 750,
      unit: '$',
    },
  ]);

  const [insights] = useState<PredictiveInsight[]>([
    {
      id: 'insight-1',
      title: 'Revenue Growth Opportunity',
      description: 'Broker portal shows 25% higher conversion rates during Q4',
      confidence: 92,
      impact: 'high',
      timeframe: 'Next 3 months',
      recommendation: 'Increase marketing spend on broker segment by 30%',
      category: 'revenue',
      status: 'active',
    },
    {
      id: 'insight-2',
      title: 'User Engagement Decline',
      description: 'Driver portal engagement dropping 15% month-over-month',
      confidence: 87,
      impact: 'medium',
      timeframe: 'Next 2 months',
      recommendation: 'Implement gamification features to boost engagement',
      category: 'users',
      status: 'monitoring',
    },
    {
      id: 'insight-3',
      title: 'Operational Efficiency',
      description: 'Automated processes could reduce support tickets by 40%',
      confidence: 95,
      impact: 'high',
      timeframe: 'Next 6 months',
      recommendation: 'Deploy AI-powered automation for common queries',
      category: 'operations',
      status: 'active',
    },
    {
      id: 'insight-4',
      title: 'Market Expansion',
      description: 'European market shows 60% higher demand for EDI integration',
      confidence: 78,
      impact: 'medium',
      timeframe: 'Next 12 months',
      recommendation: 'Prioritize EDI portal development for EU expansion',
      category: 'revenue',
      status: 'monitoring',
    },
  ]);

  const [reports] = useState<ReportData[]>([
    {
      id: 'report-1',
      name: 'Monthly Financial Report',
      type: 'financial',
      generatedAt: '2 hours ago',
      dataPoints: 1250,
      insights: 15,
      status: 'ready',
      downloadUrl: '/reports/monthly-financial.pdf',
    },
    {
      id: 'report-2',
      name: 'User Behavior Analysis',
      type: 'user',
      generatedAt: '1 day ago',
      dataPoints: 8900,
      insights: 23,
      status: 'ready',
      downloadUrl: '/reports/user-behavior.pdf',
    },
    {
      id: 'report-3',
      name: 'Performance Metrics',
      type: 'performance',
      generatedAt: '3 hours ago',
      dataPoints: 2100,
      insights: 8,
      status: 'generating',
    },
    {
      id: 'report-4',
      name: 'Operational Efficiency',
      type: 'operational',
      generatedAt: '6 hours ago',
      dataPoints: 3400,
      insights: 12,
      status: 'ready',
      downloadUrl: '/reports/operational.pdf',
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * (metric.value * 0.01),
          trend: [
            ...metric.trend.slice(1),
            metric.trend[metric.trend.length - 1] +
              (Math.random() - 0.5) * (metric.trend[metric.trend.length - 1] * 0.02),
          ],
        }))
      );
    }, 5000);

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval);
  }, [autoRefresh]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'revenue':
        return 'text-green-400 bg-green-400/20';
      case 'users':
        return 'text-blue-400 bg-blue-400/20';
      case 'performance':
        return 'text-purple-400 bg-purple-400/20';
      case 'growth':
        return 'text-orange-400 bg-orange-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-500 bg-red-500/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'low':
        return 'text-green-500 bg-green-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-green-400 bg-green-400/20';
      case 'generating':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'error':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `$${value.toLocaleString()}`;
    } else if (unit === '%') {
      return `${value.toFixed(1)}%`;
    } else {
      return value.toLocaleString();
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">📊 Business Intelligence Center</h1>
            <p className="text-gray-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
              Advanced analytics and predictive insights for strategic decision making
            </p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                {autoRefresh ? 'Live Analytics' : 'Paused'}
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
            aria-label="Button"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'insights', label: 'Insights', icon: Brain },
            { id: 'reports', label: 'Reports', icon: Download },
            { id: 'predictions', label: 'Predictions', icon: Target },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id as 'overview' | 'insights' | 'reports' | 'predictions')}
            aria-label="Button"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === id
                  ? 'bg-teal-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center space-x-4 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <div className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Showing data for {timeRange}</div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'overview' && (
        <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {}}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <BarChart3 className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">{metric.name}</h3>
                      <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{metric.description}</p>
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(metric.category)}`}
                  >
                    {metric.category}
                  </div>
                </div>

                <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {formatValue(metric.value, metric.unit)}
                    </span>
                    <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      {metric.changeType === 'increase' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : metric.changeType === 'decrease' ? (
                        <ArrowDownRight className="w-4 h-4 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : null}
                      <span
                        className={`text-sm font-medium ${
                          metric.changeType === 'increase'
                            ? 'text-green-400'
                            : metric.changeType === 'decrease'
                              ? 'text-red-400'
                              : 'text-gray-400'
                        }`}
                      >
                        {metric.change > 0 ? '+' : ''}
                        {metric.change}%
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Target</span>
                    <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{formatValue(metric.target, metric.unit)}</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div
                      className="bg-teal-400 h-2 rounded-full transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
                      style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                    ></div>
                  </div>

                  {/* Mini Trend Chart */}
                  <div className="h-12 flex items-end space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    {metric.trend.slice(-8).map((value, trendIndex) => (
                      <div
                        key={trendIndex}
                        className="flex-1 bg-teal-400/30 rounded-t responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{ height: `${(value / Math.max(...metric.trend)) * 100}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'insights' && (
        <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedInsight(insight)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Brain className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">{insight.title}</h3>
                    <p className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{insight.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div
                    className={`px-3 py-1 rounded-full text-xs ${getImpactColor(insight.impact)}`}
                  >
                    {insight.impact} impact
                  </div>
                  <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{insight.confidence}% confidence</p>
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{insight.timeframe}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  <strong>Recommendation:</strong> {insight.recommendation}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Category</p>
                    <p className="text-sm text-white capitalize responsive-container sm:flex-col md:flex-row lg:grid">{insight.category}</p>
                  </div>
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</p>
                    <p className="text-sm text-white capitalize responsive-container sm:flex-col md:flex-row lg:grid">{insight.status}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    Implement
                  </button>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    Monitor
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'reports' && (
        <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Download className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">{report.name}</h3>
                    <p className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Generated {report.generatedAt}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                  {report.status}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Data Points</p>
                  <p className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">
                    {report.dataPoints.toLocaleString()}
                  </p>
                </div>
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Insights</p>
                  <p className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{report.insights}</p>
                </div>
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Type</p>
                  <p className="text-sm text-white capitalize responsive-container sm:flex-col md:flex-row lg:grid">{report.type}</p>
                </div>
              </div>

              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    View Report
                  </button>
                  {report.downloadUrl && (
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                      Download
                    </button>
                  )}
                </div>
                <button className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Insight Detail Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Brain className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedInsight.title}</h3>
                    <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{selectedInsight.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInsight(null)}
            aria-label="Button"
                  className="text-gray-400 hover:text-white transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="grid grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Confidence Level</label>
                    <p className="text-lg font-bold text-teal-400 responsive-container sm:flex-col md:flex-row lg:grid">{selectedInsight.confidence}%</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Impact Level</label>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm ${getImpactColor(selectedInsight.impact)}`}
                    >
                      {selectedInsight.impact}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Recommendation</label>
                  <div className="bg-white/5 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedInsight.recommendation}</p>
                  </div>
                </div>

                <div className="flex space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Target className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Implement Strategy</span>
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Monitor Progress</span>
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Brain className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Deep Dive</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessIntelligenceCenter;
