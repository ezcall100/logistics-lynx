import fs from 'fs';
import path from 'path';

// List of all portal files that need fixing
const portalFiles = [
  'src/pages/portals/admin/AdminPortal.tsx',
  'src/pages/portals/analytics/AnalyticsPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/broker/BrokerPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx'
];

// Icons that need to be imported
const missingIcons = [
  'CreditCard', 'Activity', 'Clock', 'CheckCircle', 'Settings'
];

// Unused variables to remove
const unusedVars = [
  'activeTab', 'setActiveTab', 'soundEnabled', 'setSoundEnabled', 
  'fullscreen', 'setFullscreen'
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

  // 2. Remove empty icon props
  content = content.replace(/icon={}/g, '');
  modified = true;

  // 3. Fix component name issues
  if (content.includes('constPortal: React.FC')) {
    const componentName = filePath.split('/').pop().replace('.tsx', '');
    content = content.replace(/constPortal: React\.FC/g, `const ${componentName}: React.FC`);
    modified = true;
  }

  // 4. Add missing icon imports
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

  // 5. Remove unused variables
  unusedVars.forEach(unusedVar => {
    const varRegex = new RegExp(`const\\s*\\[\\s*${unusedVar}[^\\]]*\\]\\s*=\\s*useState[^;]+;`, 'g');
    if (content.match(varRegex) && !content.includes(`${unusedVar}`)) {
      content = content.replace(varRegex, '');
      modified = true;
    }
  });

  // 6. Clean up empty import statements and fix formatting
  content = content.replace(/import\s*{\s*}\s*from\s*['"]lucide-react['"];?\s*\n/g, '');
  content = content.replace(/,\s*,/g, ',');
  content = content.replace(/,\s*}/g, '}');
  content = content.replace(/{\s*,/g, '{');
  content = content.replace(/,\s*}/g, '}');

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }
}

// Fix all portal files
console.log('🔧 Fixing final remaining portal errors...\n');

portalFiles.forEach(fixPortalFile);

console.log('\n✅ All portal files have been processed!');
console.log('\n📋 Summary of fixes:');
console.log('- Removed variant props from button elements');
console.log('- Removed empty icon props');
console.log('- Fixed component name issues');
console.log('- Added missing icon imports');
console.log('- Removed unused variables');
console.log('- Cleaned up import statements');