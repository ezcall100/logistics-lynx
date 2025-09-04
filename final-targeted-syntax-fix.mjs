import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Function to fix specific syntax errors found in the codebase
function fixSpecificSyntaxErrors(content) {
  let fixed = content;
  
  // Fix 1: Malformed destructuring assignments
  // Pattern: const [a b;] => const [a, b]
  fixed = fixed.replace(/const\s+\[([a-zA-Z0-9_$]+)\s*;\s*([a-zA-Z0-9_$]+)\]/g, 'const [$1, $2]');
  
  // Fix 2: Missing commas in object literals
  // Pattern: id: 1; name: 'User' => id: 1, name: 'User'
  fixed = fixed.replace(/(:[^,;]+);(\s*[a-zA-Z0-9_$]+:)/g, '$1,$2');
  
  // Fix 3: Remove extra closing braces in interfaces
  // Remove lines with only `},` or duplicate closing
  fixed = fixed.replace(/};/g, '}');
  
  // Fix 4: Fix malformed setTimeout calls
  // Pattern: setTimeout(() => setIsLoading(false) 1000)
  // Should be: setTimeout(() => setIsLoading(false), 1000)
  fixed = fixed.replace(/setTimeout\(([^,]+)\s([0-9]+)\)/g, 'setTimeout($1, $2)');
  
  // Fix 5: Normalize semicolons and commas
  // Pattern: trailing semicolons in objects
  fixed = fixed.replace(/;(\s*})/g, ',$1');
  
  // Fix 6: Fix malformed JSX syntax
  // Pattern: <$2/ButtonProps> => <ButtonProps>
  fixed = fixed.replace(/<\$2\/([^>]+)>/g, '<$1>');
  
  // Fix 7: Fix unterminated string literals
  // Pattern: "bg-white""" => "bg-white"
  fixed = fixed.replace(/"""/g, '"');
  fixed = fixed.replace(/''/g, "'");
  
  // Fix 8: Fix malformed function parameters
  // Pattern: (a b) => (a, b)
  fixed = fixed.replace(/\(([^)]+)\s+([^)]+)\)/g, '($1, $2)');
  
  // Fix 9: Fix malformed interface properties
  // Pattern: name: string;} => name: string;
  fixed = fixed.replace(/([^}]+);\}/g, '$1}');
  
  // Fix 10: Fix malformed object property assignments
  // Pattern: size = "md" """ => size = "md"
  fixed = fixed.replace(/=\s*"([^"]+)"""/g, '= "$1"');
  fixed = fixed.replace(/=\s*'([^']+)''/g, "= '$1'");
  
  // Fix 11: Fix malformed template literals
  // Pattern: `${baseClasses,} ${ => `${baseClasses} ${
  fixed = fixed.replace(/\$\{([^}]+),\}/g, '${$1}');
  
  // Fix 12: Fix malformed array access
  // Pattern: [iconName;] => [iconName]
  fixed = fixed.replace(/\[([^;\]]+);\]/g, '[$1]');
  
  // Fix 13: Fix malformed return statements
  // Pattern: return(<IconComponent) => return(<IconComponent
  fixed = fixed.replace(/return\(<([^>]+)\)/g, 'return(<$1');
  
  // Fix 14: Fix malformed conditional expressions
  // Pattern: loading | | disabled => loading || disabled
  fixed = fixed.replace(/\|\s*\|\s*/g, ' || ');
  
  // Fix 15: Fix malformed object property access
  // Pattern: variants[mode;] => variants[mode]
  fixed = fixed.replace(/\[([^;\]]+);\]/g, '[$1]');
  
  // Fix 16: Fix malformed function calls
  // Pattern: onClick = { => onClick={
  fixed = fixed.replace(/=\s*\{/g, '={');
  
  // Fix 17: Fix malformed JSX attributes
  // Pattern: className = " => className="
  fixed = fixed.replace(/=\s*"/g, '="');
  
  // Fix 18: Fix malformed interface declarations
  // Pattern: interface AgentData { } => interface AgentData {
  fixed = fixed.replace(/interface\s+([^{]+)\s*\{\s*\}\s*;/g, 'interface $1 {');
  
  // Fix 19: Fix malformed class declarations
  // Pattern: class Button { } => class Button {
  fixed = fixed.replace(/class\s+([^{]+)\s*\{\s*\}\s*;/g, 'class $1 {');
  
  // Fix 20: Fix malformed export statements
  // Pattern: export const Button: React.FC< => export const Button: React.FC<
  fixed = fixed.replace(/export\s+const\s+([^:]+):\s*React\.FC<\s*=\s*\(/g, 'export const $1: React.FC<$1Props> = ({');
  
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
  console.log('🔧 Starting FINAL targeted TypeScript syntax fix...');
  
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
    console.log('🎯 FINAL targeted TypeScript syntax fix completed!');
    
    // Run cleanup commands
    console.log('🧹 Running cleanup commands...');
    
    // Run Prettier
    try {
      const { execSync } = await import('child_process');
      execSync('npx prettier --write "src/**/*.{ts,tsx}"', { stdio: 'inherit' });
      console.log('✅ Prettier formatting completed');
    } catch (error) {
      console.log('⚠️ Prettier formatting failed, continuing...');
    }
    
    // Run ESLint
    try {
      const { execSync } = await import('child_process');
      execSync('npx eslint "src/**/*.{ts,tsx}" --fix', { stdio: 'inherit' });
      console.log('✅ ESLint fixes completed');
    } catch (error) {
      console.log('⚠️ ESLint fixes failed, continuing...');
    }
    
    // Final type check
    try {
      const { execSync } = await import('child_process');
      execSync('npm run typecheck', { stdio: 'inherit' });
      console.log('✅ TypeScript compilation successful!');
    } catch (error) {
      console.log('❌ TypeScript compilation still has errors');
      console.log('🔍 Manual review may be required for remaining issues');
    }
    
  } catch (error) {
    console.error('❌ Error during fix process:', error);
  }
}

// Run the fix
fixAllTypeScriptFiles();
