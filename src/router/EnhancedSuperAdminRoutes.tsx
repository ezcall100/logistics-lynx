import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Enhanced Dashboard Components
import EnhancedSystemOverview from '../components/super-admin/dashboard/EnhancedSystemOverview';
import ActiveUsers from '../components/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from '../components/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from '../components/super-admin/dashboard/SystemAlerts';

// Enhanced User Management Components
import EnhancedAllUsers from '../components/super-admin/user-management/EnhancedAllUsers';
import EnhancedUserRoles from '../components/super-admin/user-management/EnhancedUserRoles';
import UserGroups from '../components/super-admin/user-management/UserGroups';
import AccessControl from '../components/super-admin/user-management/AccessControl';
import UserAnalytics from '../components/super-admin/user-management/UserAnalytics';
import BillingManagement from '../components/super-admin/user-management/BillingManagement';
import SupportTickets from '../components/super-admin/user-management/SupportTickets';
import UserOnboarding from '../components/super-admin/user-management/UserOnboarding';

// Enhanced System Administration Components
import EnhancedSystemSettings from '../components/super-admin/system-administration/EnhancedSystemSettings';
import DatabaseManagement from '../components/super-admin/system-administration/DatabaseManagement';
import APIManagement from '../components/super-admin/system-administration/APIManagement';
import SecuritySettings from '../components/super-admin/system-administration/SecuritySettings';
import ServerMonitoring from '../components/super-admin/system-administration/ServerMonitoring';

// Enhanced Security Components
import EnhancedSecurityCenter from '../components/super-admin/security/EnhancedSecurityCenter';

// Analytics Components
import BusinessAnalytics from '../components/super-admin/analytics/BusinessAnalytics';
import FinancialReports from '../components/super-admin/analytics/FinancialReports';
import PerformanceReports from '../components/super-admin/analytics/PerformanceReports';

// MCP Agent Management Components
import MCPOverview from '../components/super-admin/mcp-agents/MCPOverview';
import AgentWorkflows from '../components/super-admin/mcp-agents/AgentWorkflows';

// Development & DevOps Components
import CICDPipeline from '../components/super-admin/development-devops/CICDPipeline';
import EnvironmentManagement from '../components/super-admin/development-devops/EnvironmentManagement';
import DeploymentMonitoring from '../components/super-admin/development-devops/DeploymentMonitoring';
import InfrastructureAsCode from '../components/super-admin/development-devops/InfrastructureAsCode';
import DevOpsAnalytics from '../components/super-admin/development-devops/DevOpsAnalytics';

// Monitoring Components
import SystemMonitoringDashboard from '../components/super-admin/SystemMonitoringDashboard';
import SystemHealthMonitor from '../components/super-admin/SystemHealthMonitor';

// Company Management Components
import CompanyManagement from '../components/super-admin/CompanyManagement';
import CompanySettings from '../components/super-admin/settings/CompanySettings';

// Settings Components
import SettingsPage from '../components/super-admin/settings/SettingsPage';
import PersonalSettings from '../components/super-admin/settings/PersonalSettings';
import SettingsManagement from '../components/super-admin/settings/SettingsManagement';

// Portal Management Components
import PortalManagement from '../components/super-admin/PortalManagement';
import PortalControlHub from '../components/super-admin/PortalControlHub';

// Communication Hub Components
import CommunicationHubOverview from '../components/super-admin/communication-hub/CommunicationHubOverview';
import CommunicationHubCustomization from '../components/super-admin/communication-hub/CommunicationHubCustomization';

// Specialized Dashboard Components
import AutonomousDevelopmentDashboard from '../components/super-admin/AutonomousDevelopmentDashboard';
import AccountabilityDashboard from '../components/super-admin/AccountabilityDashboard';
import ProgressTrackingDashboard from '../components/super-admin/ProgressTrackingDashboard';
import SystemVerificationDashboard from '../components/super-admin/SystemVerificationDashboard';
import CommanderStatusReport from '../components/super-admin/CommanderStatusReport';
import EnhancedUserManagement from '../components/super-admin/EnhancedUserManagement';
import AuditLoggingSystem from '../components/super-admin/AuditLoggingSystem';
import BusinessIntelligenceCenter from '../components/super-admin/BusinessIntelligenceCenter';
import SecurityCompliance from '../components/super-admin/SecurityCompliance';
import SecurityWarRoom from '../components/super-admin/SecurityWarRoom';
import MCPAgentOrchestrationCenter from '../components/super-admin/MCPAgentOrchestrationCenter';
import RealTimeDevelopmentMonitor from '../components/super-admin/RealTimeDevelopmentMonitor';

// Page Transition Wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const EnhancedSuperAdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/" element={<Navigate to="/super-admin/dashboard" replace />} />
      <Route 
        path="/dashboard" 
        element={
          <PageTransition>
            <EnhancedSystemOverview />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/overview" 
        element={
          <PageTransition>
            <EnhancedSystemOverview />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/active-users" 
        element={
          <PageTransition>
            <ActiveUsers />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/revenue" 
        element={
          <PageTransition>
            <RevenueMetrics />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/alerts" 
        element={
          <PageTransition>
            <SystemAlerts />
          </PageTransition>
        } 
      />

      {/* Enhanced Dashboard Sub-routes */}
      <Route 
        path="/dashboard/autonomous-development" 
        element={
          <PageTransition>
            <AutonomousDevelopmentDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/accountability" 
        element={
          <PageTransition>
            <AccountabilityDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/progress-tracking" 
        element={
          <PageTransition>
            <ProgressTrackingDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/system-verification" 
        element={
          <PageTransition>
            <SystemVerificationDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/commander-status" 
        element={
          <PageTransition>
            <CommanderStatusReport />
          </PageTransition>
        } 
      />
      <Route 
        path="/dashboard/real-time-monitor" 
        element={
          <PageTransition>
            <RealTimeDevelopmentMonitor />
          </PageTransition>
        } 
      />

      {/* Enhanced User Management Routes */}
      <Route 
        path="/users" 
        element={
          <PageTransition>
            <EnhancedAllUsers />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/all" 
        element={
          <PageTransition>
            <EnhancedAllUsers />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/roles" 
        element={
          <PageTransition>
            <EnhancedUserRoles />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/groups" 
        element={
          <PageTransition>
            <UserGroups />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/access" 
        element={
          <PageTransition>
            <AccessControl />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/analytics" 
        element={
          <PageTransition>
            <UserAnalytics />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/billing" 
        element={
          <PageTransition>
            <BillingManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/support" 
        element={
          <PageTransition>
            <SupportTickets />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/onboarding" 
        element={
          <PageTransition>
            <UserOnboarding />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/enhanced" 
        element={
          <PageTransition>
            <EnhancedUserManagement />
          </PageTransition>
        } 
      />

      {/* Enhanced System Administration Routes */}
      <Route 
        path="/system" 
        element={
          <PageTransition>
            <EnhancedSystemSettings />
          </PageTransition>
        } 
      />
      <Route 
        path="/system/settings" 
        element={
          <PageTransition>
            <EnhancedSystemSettings />
          </PageTransition>
        } 
      />
      <Route 
        path="/system/database" 
        element={
          <PageTransition>
            <DatabaseManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/system/api" 
        element={
          <PageTransition>
            <APIManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/system/security" 
        element={
          <PageTransition>
            <SecuritySettings />
          </PageTransition>
        } 
      />
      <Route 
        path="/system/monitoring" 
        element={
          <PageTransition>
            <ServerMonitoring />
          </PageTransition>
        } 
      />
      <Route 
        path="/system/health" 
        element={
          <PageTransition>
            <SystemHealthMonitor />
          </PageTransition>
        } 
      />

      {/* Enhanced Security Routes */}
      <Route 
        path="/security" 
        element={
          <PageTransition>
            <EnhancedSecurityCenter />
          </PageTransition>
        } 
      />
      <Route 
        path="/security/center" 
        element={
          <PageTransition>
            <EnhancedSecurityCenter />
          </PageTransition>
        } 
      />
      <Route 
        path="/security/audit" 
        element={
          <PageTransition>
            <AuditLoggingSystem />
          </PageTransition>
        } 
      />
      <Route 
        path="/security/compliance" 
        element={
          <PageTransition>
            <SecurityCompliance />
          </PageTransition>
        } 
      />
      <Route 
        path="/security/war-room" 
        element={
          <PageTransition>
            <SecurityWarRoom />
          </PageTransition>
        } 
      />

      {/* Analytics Routes */}
      <Route 
        path="/analytics" 
        element={
          <PageTransition>
            <BusinessAnalytics />
          </PageTransition>
        } 
      />
      <Route 
        path="/analytics/business" 
        element={
          <PageTransition>
            <BusinessAnalytics />
          </PageTransition>
        } 
      />
      <Route 
        path="/analytics/financial" 
        element={
          <PageTransition>
            <FinancialReports />
          </PageTransition>
        } 
      />
      <Route 
        path="/analytics/performance" 
        element={
          <PageTransition>
            <PerformanceReports />
          </PageTransition>
        } 
      />
      <Route 
        path="/analytics/business-intelligence" 
        element={
          <PageTransition>
            <BusinessIntelligenceCenter />
          </PageTransition>
        } 
      />

      {/* MCP Agent Management Routes */}
      <Route 
        path="/mcp" 
        element={
          <PageTransition>
            <MCPOverview />
          </PageTransition>
        } 
      />
      <Route 
        path="/mcp/overview" 
        element={
          <PageTransition>
            <MCPOverview />
          </PageTransition>
        } 
      />
      <Route 
        path="/mcp/workflows" 
        element={
          <PageTransition>
            <AgentWorkflows />
          </PageTransition>
        } 
      />
      <Route 
        path="/mcp/orchestration" 
        element={
          <PageTransition>
            <MCPAgentOrchestrationCenter />
          </PageTransition>
        } 
      />

      {/* Development & DevOps Routes */}
      <Route 
        path="/devops" 
        element={
          <PageTransition>
            <CICDPipeline />
          </PageTransition>
        } 
      />
      <Route 
        path="/devops/ci-cd" 
        element={
          <PageTransition>
            <CICDPipeline />
          </PageTransition>
        } 
      />
      <Route 
        path="/devops/environments" 
        element={
          <PageTransition>
            <EnvironmentManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/devops/deployment" 
        element={
          <PageTransition>
            <DeploymentMonitoring />
          </PageTransition>
        } 
      />
      <Route 
        path="/devops/infrastructure" 
        element={
          <PageTransition>
            <InfrastructureAsCode />
          </PageTransition>
        } 
      />
      <Route 
        path="/devops/analytics" 
        element={
          <PageTransition>
            <DevOpsAnalytics />
          </PageTransition>
        } 
      />

      {/* Monitoring Routes */}
      <Route 
        path="/monitoring" 
        element={
          <PageTransition>
            <SystemMonitoringDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/monitoring/system" 
        element={
          <PageTransition>
            <SystemMonitoringDashboard />
          </PageTransition>
        } 
      />
      <Route 
        path="/monitoring/health" 
        element={
          <PageTransition>
            <SystemHealthMonitor />
          </PageTransition>
        } 
      />

      {/* Company Management Routes */}
      <Route 
        path="/companies" 
        element={
          <PageTransition>
            <CompanyManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/companies/management" 
        element={
          <PageTransition>
            <CompanyManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/companies/settings" 
        element={
          <PageTransition>
            <CompanySettings />
          </PageTransition>
        } 
      />

      {/* Portal Management Routes */}
      <Route 
        path="/portals" 
        element={
          <PageTransition>
            <PortalManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/portals/management" 
        element={
          <PageTransition>
            <PortalManagement />
          </PageTransition>
        } 
      />
      <Route 
        path="/portals/control-hub" 
        element={
          <PageTransition>
            <PortalControlHub />
          </PageTransition>
        } 
      />

      {/* Settings Routes */}
      <Route 
        path="/settings" 
        element={
          <PageTransition>
            <SettingsPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/settings/general" 
        element={
          <PageTransition>
            <SettingsPage />
          </PageTransition>
        } 
      />
      <Route 
        path="/settings/company" 
        element={
          <PageTransition>
            <CompanySettings />
          </PageTransition>
        } 
      />
      <Route 
        path="/settings/personal" 
        element={
          <PageTransition>
            <PersonalSettings />
          </PageTransition>
        } 
      />
      <Route 
        path="/settings/management" 
        element={
          <PageTransition>
            <SettingsManagement />
          </PageTransition>
        } 
      />

      {/* Communication Hub Routes */}
      <Route 
        path="/communication" 
        element={
          <PageTransition>
            <CommunicationHubOverview />
          </PageTransition>
        } 
      />
      <Route 
        path="/communication/overview" 
        element={
          <PageTransition>
            <CommunicationHubOverview />
          </PageTransition>
        } 
      />
      <Route 
        path="/communication/customization" 
        element={
          <PageTransition>
            <CommunicationHubCustomization />
          </PageTransition>
        } 
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
    </Routes>
  );
};

export default EnhancedSuperAdminRoutes;
