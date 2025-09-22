import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import {
  Users,
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
  ChevronRight,
  X,
  User as UserIcon,
  MessageCircle,
  Building,
  Activity,
  Rocket,
  Phone,
  Video,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Building2,
  Ticket,
  Code,
  Plug,
} from 'lucide-react';

// Import all the real Super Admin components
import EnterpriseDashboard from '../../../components/super-admin/EnterpriseDashboard';
import UserManagement from '../../../components/super-admin/UserManagement';
import AllUsers from '../../../components/super-admin/user-management/AllUsers';
import RolesPermissions from '../../../components/super-admin/user-management/RolesPermissions';
import AccessControl from '../../../components/super-admin/user-management/AccessControl';
import PortalManagement from '../../../components/super-admin/PortalManagement';
import GlobalSettings from '../../../components/super-admin/GlobalSettings';
import SecurityCompliance from '../../../components/super-admin/SecurityCompliance';
import SystemHealthMonitor from '../../../components/super-admin/SystemHealthMonitor';
import MCPAgentOrchestrationCenter from '../../../components/super-admin/MCPAgentOrchestrationCenter';

// Import AI Agents components
import AIOverview from '../../../components/super-admin/ai-agents/AIOverview';
import AIAgentManagement from '../../../components/super-admin/ai-agents/AIAgentManagement';
import AIWorkflows from '../../../components/super-admin/ai-agents/AIWorkflows';
import AITrainingLearning from '../../../components/super-admin/ai-agents/AITrainingLearning';
import AIPerformanceMonitoring from '../../../components/super-admin/ai-agents/AIPerformanceMonitoring';
import AIIntegrations from '../../../components/super-admin/ai-agents/AIIntegrations';
import AISecurityCompliance from '../../../components/super-admin/ai-agents/AISecurityCompliance';
import AIAnalyticsInsights from '../../../components/super-admin/ai-agents/AIAnalyticsInsights';

// Import Deployment components
import DeploymentOverview from '../../../components/super-admin/deployment/DeploymentOverview';
import DeploymentPipeline from '../../../components/super-admin/deployment/DeploymentPipeline';
import DeploymentEnvironments from '../../../components/super-admin/deployment/DeploymentEnvironments';
import ReleaseManagement from '../../../components/super-admin/deployment/ReleaseManagement';
import DeploymentMonitoring from '../../../components/super-admin/deployment/DeploymentMonitoring';
import RollbackRecovery from '../../../components/super-admin/deployment/RollbackRecovery';
import AutomationCICD from '../../../components/super-admin/deployment/AutomationCICD';
import DeploymentSecurity from '../../../components/super-admin/deployment/DeploymentSecurity';
import DeploymentLogs from '../../../components/super-admin/deployment/DeploymentLogs';

// Import Security components
import SecurityOverview from '../../../components/super-admin/security/SecurityOverview';
import SecurityAccessControl from '../../../components/super-admin/security/SecurityAccessControl';
import SecurityAuthentication from '../../../components/super-admin/security/SecurityAuthentication';

// Import System components
import SystemOverview from '../../../components/super-admin/system/SystemOverview';
import SystemPerformance from '../../../components/super-admin/system/SystemPerformance';
import SystemResources from '../../../components/super-admin/system/SystemResources';

// Import API Dashboard components
import APIOverview from '../../../components/super-admin/api-dashboard/APIOverview';
import APIEndpoints from '../../../components/super-admin/api-dashboard/APIEndpoints';
import APIKeys from '../../../components/super-admin/api-dashboard/APIKeys';
import APIRateLimiting from '../../../components/super-admin/api-dashboard/APIRateLimiting';
import APIAnalytics from '../../../components/super-admin/api-dashboard/APIAnalytics';
import APIDocumentation from '../../../components/super-admin/api-dashboard/APIDocumentation';
import APITesting from '../../../components/super-admin/api-dashboard/APITesting';
import APIWebhooks from '../../../components/super-admin/api-dashboard/APIWebhooks';
import APIIntegrations from '../../../components/super-admin/api-dashboard/APIIntegrations';
import APIMonitoring from '../../../components/super-admin/api-dashboard/APIMonitoring';

// Import Portal Management components
import PortalBuilder from '../../../components/super-admin/portal-management/PortalBuilder';
import UserDashboardBuilder from '../../../components/super-admin/portal-management/UserDashboardBuilder';
import HeaderCustomization from '../../../components/super-admin/portal-management/HeaderCustomization';
import SidebarCustomization from '../../../components/super-admin/portal-management/SidebarCustomization';
import RoleTemplates from '../../../components/super-admin/portal-management/RoleTemplates';

// Import Settings and Profile pages
import ProfilePage from '../../../components/super-admin/profile/ProfilePage';
import CompanySettings from '../../../components/super-admin/settings/CompanySettings';

// Import Communication pages
import LiveChatPage from '../../../components/super-admin/communication/LiveChatPage';
import AIAssistantPage from '../../../components/super-admin/communication/AIAssistantPage';
import VoiceCallsPage from '../../../components/super-admin/communication/VoiceCallsPage';
import VideoCallsPage from '../../../components/super-admin/communication/VideoCallsPage';
import EmailCenterPage from '../../../components/super-admin/communication/EmailCenterPage';
import SMSGatewayPage from '../../../components/super-admin/communication/SMSGatewayPage';
import SchedulingPage from '../../../components/super-admin/communication/SchedulingPage';
import ContactsPage from '../../../components/super-admin/communication/ContactsPage';
import NotesPage from '../../../components/super-admin/communication/NotesPage';

// Import CRM components
import CRMOverview from '../../../components/super-admin/crm/CRMOverview';
import CrmEmail from '../../../components/super-admin/crm/CrmEmail';
import CrmLeads from '../../../components/super-admin/crm/CrmLeads';
import CrmContacts from '../../../components/super-admin/crm/CrmContacts';
import CrmProjects from '../../../components/super-admin/crm/CrmProjects';
import CrmCalendar from '../../../components/super-admin/crm/CrmCalendar';
import CrmOpportunities from '../../../components/super-admin/crm/CrmOpportunities';

// Import Tickets components
import TicketsOverview from '../../../components/super-admin/tickets/TicketsOverview';
import AssignedTickets from '../../../components/super-admin/tickets/AssignedTickets';
import UnassignedTickets from '../../../components/super-admin/tickets/UnassignedTickets';
import Incidents from '../../../components/super-admin/tickets/Incidents';
import ServiceRequests from '../../../components/super-admin/tickets/ServiceRequests';
import Changes from '../../../components/super-admin/tickets/Changes';
import Problems from '../../../components/super-admin/tickets/Problems';

// Import Settings components
import GeneralSettings from '../../../components/super-admin/settings/GeneralSettings';
import SecuritySettings from '../../../components/super-admin/settings/SecuritySettings';
import DomainConfiguration from '../../../components/super-admin/settings/DomainConfiguration';
import SystemMonitoring from '../../../components/super-admin/settings/SystemMonitoring';
import IntegrationSettings from '../../../components/super-admin/settings/IntegrationSettings';

// Import Autonomous Systems components
import AutonomousSystemsActivation from '../../../components/super-admin/autonomous/AutonomousSystemsActivation';

const SuperAdminPortal: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === 'dark';
  const toggleDarkMode = toggleTheme;
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMegaDropdown, setShowMegaDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(12);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuToggle = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const handleMenuItemClick = (menuId: string) => {
    setActiveTab(menuId);
  };

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'System overview and metrics',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      activeColor: 'bg-blue-100',
      component: EnterpriseDashboard,
    },
    {
      id: 'users',
      label: 'Users & Access',
      icon: Users,
      description: 'User accounts & permissions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      activeColor: 'bg-purple-100',
      component: UserManagement,
      subMenus: [
    {
      id: 'all-users',
      label: 'All Users',
      path: '/super-admin/users/all-users',
      component: AllUsers,
    },
    {
      id: 'roles-permissions',
      label: 'Roles & Permissions',
      path: '/super-admin/users/roles-permissions',
      component: RolesPermissions,
    },
        {
          id: 'access-control',
          label: 'Access Control',
          path: '/super-admin/users/access-control',
          component: AccessControl,
        },
      ],
    },
    {
      id: 'portal-management',
      label: 'Portal Management',
      icon: Globe,
      description: 'Design user portals & dashboards',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100',
      activeColor: 'bg-indigo-100',
      component: PortalManagement,
      subMenus: [
        {
          id: 'portal-builder',
          label: 'Portal Builder',
          path: '/super-admin/portal-management/portal-builder',
          component: PortalBuilder,
        },
        {
          id: 'user-dashboard-builder',
          label: 'User Dashboard Builder',
          path: '/super-admin/portal-management/user-dashboard-builder',
          component: UserDashboardBuilder,
        },
        {
          id: 'header-customization',
          label: 'Header Customization',
          path: '/super-admin/portal-management/header-customization',
          component: HeaderCustomization,
        },
        {
          id: 'sidebar-customization',
          label: 'Sidebar Customization',
          path: '/super-admin/portal-management/sidebar-customization',
          component: SidebarCustomization,
        },
        {
          id: 'role-templates',
          label: 'Role Templates',
          path: '/super-admin/portal-management/role-templates',
          component: RoleTemplates,
        },
      ],
    },
    {
      id: 'communication-hub',
      label: 'Communication Hub',
      icon: MessageCircle,
      description: 'Communication tools and collaboration features',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      activeColor: 'bg-blue-100',
      component: LiveChatPage, // Default to Live Chat when Communication Hub is clicked
      subMenus: [
        {
          id: 'live-chat',
          label: 'Live Chat',
          path: '/super-admin/communication/live-chat',
          component: LiveChatPage,
        },
        {
          id: 'ai-assistant',
          label: 'AI Assistant',
          path: '/super-admin/communication/ai-assistant',
          component: AIAssistantPage,
        },
        {
          id: 'voice-calls',
          label: 'Voice Calls',
          path: '/super-admin/communication/voice-calls',
          component: VoiceCallsPage,
        },
        {
          id: 'video-calls',
          label: 'Video Calls',
          path: '/super-admin/communication/video-calls',
          component: VideoCallsPage,
        },
        {
          id: 'email-center',
          label: 'Email Center',
          path: '/super-admin/communication/email-center',
          component: EmailCenterPage,
        },
        {
          id: 'sms-gateway',
          label: 'SMS Gateway',
          path: '/super-admin/communication/sms-gateway',
          component: SMSGatewayPage,
        },
        {
          id: 'scheduling',
          label: 'Scheduling',
          path: '/super-admin/communication/scheduling',
          component: SchedulingPage,
        },
        {
          id: 'contacts',
          label: 'Contacts',
          path: '/super-admin/communication/contacts',
          component: ContactsPage,
        },
        {
          id: 'notes',
          label: 'Notes',
          path: '/super-admin/communication/notes',
          component: NotesPage,
        },
      ],
    },
    {
      id: 'crm',
      label: 'CRM',
      icon: Building2,
      description: 'Customer relationship management and sales',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      activeColor: 'bg-green-100',
      component: CRMOverview,
      subMenus: [
        {
          id: 'crm-overview',
          label: 'Overview',
          path: '/super-admin/crm/overview',
          component: CRMOverview,
        },
        {
          id: 'crm-email',
          label: 'Email',
          path: '/super-admin/crm/email',
          component: CrmEmail,
        },
        {
          id: 'crm-leads',
          label: 'Leads',
          path: '/super-admin/crm/leads',
          component: CrmLeads,
        },
        {
          id: 'crm-contacts',
          label: 'Contacts',
          path: '/super-admin/crm/contacts',
          component: CrmContacts,
        },
        {
          id: 'crm-projects',
          label: 'Projects',
          path: '/super-admin/crm/projects',
          component: CrmProjects,
        },
        {
          id: 'crm-calendar',
          label: 'Calendar',
          path: '/super-admin/crm/calendar',
          component: CrmCalendar,
        },
        {
          id: 'crm-opportunities',
          label: 'Opportunities',
          path: '/super-admin/crm/opportunities',
          component: CrmOpportunities,
        },
      ],
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: Ticket,
      description: 'Support tickets and service management',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      activeColor: 'bg-orange-100',
      component: TicketsOverview,
      subMenus: [
        {
          id: 'tickets-overview',
          label: 'All Tickets',
          path: '/super-admin/tickets/overview',
          component: TicketsOverview,
        },
        {
          id: 'tickets-assigned',
          label: 'Assigned',
          path: '/super-admin/tickets/assigned',
          component: AssignedTickets,
        },
        {
          id: 'tickets-unassigned',
          label: 'Unassigned',
          path: '/super-admin/tickets/unassigned',
          component: UnassignedTickets,
        },
        {
          id: 'tickets-incidents',
          label: 'Incidents',
          path: '/super-admin/tickets/incidents',
          component: Incidents,
        },
        {
          id: 'tickets-service-requests',
          label: 'Service Requests',
          path: '/super-admin/tickets/service-requests',
          component: ServiceRequests,
        },
        {
          id: 'tickets-changes',
          label: 'Changes',
          path: '/super-admin/tickets/changes',
          component: Changes,
        },
        {
          id: 'tickets-problems',
          label: 'Problems',
          path: '/super-admin/tickets/problems',
          component: Problems,
        },
      ],
    },
    {
      id: 'system',
      label: 'System Health',
      icon: Activity,
      description: 'System monitoring & health management',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      activeColor: 'bg-green-100',
      component: SystemHealthMonitor,
      subMenus: [
        {
          id: 'system-overview',
          label: 'Overview',
          path: '/super-admin/system/overview',
          component: SystemOverview,
        },
        {
          id: 'system-performance',
          label: 'Performance',
          path: '/super-admin/system/performance',
          component: SystemPerformance,
        },
        {
          id: 'system-resources',
          label: 'Resources',
          path: '/super-admin/system/resources',
          component: SystemResources,
        },
        {
          id: 'system-services',
          label: 'Services',
          path: '/super-admin/system/services',
          component: SystemHealthMonitor,
        },
        {
          id: 'system-databases',
          label: 'Databases',
          path: '/super-admin/system/databases',
          component: SystemHealthMonitor,
        },
        {
          id: 'system-networking',
          label: 'Networking',
          path: '/super-admin/system/networking',
          component: SystemHealthMonitor,
        },
        {
          id: 'system-logs',
          label: 'System Logs',
          path: '/super-admin/system/logs',
          component: SystemHealthMonitor,
        },
        {
          id: 'system-alerts',
          label: 'Alerts & Notifications',
          path: '/super-admin/system/alerts',
          component: SystemHealthMonitor,
        },
        {
          id: 'system-backup',
          label: 'Backup & Recovery',
          path: '/super-admin/system/backup',
          component: SystemHealthMonitor,
        },
        {
          id: 'system-maintenance',
          label: 'Maintenance',
          path: '/super-admin/system/maintenance',
          component: SystemHealthMonitor,
        },
      ],
    },
    {
      id: 'api-dashboard',
      label: 'API Dashboard',
      icon: Code,
      description: 'API management & monitoring',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      hoverColor: 'hover:bg-cyan-100',
      activeColor: 'bg-cyan-100',
      component: APIOverview,
      subMenus: [
        {
          id: 'api-overview',
          label: 'Overview',
          path: '/super-admin/api/overview',
          component: APIOverview,
        },
        {
          id: 'api-endpoints',
          label: 'Endpoints',
          path: '/super-admin/api/endpoints',
          component: APIEndpoints,
        },
        {
          id: 'api-keys',
          label: 'API Keys',
          path: '/super-admin/api/keys',
          component: APIKeys,
        },
        {
          id: 'api-rate-limiting',
          label: 'Rate Limiting',
          path: '/super-admin/api/rate-limiting',
          component: APIRateLimiting,
        },
        {
          id: 'api-analytics',
          label: 'Analytics',
          path: '/super-admin/api/analytics',
          component: APIAnalytics,
        },
        {
          id: 'api-documentation',
          label: 'Documentation',
          path: '/super-admin/api/documentation',
          component: APIDocumentation,
        },
        {
          id: 'api-testing',
          label: 'Testing',
          path: '/super-admin/api/testing',
          component: APITesting,
        },
        {
          id: 'api-webhooks',
          label: 'Webhooks',
          path: '/super-admin/api/webhooks',
          component: APIWebhooks,
        },
        {
          id: 'api-integrations',
          label: 'Integrations',
          path: '/super-admin/api/integrations',
          component: APIIntegrations,
        },
        {
          id: 'api-monitoring',
          label: 'Monitoring',
          path: '/super-admin/api/monitoring',
          component: APIMonitoring,
        },
      ],
    },
    {
      id: 'security',
      label: 'Security',
      icon: Shield,
      description: 'Security & compliance management',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
      activeColor: 'bg-red-100',
      component: SecurityCompliance,
      subMenus: [
        {
          id: 'security-overview',
          label: 'Overview',
          path: '/super-admin/security/overview',
          component: SecurityOverview,
        },
        {
          id: 'security-access-control',
          label: 'Access Control',
          path: '/super-admin/security/access-control',
          component: SecurityAccessControl,
        },
        {
          id: 'security-authentication',
          label: 'Authentication',
          path: '/super-admin/security/authentication',
          component: SecurityAuthentication,
        },
        {
          id: 'security-authorization',
          label: 'Authorization',
          path: '/super-admin/security/authorization',
          component: SecurityCompliance,
        },
        {
          id: 'security-monitoring',
          label: 'Security Monitoring',
          path: '/super-admin/security/monitoring',
          component: SecurityCompliance,
        },
        {
          id: 'security-threats',
          label: 'Threat Management',
          path: '/super-admin/security/threats',
          component: SecurityCompliance,
        },
        {
          id: 'security-compliance',
          label: 'Compliance',
          path: '/super-admin/security/compliance',
          component: SecurityCompliance,
        },
        {
          id: 'security-audit',
          label: 'Audit & Logs',
          path: '/super-admin/security/audit',
          component: SecurityCompliance,
        },
        {
          id: 'security-incidents',
          label: 'Security Incidents',
          path: '/super-admin/security/incidents',
          component: SecurityCompliance,
        },
        {
          id: 'security-policies',
          label: 'Security Policies',
          path: '/super-admin/security/policies',
          component: SecurityCompliance,
        },
      ],
    },
        {
      id: 'ai-agents',
      label: 'AI Agents',
      icon: Brain,
      description: 'AI agent management and orchestration',
      color: 'text-violet-500',
      bgColor: 'bg-violet-50',
      hoverColor: 'hover:bg-violet-100',
      activeColor: 'bg-violet-100',
      component: MCPAgentOrchestrationCenter,
      subMenus: [
        {
          id: 'ai-overview',
          label: 'Overview',
          path: '/super-admin/ai-agents/overview',
          component: AIOverview,
        },
        {
          id: 'ai-agent-management',
          label: 'Agent Management',
          path: '/super-admin/ai-agents/management',
          component: AIAgentManagement,
        },
        {
          id: 'ai-workflows',
          label: 'Workflows',
          path: '/super-admin/ai-agents/workflows',
          component: AIWorkflows,
        },
        {
          id: 'ai-training',
          label: 'Training & Learning',
          path: '/super-admin/ai-agents/training',
          component: AITrainingLearning,
        },
        {
          id: 'ai-monitoring',
          label: 'Performance Monitoring',
          path: '/super-admin/ai-agents/monitoring',
          component: AIPerformanceMonitoring,
        },
        {
          id: 'ai-integrations',
          label: 'Integrations',
          path: '/super-admin/ai-agents/integrations',
          component: AIIntegrations,
        },
        {
          id: 'ai-security',
          label: 'Security & Compliance',
          path: '/super-admin/ai-agents/security',
          component: AISecurityCompliance,
        },
        {
          id: 'ai-analytics',
          label: 'Analytics & Insights',
          path: '/super-admin/ai-agents/analytics',
          component: AIAnalyticsInsights,
        },
      ],
    },
    {
      id: 'deployment',
      label: 'Deployment',
      icon: Rocket,
      description: 'Deployment & operations management',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      activeColor: 'bg-orange-100',
      component: GlobalSettings,
      subMenus: [
        {
          id: 'deployment-overview',
          label: 'Overview',
          path: '/super-admin/deployment/overview',
          component: DeploymentOverview,
        },
        {
          id: 'deployment-pipeline',
          label: 'Deployment Pipeline',
          path: '/super-admin/deployment/pipeline',
          component: DeploymentPipeline,
        },
        {
          id: 'deployment-environments',
          label: 'Environments',
          path: '/super-admin/deployment/environments',
          component: DeploymentEnvironments,
        },
        {
          id: 'deployment-releases',
          label: 'Release Management',
          path: '/super-admin/deployment/releases',
          component: ReleaseManagement,
        },
        {
          id: 'deployment-monitoring',
          label: 'Deployment Monitoring',
          path: '/super-admin/deployment/monitoring',
          component: DeploymentMonitoring,
        },
        {
          id: 'deployment-rollback',
          label: 'Rollback & Recovery',
          path: '/super-admin/deployment/rollback',
          component: RollbackRecovery,
        },
        {
          id: 'deployment-automation',
          label: 'Automation & CI/CD',
          path: '/super-admin/deployment/automation',
          component: AutomationCICD,
        },
        {
          id: 'deployment-security',
          label: 'Security & Compliance',
          path: '/super-admin/deployment/security',
          component: DeploymentSecurity,
        },
        {
          id: 'deployment-logs',
          label: 'Deployment Logs',
          path: '/super-admin/deployment/logs',
          component: DeploymentLogs,
        },
      ],
    },
    {
      id: 'autonomous-systems',
      label: 'Autonomous Systems',
      icon: Brain,
      description: 'AI-powered autonomous system management',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      hoverColor: 'hover:bg-emerald-100',
      activeColor: 'bg-emerald-100',
      component: AutonomousSystemsActivation,
    },
  ];

  const getActiveComponent = () => {
    // Handle Profile page
    if (activeTab === 'profile') {
      return ProfilePage;
    }
    
    // Handle Settings pages
    if (activeTab === 'general-settings') {
      return GeneralSettings;
    }
    if (activeTab === 'company-settings') {
      return CompanySettings;
    }
    if (activeTab === 'security-settings') {
      return SecuritySettings;
    }
    if (activeTab === 'domain-config') {
      return DomainConfiguration;
    }
    if (activeTab === 'system-monitoring') {
      return SystemMonitoring;
    }
    if (activeTab === 'integration-settings') {
      return IntegrationSettings;
    }
    if (activeTab === 'autonomous-systems') {
      return AutonomousSystemsActivation;
    }

    // Check if it's a submenu
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
    return activeItem?.component || EnterpriseDashboard;
  };

  const ActiveComponent = getActiveComponent();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Header */}
      <header className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  TransBot AI
                </h1>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies, users, reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 w-40 sm:w-48 lg:w-64 xl:w-80 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pl-10 pr-4"
              />
            </div>
          </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Mobile Search Button */}
          <button className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            {/* Mega Dropdown Toggle */}
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMegaDropdown(!showMegaDropdown)}
                className={`relative p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 ${
                  showMegaDropdown
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                
                {/* Status Indicator */}
                <motion.div
                  className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                    showMegaDropdown ? 'bg-white' : 'bg-blue-500'
                  }`}
                  animate={{
                    scale: showMegaDropdown ? [1, 1.2, 1] : 1,
                    opacity: showMegaDropdown ? [1, 0.7, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Pulse Ring */}
                {showMegaDropdown && (
                  <motion.div
                    className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-blue-400"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
              
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap max-w-32 sm:max-w-none">
                {showMegaDropdown ? 'Close Hub' : 'Open Hub'}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
              </div>
            </div>

              {/* Notifications */}
            <button className="relative p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

            {/* Theme Toggle */}
              <button
              onClick={toggleDarkMode}
              className="p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>

              {/* Settings */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl transition-all duration-200 ${
                  showSettingsDropdown 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title="Company Settings"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Settings Dropdown */}
              <AnimatePresence>
                {showSettingsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Company Settings</h3>
                          <p className="text-blue-100 text-sm">Manage your organization settings</p>
                        </div>
                      </div>
                    </div>

                    {/* Settings Menu */}
                    <div className="py-2">
                <button
                        onClick={() => handleMenuItemClick('general-settings')}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                            <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">General Settings</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Basic configuration and preferences</div>
                          </div>
                        </div>
                </button>

                      <button 
                        onClick={() => handleMenuItemClick('company-settings')}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                            <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Company Profile</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Organization information and branding</div>
            </div>
          </div>
                      </button>

                      <button 
                        onClick={() => handleMenuItemClick('security-settings')}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors">
                            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Security Settings</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Access control and security policies</div>
                          </div>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleMenuItemClick('domain-config')}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                            <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Domain Configuration</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Domain and URL management</div>
                          </div>
                        </div>
                      </button>

                <button
                        onClick={() => handleMenuItemClick('system-monitoring')}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800 transition-colors">
                            <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">System Monitoring</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Performance and health monitoring</div>
                          </div>
                        </div>
                      </button>

                      <button 
                        onClick={() => handleMenuItemClick('integration-settings')}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg group-hover:bg-cyan-200 dark:group-hover:bg-cyan-800 transition-colors">
                            <Plug className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">Integration Settings</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Third-party integrations and webhooks</div>
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                          <Rocket className="w-4 h-4" />
                          <span>Advanced Settings</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <button 
              onClick={() => handleMenuItemClick('profile')}
              className="ml-1 sm:ml-2 p-1 sm:p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              title="Profile & Account"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <UserIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -top-12 right-0 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                Profile & Account
                <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
              </div>
                </button>
              </div>
            </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: sidebarCollapsed ? 0 : 280,
            opacity: sidebarCollapsed ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-70'} bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 hidden lg:block`}
        >
          <div className="p-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const isExpanded = expandedMenus.includes(item.id);

                return (
                  <div key={item.id}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                        onClick={() => {
                        if (item.subMenus) {
                            handleMenuToggle(item.id);
                          } else {
                            handleMenuItemClick(item.id);
                          }
                        }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          isActive
                          ? `${item.activeColor} ${item.color} shadow-md`
                          : `hover:${item.hoverColor} text-gray-700 dark:text-gray-300`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                              </div>
                      {item.subMenus && (
                            <ChevronRight
                          className={`h-4 w-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                          }`}
                            />
                          )}
                    </motion.button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.subMenus && isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                          className="ml-4 mt-2 space-y-1"
                      >
                          {item.subMenus.map((subMenu) => (
                            <button
                              key={subMenu.id}
                              onClick={() => handleMenuItemClick(subMenu.id)}
                              className={`w-full text-left p-2 rounded-lg transition-colors ${
                                activeTab === subMenu.id
                                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                              }`}
                            >
                              {subMenu.label}
                            </button>
                          ))}
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'}`}>
          <div className="p-4 sm:p-6">
              {ActiveComponent && <ActiveComponent />}
          </div>
        </main>

        {/* Mobile Menu Sidebar */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setShowMobileMenu(false)}
            >
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-80 h-full bg-white dark:bg-gray-800 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                    <button
                      onClick={() => setShowMobileMenu(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                  
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      const isExpanded = expandedMenus.includes(item.id);

                      return (
                        <div key={item.id}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              if (item.subMenus) {
                                handleMenuToggle(item.id);
                              } else {
                                handleMenuItemClick(item.id);
                                setShowMobileMenu(false);
                              }
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? `${item.activeColor} ${item.color} shadow-md`
                                : `hover:${item.hoverColor} text-gray-700 dark:text-gray-300`
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            {item.subMenus && (
                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                              />
                            )}
                          </motion.button>

                          {/* Submenu */}
                          <AnimatePresence>
                            {item.subMenus && isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-8 space-y-1">
                                  {item.subMenus.map((submenu) => (
                                    <button
                                      key={submenu.id}
                                      onClick={() => {
                                        handleMenuItemClick(submenu.id);
                                        setShowMobileMenu(false);
                                      }}
                                      className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                      {submenu.label}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Communication Hub - Right Side Panel */}
        <AnimatePresence>
          {showMegaDropdown && (
        <motion.aside
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full sm:w-96 lg:w-[420px] bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-50 flex flex-col"
            >
                {/* Compact Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Communication Hub</h2>
                        <p className="text-blue-100 text-xs">Choose your communication tool</p>
                    </div>
                  </div>
                  <button
                      onClick={() => setShowMegaDropdown(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm"
                  >
                      <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'chat', icon: MessageCircle, label: 'Live Chat', color: 'blue', count: 3, status: 'active' },
                      { id: 'calls', icon: Phone, label: 'Voice Calls', color: 'green', count: 2, status: 'active' },
                      { id: 'video', icon: Video, label: 'Video Calls', color: 'purple', count: 1, status: 'active' },
                      { id: 'email', icon: Mail, label: 'Email Center', color: 'orange', count: 12, status: 'new' },
                      { id: 'sms', icon: MessageSquare, label: 'SMS Gateway', color: 'cyan', count: 5, status: 'active' },
                      { id: 'ai', icon: Brain, label: 'AI Assistant', color: 'violet', count: 0, status: 'ready' },
                      { id: 'schedule', icon: Calendar, label: 'Scheduling', color: 'emerald', count: 4, status: 'meetings' },
                      { id: 'contacts', icon: Users, label: 'Contacts', color: 'pink', count: 156, status: 'total' },
                      { id: 'notes', icon: FileText, label: 'Notes', color: 'orange', count: 23, status: 'active' },
                    ].map((item) => {
                      const Icon = item.icon;
                      
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            // Navigate to the appropriate communication page
                            const pageMap: { [key: string]: string } = {
                              'chat': 'live-chat',
                              'ai': 'ai-assistant',
                              'calls': 'voice-calls',
                              'video': 'video-calls',
                              'email': 'email-center',
                              'sms': 'sms-gateway',
                              'schedule': 'scheduling',
                              'contacts': 'contacts',
                              'notes': 'notes'
                            };
                            
                            const pageId = pageMap[item.id];
                            if (pageId) {
                              handleMenuItemClick(pageId);
                              setShowMegaDropdown(false);
                            } else {
                              // For other tools, open their panels
                              setActivePanel(item.id);
                              setShowMegaDropdown(false);
                            }
                          }}
                          className="group p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="flex flex-col items-center space-y-3">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${
                              item.color === 'blue' ? 'from-blue-500 to-blue-600' :
                              item.color === 'green' ? 'from-green-500 to-green-600' :
                              item.color === 'purple' ? 'from-purple-500 to-purple-600' :
                              item.color === 'orange' ? 'from-orange-500 to-orange-600' :
                              item.color === 'cyan' ? 'from-cyan-500 to-cyan-600' :
                              item.color === 'violet' ? 'from-violet-500 to-violet-600' :
                              item.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                              'from-pink-500 to-pink-600'
                            } shadow-lg`}>
                              <Icon className="w-6 h-6 text-white" />
                </div>
                            <div className="text-center">
                              <p className="font-medium text-gray-900 dark:text-white text-sm">{item.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.count} {item.status}</p>
              </div>
                            <div className={`w-2 h-2 rounded-full ${
                              item.status === 'active' ? 'bg-green-400' :
                              item.status === 'new' ? 'bg-red-400' :
                              item.status === 'ready' ? 'bg-blue-400' :
                              'bg-gray-400'
                            }`}></div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Individual Tool Panels - Right Side Overlay */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full sm:w-80 lg:w-96 bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-200 dark:border-gray-700 z-60 flex flex-col"
            >
              {/* Tool Panel Header */}
              <div className={`p-4 flex items-center justify-between ${
                activePanel === 'chat' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                activePanel === 'calls' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                activePanel === 'email' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                activePanel === 'ai' ? 'bg-gradient-to-r from-violet-500 to-violet-600' :
                'bg-gradient-to-r from-gray-500 to-gray-600'
              } text-white`}>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      setActivePanel(null);
                      setShowMegaDropdown(true);
                    }}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    title="Back to Communication Hub"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                  {activePanel === 'chat' && <MessageCircle className="w-6 h-6" />}
                  {activePanel === 'calls' && <Phone className="w-6 h-6" />}
                  {activePanel === 'email' && <Mail className="w-6 h-6" />}
                  {activePanel === 'ai' && <Brain className="w-6 h-6" />}
                  {!['chat', 'calls', 'email', 'ai'].includes(activePanel) && <Settings className="w-6 h-6" />}
                  <h3 className="text-lg font-bold">
                    {activePanel === 'chat' && 'Live Chat'}
                    {activePanel === 'calls' && 'Voice Calls'}
                    {activePanel === 'email' && 'Email Center'}
                    {activePanel === 'ai' && 'TransBot AI Assistant'}
                    {!['chat', 'calls', 'email', 'ai'].includes(activePanel) && activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}
                  </h3>
                  </div>
                <button onClick={() => setActivePanel(null)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
                  </div>

              {/* Tool Panel Content */}
              <div className="flex-1 p-4 overflow-y-auto">
                {activePanel === 'chat' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Active Conversations (3)</h4>
                      <div className="space-y-2">
                        {['John Doe - ABC Corp', 'Sarah Wilson - XYZ Ltd', 'Mike Johnson - Tech Inc'].map((name, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{name}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-xs text-gray-500">Online</span>
                </div>
                </div>
                        ))}
            </div>
          </div>
                    <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium">
                      Start New Conversation
                    </button>
      </div>
              )}

                {activePanel === 'calls' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Call Queue (2 Active)</h4>
                      <div className="space-y-2">
                        {['+1 (555) 123-4567 - Customer Support', '+1 (555) 987-6543 - Sales Team'].map((call, i) => (
                          <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{call}</span>
                            <span className="text-xs text-green-600 font-mono">00:02:15</span>
              </div>
                        ))}
            </div>
                            </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium">
                        Make Call
                      </button>
                      <button className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium">
                        Call History
                </button>
                          </div>
                        </div>
                )}

                {activePanel === 'email' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent Emails (12 Unread)</h4>
                      <div className="space-y-2">
                        {['john@example.com - Project Update', 'sarah@company.com - Meeting Request', 'support@service.com - Account Verification'].map((email, i) => (
                          <div key={i} className={`p-2 rounded-lg ${i < 2 ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-gray-700'}`}>
                            <span className={`text-sm font-medium ${i < 2 ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>{email}</span>
                            {i < 2 && <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>}
                        </div>
                        ))}
                          </div>
                        </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-300 font-medium">
                        Compose
                      </button>
                      <button className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium">
                        View All
                              </button>
                    </div>
                        </div>
                      )}

                {activePanel === 'ai' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                    </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">AI Status: Online</p>
                          <p className="text-sm text-green-600">Ready to assist</p>
              </div>
          </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p>• 15 queries today</p>
                        <p>• 98% accuracy rate</p>
                      </div>
                    </div>
                    <button className="w-full p-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 font-medium">
                      Ask TransBot AI
                    </button>
        </div>
      )}

                {/* Default panel for other tools */}
                {!['chat', 'calls', 'email', 'ai'].includes(activePanel) && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {activePanel} functionality is being enhanced with advanced features. Coming soon with full integration capabilities.
                    </p>
                    <button className="p-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium">
                      Configure {activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuperAdminPortal;
