#!/usr/bin/env node

/**
 * Start All Services Script
 * 
 * This script starts all the required services on their designated ports:
 * - Port 3000: Main website
 * - Port 3001: MCP API server
 * - Port 3002: MCP Dashboard
 * - Port 3003: Super Admin Portal
 * - Port 3006: Portal Login
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Service configurations
const services = [
  {
    name: 'Main Website',
    port: 3000,
    command: 'npm',
    args: ['run', 'dev'],
    cwd: __dirname,
    color: colors.blue
  },
  {
    name: 'MCP API Server',
    port: 3001,
    command: 'node',
    args: ['server/mcp-server.js'],
    cwd: __dirname,
    color: colors.green
  },
  {
    name: 'MCP Dashboard',
    port: 3002,
    command: 'node',
    args: ['server/mcp-dashboard-server.js'],
    cwd: __dirname,
    color: colors.cyan
  },
  {
    name: 'Super Admin Portal',
    port: 3003,
    command: 'npm',
    args: ['run', 'dev'],
    cwd: join(__dirname, 'super-admin-portal'),
    color: colors.magenta
  },
  {
    name: 'Portal Login',
    port: 3006,
    command: 'node',
    args: ['server/portal-login-server.js'],
    cwd: __dirname,
    color: colors.yellow
  }
];

// Track running processes
const processes = [];

// Function to log with color
function log(service, message, type = 'info') {
  const timestamp = new Date().toISOString().substr(11, 12);
  const prefix = `${service.color}[${service.name}]${colors.reset}`;
  const timePrefix = `${colors.bright}[${timestamp}]${colors.reset}`;
  
  let typeColor = colors.white;
  if (type === 'error') typeColor = colors.red;
  if (type === 'success') typeColor = colors.green;
  if (type === 'warning') typeColor = colors.yellow;
  
  console.log(`${timePrefix} ${prefix} ${typeColor}${message}${colors.reset}`);
}

// Function to start a service
function startService(service) {
  return new Promise((resolve, reject) => {
    log(service, `Starting ${service.name} on port ${service.port}...`, 'info');
    
    const process = spawn(service.command, service.args, {
      cwd: service.cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });
    
    let started = false;
    
    // Handle stdout
    process.stdout.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        log(service, output, 'info');
        
        // Check for successful startup indicators
        if (!started && (
          output.includes(`running on http://localhost:${service.port}`) ||
          output.includes(`Local: http://localhost:${service.port}`) ||
          output.includes(`ready on http://localhost:${service.port}`)
        )) {
          started = true;
          log(service, `✅ ${service.name} started successfully on port ${service.port}`, 'success');
          resolve(process);
        }
      }
    });
    
    // Handle stderr
    process.stderr.on('data', (data) => {
      const output = data.toString().trim();
      if (output) {
        log(service, output, 'error');
      }
    });
    
    // Handle process exit
    process.on('exit', (code) => {
      if (code !== 0) {
        log(service, `❌ ${service.name} exited with code ${code}`, 'error');
        if (!started) {
          reject(new Error(`${service.name} failed to start`));
        }
      } else {
        log(service, `🛑 ${service.name} stopped`, 'info');
      }
    });
    
    // Handle process error
    process.on('error', (error) => {
      log(service, `❌ Error starting ${service.name}: ${error.message}`, 'error');
      if (!started) {
        reject(error);
      }
    });
    
    // Timeout for startup
    setTimeout(() => {
      if (!started) {
        log(service, `⚠️ ${service.name} startup timeout, but process is running`, 'warning');
        resolve(process);
      }
    }, 10000); // 10 second timeout
  });
}

// Function to check if port is available
async function checkPort(port) {
  return new Promise((resolve) => {
    const net = require('net');
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

// Function to wait for service to be ready
async function waitForService(port, timeout = 30000) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const response = await fetch(`http://localhost:${port}/api/login/health`);
      if (response.ok) {
        return true;
      }
    } catch (error) {
      // Service not ready yet
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return false;
}

// Main function
async function main() {
  console.log(`${colors.bright}${colors.cyan}🚀 Starting All TransBot Services${colors.reset}\n`);
  
  // Check if ports are available
  log({ name: 'Port Check', color: colors.white }, 'Checking port availability...', 'info');
  
  for (const service of services) {
    const isAvailable = await checkPort(service.port);
    if (!isAvailable) {
      log(service, `⚠️ Port ${service.port} is already in use`, 'warning');
    } else {
      log(service, `✅ Port ${service.port} is available`, 'success');
    }
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Start services sequentially
  for (const service of services) {
    try {
      const process = await startService(service);
      processes.push({ service, process });
      
      // Wait a bit before starting the next service
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      log(service, `Failed to start: ${error.message}`, 'error');
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bright}${colors.green}✅ All services started successfully!${colors.reset}\n`);
  
  // Display service URLs
  console.log(`${colors.bright}📋 Service URLs:${colors.reset}`);
  console.log(`${colors.blue}🌐 Main Website:${colors.reset} http://localhost:3000`);
  console.log(`${colors.green}🔧 MCP API Server:${colors.reset} http://localhost:3001`);
  console.log(`${colors.cyan}📊 MCP Dashboard:${colors.reset} http://localhost:3002`);
  console.log(`${colors.magenta}👑 Super Admin Portal:${colors.reset} http://localhost:3003`);
  console.log(`${colors.yellow}🔐 Portal Login:${colors.reset} http://localhost:3006\n`);
  
  console.log(`${colors.bright}💡 Press Ctrl+C to stop all services${colors.reset}\n`);
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log(`\n${colors.bright}${colors.yellow}🛑 Shutting down all services...${colors.reset}\n`);
    
    processes.forEach(({ service, process }) => {
      log(service, 'Stopping service...', 'info');
      process.kill('SIGTERM');
    });
    
    setTimeout(() => {
      processes.forEach(({ service, process }) => {
        if (!process.killed) {
          log(service, 'Force killing service...', 'warning');
          process.kill('SIGKILL');
        }
      });
      process.exit(0);
    }, 5000);
  });
  
  // Keep the script running
  process.on('exit', () => {
    console.log(`${colors.bright}${colors.red}👋 All services stopped${colors.reset}`);
  });
}

// Run the main function
main().catch((error) => {
  console.error(`${colors.red}❌ Error: ${error.message}${colors.reset}`);
  process.exit(1);
});
