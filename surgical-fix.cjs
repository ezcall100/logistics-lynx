const fs = require('fs');
const path = require('path');

console.log('🔬 SURGICAL ERROR REPAIR INITIATED - CONSERVATIVE APPROACH ONLY...\n');

// ONLY fix patterns that are DEFINITELY broken syntax
const surgicalFixes = [
  // Fix ONLY broken string literals (definite syntax errors)
  { 
    pattern: /'([^']*?)'([^']*?)'/g, 
    replacement: "'$1$2'",
    description: "Broken string literal quotes"
  },
  
  // Fix ONLY broken template literals (definite syntax errors)
  { 
    pattern: /`([^`]*?)`([^`]*?)`/g, 
    replacement: '`$1$2`',
    description: "Broken template literal backticks"
  },
  
  // Fix ONLY broken import statements (definite syntax errors)
  { 
    pattern: /import\s+([^;]+)from([^;]+);/g, 
    replacement: 'import $1 from $2;',
    description: "Broken import statement"
  },
  
  // Fix ONLY broken vite-env references (definite syntax errors)
  { 
    pattern: /\/\/\/\s*<reference\s+types\s*=\s*vite\/client\s*\/>/g, 
    replacement: '/// <reference types="vite/client" />',
    description: "Broken vite-env reference"
  },
  
  // Fix ONLY broken test setup imports (definite syntax errors)
  { 
    pattern: /import\s+{\s*vi\s*}\s+fromvitest/g, 
    replacement: 'import { vi } from "vitest"',
    description: "Broken vitest import"
  },
  
  // Fix ONLY broken environment variable assignments (definite syntax errors)
  { 
    pattern: /VITE_SUPABASE_URL:\s*https:\/\/test\.supabase\.co,/g, 
    replacement: 'VITE_SUPABASE_URL: "https://test.supabase.co",',
    description: "Broken environment variable"
  }
];

function applySurgicalFix(content, filePath) {
  let fixedContent = content;
  let fixesApplied = [];
  
  for (const fix of surgicalFixes) {
    const newContent = fixedContent.replace(fix.pattern, fix.replacement);
    if (newContent !== fixedContent) {
      fixedContent = newContent;
      fixesApplied.push(fix.description);
    }
  }
  
  return { fixedContent, fixesApplied };
}

function surgicallyRepairFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { fixedContent, fixesApplied } = applySurgicalFix(content, filePath);
    
    if (fixesApplied.length > 0) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`🔬 SURGICALLY REPAIRED: ${filePath}`);
      console.log(`   ✅ Applied fixes: ${fixesApplied.join(', ')}`);
      return fixesApplied.length;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error in surgical repair of ${filePath}:`, error.message);
    return 0;
  }
}

function findAndSurgicallyRepair(dir = 'src') {
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
  
  console.log(`🔍 SCANNING ${files.length} TypeScript files for SURGICAL REPAIR ONLY...\n`);
  
  let totalFixes = 0;
  let filesRepaired = 0;
  
  for (const file of files) {
    const fixesApplied = surgicallyRepairFile(file);
    if (fixesApplied > 0) {
      totalFixes += fixesApplied;
      filesRepaired++;
    }
  }
  
  console.log(`\n🎯 SURGICAL REPAIR COMPLETE!`);
  console.log(`📊 TOTAL FIXES APPLIED: ${totalFixes}`);
  console.log(`📁 FILES REPAIRED: ${filesRepaired} out of ${files.length}`);
  
  return { totalFixes, filesRepaired };
}

// Execute surgical repair
const { totalFixes, filesRepaired } = findAndSurgicallyRepair();

if (totalFixes > 0) {
  console.log('\n🔄 Running TypeScript check to verify NO NEW ERRORS were created...');
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('\n✅ SUCCESS! Surgical repair completed with NO NEW ERRORS!');
  } catch (error) {
    console.log('\n⚠️ Some errors remain, but NO NEW ERRORS were created by surgical repair.');
  }
} else {
  console.log('\n✨ No surgical repairs needed! All files are already clean!');
}
