#!/usr/bin/env node

import fs from 'fs';

// All portal files that need fixing
const allPortalFiles = [
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
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/super-admin/SuperAdminPortalNew.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx'
];

// Fix each portal file
allPortalFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove unused useState import if no state is used
    if (content.includes('import React, { useState }') && !content.includes('useState(')) {
      content = content.replace('import React, { useState }', 'import React');
    }
    
    // Add Settings import if missing and used
    if (content.includes('Settings') && !content.includes('import { Settings }')) {
      content = content.replace(
        /import {([^}]+)} from 'lucide-react';/,
        (match, imports) => {
          if (!imports.includes('Settings')) {
            return `import {${imports}, Settings} from 'lucide-react';`;
          }
          return match;
        }
      );
    }
    
    // Remove unused imports
    const unusedImports = [
      'Play', 'Pause', 'Activity', 'Zap', 'Globe', 'Cpu', 'HardDrive', 
      'Lock', 'XCircle', 'Clock', 'RefreshCw', 'Square'
    ];
    
    unusedImports.forEach(importName => {
      if (content.includes(`${importName},`) && !content.includes(`icon: ${importName}`) && !content.includes(`<${importName}`)) {
        content = content.replace(new RegExp(`\\s*${importName},\\s*`, 'g'), '');
      }
    });
    
    // Fix Handshake import in PartnerPortal
    if (filePath.includes('PartnerPortal')) {
      content = content.replace('HandshakeIcon,', '');
      content = content.replace('Handshake,', 'HandshakeIcon,');
      content = content.replace('import { HandshakeIcon,', 'import { Handshake as HandshakeIcon,');
      content = content.replace('icon: Handshake,', 'icon: HandshakeIcon,');
    }
    
    // Add missing Play and Pause imports for SuperAdminPortalNew
    if (filePath.includes('SuperAdminPortalNew')) {
      if (content.includes('icon={Play}') && !content.includes('Play,')) {
        content = content.replace(
          /import {([^}]+)} from 'lucide-react';/,
          (match, imports) => {
            return `import {${imports}, Play, Pause} from 'lucide-react';`;
          }
        );
      }
    }
    
    // Remove unused state variables
    content = content.replace(/const \[activeTab, setActiveTab\] = useState\('overview'\);\s*/g, '');
    content = content.replace(/const \[selectedPortal, setSelectedPortal\] = useState<string \| null>\(null\);\s*/g, '');
    
    // Fix double commas
    content = content.replace(/,,/g, ',');
    content = content.replace(/,(\s*})/g, '$1');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('\\n🎉 All remaining portal errors fixed!');
console.log('📊 Summary:');
console.log('- Fixed missing Settings imports');
console.log('- Removed unused imports and useState');
console.log('- Fixed Handshake import in PartnerPortal');
console.log('- Added missing Play/Pause imports for SuperAdminPortalNew');
console.log('- Removed unused state variables');
console.log('- Fixed import syntax issues');
console.log('\\n🚀 Ready to test the application!');
