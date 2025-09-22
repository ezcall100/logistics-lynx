/**
 * TMS Core Application - Consolidated Transportation Management System
 * Single application with role-based access for all TMS users
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Users,
  Search,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  FileText,
  Calendar,
  MessageSquare,
  Phone,
  MessageCircle,
  Video,
  CheckSquare,
  User,
  Mail,
  LogOut,
  Activity,
  CheckCircle,
  Home,
  BarChart3,
  UserPlus,
  CreditCard,
  Server,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Bookmark,
  History,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Minimize2,
  Maximize2,
  HelpCircle,
  Lock,
  Globe,
  Wifi,
  Star,
  Heart,
  Flag,
  Truck,
  Package,
  MapPin,
  Clock,
  Zap,
  Shield,
  Building,
  Car,
  Route,
  Fuel,
  Wrench,
  FileCheck,
  Calculator,
  PieChart,
  LineChart,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Filter,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Send,
  Archive,
  Tag,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Map as MapIcon,
  Navigation,
  Target,
  Award,
  Gift,
  Coffee,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Volume1,
  Volume2 as Volume2Icon,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart as HeartIcon,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Menu,
} from 'lucide-react';

// TMS Role Types
type TMSRole = 'shipper' | 'broker' | 'carrier' | 'owner_operator';

// TMS Function Types
type TMSFunction =
  | 'dashboard'
  | 'loads'
  | 'fleet'
  | 'financial'
  | 'communication'
  | 'analytics'
  | 'settings'
  | 'directory'
  | 'rates'
  | 'marketplace'
  | 'edi'
  | 'financials'
  | 'crm'
  | 'loadboard'
  | 'factoring'
  | 'onboarding';

// TMS User Interface
interface TMSUser {
  id: number;
  name: string;
  email: string;
  role: TMSRole;
  company: string;
  avatar: string;
  permissions: string[];
  subscription: 'free' | 'professional' | 'enterprise' | 'custom';
  activeFunctions: TMSFunction[];
}

// TMS Application State
interface TMSState {
  user: TMSUser | null;
  currentModule: string;
  sidebarCollapsed: boolean;
  rightSidebarCollapsed: boolean;
  searchQuery: string;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
  }>;
  activeMenuItem: string;
  expandedMenus: string[];
}

function TMSCoreApplication() {
  const { theme, toggleTheme } = useTheme();

  // State Management
  const [state, setState] = useState<TMSState>({
    user: {
      id: 1,
      name: 'Demo User',
      email: 'demo@transbotai.com',
      role: 'shipper', // Default role - will be set based on login
      company: 'Demo Company',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      permissions: ['read', 'write', 'admin'],
      subscription: 'professional',
      activeFunctions: [
        'dashboard',
        'loads',
        'financial',
        'communication',
        'analytics',
        'settings',
        'directory',
        'rates',
        'marketplace',
        'edi',
        'financials',
        'crm',
        'loadboard',
        'factoring',
        'onboarding',
      ],
    },
    currentModule: 'dashboard',
    sidebarCollapsed: false,
    rightSidebarCollapsed: false,
    searchQuery: '',
    notifications: [],
    activeMenuItem: 'dashboard',
    expandedMenus: ['dashboard'],
  });

  // Dynamic menu configuration based on active functions
  const getAllMenuConfig = () => {
    return {
      dashboard: {
        label: 'Dashboard',
        icon: Home,
        path: '/tms/dashboard',
        permissions: ['read'],
        description: 'Overview and key metrics',
      },
      loads: {
        label: 'Load Management',
        icon: Package,
        path: '/tms/loads',
        permissions: ['read', 'write'],
        description: 'Manage shipments and loads',
        submenu: [
          { label: 'All Loads', path: '/tms/loads/all' },
          { label: 'Create Load', path: '/tms/loads/create' },
          { label: 'Load Tracking', path: '/tms/loads/tracking' },
          { label: 'Load History', path: '/tms/loads/history' },
        ],
      },
      fleet: {
        label: 'Fleet Management',
        icon: Truck,
        path: '/tms/fleet',
        permissions: ['read', 'write'],
        description: 'Manage vehicles and drivers',
        submenu: [
          { label: 'Vehicles', path: '/tms/fleet/vehicles' },
          { label: 'Drivers', path: '/tms/fleet/drivers' },
          { label: 'Maintenance', path: '/tms/fleet/maintenance' },
          { label: 'Routes', path: '/tms/fleet/routes' },
        ],
      },
      financial: {
        label: 'Financial Management',
        icon: DollarSign,
        path: '/tms/financial',
        permissions: ['read', 'write'],
        description: 'Billing and payment management',
        submenu: [
          { label: 'Invoicing', path: '/tms/financial/invoicing' },
          { label: 'Payments', path: '/tms/financial/payments' },
          { label: 'Financial Reports', path: '/tms/financial/reports' },
          { label: 'Expense Tracking', path: '/tms/financial/expenses' },
        ],
      },
      communication: {
        label: 'Communication Hub',
        icon: MessageCircle,
        path: '/tms/communication',
        permissions: ['read', 'write'],
        description: 'Messaging and collaboration',
        submenu: [
          { label: 'Messages', path: '/tms/communication/messages' },
          { label: 'Notifications', path: '/tms/communication/notifications' },
          { label: 'Documents', path: '/tms/communication/documents' },
          { label: 'Video Calls', path: '/tms/communication/video' },
        ],
      },
      analytics: {
        label: 'Analytics & Reports',
        icon: BarChart3,
        path: '/tms/analytics',
        permissions: ['read'],
        description: 'Business intelligence and insights',
        submenu: [
          { label: 'Performance', path: '/tms/analytics/performance' },
          { label: 'Business Intelligence', path: '/tms/analytics/business' },
          { label: 'Custom Reports', path: '/tms/analytics/custom' },
          { label: 'Data Export', path: '/tms/analytics/export' },
        ],
      },
      directory: {
        label: 'Business Directory',
        icon: Building,
        path: '/tms/directory',
        permissions: ['read', 'write'],
        description: 'Network of business partners',
        submenu: [
          { label: 'Carriers', path: '/tms/directory/carriers' },
          { label: 'Shippers', path: '/tms/directory/shippers' },
          { label: 'Brokers', path: '/tms/directory/brokers' },
          { label: 'Service Providers', path: '/tms/directory/services' },
        ],
      },
      rates: {
        label: 'Rate Management',
        icon: Calculator,
        path: '/tms/rates',
        permissions: ['read', 'write'],
        description: 'Freight rates and pricing',
        submenu: [
          { label: 'Rate Tables', path: '/tms/rates/tables' },
          { label: 'Rate Negotiation', path: '/tms/rates/negotiation' },
          { label: 'Market Rates', path: '/tms/rates/market' },
          { label: 'Rate History', path: '/tms/rates/history' },
        ],
      },
      marketplace: {
        label: 'Freight Marketplace',
        icon: Globe,
        path: '/tms/marketplace',
        permissions: ['read', 'write'],
        description: 'Buy and sell freight capacity',
        submenu: [
          { label: 'Browse Loads', path: '/tms/marketplace/loads' },
          { label: 'Post Loads', path: '/tms/marketplace/post' },
          { label: 'Market Trends', path: '/tms/marketplace/trends' },
          { label: 'My Listings', path: '/tms/marketplace/listings' },
        ],
      },
      edi: {
        label: 'EDI Integration',
        icon: Server,
        path: '/tms/edi',
        permissions: ['read', 'write'],
        description: 'Electronic data interchange',
        submenu: [
          { label: 'EDI Connections', path: '/tms/edi/connections' },
          { label: 'Data Mapping', path: '/tms/edi/mapping' },
          { label: 'Transaction Logs', path: '/tms/edi/logs' },
          { label: 'EDI Setup', path: '/tms/edi/setup' },
        ],
      },
      financials: {
        label: 'Advanced Financials',
        icon: PieChart,
        path: '/tms/financials',
        permissions: ['read', 'write'],
        description: 'Advanced financial management',
        submenu: [
          { label: 'Financial Dashboard', path: '/tms/financials/dashboard' },
          { label: 'Cash Flow', path: '/tms/financials/cashflow' },
          { label: 'Profit & Loss', path: '/tms/financials/pnl' },
          { label: 'Tax Management', path: '/tms/financials/tax' },
        ],
      },
      crm: {
        label: 'Customer Relationship',
        icon: Users,
        path: '/tms/crm',
        permissions: ['read', 'write'],
        description: 'Customer and partner management',
        submenu: [
          { label: 'Customers', path: '/tms/crm/customers' },
          { label: 'Leads', path: '/tms/crm/leads' },
          { label: 'Opportunities', path: '/tms/crm/opportunities' },
          { label: 'CRM Analytics', path: '/tms/crm/analytics' },
        ],
      },
      loadboard: {
        label: 'Load Board',
        icon: MapPin,
        path: '/tms/loadboard',
        permissions: ['read', 'write'],
        description: 'Freight matching platform',
        submenu: [
          { label: 'Browse Loads', path: '/tms/loadboard/browse' },
          { label: 'Post Loads', path: '/tms/loadboard/post' },
          { label: 'My Posts', path: '/tms/loadboard/myposts' },
          { label: 'Load Board Analytics', path: '/tms/loadboard/analytics' },
        ],
      },
      factoring: {
        label: 'Factoring Services',
        icon: CreditCard,
        path: '/tms/factoring',
        permissions: ['read', 'write'],
        description: 'Invoice factoring and financing',
        submenu: [
          { label: 'Factoring Dashboard', path: '/tms/factoring/dashboard' },
          { label: 'Submit Invoices', path: '/tms/factoring/submit' },
          { label: 'Payment History', path: '/tms/factoring/history' },
          { label: 'Factoring Rates', path: '/tms/factoring/rates' },
        ],
      },
      onboarding: {
        label: 'Onboarding & E-Sign',
        icon: FileCheck,
        path: '/tms/onboarding',
        permissions: ['read', 'write'],
        description: 'Legal documents and contracts',
        submenu: [
          { label: 'E-Sign Documents', path: '/tms/onboarding/esign' },
          { label: 'Contract Management', path: '/tms/onboarding/contracts' },
          { label: 'Compliance', path: '/tms/onboarding/compliance' },
          { label: 'Document Library', path: '/tms/onboarding/documents' },
        ],
      },
      settings: {
        label: 'Settings & Configuration',
        icon: Settings,
        path: '/tms/settings',
        permissions: ['admin'],
        description: 'System settings and preferences',
        submenu: [
          { label: 'User Management', path: '/tms/settings/users' },
          { label: 'Company Settings', path: '/tms/settings/company' },
          { label: 'Function Activation', path: '/tms/settings/functions' },
          { label: 'Integrations', path: '/tms/settings/integrations' },
          { label: 'Notifications', path: '/tms/settings/notifications' },
        ],
      },
    };
  };

  // Get filtered menu based on active functions
  const getFilteredMenuConfig = (activeFunctions: TMSFunction[]) => {
    const allMenuConfig = getAllMenuConfig();
    const filteredMenu: Record<
      string,
      {
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        path: string;
        permissions: string[];
        description: string;
        submenu?: Array<{ label: string; path: string }>;
      }
    > = {};

    activeFunctions.forEach(func => {
      if (allMenuConfig[func as keyof typeof allMenuConfig]) {
        filteredMenu[func] = allMenuConfig[func as keyof typeof allMenuConfig];
      }
    });

    return filteredMenu;
  };

  const menuConfig = getFilteredMenuConfig(state.user?.activeFunctions || []);

  // Event Handlers
  const handleSidebarToggle = () => {
    setState(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }));
  };

  const handleRightSidebarToggle = () => {
    setState(prev => ({ ...prev, rightSidebarCollapsed: !prev.rightSidebarCollapsed }));
  };

  const handleMenuClick = (menuKey: string) => {
    setState(prev => ({
      ...prev,
      activeMenuItem: menuKey,
      currentModule: menuKey,
      expandedMenus: prev.expandedMenus.includes(menuKey)
        ? prev.expandedMenus.filter(item => item !== menuKey)
        : [...prev.expandedMenus, menuKey],
    }));
  };

  const handleSearchChange = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const handleFunctionToggle = (functionName: TMSFunction) => {
    if (!state.user) return;

    const currentFunctions = state.user.activeFunctions;
    const newFunctions = currentFunctions.includes(functionName)
      ? currentFunctions.filter(f => f !== functionName)
      : [...currentFunctions, functionName];

    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, activeFunctions: newFunctions } : null,
    }));
  };

  // Role-based dashboard content
  const renderDashboardContent = () => {
    const role = state.user?.role || 'shipper';

    switch (role) {
      case 'shipper':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Shipments
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$45,230</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Carriers Used
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                  </div>
                  <Truck className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      On-Time Delivery
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'broker':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Loads
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Commission Earned
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$12,450</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Carrier Network
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">156</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Load Match Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                  </div>
                  <Target className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'carrier':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Fleet Size
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
                  </div>
                  <Truck className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Drivers
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">38</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$234,500</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Utilization
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
                  </div>
                  <Activity className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'owner_operator':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Fleet Size
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  </div>
                  <Truck className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Loads
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                  </div>
                  <Package className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Monthly Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$18,750</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Profit Margin
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">23%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Dashboard content not available</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSidebarToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">TMS Core</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {state.user?.role?.replace('_', ' ')} Portal
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={state.searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <img
                  src={state.user?.avatar}
                  alt={state.user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {state.user?.name}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`bg-white dark:bg-slate-800 shadow-sm border-r border-gray-200 dark:border-slate-700 transition-all duration-300 ${
            state.sidebarCollapsed ? 'w-16' : 'w-72'
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {Object.entries(menuConfig).map(([key, menu]) => (
                <li key={key}>
                  <button
                    onClick={() => handleMenuClick(key)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      state.activeMenuItem === key
                        ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <menu.icon className="w-5 h-5 flex-shrink-0" />
                    {!state.sidebarCollapsed && (
                      <>
                        <div className="flex-1 text-left">
                          <span className="font-medium block">{menu.label}</span>
                          {menu.description && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 block">
                              {menu.description}
                            </span>
                          )}
                        </div>
                        {menu.submenu && (
                          <ChevronRight
                            className={`w-4 h-4 flex-shrink-0 transition-transform ${
                              state.expandedMenus.includes(key) ? 'rotate-90' : ''
                            }`}
                          />
                        )}
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {menu.submenu && state.expandedMenus.includes(key) && !state.sidebarCollapsed && (
                    <ul className="ml-8 mt-2 space-y-1">
                      {menu.submenu.map((submenu, index) => (
                        <li key={index}>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            {submenu.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                {state.activeMenuItem} Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {state.user?.name}. Here's what's happening with your{' '}
                {state.user?.role?.replace('_', ' ')} operations.
              </p>
            </div>

            {/* Dashboard Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={state.activeMenuItem}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {state.activeMenuItem === 'dashboard' && renderDashboardContent()}
                {state.activeMenuItem !== 'dashboard' && state.activeMenuItem !== 'settings' && (
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      {menuConfig[state.activeMenuItem as keyof typeof menuConfig]?.label} module is
                      under development.
                    </p>
                  </div>
                )}

                {state.activeMenuItem === 'settings' && (
                  <div className="space-y-6">
                    {/* Function Activation Section */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Function Activation
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                        Activate or deactivate TMS functions based on your role and subscription.
                        Only active functions will appear in the sidebar.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(getAllMenuConfig()).map(([key, menu]) => {
                          if (key === 'dashboard' || key === 'settings') return null; // Always show these

                          const isActive =
                            state.user?.activeFunctions.includes(key as TMSFunction) || false;

                          return (
                            <div
                              key={key}
                              className={`border rounded-lg p-4 transition-all ${
                                isActive
                                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-slate-700/50'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <menu.icon
                                    className={`w-5 h-5 ${
                                      isActive
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-gray-400'
                                    }`}
                                  />
                                  <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                      {menu.label}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      {menu.description}
                                    </p>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleFunctionToggle(key as TMSFunction)}
                                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                    isActive
                                      ? 'border-green-500 bg-green-500'
                                      : 'border-gray-300 dark:border-gray-600'
                                  }`}
                                >
                                  {isActive && <CheckSquare className="w-3 h-3 text-white" />}
                                </button>
                              </div>

                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span
                                  className={`px-2 py-1 rounded ${
                                    isActive
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                  }`}
                                >
                                  {isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Role Information */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Current Role & Subscription
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                          <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {state.user?.role?.replace('_', ' ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Subscription</p>
                          <p className="font-medium text-gray-900 dark:text-white capitalize">
                            {state.user?.subscription}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Active Functions
                          </p>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {state.user?.activeFunctions.length || 0} / 15
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Function Recommendations */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Recommended Functions for {state.user?.role?.replace('_', ' ')}
                      </h3>
                      <div className="space-y-3">
                        {state.user?.role === 'shipper' && (
                          <>
                            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              <div>
                                <p className="font-medium text-blue-900 dark:text-blue-100">
                                  Essential for Shippers
                                </p>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                  Load Management, Financial Management, Communication Hub,
                                  Directory, Rates
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        {state.user?.role === 'broker' && (
                          <>
                            <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                              <div>
                                <p className="font-medium text-purple-900 dark:text-purple-100">
                                  Essential for Brokers
                                </p>
                                <p className="text-sm text-purple-700 dark:text-purple-300">
                                  Load Management, Financial Management, CRM, Load Board,
                                  Marketplace, Directory
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        {state.user?.role === 'carrier' && (
                          <>
                            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                              <div>
                                <p className="font-medium text-green-900 dark:text-green-100">
                                  Essential for Carriers
                                </p>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                  Load Management, Fleet Management, Financial Management, Load
                                  Board, Marketplace
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        {state.user?.role === 'owner_operator' && (
                          <>
                            <div className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                              <div>
                                <p className="font-medium text-orange-900 dark:text-orange-100">
                                  Essential for Owner Operators
                                </p>
                                <p className="text-sm text-orange-700 dark:text-orange-300">
                                  Load Management, Fleet Management, Financial Management, Load
                                  Board, Factoring
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TMSCoreApplication;
