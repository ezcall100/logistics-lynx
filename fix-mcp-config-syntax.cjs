const fs = require('fs');

console.log('🔧 Fixing MCP configuration and service file syntax errors...');

// Fix src/mcp/mcp.config.ts
function fixMcpConfig() {
  console.log('🔧 Fixing src/mcp/mcp.config.ts...');
  
  let content = fs.readFileSync('src/mcp/mcp.config.ts', 'utf8');
  
  // Fix double commas in object properties
  content = content.replace(/,\s*,/g, ',');
  
  // Fix missing closing braces in object definitions
  content = content.replace(/,\s*}/g, '}');
  
  // Fix malformed object properties with double commas
  content = content.replace(/(\w+):\s*([^,]+),\s*,/g, '$1: $2,');
  
  // Fix export default syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  // Fix array syntax issues
  content = content.replace(/,\s*\]/g, ']');
  
  // Fix object property assignments
  content = content.replace(/(\w+):\s*([^,]+),\s*}/g, '$1: $2}');
  
  fs.writeFileSync('src/mcp/mcp.config.ts', content, 'utf8');
  console.log('✅ Fixed src/mcp/mcp.config.ts');
}

// Fix src/services/authService.ts
function fixAuthService() {
  console.log('🔧 Fixing src/services/authService.ts...');
  
  let content = fs.readFileSync('src/services/authService.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*\{([^}]+)\s*,\s*}/g, '$1: {$2}');
  
  // Fix missing semicolons
  content = content.replace(/(\w+):\s*([^,]+)\s*,\s*$/gm, '$1: $2,');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/services/authService.ts', content, 'utf8');
  console.log('✅ Fixed src/services/authService.ts');
}

// Fix src/services/mcp.ts
function fixMcpService() {
  console.log('🔧 Fixing src/services/mcp.ts...');
  
  let content = fs.readFileSync('src/services/mcp.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*\{([^}]+)\s*,\s*}/g, '$1: {$2}');
  
  // Fix malformed function definitions
  content = content.replace(/,\s*,\s*/g, ',');
  
  // Fix missing commas in object properties
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  // Fix malformed async functions
  content = content.replace(/async\s*\(\)\s*=>\s*\{\s*\}\s*;([\s\S]*?)(return [^;]+;)/g, 'async () => {$1$2}');
  
  fs.writeFileSync('src/services/mcp.ts', content, 'utf8');
  console.log('✅ Fixed src/services/mcp.ts');
}

// Fix src/MCP_CONFIGURATION_BACKUP.ts
function fixMcpBackup() {
  console.log('🔧 Fixing src/MCP_CONFIGURATION_BACKUP.ts...');
  
  let content = fs.readFileSync('src/MCP_CONFIGURATION_BACKUP.ts', 'utf8');
  
  // Fix double commas
  content = content.replace(/,\s*,/g, ',');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+),\s*}/g, '$1: $2}');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/MCP_CONFIGURATION_BACKUP.ts', content, 'utf8');
  console.log('✅ Fixed src/MCP_CONFIGURATION_BACKUP.ts');
}

// Fix menu files
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
      
      // Fix double commas
      content = content.replace(/,\s*,/g, ',');
      
      // Fix object property syntax
      content = content.replace(/(\w+):\s*\{([^}]+)\s*,\s*}/g, '$1: {$2}');
      
      // Fix export syntax
      content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
        return `export default {${body}};`;
      });
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  });
}

// Fix other problematic files
function fixOtherFiles() {
  console.log('🔧 Fixing other problematic files...');
  
  const files = [
    'src/components/FabActions.ts',
    'src/components/ui/EnhancedIcon.tsx',
    'src/components/ui/EnhancedUIComponents.tsx',
    'src/components/ui/ResponsiveCard.tsx',
    'src/config/mcp-routing-config.ts',
    'src/context/role/role-context.ts',
    'src/data/dashboard/kpis.ts',
    'src/integrations/supabase/types.ts',
    'src/lib/autonomous-api.ts',
    'src/lib/http.ts',
    'src/lib/menus/ui-constants.ts',
    'src/lib/otelLinks.ts',
    'src/lib/supabase-agents.ts',
    'src/pages/super-admin/security-center/SecurityScannerDashboard.tsx'
  ];
  
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix double commas
      content = content.replace(/,\s*,/g, ',');
      
      // Fix object property syntax
      content = content.replace(/(\w+):\s*\{([^}]+)\s*,\s*}/g, '$1: {$2}');
      
      // Fix missing closing braces
      content = content.replace(/,\s*}/g, '}');
      
      // Fix export syntax
      content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
        return `export default {${body}};`;
      });
      
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed ${file}`);
    } catch (error) {
      console.log(`❌ Error fixing ${file}:`, error.message);
    }
  });
}

// Main execution
try {
  fixMcpConfig();
  fixAuthService();
  fixMcpService();
  fixMcpBackup();
  fixMenuFiles();
  fixOtherFiles();
  
  console.log('\n🎉 MCP configuration and service files fix complete!');
  console.log('🔍 Running type check to verify fixes...');
} catch (error) {
  console.error('❌ Error in MCP configuration fix:', error.message);
}
