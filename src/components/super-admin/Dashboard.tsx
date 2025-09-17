/**
 * MCP Agents - Modern Dashboard Component
 * Clean, professional dashboard with sophisticated design
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  RefreshCw,
  Download,
  Filter,
  Globe,
  BarChart3,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
} from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { formatCurrency, formatNumber } from '../../lib/utils';

interface DashboardMetrics {
  totalCompanies: number;
  totalUsers: number;
  monthlyRevenue: number;
  systemUptime: number;
  activePortals: number;
  apiCalls: number;
  storageUsed: number;
  bandwidth: number;
}

interface RecentActivity {
  id: string;
  type: 'company' | 'user' | 'portal' | 'system';
  action: string;
  user: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalCompanies: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    systemUptime: 99.97,
    activePortals: 0,
    apiCalls: 0,
    storageUsed: 0,
    bandwidth: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [, setLoading] = useState(true);

  // Mock data - replace with real API calls
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMetrics({
        totalCompanies: 1247,
        totalUsers: 15689,
        monthlyRevenue: 425000,
        systemUptime: 99.97,
        activePortals: 89,
        apiCalls: 2450000,
        storageUsed: 2.4,
        bandwidth: 156,
      });

      setRecentActivity([
        {
          id: '1',
          type: 'company',
          action: 'New company registered',
          user: 'John Doe',
          time: '2 minutes ago',
          status: 'success',
        },
        {
          id: '2',
          type: 'user',
          action: 'User account created',
          user: 'Jane Smith',
          time: '5 minutes ago',
          status: 'success',
        },
        {
          id: '3',
          type: 'system',
          action: 'System backup completed',
          user: 'System',
          time: '10 minutes ago',
          status: 'success',
        },
        {
          id: '4',
          type: 'portal',
          action: 'Portal configuration updated',
          user: 'Admin User',
          time: '15 minutes ago',
          status: 'warning',
        },
      ]);

      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <div className="w-2 h-2 bg-emerald-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'warning':
        return <div className="w-2 h-2 bg-amber-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'error':
        return <div className="w-2 h-2 bg-red-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <Building2 className="w-4 h-4 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'user':
        return <Users className="w-4 h-4 text-purple-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'portal':
        return <Globe className="w-4 h-4 text-cyan-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'system':
        return <Activity className="w-4 h-4 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-8 text-white responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="relative z-10 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h1 className="text-3xl font-bold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Welcome to Trans Bot AI</h1>
              <p className="text-slate-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
                Super Admin Dashboard - Monitor and manage your entire platform ecosystem
              </p>
            </div>
            <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center gap-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">All Systems Operational</span>
              </div>
              <p className="text-xs text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Last updated 2 minutes ago</p>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32 responsive-container sm:flex-col md:flex-row lg:grid" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24 responsive-container sm:flex-col md:flex-row lg:grid" />
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            title="Total Companies"
            value={formatNumber(metrics.totalCompanies)}
            change={{ value: 12.5, type: 'increase' }}
            icon={<Building2 className="w-6 h-6 text-blue-500 responsive-container sm:flex-col md:flex-row lg:grid" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            title="Total Users"
            value={formatNumber(metrics.totalUsers)}
            change={{ value: 8.3, type: 'increase' }}
            icon={<Users className="w-6 h-6 text-emerald-500 responsive-container sm:flex-col md:flex-row lg:grid" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(metrics.monthlyRevenue)}
            change={{ value: 15.7, type: 'increase' }}
            icon={<DollarSign className="w-6 h-6 text-purple-500 responsive-container sm:flex-col md:flex-row lg:grid" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            title="System Health"
            value={`${metrics.systemUptime}%`}
            change={{ value: 0.1, type: 'increase' }}
            icon={<Activity className="w-6 h-6 text-amber-500 responsive-container sm:flex-col md:flex-row lg:grid" />}
          />
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Revenue Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <CardTitle>Revenue Analytics</CardTitle>
                <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-emerald-600 font-medium responsive-container sm:flex-col md:flex-row lg:grid">+15.7%</span>
                  <div className="flex gap-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Button variant="ghost" size="icon" className="w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Filter className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Revenue chart will be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portal Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <CardTitle>Portal Usage</CardTitle>
                <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-blue-600 font-medium responsive-container sm:flex-col md:flex-row lg:grid">5 Active</span>
                  <div className="flex gap-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Button variant="ghost" size="icon" className="w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Filter className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <p className="text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Portal usage chart will be rendered here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                <RefreshCw className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {recentActivity.map(activity => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex-shrink-0 responsive-container sm:flex-col md:flex-row lg:grid">{getTypeIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{activity.action}</p>
                    <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">by {activity.user}</p>
                  </div>
                  <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    {getStatusIcon(activity.status)}
                    <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
