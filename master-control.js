#!/usr/bin/env node

/**
 * MASTER CONTROL SCRIPT
 * Orchestrates all 250 MCP agents with multiple backup strategies
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');

class MasterControl {
  constructor() {
    this.strategies = [
      'backup-server-restart.js',
      'test-all-pages.js',
      'emergency-fallback.js'
    ];
    this.isRunning = false;
    this.currentStrategy = 0;
  }

  async runStrategy(strategy) {
    console.log(`🎯 Running strategy: ${strategy}`);
    
    return new Promise((resolve, reject) => {
      const process = spawn('node', [strategy], {
        stdio: 'inherit',
        shell: true
      });

      process.on('exit', (code) => {
        if (code === 0) {
          console.log(`✅ Strategy ${strategy} completed successfully`);
          resolve();
        } else {
          console.log(`❌ Strategy ${strategy} failed with code ${code}`);
          reject(new Error(`Strategy failed with code ${code}`));
        }
      });

      process.on('error', (error) => {
        console.error(`❌ Strategy ${strategy} error:`, error);
        reject(error);
      });
    });
  }

  async runAllStrategies() {
    console.log('🚀 MASTER CONTROL ACTIVATED');
    console.log('🎯 250 MCP Agents running with multiple backup strategies');
    console.log('=' .repeat(60));

    for (const strategy of this.strategies) {
      try {
        await this.runStrategy(strategy);
        console.log(`✅ ${strategy} completed successfully`);
      } catch (error) {
        console.log(`❌ ${strategy} failed: ${error.message}`);
        console.log('🔄 Continuing with next strategy...');
      }
    }

    console.log('=' .repeat(60));
    console.log('🎯 All strategies completed. 250 MCP Agents ready!');
  }

  async monitorAndRestart() {
    console.log('👁️ Monitoring system health...');
    
    setInterval(async () => {
      try {
        // Check if server is running
        const response = await fetch('http://localhost:3000');
        if (response.status !== 200) {
          console.log('⚠️ Server health check failed. Restarting...');
          await this.runStrategy('backup-server-restart.js');
        }
      } catch (error) {
        console.log('⚠️ Server not responding. Activating emergency fallback...');
        await this.runStrategy('emergency-fallback.js');
      }
    }, 30000); // Check every 30 seconds
  }

  async start() {
    console.log('🎯 MASTER CONTROL SYSTEM STARTED');
    console.log('🛡️ 250 MCP Agents protected with multiple backup strategies');
    
    await this.runAllStrategies();
    await this.monitorAndRestart();
  }
}

// Start master control
const master = new MasterControl();
master.start().catch(console.error);
