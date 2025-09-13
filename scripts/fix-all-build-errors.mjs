import fs from 'fs';
import path from 'path';

// List of portal files that need fixing
const portalFiles = [
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx'
];

// Icons that need to be imported
const missingIcons = [
  'Download', 'Upload', 'Share2', 'Bookmark', 'Volume2', 'VolumeX', 
  'Minimize2', 'Maximize2', 'Handshake', 'Settings'
];

// State variables that need to be added
const missingStateVars = [
  'soundEnabled', 'fullscreen', 'setSoundEnabled', 'setFullscreen'
];

// Unused imports to remove
const unusedImports = [
  'Play', 'Pause', 'Activity', 'Zap', 'Globe', 'Cpu', 'HardDrive', 
  'Lock', 'XCircle', 'Clock', 'RefreshCw', 'ThemeToggle'
];

// Unused variables to remove
const unusedVars = [
  'user', 'notifications', 'menuItems', 'activeTab', 'setActiveTab'
];

function fixPortalFile(filePath) {
  console.log(`Fixing ${filePath}...`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Replace Button components with standard button elements
  content = content.replace(/<Button\s+([^>]*)>/g, '<button $1>');
  content = content.replace(/<\/Button>/g, '</button>');
  
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

  // 3. Add missing state variables
  const useStateMatch = content.match(/const\s*\[\s*([^,]+),\s*set([^,]+)\s*\]\s*=\s*useState/);
  if (useStateMatch && !content.includes('const [soundEnabled, setSoundEnabled]')) {
    const insertPoint = content.indexOf('const [') + content.substring(content.indexOf('const [')).indexOf(';') + 1;
    const stateVars = `
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);`;
    content = content.substring(0, insertPoint) + stateVars + content.substring(insertPoint);
    modified = true;
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
    }
  });

  // 6. Clean up empty import statements
  content = content.replace(/import\s*{\s*}\s*from\s*['"]lucide-react['"];?\s*\n/g, '');
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/,\s*}/g, '}');

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }
}

// Fix all portal files
console.log('🔧 Fixing all portal build errors...\n');

portalFiles.forEach(fixPortalFile);

console.log('\n✅ All portal files have been processed!');
console.log('\n📋 Summary of fixes:');
console.log('- Replaced <Button> components with <button> elements');
console.log('- Added missing icon imports (Download, Upload, Share2, etc.)');
console.log('- Added missing state variables (soundEnabled, fullscreen)');
console.log('- Removed unused imports and variables');
console.log('- Cleaned up empty import statements');
