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
    } else if (item.endsWith('Portal.tsx')) {
      allPortals.push(fullPath);
    }
  }
}

getAllPortals(portalDir);

console.log('🧹 Cleaning up unused imports in', allPortals.length, 'portals...');

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

  // Find and fix the import statement
  const importMatch = content.match(/import \{[^}]+\} from 'lucide-react';/);
  if (importMatch) {
    const importLine = importMatch[0];
    
    // Extract imported icons
    const iconMatches = importLine.match(/\b\w+\b/g);
    if (iconMatches) {
      const importedIcons = iconMatches.slice(1, -2); // Remove 'import', '{', 'from', 'lucide-react'
      const usedImportedIcons = importedIcons.filter(icon => usedIcons.includes(icon));
      
      if (usedImportedIcons.length !== importedIcons.length) {
        // Create a clean import with only used icons
        const cleanImport = `import {
  ${usedImportedIcons.join(',\n  ')}
} from 'lucide-react';`;
        
        content = content.replace(importLine, cleanImport);
        modified = true;
        console.log(`✅ Cleaned unused imports in ${fileName}: removed ${importedIcons.length - usedImportedIcons.length} unused icons`);
      }
    }
  }

  if (modified) {
    fs.writeFileSync(portalPath, content);
  }
});

console.log('🎉 All unused imports cleaned up!');
