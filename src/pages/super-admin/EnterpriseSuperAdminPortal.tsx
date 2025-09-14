import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
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
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { cn, formatCurrency, formatNumber, formatPercentage, formatRelativeTime } from '../../lib/utils';

/**
 * DEMO / PLACEHOLDER data for demonstration purposes
 * All data is fictional and follows mock data guidelines
 */
const mockData = {
  companies: [
    {
      id: 1,
      name: 'DEMO Company A',
      domain: 'demo-company-a.com',
      users: 1250,
      plan: 'Enterprise',
      status: 'Active',
      revenue: 45000,
      growth: 12,
      lastActive: '2024-01-15T10:30:00Z',
      features: ['TMS Core', 'Load Board', 'Fleet Management', 'Analytics'],
      contact: {
        email: 'admin@demo-company-a.com',
        phone: '+1-555-0001',
        address: '123 Demo Street, Demo City, DC 00001'
      }
    },
    {
      id: 2,
      name: 'DEMO Company B',
      domain: 'demo-company-b.com',
      users: 890,
      plan: 'Professional',
      status: 'Active',
      revenue: 28500,
      growth: 8,
      lastActive: '2024-01-15T09:15:00Z',
      features: ['TMS Core', 'Load Board', 'Driver App'],
      contact: {
        email: 'contact@demo-company-b.com',
        phone: '+1-555-0002',
        address: '456 Demo Avenue, Demo City, DC 00002'
      }
    },
    {
      id: 3,
      name: 'DEMO Company C',
      domain: 'demo-company-c.com',
      users: 456,
      plan: 'Standard',
      status: 'Active',
      revenue: 15200,
      growth: 15,
      lastActive: '2024-01-15T08:45:00Z',
      features: ['TMS Core', 'Load Board'],
      contact: {
        email: 'info@demo-company-c.com',
        phone: '+1-555-0003',
        address: '789 Demo Boulevard, Demo City, DC 00003'
      }
    },
    {
      id: 4,
      name: 'DEMO Company D',
      domain: 'demo-company-d.com',
      users: 234,
      plan: 'Basic',
      status: 'Trial',
      revenue: 0,
      growth: 0,
      lastActive: '2024-01-14T16:20:00Z',
      features: ['TMS Core'],
      contact: {
        email: 'hello@demo-company-d.com',
        phone: '+1-555-0004',
        address: '321 Demo Drive, Demo City, DC 00004'
      }
    }
  ],
  users: [
    {
      id: 1,
      name: 'DEMO User A',
      email: 'demo.user.a@demo-company-a.com',
      role: 'Admin',
      company: 'DEMO Company A',
      status: 'Active',
      lastLogin: '2024-01-15T10:30:00Z',
      permissions: ['Full Access']
    },
    {
      id: 2,
      name: 'DEMO User B',
      email: 'demo.user.b@demo-company-b.com',
      role: 'Manager',
      company: 'DEMO Company B',
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
      message: 'New company "DEMO Company D" registered',
      time: '2024-01-15T10:30:00Z',
      status: 'success',
      severity: 'info'
    },
    {
      id: 2,
      type: 'payment_received',
      message: 'Payment of $45,000 received from DEMO Company A',
      time: '2024-01-15T10:15:00Z',
      status: 'success',
      severity: 'info'
    },
    {
      id: 3,
      type: 'system_alert',
      message: 'High API usage detected from DEMO Company B',
      time: '2024-01-15T10:00:00Z',
      status: 'warning',
      severity: 'warning'
    },
    {
      id: 4,
      type: 'user_limit',
      message: 'DEMO Company C approaching user limit',
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

/**
 * EnterpriseSuperAdminPortal Component
 * 
 * The main super admin portal interface providing comprehensive
 * system management capabilities including company management,
 * user administration, and system monitoring.
 * 
 * @component
 * @returns {JSX.Element} The EnterpriseSuperAdminPortal component
 */
const EnterpriseSuperAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(12);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  /**
   * Handles floating action button actions with loading state
   * @param {string} action - The action to perform
   */
  const handleFabAction = useCallback(async (action: string) => {
    try {
      switch (action) {
        case 'add-company':
          alert('Company creation feature coming soon');
          break;
        case 'add-user':
          alert('User creation feature coming soon');
          break;
        case 'system-check':
          console.log('Running system check...');
          break;
        case 'maintenance':
          console.log('Toggling maintenance mode...');
          break;
      }
    } catch (error) {
      console.error('Error performing action:', error);
    }
  }, []);

  /**
   * Handles search functionality with query validation
   * @param {string} query - The search query
   */
  const handleSearch = useCallback((query: string) => {
    if (query.trim()) {
      console.log('Searching for:', query);
      // TODO: Implement actual search functionality
    }
  }, []);

  /**
   * Handles help and support actions
   */
  const handleHelp = useCallback(() => {
    console.log('Opening help and support');
    // TODO: Implement help functionality
  }, []);

  /**
   * Handles settings actions
   */
  const handleSettings = useCallback(() => {
    console.log('Opening settings');
    // TODO: Implement settings functionality
  }, []);

  /**
   * Handles profile dropdown toggle
   */
  const handleProfileToggle = useCallback(() => {
    setProfileDropdownOpen(!profileDropdownOpen);
  }, [profileDropdownOpen]);

  /**
   * Handles dark mode toggle from profile dropdown
   */
  const handleDarkModeToggle = useCallback(() => {
    try {
      setDarkMode(!darkMode);
      setProfileDropdownOpen(false); // Close dropdown after toggle
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  }, [darkMode]);

  /**
   * Memoized header elements for better performance and consistency
   * Includes centralized icon sizing, colors, and styling system
   */
  const headerElements = useMemo(() => ({
    logoGradient: 'bg-gradient-to-br from-primary-500 to-secondary-600',
    userGradient: 'bg-gradient-to-br from-primary-500 to-secondary-600',
    searchWidth: 'w-48 sm:w-64 md:w-80',
    iconSizes: {
      small: 'w-4 h-4',
      medium: 'w-5 h-5 sm:w-6 sm:h-6',
      large: 'w-6 h-6'
    },
    iconColors: {
      primary: 'text-white',
      secondary: 'text-gray-600',
      accent: 'text-primary-600',
      warning: 'text-yellow-500',
      success: 'text-green-500'
    }
  }), []);

  /**
   * Utility Icons Group Component
   * Groups settings, help, and theme toggle icons together for consistency
   * All icons use identical styling for perfect alignment
   */
  const UtilityIconsGroup = useMemo(() => {
    // Common button styling for all utility icons
    const commonButtonClass = "h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200";
    const commonIconClass = `${headerElements.iconSizes.medium} transition-colors duration-200`;
    
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Settings Icon - Hidden on mobile, shown on desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSettings}
          aria-label="Open settings"
          className={`hidden sm:flex ${commonButtonClass}`}
          title="Settings"
        >
          <Settings 
            className={`${commonIconClass} ${headerElements.iconColors.secondary}`}
          />
        </Button>

        {/* Help & Support Icon - Always visible */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleHelp}
          aria-label="Open help and support"
          className={commonButtonClass}
          title="Help & Support"
        >
          <HelpCircle 
            className={`${commonIconClass} ${headerElements.iconColors.secondary}`}
          />
        </Button>
      </div>
    );
  }, [headerElements, handleSettings, handleHelp]);

  const fabActions = [
    {
      id: 'add-company',
      label: 'Add Company',
      icon: Building,
      action: () => handleFabAction('add-company')
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: Users,
      action: () => handleFabAction('add-user')
    },
    {
      id: 'system-check',
      label: 'Run System Check',
      icon: Activity,
      action: () => handleFabAction('system-check')
    },
    {
      id: 'maintenance',
      label: 'Toggle Maintenance',
      icon: Settings,
      action: () => handleFabAction('maintenance')
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Input
            placeholder="Search companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Button onClick={() => alert('Company creation feature coming soon')} className="w-full sm:w-auto">
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64"
          />
          <Button onClick={() => alert('User creation feature coming soon')} className="w-full sm:w-auto">
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
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="lg:hidden"
                aria-label="Toggle sidebar navigation"
              >
                <Menu className={`${headerElements.iconSizes.medium} ${headerElements.iconColors.secondary}`} />
              </Button>
              <div className="flex items-center gap-3">
                <div 
                  className={`w-8 h-8 rounded-lg ${headerElements.logoGradient} flex items-center justify-center`}
                  aria-label="Trans Bot AI - Transportation and Logistics Platform"
                  title="Trans Bot AI - Transportation and Logistics Platform"
                >
                  <Truck className={`${headerElements.iconSizes.medium} ${headerElements.iconColors.primary}`} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Trans Bot AI</h1>
                  <p className="text-xs text-gray-500">Super Admin Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Search companies, users, portals..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className={headerElements.searchWidth}
                  leftIcon={
                    <Search 
                      className={`${headerElements.iconSizes.small} ${headerElements.iconColors.secondary} cursor-pointer`}
                      aria-label="Search icon - Click to search"
                      onClick={() => handleSearch(searchQuery)}
                    />
                  }
                  aria-label="Search companies, users, and portals"
                />
              </div>
              
              {/* Desktop Platform Management Button */}
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex h-10"
                aria-label={`Platform Management with ${notificationCount} notifications`}
              >
                <Bell 
                  className={`${headerElements.iconSizes.small} mr-2 ${
                    notificationCount > 0 ? headerElements.iconColors.accent : headerElements.iconColors.secondary
                  }`}
                  aria-label={`Notifications - ${notificationCount} unread`}
                />
                <span className="hidden md:inline">Platform Management</span>
                {notificationCount > 0 && (
                  <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificationCount}
                  </span>
                )}
              </Button>

              {/* Mobile Notification Button */}
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden relative h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                aria-label={`${notificationCount} notifications`}
              >
                <Bell 
                  className={`${headerElements.iconSizes.medium} ${
                    notificationCount > 0 ? headerElements.iconColors.accent : headerElements.iconColors.secondary
                  }`}
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Button>

              {/* Utility Icons Group - Settings, Help */}
              {UtilityIconsGroup}

              <div className="flex items-center gap-2">
                {/* Mobile Settings Button - Only visible on mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSettings}
                  aria-label="Open settings"
                  className="sm:hidden h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                  title="Settings"
                >
                  <Settings 
                    className={`${headerElements.iconSizes.medium} ${headerElements.iconColors.secondary} transition-colors duration-200`}
                  />
                </Button>

                {/* User Profile with Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={handleProfileToggle}
                    className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1 transition-colors duration-200"
                    aria-label="Super Administrator profile menu"
                  >
                    <div 
                      className={`w-8 h-8 rounded-full ${headerElements.userGradient} flex items-center justify-center`}
                    >
                  <span className="text-white font-medium text-sm">SA</span>
                </div>
                    <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900">Super Administrator</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
                    <div className="md:hidden">
                      <div className="text-xs font-medium text-gray-900">SA</div>
              </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={handleDarkModeToggle}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          {darkMode ? (
                            <>
                              <Sun className="w-4 h-4 text-yellow-500" />
                              Switch to Light Mode
                            </>
                          ) : (
                            <>
                              <Moon className="w-4 h-4 text-gray-600" />
                              Switch to Dark Mode
                            </>
                          )}
                        </button>
                        <button
                          onClick={handleSettings}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4 text-gray-600" />
                          Settings
                        </button>
                        <button
                          onClick={handleHelp}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <HelpCircle className="w-4 h-4 text-gray-600" />
                          Help & Support
                        </button>
                        <hr className="my-1" />
                        <button
                          onClick={() => {
                            console.log('Sign out');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
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
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeTab === item.id ? 'page' : undefined}
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
