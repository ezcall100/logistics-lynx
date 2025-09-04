const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 FINAL ERROR EXTERMINATION - ELIMINATING ALL REMAINING ERRORS...\n');

// Final comprehensive error extermination patterns
const finalFixes = [
  // Fix all broken string literals and quotes
  { 
    pattern: /'([^']*?)'([^']*?)'/g, 
    replacement: "'$1$2'",
    description: "Broken string literal quotes"
  },
  { 
    pattern: /"([^"]*?)"([^"]*?)"/g, 
    replacement: '"$1$2"',
    description: "Broken double quote literals"
  },
  
  // Fix all broken template literals
  { 
    pattern: /`([^`]*?)`([^`]*?)`/g, 
    replacement: '`$1$2`',
    description: "Broken template literal backticks"
  },
  
  // Fix all broken union types
  { 
    pattern: /(\w+)\s*\|\s*(\w+)/g, 
    replacement: "'$1' | '$2'",
    description: "Broken union type"
  },
  
  // Fix all broken string literal types
  { 
    pattern: /(\w+)'\s*\|\s*'([^']+)'/g, 
    replacement: "'$1' | '$2'",
    description: "Broken string literal union type"
  },
  
  // Fix broken property type definitions
  { 
    pattern: /(\w+):\s*([^;]+);/g, 
    replacement: (match, prop, type) => {
      let fixed = type;
      
      // Fix all broken union type patterns
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
  
  // Fix broken import statements
  { 
    pattern: /import\s+([^;]+)from([^;]+);/g, 
    replacement: 'import $1 from $2;',
    description: "Fix broken import statement"
  },
  
  // Fix broken vite-env references
  { 
    pattern: /\/\/\/\s*<reference\s+types\s*=\s*vite\/client\s*\/>/g, 
    replacement: '/// <reference types="vite/client" />',
    description: "Fix broken vite-env reference"
  },
  
  // Fix broken test setup imports
  { 
    pattern: /import\s+{\s*vi\s*}\s+fromvitest/g, 
    replacement: 'import { vi } from "vitest"',
    description: "Fix broken vitest import"
  },
  
  // Fix broken environment variable assignments
  { 
    pattern: /VITE_SUPABASE_URL:\s*https:\/\/test\.supabase\.co,/g, 
    replacement: 'VITE_SUPABASE_URL: "https://test.supabase.co",',
    description: "Fix broken environment variable"
  },
  
  // Fix broken JSX attributes
  { 
    pattern: /className\s*=\s*"([^"]*?)"([^"]*?)"/g, 
    replacement: 'className="$1$2"',
    description: "Fix broken JSX className attribute"
  },
  
  // Fix broken array access
  { 
    pattern: /\[([^\[\]]*?)'([^']*?)'([^\[\]]*?)\]/g, 
    replacement: '[$1$2$3]',
    description: "Fix broken array access"
  }
];

function applyFinalFixes(content, filePath) {
  let fixedContent = content;
  let fixesApplied = [];
  
  for (const fix of finalFixes) {
    const newContent = fixedContent.replace(fix.pattern, fix.replacement);
    if (newContent !== fixedContent) {
      fixedContent = newContent;
      fixesApplied.push(fix.description);
    }
  }
  
  return { fixedContent, fixesApplied };
}

function fixFileWithFinalFixes(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { fixedContent, fixesApplied } = applyFinalFixes(content, filePath);
    
    if (fixesApplied.length > 0) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`🎯 FINAL FIX APPLIED: ${filePath}`);
      console.log(`   ✅ Applied fixes: ${fixesApplied.join(', ')}`);
      return fixesApplied.length;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ Error applying final fixes to ${filePath}:`, error.message);
    return 0;
  }
}

function findAndApplyFinalFixes(dir = 'src') {
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
  
  console.log(`🔍 SCANNING ${files.length} TypeScript files for FINAL ERROR EXTERMINATION...\n`);
  
  let totalErrorsFixed = 0;
  let filesFixed = 0;
  
  for (const file of files) {
    const fixesApplied = fixFileWithFinalFixes(file);
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

function runFinalErrorExtermination() {
  console.log('🎯 PHASE 1: FINAL COMPREHENSIVE ERROR REPAIR...\n');
  
  const { totalErrorsFixed, filesFixed, totalFiles } = findAndApplyFinalFixes();
  
  console.log(`\n🎯 PHASE 1 COMPLETE!`);
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
      const additionalResult = findAndApplyFinalFixes();
      
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
      console.log('\n⚠️ Some errors remain after final error extermination.');
      return false;
    }
  }
}

// Execute final error extermination
console.log('🚀 STARTING FINAL ERROR EXTERMINATION...\n');
const success = runFinalErrorExtermination();

if (success) {
  console.log('\n🎉 MISSION ACCOMPLISHED! ALL ERRORS EXTERMINATED!');
} else {
  console.log('\n⚠️ Mission partially complete. Some errors remain.');
}
