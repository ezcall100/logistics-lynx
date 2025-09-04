import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Comprehensive syntax corruption rescue patterns
const SYNTAX_FIXES = [
  // 1. Fix unterminated strings (double quotes)
  {
    name: 'Fix unterminated double quotes',
    pattern: /(".*[^"])$/g,
    replacement: '$1"',
    description: 'Adds missing closing double quotes'
  },
  
  // 2. Fix unterminated strings (single quotes)
  {
    name: 'Fix unterminated single quotes',
    pattern: /('.*[^'])$/g,
    replacement: "$1'",
    description: 'Adds missing closing single quotes'
  },
  
  // 3. Fix malformed setTimeout calls
  {
    name: 'Fix malformed setTimeout',
    pattern: /setTimeout\(([^,]+)\s([0-9]+)\)/g,
    replacement: 'setTimeout($1, $2)',
    description: 'Adds missing comma in setTimeout calls'
  },
  
  // 4. Fix broken JSX tags
  {
    name: 'Fix broken JSX tags',
    pattern: /(<[^>]+>[^<]*)$/g,
    replacement: '$1</>',
    description: 'Closes unclosed JSX tags'
  },
  
  // 5. Fix destructuring with semicolons
  {
    name: 'Fix destructuring semicolons',
    pattern: /const \[([a-zA-Z0-9_$]+)\s*;\s*([a-zA-Z0-9_$]+)\]/g,
    replacement: 'const [$1, $2]',
    description: 'Replaces semicolons with commas in destructuring'
  },
  
  // 6. Fix malformed arrow function blocks
  {
    name: 'Fix malformed arrow functions',
    pattern: /=> \{([^\}])$/g,
    replacement: '=> { $1 }',
    description: 'Closes unclosed arrow function blocks'
  },
  
  // 7. Fix object literals with semicolons
  {
    name: 'Fix object literal semicolons',
    pattern: /([a-zA-Z0-9_$]+):\s*([^,;]+);(\s*[a-zA-Z0-9_$]+:)/g,
    replacement: '$1: $2,$3',
    description: 'Replaces semicolons with commas in object literals'
  },
  
  // 8. Remove duplicate/malformed closing braces
  {
    name: 'Fix malformed closing braces',
    pattern: /\}\};/g,
    replacement: '}}',
    description: 'Removes duplicate closing braces with semicolons'
  },
  
  // 9. Fix malformed JSX attributes
  {
    name: 'Fix malformed JSX attributes',
    pattern: /<([a-zA-Z0-9]+)\s+([^>]*)\s*\/>/g,
    replacement: '<$1 $2 />',
    description: 'Normalizes JSX self-closing tags'
  },
  
  // 10. Fix broken template literals
  {
    name: 'Fix broken template literals',
    pattern: /`([^`]+)`''/g,
    replacement: '`$1`',
    description: 'Removes duplicate quotes in template literals'
  },
  
  // 11. Fix malformed function parameters
  {
    name: 'Fix malformed function parameters',
    pattern: /\(([^)]+)\s+([^)]+)\)/g,
    replacement: '($1, $2)',
    description: 'Adds missing commas in function parameters'
  },
  
  // 12. Fix broken interface declarations
  {
    name: 'Fix broken interface declarations',
    pattern: /export\s+interface\s+([a-zA-Z0-9_$]+)\s*\{([^}]+)\}/g,
    replacement: (match, name, body) => {
      const fixedBody = body
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+);(\s*[}\]])/g, '$1: $2$3')
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+),(\s*[}\]])/g, '$1: $2$3');
      return `export interface ${name} {\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed interface bodies'
  },
  
  // 13. Fix broken class declarations
  {
    name: 'Fix broken class declarations',
    pattern: /class\s+([a-zA-Z0-9_$]+)\s*\{([^}]+)\}/g,
    replacement: (match, name, body) => {
      const fixedBody = body
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+);(\s*[}\]])/g, '$1: $2$3')
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+),(\s*[}\]])/g, '$1: $2$3');
      return `class ${name} {\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed class bodies'
  },
  
  // 14. Fix broken method declarations
  {
    name: 'Fix broken method declarations',
    pattern: /([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*:\s*([^{]+)\s*\{([^}]+)\}/g,
    replacement: (match, name, returnType, body) => {
      const fixedBody = body
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+);(\s*[}\]])/g, '$1: $2$3')
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+),(\s*[}\]])/g, '$1: $2$3');
      return `${name}(${returnType}) {\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed method bodies'
  },
  
  // 15. Fix broken object literals
  {
    name: 'Fix broken object literals',
    pattern: /\{\s*([^}]+)\s*\}/g,
    replacement: (match, body) => {
      const fixedBody = body
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+);(\s*[}\]])/g, '$1: $2$3')
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+),(\s*[}\]])/g, '$1: $2$3');
      return `{\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed object literal bodies'
  },
  
  // 16. Fix broken array literals
  {
    name: 'Fix broken array literals',
    pattern: /\[\s*([^\]]+)\s*\]/g,
    replacement: (match, body) => {
      const fixedBody = body
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+);(\s*[}\]])/g, '$1: $2$3')
        .replace(/([a-zA-Z0-9_$]+):\s*([^,;]+),(\s*[}\]])/g, '$1: $2$3');
      return `[\n${fixedBody}\n]`;
    },
    description: 'Fixes malformed array literal bodies'
  }
];

// Function to apply a single syntax fix
function applySyntaxFix(content, fix) {
  if (typeof fix.replacement === 'function') {
    return content.replace(fix.pattern, fix.replacement);
  } else {
    return content.replace(fix.pattern, fix.replacement);
  }
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixed = content;
    let fixesApplied = 0;
    
    console.log(`\n🔧 Processing: ${filePath}`);
    
    // Apply all syntax fixes
    for (const fix of SYNTAX_FIXES) {
      const before = fixed;
      fixed = applySyntaxFix(fixed, fix);
      
      if (before !== fixed) {
        console.log(`  ✅ Applied: ${fix.name}`);
        fixesApplied++;
      }
    }
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`  🎯 Total fixes applied: ${fixesApplied}`);
      return { fixed: true, fixesApplied };
    }
    
    return { fixed: false, fixesApplied: 0 };
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return { fixed: false, fixesApplied: 0, error: error.message };
  }
}

// Main function to process all TypeScript files
async function rescueAllTypeScriptFiles() {
  console.log('🚨 MCP SYNTAX CORRUPTION RESCUE MODE — ACTIVATED');
  console.log('🎯 Targeting deep syntax corruption across JSX, TS/TSX, and function bodies...\n');
  
  try {
    // Find all TypeScript files
    const files = await glob('src/**/*.{ts,tsx}', { 
      ignore: ['node_modules/**', 'dist/**', '**/*.d.ts'] 
    });
    
    console.log(`📁 Found ${files.length} TypeScript files to rescue`);
    
    let totalFixed = 0;
    let totalFixesApplied = 0;
    
    for (const file of files) {
      const result = processFile(file);
      if (result.fixed) {
        totalFixed++;
        totalFixesApplied += result.fixesApplied;
      }
    }
    
    console.log('\n🎉 SYNTAX RESCUE OPERATION COMPLETED');
    console.log(`✅ Files rescued: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total syntax fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 RECOMMENDED FOLLOW-UP STEPS:');
      console.log('1. Run: npx prettier --write "src/**/*.{ts,tsx}"');
      console.log('2. Run: npm run lint');
      console.log('3. Run: npm run typecheck');
      console.log('\n🚨 FAILSAFE CHECKPOINTS:');
      console.log('- Check for remaining JSX syntax errors');
      console.log('- Verify all interfaces and classes compile');
      console.log('- Ensure no unterminated strings remain');
    }
    
  } catch (error) {
    console.error('❌ Critical error during rescue operation:', error);
  }
}

// Run the syntax rescue operation
rescueAllTypeScriptFiles();
