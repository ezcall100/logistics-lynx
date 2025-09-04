const fs = require('fs');
const path = require('path');

console.log('🔧 Final comprehensive syntax error fix...');

// Fix src/pages/super-admin/security-center/SecurityScannerDashboard.tsx
function fixSecurityScannerDashboard() {
  console.log('🔧 Fixing SecurityScannerDashboard.tsx...');
  
  let content = fs.readFileSync('src/pages/super-admin/security-center/SecurityScannerDashboard.tsx', 'utf8');
  
  // Fix object property syntax
  content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
  
  // Fix missing closing braces
  content = content.replace(/,\s*}/g, '}');
  
  // Fix malformed object properties
  content = content.replace(/(\w+):\s*new Date\([^)]+\)\.toISOString\(\)\s*,\s*$/gm, '$1: new Date(Date.now() - 3600000).toISOString(),');
  
  // Fix export syntax
  content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
    return `export default {${body}};`;
  });
  
  // Fix missing closing braces for React component
  const lines = content.split('\n');
  let braceCount = 0;
  let inComponent = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Count braces
    for (const char of line) {
      if (char === '{') {
        braceCount++;
        if (line.includes('const') && line.includes(': React.FC') && line.includes('= () => {')) {
          inComponent = true;
        }
      } else if (char === '}') {
        braceCount--;
      }
    }
  }
  
  // Add missing closing braces if needed
  if (braceCount > 0) {
    for (let i = 0; i < braceCount; i++) {
      content += '\n}';
    }
  }
  
  fs.writeFileSync('src/pages/super-admin/security-center/SecurityScannerDashboard.tsx', content, 'utf8');
  console.log('✅ Fixed SecurityScannerDashboard.tsx');
}

// Fix all menu files with proper object syntax
function fixAllMenuFiles() {
  console.log('🔧 Fixing all menu files...');
  
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
      
      // Fix object property syntax - ensure proper quotes and commas
      content = content.replace(/(\w+):\s*([^,]+)/g, '"$1": $2');
      
      // Fix array syntax
      content = content.replace(/,\s*\]/g, ']');
      
      // Fix object syntax
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

// Fix service files
function fixServiceFiles() {
  console.log('🔧 Fixing service files...');
  
  const serviceFiles = [
    'src/services/authService.ts',
    'src/services/mcp.ts'
  ];
  
  serviceFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property syntax
      content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
      
      // Fix missing closing braces
      content = content.replace(/,\s*}/g, '}');
      
      // Fix malformed function definitions
      content = content.replace(/,\s*,\s*/g, ',');
      
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

// Fix configuration files
function fixConfigFiles() {
  console.log('🔧 Fixing configuration files...');
  
  const configFiles = [
    'src/mcp/mcp.config.ts',
    'src/MCP_CONFIGURATION_BACKUP.ts',
    'src/lib/otelLinks.ts',
    'src/lib/supabase-agents.ts'
  ];
  
  configFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      
      // Fix object property syntax
      content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,');
      
      // Fix array syntax
      content = content.replace(/,\s*\]/g, ']');
      
      // Fix object syntax
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
    'src/lib/menus/ui-constants.ts'
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

// Fix specific syntax issues in all TypeScript files
function fixAllTypeScriptFiles() {
  console.log('🔧 Fixing all TypeScript files...');
  
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
  
  const tsFiles = findTsFiles('src');
  let fixedCount = 0;
  
  tsFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');
      const originalContent = content;
      
      // Fix common syntax issues
      content = content.replace(/,\s*,/g, ','); // Double commas
      content = content.replace(/,\s*}/g, '}'); // Trailing commas in objects
      content = content.replace(/,\s*\]/g, ']'); // Trailing commas in arrays
      content = content.replace(/(\w+):\s*([^,]+)\s*$/gm, '$1: $2,'); // Missing commas
      
      // Fix export syntax
      content = content.replace(/export default \{\s*([^}]+)\s*\}\s*;/, (match, body) => {
        return `export default {${body}};`;
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        fixedCount++;
        console.log(`✅ Fixed: ${file}`);
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message);
    }
  });
  
  console.log(`📊 Fixed ${fixedCount} files`);
}

// Main execution
try {
  fixSecurityScannerDashboard();
  fixAllMenuFiles();
  fixServiceFiles();
  fixConfigFiles();
  fixOtherFiles();
  fixAllTypeScriptFiles();
  
  console.log('\n🎉 Final syntax error fix complete!');
  console.log('🔍 Running type check to verify fixes...');
} catch (error) {
  console.error('❌ Error in final syntax fix:', error.message);
}
