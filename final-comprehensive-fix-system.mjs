#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

class FinalComprehensiveFixer {
  constructor() {
    this.fixedFiles = new Set();
    this.fixCount = 0;
  }

  async fixAllErrors() {
    console.log('🎯 Starting Final Comprehensive Fix System...');
    console.log('🎯 Target: 0 errors across all files');
    
    // Phase 1: Fix interface definition issues
    await this.fixInterfaceDefinitions();
    
    // Phase 2: Fix type definition issues
    await this.fixTypeDefinitions();
    
    // Phase 3: Fix import and export issues
    await this.fixImportExportIssues();
    
    // Phase 4: Fix object and array syntax
    await this.fixObjectArraySyntax();
    
    // Phase 5: Fix function and method definitions
    await this.fixFunctionDefinitions();
    
    // Phase 6: Fix remaining syntax errors
    await this.fixRemainingSyntax();
    
    console.log(`✅ Final comprehensive fixing completed! Fixed ${this.fixCount} issues across ${this.fixedFiles.size} files`);
  }

  async fixInterfaceDefinitions() {
    console.log('🔧 Phase 1: Fixing interface definition issues...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix malformed interface declarations
          content = this.fixMalformedInterfaces(content);
          
          // Fix interface properties
          content = this.fixInterfaceProperties(content);
          
          // Fix interface inheritance
          content = this.fixInterfaceInheritance(content);
          
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

  fixMalformedInterfaces(content) {
    // Fix interface declarations with missing spaces
    content = content.replace(/export interface (\w+)\{/g, 'export interface $1 {');
    content = content.replace(/interface (\w+)\{/g, 'interface $1 {');
    
    // Fix interface declarations with extra commas
    content = content.replace(/export interface (\w+)\{([^}]+),}/g, 'export interface $1 {\n  $2\n}');
    content = content.replace(/interface (\w+)\{([^}]+),}/g, 'interface $1 {\n  $2\n}');
    
    // Fix interface declarations with malformed properties
    content = content.replace(/(\w+):\s*(\w+);,/g, '$1: $2;');
    content = content.replace(/(\w+):\s*(\w+)\[\];/g, '$1: $2[];');
    content = content.replace(/(\w+):\s*Array<([^>]+)>;/g, '$1: Array<$2>;');
    
    return content;
  }

  fixInterfaceProperties(content) {
    // Fix properties with extra commas
    content = content.replace(/(\w+):\s*([^;]+);,/g, '$1: $2;');
    
    // Fix properties without semicolons
    content = content.replace(/(\w+):\s*([^;}\n]+)(?=\s*[}\n])/g, '$1: $2;');
    
    // Fix optional properties
    content = content.replace(/(\w+)\?:\s*([^;]+);,/g, '$1?: $2;');
    
    // Fix union type properties
    content = content.replace(/(\w+):\s*'([^']+)'\s*\|\s*'([^']+)';/g, "$1: '$2' | '$3';");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*\|\s*"([^"]+)";/g, '$1: "$2" | "$3";');
    
    // Fix array type properties
    content = content.replace(/(\w+):\s*(\w+)\[\];/g, '$1: $2[];');
    content = content.replace(/(\w+):\s*Array<([^>]+)>;/g, '$1: Array<$2>;');
    
    // Fix generic type properties
    content = content.replace(/(\w+):\s*Record<([^>]+)>;/g, '$1: Record<$2>;');
    content = content.replace(/(\w+):\s*Promise<([^>]+)>;/g, '$1: Promise<$2>;');
    
    return content;
  }

  fixInterfaceInheritance(content) {
    // Fix interface extends
    content = content.replace(/interface (\w+) extends (\w+)\{/g, 'interface $1 extends $2 {');
    
    // Fix interface implements
    content = content.replace(/class (\w+) implements (\w+)\{/g, 'class $1 implements $2 {');
    
    return content;
  }

  async fixTypeDefinitions() {
    console.log('🔧 Phase 2: Fixing type definition issues...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix type aliases
          content = this.fixTypeAliases(content);
          
          // Fix type unions
          content = this.fixTypeUnions(content);
          
          // Fix generic types
          content = this.fixGenericTypes(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing type definitions in ${file}:`, error.message);
        }
      }
    }
  }

  fixTypeAliases(content) {
    // Fix type alias declarations
    content = content.replace(/type (\w+)\s*=\s*\{([^}]+)\},/g, 'type $1 = {\n  $2\n};');
    content = content.replace(/type (\w+)\s*=\s*([^;]+),/g, 'type $1 = $2;');
    
    // Fix type alias with union types
    content = content.replace(/type (\w+)\s*=\s*'([^']+)'\s*\|\s*'([^']+)';/g, "type $1 = '$2' | '$3';");
    content = content.replace(/type (\w+)\s*=\s*"([^"]+)"\s*\|\s*"([^"]+)";/g, 'type $1 = "$2" | "$3";');
    
    return content;
  }

  fixTypeUnions(content) {
    // Fix union types with extra commas
    content = content.replace(/(\w+)\s*\|\s*(\w+),/g, '$1 | $2');
    
    // Fix union types with missing spaces
    content = content.replace(/(\w+)\|(\w+)/g, '$1 | $2');
    
    return content;
  }

  fixGenericTypes(content) {
    // Fix generic type syntax
    content = content.replace(/<([^>]+)>/g, (match, inner) => {
      return `<${inner.replace(/,/g, ', ')}>`;
    });
    
    // Fix specific generic types
    content = content.replace(/Record<string,\s*any>/g, 'Record<string, any>');
    content = content.replace(/Record<string,\s*number>/g, 'Record<string, number>');
    content = content.replace(/Record<string,\s*string>/g, 'Record<string, string>');
    content = content.replace(/Promise<Array<([^>]+)>>/g, 'Promise<Array<$1>>');
    
    return content;
  }

  async fixImportExportIssues() {
    console.log('📦 Phase 3: Fixing import and export issues...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix import statements
          content = this.fixImportStatements(content);
          
          // Fix export statements
          content = this.fixExportStatements(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing import/export issues in ${file}:`, error.message);
        }
      }
    }
  }

  fixImportStatements(content) {
    // Fix unterminated import statements
    content = content.replace(/import\s+([^;]+)'$/gm, "import $1';");
    content = content.replace(/import\s+([^;]+)"$/gm, 'import $1";');
    
    // Fix import statements with extra commas
    content = content.replace(/import\s+\{\s*([^}]+),\s*\}\s+from\s+['"]([^'"]+)['"];?/g, 'import { $1 } from "$2";');
    
    // Fix default imports
    content = content.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"],/g, 'import $1 from "$2";');
    
    // Fix type imports
    content = content.replace(/import\s+type\s+\{\s*([^}]+),\s*\}\s+from\s+['"]([^'"]+)['"];?/g, 'import type { $1 } from "$2";');
    
    return content;
  }

  fixExportStatements(content) {
    // Fix export statements with extra commas
    content = content.replace(/export\s+\{\s*([^}]+),\s*\}\s*;/g, 'export { $1 };');
    
    // Fix default exports
    content = content.replace(/export\s+default\s+(\w+),/g, 'export default $1;');
    
    // Fix type exports
    content = content.replace(/export\s+type\s+\{\s*([^}]+),\s*\}\s*;/g, 'export type { $1 };');
    
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
    // Fix object properties with missing commas
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
    
    // Fix malformed JSX
    content = content.replace(/<\s*(\w+)\s*>/g, '<$1>');
    content = content.replace(/<\s*\/\s*(\w+)\s*>/g, '</$1>');
    content = content.replace(/<\s*(\w+)\s*\/\s*>/g, '<$1 />');
    
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

// Run the final comprehensive fixer
const fixer = new FinalComprehensiveFixer();
fixer.fixAllErrors().catch(console.error);
