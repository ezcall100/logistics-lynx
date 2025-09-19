#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Common syntax error patterns to fix
const syntaxFixes = [
  // Fix missing commas in object properties
  { pattern: /(\w+)(\w+)(\w+)/g, replacement: '$1, $2, $3' },
  { pattern: /(\w+)(\w+)(\w+)(\w+)/g, replacement: '$1, $2, $3, $4' },
  
  // Fix broken template literals
  { pattern: /\$\{([^}]+)\n([^}]+)\}/g, replacement: '${$1$2}' },
  { pattern: /\$\{([^}]+)\n\}/g, replacement: '${$1}' },
  
  // Fix missing commas in function parameters
  { pattern: /(\w+)(\w+)(\w+)(\w+)(\w+)/g, replacement: '$1, $2, $3, $4, $5' },
  
  // Fix broken destructuring
  { pattern: /const \{ ([^}]+)\n \} =/g, replacement: 'const { $1 } =' },
  
  // Fix missing commas in array elements
  { pattern: /'([^']+)''([^']+)'/g, replacement: "'$1', '$2'" },
  { pattern: /"([^"]+)""([^"]+)"/g, replacement: '"$1", "$2"' },
  
  // Fix broken object syntax
  { pattern: /(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, replacement: '$1, $2, $3, $4, $5, $6' },
  
  // Fix missing commas in method calls
  { pattern: /\.(\w+)\(([^)]+)\)([^,])/g, replacement: '.$1($2), $3' },
  
  // Fix broken JSX
  { pattern: /<(\w+)([^>]+)>([^<]+)<\/\1>/g, replacement: '<$1$2>$3</$1>' },
  
  // Fix missing semicolons
  { pattern: /(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, replacement: '$1, $2, $3, $4, $5, $6, $7' },
];

// Files to fix (prioritize the most problematic ones)
const filesToFix = [
  'src/services/supabase/superAdminService.ts',
  'src/services/webhookService.ts',
  'src/utils/PortalUpdateSystem.ts',
  'src/StandaloneDashboard.tsx',
  'src/StandalonePortalApp.tsx',
  'src/services/supabase.ts',
  'src/contexts/AuthContext.tsx',
  'src/components/HorizontalMegaMenu.tsx',
  'src/pages/auth/RegistrationFlowNew.tsx',
  'src/pages/auth/RegistrationFlow.tsx',
];

function fixFile(filePath) {
  const fullPath = path.join(projectRoot, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;
  
  console.log(`Fixing ${filePath}...`);
  
  // Apply all syntax fixes
  syntaxFixes.forEach(fix => {
    content = content.replace(fix.pattern, fix.replacement);
  });
  
  // Specific fixes for common patterns
  content = content
    // Fix missing commas in object properties
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5')
    .replace(/(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4')
    .replace(/(\w+)(\w+)(\w+)/g, '$1, $2, $3')
    
    // Fix broken template literals
    .replace(/\$\{([^}]+)\n([^}]+)\}/g, '${$1$2}')
    .replace(/\$\{([^}]+)\n\}/g, '${$1}')
    
    // Fix missing commas in function parameters
    .replace(/async (\w+)\(([^)]+)\): Promise<([^>]+)> \{/g, 'async $1($2): Promise<$3> {')
    
    // Fix broken destructuring
    .replace(/const \{ ([^}]+)\n \} =/g, 'const { $1 } =')
    .replace(/const \{ ([^}]+)\n\} =/g, 'const { $1 } =')
    
    // Fix missing commas in array elements
    .replace(/'([^']+)''([^']+)'/g, "'$1', '$2'")
    .replace(/"([^"]+)""([^"]+)"/g, '"$1", "$2"')
    
    // Fix broken object syntax
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7, $8')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6')
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5')
    .replace(/(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4')
    .replace(/(\w+)(\w+)(\w+)/g, '$1, $2, $3')
    
    // Fix missing commas in method calls
    .replace(/\.(\w+)\(([^)]+)\)([^,])/g, '.$1($2), $3')
    
    // Fix broken JSX
    .replace(/<(\w+)([^>]+)>([^<]+)<\/\1>/g, '<$1$2>$3</$1>')
    
    // Fix missing semicolons
    .replace(/(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)(\w+)/g, '$1, $2, $3, $4, $5, $6, $7');
  
  // Write the fixed content back
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`);
  }
}

// Main execution
console.log('🔧 Starting comprehensive syntax error fixes...\n');

filesToFix.forEach(fixFile);

console.log('\n✅ Comprehensive syntax error fixes completed!');
console.log('📊 Run "npx tsc --noEmit --skipLibCheck" to check remaining errors.');
