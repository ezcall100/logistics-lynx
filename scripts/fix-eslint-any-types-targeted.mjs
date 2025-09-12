#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing ESLint "any" type errors with targeted approach...\n');

// Fix super admin components
const superAdminFiles = [
  'src/components/super-admin/EnterpriseDashboard.tsx',
  'src/components/super-admin/MCPAgentStatusDashboard.tsx', 
  'src/components/super-admin/RoleBasedAccessControl.tsx'
];

// Fix portal files
const portalFiles = [
  'src/pages/portals/analytics/AnalyticsPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/billing/BillingPortal.tsx',
  'src/pages/portals/broker/BrokerPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/communication/CommunicationPortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/customer/CustomerPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/document/DocumentPortal.tsx',
  'src/pages/portals/driver/DriverPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/financial/FinancialPortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/integration/IntegrationPortal.tsx',
  'src/pages/portals/loadboard/LoadBoardPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/reporting/ReportingPortal.tsx',
  'src/pages/portals/route/RoutePortal.tsx',
  'src/pages/portals/security/SecurityPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/track/TrackPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx'
];

let totalFixed = 0;

// Fix super admin components
for (const filePath of superAdminFiles) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  console.log(`🔧 Fixing super admin: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  // Fix React.ComponentType<any> to React.ComponentType<{}>
  content = content.replace(/React\.ComponentType<any>/g, 'React.ComponentType<{}>');
  fixed += (content.match(/React\.ComponentType<any>/g) || []).length;

  // Fix function parameter any types
  content = content.replace(/\([^)]*: any\)/g, (match) => {
    return match.replace(': any', ': unknown');
  });
  fixed += (content.match(/\([^)]*: any\)/g) || []).length;

  // Fix variable any types
  content = content.replace(/: any\b/g, ': unknown');
  fixed += (content.match(/: any\b/g) || []).length;

  fs.writeFileSync(filePath, content);
  totalFixed += fixed;
  console.log(`✅ Fixed ${fixed} issues in ${filePath}`);
}

// Fix portal files
for (const filePath of portalFiles) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  console.log(`🔧 Fixing portal: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  // Fix the handleSettingsChange function parameter
  content = content.replace(/const handleSettingsChange = \(key: string, value: any\) => \{/, 'const handleSettingsChange = (key: string, value: unknown) => {');
  fixed += (content.match(/const handleSettingsChange = \(key: string, value: any\) => \{/) || []).length;

  // Fix any other any types
  content = content.replace(/: any\b/g, ': unknown');
  fixed += (content.match(/: any\b/g) || []).length;

  fs.writeFileSync(filePath, content);
  totalFixed += fixed;
  console.log(`✅ Fixed ${fixed} issues in ${filePath}`);
}

console.log(`\n🎉 ESLint "any" type fix complete!`);
console.log(`📊 Total issues fixed: ${totalFixed}`);
console.log(`📁 Super admin files: ${superAdminFiles.length}`);
console.log(`📁 Portal files: ${portalFiles.length}`);

console.log('\n✨ All ESLint "any" type errors should now be fixed!');
