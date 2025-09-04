import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Function to fix common TypeScript syntax errors
function fixTypeScriptSyntax(content) {
  let fixed = content;
  
  // Fix trailing commas in interfaces
  fixed = fixed.replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3');
  
  // Fix Record type syntax
  fixed = fixed.replace(/Record<([^,]+)\s+([^>]+)>/g, 'Record<$1, $2>');
  
  // Fix array type syntax
  fixed = fixed.replace(/(\w+)\[\];(\s*[}\]])/g, '$1[]$2');
  
  // Fix function parameter syntax
  fixed = fixed.replace(/\(([^)]+)\s+([^)]+)\)/g, '($1, $2)');
  
  // Fix object property syntax
  fixed = fixed.replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3');
  
  // Fix template literal syntax
  fixed = fixed.replace(/`([^`]+)`''/g, '`$1`');
  
  // Fix string literal syntax
  fixed = fixed.replace(/'([^']+)''/g, "'$1'");
  
  // Fix import syntax
  fixed = fixed.replace(/import\s+([^;]+);''/g, 'import $1;');
  
  // Fix export syntax
  fixed = fixed.replace(/export\s+([^;]+);''/g, 'export $1;');
  
  // Fix interface syntax
  fixed = fixed.replace(/export\s+interface\s+(\w+)\s*\{([^}]+)\}/g, (match, name, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `export interface ${name} {\n${fixedBody}\n}`;
  });
  
  // Fix class syntax
  fixed = fixed.replace(/class\s+(\w+)\s*\{([^}]+)\}/g, (match, name, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `class ${name} {\n${fixedBody}\n}`;
  });
  
  // Fix method syntax
  fixed = fixed.replace(/(\w+)\s*\([^)]*\)\s*:\s*([^{]+)\s*\{([^}]+)\}/g, (match, name, returnType, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `${name}(${returnType}) {\n${fixedBody}\n}`;
  });
  
  return fixed;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixTypeScriptSyntax(content);
    
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main function to process all TypeScript files
async function fixAllTypeScriptFiles() {
  console.log('🔧 Starting comprehensive TypeScript syntax fix...');
  
  try {
    // Find all TypeScript files
    const files = await glob('src/**/*.{ts,tsx}', { ignore: ['node_modules/**', 'dist/**'] });
    
    console.log(`📁 Found ${files.length} TypeScript files to process`);
    
    let fixedCount = 0;
    
    for (const file of files) {
      if (processFile(file)) {
        fixedCount++;
      }
    }
    
    console.log(`✅ Fixed ${fixedCount} files`);
    console.log('🎯 Comprehensive TypeScript syntax fix completed!');
    
  } catch (error) {
    console.error('❌ Error during fix process:', error);
  }
}

// Run the fix
fixAllTypeScriptFiles();
