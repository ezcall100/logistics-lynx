#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Portal configurations
const portals = [
  { name: 'Admin', path: 'admin/AdminPortal.tsx', title: 'Admin Portal', dashboard: 'Admin Dashboard' },
  { name: 'Analytics', path: 'analytics/AnalyticsPortal.tsx', title: 'Analytics Portal', dashboard: 'Analytics Dashboard' },
  { name: 'Autonomous', path: 'autonomous/AutonomousPortal.tsx', title: 'Autonomous Portal', dashboard: 'Autonomous Dashboard' },
  { name: 'Billing', path: 'billing/BillingPortal.tsx', title: 'Billing Portal', dashboard: 'Billing Dashboard' },
  { name: 'Broker', path: 'broker/BrokerPortal.tsx', title: 'Broker Portal', dashboard: 'Broker Dashboard' },
  { name: 'Carrier', path: 'carrier/CarrierPortal.tsx', title: 'Carrier Portal', dashboard: 'Carrier Dashboard' },
  { name: 'Communication', path: 'communication/CommunicationPortal.tsx', title: 'Communication Portal', dashboard: 'Communication Dashboard' },
  { name: 'Compliance', path: 'compliance/CompliancePortal.tsx', title: 'Compliance Portal', dashboard: 'Compliance Dashboard' },
  { name: 'CRM', path: 'crm/CRMPortal.tsx', title: 'CRM Portal', dashboard: 'CRM Dashboard' },
  { name: 'Customer', path: 'customer/CustomerPortal.tsx', title: 'Customer Portal', dashboard: 'Customer Dashboard' },
  { name: 'Developer', path: 'developer/DeveloperPortal.tsx', title: 'Developer Portal', dashboard: 'Developer Dashboard' },
  { name: 'Directory', path: 'directory/DirectoryPortal.tsx', title: 'Directory Portal', dashboard: 'Directory Dashboard' },
  { name: 'Dispatch', path: 'dispatch/DispatchPortal.tsx', title: 'Dispatch Portal', dashboard: 'Dispatch Dashboard' },
  { name: 'Document', path: 'document/DocumentPortal.tsx', title: 'Document Portal', dashboard: 'Document Dashboard' },
  { name: 'Driver', path: 'driver/DriverPortal.tsx', title: 'Driver Portal', dashboard: 'Driver Dashboard' },
  { name: 'EDI', path: 'edi/EDIPortal.tsx', title: 'EDI Portal', dashboard: 'EDI Dashboard' },
  { name: 'Factoring', path: 'factoring/FactoringPortal.tsx', title: 'Factoring Portal', dashboard: 'Factoring Dashboard' },
  { name: 'Financial', path: 'financial/FinancialPortal.tsx', title: 'Financial Portal', dashboard: 'Financial Dashboard' },
  { name: 'Financials', path: 'financials/FinancialsPortal.tsx', title: 'Financials Portal', dashboard: 'Financials Dashboard' },
  { name: 'Fleet', path: 'fleet/FleetPortal.tsx', title: 'Fleet Portal', dashboard: 'Fleet Dashboard' },
  { name: 'Fuel', path: 'fuel/FuelPortal.tsx', title: 'Fuel Portal', dashboard: 'Fuel Dashboard' },
  { name: 'Insurance', path: 'insurance/InsurancePortal.tsx', title: 'Insurance Portal', dashboard: 'Insurance Dashboard' },
  { name: 'Integration', path: 'integration/IntegrationPortal.tsx', title: 'Integration Portal', dashboard: 'Integration Dashboard' },
  { name: 'IntegrationAdmin', path: 'integration-admin/IntegrationAdminPortal.tsx', title: 'Integration Admin Portal', dashboard: 'Integration Admin Dashboard' },
  { name: 'LoadBoard', path: 'load-board/LoadBoardPortal.tsx', title: 'Load Board Portal', dashboard: 'Load Board Dashboard' },
  { name: 'Loadboard', path: 'loadboard/LoadBoardPortal.tsx', title: 'Loadboard Portal', dashboard: 'Loadboard Dashboard' },
  { name: 'Maintenance', path: 'maintenance/MaintenancePortal.tsx', title: 'Maintenance Portal', dashboard: 'Maintenance Dashboard' },
  { name: 'Marketplace', path: 'marketplace/MarketplacePortal.tsx', title: 'Marketplace Portal', dashboard: 'Marketplace Dashboard' },
  { name: 'MonitoringAdmin', path: 'monitoring-admin/MonitoringAdminPortal.tsx', title: 'Monitoring Admin Portal', dashboard: 'Monitoring Admin Dashboard' },
  { name: 'OwnerOperator', path: 'owner-operator/OwnerOperatorPortal.tsx', title: 'Owner Operator Portal', dashboard: 'Owner Operator Dashboard' },
  { name: 'Partner', path: 'partner/PartnerPortal.tsx', title: 'Partner Portal', dashboard: 'Partner Dashboard' },
  { name: 'Rates', path: 'rates/RatesPortal.tsx', title: 'Rates Portal', dashboard: 'Rates Dashboard' },
  { name: 'Reporting', path: 'reporting/ReportingPortal.tsx', title: 'Reporting Portal', dashboard: 'Reporting Dashboard' },
  { name: 'Route', path: 'route/RoutePortal.tsx', title: 'Route Portal', dashboard: 'Route Dashboard' },
  { name: 'Security', path: 'security/SecurityPortal.tsx', title: 'Security Portal', dashboard: 'Security Dashboard' },
  { name: 'SecurityAdmin', path: 'security-admin/SecurityAdminPortal.tsx', title: 'Security Admin Portal', dashboard: 'Security Admin Dashboard' },
  { name: 'Shipper', path: 'shipper/ShipperPortal.tsx', title: 'Shipper Portal', dashboard: 'Shipper Dashboard' },
  { name: 'SuperAdmin', path: 'super-admin/SuperAdminPortal.tsx', title: 'Super Admin Portal', dashboard: 'Super Admin Dashboard' },
  { name: 'SystemAdmin', path: 'system-admin/SystemAdminPortal.tsx', title: 'System Admin Portal', dashboard: 'System Admin Dashboard' },
  { name: 'Track', path: 'track/TrackPortal.tsx', title: 'Track Portal', dashboard: 'Track Dashboard' },
  { name: 'Warehouse', path: 'warehouse/WarehousePortal.tsx', title: 'Warehouse Portal', dashboard: 'Warehouse Dashboard' },
  { name: 'Workers', path: 'workers/WorkersPortal.tsx', title: 'Workers Portal', dashboard: 'Workers Dashboard' },
  { name: 'YMS', path: 'yms/YMSPortal.tsx', title: 'YMS Portal', dashboard: 'YMS Dashboard' }
];

// Read the CustomerPortal template
const templatePath = path.join(__dirname, '../src/pages/portals/customer/CustomerPortal.tsx');
const templateContent = fs.readFileSync(templatePath, 'utf8');

console.log('🚀 Starting portal updates...\n');

let updatedCount = 0;
let errorCount = 0;

for (const portal of portals) {
  try {
    const portalPath = path.join(__dirname, `../src/pages/portals/${portal.path}`);
    
    // Check if file exists
    if (!fs.existsSync(portalPath)) {
      console.log(`⚠️  Skipping ${portal.name} - File not found: ${portal.path}`);
      continue;
    }

    // Create portal-specific content
    let portalContent = templateContent
      .replace(/Customer Portal/g, portal.title)
      .replace(/Customer Dashboard/g, portal.dashboard)
      .replace(/customer/g, portal.name.toLowerCase())
      .replace(/Customer/g, portal.name)
      .replace(/function CustomerPortal/g, `function ${portal.name}Portal`)
      .replace(/export default CustomerPortal/g, `export default ${portal.name}Portal`);

    // Write the updated portal
    fs.writeFileSync(portalPath, portalContent);
    
    console.log(`✅ Updated ${portal.name} Portal`);
    updatedCount++;
    
  } catch (error) {
    console.log(`❌ Error updating ${portal.name} Portal:`, error.message);
    errorCount++;
  }
}

console.log(`\n🎉 Portal update complete!`);
console.log(`✅ Successfully updated: ${updatedCount} portals`);
console.log(`❌ Errors: ${errorCount} portals`);
console.log(`📊 Total processed: ${updatedCount + errorCount} portals`);

if (errorCount === 0) {
  console.log('\n🚀 All portals now have the new enhanced responsive design!');
} else {
  console.log('\n⚠️  Some portals had errors. Please check the logs above.');
}
