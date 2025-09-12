#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing all portal lint errors...\n');

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
    
    // Fix 1: Remove unused React import
    content = content.replace(/import React, { useState } from 'react';/g, "import { useState } from 'react';");
    
    // Fix 2: Remove unused imports
    content = content.replace(/  User,\n/g, '');
    content = content.replace(/  TrendingDown,\n/g, '');
    content = content.replace(/  Clock,\n/g, '');
    
    // Fix 3: Fix duplicate imports
    content = content.replace(/  Activity,\n  Activity,\n/g, '  Activity,\n');
    content = content.replace(/  DollarSign,\n  DollarSign\n/g, '  DollarSign\n');
    content = content.replace(/  Settings,\n  Settings,\n/g, '  Settings,\n');
    
    // Fix 4: Fix RealTimePortalStatus import
    content = content.replace(
      /import { RealTimePortalStatus } from '\.\.\/\.\.\/\.\.\/components\/RealTimePortalStatus';/g,
      "import RealTimePortalStatus from '../../../components/RealTimePortalStatus';"
    );
    
    // Fix 5: Remove unused portal variable
    content = content.replace(/  const portal = \{\n    name: '[^']+',\n    colorScheme: '[^']+'\n  \};\n\n/g, '');
    
    // Fix 6: Add type annotations for function parameters
    content = content.replace(
      /const getStatusColor = \(type\) => \{/g,
      "const getStatusColor = (type: string) => {"
    );
    content = content.replace(
      /const getStatusIcon = \(type\) => \{/g,
      "const getStatusIcon = (type: string) => {"
    );
    
    fs.writeFileSync(filePath, content);
    fixedCount++;
    console.log(`✅ Fixed: ${filePath}`);
  }
}

console.log(`\n🎉 Portal lint fix complete!`);
console.log(`📊 Fixed ${fixedCount} portal files`);
console.log(`✨ All portal files should now be lint-free!`);
