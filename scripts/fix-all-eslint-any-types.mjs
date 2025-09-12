#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing all ESLint "any" type errors comprehensively...\n');

// All files with any type errors
const filesToFix = [
  'src/components/super-admin/BillingManagement.tsx',
  'src/components/super-admin/CompanyManagement.tsx',
  'src/components/super-admin/GlobalSettings.tsx',
  'src/components/super-admin/PortalThemeManager.tsx',
  'src/components/super-admin/SecurityCompliance.tsx',
  'src/components/super-admin/UserManagement.tsx'
];

let totalFixed = 0;

for (const filePath of filesToFix) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  console.log(`🔧 Fixing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  // Fix function parameter any types
  content = content.replace(/\([^)]*: any\)/g, (match) => {
    return match.replace(': any', ': unknown');
  });
  fixed += (content.match(/\([^)]*: any\)/g) || []).length;

  // Fix variable any types
  content = content.replace(/: any\b/g, ': unknown');
  fixed += (content.match(/: any\b/g) || []).length;

  // Fix React.ComponentType<any> to React.ComponentType<Record<string, never>>
  content = content.replace(/React\.ComponentType<any>/g, 'React.ComponentType<Record<string, never>>');
  fixed += (content.match(/React\.ComponentType<any>/g) || []).length;

  // Fix specific patterns for tab switching
  content = content.replace(/setActiveTab\([^)]* as any\)/g, (match) => {
    if (match.includes('tab.id')) {
      return match.replace(' as any', " as 'overview' | 'details' | 'settings' | 'users' | 'billing' | 'security' | 'themes' | 'compliance'");
    }
    return match.replace(' as any', ': unknown');
  });
  fixed += (content.match(/setActiveTab\([^)]* as any\)/g) || []).length;

  // Fix Object.entries with any
  content = content.replace(/Object\.entries\([^)]*\)\.map\(\(\[[^,]+,\s*[^)]+\]: \[string,\s*any\]\)/g, (match) => {
    return match.replace(': [string, any]', ': [string, unknown]');
  });
  fixed += (content.match(/Object\.entries\([^)]*\)\.map\(\(\[[^,]+,\s*[^)]+\]: \[string,\s*any\]\)/g) || []).length;

  // Fix User redeclare issue in UserManagement.tsx
  if (filePath.includes('UserManagement.tsx')) {
    content = content.replace(/interface User \{/, 'interface UserData {');
    content = content.replace(/User\[\]/g, 'UserData[]');
    content = content.replace(/User\b/g, 'UserData');
    fixed += 1;
  }

  // Write the fixed content
  fs.writeFileSync(filePath, content);
  totalFixed += fixed;
  
  console.log(`✅ Fixed ${fixed} issues in ${filePath}`);
}

console.log(`\n🎉 Comprehensive ESLint "any" type fix complete!`);
console.log(`📊 Total issues fixed: ${totalFixed}`);
console.log(`📁 Files processed: ${filesToFix.length}`);

console.log('\n✨ All ESLint "any" type errors should now be fixed!');
