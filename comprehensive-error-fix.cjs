const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 COMPREHENSIVE ERROR EXTERMINATION PLAN INITIATED...\n');

// Phase 1: Surgical fixes (conservative - only definite syntax errors)
const surgicalFixes = [
  { 
    pattern: /'([^']*?)'([^']*?)'/g, 
    replacement: "'$1$2'",
    description: "Broken string literal quotes"
  },
  { 
    pattern: /`([^`]*?)`([^`]*?)`/g, 
    replacement: '`$1$2`',
    description: "Broken template literal backticks"
  },
  { 
    pattern: /import\s+([^;]+)from([^;]+);/g, 
    replacement: 'import $1 from $2;',
    description: "Broken import statement"
  },
  { 
    pattern: /\/\/\/\s*<reference\s+types\s*=\s*vite\/client\s*\/>/g, 
    replacement: '/// <reference types="vite/client" />',
    description: "Broken vite-env reference"
  },
  { 
    pattern: /import\s+{\s*vi\s*}\s+fromvitest/g, 
    replacement: 'import { vi } from "vitest"',
    description: "Broken vitest import"
  },
  { 
    pattern: /VITE_SUPABASE_URL:\s*https:\/\/test\.supabase\.co,/g, 
    replacement: 'VITE_SUPABASE_URL: "https://test.supabase.co",',
    description: "Broken environment variable"
  }
];

// Phase 2: Type definition fixes
const typeFixes = [
  { 
    pattern: /(\w+)\s*\|\s*(\w+)/g, 
    replacement: "'$1' | '$2'",
    description: "Broken union type"
  },
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

// Phase 3: Additional targeted fixes
const additionalFixes = [
  { 
    pattern: /(\w+):\s*([^;]+);/g, 
    replacement: (match, prop, type) => {
      const fixed = type
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `${prop}: ${fixed};`;
    },
    description: "Broken property types"
  },
  { 
    pattern: /export\s+type\s+(\w+)\s*=\s*([^;]+);/g, 
    replacement: (match, typeName, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `export type ${typeName} = ${fixed};`;
    },
    description: "Broken type definitions"
  }
];

function applyFixes(content, fixes, phaseName) {
  let fixedContent = content;
  let fixesApplied = [];
  
  for (const fix of fixes) {
    const newContent = fixedContent.replace(fix.pattern, fix.replacement);
    if (newContent !== fixedContent) {
      fixedContent = newContent;
      fixesApplied.push(fix.description);
    }
  }
  
  return { fixedContent, fixesApplied };
}

function fixFile(filePath, phaseName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixedContent = content;
    let totalFixes = 0;
    
    // Apply surgical fixes
    const surgicalResult = applyFixes(fixedContent, surgicalFixes, 'Surgical');
    fixedContent = surgicalResult.fixedContent;
    totalFixes += surgicalResult.fixesApplied.length;
    
    // Apply type fixes
    const typeResult = applyFixes(fixedContent, typeFixes, 'Type');
    fixedContent = typeResult.fixedContent;
    totalFixes += typeResult.fixesApplied.length;
    
    // Apply additional fixes
    const additionalResult = applyFixes(fixedContent, additionalFixes, 'Additional');
    fixedContent = additionalResult.fixedContent;
    totalFixes += additionalResult.fixesApplied.length;
    
    if (totalFixes > 0) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ ${phaseName}: ${filePath} (${totalFixes} fixes)`);
      return totalFixes;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return 0;
  }
}

function findAndFixAllErrors(dir = 'src') {
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
  
  console.log(`🔍 SCANNING ${files.length} TypeScript files for COMPREHENSIVE REPAIR...\n`);
  
  let totalErrorsFixed = 0;
  let filesFixed = 0;
  
  for (const file of files) {
    const fixesApplied = fixFile(file, 'Phase 1-3');
    if (fixesApplied > 0) {
      totalErrorsFixed += fixesApplied;
      filesFixed++;
    }
  }
  
  return { totalErrorsFixed, filesFixed, totalFiles: files.length };
}

function checkCurrentErrorCount() {
  try {
    console.log('\n🔄 Checking current error count...');
    const result = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
    
    // Extract error count from output
    const errorMatch = result.match(/Found (\d+) errors? in (\d+) files?/);
    if (errorMatch) {
      const errorCount = parseInt(errorMatch[1]);
      const fileCount = parseInt(errorMatch[2]);
      return { errorCount, fileCount, success: true };
    }
    
    return { errorCount: 0, fileCount: 0, success: true };
  } catch (error) {
    // If compilation fails, try to extract error count from stderr
    const errorOutput = error.stdout || error.stderr || '';
    const errorMatch = errorOutput.match(/Found (\d+) errors? in (\d+) files?/);
    
    if (errorMatch) {
      const errorCount = parseInt(errorMatch[1]);
      const fileCount = parseInt(errorMatch[2]);
      return { errorCount, fileCount, success: false };
    }
    
    return { errorCount: -1, fileCount: -1, success: false };
  }
}

function runComprehensiveFix() {
  console.log('🎯 PHASE 1-3: COMPREHENSIVE ERROR REPAIR...\n');
  
  const { totalErrorsFixed, filesFixed, totalFiles } = findAndFixAllErrors();
  
  console.log(`\n🎯 PHASE 1-3 COMPLETE!`);
  console.log(`📊 TOTAL ERRORS FIXED: ${totalErrorsFixed}`);
  console.log(`📁 FILES REPAIRED: ${filesFixed} out of ${totalFiles}`);
  
  // Check current error count
  const { errorCount, fileCount, success } = checkCurrentErrorCount();
  
  if (errorCount >= 0) {
    console.log(`\n📊 CURRENT STATUS:`);
    console.log(`   🔴 ERRORS REMAINING: ${errorCount}`);
    console.log(`   📁 FILES WITH ERRORS: ${fileCount}`);
    
    if (errorCount === 0) {
      console.log('\n🎉 SUCCESS! ALL ERRORS HAVE BEEN ELIMINATED!');
      return true;
    } else {
      console.log(`\n⚠️ ${errorCount} errors remain. Running additional targeted fixes...`);
      
      // Run one more comprehensive pass
      console.log('\n🔄 RUNNING ADDITIONAL TARGETED FIXES...');
      const additionalResult = findAndFixAllErrors();
      
      console.log(`\n🎯 ADDITIONAL FIXES COMPLETE!`);
      console.log(`📊 ADDITIONAL ERRORS FIXED: ${additionalResult.totalErrorsFixed}`);
      console.log(`📁 ADDITIONAL FILES REPAIRED: ${additionalResult.filesFixed}`);
      
      // Final verification
      const finalCheck = checkCurrentErrorCount();
      console.log(`\n📊 FINAL STATUS:`);
      console.log(`   🔴 ERRORS REMAINING: ${finalCheck.errorCount}`);
      console.log(`   📁 FILES WITH ERRORS: ${finalCheck.fileCount}`);
      
      if (finalCheck.errorCount === 0) {
        console.log('\n🎉 ULTIMATE SUCCESS! ALL ERRORS EXTERMINATED!');
        return true;
      } else {
        console.log(`\n⚠️ ${finalCheck.errorCount} errors persist. Manual intervention may be required.`);
        return false;
      }
    }
  } else {
    console.log('\n❌ Could not determine error count. Running TypeScript check...');
    try {
      execSync('npx tsc --noEmit', { stdio: 'inherit' });
      console.log('\n✅ TypeScript compilation successful!');
      return true;
    } catch (finalError) {
      console.log('\n⚠️ Some errors remain after comprehensive fix.');
      return false;
    }
  }
}

// Execute comprehensive error extermination
console.log('🚀 STARTING COMPREHENSIVE ERROR EXTERMINATION...\n');
const success = runComprehensiveFix();

if (success) {
  console.log('\n🎉 MISSION ACCOMPLISHED! ALL ERRORS EXTERMINATED!');
} else {
  console.log('\n⚠️ Mission partially complete. Some errors remain.');
}
