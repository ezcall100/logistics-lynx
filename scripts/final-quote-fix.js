#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.chdir(path.join(__dirname, '..'));

console.log('🔧 FINAL QUOTE & INTERFACE FIX');
console.log('Fixing remaining unterminated string literals and broken interfaces...\n');

const patterns = [
  // Fix unterminated string literals: 'pending => 'pending'
  {
    name: 'Fix unterminated string literals',
    regex: /'([^']+)\s*$/gm,
    replacement: "'$1'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 2',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 3',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 4',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 5',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 6',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 7',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 8',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 9',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 10',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 11',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 12',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 13',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 14',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 15',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 16',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 17',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 18',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 19',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings 20',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)\s*$/gm,
    replacement: "$1: '$2' | '$3' | '$4'"
  }
];

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let newContent = content;
    
    patterns.forEach(pattern => {
      const matches = newContent.match(pattern.regex);
      if (matches && matches.length > 0) {
        newContent = newContent.replace(pattern.regex, pattern.replacement);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        files.push(...walkDirectory(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error.message);
  }
  
  return files;
}

try {
  console.log('📁 Scanning for TypeScript files...');
  const tsFiles = walkDirectory('src');
  console.log(`Found ${tsFiles.length} TypeScript files\n`);
  
  let fixedCount = 0;
  
  for (const file of tsFiles) {
    const relativePath = path.relative(process.cwd(), file);
    if (processFile(file)) {
      console.log(`✅ Fixed: ${relativePath}`);
      fixedCount++;
    }
  }
  
  console.log(`\n🔧 Final quote & interface fix complete! Fixed ${fixedCount} files.`);
  console.log('\n🧹 Next steps:');
  console.log('1. Run: npx prettier --write "src/**/*.{ts,tsx}" --check');
  console.log('2. If successful, run: npx prettier --write "src/**/*.{ts,tsx}"');
  console.log('3. Run: npx eslint "src/**/*.{ts,tsx}" --fix');
  console.log('4. Run: npm run typecheck');
  
} catch (error) {
  console.error('❌ Script execution failed:', error.message);
  process.exit(1);
}
