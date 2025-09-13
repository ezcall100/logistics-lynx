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

function removeHeaderIcons(content) {
  let updatedContent = content;
  
  // Remove Download Reports button
  updatedContent = updatedContent.replace(
    /\/\*\* Download Button - Hidden on mobile \*\/\s*\n\s*<button[^>]*title="Download Reports"[^>]*>\s*\n\s*<Download[^>]*\/>\s*\n\s*<\/button>\s*\n?/g,
    ''
  );
  
  // Remove Upload Data button
  updatedContent = updatedContent.replace(
    /\/\*\* Upload Button - Hidden on mobile \*\/\s*\n\s*<button[^>]*title="Upload Data"[^>]*>\s*\n\s*<Upload[^>]*\/>\s*\n\s*<\/button>\s*\n?/g,
    ''
  );
  
  // Remove Share Dashboard button
  updatedContent = updatedContent.replace(
    /\/\*\* Share Button - Hidden on mobile \*\/\s*\n\s*<button[^>]*title="Share Dashboard"[^>]*>\s*\n\s*<Share2[^>]*\/>\s*\n\s*<\/button>\s*\n?/g,
    ''
  );
  
  // Remove Bookmark button
  updatedContent = updatedContent.replace(
    /\/\*\* Bookmark Button \*\/\s*\n\s*<button[^>]*title="Bookmark"[^>]*>\s*\n\s*<Bookmark[^>]*\/>\s*\n\s*<\/button>\s*\n?/g,
    ''
  );
  
  // Remove Sound Toggle button
  updatedContent = updatedContent.replace(
    /\/\*\* Sound Toggle \*\/\s*\n\s*<button[^>]*onClick=\{\(\) => setSoundEnabled\(!soundEnabled\)\}[^>]*>\s*\n\s*{soundEnabled \? <Volume2[^>]*\/> : <VolumeX[^>]*\/>}\s*\n\s*<\/button>\s*\n?/g,
    ''
  );
  
  // Remove Fullscreen Toggle button
  updatedContent = updatedContent.replace(
    /\/\*\* Fullscreen Toggle \*\/\s*\n\s*<button[^>]*onClick=\{\(\) => setFullscreen\(!fullscreen\)\}[^>]*>\s*\n\s*{fullscreen \? \(\s*\n\s*<Minimize2[^>]*\/>\s*\n\s*\) : \(\s*\n\s*<Maximize2[^>]*\/>\s*\n\s*\)}\s*\n\s*<\/button>\s*\n?/g,
    ''
  );
  
  // Remove unused imports
  updatedContent = updatedContent.replace(
    /,\s*Download\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*Upload\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*Share2\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*Bookmark\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*Volume2\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*VolumeX\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*Maximize2\s*,/g,
    ','
  );
  updatedContent = updatedContent.replace(
    /,\s*Minimize2\s*,/g,
    ','
  );
  
  // Remove state variables for sound and fullscreen
  updatedContent = updatedContent.replace(
    /const \[soundEnabled, setSoundEnabled\] = useState\(true\);\s*\n?/g,
    ''
  );
  updatedContent = updatedContent.replace(
    /const \[fullscreen, setFullscreen\] = useState\(false\);\s*\n?/g,
    ''
  );
  
  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Removing header icons from ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove header icons
    content = removeHeaderIcons(content);
    
    // Write back to file
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Updated ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🗑️ Removing specified header icons from all portals...\n');
  console.log('Removing: Download Reports, Upload Data, Share Dashboard, Bookmark, Mute Sounds, Enter Fullscreen\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 All specified header icons removed from all portals!');
  console.log('Note: Dark mode toggle remains as the only theme control.');
}

main().catch(console.error);