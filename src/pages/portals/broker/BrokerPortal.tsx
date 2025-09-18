import React from 'react';
import { useState } from 'react';
import { ThemeToggle } from '../../../components/common/ThemeToggle';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Bell,
  Settings,
  Plus,
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle,
  Home,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Zap,
  Shield,
  UserPlus,
  FileText,
  Calendar,
  MessageSquare,
  Phone,
  HelpCircle,
  Sun,
  Moon,
  Globe,
  Wifi,
  RefreshCw,
  History,
  Star,
  Heart,
  Flag,
  LogOut,
  User,
  Mail,
  Lock,
  Server,
  MessageCircle,
  Send,
  Video,
  CheckSquare,
  Square,
  Download,
  Upload,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  CreditCard} from 'lucide-react';

import RealTimePortalStatus from '../../../components/RealTimePortalStatus';

function BrokerPortal() {
  const [user] = useState({
    id: 1,
    name: 'Demo User',
    email: 'demo@transbotai.com',
    role: 'admin',
    permissions: ['read', 'write', 'admin'],
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['overview']);
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeCrmTab, setActiveCrmTab] = useState('chat');

  const notifications = [
    {
      id: 1,
      title: 'New broker registered',
      message: 'Acme Corporation has been added',
      time: '5 minutes ago',
      type: 'info'},
    {
      id: 2,
      title: 'Broker status updated',
      message: 'Mark Johnson is now active',
      time: '1 hour ago',
      type: 'success'},
    {
      id: 3,
      title: 'Payment overdue',
      message: 'Invoice #INV-2023-001 is 3 days overdue',
      time: '3 days ago',
      type: 'warning'},
  ];

  const metrics = [
    {
      id: 'active',
      title: 'Active Brokers',
      value: '128',
      change: '+12%',
      changeType: 'increase',
      icon: Activity,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'},
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: '$258,143',
      change: '+8%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200'},
    {
      id: 'efficiency',
      title: 'Satisfaction Rate',
      value: '92%',
      change: '+5%',
      changeType: 'increase',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200'},
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: '7',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'},
  ];

  const performanceData = [
    {
      label: 'Broker Satisfaction',
      value: 92,
      color: 'bg-gradient-to-r from-emerald-400 to-emerald-600'},
    { label: 'Response Time', value: 99.8, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    { label: 'Retention Rate', value: 95, color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    {
      label: 'Support Efficiency',
      value: 83,
      color: 'bg-gradient-to-r from-amber-400 to-amber-600'},
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New broker created',
      details: 'Acme Corporation has been added to your network',
      time: '5 minutes ago',
      type: 'info',
      icon: Plus},
    {
      id: 2,
      action: 'Status updated',
      details: 'Mark Johnson is now active with broker #5678',
      time: '1 hour ago',
      type: 'success',
      icon: CheckCircle},
    {
      id: 3,
      action: 'Payment overdue',
      details: 'Invoice #INV-2023-001 is 3 days overdue',
      time: '3 days ago',
      type: 'warning',
      icon: AlertTriangle},
    {
      id: 4,
      action: 'New user registered',
      details: 'Beta Corp has been added to your network',
      time: 'Yesterday',
      type: 'info',
      icon: Users},
    {
      id: 5,
      action: 'System maintenance',
      details: 'Scheduled maintenance in 2 days',
      time: '2 days ago',
      type: 'warning',
      icon: Settings},
  ];

  // Comprehensive multi-level menu structure
  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      color: 'text-blue-600',
      path: '/overview',
      subMenus: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: BarChart3,
          path: '/overview/dashboard',
          subSubMenus: [
            { id: 'main-dashboard', label: 'Main Dashboard', path: '/overview/dashboard/main' },
            {
              id: 'analytics-dashboard',
              label: 'Analytics Dashboard',
              path: '/overview/dashboard/analytics'},
            {
              id: 'performance-dashboard',
              label: 'Performance Dashboard',
              path: '/overview/dashboard/performance'},
          ]},
        {
          id: 'reports',
          label: 'Reports',
          icon: FileText,
          path: '/overview/reports',
          subSubMenus: [
            { id: 'monthly-reports', label: 'Monthly Reports', path: '/overview/reports/monthly' },
            {
              id: 'quarterly-reports',
              label: 'Quarterly Reports',
              path: '/overview/reports/quarterly'},
            { id: 'annual-reports', label: 'Annual Reports', path: '/overview/reports/annual' },
          ]},
      ]},
    {
      id: 'broker-management',
      label: 'Broker Management',
      icon: Users,
      color: 'text-emerald-600',
      path: '/brokers',
      subMenus: [
        {
          id: 'broker-list',
          label: 'Broker List',
          icon: Users,
          path: '/brokers/list',
          subSubMenus: [
            { id: 'active-brokers', label: 'Active Brokers', path: '/brokers/list/active' },
            { id: 'inactive-brokers', label: 'Inactive Brokers', path: '/brokers/list/inactive' },
            { id: 'pending-brokers', label: 'Pending Brokers', path: '/brokers/list/pending' },
          ]},
        {
          id: 'broker-actions',
          label: 'Broker Actions',
          icon: UserPlus,
          path: '/brokers/actions',
          subSubMenus: [
            { id: 'add-broker', label: 'Add New Broker', path: '/brokers/actions/add' },
            { id: 'import-brokers', label: 'Import Brokers', path: '/brokers/actions/import' },
            { id: 'export-brokers', label: 'Export Brokers', path: '/brokers/actions/export' },
          ]},
        {
          id: 'broker-verification',
          label: 'Verification',
          icon: CheckCircle,
          path: '/brokers/verification',
          subSubMenus: [
            {
              id: 'verify-identity',
              label: 'Verify Identity',
              path: '/brokers/verification/identity'},
            {
              id: 'verify-documents',
              label: 'Verify Documents',
              path: '/brokers/verification/documents'},
            {
              id: 'verify-address',
              label: 'Verify Address',
              path: '/brokers/verification/address'},
          ]},
      ]},
    {
      id: 'communication',
      label: 'Communication',
      icon: MessageSquare,
      color: 'text-purple-600',
      path: '/communication',
      subMenus: [
        {
          id: 'messaging',
          label: 'Messaging',
          icon: MessageSquare,
          path: '/communication/messaging',
          subSubMenus: [
            { id: 'send-message', label: 'Send Message', path: '/communication/messaging/send' },
            {
              id: 'message-history',
              label: 'Message History',
              path: '/communication/messaging/history'},
            {
              id: 'message-templates',
              label: 'Message Templates',
              path: '/communication/messaging/templates'},
          ]},
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          path: '/communication/notifications',
          subSubMenus: [
            {
              id: 'push-notifications',
              label: 'Push Notifications',
              path: '/communication/notifications/push'},
            {
              id: 'email-notifications',
              label: 'Email Notifications',
              path: '/communication/notifications/email'},
            {
              id: 'sms-notifications',
              label: 'SMS Notifications',
              path: '/communication/notifications/sms'},
          ]},
        {
          id: 'support',
          label: 'Support',
          icon: Phone,
          path: '/communication/support',
          subSubMenus: [
            { id: 'ticket-system', label: 'Ticket System', path: '/communication/support/tickets' },
            { id: 'live-chat', label: 'Live Chat', path: '/communication/support/chat' },
            {
              id: 'knowledge-base',
              label: 'Knowledge Base',
              path: '/communication/support/knowledge'},
          ]},
      ]},
    {
      id: 'billing',
      label: 'Billing & Payments',
      icon: CreditCard,
      color: 'text-amber-600',
      path: '/billing',
      subMenus: [
        {
          id: 'invoices',
          label: 'Invoices',
          icon: FileText,
          path: '/billing/invoices',
          subSubMenus: [
            { id: 'create-invoice', label: 'Create Invoice', path: '/billing/invoices/create' },
            { id: 'invoice-history', label: 'Invoice History', path: '/billing/invoices/history' },
            {
              id: 'pending-invoices',
              label: 'Pending Invoices',
              path: '/billing/invoices/pending'},
          ]},
        {
          id: 'payments',
          label: 'Payments',
          icon: DollarSign,
          path: '/billing/payments',
          subSubMenus: [
            { id: 'payment-methods', label: 'Payment Methods', path: '/billing/payments/methods' },
            { id: 'payment-history', label: 'Payment History', path: '/billing/payments/history' },
            { id: 'failed-payments', label: 'Failed Payments', path: '/billing/payments/failed' },
          ]},
        {
          id: 'subscriptions',
          label: 'Subscriptions',
          icon: Calendar,
          path: '/billing/subscriptions',
          subSubMenus: [
            {
              id: 'active-subscriptions',
              label: 'Active Subscriptions',
              path: '/billing/subscriptions/active'},
            {
              id: 'subscription-plans',
              label: 'Subscription Plans',
              path: '/billing/subscriptions/plans'},
            {
              id: 'billing-cycles',
              label: 'Billing Cycles',
              path: '/billing/subscriptions/cycles'},
          ]},
      ]},
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'text-indigo-600',
      path: '/analytics',
      subMenus: [
        {
          id: 'broker-analytics',
          label: 'Broker Analytics',
          icon: Users,
          path: '/analytics/brokers',
          subSubMenus: [
            {
              id: 'broker-behavior',
              label: 'Broker Behavior',
              path: '/analytics/brokers/behavior'},
            {
              id: 'broker-segments',
              label: 'Broker Segments',
              path: '/analytics/brokers/segments'},
            {
              id: 'broker-lifetime',
              label: 'Broker Lifetime Value',
              path: '/analytics/brokers/lifetime'},
          ]},
        {
          id: 'business-analytics',
          label: 'Business Analytics',
          icon: TrendingUp,
          path: '/analytics/business',
          subSubMenus: [
            {
              id: 'revenue-analytics',
              label: 'Revenue Analytics',
              path: '/analytics/business/revenue'},
            {
              id: 'growth-analytics',
              label: 'Growth Analytics',
              path: '/analytics/business/growth'},
            {
              id: 'performance-analytics',
              label: 'Performance Analytics',
              path: '/analytics/business/performance'},
          ]},
      ]},
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'text-gray-600 dark:text-gray-300',
      path: '/settings',
      subMenus: [
        {
          id: 'account-settings',
          label: 'Account Settings',
          icon: Settings,
          path: '/settings/account',
          subSubMenus: [
            {
              id: 'profile-settings',
              label: 'Profile Settings',
              path: '/settings/account/profile'},
            {
              id: 'security-settings',
              label: 'Security Settings',
              path: '/settings/account/security'},
            { id: 'preferences', label: 'Preferences', path: '/settings/account/preferences' },
          ]},
        {
          id: 'system-settings',
          label: 'System Settings',
          icon: Server,
          path: '/settings/system',
          subSubMenus: [
            { id: 'general-settings', label: 'General Settings', path: '/settings/system/general' },
            {
              id: 'integration-settings',
              label: 'Integration Settings',
              path: '/settings/system/integrations'},
            { id: 'backup-settings', label: 'Backup Settings', path: '/settings/system/backup' },
          ]},
      ]},
  ];

  const handleMenuToggle = (menuId: string) => {
    if (expandedMenus.includes(menuId)) {
      setExpandedMenus(expandedMenus.filter(id => id !== menuId));
    } else {
      setExpandedMenus([...expandedMenus, menuId]);
    }
  };

  const handleMenuItemClick = (itemId: string, path: string) => {
    setActiveMenuItem(itemId);
    // Here you would typically handle navigation
    console.log(`Navigating to: ${path}`);
  };

  // CRM Functions Data
  const crmTabs = [
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200'},
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'},
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200'},
    {
      id: 'phone',
      label: 'Phone',
      icon: Phone,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'},
    {
      id: 'text',
      label: 'SMS',
      icon: MessageSquare,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'},
    {
      id: 'video',
      label: 'Video',
      icon: Video,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200'},
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200'},
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      color: 'text-gray-600 dark:text-gray-300',
      bgColor: 'bg-gray-50 dark:bg-slate-700/50',
      borderColor: 'border-gray-200 dark:border-slate-700'},
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hi, I need help with my order',
      time: '2 min ago',
      unread: true},
    {
      id: 2,
      sender: 'Sarah Wilson',
      message: 'Thank you for the quick response!',
      time: '5 min ago',
      unread: false},
    {
      id: 3,
      sender: 'Mike Johnson',
      message: 'Can you check the status?',
      time: '10 min ago',
      unread: true},
  ];

  const emailList = [
    {
      id: 1,
      from: 'broker@example.com',
      subject: 'Order Inquiry',
      time: '1 hour ago',
      unread: true},
    {
      id: 2,
      from: 'support@company.com',
      subject: 'Your order has shipped',
      time: '2 hours ago',
      unread: false},
    {
      id: 3,
      from: 'billing@company.com',
      subject: 'Invoice #12345',
      time: '3 hours ago',
      unread: true},
  ];

  const tasks = [
    { id: 1, title: 'Follow up with John Doe', priority: 'high', due: 'Today', completed: false },
    {
      id: 2,
      title: 'Review broker feedback',
      priority: 'medium',
      due: 'Tomorrow',
      completed: false},
    { id: 3, title: 'Update broker records', priority: 'low', due: 'Next week', completed: true },
  ];

  const recentCalls = [
    {
      id: 1,
      contact: 'John Doe',
      type: 'incoming',
      duration: '5:32',
      time: '10 min ago',
      status: 'completed'},
    {
      id: 2,
      contact: 'Sarah Wilson',
      type: 'outgoing',
      duration: '2:15',
      time: '1 hour ago',
      status: 'completed'},
    {
      id: 3,
      contact: 'Mike Johnson',
      type: 'missed',
      duration: '0:00',
      time: '2 hours ago',
      status: 'missed'},
  ];

  const smsMessages = [
    {
      id: 1,
      contact: 'John Doe',
      message: 'Thanks for the update!',
      time: '5 min ago',
      unread: false},
    {
      id: 2,
      contact: 'Sarah Wilson',
      message: 'When will my order arrive?',
      time: '1 hour ago',
      unread: true},
  ];

  const calendarEvents = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today', type: 'meeting' },
    { id: 2, title: 'Broker Call', time: '2:00 PM', date: 'Today', type: 'call' },
    { id: 3, title: 'Project Review', time: '4:00 PM', date: 'Tomorrow', type: 'review' },
  ];

  const notes = [
    {
      id: 1,
      title: 'Broker Meeting Notes',
      content: 'Discussed new features...',
      updated: '2 hours ago'},
    {
      id: 2,
      title: 'Project Ideas',
      content: 'Brainstorming session notes...',
      updated: '1 day ago'},
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
      case 'warning':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      {/* Enhanced Header - Responsive */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40 responsive-container">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 responsive-container">
          <div className="flex justify-between items-center responsive-container">
            <div className="flex items-center space-x-2 sm:space-x-4 responsive-container">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Button"
                className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm responsive-container"
              >
                <svg className="h-5 w-5 responsive-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3 responsive-container">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg responsive-container">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white responsive-container" />
                </div>
                <div className="hidden sm:block responsive-container">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent responsive-container">
                    TransAI
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium responsive-container">
                    Broker Portal
                  </p>
                </div>
                <div className="sm:hidden responsive-container">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent responsive-container">
                    Trans
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 responsive-container">
              {/* Search Bar - Responsive */}
              <div className="relative hidden md:block responsive-container">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
                <input
                  type="text"
                  placeholder="Search brokers, orders, reports..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-48 lg:w-80 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm responsive-container"
                />
              </div>
              {/* Mobile Search Button */}
              <button className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm responsive-container" aria-label="Button">
                <Search className="h-5 w-5 responsive-container" />
              </button>

              {/* Action Icons - Responsive */}
              <div className="flex items-center space-x-1 responsive-container">
                {/* Refresh Button */}
                <button
                  onClick={() => window.location.reload()}
            aria-label="Button"
                  className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 responsive-container" />
                </button>

                {/* Download Button - Hidden on mobile */}
                <button
                  className="hidden sm:block p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Download Reports"
                 aria-label="Button">
                  <Download className="h-5 w-5 responsive-container" />
                </button>

                {/* Upload Button - Hidden on mobile */}
                <button
                  className="hidden sm:block p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Upload Data"
                 aria-label="Button">
                  <Upload className="h-5 w-5 responsive-container" />
                </button>

                {/* Share Button - Hidden on mobile */}
                <button
                  className="hidden sm:block p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Share Dashboard"
                 aria-label="Button">
                  <Share2 className="h-5 w-5 responsive-container" />
                </button>

                {/* Bookmark Button */}
                <button
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Bookmark"
                 aria-label="Button">
                  <Bookmark className="h-5 w-5 responsive-container" />
                </button>

                {/* History Button */}
                <button
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Recent Activity"
                 aria-label="Button">
                  <History className="h-5 w-5 responsive-container" />
                </button>

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label="Button"
                  className={`p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors ${
                    soundEnabled ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'
                  }`}
                  title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
                >
                  {soundEnabled ? <Volume2 className="h-5 w-5 responsive-container" /> : <VolumeX className="h-5 w-5 responsive-container" />}
                </button>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
            aria-label="Button"
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title={darkMode ? 'Light Mode' : 'Dark Mode'}
                >
                  {darkMode ? <Sun className="h-5 w-5 responsive-container" /> : <Moon className="h-5 w-5 responsive-container" />}
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setFullscreen(!fullscreen)}
            aria-label="Button"
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title={fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {fullscreen ? (
                    <Minimize2 className="h-5 w-5 responsive-container" />
                  ) : (
                    <Maximize2 className="h-5 w-5 responsive-container" />
                  )}
                </button>

                {/* Help Button */}
                <button
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                  title="Help & Support"
                 aria-label="Button">
                  <HelpCircle className="h-5 w-5 responsive-container" />
                </button>

                {/* Notifications */}
                <button className="relative p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container" aria-label="Button">
                  <Bell className="h-5 w-5 responsive-container" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse responsive-container"></span>
                  )}
                </button>

                {/* Settings Dropdown */}
                <div className="relative responsive-container">
                  {/* Theme Toggle */}
                  <ThemeToggle size="sm" />

                  <button
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            aria-label="Button"
                    className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                    title="Settings"
                  >
                    <Settings className="h-5 w-5 responsive-container" />
                  </button>

                  {/* Settings Dropdown Menu */}
                  {showSettingsMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50 responsive-container">
                      <div className="px-4 py-2 border-b border-gray-100 responsive-container">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                          Settings
                        </h3>
                      </div>
                      <div className="py-1 responsive-container">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <User className="h-4 w-4 responsive-container" />
                          <span>Profile Settings</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Lock className="h-4 w-4 responsive-container" />
                          <span>Security</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Globe className="h-4 w-4 responsive-container" />
                          <span>Language</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Wifi className="h-4 w-4 responsive-container" />
                          <span>Network</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Star className="h-4 w-4 responsive-container" />
                          <span>Preferences</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Profile Section */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-slate-700 responsive-container">
                <div className="relative responsive-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Button"
                    className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-xl p-2 transition-colors responsive-container"
                  >
                    <img
                      className="h-10 w-10 rounded-xl shadow-md responsive-container"
                      src={user.avatar}
                      alt={user.name}
                    / alt="Image">
                    <div className="hidden md:block text-left responsive-container">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium responsive-container">{user.role}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 responsive-container" />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50 responsive-container">
                      <div className="px-4 py-3 border-b border-gray-100 responsive-container">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 responsive-container">{user.email}</p>
                      </div>
                      <div className="py-1 responsive-container">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <User className="h-4 w-4 responsive-container" />
                          <span>My Profile</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Mail className="h-4 w-4 responsive-container" />
                          <span>Messages</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Heart className="h-4 w-4 responsive-container" />
                          <span>Favorites</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <Flag className="h-4 w-4 responsive-container" />
                          <span>Reports</span>
                        </button>
                        <div className="border-t border-gray-100 my-1 responsive-container"></div>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 responsive-container" aria-label="Button">
                          <LogOut className="h-4 w-4 responsive-container" />
                          <span>Sign Out</span>
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

      <div className="flex relative responsive-container">
        {/* Enhanced Permanent Sidebar - Responsive */}
        <aside
          className={`${sidebarCollapsed ? 'w-16' : 'w-64 lg:w-72'} bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg shadow-xl border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ease-in-out sticky top-20 h-[calc(100vh-5rem)] z-30 hidden md:block`}
        >
          <div className="flex flex-col h-full responsive-container">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-700/50 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2 responsive-container">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center responsive-container">
                      <Zap className="h-4 w-4 text-white responsive-container" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 responsive-container">
                      Navigation
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Button"
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors responsive-container"
                >
                  <ChevronRight
                    className={`h-4 w-4 text-gray-500 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Multi-Level Navigation Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto responsive-container">
              {menuItems.map(menuItem => {
                const Icon = menuItem.icon;
                const isExpanded = expandedMenus.includes(menuItem.id);
                const isActive = activeMenuItem === menuItem.id;

                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <div key={menuItem.id} className="space-y-1 responsive-container">
                    {/* Main Menu Item */}
                    <div className="space-y-1 responsive-container">
                      <button
                        onClick={() => {
                          if (menuItem.subMenus && menuItem.subMenus.length > 0) {
                            handleMenuToggle(menuItem.id);
                          }
            aria-label="Button" else {
                            handleMenuItemClick(menuItem.id, menuItem.path);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 shadow-sm'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-3 responsive-container">
                          <Icon
                            className={`h-5 w-5 ${isActive ? menuItem.color : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                          />
                          {!sidebarCollapsed && (
                            <span
                              className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:text-gray-100'}`}
                            >
                              {menuItem.label}
                            </span>
                          )}
                        </div>
                        {!sidebarCollapsed && menuItem.subMenus && menuItem.subMenus.length > 0 && (
                          <ChevronRight
                            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                          />
                        )}
                      </button>
                    </div>

                    {/* Sub-Menus */}
                    {!sidebarCollapsed && isExpanded && menuItem.subMenus && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-4 responsive-container"
                      >
                        {menuItem.subMenus.map(subMenu => {
                          const SubIcon = subMenu.icon;
                          const isSubExpanded = expandedMenus.includes(subMenu.id);
                          const isSubActive = activeMenuItem === subMenu.id;

                          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                            <div key={subMenu.id} className="space-y-1 responsive-container">
                              {/* Sub-Menu Item */}
                              <button
                                onClick={() => {
                                  if (subMenu.subSubMenus && subMenu.subSubMenus.length > 0) {
                                    handleMenuToggle(subMenu.id);
                                  }
            aria-label="Button" else {
                                    handleMenuItemClick(subMenu.id, subMenu.path);
                                  }
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 group ${
                                  isSubActive
                                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 shadow-sm'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-center space-x-3 responsive-container">
                                  <SubIcon
                                    className={`h-4 w-4 ${isSubActive ? 'text-emerald-600' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                                  />
                                  <span
                                    className={`text-sm font-medium ${isSubActive ? 'text-emerald-700' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:text-gray-200'}`}
                                  >
                                    {subMenu.label}
                                  </span>
                                </div>
                                {subMenu.subSubMenus && subMenu.subSubMenus.length > 0 && (
                                  <ChevronRight
                                    className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isSubExpanded ? 'rotate-90' : ''}`}
                                  />
                                )}
                              </button>

                              {/* Sub-Sub-Menus */}
                              {isSubExpanded && subMenu.subSubMenus && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-4 responsive-container"
                                >
                                  {subMenu.subSubMenus.map(subSubMenu => {
                                    const isSubSubActive = activeMenuItem === subSubMenu.id;

                                    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                                      <button
                                        key={subSubMenu.id}
                                        onClick={() => handleMenuItemClick(subSubMenu.id, subSubMenu.path)
                                        }
            aria-label="Button"
                                        className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-md transition-all duration-200 group ${
                                          isSubSubActive
                                            ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 shadow-sm'
                                            : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                                        }`}
                                      >
                                        <div className="h-2 w-2 rounded-full bg-gray-400 group-hover:bg-gray-600 responsive-container" />
                                        <span
                                          className={`text-xs font-medium ${isSubSubActive ? 'text-purple-700' : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                                        >
                                          {subSubMenu.label}
                                        </span>
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-slate-700/50 responsive-container">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 dark:border-slate-700 responsive-container">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center responsive-container">
                  <Shield className="h-4 w-4 text-white responsive-container" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 responsive-container">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 responsive-container">
                      MCP 251 Agents
                    </p>
                    <p className="text-xs text-gray-500 responsive-container">24/7 Active</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {!sidebarCollapsed && (
          <div className="md:hidden fixed inset-0 z-50 responsive-container">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm responsive-container"
              onClick={() => setSidebarCollapsed(true)}
            />
            {/* Mobile Sidebar */}
            <aside className="absolute left-0 top-0 w-80 h-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg shadow-2xl border-r border-gray-200 dark:border-slate-700/50 responsive-container">
              <div className="flex flex-col h-full responsive-container">
                {/* Mobile Sidebar Header */}
                <div className="p-4 border-b border-gray-200 dark:border-slate-700/50 responsive-container">
                  <div className="flex items-center justify-between responsive-container">
                    <div className="flex items-center space-x-3 responsive-container">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg responsive-container">
                        <Users className="h-6 w-6 text-white responsive-container" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent responsive-container">
                          TransAI
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium responsive-container">
                          Broker Portal
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSidebarCollapsed(true)}
            aria-label="Button"
                      className="p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm responsive-container"
                    >
                      <svg
                        className="h-5 w-5 responsive-container"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Mobile Navigation - Same as desktop but full width */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto responsive-container">
                  {menuItems.map(menuItem => {
                    const isActive = activeMenuItem === menuItem.id;
                    const isExpanded = expandedMenus.includes(menuItem.id);

                    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                      <div key={menuItem.id} className="space-y-1 responsive-container">
                        {/* Main Menu Item */}
                        <div className="space-y-1 responsive-container">
                          <button
                            onClick={() => handleMenuToggle(menuItem.id)}
            aria-label="Button"
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <div className="flex items-center space-x-3 responsive-container">
                              <menuItem.icon
                                className={`h-5 w-5 ${isActive ? 'text-white' : menuItem.color}`}
                              />
                              <span className="font-medium responsive-container">{menuItem.label}</span>
                            </div>
                            {menuItem.subMenus && menuItem.subMenus.length > 0 && (
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-gray-400'}`}
                              />
                            )}
                          </button>

                          {/* Sub-menus */}
                          {isExpanded && menuItem.subMenus && (
                            <div className="ml-4 space-y-1 responsive-container">
                              {menuItem.subMenus.map(subMenu => {
                                const isSubActive = activeMenuItem === subMenu.id;
                                const isSubExpanded = expandedMenus.includes(subMenu.id);

                                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                                  <div key={subMenu.id} className="space-y-1 responsive-container">
                                    {/* Sub-Menu Item */}
                                    <button
                                      onClick={() => {
                                        if (subMenu.subSubMenus && subMenu.subSubMenus.length > 0) {
                                          handleMenuToggle(subMenu.id);
                                        }
            aria-label="Button" else {
                                          handleMenuItemClick(subMenu.id, subMenu.path);
                                        }
                                      }}
                                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${
                                        isSubActive
                                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
                                          : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                                      }`}
                                    >
                                      <div className="flex items-center space-x-2 responsive-container">
                                        <subMenu.icon
                                          className={`h-4 w-4 ${isSubActive ? 'text-white' : 'text-gray-500'}`}
                                        />
                                        <span className="text-sm font-medium responsive-container">{subMenu.label}</span>
                                      </div>
                                      {subMenu.subSubMenus && subMenu.subSubMenus.length > 0 && (
                                        <ChevronDown
                                          className={`h-3 w-3 transition-transform duration-200 ${isSubExpanded ? 'rotate-180' : ''} ${isSubActive ? 'text-white' : 'text-gray-400'}`}
                                        />
                                      )}
                                    </button>

                                    {/* Sub-sub-menus */}
                                    {isSubExpanded && subMenu.subSubMenus && (
                                      <div className="ml-4 space-y-1 responsive-container">
                                        {subMenu.subSubMenus.map(subSubMenu => {
                                          const isSubSubActive = activeMenuItem === subSubMenu.id;

                                          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                                            <button
                                              key={subSubMenu.id}
                                              onClick={() => handleMenuItemClick(subSubMenu.id, subSubMenu.path)
                                              }
            aria-label="Button"
                                              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 group ${
                                                isSubSubActive
                                                  ? 'bg-gradient-to-r from-blue-300 to-purple-400 text-white shadow-sm'
                                                  : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-500 hover:text-gray-700 dark:text-gray-300'
                                              }`}
                                            >
                                              <div
                                                className={`h-3 w-3 rounded-full ${isSubSubActive ? 'bg-white' : 'bg-gray-400'}`}
                                              ></div>
                                              <span className="text-xs font-medium responsive-container">
                                                {subSubMenu.label}
                                              </span>
                                            </button>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area - Responsive */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 responsive-container">
          {/* Real-time Status */}
          <RealTimePortalStatus portalId="broker" />

          {/* Dashboard Header - Responsive */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 responsive-container">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 responsive-container">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent responsive-container">
                  Dashboard
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 responsive-container">
                  Welcome back, {user.name}! Here's what's happening with your Broker Portal.
                </p>
              </div>
              <div className="flex items-center space-x-2 responsive-container">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse responsive-container"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium responsive-container">Live</span>
              </div>
            </div>
          </div>

          {/* Enhanced Metrics Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 responsive-container">
            {metrics.map(metric => {
              const Icon = metric.icon;
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${metric.bgColor} ${metric.borderColor} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-center justify-between responsive-container">
                    <div
                      className={`p-3 rounded-xl ${metric.bgColor} border ${metric.borderColor}`}
                    >
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <div
                      className={`text-sm font-semibold ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {metric.change}
                    </div>
                  </div>
                  <div className="mt-4 responsive-container">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 responsive-container">{metric.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Navigation Tabs */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 responsive-container">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl responsive-container">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id, item.path)}
            aria-label="Button"
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeMenuItem === item.id
                      ? 'bg-white shadow-sm text-blue-600 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100 hover:bg-white/50'
                  }`}
                >
                  <item.icon className="h-4 w-4 responsive-container" />
                  <span className="text-sm responsive-container">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container">
            {/* Performance Overview */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 responsive-container">
              <div className="flex items-center justify-between mb-6 responsive-container">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                    Performance Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm responsive-container">
                    Key performance indicators for Broker Portal
                  </p>
                </div>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center responsive-container">
                  <BarChart3 className="h-4 w-4 text-white responsive-container" />
                </div>
              </div>

              <div className="space-y-4 responsive-container">
                {performanceData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2 responsive-container"
                  >
                    <div className="flex justify-between items-center responsive-container">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100 responsive-container">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden responsive-container">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full ${item.color} rounded-full shadow-sm`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50 responsive-container">
              <div className="flex items-center justify-between mb-6 responsive-container">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                    Recent Activity
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm responsive-container">
                    Latest updates and notifications
                  </p>
                </div>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center responsive-container">
                  <Activity className="h-4 w-4 text-white responsive-container" />
                </div>
              </div>

              <div className="space-y-4 responsive-container">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-start space-x-3 p-4 rounded-xl border ${getStatusColor(activity.type)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                    >
                      <div
                        className={`p-2 rounded-lg ${getStatusColor(activity.type).split(' ')[1]}`}
                      >
                        <Icon
                          className={`h-4 w-4 ${getStatusColor(activity.type).split(' ')[0]}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0 responsive-container">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 responsive-container">
                          {activity.details}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 responsive-container">{activity.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Right CRM Sidebar - Responsive */}
        {rightSidebarCollapsed ? (
          /* Collapsed State - Only Toggle Button */
          <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto responsive-container">
            <button
              onClick={e = aria-label="Button"> {
                e.stopPropagation();
                e.preventDefault();
                console.log('Toggle button clicked - opening sidebar');
                setRightSidebarCollapsed(false);
              }}
              onMouseDown={e => e.stopPropagation()}
              onMouseUp={e => e.stopPropagation()}
              className="group p-2 sm:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-700/50 transition-all duration-300 hover:scale-110 pointer-events-auto responsive-container"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 transition-transform duration-300 group-hover:-translate-x-0.5 responsive-container" />
            </button>
          </div>
        ) : (
          /* Expanded State - Full CRM Sidebar */
          <aside className="bg-gradient-to-b from-white/95 via-white/90 to-white/85 backdrop-blur-xl shadow-2xl border-l border-gradient-to-b from-purple-200/50 via-pink-200/30 to-indigo-200/50 sticky top-20 h-[calc(100vh-5rem)] z-30 w-72 sm:w-80 transition-all duration-500 ease-out hidden lg:block responsive-container">
            <div className="flex flex-col h-full relative overflow-hidden responsive-container">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5 responsive-container">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 responsive-container"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl animate-pulse responsive-container"></div>
                <div className="absolute bottom-20 left-8 w-24 h-24 bg-pink-300 rounded-full blur-2xl animate-pulse delay-1000 responsive-container"></div>
                <div className="absolute top-1/2 right-4 w-16 h-16 bg-indigo-300 rounded-full blur-xl animate-pulse delay-500 responsive-container"></div>
              </div>

              {/* Enhanced CRM Sidebar Header */}
              <div className="relative p-4 border-b border-gradient-to-r from-purple-200/50 to-pink-200/50 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm responsive-container">
                <div className="flex items-center justify-between responsive-container">
                  <div className="flex items-center space-x-3 responsive-container">
                    <div className="relative responsive-container">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg responsive-container">
                        <MessageCircle className="h-5 w-5 text-white responsive-container" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse responsive-container"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent responsive-container">
                        CRM Command Center
                      </h3>
                      <p className="text-xs text-gray-500 font-medium responsive-container">All systems active</p>
                    </div>
                  </div>
                  <button
                    onClick={e = aria-label="Button"> {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log('Close button clicked - closing sidebar');
                      setRightSidebarCollapsed(true);
                    }}
                    onMouseDown={e => e.stopPropagation()}
                    onMouseUp={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm responsive-container"
                  >
                    <ChevronRight className="h-4 w-4 transition-all duration-300 rotate-180 responsive-container" />
                  </button>
                </div>
              </div>

              {/* Enhanced CRM Tabs */}
              <div className="relative p-4 border-b border-gradient-to-r from-purple-200/30 to-pink-200/30 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm responsive-container">
                <div className="grid grid-cols-2 gap-3 responsive-container">
                  {crmTabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeCrmTab === tab.id;
                    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                      <motion.button
                        key={tab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setActiveCrmTab(tab.id)}
                        className={`group relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden ${
                          isActive
                            ? `${tab.bgColor} ${tab.borderColor} border-2 shadow-lg transform scale-105`
                            : 'hover:bg-white/70 hover:shadow-md hover:scale-102 backdrop-blur-sm border border-transparent'
                        }`}
                      >
                        {/* Animated Background */}
                        <div
                          className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-white/80 to-white/60'
                              : 'bg-gradient-to-br from-white/40 to-white/20 group-hover:from-white/60 group-hover:to-white/40'
                          }`}
                        ></div>

                        {/* Icon with enhanced styling */}
                        <div
                          className={`relative p-2 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-white/90 to-white/70 shadow-md'
                              : 'bg-white/50 group-hover:bg-white/70 group-hover:shadow-sm'
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 transition-all duration-300 ${
                              isActive
                                ? tab.color
                                : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'
                            }`}
                          />
                          {isActive && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent responsive-container"></div>
                          )}
                        </div>

                        {!rightSidebarCollapsed && (
                          <div className="relative flex-1 responsive-container">
                            <span
                              className={`text-xs font-semibold transition-all duration-300 ${
                                isActive
                                  ? tab.color
                                  : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              {tab.label}
                            </span>
                            {isActive && (
                              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-50 responsive-container"></div>
                            )}
                          </div>
                        )}

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse responsive-container"></div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced CRM Content */}
              <div className="flex-1 p-4 overflow-y-auto relative responsive-container">
                {/* Content Background Pattern */}
                <div className="absolute inset-0 opacity-3 responsive-container">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-100/20 to-pink-100/20 responsive-container"></div>
                </div>

                {!rightSidebarCollapsed && activeCrmTab === 'chat' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 relative responsive-container"
                  >
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm border border-blue-200/50 responsive-container">
                      <h3 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent responsive-container">
                        Live Chat
                      </h3>
                      <div className="flex items-center space-x-2 responsive-container">
                        <div className="relative responsive-container">
                          <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse responsive-container"></div>
                          <div className="absolute inset-0 h-3 w-3 bg-green-400 rounded-full animate-ping opacity-75 responsive-container"></div>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium responsive-container">
                          Online
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 responsive-container">
                      {chatMessages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`group relative p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-md ${
                            msg.unread
                              ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 border-blue-200/70 shadow-sm'
                              : 'bg-gradient-to-br from-white/70 to-gray-50/70 border-gray-200 dark:border-slate-700/50 hover:from-white/80 hover:to-gray-50/80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2 responsive-container">
                            <div className="flex items-center space-x-2 responsive-container">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                  msg.unread
                                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                                }`}
                              >
                                {msg.sender
                                  .split(' ')
                                  .map(n => n[0])
                                  .join('')}
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                                {msg.sender}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 font-medium responsive-container">{msg.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed responsive-container">
                            {msg.message}
                          </p>
                          {msg.unread && (
                            <div className="absolute top-3 right-3 h-2 w-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse responsive-container"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex space-x-3 p-3 rounded-2xl bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 responsive-container">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 dark:border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/50 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm transition-all duration-300 responsive-container"
                      />
                      <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 responsive-container" aria-label="Button">
                        <Send className="h-4 w-4 responsive-container" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'email' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Email
                      </h3>
                      <button className="px-3 py-1 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors responsive-container" aria-label="Button">
                        <Plus className="h-3 w-3 inline mr-1 responsive-container" />
                        Compose
                      </button>
                    </div>
                    <div className="space-y-2 responsive-container">
                      {emailList.map(email => (
                        <div
                          key={email.id}
                          className={`p-3 rounded-lg border ${email.unread ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 border-gray-200 dark:border-slate-700'}`}
                        >
                          <div className="flex items-center justify-between mb-1 responsive-container">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                              {email.from}
                            </span>
                            <span className="text-xs text-gray-500 responsive-container">{email.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 responsive-container">
                            {email.subject}
                          </p>
                          {email.unread && (
                            <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2 responsive-container"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'tasks' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Tasks
                      </h3>
                      <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors responsive-container" aria-label="Button">
                        <Plus className="h-3 w-3 inline mr-1 responsive-container" />
                        Add Task
                      </button>
                    </div>
                    <div className="space-y-2 responsive-container">
                      {tasks.map(task => (
                        <div
                          key={task.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 responsive-container"
                        >
                          <div className="flex items-center space-x-2 mb-2 responsive-container">
                            <button
                              className={`p-1 rounded ${task.completed ? 'text-green-600' : 'text-gray-400'}`}
                             aria-label="Button">
                              {task.completed ? (
                                <CheckSquare className="h-4 w-4 responsive-container" />
                              ) : (
                                <Square className="h-4 w-4 responsive-container" />
                              )}
                            </button>
                            <span
                              className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}
                            >
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center justify-between responsive-container">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                task.priority === 'high'
                                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-600'
                                    : 'bg-green-100 text-green-600'
                              }`}
                            >
                              {task.priority}
                            </span>
                            <span className="text-xs text-gray-500 responsive-container">{task.due}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'phone' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Phone
                      </h3>
                      <div className="flex space-x-1 responsive-container">
                        <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container" aria-label="Button">
                          <Phone className="h-4 w-4 responsive-container" />
                        </button>
                        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container" aria-label="Button">
                          <Video className="h-4 w-4 responsive-container" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 responsive-container">
                      {recentCalls.map(call => (
                        <div
                          key={call.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 responsive-container"
                        >
                          <div className="flex items-center justify-between mb-1 responsive-container">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                              {call.contact}
                            </span>
                            <span className="text-xs text-gray-500 responsive-container">{call.time}</span>
                          </div>
                          <div className="flex items-center justify-between responsive-container">
                            <div className="flex items-center space-x-2 responsive-container">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  call.type === 'incoming'
                                    ? 'bg-green-400'
                                    : call.type === 'outgoing'
                                      ? 'bg-blue-400'
                                      : 'bg-red-400'
                                }`}
                              ></div>
                              <span className="text-xs text-gray-600 dark:text-gray-300 responsive-container">
                                {call.type}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 responsive-container">{call.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'text' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        SMS
                      </h3>
                      <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors responsive-container" aria-label="Button">
                        <Plus className="h-3 w-3 inline mr-1 responsive-container" />
                        New SMS
                      </button>
                    </div>
                    <div className="space-y-2 responsive-container">
                      {smsMessages.map(sms => (
                        <div
                          key={sms.id}
                          className={`p-3 rounded-lg border ${sms.unread ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-gray-50 border-gray-200 dark:border-slate-700'}`}
                        >
                          <div className="flex items-center justify-between mb-1 responsive-container">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                              {sms.contact}
                            </span>
                            <span className="text-xs text-gray-500 responsive-container">{sms.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 responsive-container">{sms.message}</p>
                          {sms.unread && (
                            <div className="h-2 w-2 bg-indigo-500 rounded-full mt-2 responsive-container"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'video' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Video Calls
                      </h3>
                      <button className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors responsive-container" aria-label="Button">
                        <Video className="h-3 w-3 inline mr-1 responsive-container" />
                        Start Call
                      </button>
                    </div>
                    <div className="space-y-2 responsive-container">
                      <div className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 responsive-container">
                        <div className="flex items-center space-x-2 mb-2 responsive-container">
                          <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center responsive-container">
                            <Video className="h-4 w-4 text-red-600 responsive-container" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                              Team Meeting
                            </p>
                            <p className="text-xs text-gray-500 responsive-container">Starting in 5 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'calendar' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Calendar
                      </h3>
                      <button className="px-3 py-1 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors responsive-container" aria-label="Button">
                        <Plus className="h-3 w-3 inline mr-1 responsive-container" />
                        Add Event
                      </button>
                    </div>
                    <div className="space-y-2 responsive-container">
                      {calendarEvents.map(event => (
                        <div
                          key={event.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 responsive-container"
                        >
                          <div className="flex items-center justify-between mb-1 responsive-container">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                              {event.title}
                            </span>
                            <span className="text-xs text-gray-500 responsive-container">{event.time}</span>
                          </div>
                          <div className="flex items-center justify-between responsive-container">
                            <span className="text-xs text-gray-600 dark:text-gray-300 responsive-container">
                              {event.date}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                event.type === 'meeting'
                                  ? 'bg-blue-100 text-blue-600'
                                  : event.type === 'call'
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-purple-100 text-purple-600'
                              }`}
                            >
                              {event.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'notes' && (
                  <div className="space-y-3 responsive-container">
                    <div className="flex items-center justify-between responsive-container">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Notes
                      </h3>
                      <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors responsive-container" aria-label="Button">
                        <Plus className="h-3 w-3 inline mr-1 responsive-container" />
                        New Note
                      </button>
                    </div>
                    <div className="space-y-2 responsive-container">
                      {notes.map(note => (
                        <div
                          key={note.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 responsive-container"
                        >
                          <div className="flex items-center justify-between mb-1 responsive-container">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container">
                              {note.title}
                            </span>
                            <span className="text-xs text-gray-500 responsive-container">{note.updated}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 responsive-container">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced CRM Sidebar Footer */}
              <div className="relative p-4 border-t border-gradient-to-r from-purple-200/50 to-pink-200/50 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm responsive-container">
                <div className="relative flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-br from-purple-50/90 via-pink-50/80 to-indigo-50/90 border border-purple-200/50 shadow-lg backdrop-blur-sm overflow-hidden responsive-container">
                  {/* Animated background elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-xl animate-pulse responsive-container"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-lg animate-pulse delay-1000 responsive-container"></div>

                  <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg responsive-container">
                    <Zap className="h-5 w-5 text-white responsive-container" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent responsive-container"></div>
                  </div>

                  {!rightSidebarCollapsed && (
                    <div className="flex-1 relative responsive-container">
                      <p className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent responsive-container">
                        CRM Command Center
                      </p>
                      <div className="flex items-center space-x-2 mt-1 responsive-container">
                        <div className="flex space-x-1 responsive-container">
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse responsive-container"></div>
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse delay-100 responsive-container"></div>
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse delay-200 responsive-container"></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium responsive-container">
                          All systems operational
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status indicator */}
                  <div className="relative responsive-container">
                    <div className="h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse responsive-container"></div>
                    <div className="absolute inset-0 h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-ping opacity-75 responsive-container"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile CRM Sidebar Overlay */}
        {!rightSidebarCollapsed && (
          <div className="lg:hidden fixed inset-0 z-50 responsive-container">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm responsive-container"
              onClick={() => setRightSidebarCollapsed(true)}
            />
            {/* Mobile CRM Sidebar */}
            <aside className="absolute right-0 top-0 w-80 h-full bg-gradient-to-b from-white/95 via-white/90 to-white/85 backdrop-blur-xl shadow-2xl border-l border-gradient-to-b from-purple-200/50 via-pink-200/30 to-indigo-200/50 responsive-container">
              <div className="flex flex-col h-full relative overflow-hidden responsive-container">
                {/* Mobile CRM Header */}
                <div className="relative p-4 border-b border-gradient-to-r from-purple-200/50 to-pink-200/50 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm responsive-container">
                  <div className="flex items-center justify-between responsive-container">
                    <div className="flex items-center space-x-3 responsive-container">
                      <div className="relative responsive-container">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg responsive-container">
                          <MessageCircle className="h-5 w-5 text-white responsive-container" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse responsive-container"></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent responsive-container">
                          CRM Command Center
                        </h3>
                        <p className="text-xs text-gray-500 font-medium responsive-container">All systems active</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setRightSidebarCollapsed(true)}
            aria-label="Button"
                      className="p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm responsive-container"
                    >
                      <ChevronRight className="h-4 w-4 transition-all duration-300 rotate-180 responsive-container" />
                    </button>
                  </div>
                </div>

                {/* Mobile CRM Tabs */}
                <div className="relative p-4 border-b border-gradient-to-r from-purple-200/30 to-pink-200/30 bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm responsive-container">
                  <div className="grid grid-cols-2 gap-3 responsive-container">
                    {crmTabs.map((tab, index) => {
                      const Icon = tab.icon;
                      const isActive = activeCrmTab === tab.id;
                      return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                        <motion.button
                          key={tab.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setActiveCrmTab(tab.id)}
                          className={`group relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden ${
                            isActive
                              ? `${tab.bgColor} ${tab.borderColor} border-2 shadow-lg transform scale-105`
                              : 'hover:bg-white/70 hover:shadow-md hover:scale-102 backdrop-blur-sm border border-transparent'
                          }`}
                        >
                          {/* Animated Background */}
                          <div
                            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-br from-white/80 to-white/60'
                                : 'bg-gradient-to-br from-white/40 to-white/20 group-hover:from-white/60 group-hover:to-white/40'
                            }`}
                          ></div>

                          {/* Icon with enhanced styling */}
                          <div
                            className={`relative p-2 rounded-xl transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-br from-white/90 to-white/70 shadow-md'
                                : 'bg-white/50 group-hover:bg-white/70 group-hover:shadow-sm'
                            }`}
                          >
                            <Icon
                              className={`h-4 w-4 transition-all duration-300 ${
                                isActive
                                  ? tab.color
                                  : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'
                              }`}
                            />
                            {isActive && (
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent responsive-container"></div>
                            )}
                          </div>

                          <div className="relative flex-1 responsive-container">
                            <span
                              className={`text-xs font-semibold transition-all duration-300 ${
                                isActive
                                  ? tab.color
                                  : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              {tab.label}
                            </span>
                            {isActive && (
                              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-50 responsive-container"></div>
                            )}
                          </div>

                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse responsive-container"></div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile CRM Content */}
                <div className="flex-1 p-4 overflow-y-auto relative responsive-container">
                  {/* Content Background Pattern */}
                  <div className="absolute inset-0 opacity-3 responsive-container">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-100/20 to-pink-100/20 responsive-container"></div>
                  </div>

                  {activeCrmTab === 'chat' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 relative responsive-container"
                    >
                      <div className="text-center py-8 responsive-container">
                        <div className="text-gray-500 text-sm responsive-container">Chat functionality</div>
                        <div className="text-xs text-gray-400 mt-2 responsive-container">Available on desktop</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Other CRM tabs content would go here - simplified for mobile */}
                  {activeCrmTab !== 'chat' && (
                    <div className="text-center py-8 responsive-container">
                      <div className="text-gray-500 text-sm responsive-container">
                        {activeCrmTab.charAt(0).toUpperCase() + activeCrmTab.slice(1)} functionality
                      </div>
                      <div className="text-xs text-gray-400 mt-2 responsive-container">Available on desktop</div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrokerPortal;