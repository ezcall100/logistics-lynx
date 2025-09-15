import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  Users,
  TrendingUp,
  Shield,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  Globe,
  Brain,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
  User as UserIcon,
  MessageCircle,
  Building,
  Activity,
  GitBranch,
  Server,
} from 'lucide-react';

// Import the new modular Communication Hub
import { CommunicationHub } from '../../../components/CommunicationHub';

// Import all the real Super Admin components
import EnterpriseDashboard from '../../../components/super-admin/EnterpriseDashboard';
import UserManagement from '../../../components/super-admin/UserManagement';
import AllUsers from '../../../components/super-admin/user-management/AllUsers';
import UserRoles from '../../../components/super-admin/user-management/UserRoles';
import UserGroups from '../../../components/super-admin/user-management/UserGroups';
import AccessControl from '../../../components/super-admin/user-management/AccessControl';
import { UserAnalyticsPage } from '../../../components/super-admin/user-management/UserAnalyticsPage';
import { BillingManagementPage } from '../../../components/super-admin/user-management/BillingManagementPage';
import { SupportTicketsPage } from '../../../components/super-admin/user-management/SupportTicketsPage';
import { UserOnboardingPage } from '../../../components/super-admin/user-management/UserOnboardingPage';
import PortalManagement from '../../../components/super-admin/PortalManagement';
import BusinessIntelligenceCenter from '../../../components/super-admin/BusinessIntelligenceCenter';
import GlobalSettings from '../../../components/super-admin/GlobalSettings';
import SecurityCompliance from '../../../components/super-admin/SecurityCompliance';
import SystemHealthMonitor from '../../../components/super-admin/SystemHealthMonitor';
import MCPAgentOrchestrationCenter from '../../../components/super-admin/MCPAgentOrchestrationCenter';
import SecurityWarRoom from '../../../components/super-admin/SecurityWarRoom';

// Import System Administration components
import { DatabaseManagement } from '../../../components/super-admin/system-administration/DatabaseManagement';
import { APIManagement } from '../../../components/super-admin/system-administration/APIManagement';
import { ServerMonitoring } from '../../../components/super-admin/system-administration/ServerMonitoring';
import { SecuritySettings } from '../../../components/super-admin/system-administration/SecuritySettings';
import { SystemSettings } from '../../../components/super-admin/system-administration/SystemSettings';

// Import MCP Agents components
import { MCPOverview } from '../../../components/super-admin/mcp-agents/MCPOverview';
import { AgentWorkflows } from '../../../components/super-admin/mcp-agents/AgentWorkflows';

// Import Analytics & Reports components
import { BusinessAnalytics } from '../../../components/super-admin/analytics/BusinessAnalytics';
import { PerformanceReports } from '../../../components/super-admin/analytics/PerformanceReports';
import { FinancialReports } from '../../../components/super-admin/analytics/FinancialReports';

// Import Dashboard pages
import SystemOverview from '../../../components/super-admin/dashboard/SystemOverview';
import ActiveUsers from '../../../components/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from '../../../components/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from '../../../components/super-admin/dashboard/SystemAlerts';

// Import Communication Hub pages
import CommunicationHubOverview from '../../../components/super-admin/communication-hub/CommunicationHubOverview';
import CommunicationHubCustomization from '../../../components/super-admin/communication-hub/CommunicationHubCustomization';

// Import Settings and Profile pages
import CompanySettings from '../../../components/super-admin/settings/CompanySettings';
import ProfilePage from '../../../components/super-admin/profile/ProfilePage';

// Import Real-Time Development Monitor
import RealTimeDevelopmentMonitor from '../../../components/super-admin/RealTimeDevelopmentMonitor';

// Import DevOps components
import CICDPipeline from '../../../components/super-admin/devops/CICDPipeline';
import EnvironmentManagement from '../../../components/super-admin/devops/EnvironmentManagement';

// Placeholder component for Settings Management
const SettingsManagementPlaceholder = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings Management</h2>
    <p className="text-gray-600 dark:text-gray-400">
      Settings Management functionality coming soon...
    </p>
  </div>
);

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
        address: '123 Demo Street, Demo City, DC 00001',
      },
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
        address: '456 Demo Avenue, Demo City, DC 00002',
      },
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
        address: '789 Demo Boulevard, Demo City, DC 00003',
      },
    },
  ],
  users: [
    {
      id: 1,
      name: 'DEMO Admin User',
      email: 'admin@demo.com',
      role: 'Super Admin',
      company: 'DEMO Company A',
      status: 'Active',
      lastLogin: '2024-01-15T10:30:00Z',
      permissions: ['Full Access'],
    },
    {
      id: 2,
      name: 'DEMO Manager User',
      email: 'manager@demo.com',
      role: 'Manager',
      company: 'DEMO Company B',
      status: 'Active',
      lastLogin: '2024-01-15T09:15:00Z',
      permissions: ['Management Access'],
    },
  ],
  systemMetrics: {
    totalCompanies: 1247,
    totalUsers: 15689,
    monthlyRevenue: 425000,
    systemUptime: 99.97,
    apiCalls: 1250000,
    databaseQueries: 890000,
    storageUsed: 2.4,
    bandwidth: 15.8,
    mcpAgents: 301,
    responseTime: 45,
    errorRate: 0.03,
  },
};

const SuperAdminPortal: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('system-overview');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(12);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRealTimeMonitor, setShowRealTimeMonitor] = useState(true);

  const handleMenuToggle = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const handleMenuItemClick = (menuId: string, path: string) => {
    setActiveTab(menuId);
    // Handle navigation logic here
    console.log(`Navigating to ${path}`);
  };

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'System overview and metrics',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      component: EnterpriseDashboard,
      subMenus: [
        {
          id: 'system-overview',
          label: 'System Overview',
          path: '/super-admin/dashboard',
          component: SystemOverview,
        },
        {
          id: 'active-users',
          label: 'Active Users',
          path: '/super-admin/dashboard/users',
          component: ActiveUsers,
        },
        {
          id: 'revenue-metrics',
          label: 'Revenue Metrics',
          path: '/super-admin/dashboard/revenue',
          component: RevenueMetrics,
        },
        {
          id: 'system-alerts',
          label: 'System Alerts',
          path: '/super-admin/dashboard/alerts',
          component: SystemAlerts,
        },
      ],
    },
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      description: 'User accounts & permissions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      count: mockData.users.length,
      component: UserManagement,
      subMenus: [
        {
          id: 'all-users',
          label: 'All Users',
          path: '/super-admin/user-management/AllUsers',
          component: AllUsers,
        },
        {
          id: 'user-roles',
          label: 'User Roles',
          path: '/super-admin/user-management/UserRoles',
          component: UserRoles,
        },
        {
          id: 'user-groups',
          label: 'User Groups',
          path: '/super-admin/user-management/UserGroups',
          component: UserGroups,
        },
        {
          id: 'access-control',
          label: 'Access Control',
          path: '/super-admin/user-management/AccessControl',
          component: AccessControl,
        },
        {
          id: 'user-analytics',
          label: 'User Analytics',
          path: '/super-admin/user-management/UserAnalytics',
          component: UserAnalyticsPage,
        },
        {
          id: 'billing-management',
          label: 'Billing Management',
          path: '/super-admin/user-management/BillingManagement',
          component: BillingManagementPage,
        },
        {
          id: 'support-tickets',
          label: 'Support Tickets',
          path: '/super-admin/user-management/SupportTickets',
          component: SupportTicketsPage,
        },
        {
          id: 'user-onboarding',
          label: 'User Onboarding',
          path: '/super-admin/user-management/UserOnboarding',
          component: UserOnboardingPage,
        },
      ],
    },
    {
      id: 'system-administration',
      label: 'System Administration',
      icon: Settings,
      description: 'System configuration',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      component: GlobalSettings,
      subMenus: [
        {
          id: 'database-management',
          label: 'Database Management',
          path: '/super-admin/system-administration/DatabaseManagement',
          component: DatabaseManagement,
        },
        {
          id: 'api-management',
          label: 'API Management',
          path: '/super-admin/system-administration/APIManagement',
          component: APIManagement,
        },
        {
          id: 'server-monitoring',
          label: 'Server Monitoring',
          path: '/super-admin/system-administration/ServerMonitoring',
          component: ServerMonitoring,
        },
        {
          id: 'security-settings',
          label: 'Security Settings',
          path: '/super-admin/system-administration/SecuritySettings',
          component: SecuritySettings,
        },
        {
          id: 'system-settings',
          label: 'System Settings',
          path: '/super-admin/system-administration/SystemSettings',
          component: SystemSettings,
        },
      ],
    },
    {
      id: 'mcp-agents',
      label: 'MCP Agents',
      icon: Brain,
      description: 'MCP agent orchestration',
      color: 'text-violet-500',
      bgColor: 'bg-violet-50',
      component: MCPAgentOrchestrationCenter,
      subMenus: [
        {
          id: 'mcp-overview',
          label: 'MCP Overview',
          path: '/super-admin/mcp-agents/MCPOverview',
          component: MCPOverview,
        },
        {
          id: 'agent-workflows',
          label: 'Agent Workflows',
          path: '/super-admin/mcp-agents/AgentWorkflows',
          component: AgentWorkflows,
        },
      ],
    },
    {
      id: 'analytics-reports',
      label: 'Analytics & Reports',
      icon: TrendingUp,
      description: 'Platform performance metrics',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      component: BusinessIntelligenceCenter,
      subMenus: [
        {
          id: 'business-analytics',
          label: 'Business Analytics',
          path: '/super-admin/analytics-reports/BusinessAnalytics',
          component: BusinessAnalytics,
        },
        {
          id: 'performance-reports',
          label: 'Performance Reports',
          path: '/super-admin/analytics-reports/PerformanceReports',
          component: PerformanceReports,
        },
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          path: '/super-admin/analytics-reports/FinancialReports',
          component: FinancialReports,
        },
      ],
    },
    {
      id: 'development-devops',
      label: 'Development & DevOps',
      icon: GitBranch,
      description: 'Development and deployment',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      component: CICDPipeline,
      subMenus: [
        {
          id: 'ci-cd-pipeline',
          label: 'CI/CD Pipeline',
          path: '/super-admin/development-devops/CICDPipeline',
          component: CICDPipeline,
        },
        {
          id: 'environment-management',
          label: 'Environment Management',
          path: '/super-admin/development-devops/EnvironmentManagement',
          component: EnvironmentManagement,
        },
        {
          id: 'testing-suite',
          label: 'Testing Suite',
          path: '/super-admin/qa-testing/TestingSuite',
          component: GlobalSettings,
        },
      ],
    },
    {
      id: 'ui-components',
      label: 'UI/UX Components',
      icon: Settings,
      description: 'UI component management',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      component: GlobalSettings,
      subMenus: [
        {
          id: 'ui-component-registry',
          label: 'UI Component Registry',
          path: '/super-admin/ui-components/UIComponentRegistry',
          component: GlobalSettings,
        },
        {
          id: 'design-system',
          label: 'Design System',
          path: '/super-admin/ui-components/DesignSystem',
          component: GlobalSettings,
        },
      ],
    },
    {
      id: 'deployment-operations',
      label: 'Deployment & Operations',
      icon: Settings,
      description: 'Deployment management',
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
      component: GlobalSettings,
      subMenus: [
        {
          id: 'deployment-management',
          label: 'Deployment Management',
          path: '/super-admin/deployment/DeploymentManagement',
          component: GlobalSettings,
        },
        {
          id: 'performance-monitoring',
          label: 'Performance Monitoring',
          path: '/super-admin/performance/PerformanceMonitoring',
          component: SystemHealthMonitor,
        },
        {
          id: 'uptime-monitoring',
          label: 'Uptime Monitoring',
          path: '/super-admin/system-monitoring/UptimeMonitoring',
          component: SystemHealthMonitor,
        },
      ],
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      description: 'Security monitoring',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      component: SecurityCompliance,
      subMenus: [
        {
          id: 'security-audit',
          label: 'Security Audit',
          path: '/super-admin/security/SecurityAudit',
          component: SecurityCompliance,
        },
        {
          id: 'security-policies',
          label: 'Security Policies',
          path: '/super-admin/security/SecurityPolicies',
          component: SecurityCompliance,
        },
        {
          id: 'incident-response',
          label: 'Incident Response',
          path: '/super-admin/security/IncidentResponse',
          component: SecurityWarRoom,
        },
      ],
    },
    {
      id: 'mobile-portal-management',
      label: 'Mobile & Portal Management',
      icon: Globe,
      description: 'Portal and mobile management',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      component: PortalManagement,
      subMenus: [
        {
          id: 'mobile-management',
          label: 'Mobile Management',
          path: '/super-admin/mobile/MobileManagement',
          component: PortalManagement,
        },
        {
          id: 'portal-management',
          label: 'Portal Management',
          path: '/super-admin/portal-management/PortalManagement',
          component: PortalManagement,
        },
      ],
    },
    {
      id: 'company-settings',
      label: 'Company Settings',
      icon: Building,
      description: 'Company-wide configuration and preferences',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      component: CompanySettings,
    },
    {
      id: 'settings-management',
      label: 'Settings Management',
      icon: Settings,
      description: 'System-wide settings for all portals',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      component: SettingsManagementPlaceholder,
      subMenus: [
        {
          id: 'global-settings',
          label: 'Global Settings',
          path: '/super-admin/settings-management/GlobalSettings',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'portal-settings',
          label: 'Portal Settings',
          path: '/super-admin/settings-management/PortalSettings',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'user-preferences',
          label: 'User Preferences',
          path: '/super-admin/settings-management/UserPreferences',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'security-settings',
          label: 'Security Settings',
          path: '/super-admin/settings-management/SecuritySettings',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'notification-settings',
          label: 'Notification Settings',
          path: '/super-admin/settings-management/NotificationSettings',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'integration-settings',
          label: 'Integration Settings',
          path: '/super-admin/settings-management/IntegrationSettings',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'backup-restore',
          label: 'Backup & Restore',
          path: '/super-admin/settings-management/BackupRestore',
          component: SettingsManagementPlaceholder,
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          path: '/super-admin/settings-management/AuditLogs',
          component: SettingsManagementPlaceholder,
        },
      ],
    },
    {
      id: 'communication-hub',
      label: 'Communication Hub',
      icon: MessageCircle,
      description: 'Communication Hub management',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      component: CommunicationHubOverview,
      subMenus: [
        {
          id: 'communication-hub-overview',
          label: 'Communication Hub Overview',
          path: '/super-admin/communication-hub/CommunicationHubOverview',
          component: CommunicationHubOverview,
        },
        {
          id: 'communication-hub-customization',
          label: 'Communication Hub Customization',
          path: '/super-admin/communication-hub/CommunicationHubCustomization',
          component: CommunicationHubCustomization,
        },
      ],
    },
  ];

  const getActiveComponent = () => {
    // Handle Settings and Profile pages
    if (activeTab === 'profile') {
      return ProfilePage;
    }

    // Handle Company Settings page
    if (activeTab === 'company-settings') {
      return CompanySettings;
    }

    // First check if activeTab matches a submenu
    for (const item of navigationItems) {
      if (item.subMenus) {
        const subMenu = item.subMenus.find(sub => sub.id === activeTab);
        if (subMenu) {
          return subMenu.component;
        }
      }
    }

    // If not a submenu, check main menu items
    const activeItem = navigationItems.find(item => item.id === activeTab);
    return activeItem?.component || SystemOverview;
  };

  const ActiveComponent = getActiveComponent();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Header */}
      <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
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
                  TransBot AI
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
                placeholder="Search companies, users, reports..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-48 lg:w-80 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm"
              />
            </div>
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm">
              <Search className="h-5 w-5" />
            </button>

            {/* Essential Icons */}
            <div className="flex items-center space-x-1">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Real-Time Development Monitor Toggle */}
              <button
                onClick={() => setShowRealTimeMonitor(!showRealTimeMonitor)}
                className={`relative p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transition-colors ${
                  showRealTimeMonitor
                    ? 'text-green-500 hover:text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-400 hover:text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={
                  showRealTimeMonitor ? 'Hide Real-Time Development' : 'Show Real-Time Development'
                }
              >
                <Activity className="h-5 w-5" />
                {showRealTimeMonitor && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </span>
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() => setActiveTab('company-settings')}
                className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors"
                title="Company Settings"
              >
                <Settings className="h-5 w-5" />
              </button>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2 ml-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Profile & Account"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Super Admin
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Super Admin Navigation */}
        <aside
          className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                {!sidebarCollapsed && (
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Navigation
                  </h2>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isExpanded = expandedMenus.includes(item.id);

                return (
                  <div key={item.id} className="space-y-1">
                    {/* Main Menu Item */}
                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          if (item.subMenus && item.subMenus.length > 0) {
                            handleMenuToggle(item.id);
                          } else {
                            handleMenuItemClick(item.id, '');
                          }
                        }}
                        className={`w-full flex items-center justify-between px-2 sm:px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 shadow-sm'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                          />
                          {!sidebarCollapsed && (
                            <div className="flex-1 text-left">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:text-gray-100'}`}
                                >
                                  {item.label}
                                </span>
                                {(item as { badge?: number }).badge && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    {(item as { badge?: number }).badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {item.description}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {!sidebarCollapsed && item.count && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                              {item.count}
                            </span>
                          )}
                          {!sidebarCollapsed && item.subMenus && item.subMenus.length > 0 && (
                            <ChevronRight
                              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            />
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Sub-Menus */}
                    {!sidebarCollapsed && isExpanded && item.subMenus && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2 sm:ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-2 sm:pl-4"
                      >
                        {item.subMenus.map(subMenu => {
                          const isSubActive = activeTab === subMenu.id;

                          return (
                            <button
                              key={subMenu.id}
                              onClick={() => handleMenuItemClick(subMenu.id, subMenu.path)}
                              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 group ${
                                isSubActive
                                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30 text-blue-700 dark:text-blue-300'
                                  : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600" />
                              <span className="text-sm font-medium">{subMenu.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Right Sidebar - Communication Hub */}
        <motion.aside
          initial={{ width: '20rem' }}
          animate={{ width: rightSidebarCollapsed ? '4rem' : '20rem' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-700 shadow-xl relative z-20"
        >
          <div className="h-full flex flex-col">
            {/* Communication Hub Header */}
            {!rightSidebarCollapsed && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Hub
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Communication center
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                    title="Collapse Hub"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Collapsed Header - Only Toggle Button */}
            {rightSidebarCollapsed && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-center">
                  <button
                    onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                    title="Expand Hub"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Communication Hub Content */}
            <div className="flex-1 overflow-hidden">
              {rightSidebarCollapsed ? (
                <div className="flex flex-col items-center py-6 space-y-4">
                  <button
                    onClick={() => setRightSidebarCollapsed(false)}
                    className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105"
                    title="Expand Hub"
                  >
                    <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </button>
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight font-medium">
                    Hub
                  </div>
                  <div className="flex flex-col space-y-2 mt-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"
                      style={{ animationDelay: '1s' }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto">
                  <CommunicationHub />
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Navigation
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map(item => {
                  const isActive = activeTab === item.id;
                  const isExpanded = expandedMenus.includes(item.id);

                  return (
                    <div key={item.id} className="space-y-1">
                      {/* Main Menu Item */}
                      <button
                        onClick={() => {
                          if (item.subMenus && item.subMenus.length > 0) {
                            handleMenuToggle(item.id);
                          } else {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon
                            className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`}
                          />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.count && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                              {item.count}
                            </span>
                          )}
                          {item.subMenus && item.subMenus.length > 0 && (
                            <ChevronRight
                              className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} ${isActive ? 'text-white' : 'text-gray-400'}`}
                            />
                          )}
                        </div>
                      </button>

                      {/* Sub-menus */}
                      {isExpanded && item.subMenus && (
                        <div className="ml-4 space-y-1">
                          {item.subMenus.map(subMenu => {
                            const isSubActive = activeTab === subMenu.id;

                            return (
                              <button
                                key={subMenu.id}
                                onClick={() => {
                                  setActiveTab(subMenu.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                                  isSubActive
                                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600" />
                                <span className="text-sm font-medium">{subMenu.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Real-Time Development Monitor - Fixed Overlay */}
      {showRealTimeMonitor && (
        <RealTimeDevelopmentMonitor onClose={() => setShowRealTimeMonitor(false)} />
      )}
    </div>
  );
};

export default SuperAdminPortal;
