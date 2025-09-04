import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Common error patterns and their fixes
const errorFixes = [
  // Fix missing commas in object properties
  {
    pattern: /(\w+):\s*([^,}\n]+)(?!\s*[,}])/g,
    replacement: '$1: $2,'
  },
  // Fix extra brackets and braces
  {
    pattern: /{\s*{/g,
    replacement: '{'
  },
  {
    pattern: /}\s*}/g,
    replacement: '}'
  },
  // Fix malformed function declarations
  {
    pattern: /(\w+):\s*\([^)]*\)\s*=>\s*{,\s*/g,
    replacement: '$1: ($2) => {'
  },
  // Fix missing semicolons after expressions
  {
    pattern: /(\w+)\s*\+\s*Math\.random\(\)\s*\*\s*\d+/g,
    replacement: '$1 + Math.random() * $2'
  },
  // Fix object literal syntax errors
  {
    pattern: /(\w+):\s*([^,}\n]+),\s*\+/g,
    replacement: '$1: $2 +'
  },
  // Fix React component syntax
  {
    pattern: /import\s+React\s+from\s+['"]react['"];?\s*$/gm,
    replacement: "import React from 'react';"
  },
  // Fix useState syntax errors
  {
    pattern: /const\s*\[\s*(\w+),\s*(\w+)\s*\]\s*=\s*useState\s*\(\s*([^)]+)\s*\)\s*,\s*/g,
    replacement: 'const [$1, $2] = useState($3);'
  },
  // Fix missing closing brackets
  {
    pattern: /(\w+):\s*\([^)]*\)\s*=>\s*{\s*$/gm,
    replacement: '$1: ($2) => {'
  },
  // Fix interface property syntax
  {
    pattern: /(\w+):\s*([^;}\n]+);\s*,/g,
    replacement: '$1: $2;'
  },
  // Fix type definitions
  {
    pattern: /(\w+):\s*([^;}\n]+),\s*$/gm,
    replacement: '$1: $2;'
  }
];

// Specific file fixes
const specificFixes = {
  'src/services/mcp.ts': [
    // Fix the trends data object
    {
      pattern: /timeframe\s*\n\s*data:/g,
      replacement: 'timeframe,\n          data:'
    },
    // Fix the mock data calculations
    {
      pattern: /cpu_usage:\s*40,\s*\+\s*Math\.random\(\)\s*\*\s*30/g,
      replacement: 'cpu_usage: 40 + Math.random() * 30'
    },
    {
      pattern: /memory_usage:\s*60,\s*\+\s*Math\.random\(\)\s*\*\s*20/g,
      replacement: 'memory_usage: 60 + Math.random() * 20'
    },
    {
      pattern: /response_time:\s*200,\s*\+\s*Math\.random\(\)\s*\*\s*100/g,
      replacement: 'response_time: 200 + Math.random() * 100'
    },
    {
      pattern: /error_rate:\s*0\.01,\s*\+\s*Math\.random\(\)\s*\*\s*0\.02/g,
      replacement: 'error_rate: 0.01 + Math.random() * 0.02'
    },
    // Fix function declarations
    {
      pattern: /(\w+):\s*\([^)]*\)\s*=>\s*{,\s*$/gm,
      replacement: '$1: ($2) => {'
    },
    // Fix object property syntax
    {
      pattern: /(\w+):\s*\([^)]*\)\s*=>\s*,\s*$/gm,
      replacement: '$1: ($2) => {'
    }
  ]
};

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Apply general fixes
    errorFixes.forEach(fix => {
      content = content.replace(fix.pattern, fix.replacement);
    });
    
    // Apply specific fixes for this file
    const fileName = path.basename(filePath);
    if (specificFixes[fileName]) {
      specificFixes[fileName].forEach(fix => {
        content = content.replace(fix.pattern, fix.replacement);
      });
    }
    
    // Fix common React/JSX issues
    content = content
      // Fix missing React imports
      .replace(/import\s+React\s+from\s+['"]react['"];?\s*$/gm, "import React from 'react';")
      // Fix useState syntax
      .replace(/const\s*\[\s*(\w+),\s*(\w+)\s*\]\s*=\s*useState\s*\(\s*([^)]+)\s*\)\s*,\s*/g, 'const [$1, $2] = useState($3);')
      // Fix useEffect syntax
      .replace(/useEffect\s*\(\s*\(\s*\)\s*=>\s*{\s*,\s*/g, 'useEffect(() => {')
      // Fix component return statements
      .replace(/return\s*\(\s*,\s*/g, 'return (')
      // Fix JSX closing tags
      .replace(/<\s*\/\s*(\w+)\s*,\s*>/g, '</$1>')
      // Fix object spread syntax
      .replace(/\.\.\.\s*(\w+)\s*,\s*/g, '...$1,')
      // Fix array syntax
      .replace(/\[\s*(\w+)\s*,\s*\]/g, '[$1]')
      // Fix function parameters
      .replace(/\(\s*(\w+)\s*,\s*\)/g, '($1)')
      // Fix template literals
      .replace(/`\s*,\s*`/g, '` `')
      // Fix conditional rendering
      .replace(/\{\s*(\w+)\s*\?\s*([^:]+)\s*:\s*([^}]+)\s*,\s*\}/g, '{$1 ? $2 : $3}')
      // Fix event handlers
      .replace(/onClick\s*=\s*\(\s*\)\s*=>\s*{\s*,\s*/g, 'onClick={() => {')
      // Fix destructuring
      .replace(/const\s*\{\s*(\w+)\s*,\s*\}\s*=\s*(\w+);/g, 'const { $1 } = $2;')
      // Fix interface definitions
      .replace(/interface\s+(\w+)\s*\{\s*([^}]+)\s*,\s*\}/g, 'interface $1 {\n  $2\n}')
      // Fix type definitions
      .replace(/type\s+(\w+)\s*=\s*\{\s*([^}]+)\s*,\s*\}/g, 'type $1 = {\n  $2\n}')
      // Fix export statements
      .replace(/export\s+default\s+(\w+)\s*,\s*;/g, 'export default $1;')
      // Fix import statements
      .replace(/import\s+\{\s*([^}]+)\s*,\s*\}\s+from\s+['"]([^'"]+)['"];?/g, 'import { $1 } from "$2";')
      // Fix async/await syntax
      .replace(/async\s+\(\s*\)\s*=>\s*{\s*,\s*/g, 'async () => {')
      // Fix try-catch blocks
      .replace(/try\s*{\s*,\s*/g, 'try {')
      .replace(/}\s*catch\s*\(\s*(\w+)\s*\)\s*{\s*,\s*/g, '} catch ($1) {')
      // Fix switch statements
      .replace(/switch\s*\(\s*(\w+)\s*\)\s*{\s*,\s*/g, 'switch ($1) {')
      // Fix case statements
      .replace(/case\s+([^:]+):\s*,\s*/g, 'case $1:')
      // Fix default case
      .replace(/default:\s*,\s*/g, 'default:')
      // Fix for loops
      .replace(/for\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*/g, 'for ($1) {')
      // Fix while loops
      .replace(/while\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*/g, 'while ($1) {')
      // Fix if statements
      .replace(/if\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*/g, 'if ($1) {')
      // Fix else statements
      .replace(/}\s*else\s*{\s*,\s*/g, '} else {')
      // Fix else if statements
      .replace(/}\s*else\s*if\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*/g, '} else if ($1) {');
    
    // Write the fixed content back to the file
    if (content !== originalContent) {
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

function walkDir(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...walkDir(fullPath));
    } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Main execution
console.log('🔧 Starting comprehensive error fix...');

const srcDir = path.join(__dirname, 'src');
const files = walkDir(srcDir);

let fixedCount = 0;
let totalFiles = files.length;

console.log(`📁 Found ${totalFiles} files to process`);

for (const file of files) {
  if (fixFile(file)) {
    fixedCount++;
  }
}

console.log(`\n🎉 Fix complete!`);
console.log(`📊 Fixed ${fixedCount} out of ${totalFiles} files`);

// Run TypeScript check to see remaining errors
console.log('\n🔍 Running TypeScript check to verify fixes...');
try {
  const { execSync } = await import('child_process');
  execSync('npm run typecheck', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️  Some errors may still remain. Check the output above.');
}
