import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Shield,
  Activity,
  Settings,
  Search,
  Plus,
  Download,
  Filter,
  MoreVertical,
  Bell,
  Moon,
  Sun,
  Menu,
  Building,
  Globe,
  Brain,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { cn, formatCurrency, formatNumber, formatPercentage, formatRelativeTime } from '../../lib/utils';

// Mock data for demonstration
const mockData = {
  companies: [
    {
      id: 1,
      name: 'Global Logistics Corp',
      domain: 'globallogistics.com',
      users: 1250,
      plan: 'Enterprise',
      status: 'Active',
      revenue: 45000,
      growth: 12,
      lastActive: '2024-01-15T10:30:00Z',
      features: ['TMS Core', 'Load Board', 'Fleet Management', 'Analytics'],
      contact: {
        email: 'admin@globallogistics.com',
        phone: '+1-555-0123',
        address: '123 Business Ave, New York, NY 10001'
      }
    },
    {
      id: 2,
      name: 'Swift Transport Ltd',
      domain: 'swifttransport.com',
      users: 890,
      plan: 'Professional',
      status: 'Active',
      revenue: 28500,
      growth: 8,
      lastActive: '2024-01-15T09:15:00Z',
      features: ['TMS Core', 'Load Board', 'Driver App'],
      contact: {
        email: 'contact@swifttransport.com',
        phone: '+1-555-0456',
        address: '456 Transport St, Los Angeles, CA 90210'
      }
    },
    {
      id: 3,
      name: 'Metro Freight Inc',
      domain: 'metrofreight.com',
      users: 456,
      plan: 'Standard',
      status: 'Active',
      revenue: 15200,
      growth: 15,
      lastActive: '2024-01-15T08:45:00Z',
      features: ['TMS Core', 'Load Board'],
      contact: {
        email: 'info@metrofreight.com',
        phone: '+1-555-0789',
        address: '789 Freight Blvd, Chicago, IL 60601'
      }
    },
    {
      id: 4,
      name: 'Coastal Shipping Co',
      domain: 'coastalshipping.com',
      users: 234,
      plan: 'Basic',
      status: 'Trial',
      revenue: 0,
      growth: 0,
      lastActive: '2024-01-14T16:20:00Z',
      features: ['TMS Core'],
      contact: {
        email: 'hello@coastalshipping.com',
        phone: '+1-555-0321',
        address: '321 Harbor Dr, Miami, FL 33101'
      }
    }
  ],
  users: [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@globallogistics.com',
      role: 'Admin',
      company: 'Global Logistics Corp',
      status: 'Active',
      lastLogin: '2024-01-15T10:30:00Z',
      permissions: ['Full Access']
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@swifttransport.com',
      role: 'Manager',
      company: 'Swift Transport Ltd',
      status: 'Active',
      lastLogin: '2024-01-15T09:15:00Z',
      permissions: ['Load Management', 'User Management']
    }
  ],
  systemMetrics: {
    totalCompanies: 1247,
    totalUsers: 45892,
    monthlyRevenue: 2400000,
    systemUptime: 99.97,
    apiCalls: 12456,
    databaseQueries: 89234,
    storageUsed: 2.4,
    bandwidth: 156
  },
  recentEvents: [
    {
      id: 1,
      type: 'company_created',
      message: 'New company "Coastal Shipping Co" registered',
      time: '2024-01-15T10:30:00Z',
      status: 'success',
      severity: 'info'
    },
    {
      id: 2,
      type: 'payment_received',
      message: 'Payment of $45,000 received from Global Logistics Corp',
      time: '2024-01-15T10:15:00Z',
      status: 'success',
      severity: 'info'
    },
    {
      id: 3,
      type: 'system_alert',
      message: 'High API usage detected from Swift Transport Ltd',
      time: '2024-01-15T10:00:00Z',
      status: 'warning',
      severity: 'warning'
    },
    {
      id: 4,
      type: 'user_limit',
      message: 'Metro Freight Inc approaching user limit',
      time: '2024-01-15T09:45:00Z',
      status: 'info',
      severity: 'info'
    },
    {
      id: 5,
      type: 'backup_complete',
      message: 'Enterprise backup completed successfully',
      time: '2024-01-15T09:30:00Z',
      status: 'success',
      severity: 'info'
    }
  ]
};

const EnterpriseSuperAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'System overview and metrics',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'companies',
      label: 'Companies',
      icon: Building2,
      description: 'Manage client companies',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      count: mockData.companies.length
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User accounts & permissions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      count: mockData.users.length
    },
    {
      id: 'portals',
      label: 'Portal Management',
      icon: Globe,
      description: 'Configure portal access',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      count: 24
    },
    {
      id: 'billing',
      label: 'Billing & Subscriptions',
      icon: CreditCard,
      description: 'Revenue & subscriptions',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      status: 'Active'
    },
    {
      id: 'analytics',
      label: 'System Analytics',
      icon: TrendingUp,
      description: 'Platform performance metrics',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50'
    },
    {
      id: 'settings',
      label: 'Global Settings',
      icon: Settings,
      description: 'System configuration',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'ai-agents',
      label: 'AI Command Center',
      icon: Brain,
      description: 'Monitor autonomous agents',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      status: 'Live',
      badge: 'LIVE'
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: Shield,
      description: 'Security monitoring',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      status: 'Secure'
    }
  ];

  const fabActions = [
    {
      id: 'add-company',
      label: 'Add Company',
      icon: Building,
      action: () => alert('Company creation feature coming soon')
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: Users,
      action: () => alert('User creation feature coming soon')
    },
    {
      id: 'system-check',
      label: 'Run System Check',
      icon: Activity,
      action: () => console.log('Running system check...')
    },
    {
      id: 'maintenance',
      label: 'Toggle Maintenance',
      icon: Settings,
      action: () => console.log('Toggling maintenance mode...')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'trial':
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive':
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'trial':
      case 'warning':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card variant="gradient" className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-0">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to Trans Bot AI</h1>
              <p className="text-primary-100 text-lg">Super Admin Dashboard - Monitor and manage your entire platform ecosystem</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">All Systems Operational</div>
              <div className="text-primary-100">Last updated 2 minutes ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Companies',
            value: formatNumber(mockData.systemMetrics.totalCompanies),
            change: '+12.5% vs last month',
            icon: Building2,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50'
          },
          {
            title: 'Total Users',
            value: formatNumber(mockData.systemMetrics.totalUsers),
            change: '+8.3% vs last month',
            icon: Users,
            color: 'text-green-500',
            bgColor: 'bg-green-50'
          },
          {
            title: 'Monthly Revenue',
            value: formatCurrency(mockData.systemMetrics.monthlyRevenue),
            change: '+15.7% vs last month',
            icon: DollarSign,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50'
          },
          {
            title: 'System Health',
            value: formatPercentage(mockData.systemMetrics.systemUptime),
            change: '+0.1% vs last month',
            icon: Shield,
            color: 'text-orange-500',
            bgColor: 'bg-orange-50'
          }
        ].map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="elevated" className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-green-600 text-sm font-medium">{stat.change}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Analytics */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly revenue trends and projections</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">+15.7%</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <LineChart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart visualization</p>
                <p className="text-sm text-gray-400">Interactive chart with filtering and export</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portal Usage */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Portal Usage</CardTitle>
                <CardDescription>Active portal usage across the platform</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-medium">5 Active</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <PieChart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Portal usage analytics</p>
                <p className="text-sm text-gray-400">Real-time portal activity monitoring</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>System Health & Performance</CardTitle>
              <CardDescription>Real-time system performance metrics</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">99.9% Uptime</span>
              <Button size="sm" variant="ghost">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">System performance monitoring</p>
              <p className="text-sm text-gray-400">Real-time metrics and health indicators</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCompanies = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Company Management</h2>
          <p className="text-gray-600">Manage client companies and their configurations</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-64"
          />
          <Button onClick={() => alert('Company creation feature coming soon')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Growth
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.companies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(company.users)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        company.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                        company.plan === 'Professional' ? 'bg-blue-100 text-blue-800' :
                        company.plan === 'Standard' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {company.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(company.status)}`}>
                        {getStatusIcon(company.status)}
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(company.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      +{company.growth}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(company.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Activity className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-64"
          />
          <Button onClick={() => alert('User creation feature coming soon')}>
            <Users className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: 'All Users', count: formatNumber(mockData.systemMetrics.totalUsers), icon: Users, color: 'text-blue-500' },
          { title: 'Active Users', count: formatNumber(mockData.systemMetrics.totalUsers * 0.85), icon: Activity, color: 'text-green-500' },
          { title: 'User Roles', count: '8', icon: Shield, color: 'text-purple-500' }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                  <div className="text-gray-600 text-sm">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockData.users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(user.status)}`}>
                        {getStatusIcon(user.status)}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Activity className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'companies':
        return renderCompanies();
      case 'users':
        return renderUsers();
      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Section Coming Soon</div>
            <div className="text-gray-500">This section is under development</div>
          </div>
        );
    }
  };

  return (
    <div className={cn('min-h-screen transition-colors duration-300', darkMode ? 'bg-gray-900' : 'bg-gray-50')}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Trans Bot AI</h1>
                  <p className="text-sm text-gray-600">Super Admin Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search companies, users, portals..."
                  className="w-80"
                  leftIcon={<Search className="w-4 h-4" />}
                />
              </div>
              
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Platform Management
                <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">12</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">SA</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">Super Administrator</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          'bg-white border-r border-gray-200 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}>
          <div className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200',
                    activeTab === item.id
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  )}
                >
                  <div className={cn('p-2 rounded-lg', item.bgColor)}>
                    <item.icon className={cn('w-5 h-5', item.color)} />
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.count && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                              {item.count}
                            </span>
                          )}
                          {item.badge && (
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{item.description}</div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {!sidebarCollapsed && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-800">All Systems Operational</span>
                </div>
                <div className="text-xs text-green-600">Last updated 2 minutes ago</div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex flex-col-reverse gap-3">
          {fabActions.map((action) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                onClick={action.action}
                className="w-12 h-12 rounded-full shadow-lg"
                variant="gradient"
              >
                <action.icon className="w-5 h-5" />
              </Button>
            </motion.div>
          ))}
          <Button
            className="w-14 h-14 rounded-full shadow-lg"
            variant="gradient"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseSuperAdminPortal;
