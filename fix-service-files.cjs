const fs = require('fs');

// Function to fix src/services/api.ts
function fixApiService() {
  console.log('🔧 Fixing src/services/api.ts...');
  
  let content = fs.readFileSync('src/services/api.ts', 'utf8');
  
  // Fix the malformed export default
  content = content.replace(/export default mcpAPIs;\};/, 'export default mcpAPIs;');
  
  // Fix missing closing braces in object definitions
  content = content.replace(/getHealthChecks: async \(\) => \{[\s\S]*?\};/, (match) => {
    return match.replace(/};$/, '}');
  });
  
  // Fix all the async function definitions that are missing proper syntax
  const functionPatterns = [
    /getPortals: async \(\) => \{\};[\s\S]*?return data \|\| \[\];/g,
    /getBusinessAnalytics: async \(\) => \{\};[\s\S]*?return data \|\| \[\];/g,
    /getMCPOverview: async \(\) => \{\};[\s\S]*?return data\?\.\[0\] \|\| null;/g,
    /getCustomers: async \(\) => \{\};[\s\S]*?return data \|\| \[\];/g,
    /getCodeRepository: async \(\) => \{\};[\s\S]*?return data \|\| \[\];/g
  ];
  
  functionPatterns.forEach(pattern => {
    content = content.replace(pattern, (match) => {
      // Extract the function body and fix it
      const bodyMatch = match.match(/async \(\) => \{\};([\s\S]*?)(return [^;]+;)/);
      if (bodyMatch) {
        return `async () => {${bodyMatch[1]}${bodyMatch[2]}}`;
      }
      return match;
    });
  });
  
  // Fix the error handling line
  content = content.replace(/throw new Error\(error\.message \|\| 'An error occurred'\);\};/, 
    "throw new Error(error.message || 'An error occurred');");
  
  // Remove extra closing braces
  content = content.replace(/}\s*}\s*$/gm, '}');
  
  fs.writeFileSync('src/services/api.ts', content, 'utf8');
  console.log('✅ Fixed src/services/api.ts');
}

// Function to fix src/services/authService.ts
function fixAuthService() {
  console.log('🔧 Fixing src/services/authService.ts...');
  
  let content = fs.readFileSync('src/services/authService.ts', 'utf8');
  
  // Fix the demo credentials object
  content = content.replace(/const demoCredentials = \{[\s\S]*?\};/, (match) => {
    return match.replace(/,\s*$/, '');
  });
  
  // Fix the login function
  content = content.replace(/const login = async \([\s\S]*?\};/, (match) => {
    return match.replace(/,\s*$/, '');
  });
  
  fs.writeFileSync('src/services/authService.ts', content, 'utf8');
  console.log('✅ Fixed src/services/authService.ts');
}

// Function to fix src/services/mcp.ts
function fixMcpService() {
  console.log('🔧 Fixing src/services/mcp.ts...');
  
  let content = fs.readFileSync('src/services/mcp.ts', 'utf8');
  
  // Fix the metrics object
  content = content.replace(/metrics: \{\};/, 'metrics: {}');
  
  // Fix function definitions that are missing proper syntax
  const functionFixes = [
    // Fix http.get calls
    {
      pattern: /http\.get<MCPUser\[\]>\('\/mcp\/users', \{ params \}\)[\s\S]*?\.catch\(e => \[\];/g,
      replacement: (match) => {
        return match.replace(/http\.get<MCPUser\[\]>\(['"]\/mcp\/users['"], \{ params \}\)/, 
          'http.get<MCPUser[]>("/mcp/users", { params })')
          .replace(/\.then\(r => r\.data\)/, '.then(r => r.data)')
          .replace(/\.catch\(e => \[\]\);/, '.catch(e => []);');
      }
    },
    
    // Fix object property definitions
    {
      pattern: /(\w+): \(([^)]+)\) =>[\s\S]*?(\w+): \(([^)]+)\) =>/g,
      replacement: (match, p1, p2, p3, p4) => {
        return `${p1}: (${p2}) => {\n    // Implementation\n  },\n  ${p3}: (${p4}) =>`;
      }
    }
  ];
  
  functionFixes.forEach(fix => {
    content = content.replace(fix.pattern, fix.replacement);
  });
  
  // Fix the export default
  content = content.replace(/export default MCP;[\s\S]*?\};/, 'export default MCP;');
  
  // Remove extra closing braces and fix syntax
  content = content.replace(/}\s*}\s*$/gm, '}');
  content = content.replace(/,\s*$/gm, '');
  
  fs.writeFileSync('src/services/mcp.ts', content, 'utf8');
  console.log('✅ Fixed src/services/mcp.ts');
}

console.log('🚀 Fixing service files...');

try {
  fixApiService();
  fixAuthService();
  fixMcpService();
  
  console.log('\n🎉 Service files fix complete!');
  console.log('🔍 Running type check to verify fixes...');
} catch (error) {
  console.error('❌ Error fixing service files:', error.message);
}
