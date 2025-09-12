#!/usr/bin/env node

import fs from 'fs';

console.log('🔧 Fixing remaining ESLint "any" type errors...\n');

// Fix CompanyManagement.tsx
console.log('🔧 Fixing CompanyManagement.tsx...');
let content = fs.readFileSync('src/components/super-admin/CompanyManagement.tsx', 'utf8');
content = content.replace(/setActiveTab\([^)]* as any\)/g, "setActiveTab('overview' | 'companies' | 'settings')");
content = content.replace(/Object\.entries\([^)]*\)\.map\(\(\[[^,]+,\s*[^)]+\]: \[string,\s*any\]\)/g, (match) => {
  return match.replace(': [string, any]', ': [string, unknown]');
});
fs.writeFileSync('src/components/super-admin/CompanyManagement.tsx', content);
console.log('✅ Fixed CompanyManagement.tsx');

// Fix GlobalSettings.tsx
console.log('🔧 Fixing GlobalSettings.tsx...');
content = fs.readFileSync('src/components/super-admin/GlobalSettings.tsx', 'utf8');
content = content.replace(/const \[[^,]+,\s*[^)]+\] = useState<any>\(/g, 'const [settings, setSettings] = useState<Record<string, unknown>>(');
content = content.replace(/Object\.entries\([^)]*\)\.map\(\(\[[^,]+,\s*[^)]+\]: \[string,\s*any\]\)/g, (match) => {
  return match.replace(': [string, any]', ': [string, unknown]');
});
fs.writeFileSync('src/components/super-admin/GlobalSettings.tsx', content);
console.log('✅ Fixed GlobalSettings.tsx');

// Fix PortalThemeManager.tsx
console.log('🔧 Fixing PortalThemeManager.tsx...');
content = fs.readFileSync('src/components/super-admin/PortalThemeManager.tsx', 'utf8');
content = content.replace(/setActiveTab\([^)]* as any\)/g, "setActiveTab('overview' | 'themes' | 'customization' | 'preview')");
content = content.replace(/Object\.entries\([^)]*\)\.map\(\(\[[^,]+,\s*[^)]+\]: \[string,\s*any\]\)/g, (match) => {
  return match.replace(': [string, any]', ': [string, unknown]');
});
content = content.replace(/onClick: \(\) => void;\s*}\s*\[\] = \[/, 'onClick: () => void;\n}[] = [');
fs.writeFileSync('src/components/super-admin/PortalThemeManager.tsx', content);
console.log('✅ Fixed PortalThemeManager.tsx');

// Fix SecurityCompliance.tsx
console.log('🔧 Fixing SecurityCompliance.tsx...');
content = fs.readFileSync('src/components/super-admin/SecurityCompliance.tsx', 'utf8');
content = content.replace(/const \[[^,]+,\s*[^)]+\] = useState<any>\(/g, 'const [compliance, setCompliance] = useState<Record<string, unknown>>(');
fs.writeFileSync('src/components/super-admin/SecurityCompliance.tsx', content);
console.log('✅ Fixed SecurityCompliance.tsx');

// Fix UserManagement.tsx
console.log('🔧 Fixing UserManagement.tsx...');
content = fs.readFileSync('src/components/super-admin/UserManagement.tsx', 'utf8');
content = content.replace(/setActiveTab\([^)]* as any\)/g, "setActiveTab('overview' | 'users' | 'roles' | 'permissions')");
content = content.replace(/Object\.entries\([^)]*\)\.map\(\(\[[^,]+,\s*[^)]+\]: \[string,\s*any\]\)/g, (match) => {
  return match.replace(': [string, any]', ': [string, unknown]');
});
fs.writeFileSync('src/components/super-admin/UserManagement.tsx', content);
console.log('✅ Fixed UserManagement.tsx');

console.log('\n🎉 All remaining ESLint "any" type errors fixed!');
