const fs = require('fs');
const path = require('path');

// All missing icons that need to be imported
const allMissingIcons = [
  'AlertCircle', 'AlertTriangle', 'Archive', 'ArrowLeft', 'ArrowRight', 'Award',
  'BarChart3', 'Brain', 'Building', 'Calendar', 'Check', 'CheckCircle', 'ChevronDown',
  'ChevronRight', 'Clock', 'Cpu', 'Database', 'Download', 'Edit', 'Eye', 'EyeOff',
  'Filter', 'Fuel', 'GraduationCap', 'Headphones', 'Lock', 'MapPin', 'Moon',
  'MousePointer', 'Package', 'Pause', 'Phone', 'Play', 'Plus', 'RefreshCw',
  'Save', 'Search', 'Settings', 'Shield', 'SkipForward', 'Sparkles', 'Star',
  'Sun', 'Target', 'Tag', 'TrendingDown', 'TrendingUp', 'Trash2', 'Truck',
  'Upload', 'User', 'UserPlus', 'Users', 'Wrench', 'XCircle', 'Zap'
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

// Function to add missing imports to a file
function addMissingImports(content, filePath) {
  const lines = content.split('\n');
  let importLineIndex = -1;
  let lucideImportLine = -1;
  
  // Find existing lucide-react import
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("from 'lucide-react'")) {
      lucideImportLine = i;
      break;
    }
    if (lines[i].startsWith('import ') && !lines[i].includes('from')) {
      importLineIndex = i;
    }
  }
  
  // Find missing icons in the file
  const missingIconsInFile = [];
  for (const icon of allMissingIcons) {
    if (content.includes(`<${icon}`) || content.includes(`${icon} className`) || content.includes(`${icon} `)) {
      // Check if icon is not already imported
      if (!content.includes(`import {`) || !content.includes(`${icon}`)) {
        missingIconsInFile.push(icon);
      }
    }
  }
  
  if (missingIconsInFile.length === 0) return content;
  
  // Add missing icons to existing import or create new import
  if (lucideImportLine !== -1) {
    const importLine = lines[lucideImportLine];
    const match = importLine.match(/import \{ ([^}]+) \} from 'lucide-react'/);
    if (match) {
      const existingIcons = match[1].split(',').map(i => i.trim());
      const allIcons = [...new Set([...existingIcons, ...missingIconsInFile])].sort();
      lines[lucideImportLine] = `import { ${allIcons.join(', ')} } from 'lucide-react';`;
    }
  } else {
    // Create new import line
    const newImport = `import { ${missingIconsInFile.join(', ')} } from 'lucide-react';`;
    if (importLineIndex !== -1) {
      lines.splice(importLineIndex + 1, 0, newImport);
    } else {
      lines.unshift(newImport);
    }
  }
  
  return lines.join('\n');
}

// Function to remove unused imports
function removeUnusedImports(content) {
  const lines = content.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip lucide-react import lines for now
    if (line.includes("from 'lucide-react'")) {
      newLines.push(line);
      continue;
    }
    
    // Check for unused imports
    if (line.includes('import {') && line.includes('} from')) {
      const match = line.match(/import \{ ([^}]+) \} from/);
      if (match) {
        const imports = match[1].split(',').map(i => i.trim());
        const usedImports = [];
        
        for (const imp of imports) {
          // Check if import is used in the rest of the file
          const remainingContent = lines.slice(i + 1).join('\n');
          if (remainingContent.includes(`<${imp}`) || 
              remainingContent.includes(`${imp} className`) || 
              remainingContent.includes(`${imp} `) ||
              remainingContent.includes(`${imp}(`) ||
              remainingContent.includes(`${imp}[`) ||
              remainingContent.includes(`${imp}.`)) {
            usedImports.push(imp);
          }
        }
        
        if (usedImports.length > 0) {
          const newImportLine = line.replace(match[1], usedImports.join(', '));
          newLines.push(newImportLine);
        }
        // Skip the line if no imports are used
      } else {
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }
  
  return newLines.join('\n');
}

// Function to fix useState syntax errors
function fixUseStateSyntax(content) {
  // Fix missing commas in useState declarations
  content = content.replace(
    /const \[([^,]+) = useState\(/g,
    'const [$1, set$1] = useState('
  );
  
  // Fix extra closing brackets
  content = content.replace(/\]\] = useState\(/g, '] = useState(');
  
  return content;
}

// Function to fix missing state variables
function fixMissingStateVariables(content) {
  // Add missing timeRange state if used but not declared
  if (content.includes('timeRange') && !content.includes('const [timeRange')) {
    content = content.replace(
      /const \[([^\]]+)\]/,
      'const [timeRange, setTimeRange] = useState(\'7d\');\n  const [$1'
    );
  }
  
  // Add missing selectedFilter state if used but not declared
  if (content.includes('selectedFilter') && !content.includes('const [selectedFilter')) {
    content = content.replace(
      /const \[([^\]]+)\]/,
      'const [selectedFilter, setSelectedFilter] = useState(\'all\');\n  const [$1'
    );
  }
  
  return content;
}

console.log('🔧 Comprehensive TypeScript fix...');

// Get all TypeScript files
const tsFiles = findTsFiles('src');
let fixedCount = 0;

tsFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Apply all fixes
    content = addMissingImports(content, file);
    content = removeUnusedImports(content);
    content = fixUseStateSyntax(content);
    content = fixMissingStateVariables(content);
    
    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed: ${file}`);
    }
  } catch (error) {
    console.log(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n🎉 Fixed ${fixedCount} files!`);
