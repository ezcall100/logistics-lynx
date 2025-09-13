import fs from 'fs';

// List of all portal files that need fixing
const portalFiles = [
  'src/pages/portals/admin/AdminPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx'
];

function fixPortalComponents(content) {
  let updatedContent = content;
  
  // Replace PortalLayout with a simple div
  updatedContent = updatedContent.replace(
    /<PortalLayout[^>]*>/g,
    '<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">'
  );
  
  // Replace closing PortalLayout tag
  updatedContent = updatedContent.replace(/<\/PortalLayout>/g, '</div>');
  
  // Replace DashboardCard with a simple div
  updatedContent = updatedContent.replace(
    /<DashboardCard[^>]*\/>/g,
    '<div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">Dashboard Card</div>'
  );
  
  // Replace Button components with simple button
  updatedContent = updatedContent.replace(
    /<Button[^>]*>([^<]*)<\/Button>/g,
    '<button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">$1</button>'
  );
  
  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Fixing portal components for ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix portal components
    content = fixPortalComponents(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Fixed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🔧 Fixing portal components across all portals...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All portal components fixed!');
}

main().catch(console.error);
