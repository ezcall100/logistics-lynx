import fs from 'fs';
import path from 'path';

// Files to fix
const filesToFix = [
  'src/App-complex.tsx',
  'src/components/common/ThemeToggle.tsx',
  'src/components/EcosystemGrid.tsx',
  'src/components/FeaturesSection.tsx',
  'src/components/TrustedBy.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx'
];

console.log('🔧 Fixing remaining build errors...');

filesToFix.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix App-complex.tsx - remove non-existent imports
  if (filePath === 'src/App-complex.tsx') {
    content = content.replace(/import { ThemeProvider } from '\.\/design-system\/ThemeProvider';/g, '');
    content = content.replace(/import SuperAdminPortal from '\.\/pages\/portals\/super-admin\/SuperAdminPortalNew';/g, '');
    modified = true;
  }

  // Fix ThemeToggle.tsx - remove unused variables
  if (filePath === 'src/components/common/ThemeToggle.tsx') {
    content = content.replace(/size = 'md',\s*/g, '');
    content = content.replace(/const sizeClasses = \{[^}]+\};\s*/g, '');
    content = content.replace(/const iconSizes = \{[^}]+\};\s*/g, '');
    modified = true;
  }

  // Fix EcosystemGrid.tsx - remove unused imports
  if (filePath === 'src/components/EcosystemGrid.tsx') {
    content = content.replace(/CreditCard,\s*/g, '');
    modified = true;
  }

  // Fix FeaturesSection.tsx - remove unused imports
  if (filePath === 'src/components/FeaturesSection.tsx') {
    content = content.replace(/Zap,\s*/g, '');
    content = content.replace(/BarChart3,\s*/g, '');
    content = content.replace(/Truck,\s*/g, '');
    content = content.replace(/Clock,\s*/g, '');
    content = content.replace(/Users,\s*/g, '');
    content = content.replace(/Smartphone,\s*/g, '');
    content = content.replace(/Database,\s*/g, '');
    content = content.replace(/Lock,\s*/g, '');
    modified = true;
  }

  // Fix TrustedBy.tsx - remove unused imports
  if (filePath === 'src/components/TrustedBy.tsx') {
    content = content.replace(/Users,\s*/g, '');
    content = content.replace(/Globe,\s*/g, '');
    modified = true;
  }

  // Fix CRMPortal.tsx - remove unused variables
  if (filePath === 'src/pages/portals/crm/CRMPortal.tsx') {
    content = content.replace(/const \[activeTab, setActiveTab\] = useState\('overview'\);\s*/g, '');
    modified = true;
  }

  // Fix MCPAgentsPortal.tsx - remove unused variables
  if (filePath === 'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx') {
    content = content.replace(/const \[soundEnabled, setSoundEnabled\] = useState\(true\);\s*/g, '');
    content = content.replace(/const \[fullscreen, setFullscreen\] = useState\(false\);\s*/g, '');
    modified = true;
  }

  // Fix WorkersPortal.tsx - remove unused variables
  if (filePath === 'src/pages/portals/workers/WorkersPortal.tsx') {
    content = content.replace(/const \[activeTab, setActiveTab\] = useState\('overview'\);\s*/g, '');
    content = content.replace(/const \[soundEnabled, setSoundEnabled\] = useState\(true\);\s*/g, '');
    content = content.replace(/const \[fullscreen, setFullscreen\] = useState\(false\);\s*/g, '');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${filePath}`);
  }
});

console.log('🎉 Build error fixes completed!');
