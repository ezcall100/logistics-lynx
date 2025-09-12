#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all portal files
const portalsDir = path.join(__dirname, '../src/pages/portals');
const portalFiles = [];

function findPortalFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findPortalFiles(filePath);
    } else if (file.endsWith('Portal.tsx')) {
      portalFiles.push(filePath);
    }
  }
}

findPortalFiles(portalsDir);

console.log('🔧 Fixing subSubMenu.icon errors...');

let fixedCount = 0;
for (const filePath of portalFiles) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the problematic subSubMenu.icon line
    content = content.replace(
      /<subSubMenu\.icon className=\{`h-3 w-3 \$\{isSubSubActive \? 'text-white' : 'text-gray-500'\}`\} \/>/g,
      '<div className={`h-3 w-3 rounded-full ${isSubSubActive ? \'bg-white\' : \'bg-gray-400\'}`}></div>'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${path.relative(portalsDir, filePath)}`);
    fixedCount++;
  } catch (error) {
    console.log(`❌ Error fixing ${path.relative(portalsDir, filePath)}: ${error.message}`);
  }
}

console.log(`\n🎉 Fixed ${fixedCount} portal files!`);
