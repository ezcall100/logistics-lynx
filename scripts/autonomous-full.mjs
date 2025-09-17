#!/usr/bin/env node

/**
 * Full Autonomous Suite
 * Starts all autonomous development capabilities
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting Full Autonomous Development Suite');
console.log('==============================================\n');

const services = [
  { name: 'Main Development Server', command: 'npm run dev', port: 3000 },
  { name: 'MCP Server', command: 'npm run dev:mcp', port: 3002 },
  { name: 'Dashboard Server', command: 'npm run dev:dashboard', port: 3001 },
  { name: 'Super Admin Server', command: 'npm run dev:super-admin', port: 3000 },
  { name: 'Portal Login Server', command: 'npm run dev:portal', port: 3003 }
];

console.log('Starting autonomous services...\n');

for (const service of services) {
  console.log(`Starting ${service.name} on port ${service.port}...`);
  
  const child = spawn('npm', service.command.split(' ').slice(1), {
    shell: true,
    detached: true,
    stdio: 'ignore'
  });
  
  child.unref();
  console.log(`  ✅ ${service.name} started (PID: ${child.pid})\n`);
}

console.log('🎉 All autonomous services started!');
console.log('Services are running in the background.');
console.log('Use npm run emergency:stop to halt all services.');
console.log('Use npm run emergency:status to check service status.');

// Keep the script running
process.stdin.resume();
