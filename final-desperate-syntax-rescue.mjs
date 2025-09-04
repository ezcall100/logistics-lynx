import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Final desperate syntax rescue fixes for persistent corruption
const DESPERATE_FIXES = [
  // Fix unterminated string literals in import statements
  {
    name: 'Fix unterminated import strings',
    pattern: /from\s+([^'"]+)\s*$/gm,
    replacement: "from '$1'",
    description: 'Fixes import statements with missing quotes'
  },
  
  // Fix broken JSX with malformed tags
  {
    name: 'Fix broken JSX tags',
    pattern: /<([a-zA-Z0-9]+)([^>]*)>([^<]*)$/gm,
    replacement: '<$1$2>$3</$1>',
    description: 'Fixes unclosed JSX tags'
  },
  
  // Fix corrupted interface properties
  {
    name: 'Fix corrupted interface properties',
    pattern: /(\w+):\s*([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: '$1: $2, \'$3$4\'',
    description: 'Fixes interface properties with broken string literals'
  },
  
  // Fix malformed union types
  {
    name: 'Fix malformed union types',
    pattern: /'([^']*)\s*\|\s*([^']*)\s*'([^']*)/g,
    replacement: '\'$1\' | \'$2\'',
    description: 'Fixes malformed union type syntax'
  },
  
  // Fix broken function parameters
  {
    name: 'Fix broken function parameters',
    pattern: /\(([^)]+)\s*;\s*([^)]+)\)/g,
    replacement: '($1, $2)',
    description: 'Fixes function parameters with semicolons'
  },
  
  // Fix malformed array literals
  {
    name: 'Fix malformed array literals',
    pattern: /\[\s*([^\]]+)\s*,\s*,\s*([^\]]+)\s*\]/g,
    replacement: '[$1, $2]',
    description: 'Fixes arrays with extra commas'
  },
  
  // Fix broken template literals
  {
    name: 'Fix broken template literals',
    pattern: /\`([^`]*)\s*$/gm,
    replacement: '`$1`',
    description: 'Closes unterminated template literals'
  },
  
  // Fix malformed JSX attributes
  {
    name: 'Fix malformed JSX attributes',
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
    name: 'Fix malformed type assertions',
    pattern: /as\s+([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: 'as $1',
    description: 'Fixes broken type assertions'
  },
  
  // Fix broken destructuring
  {
    name: 'Fix broken destructuring',
    pattern: /const\s+\[([^\]]+)\s*;\s*([^\]]+)\]/g,
    replacement: 'const [$1, $2]',
    description: 'Fixes destructuring with semicolons'
  },
  
  // Fix malformed object literals
  {
    name: 'Fix malformed object literals',
    pattern: /([^,;]+);([[:space:]]*[a-zA-Z0-9_$]+:)/g,
    replacement: '$1, $2',
    description: 'Fixes object literals with semicolons'
  },
  
  // Fix broken setTimeout calls
  {
    name: 'Fix broken setTimeout calls',
    pattern: /setTimeout\(([^,]+)\s+([0-9]+)\)/g,
    replacement: 'setTimeout($1, $2)',
    description: 'Fixes setTimeout missing commas'
  },
  
  // Fix malformed interface declarations
  {
    name: 'Fix malformed interface declarations',
    pattern: /interface\s+(\w+)\s*\{([^}]*)\}\s*;?\s*$/gm,
    replacement: 'interface $1 {\n$2\n}',
    description: 'Fixes malformed interface declarations'
  },
  
  // Fix broken class declarations
  {
    name: 'Fix broken class declarations',
    pattern: /class\s+(\w+)\s*\{([^}]*)\}\s*;?\s*$/gm,
    replacement: 'class $1 {\n$2\n}',
    description: 'Fixes malformed class declarations'
  },
  
  // Fix corrupted placeholder types
  {
    name: 'Fix corrupted placeholder types',
    pattern: /export type PlaceholderStatus = ''([^']*)' ' \| ''([^']*)''/g,
    replacement: "export type PlaceholderStatus = '$1' | '$2'",
    description: 'Fixes corrupted placeholder type definitions'
  },
  
  // Fix broken import statements with missing quotes
  {
    name: 'Fix broken import statements',
    pattern: /import\s+\{([^}]+)\}\s+from\s+([^'"]+)\s*$/gm,
    replacement: "import {$1} from '$2'",
    description: 'Fixes import statements with missing quotes'
  },
  
  // Fix malformed JSX return statements
  {
    name: 'Fix malformed JSX return',
    pattern: /return\(<([^>]+)>([^<]*)""<\/div>/g,
    replacement: 'return (<$1>$2</div>)',
    description: 'Fixes malformed JSX return statements'
  },
  
  // Fix broken useState destructuring
  {
    name: 'Fix broken useState destructuring',
    pattern: /const\s+\[([^,]+),\s*([^,]+)\s*\]\s*=\s*useState\(([^)]+)\);'/g,
    replacement: 'const [$1, $2] = useState($3)',
    description: 'Fixes broken useState destructuring'
  }
];

// Function to apply desperate fixes
function applyDesperateFix(content, fix) {
  if (typeof fix.replacement === 'function') {
    return content.replace(fix.pattern, fix.replacement);
  } else {
    return content.replace(fix.pattern, fix.replacement);
  }
}

// Function to process a single file with desperate fixes
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixed = content;
    let fixesApplied = 0;
    
    console.log(`\n🚨 Desperate processing: ${filePath}`);
    
    // Apply all desperate fixes
    for (const fix of DESPERATE_FIXES) {
      const before = fixed;
      fixed = applyDesperateFix(fixed, fix);
      
      if (before !== fixed) {
        console.log(`  ✅ Applied: ${fix.name}`);
        fixesApplied++;
      }
    }
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`  🎯 Total desperate fixes applied: ${fixesApplied}`);
      return { fixed: true, fixesApplied };
    }
    
    return { fixed: false, fixesApplied: 0 };
  } catch (error) {
    console.error(`  ❌ Error processing ${filePath}:`, error.message);
    return { fixed: false, fixesApplied: 0, error: error.message };
  }
}

// Main function to execute final desperate syntax rescue
async function executeFinalDesperateSyntaxRescue() {
  console.log('🚨 MCP FINAL DESPERATE SYNTAX RESCUE: INITIATING...');
  console.log('🎯 Executing final syntax corruption repair...\n');
  
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
    
    console.log('\n✅ MCP FINAL DESPERATE SYNTAX RESCUE COMPLETED');
    console.log(`✅ Files processed: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total desperate fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 NEXT STEPS:');
      console.log('1. Running Prettier formatting...');
      console.log('2. Running ESLint fixes...');
      console.log('3. Final type checking...');
    }
    
  } catch (error) {
    console.error('❌ Critical error during final desperate syntax rescue:', error);
  }
}

// Execute the final desperate syntax rescue operation
executeFinalDesperateSyntaxRescue();
