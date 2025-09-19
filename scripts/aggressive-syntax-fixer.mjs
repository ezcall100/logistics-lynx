#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Get all TypeScript/TSX files
async function getAllTsFiles() {
  const patterns = [
    'src/**/*.ts',
    'src/**/*.tsx'
  ];
  
  const files = [];
  for (const pattern of patterns) {
    const matches = await glob(pattern, { cwd: projectRoot });
    files.push(...matches);
  }
  
  return files;
}

function fixSyntaxErrors(content) {
  let fixed = content;
  
  // Fix missing commas in object properties (most common error)
  fixed = fixed
    // Fix patterns like: id: '1'name: 'John'email: 'john@example.com'
    .replace(/(\w+):\s*['"`]([^'"`]+)['"`](\w+):/g, '$1: \'$2\', $3:')
    .replace(/(\w+):\s*(\w+)(\w+):/g, '$1: $2, $3:')
    .replace(/(\w+):\s*(\w+)(\w+)(\w+):/g, '$1: $2, $3, $4:')
    .replace(/(\w+):\s*(\w+)(\w+)(\w+)(\w+):/g, '$1: $2, $3, $4, $5:')
    .replace(/(\w+):\s*(\w+)(\w+)(\w+)(\w+)(\w+):/g, '$1: $2, $3, $4, $5, $6:')
    
    // Fix broken template literals
    .replace(/\$\{([^}]+)\n([^}]+)\}/g, '${$1$2}')
    .replace(/\$\{([^}]+)\n\}/g, '${$1}')
    
    // Fix missing commas in function parameters
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5')
    .replace(/(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4')
    .replace(/(\w+)(\w+)(\w+)/g, '$1, $2, $3')
    
    // Fix broken destructuring
    .replace(/const \{ ([^}]+)\n \} =/g, 'const { $1 } =')
    .replace(/const \{ ([^}]+)\n\} =/g, 'const { $1 } =')
    
    // Fix missing commas in array elements
    .replace(/'([^']+)''([^']+)'/g, "'$1', '$2'")
    .replace(/"([^"]+)""([^"]+)"/g, '"$1", "$2"')
    
    // Fix missing commas in method calls
    .replace(/\.(\w+)\(([^)]+)\)([^,;])/g, '.$1($2), $3')
    
    // Fix broken object syntax
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5')
    .replace(/(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4')
    .replace(/(\w+)(\w+)(\w+)/g, '$1, $2, $3')
    
    // Fix missing semicolons
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7')
    
    // Fix broken JSX
    .replace(/<(\w+)([^>]+)>([^<]+)<\/\1>/g, '<$1$2>$3</$1>')
    
    // Fix specific patterns from error messages
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8, $9')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12');
  
  return fixed;
}

async function fixAllFiles() {
  console.log('🔧 Starting aggressive syntax error fixes...\n');
  
  const files = await getAllTsFiles();
  let fixedCount = 0;
  let totalFiles = files.length;
  
  console.log(`📁 Found ${totalFiles} TypeScript files to process\n`);
  
  for (const file of files) {
    const filePath = path.join(projectRoot, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const fixed = fixSyntaxErrors(content);
      
      if (content !== fixed) {
        fs.writeFileSync(filePath, fixed, 'utf8');
        console.log(`✅ Fixed: ${file}`);
        fixedCount++;
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`   Total files: ${totalFiles}`);
  console.log(`   Files fixed: ${fixedCount}`);
  console.log(`   Files unchanged: ${totalFiles - fixedCount}`);
  console.log(`\n✅ Aggressive syntax error fixes completed!`);
  console.log('📊 Run "npx tsc --noEmit --skipLibCheck" to check remaining errors.');
}

// Run the fixer
fixAllFiles().catch(console.error);
