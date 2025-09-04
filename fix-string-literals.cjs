const fs = require('fs');
const path = require('path');

console.log('🎯 STRING LITERAL TYPE REPAIR - FIXING BROKEN QUOTES AND STRINGS...\n');

// Specialized fixes for broken string literal types
const stringLiteralFixes = [
  // Fix broken union types with missing/extra quotes
  { 
    pattern: /(\w+)\s*\|\s*'([^']+)'/g, 
    replacement: "'$1' | '$2'",
    description: "Fix union type with missing opening quote"
  },
  { 
    pattern: /'([^']+)'\s*\|\s*(\w+)/g, 
    replacement: "'$1' | '$2'",
    description: "Fix union type with missing closing quote"
  },
  { 
    pattern: /(\w+)\s*\|\s*(\w+)/g, 
    replacement: "'$1' | '$2'",
    description: "Fix union type with no quotes"
  },
  
  // Fix broken string literal types in property definitions
  { 
    pattern: /(\w+):\s*([^;]+);/g, 
    replacement: (match, prop, type) => {
      // Fix union types within property definitions
      let fixed = type;
      
      // Fix patterns like: active' | ''inactive' | 'suspended' | 'pending
      fixed = fixed.replace(/(\w+)'\s*\|\s*''([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/'([^']+)'\s*\|\s*''([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/(\w+)'\s*\|\s*'([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      fixed = fixed.replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'");
      
      // Fix unterminated strings
      fixed = fixed.replace(/(\w+)'$/g, "'$1'");
      fixed = fixed.replace(/^(\w+)'/g, "'$1'");
      
      return `${prop}: ${fixed};`;
    },
    description: "Fix broken property type definitions"
  },
  
  // Fix broken export type definitions
  { 
    pattern: /export\s+type\s+(\w+)\s*=\s*([^;]+);/g, 
    replacement: (match, typeName, content) => {
      let fixed = content;
      
      // Fix all the broken union type patterns
      fixed = fixed.replace(/(\w+)'\s*\|\s*''([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/'([^']+)'\s*\|\s*''([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/(\w+)'\s*\|\s*'([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      fixed = fixed.replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'");
      fixed = fixed.replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'");
      
      // Fix unterminated strings
      fixed = fixed.replace(/(\w+)'$/g, "'$1'");
      fixed = fixed.replace(/^(\w+)'/g, "'$1'");
      
      return `export type ${typeName} = ${fixed};`;
    },
    description: "Fix broken export type definitions"
  },
  
  // Fix specific broken patterns found in the error output
  { 
    pattern: /role:\s*'super_admin'\s*\|\s*''admin'\s*\|\s*'user''\s*\|\s*''driver'\s*\|\s*'carrier';/g, 
    replacement: "role: 'super_admin' | 'admin' | 'user' | 'driver' | 'carrier';",
    description: "Fix broken role type definition"
  },
  { 
    pattern: /status:\s*active'\s*\|\s*''inactive'\s*\|\s*'suspended'\s*\|\s*'pending;/g, 
    replacement: "status: 'active' | 'inactive' | 'suspended' | 'pending';",
    description: "Fix broken status type definition"
  },
  { 
    pattern: /driver_status\?\s*: ''available'\s*\|\s*'on_delivery'\s*\|\s*'off_duty\s*\|\s*'maintenance;/g, 
    replacement: "driver_status?: 'available' | 'on_delivery' | 'off_duty' | 'maintenance';",
    description: "Fix broken driver_status type definition"
  }
];

function applyStringLiteralFixes(content, filePath) {
  let fixedContent = content;
  let fixesApplied = [];
  
  for (const fix of stringLiteralFixes) {
    const newContent = fixedContent.replace(fix.pattern, fix.replacement);
    if (newContent !== fixedContent) {
      fixedContent = newContent;
      fixesApplied.push(fix.description);
    }
  }
  
  return { fixedContent, fixesApplied };
}

function fixStringLiteralsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { fixedContent, fixesApplied } = applyStringLiteralFixes(content, filePath);
    
    if (fixesApplied.length > 0) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`🎯 FIXED STRING LITERALS: ${filePath}`);
      console.log(`   ✅ Applied fixes: ${fixesApplied.join(', ')}`);
      return fixesApplied.length;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error fixing string literals in ${filePath}:`, error.message);
    return 0;
  }
}

function findAndFixStringLiterals(dir = 'src') {
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
  
  console.log(`🔍 SCANNING ${files.length} TypeScript files for STRING LITERAL REPAIR...\n`);
  
  let totalFixes = 0;
  let filesFixed = 0;
  
  for (const file of files) {
    const fixesApplied = fixStringLiteralsInFile(file);
    if (fixesApplied > 0) {
      totalFixes += fixesApplied;
      filesFixed++;
    }
  }
  
  console.log(`\n🎯 STRING LITERAL REPAIR COMPLETE!`);
  console.log(`📊 TOTAL STRING LITERAL FIXES APPLIED: ${totalFixes}`);
  console.log(`📁 FILES WITH STRING LITERAL FIXES: ${filesFixed} out of ${files.length}`);
  
  return { totalFixes, filesFixed };
}

// Execute string literal repair
const { totalFixes, filesFixed } = findAndFixStringLiterals();

if (totalFixes > 0) {
  console.log('\n🔄 Running TypeScript check to measure progress...');
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('\n✅ SUCCESS! TypeScript compilation successful!');
  } catch (error) {
    console.log('\n⚠️ Some errors remain, but string literal fixes were applied.');
  }
} else {
  console.log('\n✨ No string literal fixes needed! All string literals are already clean!');
}
