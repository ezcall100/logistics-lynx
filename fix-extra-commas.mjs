import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixed = false;

    // Fix extra commas after interface properties
    content = content
      // Remove extra commas after interface properties
      .replace(/(\w+):\s*([^;}\n]+);,/g, '$1: $2;')
      // Remove extra commas after object properties
      .replace(/(\w+):\s*([^,}\n]+),/g, '$1: $2')
      // Fix malformed function declarations
      .replace(/(\w+):\s*\([^)]*\)\s*=>\s*,/g, '$1: ($2) => {')
      // Fix malformed object assignments
      .replace(/const\s+(\w+):\s*(\w+)\s*=\s*{\s*,/g, 'const $1: $2 = {')
      // Fix malformed try-catch blocks
      .replace(/try\s*{\s*,/g, 'try {')
      // Fix malformed catch blocks
      .replace(/}\s*catch\s*\(\s*(\w+)\s*\)\s*{\s*,/g, '} catch ($1) {')
      // Fix malformed export statements
      .replace(/export\s+default\s+(\w+)\s*,;/g, 'export default $1;')
      // Fix malformed imports
      .replace(/import\s+{\s*,/g, 'import {')
      // Fix malformed exports
      .replace(/export\s+{\s*,/g, 'export {')
      // Fix malformed JSX
      .replace(/<\s*,/g, '<')
      // Fix malformed object literals
      .replace(/{\s*,/g, '{')
      // Fix malformed array literals
      .replace(/\[\s*,/g, '[')
      // Fix malformed function calls
      .replace(/\(\s*,/g, '(')
      // Fix malformed type annotations
      .replace(/:\s*,/g, ':')
      // Fix malformed default parameters
      .replace(/=\s*,/g, '=')
      // Fix malformed destructuring
      .replace(/{\s*,/g, '{')
      .replace(/\[\s*,/g, '[')
      // Fix malformed template literals
      .replace(/`\s*,/g, '`')
      // Fix malformed conditional expressions
      .replace(/\?\s*,/g, '?')
      // Fix malformed logical operators
      .replace(/&&\s*,/g, '&&')
      .replace(/\|\|\s*,/g, '||')
      // Fix malformed arithmetic operators
      .replace(/\+\s*,/g, '+')
      .replace(/-\s*,/g, '-')
      .replace(/\*\s*,/g, '*')
      .replace(/\/\s*,/g, '/')
      // Fix malformed comparison operators
      .replace(/==\s*,/g, '==')
      .replace(/!=\s*,/g, '!=')
      .replace(/===\s*,/g, '===')
      .replace(/!==\s*,/g, '!==')
      // Fix malformed assignment operators
      .replace(/=\s*,/g, '=')
      .replace(/\+=\s*,/g, '+=')
      .replace(/-=\s*,/g, '-=')
      .replace(/\*=\s*,/g, '*=')
      .replace(/\/=\s*,/g, '/=')
      // Fix malformed bitwise operators
      .replace(/&\s*,/g, '&')
      .replace(/\|\s*,/g, '|')
      .replace(/\^\s*,/g, '^')
      .replace(/<<\s*,/g, '<<')
      .replace(/>>\s*,/g, '>>')
      .replace(/>>>\s*,/g, '>>>')
      // Fix malformed unary operators
      .replace(/!\s*,/g, '!')
      .replace(/~\s*,/g, '~')
      .replace(/\+\s*,/g, '+')
      .replace(/-\s*,/g, '-')
      // Fix malformed increment/decrement
      .replace(/\+\+\s*,/g, '++')
      .replace(/--\s*,/g, '--')
      // Fix malformed property access
      .replace(/\.\s*,/g, '.')
      // Fix malformed bracket access
      .replace(/\[\s*,/g, '[')
      .replace(/\]\s*,/g, ']')
      // Fix malformed parentheses
      .replace(/\(\s*,/g, '(')
      .replace(/\)\s*,/g, ')')
      // Fix malformed braces
      .replace(/{\s*,/g, '{')
      .replace(/}\s*,/g, '}')
      // Fix malformed semicolons
      .replace(/;\s*,/g, ';')
      // Fix malformed colons
      .replace(/:\s*,/g, ':')
      // Fix malformed commas
      .replace(/,\s*,/g, ',')
      // Fix malformed periods
      .replace(/\.\s*,/g, '.')
      // Fix malformed question marks
      .replace(/\?\s*,/g, '?')
      // Fix malformed exclamation marks
      .replace(/!\s*,/g, '!')
      // Fix malformed at symbols
      .replace(/@\s*,/g, '@')
      // Fix malformed hash symbols
      .replace(/#\s*,/g, '#')
      // Fix malformed dollar signs
      .replace(/\$\s*,/g, '$')
      // Fix malformed percent signs
      .replace(/%\s*,/g, '%')
      // Fix malformed ampersands
      .replace(/&\s*,/g, '&')
      // Fix malformed asterisks
      .replace(/\*\s*,/g, '*')
      // Fix malformed plus signs
      .replace(/\+\s*,/g, '+')
      // Fix malformed minus signs
      .replace(/-\s*,/g, '-')
      // Fix malformed equals signs
      .replace(/=\s*,/g, '=')
      // Fix malformed pipe symbols
      .replace(/\|\s*,/g, '|')
      // Fix malformed backslashes
      .replace(/\\\s*,/g, '\\')
      // Fix malformed forward slashes
      .replace(/\/\s*,/g, '/')
      // Fix malformed backticks
      .replace(/`\s*,/g, '`')
      // Fix malformed single quotes
      .replace(/'\s*,/g, "'")
      // Fix malformed double quotes
      .replace(/"\s*,/g, '"')
      // Fix malformed angle brackets
      .replace(/<\s*,/g, '<')
      .replace(/>\s*,/g, '>')
      // Fix malformed square brackets
      .replace(/\[\s*,/g, '[')
      .replace(/\]\s*,/g, ']')
      // Fix malformed curly braces
      .replace(/{\s*,/g, '{')
      .replace(/}\s*,/g, '}')
      // Fix malformed parentheses
      .replace(/\(\s*,/g, '(')
      .replace(/\)\s*,/g, ')');

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

// Main execution
async function main() {
  console.log('🚀 Starting extra comma fix...');
  
  const srcDir = path.join(__dirname, 'src');
  const files = walkDir(srcDir);
  
  console.log(`📁 Found ${files.length} files to process`);
  
  let fixedCount = 0;
  
  // Fix all files
  for (const file of files) {
    if (fixFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`📊 Fixed ${fixedCount} files`);
  
  // Run TypeScript check to see improvement
  console.log('🔍 Running TypeScript check...');
  const { execSync } = await import('child_process');
  
  try {
    const result = execSync('npm run typecheck', { encoding: 'utf8', stdio: 'pipe' });
    console.log('✅ No TypeScript errors found!');
  } catch (error) {
    const output = error.stdout || error.stderr || error.message;
    console.log('⚠️  Some errors may still remain:');
    console.log(output);
  }
}

main().catch(console.error);
