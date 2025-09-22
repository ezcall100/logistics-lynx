import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminAuth from '../services/superAdminAuth';

// Import all Super Admin components
// Dashboard
import EnterpriseDashboard from '../components/super-admin/EnterpriseDashboard';
import SystemOverview from '../components/super-admin/dashboard/SystemOverview';
import ActiveUsers from '../components/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from '../components/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from '../components/super-admin/dashboard/SystemAlerts';

// User Management
import UserManagement from '../components/super-admin/UserManagement';
import AllUsers from '../components/super-admin/user-management/AllUsers';
import RolesPermissions from '../components/super-admin/user-management/RolesPermissions';
import AccessControl from '../components/super-admin/user-management/AccessControl';
import UserAnalytics from '../components/super-admin/user-management/UserAnalytics';
import BillingManagement from '../components/super-admin/BillingManagement';
import SupportTickets from '../components/super-admin/tickets/TicketsOverview';
import UserOnboarding from '../components/super-admin/user-management/UserOnboarding';

// Portal Management
import PortalManagement from '../components/super-admin/PortalManagement';
import PortalBuilder from '../components/super-admin/portal-management/PortalBuilder';
import UserDashboardBuilder from '../components/super-admin/portal-management/UserDashboardBuilder';
import HeaderCustomization from '../components/super-admin/portal-management/HeaderCustomization';
import SidebarCustomization from '../components/super-admin/portal-management/SidebarCustomization';
import RoleTemplates from '../components/super-admin/portal-management/RoleTemplates';

// Communication Hub
import LiveChatPage from '../components/super-admin/communication/LiveChatPage';
import AIAssistantPage from '../components/super-admin/communication/AIAssistantPage';
import VoiceCallsPage from '../components/super-admin/communication/VoiceCallsPage';
import VideoCallsPage from '../components/super-admin/communication/VideoCallsPage';
import EmailCenterPage from '../components/super-admin/communication/EmailCenterPage';
import SMSGatewayPage from '../components/super-admin/communication/SMSGatewayPage';
import SchedulingPage from '../components/super-admin/communication/SchedulingPage';
import ContactsPage from '../components/super-admin/communication/ContactsPage';
import NotesPage from '../components/super-admin/communication/NotesPage';

// CRM
import CRMOverview from '../components/super-admin/crm/CRMOverview';
import CrmEmail from '../components/super-admin/crm/CrmEmail';
import CrmLeads from '../components/super-admin/crm/CrmLeads';
import CrmContacts from '../components/super-admin/crm/CrmContacts';
import CrmProjects from '../components/super-admin/crm/CrmProjects';
import CrmCalendar from '../components/super-admin/crm/CrmCalendar';
import CrmOpportunities from '../components/super-admin/crm/CrmOpportunities';

// Tickets
import TicketsOverview from '../components/super-admin/tickets/TicketsOverview';
import AssignedTickets from '../components/super-admin/tickets/AssignedTickets';
import UnassignedTickets from '../components/super-admin/tickets/UnassignedTickets';
import Incidents from '../components/super-admin/tickets/Incidents';
import ServiceRequests from '../components/super-admin/tickets/ServiceRequests';
import Changes from '../components/super-admin/tickets/Changes';
import Problems from '../components/super-admin/tickets/Problems';

// System Health
import SystemHealthMonitor from '../components/super-admin/SystemHealthMonitor';
import SystemPerformance from '../components/super-admin/system/SystemPerformance';
import SystemResources from '../components/super-admin/system/SystemResources';
import SystemServices from '../components/super-admin/system/SystemServices';
import SystemDatabases from '../components/super-admin/system/SystemDatabases';
import SystemNetworking from '../components/super-admin/system/SystemNetworking';
import SystemLogs from '../components/super-admin/system/SystemLogs';
import SystemAlerts as SystemAlertsPage from '../components/super-admin/system/SystemAlerts';
import SystemBackup from '../components/super-admin/system/SystemBackup';
import SystemMaintenance from '../components/super-admin/system/SystemMaintenance';

// API Dashboard
import APIOverview from '../components/super-admin/api-dashboard/APIOverview';
import APIEndpoints from '../components/super-admin/api-dashboard/APIEndpoints';
import APIKeys from '../components/super-admin/api-dashboard/APIKeys';
import APIRateLimiting from '../components/super-admin/api-dashboard/APIRateLimiting';
import APIAnalytics from '../components/super-admin/api-dashboard/APIAnalytics';
import APIDocumentation from '../components/super-admin/api-dashboard/APIDocumentation';
import APITesting from '../components/super-admin/api-dashboard/APITesting';
import APIWebhooks from '../components/super-admin/api-dashboard/APIWebhooks';
import APIIntegrations from '../components/super-admin/api-dashboard/APIIntegrations';
import APIMonitoring from '../components/super-admin/api-dashboard/APIMonitoring';

// Security
import SecurityOverview from '../components/super-admin/security/SecurityOverview';
import SecurityAccessControl from '../components/super-admin/security/SecurityAccessControl';
import SecurityAuthentication from '../components/super-admin/security/SecurityAuthentication';
import SecurityAuthorization from '../components/super-admin/security/SecurityAuthorization';
import SecurityMonitoring from '../components/super-admin/security/SecurityMonitoring';
import SecurityThreatManagement from '../components/super-admin/security/SecurityThreatManagement';
import SecurityCompliance from '../components/super-admin/security/SecurityCompliance';
import SecurityAuditLogs from '../components/super-admin/security/SecurityAuditLogs';

// AI Agents
import MCPAgentOrchestrationCenter from '../components/super-admin/MCPAgentOrchestrationCenter';
import AIOverview from '../components/super-admin/ai-agents/AIOverview';
import AIAgentManagement from '../components/super-admin/ai-agents/AIAgentManagement';
import AIWorkflows from '../components/super-admin/ai-agents/AIWorkflows';
import AITrainingLearning from '../components/super-admin/ai-agents/AITrainingLearning';
import AIPerformanceMonitoring from '../components/super-admin/ai-agents/AIPerformanceMonitoring';
import AIIntegrations from '../components/super-admin/ai-agents/AIIntegrations';
import AISecurityCompliance from '../components/super-admin/ai-agents/AISecurityCompliance';
import AIAnalyticsInsights from '../components/super-admin/ai-agents/AIAnalyticsInsights';

// Deployment
import DeploymentOverview from '../components/super-admin/deployment/DeploymentOverview';
import DeploymentPipeline from '../components/super-admin/deployment/DeploymentPipeline';
import DeploymentEnvironments from '../components/super-admin/deployment/DeploymentEnvironments';
import ReleaseManagement from '../components/super-admin/deployment/ReleaseManagement';
import DeploymentMonitoring from '../components/super-admin/deployment/DeploymentMonitoring';
import RollbackRecovery from '../components/super-admin/deployment/RollbackRecovery';

// Settings
import GlobalSettings from '../components/super-admin/GlobalSettings';
import GeneralSettings from '../components/super-admin/settings/GeneralSettings';
import SecuritySettings from '../components/super-admin/settings/SecuritySettings';
import DomainConfiguration from '../components/super-admin/settings/DomainConfiguration';
import SystemMonitoring from '../components/super-admin/settings/SystemMonitoring';
import IntegrationSettings from '../components/super-admin/settings/IntegrationSettings';

// Profile
import ProfilePage from '../components/super-admin/profile/ProfilePage';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: { resource: string; action: string };
  requiredRole?: string;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requiredRole,
  fallback = <Navigate to="/super-admin" replace />
}) => {
  const currentUser = SuperAdminAuth.getCurrentUser();

  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check role requirement
  if (requiredRole && currentUser.role !== requiredRole) {
    return fallback;
  }

  // Check permission requirement
  if (requiredPermission && !SuperAdminAuth.hasPermission(requiredPermission.resource, requiredPermission.action)) {
    return fallback;
  }

  return <>{children}</>;
};

// Super Admin Routes Component
const SuperAdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/super-admin/dashboard" replace />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <EnterpriseDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/overview" element={
        <ProtectedRoute>
          <SystemOverview />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/users" element={
        <ProtectedRoute>
          <ActiveUsers />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/revenue" element={
        <ProtectedRoute>
          <RevenueMetrics />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/alerts" element={
        <ProtectedRoute>
          <SystemAlerts />
        </ProtectedRoute>
      } />

      {/* User Management Routes */}
      <Route path="/users" element={
        <ProtectedRoute requiredPermission={{ resource: 'users', action: 'read' }}>
          <UserManagement />
        </ProtectedRoute>
      } />
      <Route path="/users/all-users" element={
        <ProtectedRoute requiredPermission={{ resource: 'users', action: 'read' }}>
          <AllUsers />
        </ProtectedRoute>
      } />
      <Route path="/users/roles-permissions" element={
        <ProtectedRoute requiredPermission={{ resource: 'users', action: 'manage' }}>
          <RolesPermissions />
        </ProtectedRoute>
      } />
      <Route path="/users/access-control" element={
        <ProtectedRoute requiredPermission={{ resource: 'users', action: 'manage' }}>
          <AccessControl />
        </ProtectedRoute>
      } />
      <Route path="/users/analytics" element={
        <ProtectedRoute requiredPermission={{ resource: 'users', action: 'read' }}>
          <UserAnalytics />
        </ProtectedRoute>
      } />
      <Route path="/users/billing" element={
        <ProtectedRoute requiredPermission={{ resource: 'companies', action: 'read' }}>
          <BillingManagement />
        </ProtectedRoute>
      } />
      <Route path="/users/support-tickets" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <SupportTickets />
        </ProtectedRoute>
      } />
      <Route path="/users/onboarding" element={
        <ProtectedRoute requiredPermission={{ resource: 'users', action: 'create' }}>
          <UserOnboarding />
        </ProtectedRoute>
      } />

      {/* Portal Management Routes */}
      <Route path="/portal-management" element={
        <ProtectedRoute requiredPermission={{ resource: 'portals', action: 'read' }}>
          <PortalManagement />
        </ProtectedRoute>
      } />
      <Route path="/portal-management/portal-builder" element={
        <ProtectedRoute requiredPermission={{ resource: 'portals', action: 'create' }}>
          <PortalBuilder />
        </ProtectedRoute>
      } />
      <Route path="/portal-management/user-dashboard-builder" element={
        <ProtectedRoute requiredPermission={{ resource: 'portals', action: 'create' }}>
          <UserDashboardBuilder />
        </ProtectedRoute>
      } />
      <Route path="/portal-management/header-customization" element={
        <ProtectedRoute requiredPermission={{ resource: 'portals', action: 'update' }}>
          <HeaderCustomization />
        </ProtectedRoute>
      } />
      <Route path="/portal-management/sidebar-customization" element={
        <ProtectedRoute requiredPermission={{ resource: 'portals', action: 'update' }}>
          <SidebarCustomization />
        </ProtectedRoute>
      } />
      <Route path="/portal-management/role-templates" element={
        <ProtectedRoute requiredPermission={{ resource: 'portals', action: 'manage' }}>
          <RoleTemplates />
        </ProtectedRoute>
      } />

      {/* Communication Hub Routes */}
      <Route path="/communication" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <LiveChatPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/live-chat" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <LiveChatPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/ai-assistant" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <AIAssistantPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/voice-calls" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <VoiceCallsPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/video-calls" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <VideoCallsPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/email-center" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <EmailCenterPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/sms-gateway" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <SMSGatewayPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/scheduling" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <SchedulingPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/contacts" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <ContactsPage />
        </ProtectedRoute>
      } />
      <Route path="/communication/notes" element={
        <ProtectedRoute requiredPermission={{ resource: 'communication', action: 'read' }}>
          <NotesPage />
        </ProtectedRoute>
      } />

      {/* CRM Routes */}
      <Route path="/crm" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CRMOverview />
        </ProtectedRoute>
      } />
      <Route path="/crm/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CRMOverview />
        </ProtectedRoute>
      } />
      <Route path="/crm/email" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CrmEmail />
        </ProtectedRoute>
      } />
      <Route path="/crm/leads" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CrmLeads />
        </ProtectedRoute>
      } />
      <Route path="/crm/contacts" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CrmContacts />
        </ProtectedRoute>
      } />
      <Route path="/crm/projects" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CrmProjects />
        </ProtectedRoute>
      } />
      <Route path="/crm/calendar" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CrmCalendar />
        </ProtectedRoute>
      } />
      <Route path="/crm/opportunities" element={
        <ProtectedRoute requiredPermission={{ resource: 'crm', action: 'read' }}>
          <CrmOpportunities />
        </ProtectedRoute>
      } />

      {/* Ticket Management Routes */}
      <Route path="/tickets" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <TicketsOverview />
        </ProtectedRoute>
      } />
      <Route path="/tickets/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <TicketsOverview />
        </ProtectedRoute>
      } />
      <Route path="/tickets/assigned" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <AssignedTickets />
        </ProtectedRoute>
      } />
      <Route path="/tickets/unassigned" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <UnassignedTickets />
        </ProtectedRoute>
      } />
      <Route path="/tickets/incidents" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <Incidents />
        </ProtectedRoute>
      } />
      <Route path="/tickets/service-requests" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <ServiceRequests />
        </ProtectedRoute>
      } />
      <Route path="/tickets/changes" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <Changes />
        </ProtectedRoute>
      } />
      <Route path="/tickets/problems" element={
        <ProtectedRoute requiredPermission={{ resource: 'tickets', action: 'read' }}>
          <Problems />
        </ProtectedRoute>
      } />

      {/* System Health Routes */}
      <Route path="/system" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'read' }}>
          <SystemHealthMonitor />
        </ProtectedRoute>
      } />
      <Route path="/system/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'read' }}>
          <SystemOverview />
        </ProtectedRoute>
      } />
      <Route path="/system/performance" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'monitor' }}>
          <SystemPerformance />
        </ProtectedRoute>
      } />
      <Route path="/system/resources" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'monitor' }}>
          <SystemResources />
        </ProtectedRoute>
      } />
      <Route path="/system/services" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'monitor' }}>
          <SystemServices />
        </ProtectedRoute>
      } />
      <Route path="/system/databases" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'monitor' }}>
          <SystemDatabases />
        </ProtectedRoute>
      } />
      <Route path="/system/networking" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'monitor' }}>
          <SystemNetworking />
        </ProtectedRoute>
      } />
      <Route path="/system/logs" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'read' }}>
          <SystemLogs />
        </ProtectedRoute>
      } />
      <Route path="/system/alerts" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'monitor' }}>
          <SystemAlertsPage />
        </ProtectedRoute>
      } />
      <Route path="/system/backup" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'manage' }}>
          <SystemBackup />
        </ProtectedRoute>
      } />
      <Route path="/system/maintenance" element={
        <ProtectedRoute requiredPermission={{ resource: 'system', action: 'manage' }}>
          <SystemMaintenance />
        </ProtectedRoute>
      } />

      {/* API Dashboard Routes */}
      <Route path="/api" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIOverview />
        </ProtectedRoute>
      } />
      <Route path="/api/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIOverview />
        </ProtectedRoute>
      } />
      <Route path="/api/endpoints" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIEndpoints />
        </ProtectedRoute>
      } />
      <Route path="/api/keys" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIKeys />
        </ProtectedRoute>
      } />
      <Route path="/api/rate-limiting" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIRateLimiting />
        </ProtectedRoute>
      } />
      <Route path="/api/analytics" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIAnalytics />
        </ProtectedRoute>
      } />
      <Route path="/api/documentation" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIDocumentation />
        </ProtectedRoute>
      } />
      <Route path="/api/testing" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APITesting />
        </ProtectedRoute>
      } />
      <Route path="/api/webhooks" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIWebhooks />
        </ProtectedRoute>
      } />
      <Route path="/api/integrations" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIIntegrations />
        </ProtectedRoute>
      } />
      <Route path="/api/monitoring" element={
        <ProtectedRoute requiredPermission={{ resource: 'api_keys', action: 'read' }}>
          <APIMonitoring />
        </ProtectedRoute>
      } />

      {/* Security Routes */}
      <Route path="/security" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'read' }}>
          <SecurityOverview />
        </ProtectedRoute>
      } />
      <Route path="/security/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'read' }}>
          <SecurityOverview />
        </ProtectedRoute>
      } />
      <Route path="/security/access-control" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'manage' }}>
          <SecurityAccessControl />
        </ProtectedRoute>
      } />
      <Route path="/security/authentication" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'manage' }}>
          <SecurityAuthentication />
        </ProtectedRoute>
      } />
      <Route path="/security/authorization" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'manage' }}>
          <SecurityAuthorization />
        </ProtectedRoute>
      } />
      <Route path="/security/monitoring" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'monitor' }}>
          <SecurityMonitoring />
        </ProtectedRoute>
      } />
      <Route path="/security/threats" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'manage' }}>
          <SecurityThreatManagement />
        </ProtectedRoute>
      } />
      <Route path="/security/compliance" element={
        <ProtectedRoute requiredPermission={{ resource: 'security', action: 'manage' }}>
          <SecurityCompliance />
        </ProtectedRoute>
      } />
      <Route path="/security/audit" element={
        <ProtectedRoute requiredPermission={{ resource: 'audit_logs', action: 'read' }}>
          <SecurityAuditLogs />
        </ProtectedRoute>
      } />

      {/* AI Agents Routes */}
      <Route path="/ai-agents" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'read' }}>
          <MCPAgentOrchestrationCenter />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'read' }}>
          <AIOverview />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/management" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'manage' }}>
          <AIAgentManagement />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/workflows" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'manage' }}>
          <AIWorkflows />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/training" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'manage' }}>
          <AITrainingLearning />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/monitoring" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'monitor' }}>
          <AIPerformanceMonitoring />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/integrations" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'manage' }}>
          <AIIntegrations />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/security" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'manage' }}>
          <AISecurityCompliance />
        </ProtectedRoute>
      } />
      <Route path="/ai-agents/analytics" element={
        <ProtectedRoute requiredPermission={{ resource: 'ai_agents', action: 'read' }}>
          <AIAnalyticsInsights />
        </ProtectedRoute>
      } />

      {/* Deployment Routes */}
      <Route path="/deployment" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <DeploymentOverview />
        </ProtectedRoute>
      } />
      <Route path="/deployment/overview" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <DeploymentOverview />
        </ProtectedRoute>
      } />
      <Route path="/deployment/pipeline" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <DeploymentPipeline />
        </ProtectedRoute>
      } />
      <Route path="/deployment/environments" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <DeploymentEnvironments />
        </ProtectedRoute>
      } />
      <Route path="/deployment/releases" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <ReleaseManagement />
        </ProtectedRoute>
      } />
      <Route path="/deployment/monitoring" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <DeploymentMonitoring />
        </ProtectedRoute>
      } />
      <Route path="/deployment/rollback" element={
        <ProtectedRoute requiredPermission={{ resource: 'deployment', action: 'read' }}>
          <RollbackRecovery />
        </ProtectedRoute>
      } />

      {/* Settings Routes */}
      <Route path="/settings" element={
        <ProtectedRoute requiredRole="Admin">
          <GlobalSettings />
        </ProtectedRoute>
      } />
      <Route path="/settings/general" element={
        <ProtectedRoute requiredRole="Admin">
          <GeneralSettings />
        </ProtectedRoute>
      } />
      <Route path="/settings/security" element={
        <ProtectedRoute requiredRole="Admin">
          <SecuritySettings />
        </ProtectedRoute>
      } />
      <Route path="/settings/domain" element={
        <ProtectedRoute requiredRole="Admin">
          <DomainConfiguration />
        </ProtectedRoute>
      } />
      <Route path="/settings/monitoring" element={
        <ProtectedRoute requiredRole="Admin">
          <SystemMonitoring />
        </ProtectedRoute>
      } />
      <Route path="/settings/integrations" element={
        <ProtectedRoute requiredRole="Admin">
          <IntegrationSettings />
        </ProtectedRoute>
      } />

      {/* Profile Route */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
    </Routes>
  );
};

export default SuperAdminRoutes;
