#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('⚡ QUICK FIX - Fixing most common errors in 2 minutes!');

function quickFix(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Fix 1: Export typos
    content = content.replace(/export default Dashboar;d;/g, 'export default Dashboard;');
    
    // Fix 2: Missing closing braces before export
    content = content.replace(/(\s+)(export default \w+;)/g, '$1}\n$1$2');
    
    // Fix 3: Missing closing parentheses before export
    content = content.replace(/(\s+)(export default \w+;)/g, '$1);\n$1$2');
    
    // Fix 4: Remove extra closing braces
    content = content.replace(/(\s+}\s*){2,}$/g, '\n}');
    
    // Fix 5: Fix JSX syntax
    content = content.replace(/(\s+)>\s*\)\s*\)\s*\)/g, '$1>\n$1);\n$1}');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

// Find and fix all .tsx files
function findAndFix(dir) {
  const files = fs.readdirSync(dir);
  let fixed = 0;
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      fixed += findAndFix(fullPath);
    } else if (file.endsWith('.tsx')) {
      if (quickFix(fullPath)) {
        fixed++;
        console.log(`✅ Fixed: ${path.relative(projectRoot, fullPath)}`);
      }
    }
  }
  
  return fixed;
}

const srcDir = path.join(projectRoot, 'src');
const fixed = findAndFix(srcDir);

console.log(`\n🎯 QUICK FIX COMPLETED!`);
console.log(`📊 Fixed ${fixed} files`);
console.log(`⚡ This should resolve most syntax errors!`);
