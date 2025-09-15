#!/usr/bin/env node

/**
 * Start All Services Script
 * Starts all required services on their designated ports
 * Port 3000: Main website
 * Port 3001: MCP API server
 * Port 3002: MCP Dashboard
 * Port 3005: Super Admin Portal
 * Port 3006: Portal App (Login)
 */

import { spawn } from 'child_process';
import { createServer } from 'http';

const PORTS = {
  MAIN_WEBSITE: 3000,
  MCP_API: 3001,
  MCP_DASHBOARD: 3002,
  SUPER_ADMIN: 3005,
  PORTAL_LOGIN: 3006
};

const services = [
  {
    name: 'Main Website',
    port: PORTS.MAIN_WEBSITE,
    command: 'npm',
    args: ['run', 'dev'],
    description: 'Main website on port 3000'
  },
  {
    name: 'MCP API Server',
    port: PORTS.MCP_API,
    command: 'npm',
    args: ['run', 'dev:mcp'],
    description: 'MCP API server on port 3001'
  },
  {
    name: 'MCP Dashboard',
    port: PORTS.MCP_DASHBOARD,
    command: 'npm',
    args: ['run', 'dev:dashboard'],
    description: 'MCP Dashboard on port 3002'
  },
  {
    name: 'Super Admin Portal',
    port: PORTS.SUPER_ADMIN,
    command: 'npm',
    args: ['run', 'dev:super-admin'],
    description: 'Super Admin Portal on port 3005'
  },
  {
    name: 'Portal Login',
    port: PORTS.PORTAL_LOGIN,
    command: 'npm',
    args: ['run', 'dev:portal'],
    description: 'Portal App (Login) on port 3006'
  }
];

// Start a service
function startService(service) {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Starting ${service.name} on port ${service.port}...`);
    
    const child = spawn(service.command, service.args, {
      stdio: 'pipe',
      shell: true,
      env: { ...process.env, PORT: service.port }
    });
    
    child.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('localhost:')) {
        console.log(`✅ ${service.name} started successfully on port ${service.port}`);
        resolve(child);
      }
    });
    
    child.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('EADDRINUSE')) {
        console.log(`⚠️  Port ${service.port} is already in use for ${service.name}`);
        resolve(child);
      } else if (error.includes('error') || error.includes('Error')) {
        console.log(`❌ Error starting ${service.name}: ${error}`);
      }
    });
    
    child.on('error', (error) => {
      console.log(`❌ Failed to start ${service.name}: ${error.message}`);
      reject(error);
    });
    
    child.on('exit', (code) => {
      if (code !== 0) {
        console.log(`⚠️  ${service.name} exited with code ${code}`);
      }
    });
    
    // Store reference for cleanup
    service.process = child;
  });
}

// Start all services
async function startAllServices() {
  console.log('🌐 STARTING ALL SERVICES');
  console.log('========================\n');
  
  const startedServices = [];
  
  try {
    for (const service of services) {
      try {
        const process = await startService(service);
        startedServices.push({ ...service, process });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds between starts
      } catch (error) {
        console.log(`❌ Failed to start ${service.name}: ${error.message}`);
      }
    }
    
    console.log('\n🎉 SERVICES STARTUP COMPLETE');
    console.log('============================\n');
    
    console.log('📊 Service Status:');
    startedServices.forEach(service => {
      console.log(`   ✅ ${service.name} - Port ${service.port}`);
    });
    
    console.log('\n🌐 Access URLs:');
    console.log(`   Main Website: http://localhost:${PORTS.MAIN_WEBSITE}`);
    console.log(`   MCP API: http://localhost:${PORTS.MCP_API}`);
    console.log(`   MCP Dashboard: http://localhost:${PORTS.MCP_DASHBOARD}`);
    console.log(`   Super Admin: http://localhost:${PORTS.SUPER_ADMIN}`);
    console.log(`   Portal Login: http://localhost:${PORTS.PORTAL_LOGIN}`);
    
    console.log('\n💡 Press Ctrl+C to stop all services');
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping all services...');
      startedServices.forEach(service => {
        if (service.process) {
          service.process.kill('SIGTERM');
          console.log(`   Stopped ${service.name}`);
        }
      });
      process.exit(0);
    });
    
    // Keep the process alive
    process.stdin.resume();
    
  } catch (error) {
    console.error('❌ Error starting services:', error);
    process.exit(1);
  }
}

// Check if we should start all services
if (process.argv.includes('--all')) {
  startAllServices();
} else {
  console.log('🌐 SERVICE STARTUP SCRIPT');
  console.log('=========================\n');
  console.log('This script can start all services on their designated ports:');
  console.log('\nPort Configuration:');
  services.forEach(service => {
    console.log(`   Port ${service.port}: ${service.name}`);
  });
  console.log('\nUsage:');
  console.log('   node scripts/start-all-services.mjs --all');
  console.log('\nOr use the npm script:');
  console.log('   npm run start:all');
}
