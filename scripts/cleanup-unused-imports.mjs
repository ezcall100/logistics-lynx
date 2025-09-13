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

  // Remove unused imports
  const importMatch = content.match(/import \{[^}]+\} from 'lucide-react';/);
  if (importMatch) {
    const importLine = importMatch[0];
    const iconMatches = importLine.match(/\b\w+\b/g);
    if (iconMatches) {
      const importedIcons = iconMatches.slice(1, -2); // Remove 'import', '{', 'from', 'lucide-react'
      const unusedIcons = importedIcons.filter(icon => !usedIcons.includes(icon));
      
      if (unusedIcons.length > 0) {
        // Remove unused icons from import
        let newImportLine = importLine;
        unusedIcons.forEach(icon => {
          newImportLine = newImportLine.replace(new RegExp(`\\s*${icon},?\\s*`), ' ');
        });
        
        // Clean up any double spaces or trailing commas
        newImportLine = newImportLine.replace(/\s+/g, ' ').replace(/, }/g, ' }');
        
        content = content.replace(importLine, newImportLine);
        modified = true;
        console.log(`✅ Removed unused imports from ${fileName}:`, unusedIcons.join(', '));
      }
    }
  }

  if (modified) {
    fs.writeFileSync(portalPath, content);
  }
});

console.log('🎉 Cleanup completed!');
