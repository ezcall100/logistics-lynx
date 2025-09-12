#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing JSX syntax errors in all portal files...\n');

// Get all portal files
const portalDirs = [
  'analytics', 'autonomous', 'broker', 'carrier', 'communication', 'compliance',
  'crm', 'customer', 'developer', 'directory', 'dispatch', 'document', 'driver',
  'financial', 'fleet', 'fuel', 'human-developer-admin', 'insurance', 'integration-admin',
  'loadboard', 'maintenance', 'marketplace', 'mcp-agent-admin', 'monitoring-admin',
  'partner', 'rates', 'reporting', 'security-admin', 'shipper', 'super-admin',
  'system-admin', 'track', 'warehouse', 'yms'
];

let fixedCount = 0;

for (const dir of portalDirs) {
  const files = fs.readdirSync(`src/pages/portals/${dir}/`);
  const portalFile = files.find(f => f.endsWith('.tsx'));
  
  if (portalFile) {
    const filePath = `src/pages/portals/${dir}/${portalFile}`;
    console.log(`🔧 Fixing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix template literal syntax in JSX
    content = content.replace(/className={\`([^`]+)\`}/g, (match, className) => {
      // Replace template literals with proper JSX expressions
      let fixed = className
        .replace(/\$\{([^}]+)\}/g, '${$1}') // Keep template literals but fix syntax
        .replace(/\\\`/g, '`') // Fix escaped backticks
        .replace(/\\\$/g, '$'); // Fix escaped dollar signs
      
      return `className={\`${fixed}\`}`;
    });
    
    // Fix specific problematic patterns
    content = content.replace(/className=\{\`([^`]*\$\{[^}]+\}[^`]*)\`\}/g, (match, className) => {
      // Convert template literals to proper JSX expressions
      const parts = className.split(/(\$\{[^}]+\})/);
      const jsxParts = parts.map(part => {
        if (part.startsWith('${') && part.endsWith('}')) {
          return part.slice(2, -1); // Remove ${ and }
        }
        return `"${part}"`;
      });
      
      return `className={\`${className}\`}`;
    });
    
    // Fix specific syntax issues
    content = content.replace(/className=\{\`([^`]*)\$\{([^}]+)\}([^`]*)\`\}/g, 'className={`$1${$2}$3`}');
    
    // Fix the specific problematic lines
    content = content.replace(
      /className=\{\`text-sm font-medium \$\{metric\.changeType === 'increase' \? 'text-green-600' : 'text-red-600'\}\`\}/g,
      'className={`text-sm font-medium ${metric.changeType === \'increase\' ? \'text-green-600\' : \'text-red-600\'}`}'
    );
    
    content = content.replace(
      /className=\{\`p-3 rounded-lg \$\{metric\.bgColor\}\`\}/g,
      'className={`p-3 rounded-lg ${metric.bgColor}`}'
    );
    
    content = content.replace(
      /className=\{\`h-6 w-6 \$\{metric\.color\}\`\}/g,
      'className={`h-6 w-6 ${metric.color}`}'
    );
    
    content = content.replace(
      /className=\{\`py-4 px-1 border-b-2 font-medium text-sm \$\{activeTab === tab\.toLowerCase\(\) \? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'\}\`\}/g,
      'className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.toLowerCase() ? \'border-blue-500 text-blue-600\' : \'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300\'}`}'
    );
    
    content = content.replace(
      /className=\{\`h-2 rounded-full \$\{item\.color\}\`\}/g,
      'className={`h-2 rounded-full ${item.color}`}'
    );
    
    content = content.replace(
      /style=\{\{ width: \`\$\{item\.value\}\%\` \}\}/g,
      'style={{ width: `${item.value}%` }}'
    );
    
    content = content.replace(
      /className=\{\`p-2 rounded-lg \$\{getStatusColor\(activity\.type\)\}\`\}/g,
      'className={`p-2 rounded-lg ${getStatusColor(activity.type)}`}'
    );
    
    // Fix the specific problematic conditional expressions
    content = content.replace(
      /className=\{\`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors \$\{activeTab === item\.id \? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'\}\`\}/g,
      'className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id ? \'bg-blue-50 text-blue-700 border-r-2 border-blue-700\' : \'text-gray-600 hover:bg-gray-50 hover:text-gray-900\'}`}'
    );
    
    fs.writeFileSync(filePath, content);
    fixedCount++;
    console.log(`✅ Fixed: ${filePath}`);
  }
}

console.log(`\n🎉 JSX syntax fix complete!`);
console.log(`📊 Fixed ${fixedCount} portal files`);
console.log(`✨ All portal files should now have proper JSX syntax!`);
