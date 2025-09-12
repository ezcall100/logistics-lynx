#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 Fixing duplicate import issues...\n');

// Files with specific duplicate import issues
const fixes = [
  {
    file: 'src/pages/portals/broker/BrokerPortal.tsx',
    fixes: [
      { from: 'Handshake,', to: 'Users,' }
    ]
  },
  {
    file: 'src/pages/portals/rates/RatesPortal.tsx',
    fixes: [
      { from: 'DollarSign,\n  Menu,\n  Search,\n  Bell,\n  Settings,\n  LogOut,\n  Plus,\n  BarChart3,\n  TrendingUp,\n  Activity,\n  CheckCircle,\n  AlertTriangle,\n  X,\n  Home,\n  DollarSign', to: 'DollarSign,\n  Menu,\n  Search,\n  Bell,\n  Settings,\n  LogOut,\n  Plus,\n  BarChart3,\n  TrendingUp,\n  Activity,\n  CheckCircle,\n  AlertTriangle,\n  X,\n  Home' }
    ]
  },
  {
    file: 'src/pages/portals/monitoring-admin/MonitoringAdminPortal.tsx',
    fixes: [
      { from: 'Activity,\n  Menu,\n  Search,\n  Bell,\n  Settings,\n  LogOut,\n  Plus,\n  BarChart3,\n  TrendingUp,\n  Activity,', to: 'Activity,\n  Menu,\n  Search,\n  Bell,\n  Settings,\n  LogOut,\n  Plus,\n  BarChart3,\n  TrendingUp,' }
    ]
  },
  {
    file: 'src/pages/portals/super-admin/SuperAdminPortal.tsx',
    fixes: [
      { from: 'Settings,\n  Menu,\n  Search,\n  Bell,\n  Settings,', to: 'Settings,\n  Menu,\n  Search,\n  Bell,' }
    ]
  }
];

let fixedCount = 0;

for (const fix of fixes) {
  if (fs.existsSync(fix.file)) {
    console.log(`🔧 Fixing: ${fix.file}`);
    
    let content = fs.readFileSync(fix.file, 'utf8');
    
    for (const replacement of fix.fixes) {
      content = content.replace(replacement.from, replacement.to);
    }
    
    fs.writeFileSync(fix.file, content);
    fixedCount++;
    console.log(`✅ Fixed: ${fix.file}`);
  } else {
    console.log(`❌ File not found: ${fix.file}`);
  }
}

console.log(`\n🎉 Duplicate import fix complete!`);
console.log(`📊 Fixed ${fixedCount} files`);
console.log(`✨ All duplicate import issues should now be resolved!`);

