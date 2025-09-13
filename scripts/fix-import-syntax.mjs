#!/usr/bin/env node

import fs from 'fs';

// List of portal files that need fixing
const portalFiles = [
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx'
];

// Fix each portal file
portalFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing import syntax in ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix double commas in import statements
    content = content.replace(/,,/g, ',');
    
    // Fix trailing commas before closing brace
    content = content.replace(/,(\s*})/g, '$1');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

console.log('\\n🎉 All import syntax errors fixed!');
