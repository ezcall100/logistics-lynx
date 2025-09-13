import fs from 'fs';
import path from 'path';

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

function fixPortalStructure(content, portalName) {
  let updatedContent = content;
  
  // Replace PortalLayout with standard div structure
  const portalLayoutRegex = /<PortalLayout\s+portalName="([^"]+)"\s+portalType="([^"]+)"\s+user=\{user\}\s+menuItems=\{menuItems\}\s+notifications=\{notifications\}\s*>/g;
  updatedContent = updatedContent.replace(portalLayoutRegex, `
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  ${portalName}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  TransBot AI Portal
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  className="h-10 w-10 rounded-xl shadow-md"
                  src={user.avatar}
                  alt={user.name}
                />
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="space-y-6">`);

  // Replace closing PortalLayout tag
  updatedContent = updatedContent.replace(/<\/PortalLayout>/g, `
        </div>
      </main>
    </div>`);

  // Replace DashboardCard with standard card structure
  const dashboardCardRegex = /<DashboardCard\s+{\.\.\.([^}]+)}\s*\/>/g;
  updatedContent = updatedContent.replace(dashboardCardRegex, (match, props) => {
    return `
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">${props.title || 'Metric'}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${props.value || '0'}</p>
            <p className="text-sm ${props.change?.type === 'increase' ? 'text-green-600' : 'text-red-600'}">
              ${props.change?.value || '0%'}
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <${props.icon || 'TrendingUp'} className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>`;
  });

  // Replace Button components with standard button structure
  const buttonRegex = /<Button\s+([^>]+)>\s*([^<]+)\s*<\/Button>/g;
  updatedContent = updatedContent.replace(buttonRegex, (match, props, children) => {
    return `
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        ${children}
      </button>`;
  });

  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Fixing portal structure for ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract portal name from file path
    const portalName = path.basename(filePath, '.tsx').replace('Portal', ' Portal');
    
    // Fix portal structure
    content = fixPortalStructure(content, portalName);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Fixed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🔧 Fixing portal layout structure across all portals...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All portal structures fixed!');
}

main().catch(console.error);
