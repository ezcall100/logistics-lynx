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

function fixLightColorsInDarkMode(content) {
  let updatedContent = content;
  
  // Fix light background colors to have dark mode variants
  const colorFixes = [
    // Metric card backgrounds
    {
      from: /bgColor: 'bg-blue-50',/g,
      to: "bgColor: 'bg-blue-50 dark:bg-blue-900/20',"
    },
    {
      from: /bgColor: 'bg-purple-50',/g,
      to: "bgColor: 'bg-purple-50 dark:bg-purple-900/20',"
    },
    {
      from: /bgColor: 'bg-green-50',/g,
      to: "bgColor: 'bg-green-50 dark:bg-green-900/20',"
    },
    {
      from: /bgColor: 'bg-yellow-50',/g,
      to: "bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',"
    },
    {
      from: /bgColor: 'bg-red-50',/g,
      to: "bgColor: 'bg-red-50 dark:bg-red-900/20',"
    },
    {
      from: /bgColor: 'bg-orange-50',/g,
      to: "bgColor: 'bg-orange-50 dark:bg-orange-900/20',"
    },
    {
      from: /bgColor: 'bg-cyan-50',/g,
      to: "bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',"
    },
    {
      from: /bgColor: 'bg-gray-50',/g,
      to: "bgColor: 'bg-gray-50 dark:bg-slate-700/50',"
    },
    
    // Status colors
    {
      from: /text-green-600 bg-green-50 border-green-200/g,
      to: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    },
    {
      from: /text-yellow-600 bg-yellow-50 border-yellow-200/g,
      to: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    },
    {
      from: /text-red-600 bg-red-50 border-red-200/g,
      to: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    },
    {
      from: /text-blue-600 bg-blue-50 border-blue-200/g,
      to: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    },
    
    // Portal type colors
    {
      from: /text-purple-600 bg-purple-50/g,
      to: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
    },
    {
      from: /text-blue-600 bg-blue-50/g,
      to: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
    },
    {
      from: /text-green-600 bg-green-50/g,
      to: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    },
    {
      from: /text-orange-600 bg-orange-50/g,
      to: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
    },
    {
      from: /text-cyan-600 bg-cyan-50/g,
      to: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20'
    },
    {
      from: /text-yellow-600 bg-yellow-50/g,
      to: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
    },
    
    // Hover states
    {
      from: /hover:bg-gray-50/g,
      to: 'hover:bg-gray-50 dark:hover:bg-slate-700/50'
    },
    
    // Gradient backgrounds
    {
      from: /bg-gradient-to-r from-blue-50 to-indigo-50/g,
      to: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
    },
    {
      from: /bg-gradient-to-r from-emerald-50 to-teal-50/g,
      to: 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
    },
    {
      from: /bg-gradient-to-r from-purple-50 to-indigo-50/g,
      to: 'bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20'
    },
    
    // Specific elements
    {
      from: /bg-green-50 rounded-lg border border-green-200/g,
      to: 'bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'
    },
    {
      from: /bg-emerald-50 border-emerald-200/g,
      to: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
    },
    {
      from: /bg-indigo-50 border-indigo-200/g,
      to: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
    },
    {
      from: /bg-red-100/g,
      to: 'bg-red-100 dark:bg-red-900/30'
    }
  ];
  
  colorFixes.forEach(fix => {
    updatedContent = updatedContent.replace(fix.from, fix.to);
  });
  
  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Fixing light colors in dark mode for ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix light colors in dark mode
    content = fixLightColorsInDarkMode(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Fixed ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Fixing light colors in dark mode across all portals...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All light colors fixed for dark mode!');
}

main().catch(console.error);
