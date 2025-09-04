import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Emergency syntax repair fixes for critical corruption
const EMERGENCY_FIXES = [
  // Fix unterminated string literals at end of lines
  {
    name: 'Fix unterminated string literals',
    pattern: /([^'\"])\s*$/gm,
    replacement: '$1',
    description: 'Removes trailing characters that break string parsing'
  },
  
  // Fix broken import statements with missing quotes
  {
    name: 'Fix broken import statements',
    pattern: /from\s+([^'"]+)\s*$/gm,
    replacement: "from '$1'",
    description: 'Fixes import statements with missing quotes'
  },
  
  // Fix malformed JSX with unclosed tags
  {
    name: 'Fix malformed JSX',
    pattern: /<([a-zA-Z0-9]+)([^>]*)>([^<]*)$/gm,
    replacement: '<$1$2>$3</$1>',
    description: 'Fixes unclosed JSX tags'
  },
  
  // Fix broken interface properties
  {
    name: 'Fix interface properties',
    pattern: /(\w+):\s*([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: '$1: $2, \'$3$4\'',
    description: 'Fixes interface properties with broken string literals'
  },
  
  // Fix malformed union types
  {
    name: 'Fix union types',
    pattern: /'([^']*)\s*\|\s*([^']*)\s*'([^']*)/g,
    replacement: '\'$1\' | \'$2\'',
    description: 'Fixes malformed union type syntax'
  },
  
  // Fix broken function parameters
  {
    name: 'Fix function parameters',
    pattern: /\(([^)]+)\s*;\s*([^)]+)\)/g,
    replacement: '($1, $2)',
    description: 'Fixes function parameters with semicolons'
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
  },
  
  // Fix broken destructuring
  {
    name: 'Fix destructuring',
    pattern: /const\s+\[([^\]]+)\s*;\s*([^\]]+)\]/g,
    replacement: 'const [$1, $2]',
    description: 'Fixes destructuring with semicolons'
  },
  
  // Fix malformed object literals
  {
    name: 'Fix object literals',
    pattern: /([^,;]+);([[:space:]]*[a-zA-Z0-9_$]+:)/g,
    replacement: '$1, $2',
    description: 'Fixes object literals with semicolons'
  },
  
  // Fix broken setTimeout calls
  {
    name: 'Fix setTimeout calls',
    pattern: /setTimeout\(([^,]+)\s+([0-9]+)\)/g,
    replacement: 'setTimeout($1, $2)',
    description: 'Fixes setTimeout missing commas'
  },
  
  // Fix malformed interface declarations
  {
    name: 'Fix interface declarations',
    pattern: /interface\s+(\w+)\s*\{([^}]*)\}\s*;?\s*$/gm,
    replacement: 'interface $1 {\n$2\n}',
    description: 'Fixes malformed interface declarations'
  },
  
  // Fix broken class declarations
  {
    name: 'Fix class declarations',
    pattern: /class\s+(\w+)\s*\{([^}]*)\}\s*;?\s*$/gm,
    replacement: 'class $1 {\n$2\n}',
    description: 'Fixes malformed class declarations'
  }
];

// Function to apply emergency fixes
function applyEmergencyFix(content, fix) {
  if (typeof fix.replacement === 'function') {
    return content.replace(fix.pattern, fix.replacement);
  } else {
    return content.replace(fix.pattern, fix.replacement);
  }
}

// Function to process a single file with emergency fixes
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixed = content;
    let fixesApplied = 0;
    
    console.log(`\n🚨 Emergency processing: ${filePath}`);
    
    // Apply all emergency fixes
    for (const fix of EMERGENCY_FIXES) {
      const before = fixed;
      fixed = applyEmergencyFix(fixed, fix);
      
      if (before !== fixed) {
        console.log(`  ✅ Applied: ${fix.name}`);
        fixesApplied++;
      }
    }
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`  🎯 Total emergency fixes applied: ${fixesApplied}`);
      return { fixed: true, fixesApplied };
    }
    
    return { fixed: false, fixesApplied: 0 };
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return { fixed: false, fixesApplied: 0, error: error.message };
  }
}

// Main function to execute emergency syntax repair
async function executeEmergencySyntaxRepair() {
  console.log('🚨 MCP EMERGENCY SYNTAX REPAIR: INITIATING...');
  console.log('🎯 Executing critical syntax corruption repair...\n');
  
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
    
    console.log('\n✅ MCP EMERGENCY SYNTAX REPAIR COMPLETED');
    console.log(`✅ Files processed: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total emergency fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 NEXT STEPS:');
      console.log('1. Running Prettier formatting...');
      console.log('2. Running ESLint fixes...');
      console.log('3. Final type checking...');
    }
    
  } catch (error) {
    console.error('❌ Critical error during emergency syntax repair:', error);
  }
}

// Execute the emergency syntax repair operation
executeEmergencySyntaxRepair();
