#!/usr/bin/env node

/**
 * 🔧 FIX IMPORT PATHS FOR ALL PORTAL COMPONENTS
 * =============================================
 * 
 * This script fixes the import paths for RealTimePortalStatus and PortalUpdateSystem
 * in all portal components to use the correct relative paths.
 */

import fs from 'fs';
import path from 'path';

console.log(`
🔧 FIXING IMPORT PATHS FOR ALL PORTAL COMPONENTS
===============================================

Fixing import paths for RealTimePortalStatus and PortalUpdateSystem components...
`);

// All portal directories
const PORTAL_DIRS = [
  'customer', 'driver', 'broker', 'carrier', 'shipper', 'analytics',
  'autonomous', 'directory', 'rates', 'marketplace', 'financial',
  'loadboard', 'crm', 'fleet', 'dispatch', 'warehouse', 'maintenance',
  'fuel', 'insurance', 'compliance', 'partner', 'developer', 'track',
  'document', 'communication', 'reporting', 'superadmin', 'mcp-agent',
  'human-developer', 'system-admin', 'security-admin', 'integration-admin',
  'monitoring-admin'
];

let fixedCount = 0;
let errorCount = 0;

for (const portalDir of PORTAL_DIRS) {
  try {
    const portalPath = path.join('src', 'pages', 'portals', portalDir);
    
    if (!fs.existsSync(portalPath)) {
      console.log(`⚠️  Directory not found: ${portalPath}`);
      continue;
    }
    
    // Find the portal component file
    const files = fs.readdirSync(portalPath);
    const portalFile = files.find(file => file.endsWith('Portal.tsx'));
    
    if (!portalFile) {
      console.log(`⚠️  Portal file not found in: ${portalPath}`);
      continue;
    }
    
    const filePath = path.join(portalPath, portalFile);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the import paths
    const oldImport1 = "import RealTimePortalStatus from '../../components/RealTimePortalStatus';";
    const newImport1 = "import RealTimePortalStatus from '../../../components/RealTimePortalStatus';";
    
    const oldImport2 = "import PortalUpdateSystem from '../../utils/PortalUpdateSystem';";
    const newImport2 = "import PortalUpdateSystem from '../../../utils/PortalUpdateSystem';";
    
    let updated = false;
    
    if (content.includes(oldImport1)) {
      content = content.replace(oldImport1, newImport1);
      updated = true;
    }
    
    if (content.includes(oldImport2)) {
      content = content.replace(oldImport2, newImport2);
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed imports in: ${portalFile}`);
      fixedCount++;
    } else {
      console.log(`ℹ️  No import fixes needed in: ${portalFile}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${portalDir}: ${error.message}`);
    errorCount++;
  }
}

console.log(`
🎉 IMPORT PATH FIXING COMPLETE!
===============================

📊 SUMMARY:
✅ Files Fixed: ${fixedCount}
❌ Errors: ${errorCount}
🌐 Total Portals: ${PORTAL_DIRS.length}

🔧 FIXED IMPORT PATHS:
• RealTimePortalStatus: ../../components/ → ../../../components/
• PortalUpdateSystem: ../../utils/ → ../../../utils/

All portal components now have correct import paths!
`);

// Also fix the template for future deployments
const templatePath = 'scripts/deploy-360-integration-all-portals.mjs';
if (fs.existsSync(templatePath)) {
  let templateContent = fs.readFileSync(templatePath, 'utf8');
  
  const oldTemplateImport1 = "import RealTimePortalStatus from '../../components/RealTimePortalStatus'";
  const newTemplateImport1 = "import RealTimePortalStatus from '../../../components/RealTimePortalStatus'";
  
  const oldTemplateImport2 = "import PortalUpdateSystem from '../../utils/PortalUpdateSystem'";
  const newTemplateImport2 = "import PortalUpdateSystem from '../../../utils/PortalUpdateSystem'";
  
  if (templateContent.includes(oldTemplateImport1)) {
    templateContent = templateContent.replace(oldTemplateImport1, newTemplateImport1);
  }
  
  if (templateContent.includes(oldTemplateImport2)) {
    templateContent = templateContent.replace(oldTemplateImport2, newTemplateImport2);
  }
  
  fs.writeFileSync(templatePath, templateContent);
  console.log('✅ Fixed template for future deployments');
}
