import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comprehensive error fix patterns
const errorFixes = [
  // Fix trailing commas in object properties
  {
    pattern: /(\w+):\s*([^,}\n]+),\s*$/gm,
    replacement: '$1: $2'
  },
  // Fix trailing commas in interface properties
  {
    pattern: /(\w+):\s*([^;}\n]+);\s*,/g,
    replacement: '$1: $2;'
  },
  // Fix trailing commas in type definitions
  {
    pattern: /(\w+):\s*([^;}\n]+),\s*$/gm,
    replacement: '$1: $2'
  },
  // Fix malformed function declarations
  {
    pattern: /(\w+):\s*\([^)]*\)\s*=>\s*{,\s*$/gm,
    replacement: '$1: ($2) => {'
  },
  // Fix extra commas after function declarations
  {
    pattern: /(\w+):\s*\([^)]*\)\s*=>\s*,\s*$/gm,
    replacement: '$1: ($2) => {'
  },
  // Fix malformed object literals
  {
    pattern: /{\s*,\s*$/gm,
    replacement: '{'
  },
  // Fix malformed array literals
  {
    pattern: /\[\s*,\s*$/gm,
    replacement: '['
  },
  // Fix extra commas in object properties
  {
    pattern: /(\w+):\s*([^,}\n]+),\s*,/g,
    replacement: '$1: $2,'
  },
  // Fix malformed import statements
  {
    pattern: /import\s+\{\s*([^}]+)\s*,\s*\}\s+from\s+['"]([^'"]+)['"];?/g,
    replacement: 'import { $1 } from "$2";'
  },
  // Fix malformed export statements
  {
    pattern: /export\s+default\s+(\w+)\s*,\s*;/g,
    replacement: 'export default $1;'
  },
  // Fix malformed class declarations
  {
    pattern: /class\s+(\w+)\s*{\s*,\s*$/gm,
    replacement: 'class $1 {'
  },
  // Fix malformed interface declarations
  {
    pattern: /interface\s+(\w+)\s*{\s*,\s*$/gm,
    replacement: 'interface $1 {'
  },
  // Fix malformed type declarations
  {
    pattern: /type\s+(\w+)\s*=\s*\{\s*,\s*$/gm,
    replacement: 'type $1 = {'
  },
  // Fix malformed enum declarations
  {
    pattern: /enum\s+(\w+)\s*{\s*,\s*$/gm,
    replacement: 'enum $1 {'
  },
  // Fix malformed switch statements
  {
    pattern: /switch\s*\(\s*(\w+)\s*\)\s*{\s*,\s*$/gm,
    replacement: 'switch ($1) {'
  },
  // Fix malformed case statements
  {
    pattern: /case\s+([^:]+):\s*,\s*$/gm,
    replacement: 'case $1:'
  },
  // Fix malformed default case
  {
    pattern: /default:\s*,\s*$/gm,
    replacement: 'default:'
  },
  // Fix malformed if statements
  {
    pattern: /if\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*$/gm,
    replacement: 'if ($1) {'
  },
  // Fix malformed else statements
  {
    pattern: /}\s*else\s*{\s*,\s*$/gm,
    replacement: '} else {'
  },
  // Fix malformed else if statements
  {
    pattern: /}\s*else\s*if\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*$/gm,
    replacement: '} else if ($1) {'
  },
  // Fix malformed for loops
  {
    pattern: /for\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*$/gm,
    replacement: 'for ($1) {'
  },
  // Fix malformed while loops
  {
    pattern: /while\s*\(\s*([^)]+)\s*\)\s*{\s*,\s*$/gm,
    replacement: 'while ($1) {'
  },
  // Fix malformed try blocks
  {
    pattern: /try\s*{\s*,\s*$/gm,
    replacement: 'try {'
  },
  // Fix malformed catch blocks
  {
    pattern: /}\s*catch\s*\(\s*(\w+)\s*\)\s*{\s*,\s*$/gm,
    replacement: '} catch ($1) {'
  },
  // Fix malformed finally blocks
  {
    pattern: /}\s*finally\s*{\s*,\s*$/gm,
    replacement: '} finally {'
  },
  // Fix malformed async function declarations
  {
    pattern: /async\s+(\w+)\s*\(\s*[^)]*\s*\)\s*{\s*,\s*$/gm,
    replacement: 'async $1($2) {'
  },
  // Fix malformed arrow functions
  {
    pattern: /\(\s*[^)]*\s*\)\s*=>\s*{\s*,\s*$/gm,
    replacement: '($1) => {'
  },
  // Fix malformed React component declarations
  {
    pattern: /const\s+(\w+):\s*React\.FC\s*=\s*\(\s*\)\s*=>\s*{\s*,\s*$/gm,
    replacement: 'const $1: React.FC = () => {'
  },
  // Fix malformed useState declarations
  {
    pattern: /const\s*\[\s*(\w+),\s*(\w+)\s*\]\s*=\s*useState\s*\(\s*([^)]+)\s*\)\s*,\s*$/gm,
    replacement: 'const [$1, $2] = useState($3);'
  },
  // Fix malformed useEffect declarations
  {
    pattern: /useEffect\s*\(\s*\(\s*\)\s*=>\s*{\s*,\s*$/gm,
    replacement: 'useEffect(() => {'
  },
  // Fix malformed JSX elements
  {
    pattern: /<\s*(\w+)\s*,\s*>/g,
    replacement: '<$1>'
  },
  // Fix malformed JSX closing tags
  {
    pattern: /<\s*\/\s*(\w+)\s*,\s*>/g,
    replacement: '</$1>'
  },
  // Fix malformed object spread syntax
  {
    pattern: /\.\.\.\s*(\w+)\s*,\s*$/gm,
    replacement: '...$1'
  },
  // Fix malformed array spread syntax
  {
    pattern: /\.\.\.\s*(\w+)\s*,\s*$/gm,
    replacement: '...$1'
  },
  // Fix malformed destructuring
  {
    pattern: /const\s*\{\s*([^}]+)\s*,\s*\}\s*=\s*(\w+);/g,
    replacement: 'const { $1 } = $2;'
  },
  // Fix malformed template literals
  {
    pattern: /`\s*,\s*`/g,
    replacement: '` `'
  },
  // Fix malformed conditional rendering
  {
    pattern: /\{\s*(\w+)\s*\?\s*([^:]+)\s*:\s*([^}]+)\s*,\s*\}/g,
    replacement: '{$1 ? $2 : $3}'
  },
  // Fix malformed event handlers
  {
    pattern: /onClick\s*=\s*\(\s*\)\s*=>\s*{\s*,\s*$/gm,
    replacement: 'onClick={() => {'
  },
  // Fix malformed CSS class names
  {
    pattern: /className\s*=\s*["']([^"']*)\s+([^"']*)["']/g,
    replacement: 'className="$1$2"'
  },
  // Fix malformed Tailwind classes
  {
    pattern: /(\w+):\s*(\w+)\s+(\w+)/g,
    replacement: '$1:$2$3'
  },
  // Fix malformed CSS gradients
  {
    pattern: /bg-gradient-to-(\w+)\s+from-(\w+)-(\d+)\s+to-(\w+)-(\d+)/g,
    replacement: 'bg-gradient-to-$1 from-$2-$3 to-$4-$5'
  },
  // Fix malformed CSS transforms
  {
    pattern: /transform\s+(\w+)-(\w+)\s+(\w+)-(\w+)/g,
    replacement: 'transform $1-$2 $3-$4'
  },
  // Fix malformed CSS transitions
  {
    pattern: /transition-(\w+)\s+duration-(\d+)\s+ease-(\w+)/g,
    replacement: 'transition-$1 duration-$2 ease-$3'
  },
  // Fix malformed CSS shadows
  {
    pattern: /shadow-(\w+)\s+shadow-(\w+)-(\d+)\/(\d+)/g,
    replacement: 'shadow-$1 shadow-$2-$3/$4'
  },
  // Fix malformed CSS borders
  {
    pattern: /border-(\w+)\s+border-(\w+)-(\d+)/g,
    replacement: 'border-$1 border-$2-$3'
  },
  // Fix malformed CSS spacing
  {
    pattern: /(\w+)-(\d+)\s+(\w+)-(\d+)/g,
    replacement: '$1-$2 $3-$4'
  },
  // Fix malformed CSS colors
  {
    pattern: /text-(\w+)-(\d+)\s+bg-(\w+)-(\d+)/g,
    replacement: 'text-$1-$2 bg-$3-$4'
  },
  // Fix malformed CSS flexbox
  {
    pattern: /flex\s+(\w+)\s+(\w+)\s+(\w+)/g,
    replacement: 'flex $1 $2 $3'
  },
  // Fix malformed CSS grid
  {
    pattern: /grid\s+(\w+)-(\w+)\s+(\w+)-(\w+)/g,
    replacement: 'grid $1-$2 $3-$4'
  },
  // Fix malformed CSS positioning
  {
    pattern: /absolute\s+(\w+)-(\d+)\s+(\w+)-(\d+)/g,
    replacement: 'absolute $1-$2 $3-$4'
  },
  // Fix malformed CSS sizing
  {
    pattern: /w-(\d+)\s+h-(\d+)/g,
    replacement: 'w-$1 h-$2'
  },
  // Fix malformed CSS typography
  {
    pattern: /text-(\w+)\s+font-(\w+)/g,
    replacement: 'text-$1 font-$2'
  },
  // Fix malformed CSS backgrounds
  {
    pattern: /bg-(\w+)-(\d+)\s+bg-(\w+)-(\d+)/g,
    replacement: 'bg-$1-$2 bg-$3-$4'
  },
  // Fix malformed CSS opacity
  {
    pattern: /opacity-(\d+)\s+opacity-(\d+)/g,
    replacement: 'opacity-$1'
  },
  // Fix malformed CSS z-index
  {
    pattern: /z-(\d+)\s+z-(\d+)/g,
    replacement: 'z-$1'
  },
  // Fix malformed CSS overflow
  {
    pattern: /overflow-(\w+)\s+overflow-(\w+)/g,
    replacement: 'overflow-$1'
  },
  // Fix malformed CSS display
  {
    pattern: /(\w+)\s+(\w+)\s+(\w+)/g,
    replacement: '$1 $2 $3'
  }
];

// Specific file fixes for known problematic files
const specificFixes = {
  'src/services/mcp.ts': [
    // Fix interface property syntax
    {
      pattern: /(\w+):\s*([^;}\n]+),\s*$/gm,
      replacement: '$1: $2;'
    },
    // Fix object property syntax
    {
      pattern: /(\w+):\s*([^,}\n]+),\s*$/gm,
      replacement: '$1: $2,'
    },
    // Fix function declarations
    {
      pattern: /(\w+):\s*\([^)]*\)\s*=>\s*,\s*$/gm,
      replacement: '$1: ($2) => {'
    }
  ],
  'src/services/mcp-integrated.ts': [
    // Fix class declarations
    {
      pattern: /class\s+(\w+)\s*{\s*,\s*$/gm,
      replacement: 'class $1 {'
    },
    // Fix method declarations
    {
      pattern: /(\w+)\s*\(\s*[^)]*\s*\)\s*{\s*,\s*$/gm,
      replacement: '$1($2) {'
    }
  ],
  'src/services/websiteBuilderService.ts': [
    // Fix method declarations
    {
      pattern: /(\w+)\s*\(\s*[^)]*\s*\)\s*{\s*,\s*$/gm,
      replacement: '$1($2) {'
    },
    // Fix object literals
    {
      pattern: /const\s+(\w+):\s*(\w+)\s*=\s*{\s*,\s*$/gm,
      replacement: 'const $1: $2 = {'
    }
  ]
};

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixed = false;

    // Apply general fixes
    errorFixes.forEach(fix => {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        fixed = true;
      }
    });

    // Apply specific fixes for this file
    const fileName = path.basename(filePath);
    if (specificFixes[fileName]) {
      specificFixes[fileName].forEach(fix => {
        const newContent = content.replace(fix.pattern, fix.replacement);
        if (newContent !== content) {
          content = newContent;
          fixed = true;
        }
      });
    }

    // Additional comprehensive fixes
    content = content
      // Fix multiple consecutive commas
      .replace(/,\s*,/g, ',')
      // Fix trailing commas in objects
      .replace(/,(\s*})/g, '$1')
      // Fix trailing commas in arrays
      .replace(/,(\s*\])/g, '$1')
      // Fix malformed function calls
      .replace(/\(\s*,\s*\)/g, '()')
      // Fix malformed object literals
      .replace(/{\s*,/g, '{')
      // Fix malformed array literals
      .replace(/\[\s*,/g, '[')
      // Fix malformed JSX
      .replace(/<\s*,\s*>/g, '<>')
      // Fix malformed CSS classes
      .replace(/(\w+):\s+(\w+)/g, '$1:$2')
      // Fix malformed imports
      .replace(/import\s+{\s*,\s*}/g, 'import {}')
      // Fix malformed exports
      .replace(/export\s+{\s*,\s*}/g, 'export {}')
      // Fix malformed type annotations
      .replace(/:\s*,\s*([^=])/g, ': $1')
      // Fix malformed default parameters
      .replace(/=\s*,\s*([^,}])/g, '= $1')
      // Fix malformed destructuring
      .replace(/{\s*,\s*}/g, '{}')
      .replace(/\[\s*,\s*\]/g, '[]')
      // Fix malformed template literals
      .replace(/`\s*,\s*`/g, '` `')
      // Fix malformed conditional expressions
      .replace(/\?\s*,\s*:/g, '? :')
      // Fix malformed logical operators
      .replace(/&&\s*,\s*&&/g, '&&')
      .replace(/\|\|\s*,\s*\|\|/g, '||')
      // Fix malformed arithmetic operators
      .replace(/\+\s*,\s*\+/g, '+')
      .replace(/-\s*,\s*-/g, '-')
      .replace(/\*\s*,\s*\*/g, '*')
      .replace(/\/\s*,\s*\//g, '/')
      // Fix malformed comparison operators
      .replace(/==\s*,\s*==/g, '==')
      .replace(/!=\s*,\s*!=/g, '!=')
      .replace(/===\s*,\s*===/g, '===')
      .replace(/!==\s*,\s*!==/g, '!==')
      // Fix malformed assignment operators
      .replace(/=\s*,\s*=/g, '=')
      .replace(/\+=\s*,\s*\+=/g, '+=')
      .replace(/-=\s*,\s*-=/g, '-=')
      .replace(/\*=\s*,\s*\*=/g, '*=')
      .replace(/\/=\s*,\s*\/=/g, '/=')
      // Fix malformed bitwise operators
      .replace(/&\s*,\s*&/g, '&')
      .replace(/\|\s*,\s*\|/g, '|')
      .replace(/\^\s*,\s*\^/g, '^')
      .replace(/<<\s*,\s*<</g, '<<')
      .replace(/>>\s*,\s*>>/g, '>>')
      .replace(/>>>\s*,\s*>>>/g, '>>>')
      // Fix malformed unary operators
      .replace(/!\s*,\s*!/g, '!')
      .replace(/~\s*,\s*~/g, '~')
      .replace(/\+\s*,\s*\+/g, '+')
      .replace(/-\s*,\s*-/g, '-')
      // Fix malformed increment/decrement
      .replace(/\+\+\s*,\s*\+\+/g, '++')
      .replace(/--\s*,\s*--/g, '--')
      // Fix malformed property access
      .replace(/\.\s*,\s*\./g, '.')
      // Fix malformed bracket access
      .replace(/\[\s*,\s*\[/g, '[')
      .replace(/\]\s*,\s*\]/g, ']')
      // Fix malformed parentheses
      .replace(/\(\s*,\s*\(/g, '(')
      .replace(/\)\s*,\s*\)/g, ')')
      // Fix malformed braces
      .replace(/{\s*,\s*{/g, '{')
      .replace(/}\s*,\s*}/g, '}')
      // Fix malformed semicolons
      .replace(/;\s*,\s*;/g, ';')
      // Fix malformed colons
      .replace(/:\s*,\s*:/g, ':')
      // Fix malformed commas
      .replace(/,\s*,\s*,/g, ',')
      // Fix malformed periods
      .replace(/\.\s*,\s*\./g, '.')
      // Fix malformed question marks
      .replace(/\?\s*,\s*\?/g, '?')
      // Fix malformed exclamation marks
      .replace(/!\s*,\s*!/g, '!')
      // Fix malformed at symbols
      .replace(/@\s*,\s*@/g, '@')
      // Fix malformed hash symbols
      .replace(/#\s*,\s*#/g, '#')
      // Fix malformed dollar signs
      .replace(/\$\s*,\s*\$/g, '$')
      // Fix malformed percent signs
      .replace(/%\s*,\s*%/g, '%')
      // Fix malformed ampersands
      .replace(/&\s*,\s*&/g, '&')
      // Fix malformed asterisks
      .replace(/\*\s*,\s*\*/g, '*')
      // Fix malformed plus signs
      .replace(/\+\s*,\s*\+/g, '+')
      // Fix malformed minus signs
      .replace(/-\s*,\s*-/g, '-')
      // Fix malformed equals signs
      .replace(/=\s*,\s*=/g, '=')
      // Fix malformed pipe symbols
      .replace(/\|\s*,\s*\|/g, '|')
      // Fix malformed backslashes
      .replace(/\\\s*,\s*\\/g, '\\')
      // Fix malformed forward slashes
      .replace(/\/\s*,\s*\//g, '/')
      // Fix malformed backticks
      .replace(/`\s*,\s*`/g, '`')
      // Fix malformed single quotes
      .replace(/'\s*,\s*'/g, "'")
      // Fix malformed double quotes
      .replace(/"\s*,\s*"/g, '"')
      // Fix malformed angle brackets
      .replace(/<\s*,\s*</g, '<')
      .replace(/>\s*,\s*>/g, '>')
      // Fix malformed square brackets
      .replace(/\[\s*,\s*\[/g, '[')
      .replace(/\]\s*,\s*\]/g, ']')
      // Fix malformed curly braces
      .replace(/{\s*,\s*{/g, '{')
      .replace(/}\s*,\s*}/g, '}')
      // Fix malformed parentheses
      .replace(/\(\s*,\s*\(/g, '(')
      .replace(/\)\s*,\s*\)/g, ')');

    // Write the fixed content back to the file
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function walkDir(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files.push(...walkDir(fullPath));
    } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function runTypeScriptCheck() {
  try {
    const result = execSync('npm run typecheck', { encoding: 'utf8', stdio: 'pipe' });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, output: error.stdout || error.stderr || error.message };
  }
}

function parseErrorCount(output) {
  const match = output.match(/Found (\d+) errors? in (\d+) files?/);
  if (match) {
    return {
      errorCount: parseInt(match[1]),
      fileCount: parseInt(match[2])
    };
  }
  return { errorCount: 0, fileCount: 0 };
}

// Main execution
async function main() {
  console.log('🚀 Starting comprehensive error fix...');
  
  const srcDir = path.join(__dirname, 'src');
  const files = walkDir(srcDir);
  
  console.log(`📁 Found ${files.length} files to process`);
  
  let iteration = 1;
  let previousErrorCount = Infinity;
  let previousFileCount = Infinity;
  
  while (true) {
    console.log(`\n🔄 Iteration ${iteration}`);
    
    let fixedCount = 0;
    
    // Fix all files
    for (const file of files) {
      if (fixFile(file)) {
        fixedCount++;
      }
    }
    
    console.log(`📊 Fixed ${fixedCount} files in this iteration`);
    
    // Check current error status
    console.log('🔍 Running TypeScript check...');
    const checkResult = runTypeScriptCheck();
    
    if (checkResult.success) {
      console.log('✅ No TypeScript errors found!');
      break;
    }
    
    const { errorCount, fileCount } = parseErrorCount(checkResult.output);
    
    console.log(`📈 Current status: ${errorCount} errors across ${fileCount} files`);
    
    // Check if we're making progress
    if (errorCount >= previousErrorCount && fileCount >= previousFileCount) {
      console.log('⚠️  No progress made in this iteration, stopping...');
      break;
    }
    
    previousErrorCount = errorCount;
    previousFileCount = fileCount;
    
    // If we've reached 0 errors, we're done
    if (errorCount === 0) {
      console.log('🎉 All errors fixed!');
      break;
    }
    
    iteration++;
    
    // Safety check to prevent infinite loops
    if (iteration > 10) {
      console.log('⚠️  Maximum iterations reached, stopping...');
      break;
    }
  }
  
  // Final check
  console.log('\n🔍 Final TypeScript check...');
  const finalCheck = runTypeScriptCheck();
  
  if (finalCheck.success) {
    console.log('🎉 SUCCESS: All TypeScript errors have been fixed!');
    console.log('📊 Final status: 0 errors across 0 files');
  } else {
    console.log('⚠️  Some errors may still remain:');
    console.log(finalCheck.output);
  }
}

main().catch(console.error);
