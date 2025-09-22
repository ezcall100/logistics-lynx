import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, 
  Users,
  Building2, 
  TrendingUp, 
  Activity,
  Shield,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Network,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'system' | 'security' | 'deployment';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

const EnterpriseDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics([
          {
            id: '1',
            name: 'Active Users',
            value: 1247,
            unit: 'users',
            status: 'healthy',
            trend: 'up',
            change: 12.5
          },
          {
            id: '2',
            name: 'System Uptime',
            value: 99.9,
            unit: '%',
            status: 'healthy',
            trend: 'stable',
            change: 0.1
          },
          {
            id: '3',
            name: 'API Response Time',
            value: 145,
            unit: 'ms',
            status: 'healthy',
            trend: 'down',
            change: -8.2
          },
          {
            id: '4',
            name: 'Database Load',
            value: 67,
            unit: '%',
            status: 'warning',
            trend: 'up',
            change: 5.3
          },
          {
            id: '5',
            name: 'Memory Usage',
            value: 78,
            unit: '%',
            status: 'warning',
            trend: 'up',
            change: 3.1
          },
          {
            id: '6',
            name: 'Storage Used',
            value: 45,
            unit: '%',
            status: 'healthy',
            trend: 'stable',
            change: 1.2
          }
        ]);

        setActivities([
          {
            id: '1',
            type: 'user',
            message: 'New user registration: john.doe@company.com',
      timestamp: '2 minutes ago',
            status: 'success'
          },
          {
            id: '2',
            type: 'system',
            message: 'System backup completed successfully',
            timestamp: '15 minutes ago',
            status: 'success'
          },
          {
            id: '3',
            type: 'security',
            message: 'Security scan completed - no threats detected',
      timestamp: '1 hour ago',
            status: 'success'
          },
          {
            id: '4',
            type: 'deployment',
            message: 'New version deployed to production',
            timestamp: '2 hours ago',
            status: 'success'
          },
          {
            id: '5',
            type: 'system',
            message: 'High CPU usage detected on server-03',
            timestamp: '3 hours ago',
            status: 'warning'
          }
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4" />;
      case 'system': return <Activity className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'deployment': return <Globe className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
          <h1 className="text-2xl font-bold text-gray-900">Enterprise Dashboard</h1>
          <p className="text-gray-600">Real-time overview of your system performance</p>
          </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
            </button>
          </div>
        </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-xl border-2 ${getStatusBgColor(metric.status)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${getStatusBgColor(metric.status)}`}>
                  {metric.name === 'Active Users' && <Users className="w-5 h-5 text-blue-600" />}
                  {metric.name === 'System Uptime' && <Activity className="w-5 h-5 text-green-600" />}
                  {metric.name === 'API Response Time' && <Network className="w-5 h-5 text-purple-600" />}
                  {metric.name === 'Database Load' && <Database className="w-5 h-5 text-orange-600" />}
                  {metric.name === 'Memory Usage' && <Cpu className="w-5 h-5 text-red-600" />}
                  {metric.name === 'Storage Used' && <HardDrive className="w-5 h-5 text-indigo-600" />}
                </div>
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                </div>
              <div className={`flex items-center space-x-1 ${getStatusColor(metric.status)}`}>
                {metric.status === 'healthy' && <CheckCircle className="w-4 h-4" />}
                {metric.status === 'warning' && <AlertTriangle className="w-4 h-4" />}
                {metric.status === 'critical' && <AlertTriangle className="w-4 h-4" />}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  {metric.value.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
            </div>

              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 
                  metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'} 
                  {Math.abs(metric.change)}%
                      </span>
                <span className="text-xs text-gray-500">vs last hour</span>
                    </div>
                  </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
                </button>
            </div>

        <div className="space-y-4">
          {activities.map((activity) => (
                <motion.div
              key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${getStatusBgColor(activity.status)}`}>
                {getActivityIcon(activity.type)}
                      </div>
              
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
          </div>
        </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                activity.status === 'success' ? 'bg-green-100 text-green-700' :
                activity.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {activity.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <BarChart3 className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Analytics</h3>
          <p className="text-sm text-gray-600">View detailed reports</p>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
        >
          <Users className="w-6 h-6 text-green-600 mb-2" />
          <h3 className="font-semibold text-gray-900">User Management</h3>
          <p className="text-sm text-gray-600">Manage users & roles</p>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Shield className="w-6 h-6 text-purple-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Security</h3>
          <p className="text-sm text-gray-600">Security settings</p>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
        >
          <Building2 className="w-6 h-6 text-orange-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Company</h3>
          <p className="text-sm text-gray-600">Company settings</p>
        </motion.button>
      </div>
    </div>
  );
};

export default EnterpriseDashboard;
