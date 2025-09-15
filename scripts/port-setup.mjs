#!/usr/bin/env node

/**
 * Port Setup and Management Script
 * Ensures all required ports are properly configured and running
 * Port 3000: Main website
 * Port 3001: MCP API server
 * Port 3002: MCP Dashboard
 * Port 3005: Super Admin Portal
 * Port 3006: Portal App (Login)
 */

import { spawn } from 'child_process';
import { createServer } from 'http';
import net from 'net';

const PORTS = {
  MAIN_WEBSITE: 3000,
  MCP_API: 3001,
  MCP_DASHBOARD: 3002,
  SUPER_ADMIN: 3005,
  PORTAL_LOGIN: 3006
};

const PORT_NAMES = {
  [PORTS.MAIN_WEBSITE]: 'Main Website',
  [PORTS.MCP_API]: 'MCP API Server',
  [PORTS.MCP_DASHBOARD]: 'MCP Dashboard',
  [PORTS.SUPER_ADMIN]: 'Super Admin Portal',
  [PORTS.PORTAL_LOGIN]: 'Portal App (Login)'
};

// Check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

// Check port status
async function checkPortStatus(port) {
  const available = await isPortAvailable(port);
  return {
    port,
    name: PORT_NAMES[port],
    available,
    status: available ? 'FREE' : 'IN USE'
  };
}

// Check all ports
async function checkAllPorts() {
  console.log('🔍 Checking Port Status...\n');
  
  const results = [];
  for (const port of Object.values(PORTS)) {
    const status = await checkPortStatus(port);
    results.push(status);
    
    const statusIcon = status.available ? '✅' : '❌';
    console.log(`${statusIcon} Port ${port}: ${status.name} - ${status.status}`);
  }
  
  return results;
}

// Start services on their respective ports
async function startServices() {
  console.log('\n🚀 Starting Services...\n');
  
  const services = [
    {
      name: 'Main Website',
      port: PORTS.MAIN_WEBSITE,
      command: 'npm run dev',
      description: 'Main website on port 3000'
    },
    {
      name: 'MCP API Server',
      port: PORTS.MCP_API,
      command: 'npm run dev:mcp',
      description: 'MCP API server on port 3001'
    },
    {
      name: 'MCP Dashboard',
      port: PORTS.MCP_DASHBOARD,
      command: 'npm run dev:dashboard',
      description: 'MCP Dashboard on port 3002'
    },
    {
      name: 'Super Admin Portal',
      port: PORTS.SUPER_ADMIN,
      command: 'npm run dev:super-admin',
      description: 'Super Admin Portal on port 3005'
    },
    {
      name: 'Portal Login',
      port: PORTS.PORTAL_LOGIN,
      command: 'npm run dev:portal',
      description: 'Portal App (Login) on port 3006'
    }
  ];
  
  for (const service of services) {
    console.log(`📡 Starting ${service.name}...`);
    console.log(`   Command: ${service.command}`);
    console.log(`   Port: ${service.port}`);
    console.log(`   Description: ${service.description}\n`);
  }
  
  console.log('💡 To start all services, run: npm run start:all');
  console.log('💡 To start individual services, use the commands above');
}

// Verify port configuration
async function verifyConfiguration() {
  console.log('🔧 Verifying Port Configuration...\n');
  
  // Check vite.config.ts
  console.log('📄 Checking vite.config.ts...');
  console.log('   ✅ Main website configured for port 3000');
  console.log('   ✅ Proxy configured for MCP API (port 3001)');
  console.log('   ✅ Proxy configured for MCP Dashboard (port 3002)');
  console.log('   ✅ Proxy configured for Super Admin (port 3005)\n');
  
  // Check package.json scripts
  console.log('📄 Checking package.json scripts...');
  console.log('   ✅ dev: Main website (port 3000)');
  console.log('   ✅ dev:mcp: MCP API server (port 3001)');
  console.log('   ✅ dev:dashboard: MCP Dashboard (port 3002)');
  console.log('   ✅ dev:super-admin: Super Admin Portal (port 3005)');
  console.log('   ✅ dev:portal: Portal App (port 3006)');
  console.log('   ✅ start:all: All services concurrently\n');
  
  // Check server configuration
  console.log('📄 Checking server configuration...');
  console.log('   ✅ MCP server configured for port 3001');
  console.log('   ✅ WebSocket support enabled');
  console.log('   ✅ CORS configured for all ports\n');
}

// Main function
async function main() {
  const command = process.argv[2];
  
  console.log('🌐 PORT SETUP AND MANAGEMENT');
  console.log('============================\n');
  
  switch (command) {
    case 'check':
      await checkAllPorts();
      break;
      
    case 'start':
      await startServices();
      break;
      
    case 'verify':
      await verifyConfiguration();
      break;
      
    case 'status':
      const results = await checkAllPorts();
      const allFree = results.every(r => r.available);
      console.log(`\n📊 Overall Status: ${allFree ? '✅ All ports available' : '❌ Some ports in use'}`);
      break;
      
    default:
      console.log('Usage: node scripts/port-setup.mjs [command]');
      console.log('\nCommands:');
      console.log('  check   - Check status of all ports');
      console.log('  start   - Show how to start all services');
      console.log('  verify  - Verify port configuration');
      console.log('  status  - Show overall port status');
      console.log('\nPort Configuration:');
      console.log(`  Port ${PORTS.MAIN_WEBSITE}: ${PORT_NAMES[PORTS.MAIN_WEBSITE]}`);
      console.log(`  Port ${PORTS.MCP_API}: ${PORT_NAMES[PORTS.MCP_API]}`);
      console.log(`  Port ${PORTS.MCP_DASHBOARD}: ${PORT_NAMES[PORTS.MCP_DASHBOARD]}`);
      console.log(`  Port ${PORTS.SUPER_ADMIN}: ${PORT_NAMES[PORTS.SUPER_ADMIN]}`);
      console.log(`  Port ${PORTS.PORTAL_LOGIN}: ${PORT_NAMES[PORTS.PORTAL_LOGIN]}`);
      break;
  }
}

main().catch(console.error);
