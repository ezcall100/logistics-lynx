const fs = require('fs');

// Files with useState syntax errors
const filesToFix = [
  'src/components/layout/EnhancedHeader.tsx',
  'src/components/ui/DataTable.tsx',
  'src/data/mockCRMData.ts',
  'src/pages/driver/RouteNavigation.tsx',
  'src/pages/owner-operator/HomeTimeOptimization.tsx',
  'src/pages/super-admin/autonomous-system/AgentMonitor.tsx',
  'src/pages/super-admin/autonomous-system/AutonomousControl.tsx',
  'src/pages/super-admin/fab/FABActions.tsx',
  'src/pages/super-admin/fab/FABAnalytics.tsx',
  'src/pages/super-admin/fab/FABCustomization.tsx',
  'src/pages/super-admin/fab/FABIntegrations.tsx',
  'src/pages/super-admin/fab/FABOverview.tsx',
  'src/pages/super-admin/fab/FABTemplates.tsx',
  'src/pages/super-admin/mobile/MobileDevices.tsx',
  'src/pages/super-admin/mobile/MobileOverview.tsx',
  'src/pages/super-admin/mobile/MobileSettings.tsx',
  'src/pages/super-admin/mobile/MobileSync.tsx',
  'src/pages/super-admin/profile/AccountVerification.tsx',
  'src/pages/super-admin/profile/ActivityHistory.tsx',
  'src/pages/super-admin/profile/ProfileOverview.tsx',
  'src/pages/super-admin/security-center/SecurityScannerDashboard.tsx',
  'src/pages/super-admin/system-administration/APIManagement.tsx',
  'src/pages/super-admin/system-administration/DatabaseManagement.tsx',
  'src/pages/super-admin/system-administration/ServerMonitoring.tsx',
  'src/pages/super-admin/system-monitoring/PerformanceMonitorDashboard.tsx',
  'src/pages/super-admin/user-management/AccessControl.tsx',
  'src/pages/super-admin/user-management/SupportTickets.tsx',
  'src/pages/super-admin/user-management/UserAnalytics.tsx',
  'src/pages/super-admin/user-management/UserManagement.tsx',
  'src/pages/super-admin/user-management/UserOnboarding.tsx'
];

console.log('🔧 Fixing useState syntax errors...');

filesToFix.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix specific useState syntax patterns
    const fixes = [
      // Fix missing commas and brackets in useState
      {
        pattern: /const \[([^,]+)\], set([^=]+)\] = useState\(/g,
        replacement: 'const [$1, set$2] = useState('
      },
      // Fix missing commas in useState
      {
        pattern: /const \[([^,]+) = useState\(/g,
        replacement: 'const [$1, set$1] = useState('
      },
      // Fix extra closing brackets
      {
        pattern: /\]\] = useState\(/g,
        replacement: '] = useState('
      },
      // Fix missing closing bracket and comma
      {
        pattern: /const \[([^,]+), set([^=]+) = useState\(/g,
        replacement: 'const [$1, set$2] = useState('
      },
      // Fix broken import statements
      {
        pattern: /import \{ ([^}]+) \} from 'lucide-react';\n} from '@\/types\/crm';/g,
        replacement: 'import { $1 } from \'lucide-react\';\nimport { CRMContact, CRMCompany, CRMOpportunity, CRMLead, CRMActivity, CRMEmail, CRMEvent, CRMProject } from \'@/types/crm\';'
      }
    ];
    
    fixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    
    // Special fix for mockCRMData.ts
    if (file === 'src/data/mockCRMData.ts') {
      content = content.replace(
        /import \{ Calendar \} from 'lucide-react';\n} from '@/types/crm';/g,
        'import { Calendar } from \'lucide-react\';\nimport { CRMContact, CRMCompany, CRMOpportunity, CRMLead, CRMActivity, CRMEmail, CRMEvent, CRMProject } from \'@/types/crm\';'
      );
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed: ${file}`);
  } catch (error) {
    console.log(`❌ Error processing ${file}:`, error.message);
  }
});

console.log('\n🎉 useState syntax fixes completed!');
