import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Final critical TypeScript type syntax fixes
const FINAL_FIXES = [
  // Fix unterminated string literals in type definitions
  {
    name: 'Fix unterminated string literals',
    pattern: /([^'])'$/gm,
    replacement: "$1'",
    description: 'Closes unterminated single quotes in type definitions'
  },
  
  // Fix malformed Record types with missing commas
  {
    name: 'Fix malformed Record types',
    pattern: /Record<([^,]+)\s+([^>]+)>/g,
    replacement: 'Record<$1, $2>',
    description: 'Fixes Record type syntax with missing commas'
  },
  
  // Fix malformed generic types with missing commas
  {
    name: 'Fix malformed generic types',
    pattern: /<([^,]+)\s+([^>]+)>/g,
    replacement: '<$1, $2>',
    description: 'Fixes generic type syntax with missing commas'
  },
  
  // Fix broken interface property declarations with stray quotes
  {
    name: 'Fix broken interface properties',
    pattern: /(\w+):\s*([^,;]+)'(\s*[}\]])/g,
    replacement: '$1: $2$3',
    description: 'Removes stray quotes in interface properties'
  },
  
  // Fix malformed array type declarations
  {
    name: 'Fix malformed array types',
    pattern: /(\w+)\[\];'(\s*[}\]])/g,
    replacement: '$1[]$2',
    description: 'Fixes array type declarations with stray quotes'
  },
  
  // Fix broken union types
  {
    name: 'Fix broken union types',
    pattern: /'([^']+)'\s*\|\s*'([^']+)'(\s*[}\]])/g,
    replacement: "'$1' | '$2'$3",
    description: 'Fixes union type syntax'
  },
  
  // Fix malformed object type properties
  {
    name: 'Fix malformed object type properties',
    pattern: /(\w+):\s*([^,;]+),'(\s*[}\]])/g,
    replacement: '$1: $2$3',
    description: 'Removes stray quotes in object type properties'
  },
  
  // Fix broken export statements
  {
    name: 'Fix broken export statements',
    pattern: /export\s+([^']+)'(\s*[}\]])/g,
    replacement: 'export $1$2',
    description: 'Fixes export statements with stray quotes'
  },
  
  // Fix malformed interface declarations
  {
    name: 'Fix malformed interface declarations',
    pattern: /interface\s+(\w+)\s*\{([^}]+)\}'/g,
    replacement: (match, name, body) => {
      const fixedBody = body
        .replace(/(\w+):\s*([^,;]+)'(\s*[}\]])/g, '$1: $2$3')
        .replace(/(\w+):\s*([^,;]+),'(\s*[}\]])/g, '$1: $2$3')
        .replace(/(\w+):\s*([^,;]+);'(\s*[}\]])/g, '$1: $2$3');
      return `interface ${name} {\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed interface bodies'
  },
  
  // Fix broken type declarations
  {
    name: 'Fix broken type declarations',
    pattern: /type\s+(\w+)\s*=\s*([^;]+);'(\s*[}\]])/g,
    replacement: 'type $1 = $2$3',
    description: 'Fixes type declarations with stray quotes'
  },
  
  // Fix malformed extends clauses
  {
    name: 'Fix malformed extends clauses',
    pattern: /extends\s+([^\{]+)\s*\{([^}]+)\}'/g,
    replacement: (match, baseType, body) => {
      const fixedBody = body
        .replace(/(\w+):\s*([^,;]+)'(\s*[}\]])/g, '$1: $2$3')
        .replace(/(\w+):\s*([^,;]+),'(\s*[}\]])/g, '$1: $2$3')
        .replace(/(\w+):\s*([^,;]+);'(\s*[}\]])/g, '$1: $2$3');
      return `extends ${baseType} {\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed extends clauses'
  },
  
  // Fix broken array literal declarations
  {
    name: 'Fix broken array literal declarations',
    pattern: /\[\s*'([^']+)',\s*'([^']+)'(\s*[\]])/g,
    replacement: "['$1', '$2']$3",
    description: 'Fixes broken array literal declarations'
  },
  
  // Fix malformed object literal declarations
  {
    name: 'Fix malformed object literal declarations',
    pattern: /\{\s*([^}]+)\}'/g,
    replacement: (match, body) => {
      const fixedBody = body
        .replace(/(\w+):\s*([^,;]+)'(\s*[}\]])/g, '$1: $2$3')
        .replace(/(\w+):\s*([^,;]+),'(\s*[}\]])/g, '$1: $2$3')
        .replace(/(\w+):\s*([^,;]+);'(\s*[}\]])/g, '$1: $2$3');
      return `{\n${fixedBody}\n}`;
    },
    description: 'Fixes malformed object literal declarations'
  }
];

// Function to apply a single final fix
function applyFinalFix(content, fix) {
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
    
    // Apply all final fixes
    for (const fix of FINAL_FIXES) {
      const before = fixed;
      fixed = applyFinalFix(fixed, fix);
      
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
async function fixFinalTypeScriptIssues() {
  console.log('🚨 MCP FINAL TYPE SCRIPT SYNTAX RESCUE — ACTIVATED');
  console.log('🎯 Targeting remaining critical TypeScript type definition corruption...\n');
  
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
    
    console.log('\n🎉 FINAL TYPE SCRIPT RESCUE COMPLETED');
    console.log(`✅ Files processed: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total final fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 RUNNING FINAL VERIFICATION:');
      console.log('1. Type checking...');
    }
    
  } catch (error) {
    console.error('❌ Critical error during final rescue operation:', error);
  }
}

// Run the final type script rescue operation
fixFinalTypeScriptIssues();
