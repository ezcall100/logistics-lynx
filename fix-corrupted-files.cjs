const fs = require('fs');
const path = require('path');

// Common corruption patterns to fix
const corruptionPatterns = [
  // Fix broken string literals with quotes
  { pattern: /'([^']*?)'([^']*?)'/g, replacement: "'$1$2'" },
  { pattern: /"([^"]*?)"([^"]*?)"/g, replacement: '"$1$2"' },
  
  // Fix broken template literals
  { pattern: /`([^`]*?)`([^`]*?)`/g, replacement: '`$1$2`' },
  
  // Fix broken JSX attributes
  { pattern: /className\s*=\s*"([^"]*?)"([^"]*?)"/g, replacement: 'className="$1$2"' },
  { pattern: /className\s*=\s*'([^']*?)'([^']*?)'/g, replacement: "className='$1$2'" },
  
  // Fix broken array access
  { pattern: /\[([^\[\]]*?)'([^']*?)'([^\[\]]*?)\]/g, replacement: '[$1$2$3]' },
  { pattern: /\[([^\[\]]*?)"([^"]*?)"([^\[\]]*?)\]/g, replacement: '[$1$2$3]' },
  
  // Fix broken function calls
  { pattern: /\(([^()]*?)'([^']*?)'([^()]*?)\)/g, replacement: '($1$2$3)' },
  { pattern: /\(([^()]*?)"([^"]*?)"([^()]*?)\)/g, replacement: '($1$2$3)' },
  
  // Fix broken object properties
  { pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*'([^']*?)'([^']*?)'/g, replacement: '$1$2$3' },
  { pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*"([^"]*?)"([^"]*?)"/g, replacement: '$1$2$3' },
  
  // Fix broken switch cases
  { pattern: /case\s+'([^']*?)'([^']*?)':/g, replacement: "case '$1$2':" },
  { pattern: /case\s+"([^"]*?)"([^"]*?)":/g, replacement: 'case "$1$2":' },
  
  // Fix broken return statements
  { pattern: /return\s+([^;]*?)'([^']*?)'([^;]*?);/g, replacement: 'return $1$2$3;' },
  { pattern: /return\s+([^;]*?)"([^"]*?)"([^;]*?);/g, replacement: 'return $1$2$3;' },
  
  // Fix broken JSX content
  { pattern: />([^<]*?)'([^']*?)'([^<]*?)</g, replacement: '>$1$2$3<' },
  { pattern: />([^<]*?)"([^"]*?)"([^<]*?)</g, replacement: '>$1$2$3<' },
  
  // Fix broken template expressions
  { pattern: /\$\{([^}]*?)'([^']*?)'([^}]*?)\}/g, replacement: '${$1$2$3}' },
  { pattern: /\$\{([^}]*?)"([^"]*?)"([^}]*?)\}/g, replacement: '${$1$2$3}' },
  
  // Fix broken imports
  { pattern: /import\s+([^;]*?)'([^']*?)'([^;]*?);/g, replacement: 'import $1$2$3;' },
  { pattern: /import\s+([^;]*?)"([^"]*?)"([^;]*?);/g, replacement: 'import $1$2$3;' },
  
  // Fix broken exports
  { pattern: /export\s+([^;]*?)'([^']*?)'([^;]*?);/g, replacement: 'export $1$2$3;' },
  { pattern: /export\s+([^;]*?)"([^"]*?)"([^;]*?);/g, replacement: 'export $1$2$3;' },
  
  // Fix broken function parameters
  { pattern: /\(([^)]*?)'([^']*?)'([^)]*?)\)/g, replacement: '($1$2$3)' },
  { pattern: /\(([^)]*?)"([^"]*?)"([^)]*?)\)/g, replacement: '($1$2$3)' },
  
  // Fix broken type annotations
  { pattern: /:\s*'([^']*?)'([^']*?)'/g, replacement: ': $1$2' },
  { pattern: /:\s*"([^"]*?)"([^"]*?)"/g, replacement: ': $1$2' },
  
  // Fix broken generic types
  { pattern: /<([^>]*?)'([^']*?)'([^>]*?)>/g, replacement: '<$1$2$3>' },
  { pattern: /<([^>]*?)"([^"]*?)"([^>]*?)>/g, replacement: '<$1$2$3>' },
  
  // Fix broken comments
  { pattern: /\/\*([^*]*?)'([^']*?)'([^*]*?)\*\//g, replacement: '/*$1$2$3*/' },
  { pattern: /\/\*([^*]*?)"([^"]*?)"([^*]*?)\*\//g, replacement: '/*$1$2$3*/' },
  
  // Fix broken regex
  { pattern: /\/([^\/]*?)'([^']*?)'([^\/]*?)\//g, replacement: '/$1$2$3/' },
  { pattern: /\/([^\/]*?)"([^"]*?)"([^\/]*?)\//g, replacement: '/$1$2$3/' },
];

// Additional specific fixes for common patterns
const specificFixes = [
  // Fix broken switch statements
  { 
    pattern: /case\s+([^:]+):\s*'([^']*?)'([^']*?)'/g, 
    replacement: "case $1:\n        return '$2$3'" 
  },
  
  // Fix broken return statements in switch cases
  { 
    pattern: /return\s+([^;]*?)'([^']*?)'([^;]*?);/g, 
    replacement: 'return $1$2$3;' 
  },
  
  // Fix broken JSX className attributes
  { 
    pattern: /className\s*=\s*"([^"]*?)"([^"]*?)"/g, 
    replacement: 'className="$1$2"' 
  },
  
  // Fix broken template literals in JSX
  { 
    pattern: /\$\{([^}]*?)'([^']*?)'([^}]*?)\}/g, 
    replacement: '${$1$2$3}' 
  },
  
  // Fix broken function calls with string literals
  { 
    pattern: /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*'([^']*?)'([^']*?)'/g, 
    replacement: '$1$2$3' 
  },
];

function fixCorruptedFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixed = false;
    
    // Apply corruption patterns
    for (const fix of corruptionPatterns) {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        fixed = true;
      }
    }
    
    // Apply specific fixes
    for (const fix of specificFixes) {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        fixed = true;
      }
    }
    
    // Additional manual fixes for common patterns
    content = content
      // Fix broken switch case statements
      .replace(/case\s+([^:]+):\s*'([^']*?)'([^']*?)'/g, "case $1:\n        return '$2$3'")
      .replace(/case\s+([^:]+):\s*"([^"]*?)"([^"]*?)"/g, 'case $1:\n        return "$2$3"')
      
      // Fix broken return statements
      .replace(/return\s+([^;]*?)'([^']*?)'([^;]*?);/g, 'return $1$2$3;')
      .replace(/return\s+([^;]*?)"([^"]*?)"([^;]*?);/g, 'return $1$2$3;')
      
      // Fix broken JSX attributes
      .replace(/className\s*=\s*"([^"]*?)"([^"]*?)"/g, 'className="$1$2"')
      .replace(/className\s*=\s*'([^']*?)'([^']*?)'/g, "className='$1$2'")
      
      // Fix broken template literals
      .replace(/\$\{([^}]*?)'([^']*?)'([^}]*?)\}/g, '${$1$2$3}')
      .replace(/\$\{([^}]*?)"([^"]*?)"([^}]*?)\}/g, '${$1$2$3}')
      
      // Fix broken array access
      .replace(/\[([^\[\]]*?)'([^']*?)'([^\[\]]*?)\]/g, '[$1$2$3]')
      .replace(/\[([^\[\]]*?)"([^"]*?)"([^\[\]]*?)\]/g, '[$1$2$3]')
      
      // Fix broken function calls
      .replace(/\(([^()]*?)'([^']*?)'([^()]*?)\)/g, '($1$2$3)')
      .replace(/\(([^()]*?)"([^"]*?)"([^()]*?)\)/g, '($1$2$3)')
      
      // Fix broken object properties
      .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*'([^']*?)'([^']*?)'/g, '$1$2$3')
      .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*"([^"]*?)"([^"]*?)"/g, '$1$2$3')
      
      // Fix broken imports and exports
      .replace(/import\s+([^;]*?)'([^']*?)'([^;]*?);/g, 'import $1$2$3;')
      .replace(/export\s+([^;]*?)'([^']*?)'([^;]*?);/g, 'export $1$2$3;')
      
      // Fix broken type annotations
      .replace(/:\s*'([^']*?)'([^']*?)'/g, ': $1$2')
      .replace(/:\s*"([^"]*?)"([^"]*?)"/g, ': $1$2')
      
      // Fix broken generic types
      .replace(/<([^>]*?)'([^']*?)'([^>]*?)>/g, '<$1$2$3>')
      .replace(/<([^>]*?)"([^"]*?)"([^>]*?)>/g, '<$1$2$3>');
    
    if (fixed || content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findAndFixCorruptedFiles(dir = 'src') {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  
  console.log(`🔍 Found ${files.length} TypeScript files to check...`);
  
  let fixedCount = 0;
  for (const file of files) {
    if (fixCorruptedFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎯 Fixed ${fixedCount} out of ${files.length} files`);
  return fixedCount;
}

// Run the fix
console.log('🚀 Starting comprehensive file corruption fix...\n');
const fixedCount = findAndFixCorruptedFiles();

if (fixedCount > 0) {
  console.log('\n🔄 Running TypeScript check to verify fixes...');
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('\n✅ TypeScript compilation successful!');
  } catch (error) {
    console.log('\n⚠️ Some errors remain. Running additional fixes...');
  }
} else {
  console.log('\n✨ No corrupted files found or all files are already clean!');
}
