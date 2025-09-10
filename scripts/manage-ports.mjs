#!/usr/bin/env node

/**
 * 🎛️ PORT MANAGEMENT SYSTEM
 * 
 * Comprehensive port management for TransBot system
 * - Lock/Unlock ports
 * - Monitor port status
 * - Start/Stop services
 * - Emergency port recovery
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';

class PortManager {
  constructor() {
    this.ports = {
      3000: { name: 'TransBot Website', service: 'website', locked: false },
      3001: { name: 'MCP API Server', service: 'mcp-api', locked: false },
      3005: { name: 'Super Admin Portal', service: 'super-admin', locked: false },
      3006: { name: 'Login Portal', service: 'login', locked: false }
    };
    this.processes = new Map();
  }

  /**
   * Display main menu
   */
  displayMenu() {
    console.clear();
    console.log('🎛️ TRANSBOT PORT MANAGEMENT SYSTEM');
    console.log('===================================');
    console.log(`📅 Current Time: ${new Date().toLocaleString()}`);
    console.log('');

    // Display port status
    console.log('📊 PORT STATUS:');
    Object.entries(this.ports).forEach(([port, config]) => {
      const status = this.isPortInUse(port) ? '🔒 LOCKED' : '⚠️ AVAILABLE';
      console.log(`  Port ${port} (${config.name}): ${status}`);
    });
    console.log('');

    // Display menu options
    console.log('🎯 OPTIONS:');
    console.log('  1. Lock All Ports Permanently');
    console.log('  2. Unlock All Ports');
    console.log('  3. Start All Services');
    console.log('  4. Stop All Services');
    console.log('  5. Emergency Port Recovery');
    console.log('  6. Monitor Ports (Real-time)');
    console.log('  7. Create Startup Task');
    console.log('  8. Exit');
    console.log('');
  }

  /**
   * Check if port is in use
   */
  isPortInUse(port) {
    try {
      const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
      return result.trim().length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Lock all ports permanently
   */
  lockAllPorts() {
    console.log('🔒 Locking all ports permanently...');
    
    Object.entries(this.ports).forEach(([port, config]) => {
      if (!this.isPortInUse(port)) {
        try {
          console.log(`🔒 Locking port ${port} (${config.name})...`);
          const lockProcess = spawn('node', [`scripts/port-${port}-lock.mjs`], {
            detached: true,
            stdio: 'ignore'
          });
          lockProcess.unref();
          this.processes.set(port, lockProcess);
          this.ports[port].locked = true;
          console.log(`✅ Port ${port} locked successfully`);
        } catch (error) {
          console.log(`❌ Failed to lock port ${port}:`, error.message);
        }
      } else {
        console.log(`⚠️ Port ${port} already in use`);
      }
    });
  }

  /**
   * Unlock all ports
   */
  unlockAllPorts() {
    console.log('🔓 Unlocking all ports...');
    
    Object.entries(this.ports).forEach(([port, config]) => {
      if (this.processes.has(port)) {
        try {
          const process = this.processes.get(port);
          process.kill();
          this.processes.delete(port);
          this.ports[port].locked = false;
          console.log(`✅ Port ${port} unlocked`);
        } catch (error) {
          console.log(`❌ Failed to unlock port ${port}:`, error.message);
        }
      }
    });
  }

  /**
   * Start all services
   */
  startAllServices() {
    console.log('🚀 Starting all TransBot services...');
    
    // Start website on port 3000
    if (!this.isPortInUse(3000)) {
      console.log('🌐 Starting TransBot Website (Port 3000)...');
      const websiteProcess = spawn('npm', ['run', 'dev', '--', '--port', '3000'], {
        detached: true,
        stdio: 'ignore'
      });
      websiteProcess.unref();
    }

    // Start MCP API on port 3001
    if (!this.isPortInUse(3001)) {
      console.log('🤖 Starting MCP API Server (Port 3001)...');
      const mcpProcess = spawn('node', ['scripts/mcp-api-server.mjs'], {
        detached: true,
        stdio: 'ignore'
      });
      mcpProcess.unref();
    }

    // Start Super Admin on port 3005
    if (!this.isPortInUse(3005)) {
      console.log('👑 Starting Super Admin Portal (Port 3005)...');
      const adminProcess = spawn('node', ['scripts/super-admin-server.mjs'], {
        detached: true,
        stdio: 'ignore'
      });
      adminProcess.unref();
    }

    // Start Login Portal on port 3006
    if (!this.isPortInUse(3006)) {
      console.log('🔐 Starting Login Portal (Port 3006)...');
      const loginProcess = spawn('node', ['scripts/login-server.mjs'], {
        detached: true,
        stdio: 'ignore'
      });
      loginProcess.unref();
    }

    console.log('✅ All services started');
  }

  /**
   * Stop all services
   */
  stopAllServices() {
    console.log('🛑 Stopping all TransBot services...');
    
    try {
      // Kill all Node.js processes
      execSync('taskkill /f /im node.exe', { stdio: 'pipe' });
      console.log('✅ All Node.js processes stopped');
    } catch (error) {
      console.log('⚠️ No Node.js processes to stop');
    }
  }

  /**
   * Emergency port recovery
   */
  emergencyRecovery() {
    console.log('🚨 EMERGENCY PORT RECOVERY');
    console.log('==========================');
    
    // Kill all processes on target ports
    Object.keys(this.ports).forEach(port => {
      try {
        console.log(`🔍 Finding processes on port ${port}...`);
        const result = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
        const lines = result.trim().split('\n');
        
        lines.forEach(line => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 5) {
            const pid = parts[4];
            try {
              execSync(`taskkill /f /pid ${pid}`, { stdio: 'pipe' });
              console.log(`✅ Killed process ${pid} on port ${port}`);
            } catch (error) {
              console.log(`⚠️ Could not kill process ${pid}`);
            }
          }
        });
      } catch (error) {
        console.log(`⚠️ No processes found on port ${port}`);
      }
    });

    console.log('🔄 Re-locking all ports...');
    setTimeout(() => {
      this.lockAllPorts();
    }, 2000);
  }

  /**
   * Real-time port monitoring
   */
  startMonitoring() {
    console.log('📊 Starting real-time port monitoring...');
    console.log('Press Ctrl+C to stop monitoring');
    console.log('');

    const monitorInterval = setInterval(() => {
      console.clear();
      console.log('📊 REAL-TIME PORT MONITORING');
      console.log('============================');
      console.log(`📅 ${new Date().toLocaleString()}`);
      console.log('');

      Object.entries(this.ports).forEach(([port, config]) => {
        const status = this.isPortInUse(port) ? '🔒 LOCKED' : '⚠️ AVAILABLE';
        const emoji = this.isPortInUse(port) ? '🟢' : '🔴';
        console.log(`${emoji} Port ${port} (${config.name}): ${status}`);
      });
    }, 2000);

    // Handle Ctrl+C
    process.on('SIGINT', () => {
      clearInterval(monitorInterval);
      console.log('\n🛑 Monitoring stopped');
      this.displayMenu();
    });
  }

  /**
   * Create Windows startup task
   */
  createStartupTask() {
    console.log('📝 Creating Windows startup task...');
    
    try {
      execSync('scripts/create-startup-task.bat', { stdio: 'inherit' });
      console.log('✅ Startup task created successfully');
    } catch (error) {
      console.log('❌ Failed to create startup task:', error.message);
      console.log('Please run as Administrator');
    }
  }

  /**
   * Main menu loop
   */
  async run() {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const showMenu = () => {
      this.displayMenu();
      rl.question('Select option (1-8): ', (answer) => {
        switch (answer.trim()) {
          case '1':
            this.lockAllPorts();
            setTimeout(showMenu, 2000);
            break;
          case '2':
            this.unlockAllPorts();
            setTimeout(showMenu, 2000);
            break;
          case '3':
            this.startAllServices();
            setTimeout(showMenu, 2000);
            break;
          case '4':
            this.stopAllServices();
            setTimeout(showMenu, 2000);
            break;
          case '5':
            this.emergencyRecovery();
            setTimeout(showMenu, 3000);
            break;
          case '6':
            this.startMonitoring();
            break;
          case '7':
            this.createStartupTask();
            setTimeout(showMenu, 2000);
            break;
          case '8':
            console.log('👋 Goodbye!');
            rl.close();
            process.exit(0);
            break;
          default:
            console.log('❌ Invalid option. Please select 1-8.');
            setTimeout(showMenu, 1000);
        }
      });
    };

    showMenu();
  }
}

// Main execution
async function main() {
  const portManager = new PortManager();
  await portManager.run();
}

// Run the port manager
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { PortManager };
