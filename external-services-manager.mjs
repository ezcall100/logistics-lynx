#!/usr/bin/env node

/**
 * EXTERNAL SERVICES MANAGER
 * Continuous monitoring and auto-restart of n8n, Supabase, GitHub
 * Part of Claude Sonnet 24/7 Autonomous System
 */

import { spawn, exec } from 'child_process';
import fs from 'fs';

class ExternalServicesManager {
  constructor() {
    this.systemName = 'External Services Manager';
    this.version = '1.0.0';
    this.logFile = 'external-services-manager.log';
    this.isRunning = true;
    this.checkInterval = 30000; // Check every 30 seconds
    
    this.services = {
      'n8n': {
        status: 'monitoring',
        lastCheck: null,
        restartCount: 0,
        url: 'http://localhost:5678/healthz',
        command: 'npx n8n start',
        port: 5678
      },
      'Supabase': {
        status: 'monitoring',
        lastCheck: null,
        restartCount: 0,
        url: 'https://api.supabase.com/v1/health',
        command: 'npx supabase start',
        port: null
      },
      'GitHub': {
        status: 'monitoring',
        lastCheck: null,
        restartCount: 0,
        url: 'https://api.github.com/zen',
        command: 'gh auth status',
        port: null
      }
    };
    
    console.log('🚀 EXTERNAL SERVICES MANAGER ACTIVATED');
    console.log('🎯 MISSION: Continuous monitoring and auto-restart of external services');
    
    this.initializeServices();
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [EXTERNAL-SERVICES] ${message}`;
    console.log(logMessage);
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  async initializeServices() {
    this.log('🔧 Initializing external services...');
    
    // Start all services
    await this.startAllServices();
    
    // Begin continuous monitoring
    this.startContinuousMonitoring();
  }

  async startAllServices() {
    for (const [name, service] of Object.entries(this.services)) {
      await this.startService(name, service);
    }
  }

  async startService(name, service) {
    this.log(`🚀 Starting ${name} service...`);
    
    try {
      if (name === 'n8n') {
        // Start n8n
        const powershellCommand = `powershell -Command "cd '${process.cwd()}'; ${service.command}"`;
        
        exec(powershellCommand, (error, stdout, stderr) => {
          if (error) {
            this.log(`❌ Error starting ${name}: ${error.message}`);
          } else {
            this.log(`✅ ${name} service started successfully`);
          }
        });
        
        // Wait for service to start
        await new Promise(resolve => setTimeout(resolve, 5000));
        
      } else if (name === 'Supabase') {
        // Start Supabase local development
        const powershellCommand = `powershell -Command "cd '${process.cwd()}'; ${service.command}"`;
        
        exec(powershellCommand, (error, stdout, stderr) => {
          if (error) {
            this.log(`⚠️ Supabase local not available: ${error.message}`);
          } else {
            this.log(`✅ Supabase local development started`);
          }
        });
        
      } else if (name === 'GitHub') {
        // Check GitHub CLI authentication
        const powershellCommand = `powershell -Command "gh auth status"`;
        
        exec(powershellCommand, (error, stdout, stderr) => {
          if (error) {
            this.log(`⚠️ GitHub CLI not available: ${error.message}`);
          } else {
            this.log(`✅ GitHub CLI authenticated`);
          }
        });
      }
      
    } catch (error) {
      this.log(`❌ Error starting ${name}: ${error.message}`);
    }
  }

  async startContinuousMonitoring() {
    this.log('🔄 Starting continuous monitoring of external services...');
    
    while (this.isRunning) {
      try {
        await this.checkAllServices();
        await this.generateStatusReport();
        
        // Wait before next check
        await new Promise(resolve => setTimeout(resolve, this.checkInterval));
      } catch (error) {
        this.log(`❌ Monitoring error: ${error.message}`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }

  async checkAllServices() {
    this.log('🔍 Checking all external services...');
    
    for (const [name, service] of Object.entries(this.services)) {
      await this.checkService(name, service);
    }
  }

  async checkService(name, service) {
    try {
      const response = await fetch(service.url);
      if (response.ok) {
        service.status = 'healthy';
        service.lastCheck = new Date();
        this.log(`✅ ${name}: HEALTHY`);
      } else {
        throw new Error(`${name} not responding`);
      }
    } catch (error) {
      service.status = 'down';
      service.lastCheck = new Date();
      this.log(`❌ ${name}: DOWN - Auto-restarting...`);
      
      // Auto-restart the service
      await this.restartService(name, service);
    }
  }

  async restartService(name, service) {
    this.log(`🔧 Auto-restarting ${name}...`);
    
    try {
      if (name === 'n8n') {
        // Kill existing n8n processes
        await this.killN8NProcesses();
        
        // Wait a moment
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Start n8n
        const powershellCommand = `powershell -Command "cd '${process.cwd()}'; ${service.command}"`;
        
        exec(powershellCommand, (error, stdout, stderr) => {
          if (error) {
            this.log(`❌ Error restarting ${name}: ${error.message}`);
          } else {
            this.log(`✅ ${name} restarted successfully`);
          }
        });
        
      } else if (name === 'Supabase') {
        // Restart Supabase local
        const powershellCommand = `powershell -Command "cd '${process.cwd()}'; ${service.command}"`;
        
        exec(powershellCommand, (error, stdout, stderr) => {
          if (error) {
            this.log(`⚠️ Supabase local restart failed: ${error.message}`);
          } else {
            this.log(`✅ Supabase local restarted`);
          }
        });
        
      } else if (name === 'GitHub') {
        // Re-authenticate GitHub CLI
        const powershellCommand = `powershell -Command "gh auth refresh"`;
        
        exec(powershellCommand, (error, stdout, stderr) => {
          if (error) {
            this.log(`⚠️ GitHub CLI refresh failed: ${error.message}`);
          } else {
            this.log(`✅ GitHub CLI refreshed`);
          }
        });
      }
      
      service.restartCount++;
      
    } catch (error) {
      this.log(`❌ Error restarting ${name}: ${error.message}`);
    }
  }

  async killN8NProcesses() {
    return new Promise((resolve) => {
      exec('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', (error, stdout) => {
        if (stdout) {
          const lines = stdout.split('\n');
          for (const line of lines) {
            if (line.includes('node.exe')) {
              const parts = line.split(',');
              if (parts.length > 1) {
                const pid = parts[1].replace(/"/g, '');
                if (pid && pid !== 'PID') {
                  exec(`taskkill /PID ${pid} /F`, (killError) => {
                    if (!killError) {
                      this.log(`🔪 Killed n8n process ${pid}`);
                    }
                  });
                }
              }
            }
          }
        }
        resolve();
      });
    });
  }

  async generateStatusReport() {
    const timestamp = new Date().toISOString();
    
    this.log('📊 EXTERNAL SERVICES STATUS REPORT:');
    this.log(`   System: ${this.systemName}`);
    this.log(`   Status: ACTIVE_MONITORING`);
    this.log(`   Timestamp: ${timestamp}`);
    this.log('   Service Health:');
    
    for (const [name, service] of Object.entries(this.services)) {
      const status = service.status === 'healthy' ? '✅' : '❌';
      this.log(`     ${status} ${name}: ${service.status.toUpperCase()} (Restarts: ${service.restartCount})`);
    }
    
    this.log('---');
  }

  stop() {
    this.log('🛑 Stopping External Services Manager');
    this.isRunning = false;
  }
}

// Start the external services manager
const manager = new ExternalServicesManager();

// Handle graceful shutdown
process.on('SIGINT', () => {
  manager.log('🛑 External Services Manager shutting down gracefully');
  manager.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  manager.log('🛑 External Services Manager shutting down gracefully');
  manager.stop();
  process.exit(0);
});

export default ExternalServicesManager;
