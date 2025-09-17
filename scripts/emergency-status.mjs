#!/usr/bin/env node

/**
 * Emergency Status Script
 * Shows current emergency posture and system status
 */

import { exec } from 'child_process';

console.log('📊 EMERGENCY STATUS REPORT');
console.log('==========================\n');

// Check if any Node.js processes are running
exec('tasklist /FI "IMAGENAME eq node.exe"', (error, stdout, stderr) => {
  const nodeProcesses = stdout.split('\n').filter(line => line.includes('node.exe')).length - 1;
  
  console.log('System Status:');
  console.log(`  - Node.js processes running: ${nodeProcesses}`);
  console.log(`  - Emergency mode: ${nodeProcesses === 0 ? 'STOPPED' : 'ACTIVE'}`);
  console.log(`  - Last update: ${new Date().toISOString()}`);
  
  if (nodeProcesses > 0) {
    console.log('\n✅ System is operational');
    console.log('All autonomous services are running normally.');
  } else {
    console.log('\n⚠️  System is in emergency stop mode');
    console.log('No autonomous services are currently running.');
    console.log('Use npm run emergency:resume to restart operations.');
  }
});
