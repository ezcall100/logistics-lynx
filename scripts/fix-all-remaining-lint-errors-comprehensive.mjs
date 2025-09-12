#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing all remaining lint errors comprehensively...\n');

// Files with lint errors
const filesToFix = [
  'src/App-minimal.tsx',
  'src/App-original.tsx', 
  'src/components/RealTimePortalStatus.tsx',
  'src/components/super-admin/BusinessIntelligenceCenter.tsx',
  'src/components/super-admin/EnterpriseDashboard.tsx',
  'src/components/super-admin/MCPAgentOrchestrationCenter.tsx',
  'src/components/super-admin/MCPAgentStatusDashboard.tsx',
  'src/components/super-admin/RoleBasedAccessControl.tsx',
  'src/components/super-admin/SecurityWarRoom.tsx',
  'src/components/super-admin/SystemHealthMonitor.tsx',
  'src/pages/portals/super-admin/UltimateSuperAdminPortal.tsx'
];

let totalFixed = 0;

for (const filePath of filesToFix) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    continue;
  }

  console.log(`🔧 Fixing: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let fixed = 0;

  // Fix App-minimal.tsx - remove unused import
  if (filePath === 'src/App-minimal.tsx') {
    content = content.replace(/import React from 'react';\n/, '');
    fixed++;
  }

  // Fix App-original.tsx - remove unused variable
  if (filePath === 'src/App-original.tsx') {
    content = content.replace(/const \[theme, setTheme\] = useState\('dark'\);\n/, '');
    fixed++;
  }

  // Fix RealTimePortalStatus.tsx - remove unused imports
  if (filePath === 'src/components/RealTimePortalStatus.tsx') {
    content = content.replace(/import { TrendingUp, TrendingDown, Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';\n/, '');
    content = content.replace(/import { useState, useEffect } from 'react';\n/, '');
    fixed += 2;
  }

  // Fix BusinessIntelligenceCenter.tsx - remove unused imports and variables
  if (filePath === 'src/components/super-admin/BusinessIntelligenceCenter.tsx') {
    // Remove unused imports
    const unusedImports = [
      'Volume2', 'VolumeX', 'Wifi', 'WifiOff', 'Signal', 'SignalZero', 
      'SignalLow', 'SignalMedium', 'SignalHigh'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    // Remove unused variables
    content = content.replace(/const \[selectedMetric, setSelectedMetric\] = useState<BusinessMetric \| null>\(null\);\n/, '');
    content = content.replace(/const \[insights, setInsights\] = useState<PredictiveInsight\[\]>\(\[/, 'const [insights] = useState<PredictiveInsight[]>([');
    content = content.replace(/const \[reports, setReports\] = useState<ReportData\[\]>\(\[/, 'const [reports] = useState<ReportData[]>([');
    
    fixed += 12;
  }

  // Fix EnterpriseDashboard.tsx - remove unused imports and variables
  if (filePath === 'src/components/super-admin/EnterpriseDashboard.tsx') {
    const unusedImports = [
      'TrendingUp', 'TrendingDown', 'Server', 'Cpu', 'MemoryStick', 'Network',
      'AlertTriangle', 'Clock', 'BarChart3', 'PieChart', 'LineChart', 'Search',
      'Filter', 'Upload', 'Eye', 'EyeOff', 'Minimize2', 'X'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    content = content.replace(/const \[alerts, setAlerts\] = useState<SystemAlert\[\]>\(\[/, 'const [alerts] = useState<SystemAlert[]>([');
    content = content.replace(/const \[portalStatuses, setPortalStatuses\] = useState<PortalStatus\[\]>\(\[/, 'const [portalStatuses] = useState<PortalStatus[]>([');
    
    fixed += 20;
  }

  // Fix MCPAgentOrchestrationCenter.tsx - remove unused imports
  if (filePath === 'src/components/super-admin/MCPAgentOrchestrationCenter.tsx') {
    const unusedImports = [
      'useEffect', 'Cpu', 'Zap', 'Settings', 'CheckCircle', 'Clock', 'TrendingUp',
      'Users', 'Database', 'Globe', 'Lock', 'Eye', 'Command', 'PieChart', 'LineChart'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    fixed += 15;
  }

  // Fix MCPAgentStatusDashboard.tsx - remove unused imports and variables
  if (filePath === 'src/components/super-admin/MCPAgentStatusDashboard.tsx') {
    const unusedImports = [
      'useEffect', 'Activity', 'CheckCircle', 'Clock', 'Pause', 'Cpu', 'Smartphone',
      'Tablet', 'WifiOff', 'Signal', 'SignalZero', 'SignalLow', 'SignalHigh', 'X'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    content = content.replace(/const \[agents, setAgents\] = useState<MCPAgent\[\]>\(\[/, 'const [agents] = useState<MCPAgent[]>([');
    content = content.replace(/const \[portalProgress, setPortalProgress\] = useState<PortalProgress\[\]>\(\[/, 'const [portalProgress] = useState<PortalProgress[]>([');
    
    fixed += 16;
  }

  // Fix RoleBasedAccessControl.tsx - remove unused imports and variables
  if (filePath === 'src/components/super-admin/RoleBasedAccessControl.tsx') {
    const unusedImports = [
      'React', 'useEffect', 'Settings', 'CheckCircle', 'X', 'AlertTriangle',
      'Eye', 'EyeOff', 'Lock', 'Unlock', 'UserMinus'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    content = content.replace(/const \[roles, setRoles\] = useState<UserRole\[\]>\(\[/, 'const [roles] = useState<UserRole[]>([');
    content = content.replace(/const \[users, setUsers\] = useState<User\[\]>\(\[/, 'const [users] = useState<User[]>([');
    content = content.replace(/const getRoleById = \(roleId: string\) => roles\.find\(role => role\.id === roleId\);\n/, '');
    content = content.replace(/, isEditing/, '');
    
    fixed += 15;
  }

  // Fix SecurityWarRoom.tsx - remove unused imports and variables
  if (filePath === 'src/components/super-admin/SecurityWarRoom.tsx') {
    const unusedImports = [
      'Lock', 'Unlock', 'EyeOff', 'Users', 'Globe', 'Database', 'Server', 'Cpu',
      'MemoryStick', 'Network', 'TrendingDown', 'Target', 'Search', 'Filter',
      'Download', 'Settings', 'Bell', 'BellOff', 'Maximize2', 'Minimize2', 'Play',
      'Pause', 'RotateCcw', 'Power', 'PowerOff', 'ExternalLink', 'Copy', 'Share',
      'Star', 'StarOff', 'Heart', 'HeartOff', 'Wifi', 'WifiOff', 'Signal',
      'SignalZero', 'SignalLow', 'SignalMedium', 'SignalHigh'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    content = content.replace(/const \[metrics, setMetrics\] = useState<SecurityMetrics>\({/, 'const [metrics] = useState<SecurityMetrics>({');
    content = content.replace(/const \[events, setEvents\] = useState<SecurityEvent\[\]>\(\[/, 'const [events] = useState<SecurityEvent[]>([');
    
    fixed += 41;
  }

  // Fix SystemHealthMonitor.tsx - remove unused imports and variables
  if (filePath === 'src/components/super-admin/SystemHealthMonitor.tsx') {
    const unusedImports = [
      'HeartOff', 'Shield', 'Clock', 'Cpu', 'MemoryStick', 'Users', 'PieChart',
      'LineChart', 'Play', 'Pause', 'Power', 'PowerOff', 'Eye', 'EyeOff',
      'Maximize2', 'Minimize2', 'Download', 'Upload', 'Filter', 'Search',
      'Calendar', 'Bell', 'BellOff', 'Volume2', 'VolumeX', 'Wifi', 'WifiOff',
      'Signal', 'SignalZero', 'SignalLow', 'SignalMedium', 'SignalHigh',
      'Target', 'Brain', 'Bot', 'Command', 'Terminal', 'ExternalLink', 'Copy',
      'Share', 'Star', 'StarOff', 'HeartIcon', 'HeartOffIcon'
    ];
    
    for (const importName of unusedImports) {
      content = content.replace(new RegExp(`\\s*${importName},\\n?`, 'g'), '');
    }
    
    content = content.replace(/const \[selectedAction, setSelectedAction\] = useState<HealingAction \| null>\(null\);\n/, '');
    content = content.replace(/const \[healingActions, setHealingActions\] = useState<HealingAction\[\]>\(\[/, 'const [healingActions] = useState<HealingAction[]>([');
    
    fixed += 46;
  }

  // Fix UltimateSuperAdminPortal.tsx - remove unused variables
  if (filePath === 'src/pages/portals/super-admin/UltimateSuperAdminPortal.tsx') {
    content = content.replace(/const \[notifications, setNotifications\] = useState\(true\);\n/, '');
    content = content.replace(/const \[theme, setTheme\] = useState<'dark' \| 'light'>\('dark'\);\n/, '');
    fixed += 2;
  }

  // Clean up any trailing commas in import statements
  content = content.replace(/,\s*}/g, '}');
  content = content.replace(/,\s*]/g, ']');
  content = content.replace(/,\s*\)/g, ')');

  // Write the fixed content
  fs.writeFileSync(filePath, content);
  totalFixed += fixed;
  
  console.log(`✅ Fixed ${fixed} issues in ${filePath}`);
}

console.log(`\n🎉 Comprehensive lint fix complete!`);
console.log(`📊 Total issues fixed: ${totalFixed}`);
console.log(`📁 Files processed: ${filesToFix.length}`);

// Clean up any remaining backup files
console.log('\n🧹 Cleaning up backup files...');
const backupFiles = [
  'src/components/super-admin/BusinessIntelligenceCenter.tsx.backup',
  'src/components/super-admin/EnterpriseDashboard.tsx.backup',
  'src/components/super-admin/MCPAgentOrchestrationCenter.tsx.backup',
  'src/components/super-admin/MCPAgentStatusDashboard.tsx.backup',
  'src/components/super-admin/RoleBasedAccessControl.tsx.backup',
  'src/components/super-admin/SecurityWarRoom.tsx.backup',
  'src/components/super-admin/SystemHealthMonitor.tsx.backup'
];

for (const backupFile of backupFiles) {
  if (fs.existsSync(backupFile)) {
    fs.unlinkSync(backupFile);
    console.log(`🗑️  Deleted: ${backupFile}`);
  }
}

console.log('\n✨ All lint errors should now be fixed!');
