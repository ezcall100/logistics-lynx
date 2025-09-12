#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing ESLint ban-types errors ({} types)...\n');

// Files that might have {} type issues
const filesToCheck = [
  'src/components/super-admin/EnterpriseDashboard.tsx',
  'src/components/super-admin/MCPAgentStatusDashboard.tsx', 
  'src/components/super-admin/RoleBasedAccessControl.tsx',
  'src/components/super-admin/BusinessIntelligenceCenter.tsx',
  'src/components/super-admin/SecurityWarRoom.tsx',
  'src/components/super-admin/SystemHealthMonitor.tsx',
  'src/components/super-admin/MCPAgentOrchestrationCenter.tsx'
];

let totalFixed = 0;

for (const filePath of filesToCheck) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  console.log(`🔧 Checking: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  // Fix React.ComponentType<{}> to React.ComponentType<Record<string, never>>
  const beforeCount = (content.match(/React\.ComponentType<{}>/g) || []).length;
  content = content.replace(/React\.ComponentType<{}>/g, 'React.ComponentType<Record<string, never>>');
  const afterCount = (content.match(/React\.ComponentType<{}>/g) || []).length;
  fixed += (beforeCount - afterCount);

  // Fix other {} types to Record<string, never>
  const beforeCount2 = (content.match(/<{}>/g) || []).length;
  content = content.replace(/<{}>/g, '<Record<string, never>>');
  const afterCount2 = (content.match(/<{}>/g) || []).length;
  fixed += (beforeCount2 - afterCount2);

  // Fix standalone {} types
  const beforeCount3 = (content.match(/\b{}\b/g) || []).length;
  content = content.replace(/\b{}\b/g, 'Record<string, never>');
  const afterCount3 = (content.match(/\b{}\b/g) || []).length;
  fixed += (beforeCount3 - afterCount3);

  if (fixed > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${fixed} issues in ${filePath}`);
  } else {
    console.log(`✅ No issues found in ${filePath}`);
  }
  
  totalFixed += fixed;
}

console.log(`\n🎉 ESLint ban-types fix complete!`);
console.log(`📊 Total issues fixed: ${totalFixed}`);
console.log(`📁 Files processed: ${filesToCheck.length}`);

console.log('\n✨ All ESLint ban-types errors should now be fixed!');
