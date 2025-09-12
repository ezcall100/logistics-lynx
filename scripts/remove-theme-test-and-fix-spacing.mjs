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

function removeThemeTestAndFixSpacing(content) {
  let updatedContent = content;
  
  // Remove ThemeTest import
  updatedContent = updatedContent.replace(
    /import\s*{\s*ThemeTest\s*}\s*from\s*['"][^'"]*['"];?\s*\n/g,
    ''
  );
  
  // Remove ThemeTest component usage
  updatedContent = updatedContent.replace(
    /<ThemeTest\s*\/>\s*\n?/g,
    ''
  );
  
  // Fix missing spaces in CSS classes
  const spacingFixes = [
    // Fix dark:from-slate-900dark:via-slate-800dark:to-slate-900
    {
      from: /dark:from-slate-900dark:via-slate-800dark:to-slate-900/g,
      to: 'dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'
    },
    // Fix dark:bg-slate-800/80backdrop-blur-lg
    {
      from: /dark:bg-slate-800\/80backdrop-blur-lg/g,
      to: 'dark:bg-slate-800/80 backdrop-blur-lg'
    },
    // Fix dark:bg-slate-800/90backdrop-blur-lg
    {
      from: /dark:bg-slate-800\/90backdrop-blur-lg/g,
      to: 'dark:bg-slate-800/90 backdrop-blur-lg'
    },
    // Fix dark:bg-slate-800/95backdrop-blur-lg
    {
      from: /dark:bg-slate-800\/95backdrop-blur-lg/g,
      to: 'dark:bg-slate-800/95 backdrop-blur-lg'
    },
    // Fix dark:bg-slate-800/70backdrop-blur-lg
    {
      from: /dark:bg-slate-800\/70backdrop-blur-lg/g,
      to: 'dark:bg-slate-800/70 backdrop-blur-lg'
    },
    // Fix dark:border-slate-700/50sticky
    {
      from: /dark:border-slate-700\/50sticky/g,
      to: 'dark:border-slate-700/50 sticky'
    },
    // Fix dark:border-slate-700/50transition-all
    {
      from: /dark:border-slate-700\/50transition-all/g,
      to: 'dark:border-slate-700/50 transition-all'
    },
    // Fix dark:border-slate-700/50rounded-xl
    {
      from: /dark:border-slate-700\/50rounded-xl/g,
      to: 'dark:border-slate-700/50 rounded-xl'
    },
    // Fix dark:border-slate-700/50hover:from-white/80
    {
      from: /dark:border-slate-700\/50hover:from-white\/80/g,
      to: 'dark:border-slate-700/50 hover:from-white/80'
    }
  ];
  
  spacingFixes.forEach(fix => {
    updatedContent = updatedContent.replace(fix.from, fix.to);
  });
  
  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Cleaning ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove ThemeTest and fix spacing
    content = removeThemeTestAndFixSpacing(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Cleaned ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🧹 Removing ThemeTest components and fixing CSS spacing...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All ThemeTest components removed and spacing fixed!');
}

main().catch(console.error);
