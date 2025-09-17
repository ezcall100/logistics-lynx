import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Dashboard Components
import SystemOverview from '../components/super-admin/dashboard/SystemOverview';
import ActiveUsers from '../components/super-admin/dashboard/ActiveUsers';
import RevenueMetrics from '../components/super-admin/dashboard/RevenueMetrics';
import SystemAlerts from '../components/super-admin/dashboard/SystemAlerts';

// User Management Components
import AllUsers from '../components/super-admin/user-management/AllUsers';
import UserRoles from '../components/super-admin/user-management/UserRoles';
import UserGroups from '../components/super-admin/user-management/UserGroups';
import UserAnalytics from '../components/super-admin/user-management/UserAnalytics';
import UserOnboarding from '../components/super-admin/user-management/UserOnboarding';

// System Administration Components
import SystemSettings from '../components/super-admin/system-administration/SystemSettings';
import DatabaseManagement from '../components/super-admin/system-administration/DatabaseManagement';
import APIManagement from '../components/super-admin/system-administration/APIManagement';
import SecuritySettings from '../components/super-admin/system-administration/SecuritySettings';
import ServerMonitoring from '../components/super-admin/system-administration/ServerMonitoring';

// Analytics Components
import BusinessAnalytics from '../components/super-admin/analytics/BusinessAnalytics';
import FinancialReports from '../components/super-admin/analytics/FinancialReports';
import PerformanceReports from '../components/super-admin/analytics/PerformanceReports';

// Monitoring Components
import SystemMonitoring from '../components/super-admin/monitoring/SystemMonitoring';

// Company Management Components
import CompanyManagement from '../components/super-admin/company-management/CompanyManagement';
import BillingManagement from '../components/super-admin/company-management/BillingManagement';

// Settings Components
import SettingsPage from '../components/super-admin/settings/SettingsPage';
import CompanySettings from '../components/super-admin/settings/CompanySettings';
import PersonalSettings from '../components/super-admin/settings/PersonalSettings';

// MCP Agent Management Components
import MCPOverview from '../components/super-admin/mcp/MCPOverview';
import AgentWorkflows from '../components/super-admin/mcp/AgentWorkflows';

// Page Transition Wrapper
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const SuperAdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Dashboard Routes */}
      <Route path="/" element={<Navigate to="/super-admin/dashboard" replace />} />
      <Route 
        path="/dashboard" 
        element={
          <PageTransition>
            <SystemOverview />
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

      {/* User Management Routes */}
      <Route 
        path="/users" 
        element={
          <PageTransition>
            <AllUsers />
          </PageTransition>
        } 
      />
      <Route 
        path="/users/roles" 
        element={
          <PageTransition>
            <UserRoles />
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
        path="/users/analytics" 
        element={
          <PageTransition>
            <UserAnalytics />
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

      {/* System Administration Routes */}
      <Route 
        path="/system" 
        element={
          <PageTransition>
            <SystemSettings />
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

      {/* Monitoring Routes */}
      <Route 
        path="/monitoring" 
        element={
          <PageTransition>
            <SystemMonitoring />
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
        path="/companies/billing" 
        element={
          <PageTransition>
            <BillingManagement />
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
        path="/mcp/workflows" 
        element={
          <PageTransition>
            <AgentWorkflows />
          </PageTransition>
        } 
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/super-admin/dashboard" replace />} />
    </Routes>
  );
};

export default SuperAdminRoutes;