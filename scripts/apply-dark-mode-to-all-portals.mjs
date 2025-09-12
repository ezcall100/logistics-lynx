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

// Dark mode transformations
const darkModeTransformations = [
  // Main container backgrounds
  {
    from: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
    to: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'
  },
  {
    from: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
    to: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'
  },
  {
    from: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50',
    to: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'
  },
  
  // Header backgrounds
  {
    from: 'bg-white/80 backdrop-blur-lg',
    to: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg'
  },
  {
    from: 'bg-white/90 backdrop-blur-lg',
    to: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg'
  },
  
  // Border colors
  {
    from: 'border-gray-200/50',
    to: 'border-gray-200/50 dark:border-slate-700/50'
  },
  {
    from: 'border-gray-200',
    to: 'border-gray-200 dark:border-slate-700'
  },
  
  // Sidebar backgrounds
  {
    from: 'bg-white/90 backdrop-blur-lg shadow-xl border-r border-gray-200/50',
    to: 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg shadow-xl border-r border-gray-200/50 dark:border-slate-700/50'
  },
  {
    from: 'bg-white/95 backdrop-blur-lg',
    to: 'bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg'
  },
  
  // Card backgrounds
  {
    from: 'bg-white/70 backdrop-blur-lg',
    to: 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg'
  },
  {
    from: 'bg-white/80 backdrop-blur-lg',
    to: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg'
  },
  
  // Text colors
  {
    from: 'text-gray-900',
    to: 'text-gray-900 dark:text-gray-100'
  },
  {
    from: 'text-gray-800',
    to: 'text-gray-800 dark:text-gray-200'
  },
  {
    from: 'text-gray-700',
    to: 'text-gray-700 dark:text-gray-300'
  },
  {
    from: 'text-gray-600',
    to: 'text-gray-600 dark:text-gray-300'
  },
  
  // Gradient text
  {
    from: 'bg-gradient-to-r from-gray-900 to-gray-700',
    to: 'bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300'
  },
  
  // Button backgrounds
  {
    from: 'bg-white/70 hover:bg-white/90',
    to: 'bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90'
  },
  
  // Input backgrounds
  {
    from: 'bg-white/70 backdrop-blur-sm',
    to: 'bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm'
  }
];

function applyDarkModeTransformations(content) {
  let updatedContent = content;
  
  // Apply all transformations
  darkModeTransformations.forEach(transformation => {
    const regex = new RegExp(transformation.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    updatedContent = updatedContent.replace(regex, transformation.to);
  });
  
  return updatedContent;
}

function addThemeToggleImport(content) {
  // Check if ThemeToggle is already imported
  if (content.includes('ThemeToggle')) {
    return content;
  }
  
  // Find the import section and add ThemeToggle import
  const importRegex = /(import.*from.*['"]react['"];?\s*\n)/;
  const match = content.match(importRegex);
  
  if (match) {
    const newImport = match[1] + "import { ThemeToggle } from '../../components/common/ThemeToggle';\n";
    return content.replace(importRegex, newImport);
  }
  
  return content;
}

function addThemeToggleToHeader(content) {
  // Check if ThemeToggle is already in the header
  if (content.includes('<ThemeToggle')) {
    return content;
  }
  
  // Find the settings button and add ThemeToggle before it
  const settingsButtonRegex = /(\s*<button\s+onClick=\{.*setShowSettingsMenu.*\n\s*className="[^"]*"\s*\n\s*title="Settings"\s*\n\s*>\s*\n\s*<Settings[^>]*\/>\s*\n\s*<\/button>)/;
  const match = content.match(settingsButtonRegex);
  
  if (match) {
    const themeToggle = '\n                  {/* Theme Toggle */}\n                  <ThemeToggle size="sm" />\n';
    return content.replace(settingsButtonRegex, themeToggle + match[1]);
  }
  
  return content;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Updating ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Apply dark mode transformations
    content = applyDarkModeTransformations(content);
    
    // Add ThemeToggle import
    content = addThemeToggleImport(content);
    
    // Add ThemeToggle to header
    content = addThemeToggleToHeader(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🌙 Applying dark mode to all portals...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 Dark mode applied to all portals!');
  console.log('\nNext steps:');
  console.log('1. Test the theme toggle in each portal');
  console.log('2. Adjust any remaining colors that need dark mode support');
  console.log('3. Ensure all text is readable in both light and dark modes');
}

main().catch(console.error);
