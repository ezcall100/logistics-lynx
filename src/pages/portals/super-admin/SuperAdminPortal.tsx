import React, { useState, useCallback, useMemo, useEffect, Suspense, lazy, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

// Lazy load heavy components for better performance
const LazyEnterpriseDashboard = lazy(() => import('../../../components/super-admin/EnterpriseDashboard'));
const LazyUserManagement = lazy(() => import('../../../components/super-admin/UserManagement'));
const LazyBusinessIntelligenceCenter = lazy(() => import('../../../components/super-admin/BusinessIntelligenceCenter'));
const LazyGlobalSettings = lazy(() => import('../../../components/super-admin/GlobalSettings'));
const LazySecurityCompliance = lazy(() => import('../../../components/super-admin/SecurityCompliance'));
const LazySystemHealthMonitor = lazy(() => import('../../../components/super-admin/SystemHealthMonitor'));
const LazyMCPAgentOrchestrationCenter = lazy(() => import('../../../components/super-admin/MCPAgentOrchestrationCenter'));
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
  FileText,
} from 'lucide-react';

// Import the new modular Communication Hub
import { CommunicationHub } from '../../../components/CommunicationHub/CommunicationHub';

// Import all the real Super Admin components
import EnterpriseDashboard from '../../../components/super-admin/EnterpriseDashboard';
import UserManagement from '../../../components/super-admin/UserManagement';
import { AllUsersPage } from '../../../components/super-admin/user-management/AllUsersPage';
import { UserRolesPage } from '../../../components/super-admin/user-management/UserRolesPage';
import UserGroupsPage from '../../../components/super-admin/user-management/UserGroupsPage';
import { AccessControlPage } from '../../../components/super-admin/user-management/AccessControlPage';
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
import DatabaseManagement from '../../../components/super-admin/system-administration/DatabaseManagement';
import APIManagement from '../../../components/super-admin/system-administration/APIManagement';
import ServerMonitoring from '../../../components/super-admin/system-administration/ServerMonitoring';
import SecuritySettings from '../../../components/super-admin/system-administration/SecuritySettings';
import SystemSettings from '../../../components/super-admin/system-administration/SystemSettings';

// Import MCP Agents components
import { MCPOverview } from '../../../components/super-admin/mcp-agents/MCPOverview';
import { AgentWorkflows } from '../../../components/super-admin/mcp-agents/AgentWorkflows';

// Import Analytics & Reports components
import BusinessAnalytics from '../../../components/super-admin/analytics/BusinessAnalytics';
import PerformanceReports from '../../../components/super-admin/analytics/PerformanceReports';
import FinancialReports from '../../../components/super-admin/analytics/FinancialReports';

// Import Development & DevOps components
import { CICDPipeline } from '../../../components/super-admin/development-devops/CICDPipeline';
import { EnvironmentManagement } from '../../../components/super-admin/development-devops/EnvironmentManagement';
import { DeploymentMonitoring } from '../../../components/super-admin/development-devops/DeploymentMonitoring';
import { InfrastructureAsCode } from '../../../components/super-admin/development-devops/InfrastructureAsCode';
import { DevOpsAnalytics } from '../../../components/super-admin/development-devops/DevOpsAnalytics';

// Import Dashboard pages
import SystemOverview from '../../../components/super-admin/dashboard/SystemOverview';
import ActiveUsers from '../../../components/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from '../../../components/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from '../../../components/super-admin/dashboard/SystemAlerts';

// Import Communication Hub pages
import CommunicationHubOverview from '../../../components/super-admin/communication-hub/CommunicationHubOverview';
import CommunicationHubCustomization from '../../../components/super-admin/communication-hub/CommunicationHubCustomization';

// Import Settings and Profile pages
import CompanySettings from '@/components/super-admin/settings/CompanySettings';
import ProfilePage from '../../../components/super-admin/profile/ProfilePage';

// Import Real-Time Development Monitor
import { RealTimeDevelopmentMonitor } from '../../../components/super-admin/RealTimeDevelopmentMonitor';
import AutonomousDevelopmentDashboard from '../../../components/super-admin/AutonomousDevelopmentDashboard';
import AccountabilityDashboard from '../../../components/super-admin/AccountabilityDashboard';
import ProgressTrackingDashboard from '../../../components/super-admin/ProgressTrackingDashboard';
import SystemVerificationDashboard from '../../../components/super-admin/SystemVerificationDashboard';
import CommanderStatusReport from '../../../components/super-admin/CommanderStatusReport';
import EnhancedUserManagement from '../../../components/super-admin/EnhancedUserManagement';
import AuditLoggingSystem from '../../../components/super-admin/AuditLoggingSystem';
import SystemMonitoringDashboard from '../../../components/super-admin/SystemMonitoringDashboard';

// Placeholder component for Settings Management
const SettingsManagementPlaceholder = () => (
  <div className="p-6 responsive-container">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 responsive-container">Settings Management</h2>
    <p className="text-gray-600 dark:text-gray-400 responsive-container">
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
    // DEMO / PLACEHOLDER Users - New Demo Users for Each Role
    {
      id: 7,
      name: 'DEMO Shipper User',
      email: 'demo.shipper@logisticslynx.com',
      role: 'Shipper',
      company: 'DEMO Shipping Corp',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Shipper Access'],
    },
    {
      id: 8,
      name: 'DEMO Broker User',
      email: 'demo.broker@logisticslynx.com',
      role: 'Broker',
      company: 'DEMO Brokerage LLC',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Broker Access'],
    },
    {
      id: 9,
      name: 'DEMO Carrier User',
      email: 'demo.carrier@logisticslynx.com',
      role: 'Carrier',
      company: 'DEMO Transport Inc',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Carrier Access'],
    },
    {
      id: 10,
      name: 'DEMO Owner Operator',
      email: 'demo.owneroperator@logisticslynx.com',
      role: 'Owner Operator',
      company: 'DEMO Independent Trucking',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Owner Operator Access'],
    },
    // DEMO / PLACEHOLDER Service Provider Companies
    {
      id: 11,
      name: 'DEMO Warehousing Manager',
      email: 'demo.warehousing@logisticslynx.com',
      role: 'Warehousing & 3PL',
      company: 'DEMO Storage Solutions Inc',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Warehousing Access'],
    },
    {
      id: 12,
      name: 'DEMO Freight Forwarder',
      email: 'demo.freightforwarding@logisticslynx.com',
      role: 'Freight Forwarding',
      company: 'DEMO Global Freight Solutions',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Freight Forwarding Access'],
    },
    {
      id: 13,
      name: 'DEMO Insurance Agent',
      email: 'demo.insurance@logisticslynx.com',
      role: 'Insurance Services',
      company: 'DEMO Transport Insurance Group',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Insurance Access'],
    },
    {
      id: 14,
      name: 'DEMO Fleet Services Manager',
      email: 'demo.fleetservices@logisticslynx.com',
      role: 'Fleet Services',
      company: 'DEMO Fleet Solutions LLC',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Fleet Services Access'],
    },
    {
      id: 15,
      name: 'DEMO Technology Director',
      email: 'demo.technology@logisticslynx.com',
      role: 'Technology Solutions',
      company: 'DEMO Logistics Tech Corp',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Technology Access'],
    },
    {
      id: 16,
      name: 'DEMO Logistics Consultant',
      email: 'demo.consulting@logisticslynx.com',
      role: 'Consulting Services',
      company: 'DEMO Strategic Logistics Consulting',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Consulting Access'],
    },
    {
      id: 17,
      name: 'DEMO Customs Broker',
      email: 'demo.customs@logisticslynx.com',
      role: 'Customs Brokerage',
      company: 'DEMO Customs Clearance Services',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Customs Brokerage Access'],
    },
    {
      id: 18,
      name: 'DEMO Maintenance Manager',
      email: 'demo.maintenance@logisticslynx.com',
      role: 'Truck Maintenance & Repair',
      company: 'DEMO Truck Service Center',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      permissions: ['Maintenance Access'],
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

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen responsive-container">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 responsive-container"></div>
  </div>
);

// Error boundary for Super Admin Portal
class SuperAdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Super Admin Portal Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
        <div className="flex items-center justify-center min-h-screen bg-gray-50 responsive-container">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg responsive-container">
            <h2 className="text-2xl font-bold text-red-600 mb-4 responsive-container">Super Admin Portal Error</h2>
            <p className="text-gray-600 mb-4 responsive-container">Something went wrong in the Super Admin Portal</p>
            <button 
              onClick={() = aria-label="Button"> this.setState({ hasError: false, error: null })}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors responsive-container"
            >
              Reload Portal
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const SuperAdminPortal: React.FC = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const toggleDarkMode = useCallback(toggleTheme, [toggleTheme]);
  const [activeTab, setActiveTab] = useState('system-overview');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(12);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRealTimeMonitor, setShowRealTimeMonitor] = useState(true);
  const [loading, setLoading] = useState(false);

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
          id: 'autonomous-dashboard',
          label: 'Autonomous Development',
          icon: Activity,
          description: 'Real-time monitoring of 302 MCP agents',
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          component: AutonomousDevelopmentDashboard,
        },
        {
          id: 'accountability-dashboard',
          label: 'Accountability Dashboard',
          icon: Shield,
          description: 'Full transparency and verification system',
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          component: AccountabilityDashboard,
        },
        {
          id: 'progress-tracking',
          label: 'Progress Tracking',
          icon: BarChart3,
          description: 'Live build progress and agent assignments',
          color: 'text-purple-500',
          bgColor: 'bg-purple-50',
          component: ProgressTrackingDashboard,
        },
        {
          id: 'system-verification',
          label: 'System Verification',
          icon: Shield,
          description: 'Port monitoring and system health verification',
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-50',
          component: SystemVerificationDashboard,
        },
        {
          id: 'commander-status',
          label: 'Commander Status Report',
          icon: Shield,
          description: 'Final verification and mission status',
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          component: CommanderStatusReport,
        },
        {
          id: 'enhanced-user-management',
          label: 'Enhanced User Management',
          icon: Users,
          description: 'Complete RBAC system with audit logging',
          color: 'text-indigo-500',
          bgColor: 'bg-indigo-50',
          component: EnhancedUserManagement,
        },
        {
          id: 'audit-logging-system',
          label: 'Audit Logging System',
          icon: FileText,
          description: 'Comprehensive audit trail for all activities',
          color: 'text-amber-500',
          bgColor: 'bg-amber-50',
          component: AuditLoggingSystem,
        },
        {
          id: 'system-monitoring',
          label: 'System Monitoring',
          icon: Activity,
          description: 'Real-time monitoring of all system ports',
          color: 'text-cyan-500',
          bgColor: 'bg-cyan-50',
          component: SystemMonitoringDashboard,
        },
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
          component: AllUsersPage,
        },
        {
          id: 'user-roles',
          label: 'User Roles',
          path: '/super-admin/user-management/UserRoles',
          component: UserRolesPage,
        },
        {
          id: 'user-groups',
          label: 'User Groups',
          path: '/super-admin/user-management/UserGroups',
          component: UserGroupsPage,
        },
        {
          id: 'access-control',
          label: 'Access Control',
          path: '/super-admin/user-management/AccessControl',
          component: AccessControlPage,
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
      icon: Settings,
      description: 'Development and deployment',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      component: GlobalSettings,
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
          id: 'deployment-monitoring',
          label: 'Deployment Monitoring',
          path: '/super-admin/development-devops/DeploymentMonitoring',
          component: DeploymentMonitoring,
        },
        {
          id: 'infrastructure-as-code',
          label: 'Infrastructure as Code',
          path: '/super-admin/development-devops/InfrastructureAsCode',
          component: InfrastructureAsCode,
        },
        {
          id: 'devops-analytics',
          label: 'DevOps Analytics',
          path: '/super-admin/development-devops/DevOpsAnalytics',
          component: DevOpsAnalytics,
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
      <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40 responsive-container">
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 responsive-container">
          <div className="flex items-center space-x-3 sm:space-x-4 responsive-container">
            <button
              onClick={() = aria-label="Button"> setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden responsive-container"
            >
              <Menu className="h-5 w-5 responsive-container" />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3 responsive-container">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg responsive-container">
                <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white responsive-container" />
              </div>
              <div className="hidden sm:block responsive-container">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent responsive-container">
                  TransBot AI
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium responsive-container">
                  Super Admin Portal
                </p>
              </div>
              <div className="sm:hidden responsive-container">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent responsive-container">
                  TransBot AI
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
                placeholder="Search companies, users, reports..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-48 lg:w-80 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm responsive-container"
              />
            </div>
            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm responsive-container" aria-label="Button">
              <Search className="h-5 w-5 responsive-container" />
            </button>

            {/* Essential Icons */}
            <div className="flex items-center space-x-1 responsive-container">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors responsive-container"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}
               aria-label="Button">
                {darkMode ? <Sun className="h-5 w-5 responsive-container" /> : <Moon className="h-5 w-5 responsive-container" />}
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container" aria-label="Button">
                <Bell className="h-5 w-5 responsive-container" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center responsive-container">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Real-Time Development Monitor Toggle */}
              <button
                onClick={() = aria-label="Button"> setShowRealTimeMonitor(!showRealTimeMonitor)}
                className={`relative p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transition-colors ${
                  showRealTimeMonitor
                    ? 'text-green-500 hover:text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-400 hover:text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={
                  showRealTimeMonitor ? 'Hide Real-Time Development' : 'Show Real-Time Development'
                }
              >
                <Activity className="h-5 w-5 responsive-container" />
                {showRealTimeMonitor && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse responsive-container">
                    <div className="w-2 h-2 bg-white rounded-full responsive-container"></div>
                  </span>
                )}
              </button>

              {/* Settings */}
              <button
                onClick={() = aria-label="Button"> setActiveTab('company-settings')}
                className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl hover:bg-gray-100 transition-colors responsive-container"
                title="Company Settings"
              >
                <Settings className="h-5 w-5 responsive-container" />
              </button>

              {/* User Profile */}
              <div className="relative responsive-container">
                <button
                  onClick={() = aria-label="Button"> setActiveTab('profile')}
                  className="flex items-center space-x-2 ml-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors responsive-container"
                  title="Profile & Account"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md responsive-container">
                    <UserIcon className="h-4 w-4 text-white responsive-container" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 responsive-container">
                    Super Admin
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex responsive-container">
        {/* Left Sidebar - Super Admin Navigation */}
        <aside
          className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="h-full flex flex-col responsive-container">
            {/* Sidebar Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700/50 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                {!sidebarCollapsed && (
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 responsive-container">
                    Navigation
                  </h2>
                )}
                <button
                  onClick={() = aria-label="Button"> setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors responsive-container"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5 responsive-container" />
                  ) : (
                    <ChevronLeft className="h-5 w-5 responsive-container" />
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto responsive-container">
              {navigationItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isExpanded = expandedMenus.includes(item.id);

                return (
                  <div key={item.id} className="space-y-1 responsive-container">
                    {/* Main Menu Item */}
                    <div className="space-y-1 responsive-container">
                      <button
                        onClick={() = aria-label="Button"> {
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
                        <div className="flex items-center space-x-2 sm:space-x-3 responsive-container">
                          <Icon
                            className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                          />
                          {!sidebarCollapsed && (
                            <div className="flex-1 text-left responsive-container">
                              <div className="flex items-center space-x-2 responsive-container">
                                <span
                                  className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:text-gray-100'}`}
                                >
                                  {item.label}
                                </span>
                                {(item as { badge?: number }).badge && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full responsive-container">
                                    {(item as { badge?: number }).badge}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate responsive-container">
                                {item.description}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 responsive-container">
                          {!sidebarCollapsed && item.count && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full responsive-container">
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
                        className="ml-2 sm:ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-2 sm:pl-4 responsive-container"
                      >
                        {item.subMenus.map(subMenu => {
                          const isSubActive = activeTab === subMenu.id;

                          return (
                            <button
                              key={subMenu.id}
                              onClick={() = aria-label="Button"> handleMenuItemClick(subMenu.id, subMenu.path || '')}
                              className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 group ${
                                isSubActive
                                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30 text-blue-700 dark:text-blue-300'
                                  : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                              }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600 responsive-container" />
                              <span className="text-sm font-medium responsive-container">{subMenu.label}</span>
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
        <main className="flex-1 p-3 sm:p-4 md:p-6 responsive-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full responsive-container"
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
          className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-700 shadow-xl relative z-20 responsive-container"
        >
          <div className="h-full flex flex-col responsive-container">
            {/* Communication Hub Header */}
            {!rightSidebarCollapsed && (
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 responsive-container">
                <div className="flex items-center justify-between responsive-container">
                  <div className="flex items-center space-x-3 responsive-container">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg responsive-container">
                      <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 responsive-container" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        Hub
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                        Communication center
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() = aria-label="Button"> setRightSidebarCollapsed(!rightSidebarCollapsed)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 responsive-container"
                    title="Collapse Hub"
                  >
                    <ChevronRight className="h-5 w-5 responsive-container" />
                  </button>
                </div>
              </div>
            )}

            {/* Collapsed Header - Only Toggle Button */}
            {rightSidebarCollapsed && (
              <div className="p-2 border-b border-gray-200 dark:border-gray-700 responsive-container">
                <div className="flex justify-center responsive-container">
                  <button
                    onClick={() = aria-label="Button"> setRightSidebarCollapsed(!rightSidebarCollapsed)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200 responsive-container"
                    title="Expand Hub"
                  >
                    <ChevronLeft className="h-5 w-5 responsive-container" />
                  </button>
                </div>
              </div>
            )}

            {/* Communication Hub Content */}
            <div className="flex-1 overflow-hidden responsive-container">
              {rightSidebarCollapsed ? (
                <div className="flex flex-col items-center py-6 space-y-4 responsive-container">
                  <button
                    onClick={() = aria-label="Button"> setRightSidebarCollapsed(false)}
                    className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105 responsive-container"
                    title="Expand Hub"
                  >
                    <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 responsive-container" />
                  </button>
                  <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 rounded responsive-container"></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight font-medium responsive-container">
                    Hub
                  </div>
                  <div className="flex flex-col space-y-2 mt-4 responsive-container">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse responsive-container"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-pulse responsive-container"
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-purple-500 rounded-full animate-pulse responsive-container"
                      style={{ animationDelay: '1s' }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="h-full overflow-y-auto responsive-container">
                  <CommunicationHub />
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden responsive-container">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 responsive-container"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg responsive-container">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 responsive-container">
                  Navigation
                </h2>
                <button
                  onClick={() = aria-label="Button"> setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 responsive-container"
                >
                  <X className="h-5 w-5 responsive-container" />
                </button>
              </div>
            </div>
            <nav className="p-4 responsive-container">
              <div className="space-y-2 responsive-container">
                {navigationItems.map(item => {
                  const isActive = activeTab === item.id;
                  const isExpanded = expandedMenus.includes(item.id);

                  return (
                    <div key={item.id} className="space-y-1 responsive-container">
                      {/* Main Menu Item */}
                      <button
                        onClick={() = aria-label="Button"> {
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
                        <div className="flex items-center space-x-3 responsive-container">
                          <item.icon
                            className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`}
                          />
                          <div className="flex-1 text-left responsive-container">
                            <div className="font-medium responsive-container">{item.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate responsive-container">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 responsive-container">
                          {item.count && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full responsive-container">
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
                        <div className="ml-4 space-y-1 responsive-container">
                          {item.subMenus.map(subMenu => {
                            const isSubActive = activeTab === subMenu.id;

                            return (
                              <button
                                key={subMenu.id}
                                onClick={() = aria-label="Button"> {
                                  setActiveTab(subMenu.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                                  isSubActive
                                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600 responsive-container" />
                                <span className="text-sm font-medium responsive-container">{subMenu.label}</span>
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
