#!/usr/bin/env node

/**
 * Portal Configuration Verification Script
 * Verifies all portal configurations are properly set up
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const PORTALS = [
  { name: 'Super Admin Portal', port: 3000, path: '/super-admin' },
  { name: 'Dashboard Portal', port: 3001, path: '/dashboard' },
  { name: 'MCP Portal', port: 3002, path: '/mcp' },
  { name: 'Login Portal', port: 3003, path: '/login' }
];

console.log('🔍 Portal Configuration Verification');
console.log('=====================================\n');

let allPortalsValid = true;

for (const portal of PORTALS) {
  console.log(`Checking ${portal.name}...`);
  
  // Check if server file exists
  const serverFile = `server/${portal.name.toLowerCase().replace(/\s+/g, '-')}-server.js`;
  const serverExists = existsSync(serverFile);
  
  if (serverExists) {
    console.log(`  ✅ Server file: ${serverFile}`);
  } else {
    console.log(`  ❌ Server file missing: ${serverFile}`);
    allPortalsValid = false;
  }
  
  // Check package.json script
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const scriptName = `dev:${portal.name.toLowerCase().replace(/\s+/g, '-')}`;
  
  if (packageJson.scripts[scriptName]) {
    console.log(`  ✅ Script: ${scriptName}`);
  } else {
    console.log(`  ❌ Script missing: ${scriptName}`);
    allPortalsValid = false;
  }
  
  console.log(`  📍 Expected: http://localhost:${portal.port}${portal.path}\n`);
}

if (allPortalsValid) {
  console.log('🎉 All portals configured correctly!');
  process.exit(0);
} else {
  console.log('⚠️  Some portals need configuration fixes.');
  process.exit(1);
}
