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
  FileText,
  CreditCard,
  Calendar,
  MessageSquare,
  Phone,
  HelpCircle,
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
  MessageCircle,
  Send,
  Video,
  CheckSquare,
  Square,
  Building2,
  Brain,
  Bot,
  Cpu,
  FileCheck,
  Truck,
  Package,
  Network,
  MapPin,
} from 'lucide-react';

function SuperAdminPortal() {
  const [user] = useState({
    id: 1,
    name: 'Super Admin',
    email: 'admin@transbotai.com',
    role: 'super-admin',
    permissions: ['all'],
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['overview']);
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeCrmTab, setActiveCrmTab] = useState('chat');

  const notifications = [
    {
      id: 1,
      title: 'System Update Available',
      message: 'Version 2.1.0 is ready for deployment',
      time: '2 minutes ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'Security Alert',
      message: 'Unusual login activity detected',
      time: '15 minutes ago',
      type: 'warning',
    },
    {
      id: 3,
      title: 'Backup Completed',
      message: 'Daily backup completed successfully',
      time: '1 hour ago',
      type: 'success',
    },
  ];

  const metrics = [
    {
      id: 'users',
      title: 'Total Users',
      value: '12,456',
      change: '+15%',
      changeType: 'increase',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200',
    },
    {
      id: 'systems',
      title: 'Active Systems',
      value: '47',
      change: '+2',
      changeType: 'increase',
      icon: Cpu,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200',
    },
    {
      id: 'security',
      title: 'Security Score',
      value: '98.7%',
      change: '+1.2%',
      changeType: 'increase',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200',
    },
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: '7',
      change: '-2',
      changeType: 'decrease',
      icon: AlertTriangle,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
  ];

  const performanceData = [
    {
      label: 'SuperAdmin Satisfaction',
      value: 92,
      color: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    },
    { label: 'Response Time', value: 99.8, color: 'bg-gradient-to-r from-blue-400 to-blue-600' },
    { label: 'Retention Rate', value: 95, color: 'bg-gradient-to-r from-purple-400 to-purple-600' },
    {
      label: 'Support Efficiency',
      value: 83,
      color: 'bg-gradient-to-r from-amber-400 to-amber-600',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New superadmin created',
      details: 'Acme Corporation has been added to your network',
      time: '5 minutes ago',
      type: 'info',
      icon: Plus,
    },
    {
      id: 2,
      action: 'Status updated',
      details: 'Mark Johnson is now active with superadmin #5678',
      time: '1 hour ago',
      type: 'success',
      icon: CheckCircle,
    },
    {
      id: 3,
      action: 'Payment overdue',
      details: 'Invoice #INV-2023-001 is 3 days overdue',
      time: '3 days ago',
      type: 'warning',
      icon: AlertTriangle,
    },
    {
      id: 4,
      action: 'New user registered',
      details: 'Beta Corp has been added to your network',
      time: 'Yesterday',
      type: 'info',
      icon: Users,
    },
    {
      id: 5,
      action: 'System maintenance',
      details: 'Scheduled maintenance in 2 days',
      time: '2 days ago',
      type: 'warning',
      icon: Settings,
    },
  ];

  // Portal Control System - All 43 Portals
  const allPortals = [
    {
      id: 'super-admin',
      name: 'Super Admin Portal',
      status: 'active',
      users: 5,
      port: 3005,
      type: 'Administration',
    },
    {
      id: 'mcp-agents',
      name: 'MCP 251 Agents Portal',
      status: 'active',
      users: 1,
      port: 3000,
      type: 'AI Management',
    },
    {
      id: 'customer',
      name: 'Customer Portal',
      status: 'active',
      users: 1200,
      port: 3000,
      type: 'Business',
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      status: 'active',
      users: 850,
      port: 3000,
      type: 'Business',
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      status: 'active',
      users: 1800,
      port: 3000,
      type: 'Logistics',
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      status: 'active',
      users: 650,
      port: 3000,
      type: 'Logistics',
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      status: 'active',
      users: 3200,
      port: 3000,
      type: 'Operations',
    },
    {
      id: 'admin',
      name: 'Admin Portal',
      status: 'active',
      users: 150,
      port: 3000,
      type: 'Administration',
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      status: 'active',
      users: 420,
      port: 3000,
      type: 'Business',
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      status: 'active',
      users: 85,
      port: 3000,
      type: 'Development',
    },
    {
      id: 'autonomous',
      name: 'Autonomous Portal',
      status: 'maintenance',
      users: 0,
      port: 3000,
      type: 'AI',
    },
    {
      id: 'analytics',
      name: 'Analytics Portal',
      status: 'active',
      users: 320,
      port: 3000,
      type: 'Analytics',
    },
    {
      id: 'billing',
      name: 'Billing Portal',
      status: 'active',
      users: 45,
      port: 3000,
      type: 'Finance',
    },
    {
      id: 'compliance',
      name: 'Compliance Portal',
      status: 'active',
      users: 25,
      port: 3000,
      type: 'Security',
    },
    {
      id: 'integration',
      name: 'Integration Portal',
      status: 'active',
      users: 120,
      port: 3000,
      type: 'Technical',
    },
    {
      id: 'monitoring',
      name: 'Monitoring Portal',
      status: 'active',
      users: 15,
      port: 3000,
      type: 'Operations',
    },
    {
      id: 'reporting',
      name: 'Reporting Portal',
      status: 'active',
      users: 180,
      port: 3000,
      type: 'Analytics',
    },
    {
      id: 'support',
      name: 'Support Portal',
      status: 'active',
      users: 95,
      port: 3000,
      type: 'Customer Service',
    },
    {
      id: 'training',
      name: 'Training Portal',
      status: 'active',
      users: 250,
      port: 3000,
      type: 'Education',
    },
    {
      id: 'documentation',
      name: 'Documentation Portal',
      status: 'active',
      users: 75,
      port: 3000,
      type: 'Resources',
    },
    {
      id: 'api-gateway',
      name: 'API Gateway Portal',
      status: 'active',
      users: 200,
      port: 3000,
      type: 'Technical',
    },
    {
      id: 'webhook',
      name: 'Webhook Portal',
      status: 'active',
      users: 60,
      port: 3000,
      type: 'Integration',
    },
    { id: 'sso', name: 'SSO Portal', status: 'active', users: 0, port: 3000, type: 'Security' },
    {
      id: 'backup',
      name: 'Backup Portal',
      status: 'active',
      users: 5,
      port: 3000,
      type: 'Operations',
    },
    {
      id: 'disaster-recovery',
      name: 'Disaster Recovery Portal',
      status: 'active',
      users: 3,
      port: 3000,
      type: 'Operations',
    },
    {
      id: 'performance',
      name: 'Performance Portal',
      status: 'active',
      users: 40,
      port: 3000,
      type: 'Monitoring',
    },
    {
      id: 'security',
      name: 'Security Portal',
      status: 'active',
      users: 30,
      port: 3000,
      type: 'Security',
    },
    {
      id: 'audit',
      name: 'Audit Portal',
      status: 'active',
      users: 20,
      port: 3000,
      type: 'Compliance',
    },
    {
      id: 'governance',
      name: 'Governance Portal',
      status: 'active',
      users: 15,
      port: 3000,
      type: 'Administration',
    },
    {
      id: 'risk-management',
      name: 'Risk Management Portal',
      status: 'active',
      users: 25,
      port: 3000,
      type: 'Compliance',
    },
    {
      id: 'quality-assurance',
      name: 'Quality Assurance Portal',
      status: 'active',
      users: 50,
      port: 3000,
      type: 'Operations',
    },
    {
      id: 'testing',
      name: 'Testing Portal',
      status: 'active',
      users: 35,
      port: 3000,
      type: 'Development',
    },
    {
      id: 'staging',
      name: 'Staging Portal',
      status: 'active',
      users: 20,
      port: 3000,
      type: 'Development',
    },
    {
      id: 'production',
      name: 'Production Portal',
      status: 'active',
      users: 10,
      port: 3000,
      type: 'Operations',
    },
    {
      id: 'development',
      name: 'Development Portal',
      status: 'active',
      users: 45,
      port: 3000,
      type: 'Development',
    },
    {
      id: 'sandbox',
      name: 'Sandbox Portal',
      status: 'active',
      users: 80,
      port: 3000,
      type: 'Development',
    },
    {
      id: 'demo',
      name: 'Demo Portal',
      status: 'active',
      users: 200,
      port: 3000,
      type: 'Marketing',
    },
    {
      id: 'trial',
      name: 'Trial Portal',
      status: 'active',
      users: 500,
      port: 3000,
      type: 'Marketing',
    },
    {
      id: 'enterprise',
      name: 'Enterprise Portal',
      status: 'active',
      users: 100,
      port: 3000,
      type: 'Business',
    },
    {
      id: 'premium',
      name: 'Premium Portal',
      status: 'active',
      users: 75,
      port: 3000,
      type: 'Business',
    },
    {
      id: 'basic',
      name: 'Basic Portal',
      status: 'active',
      users: 300,
      port: 3000,
      type: 'Business',
    },
    {
      id: 'free',
      name: 'Free Portal',
      status: 'active',
      users: 1000,
      port: 3000,
      type: 'Business',
    },
  ];

  // Comprehensive multi-level menu structure
  // Comprehensive 88+ Pages Menu System
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      color: 'text-blue-500',
      path: '/dashboard',
      subMenus: [
        {
          id: 'overview',
          label: 'System Overview',
          icon: BarChart3,
          color: 'text-blue-400',
          path: '/dashboard/overview',
          subSubMenus: [
            { id: 'metrics', label: 'Real-time Metrics', path: '/dashboard/overview/metrics' },
            {
              id: 'performance',
              label: 'Performance Analytics',
              path: '/dashboard/overview/performance',
            },
            { id: 'health', label: 'System Health', path: '/dashboard/overview/health' },
          ],
        },
        {
          id: 'analytics',
          label: 'Analytics Center',
          icon: TrendingUp,
          color: 'text-green-400',
          path: '/dashboard/analytics',
          subSubMenus: [
            { id: 'reports', label: 'Custom Reports', path: '/dashboard/analytics/reports' },
            { id: 'insights', label: 'Business Insights', path: '/dashboard/analytics/insights' },
            {
              id: 'forecasting',
              label: 'Predictive Analytics',
              path: '/dashboard/analytics/forecasting',
            },
          ],
        },
      ],
    },
    {
      id: 'platform-management',
      label: 'Platform Management',
      icon: Building2,
      color: 'text-purple-500',
      path: '/platform',
      subMenus: [
        {
          id: 'companies',
          label: 'Company Management',
          icon: Building2,
          color: 'text-purple-400',
          path: '/platform/companies',
          subSubMenus: [
            { id: 'list', label: 'All Companies', path: '/platform/companies/list' },
            { id: 'create', label: 'Add Company', path: '/platform/companies/create' },
            { id: 'settings', label: 'Company Settings', path: '/platform/companies/settings' },
            { id: 'billing', label: 'Billing Management', path: '/platform/companies/billing' },
          ],
        },
        {
          id: 'users',
          label: 'User Management',
          icon: Users,
          color: 'text-blue-400',
          path: '/platform/users',
          subSubMenus: [
            { id: 'all-users', label: 'All Users', path: '/platform/users/all' },
            { id: 'roles', label: 'Role Management', path: '/platform/users/roles' },
            { id: 'permissions', label: 'Permissions', path: '/platform/users/permissions' },
            { id: 'activity', label: 'User Activity', path: '/platform/users/activity' },
          ],
        },
        {
          id: 'portals',
          label: 'Portal Management',
          icon: Globe,
          color: 'text-green-400',
          path: '/platform/portals',
          subSubMenus: [
            { id: 'portal-list', label: 'All Portals', path: '/platform/portals/list' },
            {
              id: 'portal-config',
              label: 'Portal Configuration',
              path: '/platform/portals/config',
            },
            { id: 'portal-access', label: 'Access Control', path: '/platform/portals/access' },
            {
              id: 'portal-monitoring',
              label: 'Portal Monitoring',
              path: '/platform/portals/monitoring',
            },
          ],
        },
      ],
    },
    {
      id: 'ai-command-center',
      label: 'AI Command Center',
      icon: Brain,
      color: 'text-indigo-500',
      path: '/ai-command',
      subMenus: [
        {
          id: 'mcp-agents',
          label: 'MCP Agents',
          icon: Bot,
          color: 'text-indigo-400',
          path: '/ai-command/mcp-agents',
          subSubMenus: [
            { id: 'agent-list', label: 'All Agents', path: '/ai-command/mcp-agents/list' },
            {
              id: 'agent-monitoring',
              label: 'Agent Monitoring',
              path: '/ai-command/mcp-agents/monitoring',
            },
            {
              id: 'agent-config',
              label: 'Agent Configuration',
              path: '/ai-command/mcp-agents/config',
            },
            {
              id: 'agent-performance',
              label: 'Performance Analytics',
              path: '/ai-command/mcp-agents/performance',
            },
          ],
        },
        {
          id: 'ai-models',
          label: 'AI Models',
          icon: Cpu,
          color: 'text-purple-400',
          path: '/ai-command/ai-models',
          subSubMenus: [
            { id: 'model-list', label: 'Model Library', path: '/ai-command/ai-models/list' },
            {
              id: 'model-training',
              label: 'Model Training',
              path: '/ai-command/ai-models/training',
            },
            {
              id: 'model-deployment',
              label: 'Model Deployment',
              path: '/ai-command/ai-models/deployment',
            },
            {
              id: 'model-monitoring',
              label: 'Model Monitoring',
              path: '/ai-command/ai-models/monitoring',
            },
          ],
        },
      ],
    },
    {
      id: 'security-compliance',
      label: 'Security & Compliance',
      icon: Shield,
      color: 'text-red-500',
      path: '/security',
      subMenus: [
        {
          id: 'security-monitoring',
          label: 'Security Monitoring',
          icon: Shield,
          color: 'text-red-400',
          path: '/security/monitoring',
          subSubMenus: [
            {
              id: 'threat-detection',
              label: 'Threat Detection',
              path: '/security/monitoring/threats',
            },
            { id: 'access-logs', label: 'Access Logs', path: '/security/monitoring/access' },
            {
              id: 'security-alerts',
              label: 'Security Alerts',
              path: '/security/monitoring/alerts',
            },
            {
              id: 'incident-response',
              label: 'Incident Response',
              path: '/security/monitoring/incidents',
            },
          ],
        },
        {
          id: 'compliance',
          label: 'Compliance Management',
          icon: FileCheck,
          color: 'text-orange-400',
          path: '/security/compliance',
          subSubMenus: [
            { id: 'audit-trails', label: 'Audit Trails', path: '/security/compliance/audit' },
            {
              id: 'compliance-reports',
              label: 'Compliance Reports',
              path: '/security/compliance/reports',
            },
            {
              id: 'policy-management',
              label: 'Policy Management',
              path: '/security/compliance/policies',
            },
            { id: 'risk-assessment', label: 'Risk Assessment', path: '/security/compliance/risk' },
          ],
        },
      ],
    },
    {
      id: 'system-administration',
      label: 'System Administration',
      icon: Settings,
      color: 'text-gray-500',
      path: '/system',
      subMenus: [
        {
          id: 'system-settings',
          label: 'System Settings',
          icon: Settings,
          color: 'text-gray-400',
          path: '/system/settings',
          subSubMenus: [
            { id: 'global-settings', label: 'Global Settings', path: '/system/settings/global' },
            {
              id: 'database-config',
              label: 'Database Configuration',
              path: '/system/settings/database',
            },
            { id: 'api-settings', label: 'API Settings', path: '/system/settings/api' },
            { id: 'backup-restore', label: 'Backup & Restore', path: '/system/settings/backup' },
          ],
        },
        {
          id: 'monitoring',
          label: 'System Monitoring',
          icon: Activity,
          color: 'text-green-400',
          path: '/system/monitoring',
          subSubMenus: [
            { id: 'system-health', label: 'System Health', path: '/system/monitoring/health' },
            {
              id: 'performance-metrics',
              label: 'Performance Metrics',
              path: '/system/monitoring/performance',
            },
            { id: 'resource-usage', label: 'Resource Usage', path: '/system/monitoring/resources' },
            { id: 'log-management', label: 'Log Management', path: '/system/monitoring/logs' },
          ],
        },
      ],
    },
    {
      id: 'billing-finance',
      label: 'Billing & Finance',
      icon: DollarSign,
      color: 'text-green-500',
      path: '/billing',
      subMenus: [
        {
          id: 'billing-management',
          label: 'Billing Management',
          icon: CreditCard,
          color: 'text-green-400',
          path: '/billing/management',
          subSubMenus: [
            { id: 'invoices', label: 'Invoices', path: '/billing/management/invoices' },
            {
              id: 'subscriptions',
              label: 'Subscriptions',
              path: '/billing/management/subscriptions',
            },
            { id: 'payments', label: 'Payment Processing', path: '/billing/management/payments' },
            {
              id: 'revenue-analytics',
              label: 'Revenue Analytics',
              path: '/billing/management/revenue',
            },
          ],
        },
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          icon: BarChart3,
          color: 'text-blue-400',
          path: '/billing/reports',
          subSubMenus: [
            { id: 'profit-loss', label: 'Profit & Loss', path: '/billing/reports/profit-loss' },
            { id: 'cash-flow', label: 'Cash Flow', path: '/billing/reports/cash-flow' },
            {
              id: 'financial-summary',
              label: 'Financial Summary',
              path: '/billing/reports/summary',
            },
            { id: 'tax-reports', label: 'Tax Reports', path: '/billing/reports/tax' },
          ],
        },
      ],
    },
    {
      id: 'logistics-portals',
      label: 'Logistics Portals',
      icon: Truck,
      color: 'text-orange-500',
      path: '/logistics',
      subMenus: [
        {
          id: 'broker-portal',
          label: 'Broker Portal',
          icon: Users,
          color: 'text-orange-400',
          path: '/logistics/broker',
          subSubMenus: [
            { id: 'load-board', label: 'Load Board', path: '/logistics/broker/load-board' },
            {
              id: 'carrier-network',
              label: 'Carrier Network',
              path: '/logistics/broker/carrier-network',
            },
            {
              id: 'rate-management',
              label: 'Rate Management',
              path: '/logistics/broker/rate-management',
            },
            {
              id: 'document-management',
              label: 'Document Management',
              path: '/logistics/broker/documents',
            },
          ],
        },
        {
          id: 'carrier-portal',
          label: 'Carrier Portal',
          icon: Truck,
          color: 'text-blue-400',
          path: '/logistics/carrier',
          subSubMenus: [
            { id: 'fleet-management', label: 'Fleet Management', path: '/logistics/carrier/fleet' },
            {
              id: 'load-optimization',
              label: 'Load Optimization',
              path: '/logistics/carrier/load-optimization',
            },
            {
              id: 'driver-management',
              label: 'Driver Management',
              path: '/logistics/carrier/drivers',
            },
            {
              id: 'maintenance',
              label: 'Maintenance Tracking',
              path: '/logistics/carrier/maintenance',
            },
          ],
        },
        {
          id: 'shipper-portal',
          label: 'Shipper Portal',
          icon: Package,
          color: 'text-green-400',
          path: '/logistics/shipper',
          subSubMenus: [
            {
              id: 'shipment-management',
              label: 'Shipment Management',
              path: '/logistics/shipper/shipments',
            },
            { id: 'rate-quotes', label: 'Rate Quotes', path: '/logistics/shipper/rate-quotes' },
            { id: 'tracking', label: 'Shipment Tracking', path: '/logistics/shipper/tracking' },
            { id: 'invoicing', label: 'Invoicing', path: '/logistics/shipper/invoicing' },
          ],
        },
      ],
    },
    {
      id: 'business-portals',
      label: 'Business Portals',
      icon: Building2,
      color: 'text-purple-500',
      path: '/business',
      subMenus: [
        {
          id: 'crm-portal',
          label: 'CRM Portal',
          icon: Users,
          color: 'text-purple-400',
          path: '/business/crm',
          subSubMenus: [
            {
              id: 'customer-management',
              label: 'Customer Management',
              path: '/business/crm/customers',
            },
            { id: 'lead-management', label: 'Lead Management', path: '/business/crm/leads' },
            { id: 'sales-pipeline', label: 'Sales Pipeline', path: '/business/crm/sales' },
            {
              id: 'marketing-automation',
              label: 'Marketing Automation',
              path: '/business/crm/marketing',
            },
          ],
        },
        {
          id: 'billing-portal',
          label: 'Billing Portal',
          icon: CreditCard,
          color: 'text-green-400',
          path: '/business/billing',
          subSubMenus: [
            {
              id: 'invoice-management',
              label: 'Invoice Management',
              path: '/business/billing/invoices',
            },
            {
              id: 'payment-processing',
              label: 'Payment Processing',
              path: '/business/billing/payments',
            },
            {
              id: 'subscription-management',
              label: 'Subscription Management',
              path: '/business/billing/subscriptions',
            },
            {
              id: 'financial-reporting',
              label: 'Financial Reporting',
              path: '/business/billing/reports',
            },
          ],
        },
      ],
    },
    {
      id: 'analytics-portals',
      label: 'Analytics Portals',
      icon: BarChart3,
      color: 'text-blue-500',
      path: '/analytics',
      subMenus: [
        {
          id: 'business-intelligence',
          label: 'Business Intelligence',
          icon: BarChart3,
          color: 'text-blue-400',
          path: '/analytics/business-intelligence',
          subSubMenus: [
            {
              id: 'dashboard',
              label: 'BI Dashboard',
              path: '/analytics/business-intelligence/dashboard',
            },
            {
              id: 'reports',
              label: 'Custom Reports',
              path: '/analytics/business-intelligence/reports',
            },
            {
              id: 'data-visualization',
              label: 'Data Visualization',
              path: '/analytics/business-intelligence/visualization',
            },
            {
              id: 'predictive-analytics',
              label: 'Predictive Analytics',
              path: '/analytics/business-intelligence/predictive',
            },
          ],
        },
        {
          id: 'reporting-portal',
          label: 'Reporting Portal',
          icon: FileText,
          color: 'text-green-400',
          path: '/analytics/reporting',
          subSubMenus: [
            {
              id: 'standard-reports',
              label: 'Standard Reports',
              path: '/analytics/reporting/standard',
            },
            { id: 'custom-reports', label: 'Custom Reports', path: '/analytics/reporting/custom' },
            {
              id: 'scheduled-reports',
              label: 'Scheduled Reports',
              path: '/analytics/reporting/scheduled',
            },
            { id: 'report-builder', label: 'Report Builder', path: '/analytics/reporting/builder' },
          ],
        },
      ],
    },
    {
      id: 'integration-portals',
      label: 'Integration Portals',
      icon: Network,
      color: 'text-indigo-500',
      path: '/integration',
      subMenus: [
        {
          id: 'api-management',
          label: 'API Management',
          icon: Network,
          color: 'text-indigo-400',
          path: '/integration/api-management',
          subSubMenus: [
            {
              id: 'api-gateway',
              label: 'API Gateway',
              path: '/integration/api-management/gateway',
            },
            {
              id: 'api-documentation',
              label: 'API Documentation',
              path: '/integration/api-management/documentation',
            },
            {
              id: 'api-monitoring',
              label: 'API Monitoring',
              path: '/integration/api-management/monitoring',
            },
            {
              id: 'api-security',
              label: 'API Security',
              path: '/integration/api-management/security',
            },
          ],
        },
        {
          id: 'edi-portal',
          label: 'EDI Portal',
          icon: FileText,
          color: 'text-orange-400',
          path: '/integration/edi',
          subSubMenus: [
            { id: 'edi-mapping', label: 'EDI Mapping', path: '/integration/edi/mapping' },
            {
              id: 'edi-transactions',
              label: 'EDI Transactions',
              path: '/integration/edi/transactions',
            },
            { id: 'edi-monitoring', label: 'EDI Monitoring', path: '/integration/edi/monitoring' },
            { id: 'edi-testing', label: 'EDI Testing', path: '/integration/edi/testing' },
          ],
        },
      ],
    },
    {
      id: 'operations-portals',
      label: 'Operations Portals',
      icon: Settings,
      color: 'text-gray-500',
      path: '/operations',
      subMenus: [
        {
          id: 'dispatch-portal',
          label: 'Dispatch Portal',
          icon: MapPin,
          color: 'text-gray-400',
          path: '/operations/dispatch',
          subSubMenus: [
            {
              id: 'load-dispatch',
              label: 'Load Dispatch',
              path: '/operations/dispatch/load-dispatch',
            },
            {
              id: 'driver-assignment',
              label: 'Driver Assignment',
              path: '/operations/dispatch/driver-assignment',
            },
            {
              id: 'route-optimization',
              label: 'Route Optimization',
              path: '/operations/dispatch/route-optimization',
            },
            {
              id: 'real-time-tracking',
              label: 'Real-time Tracking',
              path: '/operations/dispatch/tracking',
            },
          ],
        },
        {
          id: 'fleet-portal',
          label: 'Fleet Portal',
          icon: Truck,
          color: 'text-blue-400',
          path: '/operations/fleet',
          subSubMenus: [
            { id: 'fleet-overview', label: 'Fleet Overview', path: '/operations/fleet/overview' },
            {
              id: 'vehicle-management',
              label: 'Vehicle Management',
              path: '/operations/fleet/vehicles',
            },
            {
              id: 'maintenance-scheduling',
              label: 'Maintenance Scheduling',
              path: '/operations/fleet/maintenance',
            },
            { id: 'fuel-management', label: 'Fuel Management', path: '/operations/fleet/fuel' },
          ],
        },
      ],
    },
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

  // Portal Control Functions
  const handlePortalAction = (portalId: string, action: string) => {
    console.log(`${action} portal: ${portalId}`);
    // Implement portal control logic here
  };

  const getPortalStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'inactive':
        return 'text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700';
      case 'maintenance':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'text-gray-600 dark:text-gray-300 bg-gray-50 border-gray-200 dark:border-slate-700';
    }
  };

  const getPortalTypeColor = (type: string) => {
    switch (type) {
      case 'Administration':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'Business':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'Logistics':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'Operations':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      case 'AI Management':
        return 'text-indigo-600 bg-indigo-50';
      case 'Analytics':
        return 'text-pink-600 bg-pink-50';
      case 'Finance':
        return 'text-emerald-600 bg-emerald-50';
      case 'Security':
        return 'text-red-600 bg-red-50';
      case 'Development':
        return 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20';
      case 'Technical':
        return 'text-gray-600 dark:text-gray-300 bg-gray-50';
      case 'Marketing':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'text-gray-600 dark:text-gray-300 bg-gray-50';
    }
  };

  // CRM Functions Data
  const crmTabs = [
    {
      id: 'chat',
      label: 'Chat',
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200',
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: CheckSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200',
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: Phone,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      id: 'text',
      label: 'SMS',
      icon: MessageSquare,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
    },
    {
      id: 'video',
      label: 'Video',
      icon: Video,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: Calendar,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      color: 'text-gray-600 dark:text-gray-300',
      bgColor: 'bg-gray-50 dark:bg-slate-700/50',
      borderColor: 'border-gray-200 dark:border-slate-700',
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'John Doe',
      message: 'Hi, I need help with my order',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      message: 'Thank you for the quick response!',
      time: '5 min ago',
      unread: false,
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      message: 'Can you check the status?',
      time: '10 min ago',
      unread: true,
    },
  ];

  const emailList = [
    {
      id: 1,
      from: 'superadmin@example.com',
      subject: 'Order Inquiry',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 2,
      from: 'support@company.com',
      subject: 'Your order has shipped',
      time: '2 hours ago',
      unread: false,
    },
    {
      id: 3,
      from: 'billing@company.com',
      subject: 'Invoice #12345',
      time: '3 hours ago',
      unread: true,
    },
  ];

  const tasks = [
    { id: 1, title: 'Follow up with John Doe', priority: 'high', due: 'Today', completed: false },
    {
      id: 2,
      title: 'Review superadmin feedback',
      priority: 'medium',
      due: 'Tomorrow',
      completed: false,
    },
    {
      id: 3,
      title: 'Update superadmin records',
      priority: 'low',
      due: 'Next week',
      completed: true,
    },
  ];

  const recentCalls = [
    {
      id: 1,
      contact: 'John Doe',
      type: 'incoming',
      duration: '5:32',
      time: '10 min ago',
      status: 'completed',
    },
    {
      id: 2,
      contact: 'Sarah Wilson',
      type: 'outgoing',
      duration: '2:15',
      time: '1 hour ago',
      status: 'completed',
    },
    {
      id: 3,
      contact: 'Mike Johnson',
      type: 'missed',
      duration: '0:00',
      time: '2 hours ago',
      status: 'missed',
    },
  ];

  const smsMessages = [
    {
      id: 1,
      contact: 'John Doe',
      message: 'Thanks for the update!',
      time: '5 min ago',
      unread: false,
    },
    {
      id: 2,
      contact: 'Sarah Wilson',
      message: 'When will my order arrive?',
      time: '1 hour ago',
      unread: true,
    },
  ];

  const calendarEvents = [
    { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today', type: 'meeting' },
    { id: 2, title: 'SuperAdmin Call', time: '2:00 PM', date: 'Today', type: 'call' },
    { id: 3, title: 'Project Review', time: '4:00 PM', date: 'Tomorrow', type: 'review' },
  ];

  const notes = [
    {
      id: 1,
      title: 'SuperAdmin Meeting Notes',
      content: 'Discussed new features...',
      updated: '2 hours ago',
    },
    {
      id: 2,
      title: 'Project Ideas',
      content: 'Brainstorming session notes...',
      updated: '1 day ago',
    },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Header - Responsive */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    TransBot AI
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Super Admin Portal
                  </p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    TransBot
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Bar - Responsive */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search superadmins, orders, reports..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-48 lg:w-80 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm"
                />
              </div>
              {/* Mobile Search Button */}
              <button className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm">
                <Search className="h-5 w-5" />
              </button>

              {/* Action Icons - Responsive */}
              <div className="flex items-center space-x-1">
                {/* Refresh Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* History Button */}
                <button
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors"
                  title="Recent Activity"
                >
                  <History className="h-5 w-5" />
                </button>

                {/* Help Button */}
                <button
                  className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors"
                  title="Help & Support"
                >
                  <HelpCircle className="h-5 w-5" />
                </button>

                {/* Notifications */}
                <button className="relative p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                {/* Settings Dropdown */}
                <div className="relative">
                  {/* Theme Toggle */}
                  <ThemeToggle size="sm" />

                  <button
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors"
                    title="Settings"
                  >
                    <Settings className="h-5 w-5" />
                  </button>

                  {/* Settings Dropdown Menu */}
                  {showSettingsMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Settings
                        </h3>
                      </div>
                      <div className="py-1">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Profile Settings</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Lock className="h-4 w-4" />
                          <span>Security</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Globe className="h-4 w-4" />
                          <span>Language</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Wifi className="h-4 w-4" />
                          <span>Network</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Star className="h-4 w-4" />
                          <span>Preferences</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* User Profile Section */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-slate-700">
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-xl p-2 transition-colors"
                  >
                    <img
                      className="h-10 w-10 rounded-xl shadow-md"
                      src={user.avatar}
                      alt={user.name}
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">{user.role}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Messages</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Heart className="h-4 w-4" />
                          <span>Favorites</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 flex items-center space-x-2">
                          <Flag className="h-4 w-4" />
                          <span>Reports</span>
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                          <LogOut className="h-4 w-4" />
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

      <div className="flex relative">
        {/* Enhanced Permanent Sidebar - Responsive */}
        <aside
          className={`${sidebarCollapsed ? 'w-16' : 'w-64 lg:w-72'} bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg shadow-xl border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ease-in-out sticky top-20 h-[calc(100vh-5rem)] z-30 hidden md:block`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Navigation
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight
                    className={`h-4 w-4 text-gray-500 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Multi-Level Navigation Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map(menuItem => {
                const Icon = menuItem.icon;
                const isExpanded = expandedMenus.includes(menuItem.id);
                const isActive = activeMenuItem === menuItem.id;

                return (
                  <div key={menuItem.id} className="space-y-1">
                    {/* Main Menu Item */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          if (menuItem.subMenus && menuItem.subMenus.length > 0) {
                            handleMenuToggle(menuItem.id);
                          } else {
                            handleMenuItemClick(menuItem.id, menuItem.path);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 shadow-sm'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
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
                        className="ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-4"
                      >
                        {menuItem.subMenus.map(subMenu => {
                          const SubIcon = subMenu.icon;
                          const isSubExpanded = expandedMenus.includes(subMenu.id);
                          const isSubActive = activeMenuItem === subMenu.id;

                          return (
                            <div key={subMenu.id} className="space-y-1">
                              {/* Sub-Menu Item */}
                              <button
                                onClick={() => {
                                  if (subMenu.subSubMenus && subMenu.subSubMenus.length > 0) {
                                    handleMenuToggle(subMenu.id);
                                  } else {
                                    handleMenuItemClick(subMenu.id, subMenu.path);
                                  }
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 group ${
                                  isSubActive
                                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 shadow-sm'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
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
                                  className="ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-4"
                                >
                                  {subMenu.subSubMenus.map(subSubMenu => {
                                    const isSubSubActive = activeMenuItem === subSubMenu.id;

                                    return (
                                      <button
                                        key={subSubMenu.id}
                                        onClick={() =>
                                          handleMenuItemClick(subSubMenu.id, subSubMenu.path)
                                        }
                                        className={`w-full flex items-center space-x-3 px-3 py-1.5 rounded-md transition-all duration-200 group ${
                                          isSubSubActive
                                            ? 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 shadow-sm'
                                            : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                                        }`}
                                      >
                                        <div className="h-2 w-2 rounded-full bg-gray-400 group-hover:bg-gray-600" />
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
            <div className="p-4 border-t border-gray-200 dark:border-slate-700/50">
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 dark:border-slate-700">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      MCP 251 Agents
                    </p>
                    <p className="text-xs text-gray-500">24/7 Active</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {!sidebarCollapsed && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarCollapsed(true)}
            />
            {/* Mobile Sidebar */}
            <aside className="absolute left-0 top-0 w-80 h-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg shadow-2xl border-r border-gray-200 dark:border-slate-700/50">
              <div className="flex flex-col h-full">
                {/* Mobile Sidebar Header */}
                <div className="p-4 border-b border-gray-200 dark:border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                          TransBot AI
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          Super Admin Portal
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSidebarCollapsed(true)}
                      className="p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                      <svg
                        className="h-5 w-5"
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
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {menuItems.map(menuItem => {
                    const isActive = activeMenuItem === menuItem.id;
                    const isExpanded = expandedMenus.includes(menuItem.id);

                    return (
                      <div key={menuItem.id} className="space-y-1">
                        {/* Main Menu Item */}
                        <div className="space-y-1">
                          <button
                            onClick={() => handleMenuToggle(menuItem.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <menuItem.icon
                                className={`h-5 w-5 ${isActive ? 'text-white' : menuItem.color}`}
                              />
                              <span className="font-medium">{menuItem.label}</span>
                            </div>
                            {menuItem.subMenus && menuItem.subMenus.length > 0 && (
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${isActive ? 'text-white' : 'text-gray-400'}`}
                              />
                            )}
                          </button>

                          {/* Sub-menus */}
                          {isExpanded && menuItem.subMenus && (
                            <div className="ml-4 space-y-1">
                              {menuItem.subMenus.map(subMenu => {
                                const isSubActive = activeMenuItem === subMenu.id;
                                const isSubExpanded = expandedMenus.includes(subMenu.id);

                                return (
                                  <div key={subMenu.id} className="space-y-1">
                                    {/* Sub-Menu Item */}
                                    <button
                                      onClick={() => {
                                        if (subMenu.subSubMenus && subMenu.subSubMenus.length > 0) {
                                          handleMenuToggle(subMenu.id);
                                        } else {
                                          handleMenuItemClick(subMenu.id, subMenu.path);
                                        }
                                      }}
                                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${
                                        isSubActive
                                          ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
                                          : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                                      }`}
                                    >
                                      <div className="flex items-center space-x-2">
                                        <subMenu.icon
                                          className={`h-4 w-4 ${isSubActive ? 'text-white' : 'text-gray-500'}`}
                                        />
                                        <span className="text-sm font-medium">{subMenu.label}</span>
                                      </div>
                                      {subMenu.subSubMenus && subMenu.subSubMenus.length > 0 && (
                                        <ChevronDown
                                          className={`h-3 w-3 transition-transform duration-200 ${isSubExpanded ? 'rotate-180' : ''} ${isSubActive ? 'text-white' : 'text-gray-400'}`}
                                        />
                                      )}
                                    </button>

                                    {/* Sub-sub-menus */}
                                    {isSubExpanded && subMenu.subSubMenus && (
                                      <div className="ml-4 space-y-1">
                                        {subMenu.subSubMenus.map(subSubMenu => {
                                          const isSubSubActive = activeMenuItem === subSubMenu.id;

                                          return (
                                            <button
                                              key={subSubMenu.id}
                                              onClick={() =>
                                                handleMenuItemClick(subSubMenu.id, subSubMenu.path)
                                              }
                                              className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded-md transition-all duration-200 group ${
                                                isSubSubActive
                                                  ? 'bg-gradient-to-r from-blue-300 to-purple-400 text-white shadow-sm'
                                                  : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-500 hover:text-gray-700 dark:text-gray-300'
                                              }`}
                                            >
                                              <div
                                                className={`h-3 w-3 rounded-full ${isSubSubActive ? 'bg-white dark:bg-slate-200' : 'bg-gray-400 dark:bg-gray-600'}`}
                                              ></div>
                                              <span className="text-xs font-medium">
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
        <main className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          {/* Dashboard Header - Responsive */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Dashboard
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Welcome back, {user.name}! Here's what's happening with your Super Admin Portal.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* Compact MCP Agents Connection Status */}
          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/80 dark:to-indigo-900/80 border border-blue-200/50 dark:border-blue-700/50 rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-blue-400 dark:bg-blue-300 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                Connecting to MCP agents...
              </span>
              <div className="flex space-x-1 ml-auto">
                <div className="h-1.5 w-1.5 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"></div>
                <div
                  className="h-1.5 w-1.5 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="h-1.5 w-1.5 bg-blue-400 dark:bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Enhanced Metrics Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metrics.map(metric => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`${metric.bgColor} ${metric.borderColor} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
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
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{metric.title}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Portal Command Center */}
          <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-indigo-50/30 dark:from-slate-800/90 dark:via-slate-700/50 dark:to-slate-600/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-600/20 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 left-8 w-24 h-24 bg-purple-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-4 w-16 h-16 bg-indigo-300 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                      Portal Command Center
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                      Access all portal categories and perform quick actions
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    All Systems Active
                  </span>
                </div>
              </div>

              {/* Portal Categories Grid - Enhanced Design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeMenuItem === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id, item.path)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 shadow-xl shadow-blue-100/50 dark:shadow-blue-900/50'
                          : 'border-gray-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-50/30 dark:hover:shadow-blue-900/30 backdrop-blur-sm'
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                          <div className="h-2 w-2 bg-white dark:bg-slate-200 rounded-full animate-pulse"></div>
                        </div>
                      )}

                      {/* Icon Container */}
                      <div
                        className={`mb-4 p-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-800/50 dark:to-indigo-800/50 shadow-lg'
                            : 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-700/50 dark:to-slate-600/50 group-hover:from-blue-50 group-hover:to-indigo-50 dark:group-hover:from-blue-800/30 dark:group-hover:to-indigo-800/30 group-hover:shadow-md'
                        }`}
                      >
                        <Icon
                          className={`h-8 w-8 transition-colors duration-300 ${
                            isActive
                              ? 'text-blue-600'
                              : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600'
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="text-left">
                        <h4
                          className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                            isActive
                              ? 'text-blue-900 dark:text-blue-100'
                              : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-800 dark:group-hover:text-blue-200'
                          }`}
                        >
                          {item.label}
                        </h4>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isActive
                              ? 'text-blue-700 dark:text-blue-200'
                              : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-300'
                          }`}
                        >
                          {item.subMenus ? `${item.subMenus.length} sub-modules` : 'Direct access'}
                        </p>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                          isActive
                            ? 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5'
                            : 'bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5'
                        }`}
                      ></div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Quick Stats Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700/50">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {menuItems.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Portal Categories
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">248</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">MCP Agents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Status Overview */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    System Status
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Real-time system health monitoring
                  </p>
                </div>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-3">
                    <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800">
                      All Systems Operational
                    </span>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">99.9%</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      API Response Time
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      45ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Database Performance
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      98.5%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Active Users</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      1,247
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">MCP Agents</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      248/250
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Performance Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Key performance indicators
                  </p>
                </div>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                {performanceData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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
            <div className="bg-gradient-to-br from-white/80 via-emerald-50/30 to-teal-50/20 dark:from-slate-800/80 dark:via-emerald-900/30 dark:to-teal-900/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-600/20 relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400"></div>
                <div className="absolute top-8 right-8 w-24 h-24 bg-emerald-300 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-20 h-20 bg-teal-300 rounded-full blur-xl animate-pulse delay-1000"></div>
              </div>

              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center shadow-xl">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-400 rounded-full border-2 border-white dark:border-slate-800 animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 animate-ping opacity-20"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      Recent Activity
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-teal-400 rounded-full animate-pulse delay-100"></div>
                        <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        Latest updates and notifications
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex items-start space-x-3 p-3 rounded-xl border ${getStatusColor(activity.type)} hover:shadow-md transition-all duration-200 cursor-pointer`}
                    >
                      <div
                        className={`p-2 rounded-lg ${getStatusColor(activity.type).split(' ')[1]}`}
                      >
                        <Icon
                          className={`h-4 w-4 ${getStatusColor(activity.type).split(' ')[0]}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {activity.details}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Portal Control Center - Master Controller */}
          <div className="bg-gradient-to-br from-white/90 via-purple-50/50 to-indigo-50/30 dark:from-slate-800/90 dark:via-purple-900/50 dark:to-indigo-900/30 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-600/20 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 via-blue-400 to-indigo-400"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 left-8 w-24 h-24 bg-indigo-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 right-4 w-16 h-16 bg-blue-300 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
                      Portal Control Center
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                      Master controller for all 43 portals
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    All Systems Controlled
                  </span>
                </div>
              </div>

              {/* Portal Control Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allPortals.slice(0, 12).map((portal, index) => (
                  <motion.div
                    key={portal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl cursor-pointer overflow-hidden ${getPortalStatusColor(portal.status)}`}
                  >
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 via-indigo-400 to-blue-400"></div>
                      <div className="absolute top-2 right-2 w-8 h-8 bg-purple-300 rounded-full blur-lg animate-pulse"></div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div
                            className={`h-3 w-3 rounded-full ${
                              portal.status === 'active'
                                ? 'bg-green-400'
                                : portal.status === 'maintenance'
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'
                            }`}
                          ></div>
                          <div
                            className={`absolute inset-0 h-3 w-3 rounded-full animate-ping ${
                              portal.status === 'active'
                                ? 'bg-green-400'
                                : portal.status === 'maintenance'
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'
                            } opacity-20`}
                          ></div>
                        </div>
                        <span className="font-bold text-sm text-gray-800 dark:text-gray-100">
                          {portal.name}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handlePortalAction(portal.id, 'restart')}
                          className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-slate-600/60 transition-all duration-200 hover:scale-110"
                          title="Restart Portal"
                        >
                          <RefreshCw className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={() => handlePortalAction(portal.id, 'settings')}
                          className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-slate-600/60 transition-all duration-200 hover:scale-110"
                          title="Portal Settings"
                        >
                          <Settings className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>

                    {/* Portal Details */}
                    <div className="space-y-3 relative z-10">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Type:
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getPortalTypeColor(portal.type)}`}
                        >
                          {portal.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Users:
                        </span>
                        <span className="font-bold text-sm text-gray-800 dark:text-gray-100">
                          {portal.users.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Port:
                        </span>
                        <span className="font-bold text-sm text-gray-800 dark:text-gray-100">
                          {portal.port}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                          Status:
                        </span>
                        <span className="font-bold text-sm capitalize text-gray-800 dark:text-gray-100">
                          {portal.status}
                        </span>
                      </div>
                    </div>

                    {/* Control Actions */}
                    <div className="mt-4 flex space-x-2 relative z-10">
                      <button
                        onClick={() => handlePortalAction(portal.id, 'start')}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-xs font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Start
                      </button>
                      <button
                        onClick={() => handlePortalAction(portal.id, 'stop')}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-lg text-xs font-bold hover:from-red-600 hover:to-rose-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Stop
                      </button>
                      <button
                        onClick={() => handlePortalAction(portal.id, 'monitor')}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-xs font-bold hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Monitor
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Portal Statistics Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700/50">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {allPortals.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Portals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {allPortals.filter(p => p.status === 'active').length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Active Portals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {allPortals.reduce((sum, p) => sum + p.users, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">99.9%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Right CRM Sidebar - Responsive */}
        {rightSidebarCollapsed ? (
          /* Collapsed State - Only Toggle Button */
          <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
            <button
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                console.log('Toggle button clicked - opening sidebar');
                setRightSidebarCollapsed(false);
              }}
              onMouseDown={e => e.stopPropagation()}
              onMouseUp={e => e.stopPropagation()}
              className="group p-2 sm:p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl border border-gray-200 dark:border-slate-700/50 transition-all duration-300 hover:scale-110 pointer-events-auto"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
          </div>
        ) : (
          /* Expanded State - Full CRM Sidebar */
          <aside className="bg-gradient-to-b from-white/95 via-white/90 to-white/85 dark:from-slate-800/95 dark:via-slate-800/90 dark:to-slate-800/85 backdrop-blur-xl shadow-2xl border-l border-gradient-to-b from-purple-200/50 via-pink-200/30 to-indigo-200/50 dark:from-purple-800/50 dark:via-pink-800/30 dark:to-indigo-800/50 sticky top-20 h-[calc(100vh-5rem)] z-30 w-72 sm:w-80 transition-all duration-500 ease-out hidden lg:block">
            <div className="flex flex-col h-full relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 dark:from-purple-600 dark:via-pink-600 dark:to-indigo-600"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 dark:bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-8 w-24 h-24 bg-pink-300 dark:bg-pink-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-4 w-16 h-16 bg-indigo-300 dark:bg-indigo-500 rounded-full blur-xl animate-pulse delay-500"></div>
              </div>

              {/* Enhanced CRM Sidebar Header */}
              <div className="relative p-6 border-b border-gradient-to-r from-purple-200/50 to-pink-200/50 dark:from-purple-800/50 dark:to-pink-800/50 bg-gradient-to-br from-white/90 via-purple-50/30 to-pink-50/20 dark:from-slate-800/90 dark:via-purple-900/30 dark:to-pink-900/20 backdrop-blur-xl">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400"></div>
                  <div className="absolute top-4 right-4 w-16 h-16 bg-purple-300 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-pink-300 rounded-full blur-xl animate-pulse delay-1000"></div>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-xl">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-400 rounded-full border-2 border-white dark:border-slate-800 animate-pulse shadow-lg"></div>
                      <div className="absolute inset-0 h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 animate-ping opacity-20"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                        CRM Command Center
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          All systems operational
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      e.preventDefault();
                      console.log('Close button clicked - closing sidebar');
                      setRightSidebarCollapsed(true);
                    }}
                    onMouseDown={e => e.stopPropagation()}
                    onMouseUp={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                  >
                    <ChevronRight className="h-4 w-4 transition-all duration-300 rotate-180" />
                  </button>
                </div>
              </div>

              {/* Enhanced CRM Tabs */}
              <div className="relative p-6 border-b border-gradient-to-r from-purple-200/30 to-pink-200/30 dark:from-purple-800/30 dark:to-pink-800/30 bg-gradient-to-br from-white/70 via-purple-50/20 to-pink-50/10 dark:from-slate-700/70 dark:via-purple-900/20 dark:to-pink-900/10 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  {crmTabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = activeCrmTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setActiveCrmTab(tab.id)}
                        className={`group relative flex flex-col items-center space-y-2 px-4 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                          isActive
                            ? `${tab.bgColor} ${tab.borderColor} border-2 shadow-xl transform scale-105`
                            : 'hover:bg-white/80 dark:hover:bg-slate-600/80 hover:shadow-lg hover:scale-102 backdrop-blur-sm border border-transparent'
                        }`}
                      >
                        {/* Animated Background */}
                        <div
                          className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-700/90 dark:to-slate-600/70'
                              : 'bg-gradient-to-br from-white/50 to-white/30 dark:from-slate-700/50 dark:to-slate-600/30 group-hover:from-white/70 group-hover:to-white/50 dark:group-hover:from-slate-600/70 dark:group-hover:to-slate-500/50'
                          }`}
                        ></div>

                        {/* Icon with enhanced styling */}
                        <div
                          className={`relative p-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-br from-white/95 to-white/80 dark:from-slate-600/95 dark:to-slate-500/80 shadow-lg'
                              : 'bg-white/60 dark:bg-slate-600/60 group-hover:bg-white/80 dark:group-hover:bg-slate-500/80 group-hover:shadow-md'
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 transition-all duration-300 ${
                              isActive
                                ? tab.color
                                : 'text-gray-600 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100'
                            }`}
                          />
                          {isActive && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent dark:from-slate-400/30"></div>
                          )}
                        </div>

                        {/* Label */}
                        <span
                          className={`text-xs font-semibold transition-all duration-300 relative z-10 ${
                            isActive
                              ? 'text-gray-800 dark:text-gray-100'
                              : 'text-gray-600 group-hover:text-gray-800 dark:text-gray-300 dark:group-hover:text-gray-100'
                          }`}
                        >
                          {tab.label}
                        </span>

                        {!rightSidebarCollapsed && (
                          <div className="relative flex-1">
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
                              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-50"></div>
                            )}
                          </div>
                        )}

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced CRM Content */}
              <div className="flex-1 p-4 overflow-y-auto relative">
                {/* Content Background Pattern */}
                <div className="absolute inset-0 opacity-3">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-100/20 to-pink-100/20 dark:via-purple-900/20 dark:to-pink-900/20"></div>
                </div>

                {!rightSidebarCollapsed && activeCrmTab === 'chat' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 relative"
                  >
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
                      <h3 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Live Chat
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="absolute inset-0 h-3 w-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          Online
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {chatMessages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`group relative p-4 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-md ${
                            msg.unread
                              ? 'bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200/70 dark:border-blue-800/70 shadow-sm'
                              : 'bg-gradient-to-br from-white/70 to-gray-50/70 dark:from-slate-700/70 dark:to-slate-600/70 border-gray-200 dark:border-slate-700/50 hover:from-white/80 hover:to-gray-50/80 dark:hover:from-slate-600/80 dark:hover:to-slate-500/80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
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
                              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {msg.sender}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{msg.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {msg.message}
                          </p>
                          {msg.unread && (
                            <div className="absolute top-3 right-3 h-2 w-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex space-x-3 p-3 rounded-2xl bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 text-sm border border-gray-200 dark:border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300/50 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm transition-all duration-300"
                      />
                      <button className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'email' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Email
                      </h3>
                      <button className="px-3 py-1 text-xs bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        <Plus className="h-3 w-3 inline mr-1" />
                        Compose
                      </button>
                    </div>
                    <div className="space-y-2">
                      {emailList.map(email => (
                        <div
                          key={email.id}
                          className={`p-3 rounded-lg border ${email.unread ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-700'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {email.from}
                            </span>
                            <span className="text-xs text-gray-500">{email.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {email.subject}
                          </p>
                          {email.unread && (
                            <div className="h-2 w-2 bg-emerald-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'tasks' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Tasks
                      </h3>
                      <button className="px-3 py-1 text-xs bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Plus className="h-3 w-3 inline mr-1" />
                        Add Task
                      </button>
                    </div>
                    <div className="space-y-2">
                      {tasks.map(task => (
                        <div
                          key={task.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <button
                              className={`p-1 rounded ${task.completed ? 'text-green-600' : 'text-gray-400'}`}
                            >
                              {task.completed ? (
                                <CheckSquare className="h-4 w-4" />
                              ) : (
                                <Square className="h-4 w-4" />
                              )}
                            </button>
                            <span
                              className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}
                            >
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
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
                            <span className="text-xs text-gray-500">{task.due}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'phone' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Phone
                      </h3>
                      <div className="flex space-x-1">
                        <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Video className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {recentCalls.map(call => (
                        <div
                          key={call.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {call.contact}
                            </span>
                            <span className="text-xs text-gray-500">{call.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  call.type === 'incoming'
                                    ? 'bg-green-400'
                                    : call.type === 'outgoing'
                                      ? 'bg-blue-400'
                                      : 'bg-red-400'
                                }`}
                              ></div>
                              <span className="text-xs text-gray-600 dark:text-gray-300">
                                {call.type}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{call.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'text' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        SMS
                      </h3>
                      <button className="px-3 py-1 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        <Plus className="h-3 w-3 inline mr-1" />
                        New SMS
                      </button>
                    </div>
                    <div className="space-y-2">
                      {smsMessages.map(sms => (
                        <div
                          key={sms.id}
                          className={`p-3 rounded-lg border ${sms.unread ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-700'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {sms.contact}
                            </span>
                            <span className="text-xs text-gray-500">{sms.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{sms.message}</p>
                          {sms.unread && (
                            <div className="h-2 w-2 bg-indigo-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'video' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Video Calls
                      </h3>
                      <button className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <Video className="h-3 w-3 inline mr-1" />
                        Start Call
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-8 w-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <Video className="h-4 w-4 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Team Meeting
                            </p>
                            <p className="text-xs text-gray-500">Starting in 5 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!rightSidebarCollapsed && activeCrmTab === 'calendar' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Calendar
                      </h3>
                      <button className="px-3 py-1 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Plus className="h-3 w-3 inline mr-1" />
                        Add Event
                      </button>
                    </div>
                    <div className="space-y-2">
                      {calendarEvents.map(event => (
                        <div
                          key={event.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {event.title}
                            </span>
                            <span className="text-xs text-gray-500">{event.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-300">
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Notes
                      </h3>
                      <button className="px-3 py-1 text-xs bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                        <Plus className="h-3 w-3 inline mr-1" />
                        New Note
                      </button>
                    </div>
                    <div className="space-y-2">
                      {notes.map(note => (
                        <div
                          key={note.id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {note.title}
                            </span>
                            <span className="text-xs text-gray-500">{note.updated}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{note.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced CRM Sidebar Footer */}
              <div className="relative p-4 border-t border-gradient-to-r from-purple-200/50 to-pink-200/50 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm">
                <div className="relative flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-br from-purple-50/90 via-pink-50/80 to-indigo-50/90 border border-purple-200/50 shadow-lg backdrop-blur-sm overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-lg animate-pulse delay-1000"></div>

                  <div className="relative h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Zap className="h-5 w-5 text-white" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>

                  {!rightSidebarCollapsed && (
                    <div className="flex-1 relative">
                      <p className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        CRM Command Center
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></div>
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse delay-100"></div>
                          <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                          All systems operational
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Status indicator */}
                  <div className="relative">
                    <div className="h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 h-3 w-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile CRM Sidebar Overlay */}
        {!rightSidebarCollapsed && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setRightSidebarCollapsed(true)}
            />
            {/* Mobile CRM Sidebar */}
            <aside className="absolute right-0 top-0 w-80 h-full bg-gradient-to-b from-white/95 via-white/90 to-white/85 dark:from-slate-800/95 dark:via-slate-800/90 dark:to-slate-800/85 backdrop-blur-xl shadow-2xl border-l border-gradient-to-b from-purple-200/50 via-pink-200/30 to-indigo-200/50 dark:from-purple-800/50 dark:via-pink-800/30 dark:to-indigo-800/50">
              <div className="flex flex-col h-full relative overflow-hidden">
                {/* Mobile CRM Header */}
                <div className="relative p-4 border-b border-gradient-to-r from-purple-200/50 to-pink-200/50 dark:from-purple-800/50 dark:to-pink-800/50 bg-gradient-to-r from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 flex items-center justify-center shadow-lg">
                          <MessageCircle className="h-5 w-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          CRM Command Center
                        </h3>
                        <p className="text-xs text-gray-500 font-medium">All systems active</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setRightSidebarCollapsed(true)}
                      className="p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:text-gray-100 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                    >
                      <ChevronRight className="h-4 w-4 transition-all duration-300 rotate-180" />
                    </button>
                  </div>
                </div>

                {/* Mobile CRM Tabs */}
                <div className="relative p-4 border-b border-gradient-to-r from-purple-200/30 to-pink-200/30 dark:from-purple-800/30 dark:to-pink-800/30 bg-gradient-to-r from-white/60 to-white/40 dark:from-slate-700/60 dark:to-slate-600/40 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-3">
                    {crmTabs.map((tab, index) => {
                      const Icon = tab.icon;
                      const isActive = activeCrmTab === tab.id;
                      return (
                        <motion.button
                          key={tab.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setActiveCrmTab(tab.id)}
                          className={`group relative flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 overflow-hidden ${
                            isActive
                              ? `${tab.bgColor} ${tab.borderColor} border-2 shadow-lg transform scale-105`
                              : 'hover:bg-white/70 dark:hover:bg-slate-600/70 hover:shadow-md hover:scale-102 backdrop-blur-sm border border-transparent'
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
                                ? 'bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-700/90 dark:to-slate-600/70 shadow-md'
                                : 'bg-white/50 dark:bg-slate-700/50 group-hover:bg-white/70 dark:group-hover:bg-slate-600/70 group-hover:shadow-sm'
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
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                            )}
                          </div>

                          <div className="relative flex-1">
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
                              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-current to-transparent opacity-50"></div>
                            )}
                          </div>

                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile CRM Content */}
                <div className="flex-1 p-4 overflow-y-auto relative">
                  {/* Content Background Pattern */}
                  <div className="absolute inset-0 opacity-3">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-100/20 to-pink-100/20"></div>
                  </div>

                  {activeCrmTab === 'chat' && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 relative"
                    >
                      <div className="text-center py-8">
                        <div className="text-gray-500 text-sm">Chat functionality</div>
                        <div className="text-xs text-gray-400 mt-2">Available on desktop</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Other CRM tabs content would go here - simplified for mobile */}
                  {activeCrmTab !== 'chat' && (
                    <div className="text-center py-8">
                      <div className="text-gray-500 text-sm">
                        {activeCrmTab.charAt(0).toUpperCase() + activeCrmTab.slice(1)} functionality
                      </div>
                      <div className="text-xs text-gray-400 mt-2">Available on desktop</div>
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

export default SuperAdminPortal;
