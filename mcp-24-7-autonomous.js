#!/usr/bin/env node

/**
 * MCP 24/7 Autonomous System
 * Provides continuous autonomous operation with full authority
 * No human intervention required - operates 24/7
 */

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import MCPAutoCommitSync from './mcp-auto-commit-sync.js';
import MCPAutoErrorFixer from './mcp-auto-error-fixer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MCP24_7Autonomous {
  constructor() {
    this.config = this.loadConfig();
    this.autoCommitSync = new MCPAutoCommitSync();
    this.autoErrorFixer = new MCPAutoErrorFixer();
    this.isRunning = false;
    this.lastActivity = new Date();
    this.activityLog = [];
    this.errorCount = 0;
    this.successCount = 0;
  }

  loadConfig() {
    try {
      const configPath = path.join(__dirname, 'mcp-auto-run-config.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.mcpAutoRunConfig;
    } catch (error) {
      console.error('❌ Error loading MCP config:', error.message);
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      globalSettings: {
        fullAuthority: {
          enabled: true,
          autoRunAllTools: true,
          requireConfirmation: false,
          autoApplyChanges: true,
          continuousOperation: true
        }
      },
      workflowIntegration: {
        autoCommit: {
          enabled: true,
          fullAuthority: true
        },
        autoSync: {
          enabled: true,
          fullAuthority: true
        }
      }
    };
  }

  logActivity(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type,
      message,
      errorCount: this.errorCount,
      successCount: this.successCount
    };

    this.activityLog.push(logEntry);
    this.lastActivity = new Date();

    // Keep only last 1000 entries
    if (this.activityLog.length > 1000) {
      this.activityLog = this.activityLog.slice(-1000);
    }

    // Console output with emojis
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      action: '🔄'
    };

    console.log(`${emoji[type]} [${timestamp}] ${message}`);
  }

  async executeCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, [], {
        shell: true,
        stdio: 'pipe',
        ...options
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, stdout, stderr });
        } else {
          reject({ success: false, stdout, stderr, code });
        }
      });

      child.on('error', (error) => {
        reject({ success: false, error: error.message });
      });
    });
  }

  async checkGitStatus() {
    try {
      const result = await this.executeCommand('git status --porcelain');
      const changes = result.stdout.split('\n').filter(line => line.trim());
      return changes;
    } catch (error) {
      this.logActivity(`Git status check failed: ${error.message}`, 'error');
      return [];
    }
  }

  async autonomousCommit() {
    try {
      this.logActivity('Starting autonomous commit process', 'action');
      
      const success = await this.autoCommitSync.autoCommit('24/7 Autonomous commit');
      
      if (success) {
        this.successCount++;
        this.logActivity('Autonomous commit completed successfully', 'success');
      } else {
        this.logActivity('Autonomous commit skipped (no changes or conditions not met)', 'info');
      }
      
      return success;
    } catch (error) {
      this.errorCount++;
      this.logActivity(`Autonomous commit failed: ${error.message}`, 'error');
      return false;
    }
  }

  async autonomousSync() {
    try {
      this.logActivity('Starting autonomous sync process', 'action');
      
      const success = await this.autoCommitSync.autoSync();
      
      if (success) {
        this.successCount++;
        this.logActivity('Autonomous sync completed successfully', 'success');
      } else {
        this.logActivity('Autonomous sync skipped (conditions not met)', 'info');
      }
      
      return success;
    } catch (error) {
      this.errorCount++;
      this.logActivity(`Autonomous sync failed: ${error.message}`, 'error');
      return false;
    }
  }

  async autonomousKeepAll() {
    try {
      this.logActivity('Executing autonomous Keep All operation', 'action');
      
      // Simulate Keep All behavior for file changes
      const changes = await this.checkGitStatus();
      
      if (changes.length > 0) {
        this.logActivity(`Auto-applying ${changes.length} changes (Keep All)`, 'info');
        
        // Stage all changes
        await this.executeCommand('git add .');
        this.logActivity('All changes staged automatically', 'success');
        
        // Trigger commit
        await this.autonomousCommit();
        
        this.successCount++;
        this.logActivity('Autonomous Keep All completed successfully', 'success');
        return true;
      } else {
        this.logActivity('No changes to apply (Keep All)', 'info');
        return false;
      }
    } catch (error) {
      this.errorCount++;
      this.logActivity(`Autonomous Keep All failed: ${error.message}`, 'error');
      return false;
    }
  }

  async healthCheck() {
    try {
      // Check if git repository is accessible
      await this.executeCommand('git status');
      
      // Check if we can read config files
      fs.accessSync('mcp-auto-run-config.json', fs.constants.R_OK);
      
      // Check system resources
      const uptime = process.uptime();
      const memoryUsage = process.memoryUsage();
      
      this.logActivity(`Health check passed - Uptime: ${Math.floor(uptime)}s, Memory: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`, 'success');
      
      return true;
    } catch (error) {
      this.logActivity(`Health check failed: ${error.message}`, 'error');
      return false;
    }
  }

  async autonomousCycle() {
    try {
      this.logActivity('Starting autonomous cycle', 'action');
      
      // Health check
      const healthy = await this.healthCheck();
      if (!healthy) {
        this.logActivity('System unhealthy, skipping cycle', 'warning');
        return;
      }
      
      // Auto-fix errors first
      await this.autonomousErrorFix();
      
      // Check for changes
      const changes = await this.checkGitStatus();
      
      if (changes.length > 0) {
        this.logActivity(`Detected ${changes.length} changes, executing autonomous operations`, 'info');
        
        // Execute Keep All (auto-apply changes)
        await this.autonomousKeepAll();
        
        // Execute autonomous commit
        await this.autonomousCommit();
        
        // Execute autonomous sync
        await this.autonomousSync();
        
        this.logActivity('Autonomous cycle completed', 'success');
      } else {
        this.logActivity('No changes detected, cycle complete', 'info');
      }
      
    } catch (error) {
      this.errorCount++;
      this.logActivity(`Autonomous cycle failed: ${error.message}`, 'error');
    }
  }

  async start24_7Operation() {
    if (this.isRunning) {
      this.logActivity('24/7 operation already running', 'warning');
      return;
    }

    this.isRunning = true;
    this.logActivity('🚀 Starting MCP 24/7 Autonomous Operation', 'info');
    this.logActivity('Full authority granted - No human intervention required', 'info');
    this.logActivity('System will operate continuously 24/7', 'info');

    // Initial cycle
    await this.autonomousCycle();

    // Set up continuous monitoring
    const cycleInterval = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(cycleInterval);
        return;
      }

      try {
        await this.autonomousCycle();
      } catch (error) {
        this.logActivity(`Cycle error: ${error.message}`, 'error');
      }
    }, 60000); // Run every minute

    // Set up health monitoring
    const healthInterval = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(healthInterval);
        return;
      }

      try {
        await this.healthCheck();
      } catch (error) {
        this.logActivity(`Health check error: ${error.message}`, 'error');
      }
    }, 300000); // Health check every 5 minutes

    // Set up status reporting
    const statusInterval = setInterval(() => {
      if (!this.isRunning) {
        clearInterval(statusInterval);
        return;
      }

      const uptime = process.uptime();
      const memoryUsage = process.memoryUsage();
      
      this.logActivity(`Status Report - Uptime: ${Math.floor(uptime)}s, Success: ${this.successCount}, Errors: ${this.errorCount}, Memory: ${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`, 'info');
    }, 900000); // Status report every 15 minutes

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      this.logActivity('Received shutdown signal, stopping 24/7 operation', 'warning');
      await this.stop24_7Operation();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      this.logActivity('Received termination signal, stopping 24/7 operation', 'warning');
      await this.stop24_7Operation();
      process.exit(0);
    });
  }

  async stop24_7Operation() {
    this.isRunning = false;
    this.logActivity('🛑 Stopping MCP 24/7 Autonomous Operation', 'info');
    
    // Final autonomous cycle
    await this.autonomousCycle();
    
    this.logActivity('24/7 operation stopped', 'info');
    this.logActivity(`Final Stats - Success: ${this.successCount}, Errors: ${this.errorCount}`, 'info');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastActivity: this.lastActivity,
      successCount: this.successCount,
      errorCount: this.errorCount,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      activityLog: this.activityLog.slice(-10) // Last 10 activities
    };
  }

  async autonomousErrorFix() {
    try {
      this.logActivity('Starting autonomous error fixing', 'action');
      
      // Run error fix cycle
      await this.autoErrorFixer.runErrorFixCycle();
      
      this.successCount++;
      this.logActivity('Autonomous error fixing completed', 'success');
      return true;
    } catch (error) {
      this.errorCount++;
      this.logActivity(`Autonomous error fixing failed: ${error.message}`, 'error');
      return false;
    }
  }

  async emergencyStop() {
    this.logActivity('🚨 EMERGENCY STOP ACTIVATED', 'error');
    await this.stop24_7Operation();
    this.logActivity('Emergency stop completed', 'warning');
  }
}

// CLI Interface
async function main() {
  const autonomous = new MCP24_7Autonomous();
  
  const command = process.argv[2];

  switch (command) {
    case 'start':
      await autonomous.start24_7Operation();
      break;
    case 'stop':
      await autonomous.stop24_7Operation();
      break;
    case 'status':
      const status = autonomous.getStatus();
      console.log('📊 MCP 24/7 Autonomous Status:');
      console.log(JSON.stringify(status, null, 2));
      break;
    case 'emergency':
      await autonomous.emergencyStop();
      break;
    case 'cycle':
      await autonomous.autonomousCycle();
      break;
    default:
      console.log('🚀 MCP 24/7 Autonomous System');
      console.log('================================');
      console.log('Usage:');
      console.log('  node mcp-24-7-autonomous.js start    # Start 24/7 operation');
      console.log('  node mcp-24-7-autonomous.js stop     # Stop 24/7 operation');
      console.log('  node mcp-24-7-autonomous.js status   # Show status');
      console.log('  node mcp-24-7-autonomous.js emergency # Emergency stop');
      console.log('  node mcp-24-7-autonomous.js cycle    # Run single cycle');
      console.log('');
      console.log('⚠️  WARNING: Full authority mode - No human intervention required');
      console.log('   System will operate autonomously 24/7');
      break;
  }
}

// Export for use as module
export default MCP24_7Autonomous;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
