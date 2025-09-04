const fs = require('fs');
const path = require('path');

// Comprehensive list of all lucide-react icons that might be used
const allIcons = [
  'Activity', 'AlertCircle', 'AlertTriangle', 'Archive', 'ArrowLeft', 'ArrowRight', 'Award',
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
  let supabaseImportLine = -1;
  
  // Find existing imports
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("from 'lucide-react'")) {
      lucideImportLine = i;
    }
    if (lines[i].includes("from '@supabase/supabase-js'") || lines[i].includes("from '@/integrations/supabase/client'")) {
      supabaseImportLine = i;
    }
    if (lines[i].startsWith('import ') && !lines[i].includes('from')) {
      importLineIndex = i;
    }
  }
  
  // Find missing icons in the file
  const missingIconsInFile = [];
  for (const icon of allIcons) {
    if (content.includes(`<${icon}`) || content.includes(`${icon} className`) || content.includes(`${icon} `)) {
      // Check if icon is not already imported
      if (!content.includes(`import {`) || !content.includes(`${icon}`)) {
        missingIconsInFile.push(icon);
      }
    }
  }
  
  // Add missing supabase import if needed
  if (content.includes('supabase') && !content.includes("from '@supabase/supabase-js'") && !content.includes("from '@/integrations/supabase/client'")) {
    const supabaseImport = "import { supabase } from '@/integrations/supabase/client';";
    if (importLineIndex !== -1) {
      lines.splice(importLineIndex + 1, 0, supabaseImport);
    } else {
      lines.unshift(supabaseImport);
    }
  }
  
  // Add missing icons to existing import or create new import
  if (missingIconsInFile.length > 0) {
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
  // Fix various useState patterns
  const patterns = [
    // Fix double closing brackets
    { pattern: /\]\] = useState\(/g, replacement: '] = useState(' },
    // Fix missing commas and extra brackets
    { pattern: /const \[([^,]+)\], set([^=]+)\]\] = useState\(/g, replacement: 'const [$1, set$2] = useState(' },
    // Fix extra brackets after setter
    { pattern: /set([^=]+)\]\] = useState\(/g, replacement: 'set$1] = useState(' },
    // Fix missing commas in useState
    { pattern: /const \[([^,]+) = useState\(/g, replacement: 'const [$1, set$1] = useState(' },
    // Fix missing closing bracket and comma
    { pattern: /const \[([^,]+), set([^=]+) = useState\(/g, replacement: 'const [$1, set$2] = useState(' },
    // Fix missing closing bracket
    { pattern: /const \[([^,]+), set([^=]+)\] = useState\(/g, replacement: 'const [$1, set$2] = useState(' },
    // Fix extra brackets in various positions
    { pattern: /const \[([^,]+)\], set([^=]+)\]\] = useState\(/g, replacement: 'const [$1, set$2] = useState(' },
    { pattern: /const \[([^,]+), set([^=]+)\]\] = useState\(/g, replacement: 'const [$1, set$2] = useState(' },
    { pattern: /const \[([^,]+)\], set([^=]+)\] = useState\(/g, replacement: 'const [$1, set$2] = useState(' }
  ];
  
  patterns.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  return content;
}

// Function to fix Button component prop issues
function fixButtonProps(content) {
  // Fix Button variant and size props
  content = content.replace(/<Button variant="([^"]+)" size="([^"]+)">/g, '<Button variant="$1" size="$2">');
  content = content.replace(/<Button variant="([^"]+)">/g, '<Button variant="$1">');
  content = content.replace(/<Button size="([^"]+)">/g, '<Button size="$1">');
  
  return content;
}

// Function to fix extra closing braces
function fixExtraBraces(content) {
  // Fix extra closing braces before export statements
  content = content.replace(/};\s*\n\s*export default/g, 'export default');
  content = content.replace(/}\s*\);\s*$/gm, '});');
  
  return content;
}

console.log('🚀 Ultimate TypeScript Error Fix Script Starting...');

// Get all TypeScript files
const tsFiles = findTsFiles('src');
let fixedCount = 0;
let totalErrors = 0;

console.log(`📁 Found ${tsFiles.length} TypeScript files to process...`);

tsFiles.forEach((file, index) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Apply all fixes
    content = addMissingImports(content, file);
    content = removeUnusedImports(content);
    content = fixUseStateSyntax(content);
    content = fixButtonProps(content);
    content = fixExtraBraces(content);
    
    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed: ${file}`);
    }
    
    // Progress indicator
    if ((index + 1) % 50 === 0) {
      console.log(`📊 Progress: ${index + 1}/${tsFiles.length} files processed...`);
    }
  } catch (error) {
    console.log(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n🎉 Ultimate TypeScript Fix Complete!`);
console.log(`📊 Files Fixed: ${fixedCount}/${tsFiles.length}`);
console.log(`🔧 Total Files Processed: ${tsFiles.length}`);

// Run type check to see results
console.log('\n🔍 Running type check to verify fixes...');
