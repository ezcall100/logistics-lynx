#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change to project root
process.chdir(path.join(__dirname, '..'));

console.log('🔧 FINAL STRING & INTERFACE FIX');
console.log('Fixing remaining specific syntax errors...\n');

const patterns = [
  // Fix unterminated string literals in type definitions: 'pending} => 'pending'
  {
    name: 'Fix unterminated string literals in type definitions',
    regex: /'([^']+)\}/g,
    replacement: "'$1'"
  },
  
  // Fix broken interface definitions: status: 'active' | 'inactive' | 'pending} => status: 'active' | 'inactive' | 'pending'
  {
    name: 'Fix broken interface definitions with unterminated strings',
    regex: /(\w+):\s*'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)'\s*\}/g,
    replacement: "$1: '$2' | '$3' | '$4'"
  },
  
  // Fix malformed useEffect syntax: setTimeout(() => setIsLoading(false), 1000)) => setTimeout(() => setIsLoading(false), 1000)
  {
    name: 'Fix malformed useEffect syntax',
    regex: /setTimeout\s*\(\s*\(\)\s*=>\s*setIsLoading\s*\(\s*false\s*\)\s*,\s*1000\s*\)\s*\)/g,
    replacement: 'setTimeout(() => setIsLoading(false), 1000)'
  },
  
  // Fix broken useEffect with extra comma: setTimeout(() => setIsLoading(false), 1000), [] => setTimeout(() => setIsLoading(false), 1000), []
  {
    name: 'Fix broken useEffect with extra comma',
    regex: /setTimeout\s*\(\s*\(\)\s*=>\s*setIsLoading\s*\(\s*false\s*\)\s*,\s*1000\s*\)\s*,\s*\[\s*\]/g,
    replacement: 'setTimeout(() => setIsLoading(false), 1000), []'
  },
  
  // Fix broken import statements: import {Activity AlertTriangle => import {Activity, AlertTriangle
  {
    name: 'Fix broken import statements',
    regex: /import\s*\{\s*([a-zA-Z]+)\s*\n\s*([a-zA-Z]+)/g,
    replacement: 'import {$1,\n  $2'
  },
  
  // Fix broken object properties: id: 1; => id: 1,
  {
    name: 'Fix broken object properties with semicolons',
    regex: /(\w+):\s*([^,;]+);/g,
    replacement: '$1: $2,'
  },
  
  // Fix broken interface property definitions: name: string,} => name: string
  {
    name: 'Fix broken interface property definitions',
    regex: /(\w+):\s*([^,;]+),\s*\}/g,
    replacement: '$1: $2\n}'
  },
  
  // Fix broken type definitions: Record<string any> => Record<string, any>
  {
    name: 'Fix broken type definitions',
    regex: /Record<string\s+any>/g,
    replacement: 'Record<string, any>'
  },
  
  // Fix broken return statements: return(<div className = "space-y-6">") { => return (<div className="space-y-6">
  {
    name: 'Fix broken return statements',
    regex: /return\s*\(\s*<div\s+className\s*=\s*"([^"]+)"\s*>\s*"\)\s*\{/g,
    replacement: 'return (\n    <div className="$1">'
  },
  
  // Fix broken useState calls: useState('warning');' => useState('warning')
  {
    name: 'Fix broken useState calls',
    regex: /useState\s*\(\s*'([^']+)'\s*\);\s*'/g,
    replacement: "useState('$1')"
  },
  
  // Fix broken object literals: id: 1; '} => id: 1\n}
  {
    name: 'Fix broken object literals',
    regex: /(\w+):\s*([^,;]+);\s*'}/g,
    replacement: '$1: $2\n}'
  },
  
  // Fix broken array literals: [) { => []
  {
    name: 'Fix broken array literals',
    regex: /\[\s*\)\s*\{/g,
    replacement: '[]'
  },
  
  // Fix broken interface closing: };} => }
  {
    name: 'Fix broken interface closing',
    regex: /}\s*;\s*}/g,
    replacement: '}'
  },
  
  // Fix broken function calls: },}, [] => }, []
  {
    name: 'Fix broken function calls',
    regex: /,\s*,\s*\}\s*,\s*\[\s*\]/g,
    replacement: '}, []'
  },
  
  // Fix broken import destructuring: from '../../../components/ui/EnhancedUIComponents' => from '../../../components/ui/EnhancedUIComponents'
  {
    name: 'Fix broken import destructuring',
    regex: /import\s*\{([^}]+)\s*\}\s*([^}]+)\s*from\s*'([^']+)'/g,
    replacement: "import {\n  $1\n} from '$3'"
  },
  
  // Fix broken object property access: [];} => []
  {
    name: 'Fix broken object property access',
    regex: /\[\s*\]\s*;\s*}/g,
    replacement: '[]'
  },
  
  // Fix broken type definitions: >} => >
  {
    name: 'Fix broken type definitions',
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
  
  // Fix broken interface property types: number,} => number
  {
    name: 'Fix broken interface property types with trailing comma',
    regex: /(\w+),\s*}/g,
    replacement: '$1\n}'
  },
  
  // Fix broken interface property types: string,} => string
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

// Main execution
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
  
  console.log(`\n🔧 Final string & interface fix complete! Fixed ${fixedCount} files.`);
  console.log('\n🧹 Next steps:');
  console.log('1. Run: npx prettier --write "src/**/*.{ts,tsx}" --check');
  console.log('2. If successful, run: npx prettier --write "src/**/*.{ts,tsx}"');
  console.log('3. Run: npx eslint "src/**/*.{ts,tsx}" --fix');
  console.log('4. Run: npm run typecheck');
  
} catch (error) {
  console.error('❌ Script execution failed:', error.message);
  process.exit(1);
}
