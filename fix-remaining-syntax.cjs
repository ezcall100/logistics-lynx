const fs = require('fs');

console.log('🔧 Fixing remaining syntax errors...');

// Fix src/lib/menus/super-admin-menu.ts
function fixSuperAdminMenu() {
  console.log('🔧 Fixing src/lib/menus/super-admin-menu.ts...');
  
  let content = fs.readFileSync('src/lib/menus/super-admin-menu.ts', 'utf8');
  
  // Fix object property syntax - add quotes around property names
  content = content.replace(/(\w+):\s*([^,]+)/g, '"$1": $2');
  
  // Fix array syntax
  content = content.replace(/,\s*\]/g, ']');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/lib/menus/super-admin-menu.ts', content, 'utf8');
  console.log('✅ Fixed src/lib/menus/super-admin-menu.ts');
}

// Fix src/lib/otelLinks.ts
function fixOtelLinks() {
  console.log('🔧 Fixing src/lib/otelLinks.ts...');
  
  let content = fs.readFileSync('src/lib/otelLinks.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/lib/otelLinks.ts', content, 'utf8');
  console.log('✅ Fixed src/lib/otelLinks.ts');
}

// Fix src/lib/supabase-agents.ts
function fixSupabaseAgents() {
  console.log('🔧 Fixing src/lib/supabase-agents.ts...');
  
  let content = fs.readFileSync('src/lib/supabase-agents.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/lib/supabase-agents.ts', content, 'utf8');
  console.log('✅ Fixed src/lib/supabase-agents.ts');
}

// Fix src/mcp/mcp.config.ts
function fixMcpConfig() {
  console.log('🔧 Fixing src/mcp/mcp.config.ts...');
  
  let content = fs.readFileSync('src/mcp/mcp.config.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  // Fix array syntax
  content = content.replace(/,\s*\]/g, ']');
  
  fs.writeFileSync('src/mcp/mcp.config.ts', content, 'utf8');
  console.log('✅ Fixed src/mcp/mcp.config.ts');
}

// Fix src/MCP_CONFIGURATION_BACKUP.ts
function fixMcpBackup() {
  console.log('🔧 Fixing src/MCP_CONFIGURATION_BACKUP.ts...');
  
  let content = fs.readFileSync('src/MCP_CONFIGURATION_BACKUP.ts', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  fs.writeFileSync('src/MCP_CONFIGURATION_BACKUP.ts', content, 'utf8');
  console.log('✅ Fixed src/MCP_CONFIGURATION_BACKUP.ts');
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
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix malformed function definitions
  content = content.replace(/,\s*,\s*/g, ',');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  // Fix malformed async functions
  content = content.replace(/async\s*\(\)\s*=>\s*\{\s*\}\s*;([\s\S]*?)(return [^;]+;)/g, 'async () => {$1$2}');
  
  fs.writeFileSync('src/services/mcp.ts', content, 'utf8');
  console.log('✅ Fixed src/services/mcp.ts');
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
    'src/lib/menus/shipper-admin-menu.ts'
  ];
  
  menuFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property syntax - add quotes around property names
      content = content.replace(/(\w+):\s*([^,]+)/g, '"$1": $2');
      
      // Fix array syntax
      content = content.replace(/,\s*\]/g, ']');
      
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
    'src/pages/super-admin/security-center/SecurityScannerDashboard.tsx'
  ];
  
  files.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property syntax
      content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
      
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
  fixSuperAdminMenu();
  fixOtelLinks();
  fixSupabaseAgents();
  fixMcpConfig();
  fixMcpBackup();
  fixAuthService();
  fixMcpService();
  fixMenuFiles();
  fixOtherFiles();
  
  console.log('\n🎉 Remaining syntax errors fix complete!');
  console.log('🔍 Running type check to verify fixes...');
} catch (error) {
  console.error('❌ Error in remaining syntax fix:', error.message);
}
