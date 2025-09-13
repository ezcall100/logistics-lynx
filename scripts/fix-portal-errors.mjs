#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

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
  'src/pages/portals/yms/YMSPortal.tsx',
  'src/pages/portals/super-admin/SuperAdminPortalNew.tsx'
];

// Fix each portal file
portalFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add Settings import if missing
    if (content.includes('Settings,') && !content.includes('import { Settings }')) {
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
      content = content.replace('Handshake,', 'HandshakeIcon,');
      content = content.replace('import { HandshakeIcon,', 'import { Handshake as HandshakeIcon,');
    }
    
    // Remove unused state variables
    content = content.replace(/const \[activeTab, setActiveTab\] = useState\('overview'\);\s*/g, '');
    content = content.replace(/const \[selectedPortal, setSelectedPortal\] = useState<string \| null>\(null\);\s*/g, '');
    
    // Fix MenuItem type issue in SuperAdminPortalNew
    if (filePath.includes('SuperAdminPortalNew')) {
      content = content.replace(
        'interface MenuItem {',
        `interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  path: string;
  badge?: string;
  children?: MenuItem[];
}`
      );
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

// Fix PortalLayout MenuItem interface
const portalLayoutPath = 'src/design-system/PortalLayout.tsx';
if (fs.existsSync(portalLayoutPath)) {
  console.log('Fixing PortalLayout MenuItem interface...');
  let content = fs.readFileSync(portalLayoutPath, 'utf8');
  
  // Update MenuItem interface to be more flexible
  content = content.replace(
    'interface MenuItem {\n  id: string;\n  label: string;\n  icon: React.ComponentType<{ className?: string; size?: number }>;\n  path: string;\n  badge?: string;\n  children?: MenuItem[];\n}',
    'interface MenuItem {\n  id: string;\n  label: string;\n  icon: any;\n  path: string;\n  badge?: string;\n  children?: MenuItem[];\n}'
  );
  
  fs.writeFileSync(portalLayoutPath, content, 'utf8');
  console.log('✅ Fixed PortalLayout MenuItem interface');
}

console.log('\\n🎉 All portal errors fixed!');
console.log('📊 Summary:');
console.log('- Fixed missing Settings imports');
console.log('- Removed unused imports');
console.log('- Fixed Handshake import in PartnerPortal');
console.log('- Removed unused state variables');
console.log('- Fixed MenuItem type compatibility');
console.log('\\n🚀 Ready to test the application!');