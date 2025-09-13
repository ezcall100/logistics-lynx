import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of files to clean up
const filesToClean = [
  'src/pages/portals/admin/AdminPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/billing/BillingPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/communication/CommunicationPortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/customer/CustomerPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/document/DocumentPortal.tsx',
  'src/pages/portals/driver/DriverPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/financial/FinancialPortal.tsx',
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/integration-admin/IntegrationAdminPortal.tsx',
  'src/pages/portals/integration/IntegrationPortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/loadboard/LoadBoardPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/monitoring-admin/MonitoringAdminPortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/reporting/ReportingPortal.tsx',
  'src/pages/portals/route/RoutePortal.tsx',
  'src/pages/portals/security-admin/SecurityAdminPortal.tsx',
  'src/pages/portals/security/SecurityPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/system-admin/SystemAdminPortal.tsx',
  'src/pages/portals/track/Track&TracePortal.tsx',
  'src/pages/portals/track/TrackPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx'
];

// Common unused imports to remove
const unusedImports = [
  'Send', 'Home', 'BarChart3', 'Activity', 'CheckCircle', 'Zap', 'Shield',
  'UserPlus', 'CreditCard', 'HelpCircle', 'Globe', 'Wifi', 'RefreshCw',
  'History', 'Star', 'Heart', 'Flag', 'Lock', 'Server', 'Truck', 'Package',
  'MapPin', 'Clock', 'BookOpen', 'Sun', 'Moon', 'Square', 'Download',
  'Upload', 'Share2', 'Bookmark', 'Volume2', 'VolumeX', 'Minimize2', 'Maximize2'
];

function cleanFile(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;

    // Remove unused imports from lucide-react
    const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/g;
    
    content = content.replace(importRegex, (match, imports) => {
      const importList = imports.split(',').map(imp => imp.trim());
      const usedImports = importList.filter(imp => {
        const cleanImp = imp.trim();
        // Keep imports that are actually used in the file
        const isUsed = content.includes(cleanImp) && !unusedImports.includes(cleanImp);
        return isUsed;
      });

      if (usedImports.length !== importList.length) {
        modified = true;
        if (usedImports.length === 0) {
          return ''; // Remove entire import if no imports are used
        }
        return `import { ${usedImports.join(', ')} } from 'lucide-react';`;
      }
      
      return match;
    });

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Cleaned: ${filePath}`);
    } else {
      console.log(`No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error cleaning ${filePath}:`, error.message);
  }
}

console.log('Starting cleanup of unused imports...');

filesToClean.forEach(cleanFile);

console.log('Cleanup completed!');