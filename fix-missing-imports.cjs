const fs = require('fs');
const path = require('path');

// Common icons that are used throughout the app
const commonIcons = [
  'BarChart3', 'Brain', 'RefreshCw', 'Download', 'Calendar', 'Users', 'TrendingUp', 
  'Activity', 'Clock', 'Eye', 'MousePointer', 'Cpu', 'Target', 'Filter', 'Search', 
  'Zap', 'Plus', 'AlertTriangle', 'Lock', 'Edit', 'Trash2', 'CheckCircle', 'Play', 
  'Pause', 'AlertCircle', 'GraduationCap', 'Award', 'UserPlus', 'SkipForward', 
  'Settings', 'Shield', 'Sparkles', 'ChevronDown', 'ChevronRight', 'Star', 'ArrowRight', 
  'Phone', 'Truck', 'DollarSign', 'FileText', 'ShoppingCart', 'BookOpen', 'Calculator', 
  'Smartphone', 'X', 'Menu', 'Twitter', 'Linkedin', 'Github', 'Mail', 'Check'
];

// Function to add missing imports to a file
function addMissingImports(content, filePath) {
  const lines = content.split('\n');
  let importIndex = -1;
  let hasLucideImport = false;
  
  // Find existing lucide-react import
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('from') && lines[i].includes('lucide-react')) {
      hasLucideImport = true;
      importIndex = i;
      break;
    }
  }
  
  // Find all icon usages in the file
  const usedIcons = new Set();
  commonIcons.forEach(icon => {
    if (content.includes(`<${icon}`) || content.includes(`<${icon} `)) {
      usedIcons.add(icon);
    }
  });
  
  if (usedIcons.size === 0) return content;
  
  // Create import statement
  const importStatement = `import { ${Array.from(usedIcons).join(', ')} } from 'lucide-react';`;
  
  if (hasLucideImport) {
    // Replace existing import
    lines[importIndex] = importStatement;
  } else {
    // Add new import at the top
    const insertIndex = lines.findIndex(line => line.startsWith('import'));
    if (insertIndex === -1) {
      lines.unshift(importStatement);
    } else {
      lines.splice(insertIndex, 0, importStatement);
    }
  }
  
  return lines.join('\n');
}

// Function to fix missing state variables
function fixMissingStateVariables(content) {
  // Add missing timeRange state
  if (content.includes('timeRange') && !content.includes('const [timeRange')) {
    content = content.replace(
      /const \[([^\]]+)\]/,
      'const [timeRange, setTimeRange] = useState(\'7d\');\n  const [$1'
    );
  }
  
  // Add missing selectedFilter state
  if (content.includes('selectedFilter') && !content.includes('const [selectedFilter')) {
    content = content.replace(
      /const \[([^\]]+)\]/,
      'const [selectedFilter, setSelectedFilter] = useState(\'all\');\n  const [$1'
    );
  }
  
  return content;
}

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

// Main function to fix all files
function fixMissingImports() {
  console.log('🔧 Fixing missing imports...');
  
  const srcDir = path.join(__dirname, 'src');
  const files = findTsFiles(srcDir);
  
  let fixedFiles = 0;
  
  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Add missing imports
      content = addMissingImports(content, file);
      
      // Fix missing state variables
      content = fixMissingStateVariables(content);
      
      // Only write if content changed
      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        fixedFiles++;
        console.log(`✅ Fixed: ${path.relative(__dirname, file)}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedFiles} files!`);
}

// Run the fix
fixMissingImports();
