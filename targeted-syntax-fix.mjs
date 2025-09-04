import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Function to fix specific syntax errors
function fixSpecificSyntaxErrors(content) {
  let fixed = content;
  
  // Fix trailing commas in interface properties
  fixed = fixed.replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3');
  
  // Fix malformed function signatures
  fixed = fixed.replace(/async\s+(\w+)\s*\(([^)]*)\)\s*:\s*Promise<([^>]+)>\s*\{/g, 'async $1($2): Promise<$3> {');
  
  // Fix malformed method signatures
  fixed = fixed.replace(/(\w+)\s*\(([^)]*)\)\s*:\s*([^{]+)\s*\{/g, '$1($2): $3 {');
  
  // Fix malformed object properties
  fixed = fixed.replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3');
  
  // Fix malformed array types
  fixed = fixed.replace(/(\w+)\[\];(\s*[}\]])/g, '$1[]$2');
  
  // Fix malformed Record types
  fixed = fixed.replace(/Record<([^,]+)\s+([^>]+)>/g, 'Record<$1, $2>');
  
  // Fix malformed function parameters
  fixed = fixed.replace(/\(([^)]+)\s+([^)]+)\)/g, '($1, $2)');
  
  // Fix malformed template literals
  fixed = fixed.replace(/`([^`]+)`''/g, '`$1`');
  
  // Fix malformed string literals
  fixed = fixed.replace(/'([^']+)''/g, "'$1'");
  
  // Fix malformed imports
  fixed = fixed.replace(/import\s+([^;]+);''/g, 'import $1;');
  
  // Fix malformed exports
  fixed = fixed.replace(/export\s+([^;]+);''/g, 'export $1;');
  
  // Fix malformed interface declarations
  fixed = fixed.replace(/export\s+interface\s+(\w+)\s*\{([^}]+)\}/g, (match, name, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `export interface ${name} {\n${fixedBody}\n}`;
  });
  
  // Fix malformed class declarations
  fixed = fixed.replace(/class\s+(\w+)\s*\{([^}]+)\}/g, (match, name, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `class ${name} {\n${fixedBody}\n}`;
  });
  
  // Fix malformed method declarations
  fixed = fixed.replace(/(\w+)\s*\([^)]*\)\s*:\s*([^{]+)\s*\{([^}]+)\}/g, (match, name, returnType, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `${name}(${returnType}) {\n${fixedBody}\n}`;
  });
  
  // Fix malformed object literals
  fixed = fixed.replace(/\{\s*([^}]+)\s*\}/g, (match, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `{\n${fixedBody}\n}`;
  });
  
  // Fix malformed array literals
  fixed = fixed.replace(/\[\s*([^\]]+)\s*\]/g, (match, body) => {
    const fixedBody = body
      .replace(/(\w+):\s*([^,]+),(\s*[}\]])/g, '$1: $2$3')
      .replace(/(\w+):\s*([^;]+);(\s*[}\]])/g, '$1: $2$3');
    return `[\n${fixedBody}\n]`;
  });
  
  return fixed;
}

// Function to process a single file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixSpecificSyntaxErrors(content);
    
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
  console.log('🔧 Starting targeted TypeScript syntax fix...');
  
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
    console.log('🎯 Targeted TypeScript syntax fix completed!');
    
  } catch (error) {
    console.error('❌ Error during fix process:', error);
  }
}

// Run the fix
fixAllTypeScriptFiles();
