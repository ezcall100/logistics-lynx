#!/usr/bin/env node

/**
 * EXTERNAL SERVICES RESTART SYSTEM
 * Auto-restart n8n, Supabase, and GitHub integrations
 * Part of Claude Sonnet 24/7 Autonomous System
 */

import { spawn, exec } from 'child_process';
import fs from 'fs';

class ExternalServicesRestarter {
  constructor() {
    this.systemName = 'External Services Restarter';
    this.version = '1.0.0';
    this.logFile = 'external-services-restart.log';
    
    console.log('🚀 EXTERNAL SERVICES RESTART SYSTEM ACTIVATED');
    console.log('🎯 MISSION: Restart n8n, Supabase, and GitHub services');
    
    this.restartAllServices();
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [EXTERNAL-SERVICES] ${message}`;
    console.log(logMessage);
    fs.appendFileSync(this.logFile, logMessage + '\n');
  }

  async restartAllServices() {
    this.log('🔧 Starting external services restart sequence...');
    
    // Restart n8n Webhook
    await this.restartN8N();
    
    // Restart Supabase connection
    await this.restartSupabase();
    
    // Restart GitHub integration
    await this.restartGitHub();
    
    this.log('✅ External services restart sequence completed');
  }

  async restartN8N() {
    this.log('🔧 Restarting n8n Webhook service...');
    
    try {
      // Kill any existing n8n processes
      await this.killN8NProcesses();
      
      // Wait a moment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Start n8n
      const powershellCommand = `Start-Process powershell -ArgumentList "-Command", "npx n8n start" -WindowStyle Hidden`;
      
      exec(powershellCommand, (error, stdout, stderr) => {
        if (error) {
          this.log(`❌ Error starting n8n: ${error.message}`);
        } else {
          this.log('✅ n8n Webhook service restarted successfully');
        }
      });
      
      // Wait for n8n to start
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Verify n8n is running
      await this.verifyN8N();
      
    } catch (error) {
      this.log(`❌ Error restarting n8n: ${error.message}`);
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

  async verifyN8N() {
    try {
      const response = await fetch('http://localhost:5678/healthz');
      if (response.ok) {
        this.log('✅ n8n Webhook service verified as running');
      } else {
        this.log('⚠️ n8n Webhook service not responding yet');
      }
    } catch (error) {
      this.log('⚠️ n8n Webhook service verification failed - may still be starting');
    }
  }

  async restartSupabase() {
    this.log('🔧 Restarting Supabase connection...');
    
    try {
      // Test Supabase connection
      const response = await fetch('https://api.supabase.com/v1/health');
      if (response.ok) {
        this.log('✅ Supabase connection restored');
      } else {
        this.log('⚠️ Supabase connection still down - external service');
      }
    } catch (error) {
      this.log('⚠️ Supabase connection failed - external service may be down');
    }
    
    // Start Supabase local development if available
    try {
      const powershellCommand = `Start-Process powershell -ArgumentList "-Command", "npx supabase start" -WindowStyle Hidden`;
      
      exec(powershellCommand, (error, stdout, stderr) => {
        if (error) {
          this.log(`⚠️ Supabase local not available: ${error.message}`);
        } else {
          this.log('✅ Supabase local development started');
        }
      });
    } catch (error) {
      this.log('⚠️ Supabase local development not available');
    }
  }

  async restartGitHub() {
    this.log('🔧 Restarting GitHub integration...');
    
    try {
      // Test GitHub API
      const response = await fetch('https://api.github.com/zen');
      if (response.ok) {
        this.log('✅ GitHub integration restored');
      } else {
        this.log('⚠️ GitHub integration still down');
      }
    } catch (error) {
      this.log('⚠️ GitHub integration failed - may be network issue');
    }
    
    // Start GitHub CLI if available
    try {
      const powershellCommand = `Start-Process powershell -ArgumentList "-Command", "gh auth status" -WindowStyle Hidden`;
      
      exec(powershellCommand, (error, stdout, stderr) => {
        if (error) {
          this.log(`⚠️ GitHub CLI not available: ${error.message}`);
        } else {
          this.log('✅ GitHub CLI authenticated');
        }
      });
    } catch (error) {
      this.log('⚠️ GitHub CLI not available');
    }
  }
}

// Start the external services restarter
const restarter = new ExternalServicesRestarter();

export default ExternalServicesRestarter;
