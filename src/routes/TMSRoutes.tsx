/**
 * TMS Routes Configuration
 * Consolidated routing for TMS Core Application and Driver Mobile App
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import TMS Applications
import TMSCoreApplication from '../pages/tms/TMSCoreApplication';
import DriverMobileApp from '../pages/driver/DriverMobileApp';

// Import existing applications (keep as is)
import SuperAdminPortal from '../pages/portals/super-admin/SuperAdminPortal';
import MCPDashboard from '../pages/MCPDashboard';

// TMS Routes Component
export const TMSRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Existing Applications - Keep as is */}
      <Route path="/super-admin/*" element={<SuperAdminPortal />} />
      <Route path="/mcp-dashboard" element={<MCPDashboard />} />

      {/* TMS Core Application - Consolidated Customer Portals */}
      <Route path="/tms/*" element={<TMSCoreApplication />} />

      {/* Driver Mobile Application */}
      <Route path="/driver/*" element={<DriverMobileApp />} />

      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/shipper" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/broker" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/carrier" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/owner-operator" element={<Navigate to="/tms/dashboard" replace />} />

      {/* Legacy portal redirects */}
      <Route path="/portals/shipper" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/portals/broker" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/portals/carrier" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/portals/owner-operator" element={<Navigate to="/tms/dashboard" replace />} />
      <Route path="/portals/driver" element={<Navigate to="/driver/dashboard" replace />} />

      {/* Catch all - redirect to TMS */}
      <Route path="*" element={<Navigate to="/tms/dashboard" replace />} />
    </Routes>
  );
};

export default TMSRoutes;
}