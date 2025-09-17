import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, Search, Plus, 
  Building2, Users, DollarSign, BarChart3, 
  Shield, Activity, ChevronDown, Menu, X, Home, FileText, Database,
  Globe, Building, UserPlus, CreditCard, AlertTriangle, CheckCircle,
  Eye, Edit, Download, Filter, MoreHorizontal,
  Grid3X3, List, Palette, Moon, Sun, TrendingUp, TrendingDown,
  Zap, Target, Award, Star, Clock, MapPin, Phone, Mail,
  ArrowUpRight, ArrowDownRight, RefreshCw, Play, Pause,
  ChevronRight, ChevronLeft, Calendar, Flag, ShoppingBag,
  Maximize2, Minimize2, Layout, Monitor, Smartphone, LogIn, Key
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  avatar?: string;
  permissions?: string[];
  subdomain?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

interface Company {
  id: string;
  name: string;
  subdomain: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  users: number;
  portals: string[];
  revenue: number;
  createdAt: string;
  lastActivity: string;
  logo?: string;
  industry?: string;
  location?: string;
  growth?: number;
  health?: 'excellent' | 'good' | 'warning' | 'critical';
}

interface ModernSuperAdminPortalProps {
  user: User;
  onLogout: () => void;
}

const ModernSuperAdminPortal: React.FC<ModernSuperAdminPortalProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('ALL');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard']);

  // Enhanced mock data
  const companies: Company[] = [
    {
      id: '1',
      name: 'ABC Logistics',
      subdomain: 'abc-logistics',
      plan: 'enterprise',
      status: 'active',
      users: 45,
      portals: ['broker', 'carrier', 'shipper', 'analytics', 'crm'],
      revenue: 12500,
      createdAt: '2024-01-15',
      lastActivity: '2 hours ago',
      industry: 'Logistics',
      location: 'New York, NY',
      growth: 12.5,
      health: 'excellent'
    },
    {
      id: '2',
      name: 'XYZ Transport',
      subdomain: 'xyz-transport',
      plan: 'professional',
      status: 'active',
      users: 23,
      portals: ['carrier', 'driver', 'factoring'],
      revenue: 8500,
      createdAt: '2024-02-20',
      lastActivity: '1 day ago',
      industry: 'Transportation',
      location: 'Los Angeles, CA',
      growth: 8.2,
      health: 'good'
    },
    {
      id: '3',
      name: 'Global Freight Solutions',
      subdomain: 'global-freight',
      plan: 'basic',
      status: 'trial',
      users: 8,
      portals: ['broker', 'load-board'],
      revenue: 0,
      createdAt: '2024-03-10',
      lastActivity: '3 days ago',
      industry: 'Freight',
      location: 'Chicago, IL',
      growth: 0,
      health: 'warning'
    },
    {
      id: '4',
      name: 'Premium Shipping Co',
      subdomain: 'premium-shipping',
      plan: 'enterprise',
      status: 'active',
      users: 67,
      portals: ['broker', 'carrier', 'shipper', 'analytics', 'crm', 'financials'],
      revenue: 18900,
      createdAt: '2024-01-05',
      lastActivity: '30 min ago',
      industry: 'Shipping',
      location: 'Miami, FL',
      growth: 15.8,
      health: 'excellent'
    }
  ];

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboards', 
      icon: Home, 
      hasSubmenu: true,
      submenu: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'reports', label: 'Reports', icon: FileText }
      ]
    },
    { 
      id: 'apps', 
      label: 'Apps', 
      icon: Grid3X3, 
      hasSubmenu: true,
      submenu: [
        { id: 'companies', label: 'Companies', icon: Building2 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'portals', label: 'Portals', icon: Globe }
      ]
    },
    { 
      id: 'layouts', 
      label: 'Layouts', 
      icon: Layout, 
      hasSubmenu: true,
      badge: 'Hot',
      submenu: [
        { id: 'horizontal', label: 'Horizontal', icon: Monitor },
        { id: 'vertical', label: 'Vertical', icon: Smartphone },
        { id: 'detached', label: 'Detached', icon: Maximize2 }
      ]
    },
    { 
      id: 'authentication', 
      label: 'Authentication', 
      icon: Shield, 
      hasSubmenu: true,
      submenu: [
        { id: 'login', label: 'Login', icon: LogIn },
        { id: 'register', label: 'Register', icon: UserPlus },
        { id: 'forgot', label: 'Forgot Password', icon: Key }
      ]
    },
    { 
      id: 'pages', 
      label: 'Pages', 
      icon: FileText, 
      hasSubmenu: true,
      submenu: [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'billing', label: 'Billing', icon: CreditCard }
      ]
    },
    { 
      id: 'components', 
      label: 'Components', 
      icon: Settings, 
      hasSubmenu: true,
      submenu: [
        { id: 'ui', label: 'Base UI', icon: Palette },
        { id: 'forms', label: 'Forms', icon: FileText },
        { id: 'tables', label: 'Tables', icon: Grid3X3 },
        { id: 'charts', label: 'Charts', icon: BarChart3 }
      ]
    }
  ];

  const quickActions = [
    { 
      label: 'Add Company', 
      icon: Building, 
      color: 'bg-blue-500',
      action: () => console.log('Add Company')
    },
    { 
      label: 'Create User', 
      icon: UserPlus, 
      color: 'bg-green-500',
      action: () => console.log('Create User')
    },
    { 
      label: 'Generate Report', 
      icon: FileText, 
      color: 'bg-purple-500',
      action: () => console.log('Generate Report')
    },
    { 
      label: 'System Backup', 
      icon: Database, 
      color: 'bg-orange-500',
      action: () => console.log('System Backup')
    },
  ];

  const notifications = [
    { 
      id: 1, 
      title: 'New company registered', 
      message: 'Global Freight Solutions signed up for trial', 
      time: '5 min ago', 
      type: 'info',
      icon: Building2
    },
    { 
      id: 2, 
      title: 'Payment overdue', 
      message: 'XYZ Transport payment is 3 days overdue', 
      time: '1 hour ago', 
      type: 'warning',
      icon: AlertTriangle
    },
    { 
      id: 3, 
      title: 'System maintenance', 
      message: 'Scheduled maintenance completed successfully', 
      time: '2 hours ago', 
      type: 'success',
      icon: CheckCircle
    },
    { 
      id: 4, 
      title: 'High usage alert', 
      message: 'Premium Shipping Co approaching API limits', 
      time: '3 hours ago', 
      type: 'warning',
      icon: Activity
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h2 className="text-3xl font-bold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Good Morning, {user.name}!</h2>
            <p className="text-blue-100 text-lg responsive-container sm:flex-col md:flex-row lg:grid">Here's what's happening with your platform today.</p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-sm text-blue-100 responsive-container sm:flex-col md:flex-row lg:grid">Current Date</p>
              <p className="text-lg font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <Calendar className="w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          {
            title: 'Total Users',
            value: '143',
            change: '+15 this month',
            changeType: 'positive',
            icon: Users,
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            link: 'See details'
          },
          {
            title: 'Monthly Revenue',
            value: '$39,900',
            change: '+12% from last month',
            changeType: 'positive',
            icon: DollarSign,
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            link: 'View net earnings'
          },
          {
            title: 'Active Portals',
            value: '24',
            change: 'All systems operational',
            changeType: 'neutral',
            icon: Globe,
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            link: 'Monitor status'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className={`p-3 rounded-xl ${metric.iconBg}`}>
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
              <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{metric.value}</p>
              </div>
            </div>
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <p className={`text-sm ${
                metric.changeType === 'positive' ? 'text-green-600' :
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.change}
              </p>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                {metric.link} →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Performance Trends</h3>
              <p className="text-purple-100 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Platform performance and analytics</p>
            </div>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {['ALL', '1M', '6M', '1Y'].map((period) => (
                <button
                  key={period}
                  onClick={() = aria-label="Button"> setSelectedTimeRange(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeRange === period
                      ? 'bg-white text-purple-600'
                      : 'text-purple-100 hover:bg-white/20'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="grid grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">7,585</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Orders</p>
            </div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">$22.89k</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Earnings</p>
            </div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">367</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Refunds</p>
            </div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">18.92%</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Conversion</p>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Interactive Revenue Chart</p>
              <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Chart visualization would be here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Recent Activity</h3>
              <p className="text-green-100 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Latest updates across all companies</p>
            </div>
            <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>
        </div>
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {[
              {
                icon: Building2,
                title: 'New company registered',
                description: 'Global Freight Solutions signed up for trial',
                time: '5 min ago',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                icon: Users,
                title: 'User activity spike',
                description: 'ABC Logistics had 150% increase in user activity',
                time: '1 hour ago',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: DollarSign,
                title: 'Payment received',
                description: 'Premium Shipping Co paid $18,900 monthly fee',
                time: '2 hours ago',
                color: 'bg-purple-100 text-purple-600'
              },
              {
                icon: Activity,
                title: 'System optimization',
                description: 'Database performance improved by 25%',
                time: '3 hours ago',
                color: 'bg-orange-100 text-orange-600'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`p-3 rounded-xl ${activity.color}`}>
                  <activity.icon className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{activity.title}</p>
                  <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{activity.description}</p>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
      case 'overview':
        return renderDashboard();
      case 'companies':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Company Management</h2></div>;
      case 'users':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">User Management</h2></div>;
      case 'portals':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Portal Management</h2></div>;
      case 'billing':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Billing & Plans</h2></div>;
      case 'analytics':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Analytics</h2></div>;
      case 'reports':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Reports</h2></div>;
      case 'settings':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Settings</h2></div>;
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-16 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Left side - Menu Toggle and Search */}
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Menu className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>

          {/* Right side - Actions and Profile */}
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Flag className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Grid3X3 className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <ShoppingBag className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">5</span>
            </button>
            
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
              <Maximize2 className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            
            <button
              onClick={() = aria-label="Button"> setDarkMode(!darkMode)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Moon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
            
            <button
              onClick={() = aria-label="Button"> setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <Bell className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">3</span>
            </button>
            
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-white text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-left responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                  <div className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Founder</div>
                </div>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="py-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                        <User className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        Profile
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                        <Settings className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        Settings
                      </a>
                      <hr className="my-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 responsive-container sm:flex-col md:flex-row lg:grid"
                       aria-label="Button">
                        <LogOut className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className="bg-white shadow-lg min-h-screen fixed left-0 top-16 z-40 overflow-hidden border-r border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Bot className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">VELZON</h1>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {menuItems.map((item) => (
                <div key={item.id}>
                  <button
                    onClick={() = aria-label="Button"> item.hasSubmenu ? toggleMenu(item.id) : setActiveMenu(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      activeMenu === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <item.icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.hasSubmenu && (
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        expandedMenus.includes(item.id) ? 'rotate-90' : ''
                      }`} />
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {item.hasSubmenu && expandedMenus.includes(item.id) && (
                    <div className="ml-8 mt-2 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      {item.submenu?.map((subItem) => (
                        <button
                          key={subItem.id}
                          onClick={() = aria-label="Button"> setActiveMenu(subItem.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                            activeMenu === subItem.id
                              ? 'bg-purple-50 text-purple-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <subItem.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span className="text-sm responsive-container sm:flex-col md:flex-row lg:grid">{subItem.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 responsive-container sm:flex-col md:flex-row lg:grid">QUICK ACTIONS</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <span className="text-sm responsive-container sm:flex-col md:flex-row lg:grid">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Status */}
            <div className="mt-8 pt-6 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 responsive-container sm:flex-col md:flex-row lg:grid">PLATFORM STATUS</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {[
                  { label: 'All Systems', status: 'operational' },
                  { label: 'Database', status: 'healthy' },
                  { label: 'API Services', status: 'running' },
                  { label: 'CDN', status: 'optimal' }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-sm text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">{system.label}</span>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-2 h-2 bg-green-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                      <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{system.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-280' : 'ml-0'}`}>
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <Plus className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
        </button>
      </div>
    </div>
  );
};

export default ModernSuperAdminPortal;
