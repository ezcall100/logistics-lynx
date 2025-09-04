import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Comprehensive syntax cleanup fixes
const SYNTAX_FIXES = [
  // Fix extra quotes in interfaces and objects
  {
    name: 'Fix extra quotes in interfaces',
    pattern: /(\w+):\s*'([^']+)',\s*'([^']+)'/g,
    replacement: '$1: \'$2\', \'$3\'',
    description: 'Fixes malformed string literals with extra quotes'
  },
  
  // Fix malformed string literals
  {
    name: 'Fix malformed string literals',
    pattern: /'([^']*)\s*'([^']*)'/g,
    replacement: '\'$1$2\'',
    description: 'Fixes broken string literals with spaces'
  },
  
  // Fix incomplete template literals
  {
    name: 'Fix incomplete template literals',
    pattern: /\`([^`]*)\s*$/gm,
    replacement: '`$1`',
    description: 'Closes unterminated template literals'
  },
  
  // Fix missing quotes in object properties
  {
    name: 'Fix missing quotes in object properties',
    pattern: /(\w+):\s*([^,;]+)\s*([^,;]+)/g,
    replacement: '$1: $2, $3',
    description: 'Adds missing commas between object properties'
  },
  
  // Fix extra commas in arrays and objects
  {
    name: 'Fix extra commas in arrays and objects',
    pattern: /,\s*,/g,
    replacement: ',',
    description: 'Removes duplicate commas'
  },
  
  // Fix trailing commas in objects
  {
    name: 'Fix trailing commas in objects',
    pattern: /,\s*(\s*[}\]])/g,
    replacement: '$1',
    description: 'Removes trailing commas before closing brackets'
  },
  
  // Fix malformed JSX attributes
  {
    name: 'Fix malformed JSX attributes',
    pattern: /(\w+)=\s*'([^']*)\s*'([^']*)'/g,
    replacement: '$1=\'$2$3\'',
    description: 'Fixes broken JSX attribute values'
  },
  
  // Fix broken state declarations
  {
    name: 'Fix broken state declarations',
    pattern: /const\s+\[([^\]]+)\s*;\s*([^\]]+)\]/g,
    replacement: 'const [$1, $2]',
    description: 'Fixes destructuring with semicolons instead of commas'
  },
  
  // Fix malformed function parameters
  {
    name: 'Fix malformed function parameters',
    pattern: /function\s+\w+\s*\(([^)]+)\s*;\s*([^)]+)\)/g,
    replacement: (match, param1, param2) => {
      return match.replace(/([^)]+)\s*;\s*([^)]+)/, '$1, $2');
    },
    description: 'Fixes function parameters with semicolons'
  },
  
  // Fix broken interface property declarations
  {
    name: 'Fix broken interface properties',
    pattern: /(\w+):\s*([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: '$1: $2, \'$3$4\'',
    description: 'Fixes interface properties with broken string literals'
  },
  
  // Fix malformed mock data structures
  {
    name: 'Fix malformed mock data structures',
    pattern: /\{\s*([^}]+)\s*,\s*,\s*([^}]+)\s*\}/g,
    replacement: '{\n  $1,\n  $2\n}',
    description: 'Fixes mock data with extra commas'
  },
  
  // Fix broken array literals
  {
    name: 'Fix broken array literals',
    pattern: /\[\s*([^\]]+)\s*,\s*,\s*([^\]]+)\s*\]/g,
    replacement: '[$1, $2]',
    description: 'Fixes arrays with extra commas'
  },
  
  // Fix malformed type assertions
  {
    name: 'Fix malformed type assertions',
    pattern: /as\s+([^,;]+)\s*'([^']*)\s*'([^']*)/g,
    replacement: 'as $1',
    description: 'Fixes broken type assertions'
  },
  
  // Fix unterminated strings in JSX
  {
    name: 'Fix unterminated strings in JSX',
    pattern: /<([^>]+)\s+([^>]*)\s*'([^']*)\s*$/gm,
    replacement: '<$1 $2 \'$3\'>',
    description: 'Closes unterminated JSX attribute strings'
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

// Main function to process all TypeScript/TSX files
async function fixComprehensiveSyntaxIssues() {
  console.log('🚨 MCP COMPREHENSIVE SYNTAX CLEANUP — ACTIVATED');
  console.log('🎯 Targeting structural syntax corruption: extra quotes, malformed strings, missing brackets...\n');
  
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
    
    console.log('\n🎉 COMPREHENSIVE SYNTAX CLEANUP COMPLETED');
    console.log(`✅ Files processed: ${totalFixed}/${files.length}`);
    console.log(`🔧 Total syntax fixes applied: ${totalFixesApplied}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 NEXT STEPS:');
      console.log('1. Run type checking to verify cleanup');
      console.log('2. Attempt to boot the application');
      console.log('3. Check for remaining syntax issues');
    }
    
  } catch (error) {
    console.error('❌ Critical error during comprehensive syntax cleanup:', error);
  }
}

// Run the comprehensive syntax cleanup operation
fixComprehensiveSyntaxIssues();
