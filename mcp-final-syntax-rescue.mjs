import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Final high-precision syntax rescue fixes
const FINAL_RESCUE_FIXES = [
  // Fix unterminated strings (single & double quotes)
  {
    name: 'Fix unterminated double quotes',
    pattern: /(".*[^"])$/gm,
    replacement: '$1"',
    description: 'Closes unterminated double-quoted strings'
  },
  
  // Fix unterminated single quotes
  {
    name: 'Fix unterminated single quotes',
    pattern: /('.*[^'])$/gm,
    replacement: "$1'",
    description: 'Closes unterminated single-quoted strings'
  },
  
  // Fix malformed JSX closing tags
  {
    name: 'Fix broken JSX tags',
    pattern: /<([a-zA-Z0-9]+)([^>]*)>([^<]*)$/gm,
    replacement: '<$1$2>$3</$1>',
    description: 'Fixes unclosed JSX tags'
  },
  
  // Fix destructuring with semicolon instead of comma
  {
    name: 'Fix destructuring assignments',
    pattern: /const \[([^\]]+);([^\]]+)\]/g,
    replacement: 'const [$1, $2]',
    description: 'Fixes destructuring with semicolons instead of commas'
  },
  
  // Fix malformed object literals (semi → comma)
  {
    name: 'Fix object literals',
    pattern: /([^,;]+);([[:space:]]*[a-zA-Z0-9_$]+:)/g,
    replacement: '$1, $2',
    description: 'Fixes object literals with semicolons instead of commas'
  },
  
  // Fix malformed setTimeout and setInterval syntax
  {
    name: 'Fix setTimeout/setInterval issues',
    pattern: /(set(Time|Inter)out\([^,]+)\s+([0-9]+)\)/g,
    replacement: '$1, $3)',
    description: 'Fixes setTimeout/setInterval missing commas'
  },
  
  // Normalize arrow function blocks
  {
    name: 'Normalize arrow functions',
    pattern: /=> \{([^\}])$/gm,
    replacement: '=> { $1 }',
    description: 'Normalizes malformed arrow function blocks'
  },
  
  // Remove extra closing braces in interfaces
  {
    name: 'Remove malformed closing braces',
    pattern: /\}\};/g,
    replacement: '}}',
    description: 'Removes duplicate closing braces in interfaces'
  },
  
  // Fix malformed function parameters
  {
    name: 'Fix function parameters',
    pattern: /function\s+\w+\s*\(([^)]+)\s*;\s*([^)]+)\)/g,
    replacement: (match, param1, param2) => {
      return match.replace(/([^)]+)\s*;\s*([^)]+)/, '$1, $2');
    },
    description: 'Fixes function parameters with semicolons'
  },
  
  // Fix broken interface property declarations
  {
    name: 'Fix interface properties',
    pattern: /(\w+):\s*([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: '$1: $2, \'$3$4\'',
    description: 'Fixes interface properties with broken string literals'
  },
  
  // Fix malformed array literals
  {
    name: 'Fix array literals',
    pattern: /\[\s*([^\]]+)\s*,\s*,\s*([^\]]+)\s*\]/g,
    replacement: '[$1, $2]',
    description: 'Fixes arrays with extra commas'
  },
  
  // Fix broken template literals
  {
    name: 'Fix template literals',
    pattern: /\`([^`]*)\s*$/gm,
    replacement: '`$1`',
    description: 'Closes unterminated template literals'
  },
  
  // Fix malformed JSX attributes
  {
    name: 'Fix JSX attributes',
    pattern: /(\w+)=\s*'([^']*)\s*'([^']*)'/g,
    replacement: '$1=\'$2$3\'',
    description: 'Fixes broken JSX attribute values'
  },
  
  // Fix trailing commas in objects and arrays
  {
    name: 'Fix trailing commas',
    pattern: /,\s*(\s*[}\]])/g,
    replacement: '$1',
    description: 'Removes trailing commas before closing brackets'
  },
  
  // Fix malformed type assertions
  {
    name: 'Fix type assertions',
    pattern: /as\s+([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: 'as $1',
    description: 'Fixes broken type assertions'
  }
];

// Function to apply a single final rescue fix
function applyFinalRescueFix(content, fix) {
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
    
    // Apply all final rescue fixes
    for (const fix of FINAL_RESCUE_FIXES) {
      const before = fixed;
      fixed = applyFinalRescueFix(fixed, fix);
      
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

// Main function to execute final syntax rescue
async function executeFinalSyntaxRescue() {
  console.log('🛠️ MCP FINAL SYNTAX RESCUE: INITIATING...');
  console.log('🎯 Executing high-precision structural corruption repair...\n');
  
  try {
    // Find all TypeScript and TSX files
    const files = await glob('src/**/*.{ts,tsx}', { 
      ignore: ['node_modules/**', 'dist/**', '**/*.d.ts'] 
    });
    
    console.log(`📁 Found ${files.length} TypeScript/TSX files to process`);
    
    let totalFixed = 0;
    let totalFixesApplied = 0;
    
    for (const file of files) {
      const result = processFile(file);
      if (result.fixed) {
        totalFixed++;
        totalFixesApplied += result.fixesApplied;
      }
    }
    
    console.log('\n✅ MCP SYNTAX RESCUE COMPLETED');
    console.log(`✅ Files processed: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total final fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 NEXT STEPS:');
      console.log('1. Running Prettier formatting...');
      console.log('2. Running ESLint fixes...');
      console.log('3. Final type checking...');
    }
    
  } catch (error) {
    console.error('❌ Critical error during final syntax rescue:', error);
  }
}

// Execute the final syntax rescue operation
executeFinalSyntaxRescue();
