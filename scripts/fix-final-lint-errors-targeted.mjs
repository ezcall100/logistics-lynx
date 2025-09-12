#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing final lint errors with targeted approach...\n');

// Fix App-minimal.tsx
console.log('🔧 Fixing App-minimal.tsx...');
let content = fs.readFileSync('src/App-minimal.tsx', 'utf8');
content = content.replace(/import React from 'react';\n/, '');
fs.writeFileSync('src/App-minimal.tsx', content);
console.log('✅ Fixed App-minimal.tsx');

// Fix App-original.tsx
console.log('🔧 Fixing App-original.tsx...');
content = fs.readFileSync('src/App-original.tsx', 'utf8');
content = content.replace(/import { MCPProgressDashboard } from '\.\/pages\/MCPProgressDashboard'/, "import MCPProgressDashboard from './pages/MCPProgressDashboard'");
fs.writeFileSync('src/App-original.tsx', content);
console.log('✅ Fixed App-original.tsx');

// Fix RealTimePortalStatus.tsx
console.log('🔧 Fixing RealTimePortalStatus.tsx...');
content = fs.readFileSync('src/components/RealTimePortalStatus.tsx', 'utf8');
// Remove unused imports
content = content.replace(/  Play,\n/, '');
content = content.replace(/  Pause,\n/, '');
content = content.replace(/  RotateCcw,\n/, '');
content = content.replace(/  Zap,\n/, '');
// Remove unused variables
content = content.replace(/const \[isSystemActive, setIsSystemActive\] = useState\(false\);\n/, '');
fs.writeFileSync('src/components/RealTimePortalStatus.tsx', content);
console.log('✅ Fixed RealTimePortalStatus.tsx');

// Fix BusinessIntelligenceCenter.tsx - remove all unused imports
console.log('🔧 Fixing BusinessIntelligenceCenter.tsx...');
content = fs.readFileSync('src/components/super-admin/BusinessIntelligenceCenter.tsx', 'utf8');
// Remove all unused imports
const unusedImports = [
  'PieChart', 'LineChart', 'TrendingUp', 'TrendingDown', 'DollarSign', 'Users', 'Activity',
  'Zap', 'Settings', 'Filter', 'Search', 'Calendar', 'Clock', 'Globe', 'Database',
  'Server', 'Cpu', 'MemoryStick', 'Network', 'AlertTriangle', 'CheckCircle',
  'Maximize2', 'Minimize2', 'Play', 'Pause', 'RotateCcw', 'Power', 'PowerOff',
  'ExternalLink', 'Copy', 'Share', 'Star', 'StarOff', 'Heart', 'HeartOff', 'Bell', 'BellOff'
];

for (const importName of unusedImports) {
  content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
}

// Remove unused variables
content = content.replace(/const \[selectedMetric, setSelectedMetric\] = useState<BusinessMetric \| null>\(null\);\n/, '');
fs.writeFileSync('src/components/super-admin/BusinessIntelligenceCenter.tsx', content);
console.log('✅ Fixed BusinessIntelligenceCenter.tsx');

// Fix EnterpriseDashboard.tsx
console.log('🔧 Fixing EnterpriseDashboard.tsx...');
content = fs.readFileSync('src/components/super-admin/EnterpriseDashboard.tsx', 'utf8');
content = content.replace(/  X\n/, '');
fs.writeFileSync('src/components/super-admin/EnterpriseDashboard.tsx', content);
console.log('✅ Fixed EnterpriseDashboard.tsx');

// Fix MCPAgentOrchestrationCenter.tsx
console.log('🔧 Fixing MCPAgentOrchestrationCenter.tsx...');
content = fs.readFileSync('src/components/super-admin/MCPAgentOrchestrationCenter.tsx', 'utf8');
content = content.replace(/import React, { useState, useEffect } from 'react';/, "import React, { useState } from 'react';");
content = content.replace(/  LineChart\n/, '');
fs.writeFileSync('src/components/super-admin/MCPAgentOrchestrationCenter.tsx', content);
console.log('✅ Fixed MCPAgentOrchestrationCenter.tsx');

// Fix MCPAgentStatusDashboard.tsx
console.log('🔧 Fixing MCPAgentStatusDashboard.tsx...');
content = fs.readFileSync('src/components/super-admin/MCPAgentStatusDashboard.tsx', 'utf8');
content = content.replace(/import { useState, useEffect } from 'react';/, "import { useState } from 'react';");
content = content.replace(/  X\n/, '');
fs.writeFileSync('src/components/super-admin/MCPAgentStatusDashboard.tsx', content);
console.log('✅ Fixed MCPAgentStatusDashboard.tsx');

// Fix RoleBasedAccessControl.tsx
console.log('🔧 Fixing RoleBasedAccessControl.tsx...');
content = fs.readFileSync('src/components/super-admin/RoleBasedAccessControl.tsx', 'utf8');
content = content.replace(/import { useState, useEffect } from 'react';/, "import { useState } from 'react';");
content = content.replace(/const getRoleById = \(roleId: string\) => roles\.find\(role => role\.id === roleId\);\n/, '');
fs.writeFileSync('src/components/super-admin/RoleBasedAccessControl.tsx', content);
console.log('✅ Fixed RoleBasedAccessControl.tsx');

// Fix SystemHealthMonitor.tsx - remove duplicate Heart import
console.log('🔧 Fixing SystemHealthMonitor.tsx...');
content = fs.readFileSync('src/components/super-admin/SystemHealthMonitor.tsx', 'utf8');
// Remove the first Heart import
content = content.replace(/  Heart,\n/, '');
// Remove unused variable
content = content.replace(/const \[selectedAction, setSelectedAction\] = useState<HealingAction \| null>\(null\);\n/, '');
fs.writeFileSync('src/components/super-admin/SystemHealthMonitor.tsx', content);
console.log('✅ Fixed SystemHealthMonitor.tsx');

// Fix UltimateSuperAdminPortal.tsx
console.log('🔧 Fixing UltimateSuperAdminPortal.tsx...');
content = fs.readFileSync('src/pages/portals/super-admin/UltimateSuperAdminPortal.tsx', 'utf8');
content = content.replace(/const \[notifications, setNotifications\] = useState\(true\);\n/, '');
content = content.replace(/const \[theme, setTheme\] = useState<'dark' \| 'light'>\('dark'\);\n/, '');
fs.writeFileSync('src/pages/portals/super-admin/UltimateSuperAdminPortal.tsx', content);
console.log('✅ Fixed UltimateSuperAdminPortal.tsx');

console.log('\n🎉 All final lint errors fixed!');
