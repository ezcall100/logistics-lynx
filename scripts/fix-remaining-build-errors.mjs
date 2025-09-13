import fs from 'fs';
import path from 'path';

// List of all portal files that need fixing
const portalFiles = [
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
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx'
];

// Icons that need to be imported
const missingIcons = [
  'Download', 'Upload', 'Share2', 'Bookmark', 'Volume2', 'VolumeX', 
  'Minimize2', 'Maximize2', 'Handshake', 'Settings'
];

// Unused imports to remove
const unusedImports = [
  'Calculator', 'Truck', 'Fuel', 'Shield', 'ClipboardList', 'Wrench', 
  'UserCheck', 'Package', 'Warehouse', 'Play', 'Pause', 'Activity', 
  'Zap', 'Globe', 'Cpu', 'HardDrive', 'Lock', 'XCircle', 'Clock', 
  'RefreshCw', 'ThemeToggle'
];

// Unused variables to remove
const unusedVars = [
  'user', 'notifications', 'menuItems', 'activeTab', 'setActiveTab',
  'soundEnabled', 'setSoundEnabled', 'fullscreen', 'setFullscreen'
];

function fixPortalFile(filePath) {
  console.log(`Fixing ${filePath}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Remove variant props from button elements
  content = content.replace(/variant="[^"]*"/g, '');
  modified = true;

  // 2. Add missing icon imports
  const lucideImports = content.match(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/);
  if (lucideImports) {
    const existingImports = lucideImports[1].split(',').map(imp => imp.trim());
    const neededIcons = missingIcons.filter(icon => 
      content.includes(`<${icon}`) && !existingImports.includes(icon)
    );
    
    if (neededIcons.length > 0) {
      const newImports = [...existingImports, ...neededIcons].join(', ');
      content = content.replace(
        /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"]/,
        `import { ${newImports} } from 'lucide-react'`
      );
      modified = true;
    }
  }

  // 3. Add missing state variables if they're referenced but not defined
  if (content.includes('soundEnabled') && !content.includes('const [soundEnabled, setSoundEnabled]')) {
    const useStateMatch = content.match(/const\s*\[\s*([^,]+),\s*set([^,]+)\s*\]\s*=\s*useState/);
    if (useStateMatch) {
      const insertPoint = content.indexOf('const [') + content.substring(content.indexOf('const [')).indexOf(';') + 1;
      const stateVars = `
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);`;
      content = content.substring(0, insertPoint) + stateVars + content.substring(insertPoint);
      modified = true;
    }
  }

  // 4. Remove unused imports
  unusedImports.forEach(unusedImport => {
    const importRegex = new RegExp(`\\s*${unusedImport}\\s*,?`, 'g');
    if (content.includes(unusedImport) && !content.includes(`<${unusedImport}`)) {
      content = content.replace(importRegex, '');
      modified = true;
    }
  });

  // 5. Remove unused variables
  unusedVars.forEach(unusedVar => {
    if (unusedVar === 'user' || unusedVar === 'notifications' || unusedVar === 'menuItems') {
      const varRegex = new RegExp(`const\\s+${unusedVar}\\s*=\\s*[^;]+;`, 'g');
      if (content.match(varRegex) && !content.includes(`${unusedVar}.`)) {
        content = content.replace(varRegex, '');
        modified = true;
      }
    } else if (unusedVar.includes('Tab') || unusedVar.includes('Enabled') || unusedVar.includes('screen')) {
      const varRegex = new RegExp(`const\\s*\\[\\s*${unusedVar}[^\\]]*\\]\\s*=\\s*useState[^;]+;`, 'g');
      if (content.match(varRegex) && !content.includes(`${unusedVar}`)) {
        content = content.replace(varRegex, '');
        modified = true;
      }
    }
  });

  // 6. Clean up empty import statements and fix formatting
  content = content.replace(/import\s*{\s*}\s*from\s*['"]lucide-react['"];?\s*\n/g, '');
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/,\s*}/g, '}');
  content = content.replace(/{\s*,/g, '{');
  content = content.replace(/,\s*}/g, '}');

  // 7. Fix specific issues in MCPAgentsPortal
  if (filePath.includes('MCPAgentsPortal')) {
    // Fix StatusIcon issue
    content = content.replace(/<StatusIcon className="h-4 w-4" \/>/g, '<CheckCircle className="h-4 w-4" />');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }
}

// Fix all portal files
console.log('🔧 Fixing remaining portal build errors...\n');

portalFiles.forEach(fixPortalFile);

console.log('\n✅ All portal files have been processed!');
console.log('\n📋 Summary of fixes:');
console.log('- Removed variant props from button elements');
console.log('- Added missing icon imports');
console.log('- Added missing state variables');
console.log('- Removed unused imports and variables');
console.log('- Fixed StatusIcon issue in MCPAgentsPortal');
console.log('- Cleaned up import statements');
