#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.chdir(path.join(__dirname, '..'));

console.log('🔧 FINAL IMPORT & STRING FIX');
console.log('Fixing remaining import and string syntax errors...\n');

const patterns = [
  // Fix broken import statements: ' from 'react' => } from 'react'
  {
    name: 'Fix broken import statements',
    regex: /'\s+from\s+'([^']+)'/g,
    replacement: "} from '$1'"
  },
  
  // Fix broken import statements: Button, Input, Card ' from '@/components/ui' => Button, Input, Card } from '@/components/ui'
  {
    name: 'Fix broken import statements with missing brace',
    regex: /([^}]+)\s*'\s+from\s+'([^']+)'/g,
    replacement: "$1 } from '$2'"
  },
  
  // Fix broken import statements: import {Button => import { Button
  {
    name: 'Fix broken import statements with missing space',
    regex: /import\s*\{([^}]+)\s*'\s+from/g,
    replacement: "import {\n  $1\n} from"
  },
  
  // Fix broken export statements: export default WebsiteHome, => export default WebsiteHome;
  {
    name: 'Fix broken export statements',
    regex: /export\s+default\s+([^,]+),\s*$/gm,
    replacement: 'export default $1;'
  },
  
  // Fix broken return statements: return <Landing />,} => return <Landing />
  {
    name: 'Fix broken return statements',
    regex: /return\s+<([^>]+)\s*\/>\s*,}/g,
    replacement: 'return <$1 />'
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending} => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)'\s*\}/g,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix broken type definitions: Record<string any> => Record<string, any>
  {
    name: 'Fix broken type definitions',
    regex: /Record<string\s+any>/g,
    replacement: 'Record<string, any>'
  },
  
  // Fix broken interface property types: string,} => string
  {
    name: 'Fix broken interface property types',
    regex: /(\w+),\s*}/g,
    replacement: '$1\n}'
  },
  
  // Fix broken interface property types: number,} => number
  {
    name: 'Fix broken interface property types with trailing comma',
    regex: /(\w+),\s*}/g,
    replacement: '$1\n}'
  },
  
  // Fix broken interface property types: boolean,} => boolean
  {
    name: 'Fix broken interface property types with trailing comma',
    regex: /(\w+),\s*}/g,
    replacement: '$1\n}'
  },
  
  // Fix broken interface property types: any,} => any
  {
    name: 'Fix broken interface property types with trailing comma',
    regex: /(\w+),\s*}/g,
    replacement: '$1\n}'
  },
  
  // Fix broken interface property types: unknown,} => unknown
  {
    name: 'Fix broken interface property types with trailing comma',
    regex: /(\w+),\s*}/g,
    replacement: '$1\n}'
  },
  
  // Fix broken interface property types: string[]} => string[]
  {
    name: 'Fix broken interface property types',
    regex: /(\w+\[\])\s*}/g,
    replacement: '$1'
  },
  
  // Fix broken interface property types: >} => >
  {
    name: 'Fix broken interface property types',
    regex: />\s*}/g,
    replacement: '>'
  },
  
  // Fix broken interface inheritance: extends ExternalLoad { => extends ExternalLoad {
  {
    name: 'Fix broken interface inheritance',
    regex: /extends\s+([^{]+)\s*\{/g,
    replacement: 'extends $1 {'
  },
  
  // Fix broken useEffect dependency arrays: }, [] => }, []
  {
    name: 'Fix broken useEffect dependency arrays',
    regex: /,\s*\[\s*\]\s*\)/g,
    replacement: ', [])'
  },
  
  // Fix broken JSX attributes: <button, onClick => <button onClick
  {
    name: 'Fix broken JSX attributes',
    regex: /<\s*(\w+)\s*,\s*(\w+)/g,
    replacement: '<$1 $2'
  },
  
  // Fix broken useState destructuring: const [deletionStep setDeletionStep;] => const [deletionStep, setDeletionStep]
  {
    name: 'Fix broken useState destructuring',
    regex: /const\s*\[\s*([a-zA-Z0-9_$]+)\s+([a-zA-Z0-9_$]+)\s*;\s*\]/g,
    replacement: 'const [$1, $2]'
  },
  
  // Fix broken object destructuring: {a b;} => {a, b}
  {
    name: 'Fix broken object destructuring',
    regex: /\{\s*([a-zA-Z0-9_$]+)\s+([a-zA-Z0-9_$]+)\s*;\s*\}/g,
    replacement: '{$1, $2}'
  },
  
  // Fix broken array destructuring: [a b;] => [a, b]
  {
    name: 'Fix broken array destructuring',
    regex: /\[\s*([a-zA-Z0-9_$]+)\s+([a-zA-Z0-9_$]+)\s*;\s*\]/g,
    replacement: '[$1, $2]'
  },
  
  // Fix broken function parameters: (a; b) => (a, b)
  {
    name: 'Fix broken function parameters',
    regex: /\(\s*([^)]+);\s*([^)]+)\s*\)/g,
    replacement: '($1, $2)'
  },
  
  // Fix broken object properties: id: 1; name: 'User' => id: 1, name: 'User'
  {
    name: 'Fix broken object properties',
    regex: /(\w+):\s*([^,;]+);\s*(\w+):/g,
    replacement: '$1: $2,\n  $3:'
  },
  
  // Fix broken interface definitions: };} => }
  {
    name: 'Fix broken interface definitions',
    regex: /}\s*;\s*$/gm,
    replacement: '}'
  },
  
  // Fix broken setTimeout calls: setTimeout(() => setIsLoading(false) 1000) => setTimeout(() => setIsLoading(false), 1000)
  {
    name: 'Fix broken setTimeout calls',
    regex: /setTimeout\s*\(\s*([^,]+)\s+(\d+)\s*\)/g,
    replacement: 'setTimeout($1, $2)'
  },
  
  // Fix broken return statements: return <Landing />,} => return <Landing />
  {
    name: 'Fix broken return statements',
    regex: /return\s+<([^>]+)\s*\/>\s*,}/g,
    replacement: 'return <$1 />'
  },
  
  // Fix broken interface property types: string[]} => string[]
  {
    name: 'Fix broken interface property types',
    regex: /(\w+\[\])\s*}/g,
    replacement: '$1'
  },
  
  // Fix broken interface property types: >} => >
  {
    name: 'Fix broken interface property types',
    regex: />\s*}/g,
    replacement: '>'
  },
  
  // Fix broken interface inheritance: extends ExternalLoad { => extends ExternalLoad {
  {
    name: 'Fix broken interface inheritance',
    regex: /extends\s+([^{]+)\s*\{/g,
    replacement: 'extends $1 {'
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
  
  console.log(`\n🔧 Final import & string fix complete! Fixed ${fixedCount} files.`);
  console.log('\n🧹 Next steps:');
  console.log('1. Run: npx prettier --write "src/**/*.{ts,tsx}" --check');
  console.log('2. If successful, run: npx prettier --write "src/**/*.{ts,tsx}"');
  console.log('3. Run: npx eslint "src/**/*.{ts,tsx}" --fix');
  console.log('4. Run: npm run typecheck');
  
} catch (error) {
  console.error('❌ Script execution failed:', error.message);
  process.exit(1);
}
