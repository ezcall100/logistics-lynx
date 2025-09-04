const fs = require('fs');

// Files with useState syntax errors
const filesToFix = [
  'src/components/QA/ConfidenceLogChart.tsx',
  'src/hooks/useRealAnalytics.ts',
  'src/pages/carrier/CarrierAnalytics.tsx',
  'src/pages/driver/DriverAnalytics.tsx',
  'src/pages/owner-operator/OwnerOperatorAnalytics.tsx',
  'src/pages/shipper/ShipperAnalytics.tsx',
  'src/pages/super-admin/agent-workflows/AgentWorkflows.tsx',
  'src/pages/super-admin/analytics-reports/PerformanceAnalytics.tsx',
  'src/pages/super-admin/dashboard/SystemOverview.tsx',
  'src/pages/super-admin/deployment/DeploymentControls.tsx',
  'src/pages/super-admin/mcp-control-center/QAIntelligence.tsx',
  'src/pages/super-admin/performance/PerformanceMonitor.tsx',
  'src/pages/super-admin/qa-testing/QATestingPanel.tsx',
  'src/pages/super-admin/security/SecurityScanner.tsx',
  'src/pages/super-admin/system-settings/SystemSettings.tsx',
  'src/pages/super-admin/ui-components/UIComponentRegistry.tsx',
  'src/pages/super-admin/user-management/BillingManagement.tsx'
];

console.log('🔧 Fixing useState bracket errors...');

filesToFix.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix extra closing brackets in useState declarations
    content = content.replace(/\]\] = useState\(/g, '] = useState(');
    
    // Fix missing commas in useState declarations
    content = content.replace(/const \[([^,]+), ([^=]+) = useState\(/g, 'const [$1, $2] = useState(');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed: ${file}`);
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('🎉 useState bracket errors fixed!');
