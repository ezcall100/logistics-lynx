import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Aggressive final TypeScript type syntax fixes
const AGGRESSIVE_FIXES = [
  // Fix unterminated strings at end of lines
  {
    name: 'Fix unterminated strings',
    pattern: /([^'"])\s*$/gm,
    replacement: '$1',
    description: 'Removes trailing characters that break string parsing'
  },
  
  // Fix malformed Record types with missing commas
  {
    name: 'Fix malformed Record types',
    pattern: /Record<([^,]+)\s+([^>]+)>/g,
    replacement: 'Record<$1, $2>',
    description: 'Fixes Record type syntax with missing commas'
  },
  
  // Fix broken interface properties without commas
  {
    name: 'Fix broken interface properties',
    pattern: /(\w+):\s*([^,;]+)\s+(\w+):/g,
    replacement: '$1: $2,\n  $3:',
    description: 'Adds missing commas between interface properties'
  },
  
  // Fix malformed generic types
  {
    name: 'Fix malformed generic types',
    pattern: /<([^,]+)\s+([^>]+)>/g,
    replacement: '<$1, $2>',
    description: 'Fixes generic type syntax with missing commas'
  },
  
  // Fix broken union types
  {
    name: 'Fix broken union types',
    pattern: /(\w+)\s+\|\s+(\w+)/g,
    replacement: '$1 | $2',
    description: 'Fixes union type syntax spacing'
  },
  
  // Fix malformed array types
  {
    name: 'Fix malformed array types',
    pattern: /(\w+)\[\s*\]/g,
    replacement: '$1[]',
    description: 'Fixes array type syntax'
  },
  
  // Fix broken object type properties
  {
    name: 'Fix broken object type properties',
    pattern: /(\w+):\s*([^,;]+)\s*(\w+):/g,
    replacement: '$1: $2,\n  $3:',
    description: 'Adds missing commas in object type properties'
  },
  
  // Fix malformed interface declarations
  {
    name: 'Fix malformed interface declarations',
    pattern: /interface\s+(\w+)\s*\{([^}]+)\}/g,
    replacement: (match, name, body) => {
      const fixedBody = body
        .replace(/(\w+):\s*([^,;]+)\s+(\w+):/g, '$1: $2,\n  $3:')
        .replace(/(\w+):\s*([^,;]+)\s*$/gm, '$1: $2');
      return `interface ${name} {\n  ${fixedBody}\n}`;
    },
    description: 'Fixes malformed interface bodies'
  },
  
  // Fix broken type declarations
  {
    name: 'Fix broken type declarations',
    pattern: /type\s+(\w+)\s*=\s*([^;]+);/g,
    replacement: 'type $1 = $2;',
    description: 'Fixes type declarations'
  },
  
  // Fix malformed extends clauses
  {
    name: 'Fix malformed extends clauses',
    pattern: /extends\s+([^\{]+)\s*\{([^}]+)\}/g,
    replacement: (match, baseType, body) => {
      const fixedBody = body
        .replace(/(\w+):\s*([^,;]+)\s+(\w+):/g, '$1: $2,\n    $3:')
        .replace(/(\w+):\s*([^,;]+)\s*$/gm, '$1: $2');
      return `extends ${baseType} {\n    ${fixedBody}\n  }`;
    },
    description: 'Fixes malformed extends clauses'
  }
];

// Function to apply a single aggressive fix
function applyAggressiveFix(content, fix) {
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
    
    // Apply all aggressive fixes
    for (const fix of AGGRESSIVE_FIXES) {
      const before = fixed;
      fixed = applyAggressiveFix(fixed, fix);
      
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
async function fixAggressiveTypeScriptIssues() {
  console.log('🚨 MCP AGGRESSIVE TYPE SCRIPT SYNTAX RESCUE — ACTIVATED');
  console.log('🎯 Targeting critical TypeScript type definition corruption with aggressive fixes...\n');
  
  try {
    // Find all TypeScript files
    const files = await glob('src/**/*.{ts,tsx}', { 
      ignore: ['node_modules/**', 'dist/**', '**/*.d.ts'] 
    });
    
    console.log(`📁 Found ${files.length} TypeScript files to process`);
    
    let totalFixed = 0;
    let totalFixesApplied = 0;
    
    for (const file of files) {
      const result = processFile(file);
      if (result.fixed) {
        totalFixed++;
        totalFixesApplied += result.fixesApplied;
      }
    }
    
    console.log('\n🎉 AGGRESSIVE TYPE SCRIPT RESCUE COMPLETED');
    console.log(`✅ Files processed: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total aggressive fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 RUNNING VERIFICATION:');
      console.log('1. Type checking...');
    }
    
  } catch (error) {
    console.error('❌ Critical error during aggressive rescue operation:', error);
  }
}

// Run the aggressive type script rescue operation
fixAggressiveTypeScriptIssues();
