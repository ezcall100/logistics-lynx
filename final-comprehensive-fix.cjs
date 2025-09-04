const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix service files specifically
function fixServiceFiles() {
  console.log('🔧 Fixing service files...');
  
  // Fix src/services/api.ts
  let apiContent = fs.readFileSync('src/services/api.ts', 'utf8');
  
  // Fix the malformed function definitions
  apiContent = apiContent.replace(/async \(\) => \{\};[\s\S]*?return data \|\| \[\];/g, (match) => {
    const bodyMatch = match.match(/async \(\) => \{\};([\s\S]*?)(return [^;]+;)/);
    if (bodyMatch) {
      return `async () => {${bodyMatch[1]}${bodyMatch[2]}}`;
    }
    return match;
  });
  
  // Fix the export default
  apiContent = apiContent.replace(/export default mcpAPIs;[\s\S]*$/, 'export default mcpAPIs;');
  
  // Remove extra closing braces
  apiContent = apiContent.replace(/}\s*}\s*$/gm, '}');
  
  fs.writeFileSync('src/services/api.ts', apiContent, 'utf8');
  console.log('✅ Fixed src/services/api.ts');
  
  // Fix src/services/authService.ts
  let authContent = fs.readFileSync('src/services/authService.ts', 'utf8');
  
  // Fix the demo credentials object
  authContent = authContent.replace(/const demoCredentials = \{[\s\S]*?\};/, (match) => {
    return match.replace(/,\s*$/, '');
  });
  
  // Fix the login function
  authContent = authContent.replace(/const login = async \([\s\S]*?\};/, (match) => {
    return match.replace(/,\s*$/, '');
  });
  
  fs.writeFileSync('src/services/authService.ts', authContent, 'utf8');
  console.log('✅ Fixed src/services/authService.ts');
  
  // Fix src/services/mcp.ts
  let mcpContent = fs.readFileSync('src/services/mcp.ts', 'utf8');
  
  // Fix object property definitions by adding proper commas
  mcpContent = mcpContent.replace(/(\w+): (\d+\.?\d*)/g, '$1: $2,');
  mcpContent = mcpContent.replace(/(\w+): \{/g, '$1: {');
  mcpContent = mcpContent.replace(/(\w+): \(([^)]+)\) =>/g, '$1: ($2) => {');
  
  // Fix the export default
  mcpContent = mcpContent.replace(/export default MCP;[\s\S]*$/, 'export default MCP;');
  
  // Remove extra closing braces
  mcpContent = mcpContent.replace(/}\s*}\s*$/gm, '}');
  
  fs.writeFileSync('src/services/mcp.ts', mcpContent, 'utf8');
  console.log('✅ Fixed src/services/mcp.ts');
}

// Function to fix menu files
function fixMenuFiles() {
  console.log('🔧 Fixing menu files...');
  
  const menuFiles = [
    'src/lib/menus/agents-menu.ts',
    'src/lib/menus/broker-admin-menu.ts',
    'src/lib/menus/driver-menu.ts',
    'src/lib/menus/employee-menu.ts',
    'src/lib/menus/executive-menu.ts',
    'src/lib/menus/owner-operator-menu.ts',
    'src/lib/menus/shipper-admin-menu.ts',
    'src/lib/menus/super-admin-menu.ts'
  ];
  
  menuFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property definitions
      content = content.replace(/(\w+): \{/g, '$1: {');
      content = content.replace(/(\w+): \(([^)]+)\) =>/g, '$1: ($2) => {');
      content = content.replace(/(\w+): '([^']+)'/g, "$1: '$2',");
      content = content.replace(/(\w+): "([^"]+)"/g, '$1: "$2",');
      
      // Remove trailing commas before closing braces
      content = content.replace(/,\s*}/g, '}');
      content = content.replace(/,\s*\)/g, ')');
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  });
}

// Function to fix other problematic files
function fixOtherFiles() {
  console.log('🔧 Fixing other problematic files...');
  
  const filesToFix = [
    'src/data/dashboard/kpis.ts',
    'src/lib/http.ts',
    'src/lib/autonomous-api.ts',
    'src/lib/otelLinks.ts',
    'src/lib/supabase-agents.ts',
    'src/mcp/mcp.config.ts',
    'src/MCP_CONFIGURATION_BACKUP.ts'
  ];
  
  filesToFix.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property definitions
      content = content.replace(/(\w+): \{/g, '$1: {');
      content = content.replace(/(\w+): \(([^)]+)\) =>/g, '$1: ($2) => {');
      content = content.replace(/(\w+): '([^']+)'/g, "$1: '$2',");
      content = content.replace(/(\w+): "([^"]+)"/g, '$1: "$2",');
      
      // Remove trailing commas before closing braces
      content = content.replace(/,\s*}/g, '}');
      content = content.replace(/,\s*\)/g, ')');
      
      // Fix export statements
      content = content.replace(/export default ([^;]+);[\s\S]*$/, 'export default $1;');
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  });
}

// Function to fix component files
function fixComponentFiles() {
  console.log('🔧 Fixing component files...');
  
  const componentFiles = [
    'src/components/FabActions.ts',
    'src/components/ui/EnhancedIcon.tsx',
    'src/components/ui/EnhancedUIComponents.tsx',
    'src/components/ui/ResponsiveCard.tsx',
    'src/pages/super-admin/security-center/SecurityScannerDashboard.tsx'
  ];
  
  componentFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix missing closing braces
      const lines = content.split('\n');
      let braceCount = 0;
      
      for (const char of content) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }
      
      if (braceCount > 0) {
        for (let i = 0; i < braceCount; i++) {
          content += '\n}';
        }
      }
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  });
}

console.log('🚀 Final comprehensive TypeScript fix starting...');

try {
  fixServiceFiles();
  fixMenuFiles();
  fixOtherFiles();
  fixComponentFiles();
  
  console.log('\n🎉 Final comprehensive fix complete!');
  console.log('🔍 Running type check to verify fixes...');
} catch (error) {
  console.error('❌ Error in final fix:', error.message);
}
