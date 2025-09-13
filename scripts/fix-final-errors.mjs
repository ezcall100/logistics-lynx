#!/usr/bin/env node

import fs from 'fs';

// Fix remaining portal files with unused useState
const portalFiles = [
  'src/pages/portals/admin/AdminPortal.tsx',
  'src/pages/portals/analytics/AnalyticsPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/broker/BrokerPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/customer/CustomerPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/driver/DriverPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx'
];

// Fix portal files
portalFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove unused useState import
    if (content.includes('import React, { useState }') && !content.includes('useState(')) {
      content = content.replace('import React, { useState }', 'import React');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  }
});

// Fix PartnerPortal HandshakeIcon issue
const partnerPortalPath = 'src/pages/portals/partner/PartnerPortal.tsx';
if (fs.existsSync(partnerPortalPath)) {
  console.log('Fixing PartnerPortal HandshakeIcon...');
  let content = fs.readFileSync(partnerPortalPath, 'utf8');
  
  // Fix HandshakeIcon reference
  content = content.replace('icon: HandshakeIcon,', 'icon: Handshake,');
  
  fs.writeFileSync(partnerPortalPath, content, 'utf8');
  console.log('✅ Fixed PartnerPortal HandshakeIcon');
}

// Fix PortalLayout unused imports
const portalLayoutPath = 'src/design-system/PortalLayout.tsx';
if (fs.existsSync(portalLayoutPath)) {
  console.log('Fixing PortalLayout unused imports...');
  let content = fs.readFileSync(portalLayoutPath, 'utf8');
  
  // Remove unused imports
  const unusedImports = ['User', 'DollarSign', 'Truck', 'Building', 'TrendingUp', 'Link', 'Wrench'];
  unusedImports.forEach(importName => {
    content = content.replace(new RegExp(`\\s*${importName},\\s*`, 'g'), '');
  });
  
  fs.writeFileSync(portalLayoutPath, content, 'utf8');
  console.log('✅ Fixed PortalLayout unused imports');
}

// Fix ThemeToggle unused variables
const themeTogglePath = 'src/components/common/ThemeToggle.tsx';
if (fs.existsSync(themeTogglePath)) {
  console.log('Fixing ThemeToggle unused variables...');
  let content = fs.readFileSync(themeTogglePath, 'utf8');
  
  // Remove unused variables
  content = content.replace(/const sizeClasses = {[^}]+};\s*/g, '');
  content = content.replace(/const iconSizes = {[^}]+};\s*/g, '');
  
  fs.writeFileSync(themeTogglePath, content, 'utf8');
  console.log('✅ Fixed ThemeToggle unused variables');
}

console.log('\\n🎉 Final errors fixed!');
console.log('📊 Summary:');
console.log('- Removed unused useState imports from all portal files');
console.log('- Fixed HandshakeIcon reference in PartnerPortal');
console.log('- Removed unused imports from PortalLayout');
console.log('- Fixed unused variables in ThemeToggle');
console.log('\\n🚀 Ready to test the application!');
