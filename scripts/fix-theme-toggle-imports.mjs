import fs from 'fs';
import path from 'path';

// List of all portal files
const portalFiles = [
  'src/pages/portals/customer/CustomerPortal.tsx',
  'src/pages/portals/super-admin/SuperAdminPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/admin/AdminPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/broker/BrokerPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/driver/DriverPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/analytics/AnalyticsPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx'
];

function fixThemeToggleImport(content, filePath) {
  // Determine the correct import path based on file location
  const isInSubfolder = filePath.includes('/portals/') && filePath.split('/').length > 4;
  const correctPath = isInSubfolder 
    ? '../../../components/common/ThemeToggle'
    : '../../components/common/ThemeToggle';
  
  // Fix the import path
  const importRegex = /import\s*{\s*ThemeToggle\s*}\s*from\s*['"][^'"]*['"];?/g;
  const newImport = `import { ThemeToggle } from '${correctPath}';`;
  
  return content.replace(importRegex, newImport);
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Fixing import path in ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix ThemeToggle import path
    content = fixThemeToggleImport(content, filePath);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Fixed import path in ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🔧 Fixing ThemeToggle import paths...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All import paths fixed!');
}

main().catch(console.error);
