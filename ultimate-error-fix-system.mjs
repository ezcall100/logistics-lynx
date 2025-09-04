#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

class UltimateErrorFixer {
  constructor() {
    this.fixedFiles = new Set();
    this.fixCount = 0;
  }

  async fixAllErrors() {
    console.log('🚀 Starting Ultimate Error Fix System...');
    console.log('🎯 Target: 0 errors across all files');
    
    // Phase 1: Fix interface and type definition issues
    await this.fixInterfaceIssues();
    
    // Phase 2: Fix import statement issues
    await this.fixImportIssues();
    
    // Phase 3: Fix JSX and React issues
    await this.fixJSXIssues();
    
    // Phase 4: Fix object and array syntax
    await this.fixObjectArraySyntax();
    
    // Phase 5: Fix function and method definitions
    await this.fixFunctionDefinitions();
    
    // Phase 6: Fix remaining syntax errors
    await this.fixRemainingSyntax();
    
    console.log(`✅ Ultimate error fixing completed! Fixed ${this.fixCount} issues across ${this.fixedFiles.size} files`);
  }

  async fixInterfaceIssues() {
    console.log('🔧 Phase 1: Fixing interface and type definition issues...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix interface property syntax
          content = this.fixInterfaceProperties(content);
          
          // Fix type definitions
          content = this.fixTypeDefinitions(content);
          
          // Fix enum definitions
          content = this.fixEnumDefinitions(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
            console.log(`✅ Fixed interface issues: ${file}`);
          }
        } catch (error) {
          console.error(`❌ Error fixing interface issues in ${file}:`, error.message);
        }
      }
    }
  }

  fixInterfaceProperties(content) {
    // Fix interface properties with extra commas
    content = content.replace(/(\w+):\s*([^;]+);,/g, '$1: $2;');
    
    // Fix interface properties without semicolons
    content = content.replace(/(\w+):\s*([^;}\n]+)(?=\s*[}\n])/g, '$1: $2;');
    
    // Fix interface properties with malformed types
    content = content.replace(/(\w+):\s*'([^']+)',/g, "$1: '$2';");
    content = content.replace(/(\w+):\s*"([^"]+)",/g, '$1: "$2";');
    
    // Fix union types with extra commas
    content = content.replace(/(\w+):\s*'([^']+)'\s*\|\s*'([^']+)',/g, "$1: '$2' | '$3';");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*\|\s*"([^"]+)",/g, '$1: "$2" | "$3";');
    
    // Fix array types with extra commas
    content = content.replace(/(\w+):\s*(\w+)\[\],/g, '$1: $2[];');
    content = content.replace(/(\w+):\s*Array<([^>]+)>,/g, '$1: Array<$2>;');
    
    // Fix optional properties
    content = content.replace(/(\w+)\?:\s*([^;]+);,/g, '$1?: $2;');
    
    return content;
  }

  fixTypeDefinitions(content) {
    // Fix type aliases
    content = content.replace(/type\s+(\w+)\s*=\s*\{([^}]+)\},/g, 'type $1 = {\n  $2\n};');
    
    // Fix type unions
    content = content.replace(/type\s+(\w+)\s*=\s*([^;]+),/g, 'type $1 = $2;');
    
    // Fix generic types
    content = content.replace(/<([^>]+)>/g, (match, inner) => {
      return `<${inner.replace(/,/g, ', ')}>`;
    });
    
    return content;
  }

  fixEnumDefinitions(content) {
    // Fix enum values
    content = content.replace(/(\w+)\s*=\s*'([^']+)',/g, "$1 = '$2',");
    content = content.replace(/(\w+)\s*=\s*"([^"]+)",/g, '$1 = "$2",');
    content = content.replace(/(\w+)\s*=\s*(\d+),/g, '$1 = $2,');
    
    return content;
  }

  async fixImportIssues() {
    console.log('📦 Phase 2: Fixing import statement issues...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix unterminated import statements
          content = content.replace(/import\s+([^;]+)'$/gm, "import $1';");
          content = content.replace(/import\s+([^;]+)"$/gm, 'import $1";');
          
          // Fix import statements with extra commas
          content = content.replace(/import\s+\{\s*([^}]+),\s*\}\s+from\s+['"]([^'"]+)['"];?/g, 'import { $1 } from "$2";');
          
          // Fix default imports
          content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"],/g, 'import $1 from "$2";');
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing import issues in ${file}:`, error.message);
        }
      }
    }
  }

  async fixJSXIssues() {
    console.log('⚛️ Phase 3: Fixing JSX and React issues...');
    
    const jsxFiles = this.getAllFiles('src').filter(f => f.endsWith('.tsx'));
    for (const file of jsxFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // Fix JSX syntax
        content = this.fixJSXSyntax(content);
        
        // Fix React hooks
        content = this.fixReactHooks(content);
        
        // Fix event handlers
        content = this.fixEventHandlers(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(file, content, 'utf8');
          this.fixedFiles.add(file);
          this.fixCount++;
        }
      } catch (error) {
        console.error(`❌ Error fixing JSX issues in ${file}:`, error.message);
      }
    }
  }

  fixJSXSyntax(content) {
    // Fix JSX tags
    content = content.replace(/<\s*(\w+)\s*>/g, '<$1>');
    content = content.replace(/<\s*\/\s*(\w+)\s*>/g, '</$1>');
    content = content.replace(/<\s*(\w+)\s*\/\s*>/g, '<$1 />');
    
    // Fix JSX attributes
    content = content.replace(/className\s*=\s*{\s*`([^`]+)`\s*}/g, (match, className) => {
      const fixed = className.replace(/\s+/g, ' ').trim();
      return `className={\`${fixed}\`}`;
    });
    
    // Fix JSX expressions
    content = content.replace(/\{\s*([^}]+)\s*,\s*\}/g, '{$1}');
    
    return content;
  }

  fixReactHooks(content) {
    // Fix useState
    content = content.replace(/const\s*\[\s*(\w+),\s*(\w+)\s*\]\s*=\s*useState\s*\(\s*([^)]+)\s*\),/g, 'const [$1, $2] = useState($3);');
    
    // Fix useEffect
    content = content.replace(/useEffect\s*\(\s*\(\s*\)\s*=>\s*\{([^}]+)\}\s*,\s*\[([^\]]+)\]\s*\),/g, 'useEffect(() => {\n    $1\n  }, [$2]);');
    
    // Fix useCallback
    content = content.replace(/useCallback\s*\(\s*\([^)]*\)\s*=>\s*\{([^}]+)\}\s*,\s*\[([^\]]+)\]\s*\),/g, 'useCallback((...args) => {\n    $1\n  }, [$2]);');
    
    return content;
  }

  fixEventHandlers(content) {
    // Fix onClick handlers
    content = content.replace(/onClick\s*=\s*\(\s*\)\s*=>\s*\{([^}]+)\},/g, 'onClick={() => {\n      $1\n    }}');
    
    // Fix onChange handlers
    content = content.replace(/onChange\s*=\s*\(\s*e\s*\)\s*=>\s*\{([^}]+)\},/g, 'onChange={(e) => {\n      $1\n    }}');
    
    // Fix onSubmit handlers
    content = content.replace(/onSubmit\s*=\s*\(\s*e\s*\)\s*=>\s*\{([^}]+)\},/g, 'onSubmit={(e) => {\n      $1\n    }}');
    
    return content;
  }

  async fixObjectArraySyntax() {
    console.log('🏗️ Phase 4: Fixing object and array syntax...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix object literals
          content = this.fixObjectLiterals(content);
          
          // Fix arrays
          content = this.fixArrays(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing object/array syntax in ${file}:`, error.message);
        }
      }
    }
  }

  fixObjectLiterals(content) {
    // Fix object properties
    content = content.replace(/(\w+):\s*(\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\d+\.\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    
    // Fix trailing commas
    content = content.replace(/,\s*([}\]])/g, '$1');
    
    // Fix missing commas
    content = content.replace(/(\w+):\s*([^,}\n]+)(?=\s*[}\n])/g, '$1: $2,');
    
    return content;
  }

  fixArrays(content) {
    // Fix array syntax
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3']");
    content = content.replace(/\[\s*"([^"]+)"([^"]+)"([^"]+)"\s*\]/g, '["$1", "$2", "$3"]');
    content = content.replace(/\[\s*(\d+)(\d+)(\d+)\s*\]/g, '[$1, $2, $3]');
    
    // Fix array methods
    content = content.replace(/\.map\s*\(\s*\([^)]*\)\s*=>\s*\{([^}]+)\}\s*\),/g, '.map((...args) => {\n      $1\n    })');
    content = content.replace(/\.filter\s*\(\s*\([^)]*\)\s*=>\s*\{([^}]+)\}\s*\),/g, '.filter((...args) => {\n      $1\n    })');
    
    return content;
  }

  async fixFunctionDefinitions() {
    console.log('🔧 Phase 5: Fixing function and method definitions...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix function declarations
          content = this.fixFunctionDeclarations(content);
          
          // Fix method definitions
          content = this.fixMethodDefinitions(content);
          
          // Fix arrow functions
          content = this.fixArrowFunctions(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing function definitions in ${file}:`, error.message);
        }
      }
    }
  }

  fixFunctionDeclarations(content) {
    // Fix function declarations
    content = content.replace(/function\s+(\w+)\s*\(\s*\)\s*\{/g, 'function $1() {');
    content = content.replace(/function\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*\{/g, 'function $1($2) {');
    
    // Fix async functions
    content = content.replace(/async\s+function\s+(\w+)\s*\(\s*\)\s*\{/g, 'async function $1() {');
    content = content.replace(/async\s+function\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*\{/g, 'async function $1($2) {');
    
    return content;
  }

  fixMethodDefinitions(content) {
    // Fix class methods
    content = content.replace(/(\w+)\s*\(\s*\)\s*\{/g, '$1() {');
    content = content.replace(/(\w+)\s*\(\s*([^)]+)\s*\)\s*\{/g, '$1($2) {');
    
    // Fix async methods
    content = content.replace(/async\s+(\w+)\s*\(\s*\)\s*\{/g, 'async $1() {');
    content = content.replace(/async\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*\{/g, 'async $1($2) {');
    
    return content;
  }

  fixArrowFunctions(content) {
    // Fix arrow functions
    content = content.replace(/\(\s*\)\s*=>\s*\{([^}]+)\},/g, '() => {\n    $1\n  }');
    content = content.replace(/\(\s*([^)]+)\s*\)\s*=>\s*\{([^}]+)\},/g, '($1) => {\n    $2\n  }');
    
    // Fix single-line arrow functions
    content = content.replace(/\(\s*\)\s*=>\s*([^,]+),/g, '() => $1');
    content = content.replace(/\(\s*([^)]+)\s*\)\s*=>\s*([^,]+),/g, '($1) => $2');
    
    return content;
  }

  async fixRemainingSyntax() {
    console.log('🔧 Phase 6: Fixing remaining syntax errors...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix common syntax errors
          content = this.fixCommonSyntax(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing remaining syntax in ${file}:`, error.message);
        }
      }
    }
  }

  fixCommonSyntax(content) {
    // Fix unterminated strings
    content = content.replace(/(['"])([^'"]*?)(?=\n|$)/g, '$1$2$1');
    
    // Fix missing parentheses
    content = content.replace(/(\w+)\s*\(\s*([^)]*?)(?=\n|$)/g, '$1($2)');
    
    // Fix missing brackets
    content = content.replace(/(\w+)\s*\[\s*([^\]]*?)(?=\n|$)/g, '$1[$2]');
    
    // Fix missing braces
    content = content.replace(/(\w+)\s*\{\s*([^}]*?)(?=\n|$)/g, '$1{$2}');
    
    // Fix extra semicolons
    content = content.replace(/;;/g, ';');
    
    // Fix extra commas
    content = content.replace(/,\s*,/g, ',');
    
    // Fix malformed template literals
    content = content.replace(/`\s*,\s*`/g, '` `');
    
    return content;
  }

  getAllFiles(dir) {
    const files = [];
    
    const readDir = (currentDir) => {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          readDir(fullPath);
        } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx'))) {
          files.push(fullPath);
        }
      }
    };
    
    readDir(dir);
    return files;
  }
}

// Run the ultimate error fixer
const fixer = new UltimateErrorFixer();
fixer.fixAllErrors().catch(console.error);
