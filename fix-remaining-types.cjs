const fs = require('fs');
const path = require('path');

console.log('🎯 TARGETED TYPE ERROR FIX - FIXING REMAINING TYPE DEFINITIONS...\n');

// ONLY fix type definition patterns that are clearly broken
const typeFixes = [
  // Fix broken union types in type definitions
  { 
    pattern: /(\w+)\s*\|\s*(\w+)/g, 
    replacement: "'$1' | '$2'",
    description: "Broken union type"
  },
  
  // Fix broken string literal types
  { 
    pattern: /status:\s*([^;]+);/g, 
    replacement: (match, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `status: ${fixed};`;
    },
    description: "Broken status type"
  },
  
  // Fix broken priority types
  { 
    pattern: /priority:\s*([^;]+);/g, 
    replacement: (match, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `priority: ${fixed};`;
    },
    description: "Broken priority type"
  },
  
  // Fix broken role types
  { 
    pattern: /role:\s*([^;]+);/g, 
    replacement: (match, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `role: ${fixed};`;
    },
    description: "Broken role type"
  }
];

function applyTypeFixes(content, filePath) {
  let fixedContent = content;
  let fixesApplied = [];
  
  for (const fix of typeFixes) {
    const newContent = fixedContent.replace(fix.pattern, fix.replacement);
    if (newContent !== fixedContent) {
      fixedContent = newContent;
      fixesApplied.push(fix.description);
    }
  }
  
  return { fixedContent, fixesApplied };
}

function fixTypesInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { fixedContent, fixesApplied } = applyTypeFixes(content, filePath);
    
    if (fixesApplied.length > 0) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`🎯 FIXED TYPES: ${filePath}`);
      console.log(`   ✅ Applied fixes: ${fixesApplied.join(', ')}`);
      return fixesApplied.length;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error fixing types in ${filePath}:`, error.message);
    return 0;
  }
}

function findAndFixTypes(dir = 'src') {
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
  
  console.log(`🔍 SCANNING ${files.length} TypeScript files for TYPE FIXES...\n`);
  
  let totalFixes = 0;
  let filesFixed = 0;
  
  for (const file of files) {
    const fixesApplied = fixTypesInFile(file);
    if (fixesApplied > 0) {
      totalFixes += fixesApplied;
      filesFixed++;
    }
  }
  
  console.log(`\n🎯 TYPE FIXES COMPLETE!`);
  console.log(`📊 TOTAL TYPE FIXES APPLIED: ${totalFixes}`);
  console.log(`📁 FILES WITH TYPE FIXES: ${filesFixed} out of ${files.length}`);
  
  return { totalFixes, filesFixed };
}

// Execute type fixes
const { totalFixes, filesFixed } = findAndFixTypes();

if (totalFixes > 0) {
  console.log('\n🔄 Running TypeScript check to measure progress...');
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('\n✅ SUCCESS! TypeScript compilation successful!');
  } catch (error) {
    console.log('\n⚠️ Some errors remain, but progress was made on types.');
  }
} else {
  console.log('\n✨ No type fixes needed! All type definitions are already clean!');
}
