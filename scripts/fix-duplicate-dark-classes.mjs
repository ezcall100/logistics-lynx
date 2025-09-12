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

function removeDuplicateClasses(content) {
  // Remove duplicate dark: classes
  const duplicatePatterns = [
    // Duplicate dark:border-slate-700/50
    /(dark:border-slate-700\/50\s*)+/g,
    // Duplicate dark:from-slate-900
    /(dark:from-slate-900\s*)+/g,
    // Duplicate dark:via-slate-800
    /(dark:via-slate-800\s*)+/g,
    // Duplicate dark:to-slate-900
    /(dark:to-slate-900\s*)+/g,
    // Duplicate dark:bg-slate-800/80
    /(dark:bg-slate-800\/80\s*)+/g,
    // Duplicate dark:bg-slate-800/90
    /(dark:bg-slate-800\/90\s*)+/g,
    // Duplicate dark:bg-slate-800/70
    /(dark:bg-slate-800\/70\s*)+/g,
    // Duplicate dark:bg-slate-800/95
    /(dark:bg-slate-800\/95\s*)+/g,
  ];

  let cleanedContent = content;
  
  duplicatePatterns.forEach(pattern => {
    cleanedContent = cleanedContent.replace(pattern, (match) => {
      // Return only the first occurrence
      const parts = match.trim().split(/\s+/);
      const uniqueParts = [...new Set(parts)];
      return uniqueParts.join(' ');
    });
  });

  return cleanedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Cleaning duplicate classes in ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove duplicate classes
    content = removeDuplicateClasses(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Cleaned ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🧹 Cleaning duplicate dark mode classes...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All duplicate classes cleaned!');
}

main().catch(console.error);
