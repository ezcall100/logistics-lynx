#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.chdir(path.join(__dirname, '..'));

console.log('🔧 FINAL REACT IMPORT FIX');
console.log('Fixing remaining unterminated string literals in React imports...\n');

const patterns = [
  // Fix unterminated string literals in React imports: } from 'react => } from 'react'
  {
    name: 'Fix unterminated string literals in React imports',
    regex: /}\s+from\s+'react\s*$/gm,
    replacement: "} from 'react'"
  },
  
  // Fix unterminated string literals in component imports: } from '@/components/ui => } from '@/components/ui'
  {
    name: 'Fix unterminated string literals in component imports',
    regex: /}\s+from\s+'@\/components\/ui\s*$/gm,
    replacement: "} from '@/components/ui'"
  },
  
  // Fix unterminated string literals in lucide-react imports: } from 'lucide-react => } from 'lucide-react'
  {
    name: 'Fix unterminated string literals in lucide-react imports',
    regex: /}\s+from\s+'lucide-react\s*$/gm,
    replacement: "} from 'lucide-react'"
  },
  
  // Fix unterminated string literals in button imports: } from '@/components/ui/button => } from '@/components/ui/button'
  {
    name: 'Fix unterminated string literals in button imports',
    regex: /}\s+from\s+'@\/components\/ui\/button\s*$/gm,
    replacement: "} from '@/components/ui/button'"
  },
  
  // Fix unterminated string literals in label imports: } from '@/components/ui/label => } from '@/components/ui/label'
  {
    name: 'Fix unterminated string literals in label imports',
    regex: /}\s+from\s+'@\/components\/ui\/label\s*$/gm,
    replacement: "} from '@/components/ui/label'"
  },
  
  // Fix unterminated string literals in switch imports: } from '@/components/ui/switch => } from '@/components/ui/switch'
  {
    name: 'Fix unterminated string literals in switch imports',
    regex: /}\s+from\s+'@\/components\/ui\/switch\s*$/gm,
    replacement: "} from '@/components/ui/switch'"
  },
  
  // Fix unterminated string literals in input imports: } from '@/components/ui/input => } from '@/components/ui/input'
  {
    name: 'Fix unterminated string literals in input imports',
    regex: /}\s+from\s+'@\/components\/ui\/input\s*$/gm,
    replacement: "} from '@/components/ui/input'"
  },
  
  // Fix unterminated string literals in ResponsiveCard imports: } from '@/components/ui/ResponsiveCard => } from '@/components/ui/ResponsiveCard'
  {
    name: 'Fix unterminated string literals in ResponsiveCard imports',
    regex: /}\s+from\s+'@\/components\/ui\/ResponsiveCard\s*$/gm,
    replacement: "} from '@/components/ui/ResponsiveCard'"
  },
  
  // Fix unterminated string literals in http imports: } from '../lib/http => } from '../lib/http'
  {
    name: 'Fix unterminated string literals in http imports',
    regex: /}\s+from\s+'\.\.\/lib\/http\s*$/gm,
    replacement: "} from '../lib/http'"
  },
  
  // Fix unterminated string literals in http imports: } from '@/lib/http => } from '@/lib/http'
  {
    name: 'Fix unterminated string literals in http imports 2',
    regex: /}\s+from\s+'@\/lib\/http\s*$/gm,
    replacement: "} from '@/lib/http'"
  },
  
  // Fix unterminated string literals in React imports: import React from 'react => import React from 'react'
  {
    name: 'Fix unterminated string literals in React imports',
    regex: /import\s+React\s+from\s+'react\s*$/gm,
    replacement: "import React from 'react'"
  },
  
  // Fix unterminated string literals in useState imports: useState, useEffect => useState, useEffect
  {
    name: 'Fix unterminated string literals in useState imports',
    regex: /useState,\s+useEffect\s*$/gm,
    replacement: "useState, useEffect"
  },
  
  // Fix unterminated string literals in useState imports: useState => useState
  {
    name: 'Fix unterminated string literals in useState imports 2',
    regex: /useState\s*$/gm,
    replacement: "useState"
  },
  
  // Fix broken interface definitions: } => }
  {
    name: 'Fix broken interface definitions',
    regex: /}\s*$/gm,
    replacement: "}"
  },
  
  // Fix broken interface definitions: } => }
  {
    name: 'Fix broken interface definitions 2',
    regex: /}\s*$/gm,
    replacement: "}"
  },
  
  // Fix broken interface definitions: } => }
  {
    name: 'Fix broken interface definitions 3',
    regex: /}\s*$/gm,
    replacement: "}"
  },
  
  // Fix broken interface definitions: } => }
  {
    name: 'Fix broken interface definitions 4',
    regex: /}\s*$/gm,
    replacement: "}"
  },
  
  // Fix broken interface definitions: } => }
  {
    name: 'Fix broken interface definitions 5',
    regex: /}\s*$/gm,
    replacement: "}"
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
  
  console.log(`\n🔧 Final React import fix complete! Fixed ${fixedCount} files.`);
  console.log('\n🧹 Next steps:');
  console.log('1. Run: npx prettier --write "src/**/*.{ts,tsx}" --check');
  console.log('2. If successful, run: npx prettier --write "src/**/*.{ts,tsx}"');
  console.log('3. Run: npx eslint "src/**/*.{ts,tsx}" --fix');
  console.log('4. Run: npm run typecheck');
  
} catch (error) {
  console.error('❌ Script execution failed:', error.message);
  process.exit(1);
}
