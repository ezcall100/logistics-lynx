import fs from 'fs';
import path from 'path';

// Get all portal files
const portalDir = 'src/pages/portals';
const allPortals = [];

function getAllPortals(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllPortals(fullPath);
    } else if (item.endsWith('Portal.tsx') && !item.includes('SuperAdmin')) {
      allPortals.push(fullPath);
    }
  }
}

getAllPortals(portalDir);

console.log('🔧 Fixing import syntax errors in', allPortals.length, 'portals...');

// Icons that are actually used in the template
const usedIcons = [
  'Users', 'Search', 'Bell', 'Settings', 'Plus', 'TrendingUp', 'AlertTriangle',
  'DollarSign', 'ChevronRight', 'ChevronLeft', 'ChevronDown', 'FileText',
  'Calendar', 'MessageSquare', 'Phone', 'MessageCircle', 'Send', 'Video',
  'CheckSquare', 'User', 'Mail', 'LogOut', 'Home', 'BarChart3', 'Activity',
  'CheckCircle', 'Zap', 'Shield', 'UserPlus', 'CreditCard', 'HelpCircle',
  'Globe', 'Wifi', 'RefreshCw', 'History', 'Star', 'Heart', 'Flag', 'Lock',
  'Server', 'Truck', 'Package', 'MapPin', 'Clock', 'BookOpen'
];

allPortals.forEach(portalPath => {
  const fileName = path.basename(portalPath);
  let content = fs.readFileSync(portalPath, 'utf8');
  let modified = false;

  // Find and fix the corrupted import statement
  const importMatch = content.match(/import \{[^}]+\} 'lucide-react';/);
  if (importMatch) {
    const importLine = importMatch[0];
    
    // Create a clean import with only used icons
    const cleanImport = `import {
  ${usedIcons.join(',\n  ')}
} from 'lucide-react';`;
    
    content = content.replace(importLine, cleanImport);
    modified = true;
    console.log(`✅ Fixed import syntax in ${fileName}`);
  }

  if (modified) {
    fs.writeFileSync(portalPath, content);
  }
});

console.log('🎉 Import syntax errors fixed!');

