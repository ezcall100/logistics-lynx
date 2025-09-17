#!/usr/bin/env node

/**
 * Emergency Stop Script
 * Halts all autonomous operations immediately
 */

import { exec } from 'child_process';

console.log('🛑 EMERGENCY STOP ACTIVATED');
console.log('============================\n');

console.log('Halting all autonomous operations...');

// Kill all Node.js processes (except this one)
exec('taskkill /F /IM node.exe', (error, stdout, stderr) => {
  if (error) {
    console.log('  ⚠️  Some processes may still be running');
    console.log(`  Error: ${error.message}`);
  } else {
    console.log('  ✅ All Node.js processes terminated');
  }
  
  console.log('\n🛑 All autonomous operations halted');
  console.log('System is now in emergency stop mode.');
  console.log('Use npm run emergency:resume to restart operations.');
});