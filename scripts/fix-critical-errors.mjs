#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🚀 CRITICAL ERROR FIXER');
console.log('🎯 MISSION: Fix the most critical syntax errors');

let fixedFiles = 0;

function fixCriticalErrors(filePath) {
  try {
    if (!fs.existsSync(filePath)) return false;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix 1: Remove corrupted export statements
    content = content.replace(/export default \w+;/g, '');
    
    // Fix 2: Fix broken JSX syntax
    content = content.replace(/(\s+)>\s*\)\s*\)\s*\)/g, '$1>\n$1);\n$1}');
    
    // Fix 3: Fix missing closing braces
    content = content.replace(/(\s+)(export default \w+;)/g, '$1}\n$1$2');
    
    // Fix 4: Fix broken function syntax
    content = content.replace(/const (\w+) = \(\) => \(\{/g, 'const $1 = () => {');
    
    // Fix 5: Remove extra closing braces
    content = content.replace(/(\s+}\s*){2,}$/g, '\n}');
    
    // Fix 6: Fix broken template literals
    content = content.replace(/`([^`]*)\$\{([^}]*)\s*$/g, '`$1${$2}`');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${path.relative(projectRoot, filePath)}`);
      fixedFiles++;
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

function findAndFix(dir) {
  const files = fs.readdirSync(dir);
  let fixed = 0;
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixed += findAndFix(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixCriticalErrors(fullPath)) {
        fixed++;
      }
    }
  }
  
  return fixed;
}

const srcDir = path.join(projectRoot, 'src');
const fixed = findAndFix(srcDir);

console.log(`\n🎯 CRITICAL FIXES COMPLETED!`);
console.log(`📊 Fixed ${fixed} files`);
console.log(`⚡ This should resolve the most critical syntax errors!`);
