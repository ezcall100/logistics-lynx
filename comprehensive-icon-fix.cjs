const fs = require('fs');
const path = require('path');

// All the missing icons that need to be imported
const missingIcons = [
  'User', 'Building', 'AlertCircle', 'Clock', 'CheckCircle', 'XCircle', 'Headphones',
  'Search', 'Download', 'Plus', 'Zap', 'Tag', 'Edit', 'Archive', 'TrendingDown',
  'Activity', 'RefreshCw', 'Users', 'MousePointer', 'Cpu', 'Target', 'Filter',
  'Lock', 'Trash2', 'Sun', 'Moon', 'BarChart3', 'Upload', 'Settings', 'Play',
  'Pause', 'SkipForward', 'GraduationCap', 'Award', 'UserPlus', 'Shield',
  'Database', 'Sparkles', 'ChevronDown', 'ChevronRight', 'Star', 'Phone',
  'Package', 'Fuel', 'Wrench', 'MapPin', 'TrendingUp', 'Brain'
];

// Function to recursively find all TypeScript files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log('🔧 Comprehensive icon import fix...');

// Find all TypeScript files
const tsFiles = findTsFiles('./src');
let fixedFiles = 0;

tsFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Check if file has lucide-react import
    if (content.includes("from 'lucide-react'")) {
      // Extract current imports
      const importMatch = content.match(/import \{ ([^}]+) \} from 'lucide-react';/);
      
      if (importMatch) {
        const currentImports = importMatch[1].split(',').map(i => i.trim());
        const neededIcons = [];
        
        // Check which missing icons are used in this file
        missingIcons.forEach(icon => {
          if (content.includes(`<${icon}`) && !currentImports.includes(icon)) {
            neededIcons.push(icon);
          }
        });
        
        // Add missing icons to import
        if (neededIcons.length > 0) {
          const newImports = [...currentImports, ...neededIcons].sort();
          const newImportStatement = `import { ${newImports.join(', ')} } from 'lucide-react';`;
          content = content.replace(importMatch[0], newImportStatement);
          modified = true;
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      fixedFiles++;
      console.log(`✅ Fixed: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log(`🎉 Comprehensive icon fix completed! Fixed ${fixedFiles} files.`);
