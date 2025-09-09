import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown,
  Building2,
  Users,
  DollarSign,
  Shield,
  Settings,
  Search,
  Plus,
  Download,
  Filter,
  Bell,
  Moon,
  Sun,
  Menu,
  Building,
  Globe,
  Brain,
  BarChart3,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  RefreshCw,
  Home,
  ShieldCheck,
  BarChart,
  UserPlus,
  PieChart as PieChartIcon,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { cn, formatCurrency, formatNumber, formatPercentage, formatRelativeTime } from '../../lib/utils';

// Import our custom components
import CompanyManagement from '../../components/super-admin/CompanyManagement';
import UserManagement from '../../components/super-admin/UserManagement';

// Import services
import { SystemMetricsService, AuditLogService, RealtimeService } from '../../services/supabase';

interface SystemMetrics {
  totalCompanies: number;
  totalUsers: number;
  monthlyRevenue: number;
  systemUptime: number;
  apiCalls: number;
  databaseQueries: number;
  storageUsed: number;
  bandwidth: number;
}

interface RecentEvent {
  id: number;
  type: string;
  message: string;
  time: string;
  status: string;
  severity: string;
}

const SuperAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalCompanies: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    systemUptime: 99.97,
    apiCalls: 0,
    databaseQueries: 0,
    storageUsed: 0,
    bandwidth: 0
  });
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
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
      count: systemMetrics.totalCompanies
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User accounts & permissions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      count: systemMetrics.totalUsers
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
      icon: BarChart,
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
      icon: ShieldCheck,
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
      action: () => console.log('Add Company')
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: UserPlus,
      action: () => console.log('Add User')
    },
    {
      id: 'system-check',
      label: 'Run System Check',
      icon: RefreshCw,
      action: () => console.log('Run System Check')
    },
    {
      id: 'maintenance',
      label: 'Toggle Maintenance',
      icon: Settings,
      action: () => console.log('Toggle Maintenance')
    }
  ];

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Load system metrics
        const health = await SystemMetricsService.getSystemHealth();
        setSystemMetrics(prev => ({
          ...prev,
          systemUptime: health.uptime,
          apiCalls: health.apiCalls
        }));
        
        // Load recent events
        const logs = await AuditLogService.getLogs(10);
        setRecentEvents(logs.map(log => ({
          id: log.id,
          type: log.action,
          message: `${log.action} on ${log.resource_type}`,
          time: log.timestamp,
          status: 'success',
          severity: 'info'
        })));
        
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Set up real-time subscriptions
  useEffect(() => {
    const subscriptions = [
      RealtimeService.subscribeToCompanies((payload) => {
        console.log('Company change:', payload);
        // Update metrics when companies change
        SystemMetricsService.getSystemHealth().then(health => 
          setSystemMetrics(prev => ({
            ...prev,
            systemUptime: health.uptime,
            apiCalls: health.apiCalls
          }))
        );
      }),
      RealtimeService.subscribeToUsers((payload) => {
        console.log('User change:', payload);
        // Update metrics when users change
        SystemMetricsService.getSystemHealth().then(health => 
          setSystemMetrics(prev => ({
            ...prev,
            systemUptime: health.uptime,
            apiCalls: health.apiCalls
          }))
        );
      }),
      RealtimeService.subscribeToSystemMetrics((payload) => {
        console.log('System metrics change:', payload);
        // Update system metrics in real-time
        SystemMetricsService.getSystemHealth().then(health => 
          setSystemMetrics(prev => ({
            ...prev,
            systemUptime: health.uptime,
            apiCalls: health.apiCalls
          }))
        );
      })
    ];

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, []);

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
              <div className="text-primary-100">Last updated {formatRelativeTime(new Date().toISOString())}</div>
        </div>
      </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Companies',
            value: formatNumber(systemMetrics.totalCompanies),
            change: '+12.5% vs last month',
            icon: Building2,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50'
          },
          {
            title: 'Total Users',
            value: formatNumber(systemMetrics.totalUsers),
            change: '+8.3% vs last month',
            icon: Users,
            color: 'text-green-500',
            bgColor: 'bg-green-50'
          },
          {
            title: 'Monthly Revenue',
            value: formatCurrency(systemMetrics.monthlyRevenue),
            change: '+15.7% vs last month',
            icon: DollarSign,
            color: 'text-purple-500',
            bgColor: 'bg-purple-50'
          },
          {
            title: 'System Health',
            value: formatPercentage(systemMetrics.systemUptime),
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
                    <PieChartIcon className="w-4 h-4" />
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
                <PieChartIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
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
              <span className="text-green-600 font-medium">{formatPercentage(systemMetrics.systemUptime)} Uptime</span>
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

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Events</CardTitle>
          <CardDescription>Latest activities and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEvents.map((event) => (
          <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    event.status === 'success' ? 'text-green-600 bg-green-50' :
                    event.status === 'warning' ? 'text-yellow-600 bg-yellow-50' :
                    'text-blue-600 bg-blue-50'
                  }`}>
                    {event.status === 'success' ? <CheckCircle className="w-5 h-5" /> :
                     event.status === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                     <Clock className="w-5 h-5" />}
                  </div>
              <div>
                    <p className="font-medium text-gray-900">{event.message}</p>
                    <p className="text-sm text-gray-600">{event.type.replace('_', ' ')}</p>
              </div>
            </div>
                <span className="text-sm text-gray-500">{formatRelativeTime(event.time)}</span>
          </motion.div>
        ))}
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
        return <CompanyManagement />;
      case 'users':
        return <UserManagement />;
      case 'portals':
        return (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Portal Management</h3>
            <p className="text-gray-500">Portal configuration and management system coming soon</p>
          </div>
        );
      case 'billing':
        return (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Billing & Subscriptions</h3>
            <p className="text-gray-500">Billing management system coming soon</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="text-center py-12">
            <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">System Analytics</h3>
            <p className="text-gray-500">Advanced analytics dashboard coming soon</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Global Settings</h3>
            <p className="text-gray-500">System configuration panel coming soon</p>
        </div>
        );
      case 'ai-agents':
  return (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">AI Command Center</h3>
            <p className="text-gray-500">AI agent monitoring and management coming soon</p>
      </div>
        );
      case 'security':
        return (
          <div className="text-center py-12">
            <ShieldCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Security & Compliance</h3>
            <p className="text-gray-500">Security monitoring dashboard coming soon</p>
    </div>
        );
      default:
        return renderDashboard();
}
  };

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Super Admin Portal...</p>
      </div>
    </div>
    );
}

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
                <span className="ml-2 bg-primary-600 text-white text-xs px-2 py-0.5 rounded-full">3</span>
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
                          {item.count !== undefined && (
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
                <div className="text-xs text-green-600">Last updated {formatRelativeTime(new Date().toISOString())}</div>
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
          {fabActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={action.action}
                className="w-12 h-12 rounded-full shadow-lg"
                variant="gradient"
                title={action.label}
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

export default SuperAdminPortal;