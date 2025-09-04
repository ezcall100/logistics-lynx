#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Common patterns to fix
const fixes = [
  // Fix unterminated string literals
  {
    pattern: /'([^']*)$/gm,
    replacement: (match, content) => `'${content}'`
  },
  // Fix missing commas in object properties
  {
    pattern: /(\w+):\s*([^,\n}]+)(?=\s*\n\s*\w+:)/g,
    replacement: '$1: $2,'
  },
  // Fix malformed function parameters
  {
    pattern: /\(([^)]*),\s*$/gm,
    replacement: '($1)'
  },
  // Fix malformed object destructuring
  {
    pattern: /\{\s*([^}]*),\s*$/gm,
    replacement: '{$1}'
  },
  // Fix malformed array syntax
  {
    pattern: /\[\s*,\s*([^\]]*)\s*\]/g,
    replacement: '[$1]'
  },
  // Fix malformed JSX attributes
  {
    pattern: /(\w+)=\s*"([^"]*)$/gm,
    replacement: '$1="$2"'
  },
  // Fix malformed imports
  {
    pattern: /import\s*\{([^}]*),\s*$/gm,
    replacement: 'import {$1}'
  },
  // Fix malformed exports
  {
    pattern: /export\s+default\s+(\w+)\s*\}\s*$/gm,
    replacement: 'export default $1;'
  },
  // Fix malformed interface definitions
  {
    pattern: /interface\s+(\w+)\s*\{\s*([^}]*),\s*$/gm,
    replacement: 'interface $1 {\n  $2\n}'
  },
  // Fix malformed type annotations
  {
    pattern: /:\s*(\w+)\s*,\s*$/gm,
    replacement: ': $1'
  },
  // Fix malformed function calls
  {
    pattern: /new\s+(\w+)\s*,\s*(\w+)\s*\(/g,
    replacement: 'new $1($2('
  },
  // Fix malformed object property access
  {
    pattern: /(\w+)\s*\[\s*(\w+)\s*$/gm,
    replacement: '$1[$2]'
  },
  // Fix malformed conditional statements
  {
    pattern: /if\s*\(\s*([^)]*)\s*,\s*$/gm,
    replacement: 'if ($1)'
  },
  // Fix malformed try-catch blocks
  {
    pattern: /try\s*\{\s*$/gm,
    replacement: 'try {'
  },
  // Fix malformed catch blocks
  {
    pattern: /catch\s*\(\s*(\w+)\s*\)\s*\{\s*$/gm,
    replacement: 'catch ($1) {'
  },
  // Fix malformed async functions
  {
    pattern: /async\s+function\s+(\w+)\s*\(\s*([^)]*)\s*,\s*$/gm,
    replacement: 'async function $1($2)'
  },
  // Fix malformed arrow functions
  {
    pattern: /\(\s*([^)]*)\s*,\s*\)\s*=>\s*$/gm,
    replacement: '($1) =>'
  },
  // Fix malformed template literals
  {
    pattern: /\$\{\s*([^}]*)\s*,\s*$/gm,
    replacement: '${$1}'
  },
  // Fix malformed class definitions
  {
    pattern: /class\s+(\w+)\s*\{\s*$/gm,
    replacement: 'class $1 {'
  },
  // Fix malformed method definitions
  {
    pattern: /(\w+)\s*\(\s*([^)]*)\s*,\s*\)\s*\{\s*$/gm,
    replacement: '$1($2) {'
  }
];

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixed = false;

    // Apply all fixes
    fixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        fixed = true;
      }
    });

    // Additional specific fixes for common patterns
    // Fix malformed JSX return statements
    content = content.replace(/return\s*\(\s*>\s*([^<]*)</g, 'return (\n  <$1');
    
    // Fix malformed object spread
    content = content.replace(/\.\.\.\s*(\w+)\s*,\s*$/gm, '...$1');
    
    // Fix malformed array spread
    content = content.replace(/\.\.\.\s*(\w+)\s*,\s*$/gm, '...$1');
    
    // Fix malformed destructuring
    content = content.replace(/const\s*\[\s*([^\]]*),\s*$/gm, 'const [$1]');
    
    // Fix malformed useState
    content = content.replace(/useState\s*\(\s*([^)]*),\s*$/gm, 'useState($1)');

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

function findTypeScriptFiles() {
  const patterns = [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
    '!node_modules/**'
  ];
  
  let files = [];
  patterns.forEach(pattern => {
    const matches = glob.sync(pattern);
    files = files.concat(matches);
  });
  
  return files;
}

function main() {
  console.log('🔧 Starting TypeScript error fixes...');
  
  const files = findTypeScriptFiles();
  console.log(`📁 Found ${files.length} TypeScript files`);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n✅ Fixed ${fixedCount} files`);
  console.log('🎉 TypeScript error fixing complete!');
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, findTypeScriptFiles };
