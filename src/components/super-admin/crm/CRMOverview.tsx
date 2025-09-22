import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Target,
  BarChart3,
  Eye,
  Plus,
  Filter,
  Search,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
  FileText,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Globe,
  Building,
  UserCheck,
  UserX,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const CRMOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data for CRM metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      title: 'Active Leads',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Conversion Rate',
      value: '24.8%',
      change: '+3.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'lead',
      title: 'New lead from Acme Corp',
      description: 'Interested in Enterprise TMS solution',
      time: '2 minutes ago',
      status: 'new',
      value: '$45,000',
      avatar: 'AC',
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Opportunity closed - TechStart Inc',
      description: 'Deal worth $125,000 signed',
      time: '15 minutes ago',
      status: 'won',
      value: '$125,000',
      avatar: 'TS',
    },
    {
      id: 3,
      type: 'email',
      title: 'Follow-up email sent',
      description: 'To Global Logistics Ltd',
      time: '1 hour ago',
      status: 'sent',
      value: null,
      avatar: 'GL',
    },
    {
      id: 4,
      type: 'call',
      title: 'Scheduled call completed',
      description: 'With MegaFreight Solutions',
      time: '2 hours ago',
      status: 'completed',
      value: null,
      avatar: 'MF',
    },
    {
      id: 5,
      type: 'meeting',
      title: 'Demo meeting scheduled',
      description: 'With StartupHub Ventures',
      time: '3 hours ago',
      status: 'scheduled',
      value: '$75,000',
      avatar: 'SH',
    },
  ];

  const topPerformers = [
    {
      name: 'Sarah Johnson',
      role: 'Sales Manager',
      avatar: 'SJ',
      deals: 12,
      revenue: '$485,000',
      conversion: '28.5%',
      trend: 'up',
    },
    {
      name: 'Mike Chen',
      role: 'Account Executive',
      avatar: 'MC',
      deals: 9,
      revenue: '$320,000',
      conversion: '24.1%',
      trend: 'up',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Development',
      avatar: 'ER',
      deals: 15,
      revenue: '$298,000',
      conversion: '22.8%',
      trend: 'down',
    },
    {
      name: 'David Kim',
      role: 'Sales Representative',
      avatar: 'DK',
      deals: 7,
      revenue: '$245,000',
      conversion: '26.3%',
      trend: 'up',
    },
  ];

  const pipelineStages = [
    { stage: 'Prospects', count: 245, value: '$1.2M', color: 'bg-gray-100' },
    { stage: 'Qualified', count: 156, value: '$2.1M', color: 'bg-blue-100' },
    { stage: 'Proposal', count: 89, value: '$1.8M', color: 'bg-yellow-100' },
    { stage: 'Negotiation', count: 45, value: '$1.1M', color: 'bg-orange-100' },
    { stage: 'Closed Won', count: 23, value: '$890K', color: 'bg-green-100' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CRM Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your customer relationships and sales pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Lead
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border ${metric.borderColor} ${metric.bgColor} dark:bg-gray-800 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${metric.bgColor} dark:bg-gray-700`}>
                <metric.icon className={`w-6 h-6 ${metric.color} dark:text-white`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {metric.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Pipeline */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sales Pipeline</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
          </div>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={stage.stage} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${stage.color} dark:bg-gray-600`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{stage.stage}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>{stage.count} deals</span>
                  <span className="font-medium">{stage.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Performers</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {performer.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{performer.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{performer.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">{performer.revenue}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{performer.deals} deals</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activities</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {activity.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      activity.status === 'won' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      activity.status === 'sent' ? 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' :
                      activity.status === 'completed' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{activity.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{activity.time}</span>
                    {activity.value && <span className="font-medium text-green-600 dark:text-green-400">{activity.value}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMOverview;
