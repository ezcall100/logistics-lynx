import fs from 'fs';
import path from 'path';

// List of all portal files that need fixing
const portalFiles = [
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/admin/AdminPortal.tsx'
];

function fixDesignSystemImports(content) {
  let updatedContent = content;
  
  // Remove the problematic imports
  const importFixes = [
    {
      from: /import { PortalLayout } from '\.\.\/\.\.\/\.\.\/design-system\/PortalLayout';\n/g,
      to: '// Removed non-existent design system imports\n'
    },
    {
      from: /import { DashboardCard } from '\.\.\/\.\.\/\.\.\/design-system\/DashboardCard';\n/g,
      to: ''
    },
    {
      from: /import { Button } from '\.\.\/\.\.\/\.\.\/design-system\/Button';\n/g,
      to: ''
    }
  ];
  
  importFixes.forEach(fix => {
    updatedContent = updatedContent.replace(fix.from, fix.to);
  });
  
  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Fixing design system imports for ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix design system imports
    content = fixDesignSystemImports(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Fixed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🔧 Fixing design system imports across all portals...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All design system imports fixed!');
}

main().catch(console.error);
